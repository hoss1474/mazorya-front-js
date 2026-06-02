// pages/home.js - Home Page (کامل با تمام بخش‌ها)

import { i18n } from '../core/i18n.js';
import { renderHeader, attachHeaderEvents } from '../components/header.js';
import { renderFooter, attachFooterEvents } from '../components/footer.js';
import { getProjects, getBlogs } from '../core/api.js';

// ============================================================
// بخش 1: Hero (بنر اصلی)
// ============================================================
function renderHeroSection(currentLang) {
  return `
    <div class="banner-main-section">
      <div class="banner-inner-wrap">
        <section class="hero">
          <div class="hero-glow"></div>
          <div class="hero-maze"></div>
          <div class="hero-content">
            <h1 class="hero-title">${i18n.t('hero_title')}</h1>
            <p class="hero-subtitle">${i18n.t('hero_subtitle')}</p>
            <a href="/${currentLang}/services" class="hero-btn" data-route="services">${i18n.t('hero_btn')}</a>
          </div>
          <div class="hero-character scroll-animate">
            <img src="/assets/img/hero_character_optimized.png" alt="Hero Character" />
          </div>
        </section>
      </div>
    </div>
  `;
}

// ============================================================
// بخش 2: Client (متن معرفی)
// ============================================================
function renderClientSection() {
  return `
    <section class="client-section">
      <div class="w-layout-blockcontainer container-large w-container">
        <div class="client-text-wrap">
          <p class="client-text">${i18n.t('client_text') || '"Our teams are purpose-built to support every stage of your brand\'s journey. From strategy to design and content, we create meaningful work that resonates with your audience and drives your business forward."'}</p>
        </div>
      </div>
    </section>
  `;
}

