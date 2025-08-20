import React from 'react';
import PropTypes from 'prop-types';

const ProductCard = ({ product, onViewDetails }) => {
  return (
    <div className="card h-100 product-card">
      <img 
        src={product.image} 
        className="card-img-top product-image" 
        alt={product.title} 
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title product-title">{product.title}</h5>
        <p className="card-text text-muted product-category">{product.category}</p>
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center">
            <span className="product-price">${product.price.toFixed(2)}</span>
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => onViewDetails(product)}
            >
              View Details
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