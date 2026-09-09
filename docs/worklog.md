# Worklog

## 현재 상태

- **현재 단계:** 4. Feat - 네비게이션/스크롤 인터랙션
- **상태:** 검토 대기
- **사용자 검토:** 인터랙션 검토 대기
- **다음 예정 작업:** 네비게이션/스크롤 인터랙션 검토

---

## Stage 1. 초기 프로젝트 문서 구성

- **상태:** 검토 대기
- **구현한 내용:**
  - 미션 원문 보관
  - 구현 요구사항 체크리스트 정리
  - Codex 작업 절차 정의
  - README 기본 틀 작성
  - troubleshooting/evidence 구조 준비
- **주요 파일:**
  - `AGENTS.md`
  - `README.md`
  - `docs/mission-original.md`
  - `docs/requirements.md`
  - `docs/worklog.md`
  - `docs/troubleshooting.md`
  - `.gitignore`
  - `.gitattributes`
  - `evidence/.gitkeep`
- **설계 결정:**
  - 초기 구현은 `index.html`, `css/style.css`, `js/main.js` 중심의 단순 구조를 권장한다.
  - 기능이 실제로 커지기 전에는 JavaScript 파일을 과도하게 분리하지 않는다.
  - 상태 → 렌더링 최소 3개 흐름은 테마, GitHub API, 폼 검증으로 충족한다.
  - GitHub API 연동은 DOM/레이아웃/기본 인터랙션 이후 단계로 배치한다.
- **사용자 검토 결과:** 대기
- **다음 작업:** HTML 시맨틱 구조 단계의 계획을 사용자에게 설명하고 승인받은 뒤 구현

---

## Stage 2. HTML 시맨틱 구조

- **상태:** 완료
- **사용자 승인:** HTML 구조 구현 진행 승인. 깔끔하고 은은한 초록색 디자인 요청.
- **구현한 내용:**
  - 시맨틱 태그로 Hero / About / Skills / Projects / Contact / Footer 구성
  - 섹션 앵커 메뉴, CTA 링크, 예시 프로젝트 article 카드 추가
  - 이름/이메일/메시지 입력과 label 연결
  - 외부 CSS 및 defer JavaScript 연결, images 디렉터리 준비
- **주요 파일:** `index.html`, `css/style.css`, `js/main.js`, `images/.gitkeep`, `README.md`, `docs/requirements.md`, `docs/worklog.md`
- **설계 결정:**
  - 이번 단계는 HTML 구조와 파일 연결까지만 구현한다.
  - 다음 CSS 단계에서 깔끔한 레이아웃과 은은한 초록색 포인트를 적용한다.
  - 소개는 임시 문구이며, 프로필 이미지와 소셜 링크는 자료 확정 후 추가한다.
  - GitHub API 연동 전에는 예시 카드임을 표시한다.
  - 폼의 required/type 속성을 준비하되, JavaScript 검증 구현 전 제출 버튼은 비활성화한다.
- **검증:** HTML 파서로 시맨틱 태그, ID 중복, 섹션/앵커/label 연결, 로컬 파일 참조, defer 및 인라인 제약 검사를 통과했다. `git diff --check`도 통과했다. 사용자가 Live Server에서 확인 후 다음 단계 진행을 요청했다.
- **사용자 검토 결과:** 확인 완료. Stage 1은 별도 확인 전까지 기존 검토 대기 상태를 유지한다.
- **다음 작업:** Stage 3 계획 및 승인

## Stage 3. 기본 CSS + 반응형 레이아웃

- **상태:** 완료
- **사용자 승인:** CSS 단계 진행 승인. 깔끔한 구성과 은은한 초록색 방향 유지.
- **구현 내용:**
  - 아이보리 배경, 초록색 포인트, CSS 색상/폰트/간격 변수 및 다크 테마 변수
  - Hero 타이포그래피, 소개 영역, 기술 카드, 프로젝트 카드와 폼 스타일
  - 모바일 퍼스트, 768px/1024px 미디어 쿼리, 메뉴 Flexbox 및 Projects auto-fit/minmax Grid
  - hover/transition/box-shadow, 키보드 초점 표시, prefers-reduced-motion 대응
