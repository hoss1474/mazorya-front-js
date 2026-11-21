import{n as G,m as K,o as J,f as Q,r as W}from"./index-BZXsUPAf.js";import{r as ee,a as re}from"./header-hNak-YC9.js";function Z(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function i(e,a=""){const r=K.t(e);return r==null||r===""||r===e?a:String(r)}function o(e,a=""){return Z(i(e,a))}function T(e){return e==="fa"||e==="ar"}function Y(e){if(!e||e.length>255)return!1;const a=document.createElement("input");return a.type="email",a.value=e,a.checkValidity()}function F(e,a){return typeof(e==null?void 0:e.error)=="string"&&e.error.trim()?e.error:(e==null?void 0:e.success)===!1&&typeof(e==null?void 0:e.message)=="string"&&e.message.trim()?e.message:a}const X=`
  <svg width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" stroke-width="2"
    aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
`,H=`
  <svg width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" stroke-width="2"
    aria-hidden="true">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
`,z=`
  <svg width="18" height="18" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" stroke-width="2"
    aria-hidden="true">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
`,te=`
  <svg width="18" height="18" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" stroke-width="2"
    aria-hidden="true">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
`,ae=`
  <svg width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" stroke-width="2"
    aria-hidden="true">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
`;function se(e){const a=T(e),r=(f,m)=>a?m:f;return`
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

        <div class="portal-card" dir="${a?"rtl":"ltr"}">
          <div class="portal-overline">${r("PRIVATE ACCESS / 02","ورود اختصاصی / ۰۲")}</div>

          <div class="portal-intro">
            <h1>${o("login_title",r("Your next dimension.","به دنیای مزوریا خوش آمدید"))}</h1>
            <p>${o("login_subtitle",r("One account. Infinite possibilities.","یک حساب، دنیایی از فرصت‌ها."))}</p>
          </div>

          <form id="login-form" class="portal-form" novalidate>
            <label class="portal-label" for="login-email">${o("email","Email Address")}</label>
            <div class="portal-field">
              <span class="portal-field-icon" aria-hidden="true">${X}</span>
              <input
                id="login-email" name="email" type="email"
                placeholder="${o("email","Email Address")}"
                aria-label="${o("email","Email Address")}"
                autocomplete="email" maxlength="255" required dir="ltr"
              />
            </div>

            <label class="portal-label" for="login-password">${o("password","Password")}</label>
            <div class="portal-field portal-field--password">
              <span class="portal-field-icon" aria-hidden="true">${H}</span>
              <input
                id="login-password" name="password" type="password"
                placeholder="${o("password","Password")}"
                aria-label="${o("password","Password")}"
                autocomplete="current-password" required
              />
              <button
                type="button" class="password-toggle portal-eye"
                data-target="login-password"
                aria-label="${o("show_password","Show password")}"
                aria-pressed="false"
              >${z}</button>
            </div>

            <div class="portal-options">
              <label class="portal-remember">
                <input id="remember-me" name="remember" type="checkbox" />
                <span>${o("remember_me","Remember me")}</span>
              </label>
              <button type="button" class="portal-forgot" id="forgotPasswordBtn">
                ${o("forgot_password","Forgot Password?")}
              </button>
            </div>

            <button type="submit" class="portal-submit" id="loginSubmitBtn">
              <span>${o("login","Login")}</span>
              <span class="portal-submit-arrow" aria-hidden="true">↗</span>
            </button>
          </form>

          <div id="auth-message" class="auth-message portal-message"
               role="status" aria-live="polite" style="display:none;"></div>

          <div class="portal-card-footer">
            <span>${r("SECURED EXPERIENCE","اتصال امن")}</span>
            <span class="portal-online">● ${r("ONLINE","آنلاین")}</span>
          </div>
        </div>
      </div>

    </section>
  `}function oe(e){const a=T(e),r=(f,m)=>a?m:f;return`
    <div
      id="forgotModal"
      class="auth-modal portal-recovery-modal"
      style="display:none;"
      aria-hidden="true"
    >
      <div class="auth-modal-overlay recovery-backdrop"></div>

      <div class="auth-modal-container recovery-scene">
        <div class="recovery-grain" aria-hidden="true"></div>
        <div class="recovery-floor" aria-hidden="true"></div>
        <div class="recovery-arch recovery-arch--back" aria-hidden="true"></div>
        <div class="recovery-arch recovery-arch--middle" aria-hidden="true"></div>
        <div class="recovery-arch recovery-arch--front" aria-hidden="true"></div>

        <div class="recovery-scene-brand" aria-hidden="true">
          MAZORYA<span>.</span>
        </div>
        <span class="recovery-scene-label" aria-hidden="true">
          ${r("SECURE RECOVERY / 002","بازیابی امن / ۰۲")}
        </span>

        <div
          class="auth-modal-content recovery-card ${a?"rtl-auth":""}"
          role="dialog"
          aria-modal="true"
          aria-labelledby="forgotModalTitle"
          dir="${a?"rtl":"ltr"}"
        >
          <div class="recovery-card-top">
            <span class="recovery-kicker" id="recoveryKicker">
              ${r("ACCOUNT RECOVERY / 01","بازیابی حساب / ۰۱")}
            </span>
            <button
              type="button"
              class="auth-modal-close recovery-close"
              id="closeModalBtn"
              aria-label="${o("close",r("Close","بستن"))}"
            >
              &times;
            </button>
          </div>

          <div class="recovery-symbol" aria-hidden="true">↗</div>

          <div class="auth-modal-header recovery-header">
            <h2 id="forgotModalTitle">
              ${r("Find your way back.","راه بازگشت به مزوریا.")}
            </h2>
            <p id="recoverySubtitle">
              ${r("Every path has a way forward. Enter your email to start your account recovery.","هر مسیری راه بازگشتی دارد. برای شروع بازیابی حساب، ایمیل خود را وارد کنید.")}
            </p>
          </div>

          <div class="recovery-progress" aria-label="${r("Recovery steps","مراحل بازیابی")}">
            <span class="recovery-progress-segment active" aria-hidden="true"></span>
            <span class="recovery-progress-segment" aria-hidden="true"></span>
          </div>

          <!-- Step 1: request verification code -->
          <div id="forgot-step-1" class="auth-modal-step recovery-step active">
            <label class="recovery-label" for="forgot-email">
              ${o("email",r("Email Address","آدرس ایمیل"))}
            </label>
            <div class="input-group recovery-field">
              <div class="input-icon" aria-hidden="true">${X}</div>
              <input
                type="email"
                id="forgot-email"
                placeholder="${o("email",r("Email Address","آدرس ایمیل"))}"
                aria-label="${o("email",r("Email Address","آدرس ایمیل"))}"
                autocomplete="email"
                maxlength="255"
                dir="ltr"
              />
            </div>

            <button
              type="button"
              id="sendCodeBtn"
              class="auth-modal-btn recovery-primary"
            >
              <span>${o("send_code",r("Continue to Verification","دریافت کد تأیید"))}</span>
              <span class="recovery-button-arrow" aria-hidden="true">↗</span>
            </button>
          </div>

          <!-- Step 2: verify code and reset password -->
          <div id="forgot-step-2" class="auth-modal-step recovery-step" hidden>
            <label class="recovery-label" for="reset-code">
              ${o("verification_code",r("Verification Code","کد تأیید"))}
            </label>
            <div class="input-group recovery-field">
              <div class="input-icon" aria-hidden="true">${ae}</div>
              <input
                type="text"
                id="reset-code"
                placeholder="${o("verification_code",r("Verification Code","کد تأیید"))}"
                aria-label="${o("verification_code",r("Verification Code","کد تأیید"))}"
                autocomplete="one-time-code"
                maxlength="6"
                inputmode="numeric"
                dir="ltr"
              />
            </div>

            <label class="recovery-label" for="reset-password">
              ${o("new_password",r("New Password","رمز عبور جدید"))}
            </label>
            <div class="input-group recovery-field">
              <div class="input-icon" aria-hidden="true">${H}</div>
              <input
                type="password"
                id="reset-password"
                placeholder="${o("new_password",r("New Password","رمز عبور جدید"))}"
                aria-label="${o("new_password",r("New Password","رمز عبور جدید"))}"
                autocomplete="new-password"
              />
              <button
                type="button"
                class="password-toggle recovery-eye"
                data-target="reset-password"
                aria-label="${o("show_password",r("Show password","نمایش رمز عبور"))}"
                aria-pressed="false"
              >${z}</button>
            </div>

            <label class="recovery-label" for="reset-confirm-password">
              ${o("confirm_password",r("Confirm Password","تکرار رمز عبور"))}
            </label>
            <div class="input-group recovery-field">
              <div class="input-icon" aria-hidden="true">${H}</div>
              <input
                type="password"
                id="reset-confirm-password"
                placeholder="${o("confirm_password",r("Confirm Password","تکرار رمز عبور"))}"
                aria-label="${o("confirm_password",r("Confirm Password","تکرار رمز عبور"))}"
                autocomplete="new-password"
              />
            </div>

            <button
              type="button"
              id="resetPasswordBtn"
              class="auth-modal-btn recovery-primary"
            >
              <span>${o("reset_password",r("Reset Password","تغییر رمز عبور"))}</span>
              <span class="recovery-button-arrow" aria-hidden="true">↗</span>
            </button>
          </div>

          <div
            id="forgot-message"
            class="auth-message recovery-message"
            role="status"
            aria-live="polite"
            style="display:none;"
          ></div>

          <div class="auth-modal-footer recovery-actions">
            <button
              type="button"
              class="auth-modal-back recovery-back"
              id="backToLoginBtn"
            >
              ${a?"→":"←"}
              ${o("back_to_login",r("Back to Login","بازگشت به ورود"))}
            </button>
          </div>

          <div class="recovery-meta" aria-hidden="true">
            <span>MAZORYA / ACCOUNT ACCESS</span>
            <span>${r("● PRIVATE","● خصوصی")}</span>
          </div>
        </div>
      </div>
    </div>
  `}function u(e,a,r="error"){!e||!e.isConnected||(e.className=`auth-message ${r==="success"?"success":"error"}`,e.textContent=String(a??""),e.style.display="block",e.setAttribute("role",r==="error"?"alert":"status"))}function B(e){e&&(e.textContent="",e.style.display="none")}function _(e,a,r){e&&(e.disabled=a,e.setAttribute("aria-busy",String(a)),a?e.innerHTML=`
      <span class="spinner" aria-hidden="true"></span>
      <span>${Z(r)}</span>
    `:e.textContent=r)}function ie(e,a){var D;const r=e.querySelector("#login-form"),f=e.querySelector("#auth-message"),m=e.querySelector("#loginSubmitBtn"),$=e.querySelector("#forgotPasswordBtn"),t=e.querySelector("#forgotModal"),h=e.querySelector("#closeModalBtn"),k=e.querySelector("#backToLoginBtn"),w=e.querySelector("#forgot-step-1"),b=e.querySelector("#forgot-step-2"),l=e.querySelector("#forgot-message"),p=e.querySelector("#forgot-email"),q=e.querySelector("#sendCodeBtn"),g=e.querySelector("#reset-code"),E=e.querySelector("#reset-password"),A=e.querySelector("#reset-confirm-password"),S=e.querySelector("#resetPasswordBtn");let O=!1,C=!1,M=!1,P=null;e.querySelectorAll(".password-toggle").forEach(n=>{n.addEventListener("click",()=>{const s=n.dataset.target,d=e.querySelector(`#${s}`);if(!d)return;const c=d.type==="password";d.type=c?"text":"password",n.setAttribute("aria-pressed",String(c)),n.setAttribute("aria-label",c?i("hide_password","Hide password"):i("show_password","Show password")),n.innerHTML=c?te:z})}),r==null||r.addEventListener("submit",async n=>{if(n.preventDefault(),O)return;const s=e.querySelector("#login-email"),d=e.querySelector("#login-password"),c=e.querySelector("#remember-me"),v=(s==null?void 0:s.value.trim())||"",x=(d==null?void 0:d.value)||"",R=!!(c!=null&&c.checked);if(B(f),!Y(v)){u(f,i("invalid_email","Please enter a valid email address.")),s==null||s.focus();return}if(!x){u(f,i("password_required","Please enter your password.")),d==null||d.focus();return}O=!0,_(m,!0,i("logging_in","Signing in..."));try{const y=await J(v,x,R);if(!r.isConnected)return;if((y==null?void 0:y.success)===!0){u(f,i("login_success","Login successful! Redirecting..."),"success"),window.location.assign(`/${a}/profile`);return}u(f,F(y,i("login_failed","Incorrect email or password.")))}catch(y){console.error("[Auth] Login failed:",y),u(f,i("server_error","Unable to connect to the server. Please try again."))}finally{O=!1,r.isConnected&&_(m,!1,i("login","Login"))}});function V(n){const s=n===1,d=T(a),c=(U,N)=>d?N:U;w==null||w.classList.toggle("active",s),b==null||b.classList.toggle("active",!s),w&&(w.hidden=!s),b&&(b.hidden=s);const v=t==null?void 0:t.querySelector("#forgotModalTitle"),x=t==null?void 0:t.querySelector("#recoverySubtitle"),R=t==null?void 0:t.querySelector("#recoveryKicker"),y=t==null?void 0:t.querySelectorAll(".recovery-progress-segment");v&&(v.textContent=s?c("Find your way back.","راه بازگشت به مزوریا."):c("A fresh beginning.","یک شروع تازه.")),x&&(x.textContent=s?c("Every path has a way forward. Enter your email to start your account recovery.","هر مسیری راه بازگشتی دارد. برای شروع بازیابی حساب، ایمیل خود را وارد کنید."):c("Enter the verification code and choose a new password to complete your recovery.","کد تأیید را وارد کنید و برای تکمیل بازیابی، رمز عبور جدیدی انتخاب کنید.")),R&&(R.textContent=s?c("ACCOUNT RECOVERY / 01","بازیابی حساب / ۰۱"):c("ACCOUNT RECOVERY / 02","بازیابی حساب / ۰۲")),y==null||y.forEach((U,N)=>{U.classList.toggle("active",N===0||!s)})}function I(){p&&(p.value=""),g&&(g.value=""),E&&(E.value=""),A&&(A.value=""),V(1),B(l),M=!1}function j(){t&&(P=document.activeElement,I(),t.style.display="flex",t.setAttribute("aria-hidden","false"),h==null||h.focus())}function L(){!t||C||(t.style.display="none",t.setAttribute("aria-hidden","true"),I(),P&&typeof P.focus=="function"&&P.isConnected&&P.focus())}$==null||$.addEventListener("click",j),h==null||h.addEventListener("click",L),k==null||k.addEventListener("click",L),(D=t==null?void 0:t.querySelector(".auth-modal-overlay"))==null||D.addEventListener("click",L),t==null||t.addEventListener("keydown",n=>{if(n.key==="Escape"){n.preventDefault(),L();return}if(n.key!=="Tab")return;const s=[...t.querySelectorAll("button:not([disabled]), input:not([disabled])")].filter(v=>v.getClientRects().length>0);if(!s.length)return;const d=s[0],c=s[s.length-1];n.shiftKey&&document.activeElement===d?(n.preventDefault(),c.focus()):!n.shiftKey&&document.activeElement===c&&(n.preventDefault(),d.focus())}),q==null||q.addEventListener("click",async()=>{if(C)return;B(l);const n=(p==null?void 0:p.value.trim())||"";if(!Y(n)){u(l,i("invalid_email","Please enter a valid email address.")),p==null||p.focus();return}C=!0,_(q,!0,i("sending","Sending..."));try{const s=await Q(n);if(!(t!=null&&t.isConnected))return;(s==null?void 0:s.success)===!0?(V(2),u(l,i("code_sent","A verification code has been sent to your email."),"success"),g==null||g.focus()):u(l,F(s,i("send_code_failed","Unable to send the verification code.")))}catch(s){console.error("[Auth] Send code failed:",s),u(l,i("server_error","Unable to connect to the server. Please try again."))}finally{C=!1,t!=null&&t.isConnected&&_(q,!1,i("send_code","Send Reset Code"))}}),S==null||S.addEventListener("click",async()=>{if(C||M)return;B(l);const n=(p==null?void 0:p.value.trim())||"",s=(g==null?void 0:g.value.trim())||"",d=(E==null?void 0:E.value)||"",c=(A==null?void 0:A.value)||"";if(!Y(n)){u(l,i("invalid_email","Please enter a valid email address.")),V(1),p==null||p.focus();return}if(!s||!d||!c){u(l,i("required_fields","Please complete all required fields."));return}if(s.length>6){u(l,i("invalid_code","Please enter a valid verification code."));return}if(d!==c){u(l,i("password_mismatch","Passwords do not match."));return}if(d.length<6){u(l,i("password_length","Password must be at least 6 characters."));return}C=!0,_(S,!0,i("resetting_password","Resetting password..."));try{const v=await W(n,s,d);if(!(t!=null&&t.isConnected))return;(v==null?void 0:v.success)===!0?(M=!0,E.value="",A.value="",g.value="",u(l,i("password_reset_success","Your password has been reset successfully. You can now sign in."),"success"),S.disabled=!0):u(l,F(v,i("reset_failed","Unable to reset the password.")))}catch(v){console.error("[Auth] Reset password failed:",v),u(l,i("server_error","Unable to connect to the server. Please try again."))}finally{C=!1,t!=null&&t.isConnected&&(_(S,!1,i("reset_password","Reset Password")),M&&(S.disabled=!0))}})}function ne(e){const a=e.querySelector("#mazoryaAuthPortal"),r=a==null?void 0:a.querySelector("#portalInteractive");if(!a||!r)return;const f=window.matchMedia("(pointer: fine)").matches,m=window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(!f||m)return;let $=0,t=0,h=0;function k(){$=0,r.isConnected&&(a.style.setProperty("--portal-x",t.toFixed(3)),a.style.setProperty("--portal-y",h.toFixed(3)))}function w(){$||($=requestAnimationFrame(k))}r.addEventListener("pointermove",b=>{const l=r.getBoundingClientRect();!l.width||!l.height||(t=Math.max(-1,Math.min(1,(b.clientX-l.left)/l.width*2-1)),h=Math.max(-1,Math.min(1,(b.clientY-l.top)/l.height*2-1)),w())},{passive:!0}),r.addEventListener("pointerleave",()=>{t=0,h=0,w()})}async function de(){const e=document.getElementById("app");if(!e){console.error("[Auth] #app element not found.");return}const a=K.getCurrentLanguage();if(G()){window.location.assign(`/${a}/profile`);return}e.innerHTML=`
    <div class="mz-auth-shell">
      ${ee()}

      <main
        class="mz-auth"
        id="mazoryaAuth"
        dir="${T(a)?"rtl":"ltr"}"
      >
        ${se(a)}
        ${oe(a)}
      </main>
    </div>
  `,re(),ie(e,a),ne(e),console.log("[Auth] Login page rendered:",a)}export{de as renderAuth};
