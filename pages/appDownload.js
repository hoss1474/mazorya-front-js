
/**
 * Mazorya Group — App Download Page
 * File: pages/appDownload.js
 * Route: /:lang/app
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

import '../assets/css/appDownload.css';

// ============================================================
// APP URLS
// ============================================================

const ANDROID_APK_URL = '/downloads/mazorya-app.apk';

const IOS_WEB_APP_URL = 'https://app.mazoryagroup.com/';

// ============================================================
// PAGE TRANSLATIONS
// ============================================================

const COPY = {
  en: {
    eyebrow: 'MAZORYA / CLIENT EXPERIENCE',
    heroTop: 'Your workspace.',
    heroAccent: 'One tap away.',
    description:
      'A simple, elegant way to reach your Mazorya dashboard. Install the app and keep your workspaces close.',

    platformHint: 'CHOOSE YOUR PLATFORM',

    android: 'Android',
    androidType: 'APK • Direct download',
    androidDescription:
      'Download the Android app directly from Mazorya. No Play Store required.',
    androidAction: 'Download Android APK',
    androidNote:
      'Only install APK files downloaded from our official website.',

    ios: 'iPhone & iPad',
    iosType: 'PWA • Add to Home Screen',
    iosDescription:
      'Install the web app from Safari. No App Store or IPA file is needed.',
    iosAction: 'Open Mazorya Web App',
    iosNote:
      'Open the web app in Safari before adding it to your Home Screen.',

    androidStepsTitle: 'Install on Android',
    iosStepsTitle: 'Install on iPhone',

    androidSteps: [
      'Tap Download Android APK.',
      'Open the downloaded file on your phone.',
      'If Android asks, allow installation from your browser and confirm Install.'
    ],

    iosSteps: [
      'Tap Open Mazorya Web App and open it in Safari.',
      'Tap Share (or the Page Menu, then Share).',
      'Select Add to Home Screen, enable Open as Web App if shown, then tap Add.'
    ],

    previewEyebrow: 'ONE PLACE FOR YOUR PANELS',
    previewWelcome: 'Welcome back.',
    previewPanel: 'My Workspace',
    previewButton: 'OPEN DASHBOARD',

    benefitOne: 'Save your workspace',
    benefitTwo: 'Fast access',
    benefitThree: 'Your login stays private',

    securityTitle: 'Your account stays on your own server.',
    securityDescription:
      'Mazorya App opens your existing dashboard login page. Your password is entered on that website, not collected by this download page.',

    footerNote:
      'Designed by Mazorya Group. Built for better workflows.'
  },

  fa: {
    eyebrow: 'MAZORYA / تجربه مشتریان',
    heroTop: 'همه پنل‌های شما.',
    heroAccent: 'فقط با یک لمس.',
    description:
      'راهی سریع و ساده برای دسترسی به داشبوردهای اختصاصی Mazorya. اپ رو نصب کن و پنل‌هات رو همیشه همراه داشته باش.',

    platformHint: 'دستگاهت رو انتخاب کن',

    android: 'اندروید',
    androidType: 'APK • دانلود مستقیم',
    androidDescription:
      'نسخه اندروید رو مستقیماً از سایت مزوریا دانلود و نصب کن؛ بدون نیاز به گوگل‌پلی.',
    androidAction: 'دانلود فایل APK',
    androidNote:
      'فایل APK رو فقط از وب‌سایت رسمی مزوریا دانلود و نصب کن.',

    ios: 'آیفون و آیپد',
    iosType: 'PWA • افزودن به صفحه اصلی',
    iosDescription:
      'نسخه وب‌اپ رو از Safari به صفحه اصلی اضافه کن؛ بدون نیاز به App Store یا فایل IPA.',
    iosAction: 'باز کردن Mazorya Web App',
    iosNote:
      'برای نصب روی آیفون، وب‌اپ رو داخل مرورگر Safari باز کن.',

    androidStepsTitle: 'نصب روی اندروید',
    iosStepsTitle: 'نصب روی آیفون',

    androidSteps: [
      'روی دکمه دانلود فایل APK بزن.',
      'فایل دانلودشده رو در گوشی باز کن.',
      'اگر اندروید اجازه خواست، نصب از مرورگر رو تأیید کن و Install رو بزن.'
    ],

    iosSteps: [
      'وب‌اپ مزوریا رو باز کن و مطمئن شو در Safari هستی.',
      'روی Share (یا Page Menu و سپس Share) بزن.',
      'گزینه Add to Home Screen رو بزن؛ در صورت نمایش، Open as Web App رو فعال کن و Add رو انتخاب کن.'
    ],

    previewEyebrow: 'همه پنل‌ها در یک جا',
    previewWelcome: 'خوش اومدی.',
    previewPanel: 'پنل من',
    previewButton: 'OPEN DASHBOARD',

    benefitOne: 'ذخیره پنل‌ها',
    benefitTwo: 'دسترسی سریع',
    benefitThree: 'ورود امن و مستقل',

    securityTitle: 'حساب کاربری تو روی سرور خودت می‌مونه.',
    securityDescription:
      'Mazorya App فقط صفحه ورود پنل اختصاصی رو باز می‌کنه. رمز عبورت در سایت همون پنل وارد می‌شه و این صفحه دانلود اون رو دریافت نمی‌کنه.',

    footerNote:
      'طراحی‌شده توسط Mazorya Group، برای تجربه‌ای ساده‌تر.'
  }
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

function renderSteps(steps) {
  return steps.map((step, index) => `
    <li class="mz-app-step">

      <span class="mz-app-step-number">
        ${String(index + 1).padStart(2, '0')}
      </span>

      <span>${escapeHtml(step)}</span>

    </li>
  `).join('');
}

const DOWNLOAD_ICON = `
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4"/>
  </svg>
`;

const EXTERNAL_ICON = `
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="M7 17 17 7M8 7h9v9"/>
  </svg>
`;

// ============================================================
// MAIN PAGE
// ============================================================

export function renderAppDownload() {
  const app = document.getElementById('app');

  if (!app) {
    console.error('[AppDownload] #app not found.');
    return;
  }

  const lang = i18n.getCurrentLanguage();

  const content = COPY[lang] || COPY.en;

  const direction =
    lang === 'fa' || lang === 'ar'
      ? 'rtl'
      : 'ltr';

  const c = key => escapeHtml(content[key]);

  document.title =
    `${content.heroTop} ${content.heroAccent} | Mazorya App`;

  app.innerHTML = `
    ${renderHeader()}

    <main
      class="mz-app-page"
      id="mazoryaAppDownload"
      dir="${direction}"
    >

      <!-- HERO -->

      <section class="mz-app-hero">

        <div class="mz-app-container mz-app-hero-grid">

          <div class="mz-app-hero-content">

            <span class="mz-app-eyebrow">
              <span class="mz-app-live-dot"></span>
              ${c('eyebrow')}
            </span>

            <h1 class="mz-app-hero-title">
              <span>${c('heroTop')}</span>
              <strong>${c('heroAccent')}</strong>
            </h1>

            <p class="mz-app-hero-description">
              ${c('description')}
            </p>

            <div class="mz-app-hero-actions">

              <button
                class="mz-app-hero-link"
                type="button"
                data-mz-app-scroll
              >
                ${c('platformHint')}
                <span aria-hidden="true">↓</span>
              </button>

            </div>

            <div class="mz-app-benefits">
              <span>${c('benefitOne')}</span>
              <span>${c('benefitTwo')}</span>
              <span>${c('benefitThree')}</span>
            </div>

          </div>

          <!-- 3D APP PREVIEW -->

          <div class="mz-app-art" aria-hidden="true">

            <div class="mz-app-portal mz-app-portal-one"></div>
            <div class="mz-app-portal mz-app-portal-two"></div>
            <div class="mz-app-portal mz-app-portal-three"></div>

            <div class="mz-app-phone">

              <div class="mz-app-phone-top">
                <span class="mz-app-phone-dot"></span>
                <span>MAZORYA APP</span>
                <span class="mz-app-phone-menu">•••</span>
              </div>

              <div class="mz-app-phone-logo">
                M<span>✦</span>
              </div>

              <div class="mz-app-phone-kicker">
                ${c('previewEyebrow')}
              </div>

              <div class="mz-app-phone-welcome">
                ${c('previewWelcome')}
              </div>

              <div class="mz-app-phone-workspace">

                <span class="mz-app-workspace-icon">M</span>

                <span>${c('previewPanel')}</span>

                <span>↗</span>

              </div>

              <div class="mz-app-phone-button">
                ${c('previewButton')}
                ${EXTERNAL_ICON}
              </div>

              <div class="mz-app-phone-bottom"></div>

            </div>

            <div class="mz-app-art-glow"></div>

          </div>

        </div>

      </section>

      <!-- DOWNLOAD PLATFORMS -->

      <section
        class="mz-app-platform-section"
        id="mz-app-platforms"
      >

        <div class="mz-app-container">

          <div class="mz-app-platform-label">
            <span></span>
            ${c('platformHint')}
          </div>

          <div class="mz-app-platform-grid">

            <!-- ANDROID -->

            <article
              class="mz-app-platform-card mz-app-android-card"
              id="mz-app-android"
            >

              <div class="mz-app-card-top">

                <div class="mz-app-platform-icon">
                  ${DOWNLOAD_ICON}
                </div>

                <span class="mz-app-platform-pill">
                  ANDROID
                </span>

              </div>

              <h2>${c('android')}</h2>

              <p class="mz-app-platform-type">
                ${c('androidType')}
              </p>

              <p class="mz-app-platform-description">
                ${c('androidDescription')}
              </p>

              <a
                class="mz-app-button mz-app-button-primary"
                href="${ANDROID_APK_URL}"
                download="Mazorya-App.apk"
              >
                ${DOWNLOAD_ICON}
                <span>${c('androidAction')}</span>
              </a>

              <p class="mz-app-button-note">
                ${c('androidNote')}
              </p>

              <div class="mz-app-card-divider"></div>

              <h3>${c('androidStepsTitle')}</h3>

              <ol class="mz-app-steps">
                ${renderSteps(content.androidSteps)}
              </ol>

            </article>

            <!-- IPHONE / IPAD -->

            <article
              class="mz-app-platform-card mz-app-ios-card"
              id="mz-app-ios"
            >

              <div class="mz-app-card-top">

                <div class="mz-app-platform-icon">
                  ${EXTERNAL_ICON}
                </div>

                <span class="mz-app-platform-pill">
                  iOS / iPadOS
                </span>

              </div>

              <h2>${c('ios')}</h2>

              <p class="mz-app-platform-type">
                ${c('iosType')}
              </p>

              <p class="mz-app-platform-description">
                ${c('iosDescription')}
              </p>

              <a
                class="mz-app-button mz-app-button-outline"
                href="${IOS_WEB_APP_URL}"
              >
                ${EXTERNAL_ICON}
                <span>${c('iosAction')}</span>
              </a>

              <p class="mz-app-button-note">
                ${c('iosNote')}
              </p>

              <div class="mz-app-card-divider"></div>

              <h3>${c('iosStepsTitle')}</h3>

              <ol class="mz-app-steps">
                ${renderSteps(content.iosSteps)}
              </ol>

            </article>

          </div>

        </div>

      </section>

      <!-- SECURITY -->

      <section class="mz-app-security-section">

        <div class="mz-app-container">

          <div class="mz-app-security">

            <span
              class="mz-app-security-mark"
              aria-hidden="true"
            >
              ✦
            </span>

            <div>
              <h2>${c('securityTitle')}</h2>

              <p>
                ${c('securityDescription')}
              </p>
            </div>

          </div>

          <p class="mz-app-end-note">
            ${c('footerNote')}
          </p>

        </div>

      </section>

    </main>

    ${renderFooter()}
  `;

  attachHeaderEvents();
  attachFooterEvents();

  // Smooth scroll to platform cards.
  app.querySelector('[data-mz-app-scroll]')
    ?.addEventListener('click', () => {

      const reducedMotion = window.matchMedia?.(
        '(prefers-reduced-motion: reduce)'
      )?.matches;

      app.querySelector('#mz-app-platforms')
        ?.scrollIntoView({
          behavior: reducedMotion ? 'auto' : 'smooth',
          block: 'start'
        });

    });
}
