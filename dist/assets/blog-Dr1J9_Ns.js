import{a as w,m as p}from"./index-BZXsUPAf.js";import{r as A,a as B}from"./header-hNak-YC9.js";import{r as S,a as L}from"./footer-CBaj94Xp.js";const l={BASE_URL:"/",DEV:!1,MODE:"production",PROD:!0,SSR:!1},u="/assets/img/default-project.jpg",R="https://api.mazoryagroup.com/api";let m=0;function o(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function h(t,e=""){const r=p.t(t);return r===t||r===void 0||r===null||r===""?e||t:String(r)}function c(t,e=""){return o(h(t,e))}function v(t){return typeof t!="string"&&typeof t!="number"?"":(new DOMParser().parseFromString(String(t),"text/html").body.textContent||"").replace(/\s+/g," ").trim()}function D(t,e=120){const r=v(t),n=Array.from(r);return n.length<=e?r:n.slice(0,e).join("").trimEnd()+"..."}function _(t,e){const r=e==="en"?(t==null?void 0:t.title_en)||(t==null?void 0:t.title):(t==null?void 0:t.title)||(t==null?void 0:t.title_en);return String(r||h("untitled_blog","Untitled Article"))}function g(t,e){if(t!=null&&t.excerpt)return v(t.excerpt);const r=e==="en"?(t==null?void 0:t.description_en)||(t==null?void 0:t.description):(t==null?void 0:t.description)||(t==null?void 0:t.description_en);return D(r,120)}function E(t){if(typeof t!="string"||!t.trim())return u;const e=t.trim();try{if(e.startsWith("//")||/^[a-z][a-z\d+.-]*:/i.test(e)&&!/^https?:\/\//i.test(e))return u;let r;if(/^https?:\/\//i.test(e))r=new URL(e);else if(e.startsWith("/assets/")||e.startsWith("assets/"))r=new URL(e.startsWith("/")?e:`/${e}`,window.location.origin);else{const n=(l==null?void 0:l.VITE_API_URL)||R,i=new URL(n,window.location.origin).origin;r=new URL(`/${e.replace(/^\/+/,"")}`,i)}return r.protocol!=="http:"&&r.protocol!=="https:"?u:o(r.href)}catch{return u}}function U(t){const e=t==null?void 0:t.images,r=(typeof e=="string"?e:null)||(e==null?void 0:e.image_1)||(e==null?void 0:e.image)||(t==null?void 0:t.cover_url)||(t==null?void 0:t.image_url)||(t==null?void 0:t.image);return E(r)}function I(t,e){const r=t==null?void 0:t.id;return r==null||String(r).trim()===""?null:`/${e}/blog-details/`+encodeURIComponent(String(r))}function T(t,e){const r=(t==null?void 0:t.created_at)||(t==null?void 0:t.createdAt)||(t==null?void 0:t.published_at)||(t==null?void 0:t.date);if(!r)return"";const n=new Date(r);if(Number.isNaN(n.getTime()))return"";const a={en:"en-US",fa:"fa-IR",ar:"ar-SA",fr:"fr-FR",de:"de-DE",es:"es-ES",tr:"tr-TR"}[e]||"en-US";try{return new Intl.DateTimeFormat(a,{year:"numeric",month:"long",day:"numeric"}).format(n)}catch{return n.toLocaleDateString("en-US")}}function x(){return`
    <section class="blog-banner">

      <div class="w-layout-blockcontainer container-regular w-container">

        <div class="align-center">

          <div class="banner-title-wrap small">

            <h1 class="blog-banner-title">
              ${c("blog_title","Our Blog")}
            </h1>

            <p class="blog-banner-subtitle">
              ${c("blog_subtitle","Latest insights and articles from our team")}
            </p>

          </div>

        </div>

      </div>

    </section>
  `}function F(t,e){if(!t||typeof t!="object"||Array.isArray(t))return"";const r=_(t,e),n=g(t,e),i=U(t),a=I(t,e),s=T(t,e),d=o(r),$=o(n),y=o(s),f=`
    <img
      src="${i}"
      alt="${d}"
      loading="lazy"
      decoding="async"
    />
  `;return`
    <div class="blog-card">

      <div class="blog-card-inner">

        <div class="blog-card-image">

          ${a?`
                <a
                  href="${a}"
                  class="blog-image-link"
                  aria-label="${d}"
                >
                  ${f}
                </a>
              `:`
                <div class="blog-image-link">
                  ${f}
                </div>
              `}

        </div>

        <div class="blog-card-content">

          ${s?`
                <span class="blog-date">
                  ${y}
                </span>
              `:""}

          <h3 class="blog-card-title">

            ${a?`
                  <a href="${a}">
                    ${d}
                  </a>
                `:d}

          </h3>

          ${n?`
                <p class="blog-card-excerpt">
                  ${$}
                </p>
              `:""}

          ${a?`
                <a
                  href="${a}"
                  class="blog-read-more"
                >
                  ${c("read_more","Read More")}
                  <span aria-hidden="true">→</span>
                </a>
              `:""}

        </div>

      </div>

    </div>
  `}function j(t,e){return!Array.isArray(t)||t.length===0?`
      <div class="no-blogs">

        <p>
          ${c("no_blogs","No blog posts found.")}
        </p>

      </div>
    `:t.map(r=>F(r,e)).join("")}function z(t,e){return`
    <section class="blog-list-section">

      <div class="w-layout-blockcontainer container-regular w-container">

        <div class="blogs-grid ${e==="fa"||e==="ar"?"rtl-blog":""}">

          ${j(t,e)}

        </div>

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
                ${c("cta_blog_title","Want to stay updated?")}
              </h2>

              <div class="cta-button-wrap">

                <a
                  href="/${t}/contact"
                  class="cta-button"
                  data-route="contact"
                >
                  ${c("subscribe","Subscribe")}
                </a>

              </div>

            </div>

          </div>

          <div class="cta-bg-wrap"></div>

        </div>

      </div>

    </section>
  `}async function k(){const t=document.getElementById("app");if(!t){console.error("[Blog] #app element not found.");return}const e=p.getCurrentLanguage(),r=window.location.pathname,n=++m;let i=[];try{const a=await w();Array.isArray(a)?i=a.filter(s=>s&&typeof s=="object"&&!Array.isArray(s)):console.warn("[Blog] API returned an invalid response.")}catch(a){console.error("[Blog] Failed to load articles:",a)}n!==m||window.location.pathname!==r||p.getCurrentLanguage()!==e||(t.innerHTML=`
  ${A()}

  <main class="mz-blog" id="mazoryaBlog">
    ${x()}
    ${z(i,e)}
    ${C(e)}
  </main>

  ${S()}
`,B(),L(),console.log("[Blog] Page rendered:",{language:e,articles:i.length}))}export{k as renderBlog};
