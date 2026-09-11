# B1-1 Portfolio

순수 HTML, CSS, JavaScript를 사용해 구현하는 반응형 포트폴리오 웹사이트입니다.

> 현재 상태: **Stage 9 실제 콘텐츠와 README 정리 진행 중**
>
> Stage 8까지 사용자 검토를 마쳤습니다. 이름·소개·GitHub 링크를 반영했으며, 프로필 이미지와 최종 스크린샷은 아직 준비 중입니다.

## Mission Goal

브라우저 기본 기술을 이용해 다음 흐름을 직접 구현하고 이해하는 것이 목표입니다.

**사용자 이벤트 → 상태 변경 → DOM 업데이트 → 화면 변화**

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- GitHub REST API
- GitHub Pages

외부 UI 프레임워크는 사용하지 않습니다.

## Feature Roadmap

- Hero / About / Skills / Projects / Contact / Footer
- 반응형 레이아웃
- 모바일 햄버거 메뉴
- 부드러운 스크롤
- Scroll To Top
- 스크롤 시 네비게이션 스타일 변경
- 다크 모드 + localStorage
- Intersection Observer 스크롤 애니메이션
- Contact 폼 유효성 검사
- GitHub API Projects 동적 렌더링
- loading / success / error / empty 상태 UI

## Project Structure

```text
.
├── index.html
├── css/style.css
├── js/main.js
├── images/.gitkeep
├── AGENTS.md
├── README.md
├── .gitignore
├── .gitattributes
├── docs/
│   ├── mission-original.md
│   ├── requirements.md
│   ├── worklog.md
│   └── troubleshooting.md
└── evidence/.gitkeep
```

## Current Implementation

- 시맨틱 태그로 구성한 Hero / About / Skills / Projects / Contact / Footer
- 섹션 앵커 이동 메뉴와 CTA 링크
- GitHub API 프로젝트 카드와 이름/이메일/메시지 검증 폼
- 외부 CSS와 `defer` JavaScript 연결
- 모바일 메뉴 열기/닫기와 접근성 속성 동기화
- 섹션으로 부드럽게 이동, 스크롤 시 헤더 스타일 변경, 맨 위로 버튼
- 밝은 아이보리 배경과 은은한 초록색 포인트, 카드와 입력 폼 스타일
- 모바일 퍼스트 레이아웃과 768px/1024px 브레이크포인트
- 메뉴 Flexbox, Projects의 `auto-fit` + `minmax()` Grid
- 버튼/카드 hover와 transition, 키보드 초점 표시, 동작 줄이기 설정 대응
- 테마 버튼으로 밝은/어두운 모드 전환, localStorage 저장 및 새로고침 후 복원
- 다크 모드는 차콜 배경과 회백색 글자를 사용하고, 버튼과 강조 요소에 초록색을 유지합니다.
- Intersection Observer로 섹션 제목과 기술·프로젝트 카드를 한 번씩 표시합니다.

포트폴리오 이름은 손현석이며, 학습 과정과 구현 원칙을 소개 문구에 반영했습니다. Footer에는 GitHub 프로필 링크를 제공합니다. 프로필 이미지는 TBD 상태로 유지합니다.
Contact 폼은 입력 검증 데모입니다. '입력 확인' 버튼으로 검증하며 실제 이메일을 전송하거나 입력 내용을 저장하지 않습니다.
앵커 클릭은 JavaScript에서 기본 이동을 막고 섹션으로 부드럽게 이동합니다. 주소 해시는 변경하지 않습니다. Ctrl/Cmd 등 보조키 클릭은 브라우저 기본 동작을 유지합니다.
768px 미만에서는 햄버거 버튼으로 메뉴를 열고 닫습니다. 메뉴 항목 선택, Esc, 메뉴 바깥 클릭으로도 닫힙니다. 768px 경계를 넘으면 열린 상태를 초기화합니다.
Projects는 naktaa의 공개 저장소를 최근 업데이트 순으로 최대 100개 표시합니다. 카드에는 이름·설명·언어·별 수·GitHub 링크가 있으며 Grid가 화면 폭에 맞춰 열을 나눕니다. 로딩/빈 목록/오류 안내와 재시도 버튼을 제공합니다.

Projects 소개 문구 바로 오른쪽의 'GitHub 저장소 보기' 링크로 전체 저장소에 접근합니다. 상단 저장소 링크와 각 프로젝트 카드의 GitHub 링크는 새 탭에서 열립니다. 좁은 화면에서 공간이 부족하면 링크가 다음 줄 왼쪽에 배치됩니다. 로딩 중에는 안내 옆 스피너가 회전하며 다른 상태가 되면 사라집니다. 동작 줄이기 설정에서는 회전 없이 로딩 문구와 정지된 표시를 제공합니다.

