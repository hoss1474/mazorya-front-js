// pages/home.js - Home Page (کامل با تمام بخش‌ها)

import { i18n } from '../core/i18n.js';
import { renderHeader, attachHeaderEvents } from '../components/header.js';
import { renderFooter, attachFooterEvents } from '../components/footer.js';
import { getProjects, getBlogs } from '../core/api.js';

// ============================================================
// بخش 1: Hero (بنر اصلی با شیدر سه‌بعدی)
// ============================================================
function renderHeroSection(currentLang) {
  return `
    <div class="banner-main-section hero-shader-container">
      <div class="banner-inner-wrap">
        <section class="hero hero-with-shader">
          <!-- کانتینر شیدر -->
          <div class="hero-shader-wrapper" id="heroShaderContainer">
            <canvas id="heroCanvas"></canvas>
          </div>
          
          <!-- محتوای روی شیدر -->
          <div class="hero-content-overlay">
            <div class="hero-content">
              <h1 class="hero-title">${i18n.t('hero_title')}</h1>
              <p class="hero-subtitle">${i18n.t('hero_subtitle')}</p>
              <a href="/${currentLang}/services" class="hero-btn" data-route="services">${i18n.t('hero_btn')}</a>
            </div>
          </div>
        </section>
      </div>
    </div>
  `;
}

