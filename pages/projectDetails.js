
/**
 * Mazorya Group - Project Details Page
 * File: pages/projectDetails.js
 *
 * - Laravel API integration
 * - Dynamic project details by slug
 * - Multilingual content
 * - Safe image URL handling
 * - Dynamic content sections
 * - SPA navigation compatibility
 * - Existing Webflow CSS compatibility
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

import {
  getProjectBySlug
} from '../core/api.js';

// ============================================================
// CONFIGURATION
// ============================================================

const DEFAULT_API_BASE =
  'https://api.mazoryagroup.com/api';

let renderRequestId = 0;

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
  const translated = i18n.t(key);

  if (
    translated === key ||
    translated === null ||
    translated === undefined ||
    translated === ''
  ) {
    return fallback || key;
  }

  return String(translated);
}

function t(key, fallback = '') {
  return escapeHtml(tr(key, fallback));
}

/**
 * Return a safe string for display.
 */
function getText(value) {
  if (
    typeof value === 'string' ||
    typeof value === 'number'
  ) {
    return String(value);
  }

  return '';
}

/**
 * Convert image paths into absolute URLs.
 *
 * - Absolute URLs remain unchanged.
 * - Local assets are loaded from frontend.
 * - Relative storage paths use API origin.
 */
function resolveImageUrl(value) {
  if (
    typeof value !== 'string' ||
    !value.trim()
  ) {
    return null;
  }

  const path = value.trim();

  try {
    if (
      path.startsWith('//') ||
      (
        /^[a-z][a-z\d+.-]*:/i.test(path) &&
        !/^https?:\/\//i.test(path)
      )
    ) {
      return null;
    }

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
      const apiBase =
        import.meta.env?.VITE_API_URL ||
        DEFAULT_API_BASE;

      const apiOrigin = new URL(
        apiBase,
        window.location.origin
      ).origin;

      url = new URL(
        `/${path.replace(/^\/+/, '')}`,
        apiOrigin
      );
    }

    if (
      !['http:', 'https:'].includes(url.protocol)
    ) {
      return null;
    }

    return escapeHtml(url.href);
  } catch (error) {
    console.warn(
      '[ProjectDetails] Invalid image URL:',
      error
    );

    return null;
  }
}

/**
 * Get project title.
 */
function getProjectName(project) {
  return (
    getText(project?.name) ||
    getText(project?.title) ||
    tr('project_details_title', 'Project Details')
  );
}

/**
 * Check current navigation before rendering.
 */
function isCurrentRender(requestId, path, lang) {
  return (
    requestId === renderRequestId &&
    window.location.pathname === path &&
    i18n.getCurrentLanguage() === lang
  );
}

// ============================================================
// PROJECT NOT FOUND
// ============================================================

function renderProjectNotFound(lang) {
  return `
    <section class="project-not-found-section">

      <div
        class="container-regular"
        style="
          text-align: center;
          padding: 100px 20px;
          min-height: 60vh;
        "
      >

        <h1>
          ${t(
            'project_not_found',
            'Project Not Found'
          )}
        </h1>

        <p style="margin-top: 20px;">
          ${t(
            'project_not_found_desc',
            'The project you are looking for does not exist or could not be loaded.'
          )}
        </p>

        <a
          href="/${lang}/projects"
          class="primary-button"
          style="
            display: inline-block;
            margin-top: 20px;
          "
        >
          ${t(
            'back_to_projects',
            'Back to Projects'
          )}
        </a>

      </div>

    </section>
  `;
}

// ============================================================
// PROJECT HEADER
// ============================================================

function renderProjectHeader(project) {
  return `
    <div class="project-details-header">

      <h1 class="project-details-title">
        ${escapeHtml(getProjectName(project))}
      </h1>

    </div>
  `;
}

// ============================================================
// MAIN PROJECT IMAGE
// ============================================================

function renderMainImage(project) {
  const imagePath =
    project?.images?.image ||
    project?.cover_url ||
    project?.image_url ||
    project?.image;

  const imageUrl = resolveImageUrl(imagePath);

  if (!imageUrl) {
    return '';
  }

  return `
    <div class="project-details-image-main">

      <img
        src="${imageUrl}"
        alt="${escapeHtml(getProjectName(project))}"
        class="project-details-image"
        loading="eager"
        decoding="async"
      />

    </div>
  `;
}

// ============================================================
// PROJECT DESCRIPTION
// ============================================================

function renderDescription(project) {
  const description = getText(
    project?.description
  ).trim();

  if (!description) {
    return '';
  }

  return `
    <div class="project-details-description">

      <p>
        ${escapeHtml(description)}
      </p>

    </div>
  `;
}

// ============================================================
// SECONDARY IMAGE
// ============================================================

