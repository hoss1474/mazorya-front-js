// pages/auth.js - Login Page (Only Login with Email/Password + Phone/OTP)

import { i18n } from '../core/i18n.js';
import { renderHeader, attachHeaderEvents } from '../components/header.js';
import { renderFooter, attachFooterEvents } from '../components/footer.js';
import { loginUser,  isAuthenticated } from '../core/api.js';

// وضعیت صفحه (email یا phone)
let loginMethod = 'email';
let otpSent = false;
let otpVerified = false;
let phoneNumber = '';

export async function renderAuth() {
  const app = document.getElementById('app');
  const currentLang = i18n.getCurrentLanguage();
  const isRTL = currentLang === 'fa' || currentLang === 'ar';
  
  // اگر قبلاً لاگین کرده، مستقیم بره پروفایل
  if (isAuthenticated()) {
    window.location.href = `/${currentLang}/profile`;
    return;
  }
  
  app.innerHTML = `
    ${renderHeader()}
    
    <section class="auth-section">
      <div class="w-layout-blockcontainer container-regular w-container">
        <div class="auth-container ${isRTL ? 'rtl-auth' : ''}">
          
          <!-- عنوان صفحه -->
          <div class="auth-header">
            <h1 class="auth-main-title">${i18n.t('login_title') || 'Welcome Back'}</h1>
            <p class="auth-main-subtitle">${i18n.t('login_subtitle') || 'Choose your preferred login method'}</p>
          </div>
          
          <!-- انتخاب روش ورود -->
          <div class="login-method-tabs">
            <button class="method-tab ${loginMethod === 'email' ? 'active' : ''}" data-method="email">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M22 7l-10 7L2 7"/>
              </svg>
              ${i18n.t('login_with_email') || 'Email & Password'}
            </button>
            <button class="method-tab ${loginMethod === 'phone' ? 'active' : ''}" data-method="phone">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                <line x1="12" y1="18" x2="12.01" y2="18"/>
              </svg>
              ${i18n.t('login_with_phone') || 'Phone & OTP'}
            </button>
          </div>
          
          <!-- ===== فرم ورود با ایمیل و پسورد ===== -->
          <div id="email-login-form" class="auth-form ${loginMethod === 'email' ? 'active' : ''}">
            <form id="login-email-form-element">
              <div class="auth-input-group">
                <label>${i18n.t('email') || 'Email Address'}</label>
                <input type="email" id="login-email" class="auth-input" placeholder="${i18n.t('email_placeholder') || 'example@email.com'}" required />
              </div>
              
              <div class="auth-input-group">
                <label>${i18n.t('password') || 'Password'}</label>
                <div class="password-wrapper">
                  <input type="password" id="login-password" class="auth-input" placeholder="${i18n.t('password_placeholder') || 'Enter your password'}" required />
                  <button type="button" class="password-toggle" data-target="login-password">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  </button>
                </div>
              </div>
              
              <div class="auth-options">
                <label class="checkbox-label">
                  <input type="checkbox" id="remember-me" /> ${i18n.t('remember_me') || 'Remember me'}
                </label>
                <a href="#" class="forgot-password" id="forgotPasswordBtn">${i18n.t('forgot_password') || 'Forgot password?'}</a>
              </div>
              
              <button type="submit" class="auth-submit-btn">${i18n.t('login') || 'Login'}</button>
            </form>
          </div>
          
          <!-- ===== فرم ورود با شماره موبایل و OTP ===== -->
          <div id="phone-login-form" class="auth-form ${loginMethod === 'phone' ? 'active' : ''}">
            <form id="login-phone-form-element">
              <div class="auth-input-group">
                <label>${i18n.t('phone_number') || 'Phone Number'}</label>
                <div class="phone-input-wrapper">
                  <select id="phone-country-code" class="country-code-select">
                    <option value="+1">🇺🇸 +1 (USA)</option>
                    <option value="+44">🇬🇧 +44 (UK)</option>
                    <option value="+90">🇹🇷 +90 (Turkey)</option>
                    <option value="+98" selected>🇮🇷 +98 (Iran)</option>
                    <option value="+966">🇸🇦 +966 (KSA)</option>
                    <option value="+49">🇩🇪 +49 (Germany)</option>
                    <option value="+33">🇫🇷 +33 (France)</option>
                    <option value="+34">🇪🇸 +34 (Spain)</option>
                  </select>
                  <input type="tel" id="login-phone" class="auth-input" placeholder="${i18n.t('phone_placeholder') || '9123456789'}" required />
                </div>
              </div>
              
              <div id="otp-section" style="display: none;">
                <div class="auth-input-group">
                  <label>${i18n.t('otp_code') || 'OTP Code'}</label>
                  <input type="text" id="login-otp" class="auth-input" placeholder="${i18n.t('otp_placeholder') || 'Enter 6-digit code'}" maxlength="6" />
                </div>
              </div>
              
              <button type="button" id="sendOtpBtn" class="auth-submit-btn secondary">${i18n.t('send_otp') || 'Send OTP'}</button>
              <button type="submit" id="verifyOtpBtn" class="auth-submit-btn" style="display: none;">${i18n.t('verify_login') || 'Verify & Login'}</button>
            </form>
          </div>
          
          <!-- Messages -->
          <div id="auth-message" class="auth-message" style="display: none;"></div>
          
        </div>
      </div>
    </section>
    
    ${renderFooter()}
  `;
  
  attachHeaderEvents();
  attachFooterEvents();
  attachAuthEvents();
  
  document.querySelectorAll('[data-route]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      if (href) window.location.href = href;
    });
  });
}

