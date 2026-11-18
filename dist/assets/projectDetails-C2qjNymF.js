import{f as h,m as c}from"./index-OOzpxp90.js";import{c as m,r as u,b as v,a as j}from"./footer-CboKM8tC.js";async function k(t){var l,d;const e=document.getElementById("app"),i=c.getCurrentLanguage(),{slug:o}=t;if(!o){window.location.href=`/${i}/projects`;return}const a=await h(o);if(!a){e.innerHTML=`
      ${m()}
      <div class="container-regular" style="text-align: center; padding: 100px 20px;">
        <h1>${c.t("project_not_found")||"Project Not Found"}</h1>
        <p>${c.t("project_not_found_desc")||"The project you are looking for does not exist."}</p>
        <a href="/${i}/projects" class="primary-button" style="display: inline-block; margin-top: 20px;">${c.t("back_to_projects")||"Back to Projects"}</a>
      </div>
      ${u()}
    `,v(),j();return}const r=a.name||"Project Details",n=a.description||"",$=a.sections||[];e.innerHTML=`
    ${m()}
    
    <!-- ===== Project Details Section ===== -->
    <section class="project-details-section">
      <div class="w-layout-blockcontainer container-regular w-container">
        
        <!-- عنوان -->
        <div class="project-details-header">
          <h1 class="project-details-title">${s(r)}</h1>
        </div>
        
        <!-- تصویر اصلی -->
        ${(l=a.images)!=null&&l.image?`
          <div class="project-details-image-main">
            <img src="${a.images.image}" alt="${s(r)}" class="project-details-image" />
          </div>
        `:""}
        
        <!-- توضیحات -->
        ${n?`
          <div class="project-details-description">
            <p>${s(n)}</p>
          </div>
        `:""}
        
        <!-- تصویر دوم -->
        ${(d=a.images)!=null&&d.image2?`
          <div class="project-details-image-secondary">
            <img src="${a.images.image2}" alt="${s(r)}" class="project-details-image" />
          </div>
        `:""}
        
        <!-- بخش‌های محتوایی -->
        <div class="project-details-content">
          ${w($)}
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
              <h2 class="section-title text-white">${c.t("cta_project_title")||"Interested in similar work?"}</h2>
              <div class="cta-button-wrap">
                <a href="/${i}/contact" class="cta-button" data-route="contact">${c.t("contact_us")||"Contact Us"}</a>
              </div>
            </div>
          </div>
          <div class="cta-bg-wrap"></div>
        </div>
      </div>
    </section>
    
    ${u()}
  `,v(),j(),document.querySelectorAll("[data-route]").forEach(p=>{p.addEventListener("click",f=>{f.preventDefault();const g=p.getAttribute("href");g&&(window.location.href=g)})})}function w(t){return!t||t.length===0?"":t.map(e=>{const i=e.title||"",o=e.description||"";return`
      <div class="project-details-block">
        ${i?`<h2 class="project-details-block-title">${s(i)}</h2>`:""}
        ${o?`<div class="project-details-block-content"><p>${s(o)}</p></div>`:""}
      </div>
    `}).join("")}function s(t){if(!t)return"";const e=document.createElement("div");return e.textContent=t,e.innerHTML}export{k as renderProjectDetails};
