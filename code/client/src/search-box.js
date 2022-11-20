import React from "react";
import { DownloadBar } from "./download-bar";
import { TextBox } from "./text-box";
import { ResponsivePlayer } from "./player";

export class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      results: [],
      query: "",
      resultLoaded: false,
      currentResult: null,
      previousResult: null,
      nextResult: null,
      currentVideo: "",
      currentText: "",
      currentDisplayText: "",
      currentPDF: "",

    };
  }
  getAPI(query) {
    this.setState({
      query: query,
    })
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
      )
  }
    
  

  loadResult(results, index) {
    
    this.setState({
      resultLoaded: true,
      currentResult: results[index],
      currentVideo: results[index]["05_vid_path"],
      currentText: results[index]["06_txt_path"],
      currentPDF: results[index]["07_pdf_path"],
    });
    const text_file = results[index]["06_txt_path"].split("/").pop()
    const client_texts_path = 'http://localhost:3000/texts/'
    fetch(client_texts_path + text_file)
    .then((res) => {
      return res.text()
    })
    .then(
      (output) => {
      this.setState({
        currentDisplayText: output,
      });
      },
      (error) => {
        console.log(error)
      }
    );
  }

  render() {
    const { error, isLoaded, results, query, resultLoaded, currentVideo, currentText, currentPDF, currentDisplayText } = this.state;
    console.log(results);
    if (error) {
      return <div>Error: {error.message}</div>;
    }
    if (!isLoaded) {
      return (
        <div className="container mx-auto flex flex-row mb-3">
        <input
          id="query"
          className="container w-2/3 px-10 mr-2 focus:outline-2 outline-orange-300 bg-orange-100 rounded text-sm text-gray-500"
          type="text"
          placeholder="Search query..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              this.getAPI(document.getElementById("query").value);
            }
          }}
        />
        <button
          onClick={() => this.getAPI(document.getElementById("query").value)}
          className="container w-1/3 h-10 hover:bg-orange-600 bg-orange-300 text-orange-900 hover:text-white rounded text-sm"
        >
          Search Class Content
        </button>
        </div>
      )
    }
    if (results.length === 0 && isLoaded) { // Search button clicked but no results
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
                this.getAPI(document.getElementById("query").value);
              }
            }}
          />
          <button
            onClick={() => this.getAPI(document.getElementById("query").value)}
            className="container w-1/3 h-10 hover:bg-orange-600 bg-orange-300 text-orange-900 hover:text-white rounded text-sm"
          >
            Search Class Content
          </button>
          </div>
          <div className="container mx-auto text-orange-900 text-sm">No relevant content found for "{query}". Please try another query. </div>
        </div>

      ) 
    }
    if (resultLoaded) {
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
                this.getAPI(document.getElementById("query").value);
              }
            }}
          />
          <button
            onClick={() => this.getAPI(document.getElementById("query").value)}
            className="container w-1/3 h-10 hover:bg-orange-600 bg-orange-300 text-orange-900 hover:text-white rounded text-sm"
          >
            Search Class Content
          </button>
          </div>
          <div className="container mx-auto max-h-80 overflow-x-auto mb-3"> 
          {results.map((result, index) => (
            <div key={index} className="button flex flex-col hover:bg-orange-50 rounded p-3 object-fit">
            <a id="pointer"
              onClick={() => this.loadResult(results, index)}
              className="hover:underline text-sky-400 visited:text-indigo-800"
            >
              {result["04_title"]}
            </a>
            <span className="text-gray-500">{result["06_txt_path"]}</span>
          </div>
          ))}
          </div>
            <div className="flex flex-row w-full">
            <div className="container w-1/3"></div>
            <div className="container mx-auto w-full">
              <ResponsivePlayer video={currentVideo} />
              <DownloadBar video={currentVideo} pdf={currentPDF} text={currentText} />
            </div>
            <div className="container w-1/3"></div>
          </div>
          <TextBox text={currentDisplayText}/>
        </div>
      )
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
                this.getAPI(document.getElementById("query").value);
              }
            }}
          />
          <button
            onClick={() => this.getAPI(document.getElementById("query").value)}
            className="container w-1/3 h-10 hover:bg-orange-600 bg-orange-300 text-orange-900 hover:text-white rounded text-sm"
          >
            Search Class Content
          </button>
        </div>
        <div className="container mx-auto max-h-80 overflow-x-auto mb-3"> 
          {results.map((result, index) => (
            <div key={index} className="button flex flex-col hover:bg-orange-50 rounded p-3 object-fit">
            <a id="pointer"
              onClick={() => this.loadResult(results, index)}
              className="hover:cursor-pointer hover:underline text-sky-400 visited:text-indigo-800"
            >
              {result["04_title"]}
            </a>
            <span className="text-gray-500">{result["06_txt_path"]}</span>
          </div>
          ))}
        </div>
      </div>
    );
  }
}
