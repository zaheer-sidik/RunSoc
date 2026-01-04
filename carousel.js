// Dynamic Instagram Carousel Handler
// This script automatically creates carousel slides from instagram-embeds.js

document.addEventListener('DOMContentLoaded', function() {
    // Check if instagramPosts is defined
    if (typeof instagramPosts === 'undefined') {
        console.warn('Instagram posts not found. Using default carousel.');
        initializeDefaultCarousel();
        return;
    }

    // Build carousel dynamically from Instagram posts
    buildInstagramCarousel();
    
    // Initialize carousel functionality
    initializeCarousel();
    
    // Load Instagram embed script
    loadInstagramEmbedScript();
});

function buildInstagramCarousel() {
    const carousel = document.querySelector('.carousel');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    if (!carousel || !dotsContainer) return;
    
    // Clear existing content
    carousel.innerHTML = '';
    dotsContainer.innerHTML = '';
    
    // Create slides from Instagram posts
    instagramPosts.forEach((post, index) => {
        // Create slide
        const slide = createSlide(post, index);
        carousel.appendChild(slide);
        
        // Create dot
        const dot = createDot(index);
        dotsContainer.appendChild(dot);
    });
    
    // Set first slide as active
    if (carousel.children.length > 0) {
        carousel.children[0].classList.add('active');
        dotsContainer.children[0].classList.add('active');
    }
}

function createSlide(post, index) {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    
    // Check if embed code is provided and not a placeholder
    const hasRealEmbed = post.embedCode && 
                         post.embedCode.includes('instagram-media') && 
                         !post.embedCode.includes('PASTE YOUR');
    
    if (hasRealEmbed) {
        // Use Instagram embed
        slide.innerHTML = `
            <div class="post-card">
                <div class="instagram-embed-container">
                    ${post.embedCode}
                </div>
            </div>
        `;
    } else {
        // Use fallback display
        slide.innerHTML = `
            <div class="post-card">
                <div class="post-image">
                    <img src="${post.fallbackImage}" alt="${post.title}" onerror="this.parentElement.style.background='linear-gradient(135deg, #FFD700 0%, #FFA500 100%)'">
                </div>
                <div class="post-content">
                    <h3>${post.title}</h3>
                    <p>${post.fallbackText}</p>
                    <a href="https://www.instagram.com/runsocharrow/" target="_blank" class="instagram-link">
                        <i class="fab fa-instagram"></i> View on Instagram
                    </a>
                </div>
            </div>
        `;
    }
    
    return slide;
}

function createDot(index) {
    const dot = document.createElement('span');
    dot.className = 'dot';
    dot.setAttribute('data-slide', index);
    
    dot.addEventListener('click', function() {
        showSlide(index);
        resetAutoplay();
    });
    
    return dot;
}

function initializeCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    if (!slides.length) return;
    
    let currentSlide = 0;
    const slideCount = slides.length;
    let autoplayInterval;

    // Function to show a specific slide
    window.showSlide = function(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        if (index >= slideCount) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slideCount - 1;
        } else {
            currentSlide = index;
        }
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    };

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Event listeners for buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            prevSlide();
            resetAutoplay();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            nextSlide();
            resetAutoplay();
        });
    }

    // Autoplay functionality
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    window.resetAutoplay = function() {
        stopAutoplay();
        startAutoplay();
    };

    // Start autoplay
    startAutoplay();

    // Pause on hover
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoplay);
        carouselContainer.addEventListener('mouseleave', startAutoplay);
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetAutoplay();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoplay();
        }
    });
}

function initializeDefaultCarousel() {
    // Original carousel code from script.js
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    if (!slides.length) return;
    
    let currentSlide = 0;
    const slideCount = slides.length;
    let autoplayInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        if (index >= slideCount) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slideCount - 1;
        } else {
            currentSlide = index;
        }
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoplay(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoplay(); });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => { showSlide(index); resetAutoplay(); });
    });

    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
    }

    startAutoplay();

    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoplay);
        carouselContainer.addEventListener('mouseleave', startAutoplay);
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') { prevSlide(); resetAutoplay(); }
        else if (e.key === 'ArrowRight') { nextSlide(); resetAutoplay(); }
    });
}

function loadInstagramEmbedScript() {
    // Check if script already exists
    if (document.querySelector('script[src*="instagram.com/embed.js"]')) {
        // Reload Instagram embeds
        if (window.instgrm) {
            window.instgrm.Embeds.process();
        }
        return;
    }
    
    // Load Instagram embed script
    const script = document.createElement('script');
    script.async = true;
    script.src = '//www.instagram.com/embed.js';
    document.body.appendChild(script);
}

// Scroll animation for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for animation
setTimeout(() => {
    document.querySelectorAll('.session-card, .feature').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}, 100);

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
