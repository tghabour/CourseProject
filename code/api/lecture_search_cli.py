# import argparse
from pprint import pprint
from lecture_search import engine

max_results = 5  # make extensible?
query_txt = str(input("Enter CS410 search query: "))
print()

search_engine = engine.Engine()


output = search_engine.query_corpus(query_txt, max_results)

print("RESULT: ")
pprint(output)
