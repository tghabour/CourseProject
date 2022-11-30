import React from "react";
import { SearchResults } from "./search_results";

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
        {isLoaded && results.length === 0 ? (
          this.showNoResults()
        ) : (
          <SearchResults results={results} />
        )}
      </div>
    );
  }
}
