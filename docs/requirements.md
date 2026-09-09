# B1-1 구현 요구사항

> 기준 문서: `docs/mission-original.md`  
> 이 문서는 미션 원문을 구현 관점에서 정리한 체크리스트다. 원문과 충돌하면 원문을 우선한다.

## 1. 미션 핵심

순수 HTML/CSS/JavaScript로 반응형 포트폴리오를 만들면서 다음 흐름을 직접 구현하고 설명할 수 있어야 한다.

**사용자 이벤트 → 상태 변경 → DOM 업데이트 → 화면 변화**

UI 완성도 자체보다 DOM 조작, 이벤트 처리, 비동기 API, 상태별 렌더링을 이해하는 것이 우선이다.

---

## 2. 필수 요구사항

체크 표시는 코드 구현 기준입니다. Stage 1~6은 구현 및 사용자 확인을 마쳤습니다. 배포 환경의 최종 검증은 별도로 진행합니다. 프로필 이미지와 소셜 링크는 실제 자료 확정 후 추가합니다.

### 프로젝트 구조

- [x] `index.html` 존재
- [x] `css/` 디렉터리 존재
- [x] `js/` 디렉터리 존재
- [x] `images/` 디렉터리 존재
- [x] `css/style.css`를 외부 스타일시트로 연결
- [x] JavaScript를 외부 파일로 분리하고 `defer`로 연결
- [x] VS Code + Live Server에서 실행 가능

### HTML / 접근성 / 시맨틱 구조

- [x] `<header>` 사용
- [x] `<nav>` 사용
- [x] `<main>` 사용
- [x] `<section>` 사용
- [x] 프로젝트 카드 등 적절한 위치에 `<article>` 사용
- [x] `<footer>` 사용
- [x] Hero 섹션: 인사말 + CTA 버튼
- [ ] About 섹션: 자기소개 + 프로필 이미지
- [x] Skills 섹션: 기술 스택 목록
- [ ] Projects 섹션: GitHub API 결과
- [x] Contact 섹션: 문의 폼
- [ ] Footer: 저작권 + 소셜 링크
- [x] 네비게이션에 각 섹션 앵커 링크 제공
- [ ] 모든 의미 있는 이미지에 적절한 `alt`
- [x] 폼의 `label for`와 입력 요소 `id`가 일치

### CSS

- [x] CSS 변수(`:root`)로 색상/폰트/간격 정의
- [x] `[data-theme="dark"]`에서 다크 모드 변수 재정의
- [x] 모바일 퍼스트 방식
- [x] 네비게이션에 Flexbox 사용
- [x] Projects 카드에 CSS Grid 사용
- [x] Grid에 `auto-fit` + `minmax()` 사용
- [x] 768px 태블릿 브레이크포인트
- [x] 1024px 데스크톱 브레이크포인트
- [x] 모바일에서 일반 메뉴 숨김
- [x] 모바일에서 햄버거 버튼 표시
- [x] 버튼 hover + transition
- [x] 카드 hover + transition
- [x] 카드 `box-shadow`
- [x] 인라인 `style=""` 사용 금지

### JavaScript 기본 규칙

- [x] `var` 사용 금지, `const`/`let` 사용
- [x] HTML `onclick` 사용 금지
- [x] 이벤트는 `addEventListener()`로 연결
- [x] `querySelector()` 사용
- [x] `querySelectorAll()` 사용
- [x] `textContent` 사용
- [ ] `innerHTML` 사용
- [x] `classList.add()` 사용
- [x] `classList.remove()` 사용
- [x] `classList.toggle()` 사용
- [x] `click` 이벤트 처리
- [ ] `submit` 이벤트 처리
- [x] `scroll` 이벤트 처리
- [ ] `input` 이벤트 처리
- [x] 필요한 기본 동작을 `event.preventDefault()`로 제어

### 인터랙션

#### 햄버거 메뉴
- [x] 클릭 시 모바일 메뉴 열림
- [x] 재클릭 시 닫힘
- [x] `classList.toggle('active')` 활용

