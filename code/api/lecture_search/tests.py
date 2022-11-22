from django.test import SimpleTestCase
from django.test import Client
from lecture_search import engine


class EngineTest(SimpleTestCase):
    def test_query_corpus(self):
        corpus = 'lectures'
        query = 'test'
        max_results = 5
        search_engine = engine.Engine(corpus)
        result = search_engine.query_corpus(query, max_results)
        self.assertIsNotNone(result)
        self.assertIn("results", result)
        self.assertIn("corpus", result)
        self.assertIn("query", result)
        self.assertEqual("test", result["query"])
