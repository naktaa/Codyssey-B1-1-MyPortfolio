# B1-1 Portfolio

순수 HTML, CSS, JavaScript를 사용해 구현하는 반응형 포트폴리오 웹사이트입니다.

> 현재 상태: **다크 모드 + localStorage 구현 — 사용자 검토 대기**
>
> HTML, 반응형 스타일, 메뉴·스크롤 인터랙션과 테마 저장·복원을 구현했습니다. 폼 검증, 스크롤 애니메이션, API는 후속 단계에서 구현합니다.

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
- 예시 프로젝트 카드와 이름/이메일/메시지 폼
- 외부 CSS와 `defer` JavaScript 연결
- 모바일 메뉴 열기/닫기와 접근성 속성 동기화
- 섹션으로 부드럽게 이동, 스크롤 시 헤더 스타일 변경, 맨 위로 버튼
- 밝은 아이보리 배경과 은은한 초록색 포인트, 카드와 입력 폼 스타일
- 모바일 퍼스트 레이아웃과 768px/1024px 브레이크포인트
- 메뉴 Flexbox, Projects의 `auto-fit` + `minmax()` Grid
- 버튼/카드 hover와 transition, 키보드 초점 표시, 동작 줄이기 설정 대응
- 테마 버튼으로 밝은/어두운 모드 전환, localStorage 저장 및 새로고침 후 복원

소개 문구는 임시 내용입니다. 프로필 이미지와 소셜 링크는 추후 추가합니다.
폼 제출 버튼은 검증 기능 구현 전까지 비활성화합니다. 실제 이메일 전송은 구현하지 않았습니다.
앵커 클릭은 JavaScript에서 기본 이동을 막고 섹션으로 부드럽게 이동합니다. 주소 해시는 변경하지 않습니다. Ctrl/Cmd 등 보조키 클릭은 브라우저 기본 동작을 유지합니다.
768px 미만에서는 햄버거 버튼으로 메뉴를 열고 닫습니다. 메뉴 항목 선택, Esc, 메뉴 바깥 클릭으로도 닫힙니다. 768px 경계를 넘으면 열린 상태를 초기화합니다.
현재 프로젝트 카드는 한 개이므로 넓은 화면에서는 가용 너비를 채웁니다. API 카드가 추가되면 Grid가 너비에 맞춰 열을 나눕니다.

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

메뉴/CTA/푸터 링크 클릭 → `preventDefault()`로 기본 점프 방지 → 메뉴 닫기 → `moveToSection()` → 목적지에 초점을 옮기고 `scrollIntoView()`로 이동합니다.

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
| 8 | ↑ 버튼과 Footer의 맨 위로 링크 각각 누르기 | 페이지 상단으로 이동 |
| 9 | Tab으로 메뉴 버튼에 초점을 맞추고 Enter/Space 누르기 | 메뉴가 열림. Tab으로 링크 선택 후 Enter로 이동 가능 |
| 10 | 스크롤한 위치에서 새로고침 | 브라우저가 위치를 복원하면 헤더/↑ 버튼도 그 위치에 맞게 표시 |
| 11 | OS 동작 줄이기 또는 DevTools Rendering의 prefers-reduced-motion: reduce 설정 후 링크 누르기 | 부드러운 애니메이션 없이 즉시 이동 |

정확한 경계값을 확인하려면 개발자 도구 Console에서 `window.scrollTo(0, 59)`, `window.scrollTo(0, 60)`, `window.scrollTo(0, 299)`, `window.scrollTo(0, 300)`을 차례로 실행합니다.
현재 위치는 `window.scrollY`로 확인할 수 있습니다.

폼 제출은 여전히 비활성화 상태입니다. 다크 모드는 아래에서 확인합니다.

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
- Intersection Observer threshold: TBD

## GitHub API

구현 예정 엔드포인트:

```text
https://api.github.com/users/{본인아이디}/repos
```

GitHub 사용자 아이디는 API 구현 단계에서 실제 값으로 확정합니다.

## Deployment

- Repository URL: TBD
- GitHub Pages URL: TBD

## Screenshots

최종 제출 전 `evidence/`에 정리합니다.

- Desktop: TBD
- Mobile: TBD
- Dark Mode: TBD
