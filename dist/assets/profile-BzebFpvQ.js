import{n as le,j as $e,k as we,l as _e,b as Pe,m as U,p as Se,u as Le,c as Ee,v as je,w as xe}from"./index-BPA8zJGl.js";import{r as ce,a as de}from"./header-C0ExrbOA.js";import{r as ue,a as ve}from"./footer-DjCcTAM_.js";const Me="https://api.mazoryagroup.com/api",qe="/assets/img/default-avatar.png",Ae=5*1024*1024,Ue=5*1024*1024,Ce=["image/jpeg","image/png","image/webp"],Te=["application/pdf","image/jpeg","image/png"],ke=[["dashboard","profile_dashboard","Dashboard"],["projects","profile_projects","My Projects"],["timeline","profile_timeline","Project Timeline"],["messages","profile_messages","Messages"],["invoices","profile_invoices","Invoices"],["settings","profile_settings","Settings"]];let pe=0;function v(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function r(e,s=""){const i=U.t(e);return i==null||i===""||i===e?s:String(i)}function t(e,s=""){return v(r(e,s))}function H(e){return e==="fa"||e==="ar"}function T(e,s=""){return typeof e=="string"||typeof e=="number"?String(e):s}function W(e){const s=Number(e);return Number.isFinite(s)?s:0}function Be(e){return Math.min(100,Math.max(0,W(e)))}function I(e){return W(e).toLocaleString("en-US",{maximumFractionDigits:2})}function De(){const e=U.getCurrentLanguage();return{en:"en-US",fa:"fa-IR",ar:"ar-SA",fr:"fr-FR",de:"de-DE",es:"es-ES",tr:"tr-TR"}[e]||"en-US"}function ge(e){if(!e)return null;const s=new Date(e);return Number.isNaN(s.getTime())?null:s}function V(e){const s=ge(e);return s?new Intl.DateTimeFormat(De(),{year:"numeric",month:"short",day:"numeric"}).format(s):r("unknown","—")}function Ne(e){const s=ge(e);if(!s)return null;const i=new Date,n=Date.UTC(i.getFullYear(),i.getMonth(),i.getDate()),d=Date.UTC(s.getFullYear(),s.getMonth(),s.getDate());return Math.ceil((d-n)/864e5)}function R(e,s=null){if(typeof e!="string"||!e.trim())return s;const i=e.trim();if(i.startsWith("//")||/^[a-z][a-z\d+.-]*:/i.test(i)&&!/^https?:\/\//i.test(i))return s;try{const n=window.location.origin,d=new URL(Me,n).origin;let l;return/^https?:\/\//i.test(i)?l=new URL(i):i.startsWith("/assets/")||i.startsWith("assets/")?l=new URL(i.startsWith("/")?i:`/${i}`,n):l=new URL(`/${i.replace(/^\/+/,"")}`,d),l.protocol!=="http:"&&l.protocol!=="https:"?s:l.href}catch{return s}}function N(e,s){return T((e==null?void 0:e.error)||(e==null?void 0:e.message),s)}function c(e,s="info"){document.querySelectorAll(".toast-message").forEach(d=>d.remove());const i=document.createElement("div"),n=["success","error","warning","info"].includes(s)?s:"info";i.className=`toast-message ${n}`,i.textContent=String(e),i.setAttribute("role","status"),document.body.appendChild(i),requestAnimationFrame(()=>{i.classList.add("show")}),setTimeout(()=>{i.classList.remove("show"),setTimeout(()=>{i.remove()},300)},3500)}function A(e,s){e&&(e.disabled=s,e.setAttribute("aria-busy",String(s)))}function fe(e){return T((e==null?void 0:e.full_name)||(e==null?void 0:e.name)||"")}function Ie(e){return R((e==null?void 0:e.avatar_url)||(e==null?void 0:e.avatar),qe)}function ye(e){return T((e==null?void 0:e.project_name)||(e==null?void 0:e.name)||(e==null?void 0:e.title),r("untitled_project","Untitled Project"))}function he(e){return T(e==null?void 0:e.status).trim().toLowerCase()}function Re(e){return["completed","complete","done","finished"].includes(he(e))}function me(e){return["active","in_progress","in-progress","ongoing"].includes(he(e))}function O(e){return Be((e==null?void 0:e.project_progress)??(e==null?void 0:e.progress)??0)}function Fe(e){const s=e.filter(me).length,i=e.filter(Re).length,n=e.find(me)||e[0];return{activeProjects:s,completedProjects:i,projectProgress:n?O(n):0}}function C(e){return`
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      aria-hidden="true"
    >
      ${{dashboard:`
      <rect x="3" y="3" width="7" height="7"/>
      <rect x="14" y="3" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/>
    `,projects:`
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
    `,timeline:`
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    `,messages:`
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    `,invoices:`
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="8" y1="13" x2="16" y2="13"/>
      <line x1="8" y1="17" x2="16" y2="17"/>
    `,settings:`
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15l1.5 1.5-2.4 2.4L17 17.4a8 8 0 0 1-2 1.2V21h-4v-2.4a8 8 0 0 1-2-1.2l-1.5 1.5-2.4-2.4L6.6 15a8 8 0 0 1-1.2-2H3V9h2.4a8 8 0 0 1 1.2-2L5.1 5.5l2.4-2.4L9 4.6a8 8 0 0 1 2-1.2V1h4v2.4a8 8 0 0 1 2 1.2l1.5-1.5 2.4 2.4L19.4 7a8 8 0 0 1 1.2 2H23v4h-2.4a8 8 0 0 1-1.2 2z"/>
    `,logout:`
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    `}[e]||""}
    </svg>
  `}function ze(e,s){const n=T(e==null?void 0:e.status,"active").toLowerCase()==="active",d=ke.map(([l,y,g],f)=>`
      <a
        href="#"
        class="nav-item ${f===0?"active":""}"
        data-tab="${l}"
        aria-current="${f===0?"page":"false"}"
      >
        ${C(l)}
        <span>${t(y,g)}</span>
        ${l==="messages"?`
              <span
                class="nav-badge"
                id="unreadCount"
                style="display:none;"
              >0</span>
            `:""}
      </a>
    `).join("");return`
    <aside
      class="profile-sidebar ${H(s)?"rtl-sidebar":""}"
      id="profileSidebar"
    >

      <button
        type="button"
        class="sidebar-close"
        id="sidebarClose"
        aria-label="${t("close","Close")}"
      >✕</button>

      <div class="profile-avatar">

        <div class="avatar-wrapper">

          <img
            src="${v(Ie(e))}"
            alt="${t("profile","Profile")}"
            id="profileAvatar"
          />

          <label
            for="avatarUpload"
            class="avatar-upload-btn"
            title="${t("upload_avatar","Change avatar")}"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
              <circle cx="12" cy="13" r="4"/>
            </svg>
          </label>

          <input
            type="file"
            id="avatarUpload"
            accept=".jpg,.jpeg,.png,.webp"
            style="display:none;"
          />

        </div>

        <h3 id="profileName">
          ${v(fe(e))}
        </h3>

        <p id="profileEmail">
          ${v(e==null?void 0:e.email)}
        </p>

        ${e!=null&&e.phone?`
              <p class="profile-phone">
                📱 ${v(e.phone)}
              </p>
            `:""}

        ${e!=null&&e.company_name?`
              <p class="profile-company">
                🏢 ${v(e.company_name)}
              </p>
            `:""}

        <span class="profile-badge ${n?"active":"inactive"}">
          ${n?t("active","Active"):t("inactive","Inactive")}
        </span>

      </div>

      <nav class="profile-nav">
        ${d}
      </nav>

      <button
        type="button"
        class="logout-btn"
        id="logoutBtn"
      >
        ${C("logout")}
        <span>${t("logout","Logout")}</span>
      </button>

    </aside>
  `}function He(e,s){const i=Fe(s),n=W(e==null?void 0:e.amount),d=[{icon:"📊",label:t("active_projects","Active Projects"),value:i.activeProjects},{icon:"✅",label:t("completed_projects","Completed Projects"),value:i.completedProjects},{icon:"💰",label:t("total_amount","Total Amount"),value:`$${I(n)}`},{icon:"📈",label:t("project_progress","Project Progress"),value:`${i.projectProgress}%`}];return`
    <div class="dashboard-header">
      <h1>
        ${t("welcome_back","Welcome back")}!
      </h1>

      <p>
        ${t("dashboard_subtitle","Here's what's happening with your projects.")}
      </p>
    </div>

    <div class="stats-grid">
      ${d.map(l=>`
        <div class="stat-card">
          <div class="stat-icon">
            ${l.icon}
          </div>

          <div class="stat-info">
            <h3>${l.label}</h3>
            <p class="stat-number">
              ${v(l.value)}
            </p>
          </div>
        </div>
      `).join("")}
    </div>

    <div class="recent-activity">
      <h3>
        ${t("recent_activity","Recent Activity")}
      </h3>

      <div class="activity-list" id="activityList">
        <div class="activity-item">
          <div class="activity-icon">📈</div>

          <div class="activity-content">
            <p>
              <strong>
                ${t("project_progress","Project Progress")}:
                ${i.projectProgress}%
              </strong>
            </p>

            <span class="activity-time">
              ${t("current_overview","Current overview")}
            </span>
          </div>
        </div>
      </div>
    </div>
  `}function Ve(e){const s=`
    <div class="projects-header">
      <h1>${t("my_projects","My Projects")}</h1>
    </div>
  `;if(!e.length)return`
      ${s}

      <div class="no-projects">
        <p>${t("no_projects","No projects found.")}</p>
      </div>
    `;const i=e.map((n,d)=>{const l=O(n),y=Array.isArray(n.payments)?n.payments:[],g=`project-accordion-${d}`;return`
      <div class="project-accordion-item">

        <button
          type="button"
          class="project-accordion-header"
          data-project="${g}"
          aria-controls="${g}"
          aria-expanded="false"
        >
          <div class="project-info">

            <h3 class="project-name">
              ${v(ye(n))}
            </h3>

            <div class="project-meta">

              <span class="project-type">
                ${t("project_type","Type")}:
                ${v(n.project_type||"—")}
              </span>

              <span class="project-progress-badge">
                ${t("progress","Progress")}:
                ${l}%
              </span>

              <span class="project-amount">
                ${t("total_amount","Total Amount")}:
                $${I(n.amount)}
              </span>

            </div>
          </div>

          <div class="project-toggle-icon">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
        </button>

        <div
          class="project-accordion-content"
          id="${g}"
          style="display:none;"
        >
          <div class="payments-list">
            <h4>
              ${t("payment_plans","Payment Installments")}
            </h4>

            ${y.length?y.map(f=>{const p=f.status==="paid";return`
                    <div class="payment-item">
                      <div class="payment-info">
                        <span class="payment-title">
                          ${v(f.title||r("installment","Installment"))}
                        </span>

                        <span class="payment-amount">
                          $${I(f.amount)}
                        </span>
                      </div>

                      <div class="payment-status ${p?"paid":"pending"}">
                        ${p?`✓ ${t("paid","Paid")}`:`⏳ ${t("pending","Pending")}`}
                      </div>
                    </div>
                  `}).join(""):`
                  <p class="no-payments">
                    ${t("no_payments","No installments found.")}
                  </p>
                `}
          </div>
        </div>

      </div>
    `}).join("");return`
    ${s}

    <div class="projects-list-accordion">
      ${i}
    </div>
  `}function We(e){return[["start","Project Started",0,0],["research_phase","Research",25,10],["design_phase","Design",50,35],["development_phase","Development",75,50],["launch","Launch",100,90]].map(([i,n,d,l])=>{let y="pending";return e>=d?y="completed":e>=l&&(y="active"),{title:r(i,n),status:y}})}function Oe(e){const s=`
    <div class="timeline-header">
      <h1>
        ${t("project_timeline","Project Timeline")}
      </h1>

      <p>
        ${t("timeline_subtitle","Track the progress of your projects.")}
      </p>
    </div>
  `;if(!e.length)return`
      ${s}
      <div class="no-projects-timeline">
        <p>${t("no_projects","No projects found.")}</p>
      </div>
    `;const i=e.map(n=>{const d=O(n),l=n.created_start||n.start_date||n.created_at,y=n.created_end||n.end_date,g=Ne(y),f=We(d);return`
      <div class="project-timeline-card">

        <div class="project-timeline-header">

          <div class="project-title-section">
            <h3 class="project-timeline-name">
              ${v(ye(n))}
            </h3>

            <span class="project-progress-badge">
              ${d}%
            </span>
          </div>

          <div class="project-timeline-dates">

            <div class="date-item">
              <span class="date-label">
                ${t("project_type","Project Type")}:
              </span>

              <span class="date-value">
                ${v(n.project_type||"—")}
              </span>
            </div>

            <div class="date-item">
              <span class="date-label">
                ${t("start_date","Start Date")}:
              </span>

              <span class="date-value">
                ${v(V(l))}
              </span>
            </div>

            <div class="date-item">
              <span class="date-label">
                ${t("end_date","End Date")}:
              </span>

              <span class="date-value">
                ${v(V(y))}
              </span>
            </div>

            ${g!==null?`
                  <div class="date-item">
                    <span class="date-label">
                      ${t("days_remaining","Days Remaining")}:
                    </span>

                    <span class="date-value ${g<0?"overdue":""}">
                      ${Math.max(0,g)}
                    </span>
                  </div>
                `:""}

          </div>
        </div>

        <div class="timeline-progress-container">
          <div class="timeline-progress-bar">

            <div
              class="timeline-progress-fill"
              style="width:${d}%;"
            >
              <span class="progress-tooltip">
                ${d}%
              </span>
            </div>

          </div>
        </div>

        <div class="timeline-milestones-container">
          <div class="milestones-timeline">

            ${f.map((p,h)=>{const w={completed:"✓",active:"●",pending:"○"},x={completed:r("completed","Completed"),active:r("in_progress","In Progress"),pending:r("pending","Pending")};return`
                <div
                  class="timeline-milestone-item ${p.status}"
                  style="--milestone-index:${h};"
                >
                  <div class="milestone-connector"></div>

                  <div class="milestone-node">
                    <span class="milestone-icon">
                      ${w[p.status]}
                    </span>
                  </div>

                  <div class="milestone-info">
                    <h4 class="milestone-title">
                      ${v(p.title)}
                    </h4>

                    <p class="milestone-status">
                      ${v(x[p.status])}
                    </p>
                  </div>
                </div>
              `}).join("")}

          </div>
        </div>

      </div>
    `}).join("");return`
    ${s}

    <div class="projects-timeline-list">
      ${i}
    </div>
  `}function Ge(){return`
    <div class="messages-header">

      <h1>
        ${t("messages","Messages")}
      </h1>

      <button
        type="button"
        class="btn-new-message"
        id="newMessageBtn"
      >
        ${C("messages")}
        ${t("new_message","New Message")}
      </button>
    </div>

    <div class="messages-container">

      <div class="messages-list" id="messagesList">
        <div class="no-messages">
          <p>
            ${t("messages_unavailable","Messaging is not connected to the server yet.")}
          </p>
        </div>
      </div>

      <div
        class="message-panel"
        id="messagePanel"
        style="display:none;"
      >
        <div class="message-panel-header">
          <button
            type="button"
            class="back-to-messages"
            id="backToMessages"
          >
            ← ${t("back","Back")}
          </button>

          <h3 id="messageReceiver">
            ${t("support_team","Support Team")}
          </h3>
        </div>

        <div
          class="message-conversation"
          id="messageConversation"
        ></div>

        <div class="message-input-area">
          <textarea
            id="messageInput"
            placeholder="${t("type_message","Type your message...")}"
          ></textarea>

          <button
            type="button"
            id="sendMessageBtn"
            aria-label="${t("send","Send")}"
          >
            ${C("messages")}
          </button>
        </div>
      </div>
    </div>

    <div
      class="modal"
      id="newMessageModal"
      style="display:none;"
    >
      <div class="modal-content">

        <div class="modal-header">
          <h3>${t("new_message","New Message")}</h3>

          <button
            type="button"
            class="modal-close"
            aria-label="${t("close","Close")}"
          >&times;</button>
        </div>

        <div class="modal-body">
          <input
            type="text"
            id="messageTo"
            class="modal-input"
            placeholder="${t("to","To")}"
          />

          <input
            type="text"
            id="messageSubject"
            class="modal-input"
            placeholder="${t("subject","Subject")}"
          />

          <textarea
            id="messageBody"
            rows="5"
            class="modal-textarea"
            placeholder="${t("message","Message")}"
          ></textarea>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn-cancel"
          >
            ${t("cancel","Cancel")}
          </button>

          <button
            type="button"
            class="btn-send"
            id="sendNewMessageBtn"
          >
            ${t("send","Send")}
          </button>
        </div>

      </div>
    </div>
  `}function Ye(e){const s=`
    <div class="invoices-header">
      <h1>
        ${t("invoices","Invoices & Payments")}
      </h1>

      <button
        type="button"
        class="btn-upload-invoice"
        id="uploadInvoiceBtn"
      >
        ${C("invoices")}
        ${t("upload_invoice","Upload Invoice")}
      </button>
    </div>
  `,i=e.length?e.map(n=>{const d=n.status==="paid",l=R(n.file_url);return`
        <div class="invoice-card">

          <div class="invoice-status ${d?"paid":"pending"}"></div>

          <div class="invoice-info">

            <h4>
              ${v(n.invoice_number||n.title||"Invoice")}
            </h4>

            <p>
              ${v(n.description)}
            </p>

            <span class="invoice-date">
              ${t("issued","Issued")}:
              ${v(V(n.created_at))}
            </span>

          </div>

          <div class="invoice-amount">
            $${I(n.amount)}
          </div>

          <div class="invoice-actions">

            ${n.status==="pending"?`
                  <button
                    type="button"
                    class="btn-pay"
                  >
                    ${t("pay_now","Pay Now")}
                  </button>
                `:""}

            <button
              type="button"
              class="btn-download"
              ${l?`data-file-url="${v(l)}"`:"disabled"}
              title="${t("download","Download")}"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            </button>

          </div>
        </div>
      `}).join(""):`
      <div class="no-invoices">
        <p>
          ${t("no_invoices","No invoices found.")}
        </p>
      </div>
    `;return`
    ${s}

    <div class="invoices-list" id="invoicesList">
      ${i}
    </div>

    <div
      class="modal"
      id="uploadInvoiceModal"
      style="display:none;"
    >
      <div class="modal-content">

        <div class="modal-header">
          <h3>
            ${t("upload_invoice","Upload Invoice")}
          </h3>

          <button
            type="button"
            class="modal-close"
            aria-label="${t("close","Close")}"
          >&times;</button>
        </div>

        <div class="modal-body">

          <div class="upload-area" id="uploadArea">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              aria-hidden="true"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>

            <p>
              ${t("drag_drop","Drag & drop your invoice here")}
            </p>

            <p class="upload-hint">
              ${t("supported_formats","Supported: PDF, JPG, PNG (max 5MB)")}
            </p>

            <input
              type="file"
              id="invoiceFile"
              accept=".pdf,.jpg,.jpeg,.png"
              style="display:none;"
            />

            <button
              type="button"
              class="btn-browse"
              id="browseFileBtn"
            >
              ${t("browse_files","Browse Files")}
            </button>

            <p id="selectedInvoiceName"></p>
          </div>

          <div
            class="auth-input-group"
            style="margin-top:15px;"
          >
            <label for="invoiceProjectId">
              ${t("project_id","Project ID")}
            </label>

            <input
              type="text"
              id="invoiceProjectId"
              class="auth-input"
              placeholder="${t("enter_project_id","Enter project ID")}"
            />
          </div>

          <div class="auth-input-group">
            <label for="invoiceNumber">
              ${t("invoice_number","Invoice Number")}
            </label>

            <input
              type="text"
              id="invoiceNumber"
              class="auth-input"
              placeholder="INV-001"
              maxlength="100"
            />
          </div>

          <div
            id="uploadProgress"
            style="display:none;"
          >
            <div class="progress-bar">
              <div
                class="progress-fill"
                style="width:0%;"
              ></div>
            </div>

            <p class="upload-status">
              ${t("uploading","Uploading...")}
            </p>
          </div>

        </div>

        <div class="modal-footer">

          <button
            type="button"
            class="btn-cancel"
          >
            ${t("cancel","Cancel")}
          </button>

          <button
            type="button"
            class="btn-upload"
            id="confirmUploadBtn"
            disabled
          >
            ${t("upload","Upload")}
          </button>

        </div>

      </div>
    </div>
  `}function Je(e){const s={name:v(fe(e)),email:v(e==null?void 0:e.email),phone:v(e==null?void 0:e.phone),company:v(e==null?void 0:e.company_name),website:v(e==null?void 0:e.website)};return`
    <div class="settings-header">
      <h1>${t("settings","Settings")}</h1>

      <p>
        ${t("settings_subtitle","Manage your account settings and preferences")}
      </p>
    </div>

    <div class="settings-form">

      <div class="settings-section">
        <h3>
          ${t("personal_info","Personal Information")}
        </h3>

        <div class="form-row">

          <div class="form-group">
            <label for="settingsName">
              ${t("full_name","Full Name")}
            </label>

            <input
              type="text"
              id="settingsName"
              class="settings-input"
              value="${s.name}"
              maxlength="255"
              autocomplete="name"
            />
          </div>

          <div class="form-group">
            <label for="settingsEmail">
              ${t("email","Email")}
            </label>

            <input
              type="email"
              id="settingsEmail"
              class="settings-input"
              value="${s.email}"
              readonly
              disabled
            />
          </div>

        </div>

        <div class="form-row">

          <div class="form-group">
            <label for="settingsPhone">
              ${t("phone","Phone")}
            </label>

            <input
              type="tel"
              id="settingsPhone"
              class="settings-input"
              value="${s.phone}"
              maxlength="20"
            />
          </div>

          <div class="form-group">
            <label for="settingsCompany">
              ${t("company","Company")}
            </label>

            <input
              type="text"
              id="settingsCompany"
              class="settings-input"
              value="${s.company}"
              maxlength="255"
            />
          </div>

        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="settingsWebsite">
              ${t("website","Website")}
            </label>

            <input
              type="url"
              id="settingsWebsite"
              class="settings-input"
              value="${s.website}"
            />
          </div>
        </div>
      </div>

      <div class="settings-section">

        <h3>
          ${t("change_password","Change Password")}
        </h3>

        <div class="form-row">
          <div class="form-group">
            <label for="currentPassword">
              ${t("current_password","Current Password")}
            </label>

            <input
              type="password"
              id="currentPassword"
              class="settings-input"
              autocomplete="current-password"
            />
          </div>
        </div>

        <div class="form-row">

          <div class="form-group">
            <label for="newPassword">
              ${t("new_password","New Password")}
            </label>

            <input
              type="password"
              id="newPassword"
              class="settings-input"
              autocomplete="new-password"
            />
          </div>

          <div class="form-group">
            <label for="confirmPassword">
              ${t("confirm_password","Confirm Password")}
            </label>

            <input
              type="password"
              id="confirmPassword"
              class="settings-input"
              autocomplete="new-password"
            />
          </div>

        </div>

        <button
          type="button"
          class="btn-change-password"
          id="changePasswordBtn"
        >
          ${t("update_password","Update Password")}
        </button>

      </div>

      <div class="settings-actions">

        <button
          type="button"
          class="btn-save-settings"
          id="saveSettingsBtn"
        >
          ${t("save_changes","Save Changes")}
        </button>

        <button
          type="button"
          class="btn-delete-account"
          id="deleteAccountBtn"
        >
          ${t("delete_account","Delete Account")}
        </button>

      </div>

    </div>
  `}function Xe(e,s,i){var Q,ee,te,se,ae,ne,ie;const n=e.querySelector("#profileSidebar"),d=[...e.querySelectorAll(".profile-nav .nav-item")],l=[...e.querySelectorAll(".profile-tab")];function y(a){d.forEach(o=>{const u=o.dataset.tab===a;o.classList.toggle("active",u),o.setAttribute("aria-current",u?"page":"false")}),l.forEach(o=>{o.classList.toggle("active",o.id===`tab-${a}`)}),n==null||n.classList.remove("open")}d.forEach(a=>{a.addEventListener("click",o=>{o.preventDefault(),y(a.dataset.tab)})}),(Q=e.querySelector("#mobileMenuToggle"))==null||Q.addEventListener("click",()=>{n==null||n.classList.toggle("open")}),(ee=e.querySelector("#sidebarClose"))==null||ee.addEventListener("click",()=>{n==null||n.classList.remove("open")}),e.querySelectorAll(".project-accordion-header").forEach(a=>{a.addEventListener("click",()=>{const o=a.closest(".project-accordion-item"),u=o==null?void 0:o.querySelector(".project-accordion-content");if(!u)return;const m=u.style.display!=="block";e.querySelectorAll(".project-accordion-content").forEach($=>{var E;$.style.display="none",(E=$.closest(".project-accordion-item"))==null||E.classList.remove("open")}),e.querySelectorAll(".project-accordion-header").forEach($=>{$.setAttribute("aria-expanded","false")}),m&&(u.style.display="block",o.classList.add("open"),a.setAttribute("aria-expanded","true"))})});const g=e.querySelector("#logoutBtn");g==null||g.addEventListener("click",async()=>{if(!g.disabled){A(g,!0);try{await Se()}catch(a){console.error("[Profile] Logout error:",a)}finally{window.location.replace(`/${U.getCurrentLanguage()}/auth`)}}});const f=e.querySelector("#saveSettingsBtn");f==null||f.addEventListener("click",async()=>{var $,E,S,oe;if(f.disabled)return;const a=(($=e.querySelector("#settingsName"))==null?void 0:$.value.trim())||"",o=((E=e.querySelector("#settingsPhone"))==null?void 0:E.value.trim())||"",u=((S=e.querySelector("#settingsCompany"))==null?void 0:S.value.trim())||"",m=((oe=e.querySelector("#settingsWebsite"))==null?void 0:oe.value.trim())||"";if(!a){c(r("name_required","Please enter your name."),"error");return}if(m)try{const j=new URL(m);if(!["http:","https:"].includes(j.protocol))throw new Error("Invalid protocol")}catch{c(r("invalid_website","Please enter a valid website URL."),"error");return}A(f,!0);try{const j=await Le({full_name:a,phone:o,company_name:u,website:m});if(j!=null&&j.success){c(r("settings_saved","Settings saved successfully!"),"success");const re=e.querySelector("#profileName");re&&(re.textContent=a)}else c(N(j,r("update_failed","Update failed.")),"error")}catch(j){console.error("[Profile] Update failed:",j),c(r("server_error","Server connection failed."),"error")}finally{A(f,!1)}});const p=e.querySelector("#changePasswordBtn");p==null||p.addEventListener("click",async()=>{if(p.disabled)return;const a=e.querySelector("#currentPassword"),o=e.querySelector("#newPassword"),u=e.querySelector("#confirmPassword"),m=(a==null?void 0:a.value)||"",$=(o==null?void 0:o.value)||"",E=(u==null?void 0:u.value)||"";if(!m||!$||!E){c(r("required_fields","Please complete all fields."),"error");return}if($!==E){c(r("password_mismatch","Passwords do not match."),"error");return}if($.length<8){c(r("password_length","Password must be at least 8 characters."),"error");return}A(p,!0);try{const S=await Ee(m,$);S!=null&&S.success?(c(r("password_changed","Password changed successfully!"),"success"),a.value="",o.value="",u.value=""):c(N(S,r("password_change_failed","Password change failed.")),"error")}catch(S){console.error("[Profile] Password change error:",S),c(r("server_error","Server connection failed."),"error")}finally{A(p,!1)}});const h=e.querySelector("#avatarUpload"),w=e.querySelector("#profileAvatar");h==null||h.addEventListener("change",async()=>{var o;const a=(o=h.files)==null?void 0:o[0];if(a){if(!Ce.includes(a.type)){c(r("invalid_image","Please select a JPG, PNG or WebP image."),"error"),h.value="";return}if(a.size>Ae){c(r("file_too_large","Maximum file size is 5MB."),"error"),h.value="";return}h.disabled=!0;try{const u=await je(a);if(u!=null&&u.success){const m=R(u.avatarUrl);m&&(w!=null&&w.isConnected)&&(w.src=m),c(r("avatar_updated","Avatar updated successfully!"),"success")}else c(N(u,r("upload_failed","Upload failed.")),"error")}catch(u){console.error("[Profile] Avatar error:",u),c(r("upload_failed","Upload failed."),"error")}finally{h.disabled=!1,h.value=""}}});function x(a){a&&(a.style.display="flex")}function G(a){a&&(a.style.display="none")}e.querySelectorAll(".modal-close, .btn-cancel").forEach(a=>{a.addEventListener("click",()=>{G(a.closest(".modal"))})});const Y=e.querySelector("#uploadInvoiceModal"),F=e.querySelector("#uploadInvoiceBtn"),z=e.querySelector("#browseFileBtn"),M=e.querySelector("#invoiceFile"),b=e.querySelector("#uploadArea"),k=e.querySelector("#uploadProgress"),q=e.querySelector("#confirmUploadBtn"),_=e.querySelector("#invoiceProjectId"),P=e.querySelector("#invoiceNumber"),J=e.querySelector("#selectedInvoiceName");let L=null,B=!1;F==null||F.addEventListener("click",()=>{x(Y)}),z==null||z.addEventListener("click",()=>{M==null||M.click()});function X(a){return a?Te.includes(a.type)?a.size>Ue?(c(r("file_too_large","Maximum file size is 5MB."),"error"),!1):!0:(c(r("invalid_file","Only PDF, JPG and PNG files are supported."),"error"),!1):!1}function D(){!q||B||(q.disabled=!(L&&(_!=null&&_.value.trim())&&(P!=null&&P.value.trim())))}function Z(a){L=X(a)?a:null,J&&(J.textContent=(L==null?void 0:L.name)||""),D()}M==null||M.addEventListener("change",()=>{var a;Z((a=M.files)==null?void 0:a[0])}),_==null||_.addEventListener("input",D),P==null||P.addEventListener("input",D),b==null||b.addEventListener("dragover",a=>{a.preventDefault(),b.classList.add("dragover")}),b==null||b.addEventListener("dragleave",()=>{b.classList.remove("dragover")}),b==null||b.addEventListener("drop",a=>{var o,u;a.preventDefault(),b.classList.remove("dragover"),Z((u=(o=a.dataTransfer)==null?void 0:o.files)==null?void 0:u[0])}),q==null||q.addEventListener("click",async()=>{if(B)return;const a=_==null?void 0:_.value.trim(),o=P==null?void 0:P.value.trim();if(!L||!a||!o){c(r("required_fields","Please complete all fields."),"error");return}if(!X(L))return;if(!i.some(m=>String(m.id)===a)){c(r("invalid_project","Please enter an ID from your own projects."),"error");return}B=!0,A(q,!0),k&&(k.style.display="block"),b&&(b.style.display="none");try{const m=await xe(a,o,L);m!=null&&m.success?(c(r("invoice_uploaded","Invoice uploaded successfully!"),"success"),G(Y),window.location.reload()):c(N(m,r("upload_failed","Upload failed.")),"error")}catch(m){console.error("[Profile] Invoice upload error:",m),c(r("upload_failed","Upload failed."),"error")}finally{B=!1,k&&(k.style.display="none"),b&&(b.style.display=""),D()}}),e.querySelectorAll(".btn-download").forEach(a=>{a.addEventListener("click",()=>{const o=R(a.dataset.fileUrl);if(!o){c(r("file_unavailable","File not available."),"error");return}window.open(o,"_blank","noopener,noreferrer")})}),e.querySelectorAll(".btn-pay").forEach(a=>{a.addEventListener("click",()=>{c(r("payment_unavailable","Online payment is not available here yet."),"info")})});const be=e.querySelector("#newMessageModal");(te=e.querySelector("#newMessageBtn"))==null||te.addEventListener("click",()=>{x(be)});const K=()=>{c(r("messages_unavailable","Messaging is not connected to the server yet."),"info")};(se=e.querySelector("#sendNewMessageBtn"))==null||se.addEventListener("click",K),(ae=e.querySelector("#sendMessageBtn"))==null||ae.addEventListener("click",K),(ne=e.querySelector("#backToMessages"))==null||ne.addEventListener("click",()=>{const a=e.querySelector("#messagesList"),o=e.querySelector("#messagePanel");a&&(a.style.display=""),o&&(o.style.display="none")}),(ie=e.querySelector("#deleteAccountBtn"))==null||ie.addEventListener("click",()=>{c(r("delete_unavailable","Account deletion is not available through this page yet. Please contact support."),"warning")})}async function et(){var x;const e=document.getElementById("app");if(!e){console.error("[Profile] #app not found.");return}const s=U.getCurrentLanguage(),i=window.location.pathname,n=++pe;if(!le()){window.location.replace(`/${s}/auth`);return}const d=$e(),[l,y,g]=await Promise.allSettled([we(),_e(),Pe()]);if(!le()){window.location.replace(`/${s}/auth`);return}if(n!==pe||window.location.pathname!==i||U.getCurrentLanguage()!==s)return;const f=l.status==="fulfilled"?l.value:null,p=f||d,h=y.status==="fulfilled"&&Array.isArray(y.value)?y.value:[],w=g.status==="fulfilled"&&Array.isArray(g.value)?g.value:[];if(!p){e.innerHTML=`
  ${ce()}

  <div
    class="mz-profile"
    id="mazoryaProfile"
    dir="${H(s)?"rtl":"ltr"}"
  >
    <section class="profile-section">
      <div class="profile-container profile-error-container">
        <div class="no-projects">
          <h1>
            ${t("profile_unavailable","Unable to load your profile.")}
          </h1>

          <p>
            ${t("try_again","Please try again.")}
          </p>

          <button
            type="button"
            class="primary-button"
            id="retryProfile"
          >
            ${t("retry","Retry")}
          </button>
        </div>
      </div>
    </section>
  </div>

  ${ue()}
`,de(),ve(),(x=e.querySelector("#retryProfile"))==null||x.addEventListener("click",()=>{window.location.reload()});return}e.innerHTML=`
  ${ce()}

  <div
    class="mz-profile"
    id="mazoryaProfile"
    dir="${H(s)?"rtl":"ltr"}"
  >
    <section class="profile-section">
      <div class="profile-container">

        ${ze(p,s)}

        <button
          type="button"
          class="mobile-menu-toggle"
          id="mobileMenuToggle"
          aria-label="${t("open_menu","Open menu")}"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>

        <main class="profile-main">

          <div
            id="tab-dashboard"
            class="profile-tab active"
          >
            ${He(p,h)}
          </div>

          <div id="tab-projects" class="profile-tab">
            ${Ve(h)}
          </div>

          <div id="tab-timeline" class="profile-tab">
            ${Oe(h)}
          </div>

          <div id="tab-messages" class="profile-tab">
            ${Ge()}
          </div>

          <div id="tab-invoices" class="profile-tab">
            ${Ye(w)}
          </div>

          <div id="tab-settings" class="profile-tab">
            ${Je(p)}
          </div>

        </main>
      </div>
    </section>
  </div>

  ${ue()}
`,de(),ve(),Xe(e,p,h),console.log("[Profile] Rendered successfully.",{projects:h.length,invoices:w.length,profileFromServer:!!f})}export{et as renderProfile};
