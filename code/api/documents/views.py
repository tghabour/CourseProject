from django.http import JsonResponse
from lecture_search import engine


def index(request):

    query_params = request.GET

    search_engine = engine.Engine()

    docs = search_engine.query_corpus(query_params.get("search", ""), 5)

    return JsonResponse(docs)
