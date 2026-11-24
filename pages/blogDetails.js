/**

 * Mazorya Group - Blog Details Page

 * File: pages/blogDetails.js

 *

 * - Laravel API integration

 * - Blog details by ID

 * - Seven-language support

 * - RTL / LTR compatibility

 * - Safe article rendering

 * - Localized publication dates

 * - Safe Laravel Storage image URLs

 * - SPA navigation compatibility

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

import { getBlogById, resolveMediaUrl } from '../core/api.js';

// ============================================================

// CONFIGURATION

// ============================================================

let renderRequestId = 0;

// ============================================================

// HTML HELPERS

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

    value === undefined ||

    value === null ||

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

function getText(value) {

  if (

    typeof value === 'string' ||

    typeof value === 'number'

  ) {

    return String(value);

  }

  return '';

}

// ============================================================

// ARTICLE TEXT

// ============================================================

/**

 * Convert possible HTML content into plain text,

 * retaining paragraph breaks.

 *

 * We intentionally do not inject raw API HTML.

 */

function toPlainText(value) {

  const raw = getText(value);

  if (!raw.trim()) {

    return '';

  }

  const withBreaks = raw

    .replace(/<br\s*\/?>/gi, '\n')

    .replace(

      /<\/?(?:p|div|h[1-6]|li|blockquote)[^>]*>/gi,

      '\n\n'

    );

  const documentFragment = new DOMParser()

    .parseFromString(withBreaks, 'text/html');

  // Remove script/style content rather than

  // exposing its text to readers.

  documentFragment.querySelectorAll(

    'script, style, template'

  ).forEach(element => element.remove());

  return (documentFragment.body.textContent || '')

    .replace(/\r\n?/g, '\n')

    .replace(/[ \t]+\n/g, '\n')

    .replace(/\n{3,}/g, '\n\n')

    .trim();

}

/**

 * Render safe paragraphs while preserving

 * single line breaks.

 */

function renderTextParagraphs(value, className = '') {

  const text = toPlainText(value);

  if (!text) return '';

  const paragraphs = text

    .split(/\n{2,}/)

    .filter(Boolean);

  return paragraphs.map(paragraph => `

    <p

      ${className ? `class="${className}"` : ''}

      style="white-space: pre-line;"

    >${escapeHtml(paragraph)}</p>

  `).join('');

}

// ============================================================

// MULTILINGUAL FIELDS

// ============================================================

function getLocalizedField(item, field, lang) {

  if (!item || typeof item !== 'object') {

    return '';

  }

  const localizedKey = `${field}_${lang}`;

  const candidates = [

    item[localizedKey],

    item.translations?.[lang]?.[field],

    item[field],

    item[`${field}_en`]

  ];

  for (const value of candidates) {

    const text = getText(value);

    if (text.trim()) {

      return text;

    }

  }

  return '';

}

function getBlogTitle(blog, lang) {

  return (

    getLocalizedField(blog, 'title', lang) ||

    tr('untitled_blog', 'Untitled Article')

  );

}

function getBlogDescription(blog, lang) {

  return (

    getLocalizedField(blog, 'description', lang) ||

    getLocalizedField(blog, 'excerpt', lang)

  );

}

// ============================================================

// IMAGE URL

// ============================================================

function resolveImageUrl(value) {
  const url = resolveMediaUrl(value);
  // The URL goes into an HTML src attribute.
  return url ? escapeHtml(url) : null;
}

function getBlogImage(blog, key) {

  const images = blog?.images;

  if (key === 'image_1') {

    return resolveImageUrl(

      images?.image_1 ||

      blog?.image_1 ||

      blog?.cover_url ||

      blog?.image_url

    );

  }

  if (key === 'image_2') {

    return resolveImageUrl(

      images?.image_2 ||

      blog?.image_2

    );

  }

  return null;

}

// ============================================================

// DATE

// ============================================================

