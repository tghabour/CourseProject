import React from 'react';
import {ResponsivePlayer} from "./player"


export function LeftNav() {
    return (
        <div>
            <h3>Table of Contents</h3>
            <ul>
                <li>Week 1</li>
                <li>Week 2</li>
                <li>Week 3</li>
                <li>Week 4</li>
                <li>Week 5</li>
                <li>Week 6</li>
                <li>Week 7</li>
                <li>Week 8</li>
                <li>Week 9</li>
                <li>Week 10</li>
            </ul>
        </div>
    )
}
export function SearchButton() {
    return (
        <div className='container mx-auto flex flex-row'>
            <input className='container w-2/3 px-10 mr-2 focus:outline-2 outline-orange-300 bg-orange-100 rounded text-sm text-orange-900' type="text" placeholder="Search query..." />
            <button class="container w-1/3 h-10 hover:bg-orange-600 bg-orange-300 text-orange-900 hover:text-white rounded text-sm">
                Search Class Content
            </button>

        </div>

    )
}
export function SearchResults() {
    return (
        <div className='container mx-auto my-5  text-orange-900'>
            <div>
                <p>Search Results</p>
            </div>

            <ul>
                <li>Resuasdasdasdasda asd asd asd asd asd asd asd asd as sasdadasdasasdas ads asda sdsa lt 1</li>
                <li>Result 2</li>
                <li>Result 3</li>
                <li>Result 4</li>
                <li>Result 5</li>
            </ul>
        </div>
    )
}
export function VideoPlayer() {

    return (
        <div>
            <ResponsivePlayer />
        </div>
    )
}

export function MainBody() {
    return (
        <div className='body-main-body'>
            <SearchButton />
            <SearchResults />
            <div className='flex flex-row w-full'>
                <div className='container w-1/3'></div>
                <div className='container mx-auto w-full'>
                <VideoPlayer />
                </div>
                <div className='container w-1/3'></div>
            </div>

        </div>
    )
}

