/**
 * ANNA SAPON - Premium Couture Website
 * JavaScript Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initHeader();
    initMobileMenu();
    initAtelierNavigation();
    initTestimonialsSlider();
    initUniversalLightbox();
    initScrollAnimations();
    initSmoothScroll();
    initContactForm();
});

/**
 * Header scroll behavior
 */
function initHeader() {
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobileMenu');
    if (!burger || !mobileMenu) return;

    const mobileLinks = mobileMenu.querySelectorAll('a');

    burger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        burger.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            burger.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/**
 * Atelier section navigation for pairs
 */
function initAtelierNavigation() {
    const atelierSection = document.querySelector('.atelier');
    if (!atelierSection) return;

    const track = atelierSection.querySelector('.atelier__track');
    const pairs = atelierSection.querySelectorAll('.atelier__pair');
    const prevBtn = atelierSection.querySelector('.atelier__arrow--prev');
    const nextBtn = atelierSection.querySelector('.atelier__arrow--next');

    if (!track || pairs.length === 0 || !prevBtn || !nextBtn) return;

    let currentIndex = 0;
    const maxIndex = pairs.length - 1;

    function updateSlider() {
        const pairWidth = pairs[0].offsetWidth;
        const gap = 60; // Gap between pairs
        track.style.transform = `translateX(-${currentIndex * (pairWidth + gap)}px)`;

        // Update button states
        prevBtn.style.opacity = currentIndex === 0 ? '0.3' : '1';
        nextBtn.style.opacity = currentIndex === maxIndex ? '0.3' : '1';
    }

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSlider();
        }
    });

    // Update on resize
    window.addEventListener('resize', () => {
        updateSlider();
    });

    // Initial state
    updateSlider();
}

/**
 * Testimonials slider with auto-play
 */
function initTestimonialsSlider() {
    const track = document.querySelector('.testimonials__track');
    if (!track) return;

    const items = track.querySelectorAll('.testimonials__item');
    let currentIndex = 0;

    function updateSlider() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % items.length;
        updateSlider();
    }

    // Auto-play every 5 seconds
    setInterval(nextSlide, 5000);
}

/**
 * Universal lightbox for all clickable images
 */
function initUniversalLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const lightboxImage = lightbox.querySelector('.lightbox__image');
    const closeBtn = lightbox.querySelector('.lightbox__close');
    const prevBtn = lightbox.querySelector('.lightbox__prev');
    const nextBtn = lightbox.querySelector('.lightbox__next');
    const currentCounter = document.getElementById('lightboxCurrent');
    const totalCounter = document.getElementById('lightboxTotal');

    // Collect all clickable images from multiple sections
    const clickableContainers = document.querySelectorAll('.clickable-image');

    let currentImageIndex = 0;
    const images = [];

    // Extract all image sources
    clickableContainers.forEach(container => {
        const img = container.querySelector('img') || (container.tagName === 'IMG' ? container : null);
        if (img && img.src) {
            images.push({
                src: img.src,
                alt: img.alt || ''
            });
        }
    });

    function updateCounter() {
        if (currentCounter && totalCounter) {
            currentCounter.textContent = currentImageIndex + 1;
            totalCounter.textContent = images.length;
        }
    }

    function openLightbox(index) {
        if (images.length === 0) return;

        currentImageIndex = index;
        lightboxImage.src = images[index].src;
        lightboxImage.alt = images[index].alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        updateCounter();

        // Preload adjacent images
        preloadImage(index - 1);
        preloadImage(index + 1);
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        lightboxImage.src = images[currentImageIndex].src;
        lightboxImage.alt = images[currentImageIndex].alt;
        updateCounter();
        preloadImage(currentImageIndex - 1);
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        lightboxImage.src = images[currentImageIndex].src;
        lightboxImage.alt = images[currentImageIndex].alt;
        updateCounter();
        preloadImage(currentImageIndex + 1);
    }

    function preloadImage(index) {
        const normalizedIndex = (index + images.length) % images.length;
        if (images[normalizedIndex]) {
            const img = new Image();
            img.src = images[normalizedIndex].src;
        }
    }

    // Add click handlers to all clickable containers
    clickableContainers.forEach((container, index) => {
        container.style.cursor = 'pointer';
        container.addEventListener('click', (e) => {
            e.preventDefault();
            openLightbox(index);
        });
    });

    // Also handle gallery items specifically (for backwards compatibility)
    const galleryItems = document.querySelectorAll('.gallery__item:not(.clickable-image)');
    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        if (img) {
            item.style.cursor = 'pointer';
            // Find the index of this image in our images array
            const imgSrc = img.src;
            item.addEventListener('click', () => {
                const imgIndex = images.findIndex(i => i.src === imgSrc);
                if (imgIndex !== -1) {
                    openLightbox(imgIndex);
                }
            });
        }
    });

    // Close button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }

    // Navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', showPrevImage);
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', showNextImage);
    }

    // Click on overlay to close
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrevImage();
        if (e.key === 'ArrowRight') showNextImage();
    });

    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                showNextImage();
            } else {
                showPrevImage();
            }
        }
    }
}

/**
 * Scroll animations using Intersection Observer
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.process__item, .collections__card, .about__content, .atelier__pair, .fashion-show__item, .gallery__item, .testimonials__item'
    );

    // Add fade-in class to elements
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Contact form handling
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    // API endpoint - update this to your deployed backend URL
    const API_URL = 'http://localhost:3000/api/contact';

    // Phone mask
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');

            if (value.length > 0) {
                if (value[0] === '7' || value[0] === '8') {
                    value = value.substring(1);
                }

                let formatted = '+7 ';
                if (value.length > 0) {
                    formatted += '(' + value.substring(0, 3);
                }
                if (value.length > 3) {
                    formatted += ') ' + value.substring(3, 6);
                }
                if (value.length > 6) {
                    formatted += '-' + value.substring(6, 8);
                }
                if (value.length > 8) {
                    formatted += '-' + value.substring(8, 10);
                }

                e.target.value = formatted;
            }
        });
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        // Disable button and show loading state
        submitBtn.textContent = 'Отправка...';
        submitBtn.disabled = true;

        try {
            // Send form data to backend
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                // Success state
                submitBtn.textContent = '✓ Заявка отправлена!';
                submitBtn.style.backgroundColor = '#4CAF50';

                // Show success message
                showNotification('Спасибо! Мы свяжемся с вами в ближайшее время.', 'success');

                // Reset form after 2 seconds
                setTimeout(() => {
                    form.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.disabled = false;
                }, 2000);
            } else {
                // Error from backend
                throw new Error(result.error || 'Ошибка при отправке заявки');
            }
        } catch (error) {
            console.error('Error submitting form:', error);

            // Error state
            submitBtn.textContent = '✗ Ошибка отправки';
            submitBtn.style.backgroundColor = '#e74c3c';

            // Show error message
            showNotification(
                error.message || 'Произошла ошибка. Пожалуйста, позвоните нам напрямую: +7 (985) 416-50-11',
                'error'
            );

            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.backgroundColor = '';
                submitBtn.disabled = false;
            }, 3000);
        }
    });
}

/**
 * Show notification message
 */
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.form-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `form-notification form-notification--${type}`;
    notification.textContent = message;

    // Add to form
    const form = document.getElementById('contactForm');
    if (form) {
        form.insertAdjacentElement('afterend', notification);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
}

/**
 * Parallax effect for hero section
 */
function initParallax() {
    const hero = document.querySelector('.hero__background img');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    });
}

// Initialize parallax on load
initParallax();
