import{d as u,m as i}from"./index-OOzpxp90.js";import{c as v,r as p,b,a as m}from"./footer-CboKM8tC.js";async function w(){const a=document.getElementById("app"),t=i.getCurrentLanguage(),e=t==="fa"||t==="ar",n=await u();a.innerHTML=`
    ${v()}
    
    <!-- ===== Banner Section ===== -->
    <section class="blog-banner">
      <div class="w-layout-blockcontainer container-regular w-container">
        <div class="align-center">
          <div class="banner-title-wrap small">
            <h1 class="blog-banner-title">${i.t("blog_title")||"Our Blog"}</h1>
            <p class="blog-banner-subtitle">${i.t("blog_subtitle")||"Latest insights and articles from our team"}</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- ===== Blogs Grid Section ===== -->
    <section class="blog-list-section">
      <div class="w-layout-blockcontainer container-regular w-container">
        <div class="blogs-grid ${e?"rtl-blog":""}">
          ${f(n,t)}
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
              <h2 class="section-title text-white">${i.t("cta_blog_title")||"Want to stay updated?"}</h2>
              <div class="cta-button-wrap">
                <a href="/${t}/contact" class="cta-button" data-route="contact">${i.t("subscribe")||"Subscribe"}</a>
              </div>
            </div>
          </div>
          <div class="cta-bg-wrap"></div>
        </div>
      </div>
    </section>
    
    ${p()}
  `,b(),m(),document.querySelectorAll("[data-route]").forEach(s=>{s.addEventListener("click",c=>{c.preventDefault();const r=s.getAttribute("href");r&&(window.location.href=r)})})}function f(a,t){return!a||a.length===0?'<div class="no-blogs"><p>No blog posts found.</p></div>':a.map(e=>{var g;const n=t==="en"&&e.title_en||e.title,s=t==="en"&&e.description_en||e.description,c=s?s.length>120?s.substring(0,120)+"...":s:"",r=((g=e.images)==null?void 0:g.image_1)||"/assets/img/default-project.jpg",l=`/${t}/blog-details/${e.slug}`,d=e.createdAt?new Date(e.createdAt).toLocaleDateString(t==="en"?"en-US":"fa-IR"):"";return`
      <div class="blog-card">
        <div class="blog-card-inner">
          <div class="blog-card-image">
            <a href="${l}" class="blog-image-link">
              <img src="${r}" alt="${o(n)}" loading="lazy" />
            </a>
          </div>
          <div class="blog-card-content">
            ${d?`<span class="blog-date">${o(d)}</span>`:""}
            <h3 class="blog-card-title">
              <a href="${l}">${o(n)}</a>
            </h3>
            ${c?`<p class="blog-card-excerpt">${o(c)}</p>`:""}
            <a href="${l}" class="blog-read-more">${i.t("read_more")||"Read More"} →</a>
          </div>
        </div>
      </div>
    `}).join("")}function o(a){if(!a)return"";const t=document.createElement("div");return t.textContent=a,t.innerHTML}export{w as renderBlog};
