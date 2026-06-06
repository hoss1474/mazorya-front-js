// core/api.js - API Management (Improved Error Handling)

import { i18n } from './i18n.js';

// ✅ تصحیح آدرس پایه API (اگر نیاز به تغییر داشت)
// به جای https://api.cardifygroup.com/api'
// معمولاً آدرس صحیح به صورت https://api.cardifygroup.com است
// بستگی به تنظیمات سرور شما دارد. در حال حاضر همان آدرس قبلی را نگه می‌داریم،
// اما خطاهای آن را بهتر مدیریت می‌کنیم.
const API_BASE = 'https://api.cardifygroup.com/api';

// Cache for API responses
const cache = new Map();

// تابع通用 برای درخواست‌های API با مدیریت خطای بهتر
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
    
    // اگر سرور پاسخ ناموفق داد (مثل 404)
    if (!response.ok) {
      console.warn(`API Warning: ${url} returned status ${response.status}`);
      // به جای throw، یک ساختار داده خالی برگردان تا سایت کرش نکند
      return { data: [], message: 'Service temporarily unavailable', status: response.status };
    }
    
    const data = await response.json();
    
    // Cache for 5 minutes
    cache.set(cacheKey, data);
    setTimeout(() => cache.delete(cacheKey), 5 * 60 * 1000);
    
    return data;
  } catch (error) {
    console.error('API Fetch Error:', error);
    // برگرداندن یک ساختار امن برای جلوگیری از خطاهای زنجیره‌ای
    return { data: [], error: true, message: error.message };
  }
}

// Load initial data for homepage (با مدیریت خطا)
async function loadInitialData() {
  // مقداردهی اولیه state با آرایه‌های خالی
  if (!window.appState.data) {
    window.appState.data = { services: [], projects: [], blogs: [] };
  }
  
  try {
    // Load projects for homepage
    const projectsData = await fetchAPI('/projects', { limit: 6 });
    if (projectsData?.data && Array.isArray(projectsData.data)) {
      window.appState.data.projects = projectsData.data.filter(p => p.is_active);
    } else {
      window.appState.data.projects = [];
      console.log('No projects data available');
    }
    
    // Load blogs for homepage
    const blogsData = await fetchAPI('/blogs', { limit: 4 });
    if (blogsData?.data && Array.isArray(blogsData.data)) {
      window.appState.data.blogs = blogsData.data.filter(b => b.is_active);
    } else {
      window.appState.data.blogs = [];
      console.log('No blogs data available');
    }
    
    // Load services
    const servicesData = await fetchAPI('/Services');
    if (servicesData?.data && Array.isArray(servicesData.data)) {
      window.appState.data.services = servicesData.data;
    } else {
      window.appState.data.services = [];
      console.log('No services data available');
    }
    
    return true;
  } catch (error) {
    console.error('Failed to load initial data:', error);
    // مطمئن شو حداقل داده‌ها آرایه خالی باشند
    window.appState.data.projects = window.appState.data.projects || [];
    window.appState.data.blogs = window.appState.data.blogs || [];
    window.appState.data.services = window.appState.data.services || [];
    return false;
  }
}

// Get projects
async function getProjects(limit = null) {
  const params = limit ? { limit } : {};
  const data = await fetchAPI('/projects', params);
  const projects = data?.data;
  if (Array.isArray(projects)) {
    return projects.filter(p => p.is_active);
  }
  return [];
}

// Get project by slug
async function getProjectBySlug(slug) {
  const lang = i18n.getCurrentLanguage();
  const url = `${API_BASE}/projects/${lang}/${slug}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.warn(`Project not found: ${slug}`);
      return null;
    }
    const data = await response.json();
    return data?.data || null;
  } catch (error) {
    console.error('Failed to get project:', error);
    return null;
  }
}

// Get blogs
async function getBlogs(limit = null) {
  const params = limit ? { limit } : {};
  const data = await fetchAPI('/blogs', params);
  const blogs = data?.data;
  if (Array.isArray(blogs)) {
    return blogs.filter(b => b.is_active);
  }
  return [];
}

// Get blog by ID
async function getBlogById(id) {
  const url = `${API_BASE}/blogs/${id}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.warn(`Blog not found: ${id}`);
      return null;
    }
    const data = await response.json();
    return data?.data || null;
  } catch (error) {
    console.error('Failed to get blog:', error);
    return null;
  }
}

// Get services
async function getServices() {
  const data = await fetchAPI('/Services');
  const services = data?.data;
  if (Array.isArray(services)) {
    return services;
  }
  return [];
}

// Get service by slug
async function getServiceBySlug(slug) {
  const lang = i18n.getCurrentLanguage();
  const url = `${API_BASE}/Services/${lang}/${slug}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.warn(`Service not found: ${slug}`);
      return null;
    }
    const data = await response.json();
    return data?.data || null;
  } catch (error) {
    console.error('Failed to get service:', error);
    return null;
  }
}

// Submit contact form
async function submitContactForm(formData) {
  const url = `${API_BASE}/messages`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      return { success: false, error: `Server error: ${response.status}` };
    }
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Failed to submit form:', error);
    // در محیط توسعه خطا را نشان بده، اما درخواست را به عنوان موفقیت آمیز علامت نزن
    return { success: false, error: error.message };
  }
}

// Submit newsletter subscription
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
    // فرض بر این است که سرور در صورت موفقیت success: true برمی‌گرداند
    return { success: data?.success === true, message: data?.message || (data?.success ? 'Subscribed!' : 'Subscription failed') };
  } catch (error) {
    console.error('Failed to subscribe:', error);
    return { success: false, message: error.message };
  }
}

// ============================================================
// جدید - Auth APIs (Login with Email/Password & Phone/OTP)
// ============================================================

// Login with email and password
export async function loginUser(identifier, password, rememberMe, method = 'email') {
  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password, rememberMe, method })
    });
    
    const data = await response.json();
    
    if (response.ok && data.token) {
      localStorage.setItem('auth_token', data.token);
      if (data.user) localStorage.setItem('user_data', JSON.stringify(data.user));
      return { success: true, user: data.user };
    }
    
    return { success: false, error: data.message || 'Login failed' };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: error.message };
  }
}

// Send OTP to phone number
export async function sendOtp(phoneNumber) {
  try {
    const response = await fetch(`${API_BASE}/auth/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: phoneNumber })
    });
    
    const data = await response.json();
    return { success: response.ok, error: data.message };
  } catch (error) {
    console.error('Send OTP error:', error);
    return { success: false, error: error.message };
  }
}

// Verify OTP and login
export async function verifyOtp(phoneNumber, otp) {
  try {
    const response = await fetch(`${API_BASE}/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: phoneNumber, otp })
    });
    
    const data = await response.json();
    
    if (response.ok && data.token) {
      localStorage.setItem('auth_token', data.token);
      if (data.user) localStorage.setItem('user_data', JSON.stringify(data.user));
      return { success: true, user: data.user };
    }
    
    return { success: false, error: data.message || 'Verification failed' };
  } catch (error) {
    console.error('Verify OTP error:', error);
    return { success: false, error: error.message };
  }
}

// Check if user is authenticated
export function isAuthenticated() {
  const token = localStorage.getItem('auth_token');
  return !!token;
}

// Get auth token
export function getAuthToken() {
  return localStorage.getItem('auth_token');
}

// Logout user
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
  }
  return { success: true };
}

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