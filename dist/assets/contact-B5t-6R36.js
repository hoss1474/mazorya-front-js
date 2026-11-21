import{s as S,m as g}from"./index-BZXsUPAf.js";import{r as x,a as q}from"./header-hNak-YC9.js";import{r as M,a as F}from"./footer-CBaj94Xp.js";const m={phoneDisplay:"+1 626 756 45 09",phoneHref:"+16267564509",email:"info@mazoryagroup.com"};function f(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function o(t,e=""){const n=g.t(t);return n==null||n===""||n===t?e:String(n)}function i(t,e=""){return f(o(t,e))}function y(t){return t==="fa"||t==="ar"}function E(){const t=o("office_address","").trim(),n=t==="123 Business Avenue, Downtown, New York, NY 10001"?"":t,a=n?`
      <div class="contact-info-item">

        <div class="contact-info-icon">
          <img
            src="/assets/img/map-icon.svg"
            alt=""
            aria-hidden="true"
          />
        </div>

        <div>
          <h3>
            ${i("office_title","Our Office")}
          </h3>

          <p>
            ${f(n)}
          </p>
        </div>

      </div>
    `:"";return`
    <div class="contact-info-side">

      <div class="contact-info-header">

        <h1 class="contact-page-title">
          ${i("contact_title","Contact Us")}
        </h1>

        <p>
          ${i("contact_subtitle","Have a question or want to work with us? Fill out the form and we'll get back to you.")}
        </p>

      </div>

      <div class="contact-info-list">

        ${a}

        <div class="contact-info-item">

          <div class="contact-info-icon">
            <img
              src="/assets/img/phone-icon.svg"
              alt=""
              aria-hidden="true"
            />
          </div>

          <div>
            <h3>
              ${i("phone_title","Phone")}
            </h3>

            <a
              href="tel:${m.phoneHref}"
              dir="ltr"
            >
              ${f(m.phoneDisplay)}
            </a>
          </div>

        </div>

        <div class="contact-info-item">

          <div class="contact-info-icon">
            <img
              src="/assets/img/mail-icon.svg"
              alt=""
              aria-hidden="true"
            />
          </div>

          <div>
            <h3>
              ${i("email_title","Email")}
            </h3>

            <a
              href="mailto:${m.email}"
            >
              ${f(m.email)}
            </a>
          </div>

        </div>

      </div>

    </div>
  `}function P(){return`
    <div class="contact-form-side">

      <div class="contact-form-block">

        <form
          id="contact-form"
          method="post"
          novalidate
        >

          <div class="contact-form-row">

            <div class="contact-form-group">

              <label for="contact-name">
                ${i("contact_name","Name")} *
              </label>

              <input
                type="text"
                id="contact-name"
                name="name"
                class="contact-input"
                autocomplete="name"
                maxlength="255"
                required
              />

            </div>

            <div class="contact-form-group">

              <label for="contact-phone">
                ${i("contact_phone","Phone")}
              </label>

              <input
                type="tel"
                id="contact-phone"
                name="phone"
                class="contact-input"
                autocomplete="tel"
                maxlength="20"
                dir="ltr"
              />

            </div>

          </div>

          <div class="contact-form-group">

            <label for="contact-email">
              ${i("contact_email","Email")} *
            </label>

            <input
              type="email"
              id="contact-email"
              name="email"
              class="contact-input"
              autocomplete="email"
              maxlength="255"
              dir="ltr"
              required
            />

          </div>

          <div class="contact-form-group">

            <label for="contact-message">
              ${i("contact_message","Message")} *
            </label>

            <textarea
              id="contact-message"
              name="message"
              class="contact-textarea"
              rows="5"
              maxlength="5000"
              required
            ></textarea>

          </div>

          <button
            type="submit"
            class="contact-submit-btn"
            id="submitBtn"
          >
            ${i("contact_submit","Send Message")}
          </button>

          <div
            id="successMsg"
            class="contact-success-msg"
            role="status"
            aria-live="polite"
            style="display:none;"
          ></div>

          <div
            id="errorMsg"
            class="contact-error-msg"
            role="alert"
            aria-live="assertive"
            style="display:none;"
          ></div>

        </form>

      </div>

    </div>
  `}function A(t){return`
    <section class="contact-page-section">

      <div class="w-layout-blockcontainer container-regular w-container">

        <div class="contact-grid ${y(t)?"rtl-contact":""}">

          ${E()}

          ${P()}

        </div>

      </div>

    </section>
  `}function b(t,e){t.style.display="none",e.style.display="none",t.textContent="",e.textContent=""}function u(t,e,n,a){b(n,a),t.textContent=String(e),t.style.display="block"}function H(t,e){const n=t.name.trim(),a=t.email.trim(),c=t.phone.trim(),r=t.message.trim();if(!n||!a||!r)return o("contact_required_fields","Please fill in all required fields.");const l=e.elements.namedItem("email");return l&&typeof l.checkValidity=="function"&&!l.checkValidity()?o("contact_invalid_email","Please enter a valid email address."):n.length>255?o("contact_invalid_name","Name is too long."):a.length>255?o("contact_invalid_email","Please enter a valid email address."):c.length>20?o("contact_invalid_phone","Phone number is too long."):r.length>5e3?o("contact_message_too_long","Your message is too long."):null}function k(t){const e=t.querySelector("#contact-form");if(!e)return;const n=e.querySelector("#successMsg"),a=e.querySelector("#errorMsg"),c=e.querySelector("#submitBtn");if(!n||!a||!c){console.error("[Contact] Form elements not found.");return}let r=!1;e.addEventListener("submit",async l=>{if(l.preventDefault(),r)return;b(n,a);const d=new FormData(e),_=String(d.get("name")??"").trim(),C=String(d.get("email")??"").trim(),$=String(d.get("phone")??"").trim(),w=String(d.get("message")??"").trim(),p={name:_,email:C,phone:$,message:w,lang:g.getCurrentLanguage()},v=H(p,e);if(v){u(a,v,n,a);return}r=!0,c.disabled=!0,c.setAttribute("aria-busy","true"),c.textContent=o("sending","Sending...");try{const s=await S(p);if(!e.isConnected)return;if((s==null?void 0:s.success)===!0)u(n,o("contact_success","Your message has been sent successfully!"),n,a),e.reset(),console.log("[Contact] Message submitted successfully.");else{const h=typeof(s==null?void 0:s.error)=="string"?s.error:"";u(a,h||o("contact_error","Something went wrong. Please try again."),n,a),console.warn("[Contact] Submission failed:",h)}}catch(s){if(!e.isConnected)return;console.error("[Contact] Unexpected submission error:",s),u(a,o("contact_error","Something went wrong. Please try again."),n,a)}finally{r=!1,e.isConnected&&(c.disabled=!1,c.removeAttribute("aria-busy"),c.textContent=o("contact_submit","Send Message"))}})}async function B(){const t=document.getElementById("app");if(!t){console.error("[Contact] #app element not found.");return}const e=g.getCurrentLanguage();t.innerHTML=`
  ${x()}

  <main
    class="mz-contact"
    id="mazoryaContact"
    dir="${y(e)?"rtl":"ltr"}"
  >
    ${A(e)}
  </main>

  ${M()}
`,q(),F(),k(t),console.log("[Contact] Page rendered:",e)}export{B as renderContact};