function formatBlogDate(blog, lang) {

  const rawDate =

    blog?.published_at ||

    blog?.created_at ||

    blog?.createdAt ||

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

  try {

    return new Intl.DateTimeFormat(

      localeMap[lang] || 'en-US',

      {

        year: 'numeric',

        month: 'long',

        day: 'numeric'

      }

    ).format(date);

  } catch {

    return date.toLocaleDateString('en-US');

  }

}

// ============================================================

// BLOG NOT FOUND

// ============================================================

function renderBlogNotFound(lang) {

  return `

    <section class="blog-not-found-section">

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

            'blog_not_found',

            'Blog Post Not Found'

          )}

        </h1>

        <p style="margin-top: 20px;">

          ${t(

            'blog_not_found_desc',

            'The article could not be found or loaded.'

          )}

        </p>

        <a

          href="/${lang}/blog"

          class="primary-button"

          style="

            display: inline-block;

            margin-top: 30px;

          "

        >

          ${t(

            'back_to_blog',

            'Back to Blog'

          )}

        </a>

      </div>

    </section>

  `;

}

// ============================================================

// BLOG HEADER

// ============================================================

function renderBlogHeader(blog, lang) {

  const title = getBlogTitle(blog, lang);

  const description = getBlogDescription(blog, lang);

  const date = formatBlogDate(blog, lang);

  return `

    <div class="blog-details-header">

      <h1 class="blog-details-title">

        ${escapeHtml(title)}

      </h1>

      ${

        date

          ? `

            <div class="blog-details-date">

              ${escapeHtml(date)}

            </div>

          `

          : ''

      }

      ${

        description

          ? `

            <div class="blog-details-subtitle">

              ${renderTextParagraphs(description)}

            </div>

          `

          : ''

      }

    </div>

  `;

}

// ============================================================

// MAIN IMAGE

// ============================================================

function renderMainImage(blog, lang) {

  const imageUrl = getBlogImage(

    blog,

    'image_1'

  );

  if (!imageUrl) {

    return '';

  }

  const title = getBlogTitle(blog, lang);

  return `

    <div class="blog-details-image-main">

      <img

        src="${imageUrl}"

        alt="${escapeHtml(title)}"

        class="blog-details-image"

        loading="eager"

        decoding="async"

      />

    </div>

  `;

}

// ============================================================

// SECONDARY IMAGE

// ============================================================

function renderSecondaryImage(blog, lang) {

  const imageUrl = getBlogImage(

    blog,

    'image_2'

  );

  if (!imageUrl) {

    return '';

  }

  const title = getBlogTitle(blog, lang);

  return `

    <div class="blog-details-image-secondary">

      <img

        src="${imageUrl}"

        alt="${escapeHtml(title)}"

        class="blog-details-image"

        loading="lazy"

        decoding="async"

      />

    </div>

  `;

}

// ============================================================

// CONTENT SECTIONS

// ============================================================

