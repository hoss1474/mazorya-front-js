// app.js - Main Entry Point

import { router } from './core/router.js';
import { i18n } from './core/i18n.js';
import { loadInitialData } from './core/api.js';
import { initIX2, destroyIX2 } from './core/ix2.js';
import { initAllAnimations, reinitAnimations } from './core/animations.js';

// ============================================================
// تابع راه‌اندازی مجدد IX2 (موشن‌های Webflow)
// ============================================================
function reinitIX2() {
  destroyIX2();
  setTimeout(() => {
    initIX2();
  }, 100);
}

// ============================================================
// تابع راه‌اندازی مجدد همه انیمیشن‌ها
// ============================================================
function reinitAll() {
  reinitAnimations();
  reinitIX2();
}

// ============================================================
// State مدیریت زبان و داده‌ها
// ============================================================
window.appState = {
  currentLanguage: 'en',
  currentPage: null,
  data: {
    services: [],
    projects: [],
    blogs: []
  }
};

// ============================================================
// تابع اصلی راه‌اندازی برنامه
// ============================================================
async function init() {
  try {
    // 1. تشخیص زبان از URL
    const path = window.location.pathname;
    const match = path.match(/^\/([a-z]{2})\//);
    const lang = match ? match[1] : 'en';

    // 2. تنظیم زبان
    await i18n.setLanguage(lang);
    window.appState.currentLanguage = lang;

    // 3. لود داده‌های اولیه از API
    await loadInitialData();

    // 4. ست کردن afterRender روی router
    router.afterRender = reinitAll;

    // 5. شروع router
    router.init();

    // 6. راه‌اندازی اولیه انیمیشن‌ها
    setTimeout(() => {
      initAllAnimations();
    }, 200);

    console.log('✅ App initialized successfully');

  } catch (err) {
    console.error('❌ App init failed:', err);
  }
}

// ============================================================
// رفرش صفحه هنگام تغییر زبان (برای اطمینان)
// ============================================================
window.addEventListener('languageChanged', (e) => {
  console.log('Language changed to:', e.detail.lang);
  window.appState.currentLanguage = e.detail.lang;
  
  // راه‌اندازی مجدد انیمیشن‌ها بعد از تغییر زبان
  setTimeout(() => {
    reinitAll();
  }, 300);
});

// ============================================================
// شروع برنامه
// ============================================================
init();