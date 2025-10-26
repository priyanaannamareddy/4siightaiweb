// Import GSAP for advanced animations
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const slideNav = document.createElement('div');
    slideNav.className = 'slide-nav';
    let currentSlide = 0;
    let isAnimating = false;
    let touchStartY = 0;
    let touchEndY = 0;

    // Create navigation dots with enhanced styling
    slides.forEach((_, index) => {
        const button = document.createElement('button');
        button.setAttribute('aria-label', `Go to slide ${index + 1}`);
        button.addEventListener('click', () => goToSlide(index));
        slideNav.appendChild(button);
    });
    document.body.appendChild(slideNav);

    // Initialize GSAP timeline for slide transitions
    const slideTimeline = gsap.timeline({ paused: true });

    // Initialize first slide with GSAP
    gsap.set(slides[0], { opacity: 1, y: 0, scale: 1 });
    gsap.set(slides[0].querySelector('.slide-content'), { opacity: 1, y: 0, scale: 1 });

    // Add AI background animations to slides
    initSlideBackgroundAnimations();

    // Handle wheel events with GSAP smooth scrolling
    window.addEventListener('wheel', (e) => {
        if (isAnimating) return;

        if (e.deltaY > 0) {
            nextSlide();
        } else {
            previousSlide();
        }
    });

    // Handle touch events
    window.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    });

    window.addEventListener('touchend', (e) => {
        if (isAnimating) return;

        touchEndY = e.changedTouches[0].clientY;
        const deltaY = touchEndY - touchStartY;

        if (Math.abs(deltaY) > 50) { // Minimum swipe distance
            if (deltaY < 0) {
                nextSlide();
            } else {
                previousSlide();
            }
        }
    });

    // Handle keyboard navigation
    window.addEventListener('keydown', (e) => {
        if (isAnimating) return;

        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
            nextSlide();
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            previousSlide();
        }
    });

    function nextSlide() {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            updateSlides();
        }
    }

    function previousSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlides();
        }
    }

    function goToSlide(index) {
        if (isAnimating || index === currentSlide) return;
        currentSlide = index;
        updateSlides();
    }

    function updateSlides() {
        isAnimating = true;

        // GSAP slide transitions with AI-inspired effects
        slides.forEach((slide, index) => {
            const slideContent = slide.querySelector('.slide-content');

            if (index === currentSlide) {
                // Animate in current slide with GSAP
                gsap.to(slide, {
                    duration: 1.2,
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    ease: "power2.out",
                    onComplete: () => {
                        // Add neural network pulse effect
                        gsap.to(slide, {
                            duration: 2,
                            scale: 1.02,
                            yoyo: true,
                            repeat: 1,
                            ease: "power1.inOut"
                        });
                    }
                });

                gsap.to(slideContent, {
                    duration: 1.5,
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    ease: "back.out(1.7)",
                    delay: 0.3
                });

                // Add data stream animation to slide content
                animateSlideContent(slideContent);

            } else {
                // Animate out other slides
                gsap.to(slide, {
                    duration: 0.8,
                    opacity: 0,
                    y: index < currentSlide ? -100 : 100,
                    scale: 0.9,
                    ease: "power2.in"
                });

                gsap.to(slideContent, {
                    duration: 0.6,
                    opacity: 0,
                    y: 50,
                    scale: 0.9,
                    ease: "power2.in"
                });
            }
        });

        // Update navigation dots with GSAP animations
        const navButtons = slideNav.querySelectorAll('button');
        navButtons.forEach((button, index) => {
            if (index === currentSlide) {
                gsap.to(button, {
                    duration: 0.5,
                    scale: 1.4,
                    backgroundColor: 'var(--secondary-cyan)',
                    borderColor: 'var(--secondary-cyan)',
                    boxShadow: '0 0 15px rgba(0, 229, 255, 0.5)',
                    ease: "back.out(1.7)",
                    delay: 0.2
                });
            } else {
                gsap.to(button, {
                    duration: 0.3,
                    scale: 1,
                    backgroundColor: 'transparent',
                    borderColor: 'var(--white)',
                    boxShadow: 'none',
                    ease: "power2.out"
                });
            }
        });

        // Reset animation lock
        setTimeout(() => {
            isAnimating = false;
        }, 1200);
    }

    function animateSlideContent(content) {
        // Add AI-inspired text animations
        const heading = content.querySelector('.slide-heading');
        const text = content.querySelector('.slide-text');
        const buttons = content.querySelectorAll('.btn');

        if (heading) {
            // Add text glow effect
            gsap.to(heading, {
                duration: 3,
                textShadow: '0 0 20px rgba(0, 229, 255, 0.8)',
                yoyo: true,
                repeat: -1,
                ease: "power1.inOut",
                delay: 1
            });
        }

        if (text) {
            // Add subtle data flow effect
            gsap.to(text, {
                duration: 4,
                backgroundPosition: '200% 0',
                ease: "none",
                repeat: -1,
                delay: 2
            });
        }

        // Animate buttons with stagger
        gsap.fromTo(buttons, {
            y: 30,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.7)",
            delay: 0.8
        });
    }

    function initSlideBackgroundAnimations() {
        // Add AI background elements to each slide
        slides.forEach((slide, index) => {
            const backgroundContainer = document.createElement('div');
            backgroundContainer.className = 'slide-ai-background';
            slide.appendChild(backgroundContainer);

            // Create floating AI elements for each slide
            for (let i = 0; i < 8; i++) {
                const element = document.createElement('div');
                element.className = `slide-ai-element ai-element-${i % 4}`;
                element.style.left = Math.random() * 100 + '%';
                element.style.top = Math.random() * 100 + '%';
                element.style.animationDelay = Math.random() * 3 + 's';
                backgroundContainer.appendChild(element);
            }

            // Add scroll-triggered animations
            ScrollTrigger.create({
                trigger: slide,
                start: "top center",
                end: "bottom center",
                onEnter: () => {
                    gsap.to(backgroundContainer.children, {
                        duration: 2,
                        opacity: 0.6,
                        scale: 1,
                        stagger: 0.1,
                        ease: "power2.out"
                    });
                },
                onLeave: () => {
                    gsap.to(backgroundContainer.children, {
                        duration: 1,
                        opacity: 0.2,
                        scale: 0.8,
                        ease: "power2.in"
                    });
                },
                onEnterBack: () => {
                    gsap.to(backgroundContainer.children, {
                        duration: 2,
                        opacity: 0.6,
                        scale: 1,
                        stagger: 0.1,
                        ease: "power2.out"
                    });
                },
                onLeaveBack: () => {
                    gsap.to(backgroundContainer.children, {
                        duration: 1,
                        opacity: 0.2,
                        scale: 0.8,
                        ease: "power2.in"
                    });
                }
            });
        });
    }
});
