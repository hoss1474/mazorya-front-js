import{h,m as l}from"./index-OOzpxp90.js";import{c as m,r as b,b as w,a as j}from"./footer-CboKM8tC.js";const g=[{id:"all",label:"همه",labelEn:"All"},{id:"website",label:"وبسایت",labelEn:"Website"},{id:"ui-ux",label:"UI/UX",labelEn:"UI/UX"},{id:"social-media",label:"سوشیال مدیا",labelEn:"Social Media"},{id:"seo",label:"سئو",labelEn:"SEO"},{id:"graphic",label:"گرافیک",labelEn:"Graphic"}],f={website:["website","web","وبسایت","site"],"ui-ux":["ui","ux","ui/ux","uiux","طراحی رابط کاربری","تجربه کاربری"],"social-media":["social","social media","سوشیال","سوشیال مدیا","instagram","telegram"],seo:["seo","سئو","بهینه سازی","search engine"],graphic:["graphic","graphics","گرافیک","طراحی گرافیک","تصویرسازی"]};async function P(){const s=document.getElementById("app"),e=l.getCurrentLanguage(),t=await h(),o=E(t);s.innerHTML=`
    ${m()}
    
    <!-- ===== Banner Section ===== -->
    <section class="projects-banner">
      <div class="w-layout-blockcontainer container-regular w-container">
        <div class="align-center">
          <div class="banner-title-wrap small">
            <h1 class="banner-title">${l.t("projects_title")||"نمونه کارها"}</h1>
            <p>${l.t("projects_subtitle")||"گزیده‌ای از مهم‌ترین پروژه‌های ما در حوزه‌های مختلف"}</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- ===== Category Filter ===== -->
    <section class="category-filter-section">
      <div class="w-layout-blockcontainer container-regular w-container">
        <div class="category-filter-wrap">
          ${$(e)}
        </div>
      </div>
    </section>
    
    <!-- ===== Projects Grid Section ===== -->
    <section class="projects-list-section">
      <div class="w-layout-blockcontainer container-regular w-container">
        <div id="projects-grid-container" class="projects-grid">
          <!-- بخش همه پروژه‌ها (پیش‌فرض) -->
          <div id="all-projects-view" class="all-projects-view">
            <div class="category-header">
              <h2 class="category-title">${e==="fa"||e==="fa-IR"?"همه پروژه‌ها":"All Projects"}</h2>
              <span class="category-count">${t.length} ${e==="fa"||e==="fa-IR"?"پروژه":"projects"}</span>
            </div>
            <div class="category-projects">
              ${u(t,e,!1)}
            </div>
          </div>
          
          <!-- بخش دسته‌بندی‌ها (مخفی در حالت همه) -->
          <div id="categories-view" class="categories-view" style="display: none;">
            ${C(o,e)}
          </div>
        </div>
      </div>
    </section>
    
    <!-- ===== CTA Section ===== -->
    <section class="cta-section">
      <div class="w-layout-blockcontainer container-regular w-container">
        <div class="cta-image-wrap">
          <img src="/assets/img/cta-image.jpg" loading="lazy" alt="CTA" class="cta-image" />
          <div class="cta-title-area">
            <div class="cta-title-wrap">
              <h2 class="section-title text-white">${l.t("cta_projects_title")||"پروژه‌ای در ذهن دارید؟"}</h2>
              <div class="cta-button-wrap">
                <a href="/${e}/contact" class="cta-button" data-route="contact">${l.t("lets_talk")||"با ما صحبت کنید"}</a>
              </div>
            </div>
          </div>
          <div class="cta-bg-wrap"></div>
        </div>
      </div>
    </section>
    
    ${b()}
  `,w(),j(),I(),document.querySelectorAll("[data-route]").forEach(c=>{c.addEventListener("click",i=>{i.preventDefault();const a=c.getAttribute("href");a&&(window.location.href=a)})})}function $(s){const e=s==="fa"||s==="fa-IR";return g.map(t=>{const o=e?t.label:t.labelEn;return`
      <button class="category-filter-btn ${t.id==="all"?"active":""}" data-category="${t.id}">
        ${o}
      </button>
    `}).join("")}function E(s){const e={};return g.forEach(t=>{t.id!=="all"&&(e[t.id]=[])}),s.forEach(t=>{var i;let o=!1;const c=(t.category||((i=t.tags)==null?void 0:i[0])||"").toLowerCase().trim();for(const[a,r]of Object.entries(f))if(r.some(n=>c.includes(n))){e[a].push(t),o=!0;break}if(!o)if(t.category){const a=t.category.toLowerCase().trim();e[a]||(e[a]=[]),e[a].push(t)}else e.uncategorized||(e.uncategorized=[]),e.uncategorized.push(t)}),e}function C(s,e){const t=e==="fa"||e==="fa-IR";let o="";g.forEach(i=>{if(i.id==="all")return;const a=s[i.id]||[],r=t?i.label:i.labelEn;a.length!==0&&(o+=`
      <div class="category-section" data-category="${i.id}">
        <div class="category-header">
          <h2 class="category-title">${r}</h2>
          <span class="category-count">${a.length} ${t?"پروژه":"projects"}</span>
        </div>
        <div class="category-projects">
          ${u(a,e,!0)}
        </div>
      </div>
    `)});const c=s.uncategorized||[];return c.length>0&&(o+=`
      <div class="category-section" data-category="uncategorized">
        <div class="category-header">
          <h2 class="category-title">${t?"سایر":"Other"}</h2>
          <span class="category-count">${c.length} ${t?"پروژه":"projects"}</span>
        </div>
        <div class="category-projects">
          ${u(c,e,!0)}
        </div>
      </div>
    `),o}function u(s,e,t=!1){if(!s||s.length===0)return`
      <div class="no-projects">
        <p>${l.t("no_projects")||"هیچ پروژه‌ای وجود ندارد"}</p>
      </div>
    `;const o=[];for(let c=0;c<s.length;c+=2)o.push(s.slice(c,c+2));return o.map(c=>`
    <div class="projects-row">
      ${c.map(i=>{var v;const a=i.name||"",r=((v=i.images)==null?void 0:v.image)||"/assets/img/default-project.jpg",n=`/${e}/project/${i.slug}`;let d="";if(t){const y=i.category||"";d=k(y,e)}return`
          <div class="project-collection-item">
            <div class="project-card-wrap">
              <div class="project-image-area">
                <a href="${n}" class="project-image-wrap w-inline-block">
                  <img src="${r}" loading="lazy" alt="${p(a)}" class="project-image" />
                </a>
                <a href="${n}" class="project-overlay-wrap w-inline-block">
                  <div class="project-arrow-icon-wrap">
                    <img src="/assets/img/project-arrow.svg" class="project-arrow-icon" />
                  </div>
                </a>
              </div>
              <div class="project-title-wrap">
                <a href="${n}" class="project-title">${p(a)}</a>
                ${d?`<span class="project-category-tag">${d}</span>`:""}
              </div>
            </div>
          </div>
        `}).join("")}
    </div>
  `).join("")}function k(s,e){if(!s)return"";const t=e==="fa"||e==="fa-IR",o=s.toLowerCase().trim();for(const[c,i]of Object.entries(f))if(i.some(a=>o.includes(a))){const a=g.find(r=>r.id===c);if(a)return t?a.label:a.labelEn}return s}function I(s){const e=document.querySelectorAll(".category-filter-btn"),t=document.getElementById("all-projects-view"),o=document.getElementById("categories-view"),c=document.querySelectorAll(".category-section");e.length&&e.forEach(i=>{i.addEventListener("click",()=>{e.forEach(n=>n.classList.remove("active")),i.classList.add("active");const a=i.dataset.category;a==="all"?(t.style.display="block",o.style.display="none"):(t.style.display="none",o.style.display="block",c.forEach(n=>{const d=n.dataset.category;n.style.display=d===a?"block":"none"}));const r=document.querySelector(".projects-list-section");r&&r.scrollIntoView({behavior:"smooth",block:"start"})})})}function p(s){if(!s)return"";const e=document.createElement("div");return e.textContent=s,e.innerHTML}export{P as renderProjects};
