
/**
 * Mazorya Group - Home Page
 * File: pages/home.js
 *
 * EXON 3D Hero Integration
 * Vanilla JS + Vite + Laravel API
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
  getBlogs
} from '../core/api.js';
 


// ============================================================
// CONFIG
// ============================================================

const DEFAULT_IMAGE = '/assets/img/default-project.jpg';

const API_BASE =
  import.meta.env?.VITE_API_URL ||
  'https://api.mazoryagroup.com/api';

let activeHomeCleanup = null;
let homeRequestId = 0;

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
    translated == null ||
    translated === '' ||
    translated === key
  ) {
    return fallback || key;
  }

  return String(translated);
}

function safeImageUrl(value, fallback = DEFAULT_IMAGE) {
  if (
    typeof value !== 'string' ||
    !value.trim()
  ) {
    return fallback;
  }

  const raw = value.trim();

  if (
    raw.startsWith('//') ||
    (
      /^[a-z][a-z\d+.-]*:/i.test(raw) &&
      !/^https?:\/\//i.test(raw)
    )
  ) {
    return fallback;
  }

  try {
    const backendOrigin = new URL(
      API_BASE,
      window.location.origin
    ).origin;

    let url;

    if (/^https?:\/\//i.test(raw)) {
      url = new URL(raw);
    } else if (/^\/?assets\//i.test(raw)) {
      url = new URL(
        '/' + raw.replace(/^\/+/, ''),
        window.location.origin
      );
    } else {
      url = new URL(
        '/' + raw.replace(/^\/+/, ''),
        backendOrigin
      );
    }

    return ['http:', 'https:'].includes(url.protocol)
      ? escapeHtml(url.href)
      : fallback;
  } catch {
    return fallback;
  }
}

function encodePath(value) {
  return encodeURIComponent(String(value ?? ''));
}

// ============================================================
// 1. EXON HERO SECTION
// ============================================================

function renderHeroSection(currentLang) {
  const title = escapeHtml(
    tr('hero_title', 'Build, Design & Scale')
  );

  const accent = escapeHtml(
    tr('hero_accent', 'Mazorya Group')
  );

  const subtitle = escapeHtml(
    tr(
      'hero_subtitle',
      'We create digital experiences that help ambitious brands grow.'
    )
  );

  const badge = escapeHtml(
    tr(
      'hero_badge',
      'MAZORYA GROUP · CREATIVE STUDIO'
    )
  );

  return `
    <div class="banner-main-section exon-hero-shell">

      <div class="banner-inner-wrap exon-hero-inner">

        <section
          class="hero exon-hero"
          id="mazoryaExonHero"
        >

          <!-- 3D BACKGROUND -->

          <div
            class="exon-hero-scene"
            aria-hidden="true"
          >

            <div class="exon-hero-grid-fallback"></div>

            <div
              class="exon-hero-grid-stage"
              id="exonHeroGridStage"
            ></div>

            <div class="exon-hero-scrim"></div>

          </div>

          <!-- HERO CONTENT -->

          <div class="exon-hero-main">

            <div class="exon-hero-content">

              <!-- BADGE -->

              <a
                href="/${currentLang}/about"
                class="exon-hero-badge exon-reveal"
              >

                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  aria-hidden="true"
                >
                  <path
                    d="m12 3 1.8 6.2L20 11l-6.2 1.8L12 19l-1.8-6.2L4 11l6.2-1.8L12 3Z"
                  />
                  <path
                    d="m19 17 .7 2.3L22 20l-2.3.7L19 23l-.7-2.3L16 20l2.3-.7L19 17Z"
                  />
                </svg>

                <span>${badge}</span>

              </a>

              <!-- HEADING -->

              <h1 class="exon-hero-heading exon-reveal">

                <span class="exon-hero-title">
                  ${title}
                </span>

                <span class="exon-hero-gradient">
                  ${accent}
                </span>

              </h1>

              <!-- DESCRIPTION -->

              <p class="exon-hero-description exon-reveal">
                ${subtitle}
              </p>

              <!-- BUTTONS -->

              <div class="exon-hero-actions exon-reveal">

                <a
                  href="/${currentLang}/services"
                  class="exon-hero-button exon-hero-button-primary exon-magnetic"
                >
                  ${escapeHtml(
                    tr('hero_btn', 'Explore Services')
                  )}
                </a>

                <a
                  href="/${currentLang}/contact"
                  class="exon-hero-button exon-hero-button-glass exon-magnetic"
                >
                  ${escapeHtml(
                    tr('hero_secondary_btn', "Let's Talk")
                  )}
                </a>

              </div>

            </div>

          </div>

        </section>

      </div>

    </div>
  `;
}

// ============================================================
// 2. EXON THREE.JS BACKGROUND
// ============================================================

const EXON_GRID_URL =
  'https://cdn.jsdelivr.net/npm/threejs-components@0.0.16/build/backgrounds/grid1.cdn.min.js';

const EXON_THREE_URL =
  'https://cdn.jsdelivr.net/npm/three@0.170.0/+esm';

const EXON_GRID_OPTIONS = {
  type: 'circle',

  colors: [
    0x222222,
    0x222222
  ],

  light1Color: 0xffffff,
  light1Intensity: 10000,
  light1PositionZ: 50,

  light2Color: 0xff6b6b,
  light2Intensity: 15000,
  light2PositionZ: -20,

  depthScale: 3,

  materialParams: {
    metalness: 0.5,
    roughness: 0.5,
    clearcoat: 1,
    clearcoatRoughness: 0.2
  }
};

// Reuse the same canvas across SPA visits.

let sharedExonStage = null;

// ============================================================
// CREATE 3D STAGE
// ============================================================

function createExonStage() {
  const canvas = document.createElement('canvas');

  canvas.className = 'exon-hero-canvas';

  const stage = {
    canvas,
    host: null,
    instance: null,
    loading: false,
    unavailable: false,
    ready: false
  };

  canvas.addEventListener(
    'webglcontextlost',
    () => {
      stage.ready = false;

      stage.host?.removeAttribute(
        'data-grid-ready'
      );
    }
  );

  return stage;
}

// ============================================================
// ROUND GRID GEOMETRY
// ============================================================

function roundExonTiles(instance, three) {
  const { grid } = instance;

  const radius = grid.config.radius * 0.8;
  const height = grid.config.radius * 5;
  const bevel = radius * 0.125;

  const profile = [
    new three.Vector2(radius, -height)
  ];

  for (let step = 0; step <= 5; step++) {
    const angle =
      (step / 5) * (Math.PI / 2);

    profile.push(
      new three.Vector2(
        radius - bevel +
          Math.cos(angle) * bevel,

        -bevel +
          Math.sin(angle) * bevel
      )
    );
  }

  profile.push(
    new three.Vector2(0, 0)
  );

  const geometry = new three.LatheGeometry(
    profile,
    32
  );

  geometry.rotateX(Math.PI / 2);

  grid.geometry.dispose();

  grid.geometry = geometry;
}

// ============================================================
// LOAD EXON STAGE
// ============================================================

async function loadExonStage(stage) {
  if (
    stage.instance ||
    stage.loading ||
    stage.unavailable
  ) {
    return;
  }

  stage.loading = true;

  try {
    const [gridModule, three] = await Promise.all([
      import(
        /* @vite-ignore */
        EXON_GRID_URL
      ),

      import(
        /* @vite-ignore */
        EXON_THREE_URL
      )
    ]);

    if (
      !stage.canvas.isConnected ||
      !stage.host
    ) {
      return;
    }

    const instance = gridModule.default(
      stage.canvas,
      EXON_GRID_OPTIONS
    );

    stage.instance = instance;

    instance.three.scene.background =
      new three.Color('#0a0a0a');

    instance.three.maxPixelRatio = 1.5;

    roundExonTiles(instance, three);

    instance.three.resize();

    instance.three.onAfterRender = () => {
      const gl = instance.three.renderer.getContext();

      if (
        !stage.ready &&
        !gl.isContextLost()
      ) {
        stage.ready = true;

        stage.host?.setAttribute(
          'data-grid-ready',
          ''
        );
      }
    };
  } catch (error) {
    stage.unavailable = true;

    console.warn(
      '[Home] Exon 3D unavailable. CSS fallback is active.',
      error
    );
  } finally {
    stage.loading = false;
  }
}

