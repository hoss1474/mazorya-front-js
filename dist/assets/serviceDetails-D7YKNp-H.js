import{h as R,m as f,q as I}from"./index-BPA8zJGl.js";import{r as M,a as _}from"./header-C0ExrbOA.js";import{r as B,a as D}from"./footer-DjCcTAM_.js";let k=0;const A={en:{back:"Back to Services",home:"Home",services:"Services",eyebrow:"MAZORYA / SERVICES",start:"Start a Project",about:"About the Service",deliver:"What We Deliver",approach:"Our Approach",approachText:"A thoughtful, collaborative approach from the first idea to the finished result.",process:"Our Process",more:"More Details",contactTitle:"Ready to build something exceptional?",contactText:"Let's discuss your idea and create something that makes an impact.",contact:"Contact Us",loading:"Loading service…",missing:"Service Not Found",missingText:"The service is unavailable or could not be loaded.",steps:[{title:"Discovery & Research",description:"We start by understanding your goals, audience and requirements."},{title:"Strategy & Design",description:"We turn the insights into a clear and thoughtful creative direction."},{title:"Production & Delivery",description:"We create and refine the solution with attention to every detail."},{title:"Launch & Growth",description:"We prepare the final result and continue improving where needed."}]},fa:{back:"بازگشت به خدمات",home:"خانه",services:"خدمات",eyebrow:"MAZORYA / خدمات",start:"شروع پروژه",about:"درباره خدمات",deliver:"آنچه ارائه می‌دهیم",approach:"رویکرد ما",approachText:"از ایده اولیه تا نتیجه نهایی، با رویکردی دقیق و همراه با همکاری پیش می‌رویم.",process:"مراحل انجام کار",more:"جزئیات بیشتر",contactTitle:"آماده‌ای یک پروژه متفاوت بسازیم؟",contactText:"ایده‌ات رو با ما در میان بذار تا با هم به یک نتیجه ماندگار برسیم.",contact:"تماس با ما",loading:"در حال بارگذاری خدمات…",missing:"خدمات پیدا نشد",missingText:"این سرویس وجود ندارد یا دریافت اطلاعات آن امکان‌پذیر نیست.",steps:[{title:"شناخت و تحقیق",description:"ابتدا اهداف، مخاطبان و نیازهای پروژه رو بررسی می‌کنیم."},{title:"استراتژی و طراحی",description:"بر اساس اطلاعات به‌دست‌آمده مسیر خلاقانه پروژه رو مشخص می‌کنیم."},{title:"اجرا و تحویل",description:"راهکار رو با دقت اجرا و جزئیاتش رو تکمیل می‌کنیم."},{title:"راه‌اندازی و توسعه",description:"نتیجه نهایی رو آماده می‌کنیم و در صورت نیاز بهبود می‌دیم."}]}},x=['<path d="m12 2 9 5-9 5-9-5 9-5Zm-9 10 9 5 9-5M3 17l9 5 9-5"/>','<path d="M12 20c4.5-4 7.5-8 7.5-12A5.5 5.5 0 0 0 14 2.5C8 2.5 5 9 5 16v4h7Zm-7-4h9"/>','<path d="m8 8-4 4 4 4m8-8 4 4-4 4M14 5l-4 14"/>','<path d="M4 14c2-4 6-7 12-7l4 4-5 6-5 1-6-4ZM16 7V3m-9 13-2 5 5-2"/>'],C=t=>`
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none"
       stroke="currentColor" stroke-width="1.65"
       stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    ${x[t%x.length]}
  </svg>`,i=t=>typeof t=="string"||typeof t=="number"?String(t).trim():"";function s(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function h(t,a){try{const n=f.t(t);return n!=null&&n!==""&&n!==t?String(n):a}catch{return a}}function L(t){const a={...A[t]||A.en};return a.back=h("back_to_services",a.back),a.contact=h("contact_us",a.contact),a.contactTitle=h("cta_service_title",a.contactTitle),a}function $(t){return i(t==null?void 0:t.name)||i(t==null?void 0:t.title)||"Service"}function O(t){const a=t.split(/\s+/).filter(Boolean);if(a.length<2)return`${s(t)}<span>.</span>`;const n=a.pop().replace(/\.$/,"");return`${s(a.join(" "))} <span>${s(n)}.</span>`}function T(...t){for(const a of t){const n=typeof a=="string"?a:a&&typeof a=="object"&&!Array.isArray(a)?a.url??a.path??a.src??a.image:"";if(i(n))try{const o=I(n);if(!o)continue;const r=new URL(o,window.location.origin);if(r.protocol==="https:"||r.protocol==="http:")return r.href}catch{}}return""}function m(t){let a=t;if(typeof a=="string")try{a=JSON.parse(a)}catch{a=a.split(/[,،\n]/)}return Array.isArray(a)?a.filter(n=>n!=null).map(n=>typeof n=="string"?{title:n.trim(),description:""}:{title:i((n==null?void 0:n.title)??(n==null?void 0:n.name)??(n==null?void 0:n.label)),description:i((n==null?void 0:n.description)??(n==null?void 0:n.content)??(n==null?void 0:n.text))}).filter(n=>n.title||n.description):[]}function U(t){const a=m(t==null?void 0:t.sections),n=(t==null?void 0:t.deliverables)!=null||(t==null?void 0:t.features)!=null,o=n?m((t==null?void 0:t.deliverables)??(t==null?void 0:t.features)):a.slice(0,4),r=m((t==null?void 0:t.process)??(t==null?void 0:t.steps)??(t==null?void 0:t.workflow));return{deliverables:o.slice(0,8),process:r,extra:n?a:a.slice(4)}}function j(t,a){return`
    <a class="mz-sd-back" href="/${encodeURIComponent(t)}/services">
      <span aria-hidden="true">←</span>${s(a.back)}
    </a>`}function E(t,a,n=!1){return`
    <div class="mz-sd-laptop ${n?"mz-sd-laptop-secondary":""}">
      <div class="mz-sd-laptop-lid">
        <span class="mz-sd-laptop-camera" aria-hidden="true"></span>
        <div class="mz-sd-laptop-screen service-details-image-main">
          ${t?`<img src="${s(t)}" alt="${s(a)}" class="service-details-image" loading="eager" decoding="async">`:'<div class="mz-sd-art-placeholder" aria-hidden="true"><span>MAZORYA<span>.</span></span></div>'}
        </div>
      </div>
      <div class="mz-sd-laptop-base"><span></span></div>
    </div>`}function P(t,a,n,o){const r=$(t),c=i(t==null?void 0:t.short_description)||i(t==null?void 0:t.subtitle)||i(t==null?void 0:t.description);return`
    <section class="mz-sd-hero">
      <div class="mz-sd-container">
        <nav class="mz-sd-breadcrumb" aria-label="Breadcrumb">
          <a href="/${encodeURIComponent(a)}">${s(n.home)}</a>
          <span aria-hidden="true">/</span>
          <a href="/${encodeURIComponent(a)}/services">${s(n.services)}</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">${s(r)}</span>
        </nav>
        <div class="mz-sd-hero-grid">
          <div class="mz-sd-hero-content">
            <span class="mz-sd-eyebrow">${s(n.eyebrow)}</span>
            <h1 class="mz-sd-title service-details-title">${O(r)}</h1>
            ${c?`<p class="mz-sd-hero-desc">${s(c)}</p>`:""}
            <a class="mz-sd-button" href="/${encodeURIComponent(a)}/contact" data-route="contact">
              ${s(n.start)}<span aria-hidden="true">↗</span>
            </a>
          </div>
          <div class="mz-sd-hero-art" aria-label="${s(r)}">
            <div class="mz-sd-halo" aria-hidden="true"></div>
            ${E(o,r)}
          </div>
        </div>
      </div>
    </section>`}function Z(t){return t.length?`
    <div class="mz-sd-deliver-grid">
      ${t.map((a,n)=>`
        <article class="mz-sd-deliver-card service-details-block">
          <div class="mz-sd-deliver-icon">${C(n)}</div>
          <div>
            <h3 class="service-details-block-title">${s(a.title)}</h3>
            ${a.description?`<p class="service-details-block-content">${s(a.description)}</p>`:""}
          </div>
        </article>`).join("")}
    </div>`:""}function q(t,a,n){const o=i(t==null?void 0:t.description);return`
    <section class="mz-sd-about" id="mz-sd-about">
      <div class="mz-sd-container mz-sd-about-grid">
        <div class="mz-sd-about-copy">
          <span class="mz-sd-section-index">01 / ${s(a.about)}</span>
          <h2>${s(a.about)}<span>.</span></h2>
          ${o?`<p class="service-details-description">${s(o)}</p>`:""}
        </div>
        ${n.length?`<div class="mz-sd-deliver-box">
               <h3>${s(a.deliver)}</h3>
               ${Z(n)}
             </div>`:""}
      </div>
    </section>`}function W(t,a,n,o){return o?`
    <section class="mz-sd-approach">
      <div class="mz-sd-container mz-sd-approach-grid">
        <div class="mz-sd-approach-copy">
          <span class="mz-sd-section-index">02 / ${s(a.approach)}</span>
          <h2>${s(a.approach)}<span>.</span></h2>
          <p>${s(i(t==null?void 0:t.approach_description)||a.approachText)}</p>
          <span class="mz-sd-short-line" aria-hidden="true"></span>
        </div>
        <div class="mz-sd-approach-art service-details-image-secondary">
          <div class="mz-sd-monitor">
            <div class="mz-sd-monitor-display">
              <img src="${s(o)}" alt="${s($(t))} — ${s(a.approach)}" class="service-details-image" loading="lazy" decoding="async">
            </div>
            <div class="mz-sd-monitor-neck"></div>
            <div class="mz-sd-monitor-stand"></div>
          </div>
          ${n?`
            <div class="mz-sd-phone" aria-hidden="true">
              <div class="mz-sd-phone-camera"></div>
              <img src="${s(n)}" alt="" loading="lazy" decoding="async">
            </div>`:""}
        </div>
      </div>
    </section>`:""}function H(t,a,n){const o=t.length?t:a.steps;return o.length?`
    <section class="mz-sd-process">
      <div class="mz-sd-container">
        <span class="mz-sd-section-index">${n?"03":"02"} / ${s(a.process)}</span>
        <div class="mz-sd-process-rows">
          ${o.map((r,c)=>`
            <article class="mz-sd-process-row service-details-block">
              <span class="mz-sd-process-num">${String(c+1).padStart(2,"0")}</span>
              <span class="mz-sd-process-icon">${C(c)}</span>
              <h3 class="service-details-block-title">${s(r.title)}</h3>
              <p class="service-details-block-content">${s(r.description)}</p>
            </article>`).join("")}
        </div>
      </div>
    </section>`:""}function Y(t,a){return t.length?`
    <section class="mz-sd-more">
      <div class="mz-sd-container">
        <h2>${s(a.more)}<span>.</span></h2>
        <div class="mz-sd-more-grid service-details-content">
          ${t.map((n,o)=>`
            <article class="mz-sd-more-item service-details-block">
              <span>${String(o+1).padStart(2,"0")}</span>
              <h3 class="service-details-block-title">${s(n.title)}</h3>
              <p class="service-details-block-content">${s(n.description)}</p>
            </article>`).join("")}
        </div>
      </div>
    </section>`:""}function F(t,a){return`
    <section class="cta-section mz-sd-cta-section">
      <div class="mz-sd-container">
        <div class="mz-sd-cta">
          <div class="mz-sd-cta-text">
            <h2>${s(a.contactTitle)}</h2>
            <p>${s(a.contactText)}</p>
          </div>
          <a class="mz-sd-button" href="/${encodeURIComponent(t)}/contact" data-route="contact">
            ${s(a.contact)}<span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>`}function g(t,a,n){return`
    <section class="mz-sd-status mz-sd-container" aria-live="polite">
      <span class="mz-sd-eyebrow">MAZORYA / SERVICES</span>
      <h1>${s(n?a.loading:a.missing)}</h1>
      ${n?"":`
        <p>${s(a.missingText)}</p>
        ${j(t,a)}`}
    </section>`}function p(t,a){const n=document.getElementById("app");n&&(n.innerHTML=`
    ${M()}
    <main class="mz-service-details mz-sd-page" id="mazoryaServiceDetails"
          dir="${["fa","ar"].includes(a)?"rtl":"ltr"}">
      ${t}
    </main>
    ${B()}`,_(),D())}function N(t={}){const a=(t==null?void 0:t.slug)??(t==null?void 0:t.id);if(a!=null)return i(a);try{return decodeURIComponent(window.location.pathname.split("/").filter(Boolean).at(-1)||"").trim()}catch{return""}}async function K(t={}){var v,y,w,S;if(!document.getElementById("app"))return;const n=f.getCurrentLanguage(),o=L(n),r=window.location.pathname,c=++k,l=N(t);if(!l||/[/\\]/.test(l)||["services","service"].includes(l.toLowerCase())){p(g(n,o,!1),n);return}p(g(n,o,!0),n);let e=null;try{const d=await R(l);e=(d==null?void 0:d.status)===!1?null:d!=null&&d.data&&typeof d.data=="object"&&!Array.isArray(d.data)?d.data:d}catch(d){console.error("[ServiceDetails] API request failed:",d)}if(c!==k||window.location.pathname!==r||f.getCurrentLanguage()!==n)return;if(!e||typeof e!="object"||Array.isArray(e)||!(i(e.name)||i(e.title))){p(g(n,o,!1),n);return}const z=T((v=e==null?void 0:e.images)==null?void 0:v.image_1,(y=e==null?void 0:e.images)==null?void 0:y.image1,e==null?void 0:e.image_1,e==null?void 0:e.cover_url,e==null?void 0:e.image_url),b=T((w=e==null?void 0:e.images)==null?void 0:w.image_2,(S=e==null?void 0:e.images)==null?void 0:S.image2,e==null?void 0:e.image_2),u=U(e);document.title=`${$(e)} | Mazorya Group`,p(`
    ${P(e,n,o,z)}
    ${q(e,o,u.deliverables)}
    ${W(e,o,z,b)}
    ${H(u.process,o,!!b)}
    ${Y(u.extra,o)}
    ${F(n,o)}
  `,n)}export{K as renderServiceDetails};
