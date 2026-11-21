
/**
 * Mazorya Group - Animation Manager
 * File: core/animations.js
 *
 * Supports:
 * - Scroll Reveal
 * - Hero Animations
 * - Count Up
 * - Hover Effects
 * - FAQ Accordion
 * - Parallax
 * - About Page
 * - Service Details
 * - SPA Cleanup
 */

// ============================================================
// ANIMATION LIFECYCLE
// ============================================================

const observers = new Set();
const listeners = [];
const timers = new Set();
const frames = new Set();
const originalStyles = new Map();

let initialized = false;

// ============================================================
// HELPERS
// ============================================================

function reducedMotion() {
  return (
    typeof window.matchMedia === 'function' &&
    window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
  );
}

function saveStyle(element, property) {
  if (!element) return;

  if (!originalStyles.has(element)) {
    originalStyles.set(element, new Map());
  }

  const properties = originalStyles.get(element);

  if (!properties.has(property)) {
    properties.set(property, {
      value: element.style.getPropertyValue(property),
      priority: element.style.getPropertyPriority(property)
    });
  }
}

function setStyle(element, property, value) {
  if (!element) return;

  saveStyle(element, property);
  element.style.setProperty(property, String(value));
}

function addListener(target, event, handler, options) {
  target.addEventListener(event, handler, options);

  listeners.push({
    target,
    event,
    handler,
    options
  });
}

function addTimeout(callback, delay) {
  const id = setTimeout(() => {
    timers.delete(id);
    callback();
  }, delay);

  timers.add(id);
  return id;
}

function addFrame(callback) {
  const id = requestAnimationFrame(() => {
    frames.delete(id);
    callback();
  });

  frames.add(id);
  return id;
}

function restoreStyles() {
  originalStyles.forEach((properties, element) => {
    properties.forEach((original, property) => {
      if (original.value) {
        element.style.setProperty(
          property,
          original.value,
          original.priority
        );
      } else {
        element.style.removeProperty(property);
      }
    });
  });

  originalStyles.clear();
}

/**
 * Observe an element once.
 */
function observeOnScroll(
  element,
  callback,
  options = {}
) {
  if (!element) return;

  if (
    reducedMotion() ||
    typeof IntersectionObserver === 'undefined'
  ) {
    callback();
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        observer.unobserve(entry.target);

        if (element.isConnected) {
          callback();
        }

        observer.disconnect();
        observers.delete(observer);
      });
    },
    {
      threshold: options.threshold ?? 0.2,
      rootMargin:
        options.rootMargin ?? '0px 0px -30px 0px'
    }
  );

  observer.observe(element);
  observers.add(observer);
}

/**
 * Standard scroll reveal effect.
 */
function revealElement(
  element,
  {
    transform = 'translateY(30px)',
    transition = 'all 0.6s ease',
    threshold = 0.2,
    rootMargin = '0px 0px -30px 0px'
  } = {}
) {
  if (!element) return;

  if (reducedMotion()) {
    setStyle(element, 'opacity', '1');
    return;
  }

  setStyle(element, 'opacity', '0');
  setStyle(element, 'transform', transform);
  setStyle(element, 'transition', transition);

  observeOnScroll(
    element,
    () => {
      addFrame(() => {
        setStyle(element, 'opacity', '1');
        setStyle(element, 'transform', 'none');
      });
    },
    { threshold, rootMargin }
  );
}

// ============================================================
// 1. SCROLL ANIMATIONS
// ============================================================

export function initScrollAnimations() {
  const elements = document.querySelectorAll(`
    .client-section,
    .feature-card,
    .service-post-card,
    .project-card-wrap,
    .blog-main-card,
    .blog-side-item,
    .count-item-wrap,
    .cta-section
  `);

  elements.forEach(element => {
    // Service Details has its own CTA animation.
    if (
      element.matches('.cta-section') &&
      document.querySelector('.service-details-title')
    ) {
      return;
    }

    element.classList.add('animate-ready');

    if (reducedMotion()) {
      element.classList.add('animate-in');
      return;
    }

    observeOnScroll(
      element,
      () => {
        element.classList.add('animate-in');
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -30px 0px'
      }
    );
  });
}

// ============================================================
// 2. HERO ANIMATION
// ============================================================

