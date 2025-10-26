// ============================================
// 4SIGHT AI - INTERACTIVE JAVASCRIPT
// Modern, Responsive, Feature-Rich
// ============================================

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initMobileMenu();
    initScrollAnimations();
    initStatCounters();
    initModalHandlers();
    initContactForm();
    initSmoothScroll();
    initActiveNavLinks();
    initHeaderScroll();
    initVideoBackground();
    initScrollToTop();
    initAIAnimations();
    initLanguageSelector();
});

// ========== MOBILE MENU TOGGLE ==========
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');

            // Prevent body scroll when menu is open
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking on a link
        const navLinkItems = navLinks.querySelectorAll('a');
        navLinkItems.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = navLinks.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);

            if (!isClickInsideMenu && !isClickOnToggle && navLinks.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// ========== SCROLL ANIMATIONS ==========
function initScrollAnimations() {
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';

                    // Trigger counter animation if this is a stats section
                    if (entry.target.querySelector('.stat-number')) {
                        animateCounters(entry.target);
                    }

                    // Stop observing once animated
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        const fadeElements = document.querySelectorAll('.fade-in, .card, .stat-item');
        fadeElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            observer.observe(el);
        });
    }
}

// ========== ANIMATED COUNTERS ==========
function initStatCounters() {
    // This will be triggered by scroll animations
    // See animateCounters function below
}

function animateCounters(container) {
    const counters = container.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += increment;

            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };

        updateCounter();
    });
}

// ========== MODAL HANDLERS ==========
function initModalHandlers() {
    // Close modal when clicking outside
    const modals = document.querySelectorAll('.modal');

    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });

    // Close modal on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                closeModal(activeModal.id);
            }
        }
    });
}

// Open modal function (called from HTML onclick)
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Close modal function (called from HTML onclick)
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ========== CONTACT FORM VALIDATION & HANDLING ==========
function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Reset previous errors
            clearFormErrors();

            // Validate form
            let isValid = true;

            // Validate name
            const name = document.getElementById('name');
            if (!name.value.trim()) {
                showError(name, 'Please enter your name');
                isValid = false;
            }

            // Validate email
            const email = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim()) {
                showError(email, 'Please enter your email address');
                isValid = false;
            } else if (!emailRegex.test(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            }

            // Validate company
            const company = document.getElementById('company');
            if (!company.value.trim()) {
                showError(company, 'Please enter your company name');
                isValid = false;
            }

            // Validate interest
            const interest = document.getElementById('interest');
            if (!interest.value) {
                showError(interest, 'Please select an option');
                isValid = false;
            }

            // Validate message
            const message = document.getElementById('message');
            if (!message.value.trim()) {
                showError(message, 'Please enter your message');
                isValid = false;
            } else if (message.value.trim().length < 10) {
                showError(message, 'Message must be at least 10 characters long');
                isValid = false;
            }

            // If form is valid, submit (in production, this would send to a server)
            if (isValid) {
                submitContactForm(contactForm);
            }
        });

        // Real-time validation on blur
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    showError(this, this.previousElementSibling.textContent.replace('*', '').trim() + ' is required');
                } else {
                    clearError(this);
                }
            });

            // Clear error on input
            input.addEventListener('input', function() {
                if (this.parentElement.classList.contains('error')) {
                    clearError(this);
                }
            });
        });
    }
}

function showError(input, message) {
    const formGroup = input.parentElement;
    formGroup.classList.add('error');
    const errorElement = formGroup.querySelector('.form-error');
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearError(input) {
    const formGroup = input.parentElement;
    formGroup.classList.remove('error');
}

function clearFormErrors() {
    const errorGroups = document.querySelectorAll('.form-group.error');
    errorGroups.forEach(group => group.classList.remove('error'));
}

function submitContactForm(form) {
    // Get form data
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // In production, you would send this to a server:
    // fetch('/api/contact', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data)
    // })

    // For demo purposes, show success message
    console.log('Form submitted:', data);

    // Show success message
    const successMessage = document.getElementById('formSuccess');
    if (successMessage) {
        successMessage.style.display = 'block';

        // Reset form
        form.reset();

        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Hide success message after 10 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 10000);
    }

    // Alternative: Create mailto link (basic fallback)
    // const mailtoLink = `mailto:contact@4sightai.com?subject=Contact from ${data.name}&body=${encodeURIComponent(data.message)}`;
    // window.location.href = mailtoLink;
}

