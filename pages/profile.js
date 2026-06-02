// pages/profile.js - User Profile Page (Complete)

import { i18n } from '../core/i18n.js';
import { renderHeader, attachHeaderEvents } from '../components/header.js';
import { renderFooter, attachFooterEvents } from '../components/footer.js';

// وضعیت سایدبار (باز/بسته در موبایل)
let mobileMenuOpen = false;

export async function renderProfile() {
  const app = document.getElementById('app');
  const currentLang = i18n.getCurrentLanguage();
  const isRTL = currentLang === 'fa' || currentLang === 'ar';
  
  app.innerHTML = `
    ${renderHeader()}
    
    <section class="profile-section">
      <div class="profile-container">
        
        <!-- ===== Sidebar ===== -->
        <aside class="profile-sidebar ${isRTL ? 'rtl-sidebar' : ''}" id="profileSidebar">
          <button class="sidebar-close" id="sidebarClose">✕</button>
          
          <div class="profile-avatar">
            <div class="avatar-wrapper">
              <img src="/assets/img/default-avatar.png" alt="Profile" id="profileAvatar" />
              <label for="avatarUpload" class="avatar-upload-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
              </label>
              <input type="file" id="avatarUpload" accept="image/*" style="display: none;" />
            </div>
            <h3 id="profileName">John Doe</h3>
            <p id="profileEmail">john@example.com</p>
            <span class="profile-badge" id="profileStatus">Active</span>
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
            ${renderDashboard()}
          </div>
          
          <!-- Tab: Projects -->
          <div id="tab-projects" class="profile-tab">
            ${renderProjectsTab()}
          </div>
          
          <!-- Tab: Timeline -->
          <div id="tab-timeline" class="profile-tab">
            ${renderTimelineTab()}
          </div>
          
          <!-- Tab: Messages -->
          <div id="tab-messages" class="profile-tab">
            ${renderMessagesTab()}
          </div>
          
          <!-- Tab: Invoices -->
          <div id="tab-invoices" class="profile-tab">
            ${renderInvoicesTab()}
          </div>
          
          <!-- Tab: Settings -->
          <div id="tab-settings" class="profile-tab">
            ${renderSettingsTab()}
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
function renderDashboard() {
  return `
    <div class="dashboard-header">
      <h1>${i18n.t('welcome_back') || 'Welcome back,'} <span id="userName">John</span>!</h1>
      <p>${i18n.t('dashboard_subtitle') || 'Here\'s what\'s happening with your projects today.'}</p>
    </div>
    
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">📊</div>
        <div class="stat-info">
          <h3>${i18n.t('active_projects') || 'Active Projects'}</h3>
          <p class="stat-number" id="activeProjects">3</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">✅</div>
        <div class="stat-info">
          <h3>${i18n.t('completed_projects') || 'Completed Projects'}</h3>
          <p class="stat-number" id="completedProjects">7</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">💬</div>
        <div class="stat-info">
          <h3>${i18n.t('unread_messages') || 'Unread Messages'}</h3>
          <p class="stat-number" id="unreadMessages">3</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">📄</div>
        <div class="stat-info">
          <h3>${i18n.t('pending_invoices') || 'Pending Invoices'}</h3>
          <p class="stat-number" id="pendingInvoices">2</p>
        </div>
      </div>
    </div>
    
    <div class="recent-activity">
      <h3>${i18n.t('recent_activity') || 'Recent Activity'}</h3>
      <div class="activity-list" id="activityList">
        <div class="activity-item">
          <div class="activity-icon">🚀</div>
          <div class="activity-content">
            <p><strong>Website Redesign</strong> - Progress updated to 45%</p>
            <span class="activity-time">2 hours ago</span>
          </div>
        </div>
        <div class="activity-item">
          <div class="activity-icon">💬</div>
          <div class="activity-content">
            <p><strong>Sarah</strong> sent you a message</p>
            <span class="activity-time">5 hours ago</span>
          </div>
        </div>
        <div class="activity-item">
          <div class="activity-icon">📄</div>
          <div class="activity-content">
            <p><strong>Invoice #INV-001</strong> has been paid</p>
            <span class="activity-time">1 day ago</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ============================================================
// Projects Tab
// ============================================================
function renderProjectsTab() {
  return `
    <div class="projects-header">
      <h1>${i18n.t('my_projects') || 'My Projects'}</h1>
      <button class="btn-new-project" id="newProjectBtn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        ${i18n.t('new_project') || 'New Project'}
      </button>
    </div>
    
    <div class="projects-grid-profile" id="projectsList">
      <div class="project-card-profile">
        <div class="project-status status-active"></div>
        <h3>Website Redesign</h3>
        <p>Complete overhaul of corporate website with modern design</p>
        <div class="project-progress">
          <div class="progress-label">
            <span>Progress</span>
            <span class="progress-percent">45%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: 45%;"></div>
          </div>
        </div>
        <div class="project-deadline">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
          <span>Due: Dec 31, 2025</span>
        </div>
      </div>
      
      <div class="project-card-profile">
        <div class="project-status status-progress"></div>
        <h3>Mobile App Development</h3>
        <p>iOS and Android app for e-commerce platform</p>
        <div class="project-progress">
          <div class="progress-label">
            <span>Progress</span>
            <span class="progress-percent">75%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: 75%;"></div>
          </div>
        </div>
        <div class="project-deadline">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
          <span>Due: Feb 15, 2026</span>
        </div>
      </div>
    </div>
  `;
}

// ============================================================
// Timeline Tab (0 to 100% progress)
// ============================================================
function renderTimelineTab() {
  return `
    <div class="timeline-header">
      <h1>${i18n.t('project_timeline') || 'Project Timeline'}</h1>
      <p>${i18n.t('timeline_subtitle') || 'Track your project progress from start to finish'}</p>
    </div>
    
    <div class="timeline-container">
      <div class="timeline-stats">
        <div class="timeline-stat">
          <span class="stat-label">${i18n.t('current_progress') || 'Current Progress'}</span>
          <span class="stat-value" id="timelineProgress">45%</span>
        </div>
        <div class="timeline-stat">
          <span class="stat-label">${i18n.t('estimated_completion') || 'Estimated Completion'}</span>
          <span class="stat-value">Dec 31, 2025</span>
        </div>
        <div class="timeline-stat">
          <span class="stat-label">${i18n.t('days_remaining') || 'Days Remaining'}</span>
          <span class="stat-value" id="daysRemaining">45</span>
        </div>
      </div>
      
      <div class="timeline-progress-container">
        <div class="timeline-progress-bar">
          <div class="timeline-progress-fill" id="timelineProgressFill" style="width: 45%;">
            <span class="progress-tooltip">45%</span>
          </div>
        </div>
        <div class="timeline-milestones">
          <div class="milestone completed" data-percent="0">
            <div class="milestone-dot"></div>
            <span class="milestone-label">${i18n.t('start') || 'Start'}</span>
            <span class="milestone-date">Jan 2025</span>
          </div>
          <div class="milestone completed" data-percent="25">
            <div class="milestone-dot"></div>
            <span class="milestone-label">${i18n.t('research_phase') || 'Research Phase'}</span>
            <span class="milestone-date">Mar 2025</span>
          </div>
          <div class="milestone active" data-percent="45">
            <div class="milestone-dot"></div>
            <span class="milestone-label">${i18n.t('development_phase') || 'Development Phase'}</span>
            <span class="milestone-date">Jun 2025</span>
          </div>
          <div class="milestone" data-percent="75">
            <div class="milestone-dot"></div>
            <span class="milestone-label">${i18n.t('testing_phase') || 'Testing Phase'}</span>
            <span class="milestone-date">Sep 2025</span>
          </div>
          <div class="milestone" data-percent="100">
            <div class="milestone-dot"></div>
            <span class="milestone-label">${i18n.t('launch') || 'Launch'}</span>
            <span class="milestone-date">Dec 2025</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="progress-update">
      <h3>${i18n.t('update_progress') || 'Update Project Progress'}</h3>
      <div class="progress-slider-container">
        <input type="range" id="progressSlider" min="0" max="100" value="45" step="5" />
        <div class="slider-value">
          <span>${i18n.t('progress') || 'Progress'}:</span>
          <strong id="sliderValue">45%</strong>
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
              <strong>Sarah Johnson</strong>
              <span class="message-time">2 hours ago</span>
            </div>
            <p>Hey! I wanted to check in on the website redesign project...</p>
          </div>
        </div>
        <div class="message-item">
          <div class="message-avatar">M</div>
          <div class="message-content">
            <div class="message-sender">
              <strong>Mike Chen</strong>
              <span class="message-time">Yesterday</span>
            </div>
            <p>The new assets are ready for review. Let me know what you think!</p>
          </div>
        </div>
        <div class="message-item">
          <div class="message-avatar">A</div>
          <div class="message-content">
            <div class="message-sender">
              <strong>Alex Rivera</strong>
              <span class="message-time">3 days ago</span>
            </div>
            <p>Great meeting today! I'll send over the updated timeline soon.</p>
          </div>
        </div>
      </div>
      
      <div class="message-panel" id="messagePanel" style="display: none;">
        <div class="message-panel-header">
          <button class="back-to-messages" id="backToMessages">← Back</button>
          <h3 id="messageReceiver">Sarah Johnson</h3>
        </div>
        <div class="message-conversation" id="messageConversation">
          <div class="conversation-message received">
            <p>Hey! I wanted to check in on the website redesign project. How's everything going?</p>
            <span class="message-time">2 hours ago</span>
          </div>
          <div class="conversation-message sent">
            <p>Everything is on track! We're at 45% completion and should hit the next milestone next week.</p>
            <span class="message-time">1 hour ago</span>
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
    
    <!-- New Message Modal -->
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
function renderInvoicesTab() {
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
    
    <div class="invoices-stats">
      <div class="invoice-stat">
        <span class="stat-label">${i18n.t('total_paid') || 'Total Paid'}</span>
        <span class="stat-value">$12,450</span>
      </div>
      <div class="invoice-stat">
        <span class="stat-label">${i18n.t('pending_payment') || 'Pending Payment'}</span>
        <span class="stat-value">$3,200</span>
      </div>
      <div class="invoice-stat">
        <span class="stat-label">${i18n.t('overdue') || 'Overdue'}</span>
        <span class="stat-value">$0</span>
      </div>
    </div>
    
    <div class="invoices-list" id="invoicesList">
      <div class="invoice-card">
        <div class="invoice-status paid"></div>
        <div class="invoice-info">
          <h4>INV-2025-001</h4>
          <p>Website Redesign - Initial Deposit</p>
          <span class="invoice-date">Issued: Nov 15, 2025</span>
        </div>
        <div class="invoice-amount">$2,500</div>
        <div class="invoice-actions">
          <button class="btn-download" title="Download">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="invoice-card">
        <div class="invoice-status pending"></div>
        <div class="invoice-info">
          <h4>INV-2025-002</h4>
          <p>Mobile App Development - Milestone 2</p>
          <span class="invoice-date">Issued: Dec 01, 2025</span>
        </div>
        <div class="invoice-amount">$3,200</div>
        <div class="invoice-actions">
          <button class="btn-pay">${i18n.t('pay_now') || 'Pay Now'}</button>
          <button class="btn-download" title="Download">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
          </button>
        </div>
      </div>
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
            <p class="upload-status">Uploading...</p>
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
function renderSettingsTab() {
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
            <input type="text" id="settingsName" class="settings-input" value="John Doe" />
          </div>
          <div class="form-group">
            <label>${i18n.t('email') || 'Email'}</label>
            <input type="email" id="settingsEmail" class="settings-input" value="john@example.com" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>${i18n.t('phone') || 'Phone'}</label>
            <input type="tel" id="settingsPhone" class="settings-input" value="+1 234 567 8900" />
          </div>
          <div class="form-group">
            <label>${i18n.t('company') || 'Company'}</label>
            <input type="text" id="settingsCompany" class="settings-input" value="Mazorya Group" />
          </div>
        </div>
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
      </div>
      
      <div class="settings-section">
        <h3>${i18n.t('notifications') || 'Notifications'}</h3>
        <div class="toggle-item">
          <label class="toggle-switch">
            <input type="checkbox" id="emailNotifications" checked />
            <span class="toggle-slider"></span>
          </label>
          <span>${i18n.t('email_notifications') || 'Email notifications about project updates'}</span>
        </div>
        <div class="toggle-item">
          <label class="toggle-switch">
            <input type="checkbox" id="messageNotifications" checked />
            <span class="toggle-slider"></span>
          </label>
          <span>${i18n.t('message_notifications') || 'Push notifications for new messages'}</span>
        </div>
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
  // Tab switching
  const navItems = document.querySelectorAll('.nav-item');
  const tabs = document.querySelectorAll('.profile-tab');
  
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const tabName = item.getAttribute('data-tab');
      
      navItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');
      
      tabs.forEach(tab => tab.classList.remove('active'));
      const activeTab = document.getElementById(`tab-${tabName}`);
      if (activeTab) activeTab.classList.add('active');
      
      // Close sidebar on mobile after click
      if (window.innerWidth <= 768) {
        const sidebar = document.getElementById('profileSidebar');
        sidebar.classList.remove('open');
      }
    });
  });
  
  // Mobile menu toggle
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const sidebar = document.getElementById('profileSidebar');
  const sidebarClose = document.getElementById('sidebarClose');
  
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }
  
  if (sidebarClose) {
    sidebarClose.addEventListener('click', () => {
      sidebar.classList.remove('open');
    });
  }
  
  // Avatar upload
  const avatarUpload = document.getElementById('avatarUpload');
  const profileAvatar = document.getElementById('profileAvatar');
  
  if (avatarUpload) {
    avatarUpload.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          profileAvatar.src = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }
  
  // Progress slider
  const progressSlider = document.getElementById('progressSlider');
  const sliderValue = document.getElementById('sliderValue');
  const timelineProgressFill = document.getElementById('timelineProgressFill');
  const timelineProgress = document.getElementById('timelineProgress');
  
  if (progressSlider) {
    progressSlider.addEventListener('input', (e) => {
      const val = e.target.value;
      if (sliderValue) sliderValue.textContent = `${val}%`;
      if (timelineProgressFill) timelineProgressFill.style.width = `${val}%`;
      if (timelineProgressFill) timelineProgressFill.setAttribute('data-tooltip', `${val}%`);
      if (timelineProgress) timelineProgress.textContent = `${val}%`;
    });
  }
  
  // Update progress button
  const updateBtn = document.getElementById('updateProgressBtn');
  if (updateBtn) {
    updateBtn.addEventListener('click', () => {
      const val = progressSlider?.value || 45;
      // TODO: API call to update project progress
      showToast(`Progress updated to ${val}%!`, 'success');
    });
  }
  
  // Messages - open message
  const messageItems = document.querySelectorAll('.message-item');
  const messagesList = document.getElementById('messagesList');
  const messagePanel = document.getElementById('messagePanel');
  const backButton = document.getElementById('backToMessages');
  
  messageItems.forEach(item => {
    item.addEventListener('click', () => {
      if (messagesList) messagesList.style.display = 'none';
      if (messagePanel) messagePanel.style.display = 'flex';
    });
  });
  
  if (backButton) {
    backButton.addEventListener('click', () => {
      if (messagesList) messagesList.style.display = 'block';
      if (messagePanel) messagePanel.style.display = 'none';
    });
  }
  
  // Send message
  const sendBtn = document.getElementById('sendMessageBtn');
  const messageInput = document.getElementById('messageInput');
  const conversation = document.getElementById('messageConversation');
  
  if (sendBtn && messageInput && conversation) {
    sendBtn.addEventListener('click', () => {
      const text = messageInput.value.trim();
      if (text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'conversation-message sent';
        messageDiv.innerHTML = `<p>${escapeHtml(text)}</p><span class="message-time">Just now</span>`;
        conversation.appendChild(messageDiv);
        messageInput.value = '';
        conversation.scrollTop = conversation.scrollHeight;
      }
    });
  }
  
  // New message modal
  const newMessageBtn = document.getElementById('newMessageBtn');
  const newMessageModal = document.getElementById('newMessageModal');
  const modalClose = document.querySelectorAll('.modal-close, .btn-cancel');
  
  if (newMessageBtn && newMessageModal) {
    newMessageBtn.addEventListener('click', () => {
      newMessageModal.style.display = 'flex';
    });
  }
  
  modalClose.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal');
      if (modal) modal.style.display = 'none';
    });
  });
  
  // Upload invoice modal
  const uploadBtn = document.getElementById('uploadInvoiceBtn');
  const uploadModal = document.getElementById('uploadInvoiceModal');
  
  if (uploadBtn && uploadModal) {
    uploadBtn.addEventListener('click', () => {
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
    browseBtn.addEventListener('click', () => {
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
    confirmUploadBtn.addEventListener('click', () => {
      if (selectedFile) {
        // Simulate upload
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
  
  // Save settings
  const saveBtn = document.getElementById('saveSettingsBtn');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      showToast('Settings saved successfully!', 'success');
    });
  }
  
  // Delete account
  const deleteBtn = document.getElementById('deleteAccountBtn');
  if (deleteBtn) {
    deleteBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        showToast('Account deletion requested. We\'ll be in touch.', 'warning');
      }
    });
  }
}

function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast-message ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('show');
  }, 100);
  
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