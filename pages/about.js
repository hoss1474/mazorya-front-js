
/**
 * Mazorya Group - About Us Page
 * File: pages/about.js
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
 * Translate with fallback.
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

// ============================================================
// COUNT CARDS
// ============================================================

function renderCountCards() {
  const countItems = [
    {
      number: '100+',
      text: tr('global_clients', 'Global Clients'),
      icon: '/assets/img/count-icon-01.svg'
    },
    {
      number: '50+',
      text: tr('honor_highlight', 'Honorable Mentions'),
      icon: '/assets/img/count-icon-02.svg'
    },
    {
      number: '200+',
      text: tr('projects_done', 'Projects Completed'),
      icon: '/assets/img/count-icon-03.svg'
    },
    {
      number: '15+',
      text: tr('business_expertise', 'Business Expertise'),
      icon: '/assets/img/count-icon-04.svg'
    }
  ];

  return countItems.map(item => `
    <div class="count-card-wrap">

      <div class="count-icon-wrap">
        <img
          src="${item.icon}"
          alt=""
          loading="lazy"
          aria-hidden="true"
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
  `).join('');
}

// ============================================================
// BANNER SECTION
// ============================================================

function renderBannerSection() {
  return `
    <section class="banner-section">

      <div class="w-layout-blockcontainer container-regular w-container">

        <div class="align-center">

          <div class="banner-title-wrap">

            <h1 class="banner-title">
              ${t('about_title', 'About Us')}
            </h1>

            <p>
              ${t(
                'about_subtitle',
                'Discover the story behind Mazorya Group.'
              )}
            </p>

          </div>

        </div>

        <div class="banner-image-wrap">
          <img
            src="/assets/img/about-banner.jpg"
            loading="eager"
            fetchpriority="high"
            decoding="async"
            alt="${t('about_title', 'About Mazorya Group')}"
            class="banner-image"
          />
        </div>

        <div class="count-card-area">
          ${renderCountCards()}
        </div>

      </div>

    </section>
  `;
}

// ============================================================
// MISSION SECTION
// ============================================================

function renderMissionSection(isRTL) {
  const rtlClass = isRTL ? 'rtl-mission' : '';

  const points = [
    tr(
      'mission_point1',
      'Strategies carefully designed to create clear, measurable impact.'
    ),
    tr(
      'mission_point2',
      'Creatively amplify brand story through thoughtful design and content.'
    ),
    tr(
      'mission_point3',
      'Build strong communities through authentic, lasting relationships.'
    )
  ];

  return `
    <div class="w-layout-grid about-intro-top-grid ${rtlClass}">

      <div class="about-intro-image-wrap">
        <img
          src="/assets/img/mission-image.jpg"
          loading="lazy"
          decoding="async"
          alt="${t('mission_title', 'Our Mission')}"
          class="about-intro-image"
        />
      </div>

      <div class="about-intro-content-wrap">

        <div class="about-intro-subtitle">
          ${t('mission_title', 'Mission')}
        </div>

        <h2 class="about-intro-title">
          ${t(
            'mission_heading',
            'Empowering brands, amplifying voices through collaboration.'
          )}
        </h2>

        <p>
          ${t(
            'mission_text',
            'Our goal is to empower businesses of all sizes to succeed by crafting unique digital strategies that connect with audiences, drive meaningful engagement, and foster sustainable growth in the digital landscape.'
          )}
        </p>

        <div class="about-intro-point-area">

          ${points.map(point => `
            <div class="about-intro-point-wrap">

              <div class="about-intro-icon-wrap">
                <img
                  src="/assets/img/about-point-icon.svg"
                  alt=""
                  loading="lazy"
                  aria-hidden="true"
                />
              </div>

              <p>${escapeHtml(point)}</p>

            </div>
          `).join('')}

        </div>

      </div>

    </div>
  `;
}

// ============================================================
// VISION SECTION
// ============================================================

function renderVisionSection(isRTL) {
  const rtlClass = isRTL ? 'rtl-vision' : '';

  const points = [
    tr(
      'vision_point1',
      'Through creativity, we unlock the true potential of brands.'
    ),
    tr(
      'vision_point2',
      'Generate sustainable growth through evidence-based strategies.'
    ),
    tr(
      'vision_point3',
      'Create authentic, lasting connections between brands and their audiences.'
    )
  ];

  return `
    <div class="w-layout-grid about-intro-bottom-grid ${rtlClass}">

      <div class="about-intro-content-wrap">

        <div class="about-intro-subtitle">
          ${t('vision_title', 'Vision')}
        </div>

        <h2 class="about-intro-title">
          ${t(
            'vision_heading',
            'Innovative digital solutions to empower brands.'
          )}
        </h2>

        <p>
          ${t(
            'vision_text',
            'Our goal is to transform digital marketing by helping brands unlock their full potential through creative, data-driven solutions. Staying at the forefront of digital innovation, we continuously adapt to the ever-changing digital landscape.'
          )}
        </p>

        <div class="about-intro-point-area">

          ${points.map(point => `
            <div class="about-intro-point-wrap">

              <div class="about-intro-icon-wrap">
                <img
                  src="/assets/img/about-point-icon.svg"
                  alt=""
                  loading="lazy"
                  aria-hidden="true"
                />
              </div>

              <p>${escapeHtml(point)}</p>

            </div>
          `).join('')}

        </div>

      </div>

      <div class="about-intro-image-wrap">
        <img
          src="/assets/img/vision-image.jpg"
          loading="lazy"
          decoding="async"
          alt="${t('vision_title', 'Our Vision')}"
          class="about-intro-image"
        />
      </div>

    </div>
  `;
}

// ============================================================
// MISSION & VISION CONTAINER
// ============================================================

function renderAboutIntroSection(isRTL) {
  return `
    <section class="about-intro-section">

      <div class="w-layout-blockcontainer container-regular w-container">

        <div class="about-intro-grid-wrap">

          ${renderMissionSection(isRTL)}

          ${renderVisionSection(isRTL)}

        </div>

      </div>

    </section>
  `;
}

// ============================================================
// VALUE CARDS
// ============================================================

function renderValueCards() {
  const values = [
    {
      title: tr('value_creativity', 'Creativity'),
      desc: tr(
        'value_creativity_desc',
        'We implement innovative, cutting-edge digital marketing strategies that help brands stand out.'
      )
    },
    {
      title: tr('value_dedication', 'Dedication'),
      desc: tr(
        'value_dedication_desc',
        "We are committed to achieving your brand's goals with excellence and precision."
      )
    },
    {
      title: tr('value_progress', 'Progress'),
      desc: tr(
        'value_progress_desc',
        'We elevate brands through data-driven strategies and continuous optimization.'
      )
    },
    {
      title: tr('value_collaboration', 'Collaboration'),
      desc: tr(
        'value_collaboration_desc',
        'We unite diverse expertise through a collaborative approach to ensure brand success.'
      )
    },
    {
      title: tr('value_optimism', 'Optimism'),
      desc: tr(
        'value_optimism_desc',
        'We foster creativity and problem-solving through a positive, forward-thinking mindset.'
      )
    },
    {
      title: tr('value_responsibility', 'Responsibility'),
      desc: tr(
        'value_responsibility_desc',
        'We take full ownership, ensuring brand success through high standards and consistent delivery.'
      )
    }
  ];

  return values.map(value => `
    <div class="value-card-wrap">

      

      <h3 class="value-card-title">
        ${escapeHtml(value.title)}
      </h3>

      <p class="value-card-content">
        ${escapeHtml(value.desc)}
      </p>

    </div>
  `).join('');
}

// ============================================================
// VALUES SECTION
// ============================================================

function renderValuesSection() {
  return `
    <section class="value-section">

      <div class="w-layout-blockcontainer container-regular w-container">

        <div class="align-center">

          <div class="section-title-wrap">

            <h2 class="section-title text-white">
              ${t('values_title', 'Our Values')}
            </h2>

            <div class="value-content-wrap">

              <p class="text-white">
                ${t(
                  'values_subtitle',
                  'Creativity and innovation guide us to elevate brands and create real digital impact.'
                )}
              </p>

            </div>

          </div>

          <div class="value-grid-wrap">

            <div class="w-layout-grid value-grid">
              ${renderValueCards()}
            </div>

          </div>

        </div>

      </div>

    </section>
  `;
}

// ============================================================
// HISTORY ITEMS
// ============================================================

function renderHistoryItems() {
  const history = [
    {
      year: '2026',
      title: tr(
        'history_2026_title',
        'Foundation & Brand Identity'
      ),
      desc: tr(
        'history_2026_desc',
        "Creation of Mazorya Group's complete visual identity (logo, colors, typography, slogan). Launch of main website and digital platform. Creation of first campaigns for branding and digital marketing services."
      )
    },
    {
      year: '2027',
      title: tr(
        'history_2027_title',
        'Service Expansion'
      ),
      desc: tr(
        'history_2027_desc',
        'Complete deployment of branding services: logo design, slogans, content creation, website development. Launch of official social media and advertising campaigns.'
      )
    },
    {
      year: '2028',
      title: tr(
        'history_2028_title',
        'Market Growth & Automation'
      ),
      desc: tr(
        'history_2028_desc',
        'Implement data-driven strategies to optimize campaigns. Develop digital automation services (CRM, automated responses).'
      )
    },
    {
      year: '2029',
      title: tr(
        'history_2029_title',
        'Innovation & Technology'
      ),
      desc: tr(
        'history_2029_desc',
        'Introduce innovative digital solutions (AI-driven content, smart campaigns). Develop internal tools for design, management, and client analysis.'
      )
    },
    {
      year: '2030',
      title: tr(
        'history_2030_title',
        'Market Leadership & Community'
      ),
      desc: tr(
        'history_2030_desc',
        'Establish Mazorya Group as a benchmark for brand strategy and digital solutions. Build online community of clients and content creators.'
      )
    }
  ];

  return history.map((item, index) => {
    const title = escapeHtml(item.title);
    const desc = escapeHtml(item.desc);
    const year = escapeHtml(item.year);

    const content = `
      <div class="history-left-wrap">

        <h3 class="history-title">
          ${title}
        </h3>

        <p>${desc}</p>

      </div>
    `;

    const yearBlock = index % 2 === 0
      ? `
        <div class="history-right-wrap">
          <h2 class="section-title">
            ${year}
          </h2>
        </div>
      `
      : `
        <div class="history-right-wrap">
          <div class="history-title-wrap">
            <h2 class="section-title">
              ${year}
            </h2>
          </div>
        </div>
      `;

    // Preserve alternating layout.
    return `
      <div class="history-card-wrap">
        ${
          index % 2 === 0
            ? content + yearBlock
            : yearBlock + content
        }
      </div>
    `;
  }).join('');
}

// ============================================================
// HISTORY SECTION
// ============================================================

function renderHistorySection() {
  const steps = [
    '01',
    '02',
    '03',
    '04',
    '05'
  ];

  return `
    <section class="history-section">

      <div class="w-layout-blockcontainer container-regular w-container">

        <div class="align-center">

          <h2 class="section-title">
            ${t(
              'history_title',
              'Awards & Milestones'
            )}
          </h2>

        </div>

        <div class="history-card-area">

          ${renderHistoryItems()}

          <div class="history-line-wrap">

            ${steps.map(step => `
              <div class="history-step-wrap">
                ${step}
              </div>
            `).join('')}

          </div>

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
                  'Ready for Digital Transition?'
                )}
              </h2>

              <div class="cta-button-wrap">

                <a
                  href="/${currentLang}/contact"
                  class="cta-button"
                  data-route="contact"
                >
                  ${t('get_started', 'Get Started')}
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

export async function renderAbout() {
  const app = document.getElementById('app');

  if (!app) {
    console.error(
      '[About] #app element not found.'
    );
    return;
  }

  const currentLang = i18n.getCurrentLanguage();

  const isRTL =
    currentLang === 'fa' ||
    currentLang === 'ar';

  // Render page.
  
app.innerHTML = `
  ${renderHeader()}

  <main class="mz-about" id="mazoryaAbout">
    ${renderBannerSection()}
    ${renderAboutIntroSection(isRTL)}
    ${renderValuesSection()}
    ${renderHistorySection()}
    ${renderCTASection(currentLang)}
  </main>

  ${renderFooter()}
`;


  // Initialize shared components.
  attachHeaderEvents();
  attachFooterEvents();

  /*
   * Animation initialization is handled by:
   *
   * app.js
   *   -> router.afterRender
   *   -> reinitAnimations()
   *   -> initAboutAnimations()
   *
   * Do not create duplicate IntersectionObservers.
   *
   * Native <a href> navigation is preserved.
   */

  console.log(
    '[About] Page rendered successfully:',
    currentLang
  );
}