- **주요 파일:** `index.html`, `css/style.css`, `README.md`, `docs/requirements.md`, `docs/worklog.md`
- **설계 결정:**
  - 테마는 색상 변수를 바꾸고, 화면 폭은 미디어 쿼리로 배치를 바꾸도록 분리한다.
  - 모바일 메뉴 버튼은 비활성 상태로 표시하며 다음 단계에서 이벤트를 연결한다.
  - 프로필 영역은 문자 기반 임시 표시이며 실제 사진은 추후 추가한다.
  - 프로젝트 한 개는 Grid 가용 너비를 채운다. 추가 카드가 생기면 자동으로 열을 나눈다.
  - JavaScript 이벤트/상태 변경은 이번 단계에서 추가하지 않는다.
- **검증:** HTML 참조/label/defer/인라인 제약 및 CSS 필수 규칙 정적 검사 통과. Chrome 데스크톱 스크린샷 확인. 모바일 스크린샷은 요청 폭보다 레이아웃이 넓게 캡처되어 실제 Chrome 기기 모드에서 추가 확인 필요. `git diff --check` 통과.
- **사용자 검토 결과:** CSS 적용 확인 완료. 사용자가 다음 단계 진행을 요청했다.
- **확인 항목:** 390px/768px/1024px 이상에서 가로 넘침, 메뉴 표시 전환, 카드/폼 배치, hover와 Tab 초점 확인
- **다음 작업:** Stage 4 계획 및 승인

## Stage 4. 네비게이션/스크롤 인터랙션

- **상태:** 검토 대기
- **사용자 승인:** 제안한 기능 구현 승인. 기능별 상세 설명과 확인 순서 요청.
- **구현 내용:**
  - 모바일 메뉴 상태와 렌더링 함수 분리, aria-expanded/버튼 접근성 이름 동기화
  - 메뉴 선택/Esc/바깥 클릭 시 닫기, 768px 화면 경계에서 상태 초기화 및 초점 처리
  - 메뉴/CTA/푸터 앵커의 부드러운 이동과 목적지 초점 이동
  - sticky 헤더와 60px 이상 배경/그림자 변경
  - 300px 이상에서 맨 위로 버튼 표시, 초기 및 pageshow 위치 반영
  - prefers-reduced-motion 설정에서 즉시 이동
- **주요 파일:** `index.html`, `css/style.css`, `js/main.js`, `README.md`, `docs/requirements.md`, `docs/worklog.md`
- **설계 결정:**
  - 메뉴는 isMenuOpen → renderMenu 흐름으로 처리하고 닫기 동작을 재사용한다.
  - scroll-margin-top으로 헤더 높이만큼 이동 여유를 두며, 메뉴는 절대 위치로 펼쳐 헤더 높이를 바꾸지 않는다.
  - 스크롤 기준값은 60/300 상수로 분리하고 README에 명시한다.
  - 페이지 내부 이동에서 주소 해시는 변경하지 않는다. 보조키 클릭은 기본 동작을 유지한다.
  - README에 함수 설명과 11개 수동 확인 항목을 작성한다.
- **검증:** V8에서 실제 main.js를 모의 DOM과 실행하여 메뉴 토글/닫기/초점, 섹션 이동, 동작 줄이기, 59/60/299/300/301/0px 경계, pageshow 복원, 화면 폭 전환, 보조키 클릭 검사 통과. 실제 브라우저 배치/스크롤 애니메이션은 사용자 검토 대기.
- **사용자 검토 결과:** 대기
- **다음 작업:** 사용자 기능 확인 후 다크 모드 + localStorage 단계 계획 제안

## Stage 5. 다크 모드 + localStorage

- **상태:** 예정

## Stage 6. Intersection Observer 스크롤 애니메이션

- **상태:** 예정

## Stage 7. Contact 폼 유효성 검사

- **상태:** 예정

## Stage 8. GitHub API + Projects 상태별 렌더링

- **상태:** 예정

## Stage 9. README + evidence

- **상태:** 예정

## Stage 10. GitHub Pages 배포 + 최종 검토

- **상태:** 예정

## Bonus

- **상태:** 선택
