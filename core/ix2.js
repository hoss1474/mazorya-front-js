
/**
 * Mazorya Group - Simple IX2 Engine
 * File: core/ix2.js
 *
 * Lightweight replacement for basic Webflow IX2 effects.
 *
 * Features:
 * - Scroll animations
 * - Hover animations
 * - Safe initialization
 * - Event listener cleanup
 * - Observer cleanup
 * - Reduced motion support
 * - SPA navigation compatibility
 */

// ============================================================
// IX2 CONFIGURATION
// ============================================================

const IX2_DATA = {
  events: {},
  actionLists: {},

  site: {
    mediaQueries: [
      {
        key: 'main',
        min: 992,
        max: 10000
      },
      {
        key: 'medium',
        min: 768,
        max: 991
      },
      {
        key: 'small',
        min: 480,
        max: 767
      },
      {
        key: 'tiny',
        min: 0,
        max: 479
      }
    ]
  }
};

// ============================================================
// SIMPLE IX2 CLASS
// ============================================================

class SimpleIX2 {
  constructor(data = IX2_DATA) {
    this.data = data;

    this.animations = [];
    this.observers = [];
    this.eventListeners = [];
    this.animationFrames = new Set();

    this.originalStyles = new Map();
    this.readyCallbacks = [];

    this._initialized = false;
  }

  // ==========================================================
  // INITIALIZE
  // ==========================================================

  init(data = this.data) {
    if (this._initialized) {
      return this;
    }

    this.data = data;

    console.log('[IX2] Initializing...');

    try {
      // Mark initialized before registering effects.
      this._initialized = true;

      this.setupScrollAnimations();
      this.setupInteractionAnimations();

      console.log(
        '[IX2] Initialized successfully.'
      );

      // Notify listeners only after setup completes.
      window.dispatchEvent(
        new CustomEvent('ix2:ready', {
          detail: {
            initialized: true
          }
        })
      );

      this.flushReadyCallbacks();

      return this;
    } catch (error) {
      console.error(
        '[IX2] Initialization failed:',
        error
      );

      this.destroy();

      throw error;
    }
  }

  // ==========================================================
  // SAVE ORIGINAL INLINE STYLE
  // ==========================================================

  saveStyle(element, property) {
    if (!element) return;

    if (!this.originalStyles.has(element)) {
      this.originalStyles.set(
        element,
        new Map()
      );
    }

    const styles = this.originalStyles.get(element);

    if (styles.has(property)) {
      return;
    }

    styles.set(property, {
      value: element.style.getPropertyValue(property),
      priority: element.style.getPropertyPriority(
        property
      )
    });
  }

  // ==========================================================
  // SET INLINE STYLE
  // ==========================================================

  setStyle(element, property, value) {
    this.saveStyle(element, property);

    element.style.setProperty(
      property,
      value
    );
  }

  // ==========================================================
  // RESTORE ORIGINAL STYLES
  // ==========================================================

  restoreStyles() {
    this.originalStyles.forEach(
      (properties, element) => {
        properties.forEach(
          (original, property) => {
            if (original.value) {
              element.style.setProperty(
                property,
                original.value,
                original.priority
              );
            } else {
              element.style.removeProperty(
                property
              );
            }
          }
        );
      }
    );

    this.originalStyles.clear();
  }

  // ==========================================================
  // REDUCED MOTION
  // ==========================================================

  prefersReducedMotion() {
    if (
      typeof window.matchMedia !== 'function'
    ) {
      return false;
    }

    return window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
  }

  // ==========================================================
  // REQUEST ANIMATION FRAME
  // ==========================================================

  scheduleFrame(callback) {
    const frameId = requestAnimationFrame(() => {
      this.animationFrames.delete(frameId);

      if (!this._initialized) {
        return;
      }

      callback();
    });

    this.animationFrames.add(frameId);

    return frameId;
  }

  // ==========================================================
  // SCROLL ANIMATIONS
  // ==========================================================