// ============================================================
// INITIALIZE EXON HERO
// ============================================================

function initExonHero() {
  const hero = document.getElementById(
    'mazoryaExonHero'
  );

  const host = hero?.querySelector(
    '#exonHeroGridStage'
  );

  if (!hero || !host) {
    return () => {};
  }

  const controller = new AbortController();
  const signal = controller.signal;

  const motionQuery = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  );

  let disposed = false;

  // ----------------------------------------------------------
  // DETACH GRID
  // ----------------------------------------------------------

  function detachGrid() {
    const stage = sharedExonStage;

    if (
      !stage ||
      stage.host !== host
    ) {
      return;
    }

    stage.host = null;
    stage.canvas.remove();

    host.removeAttribute(
      'data-grid-ready'
    );
  }

  // ----------------------------------------------------------
  // SYNC GRID
  // ----------------------------------------------------------

  function syncGrid() {
    if (disposed) return;

    if (motionQuery.matches) {
      detachGrid();
      return;
    }

    const stage = sharedExonStage ??=
      createExonStage();

    stage.host?.removeAttribute(
      'data-grid-ready'
    );

    stage.host = host;

    host.append(stage.canvas);

    if (stage.ready) {
      host.setAttribute(
        'data-grid-ready',
        ''
      );
    }

    stage.instance?.three.resize();

    void loadExonStage(stage);
  }

  syncGrid();

  motionQuery.addEventListener(
    'change',
    syncGrid,
    { signal }
  );

  // ----------------------------------------------------------
  // MAGNETIC BUTTONS
  // ----------------------------------------------------------

  const magnets = [
    ...hero.querySelectorAll('.exon-magnetic')
  ];

  magnets.forEach(button => {
    button.addEventListener(
      'pointermove',
      event => {
        if (
          motionQuery.matches ||
          event.pointerType !== 'mouse'
        ) {
          return;
        }

        const rect =
          button.getBoundingClientRect();

        const x = (
          (
            (event.clientX - rect.left) /
            Math.max(rect.width, 1)
          ) * 2 - 1
        ) * 10;

        const y = (
          (
            (event.clientY - rect.top) /
            Math.max(rect.height, 1)
          ) * 2 - 1
        ) * 10;

        button.style.transform =
          `translate3d(${x}px, ${y}px, 0)`;
      },
      { signal }
    );

    const reset = () => {
      button.style.transform = '';
    };

    button.addEventListener(
      'pointerleave',
      reset,
      { signal }
    );

    button.addEventListener(
      'pointercancel',
      reset,
      { signal }
    );
  });

  // ----------------------------------------------------------
  // ENTRANCE ANIMATION
  // ----------------------------------------------------------

  if (!motionQuery.matches) {
    hero.classList.add(
      'exon-hero-animate'
    );
  }

  // ----------------------------------------------------------
  // CLEANUP
  // ----------------------------------------------------------

  return () => {
    if (disposed) return;

    disposed = true;

    controller.abort();

    detachGrid();

    magnets.forEach(button => {
      button.style.transform = '';
    });
  };
}

