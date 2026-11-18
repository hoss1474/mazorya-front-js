// core/api.js - نسخه اصلاح شده با بهبودهای کامل

import { i18n } from './i18n.js';

// ============================================================
// ⚡ تنظیمات آدرس API - استفاده از متغیر محیطی
// ============================================================

const API_BASE = import.meta.env.VITE_API_URL || 'https://api.mazoryagroup.ir/api';

// ============================================================
// 📦 State Management - جایگزین window.appState
// ============================================================

class AppStore {
    constructor() {
        this.data = {
            services: [],
            projects: [],
            blogs: []
        };
        this._initialized = false;
    }

    setData(key, value) {
        this.data[key] = value;
    }

    getData(key) {
        return this.data[key] || [];
    }

    isInitialized() {
        return this._initialized;
    }

    setInitialized() {
        this._initialized = true;
    }
}

export const appStore = new AppStore();

// ============================================================
// 🔐 مدیریت توکن با حافظه کش
// ============================================================

let _authToken = null;
let _tokenExpiry = null;
let _refreshToken = null;

export function setAuthToken(token, expiresIn, refreshToken = null) {
    _authToken = token;
    _tokenExpiry = Date.now() + (expiresIn * 1000);
    
    if (refreshToken) {
        _refreshToken = refreshToken;
        localStorage.setItem('refresh_token', refreshToken);
    }
    
    localStorage.setItem('auth_token', token);
    localStorage.setItem('token_expires_at', _tokenExpiry);
    
    console.log('🔑 Token saved successfully');
}

export function getAuthToken() {
    // اول از حافظه
    if (_authToken && _tokenExpiry && Date.now() < _tokenExpiry) {
        return _authToken;
    }
    
    // fallback به localStorage
    const token = localStorage.getItem('auth_token');
    const expiresAt = localStorage.getItem('token_expires_at');
    
    if (token && expiresAt && Date.now() < parseInt(expiresAt)) {
        _authToken = token;
        _tokenExpiry = parseInt(expiresAt);
        return token;
    }
    
    // توکن منقضی شده
    if (token) {
        clearAuthData();
    }
    
    return null;
}

export function getRefreshToken() {
    return _refreshToken || localStorage.getItem('refresh_token');
}

export function clearAuthData() {
    _authToken = null;
    _tokenExpiry = null;
    _refreshToken = null;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('token_expires_at');
    localStorage.removeItem('refresh_token');
}

export function isAuthenticated() {
    const token = getAuthToken();
    if (!token) {
        console.log('❌ isAuthenticated: No valid token');
        return false;
    }
    
    console.log('✅ isAuthenticated: User is authenticated');
    return true;
}

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

export function setUserData(userData) {
    localStorage.setItem('user_data', JSON.stringify(userData));
}

// ============================================================
// 🔄 Refresh Token
// ============================================================