## Run Locally

1. VS Code에서 이 프로젝트 폴더를 엽니다.
2. Live Server 확장 프로그램을 설치합니다.
3. `index.html`을 우클릭하고 **Open with Live Server**를 선택합니다.
4. 최신 Chrome에서 열린 페이지를 확인합니다.

화면 폭을 모바일(예: 390px), 태블릿(768px), 데스크톱(1024px 이상)으로 바꿔 배치와 가로 넘침을 확인합니다. 버튼/카드 hover, Tab 키 초점 표시, 입력 폼도 확인합니다. 메뉴와 테마는 아래 순서로 확인합니다.

## Navigation & Scroll: 동작 원리

JavaScript는 `js/main.js`에서 DOM을 선택하고 `addEventListener()`로 이벤트를 연결합니다.

### 모바일 메뉴

버튼 클릭 → `isMenuOpen` 반전 → `renderMenu()` 실행 → `.active` 클래스와 `aria-expanded` 갱신 → CSS가 메뉴 표시/숨김을 결정합니다.

- `renderMenu()`: `classList.toggle('active', isMenuOpen)`으로 상태를 반영하고 버튼의 접근성 이름을 메뉴 열기/닫기로 변경합니다.
- `closeMenu()`: 상태를 false로 바꾸고 같은 렌더링 함수를 호출합니다. 메뉴 선택, Esc, 바깥 클릭, 화면 폭 전환에서 재사용합니다.
- 모바일 메뉴는 헤더 아래에 펼쳐집니다. 화면 높이가 작으면 메뉴 내부를 스크롤할 수 있습니다.
- Esc로 닫으면 버튼으로 초점을 돌립니다. 화면 폭 변경으로 현재 초점 요소가 숨겨질 때도 보이는 메뉴 링크 또는 버튼으로 초점을 옮깁니다.

### 섹션 이동

메뉴/CTA/헤더 제목 링크 클릭 → `preventDefault()`로 기본 점프 방지 → 메뉴 닫기 → `moveToSection()` → 목적지에 초점을 옮기고 `scrollIntoView()`로 이동합니다.

- `tabindex="-1"`: 섹션에 코드로 초점을 줄 수 있게 하되 일반 Tab 순서에는 넣지 않습니다.
- `focus({ preventScroll: true })`: 초점을 옮기는 순간 별도의 화면 점프가 생기지 않도록 합니다.
- CSS `scroll-margin-top: 6.5rem`: 상단에 고정된 헤더가 이동 목적지를 덮지 않도록 여유를 둡니다.
- `getScrollBehavior()`: 동작 줄이기 설정이면 `instant`, 그 외에는 `smooth`를 반환합니다.

### 스크롤 표시

`scroll` 이벤트 → `updateScrollUI()`에서 현재 `window.scrollY` 확인 → 헤더 클래스와 버튼의 `hidden` 속성 갱신 → 화면 변화.

- 60px 이상이면 헤더에 `.scrolled`를 추가해 흰색 계열 배경과 그림자를 적용하고, 60px 미만이면 제거합니다.
- 300px 이상이면 오른쪽 아래 맨 위로 버튼을 표시하고, 300px 미만이면 숨깁니다. 숨긴 버튼은 Tab으로도 선택되지 않습니다.
- 맨 위로 버튼은 Hero로 초점과 화면을 옮깁니다. 페이지 상단에 도착하면 버튼은 다시 숨겨집니다.
- 시작 시와 `pageshow`에서도 갱신하므로 브라우저가 스크롤 위치를 복원하는 경우 표시 상태를 다시 맞춥니다.
- 헤더는 `position: sticky`로 상단에 유지됩니다. 위치 고정은 CSS가, 스크롤 기준값에 따른 스타일은 JavaScript가 맡습니다.

## Stage 4: 직접 확인 순서

Live Server 페이지를 새로고침합니다. 모바일 폭은 Chrome 개발자 도구의 기기 도구 모음에서 390px로 설정할 수 있습니다.

