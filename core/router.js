
/**
 * Mazorya Group - SPA Router
 * File: core/router.js
 */

import { i18n } from './i18n.js';

const SUPPORTED_LANGS = [
  'en',
  'fr',
  'fa',
  'ar',
  'de',
  'es',
  'tr'
];

const DEFAULT_LANG = 'en';

// ============================================================
// ROUTE LOADERS
// ============================================================

const routeLoaders = {
  home: () =>
    import('../pages/home.js').then(m => m.renderHome),

  about: () =>
    import('../pages/about.js').then(m => m.renderAbout),

  services: () =>
    import('../pages/services.js').then(m => m.renderServices),

  service: () =>
    import('../pages/serviceDetails.js').then(
      m => m.renderServiceDetails
    ),

  projects: () =>
    import('../pages/projects.js').then(m => m.renderProjects),

  project: () =>
    import('../pages/projectDetails.js').then(
      m => m.renderProjectDetails
    ),

  blog: () =>
    import('../pages/blog.js').then(m => m.renderBlog),

  blogDetails: () =>
    import('../pages/blogDetails.js').then(
      m => m.renderBlogDetails
    ),

  contact: () =>
    import('../pages/contact.js').then(m => m.renderContact),

  auth: () =>
    import('../pages/auth.js').then(m => m.renderAuth),

  profile: () =>
    import('../pages/profile.js').then(m => m.renderProfile),
  app: () =>
  import('../pages/appDownload.js').then(
    module => module.renderAppDownload
  ),

  '404': () =>
    import('../pages/404.js').then(m => m.render404)
};

// ============================================================
// ROUTER CLASS
// ============================================================

class Router {
  constructor() {
    this.currentRoute = null;
    this.currentParams = {};

    this.afterRender = null;

    this._initialized = false;
    this._navigationId = 0;
  }

  // ==========================================================
  // INITIALIZATION
  // ==========================================================

  init() {
    if (this._initialized) return;

    this._initialized = true;

    window.addEventListener('popstate', () => {
      void this.handleRoute();
    });

    // Preserve custom navigation used by existing components.
    window.addEventListener('navigate', event => {
      const path = event.detail?.path;

      if (typeof path === 'string' && path) {
        void this.navigateTo(path);
      }
    });

    return this.handleRoute();
  }

  // ==========================================================
  // NAVIGATION
  // ==========================================================

  async navigateTo(path, replace = false) {
    if (
      typeof path !== 'string' ||
      !path.trim()
    ) {
      return false;
    }

    let target;

    try {
      target = new URL(
        path,
        window.location.origin
      );
    } catch (error) {
      console.error(
        '[Router] Invalid navigation URL:',
        error
      );

      return false;
    }

    if (
      !['http:', 'https:'].includes(
        target.protocol
      )
    ) {
      return false;
    }

    if (target.origin !== window.location.origin) {
      window.location.assign(target.href);
      return true;
    }

    const targetPath =
      target.pathname +
      target.search +
      target.hash;

    const currentPath =
      window.location.pathname +
      window.location.search +
      window.location.hash;

    if (targetPath === currentPath) {
      return true;
    }

    if (replace) {
      window.history.replaceState(
        {},
        '',
        targetPath
      );
    } else {
      window.history.pushState(
        {},
        '',
        targetPath
      );
    }

    await this.handleRoute();

    return true;
  }

  // ==========================================================
  // PARSE PATH
  // ==========================================================

