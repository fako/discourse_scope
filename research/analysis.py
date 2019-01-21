from itertools import chain

import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer


class TopicDetector(object):

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
