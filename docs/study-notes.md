# B1-1 포트폴리오 학습 노트

이 문서는 완성된 화면을 소개하는 README와 달리, **웹이 어떻게 동작하는지 이해하고 코드를 직접 설명하기 위한 자료**다. 각 링크를 누르면 실제 구현 위치를 확인할 수 있다.

## 1. 먼저 이해할 전체 흐름

이 프로젝트는 HTML, CSS, 기능별 JavaScript 모듈이 역할을 나눠 가진다.

| 파일 | 역할 | 시작 위치 |
| --- | --- | --- |
| HTML | 화면에 존재할 콘텐츠와 의미 구조를 만든다. | [문서 시작 — index.html:1](../index.html#L1) |
| CSS | HTML 요소의 배치, 크기, 색상과 반응형 화면을 정의한다. | [CSS 변수 — style.css:2](../css/style.css#L2) |
| JavaScript | 기능별 모듈을 시작하고 사용자 이벤트에 따라 상태와 DOM을 변경한다. | [모듈 진입점 — main.js:1](../js/main.js#L1) |

브라우저가 페이지를 여는 순서는 다음과 같다.

1. HTML을 위에서 아래로 읽어 DOM 트리를 만든다.
2. `<link>`로 연결한 CSS를 적용해 화면을 그린다.
3. `type="module"`인 스크립트와 import된 파일을 내려받고, HTML 분석이 끝나면 모듈을 실행한다. 모듈은 기본적으로 지연 실행되며 미션 표기에 맞춰 `defer`도 유지한다.
4. 각 모듈이 자신의 DOM 요소와 상태를 준비하고, `main.js`가 초기화 함수를 호출해 이벤트와 첫 화면을 연결한다.
5. 사용자가 클릭·입력·스크롤하면 이벤트 처리 함수가 실행된다.
6. 처리 함수가 상태를 바꾸고 렌더 함수를 호출한다.
7. 렌더 함수가 텍스트, 클래스, 속성 또는 HTML을 바꾸면 화면도 달라진다.

[CSS와 defer JavaScript 연결 — index.html:9](../index.html#L9)

`main.js`의 `import`는 다른 파일이 `export`한 초기화 함수를 가져온다. 각 초기화 함수는 페이지 시작 시 한 번 호출한다. 테마는 `theme.js`, 메뉴와 이동은 `navigation.js`, 표시 애니메이션은 `reveal.js`, 폼은 `contact.js`, API와 필터는 `projects.js`에서 찾으면 된다.

각 파일의 상태와 렌더 함수는 모듈 내부에서만 사용한다. 초기화 함수 안에는 이벤트 연결과 첫 화면 준비만 모으고, 검증·렌더 함수는 별도로 유지했다. 기능별 코드의 읽는 순서는 DOM 선택 → 상태 → 처리·렌더 함수 → 초기화 함수다.

실행은 Live Server의 HTTP 주소를 사용한다. 모듈 내부 상태는 기본적으로 일반 Console에서 직접 접근할 수 없다. Projects는 학습용으로 `projectsState`와 `renderProjects`도 export한다. 최초 API 요청이 끝난 뒤 Console에서 `const p = await import('./js/projects.js');`로 가져와 `p.projectsState`를 변경하고 `p.renderProjects()`를 호출한다. 같은 모듈의 상태를 공유하며 초기화 함수를 다시 호출하지 않는다. 실습 후 새로고침으로 복구한다. Projects 상태별 실습 순서는 [README](../README.md)에 있다.

이 미션에서 가장 중요한 문장은 다음과 같다.

> 사용자 이벤트 → 상태 변경 → DOM 업데이트 → 화면 변화

CSS만 바뀌는 것은 디자인 변경이다. JavaScript가 사용자의 행동을 받아 상태와 DOM을 바꾸는 과정까지 이해해야 인터랙티브 웹의 원리를 설명할 수 있다.

---

## 2. HTML: 화면의 의미와 뼈대

### 2.1 HTML과 DOM의 차이

HTML은 파일에 작성한 마크업이고, DOM(Document Object Model)은 브라우저가 HTML을 읽어 메모리에 만든 객체 구조다. JavaScript는 HTML 파일 자체를 고치는 것이 아니라 현재 페이지의 DOM 객체를 변경한다.

예를 들어 JavaScript에서 `document.querySelector('.theme-toggle')`을 실행하면 HTML 문자열을 검색하는 것이 아니라 DOM 트리에서 해당 클래스를 가진 첫 번째 요소 객체를 가져온다.

[주요 DOM 요소 선택 — navigation.js:1](../js/navigation.js#L1)

### 2.2 시맨틱 태그를 사용한 이유

`div`는 의미 없는 범용 상자다. 반면 시맨틱 태그는 영역의 역할을 이름으로 표현한다.

| 태그 | 이 프로젝트에서의 역할 | 코드 |
| --- | --- | --- |
| `header` | 페이지 상단 내비게이션 영역 | [header — index.html:13](../index.html#L13) |
| `nav` | 섹션 이동 링크 모음 | [nav — index.html:14](../index.html#L14) |
| `main` | 페이지의 핵심 콘텐츠 | [main — index.html:33](../index.html#L33) |
| `section` | Hero, About, Skills, Projects, Contact 구분 | [Hero section — index.html:34](../index.html#L34) |
| `article` | 독립적으로 이해할 수 있는 저장소 카드 | [동적 article — projects.js:22](../js/projects.js#L22) |
| `footer` | 저작권과 소셜 링크 | [footer — index.html:108](../index.html#L108) |

시맨틱 태그를 사용하면 개발자가 구조를 읽기 쉽고, 검색 엔진과 보조 기술도 각 영역의 역할을 더 잘 파악할 수 있다.

Projects의 `article`은 초기 HTML에 직접 적혀 있지 않다. GitHub API 응답을 받은 뒤 `createProjectCard`가 문자열로 만들고 `innerHTML`로 DOM에 삽입한다. 따라서 개발자 도구의 Elements 패널에서는 카드가 `article`로 나타난다.

### 2.3 이미지와 영역의 접근 가능한 이름

이미지의 `alt`는 이미지를 볼 수 없는 상황에서 내용과 목적을 전달하는 대체 텍스트다. 현재 프로필 사진은 자기소개 콘텐츠이므로 의미를 설명하는 `alt`를 작성했다.

[프로필 이미지와 `alt` — index.html:48](../index.html#L48)

`aria-labelledby="about-title"`은 About `section`의 이름을 `id="about-title"`인 제목에서 가져오라는 뜻이다. `aria-label`은 연결할 화면 텍스트가 없거나 별도 이름이 필요할 때 요소 자체에 이름을 직접 지정한다.

- 섹션과 제목 연결: [`aria-labelledby`와 제목 `id` — index.html:45](../index.html#L45)
- 내비게이션 이름 지정: [`aria-label="주요 메뉴"` — index.html:14](../index.html#L14)
- 장식 문자를 읽지 않게 처리: [`aria-hidden="true"` — index.html:28](../index.html#L28)

`aria-hidden="true"`는 달·화살표처럼 시각적인 장식이 버튼의 접근성 이름과 중복해 읽히지 않게 한다. 의미 있는 내용 전체를 감추는 용도로 사용하면 안 된다.

### 2.4 앵커 링크와 id의 연결

`href="#projects"`는 `id="projects"`인 요소를 가리킨다. 이 연결 덕분에 JavaScript가 없어도 브라우저의 기본 앵커 이동이 가능하다.

- 링크의 목적지 지정: [Projects 메뉴 `href="#projects"` — index.html:23](../index.html#L23)
- 목적지가 되는 요소: [Projects 섹션 `id="projects"` — index.html:67](../index.html#L67)
- 클릭 이벤트 연결: [모든 내부 링크 순회 — navigation.js:57](../js/navigation.js#L57)
- 기본 이동을 막고 목적지 전달: [`preventDefault()`와 `moveToSection()` — navigation.js:58](../js/navigation.js#L58)
- 초점과 부드러운 스크롤 실행: [`moveToSection()` — navigation.js:30](../js/navigation.js#L30)
- sticky 헤더에 가리지 않게 보정: [`scroll-margin-top` — style.css:222](../css/style.css#L222)

JavaScript는 기본 이동을 `preventDefault()`로 막고 `scrollIntoView()`를 호출한다. Ctrl·Command 같은 보조키 클릭은 새 탭 등 브라우저 기본 동작을 유지하도록 예외 처리한다.

### 2.5 폼 label과 입력 요소

`label`의 `for="contact-email"`과 입력 요소의 `id="contact-email"`이 같으면 라벨을 눌러도 입력창에 초점이 간다. 이 동작은 JavaScript로 구현한 것이 아니라 브라우저가 제공하는 HTML 기본 동작이다. 화면 읽기 프로그램도 이 값의 일치를 보고 라벨과 입력창의 관계를 이해한다.

- 이름 연결: [`for="contact-name"`과 `id="contact-name"` — index.html:85](../index.html#L85)
- 이메일 연결: [`for="contact-email"`과 `id="contact-email"` — index.html:90](../index.html#L90)
- 메시지 연결: [`for="contact-message"`와 `id="contact-message"` — index.html:95](../index.html#L95)
- 키보드 초점의 시각적 테두리: [`:focus-visible` — style.css:102](../css/style.css#L102)
- 제출 오류 시 JavaScript 초점 이동: [`firstInvalidField.focus()` — contact.js:62](../js/contact.js#L62)

라벨 클릭과 잘못된 제출은 서로 다른 초점 이동이다. 라벨 클릭은 `for`와 `id`가 처리하고, 제출 후 첫 오류 필드로 이동하는 것은 JavaScript의 `focus()`가 처리한다. CSS의 `:focus-visible`은 초점을 이동시키지 않고 현재 키보드 초점이 어디 있는지를 테두리로 보여 준다.

#### aria-describedby와 aria-live

`aria-describedby`는 입력 요소와 그 입력을 보충 설명하는 요소를 `id`로 연결한다. 예를 들어 이메일 입력의 `aria-describedby="contact-email-error"`는 바로 다음 오류 문단의 `id="contact-email-error"`를 가리킨다.

- 폼 전체와 폼 설명 연결: [`aria-describedby="contact-description"` — index.html:82](../index.html#L82)
- 이메일 입력과 오류 문단 연결: [`aria-describedby`와 오류 `id` — index.html:91](../index.html#L91)
- 세 오류 문단의 실시간 안내 설정: [`aria-live="polite"` — index.html:87](../index.html#L87)
- 오류 문자열을 문단에 넣는 코드: [`textContent = error` — contact.js:27](../js/contact.js#L27)
- 오류 여부를 입력 속성에 반영: [`aria-invalid` 갱신 — contact.js:28](../js/contact.js#L28)
- 잘못된 입력의 테두리 색상: [`[aria-invalid="true"]` — style.css:558](../css/style.css#L558)

`aria-live="polite"`는 JavaScript가 빈 오류 문단의 `textContent`를 바꾸면 화면 읽기 프로그램이 현재 안내를 무리하게 끊지 않고 변경된 문구를 읽게 한다. `aria-describedby`는 두 요소의 관계를 설명하고, `aria-live`는 설명 내용이 바뀐 사실을 알리므로 역할이 다르다.

제출 성공 문구는 별도의 `<p role="status">`에 들어간다. `role="status"`도 상태 문구 변경을 보조 기술에 전달하는 live region 역할을 한다.

- 성공 상태 문단: [`role="status"` — index.html:102](../index.html#L102)
- 성공 문구 갱신: [`formStatus.textContent` — contact.js:31](../js/contact.js#L31)

---

## 3. CSS: 화면 배치와 반응형 원리

### 3.1 선택자와 클래스

CSS 선택자는 어떤 HTML 요소에 규칙을 적용할지 정한다.

| 선택자 문법 | 읽는 방법 | 이 프로젝트의 연결 예 |
| --- | --- | --- |
| `body` | 해당 이름의 HTML 태그 | [`<body>` — index.html:12](../index.html#L12) ↔ [`body` — style.css:47](../css/style.css#L47) |
| `.button` | 해당 `class`를 가진 요소 | [`class="button"` — index.html:39](../index.html#L39) ↔ [`.button` — style.css:283](../css/style.css#L283) |
| `#contact-description` | 해당 `id`를 가진 한 요소 | [`id="contact-description"` — index.html:82](../index.html#L82) ↔ [`#contact-description` — style.css:512](../css/style.css#L512) |
| `.form-field label` | `.form-field` 안에 있는 `label` | [폼 필드 구조 — index.html:84](../index.html#L84) ↔ [라벨 선택자 — style.css:519](../css/style.css#L519) |
| `.site-header.scrolled` | 두 클래스를 동시에 가진 한 요소 | [기본 헤더 — index.html:13](../index.html#L13) ↔ [스크롤된 헤더 — style.css:125](../css/style.css#L125) |
| `[aria-invalid="true"]` | 속성과 값이 일치하는 요소 | [속성 변경 — contact.js:28](../js/contact.js#L28) ↔ [오류 입력 CSS — style.css:558](../css/style.css#L558) |

`.`은 `class`, `#`은 `id`, 대괄호는 속성을 찾는다. 선택자 사이에 공백이 있으면 앞 요소 **안에 있는** 뒤 요소를 찾고, `.site-header.scrolled`처럼 공백 없이 붙어 있으면 같은 요소가 두 클래스를 모두 가져야 한다.

| CSS 선택자 | 일치하는 HTML/DOM | 값이 만들어지거나 바뀌는 위치 |
| --- | --- | --- |
| `.project-card` | `class="project-card"`인 프로젝트 카드 | [카드 HTML 문자열 — projects.js:30](../js/projects.js#L30) |
| `.site-header.scrolled` | `site-header`와 `scrolled` 클래스를 모두 가진 헤더 | [HTML의 기본 클래스 — index.html:13](../index.html#L13), [스크롤에 따른 클래스 변경 — navigation.js:41](../js/navigation.js#L41) |
| `[data-theme="dark"]` | `data-theme` 속성값이 `dark`인 요소 | [`<html>` 속성 변경 — theme.js:20](../js/theme.js#L20) |
| `.scroll-top[hidden]` | `scroll-top` 클래스와 `hidden` 속성을 모두 가진 버튼 | [HTML의 버튼과 초기 `hidden` — index.html:114](../index.html#L114), [스크롤에 따른 `hidden` 변경 — navigation.js:47](../js/navigation.js#L47) |

위 선택자 자체가 작성된 위치도 함께 보면 연결이 더 분명하다.

- 프로젝트 카드 모양: [`.project-card` — style.css:353](../css/style.css#L353)
- 스크롤된 헤더 모양: [`.site-header.scrolled` — style.css:125](../css/style.css#L125)
- 다크 테마 변수: [`[data-theme="dark"]` — style.css:27](../css/style.css#L27)
- 숨겨진 맨 위 버튼: [`.scroll-top[hidden]` — style.css:241](../css/style.css#L241)

JavaScript가 클래스를 추가하거나 속성을 변경하면 다른 CSS 선택자가 일치하면서 화면 모양이 바뀐다. 이것이 JavaScript와 CSS가 협력하는 기본 방식이다.

### 3.2 CSS 변수와 테마

밝은 테마의 색상·간격·그림자는 `:root`에 변수로 모았다.

[밝은 테마 변수 — style.css:2](../css/style.css#L2)

다크 모드에서는 레이아웃을 다시 작성하지 않고 같은 변수 이름의 값만 덮어쓴다.

[다크 테마 변수 — style.css:27](../css/style.css#L27)

예를 들어 `body`는 항상 `background: var(--color-bg)`를 사용한다. JavaScript가 `<html>`에 `data-theme="dark"`를 지정하면 `--color-bg` 값이 어두운 색으로 바뀌고, 그 변수를 사용하는 모든 요소가 함께 변경된다.

- 테마를 바꾸는 HTML 버튼: [`.theme-toggle` — index.html:27](../index.html#L27)
- 현재 테마를 `<html>` 속성에 반영: [`renderTheme()` — theme.js:18](../js/theme.js#L18)
- 변수를 실제 배경과 글자색에 사용: [`body` — style.css:47](../css/style.css#L47)

이 방식의 장점은 테마 변경 코드가 각 카드와 버튼을 하나씩 수정할 필요가 없다는 것이다.

### 3.3 박스 모델과 공통 초기화

브라우저에서 요소 크기는 콘텐츠, padding, border, margin으로 구성된다. `box-sizing: border-box`를 사용하면 지정한 width 안에 padding과 border가 포함되어 크기 계산이 쉬워진다.

[box-sizing 초기화 — style.css:43](../css/style.css#L43)

이미지의 `max-width: 100%`는 부모보다 이미지가 커져 가로 스크롤이 생기는 것을 막는다.

[이미지 기본 규칙 — style.css:87](../css/style.css#L87)

### 3.4 모바일 퍼스트

기본 CSS를 모바일 화면으로 작성하고, 화면이 넓어질 때 미디어 쿼리로 확장한다.

- 모바일 기본 너비: [style.css:111](../css/style.css#L111)
- 태블릿 이상 768px: [style.css:607](../css/style.css#L607)
- 데스크톱 이상 1024px: [style.css:654](../css/style.css#L654)

모바일에서는 `.nav-list`를 숨기고 햄버거 버튼을 표시한다. 768px 이상에서는 햄버거 버튼을 숨기고 메뉴 목록을 Flexbox로 표시한다.

- [내비게이션 HTML 구조 — index.html:14](../index.html#L14)
- [모바일 메뉴 기본 상태 — style.css:145](../css/style.css#L145)
- [데스크톱 메뉴 전환 — style.css:614](../css/style.css#L614)

모바일 퍼스트의 핵심은 작은 화면을 먼저 해결한 뒤 필요한 규칙만 넓은 화면에 추가하는 것이다.

### 3.5 Flexbox와 Grid의 선택 기준

Flexbox는 기본적으로 한 방향의 배치에 적합하다. 내비게이션은 로고, 메뉴, 버튼을 한 행에 배치하므로 Flexbox를 사용했다.

[내비게이션 Flexbox — style.css:129](../css/style.css#L129)

Grid는 행과 열을 함께 다루는 카드 목록에 적합하다. Projects는 카드 개수와 화면 너비에 따라 열 수가 자동으로 바뀌어야 하므로 Grid를 사용했다.

[Projects Grid — style.css:388](../css/style.css#L388)

```css
grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
```

- `repeat(...)`: 같은 열 규칙을 반복한다.
- `auto-fit`: 들어갈 수 있는 만큼 열을 자동 생성한다.
- `minmax(...)`: 열의 최소·최대 너비를 지정한다.
- `min(100%, 18rem)`: 매우 좁은 화면에서는 카드가 부모 너비를 넘지 않게 한다.
- `1fr`: 남는 공간을 열이 나눠 사용한다.

### 3.6 hover, transition, box-shadow

카드에는 기본 그림자와 transition을 주고, hover 시 위로 조금 이동하면서 그림자가 강해지게 했다.

- [카드 HTML 클래스 생성 — projects.js:30](../js/projects.js#L30)
- [카드 기본 효과 — style.css:353](../css/style.css#L353)
- [카드 hover 효과 — style.css:361](../css/style.css#L361)

transition은 시작 상태와 끝 상태 사이를 브라우저가 부드럽게 계산하게 한다. hover는 마우스 환경의 피드백이고, 키보드 사용자를 위해 `:focus-visible`도 별도로 제공한다.

[키보드 초점 표시 — style.css:102](../css/style.css#L102)

---

## 4. JavaScript 기초: DOM 선택과 이벤트

### 4.1 const와 let

- `const`: 변수에 다른 값을 다시 대입하지 않을 때 사용한다.
- `let`: 상태처럼 값이 바뀌어야 할 때 사용한다.
- 객체를 `const`로 선언해도 객체 내부 속성은 바꿀 수 있다. 변수 자체가 다른 객체를 가리키도록 재대입하는 것만 막는다.

이 프로젝트에서 DOM 요소 참조와 설정값은 대부분 `const`이고, 테마와 메뉴처럼 값 자체가 바뀌는 상태는 `let`이다.

- [DOM 요소 상수 — navigation.js:1](../js/navigation.js#L1)
- [변경되는 테마 상태 — theme.js:16](../js/theme.js#L16)
- [변경되는 메뉴 상태 — navigation.js:14](../js/navigation.js#L14)

### 4.2 querySelector와 querySelectorAll

`querySelector`는 CSS 선택자와 일치하는 첫 요소를 반환하고, `querySelectorAll`은 일치하는 모든 요소를 NodeList로 반환한다.

```js
const menuToggle = document.querySelector('.menu-toggle');
const anchorLinks = document.querySelectorAll('a[href^="#"]');
```

`anchorLinks`에는 여러 링크가 들어 있으므로 `forEach`로 하나씩 이벤트를 연결한다.

- [HTML의 `.menu-toggle` 대상 — index.html:16](../index.html#L16)
- [첫 요소와 여러 요소 선택 — navigation.js:1](../js/navigation.js#L1)
- [앵커 이벤트 반복 연결 — navigation.js:57](../js/navigation.js#L57)

`'.menu-toggle'`과 `'a[href^="#"]'`도 CSS에서 쓰는 것과 같은 선택자 문법이다. 전자는 클래스가 일치하는 첫 버튼을 찾고, 후자는 `href` 값이 `#`으로 시작하는 모든 내부 링크를 찾는다.

### 4.3 addEventListener

이벤트 리스너는 “이 사건이 발생하면 이 함수를 실행하라”는 연결이다.

```js
menuToggle.addEventListener('click', () => {
  isMenuOpen = !isMenuOpen;
  renderMenu();
});
```

호출 흐름은 다음과 같다.

1. 사용자가 버튼을 클릭한다.
2. 브라우저가 `click` 이벤트를 발생시킨다.
3. 등록한 화살표 함수가 실행된다.
4. `isMenuOpen` 값이 반대로 바뀐다.
5. `renderMenu()`가 새 상태를 DOM에 반영한다.

[메뉴 클릭 이벤트 — navigation.js:52](../js/navigation.js#L52)

- 이벤트를 받는 버튼: [`.menu-toggle` — index.html:16](../index.html#L16)
- 상태가 반영되는 메뉴: [`.nav-list` — index.html:19](../index.html#L19)
- `active` 클래스가 있을 때의 화면: [`.nav-list.active` — style.css:148](../css/style.css#L148)

HTML의 `onclick` 속성을 사용하지 않았기 때문에 HTML은 구조, JavaScript는 동작이라는 역할 분리가 유지된다.

### 4.4 DOM을 변경하는 방법

| API | 역할 | 사용 위치 |
| --- | --- | --- |
| `textContent` | 요소 안의 글자를 안전하게 변경 | [폼 오류 문구 — contact.js:27](../js/contact.js#L27) |
| `innerHTML` | HTML 문자열을 실제 요소로 생성 | [프로젝트 카드 목록 — projects.js:89](../js/projects.js#L89) |
| `classList.add` | 클래스 추가 | [애니메이션 대기 — reveal.js:21](../js/reveal.js#L21) |
| `classList.remove` | 클래스 제거 | [요소 표시 — reveal.js:14](../js/reveal.js#L14) |
| `classList.toggle` | 조건에 따라 클래스 추가·제거 | [메뉴 렌더링 — navigation.js:18](../js/navigation.js#L18) |
| `setAttribute` | HTML 속성 변경 | [테마 렌더링 — theme.js:20](../js/theme.js#L20) |

`textContent`는 글자를 HTML로 해석하지 않는다. `innerHTML`은 문자열을 HTML로 해석하므로 외부 API 값을 넣을 때 반드시 안전하게 처리해야 한다.

---

## 5. 상태와 렌더링

### 5.1 상태란 무엇인가

상태는 현재 화면을 결정하는 값이다. 예를 들어 메뉴가 열렸는지, 테마가 무엇인지, 폼에 오류가 있는지, API 요청이 끝났는지가 상태다.

| 기능 | 상태 | 렌더 함수 |
| --- | --- | --- |
| 테마 | [`currentTheme` — theme.js:16](../js/theme.js#L16) | [`renderTheme()` — theme.js:18](../js/theme.js#L18) |
| 모바일 메뉴 | [`isMenuOpen` — navigation.js:14](../js/navigation.js#L14) | [`renderMenu()` — navigation.js:17](../js/navigation.js#L17) |
| Contact | [`contactState` — contact.js:7](../js/contact.js#L7) | [`renderContactForm()` — contact.js:24](../js/contact.js#L24) |
| Projects | [`projectsState` — projects.js:9](../js/projects.js#L9) | [`renderProjects()` — projects.js:78](../js/projects.js#L78) |

상태를 사용하지 않고 이벤트 함수가 여러 DOM 요소를 직접 수정하면 다른 이벤트에서도 같은 코드를 반복하게 된다. 이 프로젝트는 이벤트 처리와 화면 출력을 분리해 흐름을 읽기 쉽게 만들었다.

### 5.2 공통 흐름

```text
이벤트 또는 API 결과
        ↓
상태 값 변경
        ↓
render 함수 호출
        ↓
textContent / innerHTML / classList / 속성 변경
        ↓
브라우저 화면 갱신
```

React 같은 라이브러리는 이 상태와 렌더링의 연결을 더 큰 규모에서 자동화한다. 이 프로젝트에서는 라이브러리 없이 직접 구현해 기본 원리를 확인한다.

이 흐름은 다음 실제 코드 쌍에서 확인할 수 있다.

- 테마: [클릭으로 상태 변경 — theme.js:36](../js/theme.js#L36) → [`renderTheme()` — theme.js:18](../js/theme.js#L18)
- 메뉴: [클릭으로 상태 변경 — navigation.js:52](../js/navigation.js#L52) → [`renderMenu()` — navigation.js:17](../js/navigation.js#L17)
- Contact: [`input`으로 오류 상태 변경 — contact.js:40](../js/contact.js#L40) → [`renderContactForm()` — contact.js:24](../js/contact.js#L24)
- Projects: [API 결과로 요청 상태 변경 — projects.js:105](../js/projects.js#L105) → [`renderProjects()` — projects.js:78](../js/projects.js#L78)

---

## 6. 다크 모드와 localStorage

### 관련 코드

- [테마 버튼 HTML — index.html:27](../index.html#L27)
- [밝은·어두운 테마 CSS 변수 — style.css:2](../css/style.css#L2)
- [저장값 읽기 — theme.js:6](../js/theme.js#L6)
- [테마 상태 — theme.js:16](../js/theme.js#L16)
- [화면 렌더링 — theme.js:18](../js/theme.js#L18)
- [저장 — theme.js:26](../js/theme.js#L26)
- [클릭 이벤트 — theme.js:36](../js/theme.js#L36)

### 동작 순서

1. 페이지가 열리면 `getSavedTheme()`이 `localStorage`에서 `portfolio-theme` 값을 읽는다.
2. 저장값이 `dark`면 다크 모드, 그 외에는 밝은 모드를 초기 상태로 사용한다.
3. `renderTheme()`이 `<html>`의 `data-theme`, 버튼의 ARIA 상태, 아이콘을 갱신한다.
4. 사용자가 버튼을 클릭하면 `currentTheme`이 반대 값으로 바뀐다.
5. 화면을 다시 렌더링하고 `saveTheme()`으로 선택값을 저장한다.
6. 새로고침해도 1번에서 저장값을 다시 읽기 때문에 테마가 유지된다.

`localStorage`는 같은 출처에서 브라우저를 닫거나 새로고침해도 남는 문자열 저장소다. 서버나 데이터베이스에 저장하는 것이 아니므로 다른 기기나 브라우저와 공유되지 않는다.

저장소 접근이 차단될 수도 있어 읽기와 쓰기를 `try/catch`로 감쌌다. 저장에 실패하더라도 현재 페이지의 테마 전환은 계속 동작한다.

화면 변화는 `renderTheme()`이 직접 모든 색을 바꿔서 생기는 것이 아니다. `data-theme` 속성 하나를 바꾸면 [`[data-theme="dark"]` 선택자 — style.css:27](../css/style.css#L27)의 변수들이 적용되고, [`body` 등에서 그 변수를 사용 — style.css:47](../css/style.css#L47)하기 때문에 여러 요소의 색이 함께 바뀐다.

---

## 7. 모바일 메뉴와 스크롤 기능

### 7.1 메뉴 상태

`isMenuOpen`은 `true` 또는 `false`만 가지는 불리언 상태다. `renderMenu()`는 이 값으로 다음 세 가지를 동시에 갱신한다.

- 메뉴의 `active` 클래스
- 버튼의 `aria-expanded`
- 버튼의 접근성 이름

[메뉴 상태와 렌더링 — navigation.js:14](../js/navigation.js#L14)

CSS는 `.nav-list.active`일 때만 메뉴를 표시한다.

- 메뉴 버튼과 제어 대상 `id`: [index.html:16](../index.html#L16)
- 기본적으로 숨겨진 목록: [`.nav-list` — style.css:145](../css/style.css#L145)
- `active`일 때 표시되는 목록: [`.nav-list.active` — style.css:148](../css/style.css#L148)

메뉴 링크 선택, Escape, 메뉴 바깥 클릭, 화면 폭 변경에서도 `closeMenu()`를 재사용한다. 닫기 규칙을 한 함수에 모으면 모든 경로가 같은 상태 변경을 사용한다.

- [메뉴 닫기와 부드러운 이동 — navigation.js:23](../js/navigation.js#L23)
- [Escape·바깥 클릭 — navigation.js:76](../js/navigation.js#L76)
- [화면 폭 변경 — navigation.js:89](../js/navigation.js#L89)

### 7.2 스크롤 상태

`updateScrollUI()`는 현재 `window.scrollY`를 읽는다.

- 60px 이상: 헤더에 `scrolled` 클래스 추가
- 300px 이상: 맨 위로 버튼 표시

- [스크롤 기준값과 렌더링 — navigation.js:9](../js/navigation.js#L9)
- [scroll 이벤트 연결 — navigation.js:94](../js/navigation.js#L94)
- [스크롤된 헤더 CSS — style.css:125](../css/style.css#L125)
- [맨 위 버튼 HTML — index.html:114](../index.html#L114)
- [`hidden` 버튼 CSS — style.css:241](../css/style.css#L241)
- [맨 위 버튼 click 이벤트 — navigation.js:71](../js/navigation.js#L71)

스크롤 이벤트는 매우 자주 발생하므로 `{ passive: true }`로 브라우저에 기본 스크롤을 막지 않는 리스너임을 알려 준다.

스크롤할 때 헤더의 `scrolled` 클래스는 `classList.add()`와 `classList.remove()`로 바뀐다. 맨 위 버튼은 별도 클래스가 아니라 `hidden` 속성의 참·거짓이 바뀌며, CSS의 `.scroll-top[hidden]`이 이 속성을 보고 버튼을 숨긴다.

---

## 8. Intersection Observer 애니메이션

스크롤 이벤트에서 모든 요소의 위치를 계속 계산하는 대신 Intersection Observer가 요소와 화면의 교차 상태를 알려 준다.

[Observer 초기화 — reveal.js:3](../js/reveal.js#L3)

1. HTML에서 애니메이션 대상에 `data-reveal`을 표시한다.
2. JavaScript가 대상에 `reveal-pending` 클래스를 추가해 대기 상태로 만든다.
3. 요소가 화면에 20% 이상 들어오면 클래스를 제거한다.
4. CSS transition으로 투명도와 위치가 부드럽게 바뀐다.
5. `unobserve()`로 관찰을 끝내 애니메이션이 한 번만 실행되게 한다.

관찰 대상은 HTML에 미리 있는 섹션 제목과 Skills 카드다. GitHub API로 나중에 생성되는 프로젝트 카드는 바로 표시해 동적 관찰 로직을 추가하지 않는다.

- HTML의 관찰 표시: [`data-reveal` — index.html:46](../index.html#L46)
- 관찰 대상 선택과 Observer 생성: [`initScrollReveal()` — reveal.js:6](../js/reveal.js#L6)
- 대기 클래스 추가: [`classList.add('reveal-pending')` — reveal.js:21](../js/reveal.js#L21)
- 화면 진입 후 클래스 제거: [`classList.remove('reveal-pending')` — reveal.js:14](../js/reveal.js#L14)
- 대기·전환 CSS: [`[data-reveal]`과 `.reveal-pending` — style.css:679](../css/style.css#L679)

JavaScript가 실행되지 않거나 Intersection Observer를 지원하지 않아도 콘텐츠가 보이도록 **기본 CSS는 표시 상태**다. 관찰을 시작할 수 있을 때만 JavaScript가 숨김 클래스를 추가한다.

사용자가 운영체제에서 동작 줄이기를 선택하면 애니메이션을 적용하지 않는다.

[동작 줄이기 대응 — style.css:687](../css/style.css#L687)

---

## 9. Contact 폼 유효성 검사

### 관련 코드

- [폼 설명과 폼 연결 — index.html:82](../index.html#L82)
- [label·입력·오류 요소 — index.html:84](../index.html#L84)
- [입력과 오류의 CSS — style.css:519](../css/style.css#L519)
- [폼 상태 — contact.js:7](../js/contact.js#L7)
- [필드 검증 — contact.js:12](../js/contact.js#L12)
- [폼 렌더링 — contact.js:24](../js/contact.js#L24)
- [input 이벤트 — contact.js:41](../js/contact.js#L41)
- [submit 이벤트 — contact.js:49](../js/contact.js#L49)
- [리스너 연결 후 폼 활성화 — contact.js:65](../js/contact.js#L65)

### 상태 구조

```js
const contactState = {
  errors: { name: '', email: '', message: '' },
  status: 'idle',
};
```

`errors`에는 필드별 오류 문구가 들어가고 `status`는 현재 제출 상태를 나타낸다. 빈 문자열은 오류가 없다는 뜻이다.

상태와 DOM의 대응은 다음과 같다.

| 상태 값 | 렌더링 위치 | 화면·접근성 변화 |
| --- | --- | --- |
| `errors[field.name]` | [`renderContactForm()` — contact.js:24](../js/contact.js#L24) | 오류 문단의 `textContent`와 입력의 `aria-invalid` 변경 |
| 오류가 있는 `aria-invalid="true"` | [오류 입력 선택자 — style.css:558](../css/style.css#L558) | 입력 테두리가 오류 색으로 변경 |
| `status === 'success'` | [성공 문구 분기 — contact.js:31](../js/contact.js#L31) | `role="status"` 문단에 `입력 확인 완료` 표시 |

오류 문단은 내용이 없을 때도 최소 높이를 유지한다. 오류가 생겼다 사라질 때 아래 요소들이 크게 움직이지 않게 하기 위한 CSS다.

[오류 문단 공간과 줄바꿈 — style.css:546](../css/style.css#L546)

### input 흐름

1. 사용자가 한 필드의 내용을 바꾼다.
2. `input` 이벤트가 발생한다.
3. `validateContactField(field)`가 공백 제거 후 필수값과 이메일 형식을 검사한다.
4. 해당 필드의 오류만 `contactState.errors`에 저장한다.
5. 이전 성공 결과는 현재 입력과 맞지 않으므로 상태를 `idle`로 되돌린다.
6. `renderContactForm()`이 필드 근처 오류와 `aria-invalid`를 갱신한다.

예를 들어 이메일을 잘못 입력하면 `validateContactField()`가 문자열을 반환하고, 그 문자열이 `contactState.errors.email`에 저장된다. 렌더 함수는 `field.id`가 `contact-email`인 것을 이용해 `#contact-email-error`를 찾은 뒤 오류 문구를 넣는다.

### submit 흐름

1. `event.preventDefault()`로 실제 페이지 제출과 새로고침을 막는다.
2. 자동완성처럼 input 이벤트가 없었을 가능성까지 고려해 모든 필드를 다시 검사한다.
3. 오류가 하나라도 있으면 상태를 `error`, 없으면 `success`로 바꾼다.
4. 렌더 함수가 성공 문구 또는 필드별 오류를 표시한다.
5. 오류가 있으면 첫 번째 잘못된 필드로 키보드 초점을 옮긴다.

HTML에서는 JavaScript가 실행되기 전 제출되는 상황을 막기 위해 버튼을 처음에 `disabled`로 둔다. 이벤트 연결이 끝난 뒤 JavaScript가 브라우저 기본 검증 팝업을 끄고 버튼을 활성화하며 첫 화면을 렌더링한다.

- 초기 비활성 버튼: [index.html:101](../index.html#L101)
- 자체 오류 문구 사용과 버튼 활성화: [contact.js:65](../js/contact.js#L65)

HTML의 `required`와 `type="email"`은 필수 입력과 이메일이라는 의미를 남긴다. 다만 이 프로젝트는 오류 문구와 상태 흐름을 직접 구현해 보기 위해 `contactForm.noValidate = true`로 브라우저 기본 팝업 제출 검증을 끄고 `validateContactField()`의 결과를 사용한다.

- [필드 의미를 나타내는 HTML 속성 — index.html:86](../index.html#L86)
- [직접 만든 검증 함수 — contact.js:12](../js/contact.js#L12)

이 폼은 유효성 검사 학습용이다. 서버로 요청을 보내는 `fetch`, Formspree, EmailJS가 연결되어 있지 않으므로 실제 이메일은 전송되지 않는다.

---

## 10. GitHub API와 비동기 처리

이 프로젝트에는 직접 만든 백엔드 서버가 없다. 브라우저가 GitHub REST API라는 외부 서버에 HTTP 요청을 보내고 JSON 응답을 받아 화면을 만든다.

### 10.1 화면 자리 준비

HTML에는 처음부터 프로젝트 카드가 들어 있지 않고 다음 자리만 준비되어 있다.

- 필터 영역: [`.projects-filters` — index.html:73](../index.html#L73)
- 상태 안내: [`.projects-status` — index.html:74](../index.html#L74)
- 재시도 버튼: [`.projects-retry` — index.html:75](../index.html#L75)
- 카드가 들어갈 Grid: [`.projects-grid` — index.html:76](../index.html#L76)
- JavaScript가 없을 때의 안내: [`noscript` — index.html:77](../index.html#L77)

JavaScript가 API 결과에 따라 이 영역들의 내용과 표시 여부를 바꾼다.

### 10.2 API 주소와 상태

- [API 주소와 DOM 선택 — projects.js:1](../js/projects.js#L1)
- [Projects 상태 — projects.js:9](../js/projects.js#L9)

```js
const projectsState = {
  status: 'idle',
  repos: [],
  errorMessage: '',
  selectedLanguage: 'all',
};
```

| 상태 | 의미 | 화면 |
| --- | --- | --- |
| `idle` | 아직 요청 전 | 초기 안내 |
| `loading` | 응답을 기다리는 중 | 로딩 문구와 스피너 |
| `success` | 저장소가 한 개 이상 있음 | 필터와 카드 목록 |
| `empty` | 요청은 성공했지만 배열이 비어 있음 | 빈 상태 안내 |
| `error` | HTTP·네트워크·응답 오류 | 오류 문구와 재시도 버튼 |

성공과 실패만 구분하면 요청 중에 빈 화면이 보이고, 정상적으로 빈 응답도 오류처럼 처리하게 된다. 실제 서비스에서는 이 상태들을 나누는 것이 중요하다.

상태가 실제 화면으로 바뀌는 분기는 [`renderProjects()` — projects.js:78](../js/projects.js#L78)에 모여 있다. `aria-busy`, 상태 클래스, 재시도 버튼, 필터, 카드 Grid와 안내 문구를 같은 `projectsState`를 기준으로 갱신한다.

- 로딩 스피너와 오류 색상: [Projects 상태 CSS — style.css:432](../css/style.css#L432)
- 재시도 버튼 숨김: [`.projects-retry[hidden]` — style.css:455](../css/style.css#L455)

### 10.3 async/await와 fetch

[API 요청 함수 — projects.js:105](../js/projects.js#L105)

`fetch()`는 결과를 즉시 반환하지 않고 Promise를 반환한다. 네트워크 응답에는 시간이 걸리기 때문이다.

- `async`: 함수 안에서 `await`를 사용할 수 있게 한다.
- `await`: Promise가 완료될 때까지 해당 async 함수의 다음 줄 실행을 기다린다.
- 기다리는 동안 브라우저 전체가 멈추는 것은 아니다. 다른 클릭, 화면 그리기 등은 계속 처리된다.

요청 순서는 다음과 같다.

1. 중복 요청 방지를 위해 이미 loading인지 확인한다.
2. 상태를 loading으로 바꾸고 먼저 `renderProjects()`를 호출한다.
3. `fetch(PROJECTS_URL)`로 요청한다.
4. `response.ok`가 false면 HTTP 오류로 처리한다.
5. `response.json()`을 기다려 JSON을 JavaScript 값으로 변환한다.
6. 응답이 기대한 저장소 배열인지 검사한다.
7. 저장소가 있으면 success, 없으면 empty로 상태를 정한다.
8. 실패하면 catch에서 error 상태와 안내 문구를 저장한다.
9. 마지막에 `renderProjects()`를 호출한다.

페이지가 열리면 `main.js`가 `initProjects()`를 호출하고, 초기화 함수 마지막의 [loadProjects() — projects.js:157](../js/projects.js#L157)가 최초 요청을 시작한다. 재시도 버튼도 같은 함수를 다시 호출하므로 최초 요청과 재요청이 한 흐름을 공유한다.

중요한 점은 `fetch`가 404나 500 응답만으로는 항상 catch로 이동하지 않는다는 것이다. 그래서 `response.ok`를 직접 확인하고 Projects 상태를 `error`로 변경한다.

### 10.4 오류 처리

API 함수는 사용자에게 다음 두 종류의 안내를 제공한다.

- 403: GitHub 요청 제한 안내
- 그 밖의 HTTP·네트워크·JSON·응답 형식 실패: 공통 오류 안내

`response.ok`가 `false`이면 HTTP 상태를 확인하고, 네트워크 요청이나 JSON 변환 중 발생한 실패는 `catch`에서 공통 오류 상태로 바꾼다. 미션 핵심 흐름을 분명하게 보여 주기 위해 별도의 요청 시간 제한은 두지 않는다.

[API 오류 처리 — projects.js:112](../js/projects.js#L112)

오류 화면의 재시도 버튼은 새로운 로직을 만들지 않고 같은 `loadProjects()`를 다시 호출한다.

[재시도 이벤트 — projects.js:151](../js/projects.js#L151)

버튼을 누르면 렌더링 과정에서 재시도 버튼 자체가 숨겨질 수 있다. 그래서 버튼에 남아 있던 초점을 상태 안내로 옮기고, 새 요청 상황을 키보드 사용자도 계속 확인할 수 있게 한다.

### 10.5 응답을 카드로 렌더링

- [카드 HTML 생성 — projects.js:22](../js/projects.js#L22)
- [상태별 Projects 렌더링 — projects.js:78](../js/projects.js#L78)

`createProjectCard(repo)`는 저장소 객체 하나를 HTML 카드 문자열 하나로 변환한다. `map(createProjectCard)`는 전체 저장소 배열을 카드 문자열 배열로 바꾸고, `join('')`으로 합쳐 `innerHTML`에 넣는다.

- 카드가 배치되는 반응형 Grid: [`.projects-grid` — style.css:388](../css/style.css#L388)
- 동적으로 생성되는 카드 모양: [`.project-card` — style.css:353](../css/style.css#L353)

외부 API 데이터는 신뢰할 수 없는 입력으로 취급해야 한다. 저장소 이름과 설명을 그대로 `innerHTML`에 넣으면 문자열에 포함된 태그가 HTML로 해석될 수 있다. `escapeHTML()`로 특수 문자를 변환한 뒤 사용한다.

[외부 문자열 이스케이프 — projects.js:17](../js/projects.js#L17)

저장소 링크도 API가 제공한 URL을 그대로 쓰지 않고, 확인된 GitHub 사용자명과 인코딩한 저장소 이름으로 직접 구성한다.

### 10.6 언어 필터

- [언어 목록 생성 — projects.js:42](../js/projects.js#L42)
- [필터 적용 — projects.js:48](../js/projects.js#L48)
- [필터 버튼 HTML 생성 — projects.js:54](../js/projects.js#L54)
- [필터 영역 렌더링 — projects.js:59](../js/projects.js#L59)
- [필터 클릭 이벤트 — projects.js:134](../js/projects.js#L134)
- [필터 버튼 CSS — style.css:404](../css/style.css#L404)

1. `map`으로 각 저장소의 언어만 꺼낸다.
2. `filter`로 언어 정보가 없는 값을 제거한다.
3. `Set`으로 중복 언어를 제거한다.
4. 필터 버튼을 만든다.
5. 버튼 클릭 시 `selectedLanguage`를 바꾼다.
6. `renderProjects()`가 선택 언어와 일치하는 저장소만 다시 그린다.
7. 다시 만들어진 선택 버튼을 찾아 키보드 초점을 복원한다.

필터링은 API를 다시 호출하지 않는다. 처음 받은 `projectsState.repos`에서 화면에 보여 줄 항목만 선택한다.

---

## 11. ES6+ 문법과 배열 메서드

### 11.1 화살표 함수

```js
const getScrollBehavior = () => reducedMotionMedia.matches ? 'instant' : 'smooth';
```

함수를 값처럼 변수에 저장하거나 이벤트 콜백으로 전달할 때 간결하게 사용할 수 있다.

[화살표 함수 예시 — navigation.js:28](../js/navigation.js#L28)

### 11.2 템플릿 리터럴

백틱으로 문자열을 만들면 `${표현식}`으로 값을 넣고 여러 줄 HTML도 작성할 수 있다.

[프로젝트 카드 템플릿 — projects.js:29](../js/projects.js#L29)

### 11.3 구조분해 할당

```js
const { name, description, language, stargazers_count } = repo;
```

객체에서 필요한 속성을 같은 이름의 변수로 한 번에 꺼낸다. `repo.name`을 반복하는 것보다 어떤 값을 사용할지 명확하다.

[저장소 구조분해 — projects.js:23](../js/projects.js#L23)

### 11.4 map, filter, forEach

| 메서드 | 반환값과 목적 | 프로젝트 사용 예 |
| --- | --- | --- |
| `map` | 각 항목을 변환한 **새 배열** 반환 | 저장소 → 카드 HTML |
| `filter` | 조건을 통과한 항목의 **새 배열** 반환 | 선택 언어 저장소만 유지 |
| `forEach` | 각 항목에 동작 수행, 새 배열이 목적은 아님 | 여러 링크에 이벤트 연결 |

- [map으로 카드 생성 — projects.js:89](../js/projects.js#L89)
- [filter로 프로젝트 선택 — projects.js:48](../js/projects.js#L48)
- [forEach로 이벤트 연결 — navigation.js:57](../js/navigation.js#L57)

---

## 12. 접근성과 실패 대비

이 프로젝트의 기능은 마우스와 정상 네트워크만 가정하지 않는다.

| 대비 항목 | HTML 준비 | JavaScript 또는 CSS 구현 |
| --- | --- | --- |
| 메뉴 열림 상태 | [`aria-expanded` — index.html:16](../index.html#L16) | [`renderMenu()`에서 값 변경 — navigation.js:17](../js/navigation.js#L17) |
| 테마 선택 상태 | [`aria-pressed` — index.html:27](../index.html#L27) | [`renderTheme()`에서 값 변경 — theme.js:18](../js/theme.js#L18) |
| 폼 오류 관계와 안내 | [`aria-describedby`, `aria-live` — index.html:86](../index.html#L86) | [`textContent`, `aria-invalid` 변경 — contact.js:24](../js/contact.js#L24) |
| 첫 오류 필드 초점 | 입력 요소의 `id`와 `name` | [`firstInvalidField.focus()` — contact.js:62](../js/contact.js#L62) |
| API 요청 중 상태 | [`aria-busy="false"` — index.html:76](../index.html#L76) | [상태에 따라 값 변경 — projects.js:78](../js/projects.js#L78) |
| 재시도 후 초점 유지 | 상태 문단의 [`tabindex="-1"` — index.html:74](../index.html#L74) | [`projectsStatus.focus()` — projects.js:154](../js/projects.js#L154) |
| 동작 줄이기 | 운영체제의 사용자 설정 | [이동·Observer 분기 — navigation.js:28](../js/navigation.js#L28), [transition·animation 제거 — style.css:687](../css/style.css#L687) |
| JavaScript 미실행 | [`noscript` 안내 — index.html:77](../index.html#L77) | HTML만으로 GitHub 링크와 안내 제공 |

ARIA 속성은 대부분 화면 모양을 직접 바꾸지 않고 보조 기술에 의미와 상태를 전달한다. 다만 이 프로젝트의 `aria-invalid="true"`처럼 CSS 선택자로도 사용하면 시각적 오류 테두리까지 함께 적용할 수 있다.

[ARIA 오류 상태를 사용하는 CSS — style.css:558](../css/style.css#L558)

---

## 13. 개발자 도구로 직접 확인하기

### DOM과 클래스

1. Chrome 개발자 도구의 Elements를 연다.
2. 모바일 크기로 바꾸고 햄버거 버튼을 누른다.
3. `.nav-list`에 `active` 클래스가 추가되는지 확인한다.
4. `<html>`을 선택하고 테마 버튼을 누른다.
5. `data-theme` 값이 `light`와 `dark` 사이에서 바뀌는지 확인한다.

코드 대조: [`renderMenu()` — navigation.js:17](../js/navigation.js#L17), [`renderTheme()` — theme.js:18](../js/theme.js#L18), [메뉴 CSS — style.css:145](../css/style.css#L145), [테마 CSS — style.css:27](../css/style.css#L27)

### localStorage

1. Application → Local Storage를 연다.
2. 테마 버튼을 누른다.
3. `portfolio-theme` 값이 바뀌는지 확인한다.
4. 새로고침 후에도 같은 테마인지 확인한다.

코드 대조: [`getSavedTheme()` — theme.js:6](../js/theme.js#L6), [`saveTheme()` — theme.js:26](../js/theme.js#L26)

### GitHub API

1. Network 패널을 열고 페이지를 새로고침한다.
2. `repos?sort=updated...` 요청을 선택한다.
3. Status, Response, Timing을 확인한다.
4. 로딩 중에는 `projectsState.status`가 loading이고 응답 후 success 또는 empty가 되는 흐름을 코드와 비교한다.

코드 대조: [`projectsState` — projects.js:9](../js/projects.js#L9), [`renderProjects()` — projects.js:78](../js/projects.js#L78), [`loadProjects()` — projects.js:105](../js/projects.js#L105)

### Contact 상태

1. 빈 상태로 입력 확인 버튼을 누른다.
2. 필드 근처 오류와 첫 필드 초점 이동을 확인한다.
3. 이메일 형식을 틀리게 입력한다.
4. 정상 형식으로 수정할 때 해당 오류만 사라지는지 확인한다.

코드 대조: [`validateContactField()` — contact.js:12](../js/contact.js#L12), [`renderContactForm()` — contact.js:24](../js/contact.js#L24), [`input`·`submit` 이벤트 — contact.js:40](../js/contact.js#L40)

---

## 14. 설명 연습 질문

### 왜 상태와 렌더 함수를 분리했나요?

이벤트마다 DOM을 제각각 수정하지 않고 현재 상태를 먼저 정한 다음 렌더 함수가 화면을 책임지게 하기 위해서다. 상태 변화와 화면 결과를 추적하기 쉽고 같은 렌더 로직을 초기화, 클릭, API 결과에서 재사용할 수 있다.

코드 예: [`projectsState` — projects.js:9](../js/projects.js#L9), [`renderProjects()` — projects.js:78](../js/projects.js#L78)

### 이 프로젝트에 백엔드가 있나요?

직접 만든 백엔드는 없다. 브라우저가 GitHub REST API에 직접 요청하는 정적 프론트엔드다. 대신 비동기 요청, HTTP 오류, 응답 검증, 로딩·성공·빈·오류 상태처럼 서버 연동에 필요한 기본 흐름을 구현했다.

코드 예: [`PROJECTS_URL` — projects.js:1](../js/projects.js#L1), [`fetch()` — projects.js:113](../js/projects.js#L113)

### fetch에 try/catch만 사용하면 HTTP 오류도 모두 잡히나요?

아니다. fetch는 네트워크 자체가 실패하면 reject되지만 404나 500 같은 HTTP 응답은 Response 객체를 반환할 수 있다. 따라서 `response.ok`를 직접 확인해야 한다.

코드 예: [`response.ok` 확인 — projects.js:114](../js/projects.js#L114)

### textContent와 innerHTML의 차이는 무엇인가요?

`textContent`는 값을 글자로 취급하고 `innerHTML`은 HTML로 해석한다. 동적인 카드 마크업에는 innerHTML이 필요하지만, 외부 API 문자열은 태그로 해석되지 않도록 먼저 이스케이프한다.

코드 예: [폼의 `textContent` — contact.js:27](../js/contact.js#L27), [카드의 `innerHTML` — projects.js:89](../js/projects.js#L89), [`escapeHTML()` — projects.js:17](../js/projects.js#L17)

### Flexbox와 Grid를 어디에 사용했나요?

한 행 중심인 내비게이션에는 Flexbox를 사용했고, 화면 너비에 따라 여러 행과 열이 바뀌는 프로젝트 카드 목록에는 Grid의 `auto-fit`과 `minmax()`를 사용했다.

코드 예: [내비게이션 Flexbox — style.css:129](../css/style.css#L129), [Projects Grid — style.css:388](../css/style.css#L388)

### localStorage는 서버 저장인가요?

아니다. 현재 브라우저와 출처에 저장되는 문자열 저장소다. 다른 기기와 동기화되지 않으며 접근이 제한될 수도 있어 예외 처리를 했다.

코드 예: [읽기 예외 처리 — theme.js:6](../js/theme.js#L6), [쓰기 예외 처리 — theme.js:26](../js/theme.js#L26)

### empty와 error 상태를 왜 나누나요?

empty는 요청이 정상적으로 성공했지만 데이터가 없는 상태이고, error는 요청이나 응답 처리에 실패한 상태다. 원인과 사용자가 취할 행동이 다르므로 안내 UI도 달라야 한다.

코드 예: [API 결과 상태 결정 — projects.js:112](../js/projects.js#L112), [상태별 문구 렌더링 — projects.js:87](../js/projects.js#L87)

---

## 15. 마지막으로 기억할 것

이 프로젝트 전체를 한 문장으로 설명하면 다음과 같다.

> HTML로 의미 구조를 만들고 CSS로 반응형 화면을 구성한 뒤, JavaScript 이벤트와 비동기 API가 상태를 변경하면 전용 렌더 함수가 DOM을 갱신하도록 구현했다.

코드를 공부할 때는 함수 이름만 외우기보다 항상 다음 네 질문으로 따라가면 된다.

1. 무엇이 이 함수를 호출하는가?
2. 어떤 상태나 입력값을 읽는가?
3. 어떤 상태를 변경하는가?
4. 어떤 DOM 변화가 사용자 화면에 나타나는가?