// ============================================================
// 3. CLIENT SECTION
// ============================================================

function renderClientSection() {
  return `
    <section class="client-section">

      <div class="w-layout-blockcontainer container-large w-container">

        <div class="client-text-wrap">

          <p class="client-text">
            ${escapeHtml(tr(
              'client_text',
              "Our teams are purpose-built to support every stage of your brand's journey. From strategy to design and content, we create meaningful work that resonates with your audience and drives your business forward."
            ))}
          </p>

        </div>

      </div>

    </section>
  `;
}

// ============================================================
// 4. FEATURE SECTION
// ============================================================

function renderFeatureSection() {
  const features = [
    {
      title: tr(
        'feature_card1_title',
        'Brand Strategy'
      ),
      text: tr(
        'feature_card1_content',
        "We craft tailored digital strategies aligned with your brand's goals, leveraging research and insights to create impactful solutions that drive growth and engagement."
      ),
      icon: '/assets/img/feature-icon-01.svg'
    },
    {
      title: tr(
        'feature_card2_title',
        'Creativity & Design'
      ),
      text: tr(
        'feature_card2_content',
        'We deliver innovative design and content strategies, bringing your brand to life across social media, advertising channels, and all digital touchpoints.'
      ),
      icon: '/assets/img/feature-icon-02.svg'
    },
    {
      title: tr(
        'feature_card3_title',
        'Analytics & Optimization'
      ),
      text: tr(
        'feature_card3_content',
        'We monitor and analyze key metrics, optimizing campaigns to maximize client success and enhance ROI across all brand initiatives.'
      ),
      icon: '/assets/img/feature-icon-03.svg'
    }
  ];

  const cards = features.map(feature => `
    <div class="feature-card">

      <div class="feature-icon-wrap">

        <img
          src="${feature.icon}"
          alt=""
          loading="lazy"
        />

      </div>

      <h2 class="feature-card-title">
        ${escapeHtml(feature.title)}
      </h2>

      <p class="feature-card-content">
        ${escapeHtml(feature.text)}
      </p>

      <div class="feature-pattern-wrap">

        <img
          src="/assets/img/feature-pattern.svg"
          alt=""
          loading="lazy"
        />

      </div>

    </div>
  `).join('');

  return `
    <section class="feature-section">

      <div class="container-regular">

        <div class="feature-area">
          ${cards}
        </div>

      </div>

    </section>
  `;
}

