// core/i18n.js

const SUPPORTED_LANGS = ['en', 'fr', 'fa', 'ar', 'de', 'es', 'tr'];

let currentLang = 'en';
let translations = {};
const cache = {};

async function loadLanguage(lang) {
  if (!SUPPORTED_LANGS.includes(lang)) lang = 'en';

  if (cache[lang]) {
    translations = cache[lang];
    currentLang = lang;
    return true;
  }

  try {
    const res = await fetch(`/lang/${lang}.json`);
    const data = await res.json();

    cache[lang] = data;
    translations = data;
    currentLang = lang;

    return true;
  } catch (err) {
    console.error('Language load failed:', err);

    const res = await fetch(`/lang/en.json`);
    const data = await res.json();

    cache['en'] = data;
    translations = data;
    currentLang = 'en';

    return false;
  }
}

function t(key, params = {}) {
  let text = key.split('.').reduce((obj, k) => obj?.[k], translations) || key;

  Object.keys(params).forEach(p => {
    text = text.replace(new RegExp(`{{${p}}}`, 'g'), params[p]);
  });

  return text;
}

async function setLanguage(lang) {
  // 1. لود فایل زبان
  await loadLanguage(lang);
  
  // 2. تنظیم currentLang
  currentLang = lang;
  
  // 3. تنظیم lang در HTML
  document.documentElement.lang = currentLang;
  
  // 4. تنظیم RTL برای فارسی و عربی
  const isRTL = currentLang === 'fa' || currentLang === 'ar';
  document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
  
  // 5. ذخیره در localStorage
  localStorage.setItem('lang', currentLang);
  
  // 6. ارسال event برای اطلاع به کامپوننت‌ها
  window.dispatchEvent(
    new CustomEvent('languageChanged', {
      detail: { lang: currentLang }
    })
  );
  
  return true;
}

function getCurrentLanguage() {
  return currentLang;
}

function isRTL() {
  return currentLang === 'ar' || currentLang === 'fa';
}

export const i18n = {
  setLanguage,
  getCurrentLanguage,
  t,
  isRTL
};