  parsePath(path) {
    const pathname =
      typeof path === 'string'
        ? path.split(/[?#]/)[0]
        : '/';

    const rawSegments = (
      pathname.replace(/\/+$/, '') || '/'
    )
      .split('/')
      .filter(Boolean);

    let segments;

    try {
      segments = rawSegments.map(segment =>
        decodeURIComponent(segment)
      );
    } catch {
      return {
        routeName: '404',
        params: {},
        lang: DEFAULT_LANG
      };
    }

    let lang = DEFAULT_LANG;

    if (
      segments.length &&
      SUPPORTED_LANGS.includes(segments[0])
    ) {
      lang = segments.shift();
    }

    const first = segments[0] || 'home';

    const notFound = {
      routeName: '404',
      params: {},
      lang
    };

    // HOME
    if (
      segments.length === 0 ||
      (first === 'home' && segments.length === 1)
    ) {
      return {
        routeName: 'home',
        params: {},
        lang
      };
    }

    // SERVICE DETAILS
    if (
      first === 'service' &&
      segments.length === 2 &&
      segments[1]
    ) {
      return {
        routeName: 'service',
        params: {
          slug: segments[1]
        },
        lang
      };
    }

    // PROJECT DETAILS
    // Supports both:
    // /en/project/34
    // /en/projects/34
    if (
      (first === 'project' || first === 'projects') &&
      segments.length === 2 &&
      segments[1]
    ) {
      return {
        routeName: 'project',
        params: {
          slug: segments[1]
        },
        lang
      };
    }

    // BLOG DETAILS
    if (
      first === 'blog-details' &&
      segments.length === 2 &&
      segments[1]
    ) {
      return {
        routeName: 'blogDetails',
        params: {
          id: segments[1]
        },
        lang
      };
    }

    // PROFILE
    if (
      first === 'profile' &&
      segments.length === 1
    ) {
      return {
        routeName: 'profile',
        params: {},
        lang
      };
    }

    // LOGIN ALIAS
    if (
      first === 'login' &&
      segments.length === 1
    ) {
      return {
        routeName: 'auth',
        params: {},
        lang
      };
    }

    // STATIC ROUTES
    const staticRoutes = [
      'about',
      'services',
      'projects',
      'blog',
      'contact',
      'app',
      'auth'
    ];

    if (
      staticRoutes.includes(first) &&
      segments.length === 1
    ) {
      return {
        routeName: first,
        params: {},
        lang
      };
    }

    return notFound;
  }

  // ==========================================================
  // HANDLE ROUTE
  // ==========================================================

  async handleRoute() {
    const navigationId = ++this._navigationId;

    const {
      routeName,
      params,
      lang
    } = this.parsePath(
      window.location.pathname
    );

    const app = document.getElementById('app');

    if (!app) {
      console.error(
        '[Router] #app element not found.'
      );
      return;
    }

    try {
      if (
        lang !== i18n.getCurrentLanguage()
      ) {
        await i18n.setLanguage(lang);
      }

      if (
        navigationId !== this._navigationId
      ) {
        return;
      }

      this.currentRoute = routeName;
      this.currentParams = params;

      app.innerHTML = `
        <div
          class="loading-spinner"
          role="status"
          aria-live="polite"
        >
          Loading...
        </div>
      `;

      const render = await this.loadRoute(
        routeName
      );

      if (
        navigationId !== this._navigationId
      ) {
        return;
      }

      if (typeof render === 'function') {
        await render(params);
      } else {
        await this.render404();
      }

      if (
        navigationId !== this._navigationId
      ) {
        return;
      }

      if (
        typeof this.afterRender === 'function'
      ) {
        await this.afterRender();
      }

    } catch (error) {
      if (
        navigationId !== this._navigationId
      ) {
        return;
      }

      console.error(
        `[Router] Failed to render "${routeName}":`,
        error
      );

      this.renderError(error);
    }
  }

  // ==========================================================
  // LOAD ROUTE
  // ==========================================================

  async loadRoute(routeName) {
    const loader = routeLoaders[routeName];

    if (
      typeof loader !== 'function'
    ) {
      return null;
    }

    const render = await loader();

    if (
      typeof render !== 'function'
    ) {
      throw new Error(
        `Invalid render function for route: ${routeName}`
      );
    }

    return render;
  }

  // ==========================================================
  // RENDER 404
  // ==========================================================

  async render404() {
    const app = document.getElementById('app');

    if (!app) return;

    try {
      const render = await this.loadRoute('404');

      if (
        typeof render === 'function'
      ) {
        await render({});
        return;
      }
    } catch (error) {
      console.error(
        '[Router] Custom 404 page failed:',
        error
      );
    }

    const lang = i18n.getCurrentLanguage();

    app.innerHTML = `
      <section
        style="
          text-align: center;
          padding: 100px 20px;
          min-height: 60vh;
        "
      >
        <h1
          style="
            font-size: 100px;
            margin-bottom: 20px;
          "
        >
          404
        </h1>

        <h2>Page Not Found</h2>

        <p style="margin: 20px 0 30px;">
          The page you are looking for does not exist.
        </p>

        <a
          href="/${lang}/"
          class="primary-button"
        >
          Go Home
        </a>
      </section>
    `;
  }

  // ==========================================================
  // RENDER ERROR
  // ==========================================================

  renderError(error) {
    const app = document.getElementById('app');

    if (!app) return;

    const lang = i18n.getCurrentLanguage();

    app.innerHTML = `
      <section
        style="
          text-align: center;
          padding: 100px 20px;
          min-height: 60vh;
        "
      >
        <h1>Something went wrong</h1>

        <p style="margin: 20px 0 30px;">
          We couldn't load this page.
          Please try again.
        </p>

        <a
          href="/${lang}/"
          class="primary-button"
        >
          Back to Home
        </a>
      </section>
    `;

    console.error(
      '[Router] Render error:',
      error
    );
  }

  // ==========================================================
  // CURRENT ROUTE
  // ==========================================================

  getCurrentRoute() {
    return this.currentRoute;
  }

  getCurrentParams() {
    return this.currentParams;
  }
}

// ============================================================
// EXPORT
// ============================================================

export const router = new Router();
