import{m as e}from"./index-OOzpxp90.js";import{c,r as i,b as d,a as l}from"./footer-CboKM8tC.js";async function g(){const a=document.getElementById("app"),t=e.getCurrentLanguage(),n=t==="fa"||t==="ar";a.innerHTML=`
    ${c()}
    
    <!-- ===== 404 Section ===== -->
    <section class="error-section">
      <div class="w-layout-blockcontainer container-regular w-container">
        <div class="error-content ${n?"rtl-error":""}">
          <div class="error-number">
            <span class="error-digit">4</span>
            <span class="error-digit">0</span>
            <span class="error-digit">4</span>
          </div>
          <h1 class="error-title">${e.t("404_title")||"Page Not Found"}</h1>
          <p class="error-description">${e.t("404_desc")||"Oops! The page you are looking for does not exist. It might have been moved or deleted."}</p>
          <div class="error-buttons">
            <a href="/${t}/" class="primary-button" data-route="home">${e.t("go_home")||"Go Home"}</a>
            <a href="/${t}/contact" class="secondary-button" data-route="contact">${e.t("contact_support")||"Contact Support"}</a>
          </div>
        </div>
      </div>
    </section>
    
    ${i()}
  `,d(),l(),document.querySelectorAll("[data-route]").forEach(r=>{r.addEventListener("click",s=>{s.preventDefault();const o=r.getAttribute("href");o&&(window.location.href=o)})})}export{g as render404};
