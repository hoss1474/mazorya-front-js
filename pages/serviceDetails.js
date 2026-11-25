/**
 * Mazorya Group — Service Details (Light / Coral)
 * File: pages/serviceDetails.js
 * Keeps the existing Laravel API, SPA Router and shared Header/Footer.
 */

import { i18n } from '../core/i18n.js';
import { renderHeader, attachHeaderEvents } from '../components/header.js';
import { renderFooter, attachFooterEvents } from '../components/footer.js';
import { getServiceBySlug, resolveMediaUrl } from '../core/api.js';
import '../assets/css/serviceDetails.css';

let renderRequestId = 0;

const COPY = {
  en: {
    back: 'Back to Services', home: 'Home', services: 'Services', eyebrow: 'MAZORYA / SERVICES',
    start: 'Start a Project', about: 'About the Service',
    deliver: 'What We Deliver', approach: 'Our Approach',
    approachText: 'A thoughtful, collaborative approach from the first idea to the finished result.',
    process: 'Our Process', more: 'More Details',
    contactTitle: 'Ready to build something exceptional?',
    contactText: "Let's discuss your idea and create something that makes an impact.",
    contact: 'Contact Us', loading: 'Loading service…',
    missing: 'Service Not Found',
    missingText: 'The service is unavailable or could not be loaded.',
    steps: [
      { title: 'Discovery & Research', description: 'We start by understanding your goals, audience and requirements.' },
      { title: 'Strategy & Design', description: 'We turn the insights into a clear and thoughtful creative direction.' },
      { title: 'Production & Delivery', description: 'We create and refine the solution with attention to every detail.' },
      { title: 'Launch & Growth', description: 'We prepare the final result and continue improving where needed.' }
    ]
  },
  fa: {
    back: 'بازگشت به خدمات', home: 'خانه', services: 'خدمات', eyebrow: 'MAZORYA / خدمات',
    start: 'شروع پروژه', about: 'درباره خدمات',
    deliver: 'آنچه ارائه می‌دهیم', approach: 'رویکرد ما',
    approachText: 'از ایده اولیه تا نتیجه نهایی، با رویکردی دقیق و همراه با همکاری پیش می‌رویم.',
    process: 'مراحل انجام کار', more: 'جزئیات بیشتر',
    contactTitle: 'آماده‌ای یک پروژه متفاوت بسازیم؟',
    contactText: 'ایده‌ات رو با ما در میان بذار تا با هم به یک نتیجه ماندگار برسیم.',
    contact: 'تماس با ما', loading: 'در حال بارگذاری خدمات…',
    missing: 'خدمات پیدا نشد',
    missingText: 'این سرویس وجود ندارد یا دریافت اطلاعات آن امکان‌پذیر نیست.',
    steps: [
      { title: 'شناخت و تحقیق', description: 'ابتدا اهداف، مخاطبان و نیازهای پروژه رو بررسی می‌کنیم.' },
      { title: 'استراتژی و طراحی', description: 'بر اساس اطلاعات به‌دست‌آمده مسیر خلاقانه پروژه رو مشخص می‌کنیم.' },
      { title: 'اجرا و تحویل', description: 'راهکار رو با دقت اجرا و جزئیاتش رو تکمیل می‌کنیم.' },
      { title: 'راه‌اندازی و توسعه', description: 'نتیجه نهایی رو آماده می‌کنیم و در صورت نیاز بهبود می‌دیم.' }
    ]
  }
};

const ICONS = [
  '<path d="m12 2 9 5-9 5-9-5 9-5Zm-9 10 9 5 9-5M3 17l9 5 9-5"/>',
  '<path d="M12 20c4.5-4 7.5-8 7.5-12A5.5 5.5 0 0 0 14 2.5C8 2.5 5 9 5 16v4h7Zm-7-4h9"/>',
  '<path d="m8 8-4 4 4 4m8-8 4 4-4 4M14 5l-4 14"/>',
  '<path d="M4 14c2-4 6-7 12-7l4 4-5 6-5 1-6-4ZM16 7V3m-9 13-2 5 5-2"/>'
];

const svgIcon = index => `
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none"
       stroke="currentColor" stroke-width="1.65"
       stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    ${ICONS[index % ICONS.length]}
  </svg>`;

