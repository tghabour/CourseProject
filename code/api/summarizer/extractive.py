from heapq import nlargest
import re
import spacy

NLP = spacy.load("en_core_web_sm")


class ExtractiveSummarizer:
    """
    Creates an extractive summary of the input text by finding the
    top n sentences with the most frequent words in the document.
    """

    def __init__(self, text):
        self.text = text
        self.doc = NLP(self.text)

    def extractive_summary(self, num_sentences=4, highlight_query=None):
        """
        Creates an extractive summary of the input text by finding the
        top n sentences with the most frequent words in the document.
        If the highlight_query parameter is provided, then only sentences
        that include the words in the param are included. In addition,
        occurrences of the words in the param are wrapped in html span tags
        with class="highlight".

        Returns:
            string: summary of text with highlighting of query params
        """
        sentences = self.__sentences()
        unigrams = self.__unigrams()
        sentence_scores = self.__sentence_scores(sentences, highlight_query, unigrams)
        top_results = nlargest(num_sentences, sentence_scores, key=sentence_scores.get)
        original_sentences = list(self.doc.sents)
        top_sentences = [original_sentences[i] for i in top_results]
        return self.__format_result(top_sentences, highlight_query)

    def __format_result(self, top_sentences, highlight_query):
        """
        Formats the top ranked original sentences from the doc.
        If the highlight_query parameter is provided, then only sentences
        that include the words in the param are included. In addition,
        occurrences of the words in the param are wrapped in html span tags
        with class="highlight".

        Args:
            top_sentences (list): top ranked original sentences from the doc.
            highlight_query (list): list of query terms to highlight

        Returns:
            string: The formatted summary
        """
        formatted_sentences = []
        for sentence in top_sentences:
            formatted_sentence = sentence.text.strip()
            if highlight_query is None:
                formatted_sentences.append(formatted_sentence)
                continue

            for token in highlight_query:
                pattern = r"({})".format(token)
                replacement = r"<span class='highlight'>\1</span>"
                formatted_sentence = re.sub(pattern, replacement, formatted_sentence)

            formatted_sentences.append(formatted_sentence)
        formatted_summary = " ".join(formatted_sentences)
        # remove extra spaces between words
        return " ".join(formatted_summary.split())

    def __sentence_scores(self, sentences, highlight_query, unigrams):
        """
        Generates a dictionary of sentence scores based on the
        unigram frequencies and highlight_query. If the highlight_query
        is provided, then the sentences that don't contain the highlight_query
        terms are given a minimum score. Otherwise, the sentence is given
        a normalized score based on the number of tokens in the sentence
        with the highest token frequency in the doc, provided by the unigrams
        parameter.

        Args:
            sentences (list): list of tokenized sentences
            highlight_query (list): list of query terms to filter the sentences by
            unigrams (dict): a dictionary of token in the doc, with frequencies.

        Returns:
            dict: Keys are indexes of the sentences within the sentences parameter.
                Values are the normalized scores of the sentences.
        """

        if highlight_query:
            query_doc = NLP(" ".join(highlight_query))
            query_terms = [
                token.lemma_.lower() for token in query_doc if not token.is_stop
            ]

        # calculate a score for each sentence in the doc
        sentence_scores = {}
        for i, sentence in enumerate(sentences):
            if highlight_query:
                # skip sentences that do not contain the query terms
                found = [term for term in query_terms if term in sentence]
                if not found:
                    sentence_scores[i] = 0.00001
                    continue

            for word in sentence:
                word_score = unigrams.get(word, 0)
                if word_score == 0:
                    continue
                if i in sentence_scores:
                    sentence_scores[i] += word_score
                else:
                    sentence_scores[i] = word_score

        # normalize scores
        max_score = max(sentence_scores.values())
        return {key: (score / max_score) for key, score in sentence_scores.items()}

    def __unigrams(self):
        """
        Words frequencies from the doc. Stopwords removed and words lemmatized

        Returns:
            dict: Keys are lemmatized and filtered unigrams from the doc. Values
                are frequencies of the tokens within the doc.
        """
        unigrams = {}
        for token in self.doc:
            if token.is_stop:
                continue
            lemma = token.lemma_.lower()
            if lemma in unigrams:
                unigrams[lemma] += 1
            else:
                unigrams[lemma] = 1
        return unigrams

    def __sentences(self):
        """
        Create a two dimension list representing the processed
        words in each sentence in the doc. Stopwords are removed
        and words are lemmatized

        Returns:
            list: two dimensional list of processed sentences with tokenized words
        """
        sentences = []
        for sent in self.doc.sents:
            sentences.append([])
            for token in sent:
                if token.is_stop:
                    continue
                sentences[-1].append(token.lemma_.lower())
        return sentences
