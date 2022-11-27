import React from "react";

export function SearchOptions() {
return (
    <div className="container mx-auto flex flex-row mb-3  text-sm text-gray-500">
            <input id="search-lectures" className="ml-2 mr-2" type="Radio" value="lectures" name="search-type" defaultChecked={true} readOnly={true}/> 
            <span className="mr-2"> Search Lectures 
            </span>
            <input id="search-slides" className="ml-2 mr-2" type="Radio" value="cs-410" name="search-type" defaultChecked={false} readOnly={true}/> 
            <span className="mr-2"> Search Slides 
            </span>
            <label className="mr-2 ml-2">Search top </label>
            <select className="" id="search-max-results">
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
    </div>
)
}