// ============================================================
// 5. COUNT SECTION
// ============================================================

function renderCountSection(currentLang) {
  const countItems = [
    {
      number: '100+',
      text: tr(
        'global_clients',
        'Global Clientele'
      ),
      icon: '/assets/img/count-icon-01.svg'
    },
    {
      number: '50+',
      text: tr(
        'honor_highlight',
        'Honor Highlight'
      ),
      icon: '/assets/img/count-icon-02.svg'
    },
    {
      number: '200+',
      text: tr(
        'projects_done',
        'Project done'
      ),
      icon: '/assets/img/count-icon-03.svg'
    },
    {
      number: '15+',
      text: tr(
        'business_expertise',
        'Business Expertise'
      ),
      icon: '/assets/img/count-icon-04.svg'
    }
  ];

  return `
    <section class="count-section">

      <div class="w-layout-blockcontainer container-regular w-container">

        <div class="w-layout-grid count-grid">

          <div>

            <div class="count-title-wrap">

              <h2 class="section-title">
                ${escapeHtml(tr(
                  'count_title',
                  'Digital Success & Delivery'
                ))}
              </h2>

            </div>

            <p class="count-content">
              ${escapeHtml(tr(
                'count_content',
                'Our goal is to help clients succeed in the digital landscape through creative strategies and effective execution, delivering measurable results for their brand.'
              ))}
            </p>

            <div class="count-button-wrap">

              <a
                href="/${currentLang}/about"
                class="primary-button"
                data-route="about"
              >
                ${escapeHtml(
                  tr('see_more', 'See More')
                )}
              </a>

            </div>

          </div>

          <div class="count-area">

            <div class="count-wrap">

              ${renderCountItem(countItems[0])}

              ${renderCountItem(countItems[1])}

            </div>

            <div class="count-wrap">

              ${renderCountItem(countItems[2])}

              ${renderCountItem(countItems[3])}

            </div>

          </div>

        </div>

      </div>

    </section>
  `;
}

function renderCountItem(item) {
  return `
    <div class="count-item-wrap">

      <div class="count-icon-wrap">

        <img
          src="${item.icon}"
          alt=""
          loading="lazy"
        />

      </div>

      <div>

        <h2 class="count-title">
          ${escapeHtml(item.number)}
        </h2>

        <p class="count-text">
          ${escapeHtml(item.text)}
        </p>

      </div>

    </div>
  `;
}

// ============================================================
// 6. SERVICES SECTION
// ============================================================

