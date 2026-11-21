
/**
 * Mazorya Group — Header
 * File: components/header.js
 *
 * Styles: /assets/css/header.css
 * Vanilla JS + Vite + SPA
 */

import { i18n } from '../core/i18n.js';

import {
  isAuthenticated,
  getUserData,
  logoutUser
} from '../core/api.js';

// ============================================================
// CONFIG
// ============================================================

const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fa', label: 'فارسی', flag: '🇮🇷' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷' }
];

const NAV_LINKS = [
  {
    key: 'home',
    path: '',
    translation: 'nav_home',
    fallback: 'Home'
  },
  {
    key: 'about',
    path: 'about',
    translation: 'nav_about',
    fallback: 'About'
  },
  {
    key: 'services',
    path: 'services',
    translation: 'nav_services',
    fallback: 'Services'
  },
  {
    key: 'projects',
    path: 'projects',
    translation: 'nav_projects',
    fallback: 'Projects'
  },
  {
    key: 'contact',
    path: 'contact',
    translation: 'nav_contact',
    fallback: 'Contact'
  }
];

const DEFAULT_AVATAR = '/assets/img/default-avatar.png';

let activeCleanup = null;

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

function getCurrentLang() {
  const lang = i18n.getCurrentLanguage();

  return LANGUAGES.some(item => item.code === lang)
    ? lang
    : 'en';
}

function isRTL(lang) {
  return lang === 'fa' || lang === 'ar';
}

function getLocalizedUrl(lang) {
  const pathname = window.location.pathname;
  const parts = pathname.split('/');

  if (LANGUAGES.some(item => item.code === parts[1])) {
    parts[1] = lang;
  } else {
    parts.splice(1, 0, lang);
  }

  return (
    parts.join('/') +
    window.location.search +
    window.location.hash
  );
}

function isActiveRoute(key, lang) {
  const pathname =
    window.location.pathname.replace(/\/+$/, '') || '/';

  const base = `/${lang}`;

  if (key === 'home') {
    return pathname === '/' || pathname === base;
  }

  if (key === 'services') {
    return (
      pathname === `${base}/services` ||
      pathname.startsWith(`${base}/service/`)
    );
  }

  if (key === 'projects') {
    return (
      pathname === `${base}/projects` ||
      pathname.startsWith(`${base}/project/`)
    );
  }

  return pathname === `${base}/${key}`;
}

function safeAvatarUrl(value) {
  if (typeof value !== 'string' || !value.trim()) {
    return DEFAULT_AVATAR;
  }

  const raw = value.trim();

  if (raw.startsWith('//')) {
    return DEFAULT_AVATAR;
  }

  // Reject unsafe URL schemes.
  if (
    /^[a-z][a-z\d+.-]*:/i.test(raw) &&
    !/^https?:\/\//i.test(raw)
  ) {
    return DEFAULT_AVATAR;
  }

  try {
    const apiUrl =
      import.meta.env?.VITE_API_URL ||
      window.location.origin;

    const apiOrigin = new URL(
      apiUrl,
      window.location.origin
    ).origin;

    let url;

    if (/^https?:\/\//i.test(raw)) {
      url = new URL(raw);
    } else if (/^\/?assets\//i.test(raw)) {
      url = new URL(
        `/${raw.replace(/^\/+/, '')}`,
        window.location.origin
      );
    } else {
      url = new URL(
        `/${raw.replace(/^\/+/, '')}`,
        apiOrigin
      );
    }

    return ['https:', 'http:'].includes(url.protocol)
      ? url.href
      : DEFAULT_AVATAR;

  } catch {
    return DEFAULT_AVATAR;
  }
}

// ============================================================
// SVG ICONS
// ============================================================

const icons = {
  globe: `
    <svg viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true">
      <circle cx="12" cy="12" r="10"/>
      <path d="M2 12h20M12 2c-5 5-5 15 0 20M12 2c5 5 5 15 0 20"/>
    </svg>
  `,

  chevron: `
    <svg viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true">
      <path d="m6 9 6 6 6-6"/>
    </svg>
  `,

  arrow: `
    <svg viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true">
      <path d="M5 12h14m-6-6 6 6-6 6"/>
    </svg>
  `,

  user: `
    <svg viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true">
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 21v-2a8 8 0 0 1 16 0v2"/>
    </svg>
  `,

  settings: `
    <svg viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 2v3m0 14v3M2 12h3m14 0h3M4.9 4.9 7 7m10 10 2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1"/>
    </svg>
  `,

  logout: `
    <svg viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <path d="m16 17 5-5-5-5M21 12H9"/>
    </svg>
  `
};

