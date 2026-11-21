import{e as S,m as h}from"./index-BZXsUPAf.js";import{r as j,a as k}from"./header-hNak-YC9.js";import{r as C,a as I}from"./footer-CBaj94Xp.js";const v={},f="/assets/img/default-project.jpg",z=(v==null?void 0:v.VITE_API_URL)||"https://api.mazoryagroup.com/api";let E=0;const y=[{id:"all",label:"همه",labelEn:"All"},{id:"website",label:"وبسایت",labelEn:"Website"},{id:"ui-ux",label:"UI/UX",labelEn:"UI/UX"},{id:"social-media",label:"سوشیال مدیا",labelEn:"Social Media"},{id:"seo",label:"سئو",labelEn:"SEO"},{id:"graphic",label:"گرافیک",labelEn:"Graphic"},{id:"other",label:"سایر",labelEn:"Other"}],U={website:["website","web","وبسایت","وب سایت","site","web development"],"ui-ux":["ui-ux","ui/ux","uiux","user interface","user experience","طراحی رابط کاربری","تجربه کاربری"],"social-media":["social-media","social media","social","سوشیال","سوشیال مدیا","instagram","telegram"],seo:["seo","سئو","بهینه سازی","بهینه‌سازی","search engine"],graphic:["graphic","graphics","گرافیک","طراحی گرافیک","illustration","تصویرسازی"]};function l(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function x(e,t=""){const r=h.t(e);return r==null||r===""||r===e?t||e:String(r)}function g(e,t=""){return l(x(e,t))}function d(e){return e==="fa"}function w(e,t){if(!e)return"";const r=y.find(i=>i.id===e);return r?d(t)?r.label:r.labelEn:String(e)}function P(e,t){return`${e} ${d(t)?"پروژه":e===1?"project":"projects"}`}function p(e){return String(e??"").normalize("NFKC").toLowerCase().replace(/[\u200c\u200d]/g," ").replace(/[_-]/g," ").replace(/\s+/g," ").trim()}function m(e){if(e==null)return[];if(Array.isArray(e))return e.flatMap(m);if(typeof e=="object")return[e.slug,e.name,e.title,e.label].filter(r=>typeof r=="string").map(p).filter(Boolean);if(typeof e=="string"||typeof e=="number"){const t=p(e);return t?[t]:[]}return[]}function T(e){const t=p(e);if(!t)return null;for(const[r,i]of Object.entries(U))if(i.some(n=>{const a=p(n);return t===a?!0:a.length<=3?t.split(/[\s/,+&()]+/).includes(a):t.includes(a)}))return r;return null}function A(e){const t=[...m(e==null?void 0:e.category),...m(e==null?void 0:e.categories),...m(e==null?void 0:e.tags)];for(const r of t){const i=T(r);if(i)return i}return"other"}function O(e){const t=Object.fromEntries(y.filter(r=>r.id!=="all").map(r=>[r.id,[]]));return e.forEach(r=>{const i=A(r);t[i].push(r)}),t}function R(e){if(typeof e!="string"||!e.trim())return f;const t=e.trim();try{if(t.startsWith("//")||/^[a-z][a-z\d+.-]*:/i.test(t)&&!/^https?:\/\//i.test(t))return f;const r=new URL(z,window.location.origin).origin;let i;return/^https?:\/\//i.test(t)?i=new URL(t):t.startsWith("/assets/")||t.startsWith("assets/")?i=new URL(t.startsWith("/")?t:`/${t}`,window.location.origin):i=new URL(`/${t.replace(/^\/+/,"")}`,r),["http:","https:"].includes(i.protocol)?l(i.href):f}catch{return f}}function q(e){const t=e==null?void 0:e.images,r=(typeof t=="string"?t:null)||(t==null?void 0:t.image)||(t==null?void 0:t.cover)||(e==null?void 0:e.cover_url)||(e==null?void 0:e.image_url)||(e==null?void 0:e.image);return R(r)}function F(e,t){const r=e==null?void 0:e.slug;return r==null||String(r).trim()===""?null:`/${t}/project/${encodeURIComponent(String(r))}`}function M(e){return y.map(t=>{const r=w(t.id,e),i=t.id==="all";return`
      <button
        type="button"
        class="category-filter-btn ${i?"active":""}"
        data-category="${t.id}"
        aria-pressed="${i}"
      >
        ${l(r)}
      </button>
    `}).join("")}function L(e,t,r=!1){if(!Array.isArray(e)||!e.length)return`
      <div class="no-projects">
        <p>
          ${g("no_projects",d(t)?"هیچ پروژه‌ای وجود ندارد":"No projects found.")}
        </p>
      </div>
    `;const i=[];for(let s=0;s<e.length;s+=2)i.push(e.slice(s,s+2));return i.map(s=>`
    <div class="projects-row">
      ${s.map(n=>{const a=String((n==null?void 0:n.name)||(n==null?void 0:n.title)||"Project"),c=q(n),o=F(n,t),u=A(n),b=r?w(u,t):"",$=`
          <img
            src="${c}"
            loading="lazy"
            decoding="async"
            alt="${l(a)}"
            class="project-image"
          />
        `;return`
          <div class="project-collection-item">
            <div class="project-card-wrap">

              <div class="project-image-area">

                ${o?`
                      <a
                        href="${o}"
                        class="project-image-wrap w-inline-block"
                      >
                        ${$}
                      </a>

                      <a
                        href="${o}"
                        class="project-overlay-wrap w-inline-block"
                        aria-label="${l(a)}"
                      >
                        <div class="project-arrow-icon-wrap">
                          <img
                            src="/assets/img/project-arrow.svg"
                            class="project-arrow-icon"
                            alt=""
                          />
                        </div>
                      </a>
                    `:`
                      <div class="project-image-wrap">
                        ${$}
                      </div>
                    `}

              </div>

              <div class="project-title-wrap">

                ${o?`
                      <a href="${o}" class="project-title">
                        ${l(a)}
                      </a>
                    `:`
                      <span class="project-title">
                        ${l(a)}
                      </span>
                    `}

                ${b?`
                      <span class="project-category-tag">
                        ${l(b)}
                      </span>
                    `:""}

              </div>

            </div>
          </div>
        `}).join("")}
    </div>
  `).join("")}function _(e,t){return y.filter(r=>r.id!=="all").map(r=>{const i=e[r.id]||[],s=w(r.id,t);return`
        <div
          class="category-section"
          data-category="${r.id}"
          style="display:none;"
        >
          <div class="category-header">
            <h2 class="category-title">
              ${l(s)}
            </h2>

            <span class="category-count">
              ${l(P(i.length,t))}
            </span>
          </div>

          <div class="category-projects">
            ${L(i,t,!0)}
          </div>
        </div>
      `}).join("")}function H(e){return`
    <section class="projects-banner">

      <div class="w-layout-blockcontainer container-regular w-container">
        <div class="align-center">

          <div class="banner-title-wrap small">

            <h1 class="banner-title">
              ${g("projects_title",d(e)?"نمونه کارها":"Our Projects")}
            </h1>

            <p>
              ${g("projects_subtitle",d(e)?"گزیده‌ای از مهم‌ترین پروژه‌های ما در حوزه‌های مختلف":"Explore our selected projects across different creative and digital disciplines.")}
            </p>

          </div>

        </div>
      </div>
    </section>
  `}function G(e){return`
    <section class="category-filter-section">
      <div class="w-layout-blockcontainer container-regular w-container">
        <div class="category-filter-wrap">
          ${M(e)}
        </div>
      </div>
    </section>
  `}function V(e,t,r){return`
    <section class="projects-list-section">

      <div class="w-layout-blockcontainer container-regular w-container">

        <div
          id="projects-grid-container"
          class="projects-grid"
        >

          <div
            id="all-projects-view"
            class="all-projects-view"
          >

            <div class="category-header">

              <h2 class="category-title">
                ${d(r)?"همه پروژه‌ها":"All Projects"}
              </h2>

              <span class="category-count">
                ${l(P(e.length,r))}
              </span>

            </div>

            <div class="category-projects">
              ${L(e,r,!1)}
            </div>

          </div>

          <div
            id="categories-view"
            class="categories-view"
            style="display:none;"
          >
            ${_(t,r)}
          </div>

        </div>

      </div>

    </section>
  `}function W(e){return`
    <section class="cta-section">

      <div class="w-layout-blockcontainer container-regular w-container">

        <div class="cta-image-wrap">

          <img
            src="/assets/img/cta-image.jpg"
            loading="lazy"
            decoding="async"
            alt=""
            class="cta-image"
          />

          <div class="cta-title-area">

            <div class="cta-title-wrap">

              <h2 class="section-title text-white">
                ${g("cta_projects_title",d(e)?"پروژه‌ای در ذهن دارید؟":"Have a project in mind?")}
              </h2>

              <div class="cta-button-wrap">
                <a
                  href="/${e}/contact"
                  class="cta-button"
                  data-route="contact"
                >
                  ${g("lets_talk",d(e)?"با ما صحبت کنید":"Let's Talk")}
                </a>
              </div>

            </div>

          </div>

          <div class="cta-bg-wrap"></div>
        </div>

      </div>

    </section>
  `}function B(e){const t=[...e.querySelectorAll(".category-filter-btn")],r=e.querySelector("#all-projects-view"),i=e.querySelector("#categories-view"),s=[...e.querySelectorAll(".category-section")];if(!t.length||!r||!i)return;function n(a){t.forEach(o=>{const u=o.dataset.category===a;o.classList.toggle("active",u),o.setAttribute("aria-pressed",String(u))});const c=a==="all";r.style.display=c?"block":"none",i.style.display=c?"none":"block",s.forEach(o=>{o.style.display=!c&&o.dataset.category===a?"block":"none"})}t.forEach(a=>{a.addEventListener("click",()=>{var u;const c=a.dataset.category;if(!c)return;n(c);const o=e.querySelector(".projects-list-section");o&&o.scrollIntoView({behavior:(u=window.matchMedia)!=null&&u.call(window,"(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"})})}),n("all")}async function K(){const e=document.getElementById("app");if(!e){console.error("[Projects] #app element not found.");return}const t=h.getCurrentLanguage(),r=window.location.pathname,i=++E;let s=[];try{const a=await S();Array.isArray(a)&&(s=a.filter(c=>c&&typeof c=="object"))}catch(a){console.error("[Projects] Failed to load projects:",a)}if(i!==E||window.location.pathname!==r||h.getCurrentLanguage()!==t)return;const n=O(s);e.innerHTML=`
  ${j()}

  <main class="mz-projects" id="mazoryaProjects">
    ${H(t)}
    ${G(t)}

    ${V(s,n,t)}

    ${W(t)}
  </main>

  ${C()}
`,k(),I(),B(e),console.log("[Projects] Page rendered:",{language:t,projects:s.length,categories:Object.fromEntries(Object.entries(n).map(([a,c])=>[a,c.length]))})}export{K as renderProjects};
