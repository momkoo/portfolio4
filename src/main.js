/* ============================================
   WEDDING STORY - JavaScript
   Modern Portfolio with Sticky Scroll Works Section
   ============================================ */

import './styles.css';


// 페이지 로드 상태에 따라 초기화
function initAll() {
    initStickyScrollWorks();
    initScrollColorAnimation();
    initNavigation();
    initScrollAnimations();
    initSmoothScroll();
    initContactForm();
    initTextAnimation();
}

// DOM이 이미 로드되었으면 즉시 실행, 아니면 이벤트 대기
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
} else {
    // DOMContentLoaded가 이미 발생함
    initAll();
}

/**
 * 스티키 스크롤 워크스 섹션
 * 왼쪽 텍스트 스크롤, 오른쪽 스티키 이미지 동기화
 */
/**
 * Init Sticky Scroll Implementation
 */
function initStickyScrollWorks() {
    const workSection = document.querySelector('.work-section');
    if (!workSection) return;

    const textItems = document.querySelectorAll('.text-item');
    const imageItems = document.querySelectorAll('.image-item');
    const totalItems = textItems.length;

    if (totalItems === 0) return;

    // Initially activate the first item
    updateActiveItem(0);

    // Update active item based on scroll position within the section
    window.addEventListener('scroll', () => {
        const rect = workSection.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        const windowHeight = window.innerHeight;

        // Calculate progress: 0 when top of section hits top of viewport
        // 1 when bottom of section hits bottom of viewport
        // Actually, we want to map the scroll distance *within* the section

        // Start scrolling effect when section top is at viewport top
        let progress = -sectionTop / (sectionHeight - windowHeight);

        // Clamp progress between 0 and 1
        progress = Math.max(0, Math.min(1, progress));

        // Calculate current index
        // Divide progress into segments for each item
        const index = Math.floor(progress * totalItems);
        const safeIndex = Math.min(index, totalItems - 1);

        updateActiveItem(safeIndex);
    });

    function updateActiveItem(index) {
        textItems.forEach((item, i) => {
            if (i === index) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        imageItems.forEach((item, i) => {
            if (i === index) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
}


/**
 * 스크롤 색상 변경 애니메이션
 * 섹션별 포인트 컬러를 동적으로 변경 (오버레이 효과 제거)
 */
function initScrollColorAnimation() {
    const sections = document.querySelectorAll('.section[data-accent]');
    const navLinks = document.querySelectorAll('.nav-link');
    const colorIndicator = document.querySelector('.color-indicator');
    const splitTexts = document.querySelectorAll('.split-text');

    if (sections.length === 0) return;

    // 기본 색상 설정
    let currentAccent = getComputedStyle(document.documentElement).getPropertyValue('--color-accent-default').trim() || '#FF6B5B';

    // Intersection Observer로 현재 섹션 감지
    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -70% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;
                const accentColor = section.dataset.accent;

                if (accentColor && accentColor !== currentAccent) {
                    // 색상 변경 (오버레이 효과 없이)
                    changeAccentColor(accentColor, currentAccent, colorIndicator);
                    currentAccent = accentColor;

                    // 네비게이션 링크 활성화 업데이트
                    updateNavActiveState(section.id);

                    // 글자 색상 애니메이션 트리거
                    animateTextColors(section);
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // 히어로 섹션에서는 인디케이터 숨김
    if (colorIndicator) {
        const heroSection = document.querySelector('.hero');
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    colorIndicator.classList.remove('visible');
                } else {
                    colorIndicator.classList.add('visible');
                }
            });
        }, { threshold: 0 });

        if (heroSection) {
            heroObserver.observe(heroSection);
        }
    }
}

/**
 * 포인트 컬러 변경 (오버레이 효과 제거됨)
 */
function changeAccentColor(newColor, oldColor, indicator) {
    // CSS 변수 업데이트
    document.documentElement.style.setProperty('--current-accent', newColor);

    // 인디케이터 색상 변경
    if (indicator) {
        indicator.style.background = newColor;
    }

    // 네비게이션 언더라인 색상 업데이트
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.style.setProperty('--current-accent', newColor);
    });
}

/**
 * 텍스트 색상 애니메이션
 */
function animateTextColors(section) {
    const splitTexts = section.querySelectorAll('.split-text');

    splitTexts.forEach((text, index) => {
        setTimeout(() => {
            text.classList.add('active');

            setTimeout(() => {
                text.classList.remove('active');
            }, 800);
        }, index * 100);
    });
}

/**
 * 네비게이션 스크롤 효과 및 색상 동기화
 */
function initNavigation() {
    const nav = document.querySelector('.nav');

    if (!nav) return;

    // 스크롤 시 네비게이션 스타일 변경
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // 네비게이션 링크 클릭 시 해당 색상으로 변경
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const accentColor = this.dataset.color;

                // 즉시 색상 변경
                document.documentElement.style.setProperty('--current-accent', accentColor);

                // 부드럽게 스크롤
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 현재 섹션에 따른 네비게이션 활성화
    const sections = document.querySelectorAll('section[id]');

    if (sections.length === 0 || navLinks.length === 0) return;

    const sectionObserverOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateNavActiveState(entry.target.id);
            }
        });
    }, sectionObserverOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

/**
 * 네비게이션 활성화 상태 업데이트
 */
function updateNavActiveState(sectionId) {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.classList.remove('active');

        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });
}

/**
 * 스크롤 트리거 애니메이션
 * 요소가 뷰포트에 들어올 때 페이드 인 효과
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.service-item, .testimonial-item, .sticky-text-item'
    );

    if (animatedElements.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

/**
 * 텍스트 캐릭터 애니메이션
 * 히어로 타이틀에 글자별 등장 효과
 */
