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

// 제목과 카드 단위로 관찰해 작은 화면에서도 기준 비율에 도달하도록 합니다.
const REVEAL_THRESHOLD = 0.2;

const initScrollReveal = () => {
  // 기본 상태는 표시이며, 애니메이션을 사용할 때만 숨김 상태로 준비합니다.
  if (reducedMotionMedia.matches || !('IntersectionObserver' in window)) return;

  const revealElements = document.querySelectorAll('[data-reveal]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio >= REVEAL_THRESHOLD) {
        entry.target.classList.remove('reveal-pending');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: REVEAL_THRESHOLD });

  revealElements.forEach((element) => {
    element.classList.add('reveal-pending');
    observer.observe(element);
  });
};

initScrollReveal();

const contactForm = document.querySelector('.contact-form');
const contactFields = contactForm.querySelectorAll('input, textarea');
const contactSubmit = contactForm.querySelector('button[type="submit"]');
const formStatus = contactForm.querySelector('.form-status');

// 오류 상태와 화면 갱신을 분리합니다. 처음에는 오류를 표시하지 않습니다.
const contactState = {
  errors: { name: '', email: '', message: '' },
  status: 'idle',
};

const validateContactField = (field) => {
  const { name, value } = field;
  const trimmedValue = value.trim();
  const labels = { name: '이름을', email: '이메일을', message: '메시지를' };

  if (!trimmedValue) return `${labels[name]} 입력해 주세요.`;
  if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
    return '이메일 형식을 확인해 주세요.\n예:\u00a0hello@example.com';
  }
  return '';
};

const renderContactForm = () => {
  contactFields.forEach((field) => {
    const error = contactState.errors[field.name];
    document.querySelector(`#${field.id}-error`).textContent = error;
    field.setAttribute('aria-invalid', String(Boolean(error)));
  });

  if (contactState.status === 'success') {
    formStatus.textContent = '입력 확인 완료';
  } else {
    formStatus.textContent = '';
  }
};

contactFields.forEach((field) => {
  field.addEventListener('input', () => {
    contactState.errors[field.name] = validateContactField(field);
    // 제출 결과는 이전 입력에 대한 것이므로 수정하면 지웁니다.
    contactState.status = 'idle';
    renderContactForm();
  });
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let firstInvalidField = null;

  // 자동완성 등 input 이벤트가 없었던 경우도 제출 시 전체를 검사합니다.
  contactFields.forEach((field) => {
    const error = validateContactField(field);
    contactState.errors[field.name] = error;
    if (error && !firstInvalidField) firstInvalidField = field;
  });

  contactState.status = firstInvalidField ? 'error' : 'success';
  renderContactForm();
  if (firstInvalidField) firstInvalidField.focus();
});

// 브라우저 기본 팝업 대신 필드 근처의 오류 메시지를 사용합니다.
contactForm.noValidate = true;
contactSubmit.disabled = false;
renderContactForm();

const GITHUB_USERNAME = 'naktaa';
const PROJECTS_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`;
const ALL_PROJECT_LANGUAGES = 'all';
const projectsGrid = document.querySelector('.projects-grid');
const projectsFilters = document.querySelector('.projects-filters');
const projectsStatus = document.querySelector('.projects-status');
const projectsRetry = document.querySelector('.projects-retry');

const projectsState = {
  status: 'idle',
  repos: [],
  errorMessage: '',
  selectedLanguage: ALL_PROJECT_LANGUAGES,
};

// API의 문자열이 HTML 태그나 속성으로 해석되지 않도록 변환합니다.
const escapeHTML = (value) => {
  const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return String(value).replace(/[&<>"']/g, (character) => entities[character]);
};

const createProjectCard = (repo) => {
  const { name, description, language, stargazers_count } = repo;
  // 외부 응답의 URL을 그대로 쓰지 않고 GitHub 주소를 직접 구성합니다.
  const repositoryURL = `https://github.com/${GITHUB_USERNAME}/${encodeURIComponent(name)}`;
  const stars = Number.isInteger(stargazers_count) && stargazers_count >= 0 ? stargazers_count : 0;
  const descriptionHTML = description ? `<p>${escapeHTML(description)}</p>` : '';

  return `
    <article class="project-card">
      <p class="project-category">GITHUB REPOSITORY</p>
      <h3>${escapeHTML(name)}</h3>
      ${descriptionHTML}
      <ul class="tech-tags" aria-label="저장소 정보">
        <li>${escapeHTML(language || '언어 정보 없음')}</li>
        <li>별 ${stars}개</li>
      </ul>
      <a class="project-link" href="${escapeHTML(repositoryURL)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHTML(name)} 저장소 새 탭에서 보기">GitHub에서 보기 ↗</a>
    </article>`;
};

