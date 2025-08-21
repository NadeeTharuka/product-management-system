import React from 'react';
import PropTypes from 'prop-types';
import { useCart } from '../hooks/useCart';

const CartModal = ({ show, onHide }) => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  return (
    <div className={`offcanvas offcanvas-end ${show ? 'show' : ''}`} tabIndex="-1" style={{ visibility: show ? 'visible' : 'hidden' }}>
      <div className="offcanvas-header">
        <h5 className="offcanvas-title">
          <i className="bi bi-cart3 me-2"></i> Shopping Cart
        </h5>
        <button type="button" className="btn-close" onClick={onHide}></button>
      </div>
      <div className="offcanvas-body">
        {cartItems.length === 0 ? (
          <div className="text-center py-4">
            <i className="bi bi-cart-x fs-1 text-muted"></i>
            <p className="mt-3">Your cart is empty</p>
            <button className="btn btn-primary" onClick={onHide}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="card mb-3">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img src={item.image} className="img-fluid rounded-start p-2" alt={item.title} />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{item.title}</h5>
                        <p className="card-text">${item.price.toFixed(2)}</p>
                        <div className="d-flex align-items-center mb-2">
                          <button 
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <span className="mx-2">{item.quantity}</span>
                          <button 
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                          <button 
                            className="btn btn-sm btn-danger ms-auto"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                        <p className="card-text">
                          <strong>Total: ${(item.price * item.quantity).toFixed(2)}</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary mt-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>Total:</h4>
                <h4>${getTotalPrice().toFixed(2)}</h4>
              </div>
              <button className="btn btn-success w-100 mb-2">
                <i className="bi bi-credit-card me-1"></i> Checkout
              </button>
              <button className="btn btn-outline-primary w-100" onClick={onHide}>
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

CartModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired
};

export default CartModal;