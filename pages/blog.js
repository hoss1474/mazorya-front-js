// pages/blog.js - Blog Listing Page (اصلاح شده)

import { i18n } from '../core/i18n.js';
import { renderHeader, attachHeaderEvents } from '../components/header.js';
import { renderFooter, attachFooterEvents } from '../components/footer.js';
import { getBlogs } from '../core/api.js';

export async function renderBlog() {
  const app = document.getElementById('app');
  const currentLang = i18n.getCurrentLanguage();
  const isRTL = currentLang === 'fa' || currentLang === 'ar';
  
  const blogs = await getBlogs();
  
  app.innerHTML = `
    ${renderHeader()}
    
    <!-- ===== Banner Section ===== -->
    <section class="blog-banner">
      <div class="w-layout-blockcontainer container-regular w-container">
        <div class="align-center">
          <div class="banner-title-wrap small">
            <h1 class="blog-banner-title">${i18n.t('blog_title') || 'Our Blog'}</h1>
            <p class="blog-banner-subtitle">${i18n.t('blog_subtitle') || 'Latest insights and articles from our team'}</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- ===== Blogs Grid Section ===== -->
    <section class="blog-list-section">
      <div class="w-layout-blockcontainer container-regular w-container">
        <div class="blogs-grid ${isRTL ? 'rtl-blog' : ''}">
          ${renderBlogCards(blogs, currentLang)}
        </div>
      </div>
    </section>
    
    <!-- ===== CTA Section ===== -->
    <section class="cta-section">
      <div class="w-layout-blockcontainer container-regular w-container">
        <div class="cta-image-wrap">
          <img src="/assets/img/cta-image.jpg" loading="lazy" alt="CTA" class="cta-image" />
          <div class="cta-title-area">
            <div class="cta-title-wrap">
              <h2 class="section-title text-white">${i18n.t('cta_blog_title') || 'Want to stay updated?'}</h2>
              <div class="cta-button-wrap">
                <a href="/${currentLang}/contact" class="cta-button" data-route="contact">${i18n.t('subscribe') || 'Subscribe'}</a>
              </div>
            </div>
          </div>
          <div class="cta-bg-wrap"></div>
        </div>
      </div>
    </section>
    
    ${renderFooter()}
  `;
  
  attachHeaderEvents();
  attachFooterEvents();
  
  document.querySelectorAll('[data-route]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      if (href) window.location.href = href;
    });
  });
}

// ============================================================
// رندر کارت‌های بلاگ (3 ستونه)
// ============================================================
function renderBlogCards(blogs, lang) {
  if (!blogs || blogs.length === 0) {
    return '<div class="no-blogs"><p>No blog posts found.</p></div>';
  }
  
  return blogs.map(blog => {
    const title = lang === 'en' ? (blog.title_en || blog.title) : blog.title;
    const description = lang === 'en' ? (blog.description_en || blog.description) : blog.description;
    const shortDesc = description ? (description.length > 120 ? description.substring(0, 120) + '...' : description) : '';
    const image = blog.images?.image_1 || '/assets/img/default-project.jpg';
    const link = `/${lang}/blog-details/${blog.slug}`;
    const date = blog.createdAt ? new Date(blog.createdAt).toLocaleDateString(lang === 'en' ? 'en-US' : 'fa-IR') : '';
    
    return `
      <div class="blog-card">
        <div class="blog-card-inner">
          <div class="blog-card-image">
            <a href="${link}" class="blog-image-link">
              <img src="${image}" alt="${escapeHtml(title)}" loading="lazy" />
            </a>
          </div>
          <div class="blog-card-content">
            ${date ? `<span class="blog-date">${escapeHtml(date)}</span>` : ''}
            <h3 class="blog-card-title">
              <a href="${link}">${escapeHtml(title)}</a>
            </h3>
            ${shortDesc ? `<p class="blog-card-excerpt">${escapeHtml(shortDesc)}</p>` : ''}
            <a href="${link}" class="blog-read-more">${i18n.t('read_more') || 'Read More'} →</a>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}