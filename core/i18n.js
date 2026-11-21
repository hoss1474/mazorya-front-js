
/**
 * Mazorya Group - Internationalization
 * File: core/i18n.js
 */

const SUPPORTED_LANGS = [
  'en',
  'fr',
  'fa',
  'ar',
  'de',
  'es',
  'tr'
];

const DEFAULT_LANG = 'en';

const RTL_LANGS = ['fa', 'ar'];

let currentLang = DEFAULT_LANG;
let translations = {};
let languageRequestId = 0;

// Cache loaded translations
const cache = Object.create(null);

/**
 * Validate language code
 */
function normalizeLanguage(lang) {
  if (typeof lang !== 'string') {
    return DEFAULT_LANG;
  }

  const normalized = lang.trim().toLowerCase();

  return SUPPORTED_LANGS.includes(normalized)
    ? normalized
    : DEFAULT_LANG;
}

/**
 * Fetch language JSON
 */
async function fetchLanguage(lang) {
  // Return cached translations
  if (cache[lang]) {
    return cache[lang];
  }

  const baseUrl = import.meta.env.BASE_URL || '/';

  const url = `${baseUrl}lang/${lang}.json`;

  const response = await fetch(url, {
    cache: 'no-cache',
    headers: {
      Accept: 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(
      `[i18n] Failed to load ${lang}.json: HTTP ${response.status}`
    );
  }

  const contentType =
    response.headers.get('content-type') || '';

  if (!contentType.toLowerCase().includes('json')) {
    throw new Error(
      `[i18n] Invalid response for ${url}. Expected JSON, received ${contentType || 'unknown content type'}. Check Vite language file paths.`
    );
  }

  const data = await response.json();

  if (
    !data ||
    typeof data !== 'object' ||
    Array.isArray(data)
  ) {
    throw new Error(
      `[i18n] Invalid translation structure: ${lang}.json`
    );
  }

  cache[lang] = data;

  return data;
}

/**
 * Load requested language with English fallback
 */
async function loadLanguage(lang) {
  const requestedLang = normalizeLanguage(lang);

  try {
    const data = await fetchLanguage(requestedLang);

    return {
      lang: requestedLang,
      data,
      success: true
    };
  } catch (error) {
    console.error(
      `[i18n] Language load failed: ${requestedLang}`,
      error
    );

    // Fallback to English
    if (requestedLang !== DEFAULT_LANG) {
      try {
        const fallbackData = await fetchLanguage(
          DEFAULT_LANG
        );

        console.warn(
          `[i18n] Using fallback language: ${DEFAULT_LANG}`
        );

        return {
          lang: DEFAULT_LANG,
          data: fallbackData,
          success: false
        };
      } catch (fallbackError) {
        console.error(
          '[i18n] Fallback language load failed:',
          fallbackError
        );
      }
    }

    return {
      lang: DEFAULT_LANG,
      data: cache[DEFAULT_LANG] || {},
      success: false
    };
  }
}

/**
 * Get translated text
 *
 * Example:
 * t('nav.home')
 * t('welcome.message', { name: 'Hussein' })
 */
function t(key, params = {}) {
  if (typeof key !== 'string' || !key) {
    return '';
  }

  const value = key
    .split('.')
    .reduce((obj, part) => {
      return obj?.[part];
    }, translations);

  if (value === undefined || value === null) {
    return key;
  }

  if (
    typeof value !== 'string' &&
    typeof value !== 'number'
  ) {
    return key;
  }

  let text = String(value);

  if (
    !params ||
    typeof params !== 'object' ||
    Array.isArray(params)
  ) {
    return text;
  }

  text = text.replace(
    /{{\s*([\w.-]+)\s*}}/g,
    (match, param) => {
      return Object.prototype.hasOwnProperty.call(
        params,
        param
      )
        ? String(params[param])
        : match;
    }
  );

  return text;
}

/**
 * Apply HTML language and direction
 */
function applyDocumentLanguage(lang) {
  const root = document.documentElement;

  const rtl = RTL_LANGS.includes(lang);

  root.lang = lang;
  root.dir = rtl ? 'rtl' : 'ltr';
}

/**
 * Change current language
 */
async function setLanguage(lang) {
  const requestedLang = normalizeLanguage(lang);

  // Prevent older requests from overriding newer ones
  const requestId = ++languageRequestId;

  const result = await loadLanguage(requestedLang);

  if (requestId !== languageRequestId) {
    return false;
  }

  currentLang = result.lang;
  translations = result.data;

  // Update HTML lang and dir
  applyDocumentLanguage(currentLang);

  // Save language preference
  try {
    localStorage.setItem('lang', currentLang);
  } catch (error) {
    console.warn(
      '[i18n] Could not save language preference:',
      error
    );
  }

  // Notify other modules
  window.dispatchEvent(
    new CustomEvent('languageChanged', {
      detail: {
        lang: currentLang
      }
    })
  );

  return result.success;
}

/**
 * Get active language
 */
function getCurrentLanguage() {
  return currentLang;
}

/**
 * Check RTL direction
 */
function isRTL() {
  return RTL_LANGS.includes(currentLang);
}

/**
 * Public API
 */
export const i18n = {
  setLanguage,
  getCurrentLanguage,
  t,
  isRTL
};