export function initHeroAnimation() {
  const heroTitle = document.querySelector(
    '.hero-title'
  );

  const heroSubtitle = document.querySelector(
    '.hero-subtitle'
  );

  const heroBtn = document.querySelector(
    '.hero-btn'
  );

  const heroCharacter = document.querySelector(
    '.hero-character'
  );

  if (reducedMotion()) {
    [heroTitle, heroSubtitle, heroBtn].forEach(el => {
      if (el) {
        setStyle(el, 'opacity', '1');
        setStyle(el, 'animation', 'none');
      }
    });

    return;
  }

  if (heroTitle) {
    setStyle(
      heroTitle,
      'animation',
      'fadeInUp 0.8s ease forwards'
    );
  }

  if (heroSubtitle) {
    setStyle(heroSubtitle, 'opacity', '0');

    setStyle(
      heroSubtitle,
      'animation',
      'fadeInUp 0.8s ease 0.2s forwards'
    );
  }

  if (heroBtn) {
    setStyle(heroBtn, 'opacity', '0');

    setStyle(
      heroBtn,
      'animation',
      'fadeInUp 0.8s ease 0.4s forwards'
    );
  }

  if (heroCharacter) {
    setStyle(
      heroCharacter,
      'animation',
      'float 6s ease-in-out infinite'
    );
  }
}

// ============================================================
// 3. COUNT UP
// ============================================================

export function initCountUp() {
  const elements = document.querySelectorAll(
    '.count-title'
  );

  elements.forEach(element => {
    const originalText =
      element.textContent?.trim() || '';

    const match = originalText.match(
      /(\d[\d,]*)/
    );

    if (!match) return;

    const target = Number(
      match[1].replace(/,/g, '')
    );

    if (!Number.isFinite(target) || target < 0) {
      return;
    }

    const originalNumber = match[1];
    const useGrouping = originalNumber.includes(',');

    const prefix = originalText.slice(
      0,
      match.index
    );

    const suffix = originalText.slice(
      match.index + originalNumber.length
    );

    if (reducedMotion() || target === 0) {
      return;
    }

    const formatNumber = value => {
      const number = Math.floor(value);

      return useGrouping
        ? number.toLocaleString('en-US')
        : String(number);
    };

    observeOnScroll(
      element,
      () => {
        const duration = 1500;
        let startTime = null;

        function animate(timestamp) {
          if (!element.isConnected) return;

          if (startTime === null) {
            startTime = timestamp;
          }

          const elapsed = timestamp - startTime;

          const progress = Math.min(
            elapsed / duration,
            1
          );

          // Ease-out cubic.
          const eased =
            1 - Math.pow(1 - progress, 3);

          const value = target * eased;

          element.textContent =
            prefix +
            formatNumber(value) +
            suffix;

          if (progress < 1) {
            addFrame(animate);
          } else {
            element.textContent = originalText;
          }
        }

        addFrame(animate);
      },
      { threshold: 0.5 }
    );
  });
}

// ============================================================
// 4. HOVER ANIMATIONS
// ============================================================

export function initHoverAnimations() {
  if (reducedMotion()) return;

  // Feature cards.
  document.querySelectorAll(
    '.feature-card'
  ).forEach(card => {
    const originalTransform = card.style.transform;

    addListener(card, 'mouseenter', () => {
      setStyle(
        card,
        'transform',
        'translateY(-8px)'
      );
    });

    addListener(card, 'mouseleave', () => {
      setStyle(
        card,
        'transform',
        originalTransform || 'none'
      );
    });
  });

  // Service cards.
  document.querySelectorAll(
    '.service-post-card'
  ).forEach(card => {
    const line = card.querySelector(
      '.service-card-title-line-wrap'
    );

    if (!line) return;

    const originalWidth = line.style.width;

    addListener(card, 'mouseenter', () => {
      setStyle(line, 'width', '50px');
    });

    addListener(card, 'mouseleave', () => {
      setStyle(
        line,
        'width',
        originalWidth || '0px'
      );
    });
  });

  // Project cards.
  document.querySelectorAll(
    '.project-card-wrap'
  ).forEach(card => {
    const overlay = card.querySelector(
      '.project-overlay-wrap'
    );

    if (!overlay) return;

    const originalOpacity = overlay.style.opacity;

    addListener(card, 'mouseenter', () => {
      setStyle(overlay, 'opacity', '1');
    });

    addListener(card, 'mouseleave', () => {
      setStyle(
        overlay,
        'opacity',
        originalOpacity || '0'
      );
    });
  });
}

// ============================================================
// 5. FAQ ACCORDION
// ============================================================

