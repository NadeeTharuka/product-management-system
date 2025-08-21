import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h5><i className="bi bi-bag-check me-2"></i>Product Management System</h5>
            <p>Your one-stop solution for all product management needs.</p>
            <div className="mt-3">
              <a href="#" className="text-white me-3"><i className="bi bi-facebook fs-5"></i></a>
              <a href="#" className="text-white me-3"><i className="bi bi-twitter fs-5"></i></a>
              <a href="#" className="text-white me-3"><i className="bi bi-instagram fs-5"></i></a>
              <a href="#" className="text-white"><i className="bi bi-linkedin fs-5"></i></a>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <h5><i className="bi bi-link-45deg me-2"></i>Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="text-white-50">Home</a></li>
              <li className="mb-2"><a href="#" className="text-white-50">Products</a></li>
              <li className="mb-2"><a href="#" className="text-white-50">Categories</a></li>
              <li className="mb-2"><a href="#" className="text-white-50">Special Offers</a></li>
              <li className="mb-2"><a href="#" className="text-white-50">Contact Us</a></li>
            </ul>
          </div>
          <div className="col-md-4 mb-4">
            <h5><i className="bi bi-geo-alt me-2"></i>Contact Us</h5>
            <p className="text-white-50"><i className="bi bi-envelope me-2"></i> info@productmanagement.com</p>
            <p className="text-white-50"><i className="bi bi-telephone me-2"></i> (123) 456-7890</p>
            <p className="text-white-50"><i className="bi bi-geo-alt me-2"></i> 123 Product Street, Management City, MC 12345</p>
          </div>
        </div>
        <hr className="my-4 bg-white" />
        <div className="text-center">
          <p className="mb-0">&copy; {new Date().getFullYear()} Product Management System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;