  setupScrollAnimations() {
    const elements = document.querySelectorAll(
      '[data-scroll-animation]'
    );

    if (!elements.length) {
      return;
    }

    const reducedMotion =
      this.prefersReducedMotion();

    if (
      reducedMotion ||
      typeof IntersectionObserver === 'undefined'
    ) {
      // Keep all content visible when animations
      // are unavailable or motion is reduced.
      return;
    }

    const fadeElements = [];

    elements.forEach(element => {
      const animation = element.getAttribute(
        'data-scroll-animation'
      );

      if (animation !== 'fade-in') {
        return;
      }

      this.setStyle(
        element,
        'opacity',
        '0'
      );

      this.setStyle(
        element,
        'transform',
        'translateY(30px)'
      );

      this.setStyle(
        element,
        'transition',
        'opacity 0.6s ease, transform 0.6s ease'
      );

      fadeElements.push(element);
    });

    if (!fadeElements.length) {
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) {
            return;
          }

          const element = entry.target;

          observer.unobserve(element);

          this.scheduleFrame(() => {
            this.setStyle(
              element,
              'opacity',
              '1'
            );

            this.setStyle(
              element,
              'transform',
              'translateY(0)'
            );
          });
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px 30px 0px'
      }
    );

    fadeElements.forEach(element => {
      observer.observe(element);
    });

    this.observers.push(observer);
  }

  // ==========================================================
  // HOVER ANIMATIONS
  // ==========================================================

  setupInteractionAnimations() {
    const elements = document.querySelectorAll(
      '[data-hover-animation]'
    );

    if (!elements.length) {
      return;
    }

    if (this.prefersReducedMotion()) {
      return;
    }

    elements.forEach(element => {
      const animation = element.getAttribute(
        'data-hover-animation'
      );

      if (
        animation !== 'scale' &&
        animation !== 'lift'
      ) {
        return;
      }

      const originalTransform =
        getComputedStyle(element).transform;

      const baseTransform =
        originalTransform === 'none'
          ? ''
          : originalTransform;

      const enterHandler = () => {
        if (!this._initialized) return;

        if (animation === 'scale') {
          this.setStyle(
            element,
            'transition',
            'transform 0.3s ease'
          );

          this.setStyle(
            element,
            'transform',
            baseTransform
              ? `${baseTransform} scale(1.05)`
              : 'scale(1.05)'
          );
        }

        if (animation === 'lift') {
          this.setStyle(
            element,
            'transition',
            'transform 0.3s ease, box-shadow 0.3s ease'
          );

          this.setStyle(
            element,
            'transform',
            baseTransform
              ? `${baseTransform} translateY(-5px)`
              : 'translateY(-5px)'
          );

          this.setStyle(
            element,
            'box-shadow',
            '0 10px 30px rgba(0,0,0,0.15)'
          );
        }
      };

      const leaveHandler = () => {
        if (!this._initialized) return;

        this.setStyle(
          element,
          'transform',
          baseTransform || 'none'
        );

        if (animation === 'lift') {
          this.setStyle(
            element,
            'box-shadow',
            'none'
          );
        }
      };

      element.addEventListener(
        'mouseenter',
        enterHandler
      );

      element.addEventListener(
        'mouseleave',
        leaveHandler
      );

      // Save listeners for later cleanup.
      this.eventListeners.push({
        element,
        type: 'mouseenter',
        handler: enterHandler
      });

      this.eventListeners.push({
        element,
        type: 'mouseleave',
        handler: leaveHandler
      });
    });
  }

  // ==========================================================
  // WEBFLOW IX2 COMPATIBILITY
  // ==========================================================

  initAction(
    actionListId,
    elementId,
    eventType,
    actionType
  ) {
    // Compatibility placeholder.
    // Full Webflow action lists are not implemented.
    console.debug(
      '[IX2] Action requested:',
      {
        actionListId,
        elementId,
        eventType,
        actionType
      }
    );

    return this;
  }

  // ==========================================================
  // READY CALLBACK
  // ==========================================================

  ready(callback) {
    if (typeof callback !== 'function') {
      return this;
    }

    if (this._initialized) {
      try {
        callback();
      } catch (error) {
        console.error(
          '[IX2] Ready callback error:',
          error
        );
      }
    } else {
      this.readyCallbacks.push(callback);
    }

    return this;
  }

  flushReadyCallbacks() {
    const callbacks = [
      ...this.readyCallbacks
    ];

    this.readyCallbacks = [];

    callbacks.forEach(callback => {
      try {
        callback();
      } catch (error) {
        console.error(
          '[IX2] Ready callback error:',
          error
        );
      }
    });
  }

  // ==========================================================
  // DESTROY
  // ==========================================================

  destroy() {
    // Cancel scheduled animation frames.
    this.animationFrames.forEach(frameId => {
      cancelAnimationFrame(frameId);
    });

    this.animationFrames.clear();

    // Stop active animations.
    this.animations.forEach(animation => {
      if (
        animation &&
        typeof animation.cancel === 'function'
      ) {
        animation.cancel();
      }
    });

    this.animations = [];

    // Disconnect scroll observers.
    this.observers.forEach(observer => {
      observer.disconnect();
    });

    this.observers = [];

    // Remove mouse interaction listeners.
    this.eventListeners.forEach(listener => {
      listener.element.removeEventListener(
        listener.type,
        listener.handler
      );
    });

    this.eventListeners = [];

    // Restore inline styles changed by IX2.
    this.restoreStyles();

    this.readyCallbacks = [];
    this._initialized = false;

    console.log('[IX2] Destroyed.');
  }

  // ==========================================================
  // STATUS
  // ==========================================================

  getStatus() {
    return {
      initialized: this._initialized,
      observers: this.observers.length,
      listeners: this.eventListeners.length,
      animations: this.animations.length,
      pendingFrames: this.animationFrames.size
    };
  }
}

