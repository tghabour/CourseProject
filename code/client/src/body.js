import React from 'react';


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
        <div>
            <button>Search</button>
            <input placeholder='any keyword...'></input>
        </div>
    )
}
export function SearchResults() {
    return (
        <div>
            <p>Search Results</p>
            <ul>
                <li>Result 1</li>
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
            <p>Video Player</p>
        </div>
    )
}

export function MainBody() {
    return (
        <div className='body-main-body'>
            <SearchButton />
            <SearchResults />
            <VideoPlayer />
        </div>
    )
}