| 순서 | 확인 방법 | 기대 결과 |
| --- | --- | --- |
| 1 | 390px에서 햄버거 버튼을 두 번 누르기 | 첫 클릭에 메뉴가 열리고, 두 번째에 닫힘 |
| 2 | 메뉴를 열고 소개/기술/프로젝트/연락 선택 | 메뉴가 닫히고 해당 섹션으로 부드럽게 이동 |
| 3 | 메뉴를 열고 Esc 누르기, 다시 열고 본문 클릭 | 두 경우 모두 닫힘. Esc에서는 버튼으로 초점 복귀 |
| 4 | 메뉴를 연 채 768px 이상으로 넓혔다가 다시 줄이기 | 넓은 화면은 일반 메뉴 표시, 다시 모바일이면 닫힌 상태 |
| 5 | 데스크톱 메뉴, Hero의 프로젝트 보기/연락하기 누르기 | 해당 섹션으로 이동하며 제목이 헤더에 가려지지 않음 |
| 6 | 페이지 맨 위에서 천천히 아래로 스크롤 | 헤더는 상단에 유지되고 60px 이상에서 배경·그림자 변경 |
| 7 | 300px 이상 내렸다가 위로 올리기 | 오른쪽 아래 ↑ 버튼이 나타나고 300px 미만에서는 사라짐 |
| 8 | 오른쪽 아래 ↑ 버튼 누르기 | 페이지 상단으로 이동 |
| 9 | Tab으로 메뉴 버튼에 초점을 맞추고 Enter/Space 누르기 | 메뉴가 열림. Tab으로 링크 선택 후 Enter로 이동 가능 |
| 10 | 스크롤한 위치에서 새로고침 | 브라우저가 위치를 복원하면 헤더/↑ 버튼도 그 위치에 맞게 표시 |
| 11 | OS 동작 줄이기 또는 DevTools Rendering의 prefers-reduced-motion: reduce 설정 후 링크 누르기 | 부드러운 애니메이션 없이 즉시 이동 |

정확한 경계값을 확인하려면 개발자 도구 Console에서 `window.scrollTo(0, 59)`, `window.scrollTo(0, 60)`, `window.scrollTo(0, 299)`, `window.scrollTo(0, 300)`을 차례로 실행합니다.
현재 위치는 `window.scrollY`로 확인할 수 있습니다.

Contact 폼 검증과 다크 모드는 아래 확인 순서를 따릅니다.

## Theme: 동작 원리

테마 버튼 클릭 → `currentTheme` 변경 → `renderTheme()`로 `html`의 `data-theme`와 버튼 표시 갱신 → `saveTheme()`로 localStorage 저장 → CSS 변수에 따라 화면 색상 변경.

- `getSavedTheme()`: `portfolio-theme` 키를 읽습니다. `dark`이면 어두운 모드, 저장값이 없거나 유효하지 않으면 밝은 모드로 시작합니다.
- `renderTheme()`: 상태를 `data-theme`에 반영하고 `aria-pressed`, 툴팁, 아이콘의 `textContent`를 함께 갱신합니다. 밝은 모드에서는 달, 어두운 모드에서는 해를 표시합니다.
- `saveTheme()`: 현재 `light` 또는 `dark` 값을 저장합니다. 새로고침하면 저장값을 읽어 같은 테마를 적용합니다.
- 버튼의 접근성 이름은 '다크 모드'로 고정하고 `aria-pressed`로 활성 여부를 전달합니다.
- 읽기/쓰기는 각각 `try/catch`로 처리합니다. 저장이 차단되면 현재 페이지에서는 전환할 수 있지만 새로고침 후 유지되지 않을 수 있습니다.
- 저장은 같은 출처(프로토콜·호스트·포트) 기준입니다. Live Server의 주소나 포트가 달라지면 이전 선택을 공유하지 않을 수 있습니다.
- 시스템 테마 자동 감지는 선택 과제이며, 현재는 저장된 사용자 선택을 사용하고 기본값은 밝은 모드입니다.

## Stage 5: 직접 확인 순서

| 순서 | 확인 방법 | 기대 결과 |
| --- | --- | --- |
| 1 | 페이지를 새로고침하고 헤더 오른쪽 달/해 버튼 확인 | 모바일과 데스크톱에서 버튼이 보임 |
| 2 | 테마 버튼을 반복 클릭 | 밝은/어두운 색상과 달/해 아이콘이 함께 전환됨 |
| 3 | 어두운 모드로 바꾸고 새로고침 | 어두운 모드 유지 |
| 4 | 밝은 모드로 바꾸고 새로고침 | 밝은 모드 유지 |
| 5 | 어두운 모드에서 끝까지 스크롤 | 본문, 카드, 폼, Footer, 헤더, ↑ 버튼의 글자가 읽히고 배경이 어울림 |
| 6 | 390px에서 메뉴를 열고 테마 전환, 링크 선택 | 메뉴와 테마 버튼이 겹치지 않고 메뉴 이동도 정상 동작 |
| 7 | Tab으로 테마 버튼에 이동 후 Enter/Space | 테마가 전환되고 초점 표시 유지 |