const asText = value =>
  typeof value === 'string' || typeof value === 'number'
    ? String(value).trim() : '';

function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function translate(key, fallback) {
  try {
    const result = i18n.t(key);
    return result != null && result !== '' && result !== key
      ? String(result) : fallback;
  } catch {
    return fallback;
  }
}

function copyFor(lang) {
  const copy = { ...(COPY[lang] || COPY.en) };
  copy.back = translate('back_to_services', copy.back);
  copy.contact = translate('contact_us', copy.contact);
  copy.contactTitle = translate('cta_service_title', copy.contactTitle);
  return copy;
}

function serviceName(service) {
  return asText(service?.name) || asText(service?.title) || 'Service';
}

function decoratedTitle(title) {
  const parts = title.split(/\s+/).filter(Boolean);
  if (parts.length < 2) return `${esc(title)}<span>.</span>`;
  const last = parts.pop().replace(/\.$/, '');
  return `${esc(parts.join(' '))} <span>${esc(last)}.</span>`;
}

function imageUrl(...values) {
  for (const item of values) {
    const raw = typeof item === 'string' ? item
      : item && typeof item === 'object' && !Array.isArray(item)
        ? item.url ?? item.path ?? item.src ?? item.image
        : '';
    if (!asText(raw)) continue;

    try {
      const resolved = resolveMediaUrl(raw);
      if (!resolved) continue;
      const url = new URL(resolved, window.location.origin);
      if (url.protocol === 'https:' || url.protocol === 'http:') {
        return url.href;
      }
    } catch {
      // Invalid media path: try the next candidate.
    }
  }
  return '';
}

function listItems(source) {
  let items = source;
  if (typeof items === 'string') {
    try { items = JSON.parse(items); }
    catch { items = items.split(/[,،\n]/); }
  }
  if (!Array.isArray(items)) return [];

  return items
    .filter(item => item != null)
    .map(item => typeof item === 'string'
      ? { title: item.trim(), description: '' }
      : {
          title: asText(item?.title ?? item?.name ?? item?.label),
          description: asText(item?.description ?? item?.content ?? item?.text)
        })
    .filter(item => item.title || item.description);
}

function contentOf(service) {
  const sections = listItems(service?.sections);
  const hasDeliverables = service?.deliverables != null || service?.features != null;
  const deliverables = hasDeliverables
    ? listItems(service?.deliverables ?? service?.features)
    : sections.slice(0, 4);

  const process = listItems(
    service?.process ?? service?.steps ?? service?.workflow
  );

  return {
    deliverables: deliverables.slice(0, 8),
    process,
    extra: hasDeliverables ? sections : sections.slice(4)
  };
}

function renderBackLink(lang, copy) {
  return `
    <a class="mz-sd-back" href="/${encodeURIComponent(lang)}/services">
      <span aria-hidden="true">←</span>${esc(copy.back)}
    </a>`;
}

function renderLaptop(image, name, secondary = false) {
  return `
    <div class="mz-sd-laptop ${secondary ? 'mz-sd-laptop-secondary' : ''}">
      <div class="mz-sd-laptop-lid">
        <span class="mz-sd-laptop-camera" aria-hidden="true"></span>
        <div class="mz-sd-laptop-screen service-details-image-main">
          ${image
            ? `<img src="${esc(image)}" alt="${esc(name)}" class="service-details-image" loading="eager" decoding="async">`
            : `<div class="mz-sd-art-placeholder" aria-hidden="true"><span>MAZORYA<span>.</span></span></div>`}
        </div>
      </div>
      <div class="mz-sd-laptop-base"><span></span></div>
    </div>`;
}

