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

## v5 변경 (2026-08) — 카테고리 9종 + 랜덤 기본 이미지
- 카테고리 9종으로 확장: 공무원·영어·유치원·수능/내신·취업/자격증·외국어·대학원/편입·임용/기타고시·교수
- 헤더/사이드바가 src/lib/categories.ts 의 CATE_ORDER 순서를 따름(단일 관리)
- 새 글 2편: 교수(수강신청), 영어(오픽/토스)

### 랜덤 기본 썸네일 규칙 (이미지 없는 글)
- 폴더: public/thumbs/{카테고리slug}/  (slug는 categories.ts 참고)
    gongmuwon, english, kindergarten, suneung, jobs, language, grad, gosi, professor
- 파일명: 1.jpg, 2.jpg, 3.jpg ... 1부터 연속 번호
- 장수 지정: categories.ts 의 각 카테고리 thumbs 값(현재 3). 파일을 늘리면 이 숫자도 함께 올릴 것
- 선택 방식: 글 slug 해시로 고정 랜덤 → 같은 글은 항상 같은 이미지(재빌드 깜빡임 없음), 글마다 분산
- thumbs: 0 이면 카테고리 색 SVG 자동 폴백
- 실제 이미지 교체: public/thumbs/{slug}/ 안의 1.jpg~ 를 원하는 이미지로 덮어쓰기(비율 4:3 권장, 800x600)
- 현재 들어있는 이미지는 색상 플레이스홀더이므로 실제 이미지로 교체 권장

## v6 변경 (2026-08) — 정렬·헤더·사이드바 정리
- 상세 헤더를 전체폭 밴드로 재구성: heroImage 있으면 이미지 배경(어두운 오버레이+흰 텍스트), 없으면 카테고리 색 단색. 제목 좌측 정렬.
- 상세 하단(태그·시리즈 내비·CTA·원본링크·관련글)을 동일 폭(--post-wide 920px)·동일 좌우 패딩으로 통일 → 축 어긋남 해소.
- 본문 읽기폭 --post-width(760px)/하단·헤더 --post-wide(920px)로 분리 관리.
- 메인 사이드바: 카테고리 색 점 제거, '전체글 보기' active 꾸밈 제거(중립화).
- 카드 meta-row: 카테고리 뱃지와 시리즈명 세로 중앙 정렬 일치.

## v7 변경 (2026-08) — 상세 CTA 정리
- 본문 중간 CTA 제거(글 흐름 유지)
- 하단 두 영역 목적지 분리:
    · CTA 배너 → 별별선생 후기(전환)
    · 하단 링크 → 블로그 카테고리 페이지(탐색), 문구 "더 많은 글 보러가기 →"
- CTA 문구를 카테고리별 자연스러운 문장으로 교체(교수="들을 만한 강의인지 궁금하다면" 등)
    문구는 [slug].astro 의 CTA_COPY 객체에서 관리
