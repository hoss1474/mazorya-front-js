
/**
 * Mazorya Group - Projects Listing
 * File: pages/projects.js
 *
 * Fixed categories, Laravel API, filters,
 * multilingual content and existing Webflow layout.
 */

import { i18n } from '../core/i18n.js';

import {
  renderHeader,
  attachHeaderEvents
} from '../components/header.js';

import {
  renderFooter,
  attachFooterEvents
} from '../components/footer.js';

import { getProjects } from '../core/api.js';

// ============================================================
// CONFIGURATION
// ============================================================

const DEFAULT_IMAGE = '/assets/img/default-project.jpg';

const API_URL =
  import.meta.env?.VITE_API_URL ||
  'https://api.mazoryagroup.com/api';

let renderRequestId = 0;

// ============================================================
// FIXED CATEGORIES
// ============================================================

const CATEGORIES = [
  { id: 'all', label: 'همه', labelEn: 'All' },
  { id: 'website', label: 'وبسایت', labelEn: 'Website' },
  { id: 'ui-ux', label: 'UI/UX', labelEn: 'UI/UX' },
  { id: 'social-media', label: 'سوشیال مدیا', labelEn: 'Social Media' },
  { id: 'seo', label: 'سئو', labelEn: 'SEO' },
  { id: 'graphic', label: 'گرافیک', labelEn: 'Graphic' },
  { id: 'other', label: 'سایر', labelEn: 'Other' }
];

const CATEGORY_MAP = {
  website: [
    'website', 'web', 'وبسایت', 'وب سایت',
    'site', 'web development'
  ],
  'ui-ux': [
    'ui-ux', 'ui/ux', 'uiux',
    'user interface', 'user experience',
    'طراحی رابط کاربری', 'تجربه کاربری'
  ],
  'social-media': [
    'social-media', 'social media',
    'social', 'سوشیال', 'سوشیال مدیا',
    'instagram', 'telegram'
  ],
  seo: [
    'seo', 'سئو', 'بهینه سازی',
    'بهینه‌سازی', 'search engine'
  ],
  graphic: [
    'graphic', 'graphics', 'گرافیک',
    'طراحی گرافیک', 'illustration', 'تصویرسازی'
  ]
};

// ============================================================
// HELPERS
// ============================================================

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function tr(key, fallback = '') {
  const value = i18n.t(key);

  if (
    value == null ||
    value === '' ||
    value === key
  ) {
    return fallback || key;
  }

  return String(value);
}

function t(key, fallback = '') {
  return escapeHtml(tr(key, fallback));
}

function isPersian(lang) {
  return lang === 'fa';
}

function getCategoryLabel(category, lang) {
  if (!category) return '';

  const found = CATEGORIES.find(
    item => item.id === category
  );

  if (found) {
    return isPersian(lang)
      ? found.label
      : found.labelEn;
  }

  return String(category);
}

function getProjectCountLabel(count, lang) {
  return `${count} ${
    isPersian(lang) ? 'پروژه' : count === 1 ? 'project' : 'projects'
  }`;
}

