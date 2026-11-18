const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-OOzpxp90.js","assets/index-zk7l-9C3.css"])))=>i.map(i=>d[i]);
import{n as y,k as b,m as o,_ as $,q as L}from"./index-OOzpxp90.js";function k(){const e=o.getCurrentLanguage(),n=e==="fa"||e==="ar",c=y(),a=c?b():null,s=(a==null?void 0:a.full_name)||(a==null?void 0:a.name)||"Account",d=(a==null?void 0:a.avatar)||"/assets/img/default-avatar.png";return`
    <header class="site-header" dir="${n?"rtl":"ltr"}">
      <div class="header-container">
        
        <!-- لوگو -->
        <div class="header-logo">
          <a href="/${e}/">
            <img src="/assets/img/logo.png" alt="Mazorya Group" />
          </a>
        </div>
        
        <!-- منوی اصلی -->
        <nav class="header-nav" id="headerNav">
          <ul class="header-menu">
            <li><a href="/${e}/" data-route="home">${o.t("nav_home")}</a></li>
            <li><a href="/${e}/about" data-route="about">${o.t("nav_about")}</a></li>
            <li><a href="/${e}/services" data-route="services">${o.t("nav_services")}</a></li>
            <li><a href="/${e}/projects" data-route="projects">${o.t("nav_projects")}</a></li>
            <li><a href="/${e}/contact" data-route="contact">${o.t("nav_contact")}</a></li>
          </ul>
          
          <!-- دکمه‌ها در موبایل -->
          <div class="header-actions-mobile">
            <div class="lang-dropdown">
              <button type="button" class="lang-btn" id="langBtnMobile">
                <svg class="lang-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                <span class="lang-code">${e.toUpperCase()}</span>
                <svg class="lang-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>
              <div class="lang-menu" id="langMenuMobile">
                <a href="#" data-lang="en">🇬🇧 English</a>
                <a href="#" data-lang="fr">🇫🇷 Français</a>
                <a href="#" data-lang="fa">🇮🇷 فارسی</a>
                <a href="#" data-lang="ar">🇸🇦 العربية</a>
                <a href="#" data-lang="de">🇩🇪 Deutsch</a>
                <a href="#" data-lang="tr">🇹🇷 Türkiye</a>
                <a href="#" data-lang="es">🇪🇸 Español</a>
              </div>
            </div>
            
            <!-- دکمه Auth / Profile در موبایل -->
            ${c?`
              <div class="profile-dropdown-mobile">
                <a href="/${e}/profile" class="profile-btn-mobile" data-route="profile">
                  <div class="profile-avatar-small">
                    <img src="${d}" alt="${s}" />
                  </div>
                  <span>${w(s.split(" ")[0])}</span>
                </a>
              </div>
            `:`
              <a href="/${e}/auth" class="header-btn" data-route="auth">
                ${o.t("btn_get_started")}
              </a>
            `}
          </div>
        </nav>
        
        <!-- دکمه‌ها (دسکتاپ) -->
        <div class="header-actions">
          <div class="lang-dropdown">
            <button type="button" class="lang-btn" id="langBtn">
              <svg class="lang-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              <span class="lang-code">${e.toUpperCase()}</span>
              <svg class="lang-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
            <div class="lang-menu" id="langMenu">
              <a href="#" data-lang="en">🇬🇧 English</a>
              <a href="#" data-lang="fr">🇫🇷 Français</a>
              <a href="#" data-lang="fa">🇮🇷 فارسی</a>
              <a href="#" data-lang="ar">🇸🇦 العربية</a>
              <a href="#" data-lang="de">🇩🇪 Deutsch</a>
              <a href="#" data-lang="tr">🇹🇷 Türkiye</a>
              <a href="#" data-lang="es">🇪🇸 Español</a>
            </div>
          </div>
          
          <!-- دکمه Auth / Profile در دسکتاپ -->
          ${c?`
            <div class="profile-dropdown">
              <button type="button" class="profile-btn" id="profileBtn">
                <div class="profile-avatar-small">
                  <img src="${d}" alt="${s}" />
                </div>
                <span>${w(s.split(" ")[0])}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>
              <div class="profile-menu" id="profileMenu">
                <a href="/${e}/profile" data-route="profile">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  ${o.t("profile")||"My Profile"}
                </a>
                <a href="/${e}/profile?tab=settings" data-route="profile">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                  </svg>
                  ${o.t("settings")||"Settings"}
                </a>
                <div class="divider"></div>
                <button id="logoutBtnHeader" class="logout-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  ${o.t("logout")||"Logout"}
                </button>
              </div>
            </div>
          `:`
            <a href="/${e}/auth" class="header-btn" data-route="auth">
              ${o.t("btn_get_started")}
            </a>
          `}
        </div>
        
        <!-- دکمه همبرگر -->
        <button type="button" class="header-mobile-toggle" id="mobileToggle" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
        
      </div>
    </header>
  `}function _(){const e=document.getElementById("mobileToggle"),n=document.getElementById("headerNav");if(e&&n){const r=e.cloneNode(!0);e.parentNode.replaceChild(r,e),r.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),n.classList.toggle("active"),r.classList.toggle("active"),n.classList.contains("active")?document.body.style.overflow="hidden":document.body.style.overflow=""})}const c=document.getElementById("langBtn"),a=document.getElementById("langMenu");if(c&&a){const r=c.cloneNode(!0);c.parentNode.replaceChild(r,c),r.addEventListener("click",t=>{t.stopPropagation(),a.classList.toggle("show")}),document.addEventListener("click",t=>{a&&r&&!r.contains(t.target)&&!a.contains(t.target)&&a.classList.remove("show")}),a.querySelectorAll("[data-lang]").forEach(t=>{const i=t.cloneNode(!0);t.parentNode.replaceChild(i,t),i.addEventListener("click",async f=>{f.preventDefault();const u=i.getAttribute("data-lang");await o.setLanguage(u);const h=window.location.pathname,m=h.match(/^\/([a-z]{2})\//);m?window.location.href=h.replace(`/${m[1]}`,`/${u}`):window.location.href=`/${u}/`})})}const s=document.getElementById("langBtnMobile"),d=document.getElementById("langMenuMobile");if(s&&d){const r=s.cloneNode(!0);s.parentNode.replaceChild(r,s),r.addEventListener("click",t=>{t.stopPropagation(),d.classList.toggle("show")}),d.querySelectorAll("[data-lang]").forEach(t=>{const i=t.cloneNode(!0);t.parentNode.replaceChild(i,t),i.addEventListener("click",async f=>{f.preventDefault();const u=i.getAttribute("data-lang");await o.setLanguage(u);const h=window.location.pathname,m=h.match(/^\/([a-z]{2})\//);m?window.location.href=h.replace(`/${m[1]}`,`/${u}`):window.location.href=`/${u}/`})})}const g=document.getElementById("profileBtn"),l=document.getElementById("profileMenu");if(g&&l){const r=g.cloneNode(!0);g.parentNode.replaceChild(r,g),r.addEventListener("click",i=>{i.stopPropagation(),l.classList.toggle("show")}),document.addEventListener("click",i=>{l&&r&&!r.contains(i.target)&&!l.contains(i.target)&&l.classList.remove("show")});const t=document.getElementById("logoutBtnHeader");if(t){const i=t.cloneNode(!0);t.parentNode.replaceChild(i,t),i.addEventListener("click",async()=>{const{logoutUser:f}=await $(async()=>{const{logoutUser:u}=await import("./index-OOzpxp90.js").then(h=>h.a);return{logoutUser:u}},__vite__mapDeps([0,1]));await f(),window.location.href=`/${o.getCurrentLanguage()}/`})}}document.querySelectorAll("[data-route]").forEach(r=>{const t=r.cloneNode(!0);r.parentNode.replaceChild(t,r),t.addEventListener("click",i=>{i.preventDefault();const f=t.getAttribute("href");f&&(window.location.href=f)})});const p=document.getElementById("headerNav"),v=document.getElementById("mobileToggle");p&&p.querySelectorAll("a").forEach(r=>{const t=r.cloneNode(!0);r.parentNode.replaceChild(t,r),t.addEventListener("click",()=>{p.classList.remove("active"),v&&v.classList.remove("active"),document.body.style.overflow=""})})}function w(e){if(!e)return"";const n=document.createElement("div");return n.textContent=e,n.innerHTML}function B(){const e=o.getCurrentLanguage(),n=e==="fa"||e==="ar";return`
    <footer class="footer">
      <div class="footer-container">
        
        <!-- ===== ردیف 1 ===== -->
        <div class="footer-row-1 ${n?"rtl-row1":""}">
          <div class="footer-logo-box ${n?"rtl-logo":""}">
            <img src="/assets/img/logo.png" alt="Mazorya Group" class="footer-logo" />
            <p>${o.t("footer_newsletter_title")}</p>
          </div>
          <div class="footer-form-box ${n?"rtl-form-box":""}">
            <h4>${o.t("footer_newsletter_title")}</h4>
            <form id="newsletter-form" class="footer-form ${n?"rtl-form":""}">
              <input type="email" id="newsletter-email" placeholder="${o.t("footer_newsletter_placeholder")}" />
              <button type="submit">${o.t("footer_newsletter_btn")}</button>
            </form>
            <div id="newsletter-success" class="footer-success" style="display:none"></div>
            <div id="newsletter-error" class="footer-error" style="display:none"></div>
          </div>
        </div>
        
        <!-- ===== ردیف 2 ===== -->
        <div class="footer-row-2 ${n?"rtl-row2":""}">
          <div class="footer-col footer-col-contact ${n?"rtl-contact":""}">
            <h4>${o.t("contact_title")||"Contact"}</h4>
            <ul>
              <li><a href="tel:+16267564509">+1 626 756 45 09</a></li>
              <li><a href="mailto:info@MazoryaGroup.com">info@MazoryaGroup.com</a></li>
            </ul>
          </div>
          <div class="footer-col footer-col-pages ${n?"rtl-pages":""}">
            <h4>${o.t("footer_pages")}</h4>
            <ul>
              <li><a href="/${e}/" data-route="home">${o.t("nav_home")}</a></li>
              <li><a href="/${e}/about" data-route="about">${o.t("nav_about")}</a></li>
              <li><a href="/${e}/projects" data-route="projects">${o.t("nav_projects")}</a></li>
              <li><a href="/${e}/contact" data-route="contact">${o.t("nav_contact")}</a></li>
            </ul>
          </div>
          <div class="footer-col footer-col-services ${n?"rtl-services":""}">
            <h4>${o.t("footer_services")}</h4>
            <ul>
              <li><a href="/${e}/services" data-route="services">${o.t("nav_services")}</a></li>
            </ul>
          </div>
        </div>
        
        <!-- ===== ردیف 3 ===== -->
        <div class="footer-row-3 ${n?"rtl-row3":""}">
          <div class="footer-social ${n?"rtl-social":""}">
            <a href="https://www.instagram.com/mazorya_group" target="_blank">
              <img src="/assets/img/social/instagram-dark.svg" alt="Instagram" />
            </a>
            <a href="https://www.facebook.com" target="_blank">
              <img src="/assets/img/social/facebook-dark.svg" alt="Facebook" />
            </a>
            <a href="https://www.twitter.com" target="_blank">
              <img src="/assets/img/social/twitter-dark.svg" alt="Twitter" />
            </a>
          </div>
          <p class="footer-copyright ${n?"rtl-copyright":""}">© 2025 Mazorya Group. ${o.t("footer_copyright")}</p>
        </div>
        
      </div>
    </footer>
  `}function C(){const e=document.getElementById("newsletter-form"),n=document.getElementById("newsletter-email"),c=document.getElementById("newsletter-success"),a=document.getElementById("newsletter-error");if(e&&n){const s=e.cloneNode(!0);e.parentNode.replaceChild(s,e),s.addEventListener("submit",async d=>{d.preventDefault();const g=n.value.trim();if(!g){a&&(a.textContent="Please enter your email",a.style.display="block",setTimeout(()=>a.style.display="none",3e3));return}c&&(c.style.display="none"),a&&(a.style.display="none");const l=s.querySelector("button"),p=l==null?void 0:l.textContent;l&&(l.disabled=!0,l.textContent="Sending...");const v=await L(g);v.success?(c&&(c.textContent=v.message||"Thank you for subscribing!",c.style.display="block"),n.value=""):a&&(a.textContent=v.message||"Something went wrong",a.style.display="block"),l&&(l.disabled=!1,l.textContent=p||"Subscribe"),setTimeout(()=>{c&&(c.style.display="none"),a&&(a.style.display="none")},5e3)})}document.querySelectorAll(".footer-col a[data-route]").forEach(s=>{const d=s.cloneNode(!0);s.parentNode.replaceChild(d,s),d.addEventListener("click",g=>{g.preventDefault();const l=d.getAttribute("href");l&&(window.location.href=l)})})}export{C as a,_ as b,k as c,B as r};
