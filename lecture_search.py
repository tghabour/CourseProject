# import argparse
import os
import metapy
from pprint import pprint

path = "./corpora/lectures/"
config_path = os.path.join(path, "lectures-config.toml")

idx = metapy.index.make_inverted_index(config_path)  # make extensible?

a = idx.num_docs()  # number of documents
b = idx.unique_terms()  # number of unique terms in the dataset
c = idx.avg_doc_length()  # average document length
d = idx.total_corpus_terms()  # total number of terms

print()
print("Corpus created...", "\n")
print("Number of documents: " + str(a), "\n")
print("Number of unique terms in the dataset: " + str(b), "\n")
print("Average document length: " + str(c), "\n")
print("Total number of terms: " + str(d), "\n")

max_results = 5  # make extensible?
query_txt = str(input("Enter CS410 search query: "))
print()


def query_corpus(query_txt, max_results):

    query = metapy.index.Document()
    query.content(query_txt.strip())

    ranker = metapy.index.OkapiBM25(k1=50, b=0, k3=0)

    results = ranker.score(idx, query, max_results)

    results_dict = [
        {
            "03_video_id": idx.metadata(x[0]).get("file")[:7],
            "01_doc_id": x[0],
            "02_score": float("{:.3f}".format(x[1])),
            "00_rank": i + 1,
            "04_title": idx.metadata(x[0]).get("title"),
            "05_vid_path": "path/to/"
            + idx.metadata(x[0]).get("file")[:7]
            + ".mp4",  # placeholder
            "06_txt_path": "path/to/"
            + idx.metadata(x[0]).get("file")[:7]
            + ".txt",  # placeholder
        }
        for i, x in enumerate(results)
    ]

    output_dict = {
        "query": query_txt,
        "corpus": "CS410_lectures",  # make extensible?
        "results": results_dict,
    }

    return output_dict


output = query_corpus(query_txt, max_results)

print("RESULT: ")
pprint(output)