function normalizeText(value) {
  return String(value ?? '')
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[\u200c\u200d]/g, ' ')
    .replace(/[_-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// ============================================================
// CATEGORY EXTRACTION
// ============================================================

function extractCategoryValues(value) {
  if (value == null) return [];

  if (Array.isArray(value)) {
    return value.flatMap(extractCategoryValues);
  }

  if (typeof value === 'object') {
    const candidates = [
      value.slug,
      value.name,
      value.title,
      value.label
    ];

    return candidates
      .filter(item => typeof item === 'string')
      .map(normalizeText)
      .filter(Boolean);
  }

  if (
    typeof value === 'string' ||
    typeof value === 'number'
  ) {
    const normalized = normalizeText(value);
    return normalized ? [normalized] : [];
  }

  return [];
}

function matchCategory(value) {
  const normalized = normalizeText(value);

  if (!normalized) return null;

  for (const [id, keywords] of Object.entries(CATEGORY_MAP)) {
    const matches = keywords.some(keyword => {
      const key = normalizeText(keyword);

      if (normalized === key) return true;

      // Short keywords must match whole tokens
      // to avoid accidental matches.
      if (key.length <= 3) {
        const tokens = normalized.split(
          /[\s/,+&()]+/
        );
        return tokens.includes(key);
      }

      return normalized.includes(key);
    });

    if (matches) return id;
  }

  return null;
}

function getProjectCategory(project) {
  const values = [
    ...extractCategoryValues(project?.category),
    ...extractCategoryValues(project?.categories),
    ...extractCategoryValues(project?.tags)
  ];

  for (const value of values) {
    const match = matchCategory(value);
    if (match) return match;
  }

  return 'other';
}

function groupProjectsByCategory(projects) {
  const categorized = Object.fromEntries(
    CATEGORIES
      .filter(category => category.id !== 'all')
      .map(category => [category.id, []])
  );

  projects.forEach(project => {
    const categoryId = getProjectCategory(project);
    categorized[categoryId].push(project);
  });

  return categorized;
}

// ============================================================
// PROJECT IMAGE
// ============================================================

function resolveImageUrl(value) {
  if (typeof value !== 'string' || !value.trim()) {
    return DEFAULT_IMAGE;
  }

  const path = value.trim();

  try {
    if (
      path.startsWith('//') ||
      (/^[a-z][a-z\d+.-]*:/i.test(path) &&
        !/^https?:\/\//i.test(path))
    ) {
      return DEFAULT_IMAGE;
    }

    const apiOrigin = new URL(
      API_URL,
      window.location.origin
    ).origin;

    let url;

    if (/^https?:\/\//i.test(path)) {
      url = new URL(path);
    } else if (
      path.startsWith('/assets/') ||
      path.startsWith('assets/')
    ) {
      url = new URL(
        path.startsWith('/') ? path : `/${path}`,
        window.location.origin
      );
    } else {
      url = new URL(
        `/${path.replace(/^\/+/, '')}`,
        apiOrigin
      );
    }

    if (!['http:', 'https:'].includes(url.protocol)) {
      return DEFAULT_IMAGE;
    }

    return escapeHtml(url.href);
  } catch {
    return DEFAULT_IMAGE;
  }
}

function getProjectImage(project) {
  const images = project?.images;

  const image =
    (typeof images === 'string' ? images : null) ||
    images?.image ||
    images?.cover ||
    project?.cover_url ||
    project?.image_url ||
    project?.image;

  return resolveImageUrl(image);
}

// ============================================================
// PROJECT DETAILS URL
// ============================================================

function getProjectLink(project, lang) {
  const slug = project?.slug;

  if (
    slug === undefined ||
    slug === null ||
    String(slug).trim() === ''
  ) {
    return null;
  }

  return `/${lang}/project/${encodeURIComponent(
    String(slug)
  )}`;
}

// ============================================================
// CATEGORY FILTER BUTTONS
// ============================================================

function renderCategoryFilters(lang) {
  return CATEGORIES.map(category => {
    const label = getCategoryLabel(category.id, lang);

    const active = category.id === 'all';

    return `
      <button
        type="button"
        class="category-filter-btn ${active ? 'active' : ''}"
        data-category="${category.id}"
        aria-pressed="${active}"
      >
        ${escapeHtml(label)}
      </button>
    `;
  }).join('');
}

// ============================================================
// PROJECT CARDS
// ============================================================

function renderProjectCards(
  projects,
  lang,
  showCategory = false
) {
  if (!Array.isArray(projects) || !projects.length) {
    return `
      <div class="no-projects">
        <p>
          ${t(
            'no_projects',
            isPersian(lang)
              ? 'هیچ پروژه‌ای وجود ندارد'
              : 'No projects found.'
          )}
        </p>
      </div>
    `;
  }

  // Preserve the original two-column row layout.
  const rows = [];

  for (let i = 0; i < projects.length; i += 2) {
    rows.push(projects.slice(i, i + 2));
  }

  return rows.map(row => `
    <div class="projects-row">
      ${row.map(project => {
        const title = String(
          project?.name ||
          project?.title ||
          'Project'
        );

        const image = getProjectImage(project);
        const link = getProjectLink(project, lang);

        const categoryId = getProjectCategory(project);
        const categoryLabel = showCategory
          ? getCategoryLabel(categoryId, lang)
          : '';

        const imageHTML = `
          <img
            src="${image}"
            loading="lazy"
            decoding="async"
            alt="${escapeHtml(title)}"
            class="project-image"
          />
        `;

        return `
          <div class="project-collection-item">
            <div class="project-card-wrap">

              <div class="project-image-area">

                ${
                  link
                    ? `
                      <a
                        href="${link}"
                        class="project-image-wrap w-inline-block"
                      >
                        ${imageHTML}
                      </a>

                      <a
                        href="${link}"
                        class="project-overlay-wrap w-inline-block"
                        aria-label="${escapeHtml(title)}"
                      >
                        <div class="project-arrow-icon-wrap">
                          <img
                            src="/assets/img/project-arrow.svg"
                            class="project-arrow-icon"
                            alt=""
                          />
                        </div>
                      </a>
                    `
                    : `
                      <div class="project-image-wrap">
                        ${imageHTML}
                      </div>
                    `
                }

              </div>

              <div class="project-title-wrap">

                ${
                  link
                    ? `
                      <a href="${link}" class="project-title">
                        ${escapeHtml(title)}
                      </a>
                    `
                    : `
                      <span class="project-title">
                        ${escapeHtml(title)}
                      </span>
                    `
                }

                ${
                  categoryLabel
                    ? `
                      <span class="project-category-tag">
                        ${escapeHtml(categoryLabel)}
                      </span>
                    `
                    : ''
                }

              </div>

            </div>
          </div>
        `;
      }).join('')}
    </div>
  `).join('');
}

// ============================================================
// CATEGORY SECTIONS
// ============================================================

function renderCategories(categorizedProjects, lang) {
  return CATEGORIES
    .filter(category => category.id !== 'all')
    .map(category => {
      const projects =
        categorizedProjects[category.id] || [];

      const label = getCategoryLabel(
        category.id,
        lang
      );

      return `
        <div
          class="category-section"
          data-category="${category.id}"
          style="display:none;"
        >
          <div class="category-header">
            <h2 class="category-title">
              ${escapeHtml(label)}
            </h2>

            <span class="category-count">
              ${escapeHtml(
                getProjectCountLabel(projects.length, lang)
              )}
            </span>
          </div>

          <div class="category-projects">
            ${renderProjectCards(
              projects,
              lang,
              true
            )}
          </div>
        </div>
      `;
    })
    .join('');
}

// ============================================================
// PROJECTS BANNER
// ============================================================

function renderBannerSection(lang) {
  return `
    <section class="projects-banner">

      <div class="w-layout-blockcontainer container-regular w-container">
        <div class="align-center">

          <div class="banner-title-wrap small">

            <h1 class="banner-title">
              ${t(
                'projects_title',
                isPersian(lang)
                  ? 'نمونه کارها'
                  : 'Our Projects'
              )}
            </h1>

            <p>
              ${t(
                'projects_subtitle',
                isPersian(lang)
                  ? 'گزیده‌ای از مهم‌ترین پروژه‌های ما در حوزه‌های مختلف'
                  : 'Explore our selected projects across different creative and digital disciplines.'
              )}
            </p>

          </div>

        </div>
      </div>
    </section>
  `;
}

// ============================================================
// PROJECT FILTER SECTION
// ============================================================

function renderFilterSection(lang) {
  return `
    <section class="category-filter-section">
      <div class="w-layout-blockcontainer container-regular w-container">
        <div class="category-filter-wrap">
          ${renderCategoryFilters(lang)}
        </div>
      </div>
    </section>
  `;
}

// ============================================================
// PROJECTS GRID
// ============================================================

function renderProjectsGrid(
  projects,
  categorizedProjects,
  lang
) {
  const allTitle = isPersian(lang)
    ? 'همه پروژه‌ها'
    : 'All Projects';

  return `
    <section class="projects-list-section">

      <div class="w-layout-blockcontainer container-regular w-container">

        <div
          id="projects-grid-container"
          class="projects-grid"
        >

          <div
            id="all-projects-view"
            class="all-projects-view"
          >

            <div class="category-header">

              <h2 class="category-title">
                ${allTitle}
              </h2>

              <span class="category-count">
                ${escapeHtml(
                  getProjectCountLabel(projects.length, lang)
                )}
              </span>

            </div>

            <div class="category-projects">
              ${renderProjectCards(
                projects,
                lang,
                false
              )}
            </div>

          </div>

          <div
            id="categories-view"
            class="categories-view"
            style="display:none;"
          >
            ${renderCategories(
              categorizedProjects,
              lang
            )}
          </div>

        </div>

      </div>

    </section>
  `;
}

// ============================================================
// CTA
// ============================================================

function renderCTASection(lang) {
  return `
    <section class="cta-section">

      <div class="w-layout-blockcontainer container-regular w-container">

        <div class="cta-image-wrap">

          <img
            src="/assets/img/cta-image.jpg"
            loading="lazy"
            decoding="async"
            alt=""
            class="cta-image"
          />

          <div class="cta-title-area">

            <div class="cta-title-wrap">

              <h2 class="section-title text-white">
                ${t(
                  'cta_projects_title',
                  isPersian(lang)
                    ? 'پروژه‌ای در ذهن دارید؟'
                    : 'Have a project in mind?'
                )}
              </h2>

              <div class="cta-button-wrap">
                <a
                  href="/${lang}/contact"
                  class="cta-button"
                  data-route="contact"
                >
                  ${t(
                    'lets_talk',
                    isPersian(lang)
                      ? 'با ما صحبت کنید'
                      : "Let's Talk"
                  )}
                </a>
              </div>

            </div>

          </div>

          <div class="cta-bg-wrap"></div>
        </div>

      </div>

    </section>
  `;
}

// ============================================================
// CATEGORY FILTER INTERACTIONS
// ============================================================

function initCategoryFilter(app) {
  const buttons = [
    ...app.querySelectorAll('.category-filter-btn')
  ];

  const allView = app.querySelector(
    '#all-projects-view'
  );

  const categoriesView = app.querySelector(
    '#categories-view'
  );

  const sections = [
    ...app.querySelectorAll('.category-section')
  ];

  if (!buttons.length || !allView || !categoriesView) {
    return;
  }

  function activateCategory(selectedCategory) {
    buttons.forEach(button => {
      const active =
        button.dataset.category === selectedCategory;

      button.classList.toggle('active', active);

      button.setAttribute(
        'aria-pressed',
        String(active)
      );
    });

    const showAll = selectedCategory === 'all';

    allView.style.display = showAll
      ? 'block'
      : 'none';

    categoriesView.style.display = showAll
      ? 'none'
      : 'block';

    sections.forEach(section => {
      section.style.display =
        !showAll &&
        section.dataset.category === selectedCategory
          ? 'block'
          : 'none';
    });
  }

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.category;

      if (!category) return;

      activateCategory(category);

      const projectsSection = app.querySelector(
        '.projects-list-section'
      );

      if (projectsSection) {
        projectsSection.scrollIntoView({
          behavior: window.matchMedia?.(
            '(prefers-reduced-motion: reduce)'
          ).matches
            ? 'auto'
            : 'smooth',
          block: 'start'
        });
      }
    });
  });

  activateCategory('all');
}

