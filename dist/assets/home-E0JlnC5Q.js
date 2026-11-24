import{e as I,a as C,m as y}from"./index-6O3GMm5i.js";import{r as R,a as z}from"./header-CtcPUyL-.js";import{r as P,a as H}from"./footer-uRjdZ6qW.js";const w={},L="/assets/img/default-project.jpg",O=(w==null?void 0:w.VITE_API_URL)||"https://api.mazoryagroup.com/api";let m=null,b=0;function r(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function a(e,t=""){const i=y.t(e);return i==null||i===""||i===e?t||e:String(i)}function _(e,t=L){if(typeof e!="string"||!e.trim())return t;const i=e.trim();if(i.startsWith("//")||/^[a-z][a-z\d+.-]*:/i.test(i)&&!/^https?:\/\//i.test(i))return t;try{const s=new URL(O,window.location.origin).origin;let n;return/^https?:\/\//i.test(i)?n=new URL(i):/^\/?assets\//i.test(i)?n=new URL("/"+i.replace(/^\/+/,""),window.location.origin):n=new URL("/"+i.replace(/^\/+/,""),s),["http:","https:"].includes(n.protocol)?r(n.href):t}catch{return t}}function q(e){return encodeURIComponent(String(e??""))}function k(e){const t=r(a("hero_title","Build, Design & Scale")),i=r(a("hero_accent","Mazorya Group")),s=r(a("hero_subtitle","We create digital experiences that help ambitious brands grow.")),n=r(a("hero_badge","MAZORYA GROUP · CREATIVE STUDIO"));return`
    <div class="banner-main-section exon-hero-shell">

      <div class="banner-inner-wrap exon-hero-inner">

        <section
          class="hero exon-hero"
          id="mazoryaExonHero"
        >

          <!-- 3D BACKGROUND -->

          <div
            class="exon-hero-scene"
            aria-hidden="true"
          >

            <div class="exon-hero-grid-fallback"></div>

            <div
              class="exon-hero-grid-stage"
              id="exonHeroGridStage"
            ></div>

            <div class="exon-hero-scrim"></div>

          </div>

          <!-- HERO CONTENT -->

          <div class="exon-hero-main">

            <div class="exon-hero-content">

              <!-- BADGE -->

              <a
                href="/${e}/about"
                class="exon-hero-badge exon-reveal"
              >

                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  aria-hidden="true"
                >
                  <path
                    d="m12 3 1.8 6.2L20 11l-6.2 1.8L12 19l-1.8-6.2L4 11l6.2-1.8L12 3Z"
                  />
                  <path
                    d="m19 17 .7 2.3L22 20l-2.3.7L19 23l-.7-2.3L16 20l2.3-.7L19 17Z"
                  />
                </svg>

                <span>${n}</span>

              </a>

              <!-- HEADING -->

              <h1 class="exon-hero-heading exon-reveal">

                <span class="exon-hero-title">
                  ${t}
                </span>

                <span class="exon-hero-gradient">
                  ${i}
                </span>

              </h1>

              <!-- DESCRIPTION -->

              <p class="exon-hero-description exon-reveal">
                ${s}
              </p>

              <!-- BUTTONS -->

              <div class="exon-hero-actions exon-reveal">

                <a
                  href="/${e}/services"
                  class="exon-hero-button exon-hero-button-primary exon-magnetic"
                >
                  ${r(a("hero_btn","Explore Services"))}
                </a>

                <a
                  href="/${e}/contact"
                  class="exon-hero-button exon-hero-button-glass exon-magnetic"
                >
                  ${r(a("hero_secondary_btn","Let's Talk"))}
                </a>

              </div>

            </div>

          </div>

        </section>

      </div>

    </div>
  `}const M="https://cdn.jsdelivr.net/npm/threejs-components@0.0.16/build/backgrounds/grid1.cdn.min.js",B="https://cdn.jsdelivr.net/npm/three@0.170.0/+esm",T={type:"circle",colors:[2236962,2236962],light1Color:16777215,light1Intensity:1e4,light1PositionZ:50,light2Color:16739179,light2Intensity:15e3,light2PositionZ:-20,depthScale:3,materialParams:{metalness:.5,roughness:.5,clearcoat:1,clearcoatRoughness:.2}};let $=null;function D(){const e=document.createElement("canvas");e.className="exon-hero-canvas";const t={canvas:e,host:null,instance:null,loading:!1,unavailable:!1,ready:!1};return e.addEventListener("webglcontextlost",()=>{var i;t.ready=!1,(i=t.host)==null||i.removeAttribute("data-grid-ready")}),t}function U(e,t){const{grid:i}=e,s=i.config.radius*.8,n=i.config.radius*5,o=s*.125,c=[new t.Vector2(s,-n)];for(let u=0;u<=5;u++){const l=u/5*(Math.PI/2);c.push(new t.Vector2(s-o+Math.cos(l)*o,-o+Math.sin(l)*o))}c.push(new t.Vector2(0,0));const d=new t.LatheGeometry(c,32);d.rotateX(Math.PI/2),i.geometry.dispose(),i.geometry=d}async function G(e){if(!(e.instance||e.loading||e.unavailable)){e.loading=!0;try{const[t,i]=await Promise.all([import(M),import(B)]);if(!e.canvas.isConnected||!e.host)return;const s=t.default(e.canvas,T);e.instance=s,s.three.scene.background=new i.Color("#0a0a0a"),s.three.maxPixelRatio=1.5,U(s,i),s.three.resize(),s.three.onAfterRender=()=>{var o;const n=s.three.renderer.getContext();!e.ready&&!n.isContextLost()&&(e.ready=!0,(o=e.host)==null||o.setAttribute("data-grid-ready",""))}}catch(t){e.unavailable=!0,console.warn("[Home] Exon 3D unavailable. CSS fallback is active.",t)}finally{e.loading=!1}}}function N(){const e=document.getElementById("mazoryaExonHero"),t=e==null?void 0:e.querySelector("#exonHeroGridStage");if(!e||!t)return()=>{};const i=new AbortController,s=i.signal,n=window.matchMedia("(prefers-reduced-motion: reduce)");let o=!1;function c(){const l=$;!l||l.host!==t||(l.host=null,l.canvas.remove(),t.removeAttribute("data-grid-ready"))}function d(){var g,v;if(o)return;if(n.matches){c();return}const l=$??($=D());(g=l.host)==null||g.removeAttribute("data-grid-ready"),l.host=t,t.append(l.canvas),l.ready&&t.setAttribute("data-grid-ready",""),(v=l.instance)==null||v.three.resize(),G(l)}d(),n.addEventListener("change",d,{signal:s});const u=[...e.querySelectorAll(".exon-magnetic")];return u.forEach(l=>{l.addEventListener("pointermove",v=>{if(n.matches||v.pointerType!=="mouse")return;const h=l.getBoundingClientRect(),p=((v.clientX-h.left)/Math.max(h.width,1)*2-1)*10,j=((v.clientY-h.top)/Math.max(h.height,1)*2-1)*10;l.style.transform=`translate3d(${p}px, ${j}px, 0)`},{signal:s});const g=()=>{l.style.transform=""};l.addEventListener("pointerleave",g,{signal:s}),l.addEventListener("pointercancel",g,{signal:s})}),n.matches||e.classList.add("exon-hero-animate"),()=>{o||(o=!0,i.abort(),c(),u.forEach(l=>{l.style.transform=""}))}}function W(){return`
    <section class="client-section">

      <div class="w-layout-blockcontainer container-large w-container">

        <div class="client-text-wrap">

          <p class="client-text">
            ${r(a("client_text","Our teams are purpose-built to support every stage of your brand's journey. From strategy to design and content, we create meaningful work that resonates with your audience and drives your business forward."))}
          </p>

        </div>

      </div>

    </section>
  `}function V(){return`
    <section class="feature-section">

      <div class="container-regular">

        <div class="feature-area">
          ${[{title:a("feature_card1_title","Brand Strategy"),text:a("feature_card1_content","We craft tailored digital strategies aligned with your brand's goals, leveraging research and insights to create impactful solutions that drive growth and engagement."),icon:"/assets/img/feature-icon-01.svg"},{title:a("feature_card2_title","Creativity & Design"),text:a("feature_card2_content","We deliver innovative design and content strategies, bringing your brand to life across social media, advertising channels, and all digital touchpoints."),icon:"/assets/img/feature-icon-02.svg"},{title:a("feature_card3_title","Analytics & Optimization"),text:a("feature_card3_content","We monitor and analyze key metrics, optimizing campaigns to maximize client success and enhance ROI across all brand initiatives."),icon:"/assets/img/feature-icon-03.svg"}].map(i=>`
    <div class="feature-card">

      <div class="feature-icon-wrap">

        <img
          src="${i.icon}"
          alt=""
          loading="lazy"
        />

      </div>

      <h2 class="feature-card-title">
        ${r(i.title)}
      </h2>

      <p class="feature-card-content">
        ${r(i.text)}
      </p>

      <div class="feature-pattern-wrap">

        <img
          src="/assets/img/feature-pattern.svg"
          alt=""
          loading="lazy"
        />

      </div>

    </div>
  `).join("")}
        </div>

      </div>

    </section>
  `}function F(e){const t=[{number:"100+",text:a("global_clients","Global Clientele"),icon:"/assets/img/count-icon-01.svg"},{number:"50+",text:a("honor_highlight","Honor Highlight"),icon:"/assets/img/count-icon-02.svg"},{number:"200+",text:a("projects_done","Project done"),icon:"/assets/img/count-icon-03.svg"},{number:"15+",text:a("business_expertise","Business Expertise"),icon:"/assets/img/count-icon-04.svg"}];return`
    <section class="count-section">

      <div class="w-layout-blockcontainer container-regular w-container">

        <div class="w-layout-grid count-grid">

          <div>

            <div class="count-title-wrap">

              <h2 class="section-title">
                ${r(a("count_title","Digital Success & Delivery"))}
              </h2>

            </div>

            <p class="count-content">
              ${r(a("count_content","Our goal is to help clients succeed in the digital landscape through creative strategies and effective execution, delivering measurable results for their brand."))}
            </p>

            <div class="count-button-wrap">

              <a
                href="/${e}/about"
                class="primary-button"
                data-route="about"
              >
                ${r(a("see_more","See More"))}
              </a>

            </div>

          </div>

          <div class="count-area">

            <div class="count-wrap">

              ${f(t[0])}

              ${f(t[1])}

            </div>

            <div class="count-wrap">

              ${f(t[2])}

              ${f(t[3])}

            </div>

          </div>

        </div>

      </div>

    </section>
  `}function f(e){return`
    <div class="count-item-wrap">

      <div class="count-icon-wrap">

        <img
          src="${e.icon}"
          alt=""
          loading="lazy"
        />

      </div>

      <div>

        <h2 class="count-title">
          ${r(e.number)}
        </h2>

        <p class="count-text">
          ${r(e.text)}
        </p>

      </div>

    </div>
  `}function K(e){const i=[{title:a("home_service1_title","Web Solutions"),desc:a("home_service1_desc","We design and develop visually appealing, intuitive websites that reflect your brand identity, using cutting-edge tools and modern development practices."),icon:"/assets/img/service-icon-01.svg"},{title:a("home_service2_title","Social Media Management"),desc:a("home_service2_desc","We elevate your brand across social media platforms with targeted content strategies designed to engage audiences and drive meaningful conversions."),icon:"/assets/img/service-icon-02.svg"},{title:a("home_service3_title","PPC Advertising"),desc:a("home_service3_desc","We maximize ROI through targeted ads on search engines and social media, continuously optimizing campaigns to reach your audience effectively and efficiently."),icon:"/assets/img/service-icon-03.svg"},{title:a("home_service4_title","Analytics & Insights"),desc:a("home_service4_desc","We leverage advanced analytics to gain actionable insights for digital marketing. By tracking metrics, measuring campaigns, and optimizing strategies, we help your brand achieve measurable growth."),icon:"/assets/img/service-icon-04.svg"}].map(s=>`
    <div class="service-post-collection-item w-dyn-item w-col w-col-6">

      <div class="service-post-card">

        <div class="service-top-wrap">

          <a
            href="/${e}/services"
            class="service-post-icon-wrap w-inline-block"
            data-route="services"
          >

            <img
              src="${s.icon}"
              loading="lazy"
              alt=""
              class="service-post-icon"
            />

          </a>

          <div class="service-card-title-wrap">

            <a
              href="/${e}/services"
              class="service-card-title"
              data-route="services"
            >
              ${r(s.title)}
            </a>

            <div class="service-card-title-line-wrap"></div>

          </div>

        </div>

        <p class="service-card-content">
          ${r(s.desc)}
        </p>

      </div>

    </div>
  `).join("");return`
    <section class="service-post-section">

      <div class="w-layout-blockcontainer container-regular w-container">

        <div class="service-title-area">

          <div class="service-post-title-wrap">

            <h2 class="section-title text-white">
              ${r(a("services_title","We offer a wide range of design services."))}
            </h2>

          </div>

          <div>

            <a
              href="/${e}/services"
              class="secondary-button lite-color-hover w-button"
              data-route="services"
            >
              ${r(a("view_more","View More"))}
            </a>

          </div>

        </div>

        <div class="service-post-card-area">

          <div class="w-dyn-list">

            <div
              role="list"
              class="w-dyn-items w-row"
            >
              ${i}
            </div>

          </div>

        </div>

      </div>

    </section>
  `}function X(e,t){const i=Array.isArray(e)?e:[],s=i.slice(0,3),n=i.slice(3,6);return`
    <section class="project-section">

      <div class="w-layout-blockcontainer container-regular w-container">

        <div class="w-layout-grid project-grid">

          <div>

            <div>

              <h2 class="section-title">
                ${r(a("projects_title","Explore our projects"))}
              </h2>

              <div class="section-content-wrap">

                <p>
                  ${r(a("projects_subtitle","Our teams are purpose-built around our client's unique needs at every stage of the engagement."))}
                </p>

              </div>

              <div class="project-button-wrap">

                <a
                  href="/${t}/projects"
                  class="primary-button"
                  data-route="projects"
                >
                  ${r(a("view_projects","View Projects"))}
                </a>

              </div>

            </div>

            <div>

              <div
                class="projects-list"
                id="projects-home-list-1"
              >
                ${x(s,t)}
              </div>

            </div>

          </div>

          <div>

            <div
              class="projects-list"
              id="projects-home-list-2"
            >
              ${x(n,t)}
            </div>

          </div>

        </div>

      </div>

    </section>
  `}function x(e,t){return!Array.isArray(e)||!e.length?"":e.map(i=>{var d,u;const s=q(i.slug||i.id),n=`/${t}/project/${s}`,o=i.project_name||i.name||i.title||"Project",c=_(((d=i.images)==null?void 0:d.image)||((u=i.images)==null?void 0:u.image_1)||i.cover_url||i.image_url||i.image);return`
      <div
        role="listitem"
        class="project-collection-item w-dyn-item w-col w-col-6"
      >

        <div class="project-card-wrap">

          <div class="project-image-area">

            <a
              href="${n}"
              class="project-image-wrap w-inline-block"
            >

              <img
                src="${c}"
                loading="lazy"
                alt="${r(o)}"
                class="project-image"
              />

            </a>

            <a
              href="${n}"
              class="project-overlay-wrap w-inline-block"
              aria-label="${r(o)}"
            >

              <div class="project-arrow-icon-wrap">

                <img
                  src="/assets/img/project-arrow.svg"
                  class="project-arrow-icon"
                  alt=""
                />

              </div>

            </a>

          </div>

          <div class="project-title-wrap">

            <a
              href="${n}"
              class="project-title"
            >
              ${r(o)}
            </a>

          </div>

        </div>

      </div>
    `}).join("")}function Z(){const t=[{q:a("faq_q1"),a:a("faq_a1")},{q:a("faq_q2"),a:a("faq_a2")},{q:a("faq_q3"),a:a("faq_a3")},{q:a("faq_q4"),a:a("faq_a4")},{q:a("faq_q5"),a:a("faq_a5")}].map((i,s)=>`
    <div
      data-hover="false"
      data-delay="0"
      class="faq-wrap w-dropdown"
    >

      <div
        class="faq-question-wrap w-dropdown-toggle"
        aria-controls="home-faq-${s}"
        aria-expanded="false"
      >

        <div class="faq-question text-white">
          ${r(i.q)}
        </div>

        <div class="faq-arrow-wrap dark-bg-with-white-border">

          <img
            src="/assets/img/faq-arrow-lite.svg"
            loading="lazy"
            alt=""
            class="faq-arrow-lite"
          />

          <img
            src="/assets/img/faq-arrow-dark.svg"
            loading="lazy"
            alt=""
            class="faq-arrow-dark"
          />

        </div>

      </div>

      <nav
        id="home-faq-${s}"
        class="faq-answer-wrap w-dropdown-list"
        aria-hidden="true"
      >

        <p class="faq-content text-white">
          ${r(i.a)}
        </p>

      </nav>

    </div>
  `).join("");return`
    <section class="faq-section home-page">

      <div class="w-layout-blockcontainer container-regular w-container">

        <div class="faq-area">

          <div class="align-center">

            <div class="section-title-wrap large">

              <h2 class="section-title text-white">
                ${r(a("faq_title","Frequently asked question"))}
              </h2>

              <div class="section-content-wrap">

                <p class="text-white">
                  ${r(a("faq_subtitle","Our teams are purpose-built to support every stage of your brand's journey."))}
                </p>

              </div>

            </div>

          </div>

          <div class="faq-whole-wrap">
            ${t}
          </div>

        </div>

      </div>

    </section>
  `}function Q(e,t){const i=Array.isArray(e)?e:[],s=t==="fa"||t==="ar",n=r(a("blog_title","Read news and articles")),o=r(a("view_articles","View All Articles")),c=i.length?`
      <div class="blog-grid-container ${s?"rtl-blog":""}">

        <div class="blog-main-card">
          ${Y(i[0],t)}
        </div>

        <div class="blog-side-list">
          ${i.slice(1,4).map(d=>J(d,t)).join("")}
        </div>

      </div>
    `:`
      <div style="text-align:center;padding:60px;">

        <p>
          ${r(a("no_blog_posts","No blog posts found."))}
        </p>

      </div>
    `;return`
    <section class="article-section">

      <div class="container-regular">

        <div class="article-title-area">

          <div class="article-title-wrap">

            <h2 class="section-title">
              ${n}
            </h2>

          </div>

          <a
            href="/${t}/blog"
            class="primary-button"
            data-route="blog"
          >
            ${o}
          </a>

        </div>

        ${c}

      </div>

    </section>
  `}function E(e,t){return t==="en"?e.title_en||e.title||"":e.title||e.title_en||""}function S(e){var t;return _(((t=e.images)==null?void 0:t.image_1)||e.cover_url||e.image_url||e.image)}function A(e,t){return`/${t}/blog-details/${q(e.id)}`}function Y(e,t){const i=E(e,t),s=S(e),n=A(e,t),o=e.excerpt||(t==="en"?e.description_en||e.description:e.description||e.description_en)||"",c=String(o).replace(/<[^>]*>/g,"").trim(),d=c.length>120?c.substring(0,120)+"...":c;return`
    <div class="blog-main-card-inner">

      <a
        href="${n}"
        class="blog-main-image-link"
      >

        <img
          src="${s}"
          alt="${r(i)}"
          class="blog-main-image"
          loading="lazy"
        />

      </a>

      <div class="blog-main-content">

        <h3 class="blog-main-title">

          <a href="${n}">
            ${r(i)}
          </a>

        </h3>

        <p class="blog-main-excerpt">
          ${r(d)}
        </p>

        <a
          href="${n}"
          class="blog-read-more"
        >
          ${r(a("read_more","Read More"))}
          →
        </a>

      </div>

    </div>
  `}function J(e,t){const i=E(e,t),s=S(e),n=A(e,t);return`
    <div class="blog-side-item">

      <a
        href="${n}"
        class="blog-side-image-link"
      >

        <img
          src="${s}"
          alt="${r(i)}"
          class="blog-side-image"
          loading="lazy"
        />

      </a>

      <div class="blog-side-content">

        <h4 class="blog-side-title">

          <a href="${n}">
            ${r(i)}
          </a>

        </h4>

      </div>

    </div>
  `}function ee(e){return`
    <section class="cta-section">

      <div class="w-layout-blockcontainer container-regular w-container">

        <div class="cta-image-wrap">

          <img
            src="/assets/img/cta-image.jpg"
            loading="lazy"
            alt=""
            class="cta-image"
          />

          <div class="cta-title-area">

            <div class="cta-title-wrap">

              <h2 class="section-title text-white">
                ${r(a("cta_title","Are you geared up for the digital shift?"))}
              </h2>

              <div class="cta-button-wrap">

                <a
                  href="/${e}/contact"
                  class="cta-button"
                  data-route="contact"
                >
                  ${r(a("get_started","Get Started"))}
                </a>

              </div>

            </div>

          </div>

          <div class="cta-bg-wrap"></div>

        </div>

      </div>

    </section>
  `}function te(e){const t=new AbortController,i=t.signal;e.querySelectorAll("[data-route]").forEach(o=>{o.addEventListener("click",c=>{if(c.defaultPrevented||c.button!==0||c.ctrlKey||c.metaKey||c.shiftKey||c.altKey)return;const d=o.getAttribute("href");if(!d)return;const u=new URL(d,window.location.origin);u.origin===window.location.origin&&(c.preventDefault(),window.location.assign(u.href))},{signal:i})});const s=e.querySelectorAll(".scroll-animate, [data-w-id]");let n=null;return typeof IntersectionObserver<"u"&&s.length?(n=new IntersectionObserver(o=>{o.forEach(c=>{c.isIntersecting&&(c.target.classList.add("is-visible"),n.unobserve(c.target))})},{threshold:.4}),s.forEach(o=>{n.observe(o)})):s.forEach(o=>{o.classList.add("is-visible")}),()=>{t.abort(),n==null||n.disconnect()}}async function ne(){const e=document.getElementById("app");if(!e){console.error("[Home] #app element not found.");return}m&&(m(),m=null);const t=y.getCurrentLanguage(),i=window.location.pathname,s=++b,[n,o]=await Promise.allSettled([I(6),C(4)]),c=n.status==="fulfilled"&&Array.isArray(n.value)?n.value:[],d=o.status==="fulfilled"&&Array.isArray(o.value)?o.value:[];if(s!==b||window.location.pathname!==i||y.getCurrentLanguage()!==t)return;e.innerHTML=`
  ${R()}

  <main class="mz-home" id="mazoryaHome">
    ${k(t)}
    ${W()}
    ${V()}
    ${F(t)}
    ${K(t)}
    ${X(c,t)}
    ${Z()}
    ${Q(d,t)}
    ${ee(t)}
  </main>

  ${P()}
`,z(),H();const u=te(e),l=N(),g=e.querySelector("#mazoryaExonHero");let v=null,h=!1;const p=()=>{h||(h=!0,v==null||v.disconnect(),u(),l(),m===p&&(m=null))};m=p,typeof MutationObserver<"u"&&g&&(v=new MutationObserver(()=>{g.isConnected||p()}),v.observe(e,{childList:!0,subtree:!0})),console.log("[Home] Page rendered with Exon Hero.")}export{ne as renderHome};
