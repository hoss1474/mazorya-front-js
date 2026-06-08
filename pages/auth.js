// pages/auth.js - Login Page (Only Email + Forgot Password)

import { i18n } from '../core/i18n.js';
import { renderHeader, attachHeaderEvents } from '../components/header.js';
import { renderFooter, attachFooterEvents } from '../components/footer.js';
import { loginUser, isAuthenticated} from '../core/api.js';

export async function renderAuth() {
  const app = document.getElementById('app');
  const currentLang = i18n.getCurrentLanguage();
  const isRTL = currentLang === 'fa' || currentLang === 'ar';
  
  if (isAuthenticated()) {
    window.location.href = `/${currentLang}/profile`;
    return;
  }
  
  app.innerHTML = `
    ${renderHeader()}
    
    <section class="auth-page">
      <div class="auth-bg-decoration">
        <div class="auth-bg-circle auth-bg-circle-1"></div>
        <div class="auth-bg-circle auth-bg-circle-2"></div>
        <div class="auth-bg-circle auth-bg-circle-3"></div>
      </div>
      
      <div class="auth-container">
        <div class="auth-card ${isRTL ? 'rtl-auth' : ''}">
          
          <!-- Logo -->
          <div class="auth-logo">
            <img src="/assets/img/logo.png" alt="Mazorya Group" />
          </div>
          
          <!-- Title -->
          <div class="auth-header">
            <h1>${i18n.t('login_title') || 'Welcome Back'}</h1>
            <p>${i18n.t('login_subtitle') || 'Login to your account'}</p>
          </div>
          
          <!-- ===== Login Form ===== -->
          <form id="login-form" class="auth-form">
            <div class="input-group">
              <div class="input-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <input type="email" id="login-email" placeholder="${i18n.t('email') || 'Email Address'}" autocomplete="email" />
            </div>
            
            <div class="input-group">
              <div class="input-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <input type="password" id="login-password" placeholder="${i18n.t('password') || 'Password'}" />
              <button type="button" class="password-toggle" data-target="login-password">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </button>
            </div>
            
            <div class="form-options">
              <label class="checkbox">
                <input type="checkbox" id="remember-me" />
                <span>${i18n.t('remember_me') || 'Remember me'}</span>
              </label>
              <button type="button" class="forgot-link" id="forgotPasswordBtn">${i18n.t('forgot_password') || 'Forgot Password?'}</button>
            </div>
            
            <button type="submit" class="auth-btn">
              <span>${i18n.t('login') || 'Login'}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </form>
          
          <!-- Message -->
          <div id="auth-message" class="auth-message" style="display: none;"></div>
          
        </div>
      </div>
    </section>
    
    <!-- ===== Forgot Password Modal ===== -->
    <div id="forgotModal" class="auth-modal" style="display: none;">
      <div class="auth-modal-overlay"></div>
      <div class="auth-modal-container">
        <div class="auth-modal-content ${isRTL ? 'rtl-auth' : ''}">
          <button class="auth-modal-close" id="closeModalBtn">&times;</button>
          
          <div class="auth-modal-header">
            <div class="auth-modal-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M12 8v4l3 3"/>
                <circle cx="12" cy="12" r="10"/>
              </svg>
            </div>
            <h2>${i18n.t('reset_password') || 'Reset Password'}</h2>
            <p>${i18n.t('reset_instructions') || 'Enter your email to receive a verification code'}</p>
          </div>
          
          <div id="forgot-step-1" class="auth-modal-step active">
            <div class="input-group">
              <div class="input-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <input type="email" id="forgot-email" placeholder="${i18n.t('email') || 'Email Address'}" />
            </div>
            <button id="sendCodeBtn" class="auth-modal-btn">
              <span>${i18n.t('send_code') || 'Send Reset Code'}</span>
            </button>
          </div>
          
          <div id="forgot-step-2" class="auth-modal-step">
            <div class="input-group">
              <div class="input-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <input type="text" id="reset-code" placeholder="${i18n.t('verification_code') || 'Verification Code'}" maxlength="6" />
            </div>
            <div class="input-group">
              <div class="input-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <input type="password" id="reset-password" placeholder="${i18n.t('new_password') || 'New Password'}" />
              <button type="button" class="password-toggle" data-target="reset-password">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </button>
            </div>
            <div class="input-group">
              <div class="input-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <input type="password" id="reset-confirm-password" placeholder="${i18n.t('confirm_password') || 'Confirm Password'}" />
            </div>
            <button id="resetPasswordBtn" class="auth-modal-btn">
              <span>${i18n.t('reset_password') || 'Reset Password'}</span>
            </button>
          </div>
          
          <div class="auth-modal-footer">
            <button class="auth-modal-back" id="backToLoginBtn">← ${i18n.t('back_to_login') || 'Back to Login'}</button>
          </div>
        </div>
      </div>
    </div>
    
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
  const currentLang = i18n.getCurrentLanguage();
  const isRTL = currentLang === 'fa' || currentLang === 'ar';
  
  // Password toggle
  document.querySelectorAll('.password-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const targetId = toggle.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (input) {
        const type = input.type === 'password' ? 'text' : 'password';
        input.type = type;
        const svg = toggle.querySelector('svg');
        if (type === 'text') {
          svg.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>';
        } else {
          svg.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
        }
      }
    });
  });
  
  // Login form
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email')?.value.trim();
      const password = document.getElementById('login-password')?.value.trim();
      const rememberMe = document.getElementById('remember-me')?.checked;
      const messageDiv = document.getElementById('auth-message');
      
      if (!email || !password) {
        showMessage(messageDiv, 'لطفاً ایمیل و رمز عبور را وارد کنید', 'error');
        return;
      }
      
      const submitBtn = loginForm.querySelector('.auth-btn');
      const originalHtml = submitBtn?.innerHTML;
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<div class="spinner"></div> در حال ورود...';
      }
      
      const result = await loginUser(email, password, rememberMe);
      
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHtml;
      }
      
      if (result.success) {
        showMessage(messageDiv, 'ورود موفق! در حال انتقال...', 'success');
        setTimeout(() => {
          window.location.href = `/${currentLang}/profile`;
        }, 1000);
      } else {
        showMessage(messageDiv, result.error || 'ایمیل یا رمز عبور اشتباه است', 'error');
      }
    });
  }
  
  // Forgot password modal
  const forgotBtn = document.getElementById('forgotPasswordBtn');
  const modal = document.getElementById('forgotModal');
  const closeModal = document.getElementById('closeModalBtn');
  const backToLogin = document.getElementById('backToLoginBtn');
  
  if (forgotBtn && modal) {
    forgotBtn.addEventListener('click', () => {
      modal.style.display = 'flex';
      document.getElementById('forgot-step-1').classList.add('active');
      document.getElementById('forgot-step-2').classList.remove('active');
    });
  }
  
  if (closeModal) {
    closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
      resetForgotForm();
    });
  }
  
  if (backToLogin) {
    backToLogin.addEventListener('click', () => {
      modal.style.display = 'none';
      resetForgotForm();
    });
  }
  
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      resetForgotForm();
    }
  });
  
  // Send code
  const sendCodeBtn = document.getElementById('sendCodeBtn');
  if (sendCodeBtn) {
    sendCodeBtn.addEventListener('click', async () => {
      const email = document.getElementById('forgot-email')?.value.trim();
      const messageDiv = document.getElementById('auth-message');
      
      if (!email) {
        showMessage(messageDiv, 'لطفاً ایمیل خود را وارد کنید', 'error');
        return;
      }
      
      sendCodeBtn.disabled = true;
      sendCodeBtn.innerHTML = '<div class="spinner"></div> در حال ارسال...';
      
      const result = await forgotPassword(email);
      
      sendCodeBtn.disabled = false;
      sendCodeBtn.innerHTML = '<span>ارسال کد</span>';
      
      if (result.success) {
        showMessage(messageDiv, 'کد تأیید به ایمیل شما ارسال شد', 'success');
        document.getElementById('forgot-step-1').classList.remove('active');
        document.getElementById('forgot-step-2').classList.add('active');
      } else {
        showMessage(messageDiv, result.error || 'ارسال کد ناموفق بود', 'error');
      }
    });
  }
  
  // Reset password
  const resetBtn = document.getElementById('resetPasswordBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', async () => {
      const email = document.getElementById('forgot-email')?.value.trim();
      const code = document.getElementById('reset-code')?.value.trim();
      const password = document.getElementById('reset-password')?.value.trim();
      const confirmPassword = document.getElementById('reset-confirm-password')?.value.trim();
      const messageDiv = document.getElementById('auth-message');
      
      if (!code || !password || !confirmPassword) {
        showMessage(messageDiv, 'لطفاً همه فیلدها را پر کنید', 'error');
        return;
      }
      
      if (password !== confirmPassword) {
        showMessage(messageDiv, 'رمز عبور و تأیید آن مطابقت ندارند', 'error');
        return;
      }
      
      if (password.length < 6) {
        showMessage(messageDiv, 'رمز عبور باید حداقل 6 کاراکتر باشد', 'error');
        return;
      }
      
      resetBtn.disabled = true;
      resetBtn.innerHTML = '<div class="spinner"></div> در حال بازنشانی...';
      
      const result = await resetPassword(email, code, password);
      
      resetBtn.disabled = false;
      resetBtn.innerHTML = '<span>بازنشانی رمز</span>';
      
      if (result.success) {
        showMessage(messageDiv, 'رمز عبور با موفقیت تغییر کرد! اکنون می‌توانید وارد شوید', 'success');
        setTimeout(() => {
          modal.style.display = 'none';
          resetForgotForm();
        }, 1500);
      } else {
        showMessage(messageDiv, result.error || 'بازنشانی رمز ناموفق بود', 'error');
      }
    });
  }
}

function resetForgotForm() {
  const emailInput = document.getElementById('forgot-email');
  const codeInput = document.getElementById('reset-code');
  const passwordInput = document.getElementById('reset-password');
  const confirmInput = document.getElementById('reset-confirm-password');
  
  if (emailInput) emailInput.value = '';
  if (codeInput) codeInput.value = '';
  if (passwordInput) passwordInput.value = '';
  if (confirmInput) confirmInput.value = '';
  
  document.getElementById('forgot-step-1')?.classList.add('active');
  document.getElementById('forgot-step-2')?.classList.remove('active');
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