from django.test import SimpleTestCase
from django.test import Client
from lecture_search import engine

class EngineTest(SimpleTestCase):

    def test_query_corpus(self):
        search_engine = engine.Engine()
        result = search_engine.query_corpus('test', 5)
        self.assertIsNotNone(result)
        self.assertIn('results', result)
        self.assertIn('corpus', result)
        self.assertIn('query', result)
        self.assertEqual('test', result['query'])