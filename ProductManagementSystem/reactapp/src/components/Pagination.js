import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    
    // Always show first page
    pageNumbers.push(
      <li key={1} className={`page-item ${currentPage === 1 ? 'active' : ''}`}>
        <button className="page-link" onClick={() => onPageChange(1)}>1</button>
      </li>
    );
    
    // Show ellipsis if needed
    if (currentPage > 3) {
      pageNumbers.push(
        <li key="start-ellipsis" className="page-item disabled">
          <span className="page-link">...</span>
        </li>
      );
    }
    
    // Calculate range of pages to show around current page
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(i)}>{i}</button>
        </li>
      );
    }
    
    // Show ellipsis if needed
    if (currentPage < totalPages - 2) {
      pageNumbers.push(
        <li key="end-ellipsis" className="page-item disabled">
          <span className="page-link">...</span>
        </li>
      );
    }
    
    // Always show last page if there's more than one page
    if (totalPages > 1) {
      pageNumbers.push(
        <li key={totalPages} className={`page-item ${currentPage === totalPages ? 'active' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(totalPages)}>{totalPages}</button>
        </li>
      );
    }
    
    return pageNumbers;
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button 
            className="page-link" 
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>
        {renderPageNumbers()}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button 
            className="page-link" 
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;