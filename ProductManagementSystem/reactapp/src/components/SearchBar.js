import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="search-bar">
      <h5 className="mb-3">
        <i className="bi bi-search me-2"></i> Search Products
      </h5>
      <form className="d-flex" onSubmit={handleSubmit}>
        <input 
          className="form-control me-2" 
          type="search" 
          placeholder="Search products..." 
          aria-label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          <i className="bi bi-search"></i>
        </button>
      </form>
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired
};

export default SearchBar;