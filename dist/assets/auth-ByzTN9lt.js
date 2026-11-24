import{n as te,m as J,o as re,f as se,r as ae}from"./index-6O3GMm5i.js";import{r as ie,a as oe}from"./header-CtcPUyL-.js";function Q(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function o(e,a=""){const t=J.t(e);return t==null||t===""||t===e?a:String(t)}function n(e,a=""){return Q(o(e,a))}function U(e){return e==="fa"||e==="ar"}function O(e){if(!e||e.length>255)return!1;const a=document.createElement("input");return a.type="email",a.value=e,a.checkValidity()}function K(e,a){return typeof(e==null?void 0:e.error)=="string"&&e.error.trim()?e.error:(e==null?void 0:e.success)===!1&&typeof(e==null?void 0:e.message)=="string"&&e.message.trim()?e.message:a}const W=`
  <svg width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" stroke-width="2"
    aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
`,X=`
  <svg width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" stroke-width="2"
    aria-hidden="true">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
`,Z=`
  <svg width="18" height="18" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" stroke-width="2"
    aria-hidden="true">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
`,ne=`
  <svg width="18" height="18" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" stroke-width="2"
    aria-hidden="true">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
`,le=`
  <svg width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" stroke-width="2"
    aria-hidden="true">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
`;function ce(e){const a=U(e),t=(y,S)=>a?S:y;return`
    <section class="auth-portal" id="mazoryaAuthPortal">
      <div class="portal-noise" aria-hidden="true"></div>
      <div class="portal-glow" aria-hidden="true"></div>

      <div class="portal-stage" id="portalInteractive">
        <div class="portal-floor" aria-hidden="true"></div>
        <div class="portal-giant-title" aria-hidden="true">MAZORYA</div>

        <div class="portal-tunnel" aria-hidden="true">
          <div class="portal-frame portal-frame--1"></div>
          <div class="portal-frame portal-frame--2"></div>
          <div class="portal-frame portal-frame--3"></div>
          <div class="portal-frame portal-frame--4"></div>
          <div class="portal-frame portal-frame--5"></div>
        </div>

        <span class="portal-star portal-star--one" aria-hidden="true">✳</span>
        <span class="portal-star portal-star--two" aria-hidden="true">✳</span>

        <div class="portal-flip-card" id="portalFlipCard">
          <div class="portal-flip-inner" id="portalFlipInner">
            <div class="portal-flip-face portal-flip-front" id="portalLoginFace">
              <div class="portal-card" dir="${a?"rtl":"ltr"}">
          <div class="portal-overline">${t("PRIVATE ACCESS / 02","ورود اختصاصی / ۰۲")}</div>

          <div class="portal-intro">
            <h1>${n("login_title",t("Your next dimension.","به دنیای مزوریا خوش آمدید"))}</h1>
            <p>${n("login_subtitle",t("One account. Infinite possibilities.","یک حساب، دنیایی از فرصت‌ها."))}</p>
          </div>

          <form id="login-form" class="portal-form" novalidate>
            <label class="portal-label" for="login-email">${n("email","Email Address")}</label>
            <div class="portal-field">
              <span class="portal-field-icon" aria-hidden="true">${W}</span>
              <input
                id="login-email" name="email" type="email"
                placeholder="${n("email","Email Address")}"
                aria-label="${n("email","Email Address")}"
                autocomplete="email" maxlength="255" required dir="ltr"
              />
            </div>

            <label class="portal-label" for="login-password">${n("password","Password")}</label>
            <div class="portal-field portal-field--password">
              <span class="portal-field-icon" aria-hidden="true">${X}</span>
              <input
                id="login-password" name="password" type="password"
                placeholder="${n("password","Password")}"
                aria-label="${n("password","Password")}"
                autocomplete="current-password" required
              />
              <button
                type="button" class="password-toggle portal-eye"
                data-target="login-password"
                aria-label="${n("show_password","Show password")}"
                aria-pressed="false"
              >${Z}</button>
            </div>

            <div class="portal-options">
              <label class="portal-remember">
                <input id="remember-me" name="remember" type="checkbox" />
                <span>${n("remember_me","Remember me")}</span>
              </label>
              <button type="button" class="portal-forgot" id="forgotPasswordBtn">
                ${n("forgot_password","Forgot Password?")}
              </button>
            </div>

            <button type="submit" class="portal-submit" id="loginSubmitBtn">
              <span>${n("login","Login")}</span>
              <span class="portal-submit-arrow" aria-hidden="true">↗</span>
            </button>
          </form>

          <div id="auth-message" class="auth-message portal-message"
               role="status" aria-live="polite" style="display:none;"></div>

          <div class="portal-card-footer">
            <span>${t("SECURED EXPERIENCE","اتصال امن")}</span>
            <span class="portal-online">● ${t("ONLINE","آنلاین")}</span>
              </div>
            </div>
          </div>
          ${de(e)}
        </div>
      </div>
      </div>

    </section>
  `}function de(e){const a=U(e),t=(y,S)=>a?S:y;return`
    <div
      id="forgotModal"
      class="portal-flip-face portal-flip-back"
      aria-hidden="true"
      inert
    >
      <div
        class="recovery-card"
        dir="${a?"rtl":"ltr"}"
        aria-labelledby="forgotModalTitle"
      >
        <div class="recovery-card-top">
          <span class="recovery-kicker" id="recoveryKicker">
            ${t("ACCOUNT RECOVERY / 01","بازیابی حساب / ۰۱")}
          </span>
          <button
            type="button" class="recovery-close"
            id="closeModalBtn"
            aria-label="${n("close",t("Close","بستن"))}"
          >&times;</button>
        </div>

        <div class="recovery-symbol" aria-hidden="true">↗</div>

        <div class="recovery-header">
          <h2 id="forgotModalTitle">
            ${t("Find your way back.","راه بازگشت به مزوریا.")}
          </h2>
          <p id="recoverySubtitle">
            ${t("Every path has a way forward. Enter your email to start your account recovery.","هر مسیری راه بازگشتی دارد. برای شروع بازیابی حساب، ایمیل خود را وارد کنید.")}
          </p>
        </div>

        <div class="recovery-progress" aria-label="${t("Recovery steps","مراحل بازیابی")}">
          <span class="recovery-progress-segment active" aria-hidden="true"></span>
          <span class="recovery-progress-segment" aria-hidden="true"></span>
        </div>

        <div id="forgot-step-1" class="auth-modal-step recovery-step active">
          <label class="recovery-label" for="forgot-email">
            ${n("email",t("Email Address","آدرس ایمیل"))}
          </label>
          <div class="input-group recovery-field">
            <div class="input-icon" aria-hidden="true">${W}</div>
            <input
              type="email" id="forgot-email"
              placeholder="${n("email",t("Email Address","آدرس ایمیل"))}"
              autocomplete="email" maxlength="255" dir="ltr"
            />
          </div>
          <button type="button" id="sendCodeBtn" class="auth-modal-btn recovery-primary">
            <span>${n("send_code",t("Continue to Verification","دریافت کد تأیید"))}</span>
            <span class="recovery-button-arrow" aria-hidden="true">↗</span>
          </button>
        </div>

        <div id="forgot-step-2" class="auth-modal-step recovery-step" hidden>
          <label class="recovery-label" for="reset-code">
            ${n("verification_code",t("Verification Code","کد تأیید"))}
          </label>
          <div class="input-group recovery-field">
            <div class="input-icon" aria-hidden="true">${le}</div>
            <input
              type="text" id="reset-code"
              placeholder="${n("verification_code",t("Verification Code","کد تأیید"))}"
              autocomplete="one-time-code" maxlength="6"
              inputmode="numeric" dir="ltr"
            />
          </div>

          <label class="recovery-label" for="reset-password">
            ${n("new_password",t("New Password","رمز عبور جدید"))}
          </label>
          <div class="input-group recovery-field">
            <div class="input-icon" aria-hidden="true">${X}</div>
            <input
              type="password" id="reset-password"
              placeholder="${n("new_password",t("New Password","رمز عبور جدید"))}"
              autocomplete="new-password"
            />
            <button
              type="button" class="password-toggle recovery-eye"
              data-target="reset-password"
              aria-label="${n("show_password",t("Show password","نمایش رمز عبور"))}"
              aria-pressed="false"
            >${Z}</button>
          </div>

          <label class="recovery-label" for="reset-confirm-password">
            ${n("confirm_password",t("Confirm Password","تکرار رمز عبور"))}
          </label>
          <div class="input-group recovery-field">
            <div class="input-icon" aria-hidden="true">${X}</div>
            <input
              type="password" id="reset-confirm-password"
              placeholder="${n("confirm_password",t("Confirm Password","تکرار رمز عبور"))}"
              autocomplete="new-password"
            />
          </div>
          <button type="button" id="resetPasswordBtn" class="auth-modal-btn recovery-primary">
            <span>${n("reset_password",t("Reset Password","تغییر رمز عبور"))}</span>
            <span class="recovery-button-arrow" aria-hidden="true">↗</span>
          </button>
        </div>

        <div
          id="forgot-message" class="auth-message recovery-message"
          role="status" aria-live="polite" style="display:none;"
        ></div>

        <div class="recovery-actions">
          <button type="button" class="recovery-back" id="backToLoginBtn">
            ${a?"→":"←"}
            ${n("back_to_login",t("Back to Login","بازگشت به ورود"))}
          </button>
        </div>

        <div class="recovery-meta" aria-hidden="true">
          <span>MAZORYA / ACCOUNT ACCESS</span>
          <span>${t("● PRIVATE","● خصوصی")}</span>
        </div>
      </div>
    </div>
  `}function p(e,a,t="error"){!e||!e.isConnected||(e.className=`auth-message ${t==="success"?"success":"error"}`,e.textContent=String(a??""),e.style.display="block",e.setAttribute("role",t==="error"?"alert":"status"))}function V(e){e&&(e.textContent="",e.style.display="none")}function L(e,a,t){e&&(e.disabled=a,e.setAttribute("aria-busy",String(a)),a?(e.dataset.normalHtml||(e.dataset.normalHtml=e.innerHTML),e.innerHTML=`
      <span class="spinner" aria-hidden="true"></span>
      <span>${Q(t)}</span>
    `):e.dataset.normalHtml?(e.innerHTML=e.dataset.normalHtml,delete e.dataset.normalHtml):e.textContent=t)}function ue(e,a){var G;const t=e.querySelector("#login-form"),y=e.querySelector("#auth-message"),S=e.querySelector("#loginSubmitBtn"),C=e.querySelector("#forgotPasswordBtn"),r=e.querySelector("#forgotModal"),d=e.querySelector("#portalFlipCard"),m=e.querySelector("#portalLoginFace"),A=m==null?void 0:m.querySelector(".portal-card"),q=r==null?void 0:r.querySelector(".recovery-card");function v(){if(!(d!=null&&d.isConnected))return;const i=d.classList.contains("is-flipped")?q:A;if(!i)return;const s=Math.ceil(i.scrollHeight);s>0&&(d.style.height=`${s}px`)}if(typeof ResizeObserver<"u"){const i=new ResizeObserver(()=>{if(!(d!=null&&d.isConnected)){i.disconnect();return}v()});A&&i.observe(A),q&&i.observe(q)}requestAnimationFrame(v);const B=e.querySelector("#closeModalBtn"),z=e.querySelector("#backToLoginBtn"),k=e.querySelector("#forgot-step-1"),x=e.querySelector("#forgot-step-2"),f=e.querySelector("#forgot-message"),u=e.querySelector("#forgot-email"),M=e.querySelector("#sendCodeBtn"),b=e.querySelector("#reset-code"),E=e.querySelector("#reset-password"),_=e.querySelector("#reset-confirm-password"),g=e.querySelector("#resetPasswordBtn");let N=!1,$=!1,T=!1,P=null;e.querySelectorAll(".password-toggle").forEach(i=>{i.addEventListener("click",()=>{const s=i.dataset.target,l=e.querySelector(`#${s}`);if(!l)return;const c=l.type==="password";l.type=c?"text":"password",i.setAttribute("aria-pressed",String(c)),i.setAttribute("aria-label",c?o("hide_password","Hide password"):o("show_password","Show password")),i.innerHTML=c?ne:Z})}),t==null||t.addEventListener("submit",async i=>{if(i.preventDefault(),N)return;const s=e.querySelector("#login-email"),l=e.querySelector("#login-password"),c=e.querySelector("#remember-me"),h=(s==null?void 0:s.value.trim())||"",R=(l==null?void 0:l.value)||"",H=!!(c!=null&&c.checked);if(V(y),!O(h)){p(y,o("invalid_email","Please enter a valid email address.")),s==null||s.focus();return}if(!R){p(y,o("password_required","Please enter your password.")),l==null||l.focus();return}N=!0,L(S,!0,o("logging_in","Signing in..."));try{const w=await re(h,R,H);if(!t.isConnected)return;if((w==null?void 0:w.success)===!0){p(y,o("login_success","Login successful! Redirecting..."),"success"),window.location.assign(`/${a}/profile`);return}p(y,K(w,o("login_failed","Incorrect email or password.")))}catch(w){console.error("[Auth] Login failed:",w),p(y,o("server_error","Unable to connect to the server. Please try again."))}finally{N=!1,t.isConnected&&L(S,!1,o("login","Login"))}});function Y(i){const s=i===1,l=U(a),c=(I,D)=>l?D:I;k==null||k.classList.toggle("active",s),x==null||x.classList.toggle("active",!s),k&&(k.hidden=!s),x&&(x.hidden=s);const h=r==null?void 0:r.querySelector("#forgotModalTitle"),R=r==null?void 0:r.querySelector("#recoverySubtitle"),H=r==null?void 0:r.querySelector("#recoveryKicker"),w=r==null?void 0:r.querySelectorAll(".recovery-progress-segment");h&&(h.textContent=s?c("Find your way back.","راه بازگشت به مزوریا."):c("A fresh beginning.","یک شروع تازه.")),R&&(R.textContent=s?c("Every path has a way forward. Enter your email to start your account recovery.","هر مسیری راه بازگشتی دارد. برای شروع بازیابی حساب، ایمیل خود را وارد کنید."):c("Enter the verification code and choose a new password to complete your recovery.","کد تأیید را وارد کنید و برای تکمیل بازیابی، رمز عبور جدیدی انتخاب کنید.")),H&&(H.textContent=s?c("ACCOUNT RECOVERY / 01","بازیابی حساب / ۰۱"):c("ACCOUNT RECOVERY / 02","بازیابی حساب / ۰۲")),w==null||w.forEach((I,D)=>{I.classList.toggle("active",D===0||!s)}),requestAnimationFrame(v)}function j(){u&&(u.value=""),b&&(b.value=""),E&&(E.value=""),_&&(_.value=""),Y(1),V(f),T=!1,g&&(g.disabled=!1,g.removeAttribute("aria-busy")),requestAnimationFrame(v)}function ee(){var s;if(!r||!d||$)return;P=document.activeElement,j();const i=((s=e.querySelector("#login-email"))==null?void 0:s.value.trim())||"";O(i)&&u&&(u.value=i),r.inert=!1,r.setAttribute("aria-hidden","false"),m&&(m.inert=!0,m.setAttribute("aria-hidden","true")),v(),d.classList.add("is-flipped"),v(),window.setTimeout(()=>{var l;d.classList.contains("is-flipped")&&r.isConnected&&((l=u||B)==null||l.focus({preventScroll:!0}))},750)}function F(){!r||!d||$||(d.classList.remove("is-flipped"),v(),m&&(m.inert=!1,m.setAttribute("aria-hidden","false")),r.inert=!0,r.setAttribute("aria-hidden","true"),j(),window.setTimeout(()=>{!d.classList.contains("is-flipped")&&(P!=null&&P.isConnected)&&P.focus({preventScroll:!0})},750))}C==null||C.addEventListener("click",ee),B==null||B.addEventListener("click",F),z==null||z.addEventListener("click",F),(G=r==null?void 0:r.querySelector(".auth-modal-overlay"))==null||G.addEventListener("click",F),r==null||r.addEventListener("keydown",i=>{if(i.key==="Escape"){i.preventDefault(),F();return}if(i.key!=="Tab")return;const s=[...r.querySelectorAll("button:not([disabled]), input:not([disabled])")].filter(h=>h.getClientRects().length>0);if(!s.length)return;const l=s[0],c=s[s.length-1];i.shiftKey&&document.activeElement===l?(i.preventDefault(),c.focus()):!i.shiftKey&&document.activeElement===c&&(i.preventDefault(),l.focus())}),M==null||M.addEventListener("click",async()=>{if($)return;V(f);const i=(u==null?void 0:u.value.trim())||"";if(!O(i)){p(f,o("invalid_email","Please enter a valid email address.")),u==null||u.focus();return}$=!0,L(M,!0,o("sending","Sending..."));try{const s=await se(i);if(!(r!=null&&r.isConnected))return;(s==null?void 0:s.success)===!0?(Y(2),p(f,o("code_sent","A verification code has been sent to your email."),"success"),b==null||b.focus()):p(f,K(s,o("send_code_failed","Unable to send the verification code.")))}catch(s){console.error("[Auth] Send code failed:",s),p(f,o("server_error","Unable to connect to the server. Please try again."))}finally{$=!1,r!=null&&r.isConnected&&L(M,!1,o("send_code","Send Reset Code"))}}),g==null||g.addEventListener("click",async()=>{if($||T)return;V(f);const i=(u==null?void 0:u.value.trim())||"",s=(b==null?void 0:b.value.trim())||"",l=(E==null?void 0:E.value)||"",c=(_==null?void 0:_.value)||"";if(!O(i)){p(f,o("invalid_email","Please enter a valid email address.")),Y(1),u==null||u.focus();return}if(!s||!l||!c){p(f,o("required_fields","Please complete all required fields."));return}if(s.length>6){p(f,o("invalid_code","Please enter a valid verification code."));return}if(l!==c){p(f,o("password_mismatch","Passwords do not match."));return}if(l.length<6){p(f,o("password_length","Password must be at least 6 characters."));return}$=!0,L(g,!0,o("resetting_password","Resetting password..."));try{const h=await ae(i,s,l);if(!(r!=null&&r.isConnected))return;(h==null?void 0:h.success)===!0?(T=!0,E.value="",_.value="",b.value="",p(f,o("password_reset_success","Your password has been reset successfully. You can now sign in."),"success"),g.disabled=!0):p(f,K(h,o("reset_failed","Unable to reset the password.")))}catch(h){console.error("[Auth] Reset password failed:",h),p(f,o("server_error","Unable to connect to the server. Please try again."))}finally{$=!1,r!=null&&r.isConnected&&(L(g,!1,o("reset_password","Reset Password")),T&&(g.disabled=!0))}})}function pe(e){const a=e.querySelector("#mazoryaAuthPortal"),t=a==null?void 0:a.querySelector("#portalInteractive");if(!a||!t)return;const y=window.matchMedia("(pointer: fine)").matches,S=window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(!y||S)return;let C=0,r=0,d=0;function m(){C=0,t.isConnected&&(a.style.setProperty("--portal-x",r.toFixed(3)),a.style.setProperty("--portal-y",d.toFixed(3)))}function A(){C||(C=requestAnimationFrame(m))}t.addEventListener("pointermove",q=>{const v=t.getBoundingClientRect();!v.width||!v.height||(r=Math.max(-1,Math.min(1,(q.clientX-v.left)/v.width*2-1)),d=Math.max(-1,Math.min(1,(q.clientY-v.top)/v.height*2-1)),A())},{passive:!0}),t.addEventListener("pointerleave",()=>{r=0,d=0,A()})}async function he(){const e=document.getElementById("app");if(!e){console.error("[Auth] #app element not found.");return}const a=J.getCurrentLanguage();if(te()){window.location.assign(`/${a}/profile`);return}e.innerHTML=`
    <div class="mz-auth-shell">
      ${ie()}

      <main
        class="mz-auth"
        id="mazoryaAuth"
        dir="${U(a)?"rtl":"ltr"}"
      >
        ${ce(a)}
      </main>
    </div>
  `,oe(),ue(e,a),pe(e),console.log("[Auth] Login page rendered:",a)}export{he as renderAuth};