// ============================================================
// INSTANCE
// ============================================================

const simpleIX2 = new SimpleIX2(IX2_DATA);

// ============================================================
// PUBLIC INITIALIZATION
// ============================================================

export function initIX2() {
  try {
    if (simpleIX2._initialized) {
      return simpleIX2;
    }

    // DOM is not ready yet.
    if (document.readyState === 'loading') {
      console.warn(
        '[IX2] DOM is not ready. Initialization skipped.'
      );

      return null;
    }

    simpleIX2.init(IX2_DATA);

    return simpleIX2;
  } catch (error) {
    console.error(
      '[IX2] Could not initialize:',
      error
    );

    return null;
  }
}

// ============================================================
// PUBLIC DESTROY
// ============================================================

export function destroyIX2() {
  try {
    simpleIX2.destroy();
  } catch (error) {
    console.error(
      '[IX2] Destroy error:',
      error
    );
  }
}

// ============================================================
// WEBFLOW STATUS CHECK
// ============================================================

export function checkWebflowStatus() {
  const status = simpleIX2.getStatus();

  console.group('[IX2] Status');

  console.log(
    'DOM Ready:',
    document.readyState
  );

  console.log(
    'Initialized:',
    status.initialized
  );

  console.log(
    'Scroll Observers:',
    status.observers
  );

  console.log(
    'Event Listeners:',
    status.listeners
  );

  console.log(
    'Active Animations:',
    status.animations
  );

  console.log(
    'Pending Frames:',
    status.pendingFrames
  );

  console.groupEnd();

  return status;
}

// ============================================================
// IMPORTANT
// ============================================================

/*
 * No automatic initialization here.
 *
 * app.js handles initialization after each page render:
 *
 * destroyIX2();
 * initIX2();
 *
 * This prevents duplicate initialization and avoids
 * interference with SPA navigation and page animations.
 */

// ============================================================
// DEFAULT EXPORT
// ============================================================

export default {
  initIX2,
  destroyIX2,
  checkWebflowStatus
};
