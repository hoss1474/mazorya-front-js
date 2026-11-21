
/**
 * Mazorya Group - API Manager
 * File: core/api.js
 */

import { i18n } from './i18n.js';

// ============================================================
// API CONFIGURATION
// ============================================================

const DEFAULT_API_URL = '.';

const configuredApiUrl =
  import.meta.env?.VITE_API_URL || DEFAULT_API_URL;

const API_BASE = String(configuredApiUrl)
  .trim()
  .replace(/\/+$/, '');

const REQUEST_TIMEOUT = 15000;
const PUBLIC_CACHE_TIME = 5 * 60 * 1000;

// ============================================================
// APP STORE
// ============================================================

class AppStore {
  constructor() {
    this.data = {
      services: [],
      projects: [],
      blogs: []
    };

    this._initialized = false;
    this._language = null;
  }

  setData(key, value) {
    this.data[key] = value;
  }

  getData(key) {
    return this.data[key] ?? [];
  }

  isInitialized(lang = i18n.getCurrentLanguage()) {
    return this._initialized && this._language === lang;
  }

  setInitialized(lang = i18n.getCurrentLanguage()) {
    this._initialized = true;
    this._language = lang;
  }

  reset() {
    this._initialized = false;
    this._language = null;

    this.data = {
      services: [],
      projects: [],
      blogs: []
    };
  }
}

export const appStore = new AppStore();

// ============================================================
// STORAGE HELPERS
// ============================================================

function storageGet(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function storageSet(key, value) {
  try {
    localStorage.setItem(key, String(value));
  } catch (error) {
    console.warn('[API] Storage write failed:', error);
  }
}

function storageRemove(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    // Storage might be unavailable.
  }
}

// ============================================================
// AUTH TOKEN MANAGEMENT
// ============================================================

let _authToken = null;
let _tokenExpiry = null;
let _refreshToken = null;
let refreshPromise = null;

export function setAuthToken(
  token,
  expiresIn = 7200,
  refreshToken = null
) {
  if (!token || typeof token !== 'string') {
    return false;
  }

  const expires = Number(expiresIn);
  const duration =
    Number.isFinite(expires) && expires > 0
      ? expires
      : 7200;

  _authToken = token;
  _tokenExpiry = Date.now() + duration * 1000;

  storageSet('auth_token', token);
  storageSet('token_expires_at', _tokenExpiry);

  if (refreshToken) {
    _refreshToken = refreshToken;
    storageSet('refresh_token', refreshToken);
  }

  return true;
}

export function getAuthToken() {
  const now = Date.now();

  if (
    _authToken &&
    _tokenExpiry &&
    now < _tokenExpiry
  ) {
    return _authToken;
  }

  const token = storageGet('auth_token');
  const expiresAt = Number(
    storageGet('token_expires_at')
  );

  if (
    token &&
    Number.isFinite(expiresAt) &&
    expiresAt > now
  ) {
    _authToken = token;
    _tokenExpiry = expiresAt;

    return token;
  }

  // Keep refresh token available for session renewal.
  _authToken = null;
  _tokenExpiry = null;

  return null;
}

export function getRefreshToken() {
  return _refreshToken || storageGet('refresh_token');
}

export function clearAuthData() {
  _authToken = null;
  _tokenExpiry = null;
  _refreshToken = null;

  [
    'auth_token',
    'token_expires_at',
    'refresh_token',
    'user_data'
  ].forEach(storageRemove);
}

export function isAuthenticated() {
  return Boolean(getAuthToken());
}

export function getUserData() {
  try {
    const stored = storageGet('user_data');

    if (
      !stored ||
      stored === 'undefined' ||
      stored === 'null'
    ) {
      return null;
    }

    return JSON.parse(stored);
  } catch (error) {
    console.error('[API] Invalid user data:', error);
    storageRemove('user_data');
    return null;
  }
}

export function setUserData(userData) {
  if (userData == null) {
    storageRemove('user_data');
    return;
  }

  storageSet('user_data', JSON.stringify(userData));
}

// ============================================================
// RESPONSE HELPERS
// ============================================================

function isSuccessResponse(data) {
  return (
    data?.status === true ||
    data?.is_status === true ||
    data?.success === true
  );
}

function getErrorMessage(data) {
  if (typeof data?.message === 'string') {
    return data.message;
  }

  if (typeof data?.error === 'string') {
    return data.error;
  }

  return 'An unexpected error occurred.';
}

