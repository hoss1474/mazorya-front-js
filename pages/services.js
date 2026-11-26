
/**
 * Mazorya Group — Services Listing
 * File: pages/services.js
 * Light UI / Laravel API / Multilingual / RTL
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
  getServices,
  resolveMediaUrl
} from '../core/api.js';

import '../assets/css/services.css';

let renderRequestId = 0;

// Keep existing service details route.
const SERVICE_DETAILS_SEGMENT = 'service';

// ============================================================
// TRANSLATIONS
// ============================================================

const COPY = {
  en: {
    eyebrow: 'WHAT WE DO / OUR SERVICES',
    heroA: 'Everything your',
    heroB: 'brand needs to',
    heroAccent: 'grow.',
    intro: 'From strategy and design to development and digital experiences, we bring every idea to life.',
    expertise: 'Our Expertise',
    countSingle: 'Service',
    countPlural: 'Services',
    discover: 'Explore service',
    empty: 'No services are available right now.',
    stepHero: [
      'Ideas.',
      'Design.',
      'Build.',
      'Grow.'
    ],
    steps: [
      [
        'Discover',
        'Understand your goals and opportunities.'
      ],
      [
        'Design',
        'Turn insights into meaningful solutions.'
      ],
      [
        'Build',
        'Develop, test, and bring it to life.'
      ],
      [
        'Grow',
        'Optimize, scale, and create lasting impact.'
      ]
    ],
    ctaBefore: 'Have a',
    ctaAccent: 'project',
    ctaAfter: 'in mind?',
    ctaDescription: 'Let’s build something remarkable.',
    ctaButton: 'Let’s Talk',
    pageTitle: 'Our Services',
    untitled: 'Service'
  },

  fa: {
    eyebrow: 'آنچه انجام می‌دهیم / خدمات ما',
    heroA: 'هر آنچه برندتان',
    heroB: 'برای رشد نیاز دارد',
    heroAccent: 'اینجاست.',
    intro: 'از استراتژی و طراحی تا توسعه و تجربه‌های دیجیتال، ایده‌های شما را به واقعیت تبدیل می‌کنیم.',
    expertise: 'تخصص‌های ما',
    countSingle: 'خدمت',
    countPlural: 'خدمت',
    discover: 'مشاهده سرویس',
    empty: 'فعلاً سرویسی برای نمایش وجود ندارد.',
    stepHero: [
      'ایده.',
      'طراحی.',
      'ساخت.',
      'رشد.'
    ],
    steps: [
      [
        'شناخت',
        'شناخت اهداف و فرصت‌های کسب‌وکار شما.'
      ],
      [
        'طراحی',
        'تبدیل ایده‌ها به راهکارهای معنادار.'
      ],
      [
        'توسعه',
        'پیاده‌سازی، آزمایش و عرضه محصول.'
      ],
      [
        'رشد',
        'بهینه‌سازی، توسعه و خلق اثر ماندگار.'
      ]
    ],
    ctaBefore: 'یک',
    ctaAccent: 'پروژه',
    ctaAfter: 'در ذهن دارید؟',
    ctaDescription: 'بیایید چیزی ماندگار خلق کنیم.',
    ctaButton: 'شروع گفتگو',
    pageTitle: 'خدمات ما',
    untitled: 'سرویس'
  },

  ar: {
    eyebrow: 'ماذا نقدم / خدماتنا',
    heroA: 'كل ما تحتاجه',
    heroB: 'علامتك التجارية',
    heroAccent: 'للنمو.',
    intro: 'من الاستراتيجية والتصميم إلى التطوير والتجارب الرقمية، نحوّل الأفكار إلى واقع.',
    expertise: 'خبراتنا',
    countSingle: 'خدمة',
    countPlural: 'خدمات',
    discover: 'استكشف الخدمة',
    empty: 'لا توجد خدمات متاحة حالياً.',
    stepHero: [
      'فكرة.',
      'تصميم.',
      'بناء.',
      'نمو.'
    ],
    steps: [
      [
        'اكتشاف',
        'نفهم أهدافك والفرص المتاحة.'
      ],
      [
        'تصميم',
        'نحوّل الأفكار إلى حلول هادفة.'
      ],
      [
        'تطوير',
        'نطوّر ونختبر ونطلق الحلول.'
      ],
      [
        'نمو',
        'نحسّن ونوسّع نطاق التأثير.'
      ]
    ],
    ctaBefore: 'هل لديك',
    ctaAccent: 'مشروع',
    ctaAfter: 'في ذهنك؟',
    ctaDescription: 'لنصنع شيئاً مميزاً معاً.',
    ctaButton: 'لنتحدث',
    pageTitle: 'خدماتنا',
    untitled: 'خدمة'
  },

  fr: {
    eyebrow: 'NOTRE SAVOIR-FAIRE / NOS SERVICES',
    heroA: 'Tout ce dont',
    heroB: 'votre marque a besoin pour',
    heroAccent: 'grandir.',
    intro: 'De la stratégie au design et au développement, nous donnons vie à chaque idée.',
    expertise: 'Nos Expertises',
    countSingle: 'Service',
    countPlural: 'Services',
    discover: 'Découvrir le service',
    empty: 'Aucun service disponible.',
    stepHero: [
      'Idées.',
      'Design.',
      'Création.',
      'Croissance.'
    ],
    steps: [
      [
        'Découvrir',
        'Comprendre vos objectifs et opportunités.'
      ],
      [
        'Concevoir',
        'Transformer les idées en solutions utiles.'
      ],
      [
        'Développer',
        'Créer, tester et lancer votre projet.'
      ],
      [
        'Grandir',
        'Optimiser et développer votre impact.'
      ]
    ],
    ctaBefore: 'Un',
    ctaAccent: 'projet',
    ctaAfter: 'en tête ?',
    ctaDescription: 'Créons quelque chose de remarquable.',
    ctaButton: 'Discutons',
    pageTitle: 'Nos Services',
    untitled: 'Service'
  },

  de: {
    eyebrow: 'WAS WIR TUN / UNSERE LEISTUNGEN',
    heroA: 'Alles, was Ihre',
    heroB: 'Marke zum',
    heroAccent: 'Wachsen braucht.',
    intro: 'Von Strategie und Design bis zu Entwicklung und digitalen Erlebnissen setzen wir Ideen um.',
    expertise: 'Unsere Expertise',
    countSingle: 'Leistung',
    countPlural: 'Leistungen',
    discover: 'Leistung entdecken',
    empty: 'Derzeit sind keine Leistungen verfügbar.',
    stepHero: [
      'Ideen.',
      'Design.',
      'Entwicklung.',
      'Wachstum.'
    ],
    steps: [
      [
        'Entdecken',
        'Ziele und Chancen verstehen.'
      ],
      [
        'Gestalten',
        'Erkenntnisse in Lösungen verwandeln.'
      ],
      [
        'Entwickeln',
        'Umsetzen, testen und starten.'
      ],
      [
        'Wachsen',
        'Optimieren und nachhaltig skalieren.'
      ]
    ],
    ctaBefore: 'Ein',
    ctaAccent: 'Projekt',
    ctaAfter: 'im Kopf?',
    ctaDescription: 'Lassen Sie uns etwas Besonderes schaffen.',
    ctaButton: 'Kontakt',
    pageTitle: 'Unsere Leistungen',
    untitled: 'Leistung'
  },

  es: {
    eyebrow: 'QUÉ HACEMOS / NUESTROS SERVICIOS',
    heroA: 'Todo lo que tu',
    heroB: 'marca necesita para',
    heroAccent: 'crecer.',
    intro: 'De la estrategia y el diseño al desarrollo y las experiencias digitales, damos vida a cada idea.',
    expertise: 'Nuestra Experiencia',
    countSingle: 'Servicio',
    countPlural: 'Servicios',
    discover: 'Explorar servicio',
    empty: 'No hay servicios disponibles.',
    stepHero: [
      'Ideas.',
      'Diseño.',
      'Creación.',
      'Crecimiento.'
    ],
    steps: [
      [
        'Descubrir',
        'Entender tus objetivos y oportunidades.'
      ],
      [
        'Diseñar',
        'Convertir ideas en soluciones útiles.'
      ],
      [
        'Construir',
        'Desarrollar, probar y lanzar.'
      ],
      [
        'Crecer',
        'Optimizar y ampliar resultados.'
      ]
    ],
    ctaBefore: '¿Tienes un',
    ctaAccent: 'proyecto',
    ctaAfter: 'en mente?',
    ctaDescription: 'Creemos algo extraordinario.',
    ctaButton: 'Hablemos',
    pageTitle: 'Nuestros Servicios',
    untitled: 'Servicio'
  },

  tr: {
    eyebrow: 'NE YAPIYORUZ / HİZMETLERİMİZ',
    heroA: 'Markanızın',
    heroB: 'büyümesi için',
    heroAccent: 'her şey.',
    intro: 'Strateji ve tasarımdan geliştirmeye ve dijital deneyimlere, her fikri hayata geçiriyoruz.',
    expertise: 'Uzmanlık Alanlarımız',
    countSingle: 'Hizmet',
    countPlural: 'Hizmet',
    discover: 'Hizmeti keşfet',
    empty: 'Şu anda hizmet bulunmuyor.',
    stepHero: [
      'Fikir.',
      'Tasarım.',
      'Üretim.',
      'Büyüme.'
    ],
    steps: [
      [
        'Keşfet',
        'Hedeflerinizi ve fırsatları anlayın.'
      ],
      [
        'Tasarla',
        'Fikirleri anlamlı çözümlere dönüştürün.'
      ],
      [
        'Geliştir',
        'Geliştirin, test edin ve yayına alın.'
      ],
      [
        'Büyüt',
        'Optimize edin ve etkinizi artırın.'
      ]
    ],
    ctaBefore: 'Aklınızda bir',
    ctaAccent: 'proje',
    ctaAfter: 'mi var?',
    ctaDescription: 'Birlikte harika bir şey üretelim.',
    ctaButton: 'Konuşalım',
    pageTitle: 'Hizmetlerimiz',
    untitled: 'Hizmet'
  }
};

// ============================================================
// HELPERS
// ============================================================

function str(value) {
  return typeof value === 'string' ||
    typeof value === 'number'
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

function textOnly(value) {
  const raw = str(value);

  if (!raw) return '';

  const parsed = new DOMParser().parseFromString(
    raw,
    'text/html'
  );

  parsed.querySelectorAll(
    'script, style, template, iframe, object, svg'
  ).forEach(node => node.remove());

  return (parsed.body.textContent || '')
    .replace(/\s+/g, ' ')
    .trim();
}

function brief(value, limit = 154) {
  const characters = Array.from(
    textOnly(value)
  );

  return characters.length > limit
    ? characters
        .slice(0, limit)
        .join('')
        .trimEnd() + '…'
    : characters.join('');
}

// ============================================================
// MULTILINGUAL API FIELDS
// ============================================================

function localized(item, key, lang) {
  if (
    !item ||
    typeof item !== 'object'
  ) {
    return '';
  }

  const translations = item.translations;

  const fromArray = Array.isArray(translations)
    ? translations.find(row =>
        row?.lang === lang ||
        row?.locale === lang
      )?.[key]
    : undefined;

  return [
    item[`${key}_${lang}`],

    Array.isArray(translations)
      ? undefined
      : translations?.[lang]?.[key],

    fromArray,

    item[key],

    item[`${key}_en`]

  ].map(str).find(Boolean) || '';
}

function serviceTitle(service, lang, ui) {
  return textOnly(
    localized(service, 'name', lang) ||
    localized(service, 'title', lang) ||
    ui.untitled
  );
}

function serviceDescription(service, lang) {
  return brief(
    localized(service, 'short_description', lang) ||
    localized(service, 'description', lang),
    154
  );
}

function isActive(service) {
  return ![
    false,
    0,
    '0',
    'false'
  ].includes(service?.is_active);
}

// ============================================================
// SERVICE SLUG
// ============================================================

function serviceHref(service, lang) {
  const slug = str(service?.slug);

  if (
    !slug ||
    slug.includes('/') ||
    slug.includes('\\')
  ) {
    return '';
  }

  return (
    `/${encodeURIComponent(lang)}/` +
    `${SERVICE_DETAILS_SEGMENT}/` +
    encodeURIComponent(slug)
  );
}

// ============================================================
// SERVICE ICONS
// ============================================================

function iconKind(service, lang, index) {
  const raw = [
    serviceTitle(
      service,
      lang,
      COPY[lang] || COPY.en
    ),
    service?.category,
    service?.slug
  ]
    .map(str)
    .join(' ')
    .toLowerCase();

  if (
    /\b(ui|ux)\b|interface|experience|رابط کاربری|تجربه کاربری/i.test(raw)
  ) {
    return 'layers';
  }

  if (
    /prompt|\bai\b|artificial|هوش مصنوعی|پرامپت|automation/i.test(raw)
  ) {
    return 'chip';
  }

  if (
    /social|instagram|content|سوشیال|شبکه|محتوا/i.test(raw)
  ) {
    return 'megaphone';
  }

  if (
    /brand|identity|graphic|branding|برند|گرافیک/i.test(raw)
  ) {
    return 'tag';
  }

  if (
    /creative|direction|خلاق|استودیو/i.test(raw)
  ) {
    return 'sparkles';
  }

  if (
    /web|site|development|code|وب|سایت|توسعه/i.test(raw)
  ) {
    return 'code';
  }

  return [
    'code',
    'layers',
    'tag',
    'megaphone',
    'chip',
    'sparkles'
  ][index % 6];
}

function iconSvg(kind) {
  const paths = {
    code: `
      <rect x="3" y="4" width="26" height="24" rx="4"/>
      <path d="M3 11h26M12 16l-4 4 4 4m8-8 4 4-4 4M18 15l-3 10"/>
    `,

    layers: `
      <path d="m16 3 13 8-13 8-13-8 13-8Zm-13 14 13 8 13-8M3 23l13 8 13-8"/>
    `,

    tag: `
      <path d="M16 4H7a3 3 0 0 0-3 3v9a3 3 0 0 0 .9 2.1L17 30l13-13L18 5a3 3 0 0 0-2-.9Z"/>
      <circle cx="10.5" cy="10.5" r="2"/>
    `,

    megaphone: `
      <path d="M4 14h7l16-8v20l-16-8H4a3 3 0 0 1-3-3v2a3 3 0 0 1 3-3Z"/>
      <path d="m11 20 3 10h5l-4-12M29 12l3-2M29 20l3 2"/>
    `,

    chip: `
      <rect x="7" y="7" width="18" height="18" rx="3"/>
      <path d="M12 12h8v8h-8zM12 2v5m8-5v5M12 25v5m8-5v5M2 12h5m-5 8h5m18-8h5m-5 8h5"/>
    `,

    sparkles: `
      <path d="m12 3 2.5 7.5L22 13l-7.5 2.5L12 23l-2.5-7.5L2 13l7.5-2.5L12 3Zm16 14 1.5 4.5L34 23l-4.5 1.5L28 29l-1.5-4.5L22 23l4.5-1.5L28 17Z"/>
    `
  };

  return `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 36 36"
      fill="none"
      stroke="currentColor"
      stroke-width="1.65"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      ${paths[kind] || paths.sparkles}
    </svg>
  `;
}

function serviceIconUrl(service) {
  const raw =
    service?.images?.icon ??
    service?.icon_url ??
    service?.icon ??
    service?.images?.image ??
    service?.image ??
    null;

  const value = typeof raw === 'string'
    ? raw
    : raw && typeof raw === 'object'
      ? raw.url ?? raw.path
      : null;

  return str(value)
    ? resolveMediaUrl(value) || ''
    : '';
}

// ============================================================
// HERO
// ============================================================

function renderMaze() {
  return `
    <div class="mzsv-hero-art" aria-hidden="true">

      <svg
        viewBox="0 0 320 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="mzsv-maze"
      >

        <circle
          cx="160"
          cy="160"
          r="149"
          stroke="currentColor"
          stroke-width="1.3"
          stroke-dasharray="125 16 140 26 118 19 300 30"
        />

        <circle
          cx="160"
          cy="160"
          r="122"
          stroke="currentColor"
          stroke-width="1.7"
          stroke-dasharray="115 22 117 22 104 25 305 29"
          transform="rotate(18 160 160)"
        />

        <circle
          cx="160"
          cy="160"
          r="94"
          stroke="currentColor"
          stroke-width="2"
          stroke-dasharray="94 17 86 20 85 18 212 25"
          transform="rotate(-28 160 160)"
        />

        <circle
          cx="160"
          cy="160"
          r="65"
          stroke="currentColor"
          stroke-width="2.1"
          stroke-dasharray="58 18 52 19 72 22 145 23"
          transform="rotate(35 160 160)"
        />

        <circle
          cx="160"
          cy="160"
          r="38"
          stroke="currentColor"
          stroke-width="2.3"
          stroke-dasharray="53 16 59 18 80 13"
          transform="rotate(30 160 160)"
        />

        <path
          d="m133 173 15-26 12 19 12-19 15 26"
          stroke="currentColor"
          stroke-width="8"
          stroke-linecap="round"
          stroke-linejoin="round"
          opacity=".55"
        />

      </svg>

    </div>
  `;
}

function renderHero(ui) {
  return `
    <section class="mzsv-hero">

      <div class="mzsv-container mzsv-hero-layout">

        <div class="mzsv-hero-copy">

          <p class="mzsv-eyebrow">
            <span></span>
            ${esc(ui.eyebrow)}
          </p>

          <h1>
            ${esc(ui.heroA)}
            <br>
            ${esc(ui.heroB)}
            <span>${esc(ui.heroAccent)}</span>
          </h1>

          <p class="mzsv-hero-description">
            ${esc(ui.intro)}
          </p>

        </div>

        ${renderMaze()}

      </div>

    </section>
  `;
}

// ============================================================
// SERVICE CARD
// ============================================================

function renderServiceCard(service, index, lang, ui) {
  const name = esc(serviceTitle(service, lang, ui));
  const description = esc(
    serviceDescription(service, lang)
  );

  const kind = iconKind(service, lang, index);
  const iconUrl = serviceIconUrl(service);

  const href = serviceHref(service, lang);

  const number = String(index + 1).padStart(
    2,
    '0'
  );

  const wrapperStart = href
    ? `
      <a
        class="mzsv-card-inner service-card-inner"
        href="${esc(href)}"
        aria-label="${name}"
      >
    `
    : `
      <div class="mzsv-card-inner service-card-inner">
    `;

  const wrapperEnd = href
    ? '</a>'
    : '</div>';

  return `
    <article
      class="mzsv-card service-card-item ${
        index === 0 ? 'mzsv-card-featured' : ''
      }"
    >

      ${wrapperStart}

        <div class="mzsv-card-top">

          <div class="mzsv-card-icon service-card-icon">

            ${iconSvg(kind)}

            ${
              iconUrl
                ? `
                  <img
                    class="mzsv-card-icon-image"
                    src="${esc(iconUrl)}"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  >
                `
                : ''
            }

          </div>

          <span class="mzsv-card-number">
            ${number}
          </span>

        </div>

        <div class="mzsv-card-bottom">

          <h3 class="mzsv-card-title service-card-title">
            ${name}
          </h3>

          ${
            description
              ? `
                <p class="mzsv-card-description service-card-description">
                  ${description}
                </p>
              `
              : ''
          }

          ${
            href
              ? `
                <span class="mzsv-card-link service-card-link">

                  ${esc(ui.discover)}

                  <span aria-hidden="true">↗</span>

                </span>
              `
              : ''
          }

        </div>

      ${wrapperEnd}

    </article>
  `;
}

// ============================================================
// SERVICE GRID
// ============================================================

function renderServicesList(services, lang, ui) {
  return `
    <section class="mzsv-expertise services-section">

      <div class="mzsv-container">

        <div class="mzsv-section-heading">

          <h2>${esc(ui.expertise)}</h2>

          <span class="mzsv-count">

            ${services.length}

            ${
              esc(
                services.length === 1
                  ? ui.countSingle
                  : ui.countPlural
              )
            }

          </span>

        </div>

        <div class="mzsv-grid services-grid">

          ${
            services.length
              ? services.map(
                  (service, index) =>
                    renderServiceCard(
                      service,
                      index,
                      lang,
                      ui
                    )
                ).join('')

              : `
                <p class="mzsv-empty">
                  ${esc(ui.empty)}
                </p>
              `
          }

        </div>

      </div>

    </section>
  `;
}

// ============================================================
// PROCESS SECTION
// ============================================================

function renderProcess(ui) {
  return `
    <section
      class="mzsv-process-section"
      aria-label="${esc(ui.stepHero.join(' '))}"
    >

      <div class="mzsv-container">

        <div class="mzsv-process-card">

          <h2 class="mzsv-process-headline">

            ${
              ui.stepHero.map((part, index) =>
                index === 3
                  ? `<span>${esc(part)}</span>`
                  : esc(part)
              ).join(' ')
            }

          </h2>

          <div class="mzsv-process-steps">

            ${
              ui.steps.map(
                ([title, description], index) => `
                  <div class="mzsv-process-step">

                    <div class="mzsv-process-step-top">

                      <span class="mzsv-step-number">
                        ${String(index + 1).padStart(2, '0')}
                      </span>

                      ${
                        index < ui.steps.length - 1
                          ? `
                            <span
                              class="mzsv-step-arrow"
                              aria-hidden="true"
                            >
                              ›
                            </span>
                          `
                          : ''
                      }

                    </div>

                    <h3>${esc(title)}</h3>

                    <p>${esc(description)}</p>

                  </div>
                `
              ).join('')
            }

          </div>

        </div>

      </div>

    </section>
  `;
}

// ============================================================
// CONTACT CTA
// ============================================================

function renderCTA(lang, ui) {
  return `
    <section class="mzsv-cta-section">

      <div class="mzsv-container">

        <div class="mzsv-cta">

          <div class="mzsv-cta-copy">

            <h2>
              ${esc(ui.ctaBefore)}
              <span>${esc(ui.ctaAccent)}</span>
              ${esc(ui.ctaAfter)}
            </h2>

            <p>${esc(ui.ctaDescription)}</p>

          </div>

          <a
            class="mzsv-cta-button"
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
    .querySelectorAll('.mzsv-card-icon-image')
    .forEach(image => {

      image.addEventListener(
        'error',
        () => {
          // The SVG fallback remains behind the image.
          image.remove();
        },
        { once: true }
      );

    });
}

// ============================================================
// MAIN RENDER
// ============================================================

export async function renderServices() {
  const app = document.getElementById('app');

  if (!app) {
    console.error(
      '[Services] #app element not found.'
    );

    return;
  }

  const lang = i18n.getCurrentLanguage();
  const ui = COPY[lang] || COPY.en;

  const path = window.location.pathname;
  const search = window.location.search;

  const requestId = ++renderRequestId;

  let services = [];

  try {
    const result = await getServices();

    if (Array.isArray(result)) {
      services = result.filter(item =>
        item &&
        typeof item === 'object' &&
        !Array.isArray(item) &&
        isActive(item)
      );

    } else {
      console.warn(
        '[Services] Unexpected API response:',
        result
      );
    }

  } catch (error) {
    console.error(
      '[Services] Failed to load services:',
      error
    );
  }

  // Ignore outdated SPA renders.
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
      class="mz-services mzsv-page"
      id="mazoryaServices"
      dir="${
        ['fa', 'ar'].includes(lang)
          ? 'rtl'
          : 'ltr'
      }"
    >

      ${renderHero(ui)}

      ${renderServicesList(
        services,
        lang,
        ui
      )}

      ${renderProcess(ui)}

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
