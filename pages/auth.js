
/**
 * Mazorya Group - Authentication Page
 * File: pages/auth.js
 *
 * Email login and two-step password recovery.
 * Compatible with the existing core/api.js.
 */

import { i18n } from '../core/i18n.js';

import {
  renderHeader,
  attachHeaderEvents
} from '../components/header.js';

import {
  loginUser,
  isAuthenticated,
  forgotPassword,
  resetPassword
} from '../core/api.js';

// ============================================================
// HELPERS
// ============================================================

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function tr(key, fallback = '') {
  const value = i18n.t(key);

  if (
    value === undefined ||
    value === null ||
    value === '' ||
    value === key
  ) {
    return fallback;
  }

  return String(value);
}

function t(key, fallback = '') {
  return escapeHtml(tr(key, fallback));
}

function isRTL(lang) {
  return lang === 'fa' || lang === 'ar';
}

function isValidEmail(email) {
  if (!email || email.length > 255) return false;

  const input = document.createElement('input');
  input.type = 'email';
  input.value = email;

  return input.checkValidity();
}

function getErrorMessage(result, fallback) {
  if (typeof result?.error === 'string' && result.error.trim()) {
    return result.error;
  }

  if (
    result?.success === false &&
    typeof result?.message === 'string' &&
    result.message.trim()
  ) {
    return result.message;
  }

  return fallback;
}

// ============================================================
// ICONS
// ============================================================

const emailIcon = `
  <svg width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" stroke-width="2"
    aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
`;

const lockIcon = `
  <svg width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" stroke-width="2"
    aria-hidden="true">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
`;

const eyeIcon = `
  <svg width="18" height="18" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" stroke-width="2"
    aria-hidden="true">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
`;

const eyeOffIcon = `
  <svg width="18" height="18" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" stroke-width="2"
    aria-hidden="true">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
`;

const arrowIcon = `
  <svg width="18" height="18" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" stroke-width="2"
    aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
`;

const clockIcon = `
  <svg width="40" height="40" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" stroke-width="1.5"
    aria-hidden="true">
    <path d="M12 8v4l3 3"/>
    <circle cx="12" cy="12" r="10"/>
  </svg>
`;

const codeIcon = `
  <svg width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" stroke-width="2"
    aria-hidden="true">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
`;

// ============================================================
// LOGIN SECTION
// ============================================================

