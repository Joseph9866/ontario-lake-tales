// Swiper functionality
class TurtleSwiper {
    constructor() {
        this.currentSlide = 0;
        this.wrapper = document.querySelector('.swiper-wrapper');
        this.slides = document.querySelectorAll('.swiper-slide');
        this.totalSlides = this.slides.length;
        this.prevButton = document.querySelector('.swiper-button-prev');
        this.nextButton = document.querySelector('.swiper-button-next');
        this.pagination = document.querySelector('.swiper-pagination');
        
        this.init();
    }

    init() {
        // Create pagination bullets
        this.createPagination();
        
        // Add event listeners
        this.prevButton.addEventListener('click', () => this.prevSlide());
        this.nextButton.addEventListener('click', () => this.nextSlide());
        
        // Auto play
        this.startAutoPlay();
        
        // Pause on hover
        const container = document.querySelector('.swiper-container');
        container.addEventListener('mouseenter', () => this.stopAutoPlay());
        container.addEventListener('mouseleave', () => this.startAutoPlay());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });

        // Touch/swipe support
        this.addTouchSupport();
    }

    createPagination() {
        for (let i = 0; i < this.totalSlides; i++) {
            const bullet = document.createElement('div');
            bullet.classList.add('swiper-pagination-bullet');
            if (i === 0) bullet.classList.add('active');
            bullet.addEventListener('click', () => this.goToSlide(i));
            this.pagination.appendChild(bullet);
        }
    }

    updatePagination() {
        const bullets = document.querySelectorAll('.swiper-pagination-bullet');
        bullets.forEach((bullet, index) => {
            bullet.classList.toggle('active', index === this.currentSlide);
        });
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlider();
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateSlider();
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateSlider();
    }

    updateSlider() {
        const offset = -this.currentSlide * 100;
        this.wrapper.style.transform = `translateX(${offset}%)`;
        this.updatePagination();
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
    }

    addTouchSupport() {
        let startX = 0;
        let endX = 0;
        const container = document.querySelector('.swiper-container');

        container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        container.addEventListener('touchmove', (e) => {
            endX = e.touches[0].clientX;
        });

        container.addEventListener('touchend', () => {
            const diff = startX - endX;
            if (Math.abs(diff) > 50) { // Minimum swipe distance
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
        });
    }
}

// Initialize swiper when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TurtleSwiper();
});
