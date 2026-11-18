import{j as v,m as c}from"./index-OOzpxp90.js";import{c as u,r as g,b as p,a as m}from"./footer-CboKM8tC.js";async function $(){const e=document.getElementById("app"),t=c.getCurrentLanguage(),i=await v();e.innerHTML=`
    ${u()}
    
    <!-- ===== Banner Section ===== -->
    <section class="services-banner">
      <div class="w-layout-blockcontainer container-regular w-container">
        <div class="align-center">
          <div class="banner-title-wrap">
            <h1 class="banner-title">${c.t("services_title")||"Mastering the Digital Spectrum"}</h1>
            <p>${c.t("services_subtitle")||"From concept to conversion, we provide a holistic suite of digital services designed to scale your business and elevate your brand presence."}</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- ===== Services Grid Section ===== -->
    <section class="services-section">
      <div class="w-layout-blockcontainer container-regular w-container">
        <div class="services-grid">
          ${h(i,t)}
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
              <h2 class="section-title text-white">${c.t("cta_title")||"Ready to elevate your brand?"}</h2>
              <div class="cta-button-wrap">
                <a href="/${t}/contact" class="cta-button" data-route="contact">${c.t("contact_us")||"Contact Us"}</a>
              </div>
            </div>
          </div>
          <div class="cta-bg-wrap"></div>
        </div>
      </div>
    </section>
    
    ${g()}
  `,p(),m(),document.querySelectorAll("[data-route]").forEach(a=>{a.addEventListener("click",s=>{s.preventDefault();const n=a.getAttribute("href");n&&(window.location.href=n)})})}function h(e,t){return!e||e.length===0?'<div class="no-services"><p>No services found.</p></div>':e.map(i=>{var l;const a=i.name||"",s=i.description||"",n=s.length>120?s.substring(0,120)+"...":s,d=((l=i.images)==null?void 0:l.icon)||"/assets/img/service-icon-01.svg",r=`/${t}/service/${i.slug}`;return`
      <div class="service-card-item">
        <div class="service-card-inner" onclick="window.location.href='${r}'">
          <div class="service-card-icon">
            <img src="${d}" alt="${o(a)}" />
          </div>
          <h3 class="service-card-title">
            <a href="${r}">${o(a)}</a>
          </h3>
          <p class="service-card-description">${o(n)}</p>
          <a href="${r}" class="service-card-link">${c.t("learn_more")||"Learn More"} →</a>
        </div>
      </div>
    `}).join("")}function o(e){if(!e)return"";const t=document.createElement("div");return t.textContent=e,t.innerHTML}export{$ as renderServices};