function renderSecondaryImage(project) {
  const imagePath =
    project?.images?.image2 ||
    project?.images?.image_2 ||
    project?.image_2;

  const imageUrl = resolveImageUrl(imagePath);

  if (!imageUrl) {
    return '';
  }

  return `
    <div class="project-details-image-secondary">

      <img
        src="${imageUrl}"
        alt="${escapeHtml(getProjectName(project))}"
        class="project-details-image"
        loading="lazy"
        decoding="async"
      />

    </div>
  `;
}

// ============================================================
// DYNAMIC CONTENT SECTIONS
// ============================================================

function renderSections(sections) {
  if (
    !Array.isArray(sections) ||
    sections.length === 0
  ) {
    return '';
  }

  return sections
    .filter(section => (
      section &&
      typeof section === 'object' &&
      !Array.isArray(section)
    ))
    .map(section => {
      const title = getText(
        section.title || section.name
      ).trim();

      const description = getText(
        section.description || section.content
      ).trim();

      if (!title && !description) {
        return '';
      }

      return `
        <div class="project-details-block">

          ${
            title
              ? `
                <h2 class="project-details-block-title">
                  ${escapeHtml(title)}
                </h2>
              `
              : ''
          }

          ${
            description
              ? `
                <div class="project-details-block-content">
                  <p>
                    ${escapeHtml(description)}
                  </p>
                </div>
              `
              : ''
          }

        </div>
      `;
    })
    .join('');
}

// ============================================================
// PROJECT DETAILS CONTENT
// ============================================================

function renderProjectContent(project) {
  const sections = Array.isArray(project.sections)
    ? project.sections
    : [];

  return `
    <section class="project-details-section">

      <div class="w-layout-blockcontainer container-regular w-container">

        ${renderProjectHeader(project)}

        ${renderMainImage(project)}

        ${renderDescription(project)}

        ${renderSecondaryImage(project)}

        <div class="project-details-content">
          ${renderSections(sections)}
        </div>

      </div>

    </section>
  `;
}

// ============================================================
// CTA SECTION
// ============================================================

function renderCTASection(currentLang) {
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
                  'cta_project_title',
                  'Interested in similar work?'
                )}
              </h2>

              <div class="cta-button-wrap">

                <a
                  href="/${currentLang}/contact"
                  class="cta-button"
                  data-route="contact"
                >
                  ${t(
                    'contact_us',
                    'Contact Us'
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
// SHARED COMPONENTS
// ============================================================


function renderPage(content) {
  const app = document.getElementById('app');

  if (!app) return;

  app.innerHTML = `
    ${renderHeader()}

    <main
      class="mz-project-details"
      id="mazoryaProjectDetails"
    >
      ${content}
    </main>

    ${renderFooter()}
  `;

  attachHeaderEvents();
  attachFooterEvents();
}


// ============================================================
// MAIN RENDER
// ============================================================

export async function renderProjectDetails(params = {}) {
  const app = document.getElementById('app');

  if (!app) {
    console.error(
      '[ProjectDetails] #app element not found.'
    );
    return;
  }

  const currentLang = i18n.getCurrentLanguage();
  const initialPath = window.location.pathname;

  const requestId = ++renderRequestId;

  const slug = params?.slug;

  // ==========================================================
  // VALIDATE SLUG
  // ==========================================================

  if (
    typeof slug !== 'string' ||
    !slug.trim()
  ) {
    window.location.assign(
      `/${currentLang}/projects`
    );
    return;
  }

  // ==========================================================
  // FETCH PROJECT
  // ==========================================================

  let project = null;

  try {
    project = await getProjectBySlug(slug);
  } catch (error) {
    console.error(
      '[ProjectDetails] API request failed:',
      error
    );
  }

  // Prevent outdated API responses from rendering.
  if (
    !isCurrentRender(
      requestId,
      initialPath,
      currentLang
    )
  ) {
    return;
  }

  // ==========================================================
  // NOT FOUND
  // ==========================================================

  if (
    !project ||
    typeof project !== 'object' ||
    Array.isArray(project)
  ) {
    renderPage(
      renderProjectNotFound(currentLang)
    );

    console.warn(
      '[ProjectDetails] Project unavailable:',
      slug
    );

    return;
  }

  // ==========================================================
  // RENDER PROJECT
  // ==========================================================

  renderPage(`
    ${renderProjectContent(project)}

    ${renderCTASection(currentLang)}
  `);

  /*
   * Animations are handled by app.js:
   *
   * router.afterRender
   *   -> reinitAnimations()
   *
   * Existing project CSS selectors are preserved:
   *
   * .project-details-section
   * .project-details-header
   * .project-details-title
   * .project-details-image-main
   * .project-details-description
   * .project-details-image-secondary
   * .project-details-content
   * .project-details-block
   * .cta-section
   *
   * Native navigation links remain enabled.
   */

  console.log(
    '[ProjectDetails] Page rendered:',
    {
      slug,
      language: currentLang,
      project: getProjectName(project)
    }
  );
}
