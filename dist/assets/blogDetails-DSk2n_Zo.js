import{g as q,m as A,q as x}from"./index-BPA8zJGl.js";import{r as I,a as D}from"./header-C0ExrbOA.js";import{r as w,a as B}from"./footer-DjCcTAM_.js";let z=0;const v={en:{back:"Back to Blog",journal:"INSIGHTS / MAZORYA JOURNAL",article:"Article",read:"min read",contents:"Article Overview",takeaways:"Key Takeaways",contactTitle:"Have a project in mind?",contactText:"Let's build a digital experience that makes an impact.",contact:"Contact Us",notFound:"Article Not Found",notFoundDesc:"This article is unavailable or could not be loaded."},fa:{back:"بازگشت به بلاگ",journal:"مجله مزوریا / مطالب",article:"مقاله",read:"دقیقه مطالعه",contents:"فهرست مقاله",takeaways:"نکات کلیدی",contactTitle:"پروژه‌ای در ذهن دارید؟",contactText:"بیایید با هم تجربه‌ای دیجیتال و ماندگار بسازیم.",contact:"تماس با ما",notFound:"مقاله پیدا نشد",notFoundDesc:"این مقاله در دسترس نیست یا بارگذاری نشد."},ar:{back:"العودة إلى المدونة",journal:"رؤى / مجلة مازوریا",article:"مقال",read:"دقائق للقراءة",contents:"محتويات المقال",takeaways:"أهم النقاط",contactTitle:"هل لديك مشروع؟",contactText:"لنصنع تجربة رقمية مؤثرة معًا.",contact:"اتصل بنا",notFound:"المقال غير موجود",notFoundDesc:"هذا المقال غير متاح."},fr:{back:"Retour au blog",journal:"INSIGHTS / JOURNAL MAZORYA",article:"Article",read:"min de lecture",contents:"Dans cet article",takeaways:"À retenir",contactTitle:"Un projet en tête ?",contactText:"Créons ensemble une expérience numérique remarquable.",contact:"Contactez-nous",notFound:"Article introuvable",notFoundDesc:"Cet article n'est pas disponible."},de:{back:"Zurück zum Blog",journal:"INSIGHTS / MAZORYA JOURNAL",article:"Artikel",read:"Min. Lesezeit",contents:"Artikelübersicht",takeaways:"Wichtige Erkenntnisse",contactTitle:"Ein Projekt im Kopf?",contactText:"Gemeinsam schaffen wir digitale Erlebnisse mit Wirkung.",contact:"Kontakt",notFound:"Artikel nicht gefunden",notFoundDesc:"Dieser Artikel ist nicht verfügbar."},es:{back:"Volver al blog",journal:"IDEAS / REVISTA MAZORYA",article:"Artículo",read:"min de lectura",contents:"Contenido del artículo",takeaways:"Conclusiones clave",contactTitle:"¿Tienes un proyecto?",contactText:"Creemos juntos una experiencia digital memorable.",contact:"Contáctanos",notFound:"Artículo no encontrado",notFoundDesc:"Este artículo no está disponible."},tr:{back:"Bloga dön",journal:"İÇGÖRÜLER / MAZORYA DERGİ",article:"Makale",read:"dk okuma",contents:"Makale İçeriği",takeaways:"Önemli Noktalar",contactTitle:"Aklınızda bir proje mi var?",contactText:"Birlikte etkileyici bir dijital deneyim oluşturalım.",contact:"İletişim",notFound:"Makale bulunamadı",notFoundDesc:"Bu makale şu anda mevcut değil."}};function h(t){return typeof t=="string"||typeof t=="number"?String(t):""}function c(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function p(t){const e=h(t).trim();if(!e)return"";const n=e.replace(/<br\s*\/?\s*>/gi,`
`).replace(/<\/?(?:p|div|h[1-6]|li|blockquote|ul|ol)[^>]*>/gi,`

`),a=new DOMParser().parseFromString(n,"text/html");return a.querySelectorAll("script,style,template,iframe,object,svg").forEach(r=>r.remove()),(a.body.textContent||"").replace(/\r\n?/g,`
`).replace(/[ \t]+\n/g,`
`).replace(/\n{3,}/g,`

`).trim()}function T(t,e=""){const n=p(t);return n?n.split(/\n{2,}/).filter(Boolean).map(a=>`
      <p${e?` class="${e}"`:""}>
        ${c(a)}
      </p>
    `).join(""):""}function l(t,e,n){var i,s;if(!t||typeof t!="object")return"";const a=t.translations,r=Array.isArray(a)?(i=a.find(d=>(d==null?void 0:d.lang)===n||(d==null?void 0:d.locale)===n))==null?void 0:i[e]:void 0,o=[t[`${e}_${n}`],(s=a==null?void 0:a[n])==null?void 0:s[e],r,t[e],t[`${e}_en`]];for(const d of o)if(h(d).trim())return h(d);return""}function $(t,e,n){return l(t,"title",e)||n.article}function M(t,e){return Array.isArray(t==null?void 0:t.sections)?t.sections.filter(n=>n&&typeof n=="object"&&!Array.isArray(n)).map(n=>({title:p(l(n,"title",e)||l(n,"name",e)),body:l(n,"description",e)||l(n,"content",e),quote:p(l(n,"quote",e))})).filter(n=>n.title||p(n.body)||n.quote):[]}function F(t,e){let n=(t==null?void 0:t.takeaways)??(t==null?void 0:t.key_takeaways);if(typeof n=="string")try{n=JSON.parse(n)}catch{return[]}return Array.isArray(n)?n.map(a=>{const r=typeof a=="string"?a:l(a,"text",e)||l(a,"title",e);return p(r)}).filter(Boolean).slice(0,6):[]}function j(t){const e=typeof t=="string"?t:t&&typeof t=="object"?t.url??t.path??t.src:"";if(!h(e).trim())return"";try{const n=x(e);if(!n)return"";const a=new URL(n,window.location.origin);return["https:","http:"].includes(a.protocol)?a.href:""}catch{return""}}function O(t){var a,r;const e=j(((a=t==null?void 0:t.images)==null?void 0:a.image_1)??(t==null?void 0:t.image_1)??(t==null?void 0:t.cover_url)??(t==null?void 0:t.image_url)??(t==null?void 0:t.image)),n=j(((r=t==null?void 0:t.images)==null?void 0:r.image_2)??(t==null?void 0:t.image_2));return{cover:e,secondary:n!==e?n:""}}function U(t,e){const n=h((t==null?void 0:t.published_at)??(t==null?void 0:t.created_at)??(t==null?void 0:t.createdAt)??(t==null?void 0:t.date)).trim();if(!n)return"";const a=/^\d{4}-\d{2}-\d{2}$/.test(n)?`${n}T12:00:00`:n,r=new Date(a);if(!Number.isFinite(r.getTime()))return"";const o={en:"en-US",fa:"fa-IR",ar:"ar-SA",fr:"fr-FR",de:"de-DE",es:"es-ES",tr:"tr-TR"}[e]||"en-US";try{return new Intl.DateTimeFormat(o,{day:"numeric",month:"long",year:"numeric"}).format(r)}catch{return r.toLocaleDateString("en-US")}}function b(t,e,n){const r=[l(t,"description",n),...e.flatMap(o=>[o.title,o.body])].map(p).join(" ").trim().split(/\s+/).filter(Boolean).length;return r?Math.max(1,Math.ceil(r/210)):0}function E(t){const e=h(t).trim().split(/\s+/).filter(Boolean);if(e.length<2)return c(t);const n=e.pop();return`
    ${c(e.join(" "))}
    <span>${c(n)}</span>
  `}function C(t,e,n,a,r){var u;const o=$(t,e,n),i=U(t,e),s=b(t,a,e),d=l(t,"excerpt",e)||l(t,"description",e),m=p(d),f=m.slice(0,290).trim(),y=p(l(t,"category_name",e)||(typeof(t==null?void 0:t.category)=="string"?t.category:(u=t==null?void 0:t.category)==null?void 0:u.name));return`
    <section class="mzbd-hero">

      <div class="mzbd-container">

        <nav
          class="mzbd-breadcrumb"
          aria-label="Breadcrumb"
        >

          <a href="/${encodeURIComponent(e)}/blog">
            ${c(n.back)}
          </a>

          <span aria-hidden="true">/</span>

          <span>${c(n.article)}</span>

        </nav>

        <div class="mzbd-kicker">

          ${c(n.journal)}

          ${y?`
                <span>/ ${c(y)}</span>
              `:""}

        </div>

        <h1 class="mzbd-title">
          ${E(o)}
        </h1>

        <div class="mzbd-meta">

          ${i?`
                <span class="mzbd-meta-item">
                  <span aria-hidden="true">▦</span>
                  ${c(i)}
                </span>
              `:""}

          ${s?`
                <span class="mzbd-reading-time">
                  <span aria-hidden="true">◷</span>
                  ${s} ${c(n.read)}
                </span>
              `:""}

        </div>

        ${f?`
              <p class="mzbd-subtitle">
                ${c(f)}
                ${m.length>290?"…":""}
              </p>
            `:""}

        ${r?`
              <figure class="mzbd-cover">

                <img
                  src="${c(r)}"
                  alt="${c(o)}"
                  loading="eager"
                  decoding="async"
                  fetchpriority="high"
                >

              </figure>
            `:""}

      </div>

    </section>
  `}function S(t,e){return t?`
    <figure class="mzbd-inline-image">

      <img
        src="${c(t)}"
        alt="${c(e)}"
        loading="lazy"
        decoding="async"
      >

    </figure>
  `:""}function L(t,e,n,a,r){const o=l(t,"description",e),i=l(t,"quote",e),s=a.length>=3?1:a.length-1,d=a.map((m,f)=>`
      <section
        class="mzbd-article-section"
        id="mzbd-section-${f+1}"
      >

        ${m.title?`
              <h2>${c(m.title)}</h2>
            `:""}

        ${T(m.body)}

        ${m.quote?`
              <blockquote class="mzbd-quote">
                “${c(m.quote)}”
              </blockquote>
            `:""}

      </section>

      ${r&&f===s?S(r,$(t,e,n)):""}
    `).join("");return`
    <article
      class="mzbd-article"
      id="mzbd-article"
    >

      ${o?`
            <div class="mzbd-article-intro">
              ${T(o)}
            </div>
          `:""}

      ${i?`
            <blockquote class="mzbd-quote">
              “${c(p(i))}”
            </blockquote>
          `:""}

      ${d}

      ${r&&!a.length?S(r,$(t,e,n)):""}

    </article>
  `}function _(t,e,n,a){const r=a.map((i,s)=>({...i,index:s})).filter(i=>i.title),o=F(t,e);return!r.length&&!o.length?"":`
    <aside
      class="mzbd-sidebar"
      aria-label="${c(n.contents)}"
    >

      ${r.length?`
            <nav
              class="mzbd-side-card mzbd-toc"
              aria-label="${c(n.contents)}"
            >

              <h2>
                <span aria-hidden="true">▤</span>
                ${c(n.contents)}
              </h2>

              <ol>

                ${r.map((i,s)=>`
                  <li>

                    <a
                      href="#mzbd-section-${i.index+1}"
                    >

                      <span>
                        ${String(s+1).padStart(2,"0")}
                      </span>

                      <span>
                        ${c(i.title)}
                      </span>

                    </a>

                  </li>
                `).join("")}

              </ol>

            </nav>
          `:""}

      ${o.length?`
            <section
              class="mzbd-side-card mzbd-takeaways"
            >

              <h2>
                <span aria-hidden="true">✦</span>
                ${c(n.takeaways)}
              </h2>

              <ul>

                ${o.map(i=>`
                  <li>

                    <span aria-hidden="true">✓</span>

                    <p>${c(i)}</p>

                  </li>
                `).join("")}

              </ul>

            </section>
          `:""}

    </aside>
  `}function N(t,e){return`
    <section class="mzbd-contact-section">

      <div class="mzbd-container">

        <div class="mzbd-contact-card">

          <div>

            <h2>${c(e.contactTitle)}</h2>

            <p>${c(e.contactText)}</p>

          </div>

          <a
            href="/${encodeURIComponent(t)}/contact"
            class="mzbd-contact-button"
            data-route="contact"
          >
            ${c(e.contact)}

            <span aria-hidden="true">↗</span>
          </a>

        </div>

      </div>

    </section>
  `}function R(t,e){return`
    <section class="mzbd-not-found mzbd-container">

      <span class="mzbd-kicker">
        MAZORYA / BLOG
      </span>

      <h1>${c(e.notFound)}</h1>

      <p>${c(e.notFoundDesc)}</p>

      <a
        href="/${encodeURIComponent(t)}/blog"
        class="mzbd-contact-button"
      >
        ${c(e.back)} ↗
      </a>

    </section>
  `}function k(t,e){const n=document.getElementById("app");if(!n)return;const a=["fa","ar"].includes(e)?"rtl":"ltr";n.innerHTML=`
    ${I()}

    <main
      id="mazoryaBlogDetails"
      class="mz-blog-details mzbd-page"
      dir="${a}"
    >
      ${t}
    </main>

    ${w()}
  `,D(),B()}function g(t={}){const e=new URLSearchParams(window.location.search),n=t.slug??t.id??t.blogId,a=e.get("slug")??e.get("id");let r=h(n??a).trim();if(!r&&!a){const o=window.location.pathname.split("/").filter(Boolean),i=o.at(-1);if(o.length>=2&&i!=="blog-details")try{r=decodeURIComponent(i).trim()}catch{return""}}return r}async function Z(t={}){if(!document.getElementById("app"))return;const e=A.getCurrentLanguage(),n=v[e]||v.en,a=window.location.pathname,r=window.location.search,o=++z,i=g(t);if(!i||i.includes("/")||i.includes("\\")){k(R(e,n),e);return}let s=null;try{const u=await q(i);(u==null?void 0:u.status)!==!1&&(s=u!=null&&u.data&&typeof u.data=="object"&&!Array.isArray(u.data)?u.data:u)}catch(u){console.error("[BlogDetails] API request failed:",u)}if(o!==z||window.location.pathname!==a||window.location.search!==r||A.getCurrentLanguage()!==e)return;if(!s||typeof s!="object"||Array.isArray(s)||!l(s,"title",e)){k(R(e,n),e);return}const d=M(s,e),{cover:m,secondary:f}=O(s);document.title=`${$(s,e,n)} | Mazorya Group`;const y=d.some(u=>u.title)||F(s,e).length>0;k(`
    ${C(s,e,n,d,m)}

    <div
      class="mzbd-body mzbd-container ${y?"mzbd-has-sidebar":""}"
    >

      ${L(s,e,n,d,f)}

      ${_(s,e,n,d)}

    </div>

    ${N(e,n)}
  `,e)}export{Z as renderBlogDetails};