function renderLoginSection(lang) {
  const rtl = isRTL(lang);
  const text = (en, fa) => rtl ? fa : en;

  return `
    <section class="auth-portal" id="mazoryaAuthPortal">
      <div class="portal-noise" aria-hidden="true"></div>
      <div class="portal-glow" aria-hidden="true"></div>

      <div class="portal-stage" id="portalInteractive">
        <div class="portal-floor" aria-hidden="true"></div>
        <div class="portal-giant-title" aria-hidden="true">MAZORYA</div>

        <div class="portal-tunnel" aria-hidden="true">
          <div class="portal-frame portal-frame--1"></div>
          <div class="portal-frame portal-frame--2"></div>
          <div class="portal-frame portal-frame--3"></div>
          <div class="portal-frame portal-frame--4"></div>
          <div class="portal-frame portal-frame--5"></div>
        </div>

        <span class="portal-star portal-star--one" aria-hidden="true">✳</span>
        <span class="portal-star portal-star--two" aria-hidden="true">✳</span>

        <div class="portal-card" dir="${rtl ? 'rtl' : 'ltr'}">
          <div class="portal-overline">${text('PRIVATE ACCESS / 02', 'ورود اختصاصی / ۰۲')}</div>

          <div class="portal-intro">
            <h1>${t('login_title', text('Your next dimension.', 'به دنیای مزوریا خوش آمدید'))}</h1>
            <p>${t('login_subtitle', text('One account. Infinite possibilities.', 'یک حساب، دنیایی از فرصت‌ها.'))}</p>
          </div>

          <form id="login-form" class="portal-form" novalidate>
            <label class="portal-label" for="login-email">${t('email', 'Email Address')}</label>
            <div class="portal-field">
              <span class="portal-field-icon" aria-hidden="true">${emailIcon}</span>
              <input
                id="login-email" name="email" type="email"
                placeholder="${t('email', 'Email Address')}"
                aria-label="${t('email', 'Email Address')}"
                autocomplete="email" maxlength="255" required dir="ltr"
              />
            </div>

            <label class="portal-label" for="login-password">${t('password', 'Password')}</label>
            <div class="portal-field portal-field--password">
              <span class="portal-field-icon" aria-hidden="true">${lockIcon}</span>
              <input
                id="login-password" name="password" type="password"
                placeholder="${t('password', 'Password')}"
                aria-label="${t('password', 'Password')}"
                autocomplete="current-password" required
              />
              <button
                type="button" class="password-toggle portal-eye"
                data-target="login-password"
                aria-label="${t('show_password', 'Show password')}"
                aria-pressed="false"
              >${eyeIcon}</button>
            </div>

            <div class="portal-options">
              <label class="portal-remember">
                <input id="remember-me" name="remember" type="checkbox" />
                <span>${t('remember_me', 'Remember me')}</span>
              </label>
              <button type="button" class="portal-forgot" id="forgotPasswordBtn">
                ${t('forgot_password', 'Forgot Password?')}
              </button>
            </div>

            <button type="submit" class="portal-submit" id="loginSubmitBtn">
              <span>${t('login', 'Login')}</span>
              <span class="portal-submit-arrow" aria-hidden="true">↗</span>
            </button>
          </form>

          <div id="auth-message" class="auth-message portal-message"
               role="status" aria-live="polite" style="display:none;"></div>

          <div class="portal-card-footer">
            <span>${text('SECURED EXPERIENCE', 'اتصال امن')}</span>
            <span class="portal-online">● ${text('ONLINE', 'آنلاین')}</span>
          </div>
        </div>
      </div>

    </section>
  `;
}

// ============================================================
// FORGOT PASSWORD MODAL
// ============================================================

