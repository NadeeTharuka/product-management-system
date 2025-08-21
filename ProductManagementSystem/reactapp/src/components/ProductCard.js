import React from 'react';
import PropTypes from 'prop-types';

const ProductCard = ({ product, onViewDetails }) => {
  return (
    <div className="card h-100 product-card">
      <div className="position-relative">
        <img 
          src={product.image} 
          className="card-img-top product-image" 
          alt={product.title} 
        />
        <div className="position-absolute top-0 end-0 p-2">
          <span className="badge bg-primary">
            {product.category}
          </span>
        </div>
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title product-title">{product.title}</h5>
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center">
            <span className="product-price">${product.price.toFixed(2)}</span>
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => onViewDetails(product)}
            >
              <i className="bi bi-eye me-1"></i> View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  onViewDetails: PropTypes.func.isRequired
};

export default ProductCard;