/**
 * Generic Carousel Component
 * Reusable carousel with navigation, auto-rotate, swipe, and keyboard support
 */

/**
 * Create a carousel instance
 * @param {Object} config - Configuration object
 * @param {string} config.trackSelector - Selector for the carousel track element
 * @param {string} config.slideSelector - Selector for individual slides
 * @param {string} config.prevButtonSelector - Selector for previous button
 * @param {string} config.nextButtonSelector - Selector for next button
 * @param {string} config.dotsSelector - Selector for dot navigation buttons
 * @param {number} [config.autoRotateDelay=7000] - Auto-rotation delay in ms
 * @param {number} [config.swipeThreshold=50] - Swipe threshold in pixels
 * @param {boolean} [config.enableAutoRotate=true] - Enable auto-rotation
 * @param {boolean} [config.enableSwipe=true] - Enable swipe/drag support
 * @param {boolean} [config.enableKeyboard=true] - Enable keyboard navigation
 * @param {Function} [config.onSlideChange] - Callback when slide changes
 * @returns {Object} Carousel API
 */
function createCarousel(config) {
  const {
    trackSelector,
    slideSelector,
    prevButtonSelector,
    nextButtonSelector,
    dotsSelector,
    autoRotateDelay = 7000,
    swipeThreshold = 50,
    enableAutoRotate = true,
    enableSwipe = true,
    enableKeyboard = true,
    onSlideChange = null
  } = config;

  const track = document.querySelector(trackSelector);
  const slides = document.querySelectorAll(slideSelector);
  const prevButton = document.querySelector(prevButtonSelector);
  const nextButton = document.querySelector(nextButtonSelector);
  const dots = document.querySelectorAll(dotsSelector);

  if (!track || slides.length === 0) {
    return null;
  }

  let currentIndex = 0;
  let autoRotateInterval = null;
  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationID = null;

  // Update carousel to show specific slide
  function updateCarousel(index, animate = true) {
    // Bounds checking with infinite loop
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    const oldIndex = currentIndex;
    currentIndex = index;

    // Calculate prev and next indices with wrapping
    const prevIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    const nextIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;

    // Update slides with position states
    slides.forEach((slide, i) => {
      let position = 'hidden';

      if (i === currentIndex) {
        position = 'active';
        slide.setAttribute('data-active', 'true');
      } else {
        slide.setAttribute('data-active', 'false');

        if (i === prevIndex) {
          position = 'prev';
        } else if (i === nextIndex) {
          position = 'next';
        }
      }

      slide.setAttribute('data-position', position);

      if (animate) {
        slide.style.transition = 'opacity 500ms ease, transform 500ms ease';
      } else {
        slide.style.transition = 'none';
      }
    });

    // Update dots
    dots.forEach((dot, i) => {
      const isActive = i === currentIndex;
      dot.setAttribute('aria-selected', isActive);
    });

    // Update button states
    if (prevButton && nextButton) {
      prevButton.removeAttribute('disabled');
      nextButton.removeAttribute('disabled');
    }

    // Call change callback
    if (onSlideChange && oldIndex !== currentIndex) {
      onSlideChange(currentIndex, oldIndex);
    }
  }

  // Navigation functions
  function goToSlide(index) {
    if (enableAutoRotate) stopAutoRotate();
    updateCarousel(index);
    if (enableAutoRotate) startAutoRotate();
  }

  function goToPrev() {
    goToSlide(currentIndex - 1);
  }

  function goToNext() {
    goToSlide(currentIndex + 1);
  }

  // Auto-rotate
  function startAutoRotate() {
    if (!enableAutoRotate) return;
    stopAutoRotate();
    autoRotateInterval = setInterval(() => {
      goToNext();
    }, autoRotateDelay);
  }

  function stopAutoRotate() {
    if (autoRotateInterval) {
      clearInterval(autoRotateInterval);
      autoRotateInterval = null;
    }
  }

  // Touch/Mouse drag support
  function getPositionX(event) {
    return event.type.includes('mouse')
      ? event.pageX
      : event.touches[0].clientX;
  }

  function touchStart(event) {
    if (!enableSwipe) return;
    isDragging = true;
    startPos = getPositionX(event);
    animationID = requestAnimationFrame(animation);
    track.style.cursor = 'grabbing';
    if (enableAutoRotate) stopAutoRotate();
  }

  function touchMove(event) {
    if (!enableSwipe || !isDragging) return;
    const currentPosition = getPositionX(event);
    currentTranslate = prevTranslate + currentPosition - startPos;
  }

  function touchEnd() {
    if (!enableSwipe || !isDragging) return;
    isDragging = false;
    cancelAnimationFrame(animationID);
    track.style.cursor = 'grab';

    const movedBy = currentTranslate - prevTranslate;

    // Swiped left (next)
    if (movedBy < -swipeThreshold) {
      goToNext();
    }
    // Swiped right (prev)
    else if (movedBy > swipeThreshold) {
      goToPrev();
    } else {
      // Snap back
      currentTranslate = prevTranslate;
      if (enableAutoRotate) startAutoRotate();
    }

    prevTranslate = 0;
    currentTranslate = 0;
  }

  function animation() {
    if (isDragging) {
      requestAnimationFrame(animation);
    }
  }

  // Keyboard navigation
  function handleKeydown(event) {
    if (!enableKeyboard) return;
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goToPrev();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      goToNext();
    }
  }

  // Pause on hover/focus
  function handleFocus() {
    if (enableAutoRotate) stopAutoRotate();
  }

  function handleBlur() {
    if (enableAutoRotate) startAutoRotate();
  }

  // Attach all event listeners
  function attachEventListeners() {
    // Button navigation
    if (prevButton) prevButton.addEventListener('click', goToPrev);
    if (nextButton) nextButton.addEventListener('click', goToNext);

    // Dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => goToSlide(index));
    });

    // Touch events
    if (enableSwipe) {
      track.addEventListener('touchstart', touchStart, { passive: true });
      track.addEventListener('touchmove', touchMove, { passive: true });
      track.addEventListener('touchend', touchEnd);

      // Mouse events (for desktop drag)
      track.addEventListener('mousedown', touchStart);
      track.addEventListener('mousemove', touchMove);
      track.addEventListener('mouseup', touchEnd);
      track.addEventListener('mouseleave', () => {
        if (isDragging) touchEnd();
      });
    }

    // Keyboard navigation
    if (enableKeyboard) {
      track.addEventListener('keydown', handleKeydown);
    }

    // Pause on hover/focus
    if (enableAutoRotate) {
      track.addEventListener('mouseenter', handleFocus);
      track.addEventListener('mouseleave', handleBlur);
      track.addEventListener('focusin', handleFocus);
      track.addEventListener('focusout', handleBlur);
    }

    // Pause when page hidden
    if (enableAutoRotate) {
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          stopAutoRotate();
        } else {
          startAutoRotate();
        }
      });
    }
  }

  // Initialize
  function init() {
    updateCarousel(0, false);
    if (enableAutoRotate) startAutoRotate();
    attachEventListeners();
  }

  // Public API
  const api = {
    goToSlide,
    goToPrev,
    goToNext,
    getCurrentIndex: () => currentIndex,
    getTotalSlides: () => slides.length,
    startAutoRotate,
    stopAutoRotate,
    destroy: () => {
      stopAutoRotate();
      // Event listeners would be cleaned up here in production
    }
  };

  // Initialize and return API
  init();
  return api;
}
