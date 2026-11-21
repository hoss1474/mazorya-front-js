
/**
 * Mazorya Group - User Profile
 * File: pages/profile.js
 *
 * Dashboard, Projects, Timeline, Messages,
 * Invoices, Settings and Account Management
 */

import { i18n } from '../core/i18n.js';

import {
  renderHeader,
  attachHeaderEvents
} from '../components/header.js';

import {
  renderFooter,
  attachFooterEvents
} from '../components/footer.js';

import {
  getUserData,
  isAuthenticated,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  changePassword,
  uploadAvatar,
  getUserProjects,
  getInvoices,
  uploadInvoice
} from '../core/api.js';

// ============================================================
// CONFIGURATION
// ============================================================

const API_BASE =
  import.meta.env.VITE_API_URL ||
  'https://api.mazoryagroup.com/api';

const DEFAULT_AVATAR = '/assets/img/default-avatar.png';

const MAX_AVATAR_SIZE = 5 * 1024 * 1024;
const MAX_INVOICE_SIZE = 5 * 1024 * 1024;

const IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp'
];

const INVOICE_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png'
];

const PROFILE_TABS = [
  ['dashboard', 'profile_dashboard', 'Dashboard'],
  ['projects', 'profile_projects', 'My Projects'],
  ['timeline', 'profile_timeline', 'Project Timeline'],
  ['messages', 'profile_messages', 'Messages'],
  ['invoices', 'profile_invoices', 'Invoices'],
  ['settings', 'profile_settings', 'Settings']
];

let renderRequestId = 0;

// ============================================================
// HELPERS
// ============================================================

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function tr(key, fallback = '') {
  const value = i18n.t(key);

  if (
    value == null ||
    value === '' ||
    value === key
  ) {
    return fallback;
  }

  return String(value);
}

function t(key, fallback = '') {
  return escapeHtml(tr(key, fallback));
}

function isRTL(lang) {
  return lang === 'fa' || lang === 'ar';
}

function getString(value, fallback = '') {
  return (
    typeof value === 'string' ||
    typeof value === 'number'
  )
    ? String(value)
    : fallback;
}

function number(value) {
  const result = Number(value);

  return Number.isFinite(result)
    ? result
    : 0;
}

function progressValue(value) {
  return Math.min(
    100,
    Math.max(0, number(value))
  );
}

function money(value) {
  return number(value).toLocaleString('en-US', {
    maximumFractionDigits: 2
  });
}

function getLocale() {
  const lang = i18n.getCurrentLanguage();

  return {
    en: 'en-US',
    fa: 'fa-IR',
    ar: 'ar-SA',
    fr: 'fr-FR',
    de: 'de-DE',
    es: 'es-ES',
    tr: 'tr-TR'
  }[lang] || 'en-US';
}

function parseDate(value) {
  if (!value) return null;

  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? null
    : date;
}

