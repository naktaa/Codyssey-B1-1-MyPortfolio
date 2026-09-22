const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');

const THEME_STORAGE_KEY = 'portfolio-theme';
// 저장된 테마를 읽고, 사용할 수 없으면 밝은 테마로 시작합니다.
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
// 현재 테마 상태를 HTML 속성과 토글 버튼 표시에 반영합니다.
const renderTheme = () => {
  const isDark = currentTheme === 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeToggle.setAttribute('title', isDark ? '밝은 모드로 전환' : '다크 모드로 전환');
  themeIcon.textContent = isDark ? '☀' : '☾';
};
// 선택한 테마를 새로고침 후에도 유지하도록 브라우저에 저장합니다.
const saveTheme = () => {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, currentTheme);
  } catch {
    // 저장 실패가 현재 화면의 테마 전환을 중단하지 않도록 합니다.
  }
};

// 테마 버튼 이벤트를 연결하고 저장된 테마를 화면에 적용합니다.
export const initTheme = () => {
  themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    renderTheme();
    saveTheme();
  });

  renderTheme();
};
