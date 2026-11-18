import{i as w,m as s}from"./index-OOzpxp90.js";import{c as m,r as u,b as p,a as $}from"./footer-CboKM8tC.js";async function S(t){var l,d;const a=document.getElementById("app"),i=s.getCurrentLanguage(),{slug:r}=t;if(!r){window.location.href=`/${i}/services`;return}const e=await w(r);if(!e){a.innerHTML=`
      ${m()}
      <div class="container-regular" style="text-align: center; padding: 100px 20px;">
        <h1>${s.t("service_not_found")||"Service Not Found"}</h1>
        <p>${s.t("service_not_found_desc")||"The service you're looking for doesn't exist."}</p>
        <a href="/${i}/services" class="primary-button" style="display: inline-block; margin-top: 20px;">${s.t("back_to_services")||"Back to Services"}</a>
      </div>
      ${u()}
    `,p(),$();return}const n=e.name||"Service Details",o=e.description||"",f=e.sections||[];a.innerHTML=`
    ${m()}
    
    <!-- ===== Service Details Section ===== -->
    <section class="service-details-section">
      <div class="w-layout-blockcontainer container-regular w-container">
        
        <!-- عنوان -->
        <div class="service-details-header">
          <h1 class="service-details-title">${c(n)}</h1>
        </div>
        
        <!-- تصویر اصلی -->
        ${(l=e.images)!=null&&l.image_1?`
          <div class="service-details-image-main">
            <img src="${e.images.image_1}" alt="${c(n)}" class="service-details-image" />
          </div>
        `:""}
        
        <!-- توضیحات -->
        ${o?`
          <div class="service-details-description">
            <p>${c(o)}</p>
          </div>
        `:""}
        
        <!-- تصویر دوم -->
        ${(d=e.images)!=null&&d.image_2?`
          <div class="service-details-image-secondary">
            <img src="${e.images.image_2}" alt="${c(n)}" class="service-details-image" />
          </div>
        `:""}
        
        <!-- بخش‌های محتوایی داینامیک -->
        <div class="service-details-content">
          ${y(f)}
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
              <h2 class="section-title text-white">${s.t("cta_service_title")||"Ready to get started?"}</h2>
              <div class="cta-button-wrap">
                <a href="/${i}/contact" class="cta-button" data-route="contact">${s.t("contact_us")||"Contact Us"}</a>
              </div>
            </div>
          </div>
          <div class="cta-bg-wrap"></div>
        </div>
      </div>
    </section>
    
    ${u()}
  `,p(),$(),document.querySelectorAll("[data-route]").forEach(v=>{v.addEventListener("click",h=>{h.preventDefault();const g=v.getAttribute("href");g&&(window.location.href=g)})})}function y(t,a){return!t||t.length===0?"":t.map(i=>{const r=i.name||i.title||"",e=i.description||"";return`
      <div class="service-details-block">
        ${r?`<h2 class="service-details-block-title">${c(r)}</h2>`:""}
        ${e?`<div class="service-details-block-content"><p>${c(e)}</p></div>`:""}
      </div>
    `}).join("")}function c(t){if(!t)return"";const a=document.createElement("div");return a.textContent=t,a.innerHTML}export{S as renderServiceDetails};
