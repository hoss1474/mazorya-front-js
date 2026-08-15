// core/api.js - نسخه نهایی با دیباگ کامل

import { i18n } from './i18n.js';

// ============================================================
// ⚡ تنظیمات آدرس API
// ============================================================

// برای سرور آنلاین (در زمان دیپلوی فعال کنید)
// const API_BASE = 'https://api.cardifygroup.com/api';

// برای لوکال (توسعه)
const API_BASE = 'http://127.0.0.1:8000/api';

// ============================================================

const cache = new Map();

// ============================================================
// 🔐 توکن و احراز هویت
// ============================================================

export function getAuthToken() {
    const token = localStorage.getItem('auth_token');
    console.log('🔑 GetAuthToken - Token exists:', !!token);
    if (token) {
        console.log('🔑 Token first 20 chars:', token.substring(0, 20) + '...');
    }
    return token;
}

export function isAuthenticated() {
    const token = getAuthToken();
    const expiresAt = localStorage.getItem('token_expires_at');
    
    if (!token) {
        console.log('❌ isAuthenticated: No token');
        return false;
    }
    
    if (expiresAt && Date.now() > parseInt(expiresAt)) {
        console.log('⏰ isAuthenticated: Token expired');
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        localStorage.removeItem('token_expires_at');
        return false;
    }
    
    console.log('✅ isAuthenticated: User is authenticated');
    return true;
}

export function getUserData() {
    try {
        const userDataStr = localStorage.getItem('user_data');
        if (userDataStr && userDataStr !== 'undefined' && userDataStr !== 'null') {
            const userData = JSON.parse(userDataStr);
            console.log('👤 getUserData:', userData);
            return userData;
        }
    } catch (e) {
        console.error('Parse user data error:', e);
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
    console.log('✅ User logged out');
    window.location.href = '/';
    return { success: true };
}

// ============================================================
// 🚀 لاگین کاربر - نسخه دیباگ کامل
// ============================================================

export async function loginUser(email, password, rememberMe = false) {
    console.log('=== 🚀 LOGIN FUNCTION STARTED ===');
    console.log('📧 Email:', email);
    console.log('🔗 API_BASE:', API_BASE);
    console.log('📍 Full URL:', `${API_BASE}/auth/login`);
    
    try {
        const requestBody = JSON.stringify({ email, password });
        console.log('📦 Request body:', requestBody);
        
        const response = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: requestBody
        });
        
        console.log('📡 Response status:', response.status);
        console.log('📡 Response status text:', response.statusText);
        console.log('📡 Response OK?', response.ok);
        
        // لاگ کردن هدرهای response
        console.log('📡 Response headers:', {
            contentType: response.headers.get('content-type'),
            cors: response.headers.get('access-control-allow-origin')
        });
        
        const data = await response.json();
        console.log('📦 Response data:', data);
        console.log('📦 Data type:', typeof data);
        console.log('📦 Data keys:', Object.keys(data));
        
        // بررسی ساختار پاسخ (هر دو حالت status و is_status)
        const isSuccess = response.ok && (data.status === true || data.is_status === true);
        const hasToken = data.data?.access_token || data.access_token;
        
        console.log('🔍 Checking conditions:', {
            responseOk: response.ok,
            dataStatus: data.status,
            dataIsStatus: data.is_status,
            isSuccess: isSuccess,
            hasToken: hasToken,
            tokenValue: hasToken ? (data.data?.access_token || data.access_token)?.substring(0, 20) : null
        });
        
        if (isSuccess && hasToken) {
            const token = data.data?.access_token || data.access_token;
            const user = data.data?.user || data.user;
            
            console.log('💾 Saving token to localStorage...');
            localStorage.setItem('auth_token', token);
            localStorage.setItem('user_data', JSON.stringify(user));
            
            // زمان انقضا (پیش‌فرض 2 ساعت)
            const expiresIn = (data.data?.expires_in || data.expires_in || 7200);
            const expiresAt = Date.now() + (expiresIn * 1000);
            localStorage.setItem('token_expires_at', expiresAt);
            
            console.log('✅ Token saved successfully!');
            console.log('✅ Token value:', token.substring(0, 30) + '...');
            console.log('✅ User saved:', user);
            console.log('✅ Expires at:', new Date(expiresAt));
            
            // بررسی اینکه توکن ذخیره شده یا نه
            const savedToken = localStorage.getItem('auth_token');
            console.log('🔍 Verification - Token in localStorage:', !!savedToken);
            
            return { 
                success: true, 
                user: user,
                token: token
            };
        }
        
        console.log('❌ Login failed - conditions not met');
        return { 
            success: false, 
            error: data.message || data.error || 'ورود ناموفق بود',
            details: data
        };
        
    } catch (error) {
        console.error('=== ❌ LOGIN ERROR ===');
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        
        let errorMessage = 'خطا در ارتباط با سرور';
        if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
            errorMessage = '❌ سرور در دسترس نیست. آیا سرور لاراول در حال اجراست؟';
            console.error('Server is not running! Run: php artisan serve');
        } else if (error.name === 'AbortError') {
            errorMessage = '❌ درخواست timeout شد';
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

// ============================================================
// 👤 پروفایل کاربر
// ============================================================

export async function getUserProfile() {
    const token = getAuthToken();
    if (!token) {
        console.log('❌ getUserProfile: No token');
        return null;
    }
    
    try {
        console.log('📤 Fetching user profile...');
        const response = await fetch(`${API_BASE}/user/profile`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        
        console.log('📡 Profile response status:', response.status);
        
        if (!response.ok) {
            if (response.status === 401) {
                console.log('⚠️ Token expired or invalid');
                localStorage.removeItem('auth_token');
                localStorage.removeItem('user_data');
                return null;
            }
            throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        console.log('📥 Profile data:', data);
        
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
            headers: {
                'Authorization': `Bearer ${token}`
            },
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
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ email })
        });
        
        const data = await response.json();
        console.log('📥 Forgot password response:', data);
        
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
    if (!token) {
        console.log('❌ getUserProjects: No token');
        return [];
    }
    
    try {
        const response = await fetch(`${API_BASE}/user/projects`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            console.log('❌ getUserProjects failed:', response.status);
            return [];
        }
        
        const data = await response.json();
        console.log('📥 User projects:', data?.data?.length || 0, 'projects');
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
        console.log('📥 Update progress response:', data);
        
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
        console.log('📥 Invoices:', data?.data?.length || 0, 'invoices');
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
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });
        
        const data = await response.json();
        console.log('📥 Upload invoice response:', data);
        
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
        console.log(`🔄 Using cached data for: ${endpoint}`);
        return cache.get(cacheKey);
    }
    
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);
        
        const response = await fetch(url, { 
            signal: controller.signal,
            headers: {
                'Accept': 'application/json'
            }
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
        
        console.log('✅ Initial data loaded successfully');
    } catch (error) {
        console.error('Failed to load initial data:', error);
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
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        
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
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        
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
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        
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