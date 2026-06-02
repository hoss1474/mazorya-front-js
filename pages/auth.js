// pages/auth.js - Login & Register Page

import { i18n } from '../core/i18n.js';
import { renderHeader, attachHeaderEvents } from '../components/header.js';
import { renderFooter, attachFooterEvents } from '../components/footer.js';

// وضعیت صفحه (login یا register)
let activeTab = 'login';

export async function renderAuth() {
  const app = document.getElementById('app');
  const currentLang = i18n.getCurrentLanguage();
  const isRTL = currentLang === 'fa' || currentLang === 'ar';
  
  app.innerHTML = `
    ${renderHeader()}
    
    <section class="auth-section">
      <div class="w-layout-blockcontainer container-regular w-container">
        <div class="auth-container ${isRTL ? 'rtl-auth' : ''}">
          
          <!-- Tab Switcher -->
          <div class="auth-tabs">
            <button class="auth-tab ${activeTab === 'login' ? 'active' : ''}" data-tab="login">
              ${i18n.t('login') || 'Login'}
            </button>
            <button class="auth-tab ${activeTab === 'register' ? 'active' : ''}" data-tab="register">
              ${i18n.t('register') || 'Register'}
            </button>
          </div>
          
          <!-- Login Form -->
          <div id="login-form" class="auth-form ${activeTab === 'login' ? 'active' : ''}">
            <h2 class="auth-title">${i18n.t('login_title') || 'Welcome Back'}</h2>
            <p class="auth-subtitle">${i18n.t('login_subtitle') || 'Login with your email or phone number'}</p>
            
            <form id="login-form-element">
              <div class="auth-input-group">
                <label>${i18n.t('email_or_phone') || 'Email or Phone Number'}</label>
                <input type="text" id="login-identifier" class="auth-input" placeholder="${i18n.t('email_or_phone_placeholder') || 'example@email.com or +1234567890'}" />
              </div>
              
              <div class="auth-input-group">
                <label>${i18n.t('password') || 'Password'}</label>
                <div class="password-wrapper">
                  <input type="password" id="login-password" class="auth-input" placeholder="${i18n.t('password_placeholder') || 'Enter your password'}" />
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
                <a href="#" class="forgot-password">${i18n.t('forgot_password') || 'Forgot password?'}</a>
              </div>
              
              <button type="submit" class="auth-submit-btn">${i18n.t('login') || 'Login'}</button>
            </form>
            
            <div class="auth-divider">
              <span>${i18n.t('or') || 'OR'}</span>
            </div>
            
            <div class="auth-social">
              <button class="social-btn google">
                <img src="/assets/img/google-icon.svg" alt="Google" />
                ${i18n.t('continue_with_google') || 'Continue with Google'}
              </button>
              <button class="social-btn facebook">
                <img src="/assets/img/facebook-icon.svg" alt="Facebook" />
                ${i18n.t('continue_with_facebook') || 'Continue with Facebook'}
              </button>
            </div>
          </div>
          
          <!-- Register Form -->
          <div id="register-form" class="auth-form ${activeTab === 'register' ? 'active' : ''}">
            <h2 class="auth-title">${i18n.t('register_title') || 'Create Account'}</h2>
            <p class="auth-subtitle">${i18n.t('register_subtitle') || 'Sign up with your email or phone number'}</p>
            
            <form id="register-form-element">
              <div class="auth-input-group">
                <label>${i18n.t('full_name') || 'Full Name'}</label>
                <input type="text" id="register-name" class="auth-input" placeholder="${i18n.t('full_name_placeholder') || 'John Doe'}" />
              </div>
              
              <div class="auth-input-group">
                <label>${i18n.t('email') || 'Email'}</label>
                <input type="email" id="register-email" class="auth-input" placeholder="${i18n.t('email_placeholder') || 'example@email.com'}" />
              </div>
              
              <div class="auth-input-group">
                <label>${i18n.t('phone') || 'Phone Number'}</label>
                <input type="tel" id="register-phone" class="auth-input" placeholder="${i18n.t('phone_placeholder') || '+1234567890'}" />
              </div>
              
              <div class="auth-input-group">
                <label>${i18n.t('password') || 'Password'}</label>
                <div class="password-wrapper">
                  <input type="password" id="register-password" class="auth-input" placeholder="${i18n.t('password_placeholder') || 'Create a password'}" />
                  <button type="button" class="password-toggle" data-target="register-password">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  </button>
                </div>
              </div>
              
              <div class="auth-input-group">
                <label>${i18n.t('confirm_password') || 'Confirm Password'}</label>
                <div class="password-wrapper">
                  <input type="password" id="register-confirm-password" class="auth-input" placeholder="${i18n.t('confirm_password_placeholder') || 'Confirm your password'}" />
                  <button type="button" class="password-toggle" data-target="register-confirm-password">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  </button>
                </div>
              </div>
              
              <div class="auth-terms">
                <label class="checkbox-label">
                  <input type="checkbox" id="terms-checkbox" required /> 
                  ${i18n.t('agree_terms') || 'I agree to the'} <a href="/${currentLang}/terms">${i18n.t('terms') || 'Terms of Service'}</a> ${i18n.t('and') || 'and'} <a href="/${currentLang}/privacy">${i18n.t('privacy') || 'Privacy Policy'}</a>
                </label>
              </div>
              
              <button type="submit" class="auth-submit-btn">${i18n.t('register') || 'Register'}</button>
            </form>
            
            <div class="auth-divider">
              <span>${i18n.t('or') || 'OR'}</span>
            </div>
            
            <div class="auth-social">
              <button class="social-btn google">
                <img src="/assets/img/google-icon.svg" alt="Google" />
                ${i18n.t('signup_with_google') || 'Sign up with Google'}
              </button>
              <button class="social-btn x">
                <img src="/assets/img/x-icon.svg" alt="x" />
                ${i18n.t('signup_with_x') || 'Sign up with x'}
              </button>
            </div>
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
  // Tab switching
  const tabs = document.querySelectorAll('.auth-tab');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabName = tab.getAttribute('data-tab');
      activeTab = tabName;
      
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      if (tabName === 'login') {
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
      } else {
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
      }
    });
  });
  
  // Password visibility toggle
  const passwordToggles = document.querySelectorAll('.password-toggle');
  passwordToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const targetId = toggle.getAttribute('data-target');
      const input = document.getElementById(targetId);
      const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
      input.setAttribute('type', type);
      
      // Change icon
      const svg = toggle.querySelector('svg');
      if (type === 'text') {
        svg.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>';
      } else {
        svg.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
      }
    });
  });
  
  // Login form submit
  const loginFormElement = document.getElementById('login-form-element');
  if (loginFormElement) {
    loginFormElement.addEventListener('submit', async (e) => {
      e.preventDefault();
      const identifier = document.getElementById('login-identifier')?.value.trim();
      const password = document.getElementById('login-password')?.value.trim();
      const rememberMe = document.getElementById('remember-me')?.checked;
      const messageDiv = document.getElementById('auth-message');
      
      if (!identifier || !password) {
        showMessage(messageDiv, i18n.t('fill_all_fields') || 'Please fill all fields', 'error');
        return;
      }
      
      // TODO: Call login API
      showMessage(messageDiv, i18n.t('login_success') || 'Login successful! Redirecting...', 'success');
      
      setTimeout(() => {
        window.location.href = `/${i18n.getCurrentLanguage()}/profile`;
      }, 1500);
    });
  }
  
  // Register form submit
  const registerFormElement = document.getElementById('register-form-element');
  if (registerFormElement) {
    registerFormElement.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('register-name')?.value.trim();
      const email = document.getElementById('register-email')?.value.trim();
      const phone = document.getElementById('register-phone')?.value.trim();
      const password = document.getElementById('register-password')?.value.trim();
      const confirmPassword = document.getElementById('register-confirm-password')?.value.trim();
      const termsChecked = document.getElementById('terms-checkbox')?.checked;
      const messageDiv = document.getElementById('auth-message');
      
      if (!name || !email || !phone || !password) {
        showMessage(messageDiv, i18n.t('fill_all_fields') || 'Please fill all fields', 'error');
        return;
      }
      
      if (password !== confirmPassword) {
        showMessage(messageDiv, i18n.t('password_mismatch') || 'Passwords do not match', 'error');
        return;
      }
      
      if (password.length < 6) {
        showMessage(messageDiv, i18n.t('password_length') || 'Password must be at least 6 characters', 'error');
        return;
      }
      
      if (!termsChecked) {
        showMessage(messageDiv, i18n.t('accept_terms') || 'Please accept the Terms of Service', 'error');
        return;
      }
      
      // TODO: Call register API
      showMessage(messageDiv, i18n.t('register_success') || 'Registration successful! Redirecting to login...', 'success');
      
      setTimeout(() => {
        activeTab = 'login';
        const loginTab = document.querySelector('.auth-tab[data-tab="login"]');
        if (loginTab) loginTab.click();
      }, 1500);
    });
  }
}

function showMessage(element, message, type) {
  if (element) {
    element.textContent = message;
    element.className = `auth-message ${type}`;
    element.style.display = 'block';
    setTimeout(() => {
      element.style.display = 'none';
    }, 5000);
  }
}