function renderServicesSection(currentLang) {
  const services = [
    {
      title: tr(
        'home_service1_title',
        'Web Solutions'
      ),
      desc: tr(
        'home_service1_desc',
        'We design and develop visually appealing, intuitive websites that reflect your brand identity, using cutting-edge tools and modern development practices.'
      ),
      icon: '/assets/img/service-icon-01.svg'
    },
    {
      title: tr(
        'home_service2_title',
        'Social Media Management'
      ),
      desc: tr(
        'home_service2_desc',
        'We elevate your brand across social media platforms with targeted content strategies designed to engage audiences and drive meaningful conversions.'
      ),
      icon: '/assets/img/service-icon-02.svg'
    },
    {
      title: tr(
        'home_service3_title',
        'PPC Advertising'
      ),
      desc: tr(
        'home_service3_desc',
        'We maximize ROI through targeted ads on search engines and social media, continuously optimizing campaigns to reach your audience effectively and efficiently.'
      ),
      icon: '/assets/img/service-icon-03.svg'
    },
    {
      title: tr(
        'home_service4_title',
        'Analytics & Insights'
      ),
      desc: tr(
        'home_service4_desc',
        'We leverage advanced analytics to gain actionable insights for digital marketing. By tracking metrics, measuring campaigns, and optimizing strategies, we help your brand achieve measurable growth.'
      ),
      icon: '/assets/img/service-icon-04.svg'
    }
  ];

  const serviceCards = services.map(service => `
    <div class="service-post-collection-item w-dyn-item w-col w-col-6">

      <div class="service-post-card">

        <div class="service-top-wrap">

          <a
            href="/${currentLang}/services"
            class="service-post-icon-wrap w-inline-block"
            data-route="services"
          >

            <img
              src="${service.icon}"
              loading="lazy"
              alt=""
              class="service-post-icon"
            />

          </a>

          <div class="service-card-title-wrap">

            <a
              href="/${currentLang}/services"
              class="service-card-title"
              data-route="services"
            >
              ${escapeHtml(service.title)}
            </a>

            <div class="service-card-title-line-wrap"></div>

          </div>

        </div>

        <p class="service-card-content">
          ${escapeHtml(service.desc)}
        </p>

      </div>

    </div>
  `).join('');

  return `
    <section class="service-post-section">

      <div class="w-layout-blockcontainer container-regular w-container">

        <div class="service-title-area">

          <div class="service-post-title-wrap">

            <h2 class="section-title text-white">
              ${escapeHtml(tr(
                'services_title',
                'We offer a wide range of design services.'
              ))}
            </h2>

          </div>

          <div>

            <a
              href="/${currentLang}/services"
              class="secondary-button lite-color-hover w-button"
              data-route="services"
            >
              ${escapeHtml(
                tr('view_more', 'View More')
              )}
            </a>

          </div>

        </div>

        <div class="service-post-card-area">

          <div class="w-dyn-list">

            <div
              role="list"
              class="w-dyn-items w-row"
            >
              ${serviceCards}
            </div>

          </div>

        </div>

      </div>

    </section>
  `;
}

// ============================================================
// 7. PROJECTS SECTION
// ============================================================

function renderProjectsSection(projects, currentLang) {
  const validProjects = Array.isArray(projects)
    ? projects
    : [];

  const heroProjects = validProjects.slice(0, 3);
  const sideProjects = validProjects.slice(3, 6);

  return `
    <section class="project-section">

      <div class="w-layout-blockcontainer container-regular w-container">

        <div class="w-layout-grid project-grid">

          <div>

            <div>

              <h2 class="section-title">
                ${escapeHtml(tr(
                  'projects_title',
                  'Explore our projects'
                ))}
              </h2>

              <div class="section-content-wrap">

                <p>
                  ${escapeHtml(tr(
                    'projects_subtitle',
                    "Our teams are purpose-built around our client's unique needs at every stage of the engagement."
                  ))}
                </p>

              </div>

              <div class="project-button-wrap">

                <a
                  href="/${currentLang}/projects"
                  class="primary-button"
                  data-route="projects"
                >
                  ${escapeHtml(tr(
                    'view_projects',
                    'View Projects'
                  ))}
                </a>

              </div>

            </div>

            <div>

              <div
                class="projects-list"
                id="projects-home-list-1"
              >
                ${renderProjectCards(
                  heroProjects,
                  currentLang
                )}
              </div>

            </div>

          </div>

          <div>

            <div
              class="projects-list"
              id="projects-home-list-2"
            >
              ${renderProjectCards(
                sideProjects,
                currentLang
              )}
            </div>

          </div>

        </div>

      </div>

    </section>
  `;
}

// ============================================================
// PROJECT CARDS
// ============================================================

