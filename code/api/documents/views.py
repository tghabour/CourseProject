from django.shortcuts import render
from django.http import JsonResponse
from lecture_search import engine


def index(request):

    query_params = request.GET

    search_engine = engine.Engine()

    docs = search_engine.query_corpus(query_params["search"], 5)

    return JsonResponse(docs)
