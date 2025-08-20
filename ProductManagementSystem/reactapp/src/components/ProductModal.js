import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useCart } from '../hooks/useCart';

const ProductModal = ({ product, show, onHide }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity
    });
    onHide();
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<i key={i} className="bi bi-star-fill text-warning"></i>);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<i key={i} className="bi bi-star-half text-warning"></i>);
      } else {
        stars.push(<i key={i} className="bi bi-star text-warning"></i>);
      }
    }
    
    return stars;
  };

  return (
    <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{product.title}</h5>
            <button type="button" className="btn-close" onClick={onHide}></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-5">
                <img 
                  src={product.image} 
                  className="img-fluid" 
                  alt={product.title} 
                />
              </div>
              <div className="col-md-7">
                <h4>${product.price.toFixed(2)}</h4>
                <p className="text-muted">{product.category}</p>
                
                <div className="mb-3">
                  <div className="d-flex align-items-center">
                    <div className="me-2">
                      {renderStars(product.rating.rate)}
                    </div>
                    <span>{product.rating.rate} ({product.rating.count} reviews)</span>
                  </div>
                </div>
                
                <p>{product.description}</p>
                
                <div className="d-flex align-items-center mb-3">
                  <label className="me-2">Quantity:</label>
                  <div className="input-group" style={{ width: '120px' }}>
                    <button 
                      className="btn btn-outline-secondary" 
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </button>
                    <input 
                      type="text" 
                      className="form-control text-center" 
                      value={quantity} 
                      readOnly 
                    />
                    <button 
                      className="btn btn-outline-secondary" 
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onHide}>Close</button>
            <button type="button" className="btn btn-primary" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductModal.propTypes = {
  product: PropTypes.object,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired
};

export default ProductModal;