// ============================================================
// NAVIGATION LINKS
// ============================================================

function renderNavLinks(lang) {
  return NAV_LINKS.map(item => {
    const href = item.path
      ? `/${lang}/${item.path}`
      : `/${lang}/`;

    const active = isActiveRoute(item.key, lang);

    return `
      <li>
        <a
          class="mz-nav-link${active ? ' is-current' : ''}"
          href="${href}"
          data-route="${item.key}"
          ${active ? 'aria-current="page"' : ''}
        >
          ${t(item.translation, item.fallback)}
        </a>
      </li>
    `;
  }).join('');
}

// ============================================================
// LANGUAGE DROPDOWN
// ============================================================

function renderLanguageDropdown(lang, mobile = false) {
  const suffix = mobile ? 'Mobile' : '';

  const items = LANGUAGES.map(item => {
    const selected = item.code === lang;

    return `
      <a
        class="mz-language-option${selected ? ' is-selected' : ''}"
        href="${escapeHtml(getLocalizedUrl(item.code))}"
        data-lang="${item.code}"
        lang="${item.code}"
        ${selected ? 'aria-current="true"' : ''}
      >
        <span class="mz-language-flag">
          ${item.flag}
        </span>

        <span>${escapeHtml(item.label)}</span>

        ${
          selected
            ? '<span class="mz-language-check">✓</span>'
            : ''
        }
      </a>
    `;
  }).join('');

  return `
    <div class="mz-dropdown mz-lang-dropdown">
      <button
        type="button"
        class="mz-lang-btn"
        id="langBtn${suffix}"
        data-menu-trigger="langMenu${suffix}"
        aria-controls="langMenu${suffix}"
        aria-expanded="false"
        aria-haspopup="true"
        aria-label="${t('language', 'Language')}"
      >
        ${icons.globe}

        <span class="mz-lang-code">
          ${lang.toUpperCase()}
        </span>

        <span class="mz-chevron">
          ${icons.chevron}
        </span>
      </button>

      <div
        class="mz-dropdown-menu mz-lang-menu"
        id="langMenu${suffix}"
      >
        ${items}
      </div>
    </div>
  `;
}

// ============================================================
// USER ACCOUNT
// ============================================================

function getAccountInfo(user) {
  const name = String(
    user?.full_name ||
    user?.name ||
    tr('account', 'Account')
  );

  return {
    name,
    firstName: name.trim().split(/\s+/)[0],
    avatar: safeAvatarUrl(
      user?.avatar_url || user?.avatar
    ),
    email: user?.email || ''
  };
}

// ============================================================
// ACCOUNT BUTTONS
// ============================================================

function renderAccount(
  lang,
  loggedIn,
  user,
  mobile = false
) {
  if (!loggedIn) {
    return `
      <a
        class="mz-header-cta${mobile ? ' mz-header-cta--mobile' : ''}"
        href="/${lang}/auth"
        data-route="auth"
      >
        <span>
          ${t('btn_get_started', 'Get Started')}
        </span>

        ${icons.arrow}
      </a>
    `;
  }

  const account = getAccountInfo(user);

  const avatar = `
    <span class="mz-avatar">
      <img
        data-header-avatar
        src="${escapeHtml(account.avatar)}"
        alt=""
      />
    </span>
  `;

  // Mobile account
  if (mobile) {
    return `
      <div class="mz-mobile-account">
        <a
          class="mz-mobile-profile"
          href="/${lang}/profile"
          data-route="profile"
        >
          ${avatar}

          <span>
            ${escapeHtml(account.name)}
          </span>

          ${icons.arrow}
        </a>

        <button
          type="button"
          class="mz-mobile-logout"
          data-header-logout
        >
          ${icons.logout}

          <span>
            ${t('logout', 'Logout')}
          </span>
        </button>
      </div>
    `;
  }

  // Desktop account
  return `
    <div class="mz-dropdown mz-profile-dropdown">
      <button
        type="button"
        class="mz-profile-btn"
        id="profileBtn"
        data-menu-trigger="profileMenu"
        aria-controls="profileMenu"
        aria-expanded="false"
        aria-haspopup="true"
      >
        ${avatar}

        <span class="mz-profile-name">
          ${escapeHtml(account.firstName)}
        </span>

        <span class="mz-chevron">
          ${icons.chevron}
        </span>
      </button>

      <div
        class="mz-dropdown-menu mz-profile-menu"
        id="profileMenu"
      >
        <div class="mz-profile-summary">
          <strong>
            ${escapeHtml(account.name)}
          </strong>

          <span>
            ${escapeHtml(account.email)}
          </span>
        </div>

        <a
          href="/${lang}/profile"
          data-route="profile"
        >
          ${icons.user}
          ${t('profile', 'My Profile')}
        </a>

        <a
          href="/${lang}/profile?tab=settings"
          data-route="profile"
        >
          ${icons.settings}
          ${t('settings', 'Settings')}
        </a>

        <div class="mz-menu-divider"></div>

        <button
          type="button"
          class="mz-logout-item"
          data-header-logout
        >
          ${icons.logout}
          ${t('logout', 'Logout')}
        </button>
      </div>
    </div>
  `;
}

