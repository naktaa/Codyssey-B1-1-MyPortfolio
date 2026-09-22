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
// GitHub API 응답을 안전한 카드 HTML과 언어 필터 데이터로 가공합니다.
// API의 문자열이 HTML 태그나 속성으로 해석되지 않도록 변환합니다.
const escapeHTML = (value) => {
  const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return String(value).replace(/[&<>"']/g, (character) => entities[character]);
};
// GitHub 저장소 한 개를 Projects 영역에 넣을 카드 HTML로 변환합니다.
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
// 전체 저장소에서 중복을 제거한 언어 필터 목록을 만듭니다.
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
// Projects 요청 상태와 저장소 언어에 맞춰 필터 버튼을 다시 그립니다.
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
// Projects 상태에 따라 로딩·성공·빈 목록·오류 화면을 갱신합니다.
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
// GitHub API를 요청하고 결과를 Projects 상태에 저장한 뒤 화면을 다시 그립니다.
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

// 필터·재시도 이벤트를 연결하고 첫 GitHub 요청을 시작합니다.
export const initProjects = () => {
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
};

// Console에서 모듈을 가져와 상태별 화면을 실습할 수 있도록 공개합니다.
export { projectsState, renderProjects };
