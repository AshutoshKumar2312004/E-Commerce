// Global variables
let cart = [];
let products = [
    {
        id: 1,
        name: "Villain Hydra",
        category: "men",
        price: 2499,
        description: "All New Intense Hydra For a Fresh Start Every Morning. Experience the ultimate masculine fragrance.",
        longDescription: "Villain Hydra is designed for the modern man who demands excellence. With top notes of fresh citrus, heart notes of aromatic herbs, and base notes of woody cedar, this fragrance provides long-lasting freshness that keeps you confident throughout the day.",
        image: "villian hydra.jpg",
        features: ["Long-lasting fragrance", "Fresh morning scent", "Premium quality", "100ml bottle"]
    },
    {
        id: 2,
        name: "Villain Desire",
        category: "men",
        price: 2799,
        description: "All New Villain Desire For The Perfect Date With Your Perfect Partner. Ignite passion with every spray.",
        longDescription: "Villain Desire is the perfect companion for romantic evenings. With sensual notes of vanilla, amber, and musk, this fragrance creates an irresistible aura that captivates and enchants.",
        image: "Villain desire.webp",
        features: ["Romantic fragrance", "Evening wear", "Sensual notes", "Perfect for dates"]
    },
    {
        id: 3,
        name: "Villain Snake",
        category: "men",
        price: 2999,
        description: "All New Villain Snake For The Best Fight In Your Everyday Life. Unleash your inner warrior.",
        longDescription: "Villain Snake embodies strength and determination. With bold notes of leather, spices, and dark woods, this fragrance is for the man who faces challenges head-on and emerges victorious.",
        image: "villian snake.jpg",
        features: ["Bold and powerful", "Warrior spirit", "Intense fragrance", "For the fearless"]
    },
    {
        id: 4,
        name: "Mystic Rose",
        category: "women",
        price: 3299,
        description: "Elegant and sophisticated fragrance for the modern woman. Captivate with every breath.",
        longDescription: "Mystic Rose is a celebration of feminine elegance. With delicate rose petals, jasmine, and soft powder notes, this fragrance embodies grace and sophistication for the discerning woman.",
        image: "mystic rose.jpg",
        features: ["Elegant rose scent", "Sophisticated", "Feminine fragrance", "Perfect for special occasions"]
    },
    {
        id: 5,
        name: "Ocean Breeze",
        category: "unisex",
        price: 2899,
        description: "Fresh oceanic scent perfect for any occasion. Feel the freedom of the open sea.",
        longDescription: "Ocean Breeze captures the essence of coastal freshness. With marine accords, sea salt, and crisp citrus, this unisex fragrance brings the invigorating spirit of the ocean to your daily routine.",
        image: "ocean breaze.webp",
        features: ["Fresh oceanic scent", "Unisex fragrance", "Invigorating", "Perfect for daily wear"]
    },
    {
        id: 6,
        name: "Golden Hour",
        category: "women",
        price: 3499,
        description: "Warm and luxurious fragrance that captures the magic of sunset. Embrace your golden moments.",
        longDescription: "Golden Hour embodies the warmth and beauty of sunset. With golden amber, honey, and warm spices, this luxurious fragrance creates an aura of elegance and sophistication.",
        image: "golden hour.webp",
        features: ["Warm sunset fragrance", "Luxurious scent", "Golden moments", "Evening elegance"]
    },
    {
        id: 7,
        name: "Midnight Storm",
        category: "men",
        price: 3199,
        description: "Powerful and intense fragrance for the bold and fearless. Command attention wherever you go.",
        longDescription: "Midnight Storm is for the man who commands respect. With intense notes of black pepper, dark berries, and smoky woods, this powerful fragrance makes a statement that cannot be ignored.",
        image: "midnight storm.jpg",
        features: ["Powerful and intense", "Bold fragrance", "Commands attention", "For the fearless"]
    },
    {
        id: 8,
        name: "Pure Essence",
        category: "unisex",
        price: 2699,
        description: "Clean and pure fragrance that embodies simplicity and elegance. Perfect for everyday wear.",
        longDescription: "Pure Essence represents the beauty of simplicity. With clean white florals, soft musk, and gentle woods, this unisex fragrance is perfect for those who appreciate understated elegance.",
        image: "pure essence.jpg",
        features: ["Clean and pure", "Simple elegance", "Everyday wear", "Understated luxury"]
    }
];

// DOM Elements
const cartIcon = document.getElementById('cartIcon');
const cartCount = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const productModal = document.getElementById('productModal');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const filterBtns = document.querySelectorAll('.filter-btn');
const productsGrid = document.getElementById('productsGrid');
const navbar = document.getElementById('navbar');
const notification = document.getElementById('notification');
const contactForm = document.getElementById('contactForm');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    updateCartUI();
    initializeNavbarScrollEffect();
    animateOnScroll();
});

// Event Listeners
function initializeEventListeners() {
    // Cart modal events
    cartIcon.addEventListener('click', openCartModal);
    
    // Modal close events
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', closeModals);
    });
    
    // Click outside modal to close
    window.addEventListener('click', function(e) {
        if (e.target === cartModal || e.target === productModal) {
            closeModals();
        }
    });
    
    // Search functionality
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', handleFilter);
    });
    
    // Cart actions
    document.getElementById('clearCart').addEventListener('click', clearCart);
    document.getElementById('checkout').addEventListener('click', handleCheckout);
    
    // Contact form
    contactForm.addEventListener('submit', handleContactForm);
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Cart functionality
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartUI();
    showNotification(`${product.name} added to cart!`);
    
    // Add animation to cart icon
    cartIcon.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartIcon.style.transform = 'scale(1)';
    }, 200);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    updateCartModal();
    showNotification('Item removed from cart');
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    if (totalItems > 0) {
        cartCount.style.display = 'flex';
    } else {
        cartCount.style.display = 'none';
    }
}

