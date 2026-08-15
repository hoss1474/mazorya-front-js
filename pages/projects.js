// pages/projects.js - Projects Listing Page with Fixed Categories

import { i18n } from '../core/i18n.js';
import { renderHeader, attachHeaderEvents } from '../components/header.js';
import { renderFooter, attachFooterEvents } from '../components/footer.js';
import { getProjects } from '../core/api.js';

// ============================================================
// دسته‌بندی‌های ثابت
// ============================================================
const CATEGORIES = [
  { id: 'all', label: 'همه', labelEn: 'All' },
  { id: 'website', label: 'وبسایت', labelEn: 'Website' },
  { id: 'ui-ux', label: 'UI/UX', labelEn: 'UI/UX' },
  { id: 'social-media', label: 'سوشیال مدیا', labelEn: 'Social Media' },
  { id: 'seo', label: 'سئو', labelEn: 'SEO' },
  { id: 'graphic', label: 'گرافیک', labelEn: 'Graphic' }
];

// ============================================================
// نگاشت دسته‌بندی‌ها برای تطابق با دیتابیس
// ============================================================
const CATEGORY_MAP = {
  'website': ['website', 'web', 'وبسایت', 'site'],
  'ui-ux': ['ui', 'ux', 'ui/ux', 'uiux', 'طراحی رابط کاربری', 'تجربه کاربری'],
  'social-media': ['social', 'social media', 'سوشیال', 'سوشیال مدیا', 'instagram', 'telegram'],
  'seo': ['seo', 'سئو', 'بهینه سازی', 'search engine'],
  'graphic': ['graphic', 'graphics', 'گرافیک', 'طراحی گرافیک', 'تصویرسازی']
};

export async function renderProjects() {
  const app = document.getElementById('app');
  const currentLang = i18n.getCurrentLanguage();
  
  // Fetch projects from API
  const projects = await getProjects();
  
  // Group projects by category
  const categorizedProjects = groupProjectsByCategory(projects);
  
  app.innerHTML = `
    ${renderHeader()}
    
    <!-- ===== Banner Section ===== -->
    <section class="projects-banner">
      <div class="w-layout-blockcontainer container-regular w-container">
        <div class="align-center">
          <div class="banner-title-wrap small">
            <h1 class="banner-title">${i18n.t('projects_title') || 'نمونه کارها'}</h1>
            <p>${i18n.t('projects_subtitle') || 'گزیده‌ای از مهم‌ترین پروژه‌های ما در حوزه‌های مختلف'}</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- ===== Category Filter ===== -->
    <section class="category-filter-section">
      <div class="w-layout-blockcontainer container-regular w-container">
        <div class="category-filter-wrap">
          ${renderCategoryFilters(currentLang)}
        </div>
      </div>
    </section>
    
    <!-- ===== Projects Grid Section ===== -->
    <section class="projects-list-section">
      <div class="w-layout-blockcontainer container-regular w-container">
        <div id="projects-grid-container" class="projects-grid">
          <!-- بخش همه پروژه‌ها (پیش‌فرض) -->
          <div id="all-projects-view" class="all-projects-view">
            <div class="category-header">
              <h2 class="category-title">${currentLang === 'fa' || currentLang === 'fa-IR' ? 'همه پروژه‌ها' : 'All Projects'}</h2>
              <span class="category-count">${projects.length} ${currentLang === 'fa' || currentLang === 'fa-IR' ? 'پروژه' : 'projects'}</span>
            </div>
            <div class="category-projects">
              ${renderProjectCards(projects, currentLang, false)}
            </div>
          </div>
          
          <!-- بخش دسته‌بندی‌ها (مخفی در حالت همه) -->
          <div id="categories-view" class="categories-view" style="display: none;">
            ${renderCategories(categorizedProjects, currentLang)}
          </div>
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
              <h2 class="section-title text-white">${i18n.t('cta_projects_title') || 'پروژه‌ای در ذهن دارید؟'}</h2>
              <div class="cta-button-wrap">
                <a href="/${currentLang}/contact" class="cta-button" data-route="contact">${i18n.t('lets_talk') || 'با ما صحبت کنید'}</a>
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
  
  // Initialize category filter
  initCategoryFilter(currentLang);
  
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
// رندر دکمه‌های فیلتر دسته‌بندی
// ============================================================
function renderCategoryFilters(lang) {
  const isPersian = lang === 'fa' || lang === 'fa-IR';
  
  return CATEGORIES.map(category => {
    const label = isPersian ? category.label : category.labelEn;
    const isActive = category.id === 'all' ? 'active' : '';
    
    return `
      <button class="category-filter-btn ${isActive}" data-category="${category.id}">
        ${label}
      </button>
    `;
  }).join('');
}

// ============================================================
// دسته‌بندی پروژه‌ها بر اساس دسته‌بندی‌های ثابت
// ============================================================
function groupProjectsByCategory(projects) {
  // ایجاد آبجکت خالی برای همه دسته‌بندی‌ها
  const categorized = {};
  CATEGORIES.forEach(cat => {
    if (cat.id !== 'all') {
      categorized[cat.id] = [];
    }
  });
  
  projects.forEach(project => {
    let assigned = false;
    
    // دریافت دسته‌بندی پروژه از دیتابیس
    const projectCategory = (project.category || project.tags?.[0] || '').toLowerCase().trim();
    
    // بررسی تطابق با دسته‌بندی‌های موجود
    for (const [categoryId, keywords] of Object.entries(CATEGORY_MAP)) {
      if (keywords.some(keyword => projectCategory.includes(keyword))) {
        categorized[categoryId].push(project);
        assigned = true;
        break;
      }
    }
    
    // اگر دسته‌بندی پروژه با هیچکدام تطابق نداشت
    if (!assigned) {
      // اگر خود پروژه دسته‌بندی مشخصی دارد، به عنوان دسته‌بندی جدید اضافه کن
      if (project.category) {
        const customCategory = project.category.toLowerCase().trim();
        if (!categorized[customCategory]) {
          categorized[customCategory] = [];
        }
        categorized[customCategory].push(project);
      } else {
        // پروژه‌های بدون دسته‌بندی
        if (!categorized['uncategorized']) {
          categorized['uncategorized'] = [];
        }
        categorized['uncategorized'].push(project);
      }
    }
  });
  
  return categorized;
}

// ============================================================
// رندر دسته‌بندی‌ها
// ============================================================
function renderCategories(categorizedProjects, lang) {
  const isPersian = lang === 'fa' || lang === 'fa-IR';
  let html = '';
  
  CATEGORIES.forEach(category => {
    if (category.id === 'all') return;
    
    const projects = categorizedProjects[category.id] || [];
    const label = isPersian ? category.label : category.labelEn;
    
    // اگر پروژه‌ای در این دسته نیست، نمایش نده
    if (projects.length === 0) return;
    
    html += `
      <div class="category-section" data-category="${category.id}">
        <div class="category-header">
          <h2 class="category-title">${label}</h2>
          <span class="category-count">${projects.length} ${isPersian ? 'پروژه' : 'projects'}</span>
        </div>
        <div class="category-projects">
          ${renderProjectCards(projects, lang, true)}
        </div>
      </div>
    `;
  });
  
  // دسته‌بندی نشده‌ها
  const uncategorizedProjects = categorizedProjects['uncategorized'] || [];
  if (uncategorizedProjects.length > 0) {
    html += `
      <div class="category-section" data-category="uncategorized">
        <div class="category-header">
          <h2 class="category-title">${isPersian ? 'سایر' : 'Other'}</h2>
          <span class="category-count">${uncategorizedProjects.length} ${isPersian ? 'پروژه' : 'projects'}</span>
        </div>
        <div class="category-projects">
          ${renderProjectCards(uncategorizedProjects, lang, true)}
        </div>
      </div>
    `;
  }
  
  return html;
}

// ============================================================
// رندر کارت‌های پروژه
// ============================================================
function renderProjectCards(projects, lang, showCategory = false) {
  if (!projects || projects.length === 0) {
    return `
      <div class="no-projects">
        <p>${i18n.t('no_projects') || 'هیچ پروژه‌ای وجود ندارد'}</p>
      </div>
    `;
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
        
        // فقط اگر showCategory=true باشه برچسب نمایش داده میشه
        let categoryLabel = '';
        if (showCategory) {
          const projectCategory = project.category || '';
          categoryLabel = getCategoryLabel(projectCategory, lang);
        }
        
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
                ${categoryLabel ? `<span class="project-category-tag">${categoryLabel}</span>` : ''}
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `).join('');
}

