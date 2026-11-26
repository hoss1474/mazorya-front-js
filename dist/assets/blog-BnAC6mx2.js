import{a as h,m,q as v}from"./index-BPA8zJGl.js";import{r as A,a as w}from"./header-C0ExrbOA.js";import{r as B,a as S}from"./footer-DjCcTAM_.js";const o="/assets/img/default-project.jpg";let g=0;function s(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function $(t,r=""){const e=m.t(t);return e==null||e===""||e===t?r||t:String(e)}function d(t,r=""){return s($(t,r))}function f(t){return typeof t=="string"||typeof t=="number"?String(t).trim():""}function _(t){const r=f(t);if(!r)return"";const e=new DOMParser().parseFromString(r,"text/html");return e.querySelectorAll("script, style, template, iframe, object, svg").forEach(a=>a.remove()),(e.body.textContent||"").replace(/\s+/g," ").trim()}function I(t,r=120){const e=Array.from(_(t));return e.length<=r?e.join(""):e.slice(0,r).join("").trimEnd()+"…"}function p(t,r,e){var l,u;if(!t||typeof t!="object")return"";const a=t.translations,n=Array.isArray(a)?(l=a.find(c=>(c==null?void 0:c.lang)===e||(c==null?void 0:c.locale)===e))==null?void 0:l[r]:void 0,i=[t[`${r}_${e}`],Array.isArray(a)||(u=a==null?void 0:a[e])==null?void 0:u[r],n,t[r],t[`${r}_en`]];for(const c of i){const y=f(c);if(y)return y}return""}function R(t,r){return p(t,"title",r)||$("untitled_blog","Untitled Article")}function U(t,r){const e=p(t,"excerpt",r)||p(t,"description",r);return I(e,120)}function j(t){const r=typeof t=="string"?t:t&&typeof t=="object"?t.url??t.path??t.src??t.image:"";if(!f(r))return o;try{if(/^\/?assets\//i.test(r))return new URL(`/${r.replace(/^\/+/,"")}`,window.location.origin).href;const e=v(r);if(!e)return o;const a=new URL(e,window.location.origin);return["http:","https:"].includes(a.protocol)?a.href:o}catch{return o}}function E(t){let r=t==null?void 0:t.images;if(typeof r=="string"){const n=r.trim();if(n.startsWith("{")||n.startsWith("["))try{r=JSON.parse(n)}catch{r=n}}const a=(Array.isArray(r)?r[0]:null)||(typeof r=="string"?r:null)||(r==null?void 0:r.image_1)||(r==null?void 0:r.image)||(t==null?void 0:t.image_1)||(t==null?void 0:t.cover_url)||(t==null?void 0:t.image_url)||(t==null?void 0:t.image);return j(a)}function L(t,r){const e=String((t==null?void 0:t.slug)||(t==null?void 0:t.id)||"").trim();return e?`/${encodeURIComponent(r)}/blog-details/`+encodeURIComponent(e):null}function T(t,r){const e=f((t==null?void 0:t.published_at)||(t==null?void 0:t.created_at)||(t==null?void 0:t.createdAt)||(t==null?void 0:t.date));if(!e)return"";const a=/^\d{4}-\d{2}-\d{2}$/.test(e)?`${e}T12:00:00`:e,n=new Date(a);if(Number.isNaN(n.getTime()))return"";const i={en:"en-US",fa:"fa-IR",ar:"ar-SA",fr:"fr-FR",de:"de-DE",es:"es-ES",tr:"tr-TR"}[r]||"en-US";try{return new Intl.DateTimeFormat(i,{year:"numeric",month:"long",day:"numeric"}).format(n)}catch{return n.toLocaleDateString("en-US")}}function C(){return`
    <section class="blog-banner">

      <div
        class="w-layout-blockcontainer container-regular w-container"
      >

        <div class="align-center">

          <div class="banner-title-wrap small">

            <h1 class="blog-banner-title">
              ${d("blog_title","Our Blog")}
            </h1>

            <p class="blog-banner-subtitle">
              ${d("blog_subtitle","Latest insights and articles from our team")}
            </p>

          </div>

        </div>

      </div>

    </section>
  `}function D(t,r){if(!t||typeof t!="object"||Array.isArray(t))return"";const e=s(R(t,r)),a=s(U(t,r)),n=s(E(t)),i=L(t,r),l=s(T(t,r)),u=`
    <img
      src="${n}"
      alt="${e}"
      loading="lazy"
      decoding="async"
    />
  `;return`
    <div class="blog-card">

      <div class="blog-card-inner">

        <div class="blog-card-image">

          ${i?`
                <a
                  href="${s(i)}"
                  class="blog-image-link"
                  aria-label="${e}"
                >
                  ${u}
                </a>
              `:`
                <div class="blog-image-link">
                  ${u}
                </div>
              `}

        </div>

        <div class="blog-card-content">

          ${l?`
                <span class="blog-date">
                  ${l}
                </span>
              `:""}

          <h3 class="blog-card-title">

            ${i?`
                  <a href="${s(i)}">
                    ${e}
                  </a>
                `:e}

          </h3>

          ${a?`
                <p class="blog-card-excerpt">
                  ${a}
                </p>
              `:""}

          ${i?`
                <a
                  href="${s(i)}"
                  class="blog-read-more"
                >
                  ${d("read_more","Read More")}

                  <span aria-hidden="true">→</span>
                </a>
              `:""}

        </div>

      </div>

    </div>
  `}function F(t,r){return!Array.isArray(t)||!t.length?`
      <div class="no-blogs">
        <p>
          ${d("no_blogs","No blog posts found.")}
        </p>
      </div>
    `:t.map(e=>D(e,r)).join("")}function x(t,r){return`
    <section class="blog-list-section">

      <div
        class="w-layout-blockcontainer container-regular w-container"
      >

        <div class="blogs-grid ${r==="fa"||r==="ar"?"rtl-blog":""}">

          ${F(t,r)}

        </div>

      </div>

    </section>
  `}function k(t){return`
    <section class="cta-section">

      <div
        class="w-layout-blockcontainer container-regular w-container"
      >

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
                ${d("cta_blog_title","Want to stay updated?")}
              </h2>

              <div class="cta-button-wrap">

                <a
                  href="/${encodeURIComponent(t)}/contact"
                  class="cta-button"
                  data-route="contact"
                >
                  ${d("contact_us","Contact Us")}
                </a>

              </div>

            </div>

          </div>

          <div class="cta-bg-wrap"></div>

        </div>

      </div>

    </section>
  `}function q(t){var e;return(t==null?void 0:t.status)===!1?[]:(Array.isArray(t)?t:Array.isArray(t==null?void 0:t.data)?t.data:Array.isArray((e=t==null?void 0:t.data)==null?void 0:e.data)?t.data.data:[]).filter(a=>a&&typeof a=="object"&&!Array.isArray(a))}function z(t){t.querySelectorAll(".blog-card-image img").forEach(r=>{r.addEventListener("error",()=>{r.getAttribute("src")!==o&&(r.src=o)},{once:!0})})}async function O(){const t=document.getElementById("app");if(!t){console.error("[Blog] #app element not found.");return}const r=m.getCurrentLanguage(),e=window.location.pathname,a=++g;let n=[];try{n=q(await h())}catch(i){console.error("[Blog] Failed to load articles:",i)}a!==g||window.location.pathname!==e||m.getCurrentLanguage()!==r||(t.innerHTML=`
    ${A()}

    <main
      class="mz-blog"
      id="mazoryaBlog"
      dir="${["fa","ar"].includes(r)?"rtl":"ltr"}"
    >

      ${C()}

      ${x(n,r)}

      ${k(r)}

    </main>

    ${B()}
  `,w(),S(),z(t))}export{O as renderBlog};
