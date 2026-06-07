// core/api.js - نسخه نهایی کامل

import { i18n } from './i18n.js';

// ============================================================
// ⚡ تنظیمات آدرس API
// ============================================================
const API_BASE = 'https://api.cardifygroup.com/api';

// ============================================================

// Cache for API responses
const cache = new Map();

// تابع عمومی برای درخواست‌های API
async function fetchAPI(endpoint, params = {}) {
  const lang = i18n.getCurrentLanguage();
  const queryParams = new URLSearchParams({ lang, ...params });
  const url = `${API_BASE}${endpoint}?${queryParams}`;
  
  const cacheKey = `${endpoint}_${lang}_${JSON.stringify(params)}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    const data = await response.json();
    
    cache.set(cacheKey, data);
    setTimeout(() => cache.delete(cacheKey), 5 * 60 * 1000);
    
    return data;
  } catch (error) {
    console.error('API Fetch Error:', error);
    return null;
  }
}

// ============================================================
// 📦 Load Initial Data
// ============================================================
async function loadInitialData() {
  if (!window.appState.data) {
    window.appState.data = { services: [], projects: [], blogs: [] };
  }
  
  try {
    const projectsData = await fetchAPI('/projects', { limit: 6 });
    if (projectsData?.data) {
      window.appState.data.projects = projectsData.data.filter(p => p.is_active);
    }
    
    const blogsData = await fetchAPI('/blogs', { limit: 4 });
    if (blogsData?.data) {
      window.appState.data.blogs = blogsData.data.filter(b => b.is_active);
    }
    
    const servicesData = await fetchAPI('/Services');
    if (servicesData?.data) {
      window.appState.data.services = servicesData.data;
    }
  } catch (error) {
    console.error('Failed to load initial data:', error);
  }
}

// ============================================================
// 📁 Projects APIs
// ============================================================
async function getProjects(limit = null) {
  const params = limit ? { limit } : {};
  const data = await fetchAPI('/projects', params);
  return data?.data?.filter(p => p.is_active) || [];
}

async function getProjectBySlug(slug) {
  const lang = i18n.getCurrentLanguage();
  const url = `${API_BASE}/projects/${lang}/${slug}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    const data = await response.json();
    return data?.data || null;
  } catch (error) {
    console.error('Failed to get project:', error);
    return null;
  }
}

// ============================================================
// 📝 Blogs APIs
// ============================================================
async function getBlogs(limit = null) {
  const params = limit ? { limit } : {};
  const data = await fetchAPI('/blogs', params);
  return data?.data?.filter(b => b.is_active) || [];
}

async function getBlogById(id) {
  const url = `${API_BASE}/blogs/${id}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    const data = await response.json();
    return data?.data || null;
  } catch (error) {
    console.error('Failed to get blog:', error);
    return null;
  }
}

// ============================================================
// 🔧 Services APIs
// ============================================================
async function getServices() {
  const data = await fetchAPI('/Services');
  return data?.data || [];
}

async function getServiceBySlug(slug) {
  const lang = i18n.getCurrentLanguage();
  const url = `${API_BASE}/Services/${lang}/${slug}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    const data = await response.json();
    return data?.data || null;
  } catch (error) {
    console.error('Failed to get service:', error);
    return null;
  }
}

// ============================================================
// 📧 Contact & Newsletter APIs
// ============================================================
async function submitContactForm(formData) {
  const url = `${API_BASE}/messages`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    if (!response.ok) throw new Error('Server error');
    return { success: true };
  } catch (error) {
    console.error('Failed to submit form:', error);
    return { success: false, error: error.message };
  }
}

async function subscribeNewsletter(email) {
  const lang = i18n.getCurrentLanguage();
  const url = `${API_BASE}/waiting-list`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, lang })
    });
    
    const data = await response.json();
    return { success: data.success === true, message: data.message };
  } catch (error) {
    console.error('Failed to subscribe:', error);
    return { success: false, message: error.message };
  }
}

// ============================================================
// 🔐 Auth APIs (Login, Logout)
// ============================================================

// ورود کاربر
export async function loginUser(email, password, rememberMe = false) {
  try {
    console.log('📤 Sending login request for:', email);
    
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    console.log('📥 Login API response:', data);
    
    if (data.is_status === true && data.data?.access_token) {
      localStorage.setItem('auth_token', data.data.access_token);
      localStorage.setItem('user_data', JSON.stringify(data.data.user));
      const expiresAt = Date.now() + (2 * 60 * 60 * 1000);
      localStorage.setItem('token_expires_at', expiresAt);
      
      console.log('✅ Token saved successfully');
      return { success: true, user: data.data.user };
    }
    
    return { success: false, error: data.message || 'ورود ناموفق بود' };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'خطا در ارتباط با سرور' };
  }
}

