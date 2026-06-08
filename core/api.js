// core/api.js - نسخه نهایی کامل

import { i18n } from './i18n.js';



// ============================================================
// ⚡ تنظیمات آدرس API
// ============================================================

// برای سرور آنلاین
const API_BASE = 'https://api.cardifygroup.com/api';

// برای لوکال (توسعه) - در زمان توسعه کامنت را بردار
// const API_BASE = 'http://127.0.0.1:8000/api';

// ============================================================

// Cache for API responses
const cache = new Map();

// ============================================================
// 🔐 توکن و احراز هویت
// ============================================================

// دریافت توکن از localStorage
export function getAuthToken() {
    const token = localStorage.getItem('auth_token');
    console.log('🔑 Token exists:', !!token);
    return token;
}

// بررسی وضعیت احراز هویت
export function isAuthenticated() {
    const token = getAuthToken();
    const expiresAt = localStorage.getItem('token_expires_at');
    
    if (!token) return false;
    
    if (expiresAt && Date.now() > parseInt(expiresAt)) {
        console.log('⏰ Token expired');
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        localStorage.removeItem('token_expires_at');
        return false;
    }
    
    return true;
}

// دریافت اطلاعات کاربر از localStorage
export function getUserData() {
    try {
        const userDataStr = localStorage.getItem('user_data');
        if (userDataStr && userDataStr !== 'undefined' && userDataStr !== 'null') {
            return JSON.parse(userDataStr);
        }
    } catch (e) {
        console.error('Parse user data error:', e);
        localStorage.removeItem('user_data');
    }
    return null;
}

// خروج از حساب
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
    console.log('✅ User logged out');
    return { success: true };
}

// ============================================================
// 📡 تابع عمومی fetch با مدیریت توکن
// ============================================================

async function fetchWithToken(endpoint, options = {}) {
    const token = getAuthToken();
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers
    };
    
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers
    });
    
    if (response.status === 401) {
        console.log('❌ Unauthorized, redirecting to login');
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        window.location.href = `/${i18n.getCurrentLanguage()}/auth`;
        return null;
    }
    
    return response;
}

// ============================================================
// 🚀 لاگین کاربر
// ============================================================

export async function loginUser(email, password, rememberMe = false) {
    try {
        console.log('📤 Login request for:', email);
        
        const response = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        console.log('📥 Login response:', data);
        
        if (data.is_status === true && data.data?.access_token) {
            localStorage.setItem('auth_token', data.data.access_token);
            localStorage.setItem('user_data', JSON.stringify(data.data.user));
            const expiresAt = Date.now() + (2 * 60 * 60 * 1000);
            localStorage.setItem('token_expires_at', expiresAt);
            
            console.log('✅ Login successful, token saved');
            return { success: true, user: data.data.user };
        }
        
        return { success: false, error: data.message || 'ورود ناموفق بود' };
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, error: 'خطا در ارتباط با سرور' };
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
            if (response.status === 401) return null;
            throw new Error(`HTTP ${response.status}`);
        }
        
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
// ============================================================
// 📧 فراموشی رمز عبور (Forgot Password)
// ============================================================

export async function forgotPassword(email) {
    try {
        const response = await fetch(`${API_BASE}/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ email })
        });
        
        const data = await response.json();
        console.log('📥 Forgot password response:', data);
        
        return { success: response.ok, error: data.message };
    } catch (error) {
        console.error('Forgot password error:', error);
        return { success: false, error: error.message };
    }
}

export async function resetPassword(email, code, password) {
    try {
        const response = await fetch(`${API_BASE}/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ 
                email, 
                code, 
                password,
                password_confirmation: password 
            })
        });
        
        const data = await response.json();
        console.log('📥 Reset password response:', data);
        
        return { success: response.ok, error: data.message };
    } catch (error) {
        console.error('Reset password error:', error);
        return { success: false, error: error.message };
    }
}
// ============================================================
// 📁 پروژه‌ها
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

// ============================================================
// 📝 پروژه‌های عمومی (بدون توکن)
// ============================================================

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
        if (!response.ok) return null;
        const data = await response.json();
        return data?.data || null;
    } catch (error) {
        console.error('Failed to get project:', error);
        return null;
    }
}

async function getBlogs(limit = null) {
    const params = limit ? { limit } : {};
    const data = await fetchAPI('/blogs', params);
    return data?.data?.filter(b => b.is_active) || [];
}

async function getBlogById(id) {
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

async function getServices() {
    const data = await fetchAPI('/Services');
    return data?.data || [];
}

async function getServiceBySlug(slug) {
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
// 📤 خروجی‌ها
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
    subscribeNewsletter,
    getUserData,        // ✅ این خط را اضافه کن
    isAuthenticated,    // ✅ این خط را اضافه کن
    getAuthToken,       // ✅ این خط را اضافه کن
    logoutUser,         // ✅ این خط را اضافه کن
    loginUser,          // ✅ این خط را اضافه کن
    getUserProfile,     // ✅ این خط را اضافه کن
    updateUserProfile,  // ✅ این خط را اضافه کن
    uploadAvatar,       // ✅ این خط را اضافه کن
    changePassword,     // ✅ این خط را اضافه کن
    forgotPassword,     // ✅ این خط را اضافه کن
    resetPassword,      // ✅ این خط را اضافه کن
    getUserProjects,    // ✅ این خط را اضافه کن
    getInvoices         // ✅ این خط را اضافه کن
};