// core/ix2.js
// تمام دیتای IX2 که فرستادی رو در این متغیر قرار بده

const IX2_DATA = {
  events: { 
    // تمام ایونت‌های تو اینجا
  },
  actionLists: {
    // تمام اکشن‌لیست‌های تو اینجا
  },
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

export function initIX2() {
  if (isIX2Initialized) return;
  
  // صبر کن تا jQuery و Webflow لود شوند
  if (typeof jQuery === 'undefined') {
    console.warn('⏳ Waiting for jQuery...');
    setTimeout(initIX2, 100);
    return;
  }
  
  if (typeof Webflow === 'undefined' || !Webflow.require) {
    console.warn('⏳ Waiting for Webflow...');
    setTimeout(initIX2, 100);
    return;
  }
  
  try {
    Webflow.require('ix2').init(IX2_DATA);
    isIX2Initialized = true;
    console.log('✅ IX2 initialized successfully');
  } catch (err) {
    console.error('❌ IX2 init error:', err);
  }
}

export function destroyIX2() {
  if (typeof Webflow !== 'undefined' && Webflow.require) {
    try {
      Webflow.require('ix2').destroy();
      isIX2Initialized = false;
      console.log('✅ IX2 destroyed');
    } catch (err) {
      console.error('IX2 destroy error:', err);
    }
  }
}