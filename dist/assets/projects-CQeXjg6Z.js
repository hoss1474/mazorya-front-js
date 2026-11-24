import{e as A,m as b,q as $}from"./index-6O3GMm5i.js";import{r as k,a as I}from"./header-CtcPUyL-.js";import{r as L,a as j}from"./footer-uRjdZ6qW.js";const E="/assets/img/default-project.jpg";let h=0;const y=[{id:"all",label:"همه",labelEn:"All"},{id:"website",label:"وبسایت",labelEn:"Website"},{id:"ui-ux",label:"UI/UX",labelEn:"UI/UX"},{id:"social-media",label:"سوشیال مدیا",labelEn:"Social Media"},{id:"prompts",label:"پرامپت‌ها",labelEn:"Prompts"},{id:"graphic",label:"گرافیک",labelEn:"Graphic"},{id:"other",label:"سایر",labelEn:"Other"}],x={prompts:["prompts","prompt","ai prompt","ai prompts","website prompt","website prompts","web prompt","prompt engineering","پرامپت","پرامپت‌ها","پرامپت ها","پرامپت سایت","پرامپت آماده"],website:["website","web","وبسایت","وب سایت","site","web development"],"ui-ux":["ui-ux","ui/ux","uiux","user interface","user experience","طراحی رابط کاربری","تجربه کاربری"],"social-media":["social-media","social media","social","سوشیال","سوشیال مدیا","instagram","telegram"],graphic:["graphic","graphics","گرافیک","طراحی گرافیک","illustration","تصویرسازی"]};function l(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function _(e,t=""){const r=b.t(e);return r==null||r===""||r===e?t||e:String(r)}function f(e,t=""){return l(_(e,t))}function d(e){return e==="fa"}function w(e,t){if(!e)return"";const r=y.find(i=>i.id===e);return r?d(t)?r.label:r.labelEn:String(e)}function P(e,t){return`${e} ${d(t)?"پروژه":e===1?"project":"projects"}`}function v(e){return String(e??"").normalize("NFKC").toLowerCase().replace(/[\u200c\u200d]/g," ").replace(/[\_-]/g," ").replace(/\s+/g," ").trim()}function p(e){if(e==null)return[];if(Array.isArray(e))return e.flatMap(p);if(typeof e=="object")return[e.slug,e.name,e.title,e.label].filter(t=>typeof t=="string").map(v).filter(Boolean);if(typeof e=="string"||typeof e=="number"){const t=v(e);return t?[t]:[]}return[]}function z(e){const t=v(e);if(!t)return null;for(const[r,i]of Object.entries(x))if(i.some(s=>{const n=v(s);return t===n?!0:n.length<=3?t.split(/[\s/,+&()]+/).includes(n):t.includes(n)}))return r;return null}function S(e){const t=[...p(e==null?void 0:e.category),...p(e==null?void 0:e.categories),...p(e==null?void 0:e.tags)];for(const r of t){const i=z(r);if(i)return i}return"other"}function U(e){const t=Object.fromEntries(y.filter(r=>r.id!=="all").map(r=>[r.id,[]]));return e.forEach(r=>{const i=S(r);t[i].push(r)}),t}function q(e){return l($(e)||E)}function M(e){const t=e==null?void 0:e.images,r=[typeof t=="string"?t:null,t==null?void 0:t.image,t==null?void 0:t.cover,e==null?void 0:e.cover_url,e==null?void 0:e.image_url,e==null?void 0:e.image];for(const i of r){const a=typeof i=="string"?i:(i==null?void 0:i.url)??(i==null?void 0:i.path)??null;if(a&&$(a))return q(a)}return E}function T(e,t){const i=String((e==null?void 0:e.slug)??"").trim()||(e==null?void 0:e.id);return i==null||String(i).trim()===""?null:`/${encodeURIComponent(t)}/project/${encodeURIComponent(String(i).trim())}`}function F(e){return y.map(t=>{const r=w(t.id,e),i=t.id==="all";return`
      <button
        type="button"
        class="category-filter-btn ${i?"active":""}"
        data-category="${t.id}"
        aria-pressed="${i}"
      >
        ${l(r)}
      </button>
    `}).join("")}function C(e,t,r=!1){if(!Array.isArray(e)||!e.length)return`
      <div class="no-projects">
        <p>
          ${f("no_projects",d(t)?"هیچ پروژه‌ای وجود ندارد":"No projects found.")}
        </p>
      </div>
    `;const i=[];for(let a=0;a<e.length;a+=2)i.push(e.slice(a,a+2));return i.map(a=>`
    <div class="projects-row">

      ${a.map(s=>{const n=String((s==null?void 0:s.name)||(s==null?void 0:s.title)||"Project"),c=M(s),o=T(s,t),u=S(s),g=r?w(u,t):"",m=`
          <img
            src="${c}"
            loading="lazy"
            decoding="async"
            alt="${l(n)}"
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
                        ${m}
                      </a>

                      <a
                        href="${o}"
                        class="project-overlay-wrap w-inline-block"
                        aria-label="${l(n)}"
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
                        ${m}
                      </div>
                    `}

              </div>

              <div class="project-title-wrap">

                ${o?`
                      <a
                        href="${o}"
                        class="project-title"
                      >
                        ${l(n)}
                      </a>
                    `:`
                      <span class="project-title">
                        ${l(n)}
                      </span>
                    `}

                ${g?`
                      <span class="project-category-tag">
                        ${l(g)}
                      </span>
                    `:""}

              </div>

            </div>

          </div>
        `}).join("")}

    </div>
  `).join("")}function O(e,t){return y.filter(r=>r.id!=="all").map(r=>{const i=e[r.id]||[],a=w(r.id,t);return`
        <div
          class="category-section"
          data-category="${r.id}"
          style="display:none;"
        >

          <div class="category-header">

            <h2 class="category-title">
              ${l(a)}
            </h2>

            <span class="category-count">
              ${l(P(i.length,t))}
            </span>

          </div>

          <div class="category-projects">
            ${C(i,t,!0)}
          </div>

        </div>
      `}).join("")}function H(e){return`
    <section class="projects-banner">

      <div class="w-layout-blockcontainer container-regular w-container">

        <div class="align-center">

          <div class="banner-title-wrap small">

            <h1 class="banner-title">
              ${f("projects_title",d(e)?"نمونه کارها":"Our Projects")}
            </h1>

            <p>
              ${f("projects_subtitle",d(e)?"گزیده‌ای از مهم‌ترین پروژه‌های ما در حوزه‌های مختلف":"Explore our selected projects across different creative and digital disciplines.")}
            </p>

          </div>

        </div>

      </div>

    </section>
  `}function R(e){return`
    <section class="category-filter-section">

      <div class="w-layout-blockcontainer container-regular w-container">

        <div class="category-filter-wrap">
          ${F(e)}
        </div>

      </div>

    </section>
  `}function G(e,t,r){const i=d(r)?"همه پروژه‌ها":"All Projects";return`
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
                ${l(i)}
              </h2>

              <span class="category-count">
                ${l(P(e.length,r))}
              </span>

            </div>

            <div class="category-projects">
              ${C(e,r,!1)}
            </div>

          </div>

          <div
            id="categories-view"
            class="categories-view"
            style="display:none;"
          >
            ${O(t,r)}
          </div>

        </div>

      </div>

    </section>
  `}function B(e){return`
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
                ${f("cta_projects_title",d(e)?"پروژه‌ای در ذهن دارید؟":"Have a project in mind?")}
              </h2>

              <div class="cta-button-wrap">

                <a
                  href="/${encodeURIComponent(e)}/contact"
                  class="cta-button"
                  data-route="contact"
                >
                  ${f("lets_talk",d(e)?"با ما صحبت کنید":"Let's Talk")}
                </a>

              </div>

            </div>

          </div>

          <div class="cta-bg-wrap"></div>

        </div>

      </div>

    </section>
  `}function V(e){const t=[...e.querySelectorAll(".category-filter-btn")],r=e.querySelector("#all-projects-view"),i=e.querySelector("#categories-view"),a=[...e.querySelectorAll(".category-section")];if(!t.length||!r||!i)return;function s(n){t.forEach(o=>{const u=o.dataset.category===n;o.classList.toggle("active",u),o.setAttribute("aria-pressed",String(u))});const c=n==="all";r.style.display=c?"block":"none",i.style.display=c?"none":"block",a.forEach(o=>{o.style.display=!c&&o.dataset.category===n?"block":"none"})}t.forEach(n=>{n.addEventListener("click",()=>{var u,g;const c=n.dataset.category;if(!c)return;s(c);const o=e.querySelector(".projects-list-section");if(o){const m=(g=(u=window.matchMedia)==null?void 0:u.call(window,"(prefers-reduced-motion: reduce)"))==null?void 0:g.matches;o.scrollIntoView({behavior:m?"auto":"smooth",block:"start"})}})}),s("all")}async function K(){const e=document.getElementById("app");if(!e){console.error("[Projects] #app element not found.");return}const t=b.getCurrentLanguage(),r=window.location.pathname,i=++h;let a=[];try{const n=await A();Array.isArray(n)&&(a=n.filter(c=>c&&typeof c=="object"))}catch(n){console.error("[Projects] Failed to load projects:",n)}if(i!==h||window.location.pathname!==r||b.getCurrentLanguage()!==t)return;const s=U(a);e.innerHTML=`
    ${k()}

    <main
      class="mz-projects"
      id="mazoryaProjects"
    >
      ${H(t)}

      ${R(t)}

      ${G(a,s,t)}

      ${B(t)}
    </main>

    ${L()}
  `,I(),j(),V(e),console.log("[Projects] Page rendered:",{language:t,projects:a.length,categories:Object.fromEntries(Object.entries(s).map(([n,c])=>[n,c.length]))})}export{K as renderProjects};