function renderHero(service, lang, copy, mainImage) {
  const name = serviceName(service);
  const teaser = asText(service?.short_description) || asText(service?.subtitle)
    || asText(service?.description);

  return `
    <section class="mz-sd-hero">
      <div class="mz-sd-container">
        <nav class="mz-sd-breadcrumb" aria-label="Breadcrumb">
          <a href="/${encodeURIComponent(lang)}">${esc(copy.home)}</a>
          <span aria-hidden="true">/</span>
          <a href="/${encodeURIComponent(lang)}/services">${esc(copy.services)}</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">${esc(name)}</span>
        </nav>
        <div class="mz-sd-hero-grid">
          <div class="mz-sd-hero-content">
            <span class="mz-sd-eyebrow">${esc(copy.eyebrow)}</span>
            <h1 class="mz-sd-title service-details-title">${decoratedTitle(name)}</h1>
            ${teaser ? `<p class="mz-sd-hero-desc">${esc(teaser)}</p>` : ''}
            <a class="mz-sd-button" href="/${encodeURIComponent(lang)}/contact" data-route="contact">
              ${esc(copy.start)}<span aria-hidden="true">↗</span>
            </a>
          </div>
          <div class="mz-sd-hero-art" aria-label="${esc(name)}">
            <div class="mz-sd-halo" aria-hidden="true"></div>
            ${renderLaptop(mainImage, name)}
          </div>
        </div>
      </div>
    </section>`;
}

function renderDeliverables(items) {
  if (!items.length) return '';
  return `
    <div class="mz-sd-deliver-grid">
      ${items.map((item, index) => `
        <article class="mz-sd-deliver-card service-details-block">
          <div class="mz-sd-deliver-icon">${svgIcon(index)}</div>
          <div>
            <h3 class="service-details-block-title">${esc(item.title)}</h3>
            ${item.description
              ? `<p class="service-details-block-content">${esc(item.description)}</p>` : ''}
          </div>
        </article>`).join('')}
    </div>`;
}

function renderAbout(service, copy, deliverables) {
  const description = asText(service?.description);
  return `
    <section class="mz-sd-about" id="mz-sd-about">
      <div class="mz-sd-container mz-sd-about-grid">
        <div class="mz-sd-about-copy">
          <span class="mz-sd-section-index">01 / ${esc(copy.about)}</span>
          <h2>${esc(copy.about)}<span>.</span></h2>
          ${description
            ? `<p class="service-details-description">${esc(description)}</p>` : ''}
        </div>
        ${deliverables.length
          ? `<div class="mz-sd-deliver-box">
               <h3>${esc(copy.deliver)}</h3>
               ${renderDeliverables(deliverables)}
             </div>` : ''}
      </div>
    </section>`;
}

function renderApproach(service, copy, mainImage, secondImage) {
  if (!secondImage) return '';
  return `
    <section class="mz-sd-approach">
      <div class="mz-sd-container mz-sd-approach-grid">
        <div class="mz-sd-approach-copy">
          <span class="mz-sd-section-index">02 / ${esc(copy.approach)}</span>
          <h2>${esc(copy.approach)}<span>.</span></h2>
          <p>${esc(asText(service?.approach_description) || copy.approachText)}</p>
          <span class="mz-sd-short-line" aria-hidden="true"></span>
        </div>
        <div class="mz-sd-approach-art service-details-image-secondary">
          <div class="mz-sd-monitor">
            <div class="mz-sd-monitor-display">
              <img src="${esc(secondImage)}" alt="${esc(serviceName(service))} — ${esc(copy.approach)}" class="service-details-image" loading="lazy" decoding="async">
            </div>
            <div class="mz-sd-monitor-neck"></div>
            <div class="mz-sd-monitor-stand"></div>
          </div>
          ${mainImage ? `
            <div class="mz-sd-phone" aria-hidden="true">
              <div class="mz-sd-phone-camera"></div>
              <img src="${esc(mainImage)}" alt="" loading="lazy" decoding="async">
            </div>` : ''}
        </div>
      </div>
    </section>`;
}

function renderProcess(process, copy, hasApproach) {
  const steps = process.length ? process : copy.steps;
  if (!steps.length) return '';
  return `
    <section class="mz-sd-process">
      <div class="mz-sd-container">
        <span class="mz-sd-section-index">${hasApproach ? '03' : '02'} / ${esc(copy.process)}</span>
        <div class="mz-sd-process-rows">
          ${steps.map((step, index) => `
            <article class="mz-sd-process-row service-details-block">
              <span class="mz-sd-process-num">${String(index + 1).padStart(2, '0')}</span>
              <span class="mz-sd-process-icon">${svgIcon(index)}</span>
              <h3 class="service-details-block-title">${esc(step.title)}</h3>
              <p class="service-details-block-content">${esc(step.description)}</p>
            </article>`).join('')}
        </div>
      </div>
    </section>`;
}