// ============================================================
// RENDER HEADER
// ============================================================

export function renderHeader() {
  const lang = getCurrentLang();

  const loggedIn = isAuthenticated();

  let user = null;

  if (loggedIn) {
    try {
      user = getUserData();
    } catch (error) {
      console.warn(
        '[Header] User data unavailable:',
        error
      );
    }
  }

  const homeClass = isActiveRoute('home', lang)
    ? ' mz-header--overlay'
    : '';

  return `
    <header
      class="site-header mz-header${homeClass}"
      id="mazoryaHeader"
      dir="${isRTL(lang) ? 'rtl' : 'ltr'}"
    >
      <div class="mz-header-container">

        <!-- LOGO -->
        <div class="mz-header-logo">
          <a
            href="/${lang}/"
            aria-label="Mazorya Group Home"
          >
            <img
              src="/assets/img/3.png"
              alt="Mazorya Group"
            />
          </a>
        </div>

        <!-- NAVIGATION -->
        <nav
          class="mz-header-nav"
          id="headerNav"
          aria-label="${t('navigation', 'Main navigation')}"
        >
          <ul class="mz-header-menu">
            ${renderNavLinks(lang)}
          </ul>

          <!-- MOBILE ACTIONS -->
          <div class="mz-header-actions-mobile">
            ${renderLanguageDropdown(lang, true)}

            ${renderAccount(
              lang,
              loggedIn,
              user,
              true
            )}
          </div>
        </nav>

        <!-- DESKTOP ACTIONS -->
        <div class="mz-header-actions">
          ${renderLanguageDropdown(lang)}

          ${renderAccount(
            lang,
            loggedIn,
            user
          )}
        </div>

        <!-- MOBILE TOGGLE -->
        <button
          type="button"
          class="mz-menu-toggle"
          id="mobileToggle"
          aria-label="${t('open_menu', 'Open menu')}"
          aria-controls="headerNav"
          aria-expanded="false"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>
    </header>
  `;
}

// ============================================================
// HEADER EVENTS
// ============================================================

