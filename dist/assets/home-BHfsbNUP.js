import{h as L,d as I,m as i}from"./index-OOzpxp90.js";import{c as M,r as B,b as O,a as N}from"./footer-CboKM8tC.js";function H(a){return`
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
              <h1 class="hero-title">${i.t("hero_title")}</h1>
              <p class="hero-subtitle">${i.t("hero_subtitle")}</p>
              <a href="/${a}/services" class="hero-btn" data-route="services">${i.t("hero_btn")}</a>
            </div>
          </div>
        </section>
      </div>
    </div>
  `}function W(){const a=document.getElementById("heroCanvas");if(!a)return;const t=document.getElementById("heroShaderContainer");if(!t)return;const r=`#version 300 es
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
}`,e=a.getContext("webgl2");if(!e){console.warn("WebGL2 not supported");return}let c=performance.now(),f=0,l=null,m=0;const E=window.innerWidth<768;let k=navigator.hardwareConcurrency<4?.35:E?.45:.6;const F=`#version 300 es
precision highp float;
in vec4 position;
void main() {
  gl_Position = position;
}`;function q(s,n){const o=e.createShader(n);return e.shaderSource(o,s),e.compileShader(o),e.getShaderParameter(o,e.COMPILE_STATUS)?o:(console.error(e.getShaderInfoLog(o)),e.deleteShader(o),null)}function P(s,n){const o=q(s,e.VERTEX_SHADER),p=q(n,e.FRAGMENT_SHADER);if(!o||!p)return null;const v=e.createProgram();return e.attachShader(v,o),e.attachShader(v,p),e.linkProgram(v),e.getProgramParameter(v,e.LINK_STATUS)?v:(console.error(e.getProgramInfoLog(v)),e.deleteProgram(v),null)}const T=[-1,1,-1,-1,1,1,1,-1],$=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,$),e.bufferData(e.ARRAY_BUFFER,new Float32Array(T),e.STATIC_DRAW);const d=P(F,r);if(!d){console.warn("Failed to create shader program");return}const g={resolution:e.getUniformLocation(d,"resolution"),time:e.getUniformLocation(d,"time"),move:e.getUniformLocation(d,"move"),wheel:e.getUniformLocation(d,"wheel"),startRandom:e.getUniformLocation(d,"startRandom")},x=e.getAttribLocation(d,"position");e.enableVertexAttribArray(x),e.vertexAttribPointer(x,2,e.FLOAT,!1,0,0);function b(){const s=t.getBoundingClientRect(),n=Math.min(window.devicePixelRatio||1,1.5),o=Math.floor(s.width*n*k),p=Math.floor(s.height*n*k);a.width=o,a.height=p,a.style.width=s.width+"px",a.style.height=s.height+"px",e.viewport(0,0,o,p)}let h=[0,0],w=[0,0],C=Math.random();function S(s,n){const o=t.getBoundingClientRect(),p=(s-o.width/2)/o.width,v=(n-o.height/2)/o.height;h=[p*2,v*2]}let A=0;const z=30;t.addEventListener("mousemove",s=>{const n=Date.now();if(n-A<z)return;A=n;const o=t.getBoundingClientRect();S(s.clientX-o.left,s.clientY-o.top)}),t.addEventListener("mouseleave",()=>{h=[0,0]}),t.addEventListener("touchmove",s=>{s.preventDefault();const n=s.touches[0];if(n){const o=t.getBoundingClientRect();S(n.clientX-o.left,n.clientY-o.top)}},{passive:!1}),t.addEventListener("touchend",()=>{h=[0,0]}),t.addEventListener("wheel",s=>{const n=s.deltaY*.01;w=[w[0]*.9+n*.1,w[1]+n]},{passive:!0});const j=new ResizeObserver(()=>{b()});j.observe(t),window.addEventListener("resize",b),b();function _(s){if(s-m<33){l=requestAnimationFrame(_);return}m=s,f=s-c;const n=f/1e3;e.useProgram(d),e.bindBuffer(e.ARRAY_BUFFER,$),e.vertexAttribPointer(x,2,e.FLOAT,!1,0,0),e.uniform2f(g.resolution,a.width,a.height),e.uniform1f(g.time,n),e.uniform2f(g.move,h[0],h[1]),e.uniform2f(g.wheel,w[0],w[1]),e.uniform1f(g.startRandom,C),e.drawArrays(e.TRIANGLE_STRIP,0,4),l=requestAnimationFrame(_)}return c=performance.now(),_(c),function(){l&&cancelAnimationFrame(l),j.disconnect(),window.removeEventListener("resize",b),e.deleteProgram(d),e.deleteBuffer($)}}function D(){return`
    <section class="client-section">
      <div class="w-layout-blockcontainer container-large w-container">
        <div class="client-text-wrap">
          <p class="client-text">${i.t("client_text")||`"Our teams are purpose-built to support every stage of your brand's journey. From strategy to design and content, we create meaningful work that resonates with your audience and drives your business forward."`}</p>
        </div>
      </div>
    </section>
  `}function U(){return`
    <section class="feature-section">
      <div class="container-regular">
        <div class="feature-area">
          ${[{title:i.t("feature_card1_title")||"Brand Strategy",text:i.t("feature_card1_content")||`"We craft tailored digital strategies aligned with your brand's goals, leveraging research and insights to create impactful solutions that drive growth and engagement."`,icon:"/assets/img/feature-icon-01.svg"},{title:i.t("feature_card2_title")||"Creativity & Design",text:i.t("feature_card2_content")||'"We deliver innovative design and content strategies, bringing your brand to life across social media, advertising channels, and all digital touchpoints."',icon:"/assets/img/feature-icon-02.svg"},{title:i.t("feature_card3_title")||"Analytics & Optimization",text:i.t("feature_card3_content")||'"We monitor and analyze key metrics, optimizing campaigns to maximize client success and enhance ROI across all brand initiatives."',icon:"/assets/img/feature-icon-03.svg"}].map(r=>`
    <div class="feature-card">
      <div class="feature-icon-wrap">
        <img src="${r.icon}" alt="Feature Icon" />
      </div>
      <h2 class="feature-card-title">${r.title}</h2>
      <p class="feature-card-content">${r.text}</p>
      <div class="feature-pattern-wrap">
        <img src="/assets/img/feature-pattern.svg" alt="Feature Pattern" />
      </div>
    </div>
  `).join("")}
        </div>
      </div>
    </section>
  `}function Y(a){const t=[{number:"100+",text:i.t("global_clients")||"Global Clientele",icon:"/assets/img/count-icon-01.svg"},{number:"50+",text:i.t("honor_highlight")||"Honor Highlight",icon:"/assets/img/count-icon-02.svg"},{number:"200+",text:i.t("projects_done")||"Project done",icon:"/assets/img/count-icon-03.svg"},{number:"15+",text:i.t("business_expertise")||"Business Expertise",icon:"/assets/img/count-icon-04.svg"}];return`
    <section class="count-section">
      <div class="w-layout-blockcontainer container-regular w-container">
        <div class="w-layout-grid count-grid">
          <div>
            <div class="count-title-wrap">
              <h2 class="section-title">${i.t("count_title")||"Digital Success & Delivery"}</h2>
            </div>
            <p class="count-content">${i.t("count_content")||'"Our goal is to help clients succeed in the digital landscape through creative strategies and effective execution, delivering measurable results for their brand."'}</p>
            <div class="count-button-wrap">
              <a href="/${a}/about" class="primary-button" data-route="about">${i.t("see_more")||"See More"}</a>
            </div>
          </div>
          <div class="count-area">
            <div class="count-wrap">
              ${y(t[0])}
              ${y(t[1])}
            </div>
            <div class="count-wrap">
              ${y(t[2])}
              ${y(t[3])}
            </div>
          </div>
        </div>
      </div>
    </section>
  `}function y(a){return`
    <div class="count-item-wrap">
      <div class="count-icon-wrap">
        <img src="${a.icon}" alt="Count Icon" />
      </div>
      <div>
        <h2 class="count-title">${a.number}</h2>
        <p class="count-text">${a.text}</p>
      </div>
    </div>
  `}function V(a){const r=[{title:"Web Solutions",desc:'"We design and develop visually appealing, intuitive websites that reflect your brand identity, using cutting-edge tools and modern development practices."',icon:"/assets/img/service-icon-01.svg"},{title:"Social Media Management",desc:'"We elevate your brand across social media platforms with targeted content strategies designed to engage audiences and drive meaningful conversions."',icon:"/assets/img/service-icon-02.svg"},{title:"PPC Advertising",desc:"We maximize ROI through targeted ads on search engines and social media, continuously optimizing campaigns to reach your audience effectively and efficiently.",icon:"/assets/img/service-icon-03.svg"},{title:"Analytics & Insights",desc:"We leverage advanced analytics to gain actionable insights for digital marketing. By tracking metrics, measuring campaigns, and optimizing strategies, we help your brand achieve measurable growth.",icon:"/assets/img/service-icon-04.svg"}].map(e=>`
    <div class="service-post-collection-item w-dyn-item w-col w-col-6">
      <div class="service-post-card">
        <div class="service-top-wrap">
          <a href="/${a}/services" class="service-post-icon-wrap w-inline-block" data-route="services">
            <img src="${e.icon}" loading="lazy" alt="Icon" class="service-post-icon" />
          </a>
          <div class="service-card-title-wrap">
            <a href="/${a}/services" class="service-card-title" data-route="services">${e.title}</a>
            <div class="service-card-title-line-wrap"></div>
          </div>
        </div>
        <p class="service-card-content">${e.desc}</p>
      </div>
    </div>
  `).join("");return`
    <section class="service-post-section">
      <div class="w-layout-blockcontainer container-regular w-container">
        <div class="service-title-area">
          <div class="service-post-title-wrap">
            <h2 class="section-title text-white">${i.t("services_title")||"We offer a wide range of design services."}</h2>
          </div>
          <div>
            <a href="/${a}/services" class="secondary-button lite-color-hover w-button" data-route="services">View More</a>
          </div>
        </div>
        <div class="service-post-card-area">
          <div class="w-dyn-list">
            <div role="list" class="w-dyn-items w-row">
              ${r}
            </div>
          </div>
        </div>
      </div>
    </section>
  `}function G(a,t){const r=a.slice(0,3),e=a.slice(3,6);return`
    <section class="project-section">
      <div class="w-layout-blockcontainer container-regular w-container">
        <div class="w-layout-grid project-grid">
          <div>
            <div>
              <h2 class="section-title">${i.t("projects_title")||"Explore our projects"}</h2>
              <div class="section-content-wrap">
                <p>${i.t("projects_subtitle")||"Our teams are purpose-built around our client's unique every stage of the engagement our goal is to create works for your audience and your business"}</p>
              </div>
              <div class="project-button-wrap">
                <a href="/${t}/projects" class="primary-button" data-route="projects">${i.t("view_projects")||"View Projects"}</a>
              </div>
            </div>
            <div>
              <div class="projects-list" id="projects-home-list-1">
                ${R(r,t)}
              </div>
            </div>
          </div>
          <div>
            <div class="projects-list" id="projects-home-list-2">
              ${R(e,t)}
            </div>
          </div>
        </div>
      </div>
    </section>
  `}function R(a,t){return!a||a.length===0?"":a.map(r=>{var e;return`
    <div role="listitem" class="project-collection-item w-dyn-item w-col w-col-6">
      <div class="project-card-wrap">
        <div class="project-image-area">
          <a href="/${t}/project/${r.slug}" class="project-image-wrap w-inline-block">
            <img src="${((e=r.images)==null?void 0:e.image)||"/assets/img/default-project.jpg"}" loading="lazy" alt="${r.name}" class="project-image" />
          </a>
          <a href="/${t}/project/${r.slug}" class="project-overlay-wrap w-inline-block">
            <div class="project-arrow-icon-wrap">
              <img src="/assets/img/project-arrow.svg" class="project-arrow-icon" />
            </div>
          </a>
        </div>
        <div class="project-title-wrap">
          <a href="/${t}/project/${r.slug}" class="project-title">${u(r.name)}</a>
        </div>
      </div>
    </div>
  `}).join("")}function X(){const t=[{q:i.t("faq_q1"),a:i.t("faq_a1")},{q:i.t("faq_q2"),a:i.t("faq_a2")},{q:i.t("faq_q3"),a:i.t("faq_a3")},{q:i.t("faq_q4"),a:i.t("faq_a4")},{q:i.t("faq_q5"),a:i.t("faq_a5")}].map(r=>`
    <div data-hover="false" data-delay="0" class="faq-wrap w-dropdown">
      <div class="faq-question-wrap w-dropdown-toggle">
        <div class="faq-question text-white">${u(r.q)}</div>
        <div class="faq-arrow-wrap dark-bg-with-white-border">
          <img src="/assets/img/faq-arrow-lite.svg" loading="lazy" alt="FAQ Arrow" class="faq-arrow-lite" />
          <img src="/assets/img/faq-arrow-dark.svg" loading="lazy" alt="FAQ Arrow" class="faq-arrow-dark" />
        </div>
      </div>
      <nav class="faq-answer-wrap w-dropdown-list">
        <p class="faq-content text-white">${u(r.a)}</p>
      </nav>
    </div>
  `).join("");return`
    <section class="faq-section home-page">
      <div class="w-layout-blockcontainer container-regular w-container">
        <div class="faq-area">
          <div class="align-center">
            <div class="section-title-wrap large">
              <h2 class="section-title text-white">${i.t("faq_title")||"Frequently asked question"}</h2>
              <div class="section-content-wrap">
                <p class="text-white">${i.t("faq_subtitle")||"Our teams are purpose-built to support every stage of your brand's journey. From strategy to design and content, we create meaningful work that resonates with your audience and drives your business forward."}</p>
              </div>
            </div>
          </div>
          <div class="faq-whole-wrap">
            ${t}
          </div>
        </div>
      </div>
    </section>
  `}function Q(a,t){const r=t==="fa"||t==="ar";return!a||a.length===0?`
      <section class="article-section">
        <div class="container-regular">
          <div class="article-title-area">
            <div class="article-title-wrap">
              <h2 class="section-title">${i.t("blog_title")||"Read news and articles"}</h2>
            </div>
            <a href="/${t}/blog" class="primary-button" data-route="blog">${i.t("view_articles")||"View All Articles"}</a>
          </div>
          <div style="text-align: center; padding: 60px;">
            <p>No blog posts found.</p>
          </div>
        </div>
      </section>
    `:`
    <section class="article-section">
      <div class="container-regular">
        <div class="article-title-area">
          <div class="article-title-wrap">
            <h2 class="section-title">${i.t("blog_title")||"Read news and articles"}</h2>
          </div>
          <a href="/${t}/blog" class="primary-button" data-route="blog">${i.t("view_articles")||"View All Articles"}</a>
        </div>
        <div class="blog-grid-container ${r?"rtl-blog":""}">
          <div class="blog-main-card">
            ${K(a[0],t)}
          </div>
          <div class="blog-side-list">
            ${a.slice(1,4).map(e=>J(e,t)).join("")}
          </div>
        </div>
      </div>
    </section>
  `}function K(a,t){var l;const r=t==="en"&&a.title_en||a.title,e=((l=a.images)==null?void 0:l.image_1)||"/assets/img/default-project.jpg",c=a.excerpt||(t==="en"?a.description_en:a.description)||"",f=c.length>120?c.substring(0,120)+"...":c;return`
    <div class="blog-main-card-inner">
      <a href="/${t}/blog-details?id=${a.id}" class="blog-main-image-link">
        <img src="${e}" alt="${u(r)}" class="blog-main-image" />
      </a>
      <div class="blog-main-content">
        <h3 class="blog-main-title">
          <a href="/${t}/blog-details?id=${a.id}">${u(r)}</a>
        </h3>
        <p class="blog-main-excerpt">${u(f)}</p>
        <a href="/${t}/blog-details?id=${a.id}" class="blog-read-more">${i.t("read_more")||"Read More"} →</a>
      </div>
    </div>
  `}function J(a,t){var c;const r=t==="en"&&a.title_en||a.title,e=((c=a.images)==null?void 0:c.image_1)||"/assets/img/default-project.jpg";return`
    <div class="blog-side-item">
      <a href="/${t}/blog-details?id=${a.id}" class="blog-side-image-link">
        <img src="${e}" alt="${u(r)}" class="blog-side-image" />
      </a>
      <div class="blog-side-content">
        <h4 class="blog-side-title">
          <a href="/${t}/blog-details?id=${a.id}">${u(r)}</a>
        </h4>
      </div>
    </div>
  `}function Z(a){return`
    <section class="cta-section">
      <div class="w-layout-blockcontainer container-regular w-container">
        <div class="cta-image-wrap">
          <img src="/assets/img/cta-image.jpg" loading="lazy" alt="CTA" class="cta-image" />
          <div class="cta-title-area">
            <div class="cta-title-wrap">
              <h2 class="section-title text-white">${i.t("cta_title")||"Are you geared up for the digital shift?"}</h2>
              <div class="cta-button-wrap">
                <a href="/${a}/contact" class="cta-button" data-route="contact">${i.t("get_started")||"Get Started"}</a>
              </div>
            </div>
          </div>
          <div class="cta-bg-wrap"></div>
        </div>
      </div>
    </section>
  `}function ee(){document.querySelectorAll(".faq-question-wrap").forEach(t=>{t.addEventListener("click",()=>{const r=t.nextElementSibling,e=t.querySelector(".faq-arrow-wrap");r.style.display==="block"?(r.style.display="none",e&&(e.style.transform="rotate(0deg)")):(r.style.display="block",e&&(e.style.transform="rotate(180deg)"))})});const a=new IntersectionObserver(t=>{t.forEach(r=>{r.isIntersecting&&r.target.classList.add("is-visible")})},{threshold:.4});document.querySelectorAll(".scroll-animate, [data-w-id]").forEach(t=>{a.observe(t)})}async function re(){const a=document.getElementById("app"),t=i.getCurrentLanguage(),r=await L(6),e=await I(4);a.innerHTML=`
    ${M()}
    ${H(t)}
    ${D()}
    ${U()}
    ${Y(t)}
    ${V(t)}
    ${G(r,t)}
    ${X()}
    ${Q(e,t)}
    ${Z(t)}
    ${B()}
  `;const c=W();O(),N(),ee(),document.querySelectorAll("[data-route]").forEach(f=>{f.addEventListener("click",l=>{l.preventDefault();const m=f.getAttribute("href");m&&(window.location.href=m)})}),c&&window.addEventListener("beforeunload",c)}function u(a){if(!a)return"";const t=document.createElement("div");return t.textContent=a,t.innerHTML}export{re as renderHome};