async function readJSON(response) {
  const contentType =
    response.headers.get('content-type') || '';

  if (!contentType.toLowerCase().includes('json')) {
    throw new Error(
      `Expected JSON but received ${
        contentType || 'unknown content type'
      } (HTTP ${response.status})`
    );
  }

  return response.json();
}

// ============================================================
// FETCH WITH TIMEOUT
// ============================================================

async function fetchWithTimeout(
  url,
  options = {},
  timeout = REQUEST_TIMEOUT
) {
  const controller = new AbortController();

  const timer = setTimeout(() => {
    controller.abort();
  }, timeout);

  const externalSignal = options.signal;

  const abortHandler = () => controller.abort();

  if (externalSignal) {
    if (externalSignal.aborted) {
      controller.abort();
    } else {
      externalSignal.addEventListener(
        'abort',
        abortHandler,
        { once: true }
      );
    }
  }

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal
    });
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error(
        externalSignal?.aborted
          ? 'Request aborted'
          : 'Request timeout'
      );
    }

    throw error;
  } finally {
    clearTimeout(timer);

    externalSignal?.removeEventListener(
      'abort',
      abortHandler
    );
  }
}

// ============================================================
// FETCH WITH SAFE RETRY
// ============================================================

async function fetchWithRetry(
  url,
  options = {},
  retries = 3
) {
  const method = (options.method || 'GET')
    .toUpperCase();

  // Never automatically repeat non-idempotent requests.
  const attempts = ['GET', 'HEAD'].includes(method)
    ? Math.max(1, retries)
    : 1;

  let lastError;

  for (let attempt = 0; attempt < attempts; attempt++) {
    try {
      return await fetchWithTimeout(url, options);
    } catch (error) {
      lastError = error;

      if (
        options.signal?.aborted ||
        error.message === 'Request aborted'
      ) {
        throw error;
      }

      if (attempt < attempts - 1) {
        await new Promise(resolve => {
          setTimeout(resolve, 500 * (attempt + 1));
        });
      }
    }
  }

  throw lastError;
}

// ============================================================
// REFRESH TOKEN
// ============================================================

export async function refreshAuthToken() {
  if (refreshPromise) {
    return refreshPromise;
  }

  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    return false;
  }

  refreshPromise = (async () => {
    try {
      const response = await fetchWithTimeout(
        `${API_BASE}/auth/refresh`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            refresh_token: refreshToken
          })
        }
      );

      if (!response.ok) {
        throw new Error(
          `Token refresh failed: HTTP ${response.status}`
        );
      }

      const result = await readJSON(response);

      const payload = result?.data || result;

      if (
        isSuccessResponse(result) &&
        payload?.access_token
      ) {
        setAuthToken(
          payload.access_token,
          payload.expires_in || 7200,
          payload.refresh_token || refreshToken
        );

        return true;
      }

      throw new Error('Invalid refresh response');
    } catch (error) {
      console.error('[API] Refresh failed:', error);
      clearAuthData();
      return false;
    }
  })();

  try {
    return await refreshPromise;
  } finally {
    refreshPromise = null;
  }
}

// ============================================================
// AUTHENTICATED FETCH
// ============================================================

async function fetchWithAuth(
  endpoint,
  options = {},
  requireAuth = true
) {
  const url = `${API_BASE}${endpoint}`;

  const headers = new Headers(options.headers || {});

  headers.set('Accept', 'application/json');
  headers.set('X-Requested-With', 'XMLHttpRequest');

  if (options.body instanceof FormData) {
    headers.delete('Content-Type');
  } else if (
    options.body != null &&
    !headers.has('Content-Type')
  ) {
    headers.set('Content-Type', 'application/json');
  }

  if (requireAuth) {
    let token = getAuthToken();

    if (!token && getRefreshToken()) {
      const refreshed = await refreshAuthToken();

      if (refreshed) {
        token = getAuthToken();
      }
    }

    if (!token) {
      throw new Error('Not authenticated');
    }

    headers.set('Authorization', `Bearer ${token}`);
  }

  let response = await fetchWithRetry(url, {
    ...options,
    headers
  });

  if (response.status === 401 && requireAuth) {
    const refreshed = await refreshAuthToken();

    if (!refreshed) {
      throw new Error('Session expired');
    }

    const newToken = getAuthToken();

    if (!newToken) {
      throw new Error('Session expired');
    }

    headers.set('Authorization', `Bearer ${newToken}`);

    response = await fetchWithRetry(url, {
      ...options,
      headers
    });
  }

  return response;
}

// ============================================================
// LOGIN
// ============================================================

