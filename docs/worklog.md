# Worklog

## 현재 상태

- **현재 단계:** 2. Feat - HTML 시맨틱 구조
- **상태:** 검토 대기
- **사용자 검토:** 대기
- **다음 예정 작업:** HTML 사용자 검토 후 기본 CSS + 반응형 레이아웃 계획 제안

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

- **상태:** 검토 대기
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
- **검증:** HTML 파서로 시맨틱 태그, ID 중복, 섹션/앵커/label 연결, 로컬 파일 참조, defer 및 인라인 제약 검사를 통과했다. `git diff --check`도 통과했다. 브라우저 직접 검토는 사용자 대기.
- **사용자 검토 결과:** 대기. Stage 1도 별도 확인 전까지 기존 검토 대기 상태를 유지한다.
- **다음 작업:** 사용자 검토 후 Stage 3 계획 및 승인

## Stage 3. 기본 CSS + 반응형 레이아웃

- **상태:** 예정

## Stage 4. 네비게이션/스크롤 인터랙션

- **상태:** 예정

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
