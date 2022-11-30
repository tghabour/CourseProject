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
        for search_result in result["results"]:
            self.assertIn("11_summary", search_result)
        expected_summary = "Now in Willcoxan <span class='highlight'>test</span>, it's a non-parametric <span class='highlight'>test</span>, and we would be not only looking at the signs, we'll be also looking at the magnitude of the difference. So, the idea of the statistical significance <span class='highlight'>test</span> is basically to assess the variants across these different queries."
        self.assertEqual(expected_summary, result["results"][0]["11_summary"])