export async function refreshAuthToken() {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
        console.log('❌ No refresh token available');
        return false;
    }
    
    try {
        console.log('🔄 Refreshing token...');
        const response = await fetch(`${API_BASE}/auth/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ refresh_token: refreshToken })
        });
        
        if (!response.ok) {
            throw new Error('Refresh failed');
        }
        
        const data = await response.json();
        
        if (isSuccessResponse(data) && data.data?.access_token) {
            setAuthToken(
                data.data.access_token,
                data.data.expires_in || 7200,
                data.data.refresh_token || refreshToken
            );
            console.log('✅ Token refreshed successfully');
            return true;
        }
        
        return false;
    } catch (error) {
        console.error('❌ Refresh token error:', error);
        clearAuthData();
        return false;
    }
}

// ============================================================
// 🛠️ Helper Functions
// ============================================================

function isSuccessResponse(data) {
    return data?.status === true || data?.is_status === true;
}

function getErrorMessage(data) {
    return data?.message || data?.error || 'خطایی رخ داده است';
}

// ============================================================
// 🌐 Fetch with Retry & Timeout
// ============================================================

async function fetchWithTimeout(url, options = {}, timeout = 15000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
            throw new Error('Request timeout');
        }
        throw error;
    }
}

async function fetchWithRetry(url, options = {}, retries = 3, delay = 1000) {
    let lastError;
    
    for (let i = 0; i < retries; i++) {
        try {
            return await fetchWithTimeout(url, options);
        } catch (error) {
            lastError = error;
            console.warn(`⚠️ Retry ${i + 1}/${retries} failed:`, error.message);
            
            if (i < retries - 1) {
                await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
            }
        }
    }
    
    throw lastError;
}

// ============================================================
// 🔐 Fetch with Authentication
// ============================================================

async function fetchWithAuth(endpoint, options = {}, requireAuth = true) {
    const url = `${API_BASE}${endpoint}`;
    
    let headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        ...options.headers
    };
    
    if (requireAuth) {
        const token = getAuthToken();
        if (!token) {
            throw new Error('Not authenticated');
        }
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    try {
        let response = await fetchWithRetry(url, {
            ...options,
            headers
        });
        
        // اگر توکن منقضی شده بود، سعی کن refresh کنی
        if (response.status === 401 && requireAuth) {
            console.log('🔄 Token expired, attempting refresh...');
            const refreshed = await refreshAuthToken();
            
            if (refreshed) {
                // دوباره درخواست با توکن جدید
                const newToken = getAuthToken();
                headers['Authorization'] = `Bearer ${newToken}`;
                
                response = await fetchWithRetry(url, {
                    ...options,
                    headers
                });
            } else {
                clearAuthData();
                throw new Error('Session expired');
            }
        }
        
        return response;
    } catch (error) {
        console.error('❌ Fetch with auth error:', error);
        throw error;
    }
}

// ============================================================
// 🚀 لاگین کاربر - نسخه بهبود یافته
// ============================================================

export async function loginUser(email, password, rememberMe = false) {
    console.log('=== 🚀 LOGIN FUNCTION STARTED ===');
    console.log('📧 Email:', email);
    
    try {
        const response = await fetchWithTimeout(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify({ email, password })
        });
        
        console.log('📡 Response status:', response.status);
        
        const data = await response.json();
        console.log('📦 Response data received');
        
        if (isSuccessResponse(data) && data.data?.access_token) {
            const { access_token, expires_in = 7200, refresh_token, user } = data.data;
            
            setAuthToken(access_token, expires_in, refresh_token);
            setUserData(user);
            
            console.log('✅ Login successful!');
            return {
                success: true,
                user,
                token: access_token
            };
        }
        
        console.log('❌ Login failed');
        return {
            success: false,
            error: getErrorMessage(data),
            details: data
        };
        
    } catch (error) {
        console.error('=== ❌ LOGIN ERROR ===');
        console.error('Error:', error.message);
        
        let errorMessage = 'خطا در ارتباط با سرور';
        if (error.message === 'Request timeout') {
            errorMessage = '❌ زمان درخواست به پایان رسید';
        } else if (error.message.includes('Failed to fetch')) {
            errorMessage = '❌ سرور در دسترس نیست';
        } else {
            errorMessage = `❌ خطا: ${error.message}`;
        }
        
        return {
            success: false,
            error: errorMessage,
            details: error.message
        };
    }
}

export async function logoutUser() {
    try {
        const token = getAuthToken();
        if (token) {
            await fetchWithAuth('/auth/logout', {
                method: 'POST'
            }, true);
        }
    } catch (error) {
        console.error('Logout error:', error);
    } finally {
        clearAuthData();
        console.log('✅ User logged out');
        window.location.href = '/';
    }
    return { success: true };
}

// ============================================================
// 👤 پروفایل کاربر
// ============================================================

export async function getUserProfile() {
    try {
        const response = await fetchWithAuth('/user/profile', {
            method: 'GET'
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        
        if (isSuccessResponse(data) && data.data) {
            setUserData(data.data);
            return data.data;
        }
        return null;
    } catch (error) {
        console.error('Get user profile error:', error);
        if (error.message === 'Session expired') {
            clearAuthData();
        }
        return null;
    }
}

export async function updateUserProfile(profileData) {
    try {
        const response = await fetchWithAuth('/user/profile', {
            method: 'PUT',
            body: JSON.stringify(profileData)
        });
        
        const data = await response.json();
        
        if (response.ok && isSuccessResponse(data)) {
            if (data.data) {
                setUserData(data.data);
            }
            return { success: true, user: data.data };
        }
        
        return {
            success: false,
            error: getErrorMessage(data)
        };
    } catch (error) {
        console.error('Update profile error:', error);
        return { success: false, error: error.message };
    }
}

export async function uploadAvatar(file) {
    const formData = new FormData();
    formData.append('avatar', file);
    
    try {
        const response = await fetchWithAuth('/user/avatar', {
            method: 'POST',
            headers: {
                'Content-Type': undefined // مهم! برای FormData
            },
            body: formData
        });
        
        const data = await response.json();
        
        if (response.ok && isSuccessResponse(data)) {
            const userData = getUserData();
            if (userData && data.data?.avatar_url) {
                userData.avatar = data.data.avatar_url;
                setUserData(userData);
            }
            return {
                success: true,
                avatarUrl: data.data?.avatar_url
            };
        }
        
        return {
            success: false,
            error: getErrorMessage(data)
        };
    } catch (error) {
        console.error('Upload avatar error:', error);
        return { success: false, error: error.message };
    }
}

export async function changePassword(currentPassword, newPassword) {
    try {
        const response = await fetchWithAuth('/user/password', {
            method: 'PUT',
            body: JSON.stringify({
                current_password: currentPassword,
                new_password: newPassword,
                new_password_confirmation: newPassword
            })
        });
        
        const data = await response.json();
        
        return {
            success: response.ok && isSuccessResponse(data),
            error: getErrorMessage(data)
        };
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
        const response = await fetchWithRetry(`${API_BASE}/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ email })
        });
        
        const data = await response.json();
        console.log('📥 Forgot password response:', data);
        
        return {
            success: response.ok,
            message: getErrorMessage(data)
        };
    } catch (error) {
        console.error('Forgot password error:', error);
        return { success: false, error: error.message };
    }
}

