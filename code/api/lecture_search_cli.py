# import argparse
from pprint import pprint
from lecture_search import engine

query_txt = str(input("Enter search query: "))
corpus = str(input("Enter corpus [lectures]: ")) or 'lectures'
max_results = int(str(input("Enter number of search results [5]: ")) or 5)
print()

search_engine = engine.Engine(corpus)


output = search_engine.query_corpus(query_txt, max_results)

print("RESULT: ")
pprint(output)
