# B1-1 Portfolio

순수 HTML, CSS, JavaScript를 사용해 구현하는 반응형 포트폴리오 웹사이트입니다.

> 현재 상태: **초기 프로젝트 문서 구성 단계**  
> 실제 웹 페이지 기능은 아직 구현하지 않았습니다.

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

초기 문서 단계 기준:

```text
.
├── AGENTS.md
├── README.md
├── .gitignore
├── .gitattributes
├── docs/
│   ├── mission-original.md
│   ├── requirements.md
│   ├── worklog.md
│   └── troubleshooting.md
└── evidence/
    └── .gitkeep
```

구현 시작 후 다음 구조가 추가될 예정입니다.

```text
.
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── images/
```

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
