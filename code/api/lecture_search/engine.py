import logging
import metapy
from summarizer.extractive import ExtractiveSummarizer


class Engine:
    AWS_PATH = "https://cs410videostorage.s3.amazonaws.com/"

    def __init__(self, corpus):
        # make extensible?
        self.corpus = corpus
        self.config_path = "corpora/" + self.corpus + "/" + self.corpus + "-config.toml"
        self.index = metapy.index.make_inverted_index(self.config_path)
        self.num_docs = self.index.num_docs()
        self.unique_terms = self.index.unique_terms()
        self.avg_doc_length = self.index.avg_doc_length()
        self.total_corpus_terms = self.index.total_corpus_terms()

        logging.info(
            "[{}] corpus created: {}".format(self.corpus, self.__corpus_info())
        )

    def query_corpus(self, query_txt, max_results):

        query_info = {"search": query_txt, "max_results": max_results}
        logging.info("[{}] querying index: {}".format(self.corpus, query_info))

        query = metapy.index.Document()
        query.content(query_txt.strip())
        results = self.__ranker().score(self.index, query, max_results)

        logging.info("[{}] results found: {}".format(self.corpus, len(results)))

        search_results = []
        for i, result in enumerate(results):
            doc_id, score = result
            metadata = self.index.metadata(doc_id)
            video_id = metadata.get("video_id")
            file_identifier = metadata.get("AWS_file")
            txt_path = "{}{}.txt".format("corpora/lectures/", video_id)
            with open(txt_path, encoding='utf-8') as file:
                full_text = file.read()

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
                "10_start_time": metadata.get("start_time"),
                "11_summary": self.__summary(full_text, query_txt),
            }
            search_results.append(search_result)

        output_dict = {
            "query": query_txt,
            "corpus": self.corpus,
            "results": search_results,
        }

        return output_dict

    def __ranker(self):
        logging.info("[{}] ranker created".format(self.corpus))
        return metapy.index.OkapiBM25(k1=50, b=0, k3=0)

    def __summary(self, full_text, query_txt):
        summarizer = ExtractiveSummarizer(full_text)
        return summarizer.extractive_summary(
            num_sentences=2, highlight_query=query_txt.split()
        )
        pass

    def __corpus_info(self):
        return {
            "num_docs": self.num_docs,
            "unique_terms": self.unique_terms,
            "avg_doc_length": self.avg_doc_length,
            "total_corpus_terms": self.total_corpus_terms,
        }
