// pages/projects.js - Projects Listing Page

import { i18n } from '../core/i18n.js';
import { renderHeader, attachHeaderEvents } from '../components/header.js';
import { renderFooter, attachFooterEvents } from '../components/footer.js';
import { getProjects } from '../core/api.js';

export async function renderProjects() {
  const app = document.getElementById('app');
  const currentLang = i18n.getCurrentLanguage();
  
  // Fetch projects from API
  const projects = await getProjects();
  
  app.innerHTML = `
    ${renderHeader()}
    
    <!-- ===== Banner Section ===== -->
    <section class="projects-banner">
      <div class="w-layout-blockcontainer container-regular w-container">
        <div class="align-center">
          <div class="banner-title-wrap small">
            <h1 class="banner-title">${i18n.t('projects_title') || 'The Portfolio'}</h1>
            <p>${i18n.t('projects_subtitle') || 'A selection of our most significant works, spanning diverse industries and delivering measurable results.'}</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- ===== Projects Grid Section ===== -->
    <section class="projects-list-section">
      <div class="w-layout-blockcontainer container-regular w-container">
        <div class="projects-grid">
          ${renderProjectCards(projects, currentLang)}
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
              <h2 class="section-title text-white">${i18n.t('cta_projects_title') || 'Have a project in mind?'}</h2>
              <div class="cta-button-wrap">
                <a href="/${currentLang}/contact" class="cta-button" data-route="contact">${i18n.t('lets_talk') || "Let's Talk"}</a>
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
// رندر کارت‌های پروژه
// ============================================================
function renderProjectCards(projects, lang) {
  if (!projects || projects.length === 0) {
    return '<div class="no-projects"><p>No projects found.</p></div>';
  }
  
  // تقسیم به ردیف‌های 2 تایی
  const rows = [];
  for (let i = 0; i < projects.length; i += 2) {
    rows.push(projects.slice(i, i + 2));
  }
  
  return rows.map(row => `
    <div class="projects-row">
      ${row.map(project => {
        const title = project.name || '';
        const image = project.images?.image || '/assets/img/default-project.jpg';
        const link = `/${lang}/project/${project.slug}`;
        
        return `
          <div class="project-collection-item">
            <div class="project-card-wrap">
              <div class="project-image-area">
                <a href="${link}" class="project-image-wrap w-inline-block">
                  <img src="${image}" loading="lazy" alt="${escapeHtml(title)}" class="project-image" />
                </a>
                <a href="${link}" class="project-overlay-wrap w-inline-block">
                  <div class="project-arrow-icon-wrap">
                    <img src="/assets/img/project-arrow.svg" class="project-arrow-icon" />
                  </div>
                </a>
              </div>
              <div class="project-title-wrap">
                <a href="${link}" class="project-title">${escapeHtml(title)}</a>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `).join('');
}

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}