// Loading Screen
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
        document.body.style.overflow = 'auto';
        
        // Initialize animations after loading
        initializeAnimations();
        createParticles();
    }, 3000);
});

// Particle Background System
function createParticles() {
    const particlesContainer = document.getElementById('particles-bg');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size between 2-6px
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation delay
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Advanced Scroll Animation System
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = element.dataset.delay || 0;
                
                setTimeout(() => {
                    element.classList.add('animated');
                    
                    // Special handling for section headers
                    if (element.classList.contains('section-header')) {
                        const h2 = element.querySelector('h2');
                        if (h2) h2.classList.add('animated');
                    }
                    
                    // Trigger counter animation
                    if (element.classList.contains('stat-item')) {
                        animateCounter(element);
                    }
                    
                    // Stagger child animations
                    const children = element.querySelectorAll('.animate-on-scroll');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animated');
                        }, index * 100);
                    });
                    
                }, delay * 1000);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
    
    // Observe room features for stagger animation
    document.querySelectorAll('.room-card').forEach(card => {
        observer.observe(card);
    });
}

// Counter Animation
function animateCounter(element) {
    const counter = element.querySelector('.counter');
    if (!counter) return;
    
    const target = parseInt(counter.dataset.target);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        counter.textContent = Math.floor(current);
    }, 16);
}

// Mobile Navigation Toggle with Animation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Animate hamburger bars
    const bars = hamburger.querySelectorAll('.bar');
    if (hamburger.classList.contains('active')) {
        bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
    } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    
    // Reset hamburger bars
    const bars = hamburger.querySelectorAll('.bar');
    bars[0].style.transform = 'none';
    bars[1].style.opacity = '1';
    bars[2].style.transform = 'none';
}));

// Enhanced Smooth Scrolling with Easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            
            // Smooth scroll with custom easing
            smoothScrollTo(offsetTop, 1000);
        }
    });
});

function smoothScrollTo(endY, duration) {
    const startY = window.scrollY;
    const distanceY = endY - startY;
    const startTime = new Date().getTime();

    const easeInOutQuart = (time, from, distance, duration) => {
        if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
        return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
    };

    const timer = setInterval(() => {
        const time = new Date().getTime() - startTime;
        const newY = easeInOutQuart(time, startY, distanceY, duration);
        if (time >= duration) {
            clearInterval(timer);
        }
        window.scroll(0, newY);
    }, 1000 / 60);
}

// Advanced Navbar Effects
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Change navbar background based on scroll
    if (scrollTop > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(212, 175, 55, 0.2)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 200) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
    
    // Update active nav link
    updateActiveNavLink();
    
    // Show/hide back to top button
    const backToTop = document.getElementById('backToTop');
    if (scrollTop > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

// Update Active Navigation Link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');
backToTopButton.addEventListener('click', () => {
    smoothScrollTo(0, 800);
});

// Enhanced Booking Form with Real-time Validation
const bookingForm = document.getElementById('bookingForm');
const bookingSummary = document.getElementById('bookingSummary');

const roomPrices = {
    'standard': 149,
    'deluxe': 299,
    'presidential': 599
};

// Real-time form validation and animation
function addFormValidation() {
    const inputs = bookingForm.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
            this.style.transform = 'translateY(-2px)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            this.style.transform = 'translateY(0)';
            
            // Validate on blur
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            validateField(this);
            updateBookingSummary();
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const fieldGroup = field.parentElement;
    
    // Remove existing validation classes
    fieldGroup.classList.remove('valid', 'invalid');
    
    if (field.hasAttribute('required') && !value) {
        fieldGroup.classList.add('invalid');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            fieldGroup.classList.add('invalid');
            return false;
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-$$$$]/g, ''))) {
            fieldGroup.classList.add('invalid');
            return false;
        }
    }
    
    if (value) {
        fieldGroup.classList.add('valid');
    }
    
    return true;
}

