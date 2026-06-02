// components/header.js - چیدمان: لوگو چپ | منو وسط | دکمه‌ها راست

import { i18n } from '../core/i18n.js';

export function renderHeader() {
  const currentLang = i18n.getCurrentLanguage();
  const isRTL = currentLang === 'fa' || currentLang === 'ar';
  
  return `
    <header class="site-header" dir="${isRTL ? 'rtl' : 'ltr'}">
      <div class="header-container">
        
        <!-- ===== بخش 1: لوگو (چپ در LTR، راست در RTL) ===== -->
        <div class="header-logo">
          <a href="/${currentLang}/">
            <img src="/assets/img/logo.png" alt="Mazorya Group" />
          </a>
        </div>
        
        <!-- ===== بخش 2: منوی اصلی (وسط) ===== -->
        <nav class="header-nav" id="headerNav">
          <ul class="header-menu">
            <li><a href="/${currentLang}/" data-route="home">${i18n.t('nav_home')}</a></li>
            <li><a href="/${currentLang}/about" data-route="about">${i18n.t('nav_about')}</a></li>
            <li><a href="/${currentLang}/services" data-route="services">${i18n.t('nav_services')}</a></li>
            <li><a href="/${currentLang}/projects" data-route="projects">${i18n.t('nav_projects')}</a></li>
            <li><a href="/${currentLang}/contact" data-route="contact">${i18n.t('nav_contact')}</a></li>
          </ul>
        </nav>
        
        <!-- ===== بخش 3: دکمه‌ها (راست در LTR، چپ در RTL) ===== -->
        <div class="header-actions">
          <!-- منوی زبان -->
          <div class="lang-dropdown">
            <button class="lang-btn" id="langBtn">
              <span class="lang-icon">🌐</span>
              <span class="lang-code">${currentLang.toUpperCase()}</span>
              <span class="lang-arrow">▼</span>
            </button>
            <div class="lang-menu" id="langMenu">
              <a href="#" data-lang="en">🇬🇧 English</a>
              <a href="#" data-lang="fr">🇫🇷 Français</a>
              <a href="#" data-lang="fa">🇮🇷 فارسی</a>
              <a href="#" data-lang="ar">🇸🇦 العربية</a>
              <a href="#" data-lang="de">🇩🇪 Deutsch</a>
              <a href="#" data-lang="tr">🇪🇸 Turkey</a>
              <a href="#" data-lang="es">🇪🇸 Español</a>
            </div>
          </div>
          
          <!-- دکمه Get Started -->
          <a href="/${currentLang}/auth" class="header-btn" data-route="auth">
            ${i18n.t('btn_get_started')}
          </a>
        </div>
        
        <!-- دکمه همبرگر (موبایل) -->
        <button class="header-mobile-toggle" id="mobileToggle" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
        
      </div>
    </header>
  `;
}

export function attachHeaderEvents() {
  // منوی موبایل
  const mobileToggle = document.getElementById('mobileToggle');
  const headerNav = document.getElementById('headerNav');
  
  if (mobileToggle && headerNav) {
    const newToggle = mobileToggle.cloneNode(true);
    mobileToggle.parentNode.replaceChild(newToggle, mobileToggle);
    
    newToggle.addEventListener('click', () => {
      headerNav.classList.toggle('active');
      newToggle.classList.toggle('active');
      document.body.style.overflow = headerNav.classList.contains('active') ? 'hidden' : '';
    });
  }
  
  // منوی زبان
  const langBtn = document.getElementById('langBtn');
  const langMenu = document.getElementById('langMenu');
  
  if (langBtn && langMenu) {
    const newLangBtn = langBtn.cloneNode(true);
    langBtn.parentNode.replaceChild(newLangBtn, langBtn);
    
    newLangBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langMenu.classList.toggle('show');
    });
    
    document.addEventListener('click', (e) => {
      if (!newLangBtn.contains(e.target) && !langMenu.contains(e.target)) {
        langMenu.classList.remove('show');
      }
    });
    
    langMenu.querySelectorAll('[data-lang]').forEach(link => {
      const newLink = link.cloneNode(true);
      link.parentNode.replaceChild(newLink, link);
      
      newLink.addEventListener('click', async (e) => {
        e.preventDefault();
        const newLang = newLink.getAttribute('data-lang');
        await i18n.setLanguage(newLang);
        
        const currentPath = window.location.pathname;
        const match = currentPath.match(/^\/([a-z]{2})\//);
        if (match) {
          window.location.href = currentPath.replace(`/${match[1]}`, `/${newLang}`);
        } else {
          window.location.href = `/${newLang}/`;
        }
      });
    });
  }
  
  // لینک‌های منو
  document.querySelectorAll('[data-route]').forEach(link => {
    const newLink = link.cloneNode(true);
    link.parentNode.replaceChild(newLink, link);
    
    newLink.addEventListener('click', (e) => {
      e.preventDefault();
      const href = newLink.getAttribute('href');
      if (href) window.location.href = href;
    });
  });
  
  // بستن منوی موبایل بعد از کلیک روی لینک
  const nav = document.getElementById('headerNav');
  const toggle = document.getElementById('mobileToggle');
  if (nav) {
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        if (toggle) toggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
}