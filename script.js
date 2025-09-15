// YTG Landing Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initScrollAnimations();
    initPortfolioAnimation();
    initWaitlistForm();
    initSmoothScrolling();
    initAnalytics();
    
    console.log('YTG Landing Page initialized successfully');
});

// Smooth scrolling for navigation
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId) || document.getElementById('waitlist');
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Track click event
        gtag('event', 'cta_click', {
            'cta_type': sectionId,
            'event_category': 'engagement'
        });
    }
}

// Initialize smooth scrolling for all internal links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Track section visibility
                gtag('event', 'section_view', {
                    'section_name': entry.target.id || entry.target.className,
                    'event_category': 'engagement'
                });
            }
        });
    }, observerOptions);

    // Add fade-in animation to sections
    const animatedElements = document.querySelectorAll('.how-it-works-section, .comparison-section, .testimonials-section, .waitlist-section');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Animate individual elements
    const steps = document.querySelectorAll('.step');
    const testimonials = document.querySelectorAll('.testimonial-card');
    const comparisonCards = document.querySelectorAll('.comparison-card');

    [...steps, ...testimonials, ...comparisonCards].forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
}

// Portfolio animation in hero section
function initPortfolioAnimation() {
    const portfolioUpload = document.getElementById('portfolioUpload');
    const aiArrow = document.getElementById('aiArrow');
    const portfolioRanked = document.getElementById('portfolioRanked');

    if (!portfolioUpload || !aiArrow || !portfolioRanked) return;

    // Initial state
    portfolioRanked.style.opacity = '0';
    portfolioRanked.style.transform = 'translateX(30px)';

    // Animation sequence
    function runAnimation() {
        // Step 1: Highlight upload card
        portfolioUpload.style.transform = 'scale(1.05)';
        portfolioUpload.style.boxShadow = '0 20px 25px -5px rgb(37 99 235 / 0.2), 0 8px 10px -6px rgb(37 99 235 / 0.2)';

        setTimeout(() => {
            // Step 2: Animate AI arrow
            aiArrow.style.transform = 'scale(1.2)';
            aiArrow.style.animation = 'pulse 0.5s ease-in-out 3';

            setTimeout(() => {
                // Step 3: Show ranked portfolio
                portfolioRanked.style.opacity = '1';
                portfolioRanked.style.transform = 'translateX(0)';
                portfolioRanked.style.transition = 'all 0.6s ease-out';

                // Reset for next cycle
                setTimeout(() => {
                    portfolioUpload.style.transform = 'scale(1)';
                    portfolioUpload.style.boxShadow = '';
                    aiArrow.style.transform = 'scale(1)';
                    aiArrow.style.animation = 'pulse 2s infinite';
                }, 2000);
            }, 1500);
        }, 1000);
    }

    // Run animation on load and repeat every 8 seconds
    setTimeout(runAnimation, 1000);
    setInterval(runAnimation, 8000);

    // Add hover effects
    portfolioUpload.addEventListener('mouseenter', () => {
        portfolioUpload.style.transform = 'translateY(-5px)';
    });

    portfolioUpload.addEventListener('mouseleave', () => {
        portfolioUpload.style.transform = 'translateY(0)';
    });

    portfolioRanked.addEventListener('mouseenter', () => {
        portfolioRanked.style.transform = 'translateY(-5px)';
    });

    portfolioRanked.addEventListener('mouseleave', () => {
        portfolioRanked.style.transform = 'translateY(0)';
    });
}