export function attachHeaderEvents() {
  // Remove previously registered global listeners.
  activeCleanup?.();
  activeCleanup = null;

  const header = document.getElementById(
    'mazoryaHeader'
  );

  if (!header) return;

  const controller = new AbortController();
  const { signal } = controller;

  const nav = header.querySelector('#headerNav');
  const toggle = header.querySelector('#mobileToggle');

  let menuOpen = false;
  let originalOverflow = null;

  // ----------------------------------------------------------
  // CLOSE DROPDOWNS
  // ----------------------------------------------------------

  function closeDropdowns() {
    header
      .querySelectorAll('[data-menu-trigger]')
      .forEach(button => {
        button.setAttribute(
          'aria-expanded',
          'false'
        );

        button
          .closest('.mz-dropdown')
          ?.classList.remove('is-open');

        const menu = header.querySelector(
          `#${button.dataset.menuTrigger}`
        );

        menu?.classList.remove('show');
      });
  }

  // ----------------------------------------------------------
  // MOBILE MENU STATE
  // ----------------------------------------------------------

  function setMenuOpen(open) {
    if (menuOpen === open) return;

    menuOpen = open;

    nav?.classList.toggle('active', open);
    toggle?.classList.toggle('active', open);

    toggle?.setAttribute(
      'aria-expanded',
      String(open)
    );

    toggle?.setAttribute(
      'aria-label',
      tr(
        open ? 'close_menu' : 'open_menu',
        open ? 'Close menu' : 'Open menu'
      )
    );

    if (open) {
      originalOverflow =
        document.body.style.overflow;

      document.body.style.overflow = 'hidden';

    } else if (originalOverflow !== null) {
      document.body.style.overflow =
        originalOverflow;

      originalOverflow = null;
    }

    if (!open) {
      closeDropdowns();
    }
  }

  toggle?.addEventListener(
    'click',
    () => setMenuOpen(!menuOpen),
    { signal }
  );

  // ----------------------------------------------------------
  // DROPDOWNS
  // ----------------------------------------------------------

  header
    .querySelectorAll('[data-menu-trigger]')
    .forEach(button => {
      button.addEventListener(
        'click',
        event => {
          event.stopPropagation();

          const menu = header.querySelector(
            `#${button.dataset.menuTrigger}`
          );

          if (!menu) return;

          const opening =
            !menu.classList.contains('show');

          closeDropdowns();

          if (opening) {
            menu.classList.add('show');

            button
              .closest('.mz-dropdown')
              ?.classList.add('is-open');

            button.setAttribute(
              'aria-expanded',
              'true'
            );
          }
        },
        { signal }
      );
    });

  // ----------------------------------------------------------
  // LANGUAGE CHANGE
  // ----------------------------------------------------------

  header
    .querySelectorAll('[data-lang]')
    .forEach(link => {
      link.addEventListener(
        'click',
        async event => {
          if (
            event.button !== 0 ||
            event.ctrlKey ||
            event.metaKey ||
            event.shiftKey ||
            event.altKey
          ) {
            return;
          }

          const lang = link.dataset.lang;

          if (
            !LANGUAGES.some(
              item => item.code === lang
            )
          ) {
            return;
          }

          event.preventDefault();

          closeDropdowns();

          const destination =
            getLocalizedUrl(lang);

          try {
            await i18n.setLanguage(lang);
          } catch (error) {
            console.warn(
              '[Header] Language loading failed:',
              error
            );
          }

          window.location.assign(destination);
        },
        { signal }
      );
    });

  // ----------------------------------------------------------
  // LOGOUT
  // ----------------------------------------------------------

  header
    .querySelectorAll('[data-header-logout]')
    .forEach(button => {
      button.addEventListener(
        'click',
        async () => {
          if (button.disabled) return;

          button.disabled = true;

          try {
            await logoutUser();

            window.location.assign(
              `/${getCurrentLang()}/auth`
            );

          } catch (error) {
            button.disabled = false;

            console.error(
              '[Header] Logout failed:',
              error
            );
          }
        },
        { signal }
      );
    });

  // ----------------------------------------------------------
  // AVATAR FALLBACK
  // ----------------------------------------------------------

  header
    .querySelectorAll('[data-header-avatar]')
    .forEach(img => {
      img.addEventListener(
        'error',
        () => {
          if (
            !img.src.endsWith(DEFAULT_AVATAR)
          ) {
            img.src = DEFAULT_AVATAR;
          }
        },
        { signal }
      );
    });

  // ----------------------------------------------------------
  // NAVIGATION CLICK
  // ----------------------------------------------------------

  nav
    ?.querySelectorAll('a:not([data-lang])')
    .forEach(link => {
      link.addEventListener(
        'click',
        () => setMenuOpen(false),
        { signal }
      );
    });

  // ----------------------------------------------------------
  // OUTSIDE CLICK
  // ----------------------------------------------------------

  document.addEventListener(
    'pointerdown',
    event => {
      if (!(event.target instanceof Element)) {
        return;
      }

      if (!header.contains(event.target)) {
        closeDropdowns();

        if (menuOpen) {
          setMenuOpen(false);
        }

      } else if (
        !event.target.closest('.mz-dropdown')
      ) {
        closeDropdowns();
      }
    },
    { signal }
  );

  // ----------------------------------------------------------
  // ESCAPE KEY
  // ----------------------------------------------------------

  document.addEventListener(
    'keydown',
    event => {
      if (event.key !== 'Escape') return;

      closeDropdowns();

      if (menuOpen) {
        setMenuOpen(false);
        toggle?.focus();
      }
    },
    { signal }
  );

  // ----------------------------------------------------------
  // WINDOW RESIZE
  // ----------------------------------------------------------

  const desktopMedia = window.matchMedia(
    '(min-width: 1025px)'
  );

  desktopMedia.addEventListener(
    'change',
    event => {
      if (event.matches) {
        setMenuOpen(false);
      }
    },
    { signal }
  );

  // ----------------------------------------------------------
  // SCROLL APPEARANCE
  // ----------------------------------------------------------

  function onScroll() {
    header.classList.toggle(
      'is-scrolled',
      window.scrollY > 24
    );
  }

  window.addEventListener(
    'scroll',
    onScroll,
    { passive: true, signal }
  );

  onScroll();

  // ----------------------------------------------------------
  // CLEANUP
  // ----------------------------------------------------------

  const cleanup = () => {
    controller.abort();
    setMenuOpen(false);

    if (activeCleanup === cleanup) {
      activeCleanup = null;
    }
  };

  activeCleanup = cleanup;

  return cleanup;
}
