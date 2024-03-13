// import React, { useState } from 'react';
// import './index.css'; // Import your CSS file

const SearchBar = ({ searchQuery, handleSearchChange, handleSearchClick }) => {
  return (
    <div className="searchBar-container">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-bar "
      />
      <button
        type="submit"
        className="search-button"
        onClick={handleSearchClick}
      >
        Search
      </button>{" "}
      {/* Apply search-button class */}
    </div>
  );
};

export default SearchBar;
