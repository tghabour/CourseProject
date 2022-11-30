/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { TextBox } from "./text-box";
import { ResponsivePlayer } from "./player";
import { DownloadButton } from "./download-button";
import { NavButton } from "./nav-button";

export class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  loadResult(index) {
    const { results } = this.props;
    // Function to load a video and download links from the results
    const resultsLength = results.length;
    let prevIndex = index === 0 ? resultsLength - 1 : index - 1;
    let nextIndex = index === resultsLength - 1 ? 0 : index + 1;
    const result = results[index];

    this.setState({
      resultLoaded: true,
      currentResultIndex: index,
      previousResultIndex: prevIndex,
      nextResultIndex: nextIndex,
      currentVideo: result["05_vid_path"] + `#t=${result["10_start_time"]}`,
      currentText: result["06_txt_path"],
      currentPDF: result["07_pdf_path"],
      currentDisplayText: result["08_full_txt"],
    });
  }

  processText(text) {
    // Function to remove [Sound] and [Music] tags from text, then only get 500 first characters
    let output = "";
    output = text.slice(0, 500) + " ...";
    output = output.replace(/\[SOUND\]/g, "");
    output = output.replace(/\[MUSIC\]/g, "");
    return output;
  }

  showResultDetails() {
    const {
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
              <NavButton
                label="Previous"
                handleClick={() => this.loadResult(previousResultIndex)}
              />
              <DownloadButton label="MP4" url={currentVideo} />
              <DownloadButton label="PDF" url={currentPDF} />
              <DownloadButton label="Text" url={currentText} />
              <NavButton
                label="Next"
                handleClick={() => this.loadResult(nextResultIndex)}
              />
            </div>
          </div>
          <div className="container w-1/3"></div>
        </div>
        <TextBox text={currentDisplayText} />
      </>
    );
  }

  render() {
    const { results } = this.props;
    const { resultLoaded } = this.state;
    return (
      <>
        <div className="container mx-auto max-h-80 overflow-x-auto mb-3">
          {results.map((result, index) => (
            <div
              key={index}
              className="button flex flex-col hover:bg-orange-50 rounded p-3 object-fit"
            >
              <a
                onClick={() => this.loadResult(index)}
                className="hover:underline text-sky-400 visited:text-indigo-800 cursor-pointer"
              >
                {result["04_title"]}
              </a>
              <span
                className="text-gray-500"
                dangerouslySetInnerHTML={{ __html: result["11_summary"] }}
              ></span>
            </div>
          ))}
        </div>
        {resultLoaded && this.showResultDetails()}
      </>
    );
  }
}
