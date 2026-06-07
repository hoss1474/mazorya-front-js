// pages/profile.js - User Profile Page (Complete)

import { i18n } from '../core/i18n.js';
import { renderHeader, attachHeaderEvents } from '../components/header.js';
import { renderFooter, attachFooterEvents } from '../components/footer.js';
import { 
  getUserData, 
  isAuthenticated, 
  logoutUser,
  updateUserProfile,
  changePassword,
  uploadAvatar,
  getUserProjects,
  getInvoices,
  getAuthToken
} from '../core/api.js';

// ============================================================
// ⚡ تنظیمات آدرس API
// ============================================================
const API_BASE = 'http://127.0.0.1:8000/api';

// وضعیت سایدبار (باز/بسته در موبایل)
let mobileMenuOpen = false;

export async function renderProfile() {
  const app = document.getElementById('app');
  const currentLang = i18n.getCurrentLanguage();
  const isRTL = currentLang === 'fa' || currentLang === 'ar';
  
  // ===== بررسی احراز هویت =====
  if (!isAuthenticated()) {
    window.location.href = `/${currentLang}/auth`;
    return;
  }
  
  // ===== دریافت اطلاعات کاربر از localStorage =====
  let userData = null;
  try {
    userData = getUserData();
    console.log('User data from localStorage:', userData);
  } catch (e) {
    console.error('Error getting user data:', e);
  }
  
  // اگر اطلاعات در localStorage نبود یا خراب بود، از سرور بگیر
  if (!userData) {
    try {
      const token = getAuthToken();
      if (token) {
        const response = await fetch(`${API_BASE}/user/profile`, {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        console.log('Profile API response:', data);
        
        if (data.status && data.data) {
          userData = data.data;
          localStorage.setItem('user_data', JSON.stringify(userData));
        }
      }
    } catch (err) {
      console.error('Failed to fetch profile from API:', err);
    }
  }
  
  // اگر باز هم دیتا نداریم، از مقادیر پیش‌فرض استفاده کن
  if (!userData) {
    userData = {
      full_name: '',
      email: '',
      phone: '',
      company_name: '',
      website: '',
      avatar: null,
      status: 'active',
      project_progress: 0,
      amount: 0
    };
  }
  
  // دریافت پروژه‌ها و فاکتورها
  let projects = [];
  let invoices = [];
  try {
    projects = await getUserProjects();
    invoices = await getInvoices();
    console.log('Projects:', projects);
    console.log('Invoices:', invoices);
  } catch (err) {
    console.error('Failed to fetch projects/invoices:', err);
  }
  
  // مقادیر از userData
  const userName = userData?.full_name || '';
  const userEmail = userData?.email || '';
  const userPhone = userData?.phone || '';
  const userCompany = userData?.company_name || '';
  const userWebsite = userData?.website || '';
  const userAvatar = userData?.avatar || '/assets/img/default-avatar.png';
  const projectProgress = userData?.project_progress || 0;
  const projectAmount = userData?.amount || 0;
  const userStatus = userData?.status || 'active';
  
  // وضعیت‌های پرداخت از پروژه‌ها
  let statuses = ['pending', 'pending', 'pending', 'pending'];
  let activeProjects = 0;
  let completedProjects = 0;
  
  if (projects && projects.length > 0) {
    // محاسبه از روی پروژه اول (یا جمع کل)
    const allPayments = [];
    projects.forEach(project => {
      if (project.payments) {
        project.payments.forEach(p => allPayments.push(p));
      }
    });
    if (allPayments.length > 0) {
      statuses = allPayments.map(p => p.status);
      activeProjects = statuses.filter(s => s === 'pending').length;
      completedProjects = statuses.filter(s => s === 'paid').length;
    }
  }
  
  app.innerHTML = `
    ${renderHeader()}
    
    <section class="profile-section">
      <div class="profile-container">
        
        <!-- ===== Sidebar ===== -->
        <aside class="profile-sidebar ${isRTL ? 'rtl-sidebar' : ''}" id="profileSidebar">
          <button class="sidebar-close" id="sidebarClose">✕</button>
          
          <div class="profile-avatar">
            <div class="avatar-wrapper">
              <img src="${userAvatar}" alt="Profile" id="profileAvatar" />
              <label for="avatarUpload" class="avatar-upload-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
              </label>
              <input type="file" id="avatarUpload" accept="image/*" style="display: none;" />
            </div>
            <h3 id="profileName">${escapeHtml(userName)}</h3>
            <p id="profileEmail">${escapeHtml(userEmail)}</p>
            ${userPhone ? `<p class="profile-phone">📱 ${escapeHtml(userPhone)}</p>` : ''}
            ${userCompany ? `<p class="profile-company">🏢 ${escapeHtml(userCompany)}</p>` : ''}
            <span class="profile-badge ${userStatus === 'active' ? 'active' : 'inactive'}">${i18n.t('active') || 'Active'}</span>
          </div>
          
          <nav class="profile-nav">
            <a href="#" class="nav-item active" data-tab="dashboard">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="7" height="7"/>
                <rect x="14" y="3" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/>
              </svg>
              <span>${i18n.t('profile_dashboard') || 'Dashboard'}</span>
            </a>
            <a href="#" class="nav-item" data-tab="projects">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
              </svg>
              <span>${i18n.t('profile_projects') || 'My Projects'}</span>
            </a>
            <a href="#" class="nav-item" data-tab="timeline">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              <span>${i18n.t('profile_timeline') || 'Project Timeline'}</span>
            </a>
            <a href="#" class="nav-item" data-tab="messages">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <span>${i18n.t('profile_messages') || 'Messages'}</span>
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
              <span>${i18n.t('profile_invoices') || 'Invoices'}</span>
            </a>
            <a href="#" class="nav-item" data-tab="settings">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
              <span>${i18n.t('profile_settings') || 'Settings'}</span>
            </a>
          </nav>
          
          <button class="logout-btn" id="logoutBtn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            <span>${i18n.t('logout') || 'Logout'}</span>
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
            ${renderDashboard(activeProjects, completedProjects, projectAmount, projectProgress)}
          </div>
          
          <!-- Tab: Projects -->
          <div id="tab-projects" class="profile-tab">
            ${renderProjectsTab(projects)}
          </div>
          
          <!-- Tab: Timeline -->
          <div id="tab-timeline" class="profile-tab">
            ${renderTimelineTab(projectProgress)}
          </div>
          
          <!-- Tab: Messages -->
          <div id="tab-messages" class="profile-tab">
            ${renderMessagesTab()}
          </div>
          
          <!-- Tab: Invoices -->
          <div id="tab-invoices" class="profile-tab">
            ${renderInvoicesTab(invoices)}
          </div>
          
          <!-- Tab: Settings -->
          <div id="tab-settings" class="profile-tab">
            ${renderSettingsTab(userName, userEmail, userPhone, userCompany, userWebsite)}
          </div>
          
        </main>
        
      </div>
    </section>
    
    ${renderFooter()}
  `;
  
  attachHeaderEvents();
  attachFooterEvents();
  attachProfileEvents();
  
  document.querySelectorAll('[data-route]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      if (href) window.location.href = href;
    });
  });
}

