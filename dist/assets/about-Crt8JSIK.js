import{m as t}from"./index-OOzpxp90.js";import{c,r as l,b as d,a as v}from"./footer-CboKM8tC.js";async function m(){const o=document.getElementById("app"),i=t.getCurrentLanguage(),s=i==="fa"||i==="ar";o.innerHTML=`
    ${c()}
    
    <!-- ===== Banner Section ===== -->
    <section class="banner-section">
      <div class="w-layout-blockcontainer container-regular w-container">
        <div class="align-center">
          <div class="banner-title-wrap">
            <h1 class="banner-title">${t.t("about_title")}</h1>
            <p>${t.t("about_subtitle")}</p>
          </div>
        </div>
        <div class="banner-image-wrap">
          <img src="/assets/img/about-banner.jpg" loading="eager" alt="About Us Banner" class="banner-image" />
        </div>
        
        <!-- ===== Count Cards ===== -->
        <div class="count-card-area">
          <div class="count-card-wrap">
            <div class="count-icon-wrap">
              <img src="/assets/img/count-icon-01.svg" alt="Count Icon" />
            </div>
            <div>
              <h2 class="count-title">100+</h2>
              <p class="count-text">${t.t("global_clients")||"Global Clients"}</p>
            </div>
          </div>
          <div class="count-card-wrap">
            <div class="count-icon-wrap">
              <img src="/assets/img/count-icon-02.svg" alt="Count Icon" />
            </div>
            <div>
              <h2 class="count-title">50+</h2>
              <p class="count-text">${t.t("honor_highlight")||"Honorable Mentions"}</p>
            </div>
          </div>
          <div class="count-card-wrap">
            <div class="count-icon-wrap">
              <img src="/assets/img/count-icon-03.svg" alt="Count Icon" />
            </div>
            <div>
              <h2 class="count-title">200+</h2>
              <p class="count-text">${t.t("projects_done")||"Projects Completed"}</p>
            </div>
          </div>
          <div class="count-card-wrap">
            <div class="count-icon-wrap">
              <img src="/assets/img/count-icon-04.svg" alt="Count Icon" />
            </div>
            <div>
              <h2 class="count-title">15+</h2>
              <p class="count-text">${t.t("business_expertise")||"Business Expertise"}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- ===== Mission & Vision Section ===== -->
    <section class="about-intro-section">
      <div class="w-layout-blockcontainer container-regular w-container">
        <div class="about-intro-grid-wrap">
          
          <!-- Mission -->
          <div class="w-layout-grid about-intro-top-grid ${s?"rtl-mission":""}">
            <div class="about-intro-image-wrap">
              <img src="/assets/img/mission-image.jpg" loading="lazy" alt="Mission" class="about-intro-image" />
            </div>
            <div class="about-intro-content-wrap">
              <div class="about-intro-subtitle">${t.t("mission_title")||"Mission"}</div>
              <h2 class="about-intro-title">${t.t("mission_heading")||"Empowering brands, amplifying voices through collaboration."}</h2>
              <p>${t.t("mission_text")||"Our goal is to empower businesses of all sizes to succeed by crafting unique digital strategies that connect with audiences, drive meaningful engagement, and foster sustainable growth in the digital landscape."}</p>
              <div class="about-intro-point-area">
                <div class="about-intro-point-wrap">
                  <div class="about-intro-icon-wrap">
                    <img src="/assets/img/about-point-icon.svg" alt="Point" />
                  </div>
                  <p>${t.t("mission_point1")||"Strategies carefully designed to create clear, measurable impact."}</p>
                </div>
                <div class="about-intro-point-wrap">
                  <div class="about-intro-icon-wrap">
                    <img src="/assets/img/about-point-icon.svg" alt="Point" />
                  </div>
                  <p>${t.t("mission_point2")||"Creatively amplify brand story through thoughtful design and content."}</p>
                </div>
                <div class="about-intro-point-wrap">
                  <div class="about-intro-icon-wrap">
                    <img src="/assets/img/about-point-icon.svg" alt="Point" />
                  </div>
                  <p>${t.t("mission_point3")||"Build strong communities through authentic, lasting relationships."}</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Vision -->
          <div class="w-layout-grid about-intro-bottom-grid ${s?"rtl-vision":""}">
            <div class="about-intro-content-wrap">
              <div class="about-intro-subtitle">${t.t("vision_title")||"Vision"}</div>
              <h2 class="about-intro-title">${t.t("vision_heading")||"Innovative digital solutions to empower brands."}</h2>
              <p>${t.t("vision_text")||"Our goal is to transform digital marketing by helping brands unlock their full potential through creative, data-driven solutions. Staying at the forefront of digital innovation, we continuously adapt to the ever-changing digital landscape."}</p>
              <div class="about-intro-point-area">
                <div class="about-intro-point-wrap">
                  <div class="about-intro-icon-wrap">
                    <img src="/assets/img/about-point-icon.svg" alt="Point" />
                  </div>
                  <p>${t.t("vision_point1")||"Through creativity, we unlock the true potential of brands."}</p>
                </div>
                <div class="about-intro-point-wrap">
                  <div class="about-intro-icon-wrap">
                    <img src="/assets/img/about-point-icon.svg" alt="Point" />
                  </div>
                  <p>${t.t("vision_point2")||"Generate sustainable growth through evidence-based strategies."}</p>
                </div>
                <div class="about-intro-point-wrap">
                  <div class="about-intro-icon-wrap">
                    <img src="/assets/img/about-point-icon.svg" alt="Point" />
                  </div>
                  <p>${t.t("vision_point3")||"Create authentic, lasting connections between brands and their audiences."}</p>
                </div>
              </div>
            </div>
            <div class="about-intro-image-wrap">
              <img src="/assets/img/vision-image.jpg" loading="lazy" alt="Vision" class="about-intro-image" />
            </div>
          </div>
          
        </div>
      </div>
    </section>
    
    <!-- ===== Values Section ===== -->
    <section class="value-section">
      <div class="w-layout-blockcontainer container-regular w-container">
        <div class="align-center">
          <div class="section-title-wrap">
            <h2 class="section-title text-white">${t.t("values_title")||"Our Values"}</h2>
            <div class="value-content-wrap">
              <p class="text-white">${t.t("values_subtitle")||"Creativity and innovation guide us to elevate brands and create real digital impact."}</p>
            </div>
          </div>
          <div class="value-grid-wrap">
            <div class="w-layout-grid value-grid">
              ${u()}
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- ===== History Section ===== -->
    <section class="history-section">
      <div class="w-layout-blockcontainer container-regular w-container">
        <div class="align-center">
          <h2 class="section-title">${t.t("history_title")||"Awards & Milestones"}</h2>
        </div>
        <div class="history-card-area">
          ${p()}
          <div class="history-line-wrap">
            <div class="history-step-wrap">01</div>
            <div class="history-step-wrap">02</div>
            <div class="history-step-wrap">03</div>
            <div class="history-step-wrap">04</div>
            <div class="history-step-wrap">05</div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- ===== CTA Section ===== -->
    <section class="cta-section">
      <div class="w-layout-blockcontainer container-regular w-container">
        <div class="cta-image-wrap">
          <img src="/assets/img/cta-image.jpg" loading="lazy" alt="CTA" class="cta-image" />
          <div class="cta-title-area">
            <div class="cta-title-wrap">
              <h2 class="section-title text-white">${t.t("cta_title")||"Ready for Digital Transition?"}</h2>
              <div class="cta-button-wrap">
                <a href="/${i}/contact" class="cta-button" data-route="contact">${t.t("get_started")||"Get Started"}</a>
              </div>
            </div>
          </div>
          <div class="cta-bg-wrap"></div>
        </div>
      </div>
    </section>
    
    ${l()}
  `,d(),v(),document.querySelectorAll("[data-route]").forEach(a=>{a.addEventListener("click",e=>{e.preventDefault();const n=a.getAttribute("href");n&&(window.location.href=n)})});const r=new IntersectionObserver(a=>{a.forEach(e=>{e.isIntersecting&&e.target.classList.add("is-visible")})},{threshold:.3});document.querySelectorAll(".value-card-wrap, .history-card-wrap, .count-card-wrap").forEach(a=>{r.observe(a)})}function u(){return[{title:t.t("value_creativity")||"Creativity",desc:t.t("value_creativity_desc")||"We implement innovative, cutting-edge digital marketing strategies that help brands stand out."},{title:t.t("value_dedication")||"Dedication",desc:t.t("value_dedication_desc")||"We are committed to achieving your brand's goals with excellence and precision."},{title:t.t("value_progress")||"Progress",desc:t.t("value_progress_desc")||"We elevate brands through data-driven strategies and continuous optimization."},{title:t.t("value_collaboration")||"Collaboration",desc:t.t("value_collaboration_desc")||"We unite diverse expertise through a collaborative approach to ensure brand success."},{title:t.t("value_optimism")||"Optimism",desc:t.t("value_optimism_desc")||"We foster creativity and problem-solving through a positive, forward-thinking mindset."},{title:t.t("value_responsibility")||"Responsibility",desc:t.t("value_responsibility_desc")||"We take full ownership, ensuring brand success through high standards and consistent delivery."}].map(i=>`
    <div class="value-card-wrap">
      <img src="/assets/img/value-icon.svg" alt="${i.title}" class="value-icon" />
      <h3 class="value-card-title">${i.title}</h3>
      <p class="value-card-content">${i.desc}</p>
    </div>
  `).join("")}function p(){return[{year:"2026",title:t.t("history_2026_title")||"Foundation & Brand Identity",desc:t.t("history_2026_desc")||"Creation of Mazorya Group's complete visual identity (logo, colors, typography, slogan). Launch of main website and digital platform. Creation of first campaigns for branding and digital marketing services."},{year:"2027",title:t.t("history_2027_title")||"Service Expansion",desc:t.t("history_2027_desc")||"Complete deployment of branding services: logo design, slogans, content creation, website development. Launch of official social media and advertising campaigns."},{year:"2028",title:t.t("history_2028_title")||"Market Growth & Automation",desc:t.t("history_2028_desc")||"Implement data-driven strategies to optimize campaigns. Develop digital automation services (CRM, automated responses)."},{year:"2029",title:t.t("history_2029_title")||"Innovation & Technology",desc:t.t("history_2029_desc")||"Introduce innovative digital solutions (AI-driven content, smart campaigns). Develop internal tools for design, management, and client analysis."},{year:"2030",title:t.t("history_2030_title")||"Market Leadership & Community",desc:t.t("history_2030_desc")||"Establish Mazorya Group as a benchmark for brand strategy and digital solutions. Build online community of clients and content creators."}].map((i,s)=>`
    <div class="history-card-wrap">
      ${s%2===0?`
        <div class="history-left-wrap">
          <h3 class="history-title">${i.title}</h3>
          <p>${i.desc}</p>
        </div>
        <div class="history-right-wrap">
          <h2 class="section-title">${i.year}</h2>
        </div>
      `:`
        <div class="history-right-wrap">
          <div class="history-title-wrap">
            <h2 class="section-title">${i.year}</h2>
          </div>
        </div>
        <div class="history-left-wrap">
          <h3 class="history-title">${i.title}</h3>
          <p>${i.desc}</p>
        </div>
      `}
    </div>
  `).join("")}export{m as renderAbout};
