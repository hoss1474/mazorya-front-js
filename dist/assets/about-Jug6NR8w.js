import{m as d}from"./index-BZXsUPAf.js";import{r as v,a as g}from"./header-hNak-YC9.js";import{r as p,a as h}from"./footer-CBaj94Xp.js";function n(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function t(e,i=""){const s=d.t(e);return s===e||s===void 0||s===null||s===""?i||e:String(s)}function a(e,i=""){return n(t(e,i))}function m(){return[{number:"100+",text:t("global_clients","Global Clients"),icon:"/assets/img/count-icon-01.svg"},{number:"50+",text:t("honor_highlight","Honorable Mentions"),icon:"/assets/img/count-icon-02.svg"},{number:"200+",text:t("projects_done","Projects Completed"),icon:"/assets/img/count-icon-03.svg"},{number:"15+",text:t("business_expertise","Business Expertise"),icon:"/assets/img/count-icon-04.svg"}].map(i=>`
    <div class="count-card-wrap">

      <div class="count-icon-wrap">
        <img
          src="${i.icon}"
          alt=""
          loading="lazy"
          aria-hidden="true"
        />
      </div>

      <div>
        <h2 class="count-title">
          ${n(i.number)}
        </h2>

        <p class="count-text">
          ${n(i.text)}
        </p>
      </div>

    </div>
  `).join("")}function b(){return`
    <section class="banner-section">

      <div class="w-layout-blockcontainer container-regular w-container">

        <div class="align-center">

          <div class="banner-title-wrap">

            <h1 class="banner-title">
              ${a("about_title","About Us")}
            </h1>

            <p>
              ${a("about_subtitle","Discover the story behind Mazorya Group.")}
            </p>

          </div>

        </div>

        <div class="banner-image-wrap">
          <img
            src="/assets/img/about-banner.jpg"
            loading="eager"
            fetchpriority="high"
            decoding="async"
            alt="${a("about_title","About Mazorya Group")}"
            class="banner-image"
          />
        </div>

        <div class="count-card-area">
          ${m()}
        </div>

      </div>

    </section>
  `}function y(e){const i=e?"rtl-mission":"",s=[t("mission_point1","Strategies carefully designed to create clear, measurable impact."),t("mission_point2","Creatively amplify brand story through thoughtful design and content."),t("mission_point3","Build strong communities through authentic, lasting relationships.")];return`
    <div class="w-layout-grid about-intro-top-grid ${i}">

      <div class="about-intro-image-wrap">
        <img
          src="/assets/img/mission-image.jpg"
          loading="lazy"
          decoding="async"
          alt="${a("mission_title","Our Mission")}"
          class="about-intro-image"
        />
      </div>

      <div class="about-intro-content-wrap">

        <div class="about-intro-subtitle">
          ${a("mission_title","Mission")}
        </div>

        <h2 class="about-intro-title">
          ${a("mission_heading","Empowering brands, amplifying voices through collaboration.")}
        </h2>

        <p>
          ${a("mission_text","Our goal is to empower businesses of all sizes to succeed by crafting unique digital strategies that connect with audiences, drive meaningful engagement, and foster sustainable growth in the digital landscape.")}
        </p>

        <div class="about-intro-point-area">

          ${s.map(o=>`
            <div class="about-intro-point-wrap">

              <div class="about-intro-icon-wrap">
                <img
                  src="/assets/img/about-point-icon.svg"
                  alt=""
                  loading="lazy"
                  aria-hidden="true"
                />
              </div>

              <p>${n(o)}</p>

            </div>
          `).join("")}

        </div>

      </div>

    </div>
  `}function _(e){const i=e?"rtl-vision":"",s=[t("vision_point1","Through creativity, we unlock the true potential of brands."),t("vision_point2","Generate sustainable growth through evidence-based strategies."),t("vision_point3","Create authentic, lasting connections between brands and their audiences.")];return`
    <div class="w-layout-grid about-intro-bottom-grid ${i}">

      <div class="about-intro-content-wrap">

        <div class="about-intro-subtitle">
          ${a("vision_title","Vision")}
        </div>

        <h2 class="about-intro-title">
          ${a("vision_heading","Innovative digital solutions to empower brands.")}
        </h2>

        <p>
          ${a("vision_text","Our goal is to transform digital marketing by helping brands unlock their full potential through creative, data-driven solutions. Staying at the forefront of digital innovation, we continuously adapt to the ever-changing digital landscape.")}
        </p>

        <div class="about-intro-point-area">

          ${s.map(o=>`
            <div class="about-intro-point-wrap">

              <div class="about-intro-icon-wrap">
                <img
                  src="/assets/img/about-point-icon.svg"
                  alt=""
                  loading="lazy"
                  aria-hidden="true"
                />
              </div>

              <p>${n(o)}</p>

            </div>
          `).join("")}

        </div>

      </div>

      <div class="about-intro-image-wrap">
        <img
          src="/assets/img/vision-image.jpg"
          loading="lazy"
          decoding="async"
          alt="${a("vision_title","Our Vision")}"
          class="about-intro-image"
        />
      </div>

    </div>
  `}function w(e){return`
    <section class="about-intro-section">

      <div class="w-layout-blockcontainer container-regular w-container">

        <div class="about-intro-grid-wrap">

          ${y(e)}

          ${_(e)}

        </div>

      </div>

    </section>
  `}function f(){return[{title:t("value_creativity","Creativity"),desc:t("value_creativity_desc","We implement innovative, cutting-edge digital marketing strategies that help brands stand out.")},{title:t("value_dedication","Dedication"),desc:t("value_dedication_desc","We are committed to achieving your brand's goals with excellence and precision.")},{title:t("value_progress","Progress"),desc:t("value_progress_desc","We elevate brands through data-driven strategies and continuous optimization.")},{title:t("value_collaboration","Collaboration"),desc:t("value_collaboration_desc","We unite diverse expertise through a collaborative approach to ensure brand success.")},{title:t("value_optimism","Optimism"),desc:t("value_optimism_desc","We foster creativity and problem-solving through a positive, forward-thinking mindset.")},{title:t("value_responsibility","Responsibility"),desc:t("value_responsibility_desc","We take full ownership, ensuring brand success through high standards and consistent delivery.")}].map(i=>`
    <div class="value-card-wrap">

      

      <h3 class="value-card-title">
        ${n(i.title)}
      </h3>

      <p class="value-card-content">
        ${n(i.desc)}
      </p>

    </div>
  `).join("")}function $(){return`
    <section class="value-section">

      <div class="w-layout-blockcontainer container-regular w-container">

        <div class="align-center">

          <div class="section-title-wrap">

            <h2 class="section-title text-white">
              ${a("values_title","Our Values")}
            </h2>

            <div class="value-content-wrap">

              <p class="text-white">
                ${a("values_subtitle","Creativity and innovation guide us to elevate brands and create real digital impact.")}
              </p>

            </div>

          </div>

          <div class="value-grid-wrap">

            <div class="w-layout-grid value-grid">
              ${f()}
            </div>

          </div>

        </div>

      </div>

    </section>
  `}function C(){return[{year:"2026",title:t("history_2026_title","Foundation & Brand Identity"),desc:t("history_2026_desc","Creation of Mazorya Group's complete visual identity (logo, colors, typography, slogan). Launch of main website and digital platform. Creation of first campaigns for branding and digital marketing services.")},{year:"2027",title:t("history_2027_title","Service Expansion"),desc:t("history_2027_desc","Complete deployment of branding services: logo design, slogans, content creation, website development. Launch of official social media and advertising campaigns.")},{year:"2028",title:t("history_2028_title","Market Growth & Automation"),desc:t("history_2028_desc","Implement data-driven strategies to optimize campaigns. Develop digital automation services (CRM, automated responses).")},{year:"2029",title:t("history_2029_title","Innovation & Technology"),desc:t("history_2029_desc","Introduce innovative digital solutions (AI-driven content, smart campaigns). Develop internal tools for design, management, and client analysis.")},{year:"2030",title:t("history_2030_title","Market Leadership & Community"),desc:t("history_2030_desc","Establish Mazorya Group as a benchmark for brand strategy and digital solutions. Build online community of clients and content creators.")}].map((i,s)=>{const o=n(i.title),u=n(i.desc),r=n(i.year),c=`
      <div class="history-left-wrap">

        <h3 class="history-title">
          ${o}
        </h3>

        <p>${u}</p>

      </div>
    `,l=s%2===0?`
        <div class="history-right-wrap">
          <h2 class="section-title">
            ${r}
          </h2>
        </div>
      `:`
        <div class="history-right-wrap">
          <div class="history-title-wrap">
            <h2 class="section-title">
              ${r}
            </h2>
          </div>
        </div>
      `;return`
      <div class="history-card-wrap">
        ${s%2===0?c+l:l+c}
      </div>
    `}).join("")}function x(){const e=["01","02","03","04","05"];return`
    <section class="history-section">

      <div class="w-layout-blockcontainer container-regular w-container">

        <div class="align-center">

          <h2 class="section-title">
            ${a("history_title","Awards & Milestones")}
          </h2>

        </div>

        <div class="history-card-area">

          ${C()}

          <div class="history-line-wrap">

            ${e.map(i=>`
              <div class="history-step-wrap">
                ${i}
              </div>
            `).join("")}

          </div>

        </div>

      </div>

    </section>
  `}function z(e){return`
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
                ${a("cta_title","Ready for Digital Transition?")}
              </h2>

              <div class="cta-button-wrap">

                <a
                  href="/${e}/contact"
                  class="cta-button"
                  data-route="contact"
                >
                  ${a("get_started","Get Started")}
                </a>

              </div>

            </div>

          </div>

          <div class="cta-bg-wrap"></div>

        </div>

      </div>

    </section>
  `}async function j(){const e=document.getElementById("app");if(!e){console.error("[About] #app element not found.");return}const i=d.getCurrentLanguage(),s=i==="fa"||i==="ar";e.innerHTML=`
  ${v()}

  <main class="mz-about" id="mazoryaAbout">
    ${b()}
    ${w(s)}
    ${$()}
    ${x()}
    ${z(i)}
  </main>

  ${p()}
`,g(),h(),console.log("[About] Page rendered successfully:",i)}export{j as renderAbout};