export async function loginUser(
  email,
  password,
  rememberMe = false
) {
  try {
    const response = await fetchWithTimeout(
      `${API_BASE}/auth/login`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({ email, password })
      }
    );

    const result = await readJSON(response);
    const payload = result?.data || {};

    if (
      response.ok &&
      isSuccessResponse(result) &&
      payload.access_token
    ) {
      // Remove credentials from any previous session.
      clearAuthData();

      setAuthToken(
        payload.access_token,
        payload.expires_in || 7200,
        payload.refresh_token || null
      );

      if (payload.user) {
        setUserData(payload.user);
      }

      return {
        success: true,
        user: payload.user || null,
        token: payload.access_token
      };
    }

    return {
      success: false,
      error: getErrorMessage(result),
      details: result
    };
  } catch (error) {
    console.error('[API] Login failed:', error);

    return {
      success: false,
      error: error.message,
      details: error.message
    };
  }
}

// ============================================================
// LOGOUT
// ============================================================

export async function logoutUser() {
  try {
    if (getAuthToken() || getRefreshToken()) {
      await fetchWithAuth('/auth/logout', {
        method: 'POST'
      });
    }
  } catch (error) {
    console.warn('[API] Logout request failed:', error);
  } finally {
    clearAuthData();
    window.location.href = '/';
  }

  return { success: true };
}

// ============================================================
// USER PROFILE
// ============================================================

