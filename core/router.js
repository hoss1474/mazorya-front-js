// core/router.js

import { i18n } from './i18n.js';

class Router {
  constructor() {
    this.currentRoute = null;
    this.currentParams = {};
    this.afterRender = null;
  }

  init() {
    window.addEventListener('popstate', () => this.handleRoute());
    window.addEventListener('navigate', (e) => {
      if (e.detail?.path) this.navigateTo(e.detail.path);
    });

    this.handleRoute();
  }

  async navigateTo(path) {
    window.history.pushState({}, '', path);
    await this.handleRoute();
  }

  async handleRoute() {
    const path = window.location.pathname;

    const { routeName, params, lang } = this.parsePath(path);

    if (lang && lang !== i18n.getCurrentLanguage()) {
      await i18n.setLanguage(lang);
    }

    this.currentRoute = routeName;
    this.currentParams = params;

    const app = document.getElementById('app');

    if (!app) return;

    app.innerHTML = `<div class="loading-spinner">Loading...</div>`;

    const module = await this.loadRoute(routeName);

    if (module) {
      await module(params);
    } else {
      await this.render404();
    }

    if (this.afterRender) {
      this.afterRender();
    }
  }

  async loadRoute(routeName) {
    const routes = {
      home: () => import('../pages/home.js').then(m => m.renderHome),
      about: () => import('../pages/about.js').then(m => m.renderAbout),
      services: () => import('../pages/services.js').then(m => m.renderServices),
      service: () => import('../pages/serviceDetails.js').then(m => m.renderServiceDetails),
      projects: () => import('../pages/projects.js').then(m => m.renderProjects),
      project: () => import('../pages/projectDetails.js').then(m => m.renderProjectDetails),
      blog: () => import('../pages/blog.js').then(m => m.renderBlog),
      blogDetails: () => import('../pages/blogDetails.js').then(m => m.renderBlogDetails),
      contact: () => import('../pages/contact.js').then(m => m.renderContact),
      auth: () => import('../pages/auth.js').then(m => m.renderAuth),
      profile: () => import('../pages/profile.js').then(m => m.renderProfile),
      404: () => import('../pages/404.js').then(m => m.render404)
    };

    if (!routes[routeName]) return null;

    return routes[routeName]();
  }

  parsePath(path) {
    let clean = path.replace(/\/$/, '');

    const langMatch = clean.match(/^\/([a-z]{2})(\/|$)/);

    let lang = 'en';
    let pathWithoutLang = clean;

    if (langMatch) {
      lang = langMatch[1];
      pathWithoutLang = clean.replace(`/${lang}`, '') || '/';
    }
    

    const segments = pathWithoutLang.split('/').filter(Boolean);
    const first = segments[0] || 'home';

    // مسیرهای داینامیک
    if (first === 'service' && segments[1]) {
      return { routeName: 'service', params: { slug: segments[1] }, lang };
    }
    if (first === 'profile') {
  return { routeName: 'profile', params: {}, lang };
}

    if (first === 'project' && segments[1]) {
      return { routeName: 'project', params: { slug: segments[1] }, lang };
    }

    if (first === 'blog-details' && segments[1]) {
      return { routeName: 'blogDetails', params: { id: segments[1] }, lang };
    }

    // مسیرهای ثابت
    const validRoutes = ['home', 'about', 'services', 'projects', 'blog', 'contact', 'auth'];
    
    if (validRoutes.includes(first)) {
      return { routeName: first, params: {}, lang };
    }

    // اگر هیچکدام نبود -> 404
    return { routeName: '404', params: {}, lang };
  }

  async render404() {
    const app = document.getElementById('app');
    
    // تلاش برای لود صفحه 404 اختصاصی
    try {
      const module = await this.loadRoute('404');
      if (module) {
        await module({});
        return;
      }
    } catch (err) {
      console.error('404 page load failed:', err);
    }
    
    // fallback 404 ساده
    app.innerHTML = `
      <div style="text-align:center;padding:100px;min-height:60vh;">
        <h1 style="font-size:120px;margin-bottom:20px;color:#ff6b6b;">404</h1>
        <h2 style="margin-bottom:15px;">Page Not Found</h2>
        <p style="margin-bottom:30px;color:#666;">The page you are looking for does not exist.</p>
        <a href="/${i18n.getCurrentLanguage()}/" class="primary-button" style="display:inline-block;">Go Home</a>
      </div>
    `;
  }
}

export const router = new Router();