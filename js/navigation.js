const header = document.querySelector('.site-header');
const navigation = document.querySelector('.navigation');
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');
const anchorLinks = document.querySelectorAll('a[href^="#"]');
const scrollTopButton = document.querySelector('.scroll-top');
const hero = document.querySelector('#hero');

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
// 사용자 동작 줄이기 설정에 따라 즉시 이동과 부드러운 이동을 선택합니다.
const getScrollBehavior = () => reducedMotionMedia.matches ? 'instant' : 'smooth';
// 앵커가 가리키는 섹션으로 키보드 초점과 스크롤을 함께 이동합니다.
const moveToSection = (target) => {
  // 닫힌 모바일 메뉴에 초점이 남지 않도록 목적지로 옮깁니다.
  // tabindex=-1은 일반 Tab 순서에 섹션을 추가하지 않습니다.
  target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
  target.scrollIntoView({ behavior: getScrollBehavior(), block: 'start' });
};
// 현재 스크롤 위치에 맞춰 헤더와 맨 위로 버튼의 표시 상태를 갱신합니다.
const updateScrollUI = () => {
  const scrollPosition = window.scrollY;

  if (scrollPosition >= NAV_SCROLL_THRESHOLD) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  scrollTopButton.hidden = scrollPosition < SCROLL_TOP_THRESHOLD;
};

// 메뉴·이동·스크롤 이벤트를 연결하고 초기 표시를 갱신합니다.
export const initNavigation = () => {
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
      closeMenu();
    }
  });

  desktopMedia.addEventListener('change', () => {
    // 화면을 넓혔다가 다시 줄여도 모바일 메뉴는 닫힌 상태로 시작합니다.
    closeMenu();
  });

  window.addEventListener('scroll', updateScrollUI, { passive: true });
  window.addEventListener('pageshow', updateScrollUI);

  renderMenu();
  updateScrollUI();
};
