import{i as h,m as l}from"./index-BZXsUPAf.js";import{r as y,a as w}from"./header-hNak-YC9.js";import{r as $,a as S}from"./footer-CBaj94Xp.js";function s(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function u(e,r=""){const t=l.t(e);return t===e||t===void 0||t===null||t===""?r||e:String(t)}function c(e,r=""){return s(u(e,r))}function b(e){if(e==null)return"";const r=String(e);return(new DOMParser().parseFromString(r,"text/html").body.textContent||"").replace(/\s+/g," ").trim()}function C(e,r=120){const t=Array.from(b(e));return t.length<=r?t.join(""):t.slice(0,r).join("").trimEnd()+"..."}function _(e){const r="/assets/img/service-icon-01.svg";if(typeof e!="string"||!e.trim())return r;try{const t=new URL(e.trim(),window.location.origin);return["http:","https:"].includes(t.protocol)?s(t.href):r}catch{return r}}function A(e,r){const t=e==null?void 0:e.slug;return t==null||String(t).trim()===""?null:`/${r}/service/`+encodeURIComponent(String(t))}function H(){return`
    <section class="services-banner">

      <div class="w-layout-blockcontainer container-regular w-container">

        <div class="align-center">

          <div class="banner-title-wrap">

            <h1 class="banner-title">
              ${c("services_title","Mastering the Digital Spectrum")}
            </h1>

            <p>
              ${c("services_subtitle","From concept to conversion, we provide a holistic suite of digital services designed to scale your business and elevate your brand presence.")}
            </p>

          </div>

        </div>

      </div>

    </section>
  `}function E(e,r){var d;if(!e||typeof e!="object")return"";const t=e.name||e.title||u("service_untitled","Untitled Service"),i=e.description||e.short_description||"",n=C(i,120),g=_(((d=e.images)==null?void 0:d.icon)||e.icon_url||e.icon||e.image),a=A(e,r),o=s(t),v=s(n),p=c("learn_more","Learn More"),f=a?`
      <a href="${a}">
        ${o}
      </a>
    `:o,m=a?`
      <a
        href="${a}"
        class="service-card-link"
      >
        ${p}
        <span aria-hidden="true">→</span>
      </a>
    `:"";return`
    <div class="service-card-item">

      <div
        class="service-card-inner"
        ${a?`data-service-href="${a}"`:""}
      >

        <div class="service-card-icon">

          <img
            src="${g}"
            alt="${o}"
            loading="lazy"
            decoding="async"
          />

        </div>

        <h3 class="service-card-title">
          ${f}
        </h3>

        <p class="service-card-description">
          ${v}
        </p>

        ${m}

      </div>

    </div>
  `}function L(e,r){return!Array.isArray(e)||e.length===0?`
      <div class="no-services">

        <p>
          ${c("no_services","No services found.")}
        </p>

      </div>
    `:e.map(t=>E(t,r)).join("")}function k(e,r){return`
    <section class="services-section">

      <div class="w-layout-blockcontainer container-regular w-container">

        <div class="services-grid">

          ${L(e,r)}

        </div>

      </div>

    </section>
  `}function x(e){return`
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
                ${c("cta_title","Ready to elevate your brand?")}
              </h2>

              <div class="cta-button-wrap">

                <a
                  href="/${e}/contact"
                  class="cta-button"
                  data-route="contact"
                >
                  ${c("contact_us","Contact Us")}
                </a>

              </div>

            </div>

          </div>

          <div class="cta-bg-wrap"></div>

        </div>

      </div>

    </section>
  `}function j(e){e.querySelectorAll(".service-card-inner[data-service-href]").forEach(t=>{const i=t.dataset.serviceHref;i&&t.addEventListener("click",n=>{n.defaultPrevented||n.button!==0||n.ctrlKey||n.metaKey||n.shiftKey||n.altKey||n.target.closest("a, button, input, select, textarea")||window.location.assign(i)})})}async function U(){const e=document.getElementById("app");if(!e){console.error("[Services] #app element not found.");return}const r=l.getCurrentLanguage(),t=window.location.pathname;let i=[];try{const n=await h();Array.isArray(n)?i=n:console.warn("[Services] Invalid API response.")}catch(n){console.error("[Services] Failed to load services:",n)}window.location.pathname!==t||l.getCurrentLanguage()!==r||(e.innerHTML=`
  ${y()}

  <main class="mz-services" id="mazoryaServices">
    ${H()}
    ${k(i,r)}
    ${x(r)}
  </main>

  ${$()}
`,w(),S(),j(e),console.log(`[Services] Rendered ${i.length} services.`,r))}export{U as renderServices};
