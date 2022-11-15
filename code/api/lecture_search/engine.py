# import argparse
import os
import metapy
from pprint import pprint


class Engine:
    CONFIG_PATH = "corpora/lectures/lectures-config.toml"

    def __init__(self):
        # make extensible?
        self.index = metapy.index.make_inverted_index(self.CONFIG_PATH)
        self.num_docs = self.index.num_docs()
        self.unique_terms = self.index.unique_terms()
        self.avg_doc_length = self.index.avg_doc_length()
        self.total_corpus_terms = self.index.total_corpus_terms()

        print(
            "[LectureSearch] corpus created: num_docs={} unique_terms={} avg_doc_length={} total_corpus_terms={}".format(
                self.num_docs,
                self.unique_terms,
                self.avg_doc_length,
                self.total_corpus_terms,
            )
        )
        self.ranker = metapy.index.OkapiBM25(k1=50, b=0, k3=0)
        print("[LectureSearch] ranker created")

    def query_corpus(self, query_txt, max_results):

        print(
            "[LectureSearch] querying index: search={} max_results={}".format(
                query_txt.strip(), max_results
            )
        )

        query = metapy.index.Document()
        query.content(query_txt.strip())
        results = self.ranker.score(self.index, query, max_results)

        print("[LectureSearch] results found: {}".format(len(results)))

        search_results = []
        for i, result in enumerate(results):
            doc_id, score = result
            metadata = self.index.metadata(doc_id)
            video_id = metadata.get("video_id")
            file_identifier = metadata.get("AWS_file")
            aws_path = "https://cs410videostorage.s3.amazonaws.com/"

            search_result = {
                "03_video_id": video_id,
                "01_doc_id": doc_id,
                "02_score": float("{:.3f}".format(score)),
                "00_rank": i + 1,
                "04_title": metadata.get("title"),
                "05_vid_path": "{0}{0}.mp4".format(aws_path, file_identifier),
                "06_txt_path": "{0}{0}.txt".format(aws_path, file_identifier),
                "07_pdf_path": "{0}{0}.pdf".format(aws_path, file_identifier),
            }
            search_results.append(search_result)

        output_dict = {
            "query": query_txt,
            "corpus": "CS410_lectures",  # make extensible?
            "results": search_results,
        }

        return output_dict
