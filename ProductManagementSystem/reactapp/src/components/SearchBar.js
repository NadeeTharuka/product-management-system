import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form className="d-flex mb-4" onSubmit={handleSubmit}>
      <input 
        className="form-control me-2" 
        type="search" 
        placeholder="Search products..." 
        aria-label="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="btn btn-outline-success" type="submit">Search</button>
    </form>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired
};

export default SearchBar;