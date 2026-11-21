
/**
 * Mazorya Group - Service Details Page
 * File: pages/serviceDetails.js
 *
 * Features:
 * - Laravel API integration
 * - Dynamic service details by slug
 * - Multilingual content
 * - RTL / LTR compatibility
 * - Safe image URLs
 * - Dynamic content sections
 * - Error handling
 * - Existing animation compatibility
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
  getServiceBySlug
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

/**
 * Translation with fallback.
 */
function tr(key, fallback = '') {
  const value = i18n.t(key);

  if (
    value === key ||
    value === undefined ||
    value === null ||
    value === ''
  ) {
    return fallback || key;
  }

  return String(value);
}

/**
 * Translate and escape HTML.
 */
function t(key, fallback = '') {
  return escapeHtml(tr(key, fallback));
}

/**
 * Convert API image paths to safe URLs.
 *
 * Supported:
 * https://example.com/storage/image.jpg
 * /storage/image.jpg
 * storage/image.jpg
 */
function resolveImageUrl(value) {
  if (
    typeof value !== 'string' ||
    !value.trim()
  ) {
    return null;
  }

  const imagePath = value.trim();

  try {
    const apiBase =
      import.meta.env?.VITE_API_URL ||
      DEFAULT_API_BASE;

    const apiOrigin = new URL(
      apiBase,
      window.location.origin
    ).origin;

    let url;

    if (/^https?:\/\//i.test(imagePath)) {
      url = new URL(imagePath);
    } else if (
      imagePath.startsWith('//') ||
      /^[a-z][a-z\d+.-]*:/i.test(imagePath)
    ) {
      return null;
    } else {
      url = new URL(
        imagePath.replace(/^\/+/, ''),
        `${apiOrigin}/`
      );
    }

    if (
      url.protocol !== 'https:' &&
      url.protocol !== 'http:'
    ) {
      return null;
    }

    return escapeHtml(url.href);
  } catch (error) {
    console.warn(
      '[ServiceDetails] Invalid image URL:',
      value,
      error
    );

    return null;
  }
}

/**
 * Convert service fields to safe display text.
 */
function getServiceName(service) {
  return String(
    service?.name ||
    service?.title ||
    tr('service_details_title', 'Service Details')
  );
}

/**
 * Check that this render still belongs to
 * the active language and route.
 */
function isCurrentRender(
  requestId,
  path,
  lang
) {
  return (
    requestId === renderRequestId &&
    window.location.pathname === path &&
    i18n.getCurrentLanguage() === lang
  );
}

// ============================================================
// SERVICE NOT FOUND
// ============================================================

function renderServiceNotFound(currentLang) {
  return `
    <section
      class="service-not-found-section"
      style="
        text-align: center;
        padding: 100px 20px;
        min-height: 60vh;
      "
    >
      <div class="container-regular">

        <h1>
          ${t(
            'service_not_found',
            'Service Not Found'
          )}
        </h1>

        <p style="margin-top: 20px;">
          ${t(
            'service_not_found_desc',
            "The service you're looking for doesn't exist or could not be loaded."
          )}
        </p>

        <a
          href="/${currentLang}/services"
          class="primary-button"
          style="
            display: inline-block;
            margin-top: 30px;
          "
        >
          ${t(
            'back_to_services',
            'Back to Services'
          )}
        </a>

      </div>
    </section>
  `;
}

// ============================================================
// SERVICE HEADER
// ============================================================

function renderServiceHeader(service) {
  const serviceName = getServiceName(service);

  return `
    <div class="service-details-header">

      <h1 class="service-details-title">
        ${escapeHtml(serviceName)}
      </h1>

    </div>
  `;
}

// ============================================================
// SERVICE MAIN IMAGE
// ============================================================

function renderMainImage(service) {
  const imagePath =
    service?.images?.image_1 ||
    service?.image_1;

  const imageUrl = resolveImageUrl(imagePath);

  if (!imageUrl) {
    return '';
  }

  const serviceName = getServiceName(service);

  return `
    <div class="service-details-image-main">

      <img
        src="${imageUrl}"
        alt="${escapeHtml(serviceName)}"
        class="service-details-image"
        loading="eager"
        decoding="async"
      />

    </div>
  `;
}

// ============================================================
// SERVICE DESCRIPTION
// ============================================================

