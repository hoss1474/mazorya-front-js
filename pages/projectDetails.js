/**
 * Mazorya Group — Six category-aware Project Details templates.
 * File: pages/projectDetails.js
 * Shared Laravel API, SPA Router, header and footer.
 */

import { i18n } from '../core/i18n.js';
import { renderHeader, attachHeaderEvents } from '../components/header.js';
import { renderFooter, attachFooterEvents } from '../components/footer.js';
import { getProjectBySlug, resolveMediaUrl } from '../core/api.js';
import '../assets/css/projectDetails.css';

let requestId = 0;

const COPY = {
  en: {
    back: 'Back to Projects', selected: 'SELECTED WORK', website: 'Website',
    overview: 'About the Project', technology: 'Technologies', process: 'Design Process',
    tools: 'Tools & Technologies', campaign: 'Campaign Overview', platforms: 'Platforms',
    collection: 'About This Collection', compatible: 'Compatible With',
    graphic: 'Project Details', designTools: 'Design Tools', features: 'Key Features',
    details: 'More About the Project', gallery: 'Project Gallery', preview: 'Prompt Preview',
    visit: 'Visit Live Website', prototype: 'View Prototype', campaignLink: 'View Campaign',
    getPrompts: 'Get Prompts', viewGallery: 'View Gallery', learn: 'Learn More',
    explore: 'Explore Project', collectionDetails: 'Collection Details',
    year: 'Year', client: 'Client', category: 'Category',
    empty: 'Details have not been added for this project yet.',
    noPreview: 'A preview has not been added yet.',
    contactTitle: 'Have a project in mind?', contactText: "Let's build something great together.",
    contact: 'Contact Us', loading: 'Loading project…', missing: 'Project Not Found',
    missingText: 'The project is unavailable or could not be loaded.'
  },
  fa: {
    back: 'بازگشت به پروژه‌ها', selected: 'پروژه‌های منتخب', website: 'وب‌سایت',
    overview: 'درباره پروژه', technology: 'تکنولوژی‌ها', process: 'مراحل طراحی',
    tools: 'ابزارها و تکنولوژی‌ها', campaign: 'درباره کمپین', platforms: 'پلتفرم‌ها',
    collection: 'درباره مجموعه', compatible: 'سازگار با',
    graphic: 'جزئیات طراحی', designTools: 'ابزارهای طراحی', features: 'ویژگی‌های اصلی',
    details: 'جزئیات بیشتر پروژه', gallery: 'گالری پروژه', preview: 'پیش‌نمایش پرامپت',
    visit: 'مشاهده وب‌سایت', prototype: 'مشاهده پروتوتایپ', campaignLink: 'مشاهده کمپین',
    getPrompts: 'دریافت پرامپت‌ها', viewGallery: 'مشاهده گالری', learn: 'بیشتر بدانید',
    explore: 'مشاهده جزئیات پروژه', collectionDetails: 'جزئیات مجموعه',
    year: 'سال', client: 'کارفرما', category: 'دسته‌بندی',
    empty: 'اطلاعات این بخش هنوز برای پروژه ثبت نشده است.',
    noPreview: 'هنوز پیش‌نمایشی ثبت نشده است.',
    contactTitle: 'پروژه‌ای در ذهن دارید؟', contactText: 'بیایید با هم چیز متفاوتی بسازیم.',
    contact: 'تماس با ما', loading: 'در حال دریافت پروژه…', missing: 'پروژه پیدا نشد',
    missingText: 'این پروژه موجود نیست یا امکان دریافت اطلاعاتش وجود ندارد.'
  }
};

const CATEGORY_NAMES = {
  website: ['Website', 'وب‌سایت'],
  'ui-ux': ['UI/UX', 'طراحی رابط کاربری'],
  'social-media': ['Social Media', 'شبکه‌های اجتماعی'],
  prompts: ['Prompts', 'پرامپت‌ها'],
  graphic: ['Graphic Design', 'طراحی گرافیک'],
  other: ['Other', 'سایر']
};

