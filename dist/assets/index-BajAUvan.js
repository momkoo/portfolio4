(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();function m(){y(),g(),E(),S(),L(),w(),x()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",m):m();function y(){const n=document.querySelector(".work-section");if(!n)return;const s=document.querySelectorAll(".text-item"),o=document.querySelectorAll(".image-item"),i=s.length;if(i===0)return;e(0),window.addEventListener("scroll",()=>{const t=n.getBoundingClientRect(),r=t.top,c=t.height,a=window.innerHeight;let l=-r/(c-a);l=Math.max(0,Math.min(1,l));const u=Math.floor(l*i),f=Math.min(u,i-1);e(f)});function e(t){s.forEach((r,c)=>{c===t?r.classList.add("active"):r.classList.remove("active")}),o.forEach((r,c)=>{c===t?r.classList.add("active"):r.classList.remove("active")})}}function g(){const n=document.querySelectorAll(".section[data-accent]");document.querySelectorAll(".nav-link");const s=document.querySelector(".color-indicator");if(document.querySelectorAll(".split-text"),n.length===0)return;let o=getComputedStyle(document.documentElement).getPropertyValue("--color-accent-default").trim()||"#FF6B5B";const i={root:null,rootMargin:"-30% 0px -70% 0px",threshold:0},e=new IntersectionObserver(t=>{t.forEach(r=>{if(r.isIntersecting){const c=r.target,a=c.dataset.accent;a&&a!==o&&(v(a,o,s),o=a,p(c.id),b(c))}})},i);if(n.forEach(t=>{e.observe(t)}),s){const t=document.querySelector(".hero"),r=new IntersectionObserver(c=>{c.forEach(a=>{a.isIntersecting?s.classList.remove("visible"):s.classList.add("visible")})},{threshold:0});t&&r.observe(t)}}function v(n,s,o){document.documentElement.style.setProperty("--current-accent",n),o&&(o.style.background=n),document.querySelectorAll(".nav-link").forEach(e=>{e.style.setProperty("--current-accent",n)})}function b(n){n.querySelectorAll(".split-text").forEach((o,i)=>{setTimeout(()=>{o.classList.add("active"),setTimeout(()=>{o.classList.remove("active")},800)},i*100)})}function E(){const n=document.querySelector(".nav");if(!n)return;window.addEventListener("scroll",()=>{window.pageYOffset>100?n.classList.add("scrolled"):n.classList.remove("scrolled")});const s=document.querySelectorAll(".nav-link");s.forEach(t=>{t.addEventListener("click",function(r){r.preventDefault();const c=this.getAttribute("href").substring(1),a=document.getElementById(c);if(a){const l=this.dataset.color;document.documentElement.style.setProperty("--current-accent",l);const h=a.getBoundingClientRect().top+window.pageYOffset-80;window.scrollTo({top:h,behavior:"smooth"})}})});const o=document.querySelectorAll("section[id]");if(o.length===0||s.length===0)return;const i={root:null,rootMargin:"-20% 0px -60% 0px",threshold:0},e=new IntersectionObserver(t=>{t.forEach(r=>{r.isIntersecting&&p(r.target.id)})},i);o.forEach(t=>{e.observe(t)})}function p(n){document.querySelectorAll(".nav-link").forEach(o=>{o.classList.remove("active"),o.getAttribute("href")===`#${n}`&&o.classList.add("active")})}function S(){const n=document.querySelectorAll(".service-item, .testimonial-item, .sticky-text-item");if(n.length===0)return;const s={root:null,rootMargin:"0px",threshold:.1},o=new IntersectionObserver(i=>{i.forEach(e=>{e.isIntersecting&&(e.target.classList.add("is-visible"),o.unobserve(e.target))})},s);n.forEach(i=>{o.observe(i)})}function x(){const n=document.querySelector(".hero-title");if(!n)return;n.querySelectorAll(".title-line").forEach((o,i)=>{const e=o.textContent;o.innerHTML="",e.split("").forEach((t,r)=>{if(t===" "){const c=document.createElement("span");c.textContent=" ",c.style.display="inline-block",c.style.width="0.3em",o.appendChild(c)}else{const c=document.createElement("span");c.textContent=t,c.style.display="inline-block",c.style.opacity="0",c.style.transform="translateY(20px)",c.style.transition=`opacity 0.6s ease ${i*.2+r*.05}s, transform 0.6s ease ${i*.2+r*.05}s`,o.appendChild(c)}}),setTimeout(()=>{o.querySelectorAll("span").forEach(r=>{r.style.opacity="1",r.style.transform="translateY(0)"})},300)})}function L(){document.querySelectorAll('a[href^="#"]').forEach(n=>{n.addEventListener("click",function(s){s.preventDefault();const o=this.getAttribute("href");if(o==="#"){window.scrollTo({top:0,behavior:"smooth"});return}const i=document.querySelector(o);if(i){const r=i.getBoundingClientRect().top+window.pageYOffset-80;window.scrollTo({top:r,behavior:"smooth"})}})})}function w(){const n=document.querySelector(".contact-form");if(!n)return;n.addEventListener("submit",function(o){o.preventDefault(),new FormData(n).forEach((a,l)=>{a.trim()});const e=n.querySelectorAll("input[required]"),t=[];if(e.forEach(a=>{a.value.trim()?a.style.borderColor="":(t.push(a.getAttribute("placeholder")),a.style.borderColor="#ff4444")}),t.length>0){d("모든 필수 항목을 입력해 주세요.","error");return}const r=n.querySelector('input[type="email"]');if(r){const a=r.value.trim();if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a)){d("올바른 이메일 형식을 입력해 주세요.","error"),r.style.borderColor="#ff4444";return}}const c=n.querySelector('input[type="tel"]');if(c){const a=c.value.trim();if(!/^[\d\s\-\+\(\)]{9,}$/.test(a)){d("올바른 연락처 형식을 입력해 주세요.","error"),c.style.borderColor="#ff4444";return}}d("문의 내용이 전송되었습니다. 확인 후 연락드리겠습니다.","success"),n.reset(),e.forEach(a=>{a.style.borderColor=""})}),n.querySelectorAll("input, textarea").forEach(o=>{o.addEventListener("input",()=>{o.style.borderColor=""})})}function d(n,s){const o=document.querySelector(".notification");o&&o.remove();const i=getComputedStyle(document.documentElement).getPropertyValue("--current-accent").trim()||"#FF6B5B",e=document.createElement("div");e.className=`notification ${s}`,e.innerHTML=`
        <span class="notification-message">${n}</span>
        <button class="notification-close">&times;</button>
    `,e.style.cssText=`
        position: fixed;
        top: 100px;
        right: 30px;
        padding: 20px 30px;
        background: ${s==="success"?i:"#ff4444"};
        color: ${s==="success"?"#0a0a0a":"#ffffff"};
        border-radius: 8px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 15px;
        animation: slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        font-size: 14px;
        font-weight: 400;
    `;const t=e.querySelector(".notification-close");if(t.style.cssText=`
        background: none;
        border: none;
        color: inherit;
        font-size: 24px;
        cursor: pointer;
        padding: 0;
        line-height: 1;
        opacity: 0.7;
        transition: opacity 0.2s;
    `,t.addEventListener("mouseenter",()=>t.style.opacity="1"),t.addEventListener("mouseleave",()=>t.style.opacity="0.7"),!document.querySelector("#notification-keyframes")){const r=document.createElement("style");r.id="notification-keyframes",r.textContent=`
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `,document.head.appendChild(r)}t.addEventListener("click",()=>{e.style.animation="slideOut 0.3s ease forwards",setTimeout(()=>e.remove(),300)}),setTimeout(()=>{e.parentNode&&(e.style.animation="slideOut 0.3s ease forwards",setTimeout(()=>e.remove(),300))},5e3),document.body.appendChild(e)}window.addEventListener("resize",()=>{});function A(){const n=document.querySelectorAll("img[data-src]");if(n.length===0)return;const s=new IntersectionObserver(o=>{o.forEach(i=>{if(i.isIntersecting){const e=i.target;e.src=e.dataset.src,e.removeAttribute("data-src"),s.unobserve(e)}})},{rootMargin:"50px 0px"});n.forEach(o=>s.observe(o))}A();
