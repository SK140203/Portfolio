// Enhanced Navigation functionality
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu with enhanced animation
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// Enhanced navbar scroll effect
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 200) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop;
});

// Enhanced active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Enhanced smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced floating elements animation
function animateFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        const speed = element.getAttribute('data-speed') || 1;
        const time = Date.now() * 0.001;
        const y = Math.sin(time * speed + index) * 20;
        const x = Math.cos(time * speed * 0.5 + index) * 10;
        
        element.style.transform = `translate(${x}px, ${y}px)`;
    });
    
    requestAnimationFrame(animateFloatingElements);
}

animateFloatingElements();

// Enhanced Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Add staggered animation for child elements
            const children = entry.target.querySelectorAll('.fade-in-child');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.classList.add('visible');
                }, index * 100);
            });
        }
    });
}, observerOptions);

// Add fade-in animation to elements
const animatedElements = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .stat-item, .contact-card, .about-card, .tech-item, .certification-card');
animatedElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Enhanced skills progress bar animation
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach((bar, index) => {
                const width = bar.getAttribute('data-width');
                const percentage = bar.parentElement.parentElement.querySelector('.skill-percentage');
                
                setTimeout(() => {
                    bar.style.width = width;
                    
                    // Animate percentage counter
                    if (percentage) {
                        animateCounter(percentage, parseInt(width));
                    }
                }, index * 200);
            });
        }
    });
}, { threshold: 0.5 });

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Enhanced typing animation for hero text
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    element.style.borderRight = '2px solid var(--primary-600)';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Remove cursor after typing
            setTimeout(() => {
                element.style.borderRight = 'none';
            }, 1000);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        const originalText = nameElement.textContent;
        setTimeout(() => {
            typeWriter(nameElement, originalText, 100);
        }, 1000);
    }
});

// Enhanced contact form handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Enhanced validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        if (message.length < 10) {
            showNotification('Message must be at least 10 characters long', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Enhanced email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Enhanced notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
    
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${icon}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add enhanced styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : 
                     type === 'error' ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 
                     'linear-gradient(135deg, #3b82f6, #2563eb)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        max-width: 400px;
        backdrop-filter: blur(10px);
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Enhanced reveal animation for sections
const revealElements = document.querySelectorAll('.about-card, .hero-text, .hero-image');
revealElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(50px)';
    element.style.transition = 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    element.style.transitionDelay = `${index * 0.2}s`;
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    revealObserver.observe(element);
});

// Enhanced counter animation for stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const updateCounter = () => {
        if (current < target) {
            current += increment;
            element.textContent = Math.ceil(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };
    
    updateCounter();
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(counter, target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counterObserver.observe(counter);
    });
}

// Initialize counter animation
animateCounters();

// Enhanced project card hover effects
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) scale(1.02)';
        card.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '';
    });
});

// Enhanced certification card interactions
const certificationCards = document.querySelectorAll('.certification-card');
certificationCards.forEach(card => {
    // Add category-based styling
    const category = card.getAttribute('data-category');
    const certLogo = card.querySelector('.cert-logo i');
    
    
    
    // Enhanced hover effects for certification cards
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-12px) scale(1.01)';
        card.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
        
        // Animate the logo
        const logo = card.querySelector('.cert-logo');
        logo.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '';
        
        const logo = card.querySelector('.cert-logo');
        logo.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Enhanced certificate verification simulation
function verifyCertificate(certId, callback) {
    // Simulate API call to verify certificate
    setTimeout(() => {
        const isVerified = Math.random() > 0.1; // 90% success rate
        callback(isVerified, certId);
    }, 1500);
}

// Add verification functionality to cert verify buttons
const verifyButtons = document.querySelectorAll('.cert-verify');
verifyButtons.forEach((button, index) => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (button.classList.contains('verifying')) return;
        
        button.classList.add('verifying');
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verifying...';
        
        verifyCertificate(`cert-${index}`, (isVerified, certId) => {
            if (isVerified) {
                button.innerHTML = '<i class="fas fa-check"></i> Verified';
                button.style.background = 'var(--success-500)';
                button.style.borderColor = 'var(--success-500)';
                showNotification('Certificate verification successful!', 'success');
            } else {
                button.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Verification Failed';
                button.style.background = 'var(--error-500)';
                button.style.borderColor = 'var(--error-500)';
                showNotification('Certificate verification failed. Please try again.', 'error');
            }
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = '';
                button.style.borderColor = '';
                button.classList.remove('verifying');
            }, 3000);
        });
    });
});

// Enhanced lazy loading for images
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => {
    img.classList.add('lazy');
    imageObserver.observe(img);
});

// Theme Toggle Functionality
function createThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.setAttribute('aria-label', 'Toggle dark mode');
    
    document.body.appendChild(themeToggle);
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.toggle('dark-theme', savedTheme === 'dark');
        updateThemeIcon(themeToggle, savedTheme === 'dark');
    }
    
    themeToggle.addEventListener('click', (e) => {
        const isDark = document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeIcon(themeToggle, isDark);
        
        // Add ripple effect
        createRipple(e, themeToggle);
    });
    
    themeToggle.addEventListener('mouseenter', () => {
        themeToggle.style.transform = 'scale(1.1)';
    });
    
    themeToggle.addEventListener('mouseleave', () => {
        themeToggle.style.transform = 'scale(1)';
    });
}

