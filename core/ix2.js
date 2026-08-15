// core/ix2.js

// دیتای IX2 (در آینده با دیتای واقعی پر می‌شه)
const IX2_DATA = {
  events: {},
  actionLists: {},
  site: {
    mediaQueries: [
      { key: "main", min: 992, max: 10000 },
      { key: "medium", min: 768, max: 991 },
      { key: "small", min: 480, max: 767 },
      { key: "tiny", min: 0, max: 479 }
    ]
  }
};

let isIX2Initialized = false;
let retryCount = 0;
const MAX_RETRIES = 10; // کاهش از 30 به 10

// سیستم ساده انیمیشن برای جایگزینی IX2
class SimpleIX2 {
  constructor(data) {
    this.data = data;
    this.animations = [];
    this.observers = [];
    this._initialized = false;
  }
  
  init(data) {
    if (this._initialized) return this;
    
    console.log('🎬 Simple IX2 initializing...');
    this.data = data || this.data;
    
    // تاخیر کوتاه برای اطمینان از رندر DOM
    setTimeout(() => {
      this.setupScrollAnimations();
      this.setupInteractionAnimations();
      this._initialized = true;
      console.log('✅ Simple IX2 initialized successfully');
    }, 300);
    
    return this;
  }
  
  destroy() {
    this.animations.forEach(anim => {
      if (anim.cancel) anim.cancel();
    });
    this.observers.forEach(observer => {
      if (observer.disconnect) observer.disconnect();
    });
    this.animations = [];
    this.observers = [];
    this._initialized = false;
    console.log('🛑 Simple IX2 destroyed');
  }
  
  setupScrollAnimations() {
    // انیمیشن‌های اسکرول ساده
    const elements = document.querySelectorAll('[data-scroll-animation]');
    
    if (elements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const animation = target.getAttribute('data-scroll-animation');
          
          if (animation === 'fade-in') {
            target.style.opacity = '0';
            target.style.transform = 'translateY(30px)';
            target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
              target.style.opacity = '1';
              target.style.transform = 'translateY(0)';
            }, 100);
          }
          
          observer.unobserve(target);
        }
      });
    }, { threshold: 0.1 });
    
    elements.forEach(el => observer.observe(el));
    this.observers.push(observer);
  }
  
  setupInteractionAnimations() {
    // انیمیشن‌های هاور ساده
    const hoverElements = document.querySelectorAll('[data-hover-animation]');
    
    hoverElements.forEach(el => {
      const animation = el.getAttribute('data-hover-animation');
      
      el.addEventListener('mouseenter', () => {
        if (animation === 'scale') {
          el.style.transition = 'transform 0.3s ease';
          el.style.transform = 'scale(1.05)';
        } else if (animation === 'lift') {
          el.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
          el.style.transform = 'translateY(-5px)';
          el.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
        }
      });
      
      el.addEventListener('mouseleave', () => {
        if (animation === 'scale') {
          el.style.transform = 'scale(1)';
        } else if (animation === 'lift') {
          el.style.transform = 'translateY(0)';
          el.style.boxShadow = 'none';
        }
      });
    });
  }
  
  // متدهای سازگاری با Webflow IX2
  initAction(actionListId, elementId, eventType, actionType) {
    console.log('🎯 IX2 Action:', { actionListId, elementId, eventType, actionType });
    return this;
  }
  
  ready(callback) {
    if (this._initialized) {
      callback();
    } else {
      setTimeout(() => this.ready(callback), 100);
    }
    return this;
  }
}

const simpleIX2 = new SimpleIX2();

// ============================================================
// تابع اصلی که جایگزین Webflow.require('ix2') می‌شه
// ============================================================
export function initIX2() {
  // اگر قبلاً مقداردهی شده، برگرد
  if (isIX2Initialized) {
    console.log('ℹ️ IX2 already initialized');
    return;
  }
  
  // اگر بیش از حداکثر تلاش
  if (retryCount >= MAX_RETRIES) {
    console.warn('⚠️ Max retries reached, forcing initialization...');
    forceInitIX2();
    return;
  }
  
  retryCount++;
  
  // اگر DOM آماده نیست، منتظر بمان
  if (document.readyState !== 'complete' && document.readyState !== 'interactive') {
    console.warn(`⏳ Waiting for DOM... (${retryCount}/${MAX_RETRIES})`);
    setTimeout(initIX2, 300);
    return;
  }
  
  // مقداردهی نهایی
  forceInitIX2();
}

function forceInitIX2() {
  try {
    // از سیستم ساده استفاده کن
    simpleIX2.init(IX2_DATA);
    isIX2Initialized = true;
    retryCount = 0;
    console.log('✅ IX2 initialized successfully');
    
    // ایونت سفارشی برای اطلاع از اتمام مقداردهی
    window.dispatchEvent(new CustomEvent('ix2:ready'));
    
  } catch (err) {
    console.error('❌ IX2 init error:', err);
    // اگر ارور داشت، باز هم علامت بزن که مقداردهی شده
    isIX2Initialized = true;
  }
}

export function destroyIX2() {
  try {
    simpleIX2.destroy();
    isIX2Initialized = false;
    console.log('✅ IX2 destroyed');
  } catch (err) {
    console.error('IX2 destroy error:', err);
  }
}

export function checkWebflowStatus() {
  console.log('🔍 IX2 Status Check:');
  console.log('- DOM Ready:', document.readyState);
  console.log('- IX2 Initialized:', isIX2Initialized ? '✅' : '❌');
  console.log('- SimpleIX2 Active:', simpleIX2._initialized ? '✅' : '❌');
}

// ============================================================
// اجرای خودکار با مدیریت بهتر
// ============================================================
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initIX2, 200);
  });
} else {
  // اگر DOM از قبل آماده است، با تاخیر کم اجرا کن
  setTimeout(initIX2, 100);
}

// همچنین اجرا بعد از کامل شدن کامل صفحه
window.addEventListener('load', () => {
  setTimeout(initIX2, 100);
});

// Export پیش‌فرض برای سازگاری
export default { initIX2, destroyIX2, checkWebflowStatus };