// ============================================================
// بخش 1.5: راه‌اندازی شیدر Hero (نسخه بهینه شده)
// ============================================================
function initHeroShader() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  
  const container = document.getElementById('heroShaderContainer');
  if (!container) return;
  
  // شیدر اصلی - همان شیدر قبلی
  const shaderSource = `#version 300 es
/*********
* made by Matthias Hurrle (@atzedent)
*/
precision highp float;
out vec4 O;
uniform float time;
uniform vec2 resolution;
uniform vec2 move;
uniform vec2 wheel;
#define FC gl_FragCoord.xy
#define R resolution
#define T (time+113.+.2*wheel.y/MN)
#define S smoothstep
#define N normalize
#define MN min(R.x,R.y)
#define hue(a) (.5+.5*sin(3.14*(a)+vec3(1,2,3)))
#define LP vec3(1.+1.*sin(-T),2.-2.*cos(T),-3.-4.*sin(sin(T)))
vec3 render(vec2 uv);
void main() { O=vec4(render((FC-.5*R)/MN),1); } 
float smin(float a, float b, float k) {
	k*=log(2.);
	float x=b-a;
	return a+x/(1.-exp2(x/k));
}
float box(vec3 p, vec3 s, float r) {
	p=abs(p)-s+r;
	return length(max(p,.0))+min(.0,max(max(p.x,p.y),p.z))-r;
}
float glow;
float map(vec3 p, bool g) {
	float d=5e5;
	if (g) {
		d=length(p-LP+vec3(.2,.2,0))-.02;
		glow+=.05/(.05+d*d*80.);
	}
	p.z-=T*3.5;
	p=fract(p)-.5;
	vec4 k=vec4(1,.05,.03,.1);
	float r=1e-2;
	return min(d,smin(
		box(p,k.www,r),
		min(
			box(p,k.zxz,r),
			min(box(p,k.xyz,r),box(p,k.yzx,r))
		),.01
	));
}
vec3 norm(vec3 p) {
	float h=1e-3; vec2 k=vec2(-1,1);
	return N(
		k.xyy*map(p+k.xyy*h,false)+
		k.yxy*map(p+k.yxy*h,false)+
		k.yyx*map(p+k.yyx*h,false)+
		k.xxx*map(p+k.xxx*h,false)
	);
}
bool march(inout vec3 p, vec3 rd, out float dd, out float at) {
	for (float i; i++<400.;) {
		float d=map(p,true);
		if (abs(d)<1e-3) return true;
		if (d>100.) return false;
		p+=rd*d;
		dd+=d;
		at+=.05*(.05/dd);
	}
}
vec3 dir(vec2 uv, vec3 p, vec3 t, float z) {
	vec3 up=vec3(0,1,0),
	f=N(t-p),
	r=N(cross(up,f)),
	u=N(cross(f,r));
	return mat3(r,u,f)*N(vec3(uv,z));
}
mat3 rotX(float a) {
  float s=sin(a), c=cos(a);
  return mat3(vec3(1,0,0),vec3(0,c,-s),vec3(0,s,c));
}
mat3 rotY(float a) {
  float s=sin(a), c=cos(a);
  return mat3(vec3(c,0,s),vec3(0,1,0),vec3(-s,0,c));
}
float rnd(float a) {
	vec2 p=fract(a*vec2(12.9898,78.233));
	p+=dot(p,p+34.56);
	return fract(p.x*p.y);
}
float curve(float t, float e) {
	t/=e;
	return mix(
		rnd(floor(t)),
		rnd(floor(t)+1.),
		pow(S(.0,1.,fract(t)),10.)
	);
}
vec3 org() {
	float k=-.2*sin(sin(T)), drama=3.14*curve(T*.2,2.);
	vec2 m=move/R;
	vec3 ro=vec3(0,0,.1);
	ro*=rotX(m.y*6.3-k-.1+drama/12.)*rotY(m.x*6.3-.45-sin(cos(T*.2-k+drama)));
	return ro;
}
float shadow(vec3 p, vec3 lp) {
	float shd=1., maxd=length(lp-p);
	vec3 l=N(lp-p);
	for (float i=1e-3; i<maxd;) {
		float d=map(p+l*i,false);
		if (d<1e-3) {
			shd=.0;
			break;
		}
		shd=min(shd,64.*d/i);
		i+=d;
	}
	return shd;
}
float calcAO(vec3 p, vec3 n) {
	float occ=.0, sca=1.;
	for (float i=.0; i<5.; i++) {
		float
		h=.01+i*.09,
		d=map(p+h*n,false);
		occ+=(h-d)*sca;
		sca*=.55;
		if (occ>.35) break;
	}
	return clamp(1.-3.*occ,.0,1.)*(.5+.5*n.y);
}
vec3 render(vec2 uv) {
	vec3 col=vec3(0),
	p=org(), ro=p,
	rd=dir(uv,p,vec3(0),1.);
	float dd, at;
	if (march(p,rd,dd,at)) {
		vec3 n=norm(p), lp=LP, l=N(lp-p),
		e=N(ro-p), r=reflect(-l,n);
		float ld=distance(lp,p), atten=1./(1.+ld*.25+ld*ld*.125),
		ao=calcAO(p,n), shd=shadow(p+n*5e-2,lp);
		col+=shd*atten*vec3(.1,.095,.09)+clamp(dot(l,n),.0,1.)*atten*ao*shd;
		col+=pow(max(.0,dot(r,e)),8.)*atten*ao*shd;
		col+=clamp(dot(-rd,l),.0,1.)*ao*atten*1.2;
	}
	// shine
	float k=mix(max(.2,1.-distance(LP,ro)),.25,fract(sin(dot(ro,vec3(12.9898,78.233,156.345)))*345678.)),
	f=S(1.,.0,clamp(dd/200.,.0,1.));
	vec3 tint=vec3(1.2,.95,.9);
	col+=tint*at*k;
	col+=hue(3.14*k+f*f*f)*k*k;
	// color grading
	col=mix(col,vec3(1,.95,.9),S(.0,50.,distance(p,ro)));
	col=tanh(col*col);
	col=sqrt(col);
	col=mix(sqrt(col)*1.2,col,clamp(S(-.1,.2,dot(uv,uv)),.0,1.));
	// glow
	col+=tanh(tint*glow);
	// vignette
	vec2 c=FC/R;
	c*=1.-c.yx;
	float vig=c.x*c.y*25.;
	vig=pow(vig,.25);
	col*=vig;
	return col;
}`;

  const gl = canvas.getContext("webgl2");
  if (!gl) {
    console.warn("WebGL2 not supported");
    return;
  }

  let startTime = performance.now();
  let elapsedTime = 0;
  let animationId = null;
  let isPlaying = true;
  let lastFrameTime = 0;
  
  // بهینه‌سازی: کاهش رزولوشن برای اجرای روان‌تر
  const isMobile = window.innerWidth < 768;
  const isLowEnd = navigator.hardwareConcurrency < 4;
  let scale = isLowEnd ? 0.35 : (isMobile ? 0.45 : 0.6);

  // Vertex Shader
  const vertexSrc = `#version 300 es
precision highp float;
in vec4 position;
void main() {
  gl_Position = position;
}`;

  function compileShader(source, type) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  function createProgram(vertexSrc, fragmentSrc) {
    const vs = compileShader(vertexSrc, gl.VERTEX_SHADER);
    const fs = compileShader(fragmentSrc, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return null;
    
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }
    
    return program;
  }

  const vertices = [-1, 1, -1, -1, 1, 1, 1, -1];
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  const program = createProgram(vertexSrc, shaderSource);
  if (!program) {
    console.warn("Failed to create shader program");
    return;
  }

  const uniforms = {
    resolution: gl.getUniformLocation(program, "resolution"),
    time: gl.getUniformLocation(program, "time"),
    move: gl.getUniformLocation(program, "move"),
    wheel: gl.getUniformLocation(program, "wheel"),
    startRandom: gl.getUniformLocation(program, "startRandom")
  };

  const position = gl.getAttribLocation(program, "position");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  function resize() {
    const rect = container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    
    const width = Math.floor(rect.width * dpr * scale);
    const height = Math.floor(rect.height * dpr * scale);
    
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    
    gl.viewport(0, 0, width, height);
  }

  let mouseMove = [0, 0];
  let wheelDelta = [0, 0];
  let startRandom = Math.random();

  function handleMove(x, y) {
    const rect = container.getBoundingClientRect();
    const dx = (x - rect.width / 2) / rect.width;
    const dy = (y - rect.height / 2) / rect.height;
    mouseMove = [dx * 2, dy * 2];
  }

  // Mouse events با throttle برای کاهش بار
  let lastMoveTime = 0;
  const moveThrottle = 30;

  container.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastMoveTime < moveThrottle) return;
    lastMoveTime = now;
    
    const rect = container.getBoundingClientRect();
    handleMove(e.clientX - rect.left, e.clientY - rect.top);
  });

  container.addEventListener('mouseleave', () => {
    mouseMove = [0, 0];
  });

  container.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    if (touch) {
      const rect = container.getBoundingClientRect();
      handleMove(touch.clientX - rect.left, touch.clientY - rect.top);
    }
  }, { passive: false });

  container.addEventListener('touchend', () => {
    mouseMove = [0, 0];
  });

  container.addEventListener('wheel', (e) => {
    const delta = e.deltaY * 0.01;
    wheelDelta = [wheelDelta[0] * 0.9 + delta * 0.1, wheelDelta[1] + delta];
  }, { passive: true });

  const resizeObserver = new ResizeObserver(() => {
    resize();
  });
  resizeObserver.observe(container);

  window.addEventListener('resize', resize);
  resize();

  // رندر با فریم‌ریت محدود شده برای روان‌تر شدن
  function render(now) {
    if (!isPlaying) {
      animationId = requestAnimationFrame(render);
      return;
    }

    // محدود کردن فریم‌ریت به 30 فریم برای کاهش مصرف CPU
    if (now - lastFrameTime < 33) { // ~30fps
      animationId = requestAnimationFrame(render);
      return;
    }
    lastFrameTime = now;

    elapsedTime = now - startTime;
    const timeSec = elapsedTime / 1000;

    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    
    gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
    gl.uniform1f(uniforms.time, timeSec);
    gl.uniform2f(uniforms.move, mouseMove[0], mouseMove[1]);
    gl.uniform2f(uniforms.wheel, wheelDelta[0], wheelDelta[1]);
    gl.uniform1f(uniforms.startRandom, startRandom);
    
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    
    animationId = requestAnimationFrame(render);
  }

  startTime = performance.now();
  render(startTime);

  return function cleanup() {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    resizeObserver.disconnect();
    window.removeEventListener('resize', resize);
    gl.deleteProgram(program);
    gl.deleteBuffer(buffer);
  };
}

