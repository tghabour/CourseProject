from django.test import SimpleTestCase
from lecture_search.engine import Engine


class EngineTest(SimpleTestCase):
    def test_query_corpus(self):
        corpus = "lectures"
        query = "test"
        max_results = 5
        search_engine = Engine(corpus)
        result = search_engine.query_corpus(query, max_results)
        self.assertIsNotNone(result)
        self.assertIn("results", result)
        self.assertIn("corpus", result)
        self.assertIn("query", result)
        self.assertEqual("test", result["query"])
        # TODO: summarizer not working because spacy won't install on MacOS
        # for search_result in result["results"]:
        #     self.assertIn("11_summary", search_result)
        # expected_summary = "So, the idea of the statistical significance <span class='highlight'>test</span> is basically to assess the variants across these different queries. So, in order to create the <span class='highlight'>test</span> collection, we have to create a set of queries."
        # self.assertEqual(expected_summary, result["results"][0]["11_summary"])
