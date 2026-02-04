/**
 * Scroll-triggered animations using GSAP ScrollTrigger
 */

document.addEventListener('DOMContentLoaded', function() {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger, InertiaPlugin);

  // Default animation settings
  const defaultFrom = {
    opacity: 0,
    y: 40
  };

  const defaultTo = {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: 'power2.out'
  };

  // Animate sections on scroll (excluding services which is visible above the fold)
  const sections = document.querySelectorAll('.discovery, .testimonials, .process, .cta, .faq');

  sections.forEach(section => {
    // Animate section titles
    const title = section.querySelector('h2, .testimonials__title, .process__title, .faq__title');
    if (title) {
      gsap.fromTo(title,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  });

  // Animate cards with stagger
  const cardContainers = document.querySelectorAll('.services__steps, .discovery__band--steps, .testimonials__list, .process__steps');

  cardContainers.forEach(container => {
    const cards = container.querySelectorAll('.card, .testimonial');

    if (cards.length) {
      gsap.fromTo(cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.15,
          clearProps: 'transform',
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  });

  // Animate discovery bands
  const discoveryBands = document.querySelectorAll('.discovery__band:not(.discovery__band--steps)');

  discoveryBands.forEach(band => {
    gsap.fromTo(band,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: band,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Animate FAQ items with stagger
  const faqItems = document.querySelectorAll('.faq__item');

  if (faqItems.length) {
    gsap.fromTo(faqItems,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.4,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.faq__items',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
  }

  // Animate CTA section
  const ctaSection = document.querySelector('section.cta');

  if (ctaSection) {
    gsap.fromTo(ctaSection.querySelector('.cta__content'),
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ctaSection,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
  }

  // About page animations
  const aboutSections = document.querySelectorAll('.about-story, .about-why, .about-expertise, .about-process, .about-personal');

  aboutSections.forEach(section => {
    // Animate section titles
    const title = section.querySelector('h2');
    if (title) {
      gsap.fromTo(title,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    // Animate section content
    const content = section.querySelector('[class$="__content"], [class$="__intro"]');
    if (content) {
      gsap.fromTo(content,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: content,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  });

  // Animate about-expertise columns with stagger
  const expertiseColumns = document.querySelectorAll('.about-expertise__services, .about-expertise__values');
  if (expertiseColumns.length) {
    gsap.fromTo(expertiseColumns,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.about-expertise__content',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
  }

  // Animate about-process cards with stagger
  const processItems = document.querySelectorAll('.about-process__item');
  if (processItems.length) {
    gsap.fromTo(processItems,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.about-process__items',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
  }

  // Animate about-process closing text
  const processClosing = document.querySelector('.about-process__closing');
  if (processClosing) {
    gsap.fromTo(processClosing,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: processClosing,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  }

  // Services page animations
  const serviceDetails = document.querySelectorAll('.service-detail');

  serviceDetails.forEach(section => {
    // Animate header
    const header = section.querySelector('.service-detail__header');
    if (header) {
      gsap.fromTo(header,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    // Animate content columns with stagger
    const contentCols = section.querySelectorAll('.service-detail__description, .service-detail__features');
    if (contentCols.length) {
      gsap.fromTo(contentCols,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: section.querySelector('.service-detail__content'),
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    // Animate note if present
    const note = section.querySelector('.service-detail__note');
    if (note) {
      gsap.fromTo(note,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: note,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    // Animate fit box
    const fit = section.querySelector('.service-detail__fit');
    if (fit) {
      gsap.fromTo(fit,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: fit,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  });

  // Animate services-unsure section
  const servicesUnsure = document.querySelector('.services-unsure');
  if (servicesUnsure) {
    gsap.fromTo(servicesUnsure,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: servicesUnsure,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  }

  // Contact page animations
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    gsap.fromTo(contactForm,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: contactForm,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  }
});
