// pages/serviceDetails.js - Service Details Page

import { i18n } from '../core/i18n.js';
import { renderHeader, attachHeaderEvents } from '../components/header.js';
import { renderFooter, attachFooterEvents } from '../components/footer.js';
import { getServiceBySlug } from '../core/api.js';

export async function renderServiceDetails(params) {
  const app = document.getElementById('app');
  const currentLang = i18n.getCurrentLanguage();
  const { slug } = params;
  
  if (!slug) {
    window.location.href = `/${currentLang}/services`;
    return;
  }
  
  // دریافت جزئیات سرویس از API
  const service = await getServiceBySlug(slug);
  
  if (!service) {
    app.innerHTML = `
      ${renderHeader()}
      <div class="container-regular" style="text-align: center; padding: 100px 20px;">
        <h1>${i18n.t('service_not_found') || 'Service Not Found'}</h1>
        <p>${i18n.t('service_not_found_desc') || 'The service you\'re looking for doesn\'t exist.'}</p>
        <a href="/${currentLang}/services" class="primary-button" style="display: inline-block; margin-top: 20px;">${i18n.t('back_to_services') || 'Back to Services'}</a>
      </div>
      ${renderFooter()}
    `;
    attachHeaderEvents();
    attachFooterEvents();
    return;
  }
  
  const serviceName = service.name || 'Service Details';
  const description = service.description || '';
  const sections = service.sections || [];
  
  app.innerHTML = `
    ${renderHeader()}
    
    <!-- ===== Service Details Section ===== -->
    <section class="service-details-section">
      <div class="w-layout-blockcontainer container-regular w-container">
        
        <!-- عنوان -->
        <div class="service-details-header">
          <h1 class="service-details-title">${escapeHtml(serviceName)}</h1>
        </div>
        
        <!-- تصویر اصلی -->
        ${service.images?.image_1 ? `
          <div class="service-details-image-main">
            <img src="${service.images.image_1}" alt="${escapeHtml(serviceName)}" class="service-details-image" />
          </div>
        ` : ''}
        
        <!-- توضیحات -->
        ${description ? `
          <div class="service-details-description">
            <p>${escapeHtml(description)}</p>
          </div>
        ` : ''}
        
        <!-- تصویر دوم -->
        ${service.images?.image_2 ? `
          <div class="service-details-image-secondary">
            <img src="${service.images.image_2}" alt="${escapeHtml(serviceName)}" class="service-details-image" />
          </div>
        ` : ''}
        
        <!-- بخش‌های محتوایی داینامیک -->
        <div class="service-details-content">
          ${renderSections(sections, currentLang)}
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
              <h2 class="section-title text-white">${i18n.t('cta_service_title') || 'Ready to get started?'}</h2>
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
// رندر بخش‌های محتوایی
// ============================================================
function renderSections(sections, lang) {
  if (!sections || sections.length === 0) return '';
  
  return sections.map(section => {
    const title = section.name || section.title || '';
    const description = section.description || '';
    
    return `
      <div class="service-details-block">
        ${title ? `<h2 class="service-details-block-title">${escapeHtml(title)}</h2>` : ''}
        ${description ? `<div class="service-details-block-content"><p>${escapeHtml(description)}</p></div>` : ''}
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