export function initFaqAccordion() {
  const faqItems = [
    ...document.querySelectorAll('.faq-wrap')
  ];

  if (!faqItems.length) return;

  const closeItem = item => {
    const answer = item.querySelector(
      '.faq-answer-wrap'
    );

    const question = item.querySelector(
      '.faq-question-wrap'
    );

    const arrows = item.querySelectorAll(
      '.faq-arrow-lite, .faq-arrow-dark'
    );

    if (answer) {
      setStyle(answer, 'display', 'none');
      answer.setAttribute('aria-hidden', 'true');
    }

    if (question) {
      question.setAttribute(
        'aria-expanded',
        'false'
      );
    }

    arrows.forEach(arrow => {
      setStyle(
        arrow,
        'transform',
        'rotate(0deg)'
      );
    });
  };

  const openItem = item => {
    const answer = item.querySelector(
      '.faq-answer-wrap'
    );

    const question = item.querySelector(
      '.faq-question-wrap'
    );

    const arrows = item.querySelectorAll(
      '.faq-arrow-lite, .faq-arrow-dark'
    );

    if (answer) {
      setStyle(answer, 'display', 'block');
      answer.setAttribute('aria-hidden', 'false');
    }

    if (question) {
      question.setAttribute(
        'aria-expanded',
        'true'
      );
    }

    arrows.forEach(arrow => {
      setStyle(
        arrow,
        'transform',
        'rotate(180deg)'
      );
    });
  };

  // Start with all FAQs closed.
  faqItems.forEach(closeItem);

  faqItems.forEach(item => {
    const question = item.querySelector(
      '.faq-question-wrap'
    );

    const answer = item.querySelector(
      '.faq-answer-wrap'
    );

    if (!question || !answer) return;

    const toggle = () => {
      const isOpen =
        answer.style.display === 'block';

      faqItems.forEach(closeItem);

      if (!isOpen) {
        openItem(item);
      }
    };

    addListener(question, 'click', toggle);

    // Support keyboard interaction for
    // non-native interactive elements.
    if (
      !question.matches(
        'button, a, input, select, textarea'
      )
    ) {
      if (!question.hasAttribute('tabindex')) {
        question.setAttribute('tabindex', '0');
      }

      if (!question.hasAttribute('role')) {
        question.setAttribute('role', 'button');
      }

      addListener(question, 'keydown', event => {
        if (
          event.key === 'Enter' ||
          event.key === ' '
        ) {
          event.preventDefault();
          toggle();
        }
      });
    }
  });
}

// ============================================================
// 6. PARALLAX
// ============================================================

export function initParallax() {
  const heroCharacter = document.querySelector(
    '.hero-character'
  );

  if (!heroCharacter || reducedMotion()) {
    return;
  }

  let ticking = false;

  const updateParallax = () => {
    ticking = false;

    if (!heroCharacter.isConnected) return;

    const scrolled = window.scrollY;
    const offset = scrolled * 0.2;

    // Individual translate property avoids
    // overwriting the CSS float animation.
    setStyle(
      heroCharacter,
      'translate',
      `0px ${offset}px`
    );
  };

  const onScroll = () => {
    if (ticking) return;

    ticking = true;
    addFrame(updateParallax);
  };

  addListener(
    window,
    'scroll',
    onScroll,
    { passive: true }
  );

  updateParallax();
}

// ============================================================
// 7. ABOUT PAGE ANIMATIONS
// ============================================================

export function initAboutAnimations() {
  const bannerTitle = document.querySelector(
    '.banner-title'
  );

  if (bannerTitle && !reducedMotion()) {
    setStyle(
      bannerTitle,
      'animation',
      'fadeInUp 0.8s ease forwards'
    );
  }

  // Count Cards
  document.querySelectorAll(
    '.count-card-wrap'
  ).forEach((card, index) => {
    revealElement(card, {
      transform: 'translateY(30px)',
      transition:
        `all 0.5s ease ${index * 0.15}s`,
      threshold: 0.3
    });
  });

  // Mission
  const missionGrid = document.querySelector(
    '.about-intro-top-grid'
  );

  if (missionGrid) {
    revealElement(
      missionGrid.querySelector(
        '.about-intro-image-wrap'
      ),
      {
        transform: 'translateX(-50px)',
        transition: 'all 0.7s ease'
      }
    );

    revealElement(
      missionGrid.querySelector(
        '.about-intro-content-wrap'
      ),
      {
        transform: 'translateX(50px)',
        transition: 'all 0.7s ease 0.2s'
      }
    );
  }

  // Vision
  const visionGrid = document.querySelector(
    '.about-intro-bottom-grid'
  );

  if (visionGrid) {
    revealElement(
      visionGrid.querySelector(
        '.about-intro-content-wrap'
      ),
      {
        transform: 'translateX(-50px)',
        transition: 'all 0.7s ease'
      }
    );

    revealElement(
      visionGrid.querySelector(
        '.about-intro-image-wrap'
      ),
      {
        transform: 'translateX(50px)',
        transition: 'all 0.7s ease 0.2s'
      }
    );
  }

  // Value Cards
  document.querySelectorAll(
    '.value-card-wrap'
  ).forEach((card, index) => {
    revealElement(card, {
      transform: 'translateY(40px)',
      transition:
        `all 0.5s ease ${index * 0.1}s`
    });
  });

  // History Items
  document.querySelectorAll(
    '.history-card-wrap'
  ).forEach((item, index) => {
    const left = item.querySelector(
      '.history-left-wrap'
    );

    const right = item.querySelector(
      '.history-right-wrap'
    );

    if (reducedMotion()) {
      return;
    }

    if (left) {
      setStyle(left, 'opacity', '0');
      setStyle(
        left,
        'transform',
        index % 2 === 0
          ? 'translateX(-40px)'
          : 'translateX(40px)'
      );

      setStyle(
        left,
        'transition',
        'all 0.6s ease'
      );
    }

    if (right) {
      setStyle(right, 'opacity', '0');
      setStyle(
        right,
        'transform',
        index % 2 === 0
          ? 'translateX(40px)'
          : 'translateX(-40px)'
      );

      setStyle(
        right,
        'transition',
        'all 0.6s ease 0.15s'
      );
    }

    observeOnScroll(item, () => {
      addFrame(() => {
        [left, right].forEach(element => {
          if (!element) return;

          setStyle(element, 'opacity', '1');
          setStyle(
            element,
            'transform',
            'none'
          );
        });
      });
    });
  });

  // History Steps
  document.querySelectorAll(
    '.history-step-wrap'
  ).forEach((step, index) => {
    revealElement(step, {
      transform: 'scale(0)',
      transition:
        `all 0.3s ease ${index * 0.1}s`
    });
  });
}