// ============================================================
// MAIN RENDER
// ============================================================

export async function renderProjects() {
  const app = document.getElementById('app');

  if (!app) {
    console.error(
      '[Projects] #app element not found.'
    );
    return;
  }

  const currentLang = i18n.getCurrentLanguage();
  const initialPath = window.location.pathname;
  const requestId = ++renderRequestId;

  let projects = [];

  try {
    const result = await getProjects();

    if (Array.isArray(result)) {
      projects = result.filter(
        project => project &&
          typeof project === 'object'
      );
    }
  } catch (error) {
    console.error(
      '[Projects] Failed to load projects:',
      error
    );
  }

  // Ignore outdated responses.
  if (
    requestId !== renderRequestId ||
    window.location.pathname !== initialPath ||
    i18n.getCurrentLanguage() !== currentLang
  ) {
    return;
  }

  const categorizedProjects =
    groupProjectsByCategory(projects);

 
app.innerHTML = `
  ${renderHeader()}

  <main class="mz-projects" id="mazoryaProjects">
    ${renderBannerSection(currentLang)}
    ${renderFilterSection(currentLang)}

    ${renderProjectsGrid(
      projects,
      categorizedProjects,
      currentLang
    )}

    ${renderCTASection(currentLang)}
  </main>

  ${renderFooter()}
`;


  // Shared header/footer components
  attachHeaderEvents();
  attachFooterEvents();

  // Category filtering
  initCategoryFilter(app);

  /*
   * Animation Manager:
   *
   * app.js
   * -> router.afterRender
   * -> reinitAnimations()
   *
   * Existing animation classes are preserved.
   * Native navigation links remain functional.
   */

  console.log(
    '[Projects] Page rendered:',
    {
      language: currentLang,
      projects: projects.length,
      categories: Object.fromEntries(
        Object.entries(categorizedProjects).map(
          ([key, values]) => [key, values.length]
        )
      )
    }
  );
}
