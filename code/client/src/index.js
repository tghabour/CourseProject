import React from 'react';
import ReactDOM from 'react-dom/client';
import { ResponsivePlayer } from './player';
import {Header} from "./header"
import "./css/main.css"
import {LeftNav, SearchButton, SearchResults, VideoPlayer} from "./body"
import {Footer} from "./footer"



const header = ReactDOM.createRoot(document.getElementById('header'));
header.render(
  <React.StrictMode>
  <Header />
  </React.StrictMode>
)
const left_nav = ReactDOM.createRoot(document.getElementById('left-nav'));
left_nav.render(
  <React.StrictMode>
  <LeftNav />
  </React.StrictMode>
)

const search_button = ReactDOM.createRoot(document.getElementById('search-button'));
search_button.render(
  <React.StrictMode>
  <SearchButton />
  </React.StrictMode>
)

const search_results = ReactDOM.createRoot(document.getElementById('search-results'));
search_results.render(
  <React.StrictMode>
  <SearchResults />
  </React.StrictMode>
)

const player = ReactDOM.createRoot(document.getElementById('video-player'));
player.render(
  <React.StrictMode>
  <ResponsivePlayer />
  </React.StrictMode>
)


const footer = ReactDOM.createRoot(document.getElementById('footer'));
footer.render(
  <React.StrictMode>
  <Footer />
  </React.StrictMode>
)




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals()