저장값은 Chrome 개발자 도구의 Application → Local Storage에서 `portfolio-theme` 키로 확인할 수 있습니다. 해당 키를 삭제하고 새로고침하면 밝은 모드로 시작합니다.

## Scroll Reveal: 동작 원리와 확인 순서

`initScrollReveal()`은 섹션 제목 4개와 기술 카드 3개를 관찰합니다. API 응답으로 추가되는 프로젝트 카드도 `observeRevealElements()`로 같은 Observer에 연결합니다. Hero는 처음부터 표시합니다.

요소 관찰 시작 → `reveal-pending` 클래스 추가 → 요소의 20% 이상이 화면에 들어옴 → 대기 클래스 제거 → 투명도 0에서 1, 아래 16px에서 원래 위치로 450ms 동안 전환합니다.

- `REVEAL_THRESHOLD = 0.2`를 Observer와 콜백의 비율 검사에 함께 사용합니다.
- 표시한 요소는 `unobserve()`로 관찰을 해제합니다. 위아래로 다시 스크롤해도 숨기지 않습니다.
- JavaScript가 실행되지 않거나 API를 지원하지 않으면 기본 표시 상태를 유지합니다.
- 동작 줄이기 설정에서는 숨기지 않습니다. 페이지 이용 중 설정을 켜도 모두 표시하고 관찰을 중단합니다. 다시 끄더라도 현재 페이지에서 이미 표시한 내용을 숨기지 않습니다.
- 키보드로 대상 안에 초점이 들어오면 즉시 표시합니다.
- 동작 줄이기를 켜면 동적으로 추가된 프로젝트 카드도 모두 표시합니다. 해당 설정으로 Observer를 사용하지 않는 경우 새 카드도 바로 보입니다.

1. 페이지 맨 위에서 새로고침하고 천천히 내려가며 제목과 카드가 자연스럽게 나타나는지 확인합니다.
2. 한 번 끝까지 내린 뒤 위아래로 이동해도 이미 표시한 내용이 다시 숨지 않는지 확인합니다.
3. 390px 모바일 폭과 데스크톱에서 반복하고, 메뉴로 섹션에 바로 이동해도 내용이 나타나는지 확인합니다.
4. 밝은/어두운 테마 모두에서 표시를 확인합니다.
5. OS 또는 Chrome DevTools에서 동작 줄이기를 켜면 애니메이션 없이 내용이 표시되는지 확인합니다.

## Contact Form: 동작 원리

입력/제출 → `validateContactField()` → `contactState.errors` 및 `status` 변경 → `renderContactForm()` → 오류·성공 메시지와 `aria-invalid` 갱신.

- 처음에는 오류를 표시하지 않습니다. `input` 이벤트에서는 수정한 필드만 검사하고, `submit`에서는 모든 필드를 다시 검사합니다.
- 이름·이메일·메시지는 `trim()` 후 빈 값이면 오류입니다. 입력창의 원래 내용은 유지합니다.
- 이메일은 공백 없이 `이름@도메인.확장자` 형태인지 검사합니다. 실제 주소 존재 여부를 확인하는 기능은 아닙니다.
- `contactState`에는 필드별 오류와 `idle/error/success` 상태를 보관합니다.
- `renderContactForm()`은 `textContent`로 안내를 표시하고 오류 필드의 `aria-invalid`를 갱신합니다. `aria-describedby`로 각 필드와 오류 문구를 연결합니다.
- 오류는 해당 입력창 아래에만 표시합니다. 필수 입력 문구는 '이름을/이메일을/메시지를 입력해 주세요.'로 안내합니다.
- 이름·메시지 오류는 한 줄, 이메일 오류는 두 줄 공간을 미리 확보합니다. 이메일 형식 오류의 예시는 둘째 줄에서 `예:`와 주소를 줄바꿈 없는 공백으로 연결합니다.
- `submit`에서 `preventDefault()`로 페이지 이동을 막습니다. 실패하면 첫 오류 입력창에 초점을 옮기고, 성공하면 버튼 오른쪽에 '입력 확인 완료'를 표시합니다. 실제 전송이 없는 데모라는 설명은 폼 위에 유지합니다.
- 버튼과 성공 안내는 한 행에 배치하고 안내가 없어도 두 줄 분량의 높이를 확보해 성공/수정 전후 폼 높이를 유지합니다.
- 성공 후 입력을 수정하면 이전 성공 메시지를 지웁니다. 입력값은 자동으로 초기화하지 않습니다.
- JavaScript가 이벤트를 연결한 뒤 `noValidate`와 버튼 활성화를 적용합니다. 기본 팝업 대신 필드 근처의 오류를 사용하며, 유효하지 않은 값도 버튼을 눌러 오류를 확인할 수 있습니다.

