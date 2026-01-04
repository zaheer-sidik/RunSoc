// Dynamic Instagram Carousel - Loads from codes.txt
// Automatically creates carousel slides from Instagram embed codes

document.addEventListener('DOMContentLoaded', async function() {
    await loadInstagramEmbeds();
    initializeCarousel();
    loadInstagramEmbedScript();
});

async function loadInstagramEmbeds() {
    try {
        // Fetch the codes.txt file
        const response = await fetch('codes.txt');
        const text = await response.text();
        
        // Split by <blockquote to find all embed codes
        const embedBlocks = text.split('<blockquote').filter(block => block.trim().length > 0);
        
        const carousel = document.querySelector('.carousel');
        const dotsContainer = document.querySelector('.carousel-dots');
        
        if (!carousel || !dotsContainer) return;
        
        // Clear existing content
        carousel.innerHTML = '';
        dotsContainer.innerHTML = '';
        
        // Create a slide for each embed code
        embedBlocks.forEach((block, index) => {
            // Reconstruct the complete blockquote
            const embedCode = '<blockquote' + block.split('</blockquote>')[0] + '</blockquote>';
            
            // Only process if it looks like a valid Instagram embed
            if (embedCode.includes('instagram-media') && embedCode.includes('instagram.com/p/')) {
                const slide = createSlide(embedCode, index);
                carousel.appendChild(slide);
                
                const dot = createDot(index);
                dotsContainer.appendChild(dot);
            }
        });
        
        // Set first slide as active
        if (carousel.children.length > 0) {
            carousel.children[0].classList.add('active');
            dotsContainer.children[0].classList.add('active');
        }
        
        console.log(`Loaded ${carousel.children.length} Instagram posts`);
        
    } catch (error) {
        console.error('Error loading Instagram embeds:', error);
        showFallbackMessage();
    }
}

function createSlide(embedCode) {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    
    slide.innerHTML = `
        <div class="post-card">
            <div class="instagram-embed-container">
                ${embedCode}
            </div>
        </div>
    `;
    
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

function showFallbackMessage() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;
    
    carousel.innerHTML = `
        <div class="carousel-slide active">
            <div class="post-card">
                <div class="post-content" style="padding: 3rem; text-align: center;">
                    <h3 style="color: var(--yellow);">Follow Us on Instagram</h3>
                    <p style="color: #cccccc; margin: 2rem 0;">
                        Check out our latest posts and community updates!
                    </p>
                    <a href="https://www.instagram.com/runsocharrow/" target="_blank" class="instagram-link" style="display: inline-flex;">
                        <i class="fab fa-instagram"></i> @runsocharrow
                    </a>
                    <p style="color: #999; font-size: 0.9rem; margin-top: 2rem;">
                        Add Instagram embed codes to <strong>codes.txt</strong> to display posts here.
                    </p>
                </div>
            </div>
        </div>
    `;
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
        if (dots[currentSlide]) {
            dots[currentSlide].classList.add('active');
        }
    };

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

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

    startAutoplay();

    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoplay);
        carouselContainer.addEventListener('mouseleave', startAutoplay);
    }

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

function loadInstagramEmbedScript() {
    if (document.querySelector('script[src*="instagram.com/embed.js"]')) {
        if (window.instgrm) {
            window.instgrm.Embeds.process();
        }
        return;
    }
    
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

setTimeout(() => {
    document.querySelectorAll('.session-card, .feature').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}, 100);

// Smooth scrolling
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
