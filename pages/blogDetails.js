// pages/blogDetails.js - Blog Details Page

import { i18n } from '../core/i18n.js';
import { renderHeader, attachHeaderEvents } from '../components/header.js';
import { renderFooter, attachFooterEvents } from '../components/footer.js';
import { getBlogById } from '../core/api.js';

export async function renderBlogDetails(params) {
  const app = document.getElementById('app');
  const currentLang = i18n.getCurrentLanguage();
  const isRTL = currentLang === 'fa' || currentLang === 'ar';
  
  // گرفتن ID از پارامترها یا URL
  let blogId = params?.id;
  if (!blogId) {
    const urlParams = new URLSearchParams(window.location.search);
    blogId = urlParams.get('id');
  }
  
  if (!blogId) {
    window.location.href = `/${currentLang}/blog`;
    return;
  }
  
  const blog = await getBlogById(blogId);
  
  if (!blog) {
    app.innerHTML = `
      ${renderHeader()}
      <div class="container-regular" style="text-align: center; padding: 100px 20px;">
        <h1>${i18n.t('blog_not_found') || 'Blog Post Not Found'}</h1>
        <p>${i18n.t('blog_not_found_desc') || 'The article you are looking for does not exist.'}</p>
        <a href="/${currentLang}/blog" class="primary-button" style="display: inline-block; margin-top: 20px;">${i18n.t('back_to_blog') || 'Back to Blog'}</a>
      </div>
      ${renderFooter()}
    `;
    attachHeaderEvents();
    attachFooterEvents();
    return;
  }
  
  const title = currentLang === 'en' ? (blog.title_en || blog.title) : blog.title;
  const description = currentLang === 'en' ? (blog.description_en || blog.description) : blog.description;
  const sections = blog.sections || [];
  const date = blog.createdAt ? new Date(blog.createdAt).toLocaleDateString(currentLang === 'en' ? 'en-US' : 'fa-IR') : '';
  
  app.innerHTML = `
    ${renderHeader()}
    
    <!-- ===== Blog Details Section ===== -->
    <section class="blog-details-page">
      <div class="w-layout-blockcontainer container-regular w-container">
        
        <!-- هدر مقاله -->
        <div class="blog-details-header">
          <h1 class="blog-details-title">${escapeHtml(title)}</h1>
          ${date ? `<div class="blog-details-date">${escapeHtml(date)}</div>` : ''}
          ${description ? `<p class="blog-details-subtitle">${escapeHtml(description)}</p>` : ''}
        </div>
        
        <!-- تصویر اصلی -->
        ${blog.images?.image_1 ? `
          <div class="blog-details-image-main">
            <img src="${blog.images.image_1}" alt="${escapeHtml(title)}" class="blog-details-image" />
          </div>
        ` : ''}
        
        <!-- محتوای اصلی (سکشن‌ها) -->
        <div class="blog-details-content">
          ${renderBlogSections(sections, currentLang)}
        </div>
        
        <!-- تصویر دوم -->
        ${blog.images?.image_2 ? `
          <div class="blog-details-image-secondary">
            <img src="${blog.images.image_2}" alt="${escapeHtml(title)}" class="blog-details-image" />
          </div>
        ` : ''}
        
      </div>
    </section>
    
    <!-- ===== CTA Section ===== -->
    <section class="cta-section">
      <div class="w-layout-blockcontainer container-regular w-container">
        <div class="cta-image-wrap">
          <img src="/assets/img/cta-image.jpg" loading="lazy" alt="CTA" class="cta-image" />
          <div class="cta-title-area">
            <div class="cta-title-wrap">
              <h2 class="section-title text-white">${i18n.t('cta_blog_details') || 'Enjoyed this article?'}</h2>
              <div class="cta-button-wrap">
                <a href="/${currentLang}/contact" class="cta-button" data-route="contact">${i18n.t('get_in_touch') || 'Get in Touch'}</a>
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
// رندر بخش‌های محتوایی بلاگ
// ============================================================
function renderBlogSections(sections, lang) {
  if (!sections || sections.length === 0) return '';
  
  return sections.map(section => {
    const title = lang === 'en' ? (section.title_en || section.title) : (section.title || section.title_en);
    const description = lang === 'en' ? (section.description_en || section.description) : (section.description || section.description_en);
    
    return `
      <div class="blog-details-block">
        ${title ? `<h2 class="blog-details-block-title">${escapeHtml(title)}</h2>` : ''}
        ${description ? `<div class="blog-details-block-content"><p>${escapeHtml(description)}</p></div>` : ''}
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