// components/footer.js - نسخه با کنترل دستی RTL

import { i18n } from '../core/i18n.js';
import { subscribeNewsletter } from '../core/api.js';

export function renderFooter() {
  const currentLang = i18n.getCurrentLanguage();
  const isRTL = currentLang === 'fa' || currentLang === 'ar';
  
  return `
    <footer class="footer">
      <div class="footer-container">
        
        <!-- ===== ردیف 1 ===== -->
        <div class="footer-row-1 ${isRTL ? 'rtl-row1' : ''}">
          <div class="footer-logo-box ${isRTL ? 'rtl-logo' : ''}">
            <img src="/assets/img/logo.png" alt="Mazorya Group" class="footer-logo" />
            <p>${i18n.t('footer_newsletter_title')}</p>
          </div>
          <div class="footer-form-box ${isRTL ? 'rtl-form-box' : ''}">
            <h4>${i18n.t('footer_newsletter_title')}</h4>
            <form id="newsletter-form" class="footer-form ${isRTL ? 'rtl-form' : ''}">
              <input type="email" id="newsletter-email" placeholder="${i18n.t('footer_newsletter_placeholder')}" />
              <button type="submit">${i18n.t('footer_newsletter_btn')}</button>
            </form>
            <div id="newsletter-success" class="footer-success" style="display:none"></div>
            <div id="newsletter-error" class="footer-error" style="display:none"></div>
          </div>
        </div>
        
        <!-- ===== ردیف 2 ===== -->
        <div class="footer-row-2 ${isRTL ? 'rtl-row2' : ''}">
          <div class="footer-col footer-col-contact ${isRTL ? 'rtl-contact' : ''}">
            <h4>${i18n.t('contact_title') || 'Contact'}</h4>
            <ul>
              <li><a href="tel:+16267564509">+1 626 756 45 09</a></li>
              <li><a href="mailto:info@MazoryaGroup.com">info@MazoryaGroup.com</a></li>
            </ul>
          </div>
          <div class="footer-col footer-col-pages ${isRTL ? 'rtl-pages' : ''}">
            <h4>${i18n.t('footer_pages')}</h4>
            <ul>
              <li><a href="/${currentLang}/" data-route="home">${i18n.t('nav_home')}</a></li>
              <li><a href="/${currentLang}/about" data-route="about">${i18n.t('nav_about')}</a></li>
              <li><a href="/${currentLang}/projects" data-route="projects">${i18n.t('nav_projects')}</a></li>
              <li><a href="/${currentLang}/contact" data-route="contact">${i18n.t('nav_contact')}</a></li>
            </ul>
          </div>
          <div class="footer-col footer-col-services ${isRTL ? 'rtl-services' : ''}">
            <h4>${i18n.t('footer_services')}</h4>
            <ul>
              <li><a href="/${currentLang}/services" data-route="services">${i18n.t('nav_services')}</a></li>
            </ul>
          </div>
        </div>
        
        <!-- ===== ردیف 3 ===== -->
        <div class="footer-row-3 ${isRTL ? 'rtl-row3' : ''}">
          <div class="footer-social ${isRTL ? 'rtl-social' : ''}">
            <a href="https://www.instagram.com/mazorya_group" target="_blank">
              <img src="/assets/img/social/instagram-dark.svg" alt="Instagram" />
            </a>
            <a href="https://www.facebook.com" target="_blank">
              <img src="/assets/img/social/facebook-dark.svg" alt="Facebook" />
            </a>
            <a href="https://www.twitter.com" target="_blank">
              <img src="/assets/img/social/twitter-dark.svg" alt="Twitter" />
            </a>
          </div>
          <p class="footer-copyright ${isRTL ? 'rtl-copyright' : ''}">© 2025 Mazorya Group. ${i18n.t('footer_copyright')}</p>
        </div>
        
      </div>
    </footer>
  `;
}

export function attachFooterEvents() {
  const form = document.getElementById('newsletter-form');
  const emailInput = document.getElementById('newsletter-email');
  const successDiv = document.getElementById('newsletter-success');
  const errorDiv = document.getElementById('newsletter-error');
  
  if (form && emailInput) {
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);
    
    newForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const email = emailInput.value.trim();
      if (!email) {
        if (errorDiv) {
          errorDiv.textContent = 'Please enter your email';
          errorDiv.style.display = 'block';
          setTimeout(() => errorDiv.style.display = 'none', 3000);
        }
        return;
      }
      
      if (successDiv) successDiv.style.display = 'none';
      if (errorDiv) errorDiv.style.display = 'none';
      
      const submitBtn = newForm.querySelector('button');
      const originalText = submitBtn?.textContent;
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }
      
      const result = await subscribeNewsletter(email);
      
      if (result.success) {
        if (successDiv) {
          successDiv.textContent = result.message || 'Thank you for subscribing!';
          successDiv.style.display = 'block';
        }
        emailInput.value = '';
      } else {
        if (errorDiv) {
          errorDiv.textContent = result.message || 'Something went wrong';
          errorDiv.style.display = 'block';
        }
      }
      
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText || 'Subscribe';
      }
      
      setTimeout(() => {
        if (successDiv) successDiv.style.display = 'none';
        if (errorDiv) errorDiv.style.display = 'none';
      }, 5000);
    });
  }
  
  document.querySelectorAll('.footer-col a[data-route]').forEach(link => {
    const newLink = link.cloneNode(true);
    link.parentNode.replaceChild(newLink, link);
    
    newLink.addEventListener('click', (e) => {
      e.preventDefault();
      const href = newLink.getAttribute('href');
      if (href) window.location.href = href;
    });
  });
}