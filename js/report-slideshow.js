// Annual Report Slideshow Functionality
document.addEventListener('DOMContentLoaded', () => {
    initReportSlideshow();
});

function initReportSlideshow() {
    const slides = document.querySelectorAll('.report-slide');
    const navDots = document.querySelectorAll('.report-dot');
    const slidesContainer = document.querySelector('.report-slides-container');
    let currentSlide = 0;
    let isAnimating = false;

    // Initialize first slide
    updateSlides();

    // Navigation button event listeners
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('report-nav-btn')) {
            if (e.target.classList.contains('next-btn') && !e.target.disabled) {
                nextSlide();
            } else if (e.target.classList.contains('prev-btn') && !e.target.disabled) {
                prevSlide();
            }
        }

        if (e.target.classList.contains('report-dot')) {
            const slideIndex = parseInt(e.target.dataset.slide);
            goToSlide(slideIndex);
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (isAnimating) return;

        if (e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prevSlide();
        }
    });

    function nextSlide() {
        if (currentSlide < slides.length - 1 && !isAnimating) {
            currentSlide++;
            updateSlides();
        }
    }

    function prevSlide() {
        if (currentSlide > 0 && !isAnimating) {
            currentSlide--;
            updateSlides();
        }
    }

    function goToSlide(index) {
        if (index !== currentSlide && !isAnimating) {
            currentSlide = index;
            updateSlides();
        }
    }

    function updateSlides() {
        isAnimating = true;

        // Update slide visibility with GSAP animations
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                // Animate current slide in
                gsap.to(slide, {
                    duration: 0.8,
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    ease: "power2.out",
                    onComplete: () => {
                        slide.classList.add('active');
                        slide.classList.remove('prev');
                    }
                });

                // Animate slide content
                const content = slide.querySelector('.report-slide-content');
                gsap.fromTo(content.children, {
                    y: 30,
                    opacity: 0
                }, {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "back.out(1.7)",
                    delay: 0.2
                });

            } else if (index < currentSlide) {
                // Previous slides
                gsap.to(slide, {
                    duration: 0.6,
                    opacity: 0,
                    x: -100,
                    scale: 0.9,
                    ease: "power2.in",
                    onComplete: () => {
                        slide.classList.remove('active');
                        slide.classList.add('prev');
                    }
                });
            } else {
                // Next slides
                gsap.to(slide, {
                    duration: 0.6,
                    opacity: 0,
                    x: 100,
                    scale: 0.9,
                    ease: "power2.in",
                    onComplete: () => {
                        slide.classList.remove('active', 'prev');
                    }
                });
            }
        });

        // Update navigation dots
        navDots.forEach((dot, index) => {
            if (index === currentSlide) {
                gsap.to(dot, {
                    duration: 0.3,
                    scale: 1.4,
                    backgroundColor: 'var(--secondary-cyan)',
                    borderColor: 'var(--secondary-cyan)',
                    boxShadow: '0 0 15px rgba(0, 229, 255, 0.5)',
                    ease: "back.out(1.7)"
                });
            } else {
                gsap.to(dot, {
                    duration: 0.3,
                    scale: 1,
                    backgroundColor: 'transparent',
                    borderColor: 'var(--white)',
                    boxShadow: 'none',
                    ease: "power2.out"
                });
            }
        });

        // Update navigation buttons
        const prevBtn = document.querySelector('.report-nav-btn.prev-btn');
        const nextBtn = document.querySelector('.report-nav-btn.next-btn');

        if (prevBtn) {
            if (currentSlide === 0) {
                prevBtn.disabled = true;
                gsap.to(prevBtn, { duration: 0.3, opacity: 0.5 });
            } else {
                prevBtn.disabled = false;
                gsap.to(prevBtn, { duration: 0.3, opacity: 1 });
            }
        }

        if (nextBtn) {
            if (currentSlide === slides.length - 1) {
                nextBtn.disabled = true;
                gsap.to(nextBtn, { duration: 0.3, opacity: 0.5 });
                nextBtn.textContent = 'Complete';
            } else {
                nextBtn.disabled = false;
                gsap.to(nextBtn, { duration: 0.3, opacity: 1 });
                nextBtn.textContent = 'Next';
            }
        }

        // Reset animation lock
        setTimeout(() => {
            isAnimating = false;
        }, 800);
    }

    // Add scroll-triggered animations for report section
    const reportSection = document.querySelector('.annual-report-slideshow');
    if (reportSection) {
        ScrollTrigger.create({
            trigger: reportSection,
            start: "top center",
            end: "bottom center",
            onEnter: () => {
                // Add subtle background animation when entering report section
                gsap.to(reportSection, {
                    duration: 2,
                    backgroundPosition: '200% 0',
                    ease: "none",
                    repeat: -1
                });
            }
        });
    }

    // Add touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    reportSection.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    reportSection.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchStartX - touchEndX;

        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                nextSlide(); // Swipe left
            } else {
                prevSlide(); // Swipe right
            }
        }
    }
}

// Export for potential use in other modules
export { initReportSlideshow };
