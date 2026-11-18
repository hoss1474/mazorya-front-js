import{n as E,m as e,o as k}from"./index-OOzpxp90.js";import{c as L,r as I,b as x,a as M}from"./footer-CboKM8tC.js";async function H(){const o=document.getElementById("app"),i=e.getCurrentLanguage(),l=i==="fa"||i==="ar";if(E()){window.location.href=`/${i}/profile`;return}o.innerHTML=`
    ${L()}
    
    <section class="auth-page">
      <div class="auth-bg-decoration">
        <div class="auth-bg-circle auth-bg-circle-1"></div>
        <div class="auth-bg-circle auth-bg-circle-2"></div>
        <div class="auth-bg-circle auth-bg-circle-3"></div>
      </div>
      
      <div class="auth-container">
        <div class="auth-card ${l?"rtl-auth":""}">
          
          <!-- Logo -->
          <div class="auth-logo">
            <img src="/assets/img/logo.png" alt="Mazorya Group" />
          </div>
          
          <!-- Title -->
          <div class="auth-header">
            <h1>${e.t("login_title")||"Welcome Back"}</h1>
            <p>${e.t("login_subtitle")||"Login to your account"}</p>
          </div>
          
          <!-- ===== Login Form ===== -->
          <form id="login-form" class="auth-form">
            <div class="input-group">
              <div class="input-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <input type="email" id="login-email" placeholder="${e.t("email")||"Email Address"}" autocomplete="email" />
            </div>
            
            <div class="input-group">
              <div class="input-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <input type="password" id="login-password" placeholder="${e.t("password")||"Password"}" />
              <button type="button" class="password-toggle" data-target="login-password">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </button>
            </div>
            
            <div class="form-options">
              <label class="checkbox">
                <input type="checkbox" id="remember-me" />
                <span>${e.t("remember_me")||"Remember me"}</span>
              </label>
              <button type="button" class="forgot-link" id="forgotPasswordBtn">${e.t("forgot_password")||"Forgot Password?"}</button>
            </div>
            
            <button type="submit" class="auth-btn">
              <span>${e.t("login")||"Login"}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </form>
          
          <!-- Message -->
          <div id="auth-message" class="auth-message" style="display: none;"></div>
          
        </div>
      </div>
    </section>
    
    <!-- ===== Forgot Password Modal ===== -->
    <div id="forgotModal" class="auth-modal" style="display: none;">
      <div class="auth-modal-overlay"></div>
      <div class="auth-modal-container">
        <div class="auth-modal-content ${l?"rtl-auth":""}">
          <button class="auth-modal-close" id="closeModalBtn">&times;</button>
          
          <div class="auth-modal-header">
            <div class="auth-modal-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M12 8v4l3 3"/>
                <circle cx="12" cy="12" r="10"/>
              </svg>
            </div>
            <h2>${e.t("reset_password")||"Reset Password"}</h2>
            <p>${e.t("reset_instructions")||"Enter your email to receive a verification code"}</p>
          </div>
          
          <div id="forgot-step-1" class="auth-modal-step active">
            <div class="input-group">
              <div class="input-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <input type="email" id="forgot-email" placeholder="${e.t("email")||"Email Address"}" />
            </div>
            <button id="sendCodeBtn" class="auth-modal-btn">
              <span>${e.t("send_code")||"Send Reset Code"}</span>
            </button>
          </div>
          
          <div id="forgot-step-2" class="auth-modal-step">
            <div class="input-group">
              <div class="input-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <input type="text" id="reset-code" placeholder="${e.t("verification_code")||"Verification Code"}" maxlength="6" />
            </div>
            <div class="input-group">
              <div class="input-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <input type="password" id="reset-password" placeholder="${e.t("new_password")||"New Password"}" />
              <button type="button" class="password-toggle" data-target="reset-password">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </button>
            </div>
            <div class="input-group">
              <div class="input-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <input type="password" id="reset-confirm-password" placeholder="${e.t("confirm_password")||"Confirm Password"}" />
            </div>
            <button id="resetPasswordBtn" class="auth-modal-btn">
              <span>${e.t("reset_password")||"Reset Password"}</span>
            </button>
          </div>
          
          <div class="auth-modal-footer">
            <button class="auth-modal-back" id="backToLoginBtn">← ${e.t("back_to_login")||"Back to Login"}</button>
          </div>
        </div>
      </div>
    </div>
    
    ${I()}
  `,x(),M(),$(),document.querySelectorAll("[data-route]").forEach(t=>{t.addEventListener("click",m=>{m.preventDefault();const g=t.getAttribute("href");g&&(window.location.href=g)})})}function $(){const o=e.getCurrentLanguage();document.querySelectorAll(".password-toggle").forEach(n=>{n.addEventListener("click",()=>{const d=n.getAttribute("data-target"),s=document.getElementById(d);if(s){const u=s.type==="password"?"text":"password";s.type=u;const r=n.querySelector("svg");u==="text"?r.innerHTML='<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>':r.innerHTML='<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>'}})});const i=document.getElementById("login-form");i&&i.addEventListener("submit",async n=>{var f,y,B;n.preventDefault();const d=(f=document.getElementById("login-email"))==null?void 0:f.value.trim(),s=(y=document.getElementById("login-password"))==null?void 0:y.value.trim(),u=(B=document.getElementById("remember-me"))==null?void 0:B.checked,r=document.getElementById("auth-message");if(!d||!s){c(r,"لطفاً ایمیل و رمز عبور را وارد کنید","error");return}const a=i.querySelector(".auth-btn"),w=a==null?void 0:a.innerHTML;a&&(a.disabled=!0,a.innerHTML='<div class="spinner"></div> در حال ورود...');const h=await k(d,s,u);a&&(a.disabled=!1,a.innerHTML=w),h.success?(c(r,"ورود موفق! در حال انتقال...","success"),setTimeout(()=>{window.location.href=`/${o}/profile`},1e3)):c(r,h.error||"ایمیل یا رمز عبور اشتباه است","error")});const l=document.getElementById("forgotPasswordBtn"),t=document.getElementById("forgotModal"),m=document.getElementById("closeModalBtn"),g=document.getElementById("backToLoginBtn");l&&t&&l.addEventListener("click",()=>{t.style.display="flex",document.getElementById("forgot-step-1").classList.add("active"),document.getElementById("forgot-step-2").classList.remove("active")}),m&&m.addEventListener("click",()=>{t.style.display="none",b()}),g&&g.addEventListener("click",()=>{t.style.display="none",b()}),t==null||t.addEventListener("click",n=>{n.target===t&&(t.style.display="none",b())});const p=document.getElementById("sendCodeBtn");p&&p.addEventListener("click",async()=>{var u;const n=(u=document.getElementById("forgot-email"))==null?void 0:u.value.trim(),d=document.getElementById("auth-message");if(!n){c(d,"لطفاً ایمیل خود را وارد کنید","error");return}p.disabled=!0,p.innerHTML='<div class="spinner"></div> در حال ارسال...';const s=await forgotPassword(n);p.disabled=!1,p.innerHTML="<span>ارسال کد</span>",s.success?(c(d,"کد تأیید به ایمیل شما ارسال شد","success"),document.getElementById("forgot-step-1").classList.remove("active"),document.getElementById("forgot-step-2").classList.add("active")):c(d,s.error||"ارسال کد ناموفق بود","error")});const v=document.getElementById("resetPasswordBtn");v&&v.addEventListener("click",async()=>{var w,h,f,y;const n=(w=document.getElementById("forgot-email"))==null?void 0:w.value.trim(),d=(h=document.getElementById("reset-code"))==null?void 0:h.value.trim(),s=(f=document.getElementById("reset-password"))==null?void 0:f.value.trim(),u=(y=document.getElementById("reset-confirm-password"))==null?void 0:y.value.trim(),r=document.getElementById("auth-message");if(!d||!s||!u){c(r,"لطفاً همه فیلدها را پر کنید","error");return}if(s!==u){c(r,"رمز عبور و تأیید آن مطابقت ندارند","error");return}if(s.length<6){c(r,"رمز عبور باید حداقل 6 کاراکتر باشد","error");return}v.disabled=!0,v.innerHTML='<div class="spinner"></div> در حال بازنشانی...';const a=await resetPassword(n,d,s);v.disabled=!1,v.innerHTML="<span>بازنشانی رمز</span>",a.success?(c(r,"رمز عبور با موفقیت تغییر کرد! اکنون می‌توانید وارد شوید","success"),setTimeout(()=>{t.style.display="none",b()},1500)):c(r,a.error||"بازنشانی رمز ناموفق بود","error")})}function b(){var m,g;const o=document.getElementById("forgot-email"),i=document.getElementById("reset-code"),l=document.getElementById("reset-password"),t=document.getElementById("reset-confirm-password");o&&(o.value=""),i&&(i.value=""),l&&(l.value=""),t&&(t.value=""),(m=document.getElementById("forgot-step-1"))==null||m.classList.add("active"),(g=document.getElementById("forgot-step-2"))==null||g.classList.remove("active")}function c(o,i,l){o&&(o.textContent=i,o.className=`auth-message ${l}`,o.style.display="block",o.scrollIntoView({behavior:"smooth",block:"center"}),setTimeout(()=>{o.style.display="none"},5e3))}export{H as renderAuth};