// Waitlist form handling
function initWaitlistForm() {
    const form = document.getElementById('waitlistForm');
    const confirmationMessage = document.getElementById('confirmationMessage');

    if (!form || !confirmationMessage) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            userType: formData.get('userType'),
            timestamp: new Date().toISOString(),
            source: 'landing_page'
        };

        // Validate form
        if (!data.name || !data.email || !data.userType) {
            showError('Please fill in all fields');
            return;
        }

        if (!isValidEmail(data.email)) {
            showError('Please enter a valid email address');
            return;
        }

        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.classList.add('loading');
        submitButton.innerHTML = '<span>Joining...</span>';

        try {
            // Submit to backend (replace with your actual endpoint)
            const response = await submitToWaitlist(data);
            
            if (response.success) {
                // Show success message
                form.style.display = 'none';
                confirmationMessage.classList.remove('hidden');
                
                // Track conversion
                gtag('event', 'waitlist_signup', {
                    'user_type': data.userType,
                    'event_category': 'conversion'
                });

                // Scroll to confirmation
                confirmationMessage.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });

                // Add celebration effect
                createConfetti();
                
            } else {
                throw new Error(response.message || 'Submission failed');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showError('Something went wrong. Please try again.');
            
            // Reset form
            submitButton.classList.remove('loading');
            submitButton.innerHTML = originalText;
        }
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Error handling
function showError(message) {
    // Create or update error message
    let errorDiv = document.querySelector('.error-message');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = `
            background: var(--error-color);
            color: white;
            padding: 1rem;
            border-radius: 0.5rem;
            margin-top: 1rem;
            text-align: center;
            animation: fadeInUp 0.3s ease-out;
        `;
        document.querySelector('.waitlist-form').appendChild(errorDiv);
    }
    
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    
    // Hide error after 5 seconds
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

// Submit to waitlist (mock implementation - replace with your backend)
async function submitToWaitlist(data) {
    // Mock API call - replace with your actual backend endpoint
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simulate successful submission
            console.log('Waitlist data:', data);
            
            // Store in localStorage for demo purposes
            const existingData = JSON.parse(localStorage.getItem('ytg_waitlist') || '[]');
            existingData.push(data);
            localStorage.setItem('ytg_waitlist', JSON.stringify(existingData));
            
            resolve({ success: true });
        }, 1500);
    });
}

// Confetti effect for successful signup
function createConfetti() {
    const colors = ['#2563eb', '#0891b2', '#059669', '#fbbf24'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}vw;
                top: -10px;
                z-index: 1000;
                pointer-events: none;
                border-radius: 50%;
                animation: confettiFall ${2 + Math.random() * 3}s linear forwards;
            `;
            
            document.body.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, i * 50);
    }
}

// Add confetti animation CSS
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// Initialize analytics
function initAnalytics() {
    // Track page load
    gtag('event', 'page_view', {
        'page_title': 'YTG Landing Page',
        'page_location': window.location.href
    });

    // Track scroll depth
    let maxScroll = 0;
    const milestones = [25, 50, 75, 100];
    
    window.addEventListener('scroll', () => {
        const scrollPercent = Math.round(
            (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        );
        
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            
            // Track milestone achievements
            milestones.forEach(milestone => {
                if (scrollPercent >= milestone && maxScroll >= milestone) {
                    gtag('event', 'scroll_depth', {
                        'percent': milestone,
                        'event_category': 'engagement'
                    });
                }
            });
        }
    });

    // Track time on page
    const startTime = Date.now();
    window.addEventListener('beforeunload', () => {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        gtag('event', 'time_on_page', {
            'seconds': timeSpent,
            'event_category': 'engagement'
        });
    });
}

// Enhanced button interactions
document.addEventListener('click', function(e) {
    if (e.target.matches('.cta-primary, .cta-secondary')) {
        // Add ripple effect
        const button = e.target;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Performance optimization: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Error handling for failed external resources
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        console.warn('Failed to load image:', e.target.src);
        // Optionally replace with placeholder
        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zNSA2NUw1MCA0NUw2NSA2NUg3NVY3NUgyNVY2NUgzNVoiIGZpbGw9IiM5Q0EzQUYiLz4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNSIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K';
    }
}, true);

// Accessibility enhancements
document.addEventListener('keydown', function(e) {
    // Enter key on buttons
    if (e.key === 'Enter' && e.target.matches('button:not([type="submit"])')) {
        e.target.click();
    }
    
    // Escape key to close modals/messages
    if (e.key === 'Escape') {
        const errorMessage = document.querySelector('.error-message');
        if (errorMessage && errorMessage.style.display !== 'none') {
            errorMessage.style.display = 'none';
        }
    }
});

// Focus management for form
document.querySelectorAll('input, select').forEach(input => {
    input.addEventListener('focus', function() {
        this.closest('.form-group').classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        this.closest('.form-group').classList.remove('focused');
    });
});

// Safe Google Analytics function
window.gtag = window.gtag || function() {
    (window.dataLayer = window.dataLayer || []).push(arguments);
};

console.log('YTG Landing Page script loaded successfully');