## Stage 7: 직접 확인 순서

1. 새로고침 직후에는 오류가 없어야 합니다. 빈 폼에서 '입력 확인'을 누르면 세 항목 아래에 오류가 표시되고 이름에 초점이 갑니다.
2. 이름과 메시지에 공백만 입력해도 오류인지 확인합니다.
3. 이메일에 `abc`, `hello@`, `hello@example`을 입력하면 형식 오류가 표시되어야 합니다.
4. `hello@example.com`으로 수정하면 이메일 오류가 사라져야 합니다. 입력하지 않은 다른 필드의 오류는 유지됩니다.
5. 세 항목을 올바르게 채우고 버튼을 누르면 페이지 이동 없이 버튼 오른쪽에 '입력 확인 완료'가 표시되어야 합니다. 안내 표시/제거 시 버튼과 폼 아래쪽 위치가 유지되는지 확인합니다.
6. 성공 후 입력을 수정하면 성공 안내가 사라지고, 필드를 비운 뒤 재제출하면 오류로 돌아가야 합니다.
7. 모바일 390px와 다크 모드에서 오류 문구·테두리·성공 안내를 읽을 수 있는지 확인합니다. 오류 표시/해제 시 입력창 위치가 유지되고 `예:`와 이메일 주소가 같은 줄인지 확인합니다. Tab 이동과 Enter 제출도 확인합니다.

## Development

구현은 `AGENTS.md`의 절차에 따라 한 단계씩 진행합니다.

각 단계는 다음 순서를 따릅니다.

**계획 → 사용자 승인 → 구현 → 설명 → 사용자 직접 검토**

## Runtime

- 최신 Chrome
- VS Code
- Live Server

## Thresholds

구현한 기준값은 아래와 같습니다.

- Scroll To Top 표시 기준: `window.scrollY >= 300` (300 CSS px 포함)
- 스크롤 시 Navigation 스타일 변경 기준: `window.scrollY >= 60` (60 CSS px 포함)
- Intersection Observer threshold: `0.2` (요소 면적의 20% 이상 노출 시 한 번 표시)

## GitHub API

사용 계정: `naktaa`. 페이지 로드 시 한 번 요청하며 오류 시 재시도 버튼으로 다시 요청합니다.

```text
https://api.github.com/users/naktaa/repos?sort=updated&per_page=100
```

공개 저장소를 업데이트 순으로 최대 100개 가져옵니다. 100개를 넘는 경우 추가 페이지는 현재 불러오지 않습니다. [GitHub 공식 API 문서](https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user)의 사용자 저장소 엔드포인트를 사용합니다.

### 함수와 상태 흐름

페이지 시작/재시도 클릭 → `loadProjects()` → loading → `fetch` 응답 확인 → success/empty/error → `renderProjects()`.

- `projectsState`: 현재 상태, 저장소 배열, 오류 안내를 보관합니다. 처음의 idle은 요청 전 내부 상태이며 화면은 네 가지 결과 상태로 갱신합니다.
- `loadProjects()`: 로딩 중의 중복 요청을 막고 로딩 화면부터 표시합니다. `await fetch()` 후 `response.ok`를 확인하고, JSON이 저장소 배열인지 검사합니다. 데이터가 있으면 success, 빈 배열이면 empty로 바꿉니다.
- `try/catch`: HTTP 실패, 네트워크 오류, JSON 오류, 예상과 다른 응답을 error로 처리합니다. 403/429는 요청 또는 접근 제한 안내를 제공합니다. 실제 제한을 발생시키는 반복 호출로 테스트하지 않습니다.
- `AbortController`: 15초 동안 응답이 끝나지 않으면 요청을 취소하고 시간 초과 안내를 표시합니다. 타이머는 finally에서 해제합니다.
- `renderProjects()`: 상태에 맞춰 안내의 `textContent`, 목록의 `innerHTML`, `aria-busy`, 재시도 버튼 표시를 갱신합니다. 정상 목록은 `repos.map(createProjectCard).join('')`로 만듭니다.
- `createProjectCard()`: 구조분해로 이름·설명·언어·별 수를 꺼내 템플릿 리터럴로 article을 만듭니다. 설명과 언어가 null이면 대체 문구를 표시합니다.
- `escapeHTML()`: 외부 문자열의 &, <, >, 따옴표를 이스케이프해 태그로 실행되지 않게 합니다. 링크는 고정된 GitHub 도메인과 인코딩한 저장소 이름으로 구성합니다.
- 재시도는 같은 `loadProjects()`를 호출합니다. 버튼이 숨겨지는 동안 키보드 초점은 상태 안내로 옮깁니다.

