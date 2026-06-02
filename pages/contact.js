// pages/contact.js - Contact Page (اصلاح شده)

import { i18n } from '../core/i18n.js';
import { renderHeader, attachHeaderEvents } from '../components/header.js';
import { renderFooter, attachFooterEvents } from '../components/footer.js';
import { submitContactForm } from '../core/api.js';

export async function renderContact() {
  const app = document.getElementById('app');
  const currentLang = i18n.getCurrentLanguage();
  const isRTL = currentLang === 'fa' || currentLang === 'ar';
  
  app.innerHTML = `
    ${renderHeader()}
    
    <!-- ===== Contact Section ===== -->
    <section class="contact-page-section">
      <div class="w-layout-blockcontainer container-regular w-container">
        <div class="contact-grid ${isRTL ? 'rtl-contact' : ''}">
          
          <!-- ===== Contact Info (سمت راست در RTL) ===== -->
          <div class="contact-info-side">
            <div class="contact-info-header">
              <h1 class="contact-page-title">${i18n.t('contact_title') || 'Contact Us'}</h1>
              <p>${i18n.t('contact_subtitle') || 'Have a question or want to work with us? Fill out the form and we\'ll get back to you within 24 hours.'}</p>
            </div>
            
            <div class="contact-info-list">
              <div class="contact-info-item">
                <div class="contact-info-icon">
                  <img src="/assets/img/map-icon.svg" alt="Map" />
                </div>
                <div>
                  <h3>${i18n.t('office_title') || 'Our Office'}</h3>
                  <p>${i18n.t('office_address') || '123 Business Avenue, Downtown, New York, NY 10001'}</p>
                </div>
              </div>
              
              <div class="contact-info-item">
                <div class="contact-info-icon">
                  <img src="/assets/img/phone-icon.svg" alt="Phone" />
                </div>
                <div>
                  <h3>${i18n.t('phone_title') || 'Phone'}</h3>
                  <a href="tel:+16267564509">+1 626 756 45 09</a>
                </div>
              </div>
              
              <div class="contact-info-item">
                <div class="contact-info-icon">
                  <img src="/assets/img/mail-icon.svg" alt="Email" />
                </div>
                <div>
                  <h3>${i18n.t('email_title') || 'Email'}</h3>
                  <a href="mailto:info@MazoryaGroup.com">info@MazoryaGroup.com</a>
                </div>
              </div>
            </div>
          </div>
          
          <!-- ===== Contact Form (سمت چپ در RTL) ===== -->
          <div class="contact-form-side">
            <div class="contact-form-block">
              <form id="contact-form">
                <div class="contact-form-row">
                  <div class="contact-form-group">
                    <label for="name">${i18n.t('contact_name') || 'Name'} *</label>
                    <input type="text" id="name" name="name" class="contact-input" required />
                  </div>
                  <div class="contact-form-group">
                    <label for="phone">${i18n.t('contact_phone') || 'Phone'}</label>
                    <input type="tel" id="phone" name="phone" class="contact-input" />
                  </div>
                </div>
                
                <div class="contact-form-group">
                  <label for="email">${i18n.t('contact_email') || 'Email'} *</label>
                  <input type="email" id="email" name="email" class="contact-input" required />
                </div>
                
                <div class="contact-form-group">
                  <label for="message">${i18n.t('contact_message') || 'Message'} *</label>
                  <textarea id="message" name="message" class="contact-textarea" rows="5" required></textarea>
                </div>
                
                <button type="submit" class="contact-submit-btn" id="submitBtn">
                  ${i18n.t('contact_submit') || 'Send Message'}
                </button>
                
                <div id="successMsg" class="contact-success-msg" style="display: none;">
                  ✅ ${i18n.t('contact_success') || 'Your message has been sent successfully!'}
                </div>
                <div id="errorMsg" class="contact-error-msg" style="display: none;">
                  ❌ ${i18n.t('contact_error') || 'Something went wrong. Please try again.'}
                </div>
              </form>
            </div>
          </div>
          
        </div>
      </div>
    </section>
    
    ${renderFooter()}
  `;
  
  attachHeaderEvents();
  attachFooterEvents();
  
  // Contact form handler
  const form = document.getElementById('contact-form');
  const successDiv = document.getElementById('successMsg');
  const errorDiv = document.getElementById('errorMsg');
  const submitBtn = document.getElementById('submitBtn');
  
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name')?.value.trim();
      const email = document.getElementById('email')?.value.trim();
      const phone = document.getElementById('phone')?.value.trim();
      const message = document.getElementById('message')?.value.trim();
      
      if (!name || !email || !message) {
        errorDiv.style.display = 'block';
        errorDiv.textContent = 'Please fill in all required fields.';
        setTimeout(() => errorDiv.style.display = 'none', 3000);
        return;
      }
      
      successDiv.style.display = 'none';
      errorDiv.style.display = 'none';
      
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = i18n.t('sending') || 'Sending...';
      }
      
      const result = await submitContactForm({
        name,
        email,
        phone,
        message,
        lang: i18n.getCurrentLanguage()
      });
      
      if (result.success) {
        successDiv.style.display = 'block';
        form.reset();
        setTimeout(() => successDiv.style.display = 'none', 5000);
      } else {
        errorDiv.style.display = 'block';
        errorDiv.textContent = result.error || i18n.t('contact_error');
        setTimeout(() => errorDiv.style.display = 'none', 3000);
      }
      
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = i18n.t('contact_submit') || 'Send Message';
      }
    });
  }
  
  // Navigation
  document.querySelectorAll('[data-route]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      if (href) window.location.href = href;
    });
  });
}