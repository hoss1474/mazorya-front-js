// app.js - Main Entry Point with Preloader

import { router } from './core/router.js';
import { i18n } from './core/i18n.js';
import { loadInitialData } from './core/api.js';
import { initIX2, destroyIX2 } from './core/ix2.js';
import { initAllAnimations, reinitAnimations } from './core/animations.js';

// ============================================================
// Preloader Functions (لودر خفن با لوگو)
// ============================================================

let preloaderTimeout;

function showPreloader() {
  // اگر لودر قبلاً وجود دارد، آن را حذف کن
  const existingPreloader = document.getElementById('preloader');
  if (existingPreloader) {
    existingPreloader.remove();
  }
  
  const preloader = document.createElement('div');
  preloader.className = 'preloader';
  preloader.id = 'preloader';
  preloader.innerHTML = `
    <div class="loader-wrapper">
      <div class="loader-ring"></div>
      <div class="loader-ring"></div>
      <div class="loader-ring"></div>
      <div class="loader-logo"></div>
      <div class="loader-brand">
        <span>MAZORYA</span> GROUP
      </div>
      <div class="loader-text">
        <span>M</span><span>A</span><span>Z</span><span>O</span><span>R</span><span>Y</span><span>A</span>
      </div>
      <div class="loader-progress">
        <div class="progress-bar-bg">
          <div class="progress-bar-fill"></div>
        </div>
        <div class="progress-text">Loading experience...</div>
      </div>
    </div>
  `;
  document.body.appendChild(preloader);
  
  // اطمینان از اینکه لودر حتماً بعد از 5 ثانیه حذف شود
  preloaderTimeout = setTimeout(() => {
    hidePreloader();
  }, 5000);
}

function hidePreloader() {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.classList.add('hide');
    setTimeout(() => {
      if (preloader && preloader.parentNode) {
        preloader.remove();
      }
    }, 800);
  }
  if (preloaderTimeout) {
    clearTimeout(preloaderTimeout);
  }
}

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
    // نمایش لودر
    showPreloader();
    
    // شبیه‌سازی حداقل زمان بارگذاری (1.5 ثانیه)
    const minLoadTime = new Promise(resolve => setTimeout(resolve, 1500));
    
    // 1. تشخیص زبان از URL
    const path = window.location.pathname;
    const match = path.match(/^\/([a-z]{2})\//);
    const lang = match ? match[1] : 'en';

    // 2. تنظیم زبان
    await i18n.setLanguage(lang);
    window.appState.currentLanguage = lang;

    // 3. لود داده‌های اولیه از API
    const dataPromise = loadInitialData();
    
    // منتظر ماندن برای هر دو (لودر + دیتا)
    await Promise.all([minLoadTime, dataPromise]);

    // 4. ست کردن afterRender روی router
    router.afterRender = reinitAll;

    // 5. شروع router
    router.init();

    // 6. راه‌اندازی اولیه انیمیشن‌ها
    setTimeout(() => {
      initAllAnimations();
    }, 200);
    
    // 7. مخفی کردن لودر
    hidePreloader();

    console.log('✅ App initialized successfully');

  } catch (err) {
    console.error('❌ App init failed:', err);
    hidePreloader();
  }
}

// ============================================================
// رفرش صفحه هنگام تغییر زبان
// ============================================================
window.addEventListener('languageChanged', (e) => {
  console.log('Language changed to:', e.detail.lang);
  window.appState.currentLanguage = e.detail.lang;
  
  // نمایش لودر هنگام تغییر زبان
  showPreloader();
  
  setTimeout(() => {
    reinitAll();
    hidePreloader();
  }, 500);
});

// ============================================================
// شروع برنامه
// ============================================================
init();