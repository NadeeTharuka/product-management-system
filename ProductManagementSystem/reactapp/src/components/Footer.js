import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>Product Management System</h5>
            <p>Your one-stop solution for all product management needs.</p>
          </div>
          <div className="col-md-4">
            <h5>Connect With Us</h5>
            <div className="d-flex">
              <a href="#" className="text-white me-3"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-white me-3"><i className="bi bi-twitter"></i></a>
              <a href="#" className="text-white me-3"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-white"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <p>Email: info@productmanagement.com</p>
            <p>Phone: (123) 456-7890</p>
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