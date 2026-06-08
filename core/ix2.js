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
const MAX_RETRIES = 30;

// سیستم ساده انیمیشن برای جایگزینی IX2
class SimpleIX2 {
  constructor(data) {
    this.data = data;
    this.animations = [];
    this.observers = [];
  }
  
  init(data) {
    console.log('🎬 Simple IX2 initialized with data:', data);
    this.data = data || this.data;
    this.setupScrollAnimations();
    this.setupInteractionAnimations();
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
}

const simpleIX2 = new SimpleIX2();

// تابع اصلی که جایگزین Webflow.require('ix2') می‌شه
export function initIX2() {
  if (isIX2Initialized) return;
  if (retryCount >= MAX_RETRIES) {
    console.error('❌ Failed to load IX2 after maximum retries');
    return;
  }
  
  retryCount++;
  
  // صبر برای لود شدن کامل DOM
  if (document.readyState !== 'complete') {
    console.warn(`⏳ Waiting for DOM... (${retryCount}/${MAX_RETRIES})`);
    setTimeout(initIX2, 200);
    return;
  }
  
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
    setTimeout(initIX2, 500);
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
  console.log('- DOM Ready:', document.readyState === 'complete' ? '✅' : '⏳');
  console.log('- IX2 Initialized:', isIX2Initialized ? '✅' : '❌');
  console.log('- SimpleIX2 Active:', simpleIX2 ? '✅' : '❌');
}

// اجرای خودکار
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initIX2, 100);
  });
} else {
  setTimeout(initIX2, 100);
}

// Export پیش‌فرض برای سازگاری
export default { initIX2, destroyIX2, checkWebflowStatus };