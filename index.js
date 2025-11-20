
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('hero-carousel');
    const slides = carousel.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    let autoSlideInterval;

    function changeSlide(index) {
        slides[currentSlide].classList.remove('active');
        indicators[currentSlide].classList.remove('active');
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }

    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        changeSlide(nextIndex);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopAutoSlide();
            changeSlide(index);
            startAutoSlide();
        });
    });

    startAutoSlide();
    
    // Make changeSlide available globally
    window.changeSlide = changeSlide;
});

// Your existing scroll animations (DO NOT MODIFY)
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.invisible, .container-Bcards, #grid-container, .new-arrival, #banner1, .cards, .Bcards2, .parent, .pro, .banner-box').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initializeScrollAnimations();
});
function viewDetails(button) {
    const productDiv = button.closest('.pro');
    const product = {
        name: productDiv.querySelector('h4').textContent,
        price: parseFloat(productDiv.querySelector('b').textContent.replace('₱', '')),
        image: productDiv.querySelector('img').src,
        description: 'Premium product designed for comfort and performance.'
    };
    const params = new URLSearchParams({
        title: encodeURIComponent(product.name),
        price: encodeURIComponent(product.price),
        image: encodeURIComponent(product.image),
        description: encodeURIComponent(product.description)
    });
    window.location.href = `ShowDetails.html?${params.toString()}`;
}
document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners to all "View Details" buttons
    document.querySelectorAll('.btn-pro a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link navigation
            
            // Get product details from the parent .pro div
            const proDiv = link.closest('.pro');
            const title = proDiv.querySelector('h4').textContent;
            const price = proDiv.querySelector('b').textContent.replace('₱', ''); // Remove currency symbol
            const image = proDiv.querySelector('img').src;
            const description = `Premium ${title} product designed for comfort and performance. Perfect for your active lifestyle.`; // Basic description
            
            // Construct URL with parameters
            const params = new URLSearchParams({
                title: encodeURIComponent(title),
                price: encodeURIComponent(price),
                image: encodeURIComponent(image),
                description: encodeURIComponent(description)
            });
            
            // Navigate to ShowDetails.html with parameters
            window.location.href = `ShowDetails.html?${params.toString()}`;
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // Get URL parameters
    const params = new URLSearchParams(window.location.search);
    const title = decodeURIComponent(params.get('title') || '');
    const price = decodeURIComponent(params.get('price') || '');
    const image = decodeURIComponent(params.get('image') || '');
    const description = decodeURIComponent(params.get('description') || '');
    
    // Populate the product details
    document.getElementById('product-title').textContent = title;
    document.getElementById('product-price').textContent = `₱${price}`;
    document.getElementById('product-description').textContent = description;
    document.getElementById('product-image').src = image;
    
    // Initialize cart count (reuse from main page if needed)
    updateCartCount();
});

// Function to add to cart from details page
function addToCartFromDetails() {
    const title = document.getElementById('product-title').textContent;
    const price = parseFloat(document.getElementById('product-price').textContent.replace('₱', ''));
    const image = document.getElementById('product-image').src;
    
    // Assuming addToCart is defined (from your main page JS or include it here)
    if (typeof addToCart === 'function') {
        addToCart(title, price, image);
    } else {
        alert('Add to Cart functionality not available.');
    }
}

// Function to go back
function goBack() {
    window.history.back(); // Go back to previous page
}

// Cart functions (copy from your main page JS if needed)
let cartCount = 0;
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
        cartCountElement.style.display = cartCount > 0 ? 'flex' : 'none';
    }
}