const getProjectLanguages = () => [...new Set(
  projectsState.repos
    .map(({ language }) => language)
    .filter((language) => typeof language === 'string' && language.length > 0),
)].sort((first, second) => first.localeCompare(second, 'en'));

const getFilteredProjects = () => {
  const { repos, selectedLanguage } = projectsState;
  if (selectedLanguage === ALL_PROJECT_LANGUAGES) return repos;
  return repos.filter(({ language }) => language === selectedLanguage);
};

const createProjectFilterButton = (language, label) => {
  const isActive = projectsState.selectedLanguage === language;
  return `<button class="project-filter${isActive ? ' is-active' : ''}" type="button" data-language="${escapeHTML(language)}" aria-pressed="${isActive}">${escapeHTML(label)}</button>`;
};

const renderProjectFilters = () => {
  if (projectsState.status !== 'success') {
    projectsFilters.hidden = true;
    projectsFilters.innerHTML = '';
    return;
  }

  const languages = getProjectLanguages();
  if (projectsState.selectedLanguage !== ALL_PROJECT_LANGUAGES && !languages.includes(projectsState.selectedLanguage)) {
    projectsState.selectedLanguage = ALL_PROJECT_LANGUAGES;
  }

  projectsFilters.innerHTML = [
    createProjectFilterButton(ALL_PROJECT_LANGUAGES, '전체'),
    ...languages.map((language) => createProjectFilterButton(language, language)),
  ].join('');
  projectsFilters.hidden = languages.length === 0;
};

const renderProjects = () => {
  const { status, repos, errorMessage } = projectsState;
  projectsGrid.setAttribute('aria-busy', String(status === 'loading'));
  projectsStatus.classList.toggle('is-error', status === 'error');
  projectsStatus.classList.toggle('is-loading', status === 'loading');
  projectsRetry.hidden = status !== 'error';
  projectsRetry.disabled = status === 'loading';
  renderProjectFilters();

  if (status === 'success') {
    const filteredRepos = getFilteredProjects();
    projectsGrid.innerHTML = filteredRepos.map(createProjectCard).join('');
    projectsStatus.textContent = projectsState.selectedLanguage === ALL_PROJECT_LANGUAGES
      ? `${repos.length}개의 프로젝트를 불러왔습니다.`
      : `${projectsState.selectedLanguage} 프로젝트 ${filteredRepos.length}개를 표시하고 있습니다.`;
  } else {
    projectsGrid.innerHTML = '';
    if (status === 'loading') {
      projectsStatus.textContent = '프로젝트를 불러오는 중입니다…';
    } else if (status === 'empty') {
      projectsStatus.textContent = '표시할 프로젝트가 없습니다.';
    } else if (status === 'error') {
      projectsStatus.textContent = errorMessage;
    }
  }
};

const loadProjects = async () => {
  if (projectsState.status === 'loading') return;
  projectsState.status = 'loading';
  projectsState.repos = [];
  projectsState.errorMessage = '';
  renderProjects();

  try {
    const response = await fetch(PROJECTS_URL);
    if (!response.ok) {
      projectsState.status = 'error';
      projectsState.errorMessage = response.status === 403
        ? '프로젝트를 불러올 수 없습니다. GitHub 요청 제한이 발생했습니다. 잠시 후 다시 시도해 주세요.'
        : '프로젝트를 불러올 수 없습니다. 잠시 후 다시 시도해 주세요.';
    } else {
      const repos = await response.json();
      if (!Array.isArray(repos)) throw new Error();
      projectsState.repos = repos;
      projectsState.status = repos.length > 0 ? 'success' : 'empty';
    }
  } catch {
    projectsState.status = 'error';
    projectsState.errorMessage = '프로젝트를 불러올 수 없습니다. 잠시 후 다시 시도해 주세요.';
  }
  renderProjects();
};

projectsFilters.addEventListener('click', (event) => {
  const filterButton = event.target.closest('.project-filter');
  if (!filterButton || !projectsFilters.contains(filterButton)) return;

  const { language } = filterButton.dataset;
  const languages = getProjectLanguages();
  const isValidLanguage = language === ALL_PROJECT_LANGUAGES || languages.includes(language);
  if (!isValidLanguage || language === projectsState.selectedLanguage) return;

  projectsState.selectedLanguage = language;
  renderProjects();

  const selectedButton = [...projectsFilters.querySelectorAll('.project-filter')]
    .find((button) => button.dataset.language === language);
  if (selectedButton) selectedButton.focus({ preventScroll: true });
});

projectsRetry.addEventListener('click', () => {
  loadProjects();
  // 재시도 버튼이 숨겨져도 키보드 초점은 상태 안내에 남깁니다.
  projectsStatus.focus({ preventScroll: true });
});

loadProjects();
