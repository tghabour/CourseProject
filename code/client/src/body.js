import { DownloadBar } from "./download-bar";
import { TextBox } from "./text-box";
import { VideoPlayer } from "./video-player";
import { SearchBox } from "./search-box";

export const Body = () => {
  return (
    <div className="">
      <SearchBox />
      <div className="flex flex-row w-full">
        <div className="container w-1/3"></div>
        <div className="container mx-auto w-full">
          <VideoPlayer />
          <DownloadBar />
        </div>
        <div className="container w-1/3"></div>
      </div>
      <TextBox />
    </div>
  );
};
