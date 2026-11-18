import{m as t,s as h}from"./index-OOzpxp90.js";import{c as b,r as w,b as E,a as $}from"./footer-CboKM8tC.js";async function C(){const g=document.getElementById("app"),l=t.getCurrentLanguage(),p=l==="fa"||l==="ar";g.innerHTML=`
    ${b()}
    
    <!-- ===== Contact Section ===== -->
    <section class="contact-page-section">
      <div class="w-layout-blockcontainer container-regular w-container">
        <div class="contact-grid ${p?"rtl-contact":""}">
          
          <!-- ===== Contact Info (سمت راست در RTL) ===== -->
          <div class="contact-info-side">
            <div class="contact-info-header">
              <h1 class="contact-page-title">${t.t("contact_title")||"Contact Us"}</h1>
              <p>${t.t("contact_subtitle")||"Have a question or want to work with us? Fill out the form and we'll get back to you within 24 hours."}</p>
            </div>
            
            <div class="contact-info-list">
              <div class="contact-info-item">
                <div class="contact-info-icon">
                  <img src="/assets/img/map-icon.svg" alt="Map" />
                </div>
                <div>
                  <h3>${t.t("office_title")||"Our Office"}</h3>
                  <p>${t.t("office_address")||"123 Business Avenue, Downtown, New York, NY 10001"}</p>
                </div>
              </div>
              
              <div class="contact-info-item">
                <div class="contact-info-icon">
                  <img src="/assets/img/phone-icon.svg" alt="Phone" />
                </div>
                <div>
                  <h3>${t.t("phone_title")||"Phone"}</h3>
                  <a href="tel:+16267564509">+1 626 756 45 09</a>
                </div>
              </div>
              
              <div class="contact-info-item">
                <div class="contact-info-icon">
                  <img src="/assets/img/mail-icon.svg" alt="Email" />
                </div>
                <div>
                  <h3>${t.t("email_title")||"Email"}</h3>
                  <a href="mailto:info@MazoryaGroup.com">info@MazoryaGroup.com</a>
                </div>
              </div>
            </div>
          </div>
          
          <!-- ===== Contact Form (سمت چپ در RTL) ===== -->
          <div class="contact-form-side">
            <div class="contact-form-block">
              <form id="contact-form">
                <div class="contact-form-row">
                  <div class="contact-form-group">
                    <label for="name">${t.t("contact_name")||"Name"} *</label>
                    <input type="text" id="name" name="name" class="contact-input" required />
                  </div>
                  <div class="contact-form-group">
                    <label for="phone">${t.t("contact_phone")||"Phone"}</label>
                    <input type="tel" id="phone" name="phone" class="contact-input" />
                  </div>
                </div>
                
                <div class="contact-form-group">
                  <label for="email">${t.t("contact_email")||"Email"} *</label>
                  <input type="email" id="email" name="email" class="contact-input" required />
                </div>
                
                <div class="contact-form-group">
                  <label for="message">${t.t("contact_message")||"Message"} *</label>
                  <textarea id="message" name="message" class="contact-textarea" rows="5" required></textarea>
                </div>
                
                <button type="submit" class="contact-submit-btn" id="submitBtn">
                  ${t.t("contact_submit")||"Send Message"}
                </button>
                
                <div id="successMsg" class="contact-success-msg" style="display: none;">
                  ✅ ${t.t("contact_success")||"Your message has been sent successfully!"}
                </div>
                <div id="errorMsg" class="contact-error-msg" style="display: none;">
                  ❌ ${t.t("contact_error")||"Something went wrong. Please try again."}
                </div>
              </form>
            </div>
          </div>
          
        </div>
      </div>
    </section>
    
    ${w()}
  `,E(),$();const c=document.getElementById("contact-form"),i=document.getElementById("successMsg"),e=document.getElementById("errorMsg"),a=document.getElementById("submitBtn");c&&c.addEventListener("submit",async s=>{var m,u,v,f;s.preventDefault();const o=(m=document.getElementById("name"))==null?void 0:m.value.trim(),n=(u=document.getElementById("email"))==null?void 0:u.value.trim(),y=(v=document.getElementById("phone"))==null?void 0:v.value.trim(),r=(f=document.getElementById("message"))==null?void 0:f.value.trim();if(!o||!n||!r){e.style.display="block",e.textContent="Please fill in all required fields.",setTimeout(()=>e.style.display="none",3e3);return}i.style.display="none",e.style.display="none",a&&(a.disabled=!0,a.textContent=t.t("sending")||"Sending...");const d=await h({name:o,email:n,phone:y,message:r,lang:t.getCurrentLanguage()});d.success?(i.style.display="block",c.reset(),setTimeout(()=>i.style.display="none",5e3)):(e.style.display="block",e.textContent=d.error||t.t("contact_error"),setTimeout(()=>e.style.display="none",3e3)),a&&(a.disabled=!1,a.textContent=t.t("contact_submit")||"Send Message")}),document.querySelectorAll("[data-route]").forEach(s=>{s.addEventListener("click",o=>{o.preventDefault();const n=s.getAttribute("href");n&&(window.location.href=n)})})}export{C as renderContact};