function renderProjectCards(projects, lang) {
  if (
    !Array.isArray(projects) ||
    !projects.length
  ) {
    return '';
  }

  return projects.map(project => {
    const slug = encodePath(
      project.slug || project.id
    );

    const href = `/${lang}/project/${slug}`;

    const title =
      project.project_name ||
      project.name ||
      project.title ||
      'Project';

    const image = safeImageUrl(
      project.images?.image ||
      project.images?.image_1 ||
      project.cover_url ||
      project.image_url ||
      project.image
    );

    return `
      <div
        role="listitem"
        class="project-collection-item w-dyn-item w-col w-col-6"
      >

        <div class="project-card-wrap">

          <div class="project-image-area">

            <a
              href="${href}"
              class="project-image-wrap w-inline-block"
            >

              <img
                src="${image}"
                loading="lazy"
                alt="${escapeHtml(title)}"
                class="project-image"
              />

            </a>

            <a
              href="${href}"
              class="project-overlay-wrap w-inline-block"
              aria-label="${escapeHtml(title)}"
            >

              <div class="project-arrow-icon-wrap">

                <img
                  src="/assets/img/project-arrow.svg"
                  class="project-arrow-icon"
                  alt=""
                />

              </div>

            </a>

          </div>

          <div class="project-title-wrap">

            <a
              href="${href}"
              class="project-title"
            >
              ${escapeHtml(title)}
            </a>

          </div>

        </div>

      </div>
    `;
  }).join('');
}

// ============================================================
// 8. FAQ SECTION
// ============================================================

function renderFAQSection() {
  const faqs = [
    {
      q: tr('faq_q1'),
      a: tr('faq_a1')
    },
    {
      q: tr('faq_q2'),
      a: tr('faq_a2')
    },
    {
      q: tr('faq_q3'),
      a: tr('faq_a3')
    },
    {
      q: tr('faq_q4'),
      a: tr('faq_a4')
    },
    {
      q: tr('faq_q5'),
      a: tr('faq_a5')
    }
  ];

  const items = faqs.map((faq, index) => `
    <div
      data-hover="false"
      data-delay="0"
      class="faq-wrap w-dropdown"
    >

      <div
        class="faq-question-wrap w-dropdown-toggle"
        aria-controls="home-faq-${index}"
        aria-expanded="false"
      >

        <div class="faq-question text-white">
          ${escapeHtml(faq.q)}
        </div>

        <div class="faq-arrow-wrap dark-bg-with-white-border">

          <img
            src="/assets/img/faq-arrow-lite.svg"
            loading="lazy"
            alt=""
            class="faq-arrow-lite"
          />

          <img
            src="/assets/img/faq-arrow-dark.svg"
            loading="lazy"
            alt=""
            class="faq-arrow-dark"
          />

        </div>

      </div>

      <nav
        id="home-faq-${index}"
        class="faq-answer-wrap w-dropdown-list"
        aria-hidden="true"
      >

        <p class="faq-content text-white">
          ${escapeHtml(faq.a)}
        </p>

      </nav>

    </div>
  `).join('');

  return `
    <section class="faq-section home-page">

      <div class="w-layout-blockcontainer container-regular w-container">

        <div class="faq-area">

          <div class="align-center">

            <div class="section-title-wrap large">

              <h2 class="section-title text-white">
                ${escapeHtml(tr(
                  'faq_title',
                  'Frequently asked question'
                ))}
              </h2>

              <div class="section-content-wrap">

                <p class="text-white">
                  ${escapeHtml(tr(
                    'faq_subtitle',
                    "Our teams are purpose-built to support every stage of your brand's journey."
                  ))}
                </p>

              </div>

            </div>

          </div>

          <div class="faq-whole-wrap">
            ${items}
          </div>

        </div>

      </div>

    </section>
  `;
}

// ============================================================
// 9. BLOG SECTION
// ============================================================

function renderBlogSection(blogs, currentLang) {
  const items = Array.isArray(blogs)
    ? blogs
    : [];

  const isRTL =
    currentLang === 'fa' ||
    currentLang === 'ar';

  const title = escapeHtml(tr(
    'blog_title',
    'Read news and articles'
  ));

  const buttonText = escapeHtml(tr(
    'view_articles',
    'View All Articles'
  ));

  const blogContent = items.length
    ? `
      <div class="blog-grid-container ${isRTL ? 'rtl-blog' : ''}">

        <div class="blog-main-card">
          ${renderMainBlog(items[0], currentLang)}
        </div>

        <div class="blog-side-list">
          ${items
            .slice(1, 4)
            .map(blog => renderSideBlog(blog, currentLang))
            .join('')}
        </div>

      </div>
    `
    : `
      <div style="text-align:center;padding:60px;">

        <p>
          ${escapeHtml(tr(
            'no_blog_posts',
            'No blog posts found.'
          ))}
        </p>

      </div>
    `;

  return `
    <section class="article-section">

      <div class="container-regular">

        <div class="article-title-area">

          <div class="article-title-wrap">

            <h2 class="section-title">
              ${title}
            </h2>

          </div>

          <a
            href="/${currentLang}/blog"
            class="primary-button"
            data-route="blog"
          >
            ${buttonText}
          </a>

        </div>

        ${blogContent}

      </div>

    </section>
  `;
}

