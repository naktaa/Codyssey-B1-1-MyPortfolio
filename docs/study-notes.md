# B1-1 포트폴리오 학습 노트

이 문서는 완성된 화면을 소개하는 README와 달리, **웹이 어떻게 동작하는지 이해하고 코드를 직접 설명하기 위한 자료**다. 각 링크를 누르면 실제 구현 위치를 확인할 수 있다.

## 1. 먼저 이해할 전체 흐름

이 프로젝트는 다음 세 파일이 역할을 나눠 가진다.

| 파일 | 역할 | 시작 위치 |
| --- | --- | --- |
| HTML | 화면에 존재할 콘텐츠와 의미 구조를 만든다. | [문서 시작 — index.html:1](../index.html#L1) |
| CSS | HTML 요소의 배치, 크기, 색상과 반응형 화면을 정의한다. | [CSS 변수 — style.css:2](../css/style.css#L2) |
| JavaScript | 사용자 이벤트를 받고 상태와 DOM을 변경한다. | [DOM 선택 — main.js:1](../js/main.js#L1) |

브라우저가 페이지를 여는 순서는 다음과 같다.

1. HTML을 위에서 아래로 읽어 DOM 트리를 만든다.
2. `<link>`로 연결한 CSS를 적용해 화면을 그린다.
3. `defer`가 붙은 JavaScript는 HTML 분석을 막지 않고 내려받은 뒤, DOM 구성이 끝나면 실행된다.
4. JavaScript가 요소를 선택하고 이벤트를 연결한다.
5. 사용자가 클릭·입력·스크롤하면 이벤트 처리 함수가 실행된다.
6. 처리 함수가 상태를 바꾸고 렌더 함수를 호출한다.
7. 렌더 함수가 텍스트, 클래스, 속성 또는 HTML을 바꾸면 화면도 달라진다.

[CSS와 defer JavaScript 연결 — index.html:9](../index.html#L9)

이 미션에서 가장 중요한 문장은 다음과 같다.

> 사용자 이벤트 → 상태 변경 → DOM 업데이트 → 화면 변화

CSS만 바뀌는 것은 디자인 변경이다. JavaScript가 사용자의 행동을 받아 상태와 DOM을 바꾸는 과정까지 이해해야 인터랙티브 웹의 원리를 설명할 수 있다.

---

## 2. HTML: 화면의 의미와 뼈대

### 2.1 HTML과 DOM의 차이

HTML은 파일에 작성한 마크업이고, DOM(Document Object Model)은 브라우저가 HTML을 읽어 메모리에 만든 객체 구조다. JavaScript는 HTML 파일 자체를 고치는 것이 아니라 현재 페이지의 DOM 객체를 변경한다.

예를 들어 JavaScript에서 `document.querySelector('.theme-toggle')`을 실행하면 HTML 문자열을 검색하는 것이 아니라 DOM 트리에서 해당 클래스를 가진 첫 번째 요소 객체를 가져온다.

[주요 DOM 요소 선택 — main.js:1](../js/main.js#L1)

### 2.2 시맨틱 태그를 사용한 이유

`div`는 의미 없는 범용 상자다. 반면 시맨틱 태그는 영역의 역할을 이름으로 표현한다.

| 태그 | 이 프로젝트에서의 역할 | 코드 |
| --- | --- | --- |
| `header` | 페이지 상단 내비게이션 영역 | [header — index.html:13](../index.html#L13) |
| `nav` | 섹션 이동 링크 모음 | [nav — index.html:14](../index.html#L14) |
| `main` | 페이지의 핵심 콘텐츠 | [main — index.html:33](../index.html#L33) |
| `section` | Hero, About, Skills, Projects, Contact 구분 | [Hero section — index.html:34](../index.html#L34) |
| `article` | 독립적으로 이해할 수 있는 저장소 카드 | [동적 article — main.js:251](../js/main.js#L251) |
| `footer` | 저작권과 소셜 링크 | [footer — index.html:108](../index.html#L108) |

시맨틱 태그를 사용하면 개발자가 구조를 읽기 쉽고, 검색 엔진과 보조 기술도 각 영역의 역할을 더 잘 파악할 수 있다.

Projects의 `article`은 초기 HTML에 직접 적혀 있지 않다. GitHub API 응답을 받은 뒤 `createProjectCard`가 문자열로 만들고 `innerHTML`로 DOM에 삽입한다. 따라서 개발자 도구의 Elements 패널에서는 카드가 `article`로 나타난다.

### 2.3 앵커 링크와 id의 연결

`href="#projects"`는 `id="projects"`인 요소를 가리킨다. 이 연결 덕분에 JavaScript가 없어도 브라우저의 기본 앵커 이동이 가능하다.

- 내비게이션 링크: [index.html:19](../index.html#L19)
- Projects 섹션: [index.html:67](../index.html#L67)
- JavaScript 부드러운 이동: [moveToSection — main.js:70](../js/main.js#L70)

JavaScript는 기본 이동을 `preventDefault()`로 막고 `scrollIntoView()`를 호출한다. Ctrl·Command 같은 보조키 클릭은 새 탭 등 브라우저 기본 동작을 유지하도록 예외 처리한다.

### 2.4 폼 label과 입력 요소

`label`의 `for="contact-email"`과 입력 요소의 `id="contact-email"`이 같으면 라벨을 눌러도 입력창에 초점이 간다. 화면 읽기 프로그램도 라벨과 입력창의 관계를 이해할 수 있다.

[Contact 폼 구조 — index.html:80](../index.html#L80)

`aria-describedby="contact-email-error"`는 입력창과 오류 문구를 연결하고, `aria-live="polite"`는 오류 문구가 바뀌었음을 보조 기술에 무리 없이 전달한다.

---

## 3. CSS: 화면 배치와 반응형 원리

### 3.1 선택자와 클래스

CSS 선택자는 어떤 HTML 요소에 규칙을 적용할지 정한다.

- `.project-card`: 해당 클래스를 가진 모든 프로젝트 카드
- `.site-header.scrolled`: `site-header`와 `scrolled` 클래스를 동시에 가진 요소
- `[data-theme="dark"]`: `data-theme` 속성값이 `dark`인 요소
- `.scroll-top[hidden]`: `scroll-top` 클래스와 `hidden` 속성을 함께 가진 요소

JavaScript가 클래스를 추가하거나 속성을 변경하면 다른 CSS 선택자가 일치하면서 화면 모양이 바뀐다. 이것이 JavaScript와 CSS가 협력하는 기본 방식이다.

### 3.2 CSS 변수와 테마

밝은 테마의 색상·간격·그림자는 `:root`에 변수로 모았다.

[밝은 테마 변수 — style.css:2](../css/style.css#L2)

다크 모드에서는 레이아웃을 다시 작성하지 않고 같은 변수 이름의 값만 덮어쓴다.

[다크 테마 변수 — style.css:27](../css/style.css#L27)

예를 들어 `body`는 항상 `background: var(--color-bg)`를 사용한다. JavaScript가 `<html>`에 `data-theme="dark"`를 지정하면 `--color-bg` 값이 어두운 색으로 바뀌고, 그 변수를 사용하는 모든 요소가 함께 변경된다.

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

[모바일 메뉴 기본 상태 — style.css:145](../css/style.css#L145)  
[데스크톱 메뉴 전환 — style.css:614](../css/style.css#L614)

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

[카드 효과 — style.css:353](../css/style.css#L353)

transition은 시작 상태와 끝 상태 사이를 브라우저가 부드럽게 계산하게 한다. hover는 마우스 환경의 피드백이고, 키보드 사용자를 위해 `:focus-visible`도 별도로 제공한다.

[키보드 초점 표시 — style.css:102](../css/style.css#L102)

---

## 4. JavaScript 기초: DOM 선택과 이벤트

### 4.1 const와 let

- `const`: 변수에 다른 값을 다시 대입하지 않을 때 사용한다.
- `let`: 상태처럼 값이 바뀌어야 할 때 사용한다.
- 객체를 `const`로 선언해도 객체 내부 속성은 바꿀 수 있다. 변수 자체가 다른 객체를 가리키도록 재대입하는 것만 막는다.

이 프로젝트에서 DOM 요소 참조와 설정값은 대부분 `const`이고, 테마와 메뉴처럼 값 자체가 바뀌는 상태는 `let`이다.

[DOM 요소 상수 — main.js:1](../js/main.js#L1)  
[변경되는 테마 상태 — main.js:23](../js/main.js#L23)  
[변경되는 메뉴 상태 — main.js:54](../js/main.js#L54)

### 4.2 querySelector와 querySelectorAll

`querySelector`는 CSS 선택자와 일치하는 첫 요소를 반환하고, `querySelectorAll`은 일치하는 모든 요소를 NodeList로 반환한다.

```js
const menuToggle = document.querySelector('.menu-toggle');
const anchorLinks = document.querySelectorAll('a[href^="#"]');
```

`anchorLinks`에는 여러 링크가 들어 있으므로 `forEach`로 하나씩 이벤트를 연결한다.

[요소 선택 — main.js:1](../js/main.js#L1)  
[앵커 이벤트 반복 연결 — main.js:95](../js/main.js#L95)

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

[메뉴 클릭 이벤트 — main.js:90](../js/main.js#L90)

HTML의 `onclick` 속성을 사용하지 않았기 때문에 HTML은 구조, JavaScript는 동작이라는 역할 분리가 유지된다.

### 4.4 DOM을 변경하는 방법

| API | 역할 | 사용 위치 |
| --- | --- | --- |
| `textContent` | 요소 안의 글자를 안전하게 변경 | [폼 오류 문구 — main.js:186](../js/main.js#L186) |
| `innerHTML` | HTML 문자열을 실제 요소로 생성 | [프로젝트 카드 목록 — main.js:307](../js/main.js#L307) |
| `classList.add` | 클래스 추가 | [애니메이션 대기 — main.js:155](../js/main.js#L155) |
| `classList.remove` | 클래스 제거 | [요소 표시 — main.js:146](../js/main.js#L146) |
| `classList.toggle` | 조건에 따라 클래스 추가·제거 | [메뉴 렌더링 — main.js:57](../js/main.js#L57) |
| `setAttribute` | HTML 속성 변경 | [테마 렌더링 — main.js:25](../js/main.js#L25) |

`textContent`는 글자를 HTML로 해석하지 않는다. `innerHTML`은 문자열을 HTML로 해석하므로 외부 API 값을 넣을 때 반드시 안전하게 처리해야 한다.

---

## 5. 상태와 렌더링

### 5.1 상태란 무엇인가

상태는 현재 화면을 결정하는 값이다. 예를 들어 메뉴가 열렸는지, 테마가 무엇인지, 폼에 오류가 있는지, API 요청이 끝났는지가 상태다.

| 기능 | 상태 | 렌더 함수 |
| --- | --- | --- |
| 테마 | `currentTheme` | `renderTheme()` |
| 모바일 메뉴 | `isMenuOpen` | `renderMenu()` |
| Contact | `contactState` | `renderContactForm()` |
| Projects | `projectsState` | `renderProjects()` |

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

---

## 6. 다크 모드와 localStorage

### 관련 코드

- [저장값 읽기 — main.js:13](../js/main.js#L13)
- [테마 상태 — main.js:23](../js/main.js#L23)
- [화면 렌더링 — main.js:25](../js/main.js#L25)
- [저장 — main.js:33](../js/main.js#L33)
- [클릭 이벤트 — main.js:41](../js/main.js#L41)

### 동작 순서

1. 페이지가 열리면 `getSavedTheme()`이 `localStorage`에서 `portfolio-theme` 값을 읽는다.
2. 저장값이 `dark`면 다크 모드, 그 외에는 밝은 모드를 초기 상태로 사용한다.
3. `renderTheme()`이 `<html>`의 `data-theme`, 버튼의 ARIA 상태, 아이콘을 갱신한다.
4. 사용자가 버튼을 클릭하면 `currentTheme`이 반대 값으로 바뀐다.
5. 화면을 다시 렌더링하고 `saveTheme()`으로 선택값을 저장한다.
6. 새로고침해도 1번에서 저장값을 다시 읽기 때문에 테마가 유지된다.

`localStorage`는 같은 출처에서 브라우저를 닫거나 새로고침해도 남는 문자열 저장소다. 서버나 데이터베이스에 저장하는 것이 아니므로 다른 기기나 브라우저와 공유되지 않는다.

저장소 접근이 차단될 수도 있어 읽기와 쓰기를 `try/catch`로 감쌌다. 저장에 실패하더라도 현재 페이지의 테마 전환은 계속 동작한다.

---

## 7. 모바일 메뉴와 스크롤 기능

### 7.1 메뉴 상태

`isMenuOpen`은 `true` 또는 `false`만 가지는 불리언 상태다. `renderMenu()`는 이 값으로 다음 세 가지를 동시에 갱신한다.

- 메뉴의 `active` 클래스
- 버튼의 `aria-expanded`
- 버튼의 접근성 이름

[메뉴 상태와 렌더링 — main.js:54](../js/main.js#L54)

CSS는 `.nav-list.active`일 때만 메뉴를 표시한다.

[컴팩트 모바일 메뉴 — style.css:148](../css/style.css#L148)

메뉴 링크 선택, Escape, 메뉴 바깥 클릭, 화면 폭 변경에서도 `closeMenu()`를 재사용한다. 닫기 규칙을 한 함수에 모으면 모든 경로가 같은 상태 변경을 사용한다.

[메뉴 닫기와 부드러운 이동 — main.js:63](../js/main.js#L63)  
[Escape·바깥 클릭 — main.js:114](../js/main.js#L114)  
[화면 폭 변경 — main.js:127](../js/main.js#L127)

### 7.2 스크롤 상태

`updateScrollUI()`는 현재 `window.scrollY`를 읽는다.

- 60px 이상: 헤더에 `scrolled` 클래스 추가
- 300px 이상: 맨 위로 버튼 표시

[스크롤 기준값과 렌더링 — main.js:49](../js/main.js#L49)  
[scroll 이벤트 연결 — main.js:132](../js/main.js#L132)

스크롤 이벤트는 매우 자주 발생하므로 `{ passive: true }`로 브라우저에 기본 스크롤을 막지 않는 리스너임을 알려 준다.

---

## 8. Intersection Observer 애니메이션

스크롤 이벤트에서 모든 요소의 위치를 계속 계산하는 대신 Intersection Observer가 요소와 화면의 교차 상태를 알려 준다.

[Observer 초기화 — main.js:138](../js/main.js#L138)

1. HTML에서 애니메이션 대상에 `data-reveal`을 표시한다.
2. JavaScript가 대상에 `reveal-pending` 클래스를 추가해 대기 상태로 만든다.
3. 요소가 화면에 20% 이상 들어오면 클래스를 제거한다.
4. CSS transition으로 투명도와 위치가 부드럽게 바뀐다.
5. `unobserve()`로 관찰을 끝내 애니메이션이 한 번만 실행되게 한다.

관찰 대상은 HTML에 미리 있는 섹션 제목과 Skills 카드다. GitHub API로 나중에 생성되는 프로젝트 카드는 바로 표시해 동적 관찰 로직을 추가하지 않는다.

[애니메이션 CSS — style.css:679](../css/style.css#L679)

JavaScript가 실행되지 않거나 Intersection Observer를 지원하지 않아도 콘텐츠가 보이도록 **기본 CSS는 표시 상태**다. 관찰을 시작할 수 있을 때만 JavaScript가 숨김 클래스를 추가한다.

사용자가 운영체제에서 동작 줄이기를 선택하면 애니메이션을 적용하지 않는다.

[동작 줄이기 대응 — style.css:687](../css/style.css#L687)

---

## 9. Contact 폼 유효성 검사

### 관련 코드

- [폼 HTML — index.html:80](../index.html#L80)
- [폼 상태 — main.js:169](../js/main.js#L169)
- [필드 검증 — main.js:174](../js/main.js#L174)
- [폼 렌더링 — main.js:186](../js/main.js#L186)
- [input 이벤트 — main.js:201](../js/main.js#L201)
- [submit 이벤트 — main.js:209](../js/main.js#L209)

### 상태 구조

```js
const contactState = {
  errors: { name: '', email: '', message: '' },
  status: 'idle',
};
```

`errors`에는 필드별 오류 문구가 들어가고 `status`는 현재 제출 상태를 나타낸다. 빈 문자열은 오류가 없다는 뜻이다.

### input 흐름

1. 사용자가 한 필드의 내용을 바꾼다.
2. `input` 이벤트가 발생한다.
3. `validateContactField(field)`가 공백 제거 후 필수값과 이메일 형식을 검사한다.
4. 해당 필드의 오류만 `contactState.errors`에 저장한다.
5. 이전 성공 결과는 현재 입력과 맞지 않으므로 상태를 `idle`로 되돌린다.
6. `renderContactForm()`이 필드 근처 오류와 `aria-invalid`를 갱신한다.

### submit 흐름

1. `event.preventDefault()`로 실제 페이지 제출과 새로고침을 막는다.
2. 자동완성처럼 input 이벤트가 없었을 가능성까지 고려해 모든 필드를 다시 검사한다.
3. 오류가 하나라도 있으면 상태를 `error`, 없으면 `success`로 바꾼다.
4. 렌더 함수가 성공 문구 또는 필드별 오류를 표시한다.
5. 오류가 있으면 첫 번째 잘못된 필드로 키보드 초점을 옮긴다.

이 폼은 유효성 검사 학습용이다. 서버로 요청을 보내는 `fetch`, Formspree, EmailJS가 연결되어 있지 않으므로 실제 이메일은 전송되지 않는다.

---

## 10. GitHub API와 비동기 처리

이 프로젝트에는 직접 만든 백엔드 서버가 없다. 브라우저가 GitHub REST API라는 외부 서버에 HTTP 요청을 보내고 JSON 응답을 받아 화면을 만든다.

### 10.1 화면 자리 준비

HTML에는 처음부터 프로젝트 카드가 들어 있지 않고 다음 자리만 준비되어 있다.

- 필터 영역
- 상태 안내
- 재시도 버튼
- 카드가 들어갈 Grid

[Projects HTML — index.html:67](../index.html#L67)

JavaScript가 API 결과에 따라 이 영역들의 내용과 표시 여부를 바꾼다.

### 10.2 API 주소와 상태

[API 주소와 DOM 선택 — main.js:230](../js/main.js#L230)
[Projects 상태 — main.js:238](../js/main.js#L238)

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

### 10.3 async/await와 fetch

[API 요청 함수 — main.js:334](../js/main.js#L334)

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

중요한 점은 `fetch`가 404나 500 응답만으로는 항상 catch로 이동하지 않는다는 것이다. 그래서 `response.ok`를 직접 확인하고 Projects 상태를 `error`로 변경한다.

### 10.4 오류 처리

API 함수는 사용자에게 다음 두 종류의 안내를 제공한다.

- 403: GitHub 요청 제한 안내
- 그 밖의 HTTP·네트워크·JSON·응답 형식 실패: 공통 오류 안내

`response.ok`가 `false`이면 HTTP 상태를 확인하고, 네트워크 요청이나 JSON 변환 중 발생한 실패는 `catch`에서 공통 오류 상태로 바꾼다. 미션 핵심 흐름을 분명하게 보여 주기 위해 별도의 요청 시간 제한은 두지 않는다.

[API 오류 처리 — main.js:341](../js/main.js#L341)

오류 화면의 재시도 버튼은 새로운 로직을 만들지 않고 같은 `loadProjects()`를 다시 호출한다.

[재시도 이벤트 — main.js:378](../js/main.js#L378)

### 10.5 응답을 카드로 렌더링

[카드 HTML 생성 — main.js:251](../js/main.js#L251)
[상태별 Projects 렌더링 — main.js:307](../js/main.js#L307)

`createProjectCard(repo)`는 저장소 객체 하나를 HTML 카드 문자열 하나로 변환한다. `map(createProjectCard)`는 전체 저장소 배열을 카드 문자열 배열로 바꾸고, `join('')`으로 합쳐 `innerHTML`에 넣는다.

외부 API 데이터는 신뢰할 수 없는 입력으로 취급해야 한다. 저장소 이름과 설명을 그대로 `innerHTML`에 넣으면 문자열에 포함된 태그가 HTML로 해석될 수 있다. `escapeHTML()`로 특수 문자를 변환한 뒤 사용한다.

[외부 문자열 이스케이프 — main.js:246](../js/main.js#L246)

저장소 링크도 API가 제공한 URL을 그대로 쓰지 않고, 확인된 GitHub 사용자명과 인코딩한 저장소 이름으로 직접 구성한다.

### 10.6 언어 필터

[언어 목록 생성 — main.js:271](../js/main.js#L271)
[필터 적용 — main.js:277](../js/main.js#L277)
[필터 클릭 이벤트 — main.js:361](../js/main.js#L361)

1. `map`으로 각 저장소의 언어만 꺼낸다.
2. `filter`로 언어 정보가 없는 값을 제거한다.
3. `Set`으로 중복 언어를 제거한다.
4. 필터 버튼을 만든다.
5. 버튼 클릭 시 `selectedLanguage`를 바꾼다.
6. `renderProjects()`가 선택 언어와 일치하는 저장소만 다시 그린다.

필터링은 API를 다시 호출하지 않는다. 처음 받은 `projectsState.repos`에서 화면에 보여 줄 항목만 선택한다.

---

## 11. ES6+ 문법과 배열 메서드

### 11.1 화살표 함수

```js
const getScrollBehavior = () => reducedMotionMedia.matches ? 'instant' : 'smooth';
```

함수를 값처럼 변수에 저장하거나 이벤트 콜백으로 전달할 때 간결하게 사용할 수 있다.

[화살표 함수 예시 — main.js:68](../js/main.js#L68)

### 11.2 템플릿 리터럴

백틱으로 문자열을 만들면 `${표현식}`으로 값을 넣고 여러 줄 HTML도 작성할 수 있다.

[프로젝트 카드 템플릿 — main.js:258](../js/main.js#L258)

### 11.3 구조분해 할당

```js
const { name, description, language, stargazers_count } = repo;
```

객체에서 필요한 속성을 같은 이름의 변수로 한 번에 꺼낸다. `repo.name`을 반복하는 것보다 어떤 값을 사용할지 명확하다.

[저장소 구조분해 — main.js:251](../js/main.js#L251)

### 11.4 map, filter, forEach

| 메서드 | 반환값과 목적 | 프로젝트 사용 예 |
| --- | --- | --- |
| `map` | 각 항목을 변환한 **새 배열** 반환 | 저장소 → 카드 HTML |
| `filter` | 조건을 통과한 항목의 **새 배열** 반환 | 선택 언어 저장소만 유지 |
| `forEach` | 각 항목에 동작 수행, 새 배열이 목적은 아님 | 여러 링크에 이벤트 연결 |

- [map으로 카드 생성 — main.js:318](../js/main.js#L318)
- [filter로 프로젝트 선택 — main.js:277](../js/main.js#L277)
- [forEach로 이벤트 연결 — main.js:95](../js/main.js#L95)

---

## 12. 접근성과 실패 대비

이 프로젝트의 기능은 마우스와 정상 네트워크만 가정하지 않는다.

- 버튼 상태를 `aria-expanded`, `aria-pressed`로 전달한다.
- 폼 오류를 `aria-describedby`, `aria-invalid`, `aria-live`로 연결한다.
- 오류 발생 시 첫 번째 잘못된 입력으로 초점을 옮긴다.
- API 로딩 상태를 `aria-busy`로 전달한다.
- 재시도 후 사라지는 버튼 대신 상태 안내에 초점을 둔다.
- `prefers-reduced-motion` 사용자는 부드러운 이동과 애니메이션을 줄인다.
- JavaScript가 꺼진 경우 Projects에 GitHub 링크 안내를 제공한다.

[메뉴 접근성 속성 — index.html:16](../index.html#L16)  
[폼 접근성 구조 — index.html:83](../index.html#L83)  
[Projects 접근성 구조 — index.html:73](../index.html#L73)  
[동작 줄이기 처리 — main.js:141](../js/main.js#L141)

---

## 13. 개발자 도구로 직접 확인하기

### DOM과 클래스

1. Chrome 개발자 도구의 Elements를 연다.
2. 모바일 크기로 바꾸고 햄버거 버튼을 누른다.
3. `.nav-list`에 `active` 클래스가 추가되는지 확인한다.
4. `<html>`을 선택하고 테마 버튼을 누른다.
5. `data-theme` 값이 `light`와 `dark` 사이에서 바뀌는지 확인한다.

### localStorage

1. Application → Local Storage를 연다.
2. 테마 버튼을 누른다.
3. `portfolio-theme` 값이 바뀌는지 확인한다.
4. 새로고침 후에도 같은 테마인지 확인한다.

### GitHub API

1. Network 패널을 열고 페이지를 새로고침한다.
2. `repos?sort=updated...` 요청을 선택한다.
3. Status, Response, Timing을 확인한다.
4. 로딩 중에는 `projectsState.status`가 loading이고 응답 후 success 또는 empty가 되는 흐름을 코드와 비교한다.

### Contact 상태

1. 빈 상태로 입력 확인 버튼을 누른다.
2. 필드 근처 오류와 첫 필드 초점 이동을 확인한다.
3. 이메일 형식을 틀리게 입력한다.
4. 정상 형식으로 수정할 때 해당 오류만 사라지는지 확인한다.

---

## 14. 설명 연습 질문

### 왜 상태와 렌더 함수를 분리했나요?

이벤트마다 DOM을 제각각 수정하지 않고 현재 상태를 먼저 정한 다음 렌더 함수가 화면을 책임지게 하기 위해서다. 상태 변화와 화면 결과를 추적하기 쉽고 같은 렌더 로직을 초기화, 클릭, API 결과에서 재사용할 수 있다.

### 이 프로젝트에 백엔드가 있나요?

직접 만든 백엔드는 없다. 브라우저가 GitHub REST API에 직접 요청하는 정적 프론트엔드다. 대신 비동기 요청, HTTP 오류, 응답 검증, 로딩·성공·빈·오류 상태처럼 서버 연동에 필요한 기본 흐름을 구현했다.

### fetch에 try/catch만 사용하면 HTTP 오류도 모두 잡히나요?

아니다. fetch는 네트워크 자체가 실패하면 reject되지만 404나 500 같은 HTTP 응답은 Response 객체를 반환할 수 있다. 따라서 `response.ok`를 직접 확인해야 한다.

### textContent와 innerHTML의 차이는 무엇인가요?

`textContent`는 값을 글자로 취급하고 `innerHTML`은 HTML로 해석한다. 동적인 카드 마크업에는 innerHTML이 필요하지만, 외부 API 문자열은 태그로 해석되지 않도록 먼저 이스케이프한다.

### Flexbox와 Grid를 어디에 사용했나요?

한 행 중심인 내비게이션에는 Flexbox를 사용했고, 화면 너비에 따라 여러 행과 열이 바뀌는 프로젝트 카드 목록에는 Grid의 `auto-fit`과 `minmax()`를 사용했다.

### localStorage는 서버 저장인가요?

아니다. 현재 브라우저와 출처에 저장되는 문자열 저장소다. 다른 기기와 동기화되지 않으며 접근이 제한될 수도 있어 예외 처리를 했다.

### empty와 error 상태를 왜 나누나요?

empty는 요청이 정상적으로 성공했지만 데이터가 없는 상태이고, error는 요청이나 응답 처리에 실패한 상태다. 원인과 사용자가 취할 행동이 다르므로 안내 UI도 달라야 한다.

---

## 15. 마지막으로 기억할 것

이 프로젝트 전체를 한 문장으로 설명하면 다음과 같다.

> HTML로 의미 구조를 만들고 CSS로 반응형 화면을 구성한 뒤, JavaScript 이벤트와 비동기 API가 상태를 변경하면 전용 렌더 함수가 DOM을 갱신하도록 구현했다.

코드를 공부할 때는 함수 이름만 외우기보다 항상 다음 네 질문으로 따라가면 된다.

1. 무엇이 이 함수를 호출하는가?
2. 어떤 상태나 입력값을 읽는가?
3. 어떤 상태를 변경하는가?
4. 어떤 DOM 변화가 사용자 화면에 나타나는가?
