// core/api.js - API Management

import { i18n } from './i18n.js';

const API_BASE = 'https://api.cardifygroup.com/api';

// Cache for API responses
const cache = new Map();

async function fetchAPI(endpoint, params = {}) {
  const lang = i18n.getCurrentLanguage();
  const queryParams = new URLSearchParams({ lang, ...params });
  const url = `${API_BASE}${endpoint}?${queryParams}`;
  
  // Check cache first
  const cacheKey = `${endpoint}_${lang}_${JSON.stringify(params)}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    const data = await response.json();
    
    // Cache for 5 minutes
    cache.set(cacheKey, data);
    setTimeout(() => cache.delete(cacheKey), 5 * 60 * 1000);
    
    return data;
  } catch (error) {
    console.error('API Fetch Error:', error);
    return null;
  }
}

// Load initial data for homepage
async function loadInitialData() {
  const lang = i18n.getCurrentLanguage();
  
  try {
    // Load projects for homepage
    const projectsData = await fetchAPI('/projects', { limit: 6 });
    if (projectsData?.data) {
      window.appState.data.projects = projectsData.data.filter(p => p.is_active);
    }
    
    // Load blogs for homepage
    const blogsData = await fetchAPI('/blogs', { limit: 4 });
    if (blogsData?.data) {
      window.appState.data.blogs = blogsData.data.filter(b => b.is_active);
    }
    
    // Load services
    const servicesData = await fetchAPI('/Services');
    if (servicesData?.data) {
      window.appState.data.services = servicesData.data;
    }
  } catch (error) {
    console.error('Failed to load initial data:', error);
  }
}

// Get projects
async function getProjects(limit = null) {
  const params = limit ? { limit } : {};
  const data = await fetchAPI('/projects', params);
  return data?.data?.filter(p => p.is_active) || [];
}

// Get project by slug
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

// Get blogs
async function getBlogs(limit = null) {
  const params = limit ? { limit } : {};
  const data = await fetchAPI('/blogs', params);
  return data?.data?.filter(b => b.is_active) || [];
}

// Get blog by ID
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

// Get services
async function getServices() {
  const data = await fetchAPI('/Services');
  return data?.data || [];
}

// Get service by slug
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

// Submit contact form
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
    return { success: data.success === true, message: data.message };
  } catch (error) {
    console.error('Failed to subscribe:', error);
    return { success: false, message: error.message };
  }
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