function updateThemeIcon(button, isDark) {
    const icon = button.querySelector('i');
    icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
}

function createRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        pointer-events: none;
    `;
    
    ripple.classList.add('ripple');
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Initialize theme toggle
createThemeToggle();

// Enhanced performance optimization: Debounce scroll events
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    updateActiveNavLink();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Enhanced loading animation
function createLoader() {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <p style="margin-top: 20px; color: var(--text-secondary); font-weight: 500;">Loading Portfolio...</p>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }, 1000);
    });
}

// Initialize loader
createLoader();

// Enhanced scroll to top functionality
function createScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--bg-primary);
        color: var(--primary-600);
        border: 2px solid var(--primary-600);
        cursor: pointer;
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        transition: all var(--transition-base);
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
    `;
    
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
            scrollBtn.style.transform = 'translateY(0)';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
            scrollBtn.style.transform = 'translateY(20px)';
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.background = 'var(--primary-600)';
        scrollBtn.style.color = 'var(--white)';
        scrollBtn.style.transform = 'translateY(-3px)';
    });
    
    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.background = 'var(--bg-primary)';
        scrollBtn.style.color = 'var(--primary-600)';
        scrollBtn.style.transform = 'translateY(0)';
    });
}

// Initialize scroll to top
createScrollToTop();

// Certification filtering functionality
function initCertificationFilters() {
    const filterContainer = document.createElement('div');
    filterContainer.className = 'cert-filters';
    filterContainer.innerHTML = `

    `;
    
    // Insert before certifications grid
    const certGrid = document.querySelector('.certifications-grid');
    if (certGrid) {
        certGrid.parentNode.insertBefore(filterContainer, certGrid);
        
        // Add filter styles
        const style = document.createElement('style');
        style.textContent = `
            .cert-filters {
                margin-bottom: var(--space-12);
                text-align: center;
            }
            
            .filter-buttons {
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                gap: var(--space-3);
                background: var(--bg-primary);
                padding: var(--space-4);
                border-radius: var(--radius-2xl);
                box-shadow: var(--shadow-md);
                border: 1px solid var(--border-color);
            }
            
            .filter-btn {
                padding: var(--space-3) var(--space-6);
                border: 1px solid var(--border-color);
                background: var(--bg-secondary);
                color: var(--text-primary);
                border-radius: var(--radius-full);
                cursor: pointer;
                transition: all var(--transition-base);
                font-weight: 500;
                font-size: var(--font-size-sm);
            }
            
            .filter-btn:hover {
                background: var(--primary-100);
                color: var(--primary-600);
                transform: translateY(-2px);
            }
            
            body.dark-theme .filter-btn:hover {
                background: var(--primary-800);
                color: var(--primary-300);
            }
            
            .filter-btn.active {
                background: linear-gradient(135deg, var(--primary-600), var(--accent-600));
                color: var(--white);
                border-color: var(--primary-600);
                box-shadow: var(--shadow-md);
            }
            
            .certification-card.hidden {
                display: none;
            }
            
            @media (max-width: 768px) {
                .filter-buttons {
                    flex-direction: column;
                }
                
                .filter-btn {
                    width: 100%;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Add filter functionality
        const filterButtons = filterContainer.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter certification cards
                const certCards = document.querySelectorAll('.certification-card');
                certCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        card.classList.remove('hidden');
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        card.classList.add('hidden');
                    }
                });
                
                // Show notification
                const filterText = filter === 'all' ? 'All Certifications' : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Certifications`;
                showNotification(`Showing ${filterText}`, 'info');
            });
        });
    }
}

// Initialize certification filters
initCertificationFilters();

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add initial animation classes
    const heroElements = document.querySelectorAll('.hero-text, .hero-image');
    heroElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.3}s`;
    });
    
    // Initialize scroll-triggered animations
    const scrollElements = document.querySelectorAll('.fade-in');
    scrollElements.forEach(el => observer.observe(el));
    
    // Add skill percentages to skill names
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        const skillName = item.querySelector('.skill-name');
        const skillProgress = item.querySelector('.skill-progress');
        const percentage = skillProgress.getAttribute('data-width');
        
        if (skillName && percentage) {
            const percentageSpan = document.createElement('span');
            percentageSpan.className = 'skill-percentage';
            percentageSpan.textContent = percentage;
            skillName.appendChild(percentageSpan);
        }
    });
    
    console.log('Enhanced portfolio website with certifications initialized successfully!');
});

// Error handling for missing elements
function safeQuerySelector(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        console.warn(`Element not found: ${selector}`);
    }
    return element;
}

// Use safe query selector for critical elements
const safeNavbar = safeQuerySelector('#navbar');
const safeHamburger = safeQuerySelector('#hamburger');
const safeNavMenu = safeQuerySelector('#nav-menu');

// Enhanced performance monitoring
function monitorPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page Load Performance:', {
                    'DOM Content Loaded': perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                    'Load Complete': perfData.loadEventEnd - perfData.loadEventStart,
                    'Total Load Time': perfData.loadEventEnd - perfData.fetchStart
                });
            }, 0);
        });
    }
}

// Initialize performance monitoring
monitorPerformance();