function renderBlogSections(sections, lang) {

  if (

    !Array.isArray(sections) ||

    !sections.length

  ) {

    return '';

  }

  return sections

    .filter(section =>

      section &&

      typeof section === 'object' &&

      !Array.isArray(section)

    )

    .map(section => {

      const title = getLocalizedField(

        section,

        'title',

        lang

      ) || getLocalizedField(

        section,

        'name',

        lang

      );

      const description = getLocalizedField(

        section,

        'description',

        lang

      ) || getLocalizedField(

        section,

        'content',

        lang

      );

      if (!title && !description) {

        return '';

      }

      return `

        <div class="blog-details-block">

          ${

            title

              ? `

                <h2 class="blog-details-block-title">

                  ${escapeHtml(title)}

                </h2>

              `

              : ''

          }

          ${

            description

              ? `

                <div class="blog-details-block-content">

                  ${renderTextParagraphs(description)}

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

// BLOG MAIN CONTENT

// ============================================================

function renderBlogContent(blog, lang) {

  const sections = Array.isArray(blog.sections)

    ? blog.sections

    : [];

  const rtlClass =

    lang === 'fa' || lang === 'ar'

      ? 'rtl-blog'

      : '';

  return `

    <section class="blog-details-page ${rtlClass}">

      <div class="w-layout-blockcontainer container-regular w-container">

        ${renderBlogHeader(blog, lang)}

        ${renderMainImage(blog, lang)}

        <div class="blog-details-content">

          ${renderBlogSections(sections, lang)}

        </div>

        ${renderSecondaryImage(blog, lang)}

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

                  'cta_blog_details',

                  'Enjoyed this article?'

                )}

              </h2>

              <div class="cta-button-wrap">

                <a

                  href="/${lang}/contact"

                  class="cta-button"

                  data-route="contact"

                >

                  ${t(

                    'get_in_touch',

                    'Get in Touch'

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

// PAGE RENDER HELPER

// ============================================================

function renderPage(content) {

  const app = document.getElementById('app');

  if (!app) return;

  app.innerHTML = `

    ${renderHeader()}

    <main

      class="mz-blog-details"

      id="mazoryaBlogDetails"

    >

      ${content}

    </main>

    ${renderFooter()}

  `;

  attachHeaderEvents();

  attachFooterEvents();

}

// ============================================================

// VALIDATE ACTIVE RENDER

// ============================================================

function isCurrentRender(requestId, path, search, lang) {

  return (

    requestId === renderRequestId &&

    window.location.pathname === path &&

    window.location.search === search &&

    i18n.getCurrentLanguage() === lang

  );

}

// ============================================================

// MAIN RENDER

// ============================================================

export async function renderBlogDetails(params = {}) {

  const app = document.getElementById('app');

  if (!app) {

    console.error(

      '[BlogDetails] #app element not found.'

    );

    return;

  }

  const currentLang = i18n.getCurrentLanguage();

  const initialPath = window.location.pathname;

  const initialSearch = window.location.search;

  const requestId = ++renderRequestId;

  // ==========================================================

  // GET ARTICLE ID

  // ==========================================================

  let blogId = params?.id;

  // Legacy URLs: /blog-details?id=12

  if (

    blogId === undefined ||

    blogId === null ||

    String(blogId).trim() === ''

  ) {

    const searchParams = new URLSearchParams(

      window.location.search

    );

    blogId = searchParams.get('id');

  }

  if (

    blogId === undefined ||

    blogId === null ||

    String(blogId).trim() === ''

  ) {

    window.location.assign(

      `/${currentLang}/blog`

    );

    return;

  }

  blogId = String(blogId).trim();

  // Keep ID as a single URL segment.

  // The actual request is made by core/api.js.

  if (

    blogId.includes('/') ||

    blogId.includes('\\')

  ) {

    renderPage(

      renderBlogNotFound(currentLang)

    );

    return;

  }

  // ==========================================================

  // FETCH ARTICLE

  // ==========================================================

  let blog = null;

  try {

    blog = await getBlogById(blogId);

  } catch (error) {

    console.error(

      '[BlogDetails] API request failed:',

      error

    );

  }

  // ==========================================================

  // IGNORE OUTDATED REQUEST

  // ==========================================================

  if (

    !isCurrentRender(

      requestId,

      initialPath,

      initialSearch,

      currentLang

    )

  ) {

    return;

  }

  // ==========================================================

  // ARTICLE NOT FOUND

  // ==========================================================

  if (

    !blog ||

    typeof blog !== 'object' ||

    Array.isArray(blog)

  ) {

    renderPage(

      renderBlogNotFound(currentLang)

    );

    console.warn(

      '[BlogDetails] Article unavailable:',

      blogId

    );

    return;

  }

  // ==========================================================

  // RENDER ARTICLE

  // ==========================================================

  renderPage(`

    ${renderBlogContent(blog, currentLang)}

    ${renderCTASection(currentLang)}

  `);

  /*

   * Animations are managed by app.js

   * after the route finishes rendering.

   *

   * No duplicate IntersectionObservers

   * or navigation listeners are added here.

   */

  console.log(

    '[BlogDetails] Article rendered:',

    {

      id: blogId,

      language: currentLang,

      title: getBlogTitle(blog, currentLang)

    }

  );

}