#### 부드러운 스크롤
- [x] 네비게이션 클릭 시 대상 섹션으로 부드럽게 이동

#### Scroll To Top
- [x] 일정 스크롤 이상에서 버튼 표시
- [x] 기준값을 README에 기록
- [x] 클릭 시 최상단으로 부드럽게 이동

#### 스크롤 시 네비게이션 스타일
- [x] 일정 스크롤 이상에서 스타일 변경
- [x] 기준값을 README에 기록

#### 다크 모드
- [x] 버튼으로 light/dark 전환
- [x] `data-theme` 기반으로 CSS 적용
- [x] localStorage에 선택 저장
- [x] 새로고침 후 저장된 테마 복원

#### 스크롤 애니메이션
- [x] Intersection Observer 사용
- [x] threshold 값 결정
- [x] 결정한 threshold 값을 README에 기록
- [x] 가능하면 권장값 `0.2 이상` 사용

### Contact 폼

- [x] 이름 필드
- [x] 이메일 필드
- [x] 메시지 필드
- [ ] 빈 값 검증
- [ ] 이메일 형식 검증
- [ ] 오류 메시지를 각 입력 필드 근처에 표시
- [ ] `input` 이벤트로 오류 상태 갱신
- [ ] 제출 시 `preventDefault()`
- [ ] 유효한 제출 시 성공 메시지 표시

### ES6+ 및 배열 메서드

- [x] 화살표 함수 활용
- [ ] 템플릿 리터럴 활용
- [ ] 구조분해 할당 활용
- [ ] `map()`으로 GitHub repo → 카드 HTML 변환
- [x] `forEach()` 활용
- [ ] `filter()`는 필수 아님. 프로젝트 필터링 구현 시 활용

### GitHub API

- [ ] `fetch()` 사용
- [ ] `async/await` 사용
- [ ] `https://api.github.com/users/{본인아이디}/repos` 호출
- [ ] 본인 GitHub 아이디를 실제 값으로 설정
- [ ] 요청 시작 시 로딩 상태 표시
- [ ] 정상 응답 시 카드 목록 렌더링
- [ ] 빈 배열이면 빈 상태 렌더링
- [ ] 실패 시 에러 상태 렌더링
- [ ] 에러 UI에 재시도 버튼 제공
- [ ] `try/catch` 사용
- [ ] HTTP 비정상 응답(`response.ok === false`)도 에러로 처리
- [ ] 403 레이트 리밋도 에러 UI로 연결
- [ ] 짧은 시간 반복 새로고침을 피하며 테스트

### 상태 → 렌더링 흐름

아래 중 최소 3개 이상이 코드 구조상 명확해야 한다.

- [x] 테마 상태 → 전체 테마 렌더링
- [ ] API 상태(`loading/success/error/empty`) → Projects 렌더링
- [ ] 폼 유효성 상태 → 오류/성공 메시지 렌더링
- [ ] 선택: 프로젝트 필터 상태 → 프로젝트 목록 렌더링

**권장:** 필수 기능만으로도 앞의 3개를 모두 구성해 최소 요구를 충족한다.

### 배포 및 제출

- [ ] GitHub 저장소 생성/정리
- [ ] GitHub Pages 배포
- [ ] 배포 URL에서 전체 기능 재검증
- [ ] 데스크톱 레이아웃 확인
- [ ] 모바일 레이아웃 확인
- [ ] 다크 모드 확인
- [ ] 햄버거 메뉴 확인
- [ ] 스크롤 기능 확인
- [ ] GitHub API 확인
- [ ] 폼 검증 확인
- [ ] GitHub 저장소 URL 제출 가능 상태
- [ ] GitHub Pages URL 제출 가능 상태
- [ ] 데스크톱 스크린샷 준비
- [ ] 모바일 스크린샷 준비
- [ ] 다크 모드 스크린샷 준비

---

## 3. README 필수 항목

