# B1-1 Portfolio

순수 HTML, CSS, JavaScript를 사용해 구현하는 반응형 포트폴리오 웹사이트입니다.

> 현재 상태: **HTML 시맨틱 구조 구현 — 사용자 검토 대기**
>
> 섹션과 폼의 HTML 구조를 구현했습니다. 스타일, 인터랙션, API는 후속 단계에서 구현합니다.

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

## Planned Features

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
- 외부 CSS와 `defer` JavaScript 연결 (현재 두 파일에는 안내 주석만 존재)

소개 문구는 임시 내용입니다. 프로필 이미지와 소셜 링크는 추후 추가합니다.
폼 제출 버튼은 검증 기능 구현 전까지 비활성화합니다. 실제 이메일 전송은 구현하지 않았습니다.
현재 앵커는 브라우저 기본 동작으로 이동하며, 이벤트 → 상태 → 렌더링 흐름은 후속 JavaScript 단계에서 구현합니다.
디자인은 깔끔한 구성과 은은한 초록색 포인트를 사용하도록 다음 CSS 단계에서 적용할 예정입니다.

## Run Locally

1. VS Code에서 이 프로젝트 폴더를 엽니다.
2. Live Server 확장 프로그램을 설치합니다.
3. `index.html`을 우클릭하고 **Open with Live Server**를 선택합니다.
4. 최신 Chrome에서 열린 페이지를 확인합니다.

현재는 브라우저 기본 스타일로 표시됩니다. 섹션 순서, 메뉴 이동, 라벨 클릭 시 입력 요소로 초점이 이동하는지 확인합니다.

## Development

구현은 `AGENTS.md`의 절차에 따라 한 단계씩 진행합니다.

각 단계는 다음 순서를 따릅니다.

**계획 → 사용자 승인 → 구현 → 설명 → 사용자 직접 검토**

## Runtime

- 최신 Chrome
- VS Code
- Live Server

## Thresholds

구현 단계에서 값을 확정하고 이 문서를 갱신합니다.

- Scroll To Top 표시 기준: TBD
- 스크롤 시 Navigation 스타일 변경 기준: TBD
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
