
/**
 * Mazorya Group — Footer
 * File: components/footer.js
 *
 * Vanilla JavaScript + Vite
 * Multilingual / RTL / LTR
 * Newsletter API integration
 *
 * CSS: /assets/css/footer.css
 */

import { i18n } from '../core/i18n.js';
import { subscribeNewsletter } from '../core/api.js';

// ============================================================
// CONFIG
// ============================================================

const SUPPORTED_LANGUAGES = [
  'en', 'fa', 'ar', 'fr', 'de', 'es', 'tr'
];

const CONTACT = {
  phone: '+1(956) 666-1852',
  phoneDisplay: '+1 956 666 18 52',
  email: 'info@MazoryaGroup.com'
};

const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/mazorya_group',
    icon: '/assets/img/social/instagram-dark.svg'
  },
  {
    name: 'WhatsApp',
    url: 'https://www.whatsapp.com',
    icon: '/assets/img/social/whatsapp-dark.svg'
  }
];

let activeFooterCleanup = null;

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
    value === null ||
    value === undefined ||
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

function getCurrentLanguage() {
  const lang = i18n.getCurrentLanguage();

  return SUPPORTED_LANGUAGES.includes(lang)
    ? lang
    : 'en';
}

function isRTL(lang) {
  return lang === 'fa' || lang === 'ar';
}

// ============================================================
// SOCIAL ICONS
// ============================================================

function renderSocialLinks() {
  return SOCIAL_LINKS.map(item => `
    <a
      class="mz-footer-social-link"
      href="${escapeHtml(item.url)}"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="${escapeHtml(item.name)}"
      title="${escapeHtml(item.name)}"
    >
      <img
        src="${escapeHtml(item.icon)}"
        alt=""
        loading="lazy"
      />
    </a>
  `).join('');
}

// ============================================================
// FOOTER NAVIGATION
// ============================================================

function renderPageLinks(lang) {
  const links = [
    {
      path: '',
      key: 'nav_home',
      fallback: 'Home'
    },
    {
      path: 'about',
      key: 'nav_about',
      fallback: 'About'
    },
    {
      path: 'projects',
      key: 'nav_projects',
      fallback: 'Projects'
    },
    {
      path: 'contact',
      key: 'nav_contact',
      fallback: 'Contact'
    }
  ];

  return links.map(item => {
    const href = item.path
      ? `/${lang}/${item.path}`
      : `/${lang}/`;

    return `
      <li>
        <a
          href="${href}"
          data-route="${item.path || 'home'}"
        >
          ${t(item.key, item.fallback)}
        </a>
      </li>
    `;
  }).join('');
}

// ============================================================
// RENDER FOOTER
// ============================================================

export function renderFooter() {
  const lang = getCurrentLanguage();
  const direction = isRTL(lang) ? 'rtl' : 'ltr';
  const year = new Date().getFullYear();

  return `
    <footer
      class="footer mz-footer"
      id="mazoryaFooter"
      dir="${direction}"
    >
      <div class="mz-footer-container">

        <!-- ======================================
             ROW 1 — BRAND + NEWSLETTER
             ====================================== -->

        <div class="mz-footer-top">

          <!-- Brand -->
          <div class="mz-footer-brand">

            <a
              href="/${lang}/"
              class="mz-footer-logo-link"
              aria-label="Mazorya Group"
            >
              <img
                src="/assets/img/3.png"
                alt="Mazorya Group"
                class="mz-footer-logo"
                loading="lazy"
              />
            </a>

            <p class="mz-footer-brand-text">
              ${t(
                'footer_newsletter_title',
                'Stay connected with Mazorya Group.'
              )}
            </p>

          </div>

          <!-- Newsletter -->
          <div class="mz-footer-newsletter">

            <h3 class="mz-footer-newsletter-title">
              ${t(
                'footer_newsletter_title',
                'Subscribe to our newsletter'
              )}
            </h3>

            <form
              class="mz-footer-form"
              id="newsletter-form"
              data-newsletter-form
            >

              <label
                class="mz-sr-only"
                for="newsletter-email"
              >
                ${t('email', 'Email address')}
              </label>

              <div class="mz-footer-input-wrap">

                <input
                  type="email"
                  id="newsletter-email"
                  name="email"
                  class="mz-footer-email"
                  placeholder="${t(
                    'footer_newsletter_placeholder',
                    'Enter your email address'
                  )}"
                  autocomplete="email"
                  inputmode="email"
                  required
                />

                <button
                  type="submit"
                  class="mz-footer-submit"
                >
                  <span class="mz-footer-submit-text">
                    ${t(
                      'footer_newsletter_btn',
                      'Subscribe'
                    )}
                  </span>

                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14"/>
                    <path d="m13 6 6 6-6 6"/>
                  </svg>

                </button>

              </div>

            </form>

            <div
              id="newsletter-success"
              class="mz-footer-message mz-footer-message--success"
              role="status"
              aria-live="polite"
              hidden
            ></div>

            <div
              id="newsletter-error"
              class="mz-footer-message mz-footer-message--error"
              role="alert"
              hidden
            ></div>

          </div>

        </div>

        <!-- ======================================
             ROW 2 — FOOTER LINKS
             ====================================== -->

        <div class="mz-footer-middle">

          <!-- Contact -->
          <div class="mz-footer-column">

            <h4 class="mz-footer-column-title">
              ${t('contact_title', 'Contact')}
            </h4>

            <ul class="mz-footer-links">

              <li>
                <a href="tel:${CONTACT.phone}">
                  ${escapeHtml(CONTACT.phoneDisplay)}
                </a>
              </li>

              <li>
                <a href="mailto:${escapeHtml(CONTACT.email)}">
                  ${escapeHtml(CONTACT.email)}
                </a>
              </li>

            </ul>

          </div>

          <!-- Pages -->
          <div class="mz-footer-column">

            <h4 class="mz-footer-column-title">
              ${t('footer_pages', 'Pages')}
            </h4>

            <ul class="mz-footer-links">
              ${renderPageLinks(lang)}
            </ul>

          </div>

          <!-- Services -->
          <div class="mz-footer-column">

            <h4 class="mz-footer-column-title">
              ${t('footer_services', 'Services')}
            </h4>

            <ul class="mz-footer-links">

              <li>
                <a
                  href="/${lang}/services"
                  data-route="services"
                >
                  ${t('nav_services', 'Services')}
                </a>
              </li>

            </ul>

          </div>

        </div>

        <!-- ======================================
             ROW 3 — SOCIAL + COPYRIGHT
             ====================================== -->

        <div class="mz-footer-bottom">

          <div class="mz-footer-social">
            ${renderSocialLinks()}
          </div>

          <p class="mz-footer-copyright">
            © ${year} Mazorya Group.
            ${t(
              'footer_copyright',
              'All rights reserved.'
            )}
          </p>

        </div>

      </div>
    </footer>
  `;
}

