import{d as v,m as g}from"./index-BZXsUPAf.js";import{r as $,a as w}from"./header-hNak-YC9.js";import{r as P,a as b}from"./footer-CBaj94Xp.js";const u={BASE_URL:"/",DEV:!1,MODE:"production",PROD:!0,SSR:!1},A="https://api.mazoryagroup.com/api";let f=0;function a(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function p(t,e=""){const n=g.t(t);return n===t||n===null||n===void 0||n===""?e||t:String(n)}function c(t,e=""){return a(p(t,e))}function l(t){return typeof t=="string"||typeof t=="number"?String(t):""}function h(t){if(typeof t!="string"||!t.trim())return null;const e=t.trim();try{if(e.startsWith("//")||/^[a-z][a-z\d+.-]*:/i.test(e)&&!/^https?:\/\//i.test(e))return null;let n;if(/^https?:\/\//i.test(e))n=new URL(e);else if(e.startsWith("/assets/")||e.startsWith("assets/"))n=new URL(e.startsWith("/")?e:`/${e}`,window.location.origin);else{const i=(u==null?void 0:u.VITE_API_URL)||A,r=new URL(i,window.location.origin).origin;n=new URL(`/${e.replace(/^\/+/,"")}`,r)}return["http:","https:"].includes(n.protocol)?a(n.href):null}catch(n){return console.warn("[ProjectDetails] Invalid image URL:",n),null}}function d(t){return l(t==null?void 0:t.name)||l(t==null?void 0:t.title)||p("project_details_title","Project Details")}function _(t,e,n){return t===f&&window.location.pathname===e&&g.getCurrentLanguage()===n}function D(t){return`
    <section class="project-not-found-section">

      <div
        class="container-regular"
        style="
          text-align: center;
          padding: 100px 20px;
          min-height: 60vh;
        "
      >

        <h1>
          ${c("project_not_found","Project Not Found")}
        </h1>

        <p style="margin-top: 20px;">
          ${c("project_not_found_desc","The project you are looking for does not exist or could not be loaded.")}
        </p>

        <a
          href="/${t}/projects"
          class="primary-button"
          style="
            display: inline-block;
            margin-top: 20px;
          "
        >
          ${c("back_to_projects","Back to Projects")}
        </a>

      </div>

    </section>
  `}function I(t){return`
    <div class="project-details-header">

      <h1 class="project-details-title">
        ${a(d(t))}
      </h1>

    </div>
  `}function L(t){var i;const e=((i=t==null?void 0:t.images)==null?void 0:i.image)||(t==null?void 0:t.cover_url)||(t==null?void 0:t.image_url)||(t==null?void 0:t.image),n=h(e);return n?`
    <div class="project-details-image-main">

      <img
        src="${n}"
        alt="${a(d(t))}"
        class="project-details-image"
        loading="eager"
        decoding="async"
      />

    </div>
  `:""}function U(t){const e=l(t==null?void 0:t.description).trim();return e?`
    <div class="project-details-description">

      <p>
        ${a(e)}
      </p>

    </div>
  `:""}function R(t){var i,r;const e=((i=t==null?void 0:t.images)==null?void 0:i.image2)||((r=t==null?void 0:t.images)==null?void 0:r.image_2)||(t==null?void 0:t.image_2),n=h(e);return n?`
    <div class="project-details-image-secondary">

      <img
        src="${n}"
        alt="${a(d(t))}"
        class="project-details-image"
        loading="lazy"
        decoding="async"
      />

    </div>
  `:""}function S(t){return!Array.isArray(t)||t.length===0?"":t.filter(e=>e&&typeof e=="object"&&!Array.isArray(e)).map(e=>{const n=l(e.title||e.name).trim(),i=l(e.description||e.content).trim();return!n&&!i?"":`
        <div class="project-details-block">

          ${n?`
                <h2 class="project-details-block-title">
                  ${a(n)}
                </h2>
              `:""}

          ${i?`
                <div class="project-details-block-content">
                  <p>
                    ${a(i)}
                  </p>
                </div>
              `:""}

        </div>
      `}).join("")}function E(t){const e=Array.isArray(t.sections)?t.sections:[];return`
    <section class="project-details-section">

      <div class="w-layout-blockcontainer container-regular w-container">

        ${I(t)}

        ${L(t)}

        ${U(t)}

        ${R(t)}

        <div class="project-details-content">
          ${S(e)}
        </div>

      </div>

    </section>
  `}function x(t){return`
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
                ${c("cta_project_title","Interested in similar work?")}
              </h2>

              <div class="cta-button-wrap">

                <a
                  href="/${t}/contact"
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
  `}function m(t){const e=document.getElementById("app");e&&(e.innerHTML=`
    ${$()}

    <main
      class="mz-project-details"
      id="mazoryaProjectDetails"
    >
      ${t}
    </main>

    ${P()}
  `,w(),b())}async function C(t={}){if(!document.getElementById("app")){console.error("[ProjectDetails] #app element not found.");return}const n=g.getCurrentLanguage(),i=window.location.pathname,r=++f,o=t==null?void 0:t.slug;if(typeof o!="string"||!o.trim()){window.location.assign(`/${n}/projects`);return}let s=null;try{s=await v(o)}catch(y){console.error("[ProjectDetails] API request failed:",y)}if(_(r,i,n)){if(!s||typeof s!="object"||Array.isArray(s)){m(D(n)),console.warn("[ProjectDetails] Project unavailable:",o);return}m(`
    ${E(s)}

    ${x(n)}
  `),console.log("[ProjectDetails] Page rendered:",{slug:o,language:n,project:d(s)})}}export{C as renderProjectDetails};
