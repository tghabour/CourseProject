from django.shortcuts import render
from django.http import JsonResponse
import json


def index(request):
    # example search response
    docs = {
        "corpus": "CS410_lectures",
        "query": "bag of words",
        "results": [
            {
                "doc_id": 1,
                "path": "path/to/W01_L01.mp4",
                "rank": 1,
                "score": 19.434,
                "title": "Natural Language Content Analysis",
                "video_id": "W01_L01",
            }
        ],
    }
    return JsonResponse(docs)
