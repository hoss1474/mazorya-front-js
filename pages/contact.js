
/**
 * Mazorya Group - Contact Page
 * File: pages/contact.js
 *
 * - Laravel API integration
 * - Multilingual form
 * - RTL / LTR support
 * - Client-side validation
 * - Duplicate submission protection
 * - Safe feedback messages
 * - Existing Webflow CSS compatibility
 */

import { i18n } from '../core/i18n.js';

import {
  renderHeader,
  attachHeaderEvents
} from '../components/header.js';

import {
  renderFooter,
  attachFooterEvents
} from '../components/footer.js';

import {
  submitContactForm
} from '../core/api.js';

// ============================================================
// CONFIGURATION
// ============================================================

const CONTACT_INFO = {
  phoneDisplay: '+1 956 666 18 52',
  phoneHref: '+1956661852',
  email: 'info@mazoryagroup.com'
};

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

function isRTL(lang) {
  return lang === 'fa' || lang === 'ar';
}

// ============================================================
// CONTACT INFORMATION
// ============================================================

function renderContactInfo() {
  // Avoid displaying a fictional office address.
  const translatedAddress = tr(
    'office_address',
    ''
  ).trim();

  const placeholderAddress =
    '123 Business Avenue, Downtown, New York, NY 10001';

  const officeAddress =
    translatedAddress === placeholderAddress
      ? ''
      : translatedAddress;

  const officeHtml = officeAddress
    ? `
      <div class="contact-info-item">

        <div class="contact-info-icon">
          <img
            src="/assets/img/map-icon.svg"
            alt=""
            aria-hidden="true"
          />
        </div>

        <div>
          <h3>
            ${t('office_title', 'Our Office')}
          </h3>

          <p>
            ${escapeHtml(officeAddress)}
          </p>
        </div>

      </div>
    `
    : '';

  return `
    <div class="contact-info-side">

      <div class="contact-info-header">

        <h1 class="contact-page-title">
          ${t('contact_title', 'Contact Us')}
        </h1>

        <p>
          ${t(
            'contact_subtitle',
            "Have a question or want to work with us? Fill out the form and we'll get back to you."
          )}
        </p>

      </div>

      <div class="contact-info-list">

        ${officeHtml}

        <div class="contact-info-item">

          <div class="contact-info-icon">
            <img
              src="/assets/img/phone-icon.svg"
              alt=""
              aria-hidden="true"
            />
          </div>

          <div>
            <h3>
              ${t('phone_title', 'Phone')}
            </h3>

            <a
              href="tel:${CONTACT_INFO.phoneHref}"
              dir="ltr"
            >
              ${escapeHtml(CONTACT_INFO.phoneDisplay)}
            </a>
          </div>

        </div>

        <div class="contact-info-item">

          <div class="contact-info-icon">
            <img
              src="/assets/img/mail-icon.svg"
              alt=""
              aria-hidden="true"
            />
          </div>

          <div>
            <h3>
              ${t('email_title', 'Email')}
            </h3>

            <a
              href="mailto:${CONTACT_INFO.email}"
            >
              ${escapeHtml(CONTACT_INFO.email)}
            </a>
          </div>

        </div>

      </div>

    </div>
  `;
}

// ============================================================
// CONTACT FORM
// ============================================================

function renderContactForm() {
  return `
    <div class="contact-form-side">

      <div class="contact-form-block">

        <form
          id="contact-form"
          method="post"
          novalidate
        >

          <div class="contact-form-row">

            <div class="contact-form-group">

              <label for="contact-name">
                ${t('contact_name', 'Name')} *
              </label>

              <input
                type="text"
                id="contact-name"
                name="name"
                class="contact-input"
                autocomplete="name"
                maxlength="255"
                required
              />

            </div>

            <div class="contact-form-group">

              <label for="contact-phone">
                ${t('contact_phone', 'Phone')}
              </label>

              <input
                type="tel"
                id="contact-phone"
                name="phone"
                class="contact-input"
                autocomplete="tel"
                maxlength="20"
                dir="ltr"
              />

            </div>

          </div>

          <div class="contact-form-group">

            <label for="contact-email">
              ${t('contact_email', 'Email')} *
            </label>

            <input
              type="email"
              id="contact-email"
              name="email"
              class="contact-input"
              autocomplete="email"
              maxlength="255"
              dir="ltr"
              required
            />

          </div>

          <div class="contact-form-group">

            <label for="contact-message">
              ${t('contact_message', 'Message')} *
            </label>

            <textarea
              id="contact-message"
              name="message"
              class="contact-textarea"
              rows="5"
              maxlength="5000"
              required
            ></textarea>

          </div>

          <button
            type="submit"
            class="contact-submit-btn"
            id="submitBtn"
          >
            ${t('contact_submit', 'Send Message')}
          </button>

          <div
            id="successMsg"
            class="contact-success-msg"
            role="status"
            aria-live="polite"
            style="display:none;"
          ></div>

          <div
            id="errorMsg"
            class="contact-error-msg"
            role="alert"
            aria-live="assertive"
            style="display:none;"
          ></div>

        </form>

      </div>

    </div>
  `;
}

// ============================================================
// CONTACT PAGE SECTION
// ============================================================

function renderContactSection(lang) {
  return `
    <section class="contact-page-section">

      <div class="w-layout-blockcontainer container-regular w-container">

        <div class="contact-grid ${
          isRTL(lang) ? 'rtl-contact' : ''
        }">

          ${renderContactInfo()}

          ${renderContactForm()}

        </div>

      </div>

    </section>
  `;
}

// ============================================================
// MESSAGE HELPERS
// ============================================================

