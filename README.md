# B1-1 Portfolio

## 프로젝트 소개

순수 HTML, CSS, JavaScript로 만든 손현석의 반응형 포트폴리오입니다. 프레임워크 없이 사용자 이벤트, 상태 변경, DOM 업데이트가 화면 변화로 이어지는 과정을 구현했습니다.

## 프로젝트 구조

```text
.
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── main.js        # 기능별 모듈을 불러와 초기화
│   ├── theme.js       # 다크 모드 전환과 테마 저장·복원
│   ├── navigation.js  # 모바일 메뉴, 섹션 이동, 스크롤 UI
│   ├── reveal.js      # 화면 진입 시 요소 표시 애니메이션
│   ├── contact.js     # 폼 입력 검사와 오류·성공 안내
│   └── projects.js    # GitHub API 요청, 카드 표시, 언어 필터
├── images/
│   ├── b1-1-architecture.svg
│   ├── javascript-event-loop.png
│   ├── favicon.svg
│   └── profile-cat.jpg
├── docs/
│   ├── mission-original.md
│   ├── requirements.md
│   ├── study-notes.md
│   ├── troubleshooting.md
│   └── worklog.md
└── evidence/
```

### 동작 구조

HTML과 CSS가 DOM·CSSOM을 만들고, JavaScript가 사용자 이벤트에 따라 DOM을 갱신해 화면을 다시 그리는 흐름입니다.

![브라우저에서 HTML, CSS, JavaScript가 화면을 구성하고 사용자 이벤트로 갱신되는 흐름](images/b1-1-architecture.svg)

## 사용 기술

- HTML5
- CSS3
- Vanilla JavaScript
- GitHub REST API
- GitHub Pages

## 주요 기능

- Hero, About, Skills, Projects, Contact, Footer 시맨틱 구조
- 768px·1024px 기준 모바일 퍼스트 반응형 레이아웃
- 햄버거 메뉴와 섹션 부드러운 이동
- 스크롤 시 헤더 변경과 맨 위로 버튼
- 다크 모드 전환, `localStorage` 저장·복원
- Intersection Observer 기반 스크롤 표시 애니메이션
- 이름·이메일·메시지 폼 유효성 검사
- GitHub 저장소 loading·success·empty·error 렌더링과 재시도
- 선택 기능: GitHub 저장소 언어별 필터
- 키보드 초점, ARIA 속성, 동작 줄이기 설정 대응

Contact 폼은 입력 검증 데모이며 실제 이메일은 전송하지 않습니다.

## 이벤트 → 상태 → 렌더링

| 기능 | 이벤트 | 상태 변경 | DOM·화면 변화 |
| --- | --- | --- | --- |
| 테마 | 테마 버튼 `click` | `currentTheme` 변경 및 저장 | `data-theme`, 아이콘, ARIA 갱신 |
| 모바일 메뉴 | 메뉴 버튼 `click` | `isMenuOpen` 변경 | 메뉴 클래스와 ARIA 갱신 |
| Contact | 필드 `input`, 폼 `submit` | 오류·제출 상태 변경 | 필드 오류와 성공 안내 갱신 |
| Projects | API 요청·재시도 | loading/success/empty/error | 상태 안내, 카드, 재시도 버튼 갱신 |
| 프로젝트 필터 | 필터 버튼 `click` | `selectedLanguage` 변경 | `filter()` 결과 카드와 개수 갱신 |

기능별 모듈에서 상태와 렌더링 함수를 관리합니다. 이벤트 처리 함수는 상태를 변경하고, 렌더링 함수는 그 상태를 읽어 DOM을 갱신합니다.

## 실행 방법

1. 저장소를 내려받습니다.
2. VS Code에서 프로젝트 폴더를 엽니다.
3. Live Server로 `index.html`을 실행합니다.
4. 최신 Chrome에서 확인합니다.

별도의 패키지 설치나 빌드 과정은 없습니다. ES 모듈을 사용하므로 파일을 직접 여는 `file://` 대신 Live Server의 HTTP 주소로 실행합니다.

## GitHub Projects

페이지를 열면 다음 엔드포인트에서 대상의 공개 저장소를 최근 업데이트 순으로 최대 100개 가져옵니다.

```text
https://api.github.com/users/naktaa/repos?sort=updated&per_page=100
```

### 비동기 요청과 화면 갱신

![JavaScript의 Call Stack, Web APIs, Callback Queue와 Event Loop 관계](images/javascript-event-loop.png)

`fetch` 응답을 기다리는 동안에도 다른 이벤트를 처리할 수 있으며, 응답 후 상태를 바꾸고 화면을 갱신합니다. 그림은 개념도이며, `await` 이후 실행은 별도의 마이크로태스크로 이어집니다.

- 저장소 Description이 없으면 설명 문단 생략
- API 응답의 주 언어로 필터 버튼 생성

상태별 화면 확인 방법은 [Console 실습](docs/study-notes.md#projects-state-practice)을 참고하세요.

## 동작 기준값

| 항목 | 기준값 |
| --- | --- |
| 스크롤 시 헤더 스타일 변경 | `window.scrollY >= 60` |
| 맨 위로 버튼 표시 | `window.scrollY >= 300` |
| Intersection Observer | `threshold: 0.2` |

## 배포

- 배포 방식: GitHub Pages, `main` 브랜치의 `/(root)`
- 배포 URL: https://naktaa.github.io/Codyssey-B1-1-MyPortfolio/
- 저장소 URL: https://github.com/naktaa/Codyssey-B1-1-MyPortfolio

## 스크린샷

| 데스크톱 밝은 모드 | 데스크톱 다크 모드 |
| --- | --- |
| ![데스크톱 밝은 모드 화면](evidence/desktop-light.png) | ![데스크톱 다크 모드 화면](evidence/desktop-dark.png) |

### 모바일 밝은 모드

<img src="evidence/mobile-light.png" alt="모바일 밝은 모드에서 컴팩트 메뉴가 열린 화면" width="390">