function renderMore(sections, copy) {
  if (!sections.length) return '';
  return `
    <section class="mz-sd-more">
      <div class="mz-sd-container">
        <h2>${esc(copy.more)}<span>.</span></h2>
        <div class="mz-sd-more-grid service-details-content">
          ${sections.map((section, index) => `
            <article class="mz-sd-more-item service-details-block">
              <span>${String(index + 1).padStart(2, '0')}</span>
              <h3 class="service-details-block-title">${esc(section.title)}</h3>
              <p class="service-details-block-content">${esc(section.description)}</p>
            </article>`).join('')}
        </div>
      </div>
    </section>`;
}

function renderCTA(lang, copy) {
  return `
    <section class="cta-section mz-sd-cta-section">
      <div class="mz-sd-container">
        <div class="mz-sd-cta">
          <div class="mz-sd-cta-text">
            <h2>${esc(copy.contactTitle)}</h2>
            <p>${esc(copy.contactText)}</p>
          </div>
          <a class="mz-sd-button" href="/${encodeURIComponent(lang)}/contact" data-route="contact">
            ${esc(copy.contact)}<span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>`;
}

function renderStatus(lang, copy, loading) {
  return `
    <section class="mz-sd-status mz-sd-container" aria-live="polite">
      <span class="mz-sd-eyebrow">MAZORYA / SERVICES</span>
      <h1>${esc(loading ? copy.loading : copy.missing)}</h1>
      ${loading ? '' : `
        <p>${esc(copy.missingText)}</p>
        ${renderBackLink(lang, copy)}`}
    </section>`;
}

function renderPage(content, lang) {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    ${renderHeader()}
    <main class="mz-service-details mz-sd-page" id="mazoryaServiceDetails"
          dir="${['fa', 'ar'].includes(lang) ? 'rtl' : 'ltr'}">
      ${content}
    </main>
    ${renderFooter()}`;

  attachHeaderEvents();
  attachFooterEvents();
}

function getIdentifier(params = {}) {
  const direct = params?.slug ?? params?.id;
  if (direct != null) return asText(direct);

  try {
    return decodeURIComponent(
      window.location.pathname.split('/').filter(Boolean).at(-1) || ''
    ).trim();
  } catch {
    return '';
  }
}

export async function renderServiceDetails(params = {}) {
  const app = document.getElementById('app');
  if (!app) return;

  const lang = i18n.getCurrentLanguage();
  const copy = copyFor(lang);
  const path = window.location.pathname;
  const thisRequest = ++renderRequestId;
  const slug = getIdentifier(params);

  if (!slug || /[/\\]/.test(slug) || ['services', 'service'].includes(slug.toLowerCase())) {
    renderPage(renderStatus(lang, copy, false), lang);
    return;
  }

  renderPage(renderStatus(lang, copy, true), lang);

  let service = null;
  try {
    const response = await getServiceBySlug(slug);
    service = response?.status === false ? null
      : response?.data && typeof response.data === 'object' && !Array.isArray(response.data)
        ? response.data : response;
  } catch (error) {
    console.error('[ServiceDetails] API request failed:', error);
  }

  if (thisRequest !== renderRequestId ||
      window.location.pathname !== path ||
      i18n.getCurrentLanguage() !== lang) return;

  if (!service || typeof service !== 'object' || Array.isArray(service) ||
      !(asText(service.name) || asText(service.title))) {
    renderPage(renderStatus(lang, copy, false), lang);
    return;
  }

  const mainImage = imageUrl(
    service?.images?.image_1, service?.images?.image1,
    service?.image_1, service?.cover_url, service?.image_url
  );
  const secondImage = imageUrl(
    service?.images?.image_2, service?.images?.image2,
    service?.image_2
  );
  const content = contentOf(service);

  document.title = `${serviceName(service)} | Mazorya Group`;

  renderPage(`
    ${renderHero(service, lang, copy, mainImage)}
    ${renderAbout(service, copy, content.deliverables)}
    ${renderApproach(service, copy, mainImage, secondImage)}
    ${renderProcess(content.process, copy, Boolean(secondImage))}
    ${renderMore(content.extra, copy)}
    ${renderCTA(lang, copy)}
  `, lang);
}
