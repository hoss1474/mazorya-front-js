
/**
 * Mazorya Group — Blog Listing
 * File: pages/blog.js
 * Slug-based links with legacy ID support
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
  getBlogs,
  resolveMediaUrl
} from '../core/api.js';

const DEFAULT_IMAGE = '/assets/img/default-project.jpg';

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
  const value = i18n.t(key);

  return value == null ||
    value === '' ||
    value === key
      ? fallback || key
      : String(value);
}

function t(key, fallback = '') {
  return escapeHtml(tr(key, fallback));
}

function stringValue(value) {
  return typeof value === 'string' ||
    typeof value === 'number'
      ? String(value).trim()
      : '';
}

function stripHtml(value) {
  const raw = stringValue(value);

  if (!raw) return '';

  const doc = new DOMParser().parseFromString(
    raw,
    'text/html'
  );

  doc.querySelectorAll(
    'script, style, template, iframe, object, svg'
  ).forEach(node => node.remove());

  return (doc.body.textContent || '')
    .replace(/\s+/g, ' ')
    .trim();
}

function truncateText(value, maxLength = 120) {
  const characters = Array.from(
    stripHtml(value)
  );

  if (characters.length <= maxLength) {
    return characters.join('');
  }

  return (
    characters
      .slice(0, maxLength)
      .join('')
      .trimEnd() + '…'
  );
}

// ============================================================
// MULTILINGUAL FIELDS
// ============================================================

function localized(blog, field, lang) {
  if (!blog || typeof blog !== 'object') {
    return '';
  }

  const translations = blog.translations;

  const fromArray = Array.isArray(translations)
    ? translations.find(
        row =>
          row?.lang === lang ||
          row?.locale === lang
      )?.[field]
    : undefined;

  const candidates = [
    blog[`${field}_${lang}`],

    Array.isArray(translations)
      ? undefined
      : translations?.[lang]?.[field],

    fromArray,
    blog[field],
    blog[`${field}_en`]
  ];

  for (const candidate of candidates) {
    const value = stringValue(candidate);

    if (value) return value;
  }

  return '';
}

function getBlogTitle(blog, lang) {
  return (
    localized(blog, 'title', lang) ||
    tr('untitled_blog', 'Untitled Article')
  );
}

function getBlogDescription(blog, lang) {
  const value =
    localized(blog, 'excerpt', lang) ||
    localized(blog, 'description', lang);

  return truncateText(value, 120);
}

// ============================================================
// IMAGES
// ============================================================

function resolveImageUrl(value) {
  const raw =
    typeof value === 'string'
      ? value
      : value && typeof value === 'object'
        ? (
            value.url ??
            value.path ??
            value.src ??
            value.image
          )
        : '';

  if (!stringValue(raw)) {
    return DEFAULT_IMAGE;
  }

  try {
    if (/^\/?assets\//i.test(raw)) {
      return new URL(
        `/${raw.replace(/^\/+/, '')}`,
        window.location.origin
      ).href;
    }

    const resolved = resolveMediaUrl(raw);

    if (!resolved) return DEFAULT_IMAGE;

    const url = new URL(
      resolved,
      window.location.origin
    );

    return ['http:', 'https:'].includes(url.protocol)
      ? url.href
      : DEFAULT_IMAGE;
  } catch {
    return DEFAULT_IMAGE;
  }
}

function getBlogImage(blog) {
  let images = blog?.images;

  if (typeof images === 'string') {
    const raw = images.trim();

    if (
      raw.startsWith('{') ||
      raw.startsWith('[')
    ) {
      try {
        images = JSON.parse(raw);
      } catch {
        images = raw;
      }
    }
  }

  const firstImage = Array.isArray(images)
    ? images[0]
    : null;

  const candidate =
    firstImage ||
    (
      typeof images === 'string'
        ? images
        : null
    ) ||
    images?.image_1 ||
    images?.image ||
    blog?.image_1 ||
    blog?.cover_url ||
    blog?.image_url ||
    blog?.image;

  return resolveImageUrl(candidate);
}

// ============================================================
// SLUG-BASED BLOG LINKS
// ============================================================


function getBlogLink(blog, lang) {
  const identifier = String(
    blog?.slug || blog?.id || ''
  ).trim();

  if (!identifier) {
    return null;
  }

  return (
    `/${encodeURIComponent(lang)}/blog-details/` +
    encodeURIComponent(identifier)
  );
}


// ============================================================
// DATE
// ============================================================

function formatBlogDate(blog, lang) {
  const raw = stringValue(
    blog?.published_at ||
    blog?.created_at ||
    blog?.createdAt ||
    blog?.date
  );

  if (!raw) return '';

  const normalized =
    /^\d{4}-\d{2}-\d{2}$/.test(raw)
      ? `${raw}T12:00:00`
      : raw;

  const date = new Date(normalized);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  const locale = {
    en: 'en-US',
    fa: 'fa-IR',
    ar: 'ar-SA',
    fr: 'fr-FR',
    de: 'de-DE',
    es: 'es-ES',
    tr: 'tr-TR'
  }[lang] || 'en-US';

  try {
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  } catch {
    return date.toLocaleDateString('en-US');
  }
}

// ============================================================
// BANNER
// ============================================================

function renderBannerSection() {
  return `
    <section class="blog-banner">

      <div
        class="w-layout-blockcontainer container-regular w-container"
      >

        <div class="align-center">

          <div class="banner-title-wrap small">

            <h1 class="blog-banner-title">
              ${t('blog_title', 'Our Blog')}
            </h1>

            <p class="blog-banner-subtitle">
              ${t(
                'blog_subtitle',
                'Latest insights and articles from our team'
              )}
            </p>

          </div>

        </div>

      </div>

    </section>
  `;
}

// ============================================================
// BLOG CARD
// ============================================================

function renderBlogCard(blog, lang) {
  if (
    !blog ||
    typeof blog !== 'object' ||
    Array.isArray(blog)
  ) {
    return '';
  }

  const title = escapeHtml(
    getBlogTitle(blog, lang)
  );

  const description = escapeHtml(
    getBlogDescription(blog, lang)
  );

  const image = escapeHtml(
    getBlogImage(blog)
  );

  const link = getBlogLink(blog, lang);

  const date = escapeHtml(
    formatBlogDate(blog, lang)
  );

  const imageHtml = `
    <img
      src="${image}"
      alt="${title}"
      loading="lazy"
      decoding="async"
    />
  `;

  return `
    <div class="blog-card">

      <div class="blog-card-inner">

        <div class="blog-card-image">

          ${
            link
              ? `
                <a
                  href="${escapeHtml(link)}"
                  class="blog-image-link"
                  aria-label="${title}"
                >
                  ${imageHtml}
                </a>
              `
              : `
                <div class="blog-image-link">
                  ${imageHtml}
                </div>
              `
          }

        </div>

        <div class="blog-card-content">

          ${
            date
              ? `
                <span class="blog-date">
                  ${date}
                </span>
              `
              : ''
          }

          <h3 class="blog-card-title">

            ${
              link
                ? `
                  <a href="${escapeHtml(link)}">
                    ${title}
                  </a>
                `
                : title
            }

          </h3>

          ${
            description
              ? `
                <p class="blog-card-excerpt">
                  ${description}
                </p>
              `
              : ''
          }

          ${
            link
              ? `
                <a
                  href="${escapeHtml(link)}"
                  class="blog-read-more"
                >
                  ${t('read_more', 'Read More')}

                  <span aria-hidden="true">→</span>
                </a>
              `
              : ''
          }

        </div>

      </div>

    </div>
  `;
}

// ============================================================
// BLOG GRID
// ============================================================

function renderBlogCards(blogs, lang) {
  if (
    !Array.isArray(blogs) ||
    !blogs.length
  ) {
    return `
      <div class="no-blogs">
        <p>
          ${t('no_blogs', 'No blog posts found.')}
        </p>
      </div>
    `;
  }

  return blogs
    .map(blog => renderBlogCard(blog, lang))
    .join('');
}

function renderBlogGridSection(blogs, lang) {
  const isRTL =
    lang === 'fa' ||
    lang === 'ar';

  return `
    <section class="blog-list-section">

      <div
        class="w-layout-blockcontainer container-regular w-container"
      >

        <div class="blogs-grid ${isRTL ? 'rtl-blog' : ''}">

          ${renderBlogCards(blogs, lang)}

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

      <div
        class="w-layout-blockcontainer container-regular w-container"
      >

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
                  'cta_blog_title',
                  'Want to stay updated?'
                )}
              </h2>

              <div class="cta-button-wrap">

                <a
                  href="/${encodeURIComponent(lang)}/contact"
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
// RESPONSE NORMALIZATION
// ============================================================

function extractBlogs(response) {
  if (response?.status === false) {
    return [];
  }

  const items = Array.isArray(response)
    ? response
    : Array.isArray(response?.data)
      ? response.data
      : Array.isArray(response?.data?.data)
        ? response.data.data
        : [];

  return items.filter(
    item =>
      item &&
      typeof item === 'object' &&
      !Array.isArray(item)
  );
}

function attachImageFallbacks(app) {
  app
    .querySelectorAll('.blog-card-image img')
    .forEach(image => {

      image.addEventListener(
        'error',
        () => {
          if (
            image.getAttribute('src') !==
            DEFAULT_IMAGE
          ) {
            image.src = DEFAULT_IMAGE;
          }
        },
        { once: true }
      );

    });
}

// ============================================================
// MAIN RENDER
// ============================================================

export async function renderBlog() {
  const app = document.getElementById('app');

  if (!app) {
    console.error(
      '[Blog] #app element not found.'
    );
    return;
  }

  const lang = i18n.getCurrentLanguage();

  const path = window.location.pathname;

  const currentRequest = ++renderRequestId;

  let blogs = [];

  try {
    blogs = extractBlogs(
      await getBlogs()
    );
  } catch (error) {
    console.error(
      '[Blog] Failed to load articles:',
      error
    );
  }

  if (
    currentRequest !== renderRequestId ||
    window.location.pathname !== path ||
    i18n.getCurrentLanguage() !== lang
  ) {
    return;
  }

  app.innerHTML = `
    ${renderHeader()}

    <main
      class="mz-blog"
      id="mazoryaBlog"
      dir="${['fa', 'ar'].includes(lang) ? 'rtl' : 'ltr'}"
    >

      ${renderBannerSection()}

      ${renderBlogGridSection(blogs, lang)}

      ${renderCTASection(lang)}

    </main>

    ${renderFooter()}
  `;

  attachHeaderEvents();
  attachFooterEvents();
  attachImageFallbacks(app);

  // Animations remain managed by app.js.
}
