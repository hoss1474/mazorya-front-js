// core/i18n.js

const SUPPORTED_LANGS = ['en', 'fr', 'fa', 'ar', 'de', 'es', 'tr'];

let currentLang = 'en';
let translations = {};
const cache = {};

// ============================================================
// تابع تشخیص مسیر صحیح فایل‌های زبان
// ============================================================
function getLangPath(lang) {
    // تشخیص محیط محلی یا آنلاین
    const isLocal = window.location.hostname === 'localhost' || 
                    window.location.hostname === '127.0.0.1' ||
                    window.location.hostname === '0.0.0.0';
    
    if (isLocal) {
        // مسیر برای محیط محلی
        return `./lang/${lang}.json`;
    }
    
    // مسیر برای محیط آنلاین - بر اساس ساختار هاست
    // اگر پروژه در زیرپوشه است، نام پوشه را اینجا وارد کنید
    const path = window.location.pathname;
    
    // اگر پروژه در پوشه MAZORYA-FRONT-JS هست
    if (path.includes('/MAZORYA-FRONT-JS/')) {
        return `/MAZORYA-FRONT-JS/lang/${lang}.json`;
    }
    
    // اگر پروژه در ریشه دامنه است
    return `/lang/${lang}.json`;
}

// ============================================================
// تابع بارگذاری فایل زبان
// ============================================================
async function loadLanguage(lang) {
    // اعتبارسنجی زبان
    if (!SUPPORTED_LANGS.includes(lang)) {
        lang = 'en';
    }

    // اگر از قبل کش شده
    if (cache[lang]) {
        translations = cache[lang];
        currentLang = lang;
        return true;
    }

    try {
        // دریافت مسیر صحیح
        const langPath = getLangPath(lang);
        console.log(`🌐 Loading language: ${lang} from ${langPath}`); // برای دیباگ
        
        const res = await fetch(langPath);
        
        // اگر پاسخ ناموفق بود
        if (!res.ok) {
            throw new Error(`HTTP ${res.status} - ${res.statusText}`);
        }
        
        // بررسی اینکه آیا پاسخ JSON است
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error(`Invalid content type: ${contentType}`);
        }
        
        const data = await res.json();
        
        // ذخیره در کش
        cache[lang] = data;
        translations = data;
        currentLang = lang;

        console.log(`✅ Language ${lang} loaded successfully`);
        return true;

    } catch (err) {
        console.error(`❌ Language load failed for ${lang}:`, err);

        // اگر زبان اصلی fail شد، fallback به انگلیسی
        if (lang !== 'en') {
            console.log('🔄 Falling back to English...');
            try {
                return await loadLanguage('en');
            } catch (fallbackErr) {
                console.error('❌ Fallback also failed:', fallbackErr);
                translations = {};
                currentLang = 'en';
                return false;
            }
        } else {
            // اگر انگلیسی هم fail شد
            console.error('❌ English language also failed!');
            translations = {};
            currentLang = 'en';
            return false;
        }
    }
}

// ============================================================
// تابع ترجمه
// ============================================================
function t(key, params = {}) {
    // اگر ترجمه‌ها خالی هستند، کلید رو برگردون
    if (!translations || Object.keys(translations).length === 0) {
        console.warn(`⚠️ Translations not loaded, returning key: ${key}`);
        return key;
    }

    // دریافت ترجمه با پشتیبانی از nested keys (مثلاً 'hero.title')
    let text = key.split('.').reduce((obj, k) => obj?.[k], translations) || key;

    // جایگزینی پارامترها
    Object.keys(params).forEach(p => {
        text = text.replace(new RegExp(`{{${p}}}`, 'g'), params[p]);
    });

    return text;
}

// ============================================================
// تابع تنظیم زبان
// ============================================================
async function setLanguage(lang) {
    // اعتبارسنجی
    if (!SUPPORTED_LANGS.includes(lang)) {
        lang = 'en';
    }

    // اگر زبان فعلی با زبان درخواستی یکی است، نیازی به بارگذاری مجدد نیست
    if (currentLang === lang && cache[lang]) {
        translations = cache[lang];
        return true;
    }

    // 1. لود فایل زبان
    const success = await loadLanguage(lang);
    
    if (!success) {
        console.error('❌ Failed to load language, using empty translations');
        translations = {};
    }
    
    // 2. تنظیم currentLang
    currentLang = lang;
    
    // 3. تنظیم lang در HTML
    document.documentElement.lang = currentLang;
    
    // 4. تنظیم RTL برای فارسی و عربی
    const isRTL = currentLang === 'fa' || currentLang === 'ar';
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    
    // 5. تنظیم کلاس برای RTL
    if (isRTL) {
        document.documentElement.classList.add('rtl');
    } else {
        document.documentElement.classList.remove('rtl');
    }
    
    // 6. ذخیره در localStorage
    try {
        localStorage.setItem('lang', currentLang);
    } catch (e) {
        console.warn('Could not save to localStorage:', e);
    }
    
    // 7. ارسال event برای اطلاع به کامپوننت‌ها
    window.dispatchEvent(
        new CustomEvent('languageChanged', {
            detail: { lang: currentLang, success: success }
        })
    );
    
    console.log(`🌍 Language set to: ${currentLang} (success: ${success})`);
    
    return success;
}

// ============================================================
// تابع دریافت زبان فعلی
// ============================================================
function getCurrentLanguage() {
    return currentLang;
}

// ============================================================
// تابع بررسی RTL بودن
// ============================================================
function isRTL() {
    return currentLang === 'ar' || currentLang === 'fa';
}

// ============================================================
// تابع دریافت لیست زبان‌های پشتیبانی شده
// ============================================================
function getSupportedLanguages() {
    return [...SUPPORTED_LANGS];
}

// ============================================================
// تابع بارگذاری زبان از localStorage
// ============================================================
function getSavedLanguage() {
    try {
        const saved = localStorage.getItem('lang');
        if (saved && SUPPORTED_LANGS.includes(saved)) {
            return saved;
        }
    } catch (e) {
        console.warn('Could not read from localStorage:', e);
    }
    return null;
}

// ============================================================
// صادرات
// ============================================================
export const i18n = {
    setLanguage,
    getCurrentLanguage,
    getSavedLanguage,
    getSupportedLanguages,
    t,
    isRTL,
    // برای دیباگ
    _debug: {
        translations,
        cache,
        currentLang
    }
};

// ============================================================
// خودکار: بازیابی زبان از localStorage در شروع
// ============================================================
(async function autoInit() {
    const savedLang = getSavedLanguage();
    if (savedLang) {
        console.log(`🔄 Restoring language from localStorage: ${savedLang}`);
        await setLanguage(savedLang);
    } else {
        // زبان پیش‌فرض از مرورگر
        const browserLang = navigator.language?.split('-')[0] || 'en';
        const initialLang = SUPPORTED_LANGS.includes(browserLang) ? browserLang : 'en';
        console.log(`🌍 Using browser language: ${initialLang}`);
        await setLanguage(initialLang);
    }
})();