function renderDescription(service) {
  const description = service?.description;

  if (
    description === null ||
    description === undefined ||
    String(description).trim() === ''
  ) {
    return '';
  }

  return `
    <div class="service-details-description">

      <p>
        ${escapeHtml(description)}
      </p>

    </div>
  `;
}

// ============================================================
// SERVICE SECONDARY IMAGE
// ============================================================

function renderSecondaryImage(service) {
  const imagePath =
    service?.images?.image_2 ||
    service?.image_2;

  const imageUrl = resolveImageUrl(imagePath);

  if (!imageUrl) {
    return '';
  }

  const serviceName = getServiceName(service);

  return `
    <div class="service-details-image-secondary">

      <img
        src="${imageUrl}"
        alt="${escapeHtml(serviceName)}"
        class="service-details-image"
        loading="lazy"
        decoding="async"
      />

    </div>
  `;
}

// ============================================================
// DYNAMIC CONTENT SECTIONS
// ============================================================

function renderSections(sections, lang) {
  if (
    !Array.isArray(sections) ||
    sections.length === 0
  ) {
    return '';
  }

  return sections
    .filter(section => (
      section &&
      typeof section === 'object'
    ))
    .map(section => {
      const title =
        section.name ||
        section.title ||
        '';

      const description =
        section.description ||
        section.content ||
        '';

      if (!title && !description) {
        return '';
      }

      return `
        <div class="service-details-block">

          ${
            title
              ? `
                <h2 class="service-details-block-title">
                  ${escapeHtml(title)}
                </h2>
              `
              : ''
          }

          ${
            description
              ? `
                <div class="service-details-block-content">

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
// SERVICE DETAILS SECTION
// ============================================================

function renderServiceContent(service, lang) {
  const sections = Array.isArray(service.sections)
    ? service.sections
    : [];

  return `
    <section class="service-details-section">

      <div class="w-layout-blockcontainer container-regular w-container">

        ${renderServiceHeader(service)}

        ${renderMainImage(service)}

        ${renderDescription(service)}

        ${renderSecondaryImage(service)}

        <div class="service-details-content">
          ${renderSections(sections, lang)}
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
                  'cta_service_title',
                  'Ready to get started?'
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
// MAIN RENDER
// ============================================================

export async function renderServiceDetails(params = {}) {
  const app = document.getElementById('app');

  if (!app) {
    console.error(
      '[ServiceDetails] #app element not found.'
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
      `/${currentLang}/services`
    );

    return;
  }

  // ==========================================================
  // LOAD SERVICE FROM API
  // ==========================================================

  let service = null;

  try {
    service = await getServiceBySlug(slug);
  } catch (error) {
    console.error(
      '[ServiceDetails] API request failed:',
      error
    );
  }

  // Ignore outdated responses.
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
  // SERVICE NOT FOUND
  // ==========================================================

  if (
    !service ||
    typeof service !== 'object' ||
    Array.isArray(service)
  ) {
    
app.innerHTML = `
  ${renderHeader()}

  <main class="mz-service-details" id="mazoryaServiceDetails">
    ${renderServiceNotFound(currentLang)}
  </main>

  ${renderFooter()}
`;

    attachHeaderEvents();
    attachFooterEvents();

    console.warn(
      '[ServiceDetails] Service not available:',
      slug
    );

    return;
  }

  // ==========================================================
  // RENDER SERVICE PAGE
  // ==========================================================

  
app.innerHTML = `
  ${renderHeader()}

  <main class="mz-service-details" id="mazoryaServiceDetails">
    ${renderServiceContent(service, currentLang)}
    ${renderCTASection(currentLang)}
  </main>

  ${renderFooter()}
`;


  // ==========================================================
  // INITIALIZE SHARED COMPONENTS
  // ==========================================================

  attachHeaderEvents();
  attachFooterEvents();

  /*
   * Animations are initialized by:
   *
   * app.js
   *   -> router.afterRender
   *   -> reinitAnimations()
   *   -> initServiceDetailsAnimations()
   *
   * Existing animation selectors are preserved:
   *
   * .service-details-title
   * .service-details-image-main
   * .service-details-description
   * .service-details-image-secondary
   * .service-details-block
   * .cta-section
   *
   * Native links are intentionally preserved.
   */

  console.log(
    '[ServiceDetails] Page rendered:',
    {
      slug,
      language: currentLang,
      service: service.name || service.title
    }
  );
}
