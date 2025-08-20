import React from 'react';
import PropTypes from 'prop-types';
import { useCart } from '../hooks/useCart';

const Navbar = ({ onHomeClick, onProductsClick, onContactClick, onCartClick }) => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <a className="navbar-brand" href="#" onClick={(e) => { e.preventDefault(); onHomeClick(); }}>
          Product Management
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={(e) => { e.preventDefault(); onHomeClick(); }}>
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={(e) => { e.preventDefault(); onProductsClick(); }}>
                Products
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={(e) => { e.preventDefault(); onContactClick(); }}>
                Contact Us
              </a>
            </li>
          </ul>
          <button className="btn btn-outline-light position-relative" onClick={onCartClick}>
            <i className="bi bi-cart3"></i> Cart
            {totalItems > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  onHomeClick: PropTypes.func.isRequired,
  onProductsClick: PropTypes.func.isRequired,
  onContactClick: PropTypes.func.isRequired,
  onCartClick: PropTypes.func.isRequired
};

export default Navbar;