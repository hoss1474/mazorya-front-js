import{n as Y,k as K,g as Q,l as J,e as X,m as e,p as Z,u as ee,c as te,r as se,t as ae}from"./index-OOzpxp90.js";import{c as ne,r as oe,b as ie,a as le}from"./footer-CboKM8tC.js";async function $e(){const d=document.getElementById("app"),v=e.getCurrentLanguage(),n=v==="fa"||v==="ar";if(!Y()){window.location.href=`/${v}/auth`;return}let s=null;try{s=K(),console.log("User data from localStorage:",s)}catch(o){console.error("Error getting user data:",o)}if(!s)try{const o=Q();if(o){const r=await(await fetch(`${API_BASE}/user/profile`,{headers:{Authorization:`Bearer ${o}`,"Content-Type":"application/json"}})).json();console.log("Profile API response:",r),r.status&&r.data&&(s=r.data,localStorage.setItem("user_data",JSON.stringify(s)))}}catch(o){console.error("Failed to fetch profile from API:",o)}s||(s={full_name:"",email:"",phone:"",company_name:"",website:"",avatar:null,status:"active",project_progress:0,amount:0});let c=[],b=[],w=0;try{if(c=await J(),b=await X(),console.log("Projects:",c),console.log("Invoices:",b),c&&c.length>0){const o=c.find(u=>u.status==="active")||c[0];w=(o==null?void 0:o.project_progress)||0,console.log("📊 Project progress from API:",w)}}catch(o){console.error("Failed to fetch projects/invoices:",o)}const $=(s==null?void 0:s.full_name)||"",y=(s==null?void 0:s.email)||"",_=(s==null?void 0:s.phone)||"",j=(s==null?void 0:s.company_name)||"",B=(s==null?void 0:s.website)||"",N=(s==null?void 0:s.avatar)||"/assets/img/default-avatar.png",L=(s==null?void 0:s.amount)||0,k=(s==null?void 0:s.status)||"active";let P=["pending","pending","pending","pending"],x=0,E=0;if(c&&c.length>0){const o=[];c.forEach(u=>{u.payments&&u.payments.forEach(r=>o.push(r))}),o.length>0&&(P=o.map(u=>u.status),x=P.filter(u=>u==="pending").length,E=P.filter(u=>u==="paid").length)}d.innerHTML=`
    ${ne()}
    
    <section class="profile-section">
      <div class="profile-container">
        
        <!-- ===== Sidebar ===== -->
        <aside class="profile-sidebar ${n?"rtl-sidebar":""}" id="profileSidebar">
          <button class="sidebar-close" id="sidebarClose">✕</button>
          
          <div class="profile-avatar">
            <div class="avatar-wrapper">
              <img src="${N}" alt="Profile" id="profileAvatar" />
              <label for="avatarUpload" class="avatar-upload-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
              </label>
               <input type="file" id="avatarUpload" accept="image/*" style="display: none;" />
            </div>
            <h3 id="profileName">${f($)}</h3>
            <p id="profileEmail">${f(y)}</p>
            ${_?`<p class="profile-phone">📱 ${f(_)}</p>`:""}
            ${j?`<p class="profile-company">🏢 ${f(j)}</p>`:""}
            <span class="profile-badge ${k==="active"?"active":"inactive"}">${e.t("active")||"Active"}</span>
          </div>
          
          <nav class="profile-nav">
            <a href="#" class="nav-item active" data-tab="dashboard">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="7" height="7"/>
                <rect x="14" y="3" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/>
              </svg>
              <span>${e.t("profile_dashboard")||"Dashboard"}</span>
            </a>
            <a href="#" class="nav-item" data-tab="projects">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
              </svg>
              <span>${e.t("profile_projects")||"My Projects"}</span>
            </a>
            <a href="#" class="nav-item" data-tab="timeline">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              <span>${e.t("profile_timeline")||"Project Timeline"}</span>
            </a>
            <a href="#" class="nav-item" data-tab="messages">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <span>${e.t("profile_messages")||"Messages"}</span>
              <span class="nav-badge" id="unreadCount">3</span>
            </a>
            <a href="#" class="nav-item" data-tab="invoices">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
              <span>${e.t("profile_invoices")||"Invoices"}</span>
            </a>
            <a href="#" class="nav-item" data-tab="settings">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
              <span>${e.t("profile_settings")||"Settings"}</span>
            </a>
          </nav>
          
          <button class="logout-btn" id="logoutBtn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            <span>${e.t("logout")||"Logout"}</span>
          </button>
        </aside>
        
        <!-- ===== Mobile Menu Toggle ===== -->
        <button class="mobile-menu-toggle" id="mobileMenuToggle">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
        
        <!-- ===== Main Content ===== -->
        <main class="profile-main">
          
          <!-- Tab: Dashboard -->
          <div id="tab-dashboard" class="profile-tab active">
            ${de(x,E,L,w)}
          </div>
          
          <!-- Tab: Projects -->
          <div id="tab-projects" class="profile-tab">
            ${ce(c)}
          </div>
         <!-- Tab: Timeline -->
<div id="tab-timeline" class="profile-tab">
    ${re(c||[])}
</div>
          <!-- Tab: Messages -->
          <div id="tab-messages" class="profile-tab">
            ${pe()}
          </div>
          
          <!-- Tab: Invoices -->
          <div id="tab-invoices" class="profile-tab">
            ${ve(b)}
          </div>
          
          <!-- Tab: Settings -->
          <div id="tab-settings" class="profile-tab">
            ${ue($,y,_,j,B)}
          </div>
          
        </main>
        
      </div>
    </section>
    
    ${oe()}
  `,ie(),le(),me(),document.querySelectorAll("[data-route]").forEach(o=>{o.addEventListener("click",u=>{u.preventDefault();const r=o.getAttribute("href");r&&(window.location.href=r)})})}function de(d,v,n,s){return`
    <div class="dashboard-header">
      <h1>${e.t("welcome_back")||"Welcome back"}!</h1>
      <p>${e.t("dashboard_subtitle")||"Here's what's happening with your projects today."}</p>
    </div>
    
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">📊</div>
        <div class="stat-info">
          <h3>${e.t("active_projects")||"Active Projects"}</h3>
          <p class="stat-number">${d}</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">✅</div>
        <div class="stat-info">
          <h3>${e.t("completed_projects")||"Completed Projects"}</h3>
          <p class="stat-number">${v}</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">💰</div>
        <div class="stat-info">
          <h3>${e.t("total_amount")||"Total Amount"}</h3>
          <p class="stat-number">$${parseInt(n).toLocaleString()}</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">📈</div>
        <div class="stat-info">
          <h3>${e.t("project_progress")||"Project Progress"}</h3>
          <p class="stat-number">${s}%</p>
        </div>
      </div>
    </div>
    
    <div class="recent-activity">
      <h3>${e.t("recent_activity")||"Recent Activity"}</h3>
      <div class="activity-list" id="activityList">
        <div class="activity-item">
          <div class="activity-icon">🚀</div>
          <div class="activity-content">
            <p><strong>${e.t("project_progress_updated")||"Project progress updated to"} ${s}%</strong></p>
            <span class="activity-time">${e.t("just_now")||"Just now"}</span>
          </div>
        </div>
      </div>
    </div>
  `}function ce(d){if(!d||d.length===0)return`
      <div class="projects-header">
        <h1>${e.t("my_projects")||"My Projects"}</h1>
      </div>
      <div class="no-projects">
        <p>${e.t("no_projects")||"No projects found."}</p>
      </div>
    `;let v=`
    <div class="projects-header">
      <h1>${e.t("my_projects")||"My Projects"}</h1>
    </div>
    <div class="projects-list-accordion">
  `;return d.forEach((n,s)=>{const c=`project-${s}-${n.id||s}`,b=n.payments&&n.payments.length>0,w=n.project_progress||0,$=parseInt(n.amount||0).toLocaleString();v+=`
      <div class="project-accordion-item">
        <div class="project-accordion-header" data-project="${c}">
          <div class="project-info">
            <h3 class="project-name">${f(n.project_name||"بدون نام")}</h3>
            <div class="project-meta">
              <span class="project-type">${e.t("project_type")||"نوع"}: ${f(n.project_type||"web")}</span>
              <span class="project-progress-badge">${e.t("progress")||"پیشرفت"}: ${w}%</span>
              <span class="project-amount">${e.t("total_amount")||"مبلغ کل"}: $${$}</span>
            </div>
          </div>
          <div class="project-toggle-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
        </div>
        <div class="project-accordion-content" id="${c}" style="display: none;">
          <div class="payments-list">
            <h4>${e.t("payment_plans")||"قسط‌ها"}</h4>
            ${b?n.payments.map(y=>`
              <div class="payment-item">
                <div class="payment-info">
                  <span class="payment-title">${f(y.title||"قسط")}</span>
                  <span class="payment-amount">$${parseInt(y.amount||0).toLocaleString()}</span>
                </div>
                <div class="payment-status ${y.status==="paid"?"paid":"pending"}">
                  ${y.status==="paid"?"✓ پرداخت شده":"⏳ در انتظار پرداخت"}
                </div>
              </div>
            `).join(""):'<p class="no-payments">هیچ قسطی ثبت نشده است</p>'}
          </div>
        </div>
      </div>
    `}),v+="</div>",v}function re(d){if(!d||!Array.isArray(d)||d.length===0)return`
      <div class="timeline-header">
        <h1>${e.t("project_timeline")||"پیشرفت پروژه‌ها"}</h1>
      </div>
      <div class="no-projects-timeline">
        <p>${e.t("no_projects")||"هیچ پروژه‌ای یافت نشد"}</p>
      </div>
    `;let v=`
    <div class="timeline-header">
      <h1>${e.t("project_timeline")||"پیشرفت پروژه‌ها"}</h1>
      <p>${e.t("timeline_subtitle")||"مراحل پیشرفت پروژه‌های خود را پیگیری کنید"}</p>
    </div>
    <div class="projects-timeline-list">
  `;return d.forEach(n=>{var x;const s=(n==null?void 0:n.project_progress)||0,c=Math.min(100,s),b=n.project_name||"بدون نام",w=n.project_type||"web",$=n.created_start||((x=n.created_at)==null?void 0:x.split("T")[0])||"نامشخص",y=n.created_end||"نامشخص",_=[{title:e.t("start")||"شروع پروژه",status:"completed"},{title:e.t("research_phase")||"تحلیل نیازمندی‌ها",status:c>=25?"completed":c>=10?"active":"pending"},{title:e.t("design_phase")||"طراحی",status:c>=50?"completed":c>=35?"active":"pending"},{title:e.t("development_phase")||"توسعه",status:c>=75?"completed":c>=50?"active":"pending"},{title:e.t("launch")||"راه‌اندازی",status:c>=100?"completed":c>=90?"active":"pending"}],j=new Date,B=new Date($),N=new Date(y),L=!isNaN(N)&&N!=="نامشخص"?Math.ceil((N-B)/(1e3*60*60*24)):0,k=!isNaN(B)&&B!=="نامشخص"?Math.ceil((j-B)/(1e3*60*60*24)):0,P=Math.max(0,L-k);v+=`
      <div class="project-timeline-card">
        <div class="project-timeline-header">
          <div class="project-title-section">
            <h3 class="project-timeline-name">${f(b)}</h3>
            <span class="project-progress-badge">${c}%</span>
          </div>
          
          <div class="project-timeline-dates">
            <div class="date-item">
              <span class="date-label">${e.t("project_type")||"project_type"}:</span>
              <span class="date-value">${w}</span>
            </div>
            <div class="date-item">
              <span class="date-label">${e.t("start_date")||"شروع"}:</span>
              <span class="date-value">${G($)}</span>
            </div>
            
            <div class="date-item">
              <span class="date-label">${e.t("end_date")||"پایان"}:</span>
              <span class="date-value">${G(y)}</span>
            </div>
            ${L>0?`
              <div class="date-item">
                <span class="date-label">${e.t("days_remaining")||"باقیمانده"}:</span>
                <span class="date-value ${P<0?"overdue":""}">${P>0?P:0}</span>
              </div>
            `:""}
          </div>
        </div>
        
        <!-- نوار پیشرفت -->
        <div class="timeline-progress-container">
          <div class="timeline-progress-bar">
            <div class="timeline-progress-fill" style="width: ${c}%;">
              <span class="progress-tooltip">${c}%</span>
            </div>
          </div>
        </div>
        
        <!-- نقاط عطف -->
        <div class="timeline-milestones-container">
          <div class="milestones-timeline">
            ${_.map((E,o)=>{let u="",r="";return E.status==="completed"?(u="completed",r="✓"):E.status==="active"?(u="active",r="●"):(u="pending",r="○"),`
                <div class="timeline-milestone-item ${u}" style="--milestone-index: ${o};">
                  <div class="milestone-connector"></div>
                  <div class="milestone-node">
                    <span class="milestone-icon">${r}</span>
                  </div>
                  <div class="milestone-info">
                    <h4 class="milestone-title">${f(E.title)}</h4>
                    <p class="milestone-status">${ge(E.status)}</p>
                  </div>
                </div>
              `}).join("")}
          </div>
        </div>
      </div>
    `}),v+="</div>",v}function pe(){return`
    <div class="messages-header">
      <h1>${e.t("messages")||"Messages"}</h1>
      <button class="btn-new-message" id="newMessageBtn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        ${e.t("new_message")||"New Message"}
      </button>
    </div>
    
    <div class="messages-container">
      <div class="messages-list" id="messagesList">
        <div class="message-item unread">
          <div class="message-avatar">S</div>
          <div class="message-content">
            <div class="message-sender">
              <strong>Support Team</strong>
              <span class="message-time">2 ${e.t("hours_ago")||"hours ago"}</span>
            </div>
            <p>${e.t("welcome_message")||"Welcome to Mazorya Group! How can we help you today?"}</p>
          </div>
        </div>
      </div>
      
      <div class="message-panel" id="messagePanel" style="display: none;">
        <div class="message-panel-header">
          <button class="back-to-messages" id="backToMessages">← ${e.t("back")||"Back"}</button>
          <h3 id="messageReceiver">Support Team</h3>
        </div>
        <div class="message-conversation" id="messageConversation">
          <div class="conversation-message received">
            <p>${e.t("welcome_message")||"Welcome to Mazorya Group! How can we help you today?"}</p>
            <span class="message-time">2 ${e.t("hours_ago")||"hours ago"}</span>
          </div>
        </div>
        <div class="message-input-area">
          <textarea placeholder="${e.t("type_message")||"Type your message..."}" id="messageInput"></textarea>
          <button id="sendMessageBtn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <div class="modal" id="newMessageModal" style="display: none;">
      <div class="modal-content">
        <div class="modal-header">
          <h3>${e.t("new_message")||"New Message"}</h3>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <input type="text" placeholder="${e.t("to")||"To"}" id="messageTo" class="modal-input" />
          <input type="text" placeholder="${e.t("subject")||"Subject"}" id="messageSubject" class="modal-input" />
          <textarea placeholder="${e.t("message")||"Message"}" id="messageBody" rows="5" class="modal-textarea"></textarea>
        </div>
        <div class="modal-footer">
          <button class="btn-cancel">${e.t("cancel")||"Cancel"}</button>
          <button class="btn-send" id="sendNewMessageBtn">${e.t("send")||"Send"}</button>
        </div>
      </div>
    </div>
  `}function ve(d){if(!d||d.length===0)return`
      <div class="invoices-header">
        <h1>${e.t("invoices")||"Invoices & Payments"}</h1>
      </div>
      <div class="no-invoices">
        <p>${e.t("no_invoices")||"No invoices found."}</p>
      </div>
    `;const v=d.map(n=>`
    <div class="invoice-card">
      <div class="invoice-status ${n.status==="paid"?"paid":"pending"}"></div>
      <div class="invoice-info">
        <h4>${f(n.invoice_number||n.title||"Invoice")}</h4>
        <p>${f(n.description||"")}</p>
        <span class="invoice-date">${e.t("issued")||"Issued"}: ${new Date(n.created_at).toLocaleDateString()}</span>
      </div>
      <div class="invoice-amount">$${parseInt(n.amount||0).toLocaleString()}</div>
      <div class="invoice-actions">
        ${n.status==="pending"?`<button class="btn-pay" data-invoice-id="${n.id}">${e.t("pay_now")||"Pay Now"}</button>`:""}
        <button class="btn-download" data-file-url="${n.file_url||""}" title="${e.t("download")||"Download"}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
        </button>
      </div>
    </div>
  `).join("");return`
    <div class="invoices-header">
      <h1>${e.t("invoices")||"Invoices & Payments"}</h1>
      <button class="btn-upload-invoice" id="uploadInvoiceBtn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="17 8 12 3 7 8"/>
          <line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
        ${e.t("upload_invoice")||"Upload Invoice"}
      </button>
    </div>
    
    <div class="invoices-list" id="invoicesList">
      ${v}
    </div>
    
    <!-- Upload Invoice Modal -->
    <div class="modal" id="uploadInvoiceModal" style="display: none;">
      <div class="modal-content">
        <div class="modal-header">
          <h3>${e.t("upload_invoice")||"Upload Invoice"}</h3>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <div class="upload-area" id="uploadArea">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            <p>${e.t("drag_drop")||"Drag & drop your invoice here"}</p>
            <p class="upload-hint">${e.t("supported_formats")||"Supported: PDF, JPG, PNG (max 5MB)"}</p>
            <input type="file" id="invoiceFile" accept=".pdf,.jpg,.jpeg,.png" style="display: none;" />
            <button class="btn-browse" id="browseFileBtn">${e.t("browse_files")||"Browse Files"}</button>
          </div>
          
          <div class="auth-input-group" style="margin-top: 15px;">
            <label>${e.t("project_id")||"Project ID"}</label>
            <input type="text" id="invoiceProjectId" class="auth-input" placeholder="${e.t("enter_project_id")||"Enter project ID"}" />
          </div>
          <div class="auth-input-group">
            <label>${e.t("invoice_number")||"Invoice Number"}</label>
            <input type="text" id="invoiceNumber" class="auth-input" placeholder="INV-001" />
          </div>
          
          <div id="uploadProgress" style="display: none;">
            <div class="progress-bar">
              <div class="progress-fill" style="width: 0%;"></div>
            </div>
            <p class="upload-status">${e.t("uploading")||"Uploading..."}</p>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-cancel">${e.t("cancel")||"Cancel"}</button>
          <button class="btn-upload" id="confirmUploadBtn" disabled>${e.t("upload")||"Upload"}</button>
        </div>
      </div>
    </div>
  `}function ue(d,v,n,s,c){return`
    <div class="settings-header">
      <h1>${e.t("settings")||"Settings"}</h1>
      <p>${e.t("settings_subtitle")||"Manage your account settings and preferences"}</p>
    </div>
    
    <div class="settings-form">
      <div class="settings-section">
        <h3>${e.t("personal_info")||"Personal Information"}</h3>
        <div class="form-row">
          <div class="form-group">
            <label>${e.t("full_name")||"Full Name"}</label>
            <input type="text" id="settingsName" class="settings-input" value="${f(d)}" />
          </div>
          <div class="form-group">
            <label>${e.t("email")||"Email"}</label>
            <input type="email" id="settingsEmail" class="settings-input" value="${f(v)}" readonly disabled />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>${e.t("phone")||"Phone"}</label>
            <input type="tel" id="settingsPhone" class="settings-input" value="${f(n)}" />
          </div>
          <div class="form-group">
            <label>${e.t("company")||"Company"}</label>
            <input type="text" id="settingsCompany" class="settings-input" value="${f(s)}" />
          </div>
        </div>
        ${c?`
        <div class="form-row">
          <div class="form-group">
            <label>${e.t("website")||"Website"}</label>
            <input type="url" id="settingsWebsite" class="settings-input" value="${f(c)}" />
          </div>
        </div>
        `:""}
      </div>
      
      <div class="settings-section">
        <h3>${e.t("change_password")||"Change Password"}</h3>
        <div class="form-row">
          <div class="form-group">
            <label>${e.t("current_password")||"Current Password"}</label>
            <input type="password" id="currentPassword" class="settings-input" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>${e.t("new_password")||"New Password"}</label>
            <input type="password" id="newPassword" class="settings-input" />
          </div>
          <div class="form-group">
            <label>${e.t("confirm_password")||"Confirm Password"}</label>
            <input type="password" id="confirmPassword" class="settings-input" />
          </div>
        </div>
        <button class="btn-change-password" id="changePasswordBtn">${e.t("update_password")||"Update Password"}</button>
      </div>
      
      <div class="settings-actions">
        <button class="btn-save-settings" id="saveSettingsBtn">${e.t("save_changes")||"Save Changes"}</button>
        <button class="btn-delete-account" id="deleteAccountBtn">${e.t("delete_account")||"Delete Account"}</button>
      </div>
    </div>
  `}function me(){var z;const d=e.getCurrentLanguage(),v=document.querySelectorAll(".nav-item"),n=document.querySelectorAll(".profile-tab");v.forEach(t=>{const a=t.cloneNode(!0);t.parentNode.replaceChild(a,t),a.addEventListener("click",l=>{l.preventDefault();const i=a.getAttribute("data-tab");v.forEach(p=>p.classList.remove("active")),a.classList.add("active"),n.forEach(p=>p.classList.remove("active"));const m=document.getElementById(`tab-${i}`);if(m&&m.classList.add("active"),window.innerWidth<=768){const p=document.getElementById("profileSidebar");p&&p.classList.remove("open")}})});function s(){document.querySelectorAll(".project-accordion-header").forEach(t=>{const a=t.cloneNode(!0);t.parentNode.replaceChild(a,t),a.addEventListener("click",()=>{const l=a.closest(".project-accordion-item"),i=l.querySelector(".project-accordion-content"),m=i.style.display==="block";document.querySelectorAll(".project-accordion-content").forEach(p=>{var h;p!==i&&(p.style.display="none",(h=p.closest(".project-accordion-item"))==null||h.classList.remove("open"))}),i.style.display=m?"none":"block",l.classList.toggle("open",!m)})})}const c=document.querySelector('.nav-item[data-tab="projects"]');c&&c.addEventListener("click",()=>{setTimeout(()=>s(),100)}),((z=document.querySelector(".nav-item.active"))==null?void 0:z.getAttribute("data-tab"))==="projects"&&setTimeout(()=>s(),200);const b=document.getElementById("mobileMenuToggle"),w=document.getElementById("profileSidebar"),$=document.getElementById("sidebarClose");if(b&&w){const t=b.cloneNode(!0);b.parentNode.replaceChild(t,b),t.addEventListener("click",()=>{w.classList.toggle("open")})}if($&&w){const t=$.cloneNode(!0);$.parentNode.replaceChild(t,$),t.addEventListener("click",()=>{w.classList.remove("open")})}const y=document.getElementById("logoutBtn");if(y){const t=y.cloneNode(!0);y.parentNode.replaceChild(t,y),t.addEventListener("click",async()=>{await Z(),window.location.href=`/${d}/auth`})}const _=document.getElementById("updateProgressBtn");if(_){const t=_.cloneNode(!0);_.parentNode.replaceChild(t,_),t.addEventListener("click",async()=>{const a=document.getElementById("progressSlider"),l=(a==null?void 0:a.value)||0,i=await J(),m=(i==null?void 0:i.find(p=>p.status==="active"))||(i==null?void 0:i[0]);if(m&&m.id){const p=await updateProjectProgress(m.id,l);p.success?(g(`پیشرفت پروژه به ${l}% به‌روزرسانی شد!`,"success"),setTimeout(()=>window.location.reload(),1500)):g(p.error||"خطا در به‌روزرسانی","error")}else g("پروژه‌ای یافت نشد","error")})}const j=document.getElementById("saveSettingsBtn");if(j){const t=j.cloneNode(!0);j.parentNode.replaceChild(t,j),t.addEventListener("click",async()=>{var h,I,W,R;const a=(h=document.getElementById("settingsName"))==null?void 0:h.value,l=(I=document.getElementById("settingsPhone"))==null?void 0:I.value,i=(W=document.getElementById("settingsCompany"))==null?void 0:W.value,m=(R=document.getElementById("settingsWebsite"))==null?void 0:R.value,p=await ee({full_name:a,phone:l,company_name:i,website:m});p.success?(g(e.t("settings_saved")||"Settings saved successfully!","success"),setTimeout(()=>window.location.reload(),1500)):g(p.error||"Update failed","error")})}const B=document.getElementById("changePasswordBtn");if(B){const t=B.cloneNode(!0);B.parentNode.replaceChild(t,B),t.addEventListener("click",async()=>{var p,h,I;const a=(p=document.getElementById("currentPassword"))==null?void 0:p.value,l=(h=document.getElementById("newPassword"))==null?void 0:h.value,i=(I=document.getElementById("confirmPassword"))==null?void 0:I.value;if(!a||!l){g("Please fill all password fields","error");return}if(l!==i){g("New passwords do not match","error");return}const m=await te(a,l);m.success?(g("Password changed successfully!","success"),document.getElementById("currentPassword").value="",document.getElementById("newPassword").value="",document.getElementById("confirmPassword").value=""):g(m.error||"Password change failed","error")})}const N=document.getElementById("avatarUpload"),L=document.getElementById("profileAvatar");if(N&&L){const t=N.cloneNode(!0);N.parentNode.replaceChild(t,N),t.addEventListener("change",async a=>{const l=a.target.files[0];if(l){const i=await se(l);i.success&&i.avatarUrl?(L.src=i.avatarUrl,g("Avatar updated successfully!","success")):g(i.error||"Upload failed","error")}})}const k=document.getElementById("uploadInvoiceBtn"),P=document.getElementById("uploadInvoiceModal"),x=document.getElementById("browseFileBtn"),E=document.getElementById("invoiceFile"),o=document.getElementById("uploadArea"),u=document.getElementById("uploadProgress"),r=document.getElementById("confirmUploadBtn");let C=null;if(k&&P){const t=k.cloneNode(!0);k.parentNode.replaceChild(t,k),t.addEventListener("click",()=>{P.style.display="flex"})}if(document.querySelectorAll(".modal-close, .btn-cancel").forEach(t=>{const a=t.cloneNode(!0);t.parentNode.replaceChild(a,t),a.addEventListener("click",()=>{const l=a.closest(".modal");l&&(l.style.display="none")})}),x&&E){const t=x.cloneNode(!0);x.parentNode.replaceChild(t,x),t.addEventListener("click",()=>{E.click()}),E.addEventListener("change",i=>{var h,I;C=i.target.files[0];const m=(h=document.getElementById("invoiceProjectId"))==null?void 0:h.value.trim(),p=(I=document.getElementById("invoiceNumber"))==null?void 0:I.value.trim();C&&m&&p&&r?r.disabled=!1:r&&(r.disabled=!0)});const a=document.getElementById("invoiceProjectId"),l=document.getElementById("invoiceNumber");if(a&&l){const i=()=>{const m=a.value.trim(),p=l.value.trim();C&&m&&p&&r?r.disabled=!1:r&&(r.disabled=!0)};a.addEventListener("input",i),l.addEventListener("input",i)}o&&(o.addEventListener("dragover",i=>{i.preventDefault(),o.classList.add("dragover")}),o.addEventListener("dragleave",()=>{o.classList.remove("dragover")}),o.addEventListener("drop",i=>{var h,I;i.preventDefault(),o.classList.remove("dragover"),C=i.dataTransfer.files[0];const m=(h=document.getElementById("invoiceProjectId"))==null?void 0:h.value.trim(),p=(I=document.getElementById("invoiceNumber"))==null?void 0:I.value.trim();C&&m&&p&&r?r.disabled=!1:r&&(r.disabled=!0)}))}if(r){const t=r.cloneNode(!0);r.parentNode.replaceChild(t,r),t.addEventListener("click",async()=>{var m,p;const a=(m=document.getElementById("invoiceProjectId"))==null?void 0:m.value.trim(),l=(p=document.getElementById("invoiceNumber"))==null?void 0:p.value.trim();if(!a){g("لطفاً Project ID را وارد کنید","error");return}if(!l){g("لطفاً شماره فاکتور را وارد کنید","error");return}if(!C){g("لطفاً فایل را انتخاب کنید","error");return}o&&(o.style.display="none"),u&&(u.style.display="block"),t.disabled=!0;const i=await ae(a,l,C);if(i.success){g("فاکتور با موفقیت آپلود شد!","success");const h=t.closest(".modal");h&&(h.style.display="none"),o&&(o.style.display="flex"),u&&(u.style.display="none"),document.getElementById("invoiceProjectId").value="",document.getElementById("invoiceNumber").value="",C=null,setTimeout(()=>{window.location.reload()},1500)}else g(i.error||"آپلود فاکتور ناموفق بود","error"),o&&(o.style.display="flex"),u&&(u.style.display="none");t.disabled=!1})}const A=document.getElementById("newMessageBtn"),V=document.getElementById("newMessageModal");if(A&&V){const t=A.cloneNode(!0);A.parentNode.replaceChild(t,A),t.addEventListener("click",()=>{V.style.display="flex"})}const S=document.getElementById("sendNewMessageBtn");if(S){const t=S.cloneNode(!0);S.parentNode.replaceChild(t,S),t.addEventListener("click",()=>{const a=t.closest(".modal");a&&(a.style.display="none"),g("Your message has been sent!","success")})}const O=document.querySelectorAll(".message-item"),M=document.getElementById("messagesList"),T=document.getElementById("messagePanel"),U=document.getElementById("backToMessages");if(O.forEach(t=>{const a=t.cloneNode(!0);t.parentNode.replaceChild(a,t),a.addEventListener("click",()=>{M&&(M.style.display="none"),T&&(T.style.display="flex")})}),U&&M&&T){const t=U.cloneNode(!0);U.parentNode.replaceChild(t,U),t.addEventListener("click",()=>{M&&(M.style.display="block"),T&&(T.style.display="none")})}const H=document.getElementById("sendMessageBtn"),F=document.getElementById("messageInput"),D=document.getElementById("messageConversation");if(H&&F&&D){const t=H.cloneNode(!0);H.parentNode.replaceChild(t,H),t.addEventListener("click",()=>{const a=F.value.trim();if(a){const l=document.createElement("div");l.className="conversation-message sent",l.innerHTML=`<p>${f(a)}</p><span class="message-time">${e.t("just_now")||"Just now"}</span>`,D.appendChild(l),F.value="",D.scrollTop=D.scrollHeight}})}document.querySelectorAll(".btn-pay").forEach(t=>{const a=t.cloneNode(!0);t.parentNode.replaceChild(a,t),a.addEventListener("click",()=>{g("Redirecting to payment gateway...","info")})}),document.querySelectorAll(".btn-download").forEach(t=>{const a=t.cloneNode(!0);t.parentNode.replaceChild(a,t),a.addEventListener("click",()=>{const l=a.getAttribute("data-file-url");l?window.open(l,"_blank"):g("فایل موجود نیست","error")})});const q=document.getElementById("deleteAccountBtn");if(q){const t=q.cloneNode(!0);q.parentNode.replaceChild(t,q),t.addEventListener("click",()=>{confirm("Are you sure you want to delete your account? This action cannot be undone.")&&g("Account deletion requested. We'll be in touch.","warning")})}}function g(d,v="info"){const n=document.querySelector(".toast-message");n&&n.remove();const s=document.createElement("div");s.className=`toast-message ${v}`,s.textContent=d,document.body.appendChild(s),setTimeout(()=>{s.classList.add("show")},10),setTimeout(()=>{s.classList.remove("show"),setTimeout(()=>s.remove(),300)},3e3)}function f(d){if(!d)return"";const v=document.createElement("div");return v.textContent=d,v.innerHTML}function G(d){if(!d||d==="نامشخص"||d==="undefined")return"نامشخص";try{const v=new Date(d);return isNaN(v.getTime())?"نامشخص":v.toLocaleDateString("fa-IR")}catch{return"نامشخص"}}function ge(d){switch(d){case"completed":return e.t("completed")||"تکمیل شده";case"active":return e.t("in_progress")||"در حال انجام";default:return e.t("pending")||"در انتظار"}}export{$e as renderProfile};
