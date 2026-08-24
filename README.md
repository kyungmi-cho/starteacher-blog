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
