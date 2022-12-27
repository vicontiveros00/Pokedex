import React, { useState } from "react";
import { Link } from "react-router-dom";
import './SearchBar.css';

function SearchBar() {
    const [ searchTerm, setSearchTerm ] = useState('');
    return (
        <div className="searchbar">
            <input 
                type="text"
                placeholder="Search by name or dex number"
                size="28"
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                }}
                value={searchTerm}
            />
            <Link to={`/pokemon/${searchTerm}`}>
                <button>
                    Search
                    <img src="https://www.pngitem.com/pimgs/m/163-1634065_master-ball-sprite-png-png-download-pokeball-pixel.png" />
                </button>
            </Link>
        </div>
    )
}

export default SearchBar;