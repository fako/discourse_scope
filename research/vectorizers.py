from sklearn.feature_extraction.text import TfidfVectorizer
import spacy
from spacy_arguing_lexicon import ArguingLexiconParser


class ArguingLexiconVectorizer(TfidfVectorizer):

    @staticmethod
    def _process_doc(doc, lexicon_vocabulairy):
        text = ""
        for span, match in doc._.arguments.get_argument_spans_and_matches():
            if span.text in lexicon_vocabulairy:
                continue
            text += span.text + " "
        return text.strip()

    def fit(self, raw_documents, y=None):
        nlp = spacy.load("en_core_web_lg")
        parser = ArguingLexiconParser(lang=nlp.lang)
        lexicon_vocabulairy = parser.get_lexicon_vocabulairy()
        nlp.add_pipe(parser)
        super().fit(
            (self._process_doc(doc, lexicon_vocabulairy) for doc in nlp.pipe(raw_documents)),
            y=y
        )