function openCartModal() {
    updateCartModal();
    cartModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function updateCartModal() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #cccccc; padding: 2rem;">Your cart is empty</p>';
        cartTotal.textContent = '0';
        return;
    }
    
    let cartHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        cartHTML += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>₹${item.price} x ${item.quantity}</p>
                </div>
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <div class="cart-item-price">₹${itemTotal}</div>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `;
    });
    
    cartItems.innerHTML = cartHTML;
    cartTotal.textContent = total.toLocaleString();
}

function clearCart() {
    cart = [];
    updateCartUI();
    updateCartModal();
    showNotification('Cart cleared');
}

function handleCheckout() {
    if (cart.length === 0) {
        showNotification('Add items to cart first');
        return;
    }
    
    // Simulate checkout process
    showNotification('Redirecting to payment...');
    setTimeout(() => {
        showNotification('Order placed successfully!');
        clearCart();
        closeModals();
    }, 2000);
}

// Product modal functionality
function viewProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modalBody = document.getElementById('productModalBody');
    modalBody.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: start;">
            <div>
                <img src="${product.image}" alt="${product.name}" style="width: 100%; border-radius: 10px;">
            </div>
            <div>
                <span class="product-category">${product.category}</span>
                <h2 style="color: #00ffff; margin: 1rem 0;">${product.name}</h2>
                <p style="color: #cccccc; margin-bottom: 1rem; line-height: 1.6;">${product.longDescription}</p>
                <div style="margin: 1.5rem 0;">
                    <h3 style="color: #ffffff; margin-bottom: 0.5rem;">Features:</h3>
                    <ul style="color: #cccccc; padding-left: 1.5rem;">
                        ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                <div class="product-price" style="font-size: 1.8rem; margin: 1.5rem 0;">₹${product.price}</div>
                <div class="product-actions">
                    <button class="btn-primary" onclick="addToCart(${product.id}); closeModals();" style="width: 100%; padding: 1rem; font-size: 1.1rem;">Add to Cart</button>
                </div>
            </div>
        </div>
    `;
    
    productModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModals() {
    cartModal.style.display = 'none';
    productModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Search functionality
function handleSearch() {
    const query = searchInput.value.toLowerCase().trim();
    if (!query) {
        showAllProducts();
        return;
    }
    
    const productCards = document.querySelectorAll('.product-card');
    let visibleCount = 0;
    
    productCards.forEach(card => {
        const productName = card.querySelector('h3').textContent.toLowerCase();
        const productDescription = card.querySelector('.product-description').textContent.toLowerCase();
        const productCategory = card.querySelector('.product-category').textContent.toLowerCase();
        
        if (productName.includes(query) || productDescription.includes(query) || productCategory.includes(query)) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Reset filter buttons
    filterBtns.forEach(btn => btn.classList.remove('active'));
    
    if (visibleCount === 0) {
        showNotification('No products found matching your search');
    } else {
        showNotification(`Found ${visibleCount} product(s)`);
    }
}

// Filter functionality
function handleFilter(e) {
    const filter = e.target.dataset.filter;
    const productCards = document.querySelectorAll('.product-card');
    
    // Update active filter button
    filterBtns.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    // Clear search
    searchInput.value = '';
    
    // Show/hide products based on filter
    productCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function showAllProducts() {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.style.display = 'block';
    });
    
    // Reset to "All" filter
    filterBtns.forEach(btn => btn.classList.remove('active'));
    document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
}

// Navbar scroll effect
function initializeNavbarScrollEffect() {
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        // Add background opacity based on scroll
        if (scrollTop > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Smooth scrolling to products section
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Notification system
function showNotification(message) {
    const notificationText = document.getElementById('notificationText');
    notificationText.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Contact form handling
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name') || e.target.querySelector('input[type="text"]').value;
    const email = formData.get('email') || e.target.querySelector('input[type="email"]').value;
    const message = formData.get('message') || e.target.querySelector('textarea').value;
    
    if (!name || !email || !message) {
        showNotification('Please fill in all fields');
        return;
    }
    
    // Simulate form submission
    showNotification('Sending message...');
    
    setTimeout(() => {
        showNotification('Message sent successfully!');
        e.target.reset();
    }, 1500);
}

// Animation on scroll
function animateOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.product-card, .stat, .contact-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Utility functions
function formatPrice(price) {
    return price.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0
    });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add hover effects for product cards
document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Handle window resize
window.addEventListener('resize', debounce(function() {
    // Adjust layout for mobile
    if (window.innerWidth <= 768) {
        document.querySelectorAll('.product-card').forEach(card => {
            card.style.transform = 'none';
        });
    }
}, 250));

// Preload images for better performance
function preloadImages() {
    products.forEach(product => {
        const img = new Image();
        img.src = product.image;
    });
}

// Initialize preloading
preloadImages();

// Export functions for global access (for onclick handlers)
window.addToCart = addToCart;
window.viewProduct = viewProduct;
window.removeFromCart = removeFromCart;
window.scrollToProducts = scrollToProducts;