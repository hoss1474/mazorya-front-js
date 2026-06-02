// core/animations.js - انیمیشن‌های صفحه اصلی

// ============================================================
// 1. انیمیشن اسکرول (Fade In / Slide Up)
// ============================================================
export function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(`
    .client-section,
    .feature-card,
    .service-post-card,
    .project-card-wrap,
    .blog-main-card,
    .blog-side-item,
    .count-item-wrap,
    .cta-section
  `);
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -30px 0px' });
  
  animatedElements.forEach(el => {
    el.classList.add('animate-ready');
    observer.observe(el);
  });
}

// ============================================================
// 2. Hero Title (Fade In Up با تاخیر)
// ============================================================
export function initHeroAnimation() {
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroBtn = document.querySelector('.hero-btn');
  const heroCharacter = document.querySelector('.hero-character');
  
  if (heroTitle) {
    heroTitle.style.animation = 'fadeInUp 0.8s ease forwards';
  }
  if (heroSubtitle) {
    heroSubtitle.style.animation = 'fadeInUp 0.8s ease 0.2s forwards';
    heroSubtitle.style.opacity = '0';
  }
  if (heroBtn) {
    heroBtn.style.animation = 'fadeInUp 0.8s ease 0.4s forwards';
    heroBtn.style.opacity = '0';
  }
  if (heroCharacter) {
    heroCharacter.style.animation = 'float 6s ease-in-out infinite';
  }
}

// ============================================================
// 3. Count Up (شمارنده اعداد)
// ============================================================
export function initCountUp() {
  const countElements = document.querySelectorAll('.count-title');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.innerText;
        const match = text.match(/(\d+)/);
        
        if (match) {
          const targetNumber = parseInt(match[0], 10);
          const suffix = text.replace(targetNumber.toString(), '');
          let current = 0;
          const increment = targetNumber / 50;
          const timer = setInterval(() => {
            current += increment;
            if (current >= targetNumber) {
              el.innerText = targetNumber + suffix;
              clearInterval(timer);
            } else {
              el.innerText = Math.floor(current) + suffix;
            }
          }, 30);
        }
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  
  countElements.forEach(el => observer.observe(el));
}

// ============================================================
// 4. Hover Animations (CSS)
// ============================================================
export function initHoverAnimations() {
  // کارت‌های ویژگی‌ها
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });
  
  // کارت‌های خدمات
  const serviceCards = document.querySelectorAll('.service-post-card');
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const line = card.querySelector('.service-card-title-line-wrap');
      if (line) line.style.width = '50px';
    });
    card.addEventListener('mouseleave', () => {
      const line = card.querySelector('.service-card-title-line-wrap');
      if (line) line.style.width = '0';
    });
  });
  
  // کارت‌های پروژه
  const projectCards = document.querySelectorAll('.project-card-wrap');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const overlay = card.querySelector('.project-overlay-wrap');
      if (overlay) overlay.style.opacity = '1';
    });
    card.addEventListener('mouseleave', () => {
      const overlay = card.querySelector('.project-overlay-wrap');
      if (overlay) overlay.style.opacity = '0';
    });
  });
}

// ============================================================
// 5. FAQ Accordion (باز و بسته شدن)
// ============================================================
export function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-wrap');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question-wrap');
    const answer = item.querySelector('.faq-answer-wrap');
    const arrowLite = item.querySelector('.faq-arrow-lite');
    const arrowDark = item.querySelector('.faq-arrow-dark');
    
    if (question && answer) {
      // بستن همه در ابتدا
      answer.style.display = 'none';
      
      question.addEventListener('click', () => {
        const isOpen = answer.style.display === 'block';
        
        // بستن بقیه
        faqItems.forEach(otherItem => {
          const otherAnswer = otherItem.querySelector('.faq-answer-wrap');
          const otherArrowLite = otherItem.querySelector('.faq-arrow-lite');
          const otherArrowDark = otherItem.querySelector('.faq-arrow-dark');
          if (otherAnswer && otherAnswer !== answer) {
            otherAnswer.style.display = 'none';
            if (otherArrowLite) otherArrowLite.style.transform = 'rotate(0deg)';
            if (otherArrowDark) otherArrowDark.style.transform = 'rotate(0deg)';
          }
        });
        
        if (isOpen) {
          answer.style.display = 'none';
          if (arrowLite) arrowLite.style.transform = 'rotate(0deg)';
          if (arrowDark) arrowDark.style.transform = 'rotate(0deg)';
        } else {
          answer.style.display = 'block';
          if (arrowLite) arrowLite.style.transform = 'rotate(180deg)';
          if (arrowDark) arrowDark.style.transform = 'rotate(180deg)';
        }
      });
    }
  });
}

