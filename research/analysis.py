import math
from itertools import chain

import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer


class TopicDetector2(object):

    def __init__(self):
        self.ngram_frames = None

    def __call__(self, texts):
        self.ngram_frames = {ix: self.get_word_frame(texts, ix) for ix in range(1,5)}
        self.sorted_ngrams = {
            ix: frame.sum(axis=0)
                .sort_values(ascending=False)
                .where(lambda value: value >= 0.95)
                .dropna()
            for ix, frame in self.ngram_frames.items()
        }
        # Here we iterate backwards over the ngrams
        # Trigrams occuring inside tetragrams should be dropped and all bigrams in trigrams etc.
        drop_index = set()
        for ix in range(4, 1, -1):
            drop_index = self._get_drop_index(self.sorted_ngrams[ix].index, drop_index)
            print(drop_index)
            self.sorted_ngrams[ix - 1].drop(labels=drop_index, inplace=True, errors="ignore")

    def get_word_frame(self, texts, ngram):
        vectorizer = TfidfVectorizer(stop_words="english", ngram_range=(ngram, ngram))
        vectorizer.fit(texts)
        feature_names = vectorizer.get_feature_names()
        vectors = vectorizer.transform(texts)
        frame = pd.DataFrame(vectors.toarray(), columns=feature_names)
        if ngram == 1:
            number_features = [feature for feature in feature_names if not feature.isalpha()]
            frame.drop(labels=number_features, axis=1, inplace=True)
        return frame

    def _get_drop_index(self, ngram_series, ngram_history):
        drop_index = set()
        for ngram in chain(ngram_series, ngram_history):
            ngram_split = ngram.split(" ")
            drop_index.add(" ".join(ngram_split[0:-1]))
            drop_index.add(" ".join(ngram_split[1:]))
        return drop_index


class TopicDetector(object):

    def __init__(self, get_text, stop_words="english", tfidf_treshold=0.95, max_ngram=4, filter_words=None):
        assert callable(get_text), "Expected get_text to be a callable"
        assert max_ngram >= 2, "Expected max_ngram to be at least 2"
        assert isinstance(stop_words, (list, str)), \
            "Expected stop_words to be passed to sklearn but got a {}".format(type(stop_words))
        assert 0 < tfidf_treshold < 1, "Expected tfidf_treshold to be between 0 and 1"
        filter_words = filter_words or []
        assert  isinstance(filter_words, list), "Expected filter_words to be a list of words"

        self.get_text = get_text
        self.stop_words = stop_words
        self.tfidf_treshold = tfidf_treshold
        self.max_ngram = max_ngram
        self.filter_words = filter_words
        self.sorted_ngrams = {}

    def run(self, inputs, limit_per_ngram=10):

        # Generate ngrams out of texts
        texts = [self.get_text(inp) for inp in inputs if self.get_text(inp)]
        for ix in range(1, self.max_ngram+1):
            self.sorted_ngrams[ix] = self.get_words(texts, ix, self.filter_words)

        # Here we iterate backwards over the ngrams
        # Trigrams occuring inside tetragrams should be dropped and all bigrams in trigrams etc.
        drop_index = set()
        for ix in range(self.max_ngram, 1, -1):
            drop_index = self._get_drop_index(self.sorted_ngrams[ix].index, drop_index)
            self.sorted_ngrams[ix - 1].drop(labels=drop_index, inplace=True, errors="ignore")

        # Output a dictionary of results
        results = []
        for ix, serie in self.sorted_ngrams.items():
            results += [
                (topic, len(topic.split(" ")), importance)
                for topic, importance in serie[:limit_per_ngram].items()
            ]
        results.sort(key=lambda result: (result[1], result[2],), reverse=True)
        return [
            [topic, importance]
            for topic, word_count, importance in
            results
        ]

    def get_words(self, texts, ngram, filter_features):
        vectorizer = TfidfVectorizer(
            stop_words=self.stop_words,
            ngram_range=(ngram, ngram)
        )
        words_matrix = vectorizer.fit_transform(texts)
        tfidf_words_matrix = words_matrix.sum(axis=0)
        tfidf_words = tfidf_words_matrix.tolist()[0]
        feature_names = vectorizer.get_feature_names()

        filtered_indices = set()
        # Remove all numeric features
        if ngram == 1:
            for ix, feature in enumerate(feature_names):
                if not feature.isalpha():
                    filtered_indices.add(ix)
        # Remove features that are in specified list
        for ix, feature in enumerate(feature_names):
            for filter_feature in filter_features:
                if filter_feature in feature:
                    filtered_indices.add(ix)

        words_data = dict(
            zip(
                (feature for ix, feature in enumerate(feature_names) if ix not in filtered_indices),
                (tfidf for ix, tfidf in enumerate(tfidf_words) if ix not in filtered_indices)
            )
        )
        series = pd.Series(words_data)
        if not len(series):
            return series

        series.sort_values(ascending=False, inplace=True)
        cut_off = math.floor(len(series) * 0.05)
        return series[:cut_off]

    def _get_drop_index(self, ngram_series, ngram_history):
        drop_index = set()
        for ngram in chain(ngram_series, ngram_history):
            ngram_split = ngram.split(" ")
            drop_index.add(" ".join(ngram_split[0:-1]))
            drop_index.add(" ".join(ngram_split[1:]))
        return drop_index