// ============================================================
// FOOTER EVENTS
// ============================================================

export function attachFooterEvents() {
  // Remove previous listeners and timers.
  activeFooterCleanup?.();
  activeFooterCleanup = null;

  const footer = document.getElementById(
    'mazoryaFooter'
  );

  if (!footer) return;

  const form = footer.querySelector(
    '[data-newsletter-form]'
  );

  if (!form) return;

  const emailInput = form.querySelector(
    '#newsletter-email'
  );

  const submitButton = form.querySelector(
    '.mz-footer-submit'
  );

  const submitText = form.querySelector(
    '.mz-footer-submit-text'
  );

  const successMessage = footer.querySelector(
    '#newsletter-success'
  );

  const errorMessage = footer.querySelector(
    '#newsletter-error'
  );

  if (!emailInput || !submitButton) return;

  const controller = new AbortController();
  const { signal } = controller;

  const defaultButtonText =
    submitText?.textContent.trim() || 'Subscribe';

  let messageTimeout = null;
  let submitting = false;

  // ----------------------------------------------------------
  // MESSAGES
  // ----------------------------------------------------------

  function clearMessages() {
    if (messageTimeout !== null) {
      clearTimeout(messageTimeout);
      messageTimeout = null;
    }

    if (successMessage) {
      successMessage.hidden = true;
      successMessage.textContent = '';
    }

    if (errorMessage) {
      errorMessage.hidden = true;
      errorMessage.textContent = '';
    }
  }

  function showMessage(type, text) {
    clearMessages();

    if (!footer.isConnected) return;

    const element = type === 'success'
      ? successMessage
      : errorMessage;

    if (!element) return;

    element.textContent = String(text);
    element.hidden = false;

    messageTimeout = setTimeout(() => {
      if (element.isConnected) {
        element.hidden = true;
      }

      messageTimeout = null;
    }, 5000);
  }

  function setSubmitting(state) {
    submitting = state;
    submitButton.disabled = state;

    form.classList.toggle('is-submitting', state);

    if (submitText) {
      submitText.textContent = state
        ? tr('sending', 'Sending...')
        : defaultButtonText;
    }
  }

  // ----------------------------------------------------------
  // NEWSLETTER SUBMIT
  // ----------------------------------------------------------

  form.addEventListener(
    'submit',
    async event => {
      event.preventDefault();

      if (submitting) return;

      const email = emailInput.value.trim();

      if (!email || !emailInput.checkValidity()) {
        showMessage(
          'error',
          tr(
            'newsletter_invalid_email',
            'Please enter a valid email address.'
          )
        );

        emailInput.focus();
        return;
      }

      clearMessages();
      setSubmitting(true);

      try {
        const result = await subscribeNewsletter(email);

        if (!footer.isConnected) return;

        if (result?.success) {
          showMessage(
            'success',
            result.message ||
              tr(
                'newsletter_success',
                'Thank you for subscribing!'
              )
          );

          emailInput.value = '';
        } else {
          showMessage(
            'error',
            result?.message ||
              tr(
                'newsletter_error',
                'Something went wrong. Please try again.'
              )
          );
        }

      } catch (error) {
        console.error(
          '[Footer] Newsletter subscription failed:',
          error
        );

        showMessage(
          'error',
          tr(
            'newsletter_error',
            'Unable to subscribe. Please try again.'
          )
        );

      } finally {
        if (footer.isConnected) {
          setSubmitting(false);
        }
      }
    },
    { signal }
  );

  // ----------------------------------------------------------
  // CLEANUP
  // ----------------------------------------------------------

  const cleanup = () => {
    controller.abort();

    if (messageTimeout !== null) {
      clearTimeout(messageTimeout);
      messageTimeout = null;
    }

    if (activeFooterCleanup === cleanup) {
      activeFooterCleanup = null;
    }
  };

  activeFooterCleanup = cleanup;

  return cleanup;
}
