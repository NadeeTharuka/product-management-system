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
        <h5 className="offcanvas-title">Shopping Cart</h5>
        <button type="button" className="btn-close" onClick={onHide}></button>
      </div>
      <div className="offcanvas-body">
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="card mb-3">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img src={item.image} className="img-fluid rounded-start" alt={item.title} />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{item.title}</h5>
                        <p className="card-text">${item.price.toFixed(2)}</p>
                        <div className="d-flex align-items-center">
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
                            Remove
                          </button>
                        </div>
                        <p className="card-text mt-2">
                          <strong>Total: ${(item.price * item.quantity).toFixed(2)}</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary mt-4">
              <h4>Total: ${getTotalPrice().toFixed(2)}</h4>
              <button className="btn btn-success w-100 mt-3">Checkout</button>
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