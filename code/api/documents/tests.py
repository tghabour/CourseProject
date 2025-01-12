from django.test import SimpleTestCase
from django.test import Client


class DocumentTest(SimpleTestCase):
    def test_search(self):
        params = {"search": "text retrieval",
                  "corpus": "lectures",
                  "results": 5}
        response = self.client.get("/documents/", params)

        self.assertEqual(response.status_code, 200)