function renderForgotModal(lang) {
  const rtl = isRTL(lang);
  const text = (en, fa) => rtl ? fa : en;

  return `
    <div
      id="forgotModal"
      class="auth-modal portal-recovery-modal"
      style="display:none;"
      aria-hidden="true"
    >
      <div class="auth-modal-overlay recovery-backdrop"></div>

      <div class="auth-modal-container recovery-scene">
        <div class="recovery-grain" aria-hidden="true"></div>
        <div class="recovery-floor" aria-hidden="true"></div>
        <div class="recovery-arch recovery-arch--back" aria-hidden="true"></div>
        <div class="recovery-arch recovery-arch--middle" aria-hidden="true"></div>
        <div class="recovery-arch recovery-arch--front" aria-hidden="true"></div>

        <div class="recovery-scene-brand" aria-hidden="true">
          MAZORYA<span>.</span>
        </div>
        <span class="recovery-scene-label" aria-hidden="true">
          ${text('SECURE RECOVERY / 002', 'بازیابی امن / ۰۲')}
        </span>

        <div
          class="auth-modal-content recovery-card ${rtl ? 'rtl-auth' : ''}"
          role="dialog"
          aria-modal="true"
          aria-labelledby="forgotModalTitle"
          dir="${rtl ? 'rtl' : 'ltr'}"
        >
          <div class="recovery-card-top">
            <span class="recovery-kicker" id="recoveryKicker">
              ${text('ACCOUNT RECOVERY / 01', 'بازیابی حساب / ۰۱')}
            </span>
            <button
              type="button"
              class="auth-modal-close recovery-close"
              id="closeModalBtn"
              aria-label="${t('close', text('Close', 'بستن'))}"
            >
              &times;
            </button>
          </div>

          <div class="recovery-symbol" aria-hidden="true">↗</div>

          <div class="auth-modal-header recovery-header">
            <h2 id="forgotModalTitle">
              ${text('Find your way back.', 'راه بازگشت به مزوریا.')}
            </h2>
            <p id="recoverySubtitle">
              ${text(
                'Every path has a way forward. Enter your email to start your account recovery.',
                'هر مسیری راه بازگشتی دارد. برای شروع بازیابی حساب، ایمیل خود را وارد کنید.'
              )}
            </p>
          </div>

          <div class="recovery-progress" aria-label="${text('Recovery steps', 'مراحل بازیابی')}">
            <span class="recovery-progress-segment active" aria-hidden="true"></span>
            <span class="recovery-progress-segment" aria-hidden="true"></span>
          </div>

          <!-- Step 1: request verification code -->
          <div id="forgot-step-1" class="auth-modal-step recovery-step active">
            <label class="recovery-label" for="forgot-email">
              ${t('email', text('Email Address', 'آدرس ایمیل'))}
            </label>
            <div class="input-group recovery-field">
              <div class="input-icon" aria-hidden="true">${emailIcon}</div>
              <input
                type="email"
                id="forgot-email"
                placeholder="${t('email', text('Email Address', 'آدرس ایمیل'))}"
                aria-label="${t('email', text('Email Address', 'آدرس ایمیل'))}"
                autocomplete="email"
                maxlength="255"
                dir="ltr"
              />
            </div>

            <button
              type="button"
              id="sendCodeBtn"
              class="auth-modal-btn recovery-primary"
            >
              <span>${t('send_code', text('Continue to Verification', 'دریافت کد تأیید'))}</span>
              <span class="recovery-button-arrow" aria-hidden="true">↗</span>
            </button>
          </div>

          <!-- Step 2: verify code and reset password -->
          <div id="forgot-step-2" class="auth-modal-step recovery-step" hidden>
            <label class="recovery-label" for="reset-code">
              ${t('verification_code', text('Verification Code', 'کد تأیید'))}
            </label>
            <div class="input-group recovery-field">
              <div class="input-icon" aria-hidden="true">${codeIcon}</div>
              <input
                type="text"
                id="reset-code"
                placeholder="${t('verification_code', text('Verification Code', 'کد تأیید'))}"
                aria-label="${t('verification_code', text('Verification Code', 'کد تأیید'))}"
                autocomplete="one-time-code"
                maxlength="6"
                inputmode="numeric"
                dir="ltr"
              />
            </div>

            <label class="recovery-label" for="reset-password">
              ${t('new_password', text('New Password', 'رمز عبور جدید'))}
            </label>
            <div class="input-group recovery-field">
              <div class="input-icon" aria-hidden="true">${lockIcon}</div>
              <input
                type="password"
                id="reset-password"
                placeholder="${t('new_password', text('New Password', 'رمز عبور جدید'))}"
                aria-label="${t('new_password', text('New Password', 'رمز عبور جدید'))}"
                autocomplete="new-password"
              />
              <button
                type="button"
                class="password-toggle recovery-eye"
                data-target="reset-password"
                aria-label="${t('show_password', text('Show password', 'نمایش رمز عبور'))}"
                aria-pressed="false"
              >${eyeIcon}</button>
            </div>

            <label class="recovery-label" for="reset-confirm-password">
              ${t('confirm_password', text('Confirm Password', 'تکرار رمز عبور'))}
            </label>
            <div class="input-group recovery-field">
              <div class="input-icon" aria-hidden="true">${lockIcon}</div>
              <input
                type="password"
                id="reset-confirm-password"
                placeholder="${t('confirm_password', text('Confirm Password', 'تکرار رمز عبور'))}"
                aria-label="${t('confirm_password', text('Confirm Password', 'تکرار رمز عبور'))}"
                autocomplete="new-password"
              />
            </div>

            <button
              type="button"
              id="resetPasswordBtn"
              class="auth-modal-btn recovery-primary"
            >
              <span>${t('reset_password', text('Reset Password', 'تغییر رمز عبور'))}</span>
              <span class="recovery-button-arrow" aria-hidden="true">↗</span>
            </button>
          </div>

          <div
            id="forgot-message"
            class="auth-message recovery-message"
            role="status"
            aria-live="polite"
            style="display:none;"
          ></div>

          <div class="auth-modal-footer recovery-actions">
            <button
              type="button"
              class="auth-modal-back recovery-back"
              id="backToLoginBtn"
            >
              ${rtl ? '→' : '←'}
              ${t('back_to_login', text('Back to Login', 'بازگشت به ورود'))}
            </button>
          </div>

          <div class="recovery-meta" aria-hidden="true">
            <span>MAZORYA / ACCOUNT ACCESS</span>
            <span>${text('● PRIVATE', '● خصوصی')}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ============================================================
// MESSAGE HELPERS
// ============================================================

function showMessage(element, message, type = 'error') {
  if (!element || !element.isConnected) {
    return;
  }

  element.className =
    `auth-message ${type === 'success' ? 'success' : 'error'}`;

  // Use textContent for backend messages.
  element.textContent = String(message ?? '');

  element.style.display = 'block';
  element.setAttribute(
    'role',
    type === 'error' ? 'alert' : 'status'
  );
}

function hideMessage(element) {
  if (!element) return;

  element.textContent = '';
  element.style.display = 'none';
}

function setBusy(button, busy, label) {
  if (!button) return;

  button.disabled = busy;
  button.setAttribute('aria-busy', String(busy));

  if (busy) {
    button.innerHTML = `
      <span class="spinner" aria-hidden="true"></span>
      <span>${escapeHtml(label)}</span>
    `;
  } else {
    button.textContent = label;
  }
}

// ============================================================
// AUTH EVENTS
// ============================================================

function attachAuthEvents(app, currentLang) {
  const loginForm = app.querySelector('#login-form');
  const loginMessage = app.querySelector('#auth-message');
  const loginButton = app.querySelector('#loginSubmitBtn');

  const forgotButton = app.querySelector(
    '#forgotPasswordBtn'
  );

  const modal = app.querySelector('#forgotModal');
  const closeButton = app.querySelector('#closeModalBtn');
  const backButton = app.querySelector('#backToLoginBtn');

  const step1 = app.querySelector('#forgot-step-1');
  const step2 = app.querySelector('#forgot-step-2');
  const modalMessage = app.querySelector('#forgot-message');

  const forgotEmail = app.querySelector('#forgot-email');
  const sendCodeButton = app.querySelector('#sendCodeBtn');

  const resetCode = app.querySelector('#reset-code');
  const resetPasswordInput = app.querySelector('#reset-password');
  const resetConfirmInput = app.querySelector(
    '#reset-confirm-password'
  );

  const resetButton = app.querySelector('#resetPasswordBtn');

  let isLoginBusy = false;
  let isRecoveryBusy = false;
  let resetCompleted = false;

  let previousFocus = null;

  // ==========================================================
  // PASSWORD VISIBILITY
  // ==========================================================

  app.querySelectorAll('.password-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const targetId = toggle.dataset.target;
      const input = app.querySelector(
        `#${targetId}`
      );

      if (!input) return;

      const visible = input.type === 'password';
      input.type = visible ? 'text' : 'password';

      toggle.setAttribute(
        'aria-pressed',
        String(visible)
      );

      toggle.setAttribute(
        'aria-label',
        visible
          ? tr('hide_password', 'Hide password')
          : tr('show_password', 'Show password')
      );

      toggle.innerHTML = visible
        ? eyeOffIcon
        : eyeIcon;
    });
  });

  // ==========================================================
  // LOGIN
  // ==========================================================

  loginForm?.addEventListener('submit', async event => {
    event.preventDefault();

    if (isLoginBusy) return;

    const emailInput = app.querySelector('#login-email');
    const passwordInput = app.querySelector(
      '#login-password'
    );

    const rememberInput = app.querySelector('#remember-me');

    const email = emailInput?.value.trim() || '';

    // Never trim passwords.
    const password = passwordInput?.value || '';

    const rememberMe = Boolean(rememberInput?.checked);

    hideMessage(loginMessage);

    if (!isValidEmail(email)) {
      showMessage(
        loginMessage,
        tr('invalid_email', 'Please enter a valid email address.')
      );

      emailInput?.focus();
      return;
    }

    if (!password) {
      showMessage(
        loginMessage,
        tr('password_required', 'Please enter your password.')
      );

      passwordInput?.focus();
      return;
    }

    isLoginBusy = true;

    setBusy(
      loginButton,
      true,
      tr('logging_in', 'Signing in...')
    );

    try {
      const result = await loginUser(
        email,
        password,
        rememberMe
      );

      if (!loginForm.isConnected) return;

      if (result?.success === true) {
        showMessage(
          loginMessage,
          tr(
            'login_success',
            'Login successful! Redirecting...'
          ),
          'success'
        );

        window.location.assign(
          `/${currentLang}/profile`
        );

        return;
      }

      showMessage(
        loginMessage,
        getErrorMessage(
          result,
          tr(
            'login_failed',
            'Incorrect email or password.'
          )
        )
      );
    } catch (error) {
      console.error('[Auth] Login failed:', error);

      showMessage(
        loginMessage,
        tr(
          'server_error',
          'Unable to connect to the server. Please try again.'
        )
      );
    } finally {
      isLoginBusy = false;

      if (loginForm.isConnected) {
        setBusy(
          loginButton,
          false,
          tr('login', 'Login')
        );
      }
    }
  });

  // ==========================================================
  // MODAL HELPERS
  // ==========================================================

  function setStep(step) {
    const first = step === 1;
    const rtl = isRTL(currentLang);
    const text = (en, fa) => rtl ? fa : en;

    step1?.classList.toggle('active', first);
    step2?.classList.toggle('active', !first);

    if (step1) step1.hidden = !first;
    if (step2) step2.hidden = first;

    const heading = modal?.querySelector('#forgotModalTitle');
    const subtitle = modal?.querySelector('#recoverySubtitle');
    const kicker = modal?.querySelector('#recoveryKicker');
    const progress = modal?.querySelectorAll('.recovery-progress-segment');

    if (heading) {
      heading.textContent = first
        ? text('Find your way back.', 'راه بازگشت به مزوریا.')
        : text('A fresh beginning.', 'یک شروع تازه.');
    }

    if (subtitle) {
      subtitle.textContent = first
        ? text(
            'Every path has a way forward. Enter your email to start your account recovery.',
            'هر مسیری راه بازگشتی دارد. برای شروع بازیابی حساب، ایمیل خود را وارد کنید.'
          )
        : text(
            'Enter the verification code and choose a new password to complete your recovery.',
            'کد تأیید را وارد کنید و برای تکمیل بازیابی، رمز عبور جدیدی انتخاب کنید.'
          );
    }

    if (kicker) {
      kicker.textContent = first
        ? text('ACCOUNT RECOVERY / 01', 'بازیابی حساب / ۰۱')
        : text('ACCOUNT RECOVERY / 02', 'بازیابی حساب / ۰۲');
    }

    progress?.forEach((item, index) => {
      item.classList.toggle('active', index === 0 || !first);
    });
  }

  function resetForgotForm() {
    if (forgotEmail) forgotEmail.value = '';
    if (resetCode) resetCode.value = '';
    if (resetPasswordInput) resetPasswordInput.value = '';
    if (resetConfirmInput) resetConfirmInput.value = '';

    setStep(1);
    hideMessage(modalMessage);
    resetCompleted = false;
  }

  function openModal() {
    if (!modal) return;

    previousFocus = document.activeElement;

    resetForgotForm();

    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');

    // Keep keyboard focus inside the recovery interface.
    closeButton?.focus();
  }

  function closeModal() {
    if (!modal || isRecoveryBusy) return;

    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');

    resetForgotForm();

    if (
      previousFocus &&
      typeof previousFocus.focus === 'function' &&
      previousFocus.isConnected
    ) {
      previousFocus.focus();
    }
  }

  forgotButton?.addEventListener('click', openModal);

  closeButton?.addEventListener('click', closeModal);
  backButton?.addEventListener('click', closeModal);

  modal?.querySelector(
    '.auth-modal-overlay'
  )?.addEventListener('click', closeModal);

  modal?.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeModal();
      return;
    }

    // Basic focus trap for keyboard accessibility.
    if (event.key !== 'Tab') return;

    const focusable = [
      ...modal.querySelectorAll(
        'button:not([disabled]), input:not([disabled])'
      )
    ].filter(element => (
      element.getClientRects().length > 0
    ));

    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (
      event.shiftKey &&
      document.activeElement === first
    ) {
      event.preventDefault();
      last.focus();
    } else if (
      !event.shiftKey &&
      document.activeElement === last
    ) {
      event.preventDefault();
      first.focus();
    }
  });

  // ==========================================================
  // SEND VERIFICATION CODE
  // ==========================================================

  sendCodeButton?.addEventListener('click', async () => {
    if (isRecoveryBusy) return;

    hideMessage(modalMessage);

    const email = forgotEmail?.value.trim() || '';

    if (!isValidEmail(email)) {
      showMessage(
        modalMessage,
        tr(
          'invalid_email',
          'Please enter a valid email address.'
        )
      );

      forgotEmail?.focus();
      return;
    }

    isRecoveryBusy = true;

    setBusy(
      sendCodeButton,
      true,
      tr('sending', 'Sending...')
    );

    try {
      const result = await forgotPassword(email);

      if (!modal?.isConnected) return;

      if (result?.success === true) {
        setStep(2);

        showMessage(
          modalMessage,
          tr(
            'code_sent',
            'A verification code has been sent to your email.'
          ),
          'success'
        );

        resetCode?.focus();
      } else {
        showMessage(
          modalMessage,
          getErrorMessage(
            result,
            tr(
              'send_code_failed',
              'Unable to send the verification code.'
            )
          )
        );
      }
    } catch (error) {
      console.error(
        '[Auth] Send code failed:',
        error
      );

      showMessage(
        modalMessage,
        tr(
          'server_error',
          'Unable to connect to the server. Please try again.'
        )
      );
    } finally {
      isRecoveryBusy = false;

      if (modal?.isConnected) {
        setBusy(
          sendCodeButton,
          false,
          tr('send_code', 'Send Reset Code')
        );
      }
    }
  });

  // ==========================================================
  // RESET PASSWORD
  // ==========================================================

  resetButton?.addEventListener('click', async () => {
    if (isRecoveryBusy || resetCompleted) {
      return;
    }

    hideMessage(modalMessage);

    const email = forgotEmail?.value.trim() || '';
    const code = resetCode?.value.trim() || '';

    // Do not trim passwords.
    const password = resetPasswordInput?.value || '';
    const confirmation = resetConfirmInput?.value || '';

    if (!isValidEmail(email)) {
      showMessage(
        modalMessage,
        tr(
          'invalid_email',
          'Please enter a valid email address.'
        )
      );

      setStep(1);
      forgotEmail?.focus();
      return;
    }

    if (!code || !password || !confirmation) {
      showMessage(
        modalMessage,
        tr(
          'required_fields',
          'Please complete all required fields.'
        )
      );

      return;
    }

    if (code.length > 6) {
      showMessage(
        modalMessage,
        tr(
          'invalid_code',
          'Please enter a valid verification code.'
        )
      );
      return;
    }

    if (password !== confirmation) {
      showMessage(
        modalMessage,
        tr(
          'password_mismatch',
          'Passwords do not match.'
        )
      );

      return;
    }

    if (password.length < 6) {
      showMessage(
        modalMessage,
        tr(
          'password_length',
          'Password must be at least 6 characters.'
        )
      );

      return;
    }

    isRecoveryBusy = true;

    setBusy(
      resetButton,
      true,
      tr('resetting_password', 'Resetting password...')
    );

    try {
      const result = await resetPassword(
        email,
        code,
        password
      );

      if (!modal?.isConnected) return;

      if (result?.success === true) {
        resetCompleted = true;

        // Do not keep the new password in input fields.
        resetPasswordInput.value = '';
        resetConfirmInput.value = '';
        resetCode.value = '';

        showMessage(
          modalMessage,
          tr(
            'password_reset_success',
            'Your password has been reset successfully. You can now sign in.'
          ),
          'success'
        );

        // Keep the modal open so the user can
        // read the result and close it manually.
        resetButton.disabled = true;
      } else {
        showMessage(
          modalMessage,
          getErrorMessage(
            result,
            tr(
              'reset_failed',
              'Unable to reset the password.'
            )
          )
        );
      }
    } catch (error) {
      console.error(
        '[Auth] Reset password failed:',
        error
      );

      showMessage(
        modalMessage,
        tr(
          'server_error',
          'Unable to connect to the server. Please try again.'
        )
      );
    } finally {
      isRecoveryBusy = false;

      if (modal?.isConnected) {
        setBusy(
          resetButton,
          false,
          tr('reset_password', 'Reset Password')
        );

        if (resetCompleted) {
          resetButton.disabled = true;
        }
      }
    }
  });
}

