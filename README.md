# 별별선생 · 별별정보 블로그 (빈 껍데기)

크롤러가 읽을 수 있는 완결 HTML을 자동 생성하는 Astro 블로그 골격입니다.
글은 `src/content/posts/` 에 파일로 넣거나, 이후 CMS(Decap/Sanity 등)를 붙여 관리합니다.

## 최초 1회 (본인)
1. Node.js 설치 후, 이 폴더에서:
   ```
   npm install
   npm run dev      # http://localhost:4321/blog 미리보기
   ```
2. `astro.config.mjs` 의 site/base 를 실제 배포 주소로 변경.

## 새 글 추가하는 법
1. `src/content/posts/` 에 `.md` 파일 하나 생성 (파일명이 주소가 됨).
2. 맨 위 `---` 사이에 글 정보(제목·요약·카테고리·발행일 등) 입력.
3. 그 아래에 **원본 에디터에서 복사한 인라인 HTML 본문**을 그대로 붙여넣기.
4. `draft: false` 로 두면 발행. 저장 후 빌드(또는 CMS 발행) 시 자동 반영.

- 예시 글: `src/content/posts/2027-kinder-visit-checklist.md`
- 사용법 초안: `src/content/posts/_사용법.md` (draft)

## 본문 정제(선택)
`src/lib/normalizeBody.ts` : line-height:2→1.7, justify 제거, th scope 보강.
붙여넣기 전에 한 번 돌리거나, 빌드 파이프라인에 연결 가능.

## 자동으로 처리되는 것
- `<head>` title·description·canonical·OpenGraph
- 글 제목 h1 (본문 h2 계층과 분리)
- JSON-LD: BlogPosting + (faq 입력 시) FAQPage
- 목록 페이지 자동 정렬(최신순), 원본 게시판 링크 박스
- 별별선생 디자인 토큰(Pretendard, 보라 primary, radius) 반영

## 배포
정적 파일이라 Netlify / Vercel / Cloudflare Pages 어디든 가능.
CMS + 자동배포(웹훅/Git)를 붙이면 개발자 없이 발행 가능.

## v2 추가 기능 (2026-08)
- 블로그 내부 검색: `/blog/search` (제목·요약·카테고리 필터, `search.json` 인덱스 자동 생성)
- 헤더 돋보기 → 내부 검색으로 연결
- 빈 카테고리: 콘텐츠 있는 카테고리 우선 + 없으면 사이드바에 '준비중' 표시
- 최신 글 중복 제거: '방금 올라온 글'은 '전체 글'에서 제외 (글 1개면 hero 숨김)
- 본문 하단 CTA 배너 (유치원=오렌지, 그 외=보라, 카테고리별 문구 자동)
- 뉴스레터 구독 폼 (사이드바) — 데모 동작, 메일 서비스 연동 시 실제 발송
- 관련 추천 글: 같은 카테고리 우선 3개
- OG/Twitter 태그 포스트별 동적 할당 (title·description·image)

## v3 변경 (2026-08)
- 예시 글 3편 추가: 수능 D-100 / 공무원 직렬 선택 / 자소서 첫 문장
- 카테고리 고정 컬러 시스템: src/lib/categories.ts 에서 색상·원본 URL 한곳 관리
  (공무원=파랑, 영어=청록, 유치원·수능/내신=주황, 취업/자격증=초록)
- 원본 게시판 링크: 카테고리별 실제 URL로 연결 (gong1 / high / certificate / kindergarten)
- 사이드바 MAIN 이모지 제거
- 새 카테고리 추가/색상 변경은 categories.ts 만 수정하면 전 영역 반영
