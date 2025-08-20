import React from 'react';
import PropTypes from 'prop-types';

const FilterBar = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="filter-bar mb-4">
      <div className="d-flex flex-wrap">
        <button 
          className={`btn me-2 mb-2 ${selectedCategory === '' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => onCategoryChange('')}
        >
          All
        </button>
        {categories.map(category => (
          <button 
            key={category}
            className={`btn me-2 mb-2 ${selectedCategory === category ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => onCategoryChange(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

FilterBar.propTypes = {
  categories: PropTypes.array.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired
};

export default FilterBar;