// ============================================================
// 6. Parallax Effect (حرکت آهسته)
// ============================================================
export function initParallax() {
  const heroCharacter = document.querySelector('.hero-character');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (heroCharacter) {
      heroCharacter.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
  });
}

// ============================================================
// 7. تابع اصلی راه‌اندازی همه انیمیشن‌ها
// ============================================================
export function initAllAnimations() {
  // تاخیر کوچک برای اطمینان از لود DOM
  setTimeout(() => {
    initHeroAnimation();
    initScrollAnimations();
    initCountUp();
    initHoverAnimations();
    initFaqAccordion();
    initParallax();
     initServiceDetailsAnimations();
    initAboutAnimations();
  }, 100);
}

// ============================================================
// پاک کردن و راه‌اندازی مجدد (برای route changes)
// ============================================================
export function reinitAnimations() {
  initAllAnimations();
}
// ============================================================
// 8. About Page Animations
// ============================================================

export function initAboutAnimations() {
  // Banner Title
  const bannerTitle = document.querySelector('.banner-title');
  if (bannerTitle) {
    bannerTitle.style.animation = 'fadeInUp 0.8s ease forwards';
  }
  
  // Count Cards (با تاخیر متوالی)
  const countCards = document.querySelectorAll('.count-card-wrap');
  countCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.5s ease ${index * 0.15}s`;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
          observer.unobserve(card);
        }
      });
    }, { threshold: 0.3 });
    observer.observe(card);
  });
  
  // Mission & Vision Sections (Slide In)
  const missionGrid = document.querySelector('.about-intro-top-grid');
  const visionGrid = document.querySelector('.about-intro-bottom-grid');
  
  if (missionGrid) {
    const missionImage = missionGrid.querySelector('.about-intro-image-wrap');
    const missionContent = missionGrid.querySelector('.about-intro-content-wrap');
    
    if (missionImage) {
      missionImage.style.opacity = '0';
      missionImage.style.transform = 'translateX(-50px)';
      missionImage.style.transition = 'all 0.7s ease';
      observeOnScroll(missionImage, () => {
        missionImage.style.opacity = '1';
        missionImage.style.transform = 'translateX(0)';
      });
    }
    
    if (missionContent) {
      missionContent.style.opacity = '0';
      missionContent.style.transform = 'translateX(50px)';
      missionContent.style.transition = 'all 0.7s ease 0.2s';
      observeOnScroll(missionContent, () => {
        missionContent.style.opacity = '1';
        missionContent.style.transform = 'translateX(0)';
      });
    }
  }
  
  if (visionGrid) {
    const visionContent = visionGrid.querySelector('.about-intro-content-wrap');
    const visionImage = visionGrid.querySelector('.about-intro-image-wrap');
    
    if (visionContent) {
      visionContent.style.opacity = '0';
      visionContent.style.transform = 'translateX(-50px)';
      visionContent.style.transition = 'all 0.7s ease';
      observeOnScroll(visionContent, () => {
        visionContent.style.opacity = '1';
        visionContent.style.transform = 'translateX(0)';
      });
    }
    
    if (visionImage) {
      visionImage.style.opacity = '0';
      visionImage.style.transform = 'translateX(50px)';
      visionImage.style.transition = 'all 0.7s ease 0.2s';
      observeOnScroll(visionImage, () => {
        visionImage.style.opacity = '1';
        visionImage.style.transform = 'translateX(0)';
      });
    }
  }
  
  // Value Cards
  const valueCards = document.querySelectorAll('.value-card-wrap');
  valueCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = `all 0.5s ease ${index * 0.1}s`;
    
    observeOnScroll(card, () => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    });
  });
  
  // History Items
  const historyItems = document.querySelectorAll('.history-card-wrap');
  historyItems.forEach((item, index) => {
    const leftWrap = item.querySelector('.history-left-wrap');
    const rightWrap = item.querySelector('.history-right-wrap');
    
    if (leftWrap) {
      leftWrap.style.opacity = '0';
      leftWrap.style.transform = index % 2 === 0 ? 'translateX(-40px)' : 'translateX(40px)';
      leftWrap.style.transition = 'all 0.6s ease';
    }
    if (rightWrap) {
      rightWrap.style.opacity = '0';
      rightWrap.style.transform = index % 2 === 0 ? 'translateX(40px)' : 'translateX(-40px)';
      rightWrap.style.transition = 'all 0.6s ease 0.15s';
    }
    
    observeOnScroll(item, () => {
      if (leftWrap) {
        leftWrap.style.opacity = '1';
        leftWrap.style.transform = 'translateX(0)';
      }
      if (rightWrap) {
        rightWrap.style.opacity = '1';
        rightWrap.style.transform = 'translateX(0)';
      }
    });
  });
  
  // History Steps (خط عمودی)
  const historySteps = document.querySelectorAll('.history-step-wrap');
  historySteps.forEach((step, index) => {
    step.style.opacity = '0';
    step.style.transform = 'scale(0)';
    step.style.transition = `all 0.3s ease ${index * 0.1}s`;
    
    observeOnScroll(step, () => {
      step.style.opacity = '1';
      step.style.transform = 'scale(1)';
    });
  });
}

// ============================================================
// تابع کمکی برای اسکرول
// ============================================================
function observeOnScroll(element, callback) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback();
        observer.unobserve(element);
      }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -30px 0px' });
  
  observer.observe(element);
}
// ============================================================
// 9. Service Details Page Animations
// ============================================================

export function initServiceDetailsAnimations() {
  // عنوان (Fade In Up)
  const serviceTitle = document.querySelector('.service-details-title');
  if (serviceTitle) {
    serviceTitle.style.opacity = '0';
    serviceTitle.style.transform = 'translateY(30px)';
    serviceTitle.style.transition = 'all 0.6s ease';
    
    setTimeout(() => {
      serviceTitle.style.opacity = '1';
      serviceTitle.style.transform = 'translateY(0)';
    }, 100);
  }
  
  // تصویر اصلی (Scale In + Fade)
  const mainImage = document.querySelector('.service-details-image-main');
  if (mainImage) {
    mainImage.style.opacity = '0';
    mainImage.style.transform = 'scale(0.95)';
    mainImage.style.transition = 'all 0.7s ease 0.2s';
    
    setTimeout(() => {
      mainImage.style.opacity = '1';
      mainImage.style.transform = 'scale(1)';
    }, 200);
  }
  
  // توضیحات (Slide Up)
  const description = document.querySelector('.service-details-description');
  if (description) {
    description.style.opacity = '0';
    description.style.transform = 'translateY(30px)';
    description.style.transition = 'all 0.6s ease 0.3s';
    
    setTimeout(() => {
      description.style.opacity = '1';
      description.style.transform = 'translateY(0)';
    }, 300);
  }
  
  // تصویر دوم (Fade In + Slide)
  const secondaryImage = document.querySelector('.service-details-image-secondary');
  if (secondaryImage) {
    secondaryImage.style.opacity = '0';
    secondaryImage.style.transform = 'translateX(-30px)';
    secondaryImage.style.transition = 'all 0.6s ease 0.4s';
    
    setTimeout(() => {
      secondaryImage.style.opacity = '1';
      secondaryImage.style.transform = 'translateX(0)';
    }, 400);
  }
  
  // بخش‌های محتوایی (با اسکرول)
  const contentBlocks = document.querySelectorAll('.service-details-block');
  contentBlocks.forEach((block, index) => {
    block.style.opacity = '0';
    block.style.transform = 'translateY(40px)';
    block.style.transition = `all 0.5s ease ${index * 0.15}s`;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          block.style.opacity = '1';
          block.style.transform = 'translateY(0)';
          observer.unobserve(block);
        }
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
    
    observer.observe(block);
  });
  
  // CTA Section (Fade In Up)
  const ctaSection = document.querySelector('.cta-section');
  if (ctaSection) {
    ctaSection.style.opacity = '0';
    ctaSection.style.transform = 'translateY(40px)';
    ctaSection.style.transition = 'all 0.6s ease 0.5s';
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          ctaSection.style.opacity = '1';
          ctaSection.style.transform = 'translateY(0)';
          observer.unobserve(ctaSection);
        }
      });
    }, { threshold: 0.2 });
    
    observer.observe(ctaSection);
  }
}