function initTextAnimation() {
    const heroTitle = document.querySelector('.hero-title');

    if (!heroTitle) return;

    // 각 줄을 캐릭터로 분리
    const titleLines = heroTitle.querySelectorAll('.title-line');

    titleLines.forEach((line, lineIndex) => {
        const text = line.textContent;
        line.innerHTML = '';

        // 각 글자를 스팬으로 감싸기
        text.split('').forEach((char, charIndex) => {
            if (char === ' ') {
                const span = document.createElement('span');
                span.textContent = ' ';
                span.style.display = 'inline-block';
                span.style.width = '0.3em';
                line.appendChild(span);
            } else {
                const span = document.createElement('span');
                span.textContent = char;
                span.style.display = 'inline-block';
                span.style.opacity = '0';
                span.style.transform = 'translateY(20px)';
                span.style.transition = `opacity 0.6s ease ${lineIndex * 0.2 + charIndex * 0.05}s, transform 0.6s ease ${lineIndex * 0.2 + charIndex * 0.05}s`;
                line.appendChild(span);
            }
        });

        // 애니메이션 시작
        setTimeout(() => {
            const spans = line.querySelectorAll('span');
            spans.forEach(span => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            });
        }, 300);
    });
}

/**
 * 부드러운 스크롤
 * 앵커 링크 클릭 시 부드럽게 스크롤 이동
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');

            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * 연락처 폼 처리
 * 폼 검증 및 제출 처리
 */
function initContactForm() {
    const form = document.querySelector('.contact-form');

    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // 폼 데이터 수집
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value.trim();
        });

        // 필수 필드 검증
        const inputs = form.querySelectorAll('input[required]');
        const missingFields = [];

        inputs.forEach(input => {
            const value = input.value.trim();
            if (!value) {
                missingFields.push(input.getAttribute('placeholder'));
                input.style.borderColor = '#ff4444';
            } else {
                input.style.borderColor = '';
            }
        });

        if (missingFields.length > 0) {
            showNotification('모든 필수 항목을 입력해 주세요.', 'error');
            return;
        }

        // 이메일 형식 검증
        const emailInput = form.querySelector('input[type="email"]');
        if (emailInput) {
            const email = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email)) {
                showNotification('올바른 이메일 형식을 입력해 주세요.', 'error');
                emailInput.style.borderColor = '#ff4444';
                return;
            }
        }

        // 연락처 형식 검증
        const phoneInput = form.querySelector('input[type="tel"]');
        if (phoneInput) {
            const phone = phoneInput.value.trim();
            const phoneRegex = /^[\d\s\-\+\(\)]{9,}$/;

            if (!phoneRegex.test(phone)) {
                showNotification('올바른 연락처 형식을 입력해 주세요.', 'error');
                phoneInput.style.borderColor = '#ff4444';
                return;
            }
        }

        // 성공 알림
        showNotification('문의 내용이 전송되었습니다. 확인 후 연락드리겠습니다.', 'success');
        form.reset();

        // 모든 인풋 스타일 초기화
        inputs.forEach(input => {
            input.style.borderColor = '';
        });
    });

    // 입력 시 에러 스타일 제거
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            input.style.borderColor = '';
        });
    });
}

/**
 * 알림 메시지 표시
 */
function showNotification(message, type) {
    // 기존 알림 제거
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // 현재 포인트 컬러 가져오기
    const currentAccent = getComputedStyle(document.documentElement).getPropertyValue('--current-accent').trim() || '#FF6B5B';

    // 알림 요소 생성
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span class="notification-message">${message}</span>
        <button class="notification-close">&times;</button>
    `;

    // 알림 스타일
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        padding: 20px 30px;
        background: ${type === 'success' ? currentAccent : '#ff4444'};
        color: ${type === 'success' ? '#0a0a0a' : '#ffffff'};
        border-radius: 8px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 15px;
        animation: slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        font-size: 14px;
        font-weight: 400;
    `;

    // 닫기 버튼 스타일
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: inherit;
        font-size: 24px;
        cursor: pointer;
        padding: 0;
        line-height: 1;
        opacity: 0.7;
        transition: opacity 0.2s;
    `;

    closeBtn.addEventListener('mouseenter', () => closeBtn.style.opacity = '1');
    closeBtn.addEventListener('mouseleave', () => closeBtn.style.opacity = '0.7');

    // 애니메이션 키프레임 추가
    if (!document.querySelector('#notification-keyframes')) {
        const keyframes = document.createElement('style');
        keyframes.id = 'notification-keyframes';
        keyframes.textContent = `
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
        `;
        document.head.appendChild(keyframes);
    }

    // 닫기 버튼 클릭 핸들러
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    });

    // 5초 후 자동 제거
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);

    document.body.appendChild(notification);
}

/**
 * 윈도우 리사이즈 처리
 */
window.addEventListener('resize', () => {
    // 필요한 경우 리사이즈 시 추가 처리
});

/**
 * 이미지 레이지 로딩
 */
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');

    if (images.length === 0) return;

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px'
    });

    images.forEach(img => imageObserver.observe(img));
}

// 레이지 로딩 초기화
lazyLoadImages();

/**
 * 패럴랙스 효과 (선택적)
 */
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.about-media, .hero-bg');

    if (parallaxElements.length === 0) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.pageYOffset;

                parallaxElements.forEach(el => {
                    const speed = 0.1;
                    const rect = el.getBoundingClientRect();
                    const offset = scrollY * speed;

                    if (el.classList.contains('about-media')) {
                        el.style.transform = `translateY(${-offset * 0.05}px)`;
                    }
                });

                ticking = false;
            });

            ticking = true;
        }
    });
}

// 패럴랙스 효과 초기화 (원할 경우 주석 해제)
// initParallaxEffect();