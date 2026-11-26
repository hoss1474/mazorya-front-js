
/**
 * Mazorya Group — Projects Listing
 * File: pages/projects.js
 * Light UI / Laravel API / Slug / Multilingual
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
  getProjects,
  resolveMediaUrl
} from '../core/api.js';

import '../assets/css/projects.css';

const FALLBACK_IMAGE = '/assets/img/default-project.jpg';

let renderRequestId = 0;

const CATEGORY_IDS = [
  'all',
  'website',
  'ui-ux',
  'social-media',
  'prompts',
  'graphic',
  'other'
];

const CATEGORY_ALIASES = {
  // Check Prompts before Website.
  prompts: [
    'prompts', 'prompt', 'ai prompt', 'ai prompts',
    'website prompt', 'website prompts',
    'web prompt', 'prompt engineering',
    'پرامپت', 'پرامپت ها',
    'پرامپت آماده', 'پرامپت سایت'
  ],
  website: [
    'website', 'web', 'web design',
    'web development', 'site',
    'وبسایت', 'وب سایت', 'طراحی سایت'
  ],
  'ui-ux': [
    'ui ux', 'ui/ux', 'uiux',
    'user interface', 'user experience',
    'ux design', 'ui design',
    'طراحی رابط کاربری', 'تجربه کاربری'
  ],
  'social-media': [
    'social media', 'social',
    'social media marketing',
    'instagram', 'telegram',
    'سوشیال مدیا', 'سوشیال', 'شبکه اجتماعی'
  ],
  graphic: [
    'graphic', 'graphics', 'graphic design',
    'illustration', 'brand identity', 'branding',
    'گرافیک', 'طراحی گرافیک', 'تصویرسازی'
  ]
};

const LABELS = {
  en: {
    eyebrow: 'OUR WORK / SELECTED PROJECTS',
    heroFirst: 'Crafted to make',
    heroAccent: 'an impact.',
    intro: 'A selection of our latest projects across web, UI/UX, social media, prompts, and creative design.',
    all: 'All',
    website: 'Website',
    'ui-ux': 'UI/UX',
    'social-media': 'Social Media',
    prompts: 'Prompts',
    graphic: 'Graphic',
    other: 'Other',
    allProjects: 'All Projects',
    projectSuffix: 'Projects',
    countOne: 'Project',
    countMany: 'Projects',
    sort: 'Sort',
    latest: 'Latest',
    oldest: 'Oldest',
    az: 'Title A–Z',
    za: 'Title Z–A',
    empty: 'No projects found in this category.',
    ctaTitle: 'Have a <em>project</em> in mind?',
    ctaText: "Let's turn your idea into a meaningful digital experience.",
    ctaButton: "Let's Talk",
    pageTitle: 'Our Projects',
    view: 'View project'
  },

  fa: {
    eyebrow: 'نمونه‌کارها / پروژه‌های منتخب',
    heroFirst: 'خلق‌شده برای',
    heroAccent: 'اثرگذاری.',
    intro: 'گزیده‌ای از پروژه‌های ما در طراحی وب، رابط کاربری، شبکه‌های اجتماعی، پرامپت و طراحی خلاقانه.',
    all: 'همه',
    website: 'وب‌سایت',
    'ui-ux': 'رابط کاربری',
    'social-media': 'سوشیال مدیا',
    prompts: 'پرامپت‌ها',
    graphic: 'گرافیک',
    other: 'سایر',
    allProjects: 'همه پروژه‌ها',
    projectSuffix: 'پروژه‌ها',
    countOne: 'پروژه',
    countMany: 'پروژه',
    sort: 'مرتب‌سازی',
    latest: 'جدیدترین',
    oldest: 'قدیمی‌ترین',
    az: 'عنوان الف تا ی',
    za: 'عنوان ی تا الف',
    empty: 'پروژه‌ای در این دسته پیدا نشد.',
    ctaTitle: 'یک <em>پروژه</em> در ذهن دارید؟',
    ctaText: 'بیایید ایده شما را به یک تجربه دیجیتال ماندگار تبدیل کنیم.',
    ctaButton: 'شروع گفتگو',
    pageTitle: 'پروژه‌های ما',
    view: 'مشاهده پروژه'
  },

  ar: {
    eyebrow: 'أعمالنا / مشاريع مختارة',
    heroFirst: 'صُممت لتصنع',
    heroAccent: 'تأثيرًا.',
    intro: 'مجموعة من مشاريعنا في تطوير الويب وتجربة المستخدم ووسائل التواصل والتصميم.',
    all: 'الكل',
    website: 'مواقع الويب',
    'ui-ux': 'UI/UX',
    'social-media': 'وسائل التواصل',
    prompts: 'مطالبات AI',
    graphic: 'تصميم جرافيك',
    other: 'أخرى',
    allProjects: 'جميع المشاريع',
    projectSuffix: 'المشاريع',
    countOne: 'مشروع',
    countMany: 'مشاريع',
    sort: 'ترتيب',
    latest: 'الأحدث',
    oldest: 'الأقدم',
    az: 'العنوان أ–ي',
    za: 'العنوان ي–أ',
    empty: 'لا توجد مشاريع في هذه الفئة.',
    ctaTitle: 'هل لديك <em>مشروع</em>؟',
    ctaText: 'لنحوّل فكرتك إلى تجربة رقمية مؤثرة.',
    ctaButton: 'لنتحدث',
    pageTitle: 'مشاريعنا',
    view: 'عرض المشروع'
  },

  fr: {
    eyebrow: 'NOS RÉALISATIONS / PROJETS SÉLECTIONNÉS',
    heroFirst: 'Créés pour avoir',
    heroAccent: 'un impact.',
    intro: 'Découvrez nos projets web, UI/UX, réseaux sociaux, prompts et design créatif.',
    all: 'Tout',
    website: 'Site web',
    'ui-ux': 'UI/UX',
    'social-media': 'Réseaux sociaux',
    prompts: 'Prompts',
    graphic: 'Graphisme',
    other: 'Autres',
    allProjects: 'Tous les projets',
    projectSuffix: 'Projets',
    countOne: 'Projet',
    countMany: 'Projets',
    sort: 'Trier',
    latest: 'Récents',
    oldest: 'Anciens',
    az: 'Titre A–Z',
    za: 'Titre Z–A',
    empty: 'Aucun projet dans cette catégorie.',
    ctaTitle: 'Un <em>projet</em> en tête ?',
    ctaText: 'Donnons ensemble vie à votre idée.',
    ctaButton: 'Discutons',
    pageTitle: 'Nos projets',
    view: 'Voir le projet'
  },

  de: {
    eyebrow: 'UNSERE ARBEIT / AUSGEWÄHLTE PROJEKTE',
    heroFirst: 'Entwickelt für',
    heroAccent: 'Wirkung.',
    intro: 'Unsere Projekte aus Web, UI/UX, Social Media, Prompts und Design.',
    all: 'Alle',
    website: 'Webseite',
    'ui-ux': 'UI/UX',
    'social-media': 'Social Media',
    prompts: 'Prompts',
    graphic: 'Grafik',
    other: 'Sonstige',
    allProjects: 'Alle Projekte',
    projectSuffix: 'Projekte',
    countOne: 'Projekt',
    countMany: 'Projekte',
    sort: 'Sortieren',
    latest: 'Neueste',
    oldest: 'Älteste',
    az: 'Titel A–Z',
    za: 'Titel Z–A',
    empty: 'Keine Projekte in dieser Kategorie.',
    ctaTitle: 'Eine <em>Projektidee</em>?',
    ctaText: 'Lassen Sie uns daraus ein digitales Erlebnis machen.',
    ctaButton: 'Kontakt',
    pageTitle: 'Unsere Projekte',
    view: 'Projekt ansehen'
  },

  es: {
    eyebrow: 'NUESTRO TRABAJO / PROYECTOS DESTACADOS',
    heroFirst: 'Diseñados para',
    heroAccent: 'impactar.',
    intro: 'Nuestros proyectos de web, UI/UX, redes sociales, prompts y diseño creativo.',
    all: 'Todos',
    website: 'Sitios web',
    'ui-ux': 'UI/UX',
    'social-media': 'Redes sociales',
    prompts: 'Prompts',
    graphic: 'Diseño gráfico',
    other: 'Otros',
    allProjects: 'Todos los proyectos',
    projectSuffix: 'Proyectos',
    countOne: 'Proyecto',
    countMany: 'Proyectos',
    sort: 'Ordenar',
    latest: 'Recientes',
    oldest: 'Antiguos',
    az: 'Título A–Z',
    za: 'Título Z–A',
    empty: 'No hay proyectos en esta categoría.',
    ctaTitle: '¿Tienes un <em>proyecto</em>?',
    ctaText: 'Transformemos tu idea en una experiencia digital.',
    ctaButton: 'Hablemos',
    pageTitle: 'Nuestros proyectos',
    view: 'Ver proyecto'
  },

  tr: {
    eyebrow: 'İŞLERİMİZ / SEÇİLİ PROJELER',
    heroFirst: 'Etki yaratmak için',
    heroAccent: 'tasarlandı.',
    intro: 'Web, UI/UX, sosyal medya, prompt ve yaratıcı tasarım projelerimizden seçmeler.',
    all: 'Tümü',
    website: 'Web sitesi',
    'ui-ux': 'UI/UX',
    'social-media': 'Sosyal medya',
    prompts: 'Promptlar',
    graphic: 'Grafik',
    other: 'Diğer',
    allProjects: 'Tüm Projeler',
    projectSuffix: 'Projeler',
    countOne: 'Proje',
    countMany: 'Proje',
    sort: 'Sırala',
    latest: 'En yeni',
    oldest: 'En eski',
    az: 'Başlık A–Z',
    za: 'Başlık Z–A',
    empty: 'Bu kategoride proje bulunamadı.',
    ctaTitle: 'Aklınızda bir <em>proje</em> mi var?',
    ctaText: 'Fikrinizi etkileyici bir dijital deneyime dönüştürelim.',
    ctaButton: 'Konuşalım',
    pageTitle: 'Projelerimiz',
    view: 'Projeyi gör'
  }
};

// ============================================================
// HELPERS
// ============================================================

function textValue(value) {
  return typeof value === 'string' ||
    typeof value === 'number'
      ? String(value).trim()
      : '';
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function normalizeText(value) {
  return textValue(value)
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[\u200c\u200d]/g, ' ')
    .replace(/[_\-–—]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractCategoryValues(value) {
  if (value == null) return [];

  if (Array.isArray(value)) {
    return value.flatMap(extractCategoryValues);
  }

  if (typeof value === 'object') {
    return [
      value.slug,
      value.name,
      value.title,
      value.label
    ].flatMap(extractCategoryValues);
  }

  const normalized = normalizeText(value);

  return normalized ? [normalized] : [];
}

function matchesAlias(value, alias) {
  const needle = normalizeText(alias);

  if (value === needle) return true;

  if (needle.length <= 3) {
    return value
      .split(/[\s/,+&()]+/)
      .includes(needle);
  }

  return value.includes(needle);
}

function projectCategory(project) {
  const values = [
    ...extractCategoryValues(project?.category),
    ...extractCategoryValues(project?.categories),
    ...extractCategoryValues(project?.tags),
    ...extractCategoryValues(project?.category_slug),
    ...extractCategoryValues(project?.category_name)
  ];

  for (const [id, aliases] of Object.entries(CATEGORY_ALIASES)) {
    if (
      values.some(value =>
        aliases.some(alias =>
          matchesAlias(value, alias)
        )
      )
    ) {
      return id;
    }
  }

  return 'other';
}

function localized(project, field, lang) {
  if (!project || typeof project !== 'object') {
    return '';
  }

  const translations = project.translations;

  const arrayValue = Array.isArray(translations)
    ? translations.find(row =>
        row?.lang === lang ||
        row?.locale === lang
      )?.[field]
    : undefined;

  const candidates = [
    project[`${field}_${lang}`],
    Array.isArray(translations)
      ? undefined
      : translations?.[lang]?.[field],
    arrayValue,
    project[field],
    project[`${field}_en`]
  ];

  return candidates
    .map(textValue)
    .find(Boolean) || '';
}

function projectTitle(project, lang) {
  return (
    localized(project, 'name', lang) ||
    localized(project, 'title', lang) ||
    'Project'
  );
}

function projectLink(project, lang) {
  const identifier =
    textValue(project?.slug) ||
    textValue(project?.id);

  return identifier
    ? `/${encodeURIComponent(lang)}/project/${encodeURIComponent(identifier)}`
    : '';
}

function projectImage(project) {
  const images = project?.images;

  const candidates = [
    typeof images === 'string' ? images : null,
    images?.image,
    images?.image_1,
    images?.cover,
    project?.cover_url,
    project?.image_url,
    project?.image
  ];

  for (const item of candidates) {
    const path =
      typeof item === 'string'
        ? item
        : item?.url ?? item?.path;

    if (
      typeof path !== 'string' ||
      !path.trim()
    ) {
      continue;
    }

    const url = resolveMediaUrl(path);

    if (url) return url;
  }

  return FALLBACK_IMAGE;
}

// ============================================================
// SORTING
// ============================================================

function projectTime(project) {
  const value =
    project?.published_at ||
    project?.created_at ||
    project?.createdAt ||
    project?.date ||
    project?.data;

  const timestamp = value
    ? new Date(value).getTime()
    : NaN;

  return Number.isFinite(timestamp)
    ? timestamp
    : null;
}

function sortProjects(projects, sort, lang) {
  const collator = new Intl.Collator(
    {
      fa: 'fa',
      ar: 'ar',
      de: 'de',
      fr: 'fr',
      es: 'es',
      tr: 'tr'
    }[lang] || 'en',
    {
      sensitivity: 'base',
      numeric: true
    }
  );

  return projects
    .map((project, index) => ({
      project,
      index
    }))
    .sort((a, b) => {
      if (sort === 'az' || sort === 'za') {
        const diff = collator.compare(
          projectTitle(a.project, lang),
          projectTitle(b.project, lang)
        );

        return (
          (sort === 'az' ? diff : -diff) ||
          a.index - b.index
        );
      }

      const aTime = projectTime(a.project);
      const bTime = projectTime(b.project);

      if (aTime === null && bTime === null) {
        return a.index - b.index;
      }

      if (aTime === null) return 1;
      if (bTime === null) return -1;

      const diff = sort === 'oldest'
        ? aTime - bTime
        : bTime - aTime;

      return diff || a.index - b.index;
    })
    .map(({ project }) => project);
}

// ============================================================
// PROJECT CARD
// ============================================================

const CATEGORY_ICONS = {
  website: '▣',
  'ui-ux': '◇',
  'social-media': '#',
  prompts: '✧',
  graphic: '✎',
  other: '◈'
};

function renderProjectCard(project, lang, ui) {
  const title = escapeHtml(
    projectTitle(project, lang)
  );

  const category = projectCategory(project);

  const categoryName = escapeHtml(
    ui[category] || ui.other
  );

  const image = escapeHtml(
    projectImage(project)
  );

  const link = escapeHtml(
    projectLink(project, lang)
  );

  const symbol = CATEGORY_ICONS[category] || '◈';

  return `
    <article
      class="mzpl-card"
      data-project-category="${category}"
    >
      <div class="mzpl-card-media">

        ${
          link
            ? `
              <a
                class="mzpl-card-image-link"
                href="${link}"
                aria-label="${escapeHtml(ui.view)}: ${title}"
              >
            `
            : '<div class="mzpl-card-image-link">'
        }

          <img
            class="mzpl-card-image"
            src="${image}"
            alt="${title}"
            loading="lazy"
            decoding="async"
          />

          ${
            link
              ? `
                <span
                  class="mzpl-card-arrow"
                  aria-hidden="true"
                >↗</span>
              `
              : ''
          }

        ${link ? '</a>' : '</div>'}

      </div>

      <div class="mzpl-card-info">

        <h3 class="mzpl-card-title">
          ${
            link
              ? `<a href="${link}">${title}</a>`
              : title
          }
        </h3>

        <p class="mzpl-card-category">
          <span aria-hidden="true">${symbol}</span>
          ${categoryName}
        </p>

      </div>
    </article>
  `;
}

// ============================================================
// HERO
// ============================================================

function renderHero(ui) {
  return `
    <section class="mzpl-hero">

      <div class="mzpl-container mzpl-hero-layout">

        <div class="mzpl-hero-content">

          <div class="mzpl-eyebrow">
            <span></span>
            ${escapeHtml(ui.eyebrow)}
          </div>

          <h1>
            ${escapeHtml(ui.heroFirst)}
            <span>${escapeHtml(ui.heroAccent)}</span>
          </h1>

          <p>
            ${escapeHtml(ui.intro)}
          </p>

        </div>

        <div class="mzpl-hero-art" aria-hidden="true">

          <svg
            class="mzpl-maze"
            viewBox="0 0 330 330"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >

            <circle
              cx="165" cy="165" r="150"
              stroke="currentColor"
              stroke-width="1.3"
              opacity=".52"
              stroke-dasharray="170 20 105 28 150 27 115 10"
            />

            <circle
              cx="165" cy="165" r="124"
              stroke="currentColor"
              stroke-width="1.6"
              opacity=".65"
              stroke-dasharray="117 17 115 24 158 32 105 10"
              transform="rotate(30 165 165)"
            />

            <circle
              cx="165" cy="165" r="95"
              stroke="currentColor"
              stroke-width="2"
              opacity=".72"
              stroke-dasharray="112 27 91 15 85 20 115 32"
              transform="rotate(112 165 165)"
            />

            <circle
              cx="165" cy="165" r="67"
              stroke="currentColor"
              stroke-width="2.2"
              opacity=".8"
              stroke-dasharray="68 24 82 18 87 33"
              transform="rotate(-32 165 165)"
            />

            <circle
              cx="165" cy="165" r="38"
              stroke="currentColor"
              stroke-width="2.2"
              opacity=".68"
              stroke-dasharray="67 16 30 15 55 15"
              transform="rotate(17 165 165)"
            />

            <path
              d="M140 177l16-27 12 19 12-19 15 27"
              stroke="currentColor"
              stroke-width="9"
              stroke-linejoin="round"
              opacity=".72"
            />

          </svg>

        </div>

      </div>

    </section>
  `;
}

// ============================================================
// FILTERS
// ============================================================

function renderFilters(ui) {
  return `
    <div class="mzpl-container mzpl-filter-shell">

      <div
        class="mzpl-filters"
        id="mzplFilters"
        role="group"
        aria-label="Project categories"
      >

        ${CATEGORY_IDS.map((category, index) => `
          <button
            type="button"
            class="mzpl-filter${index === 0 ? ' is-active' : ''}"
            data-category="${category}"
            aria-pressed="${index === 0}"
          >
            ${escapeHtml(ui[category] || category)}
          </button>
        `).join('')}

      </div>

    </div>
  `;
}

// ============================================================
// PROJECT LIST
// ============================================================

function renderList(ui, projects, lang) {
  const sorted = sortProjects(
    projects,
    'latest',
    lang
  );

  return `
    <section
      class="mzpl-projects-section"
      id="mzplProjectsList"
    >

      <div class="mzpl-container">

        <div class="mzpl-list-heading">

          <div class="mzpl-heading-group">

            <h2 id="mzplCurrentCategory">
              ${escapeHtml(ui.allProjects)}
            </h2>

            <span
              class="mzpl-count"
              id="mzplProjectCount"
              aria-live="polite"
            >
              ${projects.length}
              ${escapeHtml(
                projects.length === 1
                  ? ui.countOne
                  : ui.countMany
              )}
            </span>

          </div>

          <label
            class="mzpl-sort-label"
            for="mzplSort"
          >

            <span>${escapeHtml(ui.sort)}:</span>

            <select
              id="mzplSort"
              class="mzpl-sort"
            >
              <option value="latest">
                ${escapeHtml(ui.latest)}
              </option>

              <option value="oldest">
                ${escapeHtml(ui.oldest)}
              </option>

              <option value="az">
                ${escapeHtml(ui.az)}
              </option>

              <option value="za">
                ${escapeHtml(ui.za)}
              </option>
            </select>

          </label>

        </div>

        <div
          class="mzpl-grid"
          id="mzplGrid"
          aria-live="polite"
        >

          ${
            sorted.length
              ? sorted.map(project =>
                  renderProjectCard(project, lang, ui)
                ).join('')
              : `
                <div class="mzpl-empty">
                  ${escapeHtml(ui.empty)}
                </div>
              `
          }

        </div>

      </div>

    </section>
  `;
}

// ============================================================
// CTA
// ============================================================

function renderCTA(lang, ui) {
  return `
    <section class="mzpl-cta-section">

      <div class="mzpl-container">

        <div class="mzpl-cta">

          <div class="mzpl-cta-text">

            <h2>${ui.ctaTitle}</h2>

            <p>
              ${escapeHtml(ui.ctaText)}
            </p>

          </div>

          <a
            class="mzpl-cta-link"
            href="/${encodeURIComponent(lang)}/contact"
            data-route="contact"
          >
            ${escapeHtml(ui.ctaButton)}

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
    .querySelectorAll('.mzpl-card-image')
    .forEach(img => {
      img.addEventListener('error', () => {
        if (img.dataset.fallback) return;

        img.dataset.fallback = '1';
        img.src = FALLBACK_IMAGE;
      });
    });
}

// ============================================================
// INTERACTIONS
// ============================================================

function attachInteractions(app, projects, lang, ui) {
  const filters = app.querySelector('#mzplFilters');
  const select = app.querySelector('#mzplSort');
  const grid = app.querySelector('#mzplGrid');
  const count = app.querySelector('#mzplProjectCount');
  const heading = app.querySelector('#mzplCurrentCategory');

  if (
    !filters ||
    !select ||
    !grid ||
    !count ||
    !heading
  ) {
    return;
  }

  let currentCategory = 'all';

  function update() {
    const filtered = currentCategory === 'all'
      ? projects
      : projects.filter(project =>
          projectCategory(project) === currentCategory
        );

    const sorted = sortProjects(
      filtered,
      select.value,
      lang
    );

    grid.innerHTML = sorted.length
      ? sorted.map(project =>
          renderProjectCard(project, lang, ui)
        ).join('')
      : `
        <div class="mzpl-empty">
          ${escapeHtml(ui.empty)}
        </div>
      `;

    heading.textContent = currentCategory === 'all'
      ? ui.allProjects
      : `${ui[currentCategory]} ${ui.projectSuffix}`;

    count.textContent = (
      `${filtered.length} ${
        filtered.length === 1
          ? ui.countOne
          : ui.countMany
      }`
    );

    filters
      .querySelectorAll('[data-category]')
      .forEach(button => {
        const active =
          button.dataset.category === currentCategory;

        button.classList.toggle(
          'is-active',
          active
        );

        button.setAttribute(
          'aria-pressed',
          String(active)
        );
      });

    attachImageFallbacks(grid);
  }

  filters.addEventListener('click', event => {
    const button = event.target.closest(
      'button[data-category]'
    );

    if (
      !button ||
      !filters.contains(button)
    ) {
      return;
    }

    const next = button.dataset.category;

    if (
      !CATEGORY_IDS.includes(next) ||
      next === currentCategory
    ) {
      return;
    }

    currentCategory = next;
    update();
  });

  select.addEventListener('change', update);

  attachImageFallbacks(grid);
}

// ============================================================
// MAIN RENDER
// ============================================================

export async function renderProjects() {
  const app = document.getElementById('app');

  if (!app) {
    console.error('[Projects] #app not found');
    return;
  }

  const lang = i18n.getCurrentLanguage();
  const ui = LABELS[lang] || LABELS.en;

  const path = window.location.pathname;
  const search = window.location.search;

  const requestId = ++renderRequestId;

  let projects = [];

  try {
    // Fetch all active projects without a limit.
    const result = await getProjects();

    if (Array.isArray(result)) {
      projects = result.filter(project =>
        project &&
        typeof project === 'object' &&
        !Array.isArray(project) &&
        ![false, 0, '0', 'false'].includes(
          project.is_active
        )
      );
    }

  } catch (error) {
    console.error(
      '[Projects] Failed to fetch projects:',
      error
    );
  }

  // Ignore outdated SPA requests.
  if (
    requestId !== renderRequestId ||
    window.location.pathname !== path ||
    window.location.search !== search ||
    i18n.getCurrentLanguage() !== lang
  ) {
    return;
  }

  app.innerHTML = `
    ${renderHeader()}

    <main
      class="mz-projects mzpl-page"
      id="mazoryaProjects"
      dir="${lang === 'fa' || lang === 'ar' ? 'rtl' : 'ltr'}"
    >

      ${renderHero(ui)}

      ${renderFilters(ui)}

      ${renderList(ui, projects, lang)}

      ${renderCTA(lang, ui)}

    </main>

    ${renderFooter()}
  `;

  attachHeaderEvents();
  attachFooterEvents();

  attachInteractions(
    app,
    projects,
    lang,
    ui
  );

  document.title =
    `${ui.pageTitle} | Mazorya Group`;
}
