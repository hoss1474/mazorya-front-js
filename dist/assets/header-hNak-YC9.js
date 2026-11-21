import{n as j,j as O,m as z,p as C}from"./index-BZXsUPAf.js";const y={BASE_URL:"/",DEV:!1,MODE:"production",PROD:!0,SSR:!1},$=[{code:"en",label:"English",flag:"🇬🇧"},{code:"fa",label:"فارسی",flag:"🇮🇷"},{code:"ar",label:"العربية",flag:"🇸🇦"},{code:"fr",label:"Français",flag:"🇫🇷"},{code:"de",label:"Deutsch",flag:"🇩🇪"},{code:"es",label:"Español",flag:"🇪🇸"},{code:"tr",label:"Türkçe",flag:"🇹🇷"}],U=[{key:"home",path:"",translation:"nav_home",fallback:"Home"},{key:"about",path:"about",translation:"nav_about",fallback:"About"},{key:"services",path:"services",translation:"nav_services",fallback:"Services"},{key:"projects",path:"projects",translation:"nav_projects",fallback:"Projects"},{key:"contact",path:"contact",translation:"nav_contact",fallback:"Contact"}],f="/assets/img/default-avatar.png";let p=null;function u(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function k(e,n=""){const a=z.t(e);return a==null||a===""||a===e?n:String(a)}function d(e,n=""){return u(k(e,n))}function M(){const e=z.getCurrentLanguage();return $.some(n=>n.code===e)?e:"en"}function T(e){return e==="fa"||e==="ar"}function S(e){const a=window.location.pathname.split("/");return $.some(o=>o.code===a[1])?a[1]=e:a.splice(1,0,e),a.join("/")+window.location.search+window.location.hash}function x(e,n){const a=window.location.pathname.replace(/\/+$/,"")||"/",o=`/${n}`;return e==="home"?a==="/"||a===o:e==="services"?a===`${o}/services`||a.startsWith(`${o}/service/`):e==="projects"?a===`${o}/projects`||a.startsWith(`${o}/project/`):a===`${o}/${e}`}function N(e){if(typeof e!="string"||!e.trim())return f;const n=e.trim();if(n.startsWith("//")||/^[a-z][a-z\d+.-]*:/i.test(n)&&!/^https?:\/\//i.test(n))return f;try{const a=(y==null?void 0:y.VITE_API_URL)||window.location.origin,o=new URL(a,window.location.origin).origin;let r;return/^https?:\/\//i.test(n)?r=new URL(n):/^\/?assets\//i.test(n)?r=new URL(`/${n.replace(/^\/+/,"")}`,window.location.origin):r=new URL(`/${n.replace(/^\/+/,"")}`,o),["https:","http:"].includes(r.protocol)?r.href:f}catch{return f}}const c={globe:`
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
  `,chevron:`
    <svg viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true">
      <path d="m6 9 6 6 6-6"/>
    </svg>
  `,arrow:`
    <svg viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true">
      <path d="M5 12h14m-6-6 6 6-6 6"/>
    </svg>
  `,user:`
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
  `,settings:`
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
  `,logout:`
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
  `};function B(e){return U.map(n=>{const a=n.path?`/${e}/${n.path}`:`/${e}/`,o=x(n.key,e);return`
      <li>
        <a
          class="mz-nav-link${o?" is-current":""}"
          href="${a}"
          data-route="${n.key}"
          ${o?'aria-current="page"':""}
        >
          ${d(n.translation,n.fallback)}
        </a>
      </li>
    `}).join("")}function E(e,n=!1){const a=n?"Mobile":"",o=$.map(r=>{const i=r.code===e;return`
      <a
        class="mz-language-option${i?" is-selected":""}"
        href="${u(S(r.code))}"
        data-lang="${r.code}"
        lang="${r.code}"
        ${i?'aria-current="true"':""}
      >
        <span class="mz-language-flag">
          ${r.flag}
        </span>

        <span>${u(r.label)}</span>

        ${i?'<span class="mz-language-check">✓</span>':""}
      </a>
    `}).join("");return`
    <div class="mz-dropdown mz-lang-dropdown">
      <button
        type="button"
        class="mz-lang-btn"
        id="langBtn${a}"
        data-menu-trigger="langMenu${a}"
        aria-controls="langMenu${a}"
        aria-expanded="false"
        aria-haspopup="true"
        aria-label="${d("language","Language")}"
      >
        ${c.globe}

        <span class="mz-lang-code">
          ${e.toUpperCase()}
        </span>

        <span class="mz-chevron">
          ${c.chevron}
        </span>
      </button>

      <div
        class="mz-dropdown-menu mz-lang-menu"
        id="langMenu${a}"
      >
        ${o}
      </div>
    </div>
  `}function H(e){const n=String((e==null?void 0:e.full_name)||(e==null?void 0:e.name)||k("account","Account"));return{name:n,firstName:n.trim().split(/\s+/)[0],avatar:N((e==null?void 0:e.avatar_url)||(e==null?void 0:e.avatar)),email:(e==null?void 0:e.email)||""}}function A(e,n,a,o=!1){if(!n)return`
      <a
        class="mz-header-cta${o?" mz-header-cta--mobile":""}"
        href="/${e}/auth"
        data-route="auth"
      >
        <span>
          ${d("btn_get_started","Get Started")}
        </span>

        ${c.arrow}
      </a>
    `;const r=H(a),i=`
    <span class="mz-avatar">
      <img
        data-header-avatar
        src="${u(r.avatar)}"
        alt=""
      />
    </span>
  `;return o?`
      <div class="mz-mobile-account">
        <a
          class="mz-mobile-profile"
          href="/${e}/profile"
          data-route="profile"
        >
          ${i}

          <span>
            ${u(r.name)}
          </span>

          ${c.arrow}
        </a>

        <button
          type="button"
          class="mz-mobile-logout"
          data-header-logout
        >
          ${c.logout}

          <span>
            ${d("logout","Logout")}
          </span>
        </button>
      </div>
    `:`
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
        ${i}

        <span class="mz-profile-name">
          ${u(r.firstName)}
        </span>

        <span class="mz-chevron">
          ${c.chevron}
        </span>
      </button>

      <div
        class="mz-dropdown-menu mz-profile-menu"
        id="profileMenu"
      >
        <div class="mz-profile-summary">
          <strong>
            ${u(r.name)}
          </strong>

          <span>
            ${u(r.email)}
          </span>
        </div>

        <a
          href="/${e}/profile"
          data-route="profile"
        >
          ${c.user}
          ${d("profile","My Profile")}
        </a>

        <a
          href="/${e}/profile?tab=settings"
          data-route="profile"
        >
          ${c.settings}
          ${d("settings","Settings")}
        </a>

        <div class="mz-menu-divider"></div>

        <button
          type="button"
          class="mz-logout-item"
          data-header-logout
        >
          ${c.logout}
          ${d("logout","Logout")}
        </button>
      </div>
    </div>
  `}function R(){const e=M(),n=j();let a=null;if(n)try{a=O()}catch(r){console.warn("[Header] User data unavailable:",r)}return`
    <header
      class="site-header mz-header${x("home",e)?" mz-header--overlay":""}"
      id="mazoryaHeader"
      dir="${T(e)?"rtl":"ltr"}"
    >
      <div class="mz-header-container">

        <!-- LOGO -->
        <div class="mz-header-logo">
          <a
            href="/${e}/"
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
          aria-label="${d("navigation","Main navigation")}"
        >
          <ul class="mz-header-menu">
            ${B(e)}
          </ul>

          <!-- MOBILE ACTIONS -->
          <div class="mz-header-actions-mobile">
            ${E(e,!0)}

            ${A(e,n,a,!0)}
          </div>
        </nav>

        <!-- DESKTOP ACTIONS -->
        <div class="mz-header-actions">
          ${E(e)}

          ${A(e,n,a)}
        </div>

        <!-- MOBILE TOGGLE -->
        <button
          type="button"
          class="mz-menu-toggle"
          id="mobileToggle"
          aria-label="${d("open_menu","Open menu")}"
          aria-controls="headerNav"
          aria-expanded="false"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>
    </header>
  `}function D(){p==null||p(),p=null;const e=document.getElementById("mazoryaHeader");if(!e)return;const n=new AbortController,{signal:a}=n,o=e.querySelector("#headerNav"),r=e.querySelector("#mobileToggle");let i=!1,v=null;function g(){e.querySelectorAll("[data-menu-trigger]").forEach(t=>{var l;t.setAttribute("aria-expanded","false"),(l=t.closest(".mz-dropdown"))==null||l.classList.remove("is-open");const s=e.querySelector(`#${t.dataset.menuTrigger}`);s==null||s.classList.remove("show")})}function h(t){i!==t&&(i=t,o==null||o.classList.toggle("active",t),r==null||r.classList.toggle("active",t),r==null||r.setAttribute("aria-expanded",String(t)),r==null||r.setAttribute("aria-label",k(t?"close_menu":"open_menu",t?"Close menu":"Open menu")),t?(v=document.body.style.overflow,document.body.style.overflow="hidden"):v!==null&&(document.body.style.overflow=v,v=null),t||g())}r==null||r.addEventListener("click",()=>h(!i),{signal:a}),e.querySelectorAll("[data-menu-trigger]").forEach(t=>{t.addEventListener("click",s=>{var m;s.stopPropagation();const l=e.querySelector(`#${t.dataset.menuTrigger}`);if(!l)return;const b=!l.classList.contains("show");g(),b&&(l.classList.add("show"),(m=t.closest(".mz-dropdown"))==null||m.classList.add("is-open"),t.setAttribute("aria-expanded","true"))},{signal:a})}),e.querySelectorAll("[data-lang]").forEach(t=>{t.addEventListener("click",async s=>{if(s.button!==0||s.ctrlKey||s.metaKey||s.shiftKey||s.altKey)return;const l=t.dataset.lang;if(!$.some(m=>m.code===l))return;s.preventDefault(),g();const b=S(l);try{await z.setLanguage(l)}catch(m){console.warn("[Header] Language loading failed:",m)}window.location.assign(b)},{signal:a})}),e.querySelectorAll("[data-header-logout]").forEach(t=>{t.addEventListener("click",async()=>{if(!t.disabled){t.disabled=!0;try{await C(),window.location.assign(`/${M()}/auth`)}catch(s){t.disabled=!1,console.error("[Header] Logout failed:",s)}}},{signal:a})}),e.querySelectorAll("[data-header-avatar]").forEach(t=>{t.addEventListener("error",()=>{t.src.endsWith(f)||(t.src=f)},{signal:a})}),o==null||o.querySelectorAll("a:not([data-lang])").forEach(t=>{t.addEventListener("click",()=>h(!1),{signal:a})}),document.addEventListener("pointerdown",t=>{t.target instanceof Element&&(e.contains(t.target)?t.target.closest(".mz-dropdown")||g():(g(),i&&h(!1)))},{signal:a}),document.addEventListener("keydown",t=>{t.key==="Escape"&&(g(),i&&(h(!1),r==null||r.focus()))},{signal:a}),window.matchMedia("(min-width: 1025px)").addEventListener("change",t=>{t.matches&&h(!1)},{signal:a});function L(){e.classList.toggle("is-scrolled",window.scrollY>24)}window.addEventListener("scroll",L,{passive:!0,signal:a}),L();const w=()=>{n.abort(),h(!1),p===w&&(p=null)};return p=w,w}export{D as a,R as r};
