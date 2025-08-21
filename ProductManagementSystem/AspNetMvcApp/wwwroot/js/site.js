class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
        this.init();
    }

    init() {
        this.updateCartDisplay();
        this.bindEvents();
    }

    bindEvents() {
  
        $('#cartToggle').on('click', () => {
            const cartOffcanvas = new bootstrap.Offcanvas(document.getElementById('cartOffcanvas'));
            cartOffcanvas.show();
        });

        $(document).on('click', '#checkoutBtn', () => {
            if (this.items.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            alert('Checkout functionality would be implemented here!');
        });
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.productId === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                productId: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        
        this.saveCart();
        this.updateCartDisplay();
        this.showAddedToCartMessage(product.title);
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.productId !== productId);
        this.saveCart();
        this.updateCartDisplay();
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.productId === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
                this.saveCart();
                this.updateCartDisplay();
            }
        }
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    updateCartDisplay() {
        $('#cartCount').text(this.getTotalItems());
        
        $('#cartTotal').text(this.getTotalPrice().toFixed(2));
        
        this.renderCartItems();
    }

    renderCartItems() {
        const cartItemsContainer = $('#cartItems');
        
        if (this.items.length === 0) {
            cartItemsContainer.html(`
                <div class="text-center py-4">
                    <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                    <p class="text-muted">Your cart is empty</p>
                </div>
            `);
            return;
        }

        const itemsHtml = this.items.map(item => `
            <div class="cart-item" data-product-id="${item.productId}">
                <div class="d-flex align-items-center">
                    <img src="${item.image}" alt="${item.title}" class="cart-item-image me-3">
                    <div class="flex-grow-1">
                        <div class="cart-item-title">${this.truncateText(item.title, 30)}</div>
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                        <div class="quantity-controls mt-2">
                            <button class="quantity-btn" onclick="cart.updateQuantity(${item.productId}, ${item.quantity - 1})">
                                <i class="fas fa-minus"></i>
                            </button>
                            <input type="number" class="quantity-input" value="${item.quantity}" 
                                   onchange="cart.updateQuantity(${item.productId}, parseInt(this.value))" min="1">
                            <button class="quantity-btn" onclick="cart.updateQuantity(${item.productId}, ${item.quantity + 1})">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <button class="btn btn-sm btn-outline-danger ms-2" onclick="cart.removeItem(${item.productId})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');

        cartItemsContainer.html(itemsHtml);
    }

    showAddedToCartMessage(productTitle) {
        const toastHtml = `
            <div class="toast align-items-center text-white bg-success border-0" role="alert">
                <div class="d-flex">
                    <div class="toast-body">
                        <i class="fas fa-check-circle me-2"></i>
                        ${this.truncateText(productTitle, 30)} added to cart!
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
                </div>
            </div>
        `;

        if ($('#toastContainer').length === 0) {
            $('body').append('<div id="toastContainer" class="toast-container position-fixed top-0 end-0 p-3"></div>');
        }

        const $toast = $(toastHtml);
        $('#toastContainer').append($toast);
        
        const toast = new bootstrap.Toast($toast[0]);
        toast.show();

        $toast.on('hidden.bs.toast', function() {
            $(this).remove();
        });
    }

    truncateText(text, maxLength) {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }

    saveCart() {
        sessionStorage.setItem('shoppingCart', JSON.stringify(this.items));
    }

    loadCart() {
        try {
            const saved = sessionStorage.getItem('shoppingCart');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Error loading cart:', error);
            return [];
        }
    }

    clearCart() {
        this.items = [];
        this.saveCart();
        this.updateCartDisplay();
    }
}

const Utils = {
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    formatPrice(price) {
        return `$${parseFloat(price).toFixed(2)}`;
    },

    generateStarRating(rating, count) {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        let html = '<div class="star-rating">';
        
        for (let i = 0; i < fullStars; i++) {
            html += '<i class="fas fa-star"></i>';
        }
        
        if (halfStar) {
            html += '<i class="fas fa-star-half-alt"></i>';
        }
        
        for (let i = 0; i < emptyStars; i++) {
            html += '<i class="far fa-star"></i>';
        }
        
        html += `<span class="ms-2 text-muted">(${count} reviews)</span></div>`;
        return html;
    },

    highlightText(text, searchTerm) {
        if (!searchTerm) return text;
        
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
    },

    showLoading(element) {
        $(element).addClass('loading');
    },

    hideLoading(element) {
        $(element).removeClass('loading');
    },

    scrollTo(element, offset = 0) {
        $('html, body').animate({
            scrollTop: $(element).offset().top - offset
        }, 500);
    }
};

let cart;

$(document).ready(function() {
    cart = new ShoppingCart();

    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target.length) {
            Utils.scrollTo(target, 70); 
        }
    });

    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    $(document).on('click', '.btn', function() {
        const $btn = $(this);
        const originalText = $btn.html();
        
        if (!$btn.hasClass('no-loading')) {
            $btn.html('<i class="fas fa-spinner fa-spin"></i>');
            
            setTimeout(() => {
                $btn.html(originalText);
            }, 1000);
        }
    });

    $(document).on('mouseenter', '.product-card', function() {
        $(this).addClass('shadow-lg');
    }).on('mouseleave', '.product-card', function() {
        $(this).removeClass('shadow-lg');
    });

    $('.navbar-toggler').on('click', function() {
        $(this).toggleClass('collapsed');
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .stat-item').forEach(el => {
        observer.observe(el);
    });

    const backToTopBtn = $('<button id="backToTop" class="btn btn-primary position-fixed" style="bottom: 20px; right: 20px; z-index: 1000; display: none;"><i class="fas fa-arrow-up"></i></button>');
    $('body').append(backToTopBtn);

    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('#backToTop').fadeIn();
        } else {
            $('#backToTop').fadeOut();
        }
    });

    $('#backToTop').on('click', function() {
        $('html, body').animate({scrollTop: 0}, 500);
    });
});

window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
});

window.Cart = ShoppingCart;
window.Utils = Utils;