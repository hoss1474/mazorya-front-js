// core/api.js - نسخه نهایی با تشخیص خودکار محیط

import { i18n } from './i18n.js';

// ============================================================
// ⚡ تشخیص خودکار محیط (محلی یا آنلاین)
// ============================================================

const isLocal = window.location.hostname === 'localhost' || 
                window.location.hostname === '127.0.0.1' ||
                window.location.hostname === '0.0.0.0' ||
                window.location.hostname.includes('192.168.') ||
                window.location.hostname.includes('10.') ||
                window.location.hostname.includes('172.');

// ============================================================
// 🌐 تنظیم آدرس API بر اساس محیط
// ============================================================

const API_BASE = isLocal 
    ? 'http://127.0.0.1:8000/api'  // محیط محلی
    : 'https://api.cardifygroup.com/api';  // محیط آنلاین

console.log(`🌍 Environment: ${isLocal ? 'LOCAL' : 'PRODUCTION'}`);
console.log(`🔗 API Base URL: ${API_BASE}`);

// ============================================================

const cache = new Map();

// ============================================================
// 🔐 توکن و احراز هویت
// ============================================================

export function getAuthToken() {
    const token = localStorage.getItem('auth_token');
    if (token) {
        console.log('🔑 Token found');
    }
    return token;
}

export function isAuthenticated() {
    const token = getAuthToken();
    const expiresAt = localStorage.getItem('token_expires_at');
    
    if (!token) {
        return false;
    }
    
    if (expiresAt && Date.now() > parseInt(expiresAt)) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        localStorage.removeItem('token_expires_at');
        return false;
    }
    
    return true;
}

export function getUserData() {
    try {
        const userDataStr = localStorage.getItem('user_data');
        if (userDataStr && userDataStr !== 'undefined' && userDataStr !== 'null') {
            return JSON.parse(userDataStr);
        }
    } catch (e) {
        localStorage.removeItem('user_data');
    }
    return null;
}

export async function logoutUser() {
    const token = getAuthToken();
    try {
        if (token) {
            await fetch(`${API_BASE}/auth/logout`, {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
        }
    } catch (error) {
        console.error('Logout error:', error);
    } finally {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        localStorage.removeItem('token_expires_at');
    }
    window.location.href = '/';
    return { success: true };
}

// ============================================================
// 🚀 لاگین کاربر
// ============================================================

export async function loginUser(email, password, rememberMe = false) {
    console.log('=== 🚀 LOGIN ===');
    console.log('📧 Email:', email);
    console.log('🔗 API:', API_BASE);
    
    try {
        const response = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        console.log('📡 Response status:', response.status);
        
        const data = await response.json();
        console.log('📦 Response data:', data);
        
        const isSuccess = response.ok && (data.status === true || data.is_status === true);
        const hasToken = data.data?.access_token || data.access_token;
        
        if (isSuccess && hasToken) {
            const token = data.data?.access_token || data.access_token;
            const user = data.data?.user || data.user;
            
            localStorage.setItem('auth_token', token);
            localStorage.setItem('user_data', JSON.stringify(user));
            
            const expiresIn = (data.data?.expires_in || data.expires_in || 7200);
            localStorage.setItem('token_expires_at', Date.now() + (expiresIn * 1000));
            
            console.log('✅ Login successful');
            return { success: true, user: user, token: token };
        }
        
        return { 
            success: false, 
            error: data.message || data.error || 'ورود ناموفق بود'
        };
        
    } catch (error) {
        console.error('❌ Login error:', error);
        return { 
            success: false, 
            error: 'خطا در ارتباط با سرور'
        };
    }
}

// ============================================================
// 👤 پروفایل کاربر
// ============================================================

export async function getUserProfile() {
    const token = getAuthToken();
    if (!token) return null;
    
    try {
        const response = await fetch(`${API_BASE}/user/profile`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            if (response.status === 401) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('user_data');
                return null;
            }
            throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        if ((data.status || data.is_status) && data.data) {
            localStorage.setItem('user_data', JSON.stringify(data.data));
            return data.data;
        }
        return null;
    } catch (error) {
        console.error('Get user profile error:', error);
        return null;
    }
}

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
        
        if (response.ok && (data.status || data.is_status)) {
            if (data.data) localStorage.setItem('user_data', JSON.stringify(data.data));
            return { success: true, user: data.data };
        }
        
        return { success: false, error: data.message || 'Update failed' };
    } catch (error) {
        console.error('Update profile error:', error);
        return { success: false, error: error.message };
    }
}

export async function uploadAvatar(file) {
    const token = getAuthToken();
    if (!token) return { success: false, error: 'Not authenticated' };
    
    const formData = new FormData();
    formData.append('avatar', file);
    
    try {
        const response = await fetch(`${API_BASE}/user/avatar`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData
        });
        
        const data = await response.json();
        
        if (response.ok && (data.status || data.is_status)) {
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
        return { success: response.ok && (data.status || data.is_status), error: data.message };
    } catch (error) {
        console.error('Change password error:', error);
        return { success: false, error: error.message };
    }
}

// ============================================================
// 📧 فراموشی رمز عبور
// ============================================================

export async function forgotPassword(email) {
    try {
        const response = await fetch(`${API_BASE}/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        
        const data = await response.json();
        return { success: response.ok, message: data.message };
    } catch (error) {
        console.error('Forgot password error:', error);
        return { success: false, error: error.message };
    }
}

export async function resetPassword(email, code, password) {
    try {
        const response = await fetch(`${API_BASE}/reset-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                email, 
                code, 
                password,
                password_confirmation: password 
            })
        });
        
        const data = await response.json();
        return { success: response.ok, message: data.message };
    } catch (error) {
        console.error('Reset password error:', error);
        return { success: false, error: error.message };
    }
}