### Stage 8 직접 확인 순서

1. Live Server를 새로고침하고 Projects로 이동합니다. 저장소 이름·설명·언어·별 수가 표시되고 링크가 해당 저장소로 이동하는지 확인합니다.
2. 모바일 390px/태블릿/데스크톱과 다크 모드에서 카드 배치, 긴 저장소 이름, 카드 표시 애니메이션을 확인합니다.
3. 로딩과 빈 목록의 화면만 확인하려면 아래 Console 방법을 사용합니다. 실제 느린 요청은 Chrome Network 탭에서 Slow 3G로 설정한 뒤 한 번 새로고침해 확인할 수 있습니다. 끝나면 No throttling으로 복구합니다.
4. 오류/재시도는 아래 로컬 응답 대체 방법으로 확인할 수 있습니다. 실제 GitHub 호출을 반복하지 않습니다.

**로딩/빈 목록 화면만 확인:** 초기 요청이 끝난 뒤 Projects로 이동하고 개발자 도구 Console을 엽니다. 다음 코드는 서버 요청 없이 현재 탭의 상태를 바꾸어 UI를 확인합니다.

```js
projectsState.status = 'loading';
renderProjects();
```

로딩 안내를 충분히 확인한 뒤 아래 코드를 실행하면 빈 목록 화면으로 바뀝니다.

```js
projectsState.status = 'empty';
projectsState.repos = [];
renderProjects();
```

오류 화면만 확인하려면 아래 코드를 실행합니다. 오류 안내와 '다시 시도' 버튼이 표시되어야 합니다.

```js
projectsState.status = 'error';
projectsState.errorMessage = '프로젝트를 불러올 수 없습니다. 다시 시도해 주세요.';
renderProjects();
```

'다시 시도'를 누르면 실제 GitHub 요청으로 목록을 다시 불러옵니다. 또는 페이지를 새로고침해 복구합니다. 이 방법은 렌더링 확인용이며 실제 요청 실패 처리까지 확인하려면 아래 응답 대체 방법을 사용합니다.

**응답 처리까지 확인:** 개발자 도구 Console에서 아래 코드를 한 번 실행하면 현재 탭의 API 응답만 빈 배열로 대체합니다. 저장소 데이터는 변경하지 않습니다.

```js
window.portfolioOriginalFetch = window.fetch;
window.fetch = async () => new Response('[]', {
  status: 200, headers: { 'Content-Type': 'application/json' }
});
await loadProjects();
```

이 상태에서 아래 코드를 실행하면 403 오류와 재시도 버튼을 확인할 수 있습니다.

```js
window.fetch = async () => new Response('{}', { status: 403 });
await loadProjects();
window.fetch = window.portfolioOriginalFetch;
delete window.portfolioOriginalFetch;
```

이제 '다시 시도' 버튼을 눌러 정상 목록으로 돌아오는지 확인합니다. 중간에 중단했다면 페이지를 새로고침하면 원래 fetch로 복구됩니다. 코드 실행 시 기존 요청이 끝난 상태에서 확인합니다.

구현 검증에서는 실제 응답을 한 번 조회했고, 이후 성공/빈 목록/403/429/404/500/네트워크/시간 초과/응답 형식 오류와 재시도는 모의 응답으로 검사했습니다. 실제 Chrome에서의 레이아웃과 네트워크 동작은 사용자 검토 대기입니다.

## Deployment

- Repository URL: https://github.com/naktaa/Codyssey-B1-1-MyPortfolio
- GitHub Pages URL: TBD

## Screenshots

최종 제출 전 `evidence/`에 정리합니다.

- Desktop: TBD
- Mobile: TBD
- Dark Mode: TBD
