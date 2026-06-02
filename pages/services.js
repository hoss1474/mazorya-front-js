// pages/services.js - Services Page

import { i18n } from '../core/i18n.js';
import { renderHeader, attachHeaderEvents } from '../components/header.js';
import { renderFooter, attachFooterEvents } from '../components/footer.js';
import { getServices } from '../core/api.js';

export async function renderServices() {
  const app = document.getElementById('app');
  const currentLang = i18n.getCurrentLanguage();
  const isRTL = currentLang === 'fa' || currentLang === 'ar';
  
  // دریافت خدمات از API
  const services = await getServices();
  
  app.innerHTML = `
    ${renderHeader()}
    
    <!-- ===== Banner Section ===== -->
    <section class="services-banner">
      <div class="w-layout-blockcontainer container-regular w-container">
        <div class="align-center">
          <div class="banner-title-wrap">
            <h1 class="banner-title">${i18n.t('services_title') || 'Mastering the Digital Spectrum'}</h1>
            <p>${i18n.t('services_subtitle') || 'From concept to conversion, we provide a holistic suite of digital services designed to scale your business and elevate your brand presence.'}</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- ===== Services Grid Section ===== -->
    <section class="services-section">
      <div class="w-layout-blockcontainer container-regular w-container">
        <div class="services-grid">
          ${renderServiceCards(services, currentLang)}
        </div>
      </div>
    </section>
    
    <!-- ===== CTA Section ===== -->
    <section class="cta-section">
      <div class="w-layout-blockcontainer container-regular w-container">
        <div class="cta-image-wrap">
          <img src="/assets/img/cta-image.jpg" loading="lazy" alt="CTA" class="cta-image" />
          <div class="cta-title-area">
            <div class="cta-title-wrap">
              <h2 class="section-title text-white">${i18n.t('cta_title') || 'Ready to elevate your brand?'}</h2>
              <div class="cta-button-wrap">
                <a href="/${currentLang}/contact" class="cta-button" data-route="contact">${i18n.t('contact_us') || 'Contact Us'}</a>
              </div>
            </div>
          </div>
          <div class="cta-bg-wrap"></div>
        </div>
      </div>
    </section>
    
    ${renderFooter()}
  `;
  
  attachHeaderEvents();
  attachFooterEvents();
  
  // Navigation
  document.querySelectorAll('[data-route]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      if (href) window.location.href = href;
    });
  });
}

// ============================================================
// رندر کارت‌های خدمات
// ============================================================
function renderServiceCards(services, lang) {
  if (!services || services.length === 0) {
    return '<div class="no-services"><p>No services found.</p></div>';
  }
  
  return services.map(service => {
    const title = service.name || '';
    const description = service.description || '';
    const shortDesc = description.length > 120 ? description.substring(0, 120) + '...' : description;
    const icon = service.images?.icon || '/assets/img/service-icon-01.svg';
    const link = `/${lang}/service/${service.slug}`;
    
    return `
      <div class="service-card-item">
        <div class="service-card-inner" onclick="window.location.href='${link}'">
          <div class="service-card-icon">
            <img src="${icon}" alt="${escapeHtml(title)}" />
          </div>
          <h3 class="service-card-title">
            <a href="${link}">${escapeHtml(title)}</a>
          </h3>
          <p class="service-card-description">${escapeHtml(shortDesc)}</p>
          <a href="${link}" class="service-card-link">${i18n.t('learn_more') || 'Learn More'} →</a>
        </div>
      </div>
    `;
  }).join('');
}

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}