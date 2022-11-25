from django.test import SimpleTestCase
from summarizer.extractive import ExtractiveSummarizer


class ExtractiveSummarizerTest(SimpleTestCase):
    def test_summary(self):
        with open("summarizer/test_data/article1.txt") as file:
            text = file.read()
        summarizer = ExtractiveSummarizer(text)
        result = summarizer.extractive_summary(num_sentences=4)
        self.assertIsNotNone(result)
        expected_summary = 'Focus areas of the time included research on rule-based parsing (e.g., the development of HPSG as a computational operationalization of generative grammar), morphology (e.g., two-level morphology), semantics (e.g., Lesk algorithm), reference (e.g., within Centering Theory) and other areas of natural language understanding (e.g., in the Rhetorical Structure Theory). Despite the popularity of machine learning in NLP research, symbolic methods are still (2020) commonly used: when the amount of training data is insufficient to successfully apply machine learning methods, e.g., for the machine translation of low-resource languages such as provided by the Apertium system, for preprocessing in NLP pipelines, e.g., tokenization, or for postprocessing and transforming the output of NLP pipelines, e.g., for knowledge extraction from syntactic parses. The process of reducing inflected (or sometimes derived) words to a base form (e.g., "close" will be the root for "closed", "closing", "close", "closer" etc.). English has fairly simple morphology, especially inflectional morphology, and thus it is often possible to ignore this task entirely and simply model all possible forms of a word (e.g., "open, opens, opened, opening") as separate words.'
        self.assertEqual(expected_summary, result)

    def test_summary_highlighting(self):
        with open("summarizer/test_data/article1.txt") as file:
            text = file.read()
        summarizer = ExtractiveSummarizer(text)
        result = summarizer.extractive_summary(
            num_sentences=4, highlight_query=["text", "information"]
        )
        self.assertIsNotNone(result)
        expected_summary = "Given a piece of <span class='highlight'>text</span> (typically a sentence), produce a formal representation of its semantics, either as a graph (e.g., in AMR parsing) or in accordance with a logical formalism (e.g., in DRT parsing). One task is discourse parsing, i.e., identifying the discourse structure of a connected <span class='highlight'>text</span>, i.e. the nature of the discourse relationships between sentences (e.g. elaboration, explanation, contrast). Given a stream of <span class='highlight'>text</span>, determine which items in the <span class='highlight'>text</span> map to proper names, such as people or places, and what the type of each such name is (e.g. person, location, organization). Assign relative measures of meaning to a word, phrase, sentence or piece of <span class='highlight'>text</span> based on the <span class='highlight'>information</span> presented before and after the piece of <span class='highlight'>text</span> being analyzed, e.g., by means of a probabilistic con<span class='highlight'>text</span>-free grammar (PCFG)."
        self.assertEqual(expected_summary, result)