// بررسی وضعیت احراز هویت
export function isAuthenticated() {
  const token = localStorage.getItem('auth_token');
  const expiresAt = localStorage.getItem('token_expires_at');
  
  if (!token) return false;
  
  if (expiresAt && Date.now() > parseInt(expiresAt)) {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('token_expires_at');
    return false;
  }
  
  return true;
}

// دریافت توکن
export function getAuthToken() {
  return localStorage.getItem('auth_token');
}

// خروج از حساب
export async function logoutUser() {
  const token = localStorage.getItem('auth_token');
  try {
    if (token) {
      await fetch(`${API_BASE}/auth/logout`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
    }
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('token_expires_at');
  }
  console.log('✅ User logged out');
  return { success: true };
}

// ============================================================
// 👤 Profile APIs
// ============================================================

// دریافت اطلاعات کاربر از localStorage (با مدیریت خطا)
export function getUserData() {
  try {
    const userDataStr = localStorage.getItem('user_data');
    if (userDataStr && userDataStr !== 'undefined' && userDataStr !== 'null') {
      return JSON.parse(userDataStr);
    }
  } catch (e) {
    console.error('Parse user data error:', e);
    // اگر خطا خورد، داده خراب را پاک کن
    localStorage.removeItem('user_data');
  }
  return null;
}
// دریافت اطلاعات کاربر از سرور
export async function getUserProfile() {
  const token = getAuthToken();
  if (!token) return null;
  
  try {
    const response = await fetch(`${API_BASE}/user/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) throw new Error('Failed to fetch profile');
    const data = await response.json();
    
    if (data.status && data.data) {
      localStorage.setItem('user_data', JSON.stringify(data.data));
      return data.data;
    }
    return null;
  } catch (error) {
    console.error('Get user profile error:', error);
    return null;
  }
}

// بروزرسانی اطلاعات کاربر
export async function updateUserProfile(profileData) {
  const token = getAuthToken();
  if (!token) return { success: false, error: 'Not authenticated' };
  
  try {
    const response = await fetch(`${API_BASE}/user/profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profileData)
    });
    
    const data = await response.json();
    
    if (response.ok && data.status) {
      if (data.data) localStorage.setItem('user_data', JSON.stringify(data.data));
      return { success: true, user: data.data };
    }
    
    return { success: false, error: data.message || 'Update failed' };
  } catch (error) {
    console.error('Update profile error:', error);
    return { success: false, error: error.message };
  }
}

// آپلود تصویر پروفایل
export async function uploadAvatar(file) {
  const token = getAuthToken();
  if (!token) return { success: false, error: 'Not authenticated' };
  
  const formData = new FormData();
  formData.append('avatar', file);
  
  try {
    const response = await fetch(`${API_BASE}/user/avatar`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });
    
    const data = await response.json();
    
    if (response.ok && data.status) {
      const userData = getUserData();
      if (userData && data.data?.avatar_url) {
        userData.avatar = data.data.avatar_url;
        localStorage.setItem('user_data', JSON.stringify(userData));
      }
      return { success: true, avatarUrl: data.data?.avatar_url };
    }
    
    return { success: false, error: data.message || 'Upload failed' };
  } catch (error) {
    console.error('Upload avatar error:', error);
    return { success: false, error: error.message };
  }
}

// تغییر رمز عبور
export async function changePassword(currentPassword, newPassword) {
  const token = getAuthToken();
  if (!token) return { success: false, error: 'Not authenticated' };
  
  try {
    const response = await fetch(`${API_BASE}/user/password`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        current_password: currentPassword, 
        new_password: newPassword,
        new_password_confirmation: newPassword
      })
    });
    
    const data = await response.json();
    return { success: response.ok && data.status, error: data.message };
  } catch (error) {
    console.error('Change password error:', error);
    return { success: false, error: error.message };
  }
}

// دریافت پروژه‌های کاربر
export async function getUserProjects() {
  const token = getAuthToken();
  if (!token) return [];
  
  try {
    const response = await fetch(`${API_BASE}/user/projects`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (!response.ok) throw new Error('Failed to fetch projects');
    const data = await response.json();
    return data?.data || [];
  } catch (error) {
    console.error('Get user projects error:', error);
    return [];
  }
}

// دریافت فاکتورها
export async function getInvoices() {
  const token = getAuthToken();
  if (!token) return [];
  
  try {
    const response = await fetch(`${API_BASE}/user/invoices`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (!response.ok) throw new Error('Failed to fetch invoices');
    const data = await response.json();
    return data?.data || [];
  } catch (error) {
    console.error('Get invoices error:', error);
    return [];
  }
}

// ============================================================
// 📤 Exports
// ============================================================

export {
  fetchAPI,
  loadInitialData,
  getProjects,
  getProjectBySlug,
  getBlogs,
  getBlogById,
  getServices,
  getServiceBySlug,
  submitContactForm,
  subscribeNewsletter
};