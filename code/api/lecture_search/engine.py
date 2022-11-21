# import argparse
import os
import metapy
import requests
import math # for math.floor
from pprint import pprint


class Engine:
    LECTURES_PATH = "corpora/lectures/"
    CONFIG_PATH = LECTURES_PATH + "lectures-config.toml"
    AWS_PATH = "https://cs410videostorage.s3.amazonaws.com/"

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
            txt_path = "{}{}.txt".format(self.LECTURES_PATH, video_id)
            with open(txt_path) as file:
                full_text = file.read()
            # This is a stub. Generate some plausible and consistent data
            if metadata.get("start_time") != None:
                start_time = metadata.get("start_time")
            else:
                start_time = math.floor(score * 10)

            search_result = {
                "03_video_id": video_id,
                "01_doc_id": doc_id,
                "02_score": float("{:.3f}".format(score)),
                "00_rank": i + 1,
                "04_title": metadata.get("title"),
                "05_vid_path": "{0}{1}.mp4".format(self.AWS_PATH, file_identifier),
                "06_txt_path": "{0}{1}.txt".format(self.AWS_PATH, file_identifier),
                "07_pdf_path": "{0}{1}.pdf".format(self.AWS_PATH, file_identifier),
                "08_full_txt": full_text,
                "09_section_txt": metadata.get("content"),
                "10_start_time": start_time
            }
            search_results.append(search_result)

        output_dict = {
            "query": query_txt,
            "corpus": "CS410_lectures",  # make extensible?
            "results": search_results,
        }

        return output_dict
