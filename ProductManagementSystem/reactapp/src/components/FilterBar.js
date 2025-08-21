import React from 'react';
import PropTypes from 'prop-types';

const FilterBar = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="filter-bar">
      <h5 className="mb-3">
        <i className="bi bi-funnel me-2"></i> Filter by Category
      </h5>
      <div className="d-flex flex-wrap">
        <button 
          className={`btn me-2 mb-2 ${selectedCategory === '' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => onCategoryChange('')}
        >
          <i className="bi bi-grid me-1"></i> All Products
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