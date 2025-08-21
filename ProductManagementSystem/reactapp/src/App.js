import React, { useState, useEffect, useCallback } from 'react';
import { fetchProducts, fetchCategories } from './services/api';
import { debounce } from './utils/helpers';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CartModal from './components/CartModal';
import FilterBar from './components/FilterBar';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import './App.css';

const ITEMS_PER_PAGE = 10;

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts(),
          fetchCategories()
        ]);
        setProducts(productsData);
        setFilteredProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let result = products;
    
    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.title.toLowerCase().includes(term)
      );
    }
    
    setFilteredProducts(result);
    setCurrentPage(1); 
  }, [products, selectedCategory, searchTerm]);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const debouncedSearch = useCallback(
    debounce((term) => {
      setSearchTerm(term);
    }, 300),
    []
  );

  const handleSearch = (term) => {
    debouncedSearch(term);
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderHomeSection = () => (
    <div className="hero-section text-center py-5">
      <div className="container">
        <h1 className="display-4">Welcome to Product Management System</h1>
        <p className="lead">Discover amazing products with great deals</p>
        <button 
          className="btn btn-light btn-lg mt-3"
          onClick={() => {
            setActiveSection('products');
            window.scrollTo(0, 0);
          }}
        >
          Browse Products
        </button>
      </div>
    </div>
  );

  const renderProductsSection = () => (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Our Products</h1>
        <div className="badge bg-primary fs-6">
          {filteredProducts.length} products
        </div>
      </div>
      
      <div className="search-bar mb-4">
        <SearchBar onSearch={handleSearch} />
      </div>
      
      <div className="filter-bar mb-4">
        <FilterBar 
          categories={categories} 
          selectedCategory={selectedCategory} 
          onCategoryChange={setSelectedCategory} 
        />
      </div>
      
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {filteredProducts.length === 0 ? (
            <div className="alert alert-info">
              <h4>No products found</h4>
              <p>Try changing your search or filter criteria</p>
            </div>
          ) : (
            <>
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
                {currentProducts.map(product => (
                  <div key={product.id} className="col">
                    <ProductCard 
                      product={product} 
                      onViewDetails={handleViewDetails} 
                    />
                  </div>
                ))}
              </div>
              
              {totalPages > 1 && (
                <Pagination 
                  currentPage={currentPage} 
                  totalPages={totalPages} 
                  onPageChange={handlePageChange} 
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );

  const renderContactSection = () => (
    <div className="contact-section">
      <h1 className="mb-4">Contact Us</h1>
      <div className="row">
        <div className="col-md-6">
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea className="form-control" id="message" rows="4"></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
        <div className="col-md-6">
          <h3>Get in Touch</h3>
          <p><i className="bi bi-envelope me-2"></i> info@productmanagement.com</p>
          <p><i className="bi bi-telephone me-2"></i> (123) 456-7890</p>
          <p><i className="bi bi-geo-alt me-2"></i> 123 Product Street, Management City, MC 12345</p>
          
          <h3 className="mt-4">Business Hours</h3>
          <p><i className="bi bi-clock me-2"></i> Monday - Friday: 9am - 5pm</p>
          <p><i className="bi bi-clock me-2"></i> Saturday: 10am - 2pm</p>
          <p><i className="bi bi-x-circle me-2"></i> Sunday: Closed</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="App">
      <Navbar 
        onHomeClick={() => setActiveSection('home')}
        onProductsClick={() => setActiveSection('products')}
        onContactClick={() => setActiveSection('contact')}
        onCartClick={() => setShowCartModal(true)}
      />
      
      <main className="container">
        {activeSection === 'home' && renderHomeSection()}
        {activeSection === 'products' && renderProductsSection()}
        {activeSection === 'contact' && renderContactSection()}
      </main>
      
      <Footer />
      
      <ProductModal 
        product={selectedProduct}
        show={showProductModal}
        onHide={() => setShowProductModal(false)}
      />
      
      <CartModal 
        show={showCartModal}
        onHide={() => setShowCartModal(false)}
      />
    </div>
  );
}

export default App;