# starteacher-blog

Astro + GitHub Pages 배포용 소스입니다.

## 배포 URL
- 메인: https://kyungmi-cho.github.io/starteacher-blog/
- 검색: https://kyungmi-cho.github.io/starteacher-blog/search/
- 글 상세: https://kyungmi-cho.github.io/starteacher-blog/{slug}/

## GitHub Pages 설정
Repository Settings → Pages → Build and deployment → Source를 **GitHub Actions**로 설정합니다.
`main` 브랜치에 push하면 `.github/workflows/deploy.yml`이 `dist`를 빌드하여 배포합니다.

## 주요 수정 사항
- `src/pages/blog/*` → `src/pages/*`로 이동하여 `/blog` 경로 제거
- 모든 내부 링크를 `import.meta.env.BASE_URL` 기준으로 생성
- 검색 JSON 및 검색 결과 링크도 저장소 base 경로와 일치하도록 수정
- LNB 카테고리별 컬러 inline style 제거 및 중립 색상으로 통일
- `trailingSlash: 'always'`, directory build로 GitHub Pages 정적 경로 안정화

## v4 변경 (2026-08) — 구조·탐색·상세 개편
- 카테고리 페이지 신설: /category/{slug}/ — 클릭 시 검색이 아니라 해당 카테고리 글 목록 노출
  (슬러그: 공무원=gongmuwon, 영어=english, 유치원=kindergarten, 수능/내신=suneung, 취업/자격증=jobs)
- 검색 페이지를 '전체 글 탐색 허브'로 개편: 검색 전 전체 글 노출 + 카테고리/태그 칩 + 정렬 + 검색기준 안내
- 태그 시스템: tags 필드 + /tag/{태그}/ 모아보기, 상세 하단 태그 pill, 사이드바 인기 태그
- 시리즈 시스템: series{name,order} 필드 + 카테고리 페이지 시리즈 묶음 + 상세 이전/다음 편 내비
- 글 상세: 읽는 시간(본문 자동 계산), 목차(h2/h3 자동+현재위치 하이라이트), 읽기 진행바, 본문 중간 CTA
- 목록 카드 재정비: 카테고리 색 뱃지 + 시리즈 라벨 + 날짜 + 읽는시간
- 대표 이미지 없을 때 카테고리 색 기반 기본 썸네일(SVG) 자동 생성
- 새 필드는 src/content/config.ts, 카테고리 색/URL/슬러그는 src/lib/categories.ts 에서 관리

### 새 글에 시리즈/태그 넣는 법(프론트matter)
tags: ["수능", "학습전략"]
series:
  name: "수능 D-100 준비"
  order: 1
