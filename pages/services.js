
/**
 * Mazorya Group - Services Page
 * File: pages/services.js
 *
 * Features:
 * - Laravel API integration
 * - Multilingual content
 * - RTL / LTR compatibility
 * - Safe service cards
 * - Dynamic service links
 * - Error handling
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

import { getServices } from '../core/api.js';

// ============================================================
// HELPERS
// ============================================================

/**
 * Escape text before inserting into HTML.
 */
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
 * Translated and escaped text.
 */
function t(key, fallback = '') {
  return escapeHtml(tr(key, fallback));
}

/**
 * Convert HTML description to plain text.
 */
function stripHtml(value) {
  if (value == null) {
    return '';
  }

  const text = String(value);

  // Parse HTML without inserting it into the
  // live document.
  const parsed = new DOMParser().parseFromString(
    text,
    'text/html'
  );

  return (
    parsed.body.textContent || ''
  ).replace(/\s+/g, ' ').trim();
}

/**
 * Short description.
 */
function truncateText(text, maxLength = 120) {
  const characters = Array.from(
    stripHtml(text)
  );

  if (characters.length <= maxLength) {
    return characters.join('');
  }

  return (
    characters.slice(0, maxLength).join('').trimEnd() +
    '...'
  );
}

/**
 * Validate image URL.
 */
function safeImageUrl(value) {
  const fallback =
    '/assets/img/service-icon-01.svg';

  if (
    typeof value !== 'string' ||
    !value.trim()
  ) {
    return fallback;
  }

  try {
    const url = new URL(
      value.trim(),
      window.location.origin
    );

    if (
      !['http:', 'https:'].includes(url.protocol)
    ) {
      return fallback;
    }

    return escapeHtml(url.href);
  } catch {
    return fallback;
  }
}

/**
 * Build service details URL.
 */
function getServiceLink(service, lang) {
  const slug = service?.slug;

  if (
    slug === undefined ||
    slug === null ||
    String(slug).trim() === ''
  ) {
    return null;
  }

  return (
    `/${lang}/service/` +
    encodeURIComponent(String(slug))
  );
}

// ============================================================
// BANNER SECTION
// ============================================================

function renderBannerSection() {
  return `
    <section class="services-banner">

      <div class="w-layout-blockcontainer container-regular w-container">

        <div class="align-center">

          <div class="banner-title-wrap">

            <h1 class="banner-title">
              ${t(
                'services_title',
                'Mastering the Digital Spectrum'
              )}
            </h1>

            <p>
              ${t(
                'services_subtitle',
                'From concept to conversion, we provide a holistic suite of digital services designed to scale your business and elevate your brand presence.'
              )}
            </p>

          </div>

        </div>

      </div>

    </section>
  `;
}

// ============================================================
// SERVICE CARD
// ============================================================

function renderServiceCard(service, lang) {
  if (
    !service ||
    typeof service !== 'object'
  ) {
    return '';
  }

  // Read the localized fields returned by the API.
  const title =
    service.name ||
    service.title ||
    tr('service_untitled', 'Untitled Service');

  const description =
    service.description ||
    service.short_description ||
    '';

  const shortDescription = truncateText(
    description,
    120
  );

  const icon = safeImageUrl(
    service.images?.icon ||
    service.icon_url ||
    service.icon ||
    service.image
  );

  const link = getServiceLink(service, lang);

  const safeTitle = escapeHtml(title);
  const safeDesc = escapeHtml(shortDescription);
  const learnMore = t('learn_more', 'Learn More');

  const titleHtml = link
    ? `
      <a href="${link}">
        ${safeTitle}
      </a>
    `
    : safeTitle;

  const moreHtml = link
    ? `
      <a
        href="${link}"
        class="service-card-link"
      >
        ${learnMore}
        <span aria-hidden="true">→</span>
      </a>
    `
    : '';

  return `
    <div class="service-card-item">

      <div
        class="service-card-inner"
        ${link ? `data-service-href="${link}"` : ''}
      >

        <div class="service-card-icon">

          <img
            src="${icon}"
            alt="${safeTitle}"
            loading="lazy"
            decoding="async"
          />

        </div>

        <h3 class="service-card-title">
          ${titleHtml}
        </h3>

        <p class="service-card-description">
          ${safeDesc}
        </p>

        ${moreHtml}

      </div>

    </div>
  `;
}

// ============================================================
// SERVICE CARDS
// ============================================================

function renderServiceCards(services, lang) {
  if (
    !Array.isArray(services) ||
    services.length === 0
  ) {
    return `
      <div class="no-services">

        <p>
          ${t(
            'no_services',
            'No services found.'
          )}
        </p>

      </div>
    `;
  }

  return services.map(service => {
    return renderServiceCard(service, lang);
  }).join('');
}

// ============================================================
// SERVICES GRID SECTION
// ============================================================

function renderServicesGrid(services, lang) {
  return `
    <section class="services-section">

      <div class="w-layout-blockcontainer container-regular w-container">

        <div class="services-grid">

          ${renderServiceCards(services, lang)}

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
                  'cta_title',
                  'Ready to elevate your brand?'
                )}
              </h2>

              <div class="cta-button-wrap">

                <a
                  href="/${currentLang}/contact"
                  class="cta-button"
                  data-route="contact"
                >
                  ${t('contact_us', 'Contact Us')}
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
// SERVICE CARD INTERACTIONS
// ============================================================

function attachServiceEvents(app) {
  const serviceCards = app.querySelectorAll(
    '.service-card-inner[data-service-href]'
  );

  serviceCards.forEach(card => {
    const href = card.dataset.serviceHref;

    if (!href) return;

    // Preserve the original behavior:
    // clicking anywhere on the card navigates
    // to the corresponding service page.
    card.addEventListener('click', event => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      // Let native links handle their own navigation.
      if (
        event.target.closest(
          'a, button, input, select, textarea'
        )
      ) {
        return;
      }

      window.location.assign(href);
    });
  });
}

// ============================================================
// MAIN SERVICES RENDER
// ============================================================

export async function renderServices() {
  const app = document.getElementById('app');

  if (!app) {
    console.error(
      '[Services] #app element not found.'
    );
    return;
  }

  const currentLang = i18n.getCurrentLanguage();

  const initialPath = window.location.pathname;

  // ==========================================================
  // FETCH SERVICES
  // ==========================================================

  let services = [];

  try {
    const result = await getServices();

    if (Array.isArray(result)) {
      services = result;
    } else {
      console.warn(
        '[Services] Invalid API response.'
      );
    }
  } catch (error) {
    console.error(
      '[Services] Failed to load services:',
      error
    );
  }

  // Avoid rendering outdated language or route data.
  if (
    window.location.pathname !== initialPath ||
    i18n.getCurrentLanguage() !== currentLang
  ) {
    return;
  }

  // ==========================================================
  // RENDER PAGE
  // ==========================================================

  
app.innerHTML = `
  ${renderHeader()}

  <main class="mz-services" id="mazoryaServices">
    ${renderBannerSection()}
    ${renderServicesGrid(services, currentLang)}
    ${renderCTASection(currentLang)}
  </main>

  ${renderFooter()}
`;


  // ==========================================================
  // INITIALIZE COMPONENTS
  // ==========================================================

  attachHeaderEvents();
  attachFooterEvents();

  attachServiceEvents(app);

  /*
   * Animations are initialized globally by:
   *
   * app.js
   * -> router.afterRender
   * -> reinitAnimations()
   *
   * Do not create duplicate animation observers.
   *
   * Native links remain enabled.
   */

  console.log(
    `[Services] Rendered ${services.length} services.`,
    currentLang
  );
}
