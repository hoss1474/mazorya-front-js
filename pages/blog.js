
/**
 * Mazorya Group — Blog Listing (Light Editorial UI)
 * File: pages/blog.js
 *
 * Existing getBlogs() API
 * Shared header/footer
 * Slug-based routes
 * 7 languages + RTL
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

import '../assets/css/blog.css';

const DEFAULT_IMAGE = '/assets/img/default-project.jpg';

let renderRequestId = 0;

// ============================================================
// UI TRANSLATIONS
// ============================================================

const COPY = {
  en: {
    eyebrow: 'OUR JOURNAL / IDEAS & INSIGHTS',
    line1: 'Ideas worth sharing.',
    line2: 'Stories worth',
    accent: 'reading.',
    intro: 'Thoughts on design, technology, branding, AI and the digital experiences shaping tomorrow.',
    article: 'Article',
    read: 'Read article',
    emptyTitle: 'No articles yet',
    empty: 'Fresh insights are on the way. Check back soon.',
    ctaStart: 'Have a',
    ctaAccent: 'project',
    ctaEnd: 'in mind?',
    ctaText: 'Let’s build something remarkable.',
    ctaButton: 'Let’s Talk',
    pageTitle: 'Journal & Insights'
  },

  fa: {
    eyebrow: 'مجله ما / ایده‌ها و دیدگاه‌ها',
    line1: 'ایده‌هایی برای اشتراک.',
    line2: 'داستان‌هایی برای',
    accent: 'خواندن.',
    intro: 'نگاهی به طراحی، فناوری، برندسازی، هوش مصنوعی و تجربه‌های دیجیتال فردا.',
    article: 'مقاله',
    read: 'مطالعه مقاله',
    emptyTitle: 'هنوز مقاله‌ای منتشر نشده',
    empty: 'به‌زودی مطالب تازه‌ای منتشر می‌کنیم.',
    ctaStart: 'یک',
    ctaAccent: 'پروژه',
    ctaEnd: 'در ذهن دارید؟',
    ctaText: 'بیایید چیزی ماندگار خلق کنیم.',
    ctaButton: 'شروع گفتگو',
    pageTitle: 'مجله و مقالات'
  },

  ar: {
    eyebrow: 'مجلتنا / أفكار ورؤى',
    line1: 'أفكار تستحق المشاركة.',
    line2: 'وقصص تستحق',
    accent: 'القراءة.',
    intro: 'رؤى حول التصميم والتقنية والهوية والذكاء الاصطناعي ومستقبل التجارب الرقمية.',
    article: 'مقال',
    read: 'اقرأ المقال',
    emptyTitle: 'لا توجد مقالات بعد',
    empty: 'ترقبوا المزيد من الأفكار قريباً.',
    ctaStart: 'هل لديك',
    ctaAccent: 'مشروع',
    ctaEnd: 'في ذهنك؟',
    ctaText: 'لنصنع شيئاً استثنائياً معاً.',
    ctaButton: 'لنتحدث',
    pageTitle: 'المجلة والأفكار'
  },

  fr: {
    eyebrow: 'NOTRE JOURNAL / IDÉES & INSPIRATIONS',
    line1: 'Des idées à partager.',
    line2: 'Des histoires à',
    accent: 'découvrir.',
    intro: 'Design, technologie, identité, IA et expériences numériques de demain.',
    article: 'Article',
    read: 'Lire l’article',
    emptyTitle: 'Aucun article pour le moment',
    empty: 'De nouvelles idées arrivent bientôt.',
    ctaStart: 'Un',
    ctaAccent: 'projet',
    ctaEnd: 'en tête ?',
    ctaText: 'Créons quelque chose de remarquable.',
    ctaButton: 'Discutons',
    pageTitle: 'Journal et inspirations'
  },

  de: {
    eyebrow: 'UNSER JOURNAL / IDEEN & EINBLICKE',
    line1: 'Ideen zum Teilen.',
    line2: 'Geschichten zum',
    accent: 'Lesen.',
    intro: 'Gedanken über Design, Technologie, Branding, KI und digitale Erlebnisse.',
    article: 'Artikel',
    read: 'Artikel lesen',
    emptyTitle: 'Noch keine Artikel',
    empty: 'Bald gibt es hier neue Einblicke.',
    ctaStart: 'Eine',
    ctaAccent: 'Projektidee',
    ctaEnd: '?',
    ctaText: 'Lassen Sie uns etwas Besonderes schaffen.',
    ctaButton: 'Kontakt',
    pageTitle: 'Journal & Einblicke'
  },

  es: {
    eyebrow: 'NUESTRO BLOG / IDEAS & PERSPECTIVAS',
    line1: 'Ideas para compartir.',
    line2: 'Historias que vale la pena',
    accent: 'leer.',
    intro: 'Reflexiones sobre diseño, tecnología, marca, IA y experiencias digitales.',
    article: 'Artículo',
    read: 'Leer artículo',
    emptyTitle: 'Todavía no hay artículos',
    empty: 'Pronto compartiremos nuevas ideas.',
    ctaStart: '¿Tienes un',
    ctaAccent: 'proyecto',
    ctaEnd: 'en mente?',
    ctaText: 'Creemos algo extraordinario.',
    ctaButton: 'Hablemos',
    pageTitle: 'Blog e ideas'
  },

  tr: {
    eyebrow: 'DERGİMİZ / FİKİRLER & İÇGÖRÜLER',
    line1: 'Paylaşmaya değer fikirler.',
    line2: 'Okumaya değer',
    accent: 'hikâyeler.',
    intro: 'Tasarım, teknoloji, markalaşma, yapay zekâ ve dijital deneyimler üzerine.',
    article: 'Makale',
    read: 'Makaleyi oku',
    emptyTitle: 'Henüz makale yok',
    empty: 'Yakında yeni içerikler paylaşacağız.',
    ctaStart: 'Aklınızda bir',
    ctaAccent: 'proje',
    ctaEnd: 'mi var?',
    ctaText: 'Birlikte harika bir şey üretelim.',
    ctaButton: 'Konuşalım',
    pageTitle: 'Dergi ve İçgörüler'
  }
};

// ============================================================
// HELPERS
// ============================================================

function str(value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number'
  )
    ? String(value).trim()
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

function stripHtml(value) {
  const raw = str(value);

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

function excerpt(value, max = 135) {
  const chars = Array.from(
    stripHtml(value)
  );

  return chars.length > max
    ? `${chars.slice(0, max).join('').trimEnd()}…`
    : chars.join('');
}

// ============================================================
// MULTILINGUAL API FIELDS
// ============================================================

function localized(item, field, lang) {
  if (
    !item ||
    typeof item !== 'object'
  ) {
    return '';
  }

  const translations = item.translations;

  const fromArray = Array.isArray(translations)
    ? translations.find(
        row =>
          row?.lang === lang ||
          row?.locale === lang
      )?.[field]
    : undefined;

  const candidates = [
    item[`${field}_${lang}`],

    Array.isArray(translations)
      ? undefined
      : translations?.[lang]?.[field],

    fromArray,
    item[field],
    item[`${field}_en`]
  ];

  return candidates
    .map(str)
    .find(Boolean) || '';
}

function blogTitle(blog, lang, ui) {
  return (
    stripHtml(
      localized(blog, 'title', lang)
    ) || ui.article
  );
}

function blogSummary(blog, lang, max) {
  return excerpt(
    localized(blog, 'excerpt', lang) ||
    localized(blog, 'description', lang),
    max
  );
}

function blogCategory(blog, lang, ui) {
  const category = blog?.category;

  return stripHtml(
    localized(blog, 'category_name', lang) ||
    (
      typeof category === 'string'
        ? category
        : localized(category, 'name', lang)
    ) ||
    ui.article
  );
}

// ============================================================
// DATE
// ============================================================

function blogDate(blog, lang) {
  const raw = str(
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
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);

  } catch {
    return date.toLocaleDateString('en-US');
  }
}

// ============================================================
// IMAGES
// ============================================================

function imageUrl(value) {
  const raw =
    typeof value === 'string'
      ? value
      : value && typeof value === 'object'
        ? (
            value.url ??
            value.path ??
            value.src
          )
        : '';

  if (!str(raw)) {
    return DEFAULT_IMAGE;
  }

  try {
    const url = resolveMediaUrl(raw);

    if (!url) {
      return DEFAULT_IMAGE;
    }

    const parsed = new URL(
      url,
      window.location.origin
    );

    return ['https:', 'http:'].includes(
      parsed.protocol
    )
      ? parsed.href
      : DEFAULT_IMAGE;

  } catch {
    return DEFAULT_IMAGE;
  }
}

function blogImage(blog) {
  let images = blog?.images;

  if (
    typeof images === 'string' &&
    /^[\[{]/.test(images.trim())
  ) {
    try {
      images = JSON.parse(images);
    } catch {
      // Keep original.
    }
  }

  const raw =
    (
      Array.isArray(images)
        ? images[0]
        : null
    ) ||
    (
      typeof images === 'string'
        ? images
        : null
    ) ||
    images?.image_1 ||
    images?.image ||
    images?.cover ||
    blog?.image_1 ||
    blog?.cover_url ||
    blog?.image_url ||
    blog?.image;

  return imageUrl(raw);
}

// ============================================================
// SLUG LINKS
// ============================================================

function blogLink(blog, lang) {
  const identifier =
    str(blog?.slug) ||
    str(blog?.id);

  if (
    !identifier ||
    identifier.includes('/') ||
    identifier.includes('\\')
  ) {
    return '';
  }

  return (
    `/${encodeURIComponent(lang)}/blog-details/` +
    encodeURIComponent(identifier)
  );
}

// ============================================================
// ACTIVE / FEATURED
// ============================================================

function active(blog) {
  return (
    blog &&
    typeof blog === 'object' &&
    !Array.isArray(blog) &&
    ![
      false,
      0,
      '0',
      'false'
    ].includes(blog.is_active)
  );
}

function isFeatured(blog) {
  return (
    [true, 1, '1'].includes(blog?.is_featured) ||
    [true, 1, '1'].includes(blog?.featured)
  );
}

function chooseFeatured(blogs, lang) {
  return (
    blogs.find(isFeatured) ||

    blogs.find(blog =>
      blogSummary(blog, lang, 190) &&
      blogImage(blog) !== DEFAULT_IMAGE
    ) ||

    blogs[0] ||

    null
  );
}

// ============================================================
// MAZE HERO ART
// ============================================================

function renderMaze() {
  return `
    <div
      class="mzbl-hero-art"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 320 320"
        class="mzbl-maze"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >

        <circle
          cx="160"
          cy="160"
          r="148"
          stroke="currentColor"
          stroke-width="1.3"
          stroke-dasharray="125 16 140 26 118 19 300 30"
        />

        <circle
          cx="160"
          cy="160"
          r="120"
          stroke="currentColor"
          stroke-width="1.7"
          stroke-dasharray="115 22 117 22 104 25 305 29"
          transform="rotate(18 160 160)"
        />

        <circle
          cx="160"
          cy="160"
          r="92"
          stroke="currentColor"
          stroke-width="2"
          stroke-dasharray="94 17 86 20 85 18 212 25"
          transform="rotate(-28 160 160)"
        />

        <circle
          cx="160"
          cy="160"
          r="64"
          stroke="currentColor"
          stroke-width="2"
          stroke-dasharray="58 18 52 19 72 22 145 23"
          transform="rotate(35 160 160)"
        />

        <circle
          cx="160"
          cy="160"
          r="37"
          stroke="currentColor"
          stroke-width="2.2"
          stroke-dasharray="53 16 59 18 80 13"
          transform="rotate(30 160 160)"
        />

        <path
          d="m133 173 15-26 12 19 12-19 15 26"
          stroke="currentColor"
          stroke-width="8"
          stroke-linecap="round"
          stroke-linejoin="round"
          opacity=".58"
        />

      </svg>
    </div>
  `;
}

// ============================================================
// HERO
// ============================================================

function renderHero(ui) {
  return `
    <section class="mzbl-hero">

      <div class="mzbl-container mzbl-hero-layout">

        <div class="mzbl-hero-copy">

          <div class="mzbl-eyebrow">
            <span></span>
            ${esc(ui.eyebrow)}
          </div>

          <h1>
            ${esc(ui.line1)}
            <br>
            ${esc(ui.line2)}
            <span>${esc(ui.accent)}</span>
          </h1>

          <p>${esc(ui.intro)}</p>

        </div>

        ${renderMaze()}

      </div>

    </section>
  `;
}

// ============================================================
// ARTICLE METADATA
// ============================================================

function renderMeta(blog, lang, ui) {
  const category = blogCategory(
    blog,
    lang,
    ui
  );

  const date = blogDate(
    blog,
    lang
  );

  return `
    <div class="mzbl-meta">

      <span class="mzbl-category">
        ${esc(category)}
      </span>

      ${
        date
          ? `
            <time class="mzbl-date">
              ${esc(date)}
            </time>
          `
          : ''
      }

    </div>
  `;
}

// ============================================================
// FEATURED ARTICLE
// ============================================================

function renderFeatured(blog, lang, ui) {
  if (!blog) return '';

  const title = esc(
    blogTitle(blog, lang, ui)
  );

  const img = esc(
    blogImage(blog)
  );

  const summary = esc(
    blogSummary(blog, lang, 225)
  );

  const href = blogLink(blog, lang);
  const link = esc(href);

  return `
    <section
      class="mzbl-featured-section"
      aria-label="${esc(ui.article)}"
    >

      <div class="mzbl-container">

        <article class="mzbl-featured">

          <div class="mzbl-featured-image">

            ${
              href
                ? `
                  <a
                    href="${link}"
                    aria-label="${title}"
                  >
                `
                : '<div>'
            }

              <img
                src="${img}"
                alt="${title}"
                loading="eager"
                decoding="async"
                fetchpriority="high"
              >

            ${href ? '</a>' : '</div>'}

          </div>

          <div class="mzbl-featured-body">

            ${renderMeta(blog, lang, ui)}

            <h2>
              ${
                href
                  ? `<a href="${link}">${title}</a>`
                  : title
              }
            </h2>

            ${
              summary
                ? `<p>${summary}</p>`
                : ''
            }

            ${
              href
                ? `
                  <a
                    class="mzbl-read-link"
                    href="${link}"
                  >
                    ${esc(ui.read)}

                    <span aria-hidden="true">↗</span>
                  </a>
                `
                : ''
            }

          </div>

        </article>

      </div>

    </section>
  `;
}

// ============================================================
// ARTICLE CARD
// ============================================================

function renderCard(blog, lang, ui) {
  const title = esc(
    blogTitle(blog, lang, ui)
  );

  const description = esc(
    blogSummary(blog, lang, 135)
  );

  const img = esc(
    blogImage(blog)
  );

  const href = blogLink(blog, lang);
  const link = esc(href);

  return `
    <article class="mzbl-card blog-card">

      <div class="mzbl-card-media">

        ${
          href
            ? `
              <a
                href="${link}"
                aria-label="${title}"
              >
            `
            : '<div>'
        }

          <img
            src="${img}"
            alt="${title}"
            loading="lazy"
            decoding="async"
          >

        ${href ? '</a>' : '</div>'}

      </div>

      <div class="mzbl-card-content">

        ${renderMeta(blog, lang, ui)}

        <h3>
          ${
            href
              ? `<a href="${link}">${title}</a>`
              : title
          }
        </h3>

        ${
          description
            ? `<p>${description}</p>`
            : ''
        }

        ${
          href
            ? `
              <a
                class="mzbl-read-link"
                href="${link}"
              >
                ${esc(ui.read)}

                <span aria-hidden="true">↗</span>
              </a>
            `
            : ''
        }

      </div>

    </article>
  `;
}

// ============================================================
// ARTICLE GRID
// ============================================================

function renderGrid(blogs, lang, ui) {
  if (!blogs.length) return '';

  return `
    <section class="mzbl-list-section">

      <div class="mzbl-container">

        <div class="mzbl-grid blogs-grid">

          ${
            blogs.map(blog =>
              renderCard(blog, lang, ui)
            ).join('')
          }

        </div>

      </div>

    </section>
  `;
}

// ============================================================
// EMPTY STATE
// ============================================================

function renderEmpty(ui) {
  return `
    <section
      class="mzbl-container mzbl-empty"
      role="status"
    >

      <h2>${esc(ui.emptyTitle)}</h2>

      <p>${esc(ui.empty)}</p>

    </section>
  `;
}

// ============================================================
// CONTACT CTA
// ============================================================

function renderCTA(lang, ui) {
  return `
    <section class="mzbl-cta-section">

      <div class="mzbl-container">

        <div class="mzbl-cta">

          <div>

            <h2>
              ${esc(ui.ctaStart)}

              <span>
                ${esc(ui.ctaAccent)}
              </span>

              ${esc(ui.ctaEnd)}
            </h2>

            <p>${esc(ui.ctaText)}</p>

          </div>

          <a
            class="mzbl-cta-button"
            href="/${encodeURIComponent(lang)}/contact"
            data-route="contact"
          >
            ${esc(ui.ctaButton)}

            <span aria-hidden="true">↗</span>
          </a>

        </div>

      </div>

    </section>
  `;
}

// ============================================================
// IMAGE FALLBACK
// ============================================================

function attachImageFallbacks(scope) {
  scope
    .querySelectorAll(
      '.mzbl-featured img, .mzbl-card img'
    )
    .forEach(img => {

      img.addEventListener(
        'error',
        () => {
          if (img.dataset.fallback) {
            return;
          }

          img.dataset.fallback = '1';
          img.src = DEFAULT_IMAGE;
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
  const ui = COPY[lang] || COPY.en;

  const path = window.location.pathname;
  const search = window.location.search;

  const requestId = ++renderRequestId;

  let blogs = [];

  try {
    const result = await getBlogs();

    const items = Array.isArray(result)
      ? result
      : Array.isArray(result?.data)
        ? result.data
        : Array.isArray(result?.data?.data)
          ? result.data.data
          : [];

    blogs = items.filter(active);

  } catch (error) {
    console.error(
      '[Blog] Failed to load articles:',
      error
    );
  }

  // Prevent outdated SPA responses.
  if (
    requestId !== renderRequestId ||
    window.location.pathname !== path ||
    window.location.search !== search ||
    i18n.getCurrentLanguage() !== lang
  ) {
    return;
  }

  const featured = chooseFeatured(
    blogs,
    lang
  );

  const others = blogs.filter(
    blog => blog !== featured
  );

  app.innerHTML = `
    ${renderHeader()}

    <main
      class="mz-blog mzbl-page"
      id="mazoryaBlog"
      dir="${['fa', 'ar'].includes(lang) ? 'rtl' : 'ltr'}"
    >

      ${renderHero(ui)}

      ${
        blogs.length
          ? `
            ${renderFeatured(featured, lang, ui)}
            ${renderGrid(others, lang, ui)}
          `
          : renderEmpty(ui)
      }

      ${renderCTA(lang, ui)}

    </main>

    ${renderFooter()}
  `;

  attachHeaderEvents();
  attachFooterEvents();

  attachImageFallbacks(app);

  document.title =
    `${ui.pageTitle} | Mazorya Group`;
}
