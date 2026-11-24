import{t as k,m as $}from"./index-6O3GMm5i.js";const C=["en","fa","ar","fr","de","es","tr"],g={phone:"+1(956) 666-1852",phoneDisplay:"+1 956 666 18 52",email:"info@MazoryaGroup.com"},L=[{name:"Instagram",url:"https://www.instagram.com/mazorya_group",icon:"/assets/img/social/instagram-dark.svg"},{name:"WhatsApp",url:"https://www.whatsapp.com",icon:"/assets/img/social/whatsapp-dark.svg"}];let i=null;function l(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function c(e,o=""){const t=$.t(e);return t==null||t===""||t===e?o:String(t)}function s(e,o=""){return l(c(e,o))}function T(){const e=$.getCurrentLanguage();return C.includes(e)?e:"en"}function A(e){return e==="fa"||e==="ar"}function M(){return L.map(e=>`
    <a
      class="mz-footer-social-link"
      href="${l(e.url)}"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="${l(e.name)}"
      title="${l(e.name)}"
    >
      <img
        src="${l(e.icon)}"
        alt=""
        loading="lazy"
      />
    </a>
  `).join("")}function E(e){return[{path:"",key:"nav_home",fallback:"Home"},{path:"about",key:"nav_about",fallback:"About"},{path:"projects",key:"nav_projects",fallback:"Projects"},{path:"contact",key:"nav_contact",fallback:"Contact"}].map(t=>`
      <li>
        <a
          href="${t.path?`/${e}/${t.path}`:`/${e}/`}"
          data-route="${t.path||"home"}"
        >
          ${s(t.key,t.fallback)}
        </a>
      </li>
    `).join("")}function O(){const e=T(),o=A(e)?"rtl":"ltr",t=new Date().getFullYear();return`
    <footer
      class="footer mz-footer"
      id="mazoryaFooter"
      dir="${o}"
    >
      <div class="mz-footer-container">

        <!-- ======================================
             ROW 1 — BRAND + NEWSLETTER
             ====================================== -->

        <div class="mz-footer-top">

          <!-- Brand -->
          <div class="mz-footer-brand">

            <a
              href="/${e}/"
              class="mz-footer-logo-link"
              aria-label="Mazorya Group"
            >
              <img
                src="/assets/img/3.png"
                alt="Mazorya Group"
                class="mz-footer-logo"
                loading="lazy"
              />
            </a>

            <p class="mz-footer-brand-text">
              ${s("footer_newsletter_title","Stay connected with Mazorya Group.")}
            </p>

          </div>

          <!-- Newsletter -->
          <div class="mz-footer-newsletter">

            <h3 class="mz-footer-newsletter-title">
              ${s("footer_newsletter_title","Subscribe to our newsletter")}
            </h3>

            <form
              class="mz-footer-form"
              id="newsletter-form"
              data-newsletter-form
            >

              <label
                class="mz-sr-only"
                for="newsletter-email"
              >
                ${s("email","Email address")}
              </label>

              <div class="mz-footer-input-wrap">

                <input
                  type="email"
                  id="newsletter-email"
                  name="email"
                  class="mz-footer-email"
                  placeholder="${s("footer_newsletter_placeholder","Enter your email address")}"
                  autocomplete="email"
                  inputmode="email"
                  required
                />

                <button
                  type="submit"
                  class="mz-footer-submit"
                >
                  <span class="mz-footer-submit-text">
                    ${s("footer_newsletter_btn","Subscribe")}
                  </span>

                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14"/>
                    <path d="m13 6 6 6-6 6"/>
                  </svg>

                </button>

              </div>

            </form>

            <div
              id="newsletter-success"
              class="mz-footer-message mz-footer-message--success"
              role="status"
              aria-live="polite"
              hidden
            ></div>

            <div
              id="newsletter-error"
              class="mz-footer-message mz-footer-message--error"
              role="alert"
              hidden
            ></div>

          </div>

        </div>

        <!-- ======================================
             ROW 2 — FOOTER LINKS
             ====================================== -->

        <div class="mz-footer-middle">

          <!-- Contact -->
          <div class="mz-footer-column">

            <h4 class="mz-footer-column-title">
              ${s("contact_title","Contact")}
            </h4>

            <ul class="mz-footer-links">

              <li>
                <a href="tel:${g.phone}">
                  ${l(g.phoneDisplay)}
                </a>
              </li>

              <li>
                <a href="mailto:${l(g.email)}">
                  ${l(g.email)}
                </a>
              </li>

            </ul>

          </div>

          <!-- Pages -->
          <div class="mz-footer-column">

            <h4 class="mz-footer-column-title">
              ${s("footer_pages","Pages")}
            </h4>

            <ul class="mz-footer-links">
              ${E(e)}
            </ul>

          </div>

          
<!-- Services -->
<div class="mz-footer-column">

  <h4 class="mz-footer-column-title">
    ${s("footer_services","Services")}
  </h4>

  <ul class="mz-footer-links">

    <!-- Services -->
    <li>
      <a
        href="/${e}/services"
        data-route="services"
      >
        ${s("nav_services","Services")}
      </a>
    </li>

    <!-- Mazorya App -->
    <li>
      <a
        href="/${e}/app"
        data-route="app"
      >
        ${s("footer_mazorya_app","Mazorya App")}
      </a>
    </li>

  </ul>

</div>


        </div>

        <!-- ======================================
             ROW 3 — SOCIAL + COPYRIGHT
             ====================================== -->

        <div class="mz-footer-bottom">

          <div class="mz-footer-social">
            ${M()}
          </div>

          <p class="mz-footer-copyright">
            © ${t} Mazorya Group.
            ${s("footer_copyright","All rights reserved.")}
          </p>

        </div>

      </div>
    </footer>
  `}function P(){i==null||i(),i=null;const e=document.getElementById("mazoryaFooter");if(!e)return;const o=e.querySelector("[data-newsletter-form]");if(!o)return;const t=o.querySelector("#newsletter-email"),h=o.querySelector(".mz-footer-submit"),u=o.querySelector(".mz-footer-submit-text"),m=e.querySelector("#newsletter-success"),f=e.querySelector("#newsletter-error");if(!t||!h)return;const z=new AbortController,{signal:S}=z,_=(u==null?void 0:u.textContent.trim())||"Subscribe";let a=null,b=!1;function w(){a!==null&&(clearTimeout(a),a=null),m&&(m.hidden=!0,m.textContent=""),f&&(f.hidden=!0,f.textContent="")}function d(n,p){if(w(),!e.isConnected)return;const r=n==="success"?m:f;r&&(r.textContent=String(p),r.hidden=!1,a=setTimeout(()=>{r.isConnected&&(r.hidden=!0),a=null},5e3))}function y(n){b=n,h.disabled=n,o.classList.toggle("is-submitting",n),u&&(u.textContent=n?c("sending","Sending..."):_)}o.addEventListener("submit",async n=>{if(n.preventDefault(),b)return;const p=t.value.trim();if(!p||!t.checkValidity()){d("error",c("newsletter_invalid_email","Please enter a valid email address.")),t.focus();return}w(),y(!0);try{const r=await k(p);if(!e.isConnected)return;r!=null&&r.success?(d("success",r.message||c("newsletter_success","Thank you for subscribing!")),t.value=""):d("error",(r==null?void 0:r.message)||c("newsletter_error","Something went wrong. Please try again."))}catch(r){console.error("[Footer] Newsletter subscription failed:",r),d("error",c("newsletter_error","Unable to subscribe. Please try again."))}finally{e.isConnected&&y(!1)}},{signal:S});const v=()=>{z.abort(),a!==null&&(clearTimeout(a),a=null),i===v&&(i=null)};return i=v,v}export{P as a,O as r};
