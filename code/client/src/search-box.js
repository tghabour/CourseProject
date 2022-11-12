import React from "react";
import { Results } from "./results";

export class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      results: [],
    };
  }
  getAPI(query) {
    const API_URL =
      "https://sea-turtle-app-7y54u.ondigitalocean.app/documents/";
    //const API_URL = "http://localhost:8000/documents/"
    fetch(`${API_URL}?search=${query}`)
      .then((res) => res.json())
      .then(
        (output) => {
          console.log(query);
          console.log(output);
          this.setState({
            isLoaded: true,
            results: output.results,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }
  render() {
    const { error, isLoaded, results } = this.state;
    console.log(results);
    return (
      <div>
        <div className="container mx-auto flex flex-row mb-3">
          <input
            id="query"
            className="container w-2/3 px-10 mr-2 focus:outline-2 outline-orange-300 bg-orange-100 rounded text-sm text-gray-500"
            type="text"
            placeholder="Search query..."
          />
          <button
            onClick={() => this.getAPI(document.getElementById("query").value)}
            className="container w-1/3 h-10 hover:bg-orange-600 bg-orange-300 text-orange-900 hover:text-white rounded text-sm"
          >
            Search Class Content
          </button>
        </div>
        <Results results={results}></Results>
      </div>
    );
  }
}
