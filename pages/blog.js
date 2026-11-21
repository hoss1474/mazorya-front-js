
/**
 * Mazorya Group - Blog Listing Page
 * File: pages/blog.js
 *
 * Features:
 * - Laravel API integration
 * - Multilingual blog listing
 * - RTL / LTR
 * - 3-column Webflow grid
 * - Safe image and content rendering
 * - Blog details navigation by ID
 * - Localized dates
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

import { getBlogs } from '../core/api.js';

// ============================================================
// CONFIGURATION
// ============================================================

const DEFAULT_IMAGE =
  '/assets/img/default-project.jpg';

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

function t(key, fallback = '') {
  return escapeHtml(tr(key, fallback));
}

/**
 * Convert HTML descriptions into plain text.
 */
function stripHtml(value) {
  if (
    typeof value !== 'string' &&
    typeof value !== 'number'
  ) {
    return '';
  }

  const parsed = new DOMParser().parseFromString(
    String(value),
    'text/html'
  );

  return (parsed.body.textContent || '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Truncate article descriptions.
 */
function truncateText(value, maxLength = 120) {
  const text = stripHtml(value);
  const characters = Array.from(text);

  if (characters.length <= maxLength) {
    return text;
  }

  return (
    characters
      .slice(0, maxLength)
      .join('')
      .trimEnd() + '...'
  );
}

// ============================================================
// BLOG TITLE AND DESCRIPTION
// ============================================================

function getBlogTitle(blog, lang) {
  const value = lang === 'en'
    ? blog?.title_en || blog?.title
    : blog?.title || blog?.title_en;

  return String(
    value || tr('untitled_blog', 'Untitled Article')
  );
}

function getBlogDescription(blog, lang) {
  if (blog?.excerpt) {
    return stripHtml(blog.excerpt);
  }

  const description = lang === 'en'
    ? blog?.description_en || blog?.description
    : blog?.description || blog?.description_en;

  return truncateText(description, 120);
}

// ============================================================
// IMAGE URL
// ============================================================

function resolveImageUrl(value) {
  if (
    typeof value !== 'string' ||
    !value.trim()
  ) {
    return DEFAULT_IMAGE;
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
      return DEFAULT_IMAGE;
    }

    let url;

    if (/^https?:\/\//i.test(path)) {
      url = new URL(path);
    } else if (
      path.startsWith('/assets/') ||
      path.startsWith('assets/')
    ) {
      url = new URL(
        path.startsWith('/')
          ? path
          : `/${path}`,
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
      url.protocol !== 'http:' &&
      url.protocol !== 'https:'
    ) {
      return DEFAULT_IMAGE;
    }

    return escapeHtml(url.href);
  } catch {
    return DEFAULT_IMAGE;
  }
}

function getBlogImage(blog) {
  const images = blog?.images;

  const image =
    (typeof images === 'string'
      ? images
      : null) ||
    images?.image_1 ||
    images?.image ||
    blog?.cover_url ||
    blog?.image_url ||
    blog?.image;

  return resolveImageUrl(image);
}

// ============================================================
// BLOG DETAILS URL
// ============================================================

function getBlogLink(blog, lang) {
  const id = blog?.id;

  if (
    id === undefined ||
    id === null ||
    String(id).trim() === ''
  ) {
    return null;
  }

  return (
    `/${lang}/blog-details/` +
    encodeURIComponent(String(id))
  );
}

// ============================================================
// DATE FORMAT
// ============================================================

function formatBlogDate(blog, lang) {
  const rawDate =
    blog?.created_at ||
    blog?.createdAt ||
    blog?.published_at ||
    blog?.date;

  if (!rawDate) {
    return '';
  }

  const date = new Date(rawDate);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  const localeMap = {
    en: 'en-US',
    fa: 'fa-IR',
    ar: 'ar-SA',
    fr: 'fr-FR',
    de: 'de-DE',
    es: 'es-ES',
    tr: 'tr-TR'
  };

  const locale = localeMap[lang] || 'en-US';

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
// BANNER SECTION
// ============================================================

function renderBannerSection() {
  return `
    <section class="blog-banner">

      <div class="w-layout-blockcontainer container-regular w-container">

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
// SINGLE BLOG CARD
// ============================================================

function renderBlogCard(blog, lang) {
  if (
    !blog ||
    typeof blog !== 'object' ||
    Array.isArray(blog)
  ) {
    return '';
  }

  const title = getBlogTitle(blog, lang);
  const description = getBlogDescription(blog, lang);
  const image = getBlogImage(blog);
  const link = getBlogLink(blog, lang);
  const date = formatBlogDate(blog, lang);

  const safeTitle = escapeHtml(title);
  const safeDesc = escapeHtml(description);
  const safeDate = escapeHtml(date);

  const imageHtml = `
    <img
      src="${image}"
      alt="${safeTitle}"
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
                  href="${link}"
                  class="blog-image-link"
                  aria-label="${safeTitle}"
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
                  ${safeDate}
                </span>
              `
              : ''
          }

          <h3 class="blog-card-title">

            ${
              link
                ? `
                  <a href="${link}">
                    ${safeTitle}
                  </a>
                `
                : safeTitle
            }

          </h3>

          ${
            description
              ? `
                <p class="blog-card-excerpt">
                  ${safeDesc}
                </p>
              `
              : ''
          }

          ${
            link
              ? `
                <a
                  href="${link}"
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
// BLOG CARDS
// ============================================================

function renderBlogCards(blogs, lang) {
  if (
    !Array.isArray(blogs) ||
    blogs.length === 0
  ) {
    return `
      <div class="no-blogs">

        <p>
          ${t(
            'no_blogs',
            'No blog posts found.'
          )}
        </p>

      </div>
    `;
  }

  return blogs
    .map(blog => renderBlogCard(blog, lang))
    .join('');
}

// ============================================================
// BLOG GRID SECTION
// ============================================================

function renderBlogGridSection(blogs, lang) {
  const isRTL = lang === 'fa' || lang === 'ar';

  return `
    <section class="blog-list-section">

      <div class="w-layout-blockcontainer container-regular w-container">

        <div class="blogs-grid ${isRTL ? 'rtl-blog' : ''}">

          ${renderBlogCards(blogs, lang)}

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
                  'cta_blog_title',
                  'Want to stay updated?'
                )}
              </h2>

              <div class="cta-button-wrap">

                <a
                  href="/${currentLang}/contact"
                  class="cta-button"
                  data-route="contact"
                >
                  ${t('subscribe', 'Subscribe')}
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
// MAIN BLOG RENDER
// ============================================================

export async function renderBlog() {
  const app = document.getElementById('app');

  if (!app) {
    console.error(
      '[Blog] #app element not found.'
    );
    return;
  }

  const currentLang = i18n.getCurrentLanguage();
  const initialPath = window.location.pathname;
  const requestId = ++renderRequestId;

  // ==========================================================
  // FETCH BLOGS
  // ==========================================================

  let blogs = [];

  try {
    const response = await getBlogs();

    if (Array.isArray(response)) {
      blogs = response.filter(
        blog =>
          blog &&
          typeof blog === 'object' &&
          !Array.isArray(blog)
      );
    } else {
      console.warn(
        '[Blog] API returned an invalid response.'
      );
    }
  } catch (error) {
    console.error(
      '[Blog] Failed to load articles:',
      error
    );
  }

  // ==========================================================
  // PREVENT OUTDATED RENDER
  // ==========================================================

  if (
    requestId !== renderRequestId ||
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

  <main class="mz-blog" id="mazoryaBlog">
    ${renderBannerSection()}
    ${renderBlogGridSection(blogs, currentLang)}
    ${renderCTASection(currentLang)}
  </main>

  ${renderFooter()}
`;


  // ==========================================================
  // INITIALIZE COMPONENTS
  // ==========================================================

  attachHeaderEvents();
  attachFooterEvents();

  /*
   * Animation initialization is handled by:
   *
   * app.js
   *   -> router.afterRender
   *   -> reinitAnimations()
   *
   * Native navigation is preserved.
   *
   * Existing Webflow CSS classes are unchanged.
   */

  console.log(
    '[Blog] Page rendered:',
    {
      language: currentLang,
      articles: blogs.length
    }
  );
}
