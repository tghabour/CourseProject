import os
from django.http import JsonResponse
from lecture_search import engine


def index(request):

    query_params = request.GET

    # TODO: Add bounds checking on inputs

    # "search" is the only mandatory parameter
    # Set defaults for any unset parameters
    if query_params.get("corpus", "") == "" or query_params.get("corpus", "") == None:
        corpus = "lectures"
    else:
        corpus = query_params.get("corpus", "")

    if query_params.get("max_results", "") == "" or query_params.get("max_results", "") == None:
        max_results = 5
    else:
        max_results = int(query_params.get("max_results", ""))

    # Build Engine for each corpus which exists
    search_engine = {}
    for i in os.scandir('corpora/'):
        if i.is_dir() and i.name[0] != '.':
            search_engine[i.name] = engine.Engine(i.name)

    if corpus in search_engine:
        docs = search_engine[corpus].query_corpus(query_params.get("search", ""), max_results)
    else:
        # No matching corpus
        docs = {
            "query": query_params.get("search", ""),
            "corpus": "Corpus not found",
            "results": [],
        }

    return JsonResponse(docs)