// Enhanced booking summary with animations
function updateBookingSummary() {
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const guests = document.getElementById('guests').value;
    const roomType = document.getElementById('roomType').value;

    if (checkin && checkout && guests && roomType) {
        const checkinDate = new Date(checkin);
        const checkoutDate = new Date(checkout);
        const nights = Math.ceil((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));
        
        if (nights > 0) {
            const pricePerNight = roomPrices[roomType];
            const totalPrice = nights * pricePerNight;
            const tax = totalPrice * 0.12;
            const finalTotal = totalPrice + tax;

            const summaryHTML = `
                <div class="summary-row" style="animation: slideInUp 0.3s ease-out">
                    <span>Room Type:</span>
                    <span>${roomType.charAt(0).toUpperCase() + roomType.slice(1)} Room</span>
                </div>
                <div class="summary-row" style="animation: slideInUp 0.3s ease-out 0.1s both">
                    <span>Check-in:</span>
                    <span>${new Date(checkin).toLocaleDateString()}</span>
                </div>
                <div class="summary-row" style="animation: slideInUp 0.3s ease-out 0.2s both">
                    <span>Check-out:</span>
                    <span>${new Date(checkout).toLocaleDateString()}</span>
                </div>
                <div class="summary-row" style="animation: slideInUp 0.3s ease-out 0.3s both">
                    <span>Nights:</span>
                    <span>${nights}</span>
                </div>
                <div class="summary-row" style="animation: slideInUp 0.3s ease-out 0.4s both">
                    <span>Guests:</span>
                    <span>${guests}</span>
                </div>
                <div class="summary-row" style="animation: slideInUp 0.3s ease-out 0.5s both">
                    <span>Room Rate:</span>
                    <span>$${pricePerNight}/night</span>
                </div>
                <div class="summary-row" style="animation: slideInUp 0.3s ease-out 0.6s both">
                    <span>Subtotal:</span>
                    <span>$${totalPrice}</span>
                </div>
                <div class="summary-row" style="animation: slideInUp 0.3s ease-out 0.7s both">
                    <span>Tax (12%):</span>
                    <span>$${tax.toFixed(2)}</span>
                </div>
                <div class="summary-row total" style="animation: slideInUp 0.3s ease-out 0.8s both">
                    <span><strong>Total:</strong></span>
                    <span><strong>$${finalTotal.toFixed(2)}</strong></span>
                </div>
            `;

            document.querySelector('.summary-details').innerHTML = summaryHTML;
            
            if (bookingSummary.style.display === 'none') {
                bookingSummary.style.display = 'block';
                bookingSummary.style.animation = 'slideInUp 0.5s ease-out';
            }
        }
    }
}

// Set minimum dates and add change listeners
document.getElementById('checkin').min = new Date().toISOString().split('T')[0];

document.getElementById('checkin').addEventListener('change', function() {
    const checkinDate = new Date(this.value);
    checkinDate.setDate(checkinDate.getDate() + 1);
    document.getElementById('checkout').min = checkinDate.toISOString().split('T')[0];
});

// Enhanced form submission with loading animation
bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate all fields
    const inputs = this.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        // Shake animation for invalid form
        this.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            this.style.animation = '';
        }, 500);
        return;
    }
    
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Loading animation
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitButton.disabled = true;
    submitButton.style.background = 'linear-gradient(45deg, #666, #888)';
    
    // Simulate booking process with progress
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            
            setTimeout(() => {
                // Success animation
                submitButton.innerHTML = '<i class="fas fa-check"></i> Booking Confirmed!';
                submitButton.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
                
                // Show success message with animation
                const successMessage = document.createElement('div');
                successMessage.innerHTML = `
                    <div style="
                        position: fixed;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        background: linear-gradient(45deg, #28a745, #20c997);
                        color: white;
                        padding: 2rem;
                        border-radius: 15px;
                        text-align: center;
                        z-index: 3000;
                        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                        animation: zoomIn 0.5s ease-out;
                    ">
                        <i class="fas fa-check-circle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                        <h3>Booking Confirmed!</h3>
                        <p>We will contact you shortly to confirm your reservation.</p>
                    </div>
                `;
                
                document.body.appendChild(successMessage);
                
                setTimeout(() => {
                    document.body.removeChild(successMessage);
                    this.reset();
                    bookingSummary.style.display = 'none';
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                    submitButton.style.background = 'linear-gradient(45deg, #d4af37, #f4d03f)';
                }, 3000);
            }, 500);
        }
    }, 100);
});

// Enhanced Gallery with Advanced Lightbox
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');

let currentImageIndex = 0;
const galleryImages = Array.from(galleryItems);

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentImageIndex = index;
        openLightbox(item);
    });
});

function openLightbox(item) {
    const img = item.querySelector('img');
    const caption = item.querySelector('h4').textContent;
    
    lightboxImg.src = img.src;
    lightboxCaption.textContent = caption;
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add keyboard navigation
    document.addEventListener('keydown', handleLightboxKeyboard);
}

function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
    document.removeEventListener('keydown', handleLightboxKeyboard);
}

function handleLightboxKeyboard(e) {
    switch(e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            navigateLightbox(-1);
            break;
        case 'ArrowRight':
            navigateLightbox(1);
            break;
    }
}

function navigateLightbox(direction) {
    currentImageIndex += direction;
    
    if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    }
    
    const currentItem = galleryImages[currentImageIndex];
    const img = currentItem.querySelector('img');
    const caption = currentItem.querySelector('h4').textContent;
    
    // Fade transition
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
        lightboxImg.src = img.src;
        lightboxCaption.textContent = caption;
        lightboxImg.style.opacity = '1';
    }, 150);
}

