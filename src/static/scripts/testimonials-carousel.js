/**
 * Testimonials Carousel
 * Initialize testimonials carousel using generic carousel component
 */

function setupTestimonialsCarousel() {
  // Initialize carousel with testimonials-specific configuration
  const carousel = createCarousel({
    trackSelector: '[data-carousel-track="testimonials"]',
    slideSelector: '[data-carousel-slide="testimonials"]',
    prevButtonSelector: '[data-carousel-prev="testimonials"]',
    nextButtonSelector: '[data-carousel-next="testimonials"]',
    dotsSelector: '[data-carousel-dot="testimonials"]',
    autoRotateDelay: 7000,
    swipeThreshold: 50,
    enableAutoRotate: true,
    enableSwipe: true,
    enableKeyboard: true
  });

  // Store carousel instance globally if needed
  if (carousel) {
    window.testimonialsCarousel = carousel;
  }
}

// Use shared onReady utility from dark-mode.js
onReady(setupTestimonialsCarousel);
