from django.shortcuts import render
from django.http import JsonResponse
import json


def index(request):
    docs = {
        "data": [
            {
                "id": 1,
                "title": "Lecture 1 — Overview Text Mining and Analytics - Part 1",
                "video_url": "https://www.youtube.com/watch?v=Uqs0GewlMkQ",
            }
        ]
    }
    return JsonResponse(docs)
