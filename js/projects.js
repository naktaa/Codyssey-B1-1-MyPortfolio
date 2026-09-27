const GITHUB_USERNAME = 'naktaa';
const PROJECTS_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`;
const PROJECTS_CACHE_KEY = `github-projects:${GITHUB_USERNAME}:v4`;
const PROJECTS_CACHE_DURATION = 60 * 1000;
const KOREA_TIME_OFFSET = 9 * 60 * 60 * 1000;
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

// 카드와 언어 필터가 사용하는 GitHub 저장소 필드만 검사합니다.
const isValidRepos = (repos) => Array.isArray(repos) && repos.every((repo) => (
  repo !== null
  && typeof repo === 'object'
  && typeof repo.name === 'string'
  && repo.name.length > 0
  && (repo.description === null || typeof repo.description === 'string')
  && (repo.language === null || typeof repo.language === 'string')
  && Number.isInteger(repo.stargazers_count)
  && repo.stargazers_count >= 0
));

// 밀리초 시각을 한국 시간대의 숫자 날짜 문자열로 바꿉니다.
const formatKoreaTimestamp = (timestamp) => new Date(timestamp + KOREA_TIME_OFFSET)
  .toISOString()
  .slice(0, 19)
  .replace('T', ' ');

// 한국 시각 문자열을 만료 계산용 밀리초 값으로 변환하고 형식을 검증합니다.
const parseKoreaTimestamp = (value) => {
  const parts = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/.exec(value);
  if (!parts) return NaN;

  const [, year, month, day, hour, minute, second] = parts;
  const timestamp = Date.UTC(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hour),
    Number(minute),
    Number(second),
  ) - KOREA_TIME_OFFSET;
  return formatKoreaTimestamp(timestamp) === value ? timestamp : NaN;
};

// 저장소 접근이나 캐시 데이터가 유효하지 않으면 API 요청으로 넘깁니다.
const readCachedProjects = () => {
  let cachedValue;
  try {
    cachedValue = localStorage.getItem(PROJECTS_CACHE_KEY);
  } catch {
    return null;
  }
  if (cachedValue === null) return null;

  try {
    const { fetchedAt, fetchedAtMs, repos } = JSON.parse(cachedValue);
    const parsedFetchedAt = typeof fetchedAt === 'string' ? parseKoreaTimestamp(fetchedAt) : NaN;
    if (!Number.isSafeInteger(fetchedAtMs) || parsedFetchedAt !== Math.floor(fetchedAtMs / 1000) * 1000) return null;
    const age = Date.now() - fetchedAtMs;
    if (age < 0 || age >= PROJECTS_CACHE_DURATION) return null;
    return isValidRepos(repos) ? repos : null;
  } catch {
    return null;
  }
};

// 저장 실패가 API 성공 화면을 막지 않도록 캐시 쓰기만 따로 처리합니다.
const saveCachedProjects = (repos, fetchedAt, fetchedAtMs) => {
  try {
    localStorage.setItem(PROJECTS_CACHE_KEY, JSON.stringify({ fetchedAt, fetchedAtMs, repos }));
  } catch {
    // 저장 공간 제한이나 브라우저 설정으로 실패해도 이번 응답은 표시합니다.
  }
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
// 유효한 캐시를 사용하거나 GitHub API를 요청한 뒤 Projects 화면을 다시 그립니다.
const loadProjects = async () => {
  if (projectsState.status === 'loading') return;

  const cachedRepos = readCachedProjects();
  if (cachedRepos !== null) {
    projectsState.repos = cachedRepos;
    projectsState.status = cachedRepos.length > 0 ? 'success' : 'empty';
    projectsState.errorMessage = '';
    renderProjects();
    return;
  }

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
      if (!isValidRepos(repos)) throw new Error();
      const fetchedAtMs = Date.now();
      const fetchedAt = formatKoreaTimestamp(fetchedAtMs);
      projectsState.repos = repos;
      projectsState.status = repos.length > 0 ? 'success' : 'empty';
      saveCachedProjects(repos, fetchedAt, fetchedAtMs);
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
