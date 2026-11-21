
/**
 * Mazorya Group - Main Application
 * File: app.js
 *
 * No preloader
 * Vanilla JS + Vite + SPA Router
 */

import { router } from './core/router.js';
import { i18n } from './core/i18n.js';

import {
  appStore,
  loadInitialData
} from './core/api.js';

import {
  initIX2,
  destroyIX2
} from './core/ix2.js';

import {
  reinitAnimations
} from './core/animations.js';

// ============================================================
// CONFIGURATION
// ============================================================

const DEFAULT_LANG = 'en';
const IX2_INIT_DELAY = 100;

// ============================================================
// APPLICATION STATE
// ============================================================

let appInitialized = false;
let ix2InitTimeout = null;
let initialDataPromise = null;

// Preserve compatibility with existing modules.

window.appState = {
  currentLanguage: DEFAULT_LANG,
  currentPage: null,
  data: appStore.data
};

// ============================================================
// LANGUAGE MANAGEMENT
// ============================================================

function syncLanguageState() {
  const lang = i18n.getCurrentLanguage();

  const isRTL =
    lang === 'fa' ||
    lang === 'ar';

  window.appState.currentLanguage = lang;

  document.documentElement.lang = lang;
  document.documentElement.dir = isRTL
    ? 'rtl'
    : 'ltr';

  // Compatibility with existing CSS using body[dir].
  document.body.dir = isRTL
    ? 'rtl'
    : 'ltr';

  return lang;
}

// ============================================================
// DATA MANAGEMENT
// ============================================================

function syncAppData() {
  window.appState.data = appStore.data;
}

/**
 * Prevent duplicate initial-data requests.
 *
 * The page Router can start rendering without
 * waiting for this shared API preload.
 */

function initializeData() {
  if (initialDataPromise) {
    return initialDataPromise;
  }

  const requestedLang = i18n.getCurrentLanguage();

  initialDataPromise = (async () => {
    try {
      await loadInitialData();

      if (
        requestedLang !== i18n.getCurrentLanguage()
      ) {
        return;
      }

      syncAppData();

      if (!appStore.isInitialized(requestedLang)) {
        console.warn(
          '[App] Some initial API data could not be loaded.'
        );
      }
    } catch (error) {
      console.error(
        '[App] Initial data loading failed:',
        error
      );
    }
  })().finally(() => {
    initialDataPromise = null;
  });

  return initialDataPromise;
}

// ============================================================
// IX2 ANIMATIONS
// ============================================================

function reinitIX2() {
  if (ix2InitTimeout !== null) {
    clearTimeout(ix2InitTimeout);
    ix2InitTimeout = null;
  }

  try {
    destroyIX2();

    ix2InitTimeout = setTimeout(() => {
      ix2InitTimeout = null;

      try {
        initIX2();
      } catch (error) {
        console.error(
          '[App] IX2 initialization failed:',
          error
        );
      }
    }, IX2_INIT_DELAY);

  } catch (error) {
    console.error(
      '[App] IX2 reset failed:',
      error
    );
  }
}

// ============================================================
// ALL PAGE ANIMATIONS
// ============================================================

function reinitAll() {
  try {
    reinitAnimations();
  } catch (error) {
    console.error(
      '[App] Page animations failed:',
      error
    );
  }

  reinitIX2();
}

// ============================================================
// AFTER PAGE RENDER
// ============================================================


function afterPageRender() {
  window.appState.currentPage = router.currentRoute;

  syncLanguageState();
  syncAppData();

  reinitAll();

  const lang = i18n.getCurrentLanguage();

  if (!appStore.isInitialized(lang)) {
    void initializeData();
  }

  // Notify the initial site loader that
  // the first SPA page has been rendered.
  window.dispatchEvent(
    new Event('mazorya:app-ready')
  );
}

// ============================================================
// LANGUAGE CHANGE
// ============================================================

window.addEventListener(
  'languageChanged',
  event => {
    const lang = event.detail?.lang;

    if (!lang) return;

    syncLanguageState();

    console.log(
      '[App] Language changed:',
      lang
    );

    // The router and i18n module manage language
    // changes. No loading overlay is created.
  }
);

// ============================================================
// DETECT INITIAL LANGUAGE
// ============================================================

function getInitialLanguage() {
  const route = router.parsePath(
    window.location.pathname
  );

  return route?.lang || DEFAULT_LANG;
}

// ============================================================
// APPLICATION INITIALIZATION
// ============================================================

async function init() {
  if (appInitialized) {
    return;
  }

  appInitialized = true;

  try {
    console.log(
      '[App] Initializing Mazorya Group...'
    );

    // --------------------------------------------------------
    // 1. LANGUAGE
    // --------------------------------------------------------

    const initialLang = getInitialLanguage();

    const languageLoaded = await i18n.setLanguage(
      initialLang
    );

    if (!languageLoaded) {
      console.warn(
        '[App] Requested language unavailable. ' +
        'Fallback may be active.'
      );
    }

    const activeLang = syncLanguageState();

    console.log(
      '[App] Active language:',
      activeLang
    );

    // --------------------------------------------------------
    // 2. ROUTER CALLBACK
    // --------------------------------------------------------

    router.afterRender = afterPageRender;

    // --------------------------------------------------------
    // 3. SHARED API DATA
    // --------------------------------------------------------

    // Start data preloading without holding the
    // whole page behind a loading screen.
    //
    // Individual pages can still fetch the data
    // they require through their API functions.

    void initializeData();

    // --------------------------------------------------------
    // 4. ROUTER INITIALIZATION
    // --------------------------------------------------------

    await router.init();

    // --------------------------------------------------------
    // 5. STATE SYNCHRONIZATION
    // --------------------------------------------------------

    syncLanguageState();
    syncAppData();

    console.log(
      '[App] Initialized successfully.'
    );

  } catch (error) {
    console.error(
      '[App] Initialization failed:',
      error
    );
    window.dispatchEvent(
  new Event('mazorya:app-ready')
);

    const app = document.getElementById('app');

    if (app) {
      app.innerHTML = `
        <section
          style="
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
            background: #090909;
            color: #ffffff;
            text-align: center;
          "
        >

          <h1>
            Unable to load the website
          </h1>

          <p style="margin: 20px 0;">
            Please refresh the page and try again.
          </p>

          <button
            type="button"
            id="appReloadButton"
            class="primary-button"
          >
            Reload Page
          </button>

        </section>
      `;

      const button = document.getElementById(
        'appReloadButton'
      );

      button?.addEventListener('click', () => {
        window.location.reload();
      });
    }
  }
}

// ============================================================
// START APPLICATION
// ============================================================

if (document.readyState === 'loading') {
  document.addEventListener(
    'DOMContentLoaded',
    () => {
      void init();
    },
    { once: true }
  );
} else {
  void init();
}
