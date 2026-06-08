// components/header.js - با نمایش پروفایل به جای لاگین برای کاربران احراز هویت شده

import { i18n } from '../core/i18n.js';
import { isAuthenticated, getUserData } from '../core/api.js';

export function renderHeader() {
  const currentLang = i18n.getCurrentLanguage();
  const isRTL = currentLang === 'fa' || currentLang === 'ar';
  
  // بررسی وضعیت لاگین کاربر
  const isLoggedIn = isAuthenticated();
  const userData = isLoggedIn ? getUserData() : null;
  const userName = userData?.full_name || userData?.name || 'Account';
  const userAvatar = userData?.avatar || '/assets/img/default-avatar.png';
  
  return `
    <header class="site-header" dir="${isRTL ? 'rtl' : 'ltr'}">
      <div class="header-container">
        
        <!-- لوگو -->
        <div class="header-logo">
          <a href="/${currentLang}/">
            <img src="/assets/img/logo.png" alt="Mazorya Group" />
          </a>
        </div>
        
        <!-- منوی اصلی -->
        <nav class="header-nav" id="headerNav">
          <ul class="header-menu">
            <li><a href="/${currentLang}/" data-route="home">${i18n.t('nav_home')}</a></li>
            <li><a href="/${currentLang}/about" data-route="about">${i18n.t('nav_about')}</a></li>
            <li><a href="/${currentLang}/services" data-route="services">${i18n.t('nav_services')}</a></li>
            <li><a href="/${currentLang}/projects" data-route="projects">${i18n.t('nav_projects')}</a></li>
            <li><a href="/${currentLang}/contact" data-route="contact">${i18n.t('nav_contact')}</a></li>
          </ul>
          
          <!-- دکمه‌ها در موبایل -->
          <div class="header-actions-mobile">
            <div class="lang-dropdown">
              <button type="button" class="lang-btn" id="langBtnMobile">
                <svg class="lang-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                <span class="lang-code">${currentLang.toUpperCase()}</span>
                <svg class="lang-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>
              <div class="lang-menu" id="langMenuMobile">
                <a href="#" data-lang="en">🇬🇧 English</a>
                <a href="#" data-lang="fr">🇫🇷 Français</a>
                <a href="#" data-lang="fa">🇮🇷 فارسی</a>
                <a href="#" data-lang="ar">🇸🇦 العربية</a>
                <a href="#" data-lang="de">🇩🇪 Deutsch</a>
                <a href="#" data-lang="tr">🇹🇷 Türkiye</a>
                <a href="#" data-lang="es">🇪🇸 Español</a>
              </div>
            </div>
            
            <!-- دکمه Auth / Profile در موبایل -->
            ${isLoggedIn ? `
              <div class="profile-dropdown-mobile">
                <a href="/${currentLang}/profile" class="profile-btn-mobile" data-route="profile">
                  <div class="profile-avatar-small">
                    <img src="${userAvatar}" alt="${userName}" />
                  </div>
                  <span>${escapeHtml(userName.split(' ')[0])}</span>
                </a>
              </div>
            ` : `
              <a href="/${currentLang}/auth" class="header-btn" data-route="auth">
                ${i18n.t('btn_get_started')}
              </a>
            `}
          </div>
        </nav>
        
        <!-- دکمه‌ها (دسکتاپ) -->
        <div class="header-actions">
          <div class="lang-dropdown">
            <button type="button" class="lang-btn" id="langBtn">
              <svg class="lang-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              <span class="lang-code">${currentLang.toUpperCase()}</span>
              <svg class="lang-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
            <div class="lang-menu" id="langMenu">
              <a href="#" data-lang="en">🇬🇧 English</a>
              <a href="#" data-lang="fr">🇫🇷 Français</a>
              <a href="#" data-lang="fa">🇮🇷 فارسی</a>
              <a href="#" data-lang="ar">🇸🇦 العربية</a>
              <a href="#" data-lang="de">🇩🇪 Deutsch</a>
              <a href="#" data-lang="tr">🇹🇷 Türkiye</a>
              <a href="#" data-lang="es">🇪🇸 Español</a>
            </div>
          </div>
          
          <!-- دکمه Auth / Profile در دسکتاپ -->
          ${isLoggedIn ? `
            <div class="profile-dropdown">
              <button type="button" class="profile-btn" id="profileBtn">
                <div class="profile-avatar-small">
                  <img src="${userAvatar}" alt="${userName}" />
                </div>
                <span>${escapeHtml(userName.split(' ')[0])}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>
              <div class="profile-menu" id="profileMenu">
                <a href="/${currentLang}/profile" data-route="profile">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  ${i18n.t('profile') || 'My Profile'}
                </a>
                <a href="/${currentLang}/profile?tab=settings" data-route="profile">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                  </svg>
                  ${i18n.t('settings') || 'Settings'}
                </a>
                <div class="divider"></div>
                <button id="logoutBtnHeader" class="logout-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  ${i18n.t('logout') || 'Logout'}
                </button>
              </div>
            </div>
          ` : `
            <a href="/${currentLang}/auth" class="header-btn" data-route="auth">
              ${i18n.t('btn_get_started')}
            </a>
          `}
        </div>
        
        <!-- دکمه همبرگر -->
        <button type="button" class="header-mobile-toggle" id="mobileToggle" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
        
      </div>
    </header>
  `;
}

