# import argparse
from pprint import pprint
from lecture_search import engine

query_txt = str(input("Enter search query: "))

corpus = str(input("Enter corpus [lectures]: "))
if corpus == "":
    corpus = "lectures"

max_results = str(input("Enter number of search results [5]: "))
if max_results == "":
    max_results = 5
else:
    max_results = int(max_results)
print()

search_engine = engine.Engine(corpus)


output = search_engine.query_corpus(query_txt, max_results)

print("RESULT: ")
pprint(output)
