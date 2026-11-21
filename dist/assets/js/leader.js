
/**
 * ===========================================
 * MAZORYA GROUP
 * Cinematic Text Loader
 * ===========================================
 *
 * File: assets/js/loader.js
 *
 * Features:
 * - Wait for MAZORYA drawing animation
 * - Wait for actual SPA page rendering
 * - Ignore temporary Loading screens
 * - Smooth transition to website
 * - Works with router afterRender event
 * - Supports slow-loading recovery
 * - Runs once on initial page load
 */

(function () {
  'use strict';

 const CONFIG = {
  minIntroDuration: 2000,
  fadeDuration: 350,
  maxWaitDuration: 12000
};

  const loader = document.getElementById(
    'mzSiteLoader'
  );

  const app = document.getElementById(
    'app'
  );

  if (!loader || !app) {
    console.warn(
      '[MAZORYA Loader] Required elements not found.'
    );
    return;
  }

  // ===========================================
  // STATE
  // ===========================================

  const startTime = performance.now();

  let isFinished = false;
  let isFinishing = false;

  let appReady = false;

  let introTimer = null;
  let watchdogTimer = null;
  let removalTimer = null;

  let scheduledCheck = false;

  // ===========================================
  // DETECT TEMPORARY LOADING SCREENS
  // ===========================================

  function isLoadingScreen() {
    const text = (
      app.textContent || ''
    )
      .trim()
      .replace(/\s+/g, ' ')
      .toLowerCase();

    if (!text) {
      return true;
    }

    const loadingPatterns = [
      /^loading[.!…\s]*$/,
      /^loading page[.!…\s]*$/,
      /^please wait[.!…\s]*$/,
      /^در حال بارگذاری[.\s…]*$/,
      /^لطفا صبر کنید[.\s…]*$/
    ];

    return loadingPatterns.some(
      (pattern) => pattern.test(text)
    );
  }

  // ===========================================
  // DETECT ACTUAL PAGE CONTENT
  // ===========================================

  function hasRealContent() {
    if (!app.children.length) {
      return false;
    }

    if (isLoadingScreen()) {
      return false;
    }

    const page = app.querySelector(
      [
        'main',
        '[data-page]',
        '.home-page',
        '.mz-home',
        '.mz-services',
        '.mz-projects',
        '.mz-blog',
        '.mz-contact',
        '.mz-profile',
        '.mz-auth',
        'section'
      ].join(', ')
    );

    if (!page) {
      return false;
    }

    const text = (
      page.textContent || ''
    ).trim();

    const hasMediaOrForm = Boolean(
      page.querySelector(
        'img, video, form, canvas'
      )
    );

    return (
      text.length > 25 ||
      hasMediaOrForm
    );
  }

  // ===========================================
  // INTRO ANIMATION TIMER
  // ===========================================

  function getRemainingIntroTime() {
    const elapsed = performance.now() - startTime;

    return Math.max(
      0,
      CONFIG.minIntroDuration - elapsed
    );
  }

  // ===========================================
  // CLEANUP
  // ===========================================

  function cleanup() {
    observer.disconnect();

    clearTimeout(introTimer);
    clearTimeout(watchdogTimer);

    window.removeEventListener(
      'mazorya:app-ready',
      onAppReady
    );
  }

  // ===========================================
  // FINISH LOADER
  // ===========================================

  function finishLoader() {
    if (isFinished || isFinishing) {
      return;
    }

    // The main SPA must be ready.
    if (!hasRealContent()) {
      return;
    }

    const remaining = getRemainingIntroTime();

    // Do not interrupt MAZORYA writing.
    if (remaining > 0) {
      if (introTimer === null) {
        introTimer = setTimeout(() => {
          introTimer = null;
          checkAndFinish();
        }, remaining);
      }

      return;
    }

    isFinishing = true;

    console.log(
      '[MAZORYA Loader] Intro completed.'
    );

    cleanup();

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        loader.classList.add(
          'mz-loader-leaving'
        );

        loader.setAttribute(
          'aria-hidden',
          'true'
        );

        isFinished = true;

        removalTimer = setTimeout(() => {
          loader.remove();
        }, CONFIG.fadeDuration + 100);

        console.log(
          '[MAZORYA Loader] Website revealed.'
        );
      });
    });
  }

  // ===========================================
  // CHECK IF THE WEBSITE IS READY
  // ===========================================

  function checkAndFinish() {
    if (isFinished || isFinishing) {
      return;
    }

    if (!hasRealContent()) {
      return;
    }

    if (scheduledCheck) {
      return;
    }

    scheduledCheck = true;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scheduledCheck = false;

        if (hasRealContent()) {
          finishLoader();
        }
      });
    });
  }

  // ===========================================
  // APP READY EVENT
  // ===========================================

  function onAppReady() {
    appReady = true;

    console.log(
      '[MAZORYA Loader] App ready signal received.'
    );

    checkAndFinish();
  }

  window.addEventListener(
    'mazorya:app-ready',
    onAppReady
  );

  // ===========================================
  // OBSERVE SPA DOM CHANGES
  // ===========================================

  const observer = new MutationObserver(() => {
    if (!isFinished) {
      checkAndFinish();
    }
  });

  observer.observe(app, {
    childList: true,
    subtree: true
  });

  // ===========================================
  // SLOW CONNECTION RECOVERY
  // ===========================================

  watchdogTimer = setTimeout(() => {
    if (isFinished || isFinishing) {
      return;
    }

    console.warn(
      '[MAZORYA Loader] Loading is taking longer.'
    );

    if (hasRealContent()) {
      checkAndFinish();
      return;
    }

    // Keep the intro visible instead of
    // revealing an empty/Loading screen.
    loader.classList.add(
      'mz-loader-delayed'
    );

    // Provide a recovery button even if the
    // minimal loader HTML has no retry section.
    if (!document.getElementById('mzLoaderRetry')) {
      const retry = document.createElement('button');

      retry.id = 'mzLoaderRetry';
      retry.type = 'button';
      retry.textContent = 'RELOAD';

      Object.assign(retry.style, {
        position: 'absolute',
        left: '50%',
        bottom: '12%',
        transform: 'translateX(-50%)',
        padding: '12px 24px',
        color: '#ffffff',
        background: 'transparent',
        border: '1px solid #ff6b6b',
        borderRadius: '8px',
        fontFamily: 'inherit',
        cursor: 'pointer',
        zIndex: '2'
      });

      loader.appendChild(retry);
    }

  }, CONFIG.maxWaitDuration);

  // ===========================================
  // RETRY BUTTON
  // ===========================================

  loader.addEventListener('click', (event) => {
    if (event.target.closest('#mzLoaderRetry')) {
      window.location.reload();
    }
  });

  // ===========================================
  // INITIAL CHECK
  // ===========================================

  checkAndFinish();

  console.log(
    '[MAZORYA Loader] Initialized.',
    {
      minIntroDuration: CONFIG.minIntroDuration,
      fadeDuration: CONFIG.fadeDuration,
      appReady
    }
  );

})();