export async function getUserProfile() {
  try {
    const response = await fetchWithAuth(
      '/user/profile',
      { method: 'GET' }
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await readJSON(response);

    if (isSuccessResponse(result) && result.data) {
      setUserData(result.data);
      return result.data;
    }

    return null;
  } catch (error) {
    console.error('[API] Get profile failed:', error);
    return null;
  }
}

export async function updateUserProfile(profileData) {
  try {
    const response = await fetchWithAuth(
      '/user/profile',
      {
        method: 'PUT',
        body: JSON.stringify(profileData)
      }
    );

    const result = await readJSON(response);

    if (response.ok && isSuccessResponse(result)) {
      if (result.data) {
        setUserData(result.data);
      }

      return {
        success: true,
        user: result.data
      };
    }

    return {
      success: false,
      error: getErrorMessage(result)
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

// ============================================================
// AVATAR UPLOAD
// ============================================================

export async function uploadAvatar(file) {
  if (!file) {
    return {
      success: false,
      error: 'Please select a file.'
    };
  }

  const formData = new FormData();
  formData.append('avatar', file);

  try {
    const response = await fetchWithAuth(
      '/user/avatar',
      {
        method: 'POST',
        body: formData
      }
    );

    const result = await readJSON(response);

    if (response.ok && isSuccessResponse(result)) {
      const avatarUrl = result.data?.avatar_url;

      if (avatarUrl) {
        const user = getUserData();

        if (user) {
          user.avatar = avatarUrl;
          setUserData(user);
        }
      }

      return {
        success: true,
        avatarUrl
      };
    }

    return {
      success: false,
      error: getErrorMessage(result)
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

// ============================================================
// CHANGE PASSWORD
// ============================================================

export async function changePassword(
  currentPassword,
  newPassword
) {
  try {
    const response = await fetchWithAuth(
      '/user/password',
      {
        method: 'PUT',
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
          new_password_confirmation: newPassword
        })
      }
    );

    const result = await readJSON(response);

    return {
      success:
        response.ok && isSuccessResponse(result),
      error: response.ok &&
        isSuccessResponse(result)
          ? null
          : getErrorMessage(result)
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

// ============================================================
// FORGOT PASSWORD
// ============================================================

export async function forgotPassword(email) {
  try {
    const response = await fetchWithRetry(
      `${API_BASE}/forgot-password`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      }
    );

    const result = await readJSON(response);

    return {
      success: response.ok,
      message: getErrorMessage(result)
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

// ============================================================
// RESET PASSWORD
// ============================================================

export async function resetPassword(
  email,
  code,
  password
) {
  try {
    const response = await fetchWithRetry(
      `${API_BASE}/reset-password`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          code,
          password,
          password_confirmation: password
        })
      }
    );

    const result = await readJSON(response);

    return {
      success: response.ok,
      message: getErrorMessage(result)
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

// ============================================================
// USER PROJECTS
// ============================================================

export async function getUserProjects() {
  try {
    const response = await fetchWithAuth(
      '/user/projects',
      { method: 'GET' }
    );

    if (!response.ok) return [];

    const result = await readJSON(response);

    return Array.isArray(result.data)
      ? result.data
      : [];
  } catch (error) {
    console.error('[API] User projects error:', error);
    return [];
  }
}

export async function updateProjectProgress(
  projectId,
  progress
) {
  try {
    const id = encodeURIComponent(projectId);

    const response = await fetchWithAuth(
      `/user/projects/${id}/progress`,
      {
        method: 'PUT',
        body: JSON.stringify({ progress })
      }
    );

    const result = await readJSON(response);

    return {
      success:
        response.ok && isSuccessResponse(result),
      error: response.ok &&
        isSuccessResponse(result)
          ? null
          : getErrorMessage(result)
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

// ============================================================
// USER INVOICES
// ============================================================

export async function getInvoices() {
  try {
    const response = await fetchWithAuth(
      '/user/invoices',
      { method: 'GET' }
    );

    if (!response.ok) return [];

    const result = await readJSON(response);

    return Array.isArray(result.data)
      ? result.data
      : [];
  } catch (error) {
    console.error('[API] Invoices error:', error);
    return [];
  }
}

// ============================================================
// INVOICE UPLOAD
// ============================================================

export async function uploadInvoice(
  projectId,
  invoiceNumber,
  file
) {
  if (!file) {
    return {
      success: false,
      error: 'Please select a file.'
    };
  }

  const formData = new FormData();

  formData.append('client_project_id', projectId);
  formData.append('invoice_number', invoiceNumber);
  formData.append('file', file);

  try {
    const response = await fetchWithAuth(
      '/user/invoices/upload',
      {
        method: 'POST',
        body: formData
      }
    );

    const result = await readJSON(response);

    if (response.ok && isSuccessResponse(result)) {
      return {
        success: true,
        invoice: result.data,
        message: getErrorMessage(result)
      };
    }

    return {
      success: false,
      error: getErrorMessage(result)
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

// ============================================================
// PUBLIC API CACHE
// ============================================================

const publicCache = new Map();

async function fetchPublicAPI(
  endpoint,
  params = {},
  cacheTime = PUBLIC_CACHE_TIME
) {
  const lang = i18n.getCurrentLanguage();

  const queryParams = new URLSearchParams({
    ...params,
    lang
  });

  const query = queryParams.toString();
  const url = `${API_BASE}${endpoint}?${query}`;

  // URL includes language and query parameters.
  const cacheKey = url;

  const cached = publicCache.get(cacheKey);

  if (cached) {
    if (Date.now() - cached.timestamp < cacheTime) {
      return cached.data;
    }

    publicCache.delete(cacheKey);
  }

  try {
    const response = await fetchWithRetry(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(
        `API request failed: HTTP ${response.status}`
      );
    }

    const result = await readJSON(response);

    publicCache.set(cacheKey, {
      data: result,
      timestamp: Date.now()
    });

    return result;
  } catch (error) {
    console.error(
      `[API] Public request failed: ${endpoint}`,
      error
    );

    return null;
  }
}

// ============================================================
// PUBLIC DATA HELPERS
// ============================================================

function extractArray(response) {
  return Array.isArray(response?.data)
    ? response.data
    : [];
}

function onlyActive(items) {
  return items.filter(item => {
    return item?.is_active !== false &&
      item?.is_active !== 0;
  });
}

// ============================================================
// INITIAL DATA
// ============================================================

let initialDataPromise = null;
let initialDataLanguage = null;

export async function loadInitialData() {
  const lang = i18n.getCurrentLanguage();

  if (appStore.isInitialized(lang)) {
    return appStore.data;
  }

  if (
    initialDataPromise &&
    initialDataLanguage === lang
  ) {
    return initialDataPromise;
  }

  initialDataLanguage = lang;

  const promise = (async () => {
    const [
      projectsResult,
      blogsResult,
      servicesResult
    ] = await Promise.all([
      fetchPublicAPI('/projects', { limit: 6 }),
      fetchPublicAPI('/blogs', { limit: 4 }),
      fetchPublicAPI('/Services')
    ]);

    // Ignore outdated language requests.
    if (lang !== i18n.getCurrentLanguage()) {
      return null;
    }

    const projects = onlyActive(
      extractArray(projectsResult)
    );

    const blogs = onlyActive(
      extractArray(blogsResult)
    );

    const services = extractArray(servicesResult);

    appStore.setData('projects', projects);
    appStore.setData('blogs', blogs);
    appStore.setData('services', services);

    const successful =
      projectsResult !== null &&
      blogsResult !== null &&
      servicesResult !== null &&
      Array.isArray(projectsResult?.data) &&
      Array.isArray(blogsResult?.data) &&
      Array.isArray(servicesResult?.data);

    if (successful) {
      appStore.setInitialized(lang);
    }

    return appStore.data;
  })();

  initialDataPromise = promise;

  try {
    return await promise;
  } finally {
    if (initialDataPromise === promise) {
      initialDataPromise = null;
      initialDataLanguage = null;
    }
  }
}

// ============================================================
// PROJECTS
// ============================================================

export async function getProjects(limit = null) {
  const params = limit != null ? { limit } : {};

  const result = await fetchPublicAPI(
    '/projects',
    params
  );

  return onlyActive(extractArray(result));
}

export async function getProjectBySlug(slug) {
  const lang = i18n.getCurrentLanguage();

  const endpoint =
    `/projects/${encodeURIComponent(lang)}/` +
    encodeURIComponent(slug);

  try {
    const response = await fetchWithRetry(
      `${API_BASE}${endpoint}`,
      {
        headers: {
          Accept: 'application/json'
        }
      }
    );

    if (!response.ok) return null;

    const result = await readJSON(response);

    return result?.data || null;
  } catch (error) {
    console.error('[API] Project details error:', error);
    return null;
  }
}

// ============================================================
// BLOGS
// ============================================================

export async function getBlogs(limit = null) {
  const params = limit != null ? { limit } : {};

  const result = await fetchPublicAPI(
    '/blogs',
    params
  );

  return onlyActive(extractArray(result));
}

export async function getBlogById(id) {
  const endpoint = `/blogs/${encodeURIComponent(id)}`;

  try {
    const response = await fetchWithRetry(
      `${API_BASE}${endpoint}`,
      {
        headers: {
          Accept: 'application/json'
        }
      }
    );

    if (!response.ok) return null;

    const result = await readJSON(response);

    return result?.data || null;
  } catch (error) {
    console.error('[API] Blog details error:', error);
    return null;
  }
}

// ============================================================
// SERVICES
// ============================================================

export async function getServices() {
  const result = await fetchPublicAPI('/Services');

  return extractArray(result);
}

export async function getServiceBySlug(slug) {
  const lang = i18n.getCurrentLanguage();

  const endpoint =
    `/Services/${encodeURIComponent(lang)}/` +
    encodeURIComponent(slug);

  try {
    const response = await fetchWithRetry(
      `${API_BASE}${endpoint}`,
      {
        headers: {
          Accept: 'application/json'
        }
      }
    );

    if (!response.ok) return null;

    const result = await readJSON(response);

    return result?.data || null;
  } catch (error) {
    console.error('[API] Service details error:', error);
    return null;
  }
}

// ============================================================
// CONTACT FORM
// ============================================================

export async function submitContactForm(formData) {
  try {
    const response = await fetchWithRetry(
      `${API_BASE}/messages`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }
    );

    const result = await readJSON(response);

    if (!response.ok) {
      return {
        success: false,
        error: getErrorMessage(result)
      };
    }

    return {
      success: true,
      message: getErrorMessage(result)
    };
  } catch (error) {
    console.error('[API] Contact form error:', error);

    return {
      success: false,
      error: error.message
    };
  }
}

// ============================================================
// NEWSLETTER
// ============================================================

export async function subscribeNewsletter(email) {
  const lang = i18n.getCurrentLanguage();

  try {
    const response = await fetchWithRetry(
      `${API_BASE}/waiting-list`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, lang })
      }
    );

    const result = await readJSON(response);

    return {
      success:
        response.ok &&
        (
          result?.success === true ||
          isSuccessResponse(result)
        ),
      message: getErrorMessage(result)
    };
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}

// ============================================================
// CACHE MANAGEMENT
// ============================================================

export function clearCache() {
  publicCache.clear();
  appStore.reset();
}

// ============================================================
// DEFAULT EXPORT
// ============================================================

export default {
  // Authentication
  loginUser,
  logoutUser,
  isAuthenticated,
  setAuthToken,
  getAuthToken,
  getRefreshToken,
  clearAuthData,
  getUserData,
  setUserData,
  refreshAuthToken,

  // User profile
  getUserProfile,
  updateUserProfile,
  uploadAvatar,
  changePassword,

  // User projects
  getUserProjects,
  updateProjectProgress,

  // Invoices
  getInvoices,
  uploadInvoice,

  // Password recovery
  forgotPassword,
  resetPassword,

  // Public API
  loadInitialData,
  getProjects,
  getProjectBySlug,
  getBlogs,
  getBlogById,
  getServices,
  getServiceBySlug,
  submitContactForm,
  subscribeNewsletter,

  // Utilities
  clearCache,
  appStore
};
