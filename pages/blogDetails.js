
/**
 * Mazorya Group — Blog Details
 * File: pages/blogDetails.js
 * Slug + legacy ID support
 * Seven languages / Light Editorial UI
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
  getBlogBySlug,
  resolveMediaUrl
} from '../core/api.js';

import '../assets/css/blogDetails.css';

let renderRequestId = 0;

// ============================================================
// UI TRANSLATIONS
// ============================================================

const UI = {
  en: {
    back: 'Back to Blog',
    journal: 'INSIGHTS / MAZORYA JOURNAL',
    article: 'Article',
    read: 'min read',
    contents: 'Article Overview',
    takeaways: 'Key Takeaways',
    contactTitle: 'Have a project in mind?',
    contactText: "Let's build a digital experience that makes an impact.",
    contact: 'Contact Us',
    notFound: 'Article Not Found',
    notFoundDesc: 'This article is unavailable or could not be loaded.'
  },

  fa: {
    back: 'بازگشت به بلاگ',
    journal: 'مجله مزوریا / مطالب',
    article: 'مقاله',
    read: 'دقیقه مطالعه',
    contents: 'فهرست مقاله',
    takeaways: 'نکات کلیدی',
    contactTitle: 'پروژه‌ای در ذهن دارید؟',
    contactText: 'بیایید با هم تجربه‌ای دیجیتال و ماندگار بسازیم.',
    contact: 'تماس با ما',
    notFound: 'مقاله پیدا نشد',
    notFoundDesc: 'این مقاله در دسترس نیست یا بارگذاری نشد.'
  },

  ar: {
    back: 'العودة إلى المدونة',
    journal: 'رؤى / مجلة مازوریا',
    article: 'مقال',
    read: 'دقائق للقراءة',
    contents: 'محتويات المقال',
    takeaways: 'أهم النقاط',
    contactTitle: 'هل لديك مشروع؟',
    contactText: 'لنصنع تجربة رقمية مؤثرة معًا.',
    contact: 'اتصل بنا',
    notFound: 'المقال غير موجود',
    notFoundDesc: 'هذا المقال غير متاح.'
  },

  fr: {
    back: 'Retour au blog',
    journal: 'INSIGHTS / JOURNAL MAZORYA',
    article: 'Article',
    read: 'min de lecture',
    contents: 'Dans cet article',
    takeaways: 'À retenir',
    contactTitle: 'Un projet en tête ?',
    contactText: 'Créons ensemble une expérience numérique remarquable.',
    contact: 'Contactez-nous',
    notFound: 'Article introuvable',
    notFoundDesc: "Cet article n'est pas disponible."
  },

  de: {
    back: 'Zurück zum Blog',
    journal: 'INSIGHTS / MAZORYA JOURNAL',
    article: 'Artikel',
    read: 'Min. Lesezeit',
    contents: 'Artikelübersicht',
    takeaways: 'Wichtige Erkenntnisse',
    contactTitle: 'Ein Projekt im Kopf?',
    contactText: 'Gemeinsam schaffen wir digitale Erlebnisse mit Wirkung.',
    contact: 'Kontakt',
    notFound: 'Artikel nicht gefunden',
    notFoundDesc: 'Dieser Artikel ist nicht verfügbar.'
  },

  es: {
    back: 'Volver al blog',
    journal: 'IDEAS / REVISTA MAZORYA',
    article: 'Artículo',
    read: 'min de lectura',
    contents: 'Contenido del artículo',
    takeaways: 'Conclusiones clave',
    contactTitle: '¿Tienes un proyecto?',
    contactText: 'Creemos juntos una experiencia digital memorable.',
    contact: 'Contáctanos',
    notFound: 'Artículo no encontrado',
    notFoundDesc: 'Este artículo no está disponible.'
  },

  tr: {
    back: 'Bloga dön',
    journal: 'İÇGÖRÜLER / MAZORYA DERGİ',
    article: 'Makale',
    read: 'dk okuma',
    contents: 'Makale İçeriği',
    takeaways: 'Önemli Noktalar',
    contactTitle: 'Aklınızda bir proje mi var?',
    contactText: 'Birlikte etkileyici bir dijital deneyim oluşturalım.',
    contact: 'İletişim',
    notFound: 'Makale bulunamadı',
    notFoundDesc: 'Bu makale şu anda mevcut değil.'
  }
};

// ============================================================
// HELPERS
// ============================================================

function plain(value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number'
  )
    ? String(value)
    : '';
}

function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function toPlainText(value) {
  const raw = plain(value).trim();

  if (!raw) return '';

  const spaced = raw
    .replace(/<br\s*\/?\s*>/gi, '\n')
    .replace(
      /<\/?(?:p|div|h[1-6]|li|blockquote|ul|ol)[^>]*>/gi,
      '\n\n'
    );

  const parsed = new DOMParser().parseFromString(
    spaced,
    'text/html'
  );

  parsed.querySelectorAll(
    'script,style,template,iframe,object,svg'
  ).forEach(node => node.remove());

  return (parsed.body.textContent || '')
    .replace(/\r\n?/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function renderParagraphs(value, cssClass = '') {
  const valueText = toPlainText(value);

  if (!valueText) return '';

  return valueText
    .split(/\n{2,}/)
    .filter(Boolean)
    .map(part => `
      <p${cssClass ? ` class="${cssClass}"` : ''}>
        ${esc(part)}
      </p>
    `)
    .join('');
}

// ============================================================
// LOCALIZED FIELDS
// ============================================================

function localized(item, field, lang) {
  if (
    !item ||
    typeof item !== 'object'
  ) {
    return '';
  }

  const trans = item.translations;

  const fromArray = Array.isArray(trans)
    ? trans.find(
        row =>
          row?.lang === lang ||
          row?.locale === lang
      )?.[field]
    : undefined;

  const values = [
    item[`${field}_${lang}`],
    trans?.[lang]?.[field],
    fromArray,
    item[field],
    item[`${field}_en`]
  ];

  for (const value of values) {
    if (plain(value).trim()) {
      return plain(value);
    }
  }

  return '';
}

function titleOf(blog, lang, ui) {
  return (
    localized(blog, 'title', lang) ||
    ui.article
  );
}

function sectionsOf(blog, lang) {
  if (!Array.isArray(blog?.sections)) {
    return [];
  }

  return blog.sections
    .filter(
      row =>
        row &&
        typeof row === 'object' &&
        !Array.isArray(row)
    )
    .map(row => ({
      title: toPlainText(
        localized(row, 'title', lang) ||
        localized(row, 'name', lang)
      ),

      body:
        localized(row, 'description', lang) ||
        localized(row, 'content', lang),

      quote: toPlainText(
        localized(row, 'quote', lang)
      )
    }))
    .filter(row =>
      row.title ||
      toPlainText(row.body) ||
      row.quote
    );
}

function takeawaysOf(blog, lang) {
  let source =
    blog?.takeaways ??
    blog?.key_takeaways;

  if (typeof source === 'string') {
    try {
      source = JSON.parse(source);
    } catch {
      return [];
    }
  }

  if (!Array.isArray(source)) {
    return [];
  }

  return source
    .map(row => {
      const value =
        typeof row === 'string'
          ? row
          : (
              localized(row, 'text', lang) ||
              localized(row, 'title', lang)
            );

      return toPlainText(value);
    })
    .filter(Boolean)
    .slice(0, 6);
}

// ============================================================
// IMAGES
// ============================================================

function imageUrl(value) {
  const raw =
    typeof value === 'string'
      ? value
      : (
          value &&
          typeof value === 'object'
        )
        ? (
            value.url ??
            value.path ??
            value.src
          )
        : '';

  if (!plain(raw).trim()) {
    return '';
  }

  try {
    const resolved = resolveMediaUrl(raw);

    if (!resolved) return '';

    const url = new URL(
      resolved,
      window.location.origin
    );

    return ['https:', 'http:'].includes(url.protocol)
      ? url.href
      : '';

  } catch {
    return '';
  }
}

function articleImages(blog) {
  const cover = imageUrl(
    blog?.images?.image_1 ??
    blog?.image_1 ??
    blog?.cover_url ??
    blog?.image_url ??
    blog?.image
  );

  const secondary = imageUrl(
    blog?.images?.image_2 ??
    blog?.image_2
  );

  return {
    cover,
    secondary:
      secondary !== cover
        ? secondary
        : ''
  };
}

// ============================================================
// DATES AND READING TIME
// ============================================================

function dateOf(blog, lang) {
  const raw = plain(
    blog?.published_at ??
    blog?.created_at ??
    blog?.createdAt ??
    blog?.date
  ).trim();

  if (!raw) return '';

  const input =
    /^\d{4}-\d{2}-\d{2}$/.test(raw)
      ? `${raw}T12:00:00`
      : raw;

  const date = new Date(input);

  if (!Number.isFinite(date.getTime())) {
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
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  } catch {
    return date.toLocaleDateString('en-US');
  }
}

function readingMinutes(blog, sections, lang) {
  const all = [
    localized(blog, 'description', lang),
    ...sections.flatMap(section => [
      section.title,
      section.body
    ])
  ]
    .map(toPlainText)
    .join(' ');

  const words = all
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .length;

  if (!words) return 0;

  return Math.max(
    1,
    Math.ceil(words / 210)
  );
}

function decoratedTitle(value) {
  const parts = plain(value)
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length < 2) {
    return esc(value);
  }

  const last = parts.pop();

  return `
    ${esc(parts.join(' '))}
    <span>${esc(last)}</span>
  `;
}

// ============================================================
// HERO
// ============================================================

function hero(blog, lang, ui, sections, cover) {
  const title = titleOf(blog, lang, ui);

  const date = dateOf(blog, lang);

  const minutes = readingMinutes(
    blog,
    sections,
    lang
  );

  const excerpt =
    localized(blog, 'excerpt', lang) ||
    localized(blog, 'description', lang);

  const excerptText = toPlainText(excerpt);

  const summary = excerptText
    .slice(0, 290)
    .trim();

  const category = toPlainText(
    localized(blog, 'category_name', lang) ||
    (
      typeof blog?.category === 'string'
        ? blog.category
        : blog?.category?.name
    )
  );

  return `
    <section class="mzbd-hero">

      <div class="mzbd-container">

        <nav
          class="mzbd-breadcrumb"
          aria-label="Breadcrumb"
        >

          <a href="/${encodeURIComponent(lang)}/blog">
            ${esc(ui.back)}
          </a>

          <span aria-hidden="true">/</span>

          <span>${esc(ui.article)}</span>

        </nav>

        <div class="mzbd-kicker">

          ${esc(ui.journal)}

          ${
            category
              ? `
                <span>/ ${esc(category)}</span>
              `
              : ''
          }

        </div>

        <h1 class="mzbd-title">
          ${decoratedTitle(title)}
        </h1>

        <div class="mzbd-meta">

          ${
            date
              ? `
                <span class="mzbd-meta-item">
                  <span aria-hidden="true">▦</span>
                  ${esc(date)}
                </span>
              `
              : ''
          }

          ${
            minutes
              ? `
                <span class="mzbd-reading-time">
                  <span aria-hidden="true">◷</span>
                  ${minutes} ${esc(ui.read)}
                </span>
              `
              : ''
          }

        </div>

        ${
          summary
            ? `
              <p class="mzbd-subtitle">
                ${esc(summary)}
                ${excerptText.length > 290 ? '…' : ''}
              </p>
            `
            : ''
        }

        ${
          cover
            ? `
              <figure class="mzbd-cover">

                <img
                  src="${esc(cover)}"
                  alt="${esc(title)}"
                  loading="eager"
                  decoding="async"
                  fetchpriority="high"
                >

              </figure>
            `
            : ''
        }

      </div>

    </section>
  `;
}

// ============================================================
// SECOND IMAGE
// ============================================================

function secondImage(url, title) {
  if (!url) return '';

  return `
    <figure class="mzbd-inline-image">

      <img
        src="${esc(url)}"
        alt="${esc(title)}"
        loading="lazy"
        decoding="async"
      >

    </figure>
  `;
}

// ============================================================
// CONTENT
// ============================================================

function content(
  blog,
  lang,
  ui,
  sections,
  secondary
) {
  const articleDescription = localized(
    blog,
    'description',
    lang
  );

  const articleQuote = localized(
    blog,
    'quote',
    lang
  );

  const secondaryAfter =
    sections.length >= 3
      ? 1
      : sections.length - 1;

  const sectionsHtml = sections
    .map((section, index) => `
      <section
        class="mzbd-article-section"
        id="mzbd-section-${index + 1}"
      >

        ${
          section.title
            ? `
              <h2>${esc(section.title)}</h2>
            `
            : ''
        }

        ${renderParagraphs(section.body)}

        ${
          section.quote
            ? `
              <blockquote class="mzbd-quote">
                “${esc(section.quote)}”
              </blockquote>
            `
            : ''
        }

      </section>

      ${
        secondary && index === secondaryAfter
          ? secondImage(
              secondary,
              titleOf(blog, lang, ui)
            )
          : ''
      }
    `)
    .join('');

  return `
    <article
      class="mzbd-article"
      id="mzbd-article"
    >

      ${
        articleDescription
          ? `
            <div class="mzbd-article-intro">
              ${renderParagraphs(articleDescription)}
            </div>
          `
          : ''
      }

      ${
        articleQuote
          ? `
            <blockquote class="mzbd-quote">
              “${esc(toPlainText(articleQuote))}”
            </blockquote>
          `
          : ''
      }

      ${sectionsHtml}

      ${
        secondary && !sections.length
          ? secondImage(
              secondary,
              titleOf(blog, lang, ui)
            )
          : ''
      }

    </article>
  `;
}

// ============================================================
// SIDEBAR
// ============================================================

function sidebar(blog, lang, ui, sections) {
  const named = sections
    .map((section, index) => ({
      ...section,
      index
    }))
    .filter(section => section.title);

  const takeaways = takeawaysOf(blog, lang);

  if (
    !named.length &&
    !takeaways.length
  ) {
    return '';
  }

  return `
    <aside
      class="mzbd-sidebar"
      aria-label="${esc(ui.contents)}"
    >

      ${
        named.length
          ? `
            <nav
              class="mzbd-side-card mzbd-toc"
              aria-label="${esc(ui.contents)}"
            >

              <h2>
                <span aria-hidden="true">▤</span>
                ${esc(ui.contents)}
              </h2>

              <ol>

                ${named.map((section, index) => `
                  <li>

                    <a
                      href="#mzbd-section-${section.index + 1}"
                    >

                      <span>
                        ${String(index + 1).padStart(2, '0')}
                      </span>

                      <span>
                        ${esc(section.title)}
                      </span>

                    </a>

                  </li>
                `).join('')}

              </ol>

            </nav>
          `
          : ''
      }

      ${
        takeaways.length
          ? `
            <section
              class="mzbd-side-card mzbd-takeaways"
            >

              <h2>
                <span aria-hidden="true">✦</span>
                ${esc(ui.takeaways)}
              </h2>

              <ul>

                ${takeaways.map(item => `
                  <li>

                    <span aria-hidden="true">✓</span>

                    <p>${esc(item)}</p>

                  </li>
                `).join('')}

              </ul>

            </section>
          `
          : ''
      }

    </aside>
  `;
}

// ============================================================
// CTA
// ============================================================

function contactSection(lang, ui) {
  return `
    <section class="mzbd-contact-section">

      <div class="mzbd-container">

        <div class="mzbd-contact-card">

          <div>

            <h2>${esc(ui.contactTitle)}</h2>

            <p>${esc(ui.contactText)}</p>

          </div>

          <a
            href="/${encodeURIComponent(lang)}/contact"
            class="mzbd-contact-button"
            data-route="contact"
          >
            ${esc(ui.contact)}

            <span aria-hidden="true">↗</span>
          </a>

        </div>

      </div>

    </section>
  `;
}

// ============================================================
// NOT FOUND
// ============================================================

function statusSection(lang, ui) {
  return `
    <section class="mzbd-not-found mzbd-container">

      <span class="mzbd-kicker">
        MAZORYA / BLOG
      </span>

      <h1>${esc(ui.notFound)}</h1>

      <p>${esc(ui.notFoundDesc)}</p>

      <a
        href="/${encodeURIComponent(lang)}/blog"
        class="mzbd-contact-button"
      >
        ${esc(ui.back)} ↗
      </a>

    </section>
  `;
}

// ============================================================
// PAGE LAYOUT
// ============================================================

function renderPage(html, lang) {
  const app = document.getElementById('app');

  if (!app) return;

  const dir =
    ['fa', 'ar'].includes(lang)
      ? 'rtl'
      : 'ltr';

  app.innerHTML = `
    ${renderHeader()}

    <main
      id="mazoryaBlogDetails"
      class="mz-blog-details mzbd-page"
      dir="${dir}"
    >
      ${html}
    </main>

    ${renderFooter()}
  `;

  attachHeaderEvents();
  attachFooterEvents();
}

// ============================================================
// SLUG / LEGACY ID
// ============================================================

function identifierOf(params = {}) {
  const query = new URLSearchParams(
    window.location.search
  );

  const fromParams =
    params.slug ??
    params.id ??
    params.blogId;

  const fromQuery =
    query.get('slug') ??
    query.get('id');

  let identifier = plain(
    fromParams ?? fromQuery
  ).trim();

  if (!identifier && !fromQuery) {
    const segments = window.location.pathname
      .split('/')
      .filter(Boolean);

    const last = segments.at(-1);

    if (
      segments.length >= 2 &&
      last !== 'blog-details'
    ) {
      try {
        identifier = decodeURIComponent(
          last
        ).trim();
      } catch {
        return '';
      }
    }
  }

  return identifier;
}

// ============================================================
// MAIN RENDER
// ============================================================

export async function renderBlogDetails(params = {}) {
  if (!document.getElementById('app')) {
    return;
  }

  const lang = i18n.getCurrentLanguage();

  const ui = UI[lang] || UI.en;

  const path = window.location.pathname;

  const search = window.location.search;

  const thisRequest = ++renderRequestId;

  const identifier = identifierOf(params);

  if (
    !identifier ||
    identifier.includes('/') ||
    identifier.includes('\\')
  ) {
    renderPage(
      statusSection(lang, ui),
      lang
    );

    return;
  }

  let blog = null;

  try {
    const response = await getBlogBySlug(
      identifier
    );

    if (response?.status !== false) {
      blog = (
        response?.data &&
        typeof response.data === 'object' &&
        !Array.isArray(response.data)
      )
        ? response.data
        : response;
    }

  } catch (error) {
    console.error(
      '[BlogDetails] API request failed:',
      error
    );
  }

  // Ignore stale SPA responses.

  if (
    thisRequest !== renderRequestId ||
    window.location.pathname !== path ||
    window.location.search !== search ||
    i18n.getCurrentLanguage() !== lang
  ) {
    return;
  }

  if (
    !blog ||
    typeof blog !== 'object' ||
    Array.isArray(blog) ||
    !localized(blog, 'title', lang)
  ) {
    renderPage(
      statusSection(lang, ui),
      lang
    );

    return;
  }

  const sections = sectionsOf(blog, lang);

  const { cover, secondary } = articleImages(blog);

  document.title =
    `${titleOf(blog, lang, ui)} | Mazorya Group`;

  const hasSidebar =
    sections.some(section => section.title) ||
    takeawaysOf(blog, lang).length > 0;

  renderPage(`
    ${hero(blog, lang, ui, sections, cover)}

    <div
      class="mzbd-body mzbd-container ${
        hasSidebar ? 'mzbd-has-sidebar' : ''
      }"
    >

      ${content(
        blog,
        lang,
        ui,
        sections,
        secondary
      )}

      ${sidebar(
        blog,
        lang,
        ui,
        sections
      )}

    </div>

    ${contactSection(lang, ui)}
  `, lang);
}
