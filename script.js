document.addEventListener('DOMContentLoaded', function() {
    // Main functionality for both pages
    
    // Check if we're on the index (shop) page
    if (document.querySelector('.buy-button')) {
        // Get all "Add to cart" buttons
        const buyButtons = document.querySelectorAll('.buy-button');
        
        // Add click event to each button
        buyButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Get product data from data attributes
                const productData = {
                    name: this.dataset.name,
                    image: this.dataset.image,
                    size: this.dataset.size,
                    price: this.dataset.price
                };
                
                // Save product to localStorage
                localStorage.setItem('currentProduct', JSON.stringify(productData));
                
                // Redirect to checkout page
                window.location.href = 'checkout.html';
            });
        });
    }
    
    // Check if we're on the checkout page
    if (document.getElementById('checkout-product-display')) {
        // Get the product data from localStorage
        const product = JSON.parse(localStorage.getItem('currentProduct'));
        
        if (product) {
            // Create HTML for the product display
            const productHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="product-details">
                    <h3>${product.name}</h3>
                    <p>Size: ${product.size}</p>
                    <p>Price: $${product.price}</p>
                </div>
            `;
            
            // Insert into the page
            document.getElementById('checkout-product-display').innerHTML = productHTML;
        }
        
        // Handle form submission
        document.querySelector('.checkout-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('full-name').value;
            const email = document.getElementById('email').value;
            
            // Simple validation
            if (name && email) {
                alert(`Thank you for your order, ${name}! A confirmation has been sent to ${email}`);
                
                // Clear the cart
                localStorage.removeItem('currentProduct');
                
                // Redirect back to shop after 2 seconds
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            } else {
                alert('Please fill in all required fields');
            }
        });
    }
    
    // Add animation to product cards when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fragrance-itself').forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
        observer.observe(card);
    });

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});