const CATEGORY_KEYS = {
  website: 'website', web: 'website',
  'ui-ux': 'ui-ux', 'ui/ux': 'ui-ux', uiux: 'ui-ux',
  social: 'social-media', 'social-media': 'social-media', socialmedia: 'social-media',
  prompt: 'prompts', prompts: 'prompts',
  graphic: 'graphic', graphics: 'graphic', 'graphic-design': 'graphic',
  other: 'other'
};

function str(value) {
  return typeof value === 'string' || typeof value === 'number'
    ? String(value).trim() : '';
}

function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function words(value, limit = 210) {
  const full = str(value);
  return full.length > limit ? `${full.slice(0, limit - 1).trimEnd()}…` : full;
}

function categoryOf(project) {
  const key = str(project?.category).toLowerCase().replace(/\s+/g, '-');
  return CATEGORY_KEYS[key] || 'other';
}

function categoryLabel(category, lang) {
  return CATEGORY_NAMES[category]?.[lang === 'fa' ? 1 : 0] || category;
}

function titleOf(project) {
  return str(project?.name) || str(project?.title) || 'Project';
}

function decoratedTitle(title) {
  const parts = title.split(/\s+/).filter(Boolean);
  if (parts.length < 2) return `${esc(title)}<span>.</span>`;
  const last = parts.pop();
  return `${esc(parts.join(' '))} <span>${esc(last)}.</span>`;
}

function yearOf(project) {
  const year = str(project?.year);
  if (/^(19|20)\d{2}$/.test(year)) return year;
  const date = str(project?.date || project?.data);
  return date.match(/^(19|20)\d{2}/)?.[0] || '';
}