export function attachHeaderEvents() {
  // ===== منوی موبایل =====
  const mobileToggle = document.getElementById('mobileToggle');
  const headerNav = document.getElementById('headerNav');
  
  if (mobileToggle && headerNav) {
    const newToggle = mobileToggle.cloneNode(true);
    mobileToggle.parentNode.replaceChild(newToggle, mobileToggle);
    
    newToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      headerNav.classList.toggle('active');
      newToggle.classList.toggle('active');
      
      if (headerNav.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
  }
  
  // ===== منوی زبان (دسکتاپ) =====
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
      if (langMenu && newLangBtn && !newLangBtn.contains(e.target) && !langMenu.contains(e.target)) {
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
  
  // ===== منوی زبان (موبایل) =====
  const langBtnMobile = document.getElementById('langBtnMobile');
  const langMenuMobile = document.getElementById('langMenuMobile');
  
  if (langBtnMobile && langMenuMobile) {
    const newLangBtnMobile = langBtnMobile.cloneNode(true);
    langBtnMobile.parentNode.replaceChild(newLangBtnMobile, langBtnMobile);
    
    newLangBtnMobile.addEventListener('click', (e) => {
      e.stopPropagation();
      langMenuMobile.classList.toggle('show');
    });
    
    langMenuMobile.querySelectorAll('[data-lang]').forEach(link => {
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
  
  // ===== پروفایل دراپ داون =====
  const profileBtn = document.getElementById('profileBtn');
  const profileMenu = document.getElementById('profileMenu');
  
  if (profileBtn && profileMenu) {
    const newProfileBtn = profileBtn.cloneNode(true);
    profileBtn.parentNode.replaceChild(newProfileBtn, profileBtn);
    
    newProfileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      profileMenu.classList.toggle('show');
    });
    
    document.addEventListener('click', (e) => {
      if (profileMenu && newProfileBtn && !newProfileBtn.contains(e.target) && !profileMenu.contains(e.target)) {
        profileMenu.classList.remove('show');
      }
    });
    
    // Logout button in header
    const logoutBtnHeader = document.getElementById('logoutBtnHeader');
    if (logoutBtnHeader) {
      const newLogoutBtn = logoutBtnHeader.cloneNode(true);
      logoutBtnHeader.parentNode.replaceChild(newLogoutBtn, logoutBtnHeader);
      
      newLogoutBtn.addEventListener('click', async () => {
        const { logoutUser } = await import('../core/api.js');
        await logoutUser();
        window.location.href = `/${i18n.getCurrentLanguage()}/`;
      });
    }
  }
  
  // ===== لینک‌های منو =====
  document.querySelectorAll('[data-route]').forEach(link => {
    const newLink = link.cloneNode(true);
    link.parentNode.replaceChild(newLink, link);
    
    newLink.addEventListener('click', (e) => {
      e.preventDefault();
      const href = newLink.getAttribute('href');
      if (href) window.location.href = href;
    });
  });
  
  // ===== بستن منوی موبایل =====
  const nav = document.getElementById('headerNav');
  const toggle = document.getElementById('mobileToggle');
  if (nav) {
    nav.querySelectorAll('a').forEach(link => {
      const newLink = link.cloneNode(true);
      link.parentNode.replaceChild(newLink, link);
      
      newLink.addEventListener('click', () => {
        nav.classList.remove('active');
        if (toggle) toggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
}

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}