# AGENTS.md

## 프로젝트 목적

이 저장소는 Codyssey B1-1 미션을 구현한다.

핵심 목표는 순수 HTML/CSS/JavaScript를 사용해 반응형 포트폴리오를 만들고, 다음 흐름을 코드로 명확하게 경험하는 것이다.

**사용자 이벤트 → 상태 변경 → DOM 업데이트 → 화면 변화**

React/Vue 등 프레임워크 학습 전 단계이므로 복잡한 아키텍처보다 웹 기본 원리를 이해하기 쉬운 구조를 우선한다.

---

## 작업 시작/재개 시 확인 순서

코드를 수정하기 전에 다음을 확인한다.

1. `AGENTS.md`
2. `docs/mission-original.md`
3. `docs/requirements.md`
4. `docs/worklog.md`
5. 현재 작업과 연관된 문제가 있을 때만 `docs/troubleshooting.md`
6. `git status`
7. 현재 단계와 관련된 소스코드

문서를 확인한 뒤 현재 상태를 요약하고 **다음 한 단계의 구현 계획을 사용자에게 설명한 뒤 승인을 받아야 한다.**

사용자 승인 전에는 코드를 수정하지 않는다.

---

## 개발 사이클

항상 아래 순서로 진행한다.

**다음 단계 계획 → 사용자 승인 → 구현 → 결과 설명 + 커밋 메시지 제안 → 사용자 직접 실행/검토 → 수정 또는 다음 단계**

### 계획 단계에서 설명할 내용

- 이번 단계 목표
- 구현할 기능
- 추가/수정할 파일
- 구현 방식
- 전체 프로젝트에서 해당 기능이 맡는 역할
- 구현 후 사용자가 확인할 내용

### 구현 후 설명할 내용

- 구현한 기능
- 변경/추가한 파일
- 전체 동작 흐름
- 주요 함수/구조의 역할
- 중요한 코드가 동작하는 원리
- 이번 단계에서 충족한 미션 요구사항
- 사용자가 직접 확인할 항목
- 커밋 메시지 1줄

### 구현 설명의 코드 연결 방식

- 구현 후 설명에는 주요 함수 정의와 이벤트 연결 부분의 실제 파일 줄 링크를 포함한다.
- 사용자 응답의 링크는 `[함수명 — main.js:줄번호](/절대/프로젝트/경로/js/main.js:줄번호)` 형식으로 작성해 클릭하면 해당 코드를 확인할 수 있게 한다.
- 줄 번호는 수정 완료 후 확인한 최신 위치를 사용한다. 파일 첫 줄만 연결하지 않고 설명하는 함수나 구조의 시작 위치를 연결한다.
- 함수 이름과 역할만 나열하지 말고, 호출 시점 → 사용하는 입력/상태 → 처리 과정 → 반환값 또는 DOM 변화 순서로 자세히 설명한다.
- 이벤트 처리 함수와 상태 변경 함수, 렌더링 함수가 어떻게 연결되는지 실제 코드에 맞춰 설명한다.
- 필요한 경우 핵심 코드 일부를 짧게 인용하되, 코드 전체를 그대로 반복하지 않는다.
- 설명한 기능마다 사용자가 브라우저에서 확인할 행동과 기대 결과를 연결한다.
- CSS/HTML이 동작에 관여하면 관련 선택자나 요소의 줄 링크도 함께 제공한다.

사용자의 명시적 요청 없이 commit, push, merge, rebase를 수행하지 않는다.

사용자가 정상 동작을 확인하기 전에는 해당 단계를 최종 완료로 기록하지 않는다.

---

## 설계 원칙

이 미션 규모에 맞는 가볍고 이해하기 쉬운 구조를 사용한다.

### 피할 것

- 프레임워크식 과도한 폴더 분리
- 사용처가 거의 없는 클래스/인터페이스
- 작은 프로젝트에 불필요한 상태 관리 패턴
- 디자인 패턴을 위한 디자인 패턴
- 한 기능을 여러 계층으로 쪼개는 구조
- 아직 없는 미래 요구사항을 위한 범용화
- 모든 JavaScript를 하나의 거대한 함수에 몰아넣는 방식

### 권장

- HTML은 시맨틱 구조를 명확히 한다.
- CSS는 기본적으로 `css/style.css`에서 관리한다.
- JavaScript는 `js/main.js`에서 기능별 ES 모듈의 초기화 함수를 호출한다. 테마·내비게이션·애니메이션·폼·Projects는 각 파일 안에서 상태와 함수를 관리한다.
- 기능별 함수로 책임을 구분한다.
- 상태가 필요한 기능은 상태 값과 렌더링 함수를 구분해 흐름이 보이도록 한다.
- 함수와 변수 이름만 보고 역할을 이해할 수 있게 작성한다.

---

## 미션 제약

다음은 반드시 지킨다.

- 순수 HTML/CSS/JavaScript 사용
- React/Vue/Angular/jQuery/Bootstrap/Tailwind 금지
- Font Awesome / Google Fonts 허용
- `var` 금지
- `const`, `let` 사용
- HTML `onclick` 등 인라인 이벤트 금지
- `addEventListener` 사용
- HTML `style=""` 인라인 스타일 금지
- JavaScript는 `defer`로 연결
- 최신 Chrome에서 정상 동작해야 함

---

## HTML 원칙

최소한 아래 시맨틱 태그를 적절히 사용한다.

- `header`
- `nav`
- `main`
- `section`
- `article`
- `footer`

필수 섹션:

- Hero
- About
- Skills
- Projects
- Contact
- Footer

추가 원칙:

- 메뉴에는 각 섹션 앵커 링크가 있어야 한다.
- 모든 의미 있는 이미지에 `alt`를 작성한다.
- 폼 `label[for]`와 입력 요소 `id`를 일치시킨다.

---

## CSS 원칙

- 모바일 퍼스트
- `:root` CSS 변수 사용
- `[data-theme="dark"]` 다크 모드 변수 사용
- nav 레이아웃은 Flexbox
- Projects 카드 레이아웃은 Grid
- Projects Grid는 `auto-fit` + `minmax()`
- 768px, 1024px 브레이크포인트 사용
- hover + transition 적용
- 카드에 box-shadow 적용

레이아웃 목적에 따라 Flexbox와 Grid를 구분해서 사용하며, 단순히 요구사항을 체크하기 위해 의미 없이 적용하지 않는다.

---

## JavaScript 원칙

- JavaScript 들여쓰기는 탭 문자 대신 공백 2칸을 사용한다. 설명용 JavaScript 코드 예시에도 동일하게 적용한다.
- `main.js`는 초기화 진입점으로 유지하고, 각 기능 모듈은 초기화 함수를 export한다. 내부 상태·함수는 해당 파일에서 관리하되, Projects는 Console 학습용으로 `projectsState`와 `renderProjects`도 export한다.

다음 기본 API와 이벤트가 실제 기능 흐름 속에 나타나야 한다.

### DOM

- `querySelector`
- `querySelectorAll`
- `textContent`
- `innerHTML`
- `classList.add`
- `classList.remove`
- `classList.toggle`

### 이벤트

- `click`
- `submit`
- `scroll`
- `input`
- `event.preventDefault()`

### ES6+

- 화살표 함수
- 템플릿 리터럴
- 구조분해 할당
- `map`
- `forEach`
- 선택 기능에서 `filter`

억지로 한 줄에 문법을 몰아넣지 말고, 기능상 자연스러운 위치에서 사용한다.

---

## 상태 → 렌더링 설계

최소 3가지 흐름을 명확하게 구현한다.

### 1. 테마

사용자 토글 클릭  
→ 테마 상태 변경  
→ `data-theme` 갱신  
→ localStorage 저장  
→ 화면 테마 변경

### 2. GitHub Projects

API 요청 시작  
→ loading 상태  
→ 요청 결과에 따라 success / empty / error 상태  
→ Projects UI 갱신

### 3. Contact 폼

사용자 입력  
→ 필드 유효성 상태 변경  
→ 입력 근처 오류 메시지 갱신  
→ 제출 가능 여부/성공 메시지 갱신

상태 관리를 위해 별도 라이브러리나 복잡한 Store를 만들지 않는다.

---

## GitHub API 원칙

엔드포인트:

`https://api.github.com/users/{본인아이디}/repos`

반드시:

- `fetch`
- `async/await`
- `try/catch`
- `response.ok` 확인
- loading UI
- success UI
- empty UI
- error UI
- retry 버튼

403 레이트 리밋도 error 흐름으로 처리한다.

GitHub 사용자 아이디가 아직 확정되지 않았다면 API 구현 단계 계획에서 사용자에게 확인한다.

---

## README 관리

README는 초기 단계에서 틀을 만들고 구현이 끝날 때마다 실제 상태에 맞게 갱신한다.

최종적으로 최소한 다음을 포함한다.

- 프로젝트 설명
- 사용 기술
- 주요 기능
- 프로젝트 구조
- 실행 방법
- 이벤트 → 상태 → 렌더링 흐름
- Scroll To Top 기준값
- nav 스타일 변경 기준값
- Intersection Observer threshold
- 배포 URL
- 데스크톱/모바일/다크 모드 스크린샷

구현되지 않은 기능을 완료된 것처럼 작성하지 않는다.

---

## worklog 관리

`docs/worklog.md` 상단 상태를 작업 단계마다 갱신한다.

상태는 다음 중 하나를 사용한다.

- 예정
- 진행 중
- 검토 대기
- 완료

사용자가 직접 정상 동작을 확인한 뒤에만 `완료`로 변경한다.

각 단계에는 필요한 정도로 아래를 남긴다.

- 구현 내용
- 주요 변경 파일
- 설계 결정
- 사용자 검토 결과
- 다음 작업

---

## troubleshooting 관리

`docs/troubleshooting.md`에는 의미 있는 문제만 남긴다.

예:

- 재현이 까다로운 문제
- 다시 발생할 가능성이 있는 문제
- 브라우저/API/GitHub Pages 관련 문제
- 동료평가에서 설명할 가치가 있는 문제

사소한 오타나 즉시 해결된 단순 문법 오류는 기록하지 않는다.

---

## 권장 구현 순서

1. Chore: 초기 프로젝트/문서 구성
2. Feat: HTML 시맨틱 구조
3. Feat: 기본 CSS + 반응형 레이아웃
4. Feat: 네비게이션/스크롤 인터랙션
5. Feat: 다크 모드 + localStorage
6. Feat: Intersection Observer 애니메이션
7. Feat: Contact 폼 유효성 검사
8. Feat: GitHub API + 상태별 렌더링
9. Docs: README + evidence 정리
10. Chore: GitHub Pages 배포 + 최종 검토
11. 선택: 보너스

전체 미션을 한 번에 구현하지 않는다.

---

## Git 커밋

미션에서 별도 규칙이 없으므로 다음 유형을 기본으로 사용한다.

- `Chore`
- `Feat`
- `Fix`
- `Refactor`
- `Docs`
- `Test`

초기 문서/프로젝트 틀 생성은 `Chore`.

예:

`Chore: B1-1 초기 프로젝트 문서 구성`