function listOf(value) {
  let list = value;
  if (typeof list === 'string') {
    try {
      const parsed = JSON.parse(list);
      list = Array.isArray(parsed) ? parsed : list.split(/[,،\n]/);
    } catch {
      list = list.split(/[,،\n]/);
    }
  }
  if (!Array.isArray(list)) return [];
  const seen = new Set();
  return list.map(item => {
    if (typeof item === 'string') return item.trim();
    if (item && typeof item === 'object') {
      return str(item.name ?? item.label ?? item.title ?? item.value);
    }
    return '';
  }).filter(item => {
    const key = item.toLocaleLowerCase();
    if (!item || seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 30);
}

function sectionsOf(project) {
  if (!Array.isArray(project?.sections)) return [];
  return project.sections.filter(s => s && typeof s === 'object' && !Array.isArray(s))
    .map(s => ({ title: str(s.title || s.name), text: str(s.description || s.content) }))
    .filter(s => s.title || s.text);
}

function linkOf(project, ...fields) {
  for (const field of fields) {
    const value = str(project?.[field]);
    if (!value) continue;
    const normalized = /^https?:\/\//i.test(value) ? value
      : /^[a-z\d-]+(?:\.[a-z\d-]+)+(?:[:/]\S*)?$/i.test(value) ? `https://${value}` : '';
    if (!normalized) continue;
    try {
      const url = new URL(normalized);
      if (['https:', 'http:'].includes(url.protocol) && !url.username && !url.password) {
        return url.href;
      }
    } catch { /* Invalid URL: try the next field. */ }
  }
  return '';
}

function imageOf(item) {
  const raw = typeof item === 'string' ? item
    : item && typeof item === 'object' ? item.url ?? item.path ?? item.src ?? item.image : '';
  if (!str(raw)) return '';
  let resolved = '';
  try { resolved = resolveMediaUrl(raw); }
  catch { return ''; }
  if (!resolved) return '';
  try {
    const url = new URL(resolved, window.location.origin);
    return ['http:', 'https:'].includes(url.protocol) ? url.href : '';
  } catch { return ''; }
}

function imagesOf(project) {
  const images = [];
  const add = item => {
    if (Array.isArray(item)) return item.forEach(add);
    const url = imageOf(item);
    if (url && !images.includes(url)) images.push(url);
  };
  if (Array.isArray(project?.images)) add(project.images);
  else {
    add(project?.images?.image);
    add(project?.images?.image2 ?? project?.images?.image_2);
    add(project?.images?.gallery);
  }
  add(project?.cover_url); add(project?.image_url); add(project?.image);
  add(project?.image_2); add(project?.image2_url);
  add(project?.gallery); add(project?.gallery_images);
  add(project?.gallery_uploads); add(project?.project_images);
  return images.slice(0, 30);
}

function tagList(items, className = 'mzpd-chips') {
  return `<div class="${className}">${items.map(value =>
    `<span class="mzpd-chip"><i aria-hidden="true">${esc(value.slice(0, 2).toUpperCase())}</i>${esc(value)}</span>`
  ).join('')}</div>`;
}

// ============================================================
// COLORED TECHNOLOGY LOGOS — WEBSITE CATEGORY ONLY
// Source: Devicon open-source SVGs via jsDelivr.
// Unknown technologies keep their initial-letter fallback.
// ============================================================

const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/';

const TECHNOLOGY_LOGOS = Object.freeze({
  html: 'html5/html5-original.svg',
  html5: 'html5/html5-original.svg',
  css: 'css3/css3-original.svg',
  css3: 'css3/css3-original.svg',
  javascript: 'javascript/javascript-original.svg',
  js: 'javascript/javascript-original.svg',
  typescript: 'typescript/typescript-original.svg',
  ts: 'typescript/typescript-original.svg',
  react: 'react/react-original.svg',
  reactjs: 'react/react-original.svg',
  vue: 'vuejs/vuejs-original.svg',
  vuejs: 'vuejs/vuejs-original.svg',
  angular: 'angular/angular-original.svg',
  nextjs: 'nextjs/nextjs-original.svg',
  nuxt: 'nuxtjs/nuxtjs-original.svg',
  nuxtjs: 'nuxtjs/nuxtjs-original.svg',
  php: 'php/php-original.svg',
  laravel: 'laravel/laravel-original.svg',
  filament: 'filamentphp/filamentphp-original.svg',
  filamentphp: 'filamentphp/filamentphp-original.svg',
  mysql: 'mysql/mysql-original.svg',
  mariadb: 'mariadb/mariadb-original.svg',
  postgresql: 'postgresql/postgresql-original.svg',
  postgres: 'postgresql/postgresql-original.svg',
  mongodb: 'mongodb/mongodb-original.svg',
  wordpress: 'wordpress/wordpress-original.svg',
  vite: 'vitejs/vitejs-original.svg',
  vitejs: 'vitejs/vitejs-original.svg',
  node: 'nodejs/nodejs-original.svg',
  nodejs: 'nodejs/nodejs-original.svg',
  jquery: 'jquery/jquery-original.svg',
  bootstrap: 'bootstrap/bootstrap-original.svg',
  tailwind: 'tailwindcss/tailwindcss-original.svg',
  tailwindcss: 'tailwindcss/tailwindcss-original.svg',
  sass: 'sass/sass-original.svg',
  git: 'git/git-original.svg',
  github: 'github/github-original.svg',
  docker: 'docker/docker-original.svg',
  nginx: 'nginx/nginx-original.svg',
  redis: 'redis/redis-original.svg',
  graphql: 'graphql/graphql-plain.svg',
  firebase: 'firebase/firebase-original.svg',
  figma: 'figma/figma-original.svg',
  webflow: 'webflow/webflow-original.svg',
  python: 'python/python-original.svg'
});

function technologyLogo(name) {
  const key = str(name).toLowerCase().replace(/[^a-z0-9]/g, '');
  const iconPath = TECHNOLOGY_LOGOS[key];
  return iconPath ? `${DEVICON_BASE}${iconPath}` : '';
}

function technologyTagList(items) {
  return `<div class="mzpd-chips mzpd-technology-chips">${items.map(name => {
    const logo = technologyLogo(name);
    const initials = str(name).slice(0, 2).toUpperCase();

    return `<span class="mzpd-chip mzpd-technology-chip">
      <span class="mzpd-technology-mark${logo ? '' : ' mzpd-tech-no-logo'}" aria-hidden="true">
        ${logo ? `<img class="mzpd-technology-logo" src="${esc(logo)}" alt="" loading="lazy" decoding="async">` : ''}
        <span class="mzpd-technology-initials">${esc(initials)}</span>
      </span>
      <span class="mzpd-technology-name">${esc(name)}</span>
    </span>`;
  }).join('')}</div>`;
}

function activateTechnologyLogoFallbacks(root) {
  root.querySelectorAll('.mzpd-technology-logo').forEach(img => {
    const showInitials = () => {
      img.closest('.mzpd-technology-mark')?.classList.add('mzpd-tech-no-logo');
    };

    img.addEventListener('error', showInitials, { once: true });

    if (img.complete && img.naturalWidth === 0) {
      showInitials();
    }
  });
}

function ctaButton(url, label, scrollTarget = '#mzpd-overview') {
  return url
    ? `<a class="mzpd-button" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)} <span aria-hidden="true">↗</span></a>`
    : `<a class="mzpd-button" href="${scrollTarget}">${esc(label)} <span aria-hidden="true">↓</span></a>`;
}

function imageTag(src, alt, className = '') {
  return src
    ? `<img class="${className}" src="${esc(src)}" alt="${esc(alt)}" loading="eager" decoding="async">`
    : `<div class="mzpd-art-empty" aria-label="${esc(alt)}"><strong>MAZORYA</strong><span>✦</span></div>`;
}

// ============================================================
// SIX DISTINCT HERO PRESENTATIONS
// ============================================================

function websiteArtwork(project, images) {
  const href = linkOf(project, 'url');
  const laptop = `<div class="mzpd-laptop"><div class="mzpd-laptop-lid">
    <span class="mzpd-camera"></span>
    <div class="mzpd-laptop-screen">${imageTag(images[0], titleOf(project))}
    ${href ? '<span class="mzpd-art-hover">VISIT WEBSITE ↗</span>' : ''}</div>
    </div><div class="mzpd-laptop-base"><span></span></div></div>`;
  return href
    ? `<a class="mzpd-art-link" href="${esc(href)}" target="_blank" rel="noopener noreferrer" aria-label="Visit ${esc(titleOf(project))}">${laptop}</a>`
    : laptop;
}

function uiuxArtwork(project, images) {
  return `<div class="mzpd-ui-scene">
    <div class="mzpd-ui-desktop">${imageTag(images[0], titleOf(project))}</div>
    ${images[1] ? `<div class="mzpd-ui-phone"><div class="mzpd-ui-notch"></div>${imageTag(images[1], titleOf(project))}</div>` : ''}
    <span class="mzpd-art-orb" aria-hidden="true"></span>
  </div>`;
}

function socialArtwork(project, images) {
  return `<div class="mzpd-social-scene">
    <div class="mzpd-social-phone"><span class="mzpd-ui-notch"></span>${imageTag(images[0], titleOf(project))}</div>
    ${images[1] ? `<div class="mzpd-social-post mzpd-post-a">${imageTag(images[1], titleOf(project))}</div>` : ''}
    ${images[2] ? `<div class="mzpd-social-post mzpd-post-b">${imageTag(images[2], titleOf(project))}</div>` : ''}
    <span class="mzpd-art-orb" aria-hidden="true"></span>
  </div>`;
}

function promptsArtwork(project, images, c) {
  const preview = str(project?.prompt_preview || project?.preview_text || project?.prompt_excerpt);
  return `<div class="mzpd-prompt-scene">
    ${images[0] ? `<div class="mzpd-prompt-image">${imageTag(images[0], titleOf(project))}</div>` : ''}
    <div class="mzpd-prompt-card">
      <span class="mzpd-card-kicker">✦ AI PROMPT</span>
      <h3>${esc(titleOf(project))}</h3>
      <p>${esc(words(preview || project?.description || c.noPreview, 135))}</p>
      <div class="mzpd-prompt-lines" aria-hidden="true"><i></i><i></i></div>
      <span class="mzpd-prompt-symbol" aria-hidden="true">✦</span>
    </div>
    <span class="mzpd-art-orb" aria-hidden="true"></span>
  </div>`;
}

function graphicArtwork(project, images) {
  return `<div class="mzpd-graphic-scene">
    <div class="mzpd-graphic-main">${imageTag(images[0], titleOf(project))}</div>
    ${images[1] ? `<div class="mzpd-graphic-side">${imageTag(images[1], titleOf(project))}</div>` : ''}
    <span class="mzpd-art-orb" aria-hidden="true"></span>
  </div>`;
}

function otherArtwork(project, images) {
  return `<div class="mzpd-other-scene">
    ${images[0] ? `<div class="mzpd-other-image">${imageTag(images[0], titleOf(project))}</div>`
      : `<div class="mzpd-sculpture" aria-hidden="true"><span></span><span></span><span></span></div>`}
    <span class="mzpd-art-orb" aria-hidden="true"></span>
  </div>`;
}

const ARTWORK = {
  website: websiteArtwork,
  'ui-ux': uiuxArtwork,
  'social-media': socialArtwork,
  prompts: promptsArtwork,
  graphic: graphicArtwork,
  other: otherArtwork
};

function renderHero(project, category, lang, c, images) {
  const label = categoryLabel(category, lang);
  const year = yearOf(project);
  const action = {
    website: [linkOf(project, 'url'), linkOf(project, 'url') ? c.visit : c.explore, '#mzpd-overview'],
    'ui-ux': [linkOf(project, 'prototype_url', 'figma_url', 'url'),
      linkOf(project, 'prototype_url', 'figma_url', 'url') ? c.prototype : c.explore, '#mzpd-overview'],
    'social-media': [linkOf(project, 'campaign_url', 'url'),
      linkOf(project, 'campaign_url', 'url') ? c.campaignLink : c.viewGallery, '#mzpd-gallery'],
    prompts: [linkOf(project, 'purchase_url', 'download_url', 'url'),
      linkOf(project, 'purchase_url', 'download_url', 'url') ? c.getPrompts : c.collectionDetails, '#mzpd-overview'],
    graphic: ['', c.viewGallery, images.length > 1 ? '#mzpd-gallery' : '#mzpd-overview'],
    other: [linkOf(project, 'url'), c.learn, '#mzpd-overview']
  }[category];
  // An internal gallery target is only used if gallery images exist.
  if (category === 'social-media' && !action[0] && images.length < 2) {
    action[2] = '#mzpd-overview';
    action[1] = c.explore;
  }

  const artwork = ARTWORK[category](project, images, c);
  return `<section class="mzpd-hero"><div class="mzpd-container">
    <a class="mzpd-back" href="/${encodeURIComponent(lang)}/projects"><span aria-hidden="true">←</span> ${esc(c.back)}</a>
    <div class="mzpd-hero-grid">
      <div class="mzpd-hero-copy">
        <div class="mzpd-kicker">${esc(label)} <span aria-hidden="true"></span></div>
        <h1 class="mzpd-title">${decoratedTitle(titleOf(project))}</h1>
        ${str(project?.description) ? `<p class="mzpd-intro">${esc(words(project.description, 230))}</p>` : ''}
        <div class="mzpd-tags"><span>${esc(label)}</span>${year ? `<span>${esc(year)}</span>` : ''}</div>
        ${ctaButton(...action)}
      </div>
      <div class="mzpd-hero-art">${artwork}</div>
    </div>
  </div></section>`;
}

// ============================================================
// CATEGORY-SPECIFIC INFORMATION PANELS
// ============================================================

function panel(title, body, extra = '') {
  return `<section class="mzpd-panel ${extra}"><h2>${esc(title)}</h2>${body}</section>`;
}

function descriptionPanel(title, project, c) {
  const client = str(project?.client);
  const year = yearOf(project);
  const facts = [
    client ? `<span>${esc(c.client)} <strong>${esc(client)}</strong></span>` : '',
    year ? `<span>${esc(c.year)} <strong>${esc(year)}</strong></span>` : ''
  ].filter(Boolean);
  return panel(title, `<p class="mzpd-description">${esc(str(project?.description) || c.empty)}</p>
    ${facts.length ? `<div class="mzpd-facts">${facts.join('')}</div>` : ''}`);
}

function listPanel(title, items, c, renderItems = tagList) {
  return panel(title, items.length ? renderItems(items) : `<p class="mzpd-empty">${esc(c.empty)}</p>`);
}

function stepsPanel(title, steps, c) {
  const rows = steps.length
    ? steps.map((s, i) => `<div class="mzpd-process-step"><span>${String(i + 1).padStart(2, '0')}</span><div><h3>${esc(s.title || c.details)}</h3>${s.text ? `<p>${esc(s.text)}</p>` : ''}</div></div>`).join('')
    : `<p class="mzpd-empty">${esc(c.empty)}</p>`;
  return panel(title, `<div class="mzpd-process">${rows}</div>`);
}

function processOf(project) {
  const source = project?.process ?? project?.design_process;
  if (source == null) return sectionsOf(project);
  if (Array.isArray(source)) {
    return source.map(s => typeof s === 'string' ? { title: s.trim(), text: '' }
      : { title: str(s?.title ?? s?.name), text: str(s?.description ?? s?.content) })
      .filter(s => s.title || s.text);
  }
  return listOf(source).map(title => ({ title, text: '' }));
}

function featuredItems(project) {
  const source = project?.features ?? project?.highlights;
  return listOf(source);
}

function renderCategoryPanels(project, category, c) {
  const technologies = listOf(project?.technologies ?? project?.tech_stack);
  const tools = listOf(project?.design_tools ?? project?.tools ?? project?.technologies);
  const platforms = listOf(project?.platforms ?? project?.social_platforms);
  const compatible = listOf(project?.compatible_tools ?? project?.compatible_with ?? project?.ai_tools);
  const panels = {
    website: () => descriptionPanel(c.overview, project, c) + listPanel(c.technology, technologies, c, technologyTagList),
    'ui-ux': () => stepsPanel(c.process, processOf(project), c) + listPanel(c.tools, tools, c),
    'social-media': () => descriptionPanel(c.campaign, project, c) + listPanel(c.platforms, platforms, c),
    prompts: () => descriptionPanel(c.collection, project, c) + listPanel(c.compatible, compatible, c),
    graphic: () => descriptionPanel(c.graphic, project, c) + listPanel(c.designTools, tools, c),
    other: () => descriptionPanel(c.overview, project, c) + listPanel(c.features, featuredItems(project), c)
  };
  return `<section class="mzpd-overview" id="mzpd-overview"><div class="mzpd-container mzpd-panels">
    ${panels[category]()}
  </div></section>`;
}

function renderGallery(project, images, c) {
  // The first image is the primary hero image; remaining media are the gallery.
  const rest = images.slice(1);
  if (!rest.length) return '';
  return `<section class="mzpd-gallery-section" id="mzpd-gallery"><div class="mzpd-container">
    <h2 class="mzpd-block-heading">${esc(c.gallery)}</h2>
    <div class="mzpd-gallery-grid">${rest.map((src, i) => `<figure class="mzpd-gallery-item ${i === 0 ? 'mzpd-gallery-large' : ''}">
      <img src="${esc(src)}" alt="${esc(titleOf(project))} — ${i + 2}" loading="lazy" decoding="async">
    </figure>`).join('')}</div>
  </div></section>`;
}

function renderAdditionalDetails(project, category, c) {
  // UI/UX sections are already used as process steps; avoid repeating identical content.
  const sections = category === 'ui-ux' && project?.process == null && project?.design_process == null
    ? [] : sectionsOf(project);
  const promptPreview = category === 'prompts'
    ? str(project?.prompt_preview || project?.preview_text || project?.prompt_excerpt) : '';
  if (!sections.length && !promptPreview) return '';
  return `<section class="mzpd-extra-section"><div class="mzpd-container">
    ${promptPreview ? `<div class="mzpd-preview-panel"><h2 class="mzpd-block-heading">${esc(c.preview)}</h2><p>${esc(promptPreview)}</p></div>` : ''}
    ${sections.length ? `<h2 class="mzpd-block-heading">${esc(c.details)}</h2><div class="mzpd-extra-list">
      ${sections.map((s, i) => `<article class="mzpd-extra-row"><span>${String(i + 1).padStart(2, '0')}</span>
      <h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></article>`).join('')}
    </div>` : ''}
  </div></section>`;
}

function renderBottomCTA(lang, c) {
  return `<section class="mzpd-cta-section"><div class="mzpd-container"><div class="mzpd-cta">
    <div class="mzpd-cta-text"><h2>${esc(c.contactTitle)}</h2><p>${esc(c.contactText)}</p></div>
    <a href="/${encodeURIComponent(lang)}/contact" data-route="contact" class="mzpd-button mzpd-cta-button">${esc(c.contact)} ↗</a>
  </div></div></section>`;
}

function renderStatus(lang, c, loading) {
  return `<section class="mzpd-container mzpd-status" aria-live="polite"><span>MAZORYA / PROJECT</span>
    <h1>${esc(loading ? c.loading : c.missing)}</h1>
    ${loading ? '' : `<p>${esc(c.missingText)}</p><a class="mzpd-button" href="/${encodeURIComponent(lang)}/projects">${esc(c.back)} ↗</a>`}
  </section>`;
}

function renderPage(content, lang, category = 'other') {
  const root = document.getElementById('app');
  if (!root) return;
  root.innerHTML = `${renderHeader()}<main id="mazoryaProjectDetails" class="mzpd-page mzpd-${category}"
    dir="${['fa', 'ar'].includes(lang) ? 'rtl' : 'ltr'}">${content}</main>${renderFooter()}`;
  attachHeaderEvents();
  attachFooterEvents();
  activateTechnologyLogoFallbacks(root);
}

function getIdentifier(params) {
  const given = params?.slug ?? params?.id ?? params?.projectId;
  if (given != null) return str(given);
  const last = window.location.pathname.split('/').filter(Boolean).at(-1);
  try { return last ? decodeURIComponent(last).trim() : ''; }
  catch { return ''; }
}

export async function renderProjectDetails(params = {}) {
  if (!document.getElementById('app')) return;
  const lang = i18n.getCurrentLanguage();
  const c = COPY[lang] || COPY.en;
  const path = window.location.pathname;
  const thisRequest = ++requestId;
  const identifier = getIdentifier(params);

  if (!identifier || /[/\\]/.test(identifier) || ['project', 'projects'].includes(identifier.toLowerCase())) {
    renderPage(renderStatus(lang, c, false), lang);
    return;
  }

  renderPage(renderStatus(lang, c, true), lang);

  let project = null;
  try {
    const response = await getProjectBySlug(identifier);
    project = response?.data && typeof response.data === 'object' && !Array.isArray(response.data)
      ? response.data : response;
    if (response?.status === false) project = null;
  } catch (error) {
    console.error('[ProjectDetails] Failed to load project:', error);
  }

  if (thisRequest !== requestId || window.location.pathname !== path || i18n.getCurrentLanguage() !== lang) return;

  if (!project || typeof project !== 'object' || Array.isArray(project) || !str(project.name ?? project.title)) {
    renderPage(renderStatus(lang, c, false), lang);
    return;
  }

  const category = categoryOf(project);
  const images = imagesOf(project);
  document.title = `${titleOf(project)} | Mazorya Group`;
  renderPage(
    renderHero(project, category, lang, c, images) +
    renderCategoryPanels(project, category, c) +
    renderGallery(project, images, c) +
    renderAdditionalDetails(project, category, c) +
    renderBottomCTA(lang, c),
    lang, category
  );
}