// بخش Feature - 3 کارت
function renderFeatureSection() {
  const features = [
    {
      title: i18n.t('feature_card1_title') || 'Brand Strategy',
      text: i18n.t('feature_card1_content') || '"We craft tailored digital strategies aligned with your brand\'s goals, leveraging research and insights to create impactful solutions that drive growth and engagement."',
      icon: '/assets/img/feature-icon-01.svg'
    },
    {
      title: i18n.t('feature_card2_title') || 'Creativity & Design',
      text: i18n.t('feature_card2_content') || '"We deliver innovative design and content strategies, bringing your brand to life across social media, advertising channels, and all digital touchpoints."',
      icon: '/assets/img/feature-icon-02.svg'
    },
    {
      title: i18n.t('feature_card3_title') || 'Analytics & Optimization',
      text: i18n.t('feature_card3_content') || '"We monitor and analyze key metrics, optimizing campaigns to maximize client success and enhance ROI across all brand initiatives."',
      icon: '/assets/img/feature-icon-03.svg'
    }
  ];
  
  const cards = features.map(feature => `
    <div class="feature-card">
      <div class="feature-icon-wrap">
        <img src="${feature.icon}" alt="Feature Icon" />
      </div>
      <h2 class="feature-card-title">${feature.title}</h2>
      <p class="feature-card-content">${feature.text}</p>
      <div class="feature-pattern-wrap">
        <img src="/assets/img/feature-pattern.svg" alt="Feature Pattern" />
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
// بخش 4: Count (آمارها)
// ============================================================
function renderCountSection(currentLang) {
  const countItems = [
    { number: '100+', text: i18n.t('global_clients') || 'Global Clientele', icon: '/assets/img/count-icon-01.svg' },
    { number: '50+', text: i18n.t('honor_highlight') || 'Honor Highlight', icon: '/assets/img/count-icon-02.svg' },
    { number: '200+', text: i18n.t('projects_done') || 'Project done', icon: '/assets/img/count-icon-03.svg' },
    { number: '15+', text: i18n.t('business_expertise') || 'Business Expertise', icon: '/assets/img/count-icon-04.svg' }
  ];
  
  return `
    <section class="count-section">
      <div class="w-layout-blockcontainer container-regular w-container">
        <div class="w-layout-grid count-grid">
          <div>
            <div class="count-title-wrap">
              <h2 class="section-title">${i18n.t('count_title') || 'Digital Success & Delivery'}</h2>
            </div>
            <p class="count-content">${i18n.t('count_content') || '"Our goal is to help clients succeed in the digital landscape through creative strategies and effective execution, delivering measurable results for their brand."'}</p>
            <div class="count-button-wrap">
              <a href="/${currentLang}/about-us" class="primary-button" data-route="about">${i18n.t('see_more') || 'See More'}</a>
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
        <img src="${item.icon}" alt="Count Icon" />
      </div>
      <div>
        <h2 class="count-title">${item.number}</h2>
        <p class="count-text">${item.text}</p>
      </div>
    </div>
  `;
}

// ============================================================
// بخش 4.5: Services (خدمات) - بین Count و Projects
// ============================================================
function renderServicesSection(currentLang) {
  const services = [
    {
      title: "Web Solutions",
      desc: '"We design and develop visually appealing, intuitive websites that reflect your brand identity, using cutting-edge tools and modern development practices."',
      icon: "/assets/img/service-icon-01.svg"
    },
    {
      title: "Social Media Management",
      desc: '"We elevate your brand across social media platforms with targeted content strategies designed to engage audiences and drive meaningful conversions."',
      icon: "/assets/img/service-icon-02.svg"
    },
    {
      title: "PPC Advertising",
      desc: "We maximize ROI through targeted ads on search engines and social media, continuously optimizing campaigns to reach your audience effectively and efficiently.",
      icon: "/assets/img/service-icon-03.svg"
    },
    {
      title: "Analytics & Insights",
      desc: "We leverage advanced analytics to gain actionable insights for digital marketing. By tracking metrics, measuring campaigns, and optimizing strategies, we help your brand achieve measurable growth.",
      icon: "/assets/img/service-icon-04.svg"
    }
  ];
  
  const serviceCards = services.map(service => `
    <div class="service-post-collection-item w-dyn-item w-col w-col-6">
      <div class="service-post-card">
        <div class="service-top-wrap">
          <a href="/${currentLang}/services" class="service-post-icon-wrap w-inline-block" data-route="services">
            <img src="${service.icon}" loading="lazy" alt="Icon" class="service-post-icon" />
          </a>
          <div class="service-card-title-wrap">
            <a href="/${currentLang}/services" class="service-card-title" data-route="services">${service.title}</a>
            <div class="service-card-title-line-wrap"></div>
          </div>
        </div>
        <p class="service-card-content">${service.desc}</p>
      </div>
    </div>
  `).join('');
  
  return `
    <section class="service-post-section">
      <div class="w-layout-blockcontainer container-regular w-container">
        <div class="service-title-area">
          <div class="service-post-title-wrap">
            <h2 class="section-title text-white">${i18n.t('services_title') || 'We offer a wide range of design services.'}</h2>
          </div>
          <div>
            <a href="/${currentLang}/services" class="secondary-button lite-color-hover w-button" data-route="services">View More</a>
          </div>
        </div>
        <div class="service-post-card-area">
          <div class="w-dyn-list">
            <div role="list" class="w-dyn-items w-row">
              ${serviceCards}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

// ============================================================
// بخش 5: Projects (پروژه‌های اخیر)
// ============================================================
function renderProjectsSection(projects, currentLang) {
  const heroProjects = projects.slice(0, 3);
  const sideProjects = projects.slice(3, 6);
  
  return `
    <section class="project-section">
      <div class="w-layout-blockcontainer container-regular w-container">
        <div class="w-layout-grid project-grid">
          <div>
            <div>
              <h2 class="section-title">${i18n.t('projects_title') || 'Explore our projects'}</h2>
              <div class="section-content-wrap">
                <p>${i18n.t('projects_subtitle') || 'Our teams are purpose-built around our client\'s unique every stage of the engagement our goal is to create works for your audience and your business'}</p>
              </div>
              <div class="project-button-wrap">
                <a href="/${currentLang}/projects" class="primary-button" data-route="projects">${i18n.t('view_projects') || 'View Projects'}</a>
              </div>
            </div>
            <div>
              <div class="projects-list" id="projects-home-list-1">
                ${renderProjectCards(heroProjects, currentLang)}
              </div>
            </div>
          </div>
          <div>
            <div class="projects-list" id="projects-home-list-2">
              ${renderProjectCards(sideProjects, currentLang)}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderProjectCards(projects, lang) {
  if (!projects || projects.length === 0) return '';
  
  return projects.map(project => `
    <div role="listitem" class="project-collection-item w-dyn-item w-col w-col-6">
      <div class="project-card-wrap">
        <div class="project-image-area">
          <a href="/${lang}/project/${project.slug}" class="project-image-wrap w-inline-block">
            <img src="${project.images?.image || '/assets/img/default-project.jpg'}" loading="lazy" alt="${project.name}" class="project-image" />
          </a>
          <a href="/${lang}/project/${project.slug}" class="project-overlay-wrap w-inline-block">
            <div class="project-arrow-icon-wrap">
              <img src="/assets/img/project-arrow.svg" class="project-arrow-icon" />
            </div>
          </a>
        </div>
        <div class="project-title-wrap">
          <a href="/${lang}/project/${project.slug}" class="project-title">${escapeHtml(project.name)}</a>
        </div>
      </div>
    </div>
  `).join('');
}

// ============================================================
// بخش 6: FAQ (سوالات متداول) - با ترجمه از JSON
// ============================================================
function renderFAQSection() {
  const faqs = [
    { q: i18n.t('faq_q1'), a: i18n.t('faq_a1') },
    { q: i18n.t('faq_q2'), a: i18n.t('faq_a2') },
    { q: i18n.t('faq_q3'), a: i18n.t('faq_a3') },
    { q: i18n.t('faq_q4'), a: i18n.t('faq_a4') },
    { q: i18n.t('faq_q5'), a: i18n.t('faq_a5') }
  ];
  
  const faqItems = faqs.map(faq => `
    <div data-hover="false" data-delay="0" class="faq-wrap w-dropdown">
      <div class="faq-question-wrap w-dropdown-toggle">
        <div class="faq-question text-white">${escapeHtml(faq.q)}</div>
        <div class="faq-arrow-wrap dark-bg-with-white-border">
          <img src="/assets/img/faq-arrow-lite.svg" loading="lazy" alt="FAQ Arrow" class="faq-arrow-lite" />
          <img src="/assets/img/faq-arrow-dark.svg" loading="lazy" alt="FAQ Arrow" class="faq-arrow-dark" />
        </div>
      </div>
      <nav class="faq-answer-wrap w-dropdown-list">
        <p class="faq-content text-white">${escapeHtml(faq.a)}</p>
      </nav>
    </div>
  `).join('');
  
  return `
    <section class="faq-section home-page">
      <div class="w-layout-blockcontainer container-regular w-container">
        <div class="faq-area">
          <div class="align-center">
            <div class="section-title-wrap large">
              <h2 class="section-title text-white">${i18n.t('faq_title') || 'Frequently asked question'}</h2>
              <div class="section-content-wrap">
                <p class="text-white">${i18n.t('faq_subtitle') || 'Our teams are purpose-built to support every stage of your brand\'s journey. From strategy to design and content, we create meaningful work that resonates with your audience and drives your business forward.'}</p>
              </div>
            </div>
          </div>
          <div class="faq-whole-wrap">
            ${faqItems}
          </div>
        </div>
      </div>
    </section>
  `;
}
// ============================================================
// بخش 7: Blog (مقالات اخیر) - اصلاح شده
// ============================================================
function renderBlogSection(blogs, currentLang) {
  const isRTL = currentLang === 'fa' || currentLang === 'ar';
  
  // اگر بلاگی وجود نداشت
  if (!blogs || blogs.length === 0) {
    return `
      <section class="article-section">
        <div class="container-regular">
          <div class="article-title-area">
            <div class="article-title-wrap">
              <h2 class="section-title">${i18n.t('blog_title') || 'Read news and articles'}</h2>
            </div>
            <a href="/${currentLang}/blog" class="primary-button" data-route="blog">${i18n.t('view_articles') || 'View All Articles'}</a>
          </div>
          <div style="text-align: center; padding: 60px;">
            <p>No blog posts found.</p>
          </div>
        </div>
      </section>
    `;
  }
  
  return `
    <section class="article-section">
      <div class="container-regular">
        <div class="article-title-area">
          <div class="article-title-wrap">
            <h2 class="section-title">${i18n.t('blog_title') || 'Read news and articles'}</h2>
          </div>
          <a href="/${currentLang}/blog" class="primary-button" data-route="blog">${i18n.t('view_articles') || 'View All Articles'}</a>
        </div>
        <div class="blog-grid-container ${isRTL ? 'rtl-blog' : ''}">
          <div class="blog-main-card">
            ${renderMainBlog(blogs[0], currentLang)}
          </div>
          <div class="blog-side-list">
            ${blogs.slice(1, 4).map(blog => renderSideBlog(blog, currentLang)).join('')}
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderMainBlog(blog, lang) {
  const title = lang === 'en' ? (blog.title_en || blog.title) : blog.title;
  const image = blog.images?.image_1 || '/assets/img/default-project.jpg';
  const excerpt = blog.excerpt || (lang === 'en' ? blog.description_en : blog.description) || '';
  const shortExcerpt = excerpt.length > 120 ? excerpt.substring(0, 120) + '...' : excerpt;
  
  return `
    <div class="blog-main-card-inner">
      <a href="/${lang}/blog-details?id=${blog.id}" class="blog-main-image-link">
        <img src="${image}" alt="${escapeHtml(title)}" class="blog-main-image" />
      </a>
      <div class="blog-main-content">
        <h3 class="blog-main-title">
          <a href="/${lang}/blog-details?id=${blog.id}">${escapeHtml(title)}</a>
        </h3>
        <p class="blog-main-excerpt">${escapeHtml(shortExcerpt)}</p>
        <a href="/${lang}/blog-details?id=${blog.id}" class="blog-read-more">${i18n.t('read_more') || 'Read More'} →</a>
      </div>
    </div>
  `;
}

function renderSideBlog(blog, lang) {
  const title = lang === 'en' ? (blog.title_en || blog.title) : blog.title;
  const image = blog.images?.image_1 || '/assets/img/default-project.jpg';
  
  return `
    <div class="blog-side-item">
      <a href="/${lang}/blog-details?id=${blog.id}" class="blog-side-image-link">
        <img src="${image}" alt="${escapeHtml(title)}" class="blog-side-image" />
      </a>
      <div class="blog-side-content">
        <h4 class="blog-side-title">
          <a href="/${lang}/blog-details?id=${blog.id}">${escapeHtml(title)}</a>
        </h4>
      </div>
    </div>
  `;
}

// ============================================================
// بخش 8: CTA (دعوت به اقدام)
// ============================================================
function renderCTASection(currentLang) {
  return `
    <section class="cta-section">
      <div class="w-layout-blockcontainer container-regular w-container">
        <div class="cta-image-wrap">
          <img src="/assets/img/cta-image.jpg" loading="lazy" alt="CTA" class="cta-image" />
          <div class="cta-title-area">
            <div class="cta-title-wrap">
              <h2 class="section-title text-white">${i18n.t('cta_title') || 'Are you geared up for the digital shift?'}</h2>
              <div class="cta-button-wrap">
                <a href="/${currentLang}/contact" class="cta-button" data-route="contact">${i18n.t('get_started') || 'Get Started'}</a>
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
// بخش 9: رویدادها (Event Handlers)
// ============================================================
function attachHomeEvents() {
  // FAQ Accordion
  document.querySelectorAll('.faq-question-wrap').forEach((question) => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      const arrowWrap = question.querySelector('.faq-arrow-wrap');
      
      if (answer.style.display === 'block') {
        answer.style.display = 'none';
        if (arrowWrap) arrowWrap.style.transform = 'rotate(0deg)';
      } else {
        answer.style.display = 'block';
        if (arrowWrap) arrowWrap.style.transform = 'rotate(180deg)';
      }
    });
  });
  
  // Intersection Observer for animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    },
    { threshold: 0.4 }
  );
  
  document.querySelectorAll('.scroll-animate, [data-w-id]').forEach(el => {
    observer.observe(el);
  });
}

// ============================================================
// بخش 10: تابع اصلی renderHome
// ============================================================
export async function renderHome() {
  const app = document.getElementById('app');
  const currentLang = i18n.getCurrentLanguage();
  
  // Fetch data
  const projects = await getProjects(6);
  const blogs = await getBlogs(4);
  
  app.innerHTML = `
    ${renderHeader()}
    ${renderHeroSection(currentLang)}
    ${renderClientSection()}
    ${renderFeatureSection()}
    ${renderCountSection(currentLang)}
    ${renderServicesSection(currentLang)}
    ${renderProjectsSection(projects, currentLang)}
    ${renderFAQSection()}
    ${renderBlogSection(blogs, currentLang)}
    ${renderCTASection(currentLang)}
    ${renderFooter()}
  `;
  
  // Attach events
  attachHeaderEvents();
  attachFooterEvents();
  attachHomeEvents();
  
  // Navigation links
  document.querySelectorAll('[data-route]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      if (href) window.location.href = href;
    });
  });
}

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}