// Close lightbox events
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Enhanced Contact Form
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Loading animation
    submitButton.innerHTML = '<i class="fas fa-paper-plane fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitButton.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
        
        setTimeout(() => {
            this.reset();
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            submitButton.style.background = 'linear-gradient(45deg, #d4af37, #f4d03f)';
        }, 2000);
    }, 1500);
});

// Room Details Modal Enhancement
document.querySelectorAll('.room-card .btn-outline').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const roomCard = this.closest('.room-card');
        const roomTitle = roomCard.querySelector('h3').textContent;
        const roomPrice = roomCard.querySelector('.room-price').textContent;
        
        // Enhanced modal with more details
        const modalContent = `
            <div class="room-modal" style="animation: zoomIn 0.3s ease-out;">
                <div class="room-modal-content">
                    <span class="room-modal-close">&times;</span>
                    <div class="room-modal-header">
                        <h2>${roomTitle}</h2>
                        <div class="room-modal-price">${roomPrice}</div>
                    </div>
                    <div class="room-modal-body">
                        <div class="room-modal-gallery">
                            <img src="${roomCard.querySelector('img').src}" alt="${roomTitle}">
                        </div>
                        <div class="room-details">
                            <div class="room-detail-section">
                                <h3><i class="fas fa-bed"></i> Room Features</h3>
                                <ul>
                                    <li>Spacious accommodation with modern amenities</li>
                                    <li>High-speed WiFi and smart TV</li>
                                    <li>24/7 room service</li>
                                    <li>Climate control</li>
                                    <li>Premium bedding and linens</li>
                                    <li>Marble bathroom with luxury toiletries</li>
                                </ul>
                            </div>
                            <div class="room-detail-section">
                                <h3><i class="fas fa-concierge-bell"></i> Services Included</h3>
                                <ul>
                                    <li>Daily housekeeping</li>
                                    <li>Concierge service</li>
                                    <li>Complimentary breakfast</li>
                                    <li>Access to fitness center and pool</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="room-modal-footer">
                        <button class="btn btn-secondary" onclick="closeRoomModal()">Close</button>
                        <button class="btn btn-primary" onclick="document.getElementById('booking').scrollIntoView({behavior: 'smooth'}); closeRoomModal();">Book This Room</button>
                    </div>
                </div>
            </div>
        `;
        
        const modal = document.createElement('div');
        modal.innerHTML = modalContent;
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.95);
            backdrop-filter: blur(5px);
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Close modal functionality
        const closeBtn = modal.querySelector('.room-modal-close');
        closeBtn.addEventListener('click', () => {
            modal.style.animation = 'zoomOut 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(modal);
                document.body.style.overflow = 'auto';
            }, 300);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.animation = 'zoomOut 0.3s ease-out';
                setTimeout(() => {
                    document.body.removeChild(modal);
                    document.body.style.overflow = 'auto';
                }, 300);
            }
        });
    });
});

// Global function to close room modal
function closeRoomModal() {
    const modal = document.querySelector('.room-modal').closest('div');
    if (modal) {
        modal.style.animation = 'zoomOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(modal);
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    const currentYear = new Date().getFullYear();
    const footerText = document.querySelector('.footer-bottom p');
    if (footerText) {
        footerText.innerHTML = footerText.innerHTML.replace('2024', currentYear);
    }
    
    // Initialize form validation
    addFormValidation();
    
    // Add image loading animations
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.opacity = '0';
        img.addEventListener('load', function() {
            this.style.transition = 'opacity 0.5s ease';
            this.style.opacity = '1';
        });
    });
    
    // Add CSS for additional animations
    const additionalStyles = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        @keyframes zoomOut {
            from {
                opacity: 1;
                transform: scale(1);
            }
            to {
                opacity: 0;
                transform: scale(0.8);
            }
        }
        
        .room-modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 30px;
            border-bottom: 1px solid #333;
        }
        
        .room-modal-price {
            background: linear-gradient(45deg, #d4af37, #f4d03f);
            color: #000;
            padding: 8px 15px;
            border-radius: 20px;
            font-weight: bold;
        }
        
        .room-modal-gallery {
            margin-bottom: 20px;
        }
        
        .room-detail-section {
            margin-bottom: 25px;
        }
        
        .room-detail-section h3 {
            color: #d4af37;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .form-group.focused label {
            color: #f4d03f;
            transform: translateY(-2px);
        }
        
        .form-group.valid input,
        .form-group.valid select,
        .form-group.valid textarea {
            border-color: #28a745;
            box-shadow: 0 0 10px rgba(40, 167, 69, 0.3);
        }
        
        .form-group.invalid input,
        .form-group.invalid select,
        .form-group.invalid textarea {
            border-color: #dc3545;
            box-shadow: 0 0 10px rgba(220, 53, 69, 0.3);
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = additionalStyles;
    document.head.appendChild(styleSheet);
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add smooth hover effects to all interactive elements
document.querySelectorAll('.btn, .nav-link, .social-link').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});