// ========== SMOOTH SCROLL ==========
function initSmoothScroll() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#" or if it's meant to trigger a function
            if (href === '#' || this.hasAttribute('onclick')) {
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();

                const headerOffset = 80; // Height of fixed header
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========== ACTIVE NAV LINKS ==========
function initActiveNavLinks() {
    // Get current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Set active class on current page link
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
}

// ========== HEADER SCROLL EFFECT ==========
function initHeaderScroll() {
    const header = document.querySelector('header');

    if (header) {
        let lastScroll = 0;

        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;

            // Add shadow on scroll
            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        });
    }
}

// ========== UTILITY FUNCTIONS ==========

// Debounce function for performance
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

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ========== LAZY LOADING ENHANCEMENT ==========
// Modern browsers support native lazy loading, but we can add fallback
if ('loading' in HTMLImageElement.prototype) {
    // Native lazy loading is supported
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    // Fallback for older browsers
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ========== SCROLL TO TOP ON PAGE LOAD ==========
// Ensure page starts at top (some browsers remember scroll position)
window.addEventListener('beforeunload', function() {
    window.scrollTo(0, 0);
});

// ========== ACCESSIBILITY ENHANCEMENTS ==========
// Trap focus in modal when open
function trapFocusInModal(modal) {
    const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    modal.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
    });
}

// Apply focus trap to all modals
document.querySelectorAll('.modal').forEach(modal => {
    trapFocusInModal(modal);
});

// ========== PERFORMANCE MONITORING ==========
// Log performance metrics (can be removed in production)
if (window.performance && window.performance.timing) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            const connectTime = perfData.responseEnd - perfData.requestStart;
            const renderTime = perfData.domComplete - perfData.domLoading;

            console.log('Performance Metrics:');
            console.log('Page Load Time:', (pageLoadTime / 1000).toFixed(2), 'seconds');
            console.log('Connection Time:', (connectTime / 1000).toFixed(2), 'seconds');
            console.log('Render Time:', (renderTime / 1000).toFixed(2), 'seconds');
        }, 0);
    });
}

// ========== CONSOLE BRANDING ==========
console.log(
    '%c4sight AI%c\n' +
    'Empowering Enterprises to harness the power of AI\n' +
    'Website: https://4sightai.com\n' +
    'Contact: contact@4sightai.com',
    'color: #00e5ff; font-size: 24px; font-weight: bold;',
    'color: #6c757d; font-size: 14px;'
);

