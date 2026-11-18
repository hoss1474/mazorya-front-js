import{b as _,m as l}from"./index-OOzpxp90.js";import{c as v,r as p,b as m,a as $}from"./footer-CboKM8tC.js";async function B(i){var g,u;const a=document.getElementById("app"),e=l.getCurrentLanguage();let n=i==null?void 0:i.id;if(n||(n=new URLSearchParams(window.location.search).get("id")),!n){window.location.href=`/${e}/blog`;return}const t=await _(n);if(!t){a.innerHTML=`
      ${v()}
      <div class="container-regular" style="text-align: center; padding: 100px 20px;">
        <h1>${l.t("blog_not_found")||"Blog Post Not Found"}</h1>
        <p>${l.t("blog_not_found_desc")||"The article you are looking for does not exist."}</p>
        <a href="/${e}/blog" class="primary-button" style="display: inline-block; margin-top: 20px;">${l.t("back_to_blog")||"Back to Blog"}</a>
      </div>
      ${p()}
    `,m(),$();return}const s=e==="en"&&t.title_en||t.title,r=e==="en"&&t.description_en||t.description,h=t.sections||[],d=t.createdAt?new Date(t.createdAt).toLocaleDateString(e==="en"?"en-US":"fa-IR"):"";a.innerHTML=`
    ${v()}
    
    <!-- ===== Blog Details Section ===== -->
    <section class="blog-details-page">
      <div class="w-layout-blockcontainer container-regular w-container">
        
        <!-- هدر مقاله -->
        <div class="blog-details-header">
          <h1 class="blog-details-title">${o(s)}</h1>
          ${d?`<div class="blog-details-date">${o(d)}</div>`:""}
          ${r?`<p class="blog-details-subtitle">${o(r)}</p>`:""}
        </div>
        
        <!-- تصویر اصلی -->
        ${(g=t.images)!=null&&g.image_1?`
          <div class="blog-details-image-main">
            <img src="${t.images.image_1}" alt="${o(s)}" class="blog-details-image" />
          </div>
        `:""}
        
        <!-- محتوای اصلی (سکشن‌ها) -->
        <div class="blog-details-content">
          ${w(h,e)}
        </div>
        
        <!-- تصویر دوم -->
        ${(u=t.images)!=null&&u.image_2?`
          <div class="blog-details-image-secondary">
            <img src="${t.images.image_2}" alt="${o(s)}" class="blog-details-image" />
          </div>
        `:""}
        
      </div>
    </section>
    
    <!-- ===== CTA Section ===== -->
    <section class="cta-section">
      <div class="w-layout-blockcontainer container-regular w-container">
        <div class="cta-image-wrap">
          <img src="/assets/img/cta-image.jpg" loading="lazy" alt="CTA" class="cta-image" />
          <div class="cta-title-area">
            <div class="cta-title-wrap">
              <h2 class="section-title text-white">${l.t("cta_blog_details")||"Enjoyed this article?"}</h2>
              <div class="cta-button-wrap">
                <a href="/${e}/contact" class="cta-button" data-route="contact">${l.t("get_in_touch")||"Get in Touch"}</a>
              </div>
            </div>
          </div>
          <div class="cta-bg-wrap"></div>
        </div>
      </div>
    </section>
    
    ${p()}
  `,m(),$(),document.querySelectorAll("[data-route]").forEach(c=>{c.addEventListener("click",f=>{f.preventDefault();const b=c.getAttribute("href");b&&(window.location.href=b)})})}function w(i,a){return!i||i.length===0?"":i.map(e=>{const n=a==="en"?e.title_en||e.title:e.title||e.title_en,t=a==="en"?e.description_en||e.description:e.description||e.description_en;return`
      <div class="blog-details-block">
        ${n?`<h2 class="blog-details-block-title">${o(n)}</h2>`:""}
        ${t?`<div class="blog-details-block-content"><p>${o(t)}</p></div>`:""}
      </div>
    `}).join("")}function o(i){if(!i)return"";const a=document.createElement("div");return a.textContent=i,a.innerHTML}export{B as renderBlogDetails};
