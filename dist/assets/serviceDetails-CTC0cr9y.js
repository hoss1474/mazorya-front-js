import{h as S,m as d}from"./index-BZXsUPAf.js";import{r as g,a as m}from"./header-hNak-YC9.js";import{r as p,a as f}from"./footer-CBaj94Xp.js";const l={BASE_URL:"/",DEV:!1,MODE:"production",PROD:!0,SSR:!1},w="https://api.mazoryagroup.com/api";let v=0;function r(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function h(t,n=""){const e=d.t(t);return e===t||e===void 0||e===null||e===""?n||t:String(e)}function c(t,n=""){return r(h(t,n))}function y(t){if(typeof t!="string"||!t.trim())return null;const n=t.trim();try{const e=(l==null?void 0:l.VITE_API_URL)||w,a=new URL(e,window.location.origin).origin;let i;if(/^https?:\/\//i.test(n))i=new URL(n);else{if(n.startsWith("//")||/^[a-z][a-z\d+.-]*:/i.test(n))return null;i=new URL(n.replace(/^\/+/,""),`${a}/`)}return i.protocol!=="https:"&&i.protocol!=="http:"?null:r(i.href)}catch(e){return console.warn("[ServiceDetails] Invalid image URL:",t,e),null}}function u(t){return String((t==null?void 0:t.name)||(t==null?void 0:t.title)||h("service_details_title","Service Details"))}function b(t,n,e){return t===v&&window.location.pathname===n&&d.getCurrentLanguage()===e}function D(t){return`
    <section
      class="service-not-found-section"
      style="
        text-align: center;
        padding: 100px 20px;
        min-height: 60vh;
      "
    >
      <div class="container-regular">

        <h1>
          ${c("service_not_found","Service Not Found")}
        </h1>

        <p style="margin-top: 20px;">
          ${c("service_not_found_desc","The service you're looking for doesn't exist or could not be loaded.")}
        </p>

        <a
          href="/${t}/services"
          class="primary-button"
          style="
            display: inline-block;
            margin-top: 30px;
          "
        >
          ${c("back_to_services","Back to Services")}
        </a>

      </div>
    </section>
  `}function _(t){const n=u(t);return`
    <div class="service-details-header">

      <h1 class="service-details-title">
        ${r(n)}
      </h1>

    </div>
  `}function A(t){var i;const n=((i=t==null?void 0:t.images)==null?void 0:i.image_1)||(t==null?void 0:t.image_1),e=y(n);if(!e)return"";const a=u(t);return`
    <div class="service-details-image-main">

      <img
        src="${e}"
        alt="${r(a)}"
        class="service-details-image"
        loading="eager"
        decoding="async"
      />

    </div>
  `}function L(t){const n=t==null?void 0:t.description;return n==null||String(n).trim()===""?"":`
    <div class="service-details-description">

      <p>
        ${r(n)}
      </p>

    </div>
  `}function I(t){var i;const n=((i=t==null?void 0:t.images)==null?void 0:i.image_2)||(t==null?void 0:t.image_2),e=y(n);if(!e)return"";const a=u(t);return`
    <div class="service-details-image-secondary">

      <img
        src="${e}"
        alt="${r(a)}"
        class="service-details-image"
        loading="lazy"
        decoding="async"
      />

    </div>
  `}function R(t,n){return!Array.isArray(t)||t.length===0?"":t.filter(e=>e&&typeof e=="object").map(e=>{const a=e.name||e.title||"",i=e.description||e.content||"";return!a&&!i?"":`
        <div class="service-details-block">

          ${a?`
                <h2 class="service-details-block-title">
                  ${r(a)}
                </h2>
              `:""}

          ${i?`
                <div class="service-details-block-content">

                  <p>
                    ${r(i)}
                  </p>

                </div>
              `:""}

        </div>
      `}).join("")}function U(t,n){const e=Array.isArray(t.sections)?t.sections:[];return`
    <section class="service-details-section">

      <div class="w-layout-blockcontainer container-regular w-container">

        ${_(t)}

        ${A(t)}

        ${L(t)}

        ${I(t)}

        <div class="service-details-content">
          ${R(e)}
        </div>

      </div>

    </section>
  `}function z(t){return`
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
                ${c("cta_service_title","Ready to get started?")}
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
  `}async function k(t={}){const n=document.getElementById("app");if(!n){console.error("[ServiceDetails] #app element not found.");return}const e=d.getCurrentLanguage(),a=window.location.pathname,i=++v,s=t==null?void 0:t.slug;if(typeof s!="string"||!s.trim()){window.location.assign(`/${e}/services`);return}let o=null;try{o=await S(s)}catch($){console.error("[ServiceDetails] API request failed:",$)}if(b(i,a,e)){if(!o||typeof o!="object"||Array.isArray(o)){n.innerHTML=`
  ${g()}

  <main class="mz-service-details" id="mazoryaServiceDetails">
    ${D(e)}
  </main>

  ${p()}
`,m(),f(),console.warn("[ServiceDetails] Service not available:",s);return}n.innerHTML=`
  ${g()}

  <main class="mz-service-details" id="mazoryaServiceDetails">
    ${U(o)}
    ${z(e)}
  </main>

  ${p()}
`,m(),f(),console.log("[ServiceDetails] Page rendered:",{slug:s,language:e,service:o.name||o.title})}}export{k as renderServiceDetails};