// ============================================================
// BLOG HELPERS
// ============================================================

function getBlogTitle(blog, lang) {
  if (lang === 'en') {
    return (
      blog.title_en ||
      blog.title ||
      ''
    );
  }

  return (
    blog.title ||
    blog.title_en ||
    ''
  );
}

function getBlogImage(blog) {
  return safeImageUrl(
    blog.images?.image_1 ||
    blog.cover_url ||
    blog.image_url ||
    blog.image
  );
}


function getBlogUrl(blog, lang) {
  const identifier = String(
    blog?.slug ||
    blog?.id ||
    ''
  ).trim();

  if (!identifier) {
    return `/${encodeURIComponent(lang)}/blog`;
  }

  return (
    `/${encodeURIComponent(lang)}/blog-details/` +
    encodeURIComponent(identifier)
  );
}


// ============================================================
// MAIN BLOG CARD
// ============================================================

function renderMainBlog(blog, lang) {
  const title = getBlogTitle(blog, lang);
  const image = getBlogImage(blog);
  const url = getBlogUrl(blog, lang);

  const description =
    blog.excerpt ||
    (
      lang === 'en'
        ? blog.description_en || blog.description
        : blog.description || blog.description_en
    ) ||
    '';

  const plainDescription = String(description)
    .replace(/<[^>]*>/g, '')
    .trim();

  const shortExcerpt =
    plainDescription.length > 120
      ? plainDescription.substring(0, 120) + '...'
      : plainDescription;

  return `
    <div class="blog-main-card-inner">

      <a
        href="${url}"
        class="blog-main-image-link"
      >

        <img
          src="${image}"
          alt="${escapeHtml(title)}"
          class="blog-main-image"
          loading="lazy"
        />

      </a>

      <div class="blog-main-content">

        <h3 class="blog-main-title">

          <a href="${url}">
            ${escapeHtml(title)}
          </a>

        </h3>

        <p class="blog-main-excerpt">
          ${escapeHtml(shortExcerpt)}
        </p>

        <a
          href="${url}"
          class="blog-read-more"
        >
          ${escapeHtml(
            tr('read_more', 'Read More')
          )}
          →
        </a>

      </div>

    </div>
  `;
}

// ============================================================
// SIDE BLOG CARD
// ============================================================

function renderSideBlog(blog, lang) {
  const title = getBlogTitle(blog, lang);
  const image = getBlogImage(blog);
  const url = getBlogUrl(blog, lang);

  return `
    <div class="blog-side-item">

      <a
        href="${url}"
        class="blog-side-image-link"
      >

        <img
          src="${image}"
          alt="${escapeHtml(title)}"
          class="blog-side-image"
          loading="lazy"
        />

      </a>

      <div class="blog-side-content">

        <h4 class="blog-side-title">

          <a href="${url}">
            ${escapeHtml(title)}
          </a>

        </h4>

      </div>

    </div>
  `;
}

// ============================================================
// 10. CTA SECTION
// ============================================================