// ============================================================
// 📁 پروژه‌های کاربر
// ============================================================

export async function getUserProjects() {
    const token = getAuthToken();
    if (!token) return [];
    
    try {
        const response = await fetch(`${API_BASE}/user/projects`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) return [];
        const data = await response.json();
        return data?.data || [];
    } catch (error) {
        console.error('Get user projects error:', error);
        return [];
    }
}

export async function updateProjectProgress(projectId, progress) {
    const token = getAuthToken();
    if (!token) return { success: false, error: 'Not authenticated' };
    
    try {
        const response = await fetch(`${API_BASE}/user/projects/${projectId}/progress`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ progress })
        });
        
        const data = await response.json();
        return { success: response.ok && (data.status || data.is_status), error: data.message };
    } catch (error) {
        console.error('Update project progress error:', error);
        return { success: false, error: error.message };
    }
}

// ============================================================
// 📄 فاکتورها
// ============================================================

export async function getInvoices() {
    const token = getAuthToken();
    if (!token) return [];
    
    try {
        const response = await fetch(`${API_BASE}/user/invoices`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) return [];
        const data = await response.json();
        return data?.data || [];
    } catch (error) {
        console.error('Get invoices error:', error);
        return [];
    }
}

export async function uploadInvoice(projectId, invoiceNumber, file) {
    const token = getAuthToken();
    if (!token) return { success: false, error: 'Not authenticated' };
    
    const formData = new FormData();
    formData.append('client_project_id', projectId);
    formData.append('invoice_number', invoiceNumber);
    formData.append('file', file);
    
    try {
        const response = await fetch(`${API_BASE}/user/invoices/upload`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData
        });
        
        const data = await response.json();
        if (response.ok && (data.status || data.is_status)) {
            return { success: true, invoice: data.data, message: data.message };
        }
        return { success: false, error: data.message || 'Upload failed' };
    } catch (error) {
        console.error('Upload invoice error:', error);
        return { success: false, error: error.message };
    }
}

// ============================================================
// 🌐 توابع عمومی (بدون احراز هویت)
// ============================================================

async function fetchAPI(endpoint, params = {}) {
    const lang = i18n.getCurrentLanguage();
    const queryParams = new URLSearchParams({ lang, ...params });
    const url = `${API_BASE}${endpoint}?${queryParams}`;
    
    const cacheKey = `${endpoint}_${lang}_${JSON.stringify(params)}`;
    if (cache.has(cacheKey)) {
        console.log(`🔄 Using cached: ${endpoint}`);
        return cache.get(cacheKey);
    }
    
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);
        
        const response = await fetch(url, { 
            signal: controller.signal,
            headers: { 'Accept': 'application/json' }
        });
        clearTimeout(timeoutId);
        
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

export async function loadInitialData() {
    if (!window.appState?.data) {
        if (!window.appState) window.appState = {};
        window.appState.data = { services: [], projects: [], blogs: [] };
    }
    
    try {
        const [projectsData, blogsData, servicesData] = await Promise.all([
            fetchAPI('/projects', { limit: 6 }),
            fetchAPI('/blogs', { limit: 4 }),
            fetchAPI('/Services')
        ]);
        
        if (projectsData?.data) {
            window.appState.data.projects = projectsData.data.filter(p => p.is_active);
        }
        if (blogsData?.data) {
            window.appState.data.blogs = blogsData.data.filter(b => b.is_active);
        }
        if (servicesData?.data) {
            window.appState.data.services = servicesData.data;
        }
        
        console.log('✅ Initial data loaded');
        return window.appState.data;
    } catch (error) {
        console.error('Failed to load initial data:', error);
        return window.appState.data;
    }
}

export async function getProjects(limit = null) {
    const params = limit ? { limit } : {};
    const data = await fetchAPI('/projects', params);
    return data?.data?.filter(p => p.is_active) || [];
}

export async function getProjectBySlug(slug) {
    const lang = i18n.getCurrentLanguage();
    const url = `${API_BASE}/projects/${lang}/${slug}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) return null;
        const data = await response.json();
        return data?.data || null;
    } catch (error) {
        console.error('Failed to get project:', error);
        return null;
    }
}

export async function getBlogs(limit = null) {
    const params = limit ? { limit } : {};
    const data = await fetchAPI('/blogs', params);
    return data?.data?.filter(b => b.is_active) || [];
}

export async function getBlogById(id) {
    const url = `${API_BASE}/blogs/${id}`;
    try {
        const response = await fetch(url);
        if (!response.ok) return null;
        const data = await response.json();
        return data?.data || null;
    } catch (error) {
        console.error('Failed to get blog:', error);
        return null;
    }
}

export async function getServices() {
    const data = await fetchAPI('/Services');
    return data?.data || [];
}

export async function getServiceBySlug(slug) {
    const lang = i18n.getCurrentLanguage();
    const url = `${API_BASE}/Services/${lang}/${slug}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) return null;
        const data = await response.json();
        return data?.data || null;
    } catch (error) {
        console.error('Failed to get service:', error);
        return null;
    }
}

export async function submitContactForm(formData) {
    const url = `${API_BASE}/messages`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Server error');
        return { success: true, message: data.message };
    } catch (error) {
        console.error('Failed to submit form:', error);
        return { success: false, error: error.message };
    }
}

export async function subscribeNewsletter(email) {
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