// ========== ANIMATED CANVAS BACKGROUND ==========
function initVideoBackground() {
    const canvas = document.getElementById('heroCanvas');

    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;

    // Set canvas size
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Wrap around edges
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 229, 255, 0.8)';
            ctx.fill();
        }
    }

    // Create particles
    function createParticles() {
        const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    createParticles();

    // Draw connections between nearby particles
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    const opacity = (1 - distance / 150) * 0.3;
                    ctx.strokeStyle = `rgba(0, 229, 255, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw and update particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Draw connections
        drawConnections();

        animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', function() {
        resizeCanvas();
        createParticles();
    });
}

// ========== SCROLL TO TOP FUNCTIONALITY ==========
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');

    if (scrollToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        // Scroll to top when clicked
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ========== AI ANIMATIONS ==========
function initAIAnimations() {
    // Add AI data stream effect to hero text
    const heroHeading = document.querySelector('.hero h1');
    if (heroHeading) {
        heroHeading.style.animation = 'textGlow 3s ease-in-out infinite alternate';
    }

    // Add neural network connections to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add('ai-card');
    });

    // Add floating AI particles
    createAIParticles();

    // Add AI background animations
    createAIBackgroundAnimations();
}

function createAIParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'ai-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        hero.appendChild(particle);
    }
}

function createAIBackgroundAnimations() {
    // Add neural grid overlay to body
    const neuralGrid = document.createElement('div');
    neuralGrid.className = 'neural-grid';
    document.body.appendChild(neuralGrid);

    // Create floating AI nodes across the page
    const nodeCount = Math.floor((window.innerWidth * window.innerHeight) / 30000);
    for (let i = 0; i < nodeCount; i++) {
        const node = document.createElement('div');
        const sizeClass = Math.random() > 0.8 ? 'large' : Math.random() > 0.6 ? 'medium' : '';
        node.className = `ai-node ${sizeClass}`;
        node.style.left = Math.random() * 100 + '%';
        node.style.top = Math.random() * 100 + '%';
        node.style.animationDelay = Math.random() * 20 + 's';
        document.body.appendChild(node);
    }

    // Create data streams
    const streamCount = Math.floor(nodeCount / 4);
    for (let i = 0; i < streamCount; i++) {
        const stream = document.createElement('div');
        const isVertical = Math.random() > 0.5;
        stream.className = `data-stream ${isVertical ? 'vertical' : ''}`;
        stream.style.left = Math.random() * 100 + '%';
        stream.style.top = Math.random() * 100 + '%';
        stream.style.animationDelay = Math.random() * 15 + 's';
        document.body.appendChild(stream);
    }

    // Create synaptic connections
    const connectionCount = Math.floor(nodeCount / 3);
    for (let i = 0; i < connectionCount; i++) {
        const connection = document.createElement('div');
        connection.className = 'synaptic-connection';
        connection.style.left = Math.random() * 100 + '%';
        connection.style.top = Math.random() * 100 + '%';
        connection.style.width = (Math.random() * 200 + 50) + 'px';
        connection.style.animationDelay = Math.random() * 12 + 's';
        document.body.appendChild(connection);
    }

    // Handle window resize - recreate elements
    window.addEventListener('resize', debounce(() => {
        // Remove existing AI elements
        document.querySelectorAll('.ai-node, .data-stream, .synaptic-connection').forEach(el => el.remove());

        // Recreate with new dimensions
        const newNodeCount = Math.floor((window.innerWidth * window.innerHeight) / 30000);
        for (let i = 0; i < newNodeCount; i++) {
            const node = document.createElement('div');
            const sizeClass = Math.random() > 0.8 ? 'large' : Math.random() > 0.6 ? 'medium' : '';
            node.className = `ai-node ${sizeClass}`;
            node.style.left = Math.random() * 100 + '%';
            node.style.top = Math.random() * 100 + '%';
            node.style.animationDelay = Math.random() * 20 + 's';
            document.body.appendChild(node);
        }

        const newStreamCount = Math.floor(newNodeCount / 4);
        for (let i = 0; i < newStreamCount; i++) {
            const stream = document.createElement('div');
            const isVertical = Math.random() > 0.5;
            stream.className = `data-stream ${isVertical ? 'vertical' : ''}`;
            stream.style.left = Math.random() * 100 + '%';
            stream.style.top = Math.random() * 100 + '%';
            stream.style.animationDelay = Math.random() * 15 + 's';
            document.body.appendChild(stream);
        }

        const newConnectionCount = Math.floor(newNodeCount / 3);
        for (let i = 0; i < newConnectionCount; i++) {
            const connection = document.createElement('div');
            connection.className = 'synaptic-connection';
            connection.style.left = Math.random() * 100 + '%';
            connection.style.top = Math.random() * 100 + '%';
            connection.style.width = (Math.random() * 200 + 50) + 'px';
            connection.style.animationDelay = Math.random() * 12 + 's';
            document.body.appendChild(connection);
        }
    }, 500));
}

// ========== LANGUAGE SELECTOR ==========
function initLanguageSelector() {
    const langToggle = document.getElementById('langToggle');
    const langDropdown = document.getElementById('langDropdown');

    if (langToggle && langDropdown) {
        // Toggle dropdown on button click
        langToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            langDropdown.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!langToggle.contains(e.target) && !langDropdown.contains(e.target)) {
                langDropdown.classList.remove('active');
            }
        });

        // Handle language selection
        const langOptions = langDropdown.querySelectorAll('.lang-option');
        langOptions.forEach(option => {
            option.addEventListener('click', function() {
                const selectedLang = this.getAttribute('data-lang');

                // Update active state
                langOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');

                // Close dropdown
                langDropdown.classList.remove('active');

                // Change language (assuming i18n.js is loaded)
                if (window.i18n) {
                    window.i18n.changeLanguage(selectedLang);
                } else {
                    console.warn('i18n system not available');
                }
            });
        });

        // Close dropdown on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && langDropdown.classList.contains('active')) {
                langDropdown.classList.remove('active');
            }
        });
    }
}

// ========== EXPORT FUNCTIONS FOR GLOBAL USE ==========
// Make modal functions available globally for onclick handlers
window.openModal = openModal;
window.closeModal = closeModal;