function attachAuthEvents() {
  // ===== تغییر روش ورود =====
  const methodTabs = document.querySelectorAll('.method-tab');
  const emailForm = document.getElementById('email-login-form');
  const phoneForm = document.getElementById('phone-login-form');
  
  methodTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const method = tab.getAttribute('data-method');
      loginMethod = method;
      otpSent = false;
      otpVerified = false;
      
      methodTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      if (method === 'email') {
        emailForm.classList.add('active');
        phoneForm.classList.remove('active');
      } else {
        phoneForm.classList.add('active');
        emailForm.classList.remove('active');
        resetOtpForm();
      }
    });
  });
  
  // ===== Password visibility toggle =====
  const passwordToggles = document.querySelectorAll('.password-toggle');
  passwordToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const targetId = toggle.getAttribute('data-target');
      const input = document.getElementById(targetId);
      const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
      input.setAttribute('type', type);
      
      const svg = toggle.querySelector('svg');
      if (type === 'text') {
        svg.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>';
      } else {
        svg.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
      }
    });
  });
  
  // ===== فرم ورود با ایمیل (نسخه اصلاح شده نهایی) =====
  const loginEmailForm = document.getElementById('login-email-form-element');
  if (loginEmailForm) {
    loginEmailForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const email = document.getElementById('login-email')?.value.trim();
      const password = document.getElementById('login-password')?.value.trim();
      const rememberMe = document.getElementById('remember-me')?.checked;
      const messageDiv = document.getElementById('auth-message');
      
      if (!email || !password) {
        showMessage(messageDiv, 'لطفاً ایمیل و رمز عبور را وارد کنید', 'error');
        return;
      }
      
      // غیرفعال کردن دکمه
      const submitBtn = loginEmailForm.querySelector('.auth-submit-btn');
      const originalText = submitBtn?.textContent;
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'در حال ورود...';
      }
      
      // مخفی کردن پیام قبلی
      if (messageDiv) {
        messageDiv.style.display = 'none';
        messageDiv.className = 'auth-message';
      }
      
      // ارسال درخواست لاگین
      const result = await loginUser(email, password, rememberMe);
      console.log('Login result:', result);
      
      // فعال کردن دکمه
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText || 'ورود';
      }
      
      if (result.success) {
        // نمایش پیام موفقیت
        showMessage(messageDiv, 'ورود موفق! در حال انتقال به پروفایل...', 'success');
        
        // هدایت به صفحه پروفایل با استفاده از replace
        setTimeout(() => {
          const currentLang = i18n.getCurrentLanguage();
          const profileUrl = `/${currentLang}/profile`;
          console.log('Redirecting to:', profileUrl);
          window.location.replace(profileUrl);
        }, 1000);
        
      } else {
        const errorMsg = result.error || 'ایمیل یا رمز عبور اشتباه است';
        showMessage(messageDiv, errorMsg, 'error');
      }
    });
  }
  
  // ===== OTP related functions =====
  const sendOtpBtn = document.getElementById('sendOtpBtn');
  const verifyOtpBtn = document.getElementById('verifyOtpBtn');
  const otpSection = document.getElementById('otp-section');
  const loginPhone = document.getElementById('login-phone');
  const countryCodeSelect = document.getElementById('phone-country-code');
  const otpInput = document.getElementById('login-otp');
  
  if (sendOtpBtn) {
    sendOtpBtn.addEventListener('click', async () => {
      const countryCode = countryCodeSelect?.value || '+98';
      const phone = loginPhone?.value.trim();
      const messageDiv = document.getElementById('auth-message');
      
      if (!phone) {
        showMessage(messageDiv, 'لطفاً شماره موبایل را وارد کنید', 'error');
        return;
      }
      
      phoneNumber = countryCode + phone.replace(/^0+/, '');
      
      sendOtpBtn.disabled = true;
      sendOtpBtn.textContent = 'در حال ارسال...';
      
      const result = await sendOtp(phoneNumber);
      
      sendOtpBtn.disabled = false;
      sendOtpBtn.textContent = 'ارسال کد';
      
      if (result.success) {
        otpSent = true;
        otpSection.style.display = 'block';
        sendOtpBtn.style.display = 'none';
        verifyOtpBtn.style.display = 'block';
        showMessage(messageDiv, 'کد تایید به شماره شما ارسال شد', 'success');
      } else {
        showMessage(messageDiv, result.error || 'ارسال کد ناموفق بود', 'error');
      }
    });
  }
  
  if (verifyOtpBtn) {
    verifyOtpBtn.addEventListener('click', async () => {
      const otp = otpInput?.value.trim();
      const messageDiv = document.getElementById('auth-message');
      
      if (!otp || otp.length < 4) {
        showMessage(messageDiv, 'لطفاً کد تایید را وارد کنید', 'error');
        return;
      }
      
      verifyOtpBtn.disabled = true;
      verifyOtpBtn.textContent = 'در حال بررسی...';
      
      const result = await verifyOtp(phoneNumber, otp);
      
      verifyOtpBtn.disabled = false;
      verifyOtpBtn.textContent = 'تایید و ورود';
      
      if (result.success) {
        showMessage(messageDiv, 'ورود موفق! در حال انتقال...', 'success');
        setTimeout(() => {
          const currentLang = i18n.getCurrentLanguage();
          window.location.replace(`/${currentLang}/profile`);
        }, 1000);
      } else {
        showMessage(messageDiv, result.error || 'کد نادرست است', 'error');
      }
    });
  }
  
  // Forgot password
  const forgotBtn = document.getElementById('forgotPasswordBtn');
  if (forgotBtn) {
    forgotBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const messageDiv = document.getElementById('auth-message');
      showMessage(messageDiv, 'لینک بازیابی رمز عبور به ایمیل شما ارسال خواهد شد.', 'info');
    });
  }
}

function resetOtpForm() {
  const otpSection = document.getElementById('otp-section');
  const sendOtpBtn = document.getElementById('sendOtpBtn');
  const verifyOtpBtn = document.getElementById('verifyOtpBtn');
  const otpInput = document.getElementById('login-otp');
  const loginPhone = document.getElementById('login-phone');
  
  otpSent = false;
  otpVerified = false;
  
  if (otpSection) otpSection.style.display = 'none';
  if (sendOtpBtn) sendOtpBtn.style.display = 'block';
  if (verifyOtpBtn) verifyOtpBtn.style.display = 'none';
  if (otpInput) otpInput.value = '';
  if (loginPhone) loginPhone.value = '';
}

function showMessage(element, message, type) {
  if (element) {
    element.textContent = message;
    element.className = `auth-message ${type}`;
    element.style.display = 'block';
    
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    setTimeout(() => {
      element.style.display = 'none';
    }, 5000);
  }
}