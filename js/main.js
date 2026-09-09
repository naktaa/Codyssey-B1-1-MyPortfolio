const header = document.querySelector('.site-header');
const navigation = document.querySelector('.navigation');
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');
const anchorLinks = document.querySelectorAll('a[href^="#"]');
const scrollTopButton = document.querySelector('.scroll-top');
const hero = document.querySelector('#hero');
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');

const THEME_STORAGE_KEY = 'portfolio-theme';

const getSavedTheme = () => {
  try {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return savedTheme === 'dark' ? 'dark' : 'light';
  } catch {
    // 저장소 접근이 제한되어도 초기 표시와 다른 기능은 사용할 수 있습니다.
    return 'light';
  }
};

let currentTheme = getSavedTheme();

const renderTheme = () => {
  const isDark = currentTheme === 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeToggle.setAttribute('title', isDark ? '밝은 모드로 전환' : '다크 모드로 전환');
  themeIcon.textContent = isDark ? '☀' : '☾';
};

const saveTheme = () => {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, currentTheme);
  } catch {
    // 저장 실패가 현재 화면의 테마 전환을 중단하지 않도록 합니다.
  }
};

themeToggle.addEventListener('click', () => {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  renderTheme();
  saveTheme();
});

renderTheme();

const NAV_SCROLL_THRESHOLD = 60;
const SCROLL_TOP_THRESHOLD = 300;
const desktopMedia = window.matchMedia('(min-width: 768px)');
const reducedMotionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');

let isMenuOpen = false;

// 상태를 화면 표시와 접근성 속성에 함께 반영합니다.
const renderMenu = () => {
  navList.classList.toggle('active', isMenuOpen);
  menuToggle.setAttribute('aria-expanded', String(isMenuOpen));
  menuToggle.setAttribute('aria-label', isMenuOpen ? '메뉴 닫기' : '메뉴 열기');
};

const closeMenu = () => {
  isMenuOpen = false;
  renderMenu();
};

const getScrollBehavior = () => reducedMotionMedia.matches ? 'instant' : 'smooth';

const moveToSection = (target) => {
  // 닫힌 모바일 메뉴에 초점이 남지 않도록 목적지로 옮깁니다.
  // tabindex=-1은 일반 Tab 순서에 섹션을 추가하지 않습니다.
  target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
  target.scrollIntoView({ behavior: getScrollBehavior(), block: 'start' });
};

const updateScrollUI = () => {
  const scrollPosition = window.scrollY;

  if (scrollPosition >= NAV_SCROLL_THRESHOLD) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  scrollTopButton.hidden = scrollPosition < SCROLL_TOP_THRESHOLD;
};

menuToggle.addEventListener('click', () => {
  isMenuOpen = !isMenuOpen;
  renderMenu();
});

anchorLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    // 새 탭 열기 등 브라우저의 보조키 동작은 유지합니다.
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;

    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;

    event.preventDefault();
    closeMenu();
    moveToSection(target);
  });
});

scrollTopButton.addEventListener('click', () => {
  closeMenu();
  moveToSection(hero);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && isMenuOpen) {
    closeMenu();
    menuToggle.focus();
  }
});

document.addEventListener('click', (event) => {
  if (isMenuOpen && !navigation.contains(event.target)) {
    const focusWasInMenu = navList.contains(document.activeElement);
    closeMenu();
    if (focusWasInMenu) menuToggle.focus();
  }
});

desktopMedia.addEventListener('change', () => {
  // 화면을 넓혔다가 다시 줄여도 모바일 메뉴는 닫힌 상태로 시작합니다.
  const focusedElement = document.activeElement;
  closeMenu();
  if (desktopMedia.matches && focusedElement === menuToggle) {
    navList.querySelector('a').focus();
  } else if (!desktopMedia.matches && navList.contains(focusedElement)) {
    menuToggle.focus();
  }
});

window.addEventListener('scroll', updateScrollUI, { passive: true });
window.addEventListener('pageshow', updateScrollUI);

renderMenu();
updateScrollUI();

// 제목과 카드 단위로 관찰해 작은 화면에서도 기준 비율에 도달하도록 합니다.
const REVEAL_THRESHOLD = 0.2;
const revealElements = document.querySelectorAll('[data-reveal]');

const initScrollReveal = () => {
  // 기본 상태는 표시이며, 애니메이션을 사용할 때만 숨김 상태로 준비합니다.
  if (reducedMotionMedia.matches || !('IntersectionObserver' in window)) return;

  const showElement = (element) => {
    element.classList.remove('reveal-pending');
    observer.unobserve(element);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio >= REVEAL_THRESHOLD) {
        showElement(entry.target);
      }
    });
  }, { threshold: REVEAL_THRESHOLD });

  revealElements.forEach((element) => {
    element.classList.add('reveal-pending');
    observer.observe(element);
  });

  // 키보드로 초점을 옮긴 카드는 즉시 표시합니다.
  document.addEventListener('focusin', (event) => {
    const target = event.target.closest('[data-reveal]');
    if (target) showElement(target);
  });

  reducedMotionMedia.addEventListener('change', () => {
    if (reducedMotionMedia.matches) {
      revealElements.forEach(showElement);
      observer.disconnect();
    }
  });
};

initScrollReveal();
