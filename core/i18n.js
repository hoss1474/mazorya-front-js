// core/i18n.js

const SUPPORTED_LANGS = ['en', 'fr', 'fa', 'ar', 'de', 'es', 'tr'];

let currentLang = 'en';
let translations = {};
const cache = {};

/**
 * Load language JSON file
 */
async function loadLanguage(lang) {
  if (!SUPPORTED_LANGS.includes(lang)) {
    lang = 'en';
  }

  // Use cached translation if available
  if (cache[lang]) {
    translations = cache[lang];
    currentLang = lang;
    return true;
  }

  try {
    // Load language file from public root
    const res = await fetch(`/lang/${lang}.json`, {
      cache: 'no-cache'
    });

    if (!res.ok) {
      throw new Error(
        `Failed to load language file: ${lang}.json (${res.status})`
      );
    }

    const data = await res.json();

    cache[lang] = data;
    translations = data;
    currentLang = lang;

    return true;
  } catch (err) {
    console.error(`Language load failed for "${lang}":`, err);

    // Fallback to English
    if (lang !== 'en') {
      try {
        if (cache.en) {
          translations = cache.en;
          currentLang = 'en';
          return false;
        }

        const res = await fetch('/lang/en.json', {
          cache: 'no-cache'
        });

        if (!res.ok) {
          throw new Error(
            `Failed to load fallback language: en.json (${res.status})`
          );
        }

        const data = await res.json();

        cache.en = data;
        translations = data;
        currentLang = 'en';

        return false;
      } catch (fallbackErr) {
        console.error(
          'Fallback language load also failed:',
          fallbackErr
        );

        translations = {};
        currentLang = 'en';

        return false;
      }
    }

    translations = {};
    currentLang = 'en';

    return false;
  }
}

/**
 * Get translated text
 */
function t(key, params = {}) {
  let text =
    key
      .split('.')
      .reduce((obj, k) => obj?.[k], translations) || key;

  // Make sure the result is a string
  text = String(text);

  // Replace {{parameter}} placeholders
  Object.keys(params).forEach((param) => {
    text = text.replace(
      new RegExp(`{{${param}}}`, 'g'),
      params[param]
    );
  });

  return text;
}

/**
 * Change current language
 */
async function setLanguage(lang) {
  if (!SUPPORTED_LANGS.includes(lang)) {
    lang = 'en';
  }

  // Load language
  const success = await loadLanguage(lang);

  // If requested language failed, loadLanguage already
  // switched to English.
  const activeLang = success ? lang : currentLang;

  currentLang = activeLang;

  // Set HTML language
  document.documentElement.lang = currentLang;

  // Set RTL/LTR
  const rtl = currentLang === 'fa' || currentLang === 'ar';

  document.documentElement.dir = rtl ? 'rtl' : 'ltr';

  document.documentElement.setAttribute(
    'dir',
    rtl ? 'rtl' : 'ltr'
  );

  // Save language preference
  localStorage.setItem('lang', currentLang);

  // Notify application
  window.dispatchEvent(
    new CustomEvent('languageChanged', {
      detail: {
        lang: currentLang
      }
    })
  );

  return success;
}

/**
 * Get current language
 */
function getCurrentLanguage() {
  return currentLang;
}

/**
 * Check RTL language
 */
function isRTL() {
  return currentLang === 'ar' || currentLang === 'fa';
}

export const i18n = {
  setLanguage,
  getCurrentLanguage,
  t,
  isRTL
};