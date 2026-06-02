// pages/404.js - 404 Error Page

import { i18n } from '../core/i18n.js';
import { renderHeader, attachHeaderEvents } from '../components/header.js';
import { renderFooter, attachFooterEvents } from '../components/footer.js';

export async function render404() {
  const app = document.getElementById('app');
  const currentLang = i18n.getCurrentLanguage();
  const isRTL = currentLang === 'fa' || currentLang === 'ar';
  
  app.innerHTML = `
    ${renderHeader()}
    
    <!-- ===== 404 Section ===== -->
    <section class="error-section">
      <div class="w-layout-blockcontainer container-regular w-container">
        <div class="error-content ${isRTL ? 'rtl-error' : ''}">
          <div class="error-number">
            <span class="error-digit">4</span>
            <span class="error-digit">0</span>
            <span class="error-digit">4</span>
          </div>
          <h1 class="error-title">${i18n.t('404_title') || 'Page Not Found'}</h1>
          <p class="error-description">${i18n.t('404_desc') || 'Oops! The page you are looking for does not exist. It might have been moved or deleted.'}</p>
          <div class="error-buttons">
            <a href="/${currentLang}/" class="primary-button" data-route="home">${i18n.t('go_home') || 'Go Home'}</a>
            <a href="/${currentLang}/contact" class="secondary-button" data-route="contact">${i18n.t('contact_support') || 'Contact Support'}</a>
          </div>
        </div>
      </div>
    </section>
    
    ${renderFooter()}
  `;
  
  attachHeaderEvents();
  attachFooterEvents();
  
  document.querySelectorAll('[data-route]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      if (href) window.location.href = href;
    });
  });
}