function hideMessages(successDiv, errorDiv) {
  successDiv.style.display = 'none';
  errorDiv.style.display = 'none';

  successDiv.textContent = '';
  errorDiv.textContent = '';
}

function showMessage(
  element,
  message,
  successDiv,
  errorDiv
) {
  hideMessages(successDiv, errorDiv);

  // textContent prevents HTML injection from
  // API error messages.
  element.textContent = String(message);
  element.style.display = 'block';
}

// ============================================================
// FORM VALIDATION
// ============================================================

function validateForm(data, form) {
  const name = data.name.trim();
  const email = data.email.trim();
  const phone = data.phone.trim();
  const message = data.message.trim();

  if (!name || !email || !message) {
    return tr(
      'contact_required_fields',
      'Please fill in all required fields.'
    );
  }

  const emailInput = form.elements.namedItem('email');

  if (
    emailInput &&
    typeof emailInput.checkValidity === 'function' &&
    !emailInput.checkValidity()
  ) {
    return tr(
      'contact_invalid_email',
      'Please enter a valid email address.'
    );
  }

  if (name.length > 255) {
    return tr(
      'contact_invalid_name',
      'Name is too long.'
    );
  }

  if (email.length > 255) {
    return tr(
      'contact_invalid_email',
      'Please enter a valid email address.'
    );
  }

  if (phone.length > 20) {
    return tr(
      'contact_invalid_phone',
      'Phone number is too long.'
    );
  }

  if (message.length > 5000) {
    return tr(
      'contact_message_too_long',
      'Your message is too long.'
    );
  }

  return null;
}

// ============================================================
// FORM SUBMISSION
// ============================================================

function attachContactFormEvents(app) {
  const form = app.querySelector('#contact-form');

  if (!form) {
    return;
  }

  const successDiv = form.querySelector(
    '#successMsg'
  );

  const errorDiv = form.querySelector(
    '#errorMsg'
  );

  const submitBtn = form.querySelector(
    '#submitBtn'
  );

  if (
    !successDiv ||
    !errorDiv ||
    !submitBtn
  ) {
    console.error(
      '[Contact] Form elements not found.'
    );

    return;
  }

  let isSubmitting = false;

  form.addEventListener('submit', async event => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    hideMessages(successDiv, errorDiv);

    // ========================================================
    // READ FIELDS
    // ========================================================

    const formData = new FormData(form);

    const name = String(
      formData.get('name') ?? ''
    ).trim();

    const email = String(
      formData.get('email') ?? ''
    ).trim();

    const phone = String(
      formData.get('phone') ?? ''
    ).trim();

    const message = String(
      formData.get('message') ?? ''
    ).trim();

    const data = {
      name,
      email,
      phone,
      message,
      lang: i18n.getCurrentLanguage()
    };

    // ========================================================
    // VALIDATION
    // ========================================================

    const validationError = validateForm(
      data,
      form
    );

    if (validationError) {
      showMessage(
        errorDiv,
        validationError,
        successDiv,
        errorDiv
      );

      return;
    }

    // ========================================================
    // SUBMIT
    // ========================================================

    isSubmitting = true;

    submitBtn.disabled = true;

    submitBtn.setAttribute(
      'aria-busy',
      'true'
    );

    submitBtn.textContent = tr(
      'sending',
      'Sending...'
    );

    try {
      const result = await submitContactForm(data);

      // The user may have navigated away while
      // the API request was processing.
      if (!form.isConnected) {
        return;
      }

      if (result?.success === true) {
        showMessage(
          successDiv,
          tr(
            'contact_success',
            'Your message has been sent successfully!'
          ),
          successDiv,
          errorDiv
        );

        form.reset();

        console.log(
          '[Contact] Message submitted successfully.'
        );
      } else {
        const apiError =
          typeof result?.error === 'string'
            ? result.error
            : '';

        showMessage(
          errorDiv,
          apiError || tr(
            'contact_error',
            'Something went wrong. Please try again.'
          ),
          successDiv,
          errorDiv
        );

        console.warn(
          '[Contact] Submission failed:',
          apiError
        );
      }
    } catch (error) {
      if (!form.isConnected) {
        return;
      }

      console.error(
        '[Contact] Unexpected submission error:',
        error
      );

      showMessage(
        errorDiv,
        tr(
          'contact_error',
          'Something went wrong. Please try again.'
        ),
        successDiv,
        errorDiv
      );
    } finally {
      isSubmitting = false;

      if (form.isConnected) {
        submitBtn.disabled = false;

        submitBtn.removeAttribute(
          'aria-busy'
        );

        submitBtn.textContent = tr(
          'contact_submit',
          'Send Message'
        );
      }
    }
  });
}

// ============================================================
// MAIN RENDER
// ============================================================

export async function renderContact() {
  const app = document.getElementById('app');

  if (!app) {
    console.error(
      '[Contact] #app element not found.'
    );

    return;
  }

  const currentLang = i18n.getCurrentLanguage();

  
app.innerHTML = `
  ${renderHeader()}

  <main
    class="mz-contact"
    id="mazoryaContact"
    dir="${isRTL(currentLang) ? 'rtl' : 'ltr'}"
  >
    ${renderContactSection(currentLang)}
  </main>

  ${renderFooter()}
`;


  attachHeaderEvents();
  attachFooterEvents();

  attachContactFormEvents(app);

  /*
   * Navigation:
   * Normal anchor links are preserved.
   *
   * Animations:
   * app.js -> router.afterRender
   *        -> reinitAnimations()
   *
   * No extra navigation or scroll listeners
   * are registered by this page.
   */

  console.log(
    '[Contact] Page rendered:',
    currentLang
  );
}