// ============================================================
// بخش 2: Client (متن معرفی)
// ============================================================
function renderClientSection() {
  return `
    <section class="client-section">
      <div class="w-layout-blockcontainer container-large w-container">
        <div class="client-text-wrap">
          <p class="client-text">${i18n.t('client_text') || '"Our teams are purpose-built to support every stage of your brand\'s journey. From strategy to design and content, we create meaningful work that resonates with your audience and drives your business forward."'}</p>
        </div>
      </div>
    </section>
  `;
}

// بخش Feature - 3 کارت
function renderFeatureSection() {
  const features = [
    {
      title: i18n.t('feature_card1_title') || 'Brand Strategy',
      text: i18n.t('feature_card1_content') || '"We craft tailored digital strategies aligned with your brand\'s goals, leveraging research and insights to create impactful solutions that drive growth and engagement."',
      icon: '/assets/img/feature-icon-01.svg'
    },
    {
      title: i18n.t('feature_card2_title') || 'Creativity & Design',
      text: i18n.t('feature_card2_content') || '"We deliver innovative design and content strategies, bringing your brand to life across social media, advertising channels, and all digital touchpoints."',
      icon: '/assets/img/feature-icon-02.svg'
    },
    {
      title: i18n.t('feature_card3_title') || 'Analytics & Optimization',
      text: i18n.t('feature_card3_content') || '"We monitor and analyze key metrics, optimizing campaigns to maximize client success and enhance ROI across all brand initiatives."',
      icon: '/assets/img/feature-icon-03.svg'
    }
  ];
  
  const cards = features.map(feature => `
    <div class="feature-card">
      <div class="feature-icon-wrap">
        <img src="${feature.icon}" alt="Feature Icon" />
      </div>
      <h2 class="feature-card-title">${feature.title}</h2>
      <p class="feature-card-content">${feature.text}</p>
      <div class="feature-pattern-wrap">
        <img src="/assets/img/feature-pattern.svg" alt="Feature Pattern" />
      </div>
    </div>
  `).join('');
  
  return `
    <section class="feature-section">
      <div class="container-regular">
        <div class="feature-area">
          ${cards}
        </div>
      </div>
    </section>
  `;
}