function formatDate(value) {
  const date = parseDate(value);

  if (!date) {
    return tr('unknown', '—');
  }

  return new Intl.DateTimeFormat(getLocale(), {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
}

function daysRemaining(value) {
  const end = parseDate(value);

  if (!end) return null;

  const now = new Date();

  const todayUTC = Date.UTC(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  const endUTC = Date.UTC(
    end.getFullYear(),
    end.getMonth(),
    end.getDate()
  );

  return Math.ceil(
    (endUTC - todayUTC) / 86400000
  );
}

function safeUrl(value, fallback = null) {
  if (
    typeof value !== 'string' ||
    !value.trim()
  ) {
    return fallback;
  }

  const raw = value.trim();

  if (
    raw.startsWith('//') ||
    (
      /^[a-z][a-z\d+.-]*:/i.test(raw) &&
      !/^https?:\/\//i.test(raw)
    )
  ) {
    return fallback;
  }

  try {
    const frontendOrigin = window.location.origin;
    const apiOrigin = new URL(
      API_BASE,
      frontendOrigin
    ).origin;

    let url;

    if (/^https?:\/\//i.test(raw)) {
      url = new URL(raw);
    } else if (
      raw.startsWith('/assets/') ||
      raw.startsWith('assets/')
    ) {
      url = new URL(
        raw.startsWith('/') ? raw : `/${raw}`,
        frontendOrigin
      );
    } else {
      url = new URL(
        `/${raw.replace(/^\/+/, '')}`,
        apiOrigin
      );
    }

    if (
      url.protocol !== 'http:' &&
      url.protocol !== 'https:'
    ) {
      return fallback;
    }

    return url.href;
  } catch {
    return fallback;
  }
}

function getError(result, fallback) {
  return getString(
    result?.error || result?.message,
    fallback
  );
}

function showToast(message, type = 'info') {
  document.querySelectorAll(
    '.toast-message'
  ).forEach(el => el.remove());

  const toast = document.createElement('div');

  const safeType = [
    'success',
    'error',
    'warning',
    'info'
  ].includes(type)
    ? type
    : 'info';

  toast.className = `toast-message ${safeType}`;
  toast.textContent = String(message);
  toast.setAttribute('role', 'status');

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');

    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3500);
}

function setBusy(button, busy) {
  if (!button) return;

  button.disabled = busy;
  button.setAttribute(
    'aria-busy',
    String(busy)
  );
}

// ============================================================
// USER HELPERS
// ============================================================

function getUserName(user) {
  return getString(
    user?.full_name ||
    user?.name ||
    ''
  );
}

function getUserAvatar(user) {
  return safeUrl(
    user?.avatar_url ||
    user?.avatar,
    DEFAULT_AVATAR
  );
}

function getProjectName(project) {
  return getString(
    project?.project_name ||
    project?.name ||
    project?.title,
    tr('untitled_project', 'Untitled Project')
  );
}

function getProjectStatus(project) {
  return getString(project?.status)
    .trim()
    .toLowerCase();
}

function isCompletedProject(project) {
  return [
    'completed',
    'complete',
    'done',
    'finished'
  ].includes(getProjectStatus(project));
}

function isActiveProject(project) {
  return [
    'active',
    'in_progress',
    'in-progress',
    'ongoing'
  ].includes(getProjectStatus(project));
}

function getProjectProgress(project) {
  return progressValue(
    project?.project_progress ??
    project?.progress ??
    0
  );
}

function getProjectsSummary(projects) {
  const activeProjects = projects.filter(
    isActiveProject
  ).length;

  const completedProjects = projects.filter(
    isCompletedProject
  ).length;

  const focusedProject =
    projects.find(isActiveProject) ||
    projects[0];

  return {
    activeProjects,
    completedProjects,
    projectProgress: focusedProject
      ? getProjectProgress(focusedProject)
      : 0
  };
}

// ============================================================
// NAVIGATION ICONS
// ============================================================

function icon(name) {
  const icons = {
    dashboard: `
      <rect x="3" y="3" width="7" height="7"/>
      <rect x="14" y="3" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/>
    `,
    projects: `
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
    `,
    timeline: `
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    `,
    messages: `
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    `,
    invoices: `
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="8" y1="13" x2="16" y2="13"/>
      <line x1="8" y1="17" x2="16" y2="17"/>
    `,
    settings: `
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15l1.5 1.5-2.4 2.4L17 17.4a8 8 0 0 1-2 1.2V21h-4v-2.4a8 8 0 0 1-2-1.2l-1.5 1.5-2.4-2.4L6.6 15a8 8 0 0 1-1.2-2H3V9h2.4a8 8 0 0 1 1.2-2L5.1 5.5l2.4-2.4L9 4.6a8 8 0 0 1 2-1.2V1h4v2.4a8 8 0 0 1 2 1.2l1.5-1.5 2.4 2.4L19.4 7a8 8 0 0 1 1.2 2H23v4h-2.4a8 8 0 0 1-1.2 2z"/>
    `,
    logout: `
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    `
  };

  return `
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      aria-hidden="true"
    >
      ${icons[name] || ''}
    </svg>
  `;
}

// ============================================================
// SIDEBAR
// ============================================================

function renderSidebar(user, lang) {
  const status = getString(
    user?.status,
    'active'
  ).toLowerCase();

  const active = status === 'active';

  const navigation = PROFILE_TABS.map(
    ([id, key, fallback], index) => `
      <a
        href="#"
        class="nav-item ${index === 0 ? 'active' : ''}"
        data-tab="${id}"
        aria-current="${index === 0 ? 'page' : 'false'}"
      >
        ${icon(id)}
        <span>${t(key, fallback)}</span>
        ${
          id === 'messages'
            ? `
              <span
                class="nav-badge"
                id="unreadCount"
                style="display:none;"
              >0</span>
            `
            : ''
        }
      </a>
    `
  ).join('');

  return `
    <aside
      class="profile-sidebar ${isRTL(lang) ? 'rtl-sidebar' : ''}"
      id="profileSidebar"
    >

      <button
        type="button"
        class="sidebar-close"
        id="sidebarClose"
        aria-label="${t('close', 'Close')}"
      >✕</button>

      <div class="profile-avatar">

        <div class="avatar-wrapper">

          <img
            src="${escapeHtml(getUserAvatar(user))}"
            alt="${t('profile', 'Profile')}"
            id="profileAvatar"
          />

          <label
            for="avatarUpload"
            class="avatar-upload-btn"
            title="${t('upload_avatar', 'Change avatar')}"
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
          ${escapeHtml(getUserName(user))}
        </h3>

        <p id="profileEmail">
          ${escapeHtml(user?.email)}
        </p>

        ${
          user?.phone
            ? `
              <p class="profile-phone">
                📱 ${escapeHtml(user.phone)}
              </p>
            `
            : ''
        }

        ${
          user?.company_name
            ? `
              <p class="profile-company">
                🏢 ${escapeHtml(user.company_name)}
              </p>
            `
            : ''
        }

        <span class="profile-badge ${active ? 'active' : 'inactive'}">
          ${
            active
              ? t('active', 'Active')
              : t('inactive', 'Inactive')
          }
        </span>

      </div>

      <nav class="profile-nav">
        ${navigation}
      </nav>

      <button
        type="button"
        class="logout-btn"
        id="logoutBtn"
      >
        ${icon('logout')}
        <span>${t('logout', 'Logout')}</span>
      </button>

    </aside>
  `;
}

// ============================================================
// DASHBOARD
// ============================================================

function renderDashboard(user, projects) {
  const summary = getProjectsSummary(projects);

  const amount = number(user?.amount);

  const stats = [
    {
      icon: '📊',
      label: t('active_projects', 'Active Projects'),
      value: summary.activeProjects
    },
    {
      icon: '✅',
      label: t('completed_projects', 'Completed Projects'),
      value: summary.completedProjects
    },
    {
      icon: '💰',
      label: t('total_amount', 'Total Amount'),
      value: `$${money(amount)}`
    },
    {
      icon: '📈',
      label: t('project_progress', 'Project Progress'),
      value: `${summary.projectProgress}%`
    }
  ];

  return `
    <div class="dashboard-header">
      <h1>
        ${t('welcome_back', 'Welcome back')}!
      </h1>

      <p>
        ${t(
          'dashboard_subtitle',
          "Here's what's happening with your projects."
        )}
      </p>
    </div>

    <div class="stats-grid">
      ${stats.map(stat => `
        <div class="stat-card">
          <div class="stat-icon">
            ${stat.icon}
          </div>

          <div class="stat-info">
            <h3>${stat.label}</h3>
            <p class="stat-number">
              ${escapeHtml(stat.value)}
            </p>
          </div>
        </div>
      `).join('')}
    </div>

    <div class="recent-activity">
      <h3>
        ${t('recent_activity', 'Recent Activity')}
      </h3>

      <div class="activity-list" id="activityList">
        <div class="activity-item">
          <div class="activity-icon">📈</div>

          <div class="activity-content">
            <p>
              <strong>
                ${t('project_progress', 'Project Progress')}:
                ${summary.projectProgress}%
              </strong>
            </p>

            <span class="activity-time">
              ${t(
                'current_overview',
                'Current overview'
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ============================================================
// PROJECTS TAB
// ============================================================

function renderProjectsTab(projects) {
  const heading = `
    <div class="projects-header">
      <h1>${t('my_projects', 'My Projects')}</h1>
    </div>
  `;

  if (!projects.length) {
    return `
      ${heading}

      <div class="no-projects">
        <p>${t('no_projects', 'No projects found.')}</p>
      </div>
    `;
  }

  const cards = projects.map((project, index) => {
    const progress = getProjectProgress(project);
    const payments = Array.isArray(project.payments)
      ? project.payments
      : [];

    const contentId = `project-accordion-${index}`;

    return `
      <div class="project-accordion-item">

        <button
          type="button"
          class="project-accordion-header"
          data-project="${contentId}"
          aria-controls="${contentId}"
          aria-expanded="false"
        >
          <div class="project-info">

            <h3 class="project-name">
              ${escapeHtml(getProjectName(project))}
            </h3>

            <div class="project-meta">

              <span class="project-type">
                ${t('project_type', 'Type')}:
                ${escapeHtml(project.project_type || '—')}
              </span>

              <span class="project-progress-badge">
                ${t('progress', 'Progress')}:
                ${progress}%
              </span>

              <span class="project-amount">
                ${t('total_amount', 'Total Amount')}:
                $${money(project.amount)}
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
          id="${contentId}"
          style="display:none;"
        >
          <div class="payments-list">
            <h4>
              ${t('payment_plans', 'Payment Installments')}
            </h4>

            ${
              payments.length
                ? payments.map(payment => {
                  const paid =
                    payment.status === 'paid';

                  return `
                    <div class="payment-item">
                      <div class="payment-info">
                        <span class="payment-title">
                          ${escapeHtml(
                            payment.title ||
                            tr('installment', 'Installment')
                          )}
                        </span>

                        <span class="payment-amount">
                          $${money(payment.amount)}
                        </span>
                      </div>

                      <div class="payment-status ${paid ? 'paid' : 'pending'}">
                        ${
                          paid
                            ? `✓ ${t('paid', 'Paid')}`
                            : `⏳ ${t('pending', 'Pending')}`
                        }
                      </div>
                    </div>
                  `;
                }).join('')
                : `
                  <p class="no-payments">
                    ${t(
                      'no_payments',
                      'No installments found.'
                    )}
                  </p>
                `
            }
          </div>
        </div>

      </div>
    `;
  }).join('');

  return `
    ${heading}

    <div class="projects-list-accordion">
      ${cards}
    </div>
  `;
}

// ============================================================
// TIMELINE
// ============================================================

function getMilestones(progress) {
  const stages = [
    ['start', 'Project Started', 0, 0],
    ['research_phase', 'Research', 25, 10],
    ['design_phase', 'Design', 50, 35],
    ['development_phase', 'Development', 75, 50],
    ['launch', 'Launch', 100, 90]
  ];

  return stages.map(([key, label, completed, active]) => {
    let status = 'pending';

    if (progress >= completed) {
      status = 'completed';
    } else if (progress >= active) {
      status = 'active';
    }

    return {
      title: tr(key, label),
      status
    };
  });
}

function renderTimelineTab(projects) {
  const heading = `
    <div class="timeline-header">
      <h1>
        ${t('project_timeline', 'Project Timeline')}
      </h1>

      <p>
        ${t(
          'timeline_subtitle',
          'Track the progress of your projects.'
        )}
      </p>
    </div>
  `;

  if (!projects.length) {
    return `
      ${heading}
      <div class="no-projects-timeline">
        <p>${t('no_projects', 'No projects found.')}</p>
      </div>
    `;
  }

  const cards = projects.map(project => {
    const progress = getProjectProgress(project);

    const startDate =
      project.created_start ||
      project.start_date ||
      project.created_at;

    const endDate =
      project.created_end ||
      project.end_date;

    const remaining = daysRemaining(endDate);

    const milestones = getMilestones(progress);

    return `
      <div class="project-timeline-card">

        <div class="project-timeline-header">

          <div class="project-title-section">
            <h3 class="project-timeline-name">
              ${escapeHtml(getProjectName(project))}
            </h3>

            <span class="project-progress-badge">
              ${progress}%
            </span>
          </div>

          <div class="project-timeline-dates">

            <div class="date-item">
              <span class="date-label">
                ${t('project_type', 'Project Type')}:
              </span>

              <span class="date-value">
                ${escapeHtml(
                  project.project_type || '—'
                )}
              </span>
            </div>

            <div class="date-item">
              <span class="date-label">
                ${t('start_date', 'Start Date')}:
              </span>

              <span class="date-value">
                ${escapeHtml(formatDate(startDate))}
              </span>
            </div>

            <div class="date-item">
              <span class="date-label">
                ${t('end_date', 'End Date')}:
              </span>

              <span class="date-value">
                ${escapeHtml(formatDate(endDate))}
              </span>
            </div>

            ${
              remaining !== null
                ? `
                  <div class="date-item">
                    <span class="date-label">
                      ${t('days_remaining', 'Days Remaining')}:
                    </span>

                    <span class="date-value ${
                      remaining < 0 ? 'overdue' : ''
                    }">
                      ${Math.max(0, remaining)}
                    </span>
                  </div>
                `
                : ''
            }

          </div>
        </div>

        <div class="timeline-progress-container">
          <div class="timeline-progress-bar">

            <div
              class="timeline-progress-fill"
              style="width:${progress}%;"
            >
              <span class="progress-tooltip">
                ${progress}%
              </span>
            </div>

          </div>
        </div>

        <div class="timeline-milestones-container">
          <div class="milestones-timeline">

            ${milestones.map((milestone, index) => {
              const symbols = {
                completed: '✓',
                active: '●',
                pending: '○'
              };

              const labels = {
                completed: tr('completed', 'Completed'),
                active: tr('in_progress', 'In Progress'),
                pending: tr('pending', 'Pending')
              };

              return `
                <div
                  class="timeline-milestone-item ${milestone.status}"
                  style="--milestone-index:${index};"
                >
                  <div class="milestone-connector"></div>

                  <div class="milestone-node">
                    <span class="milestone-icon">
                      ${symbols[milestone.status]}
                    </span>
                  </div>

                  <div class="milestone-info">
                    <h4 class="milestone-title">
                      ${escapeHtml(milestone.title)}
                    </h4>

                    <p class="milestone-status">
                      ${escapeHtml(
                        labels[milestone.status]
                      )}
                    </p>
                  </div>
                </div>
              `;
            }).join('')}

          </div>
        </div>

      </div>
    `;
  }).join('');

  return `
    ${heading}

    <div class="projects-timeline-list">
      ${cards}
    </div>
  `;
}

// ============================================================
// MESSAGES TAB
// ============================================================

function renderMessagesTab() {
  return `
    <div class="messages-header">

      <h1>
        ${t('messages', 'Messages')}
      </h1>

      <button
        type="button"
        class="btn-new-message"
        id="newMessageBtn"
      >
        ${icon('messages')}
        ${t('new_message', 'New Message')}
      </button>
    </div>

    <div class="messages-container">

      <div class="messages-list" id="messagesList">
        <div class="no-messages">
          <p>
            ${t(
              'messages_unavailable',
              'Messaging is not connected to the server yet.'
            )}
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
            ← ${t('back', 'Back')}
          </button>

          <h3 id="messageReceiver">
            ${t('support_team', 'Support Team')}
          </h3>
        </div>

        <div
          class="message-conversation"
          id="messageConversation"
        ></div>

        <div class="message-input-area">
          <textarea
            id="messageInput"
            placeholder="${t('type_message', 'Type your message...')}"
          ></textarea>

          <button
            type="button"
            id="sendMessageBtn"
            aria-label="${t('send', 'Send')}"
          >
            ${icon('messages')}
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
          <h3>${t('new_message', 'New Message')}</h3>

          <button
            type="button"
            class="modal-close"
            aria-label="${t('close', 'Close')}"
          >&times;</button>
        </div>

        <div class="modal-body">
          <input
            type="text"
            id="messageTo"
            class="modal-input"
            placeholder="${t('to', 'To')}"
          />

          <input
            type="text"
            id="messageSubject"
            class="modal-input"
            placeholder="${t('subject', 'Subject')}"
          />

          <textarea
            id="messageBody"
            rows="5"
            class="modal-textarea"
            placeholder="${t('message', 'Message')}"
          ></textarea>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn-cancel"
          >
            ${t('cancel', 'Cancel')}
          </button>

          <button
            type="button"
            class="btn-send"
            id="sendNewMessageBtn"
          >
            ${t('send', 'Send')}
          </button>
        </div>

      </div>
    </div>
  `;
}

// ============================================================
// INVOICES TAB
// ============================================================

function renderInvoicesTab(invoices) {
  const header = `
    <div class="invoices-header">
      <h1>
        ${t('invoices', 'Invoices & Payments')}
      </h1>

      <button
        type="button"
        class="btn-upload-invoice"
        id="uploadInvoiceBtn"
      >
        ${icon('invoices')}
        ${t('upload_invoice', 'Upload Invoice')}
      </button>
    </div>
  `;

  const invoiceCards = invoices.length
    ? invoices.map(invoice => {
      const paid = invoice.status === 'paid';
      const fileUrl = safeUrl(invoice.file_url);

      return `
        <div class="invoice-card">

          <div class="invoice-status ${
            paid ? 'paid' : 'pending'
          }"></div>

          <div class="invoice-info">

            <h4>
              ${escapeHtml(
                invoice.invoice_number ||
                invoice.title ||
                'Invoice'
              )}
            </h4>

            <p>
              ${escapeHtml(invoice.description)}
            </p>

            <span class="invoice-date">
              ${t('issued', 'Issued')}:
              ${escapeHtml(
                formatDate(invoice.created_at)
              )}
            </span>

          </div>

          <div class="invoice-amount">
            $${money(invoice.amount)}
          </div>

          <div class="invoice-actions">

            ${
              invoice.status === 'pending'
                ? `
                  <button
                    type="button"
                    class="btn-pay"
                  >
                    ${t('pay_now', 'Pay Now')}
                  </button>
                `
                : ''
            }

            <button
              type="button"
              class="btn-download"
              ${
                fileUrl
                  ? `data-file-url="${escapeHtml(fileUrl)}"`
                  : 'disabled'
              }
              title="${t('download', 'Download')}"
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
      `;
    }).join('')
    : `
      <div class="no-invoices">
        <p>
          ${t('no_invoices', 'No invoices found.')}
        </p>
      </div>
    `;

  return `
    ${header}

    <div class="invoices-list" id="invoicesList">
      ${invoiceCards}
    </div>

    <div
      class="modal"
      id="uploadInvoiceModal"
      style="display:none;"
    >
      <div class="modal-content">

        <div class="modal-header">
          <h3>
            ${t('upload_invoice', 'Upload Invoice')}
          </h3>

          <button
            type="button"
            class="modal-close"
            aria-label="${t('close', 'Close')}"
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
              ${t(
                'drag_drop',
                'Drag & drop your invoice here'
              )}
            </p>

            <p class="upload-hint">
              ${t(
                'supported_formats',
                'Supported: PDF, JPG, PNG (max 5MB)'
              )}
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
              ${t('browse_files', 'Browse Files')}
            </button>

            <p id="selectedInvoiceName"></p>
          </div>

          <div
            class="auth-input-group"
            style="margin-top:15px;"
          >
            <label for="invoiceProjectId">
              ${t('project_id', 'Project ID')}
            </label>

            <input
              type="text"
              id="invoiceProjectId"
              class="auth-input"
              placeholder="${t('enter_project_id', 'Enter project ID')}"
            />
          </div>

          <div class="auth-input-group">
            <label for="invoiceNumber">
              ${t('invoice_number', 'Invoice Number')}
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
              ${t('uploading', 'Uploading...')}
            </p>
          </div>

        </div>

        <div class="modal-footer">

          <button
            type="button"
            class="btn-cancel"
          >
            ${t('cancel', 'Cancel')}
          </button>

          <button
            type="button"
            class="btn-upload"
            id="confirmUploadBtn"
            disabled
          >
            ${t('upload', 'Upload')}
          </button>

        </div>

      </div>
    </div>
  `;
}

// ============================================================
// SETTINGS TAB
// ============================================================

function renderSettingsTab(user) {
  const fields = {
    name: escapeHtml(getUserName(user)),
    email: escapeHtml(user?.email),
    phone: escapeHtml(user?.phone),
    company: escapeHtml(user?.company_name),
    website: escapeHtml(user?.website)
  };

  return `
    <div class="settings-header">
      <h1>${t('settings', 'Settings')}</h1>

      <p>
        ${t(
          'settings_subtitle',
          'Manage your account settings and preferences'
        )}
      </p>
    </div>

    <div class="settings-form">

      <div class="settings-section">
        <h3>
          ${t('personal_info', 'Personal Information')}
        </h3>

        <div class="form-row">

          <div class="form-group">
            <label for="settingsName">
              ${t('full_name', 'Full Name')}
            </label>

            <input
              type="text"
              id="settingsName"
              class="settings-input"
              value="${fields.name}"
              maxlength="255"
              autocomplete="name"
            />
          </div>

          <div class="form-group">
            <label for="settingsEmail">
              ${t('email', 'Email')}
            </label>

            <input
              type="email"
              id="settingsEmail"
              class="settings-input"
              value="${fields.email}"
              readonly
              disabled
            />
          </div>

        </div>

        <div class="form-row">

          <div class="form-group">
            <label for="settingsPhone">
              ${t('phone', 'Phone')}
            </label>

            <input
              type="tel"
              id="settingsPhone"
              class="settings-input"
              value="${fields.phone}"
              maxlength="20"
            />
          </div>

          <div class="form-group">
            <label for="settingsCompany">
              ${t('company', 'Company')}
            </label>

            <input
              type="text"
              id="settingsCompany"
              class="settings-input"
              value="${fields.company}"
              maxlength="255"
            />
          </div>

        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="settingsWebsite">
              ${t('website', 'Website')}
            </label>

            <input
              type="url"
              id="settingsWebsite"
              class="settings-input"
              value="${fields.website}"
            />
          </div>
        </div>
      </div>

      <div class="settings-section">

        <h3>
          ${t('change_password', 'Change Password')}
        </h3>

        <div class="form-row">
          <div class="form-group">
            <label for="currentPassword">
              ${t('current_password', 'Current Password')}
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
              ${t('new_password', 'New Password')}
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
              ${t('confirm_password', 'Confirm Password')}
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
          ${t('update_password', 'Update Password')}
        </button>

      </div>

      <div class="settings-actions">

        <button
          type="button"
          class="btn-save-settings"
          id="saveSettingsBtn"
        >
          ${t('save_changes', 'Save Changes')}
        </button>

        <button
          type="button"
          class="btn-delete-account"
          id="deleteAccountBtn"
        >
          ${t('delete_account', 'Delete Account')}
        </button>

      </div>

    </div>
  `;
}

// ============================================================
// PROFILE EVENTS
// ============================================================

function attachProfileEvents(app, user, projects) {
  const sidebar = app.querySelector('#profileSidebar');

  // ----------------------------------------------------------
  // TAB SWITCHING
  // ----------------------------------------------------------

  const navItems = [
    ...app.querySelectorAll('.profile-nav .nav-item')
  ];

  const tabs = [
    ...app.querySelectorAll('.profile-tab')
  ];

  function activateTab(tabName) {
    navItems.forEach(item => {
      const active =
        item.dataset.tab === tabName;

      item.classList.toggle('active', active);

      item.setAttribute(
        'aria-current',
        active ? 'page' : 'false'
      );
    });

    tabs.forEach(tab => {
      tab.classList.toggle(
        'active',
        tab.id === `tab-${tabName}`
      );
    });

    sidebar?.classList.remove('open');
  }

  navItems.forEach(item => {
    item.addEventListener('click', event => {
      event.preventDefault();

      activateTab(item.dataset.tab);
    });
  });

  // ----------------------------------------------------------
  // MOBILE SIDEBAR
  // ----------------------------------------------------------

  app.querySelector('#mobileMenuToggle')
    ?.addEventListener('click', () => {
      sidebar?.classList.toggle('open');
    });

  app.querySelector('#sidebarClose')
    ?.addEventListener('click', () => {
      sidebar?.classList.remove('open');
    });

  // ----------------------------------------------------------
  // PROJECT ACCORDION
  // ----------------------------------------------------------

  app.querySelectorAll(
    '.project-accordion-header'
  ).forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest(
        '.project-accordion-item'
      );

      const content = item?.querySelector(
        '.project-accordion-content'
      );

      if (!content) return;

      const opening =
        content.style.display !== 'block';

      app.querySelectorAll(
        '.project-accordion-content'
      ).forEach(panel => {
        panel.style.display = 'none';

        panel.closest('.project-accordion-item')
          ?.classList.remove('open');
      });

      app.querySelectorAll(
        '.project-accordion-header'
      ).forEach(button => {
        button.setAttribute(
          'aria-expanded',
          'false'
        );
      });

      if (opening) {
        content.style.display = 'block';
        item.classList.add('open');

        header.setAttribute(
          'aria-expanded',
          'true'
        );
      }
    });
  });

  // ----------------------------------------------------------
  // LOGOUT
  // ----------------------------------------------------------

  const logoutButton = app.querySelector(
    '#logoutBtn'
  );

  logoutButton?.addEventListener('click', async () => {
    if (logoutButton.disabled) return;

    setBusy(logoutButton, true);

    try {
      // logoutUser also clears tokens and may redirect.
      await logoutUser();
    } catch (error) {
      console.error('[Profile] Logout error:', error);
    } finally {
      window.location.replace(
        `/${i18n.getCurrentLanguage()}/auth`
      );
    }
  });

  // ----------------------------------------------------------
  // SAVE SETTINGS
  // ----------------------------------------------------------

  const saveButton = app.querySelector(
    '#saveSettingsBtn'
  );

  saveButton?.addEventListener('click', async () => {
    if (saveButton.disabled) return;

    const fullName = app.querySelector(
      '#settingsName'
    )?.value.trim() || '';

    const phone = app.querySelector(
      '#settingsPhone'
    )?.value.trim() || '';

    const company = app.querySelector(
      '#settingsCompany'
    )?.value.trim() || '';

    const website = app.querySelector(
      '#settingsWebsite'
    )?.value.trim() || '';

    if (!fullName) {
      showToast(
        tr('name_required', 'Please enter your name.'),
        'error'
      );
      return;
    }

    if (website) {
      try {
        const parsed = new URL(website);

        if (
          !['http:', 'https:'].includes(parsed.protocol)
        ) {
          throw new Error('Invalid protocol');
        }
      } catch {
        showToast(
          tr('invalid_website', 'Please enter a valid website URL.'),
          'error'
        );
        return;
      }
    }

    setBusy(saveButton, true);

    try {
      const result = await updateUserProfile({
        full_name: fullName,
        phone,
        company_name: company,
        website
      });

      if (result?.success) {
        showToast(
          tr('settings_saved', 'Settings saved successfully!'),
          'success'
        );

        const nameElement = app.querySelector(
          '#profileName'
        );

        if (nameElement) {
          nameElement.textContent = fullName;
        }
      } else {
        showToast(
          getError(
            result,
            tr('update_failed', 'Update failed.')
          ),
          'error'
        );
      }
    } catch (error) {
      console.error('[Profile] Update failed:', error);

      showToast(
        tr('server_error', 'Server connection failed.'),
        'error'
      );
    } finally {
      setBusy(saveButton, false);
    }
  });

  // ----------------------------------------------------------
  // CHANGE PASSWORD
  // ----------------------------------------------------------

  const passwordButton = app.querySelector(
    '#changePasswordBtn'
  );

  passwordButton?.addEventListener('click', async () => {
    if (passwordButton.disabled) return;

    const currentInput = app.querySelector(
      '#currentPassword'
    );

    const newInput = app.querySelector(
      '#newPassword'
    );

    const confirmInput = app.querySelector(
      '#confirmPassword'
    );

    const currentPassword = currentInput?.value || '';
    const newPassword = newInput?.value || '';
    const confirmPassword = confirmInput?.value || '';

    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      showToast(
        tr('required_fields', 'Please complete all fields.'),
        'error'
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast(
        tr('password_mismatch', 'Passwords do not match.'),
        'error'
      );
      return;
    }

    if (newPassword.length < 8) {
      showToast(
        tr(
          'password_length',
          'Password must be at least 8 characters.'
        ),
        'error'
      );
      return;
    }

    setBusy(passwordButton, true);

    try {
      const result = await changePassword(
        currentPassword,
        newPassword
      );

      if (result?.success) {
        showToast(
          tr(
            'password_changed',
            'Password changed successfully!'
          ),
          'success'
        );

        currentInput.value = '';
        newInput.value = '';
        confirmInput.value = '';
      } else {
        showToast(
          getError(
            result,
            tr(
              'password_change_failed',
              'Password change failed.'
            )
          ),
          'error'
        );
      }
    } catch (error) {
      console.error(
        '[Profile] Password change error:',
        error
      );

      showToast(
        tr('server_error', 'Server connection failed.'),
        'error'
      );
    } finally {
      setBusy(passwordButton, false);
    }
  });

  // ----------------------------------------------------------
  // AVATAR UPLOAD
  // ----------------------------------------------------------

  const avatarInput = app.querySelector(
    '#avatarUpload'
  );

  const avatarImage = app.querySelector(
    '#profileAvatar'
  );

  avatarInput?.addEventListener('change', async () => {
    const file = avatarInput.files?.[0];

    if (!file) return;

    if (!IMAGE_TYPES.includes(file.type)) {
      showToast(
        tr(
          'invalid_image',
          'Please select a JPG, PNG or WebP image.'
        ),
        'error'
      );

      avatarInput.value = '';
      return;
    }

    if (file.size > MAX_AVATAR_SIZE) {
      showToast(
        tr('file_too_large', 'Maximum file size is 5MB.'),
        'error'
      );

      avatarInput.value = '';
      return;
    }

    avatarInput.disabled = true;

    try {
      const result = await uploadAvatar(file);

      if (result?.success) {
        const avatarUrl = safeUrl(
          result.avatarUrl
        );

        if (avatarUrl && avatarImage?.isConnected) {
          avatarImage.src = avatarUrl;
        }

        showToast(
          tr('avatar_updated', 'Avatar updated successfully!'),
          'success'
        );
      } else {
        showToast(
          getError(
            result,
            tr('upload_failed', 'Upload failed.')
          ),
          'error'
        );
      }
    } catch (error) {
      console.error('[Profile] Avatar error:', error);

      showToast(
        tr('upload_failed', 'Upload failed.'),
        'error'
      );
    } finally {
      avatarInput.disabled = false;
      avatarInput.value = '';
    }
  });

  // ----------------------------------------------------------
  // MODAL HELPERS
  // ----------------------------------------------------------

  function openModal(modal) {
    if (!modal) return;
    modal.style.display = 'flex';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.style.display = 'none';
  }

  app.querySelectorAll(
    '.modal-close, .btn-cancel'
  ).forEach(button => {
    button.addEventListener('click', () => {
      closeModal(button.closest('.modal'));
    });
  });

  // ----------------------------------------------------------
  // INVOICE UPLOAD
  // ----------------------------------------------------------

  const uploadModal = app.querySelector(
    '#uploadInvoiceModal'
  );

  const uploadButton = app.querySelector(
    '#uploadInvoiceBtn'
  );

  const browseButton = app.querySelector(
    '#browseFileBtn'
  );

  const fileInput = app.querySelector(
    '#invoiceFile'
  );

  const uploadArea = app.querySelector(
    '#uploadArea'
  );

  const uploadProgress = app.querySelector(
    '#uploadProgress'
  );

  const confirmUpload = app.querySelector(
    '#confirmUploadBtn'
  );

  const projectIdInput = app.querySelector(
    '#invoiceProjectId'
  );

  const invoiceNumberInput = app.querySelector(
    '#invoiceNumber'
  );

  const selectedFileName = app.querySelector(
    '#selectedInvoiceName'
  );

  let selectedFile = null;
  let isUploading = false;

  uploadButton?.addEventListener('click', () => {
    openModal(uploadModal);
  });

  browseButton?.addEventListener('click', () => {
    fileInput?.click();
  });

  function validInvoiceFile(file) {
    if (!file) return false;

    if (!INVOICE_TYPES.includes(file.type)) {
      showToast(
        tr(
          'invalid_file',
          'Only PDF, JPG and PNG files are supported.'
        ),
        'error'
      );

      return false;
    }

    if (file.size > MAX_INVOICE_SIZE) {
      showToast(
        tr('file_too_large', 'Maximum file size is 5MB.'),
        'error'
      );

      return false;
    }

    return true;
  }

  function updateUploadButton() {
    if (!confirmUpload || isUploading) return;

    confirmUpload.disabled = !(
      selectedFile &&
      projectIdInput?.value.trim() &&
      invoiceNumberInput?.value.trim()
    );
  }

  function selectInvoice(file) {
    selectedFile = validInvoiceFile(file)
      ? file
      : null;

    if (selectedFileName) {
      selectedFileName.textContent =
        selectedFile?.name || '';
    }

    updateUploadButton();
  }

  fileInput?.addEventListener('change', () => {
    selectInvoice(fileInput.files?.[0]);
  });

  projectIdInput?.addEventListener(
    'input',
    updateUploadButton
  );

  invoiceNumberInput?.addEventListener(
    'input',
    updateUploadButton
  );

  uploadArea?.addEventListener('dragover', event => {
    event.preventDefault();
    uploadArea.classList.add('dragover');
  });

  uploadArea?.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
  });

  uploadArea?.addEventListener('drop', event => {
    event.preventDefault();
    uploadArea.classList.remove('dragover');

    selectInvoice(
      event.dataTransfer?.files?.[0]
    );
  });

  confirmUpload?.addEventListener('click', async () => {
    if (isUploading) return;

    const projectId = projectIdInput?.value.trim();
    const invoiceNumber = invoiceNumberInput?.value.trim();

    if (
      !selectedFile ||
      !projectId ||
      !invoiceNumber
    ) {
      showToast(
        tr('required_fields', 'Please complete all fields.'),
        'error'
      );
      return;
    }

    if (!validInvoiceFile(selectedFile)) {
      return;
    }

    const belongsToUser = projects.some(
      project => String(project.id) === projectId
    );

    if (!belongsToUser) {
      showToast(
        tr(
          'invalid_project',
          'Please enter an ID from your own projects.'
        ),
        'error'
      );
      return;
    }

    isUploading = true;
    setBusy(confirmUpload, true);

    if (uploadProgress) {
      uploadProgress.style.display = 'block';
    }

    if (uploadArea) {
      uploadArea.style.display = 'none';
    }

    try {
      const result = await uploadInvoice(
        projectId,
        invoiceNumber,
        selectedFile
      );

      if (result?.success) {
        showToast(
          tr(
            'invoice_uploaded',
            'Invoice uploaded successfully!'
          ),
          'success'
        );

        closeModal(uploadModal);

        // Refresh server-backed invoices after success.
        window.location.reload();
      } else {
        showToast(
          getError(
            result,
            tr('upload_failed', 'Upload failed.')
          ),
          'error'
        );
      }
    } catch (error) {
      console.error('[Profile] Invoice upload error:', error);

      showToast(
        tr('upload_failed', 'Upload failed.'),
        'error'
      );
    } finally {
      isUploading = false;

      if (uploadProgress) {
        uploadProgress.style.display = 'none';
      }

      if (uploadArea) {
        uploadArea.style.display = '';
      }

      updateUploadButton();
    }
  });

  // ----------------------------------------------------------
  // INVOICE DOWNLOAD
  // ----------------------------------------------------------

  app.querySelectorAll(
    '.btn-download'
  ).forEach(button => {
    button.addEventListener('click', () => {
      const url = safeUrl(
        button.dataset.fileUrl
      );

      if (!url) {
        showToast(
          tr('file_unavailable', 'File not available.'),
          'error'
        );
        return;
      }

      window.open(
        url,
        '_blank',
        'noopener,noreferrer'
      );
    });
  });

  // ----------------------------------------------------------
  // PAYMENT
  // ----------------------------------------------------------

  app.querySelectorAll(
    '.btn-pay'
  ).forEach(button => {
    button.addEventListener('click', () => {
      showToast(
        tr(
          'payment_unavailable',
          'Online payment is not available here yet.'
        ),
        'info'
      );
    });
  });

  // ----------------------------------------------------------
  // MESSAGES
  // ----------------------------------------------------------

  const newMessageModal = app.querySelector(
    '#newMessageModal'
  );

  app.querySelector('#newMessageBtn')
    ?.addEventListener('click', () => {
      openModal(newMessageModal);
    });

  const unavailableMessage = () => {
    showToast(
      tr(
        'messages_unavailable',
        'Messaging is not connected to the server yet.'
      ),
      'info'
    );
  };

  app.querySelector('#sendNewMessageBtn')
    ?.addEventListener('click', unavailableMessage);

  app.querySelector('#sendMessageBtn')
    ?.addEventListener('click', unavailableMessage);

  app.querySelector('#backToMessages')
    ?.addEventListener('click', () => {
      const list = app.querySelector(
        '#messagesList'
      );

      const panel = app.querySelector(
        '#messagePanel'
      );

      if (list) list.style.display = '';
      if (panel) panel.style.display = 'none';
    });

  // ----------------------------------------------------------
  // DELETE ACCOUNT
  // ----------------------------------------------------------

  app.querySelector('#deleteAccountBtn')
    ?.addEventListener('click', () => {
      showToast(
        tr(
          'delete_unavailable',
          'Account deletion is not available through this page yet. Please contact support.'
        ),
        'warning'
      );
    });
}

// ============================================================
// MAIN RENDER
// ============================================================

export async function renderProfile() {
  const app = document.getElementById('app');

  if (!app) {
    console.error('[Profile] #app not found.');
    return;
  }

  const currentLang = i18n.getCurrentLanguage();
  const initialPath = window.location.pathname;
  const requestId = ++renderRequestId;

  if (!isAuthenticated()) {
    window.location.replace(
      `/${currentLang}/auth`
    );
    return;
  }

  // ==========================================================
  // FETCH ACCOUNT INFORMATION
  // ==========================================================

  const cachedUser = getUserData();

  const [
    profileResult,
    projectsResult,
    invoicesResult
  ] = await Promise.allSettled([
    getUserProfile(),
    getUserProjects(),
    getInvoices()
  ]);

  // The server may clear authentication on token expiry.
  if (!isAuthenticated()) {
    window.location.replace(
      `/${currentLang}/auth`
    );
    return;
  }

  // Avoid rendering an outdated navigation request.
  if (
    requestId !== renderRequestId ||
    window.location.pathname !== initialPath ||
    i18n.getCurrentLanguage() !== currentLang
  ) {
    return;
  }

  const serverUser =
    profileResult.status === 'fulfilled'
      ? profileResult.value
      : null;

  const user =
    serverUser ||
    cachedUser;

  const projects =
    projectsResult.status === 'fulfilled' &&
    Array.isArray(projectsResult.value)
      ? projectsResult.value
      : [];

  const invoices =
    invoicesResult.status === 'fulfilled' &&
    Array.isArray(invoicesResult.value)
      ? invoicesResult.value
      : [];

  // Do not invent a valid user profile.
  if (!user) {
   
app.innerHTML = `
  ${renderHeader()}

  <div
    class="mz-profile"
    id="mazoryaProfile"
    dir="${isRTL(currentLang) ? 'rtl' : 'ltr'}"
  >
    <section class="profile-section">
      <div class="profile-container profile-error-container">
        <div class="no-projects">
          <h1>
            ${t('profile_unavailable', 'Unable to load your profile.')}
          </h1>

          <p>
            ${t('try_again', 'Please try again.')}
          </p>

          <button
            type="button"
            class="primary-button"
            id="retryProfile"
          >
            ${t('retry', 'Retry')}
          </button>
        </div>
      </div>
    </section>
  </div>

  ${renderFooter()}
`;


    attachHeaderEvents();
    attachFooterEvents();

    app.querySelector('#retryProfile')
      ?.addEventListener('click', () => {
        window.location.reload();
      });

    return;
  }

  // ==========================================================
  // RENDER ALL TABS
  // ==========================================================

  
app.innerHTML = `
  ${renderHeader()}

  <div
    class="mz-profile"
    id="mazoryaProfile"
    dir="${isRTL(currentLang) ? 'rtl' : 'ltr'}"
  >
    <section class="profile-section">
      <div class="profile-container">

        ${renderSidebar(user, currentLang)}

        <button
          type="button"
          class="mobile-menu-toggle"
          id="mobileMenuToggle"
          aria-label="${t('open_menu', 'Open menu')}"
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
            ${renderDashboard(user, projects)}
          </div>

          <div id="tab-projects" class="profile-tab">
            ${renderProjectsTab(projects)}
          </div>

          <div id="tab-timeline" class="profile-tab">
            ${renderTimelineTab(projects)}
          </div>

          <div id="tab-messages" class="profile-tab">
            ${renderMessagesTab()}
          </div>

          <div id="tab-invoices" class="profile-tab">
            ${renderInvoicesTab(invoices)}
          </div>

          <div id="tab-settings" class="profile-tab">
            ${renderSettingsTab(user)}
          </div>

        </main>
      </div>
    </section>
  </div>

  ${renderFooter()}
`;


  attachHeaderEvents();
  attachFooterEvents();

  attachProfileEvents(app, user, projects);

  console.log(
    '[Profile] Rendered successfully.',
    {
      projects: projects.length,
      invoices: invoices.length,
      profileFromServer: Boolean(serverUser)
    }
  );
}