// ============================================================
// دریافت برچسب دسته‌بندی
// ============================================================
function getCategoryLabel(category, lang) {
  if (!category) return '';
  
  const isPersian = lang === 'fa' || lang === 'fa-IR';
  const categoryLower = category.toLowerCase().trim();
  
  // پیدا کردن دسته‌بندی متناظر
  for (const [categoryId, keywords] of Object.entries(CATEGORY_MAP)) {
    if (keywords.some(keyword => categoryLower.includes(keyword))) {
      const foundCategory = CATEGORIES.find(cat => cat.id === categoryId);
      if (foundCategory) {
        return isPersian ? foundCategory.label : foundCategory.labelEn;
      }
    }
  }
  
  // اگر دسته‌بندی پیدا نشد، خود دسته‌بندی را برگردان
  return category;
}

// ============================================================
// فیلتر دسته‌بندی
// ============================================================
function initCategoryFilter(lang) {
  const filterButtons = document.querySelectorAll('.category-filter-btn');
  const allProjectsView = document.getElementById('all-projects-view');
  const categoriesView = document.getElementById('categories-view');
  const categorySections = document.querySelectorAll('.category-section');
  
  if (!filterButtons.length) return;
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const selectedCategory = btn.dataset.category;
      
      if (selectedCategory === 'all') {
        // نمایش همه پروژه‌ها (بدون دسته‌بندی)
        allProjectsView.style.display = 'block';
        categoriesView.style.display = 'none';
      } else {
        // مخفی کردن نمای همه
        allProjectsView.style.display = 'none';
        categoriesView.style.display = 'block';
        
        // نمایش فقط دسته‌بندی انتخاب شده
        categorySections.forEach(section => {
          const sectionCategory = section.dataset.category;
          section.style.display = sectionCategory === selectedCategory ? 'block' : 'none';
        });
      }
      
      // Smooth scroll to top of projects section
      const projectsSection = document.querySelector('.projects-list-section');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ============================================================
// escapeHtml
// ============================================================
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}