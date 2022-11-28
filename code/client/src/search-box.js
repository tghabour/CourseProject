import React from "react";
import { TextBox } from "./text-box";
import { ResponsivePlayer } from "./player";
import { DownloadButton } from "./download-button";
import { NavButton } from "./nav-button";

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
              <NavButton label="Previous" handleClick={() => this.loadResult(results, previousResultIndex)}/>
              <DownloadButton label="MP4" url={currentVideo}/>
              <DownloadButton label="PDF" url={currentPDF}/>
              <DownloadButton label="Text" url={currentText}/>
              <NavButton label="Next" handleClick={() => this.loadResult(results, nextResultIndex)}/>
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
