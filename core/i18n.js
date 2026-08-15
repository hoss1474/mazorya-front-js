// core/i18n.js

const SUPPORTED_LANGS = ['en', 'fr', 'fa', 'ar', 'de', 'es', 'tr'];

let currentLang = 'en';
let translations = {};
const cache = {};

// ============================================================
// تابع تشخیص مسیر صحیح فایل‌های زبان
// ============================================================
function getLangPath(lang) {
    // با توجه به ساختار شما، فایل‌ها در ریشه پروژه در پوشه lang هستن
    // وقتی پروژه روی هاست هست، مسیر به این شکله:
    return `/lang/${lang}.json`;
}

// ============================================================
// تابع بارگذاری فایل زبان
// ============================================================
async function loadLanguage(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) {
        lang = 'en';
    }

    if (cache[lang]) {
        translations = cache[lang];
        currentLang = lang;
        return true;
    }

    try {
        const langPath = getLangPath(lang);
        console.log(`🌐 Loading language: ${lang} from ${langPath}`);
        
        const res = await fetch(langPath);
        
        if (!res.ok) {
            throw new Error(`HTTP ${res.status} - ${res.statusText}`);
        }
        
        const data = await res.json();
        
        cache[lang] = data;
        translations = data;
        currentLang = lang;

        console.log(`✅ Language ${lang} loaded successfully`);
        return true;

    } catch (err) {
        console.error(`❌ Language load failed for ${lang}:`, err);

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
    if (!translations || Object.keys(translations).length === 0) {
        console.warn(`⚠️ Translations not loaded, returning key: ${key}`);
        return key;
    }

    let text = key.split('.').reduce((obj, k) => obj?.[k], translations) || key;

    Object.keys(params).forEach(p => {
        text = text.replace(new RegExp(`{{${p}}}`, 'g'), params[p]);
    });

    return text;
}

// ============================================================
// تابع تنظیم زبان
// ============================================================
async function setLanguage(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) {
        lang = 'en';
    }

    if (currentLang === lang && cache[lang]) {
        translations = cache[lang];
        return true;
    }

    const success = await loadLanguage(lang);
    
    if (!success) {
        console.error('❌ Failed to load language, using empty translations');
        translations = {};
    }
    
    currentLang = lang;
    document.documentElement.lang = currentLang;
    
    const isRTL = currentLang === 'fa' || currentLang === 'ar';
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    
    if (isRTL) {
        document.documentElement.classList.add('rtl');
    } else {
        document.documentElement.classList.remove('rtl');
    }
    
    try {
        localStorage.setItem('lang', currentLang);
    } catch (e) {
        console.warn('Could not save to localStorage:', e);
    }
    
    window.dispatchEvent(
        new CustomEvent('languageChanged', {
            detail: { lang: currentLang, success: success }
        })
    );
    
    console.log(`🌍 Language set to: ${currentLang} (success: ${success})`);
    
    return success;
}

function getCurrentLanguage() {
    return currentLang;
}

function isRTL() {
    return currentLang === 'ar' || currentLang === 'fa';
}

function getSupportedLanguages() {
    return [...SUPPORTED_LANGS];
}

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

export const i18n = {
    setLanguage,
    getCurrentLanguage,
    getSavedLanguage,
    getSupportedLanguages,
    t,
    isRTL
};

// خودکار: بازیابی زبان از localStorage در شروع
(async function autoInit() {
    const savedLang = getSavedLanguage();
    if (savedLang) {
        console.log(`🔄 Restoring language from localStorage: ${savedLang}`);
        await setLanguage(savedLang);
    } else {
        const browserLang = navigator.language?.split('-')[0] || 'en';
        const initialLang = SUPPORTED_LANGS.includes(browserLang) ? browserLang : 'en';
        console.log(`🌍 Using browser language: ${initialLang}`);
        await setLanguage(initialLang);
    }
})();