// ============================================================
// PORTAL 02 — NON-BLOCKING 3D POINTER INTERACTION
// ============================================================

function attachAuthPortalInteraction(app) {
  const portal = app.querySelector('#mazoryaAuthPortal');
  const stage = portal?.querySelector('#portalInteractive');
  if (!portal || !stage) return;

  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!finePointer || reducedMotion) return;

  let frame = 0;
  let x = 0;
  let y = 0;

  function paint() {
    frame = 0;
    if (!stage.isConnected) return;
    portal.style.setProperty('--portal-x', x.toFixed(3));
    portal.style.setProperty('--portal-y', y.toFixed(3));
  }

  function schedule() {
    if (!frame) frame = requestAnimationFrame(paint);
  }

  stage.addEventListener('pointermove', (event) => {
    const bounds = stage.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
    y = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
    schedule();
  }, { passive: true });

  stage.addEventListener('pointerleave', () => {
    x = 0;
    y = 0;
    schedule();
  });
}

// ============================================================
// MAIN RENDER
// ============================================================

export async function renderAuth() {
  const app = document.getElementById('app');

  if (!app) {
    console.error('[Auth] #app element not found.');
    return;
  }

  const currentLang = i18n.getCurrentLanguage();

  // Redirect users with a locally valid session.
  // The protected profile API must still verify the token.
  if (isAuthenticated()) {
    window.location.assign(
      `/${currentLang}/profile`
    );

    return;
  }

  
app.innerHTML = `
    <div class="mz-auth-shell">
      ${renderHeader()}

      <main
        class="mz-auth"
        id="mazoryaAuth"
        dir="${isRTL(currentLang) ? 'rtl' : 'ltr'}"
      >
        ${renderLoginSection(currentLang)}
        ${renderForgotModal(currentLang)}
      </main>
    </div>
  `;

  attachHeaderEvents();
  attachAuthEvents(app, currentLang);
  attachAuthPortalInteraction(app);

  console.log(
    '[Auth] Login page rendered:',
    currentLang
  );
}