- [x] 프로젝트 설명
- [x] 사용 기술
- [x] 실행 방법
- [x] 프로젝트 구조
- [x] 주요 기능
- [x] 이벤트 → 상태 → 렌더링 흐름 설명
- [x] Scroll To Top 표시 기준값
- [x] 스크롤 시 네비게이션 변경 기준값
- [x] Intersection Observer threshold
- [ ] GitHub Pages 배포 URL
- [ ] 스크린샷

README는 구현 진행에 맞춰 갱신하며, 구현되지 않은 기능을 완료된 것처럼 쓰지 않는다.

---

## 4. 보너스 요구사항

필수 기능 완료 및 검토 후에만 진행한다.

- [ ] GitHub 저장소 언어별 필터링
  - [ ] 필터 버튼
  - [ ] `Array.filter()` 사용
- [ ] Hero 타이핑 효과
- [ ] Formspree 또는 EmailJS 실제 전송
- [ ] `prefers-color-scheme` 시스템 다크 모드 감지

---

## 5. 기술적 제약

### 금지

- React
- Vue
- Angular
- jQuery
- Bootstrap
- Tailwind CSS
- 기타 핵심 UI/DOM 구현을 대신하는 외부 라이브러리
- `var`
- HTML 인라인 이벤트(`onclick` 등)
- HTML 인라인 스타일(`style=""`)

### 허용

- 순수 HTML
- 순수 CSS
- 순수 JavaScript
- Font Awesome
- Google Fonts

---

## 6. 구현 시 주의점

1. 이 미션은 React 이전 단계이므로 상태 관리 라이브러리나 복잡한 아키텍처를 도입하지 않는다.
2. JavaScript를 기능별로 지나치게 많은 파일/클래스로 나누지 않는다.
3. 다만 모든 로직을 하나의 거대한 함수에 몰아넣지 말고, 기능 단위 함수로 분리한다.
4. API 상태는 최소한 `loading`, `success`, `error`, `empty`를 구분해 생각한다.
5. GitHub API의 인증 없는 요청은 시간당 60회 제한이 있으므로 반복 요청에 주의한다.
6. API 재시도 버튼은 실패 상태에서 같은 요청 함수를 다시 호출하는 정도로 단순하게 설계한다.
7. 폼은 실제 서버 전송이 필수가 아니므로 필수 단계에서는 클라이언트 유효성 검사와 성공 UI에 집중한다.
8. 보너스 기능은 필수 구현 완료 후 선택한다.

---

## 7. 권장 구현 단계

각 단계는 **계획 → 사용자 승인 → 구현 → 사용자 직접 검토** 순서로 진행한다.

1. **Chore: 초기 프로젝트/문서 구성**
2. **Feat: HTML 시맨틱 구조**
3. **Feat: 기본 CSS + 반응형 레이아웃**
4. **Feat: 네비게이션/스크롤 인터랙션**
5. **Feat: 다크 모드 + localStorage**
6. **Feat: Intersection Observer 스크롤 애니메이션**
7. **Feat: Contact 폼 유효성 검사**
8. **Feat: GitHub API + 상태별 Projects 렌더링**
9. **Docs: README 정리 + 스크린샷/evidence**
10. **Chore: GitHub Pages 배포 및 최종 검토**
11. **선택: 보너스 기능**

### 단계 분리 이유

HTML → CSS → 기본 이벤트 → 상태 → 폼 → 비동기 API 순서로 진행하면 각 개념을 독립적으로 확인하기 쉽다. 특히 GitHub API를 초반부터 붙이면 레이아웃·DOM·비동기 문제가 섞이므로 후반에 배치한다.

---

## 8. 아직 결정해야 하는 값

구현 직전에 필요한 단계에서만 사용자와 확정한다.

- GitHub 사용자 아이디
- 포트폴리오에 표시할 이름/소개 문구
- 프로필 이미지
- Skills 목록
- Footer 소셜 링크
- 디자인 방향
- Scroll To Top 기준값
- 네비게이션 스타일 변경 기준값
- Intersection Observer threshold
- 보너스 구현 여부