// ============================================================
// Dashboard Tab
// ============================================================
function renderDashboard(activeProjects, completedProjects, projectAmount, projectProgress) {
  return `
    <div class="dashboard-header">
      <h1>${i18n.t('welcome_back') || 'Welcome back'}!</h1>
      <p>${i18n.t('dashboard_subtitle') || 'Here\'s what\'s happening with your projects today.'}</p>
    </div>
    
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">📊</div>
        <div class="stat-info">
          <h3>${i18n.t('active_projects') || 'Active Projects'}</h3>
          <p class="stat-number">${activeProjects}</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">✅</div>
        <div class="stat-info">
          <h3>${i18n.t('completed_projects') || 'Completed Projects'}</h3>
          <p class="stat-number">${completedProjects}</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">💰</div>
        <div class="stat-info">
          <h3>${i18n.t('total_amount') || 'Total Amount'}</h3>
          <p class="stat-number">$${parseInt(projectAmount).toLocaleString()}</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">📈</div>
        <div class="stat-info">
          <h3>${i18n.t('project_progress') || 'Project Progress'}</h3>
          <p class="stat-number">${projectProgress}%</p>
        </div>
      </div>
    </div>
    
    <div class="recent-activity">
      <h3>${i18n.t('recent_activity') || 'Recent Activity'}</h3>
      <div class="activity-list" id="activityList">
        <div class="activity-item">
          <div class="activity-icon">🚀</div>
          <div class="activity-content">
            <p><strong>${i18n.t('project_progress_updated') || 'Project progress updated to'} ${projectProgress}%</strong></p>
            <span class="activity-time">${i18n.t('just_now') || 'Just now'}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ============================================================
// Projects Tab (با قابلیت کلیک و نمایش قسط‌ها)
// ============================================================
function renderProjectsTab(projects) {
  if (!projects || projects.length === 0) {
    return `
      <div class="projects-header">
        <h1>${i18n.t('my_projects') || 'My Projects'}</h1>
      </div>
      <div class="no-projects">
        <p>${i18n.t('no_projects') || 'No projects found.'}</p>
      </div>
    `;
  }
  
  let projectsHtml = `
    <div class="projects-header">
      <h1>${i18n.t('my_projects') || 'My Projects'}</h1>
    </div>
    <div class="projects-list-accordion">
  `;
  
  projects.forEach((project, index) => {
    const projectId = `project-${index}-${project.id || index}`;
    const hasPayments = project.payments && project.payments.length > 0;
    const progress = project.project_progress || 0;
    const amount = parseInt(project.amount || 0).toLocaleString();
    
    projectsHtml += `
      <div class="project-accordion-item">
        <div class="project-accordion-header" data-project="${projectId}">
          <div class="project-info">
            <h3 class="project-name">${escapeHtml(project.project_name || 'بدون نام')}</h3>
            <div class="project-meta">
              <span class="project-type">${i18n.t('project_type') || 'نوع'}: ${escapeHtml(project.project_type || 'web')}</span>
              <span class="project-progress-badge">${i18n.t('progress') || 'پیشرفت'}: ${progress}%</span>
              <span class="project-amount">${i18n.t('total_amount') || 'مبلغ کل'}: $${amount}</span>
            </div>
          </div>
          <div class="project-toggle-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
        </div>
        <div class="project-accordion-content" id="${projectId}" style="display: none;">
          <div class="payments-list">
            <h4>${i18n.t('payment_plans') || 'قسط‌ها'}</h4>
            ${hasPayments ? project.payments.map(payment => `
              <div class="payment-item">
                <div class="payment-info">
                  <span class="payment-title">${escapeHtml(payment.title || 'قسط')}</span>
                  <span class="payment-amount">$${parseInt(payment.amount || 0).toLocaleString()}</span>
                </div>
                <div class="payment-status ${payment.status === 'paid' ? 'paid' : 'pending'}">
                  ${payment.status === 'paid' ? '✓ پرداخت شده' : '⏳ در انتظار پرداخت'}
                </div>
              </div>
            `).join('') : '<p class="no-payments">هیچ قسطی ثبت نشده است</p>'}
          </div>
        </div>
      </div>
    `;
  });
  
  projectsHtml += `</div>`;
  
  return projectsHtml;
}

// ============================================================
// Timeline Tab
// ============================================================
function renderTimelineTab(projectProgress) {
  return `
    <div class="timeline-header">
      <h1>${i18n.t('project_timeline') || 'Project Timeline'}</h1>
      <p>${i18n.t('timeline_subtitle') || 'Track your project progress from start to finish'}</p>
    </div>
    
    <div class="timeline-container">
      <div class="timeline-stats">
        <div class="timeline-stat">
          <span class="stat-label">${i18n.t('current_progress') || 'Current Progress'}</span>
          <span class="stat-value" id="timelineProgress">${projectProgress}%</span>
        </div>
      </div>
      
      <div class="timeline-progress-container">
        <div class="timeline-progress-bar">
          <div class="timeline-progress-fill" id="timelineProgressFill" style="width: ${projectProgress}%;"></div>
        </div>
      </div>
    </div>
    
    <div class="progress-update">
      <h3>${i18n.t('update_progress') || 'Update Project Progress'}</h3>
      <div class="progress-slider-container">
        <input type="range" id="progressSlider" min="0" max="100" value="${projectProgress}" step="5" />
        <div class="slider-value">
          <span>${i18n.t('progress') || 'Progress'}:</span>
          <strong id="sliderValue">${projectProgress}%</strong>
        </div>
        <button class="btn-update-progress" id="updateProgressBtn">
          ${i18n.t('update') || 'Update'}
        </button>
      </div>
    </div>
  `;
}

// ============================================================
// Messages Tab
// ============================================================
function renderMessagesTab() {
  return `
    <div class="messages-header">
      <h1>${i18n.t('messages') || 'Messages'}</h1>
      <button class="btn-new-message" id="newMessageBtn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        ${i18n.t('new_message') || 'New Message'}
      </button>
    </div>
    
    <div class="messages-container">
      <div class="messages-list" id="messagesList">
        <div class="message-item unread">
          <div class="message-avatar">S</div>
          <div class="message-content">
            <div class="message-sender">
              <strong>Support Team</strong>
              <span class="message-time">2 ${i18n.t('hours_ago') || 'hours ago'}</span>
            </div>
            <p>${i18n.t('welcome_message') || 'Welcome to Mazorya Group! How can we help you today?'}</p>
          </div>
        </div>
      </div>
      
      <div class="message-panel" id="messagePanel" style="display: none;">
        <div class="message-panel-header">
          <button class="back-to-messages" id="backToMessages">← ${i18n.t('back') || 'Back'}</button>
          <h3 id="messageReceiver">Support Team</h3>
        </div>
        <div class="message-conversation" id="messageConversation">
          <div class="conversation-message received">
            <p>${i18n.t('welcome_message') || 'Welcome to Mazorya Group! How can we help you today?'}</p>
            <span class="message-time">2 ${i18n.t('hours_ago') || 'hours ago'}</span>
          </div>
        </div>
        <div class="message-input-area">
          <textarea placeholder="${i18n.t('type_message') || 'Type your message...'}" id="messageInput"></textarea>
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
          <h3>${i18n.t('new_message') || 'New Message'}</h3>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <input type="text" placeholder="${i18n.t('to') || 'To'}" id="messageTo" class="modal-input" />
          <input type="text" placeholder="${i18n.t('subject') || 'Subject'}" id="messageSubject" class="modal-input" />
          <textarea placeholder="${i18n.t('message') || 'Message'}" id="messageBody" rows="5" class="modal-textarea"></textarea>
        </div>
        <div class="modal-footer">
          <button class="btn-cancel">${i18n.t('cancel') || 'Cancel'}</button>
          <button class="btn-send" id="sendNewMessageBtn">${i18n.t('send') || 'Send'}</button>
        </div>
      </div>
    </div>
  `;
}

// ============================================================
// Invoices Tab
// ============================================================
function renderInvoicesTab(invoices) {
  if (!invoices || invoices.length === 0) {
    return `
      <div class="invoices-header">
        <h1>${i18n.t('invoices') || 'Invoices & Payments'}</h1>
      </div>
      <div class="no-invoices">
        <p>${i18n.t('no_invoices') || 'No invoices found.'}</p>
      </div>
    `;
  }
  
  const invoicesList = invoices.map(invoice => `
    <div class="invoice-card">
      <div class="invoice-status ${invoice.status === 'paid' ? 'paid' : 'pending'}"></div>
      <div class="invoice-info">
        <h4>${escapeHtml(invoice.title || 'Invoice')}</h4>
        <p>${escapeHtml(invoice.description || '')}</p>
        <span class="invoice-date">${i18n.t('issued') || 'Issued'}: ${new Date(invoice.created_at).toLocaleDateString()}</span>
      </div>
      <div class="invoice-amount">$${parseInt(invoice.amount || 0).toLocaleString()}</div>
      <div class="invoice-actions">
        ${invoice.status === 'pending' ? `<button class="btn-pay">${i18n.t('pay_now') || 'Pay Now'}</button>` : ''}
        <button class="btn-download" title="${i18n.t('download') || 'Download'}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
        </button>
      </div>
    </div>
  `).join('');
  
  return `
    <div class="invoices-header">
      <h1>${i18n.t('invoices') || 'Invoices & Payments'}</h1>
      <button class="btn-upload-invoice" id="uploadInvoiceBtn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="17 8 12 3 7 8"/>
          <line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
        ${i18n.t('upload_invoice') || 'Upload Invoice'}
      </button>
    </div>
    
    <div class="invoices-list" id="invoicesList">
      ${invoicesList}
    </div>
    
    <!-- Upload Invoice Modal -->
    <div class="modal" id="uploadInvoiceModal" style="display: none;">
      <div class="modal-content">
        <div class="modal-header">
          <h3>${i18n.t('upload_invoice') || 'Upload Invoice'}</h3>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <div class="upload-area" id="uploadArea">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            <p>${i18n.t('drag_drop') || 'Drag & drop your invoice here'}</p>
            <p class="upload-hint">${i18n.t('supported_formats') || 'Supported: PDF, JPG, PNG (max 5MB)'}</p>
            <input type="file" id="invoiceFile" accept=".pdf,.jpg,.jpeg,.png" style="display: none;" />
            <button class="btn-browse" id="browseFileBtn">${i18n.t('browse_files') || 'Browse Files'}</button>
          </div>
          <div id="uploadProgress" style="display: none;">
            <div class="progress-bar">
              <div class="progress-fill" style="width: 0%;"></div>
            </div>
            <p class="upload-status">${i18n.t('uploading') || 'Uploading...'}</p>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-cancel">${i18n.t('cancel') || 'Cancel'}</button>
          <button class="btn-upload" id="confirmUploadBtn" disabled>${i18n.t('upload') || 'Upload'}</button>
        </div>
      </div>
    </div>
  `;
}

// ============================================================
// Settings Tab
// ============================================================
function renderSettingsTab(userName, userEmail, userPhone, userCompany, userWebsite) {
  return `
    <div class="settings-header">
      <h1>${i18n.t('settings') || 'Settings'}</h1>
      <p>${i18n.t('settings_subtitle') || 'Manage your account settings and preferences'}</p>
    </div>
    
    <div class="settings-form">
      <div class="settings-section">
        <h3>${i18n.t('personal_info') || 'Personal Information'}</h3>
        <div class="form-row">
          <div class="form-group">
            <label>${i18n.t('full_name') || 'Full Name'}</label>
            <input type="text" id="settingsName" class="settings-input" value="${escapeHtml(userName)}" />
          </div>
          <div class="form-group">
            <label>${i18n.t('email') || 'Email'}</label>
            <input type="email" id="settingsEmail" class="settings-input" value="${escapeHtml(userEmail)}" readonly disabled />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>${i18n.t('phone') || 'Phone'}</label>
            <input type="tel" id="settingsPhone" class="settings-input" value="${escapeHtml(userPhone)}" />
          </div>
          <div class="form-group">
            <label>${i18n.t('company') || 'Company'}</label>
            <input type="text" id="settingsCompany" class="settings-input" value="${escapeHtml(userCompany)}" />
          </div>
        </div>
        ${userWebsite ? `
        <div class="form-row">
          <div class="form-group">
            <label>${i18n.t('website') || 'Website'}</label>
            <input type="url" id="settingsWebsite" class="settings-input" value="${escapeHtml(userWebsite)}" />
          </div>
        </div>
        ` : ''}
      </div>
      
      <div class="settings-section">
        <h3>${i18n.t('change_password') || 'Change Password'}</h3>
        <div class="form-row">
          <div class="form-group">
            <label>${i18n.t('current_password') || 'Current Password'}</label>
            <input type="password" id="currentPassword" class="settings-input" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>${i18n.t('new_password') || 'New Password'}</label>
            <input type="password" id="newPassword" class="settings-input" />
          </div>
          <div class="form-group">
            <label>${i18n.t('confirm_password') || 'Confirm Password'}</label>
            <input type="password" id="confirmPassword" class="settings-input" />
          </div>
        </div>
        <button class="btn-change-password" id="changePasswordBtn">${i18n.t('update_password') || 'Update Password'}</button>
      </div>
      
      <div class="settings-actions">
        <button class="btn-save-settings" id="saveSettingsBtn">${i18n.t('save_changes') || 'Save Changes'}</button>
        <button class="btn-delete-account" id="deleteAccountBtn">${i18n.t('delete_account') || 'Delete Account'}</button>
      </div>
    </div>
  `;
}

// ============================================================
// Event Handlers
// ============================================================
function attachProfileEvents() {
  const currentLang = i18n.getCurrentLanguage();
  
  // Tab switching
  const navItems = document.querySelectorAll('.nav-item');
  const tabs = document.querySelectorAll('.profile-tab');
  
  navItems.forEach(item => {
    const newItem = item.cloneNode(true);
    item.parentNode.replaceChild(newItem, item);
    
    newItem.addEventListener('click', (e) => {
      e.preventDefault();
      const tabName = newItem.getAttribute('data-tab');
      
      navItems.forEach(nav => nav.classList.remove('active'));
      newItem.classList.add('active');
      
      tabs.forEach(tab => tab.classList.remove('active'));
      const activeTab = document.getElementById(`tab-${tabName}`);
      if (activeTab) activeTab.classList.add('active');
      
      if (window.innerWidth <= 768) {
        const sidebar = document.getElementById('profileSidebar');
        if (sidebar) sidebar.classList.remove('open');
      }
    });
  });
  
  // ===== Accordion for Projects (بعد از رندر تب Projects) =====
  function initProjectsAccordion() {
    document.querySelectorAll('.project-accordion-header').forEach(header => {
      const newHeader = header.cloneNode(true);
      header.parentNode.replaceChild(newHeader, header);
      
      newHeader.addEventListener('click', () => {
        const parent = newHeader.closest('.project-accordion-item');
        const content = parent.querySelector('.project-accordion-content');
        const isOpen = content.style.display === 'block';
        
        document.querySelectorAll('.project-accordion-content').forEach(c => {
          if (c !== content) {
            c.style.display = 'none';
            c.closest('.project-accordion-item')?.classList.remove('open');
          }
        });
        
        content.style.display = isOpen ? 'none' : 'block';
        parent.classList.toggle('open', !isOpen);
      });
    });
  }
  
  // وقتی تب Projects کلیک شد، اکاردئون راه‌اندازی شود
  const projectsTab = document.querySelector('.nav-item[data-tab="projects"]');
  if (projectsTab) {
    projectsTab.addEventListener('click', () => {
      setTimeout(() => initProjectsAccordion(), 100);
    });
  }
  
  // همچنین هنگام لود اولیه اگر تب Projects فعال بود
  if (document.querySelector('.nav-item.active')?.getAttribute('data-tab') === 'projects') {
    setTimeout(() => initProjectsAccordion(), 200);
  }
  
  // Mobile menu toggle
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const sidebar = document.getElementById('profileSidebar');
  const sidebarClose = document.getElementById('sidebarClose');
  
  if (mobileToggle && sidebar) {
    const newToggle = mobileToggle.cloneNode(true);
    mobileToggle.parentNode.replaceChild(newToggle, mobileToggle);
    
    newToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }
  
  if (sidebarClose && sidebar) {
    const newClose = sidebarClose.cloneNode(true);
    sidebarClose.parentNode.replaceChild(newClose, sidebarClose);
    
    newClose.addEventListener('click', () => {
      sidebar.classList.remove('open');
    });
  }
  
  // Logout
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    const newLogoutBtn = logoutBtn.cloneNode(true);
    logoutBtn.parentNode.replaceChild(newLogoutBtn, logoutBtn);
    
    newLogoutBtn.addEventListener('click', async () => {
      await logoutUser();
      window.location.href = `/${currentLang}/auth`;
    });
  }
  
  // Update progress
  const progressSlider = document.getElementById('progressSlider');
  const sliderValue = document.getElementById('sliderValue');
  const timelineProgressFill = document.getElementById('timelineProgressFill');
  const timelineProgress = document.getElementById('timelineProgress');
  const updateBtn = document.getElementById('updateProgressBtn');
  
  if (progressSlider) {
    const newSlider = progressSlider.cloneNode(true);
    progressSlider.parentNode.replaceChild(newSlider, progressSlider);
    
    newSlider.addEventListener('input', (e) => {
      const val = e.target.value;
      if (sliderValue) sliderValue.textContent = `${val}%`;
      if (timelineProgressFill) timelineProgressFill.style.width = `${val}%`;
      if (timelineProgress) timelineProgress.textContent = `${val}%`;
    });
  }
  
  if (updateBtn) {
    const newUpdateBtn = updateBtn.cloneNode(true);
    updateBtn.parentNode.replaceChild(newUpdateBtn, updateBtn);
    
    newUpdateBtn.addEventListener('click', () => {
      const val = progressSlider?.value || 0;
      showToast(`${i18n.t('progress_updated') || 'Progress updated to'} ${val}%!`, 'success');
    });
  }
  
  // Save profile settings
  const saveBtn = document.getElementById('saveSettingsBtn');
  if (saveBtn) {
    const newSaveBtn = saveBtn.cloneNode(true);
    saveBtn.parentNode.replaceChild(newSaveBtn, saveBtn);
    
    newSaveBtn.addEventListener('click', async () => {
      const name = document.getElementById('settingsName')?.value;
      const phone = document.getElementById('settingsPhone')?.value;
      const company = document.getElementById('settingsCompany')?.value;
      const website = document.getElementById('settingsWebsite')?.value;
      
      const result = await updateUserProfile({
        full_name: name,
        phone: phone,
        company_name: company,
        website: website
      });
      
      if (result.success) {
        showToast(i18n.t('settings_saved') || 'Settings saved successfully!', 'success');
        setTimeout(() => window.location.reload(), 1500);
      } else {
        showToast(result.error || 'Update failed', 'error');
      }
    });
  }
  
  // Change password
  const changePasswordBtn = document.getElementById('changePasswordBtn');
  if (changePasswordBtn) {
    const newChangeBtn = changePasswordBtn.cloneNode(true);
    changePasswordBtn.parentNode.replaceChild(newChangeBtn, changePasswordBtn);
    
    newChangeBtn.addEventListener('click', async () => {
      const currentPassword = document.getElementById('currentPassword')?.value;
      const newPassword = document.getElementById('newPassword')?.value;
      const confirmPassword = document.getElementById('confirmPassword')?.value;
      
      if (!currentPassword || !newPassword) {
        showToast('Please fill all password fields', 'error');
        return;
      }
      
      if (newPassword !== confirmPassword) {
        showToast('New passwords do not match', 'error');
        return;
      }
      
      const result = await changePassword(currentPassword, newPassword);
      
      if (result.success) {
        showToast('Password changed successfully!', 'success');
        document.getElementById('currentPassword').value = '';
        document.getElementById('newPassword').value = '';
        document.getElementById('confirmPassword').value = '';
      } else {
        showToast(result.error || 'Password change failed', 'error');
      }
    });
  }
  
  // Avatar upload
  const avatarUpload = document.getElementById('avatarUpload');
  const profileAvatar = document.getElementById('profileAvatar');
  
  if (avatarUpload && profileAvatar) {
    const newAvatarUpload = avatarUpload.cloneNode(true);
    avatarUpload.parentNode.replaceChild(newAvatarUpload, avatarUpload);
    
    newAvatarUpload.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (file) {
        const result = await uploadAvatar(file);
        if (result.success && result.avatarUrl) {
          profileAvatar.src = result.avatarUrl;
          showToast('Avatar updated successfully!', 'success');
        } else {
          showToast(result.error || 'Upload failed', 'error');
        }
      }
    });
  }
  
  // Message panel
  const newMessageBtn = document.getElementById('newMessageBtn');
  const newMessageModal = document.getElementById('newMessageModal');
  
  if (newMessageBtn && newMessageModal) {
    const newBtn = newMessageBtn.cloneNode(true);
    newMessageBtn.parentNode.replaceChild(newBtn, newMessageBtn);
    
    newBtn.addEventListener('click', () => {
      newMessageModal.style.display = 'flex';
    });
  }
  
  const sendNewMessageBtn = document.getElementById('sendNewMessageBtn');
  if (sendNewMessageBtn) {
    const newSendBtn = sendNewMessageBtn.cloneNode(true);
    sendNewMessageBtn.parentNode.replaceChild(newSendBtn, sendNewMessageBtn);
    
    newSendBtn.addEventListener('click', () => {
      const modal = newSendBtn.closest('.modal');
      if (modal) modal.style.display = 'none';
      showToast('Your message has been sent!', 'success');
    });
  }
  
  // Modal close
  const modalClose = document.querySelectorAll('.modal-close, .btn-cancel');
  modalClose.forEach(btn => {
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    
    newBtn.addEventListener('click', () => {
      const modal = newBtn.closest('.modal');
      if (modal) modal.style.display = 'none';
    });
  });
  
  // Message panel conversation
  const messageItems = document.querySelectorAll('.message-item');
  const messagesList = document.getElementById('messagesList');
  const messagePanel = document.getElementById('messagePanel');
  const backButton = document.getElementById('backToMessages');
  
  messageItems.forEach(item => {
    const newItem = item.cloneNode(true);
    item.parentNode.replaceChild(newItem, item);
    
    newItem.addEventListener('click', () => {
      if (messagesList) messagesList.style.display = 'none';
      if (messagePanel) messagePanel.style.display = 'flex';
    });
  });
  
  if (backButton && messagesList && messagePanel) {
    const newBack = backButton.cloneNode(true);
    backButton.parentNode.replaceChild(newBack, backButton);
    
    newBack.addEventListener('click', () => {
      if (messagesList) messagesList.style.display = 'block';
      if (messagePanel) messagePanel.style.display = 'none';
    });
  }
  
  const sendBtn = document.getElementById('sendMessageBtn');
  const messageInput = document.getElementById('messageInput');
  const conversation = document.getElementById('messageConversation');
  
  if (sendBtn && messageInput && conversation) {
    const newSendBtn = sendBtn.cloneNode(true);
    sendBtn.parentNode.replaceChild(newSendBtn, sendBtn);
    
    newSendBtn.addEventListener('click', () => {
      const text = messageInput.value.trim();
      if (text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'conversation-message sent';
        messageDiv.innerHTML = `<p>${escapeHtml(text)}</p><span class="message-time">${i18n.t('just_now') || 'Just now'}</span>`;
        conversation.appendChild(messageDiv);
        messageInput.value = '';
        conversation.scrollTop = conversation.scrollHeight;
      }
    });
  }
  
  // Pay now buttons
  const payButtons = document.querySelectorAll('.btn-pay');
  payButtons.forEach(btn => {
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    
    newBtn.addEventListener('click', () => {
      showToast('Redirecting to payment gateway...', 'info');
    });
  });
  
  // Delete account
  const deleteBtn = document.getElementById('deleteAccountBtn');
  if (deleteBtn) {
    const newDeleteBtn = deleteBtn.cloneNode(true);
    deleteBtn.parentNode.replaceChild(newDeleteBtn, deleteBtn);
    
    newDeleteBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        showToast('Account deletion requested. We\'ll be in touch.', 'warning');
      }
    });
  }
  
  // Upload invoice modal
  const uploadBtn = document.getElementById('uploadInvoiceBtn');
  const uploadModal = document.getElementById('uploadInvoiceModal');
  
  if (uploadBtn && uploadModal) {
    const newUploadBtn = uploadBtn.cloneNode(true);
    uploadBtn.parentNode.replaceChild(newUploadBtn, uploadBtn);
    
    newUploadBtn.addEventListener('click', () => {
      uploadModal.style.display = 'flex';
    });
  }
  
  // File upload handling
  const browseBtn = document.getElementById('browseFileBtn');
  const invoiceFile = document.getElementById('invoiceFile');
  const uploadArea = document.getElementById('uploadArea');
  const uploadProgress = document.getElementById('uploadProgress');
  const confirmUploadBtn = document.getElementById('confirmUploadBtn');
  let selectedFile = null;
  
  if (browseBtn && invoiceFile) {
    const newBrowseBtn = browseBtn.cloneNode(true);
    browseBtn.parentNode.replaceChild(newBrowseBtn, browseBtn);
    
    newBrowseBtn.addEventListener('click', () => {
      invoiceFile.click();
    });
    
    invoiceFile.addEventListener('change', (e) => {
      selectedFile = e.target.files[0];
      if (selectedFile && confirmUploadBtn) {
        confirmUploadBtn.disabled = false;
      }
    });
    
    if (uploadArea) {
      uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
      });
      
      uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
      });
      
      uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        selectedFile = e.dataTransfer.files[0];
        if (selectedFile && confirmUploadBtn) {
          confirmUploadBtn.disabled = false;
        }
      });
    }
  }
  
  if (confirmUploadBtn) {
    const newConfirmBtn = confirmUploadBtn.cloneNode(true);
    confirmUploadBtn.parentNode.replaceChild(newConfirmBtn, confirmUploadBtn);
    
    newConfirmBtn.addEventListener('click', () => {
      if (selectedFile) {
        if (uploadArea) uploadArea.style.display = 'none';
        if (uploadProgress) uploadProgress.style.display = 'block';
        
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          const fill = document.querySelector('#uploadProgress .progress-fill');
          if (fill) fill.style.width = `${progress}%`;
          
          if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              if (uploadModal) uploadModal.style.display = 'none';
              if (uploadArea) uploadArea.style.display = 'flex';
              if (uploadProgress) uploadProgress.style.display = 'none';
              selectedFile = null;
              if (confirmUploadBtn) confirmUploadBtn.disabled = true;
              showToast('Invoice uploaded successfully!', 'success');
            }, 500);
          }
        }, 200);
      }
    });
  }
}

function showToast(message, type = 'info') {
  // حذف توست قبلی اگر وجود داشت
  const existingToast = document.querySelector('.toast-message');
  if (existingToast) existingToast.remove();
  
  const toast = document.createElement('div');
  toast.className = `toast-message ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}