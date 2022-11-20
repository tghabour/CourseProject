import React from "react";
import { TextBox } from "./text-box";
import { ResponsivePlayer } from "./player";

export class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      results: [],
      texts: [],
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
          console.log(`Query: '${query}' returned ${output.results.length} results`);
          //console.log(output);
          this.setState({
            isLoaded: true,
            results: output.results,
            texts: []
          });
          for (const result of output.results) {
            const text_file = result["06_txt_path"].split("/").pop()
            const client_texts_path = 'http://localhost:3000/texts/'
            fetch(client_texts_path + text_file)
            .then(res => {return res.text()})
            .then(output => {
              this.setState({
                texts: [...this.state.texts, output.slice(0,500) + '...']
              })
            })
          }
          
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
    const results_len = results.length;
    let prev_index = index - 1;
    let next_index = index + 1;
    if (prev_index < 0) {
      prev_index = results_len - 1;
    }
    if (next_index >= results_len) {
      next_index = 0;
    }
    this.setState({
      resultLoaded: true,
      currentResultIndex: index,
      previousResultIndex: prev_index,
      nextResultIndex: next_index,
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
    const { error, isLoaded, results, query, resultLoaded, previousResultIndex, nextResultIndex, currentVideo, currentText, currentPDF, currentDisplayText, texts } = this.state;
    //console.log(texts)
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
            <span className="text-gray-500">{texts[index]}</span>
          </div>
          ))}
          </div>
            <div className="flex flex-row w-full">
            <div className="container w-1/3"></div>
            <div className="container mx-auto w-full">
              <ResponsivePlayer video={currentVideo} />
              <div className=" text-center my-auto ">
                <a onClick={()=>this.loadResult(results, previousResultIndex)} className="pl-5 inline-flex w-20 hover:bg-orange-600 bg-orange-300 text-orange-900 hover:text-white text-xs p-1 rounded mr-4">
                Previous
                </a>
                <a href={currentVideo} className="pl-5 inline-flex w-20 hover:bg-orange-600 bg-orange-300 text-orange-900 hover:text-white text-xs p-1 rounded mr-4">
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
                <a href={currentPDF} className="pl-5 inline-flex w-20 hover:bg-orange-600 bg-orange-300 text-orange-900 hover:text-white text-xs p-1 rounded mr-4">
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
                <a href={currentText} className="pl-5 inline-flex w-20 hover:bg-orange-600 bg-orange-300 text-orange-900 hover:text-white text-xs p-1 rounded mr-4">
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
                <a onClick={()=>this.loadResult(results, previousResultIndex)} className="pl-5 pt-5 inline-flex w-20 hover:bg-orange-600 bg-orange-300 text-orange-900 hover:text-white text-xs p-1 rounded mr-4">
                  Next
                </a>
              </div>
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
            <span className="text-gray-500">{texts[index]}</span>
          </div>
          ))}
        </div>
      </div>
    );
  }
}