// ============================================================
// 8. SERVICE DETAILS ANIMATIONS
// ============================================================

export function initServiceDetailsAnimations() {
  const animateEntrance = (
    selector,
    transform,
    transition,
    delay
  ) => {
    const element = document.querySelector(
      selector
    );

    if (!element) return;

    if (reducedMotion()) {
      setStyle(element, 'opacity', '1');
      return;
    }

    setStyle(element, 'opacity', '0');
    setStyle(element, 'transform', transform);
    setStyle(element, 'transition', transition);

    addTimeout(() => {
      if (!element.isConnected) return;

      setStyle(element, 'opacity', '1');
      setStyle(element, 'transform', 'none');
    }, delay);
  };

  // Title
  animateEntrance(
    '.service-details-title',
    'translateY(30px)',
    'all 0.6s ease',
    100
  );

  // Main Image
  animateEntrance(
    '.service-details-image-main',
    'scale(0.95)',
    'all 0.7s ease 0.2s',
    200
  );

  // Description
  animateEntrance(
    '.service-details-description',
    'translateY(30px)',
    'all 0.6s ease 0.3s',
    300
  );

  // Secondary Image
  animateEntrance(
    '.service-details-image-secondary',
    'translateX(-30px)',
    'all 0.6s ease 0.4s',
    400
  );

  // Content Blocks
  document.querySelectorAll(
    '.service-details-block'
  ).forEach((block, index) => {
    revealElement(block, {
      transform: 'translateY(40px)',
      transition:
        `all 0.5s ease ${index * 0.15}s`,
      rootMargin: '0px 0px -50px 0px'
    });
  });

  // Service CTA
  const serviceTitle = document.querySelector(
    '.service-details-title'
  );

  if (serviceTitle) {
    revealElement(
      document.querySelector('.cta-section'),
      {
        transform: 'translateY(40px)',
        transition: 'all 0.6s ease 0.5s'
      }
    );
  }
}

// ============================================================
// 9. CLEANUP
// ============================================================

export function destroyAllAnimations() {
  // Disconnect all IntersectionObservers.
  observers.forEach(observer => {
    observer.disconnect();
  });

  observers.clear();

  // Remove all registered event listeners.
  listeners.forEach(
    ({ target, event, handler, options }) => {
      target.removeEventListener(
        event,
        handler,
        options
      );
    }
  );

  listeners.length = 0;

  // Cancel scheduled timeouts.
  timers.forEach(timer => {
    clearTimeout(timer);
  });

  timers.clear();

  // Cancel animation frames.
  frames.forEach(frame => {
    cancelAnimationFrame(frame);
  });

  frames.clear();

  // Restore previous inline styles.
  restoreStyles();

  initialized = false;
}

// ============================================================
// 10. INITIALIZE ALL
// ============================================================

export function initAllAnimations() {
  if (initialized) {
    destroyAllAnimations();
  }

  initialized = true;

  try {
    initHeroAnimation();
    initScrollAnimations();
    initCountUp();
    initHoverAnimations();
    initFaqAccordion();
    initParallax();

    initServiceDetailsAnimations();
    initAboutAnimations();

    console.log(
      '[Animations] All animations initialized.'
    );
  } catch (error) {
    console.error(
      '[Animations] Initialization error:',
      error
    );

    destroyAllAnimations();
  }
}

// ============================================================
// 11. REINITIALIZE FOR SPA NAVIGATION
// ============================================================

export function reinitAnimations() {
  destroyAllAnimations();
  initAllAnimations();
}

// ============================================================
// END
// ============================================================
