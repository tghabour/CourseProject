import React from "react";
import { TextBox } from "./text-box";
import { ResponsivePlayer } from "./player";

const processText = (text) => {
  // Function to remove [Sound] and [Music] tags from text, then only get 500 first characters
  let output = "";
  output = text.slice(0, 500) + " ...";
  output = output.replace(/\[SOUND\]/g, "");
  output = output.replace(/\[MUSIC\]/g, "");
  return output;
};

const getSearchTypeValue = () => {
  // Function to get the value of the search type radio button
  let searchType = document.getElementsByName("search-type");
  for (let i = 0; i < searchType.length; i++) {
    if (searchType[i].checked) {
      return searchType[i].value;
    }
  }
};

const getMaxResultsValue = () => {
  // Function to get the value of the max results select option
  let maxResults = document.getElementById("search-max-results");
  return maxResults.options[maxResults.selectedIndex].value;
};

export class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      results: [],
      query: "",
      resultLoaded: false,
      currentResultIndex: null,
      previousResultIndex: null,
      nextResultIndex: null,
      currentVideo: "",
      currentText: "",
      currentDisplayText: "",
      currentPDF: "",
    };
  }
  searchAPI(query, corpus, max_results) {
    // Function to call the search API
    this.setState({
      query: query,
    });

    const url = `${process.env.REACT_APP_API_URL}?search=${query}&corpus=${corpus}&max_results=${max_results}`;

    fetch(url)
      .then((res) => res.json())
      .then(
        (output) => {
          console.log(
            `Query: '${query}', corpus: '${corpus}', max_results: '${max_results}' returned ${output.results.length} results`
          );
          this.setState({
            isLoaded: true,
            results: output.results,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  loadResult(results, index) {
    // Function to load a video and download links from the results
    const resultsLength = results.length;
    let prevIndex = index === 0 ? resultsLength - 1 : index - 1;
    let nextIndex = index === resultsLength - 1 ? 0 : index + 1;

    this.setState({
      resultLoaded: true,
      currentResultIndex: index,
      previousResultIndex: prevIndex,
      nextResultIndex: nextIndex,
      currentVideo:
        results[index]["05_vid_path"] + `#t=${results[index]["10_start_time"]}`,
      currentText: results[index]["06_txt_path"],
      currentPDF: results[index]["07_pdf_path"],
      currentDisplayText: results[index]["08_full_txt"],
    });
  }

  showResults() {
    const { results, resultLoaded } = this.state;
    return (
      <>
        <div className="container mx-auto max-h-80 overflow-x-auto mb-3">
          {results.map((result, index) => (
            <div
              key={index}
              className="button flex flex-col hover:bg-orange-50 rounded p-3 object-fit"
            >
              <a
                id="pointer"
                onClick={() => this.loadResult(results, index)}
                className="hover:underline text-sky-400 visited:text-indigo-800"
              >
                {result["04_title"]}
              </a>
              <span className="text-gray-500">
                {processText(result["08_full_txt"])}
              </span>
            </div>
          ))}
        </div>
        {resultLoaded && this.showResultDetails()}
      </>
    );
  }

  showResultDetails() {
    const {
      results,
      previousResultIndex,
      nextResultIndex,
      currentVideo,
      currentText,
      currentPDF,
      currentDisplayText,
    } = this.state;
    return (
      <>
        <div className="flex flex-row w-full">
          <div className="container w-1/3"></div>
          <div className="container mx-auto w-full">
            <ResponsivePlayer video={currentVideo} />
            <div className=" text-center my-auto ">
              <a
                id="pointer"
                onClick={() => this.loadResult(results, previousResultIndex)}
                className="pl-5 inline-flex w-20 hover:bg-orange-600 bg-orange-300 text-orange-900 hover:text-white text-xs p-1 rounded mr-4"
              >
                Previous
              </a>
              <a
                href={currentVideo}
                className="pl-5 inline-flex w-20 hover:bg-orange-600 bg-orange-300 text-orange-900 hover:text-white text-xs p-1 rounded mr-4"
              >
                MP4
                <span className="pl-1 pt-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-file-arrow-down"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 5a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5A.5.5 0 0 1 8 5z" />
                    <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
                  </svg>
                </span>
              </a>
              <a
                href={currentPDF}
                className="pl-5 inline-flex w-20 hover:bg-orange-600 bg-orange-300 text-orange-900 hover:text-white text-xs p-1 rounded mr-4"
              >
                PDF
                <span className="pl-1 pt-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-file-arrow-down"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 5a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5A.5.5 0 0 1 8 5z" />
                    <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
                  </svg>
                </span>
              </a>
              <a
                href={currentText}
                className="pl-5 inline-flex w-20 hover:bg-orange-600 bg-orange-300 text-orange-900 hover:text-white text-xs p-1 rounded mr-4"
              >
                Texts
                <span className="pl-1 pt-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-file-arrow-down"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 5a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5A.5.5 0 0 1 8 5z" />
                    <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
                  </svg>
                </span>
              </a>
              <a
                id="pointer"
                onClick={() => this.loadResult(results, nextResultIndex)}
                className="pl-5 inline-flex w-20 hover:bg-orange-600 bg-orange-300 text-orange-900 hover:text-white text-xs p-1 rounded mr-4"
              >
                Next
              </a>
            </div>
          </div>
          <div className="container w-1/3"></div>
        </div>
        <TextBox text={currentDisplayText} />
      </>
    );
  }

  showNoResults() {
    const { query } = this.state;
    return (
      <div className="container mx-auto text-orange-900 text-sm">
        No relevant content found for "{query}". Please try another query.{" "}
      </div>
    );
  }

  render() {
    const { error, isLoaded, results } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    }
    return (
      <div>
        <div className="container mx-auto flex flex-row mb-3">
          <input
            id="query"
            className="container w-2/3 px-10 mr-2 focus:outline-2 outline-orange-300 bg-orange-100 rounded text-sm text-gray-500"
            type="text"
            placeholder="Search query..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                this.searchAPI(
                  document.getElementById("query").value,
                  getSearchTypeValue(),
                  getMaxResultsValue()
                );
              }
            }}
          />
          <button
            onClick={() =>
              this.searchAPI(
                document.getElementById("query").value,
                getSearchTypeValue(),
                getMaxResultsValue()
              )
            }
            className="container w-1/3 h-10 hover:bg-orange-600 bg-orange-300 text-orange-900 hover:text-white rounded text-sm"
          >
            Search Class Content
          </button>
        </div>
        {isLoaded && results.length === 0
          ? this.showNoResults()
          : this.showResults()}
      </div>
    );
  }
}
