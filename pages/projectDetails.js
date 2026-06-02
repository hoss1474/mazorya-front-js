// pages/projectDetails.js - Project Details Page

import { i18n } from '../core/i18n.js';
import { renderHeader, attachHeaderEvents } from '../components/header.js';
import { renderFooter, attachFooterEvents } from '../components/footer.js';
import { getProjectBySlug } from '../core/api.js';

export async function renderProjectDetails(params) {
  const app = document.getElementById('app');
  const currentLang = i18n.getCurrentLanguage();
  const { slug } = params;
  
  if (!slug) {
    window.location.href = `/${currentLang}/projects`;
    return;
  }
  
  const project = await getProjectBySlug(slug);
  
  if (!project) {
    app.innerHTML = `
      ${renderHeader()}
      <div class="container-regular" style="text-align: center; padding: 100px 20px;">
        <h1>${i18n.t('project_not_found') || 'Project Not Found'}</h1>
        <p>${i18n.t('project_not_found_desc') || 'The project you are looking for does not exist.'}</p>
        <a href="/${currentLang}/projects" class="primary-button" style="display: inline-block; margin-top: 20px;">${i18n.t('back_to_projects') || 'Back to Projects'}</a>
      </div>
      ${renderFooter()}
    `;
    attachHeaderEvents();
    attachFooterEvents();
    return;
  }
  
  const projectName = project.name || 'Project Details';
  const description = project.description || '';
  const sections = project.sections || [];
  
  app.innerHTML = `
    ${renderHeader()}
    
    <!-- ===== Project Details Section ===== -->
    <section class="project-details-section">
      <div class="w-layout-blockcontainer container-regular w-container">
        
        <!-- عنوان -->
        <div class="project-details-header">
          <h1 class="project-details-title">${escapeHtml(projectName)}</h1>
        </div>
        
        <!-- تصویر اصلی -->
        ${project.images?.image ? `
          <div class="project-details-image-main">
            <img src="${project.images.image}" alt="${escapeHtml(projectName)}" class="project-details-image" />
          </div>
        ` : ''}
        
        <!-- توضیحات -->
        ${description ? `
          <div class="project-details-description">
            <p>${escapeHtml(description)}</p>
          </div>
        ` : ''}
        
        <!-- تصویر دوم -->
        ${project.images?.image2 ? `
          <div class="project-details-image-secondary">
            <img src="${project.images.image2}" alt="${escapeHtml(projectName)}" class="project-details-image" />
          </div>
        ` : ''}
        
        <!-- بخش‌های محتوایی -->
        <div class="project-details-content">
          ${renderSections(sections)}
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
              <h2 class="section-title text-white">${i18n.t('cta_project_title') || 'Interested in similar work?'}</h2>
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
function renderSections(sections) {
  if (!sections || sections.length === 0) return '';
  
  return sections.map(section => {
    const title = section.title || '';
    const description = section.description || '';
    
    return `
      <div class="project-details-block">
        ${title ? `<h2 class="project-details-block-title">${escapeHtml(title)}</h2>` : ''}
        ${description ? `<div class="project-details-block-content"><p>${escapeHtml(description)}</p></div>` : ''}
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