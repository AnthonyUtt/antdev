// Mobile Navigation Toggle
function setupMobileNav() {
  const hamburger = document.querySelector('.header__hamburger');
  const nav = document.querySelector('.header__nav');

  if (!hamburger || !nav) return;

  // Toggle menu open/close
  hamburger.addEventListener('click', function(e) {
    e.stopPropagation();
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';

    hamburger.setAttribute('aria-expanded', !isExpanded);
    nav.classList.toggle('is-open');
  });

  // Close menu on any mousedown outside
  document.addEventListener('mousedown', function(e) {
    const isOpen = nav.classList.contains('is-open');

    if (isOpen) {
      // Menu is open, close it and stop propagation
      const isClickInside = nav.contains(e.target) || hamburger.contains(e.target);

      if (!isClickInside) {
        hamburger.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
      }

      e.stopPropagation();
    }
    // If menu is closed, allow propagation (do nothing)
  });

  // Close menu when a navigation link is clicked
  nav.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      hamburger.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
    });
  });

  // Close menu when user scrolls
  window.addEventListener('scroll', function() {
    const isOpen = nav.classList.contains('is-open');

    if (isOpen) {
      hamburger.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
    }
  });
}

onReady(setupMobileNav);