function renderCTASection(currentLang) {
  return `
    <section class="cta-section">

      <div class="w-layout-blockcontainer container-regular w-container">

        <div class="cta-image-wrap">

          <img
            src="/assets/img/cta-image.jpg"
            loading="lazy"
            alt=""
            class="cta-image"
          />

          <div class="cta-title-area">

            <div class="cta-title-wrap">

              <h2 class="section-title text-white">
                ${escapeHtml(tr(
                  'cta_title',
                  'Are you geared up for the digital shift?'
                ))}
              </h2>

              <div class="cta-button-wrap">

                <a
                  href="/${currentLang}/contact"
                  class="cta-button"
                  data-route="contact"
                >
                  ${escapeHtml(tr(
                    'get_started',
                    'Get Started'
                  ))}
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
// 11. HOME EVENT HANDLERS
// ============================================================

function attachHomeEvents(app) {
  const controller = new AbortController();

  const signal = controller.signal;

  // FAQ events are handled by core/animations.js.
  // Avoid registering duplicate FAQ handlers.

  // ==========================================================
  // NAVIGATION
  // ==========================================================

  app.querySelectorAll('[data-route]').forEach(link => {
    link.addEventListener(
      'click',
      event => {
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

        const href = link.getAttribute('href');

        if (!href) return;

        const target = new URL(
          href,
          window.location.origin
        );

        if (
          target.origin !== window.location.origin
        ) {
          return;
        }

        event.preventDefault();

        window.location.assign(
          target.href
        );
      },
      { signal }
    );
  });

  // ==========================================================
  // SCROLL VISIBILITY
  // ==========================================================

  const scrollElements = app.querySelectorAll(
    '.scroll-animate, [data-w-id]'
  );

  let observer = null;

  if (
    typeof IntersectionObserver !== 'undefined' &&
    scrollElements.length
  ) {
    observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add(
            'is-visible'
          );

          observer.unobserve(
            entry.target
          );
        });
      },
      {
        threshold: 0.4
      }
    );

    scrollElements.forEach(element => {
      observer.observe(element);
    });
  } else {
    scrollElements.forEach(element => {
      element.classList.add('is-visible');
    });
  }

  // ==========================================================
  // CLEANUP EVENTS
  // ==========================================================

  return () => {
    controller.abort();
    observer?.disconnect();
  };
}

// ============================================================
// 12. MAIN HOME RENDER
// ============================================================

export async function renderHome() {
  const app = document.getElementById('app');

  if (!app) {
    console.error(
      '[Home] #app element not found.'
    );
    return;
  }

  // ==========================================================
  // CLEAN UP OLD HOME
  // ==========================================================

  if (activeHomeCleanup) {
    activeHomeCleanup();
    activeHomeCleanup = null;
  }

  const currentLang = i18n.getCurrentLanguage();
  const initialPath = window.location.pathname;

  const requestId = ++homeRequestId;

  // ==========================================================
  // FETCH API DATA
  // ==========================================================

  const [projectsResult, blogsResult] =
  await Promise.allSettled([
    getProjects(),
    getBlogs(4)
  ]);

  
const projects =
  projectsResult.status === 'fulfilled' &&
  Array.isArray(projectsResult.value)
    ? projectsResult.value
        .filter(project => {
          const isMarked = project?.is_marked;

          return (
            isMarked === true ||
            isMarked === 1 ||
            isMarked === '1'
          );
        })
        .slice(0, 6)
    : [];


  const blogs =
    blogsResult.status === 'fulfilled' &&
    Array.isArray(blogsResult.value)
      ? blogsResult.value
      : [];

  // ==========================================================
  // PREVENT STALE RENDER
  // ==========================================================

  if (
    requestId !== homeRequestId ||
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

  <main class="mz-home" id="mazoryaHome">
    ${renderHeroSection(currentLang)}
    ${renderClientSection()}
    ${renderFeatureSection()}
    ${renderCountSection(currentLang)}
    ${renderServicesSection(currentLang)}
    ${renderProjectsSection(projects, currentLang)}
    ${renderFAQSection()}
    ${renderBlogSection(blogs, currentLang)}
    ${renderCTASection(currentLang)}
  </main>

  ${renderFooter()}
`;


  // ==========================================================
  // COMPONENT EVENTS
  // ==========================================================

  attachHeaderEvents();
  attachFooterEvents();

  const cleanupHomeEvents = attachHomeEvents(app);

  const cleanupExonHero = initExonHero();

  // ==========================================================
  // HOME CLEANUP
  // ==========================================================

  const homeHero = app.querySelector(
    '#mazoryaExonHero'
  );

  let mutationObserver = null;
  let disposed = false;

  const cleanup = () => {
    if (disposed) return;

    disposed = true;

    mutationObserver?.disconnect();

    cleanupHomeEvents();
    cleanupExonHero();

    if (activeHomeCleanup === cleanup) {
      activeHomeCleanup = null;
    }
  };

  activeHomeCleanup = cleanup;

  // Watch for SPA navigation removing the Home hero.
  if (
    typeof MutationObserver !== 'undefined' &&
    homeHero
  ) {
    mutationObserver = new MutationObserver(() => {
      if (!homeHero.isConnected) {
        cleanup();
      }
    });

    mutationObserver.observe(app, {
      childList: true,
      subtree: true
    });
  }

  console.log(
    '[Home] Page rendered with Exon Hero.'
  );
}