// ============================================================
// بخش 4: Count (آمارها)
// ============================================================
function renderCountSection(currentLang) {
  const countItems = [
    { number: '100+', text: i18n.t('global_clients') || 'Global Clientele', icon: '/assets/img/count-icon-01.svg' },
    { number: '50+', text: i18n.t('honor_highlight') || 'Honor Highlight', icon: '/assets/img/count-icon-02.svg' },
    { number: '200+', text: i18n.t('projects_done') || 'Project done', icon: '/assets/img/count-icon-03.svg' },
    { number: '15+', text: i18n.t('business_expertise') || 'Business Expertise', icon: '/assets/img/count-icon-04.svg' }
  ];
  
  return `
    <section class="count-section">
      <div class="w-layout-blockcontainer container-regular w-container">
        <div class="w-layout-grid count-grid">
          <div>
            <div class="count-title-wrap">
              <h2 class="section-title">${i18n.t('count_title') || 'Digital Success & Delivery'}</h2>
            </div>
            <p class="count-content">${i18n.t('count_content') || '"Our goal is to help clients succeed in the digital landscape through creative strategies and effective execution, delivering measurable results for their brand."'}</p>
            <div class="count-button-wrap">
              <a href="/${currentLang}/about" class="primary-button" data-route="about">${i18n.t('see_more') || 'See More'}</a>
            </div>
          </div>
          <div class="count-area">
            <div class="count-wrap">
              ${renderCountItem(countItems[0])}
              ${renderCountItem(countItems[1])}
            </div>
            <div class="count-wrap">
              ${renderCountItem(countItems[2])}
              ${renderCountItem(countItems[3])}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderCountItem(item) {
  return `
    <div class="count-item-wrap">
      <div class="count-icon-wrap">
        <img src="${item.icon}" alt="Count Icon" />
      </div>
      <div>
        <h2 class="count-title">${item.number}</h2>
        <p class="count-text">${item.text}</p>
      </div>
    </div>
  `;
}

// ============================================================
// بخش 4.5: Services (خدمات)
// ============================================================
function renderServicesSection(currentLang) {
  const services = [
    {
      title: "Web Solutions",
      desc: '"We design and develop visually appealing, intuitive websites that reflect your brand identity, using cutting-edge tools and modern development practices."',
      icon: "/assets/img/service-icon-01.svg"
    },
    {
      title: "Social Media Management",
      desc: '"We elevate your brand across social media platforms with targeted content strategies designed to engage audiences and drive meaningful conversions."',
      icon: "/assets/img/service-icon-02.svg"
    },
    {
      title: "PPC Advertising",
      desc: "We maximize ROI through targeted ads on search engines and social media, continuously optimizing campaigns to reach your audience effectively and efficiently.",
      icon: "/assets/img/service-icon-03.svg"
    },
    {
      title: "Analytics & Insights",
      desc: "We leverage advanced analytics to gain actionable insights for digital marketing. By tracking metrics, measuring campaigns, and optimizing strategies, we help your brand achieve measurable growth.",
      icon: "/assets/img/service-icon-04.svg"
    }
  ];
  
  const serviceCards = services.map(service => `
    <div class="service-post-collection-item w-dyn-item w-col w-col-6">
      <div class="service-post-card">
        <div class="service-top-wrap">
          <a href="/${currentLang}/services" class="service-post-icon-wrap w-inline-block" data-route="services">
            <img src="${service.icon}" loading="lazy" alt="Icon" class="service-post-icon" />
          </a>
          <div class="service-card-title-wrap">
            <a href="/${currentLang}/services" class="service-card-title" data-route="services">${service.title}</a>
            <div class="service-card-title-line-wrap"></div>
          </div>
        </div>
        <p class="service-card-content">${service.desc}</p>
      </div>
    </div>
  `).join('');
  
  return `
    <section class="service-post-section">
      <div class="w-layout-blockcontainer container-regular w-container">
        <div class="service-title-area">
          <div class="service-post-title-wrap">
            <h2 class="section-title text-white">${i18n.t('services_title') || 'We offer a wide range of design services.'}</h2>
          </div>
          <div>
            <a href="/${currentLang}/services" class="secondary-button lite-color-hover w-button" data-route="services">View More</a>
          </div>
        </div>
        <div class="service-post-card-area">
          <div class="w-dyn-list">
            <div role="list" class="w-dyn-items w-row">
              ${serviceCards}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

// ============================================================
// بخش 5: Projects (پروژه‌های اخیر)
// ============================================================
function renderProjectsSection(projects, currentLang) {
  const heroProjects = projects.slice(0, 3);
  const sideProjects = projects.slice(3, 6);
  
  return `
    <section class="project-section">
      <div class="w-layout-blockcontainer container-regular w-container">
        <div class="w-layout-grid project-grid">
          <div>
            <div>
              <h2 class="section-title">${i18n.t('projects_title') || 'Explore our projects'}</h2>
              <div class="section-content-wrap">
                <p>${i18n.t('projects_subtitle') || 'Our teams are purpose-built around our client\'s unique every stage of the engagement our goal is to create works for your audience and your business'}</p>
              </div>
              <div class="project-button-wrap">
                <a href="/${currentLang}/projects" class="primary-button" data-route="projects">${i18n.t('view_projects') || 'View Projects'}</a>
              </div>
            </div>
            <div>
              <div class="projects-list" id="projects-home-list-1">
                ${renderProjectCards(heroProjects, currentLang)}
              </div>
            </div>
          </div>
          <div>
            <div class="projects-list" id="projects-home-list-2">
              ${renderProjectCards(sideProjects, currentLang)}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderProjectCards(projects, lang) {
  if (!projects || projects.length === 0) return '';
  
  return projects.map(project => `
    <div role="listitem" class="project-collection-item w-dyn-item w-col w-col-6">
      <div class="project-card-wrap">
        <div class="project-image-area">
          <a href="/${lang}/project/${project.slug}" class="project-image-wrap w-inline-block">
            <img src="${project.images?.image || '/assets/img/default-project.jpg'}" loading="lazy" alt="${project.name}" class="project-image" />
          </a>
          <a href="/${lang}/project/${project.slug}" class="project-overlay-wrap w-inline-block">
            <div class="project-arrow-icon-wrap">
              <img src="/assets/img/project-arrow.svg" class="project-arrow-icon" />
            </div>
          </a>
        </div>
        <div class="project-title-wrap">
          <a href="/${lang}/project/${project.slug}" class="project-title">${escapeHtml(project.name)}</a>
        </div>
      </div>
    </div>
  `).join('');
}

// ============================================================
// بخش 6: FAQ (سوالات متداول)
// ============================================================
function renderFAQSection() {
  const faqs = [
    { q: i18n.t('faq_q1'), a: i18n.t('faq_a1') },
    { q: i18n.t('faq_q2'), a: i18n.t('faq_a2') },
    { q: i18n.t('faq_q3'), a: i18n.t('faq_a3') },
    { q: i18n.t('faq_q4'), a: i18n.t('faq_a4') },
    { q: i18n.t('faq_q5'), a: i18n.t('faq_a5') }
  ];
  
  const faqItems = faqs.map(faq => `
    <div data-hover="false" data-delay="0" class="faq-wrap w-dropdown">
      <div class="faq-question-wrap w-dropdown-toggle">
        <div class="faq-question text-white">${escapeHtml(faq.q)}</div>
        <div class="faq-arrow-wrap dark-bg-with-white-border">
          <img src="/assets/img/faq-arrow-lite.svg" loading="lazy" alt="FAQ Arrow" class="faq-arrow-lite" />
          <img src="/assets/img/faq-arrow-dark.svg" loading="lazy" alt="FAQ Arrow" class="faq-arrow-dark" />
        </div>
      </div>
      <nav class="faq-answer-wrap w-dropdown-list">
        <p class="faq-content text-white">${escapeHtml(faq.a)}</p>
      </nav>
    </div>
  `).join('');
  
  return `
    <section class="faq-section home-page">
      <div class="w-layout-blockcontainer container-regular w-container">
        <div class="faq-area">
          <div class="align-center">
            <div class="section-title-wrap large">
              <h2 class="section-title text-white">${i18n.t('faq_title') || 'Frequently asked question'}</h2>
              <div class="section-content-wrap">
                <p class="text-white">${i18n.t('faq_subtitle') || 'Our teams are purpose-built to support every stage of your brand\'s journey. From strategy to design and content, we create meaningful work that resonates with your audience and drives your business forward.'}</p>
              </div>
            </div>
          </div>
          <div class="faq-whole-wrap">
            ${faqItems}
          </div>
        </div>
      </div>
    </section>
  `;
}

// ============================================================
// بخش 7: Blog (مقالات اخیر)
// ============================================================
function renderBlogSection(blogs, currentLang) {
  const isRTL = currentLang === 'fa' || currentLang === 'ar';
  
  if (!blogs || blogs.length === 0) {
    return `
      <section class="article-section">
        <div class="container-regular">
          <div class="article-title-area">
            <div class="article-title-wrap">
              <h2 class="section-title">${i18n.t('blog_title') || 'Read news and articles'}</h2>
            </div>
            <a href="/${currentLang}/blog" class="primary-button" data-route="blog">${i18n.t('view_articles') || 'View All Articles'}</a>
          </div>
          <div style="text-align: center; padding: 60px;">
            <p>No blog posts found.</p>
          </div>
        </div>
      </section>
    `;
  }
  
  return `
    <section class="article-section">
      <div class="container-regular">
        <div class="article-title-area">
          <div class="article-title-wrap">
            <h2 class="section-title">${i18n.t('blog_title') || 'Read news and articles'}</h2>
          </div>
          <a href="/${currentLang}/blog" class="primary-button" data-route="blog">${i18n.t('view_articles') || 'View All Articles'}</a>
        </div>
        <div class="blog-grid-container ${isRTL ? 'rtl-blog' : ''}">
          <div class="blog-main-card">
            ${renderMainBlog(blogs[0], currentLang)}
          </div>
          <div class="blog-side-list">
            ${blogs.slice(1, 4).map(blog => renderSideBlog(blog, currentLang)).join('')}
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderMainBlog(blog, lang) {
  const title = lang === 'en' ? (blog.title_en || blog.title) : blog.title;
  const image = blog.images?.image_1 || '/assets/img/default-project.jpg';
  const excerpt = blog.excerpt || (lang === 'en' ? blog.description_en : blog.description) || '';
  const shortExcerpt = excerpt.length > 120 ? excerpt.substring(0, 120) + '...' : excerpt;
  
  return `
    <div class="blog-main-card-inner">
      <a href="/${lang}/blog-details?id=${blog.id}" class="blog-main-image-link">
        <img src="${image}" alt="${escapeHtml(title)}" class="blog-main-image" />
      </a>
      <div class="blog-main-content">
        <h3 class="blog-main-title">
          <a href="/${lang}/blog-details?id=${blog.id}">${escapeHtml(title)}</a>
        </h3>
        <p class="blog-main-excerpt">${escapeHtml(shortExcerpt)}</p>
        <a href="/${lang}/blog-details?id=${blog.id}" class="blog-read-more">${i18n.t('read_more') || 'Read More'} →</a>
      </div>
    </div>
  `;
}

function renderSideBlog(blog, lang) {
  const title = lang === 'en' ? (blog.title_en || blog.title) : blog.title;
  const image = blog.images?.image_1 || '/assets/img/default-project.jpg';
  
  return `
    <div class="blog-side-item">
      <a href="/${lang}/blog-details?id=${blog.id}" class="blog-side-image-link">
        <img src="${image}" alt="${escapeHtml(title)}" class="blog-side-image" />
      </a>
      <div class="blog-side-content">
        <h4 class="blog-side-title">
          <a href="/${lang}/blog-details?id=${blog.id}">${escapeHtml(title)}</a>
        </h4>
      </div>
    </div>
  `;
}

// ============================================================
// بخش 8: CTA (دعوت به اقدام)
// ============================================================
function renderCTASection(currentLang) {
  return `
    <section class="cta-section">
      <div class="w-layout-blockcontainer container-regular w-container">
        <div class="cta-image-wrap">
          <img src="/assets/img/cta-image.jpg" loading="lazy" alt="CTA" class="cta-image" />
          <div class="cta-title-area">
            <div class="cta-title-wrap">
              <h2 class="section-title text-white">${i18n.t('cta_title') || 'Are you geared up for the digital shift?'}</h2>
              <div class="cta-button-wrap">
                <a href="/${currentLang}/contact" class="cta-button" data-route="contact">${i18n.t('get_started') || 'Get Started'}</a>
              </div>
            </div>
          </div>
          <div class="cta-bg-wrap"></div>
        </div>
      </div>
    </section>
  `;
}

// ============================================================
// بخش 9: رویدادها (Event Handlers)
// ============================================================
function attachHomeEvents() {
  // FAQ Accordion
  document.querySelectorAll('.faq-question-wrap').forEach((question) => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      const arrowWrap = question.querySelector('.faq-arrow-wrap');
      
      if (answer.style.display === 'block') {
        answer.style.display = 'none';
        if (arrowWrap) arrowWrap.style.transform = 'rotate(0deg)';
      } else {
        answer.style.display = 'block';
        if (arrowWrap) arrowWrap.style.transform = 'rotate(180deg)';
      }
    });
  });
  
  // Intersection Observer for animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    },
    { threshold: 0.4 }
  );
  
  document.querySelectorAll('.scroll-animate, [data-w-id]').forEach(el => {
    observer.observe(el);
  });
}

// ============================================================
// بخش 10: تابع اصلی renderHome
// ============================================================
export async function renderHome() {
  const app = document.getElementById('app');
  const currentLang = i18n.getCurrentLanguage();
  
  const projects = await getProjects(6);
  const blogs = await getBlogs(4);
  
  app.innerHTML = `
    ${renderHeader()}
    ${renderHeroSection(currentLang)}
    ${renderClientSection()}
    ${renderFeatureSection()}
    ${renderCountSection(currentLang)}
    ${renderServicesSection(currentLang)}
    ${renderProjectsSection(projects, currentLang)}
    ${renderFAQSection()}
    ${renderBlogSection(blogs, currentLang)}
    ${renderCTASection(currentLang)}
    ${renderFooter()}
  `;
  
  const cleanupShader = initHeroShader();
  
  attachHeaderEvents();
  attachFooterEvents();
  attachHomeEvents();
  
  document.querySelectorAll('[data-route]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      if (href) window.location.href = href;
    });
  });
  
  if (cleanupShader) {
    window.addEventListener('beforeunload', cleanupShader);
  }
}

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}