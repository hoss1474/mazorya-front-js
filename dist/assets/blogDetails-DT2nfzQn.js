import{g as B,m as f}from"./index-BZXsUPAf.js";import{r as S,a as A}from"./header-hNak-YC9.js";import{r as D,a as x}from"./footer-CBaj94Xp.js";const I="https://api.mazoryagroup.com/api";let v=0;function s(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function y(t,e=""){const n=f.t(t);return n==null||n===""||n===t?e||t:String(n)}function d(t,e=""){return s(y(t,e))}function w(t){return typeof t=="string"||typeof t=="number"?String(t):""}function U(t){const e=w(t);if(!e.trim())return"";const n=e.replace(/<br\s*\/?>/gi,`
`).replace(/<\/(?:p|div|h[1-6]|li|blockquote)>/gi,`

`),r=new DOMParser().parseFromString(n,"text/html");return r.querySelectorAll("script, style, template").forEach(i=>i.remove()),(r.body.textContent||"").replace(/\r\n?/g,`
`).replace(/[ \t]+\n/g,`
`).replace(/\n{3,}/g,`

`).trim()}function $(t,e=""){const n=U(t);return n?n.split(/\n{2,}/).filter(Boolean).map(i=>`
    <p
      ${e?`class="${e}"`:""}
      style="white-space: pre-line;"
    >${s(i)}</p>
  `).join(""):""}function c(t,e,n){var u,a;if(!t||typeof t!="object")return"";const r=`${e}_${n}`,i=[t[r],(a=(u=t.translations)==null?void 0:u[n])==null?void 0:a[e],t[e],t[`${e}_en`]];for(const o of i){const l=w(o);if(l.trim())return l}return""}function p(t,e){return c(t,"title",e)||y("untitled_blog","Untitled Article")}function L(t,e){return c(t,"description",e)||c(t,"excerpt",e)}function m(t){if(typeof t!="string"||!t.trim())return null;const e=t.trim();try{if(e.startsWith("//")||/^[a-z][a-z\d+.-]*:/i.test(e)&&!/^https?:\/\//i.test(e))return null;let n;if(/^https?:\/\//i.test(e))n=new URL(e);else if(e.startsWith("/assets/")||e.startsWith("assets/"))n=new URL(e.startsWith("/")?e:`/${e}`,window.location.origin);else{const r=I,i=new URL(r,window.location.origin).origin;n=new URL(`/${e.replace(/^\/+/,"")}`,i)}return n.protocol!=="https:"&&n.protocol!=="http:"?null:s(n.href)}catch(n){return console.warn("[BlogDetails] Invalid image URL:",n),null}}function _(t,e){const n=t==null?void 0:t.images;return e==="image_1"?m((n==null?void 0:n.image_1)||(t==null?void 0:t.image_1)||(t==null?void 0:t.cover_url)||(t==null?void 0:t.image_url)):e==="image_2"?m((n==null?void 0:n.image_2)||(t==null?void 0:t.image_2)):null}function R(t,e){const n=(t==null?void 0:t.published_at)||(t==null?void 0:t.created_at)||(t==null?void 0:t.createdAt)||(t==null?void 0:t.date);if(!n)return"";const r=new Date(n);if(Number.isNaN(r.getTime()))return"";const i={en:"en-US",fa:"fa-IR",ar:"ar-SA",fr:"fr-FR",de:"de-DE",es:"es-ES",tr:"tr-TR"};try{return new Intl.DateTimeFormat(i[e]||"en-US",{year:"numeric",month:"long",day:"numeric"}).format(r)}catch{return r.toLocaleDateString("en-US")}}function h(t){return`
    <section class="blog-not-found-section">

      <div
        class="container-regular"
        style="
          text-align: center;
          padding: 100px 20px;
          min-height: 60vh;
        "
      >

        <h1>
          ${d("blog_not_found","Blog Post Not Found")}
        </h1>

        <p style="margin-top: 20px;">
          ${d("blog_not_found_desc","The article could not be found or loaded.")}
        </p>

        <a
          href="/${t}/blog"
          class="primary-button"
          style="
            display: inline-block;
            margin-top: 30px;
          "
        >
          ${d("back_to_blog","Back to Blog")}
        </a>

      </div>

    </section>
  `}function T(t,e){const n=p(t,e),r=L(t,e),i=R(t,e);return`
    <div class="blog-details-header">

      <h1 class="blog-details-title">
        ${s(n)}
      </h1>

      ${i?`
            <div class="blog-details-date">
              ${s(i)}
            </div>
          `:""}

      ${r?`
            <div class="blog-details-subtitle">
              ${$(r)}
            </div>
          `:""}

    </div>
  `}function P(t,e){const n=_(t,"image_1");if(!n)return"";const r=p(t,e);return`
    <div class="blog-details-image-main">

      <img
        src="${n}"
        alt="${s(r)}"
        class="blog-details-image"
        loading="eager"
        decoding="async"
      />

    </div>
  `}function F(t,e){const n=_(t,"image_2");if(!n)return"";const r=p(t,e);return`
    <div class="blog-details-image-secondary">

      <img
        src="${n}"
        alt="${s(r)}"
        class="blog-details-image"
        loading="lazy"
        decoding="async"
      />

    </div>
  `}function z(t,e){return!Array.isArray(t)||!t.length?"":t.filter(n=>n&&typeof n=="object"&&!Array.isArray(n)).map(n=>{const r=c(n,"title",e)||c(n,"name",e),i=c(n,"description",e)||c(n,"content",e);return!r&&!i?"":`
        <div class="blog-details-block">

          ${r?`
                <h2 class="blog-details-block-title">
                  ${s(r)}
                </h2>
              `:""}

          ${i?`
                <div class="blog-details-block-content">
                  ${$(i)}
                </div>
              `:""}

        </div>
      `}).join("")}function E(t,e){const n=Array.isArray(t.sections)?t.sections:[];return`
    <section class="blog-details-page ${e==="fa"||e==="ar"?"rtl-blog":""}">

      <div class="w-layout-blockcontainer container-regular w-container">

        ${T(t,e)}

        ${P(t,e)}

        <div class="blog-details-content">
          ${z(n,e)}
        </div>

        ${F(t,e)}

      </div>

    </section>
  `}function C(t){return`
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
                ${d("cta_blog_details","Enjoyed this article?")}
              </h2>

              <div class="cta-button-wrap">

                <a
                  href="/${t}/contact"
                  class="cta-button"
                  data-route="contact"
                >
                  ${d("get_in_touch","Get in Touch")}
                </a>

              </div>

            </div>

          </div>

          <div class="cta-bg-wrap"></div>

        </div>

      </div>

    </section>
  `}function g(t){const e=document.getElementById("app");e&&(e.innerHTML=`
    ${S()}

    <main
      class="mz-blog-details"
      id="mazoryaBlogDetails"
    >
      ${t}
    </main>

    ${D()}
  `,A(),x())}function j(t,e,n,r){return t===v&&window.location.pathname===e&&window.location.search===n&&f.getCurrentLanguage()===r}async function M(t={}){if(!document.getElementById("app")){console.error("[BlogDetails] #app element not found.");return}const n=f.getCurrentLanguage(),r=window.location.pathname,i=window.location.search,u=++v;let a=t==null?void 0:t.id;if((a==null||String(a).trim()==="")&&(a=new URLSearchParams(window.location.search).get("id")),a==null||String(a).trim()===""){window.location.assign(`/${n}/blog`);return}if(a=String(a).trim(),a.includes("/")||a.includes("\\")){g(h(n));return}let o=null;try{o=await B(a)}catch(l){console.error("[BlogDetails] API request failed:",l)}if(j(u,r,i,n)){if(!o||typeof o!="object"||Array.isArray(o)){g(h(n)),console.warn("[BlogDetails] Article unavailable:",a);return}g(`
    ${E(o,n)}
    ${C(n)}
  `),console.log("[BlogDetails] Article rendered:",{id:a,language:n,title:p(o,n)})}}export{M as renderBlogDetails};