export async function resetPassword(email, code, password) {
    try {
        const response = await fetchWithRetry(`${API_BASE}/reset-password`, {
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
        
        return {
            success: response.ok,
            message: getErrorMessage(data)
        };
    } catch (error) {
        console.error('Reset password error:', error);
        return { success: false, error: error.message };
    }
}

// ============================================================
// 📁 پروژه‌های کاربر
// ============================================================

export async function getUserProjects() {
    try {
        const response = await fetchWithAuth('/user/projects', {
            method: 'GET'
        });
        
        if (!response.ok) {
            console.log('❌ getUserProjects failed:', response.status);
            return [];
        }
        
        const data = await response.json();
        console.log('📥 User projects:', data?.data?.length || 0);
        return data?.data || [];
    } catch (error) {
        console.error('Get user projects error:', error);
        return [];
    }
}

export async function updateProjectProgress(projectId, progress) {
    try {
        const response = await fetchWithAuth(`/user/projects/${projectId}/progress`, {
            method: 'PUT',
            body: JSON.stringify({ progress })
        });
        
        const data = await response.json();
        console.log('📥 Update progress response:', data);
        
        return {
            success: response.ok && isSuccessResponse(data),
            error: getErrorMessage(data)
        };
    } catch (error) {
        console.error('Update project progress error:', error);
        return { success: false, error: error.message };
    }
}

// ============================================================
// 📄 فاکتورها
// ============================================================

export async function getInvoices() {
    try {
        const response = await fetchWithAuth('/user/invoices', {
            method: 'GET'
        });
        
        if (!response.ok) return [];
        
        const data = await response.json();
        console.log('📥 Invoices:', data?.data?.length || 0);
        return data?.data || [];
    } catch (error) {
        console.error('Get invoices error:', error);
        return [];
    }
}

export async function uploadInvoice(projectId, invoiceNumber, file) {
    const formData = new FormData();
    formData.append('client_project_id', projectId);
    formData.append('invoice_number', invoiceNumber);
    formData.append('file', file);
    
    try {
        const response = await fetchWithAuth('/user/invoices/upload', {
            method: 'POST',
            headers: {
                'Content-Type': undefined // برای FormData
            },
            body: formData
        });
        
        const data = await response.json();
        console.log('📥 Upload invoice response:', data);
        
        if (response.ok && isSuccessResponse(data)) {
            return {
                success: true,
                invoice: data.data,
                message: getErrorMessage(data)
            };
        }
        
        return {
            success: false,
            error: getErrorMessage(data)
        };
    } catch (error) {
        console.error('Upload invoice error:', error);
        return { success: false, error: error.message };
    }
}

// ============================================================
// 🌐 توابع عمومی (بدون احراز هویت) - با کش بهبود یافته
// ============================================================

const cache = new Map();

async function fetchPublicAPI(endpoint, params = {}, cacheTime = 5 * 60 * 1000) {
    const lang = i18n.getCurrentLanguage();
    const queryParams = new URLSearchParams({ lang, ...params });
    const url = `${API_BASE}${endpoint}?${queryParams}`;
    
    const cacheKey = `${endpoint}_${lang}_${JSON.stringify(params)}`;
    
    // چک کش
    if (cache.has(cacheKey)) {
        const cached = cache.get(cacheKey);
        if (Date.now() - cached.timestamp < cacheTime) {
            console.log(`🔄 Using cached data for: ${endpoint}`);
            return cached.data;
        }
        cache.delete(cacheKey);
    }
    
    try {
        const response = await fetchWithRetry(url, {
            headers: { 'Accept': 'application/json' }
        });
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // ذخیره در کش
        cache.set(cacheKey, {
            data,
            timestamp: Date.now()
        });
        
        return data;
    } catch (error) {
        console.error('API Fetch Error:', error);
        return null;
    }
}

// ============================================================
// 📊 Load Initial Data - بهبود یافته
// ============================================================

export async function loadInitialData() {
    if (appStore.isInitialized()) {
        console.log('✅ Data already loaded');
        return;
    }
    
    try {
        console.log('🔄 Loading initial data...');
        
        const [projectsData, blogsData, servicesData] = await Promise.all([
            fetchPublicAPI('/projects', { limit: 6 }),
            fetchPublicAPI('/blogs', { limit: 4 }),
            fetchPublicAPI('/Services')
        ]);
        
        if (projectsData?.data) {
            appStore.setData('projects', projectsData.data.filter(p => p.is_active));
        }
        
        if (blogsData?.data) {
            appStore.setData('blogs', blogsData.data.filter(b => b.is_active));
        }
        
        if (servicesData?.data) {
            appStore.setData('services', servicesData.data);
        }
        
        appStore.setInitialized();
        console.log('✅ Initial data loaded successfully');
    } catch (error) {
        console.error('Failed to load initial data:', error);
    }
}

// ============================================================
// 📚 Public API Functions
// ============================================================

export async function getProjects(limit = null) {
    const params = limit ? { limit } : {};
    const data = await fetchPublicAPI('/projects', params);
    return data?.data?.filter(p => p.is_active) || [];
}

export async function getProjectBySlug(slug) {
    const lang = i18n.getCurrentLanguage();
    const url = `${API_BASE}/projects/${lang}/${slug}`;
    
    try {
        const response = await fetchWithRetry(url);
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
    const data = await fetchPublicAPI('/blogs', params);
    return data?.data?.filter(b => b.is_active) || [];
}

export async function getBlogById(id) {
    const url = `${API_BASE}/blogs/${id}`;
    try {
        const response = await fetchWithRetry(url);
        if (!response.ok) return null;
        const data = await response.json();
        return data?.data || null;
    } catch (error) {
        console.error('Failed to get blog:', error);
        return null;
    }
}

export async function getServices() {
    const data = await fetchPublicAPI('/Services');
    return data?.data || [];
}

export async function getServiceBySlug(slug) {
    const lang = i18n.getCurrentLanguage();
    const url = `${API_BASE}/Services/${lang}/${slug}`;
    
    try {
        const response = await fetchWithRetry(url);
        if (!response.ok) return null;
        const data = await response.json();
        return data?.data || null;
    } catch (error) {
        console.error('Failed to get service:', error);
        return null;
    }
}

export async function submitContactForm(formData) {
    try {
        const response = await fetchWithRetry(`${API_BASE}/messages`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(getErrorMessage(data));
        }
        
        return {
            success: true,
            message: getErrorMessage(data)
        };
    } catch (error) {
        console.error('Failed to submit form:', error);
        return { success: false, error: error.message };
    }
}

export async function subscribeNewsletter(email) {
    const lang = i18n.getCurrentLanguage();
    try {
        const response = await fetchWithRetry(`${API_BASE}/waiting-list`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, lang })
        });
        
        const data = await response.json();
        
        return {
            success: data.success === true,
            message: getErrorMessage(data)
        };
    } catch (error) {
        console.error('Failed to subscribe:', error);
        return { success: false, message: error.message };
    }
}

// ============================================================
// 🧹 Clear Cache
// ============================================================

export function clearCache() {
    cache.clear();
    console.log('🧹 Cache cleared');
}

// ============================================================
// 📦 Export All
// ============================================================

export default {
    // Auth
    loginUser,
    logoutUser,
    isAuthenticated,
    getAuthToken,
    getUserData,
    refreshAuthToken,
    
    // User Profile
    getUserProfile,
    updateUserProfile,
    uploadAvatar,
    changePassword,
    
    // Projects
    getUserProjects,
    updateProjectProgress,
    
    // Invoices
    getInvoices,
    uploadInvoice,
    
    // Public
    loadInitialData,
    getProjects,
    getProjectBySlug,
    getBlogs,
    getBlogById,
    getServices,
    getServiceBySlug,
    submitContactForm,
    subscribeNewsletter,
    
    // Utils
    clearCache,
    appStore
};