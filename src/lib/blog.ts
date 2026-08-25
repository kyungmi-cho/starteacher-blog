// 블로그 공통 헬퍼 (읽는 시간, 슬러그, 기본 썸네일, 목차, 포맷)
import { catColor, catBg, catSlug, catThumbs } from './categories'

// HTML 본문에서 태그 제거 후 글자 수로 읽는 시간 계산.
// 한국어는 분당 약 500자 기준(성인 평균 읽기 속도).
export function readingMinutes(body: string): number {
  const text = body.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  const chars = [...text].length
  return Math.max(1, Math.round(chars / 500))
}

// 카테고리/태그를 URL-safe 슬러그로. 한글은 encodeURIComponent로 보존.
export const slugifyCat = (c: string) => encodeURIComponent(c)

// 날짜 포맷
export const fmtDate = (d: Date) =>
  `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`

// 문자열 → 안정적 해시(같은 글은 항상 같은 값). 랜덤 이미지 고정 선택용.
function hashString(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) { h = (h * 31 + s.charCodeAt(i)) | 0 }
  return Math.abs(h)
}

// 카테고리 색 기반 SVG 폴백(외부 이미지 의존 없음). 등록된 실물 이미지가 없을 때 사용.
function svgThumb(category: string): string {
  const fg = catColor(category)
  const bg = catBg(category)
  const label = category.replace(/&/g, '&amp;').replace(/</g, '&lt;')
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'>
    <rect width='400' height='300' fill='${bg}'/>
    <circle cx='330' cy='60' r='70' fill='${fg}' opacity='0.12'/>
    <circle cx='60' cy='250' r='50' fill='${fg}' opacity='0.10'/>
    <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
      font-family='Pretendard, sans-serif' font-size='30' font-weight='700' fill='${fg}'>${label}</text>
  </svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

// 대표 이미지가 없을 때 쓰는 기본 썸네일.
// public/thumbs/{slug}/1.jpg ~ {N}.jpg 중에서 글 슬러그 해시로 하나를 "고정 랜덤" 선택.
// (같은 글은 항상 같은 이미지 → 재빌드 시 깜빡임 없음)
// 등록 장수(thumbs)가 0이면 SVG 폴백.
export function defaultThumb(category: string, seed = ''): string {
  const base = import.meta.env.BASE_URL // 예: /starteacher-blog/
  const n = catThumbs(category)
  if (n <= 0) return svgThumb(category)
  const slug = catSlug(category)
  const idx = (hashString(seed || category) % n) + 1 // 1..N
  return `${base}thumbs/${slug}/${idx}.jpg`
}

// 글의 표시용 썸네일: heroImage 우선, 없으면 카테고리 기본(랜덤) 썸네일.
export function postThumb(heroImage: string | undefined, category: string, seed = ''): string {
  return heroImage && heroImage.trim() ? heroImage : defaultThumb(category, seed)
}

// 본문 h2/h3에서 목차 추출. id가 없으면 순번 id를 부여한 본문도 함께 반환.
export function buildToc(html: string): { toc: { id: string; text: string; level: number }[]; html: string } {
  const toc: { id: string; text: string; level: number }[] = []
  let i = 0
  const out = html.replace(/<(h2|h3)([^>]*)>([\s\S]*?)<\/\1>/g, (m, tag, attrs, inner) => {
    const level = tag === 'h2' ? 2 : 3
    const text = inner.replace(/<[^>]+>/g, '').trim()
    let id = ''
    const idMatch = attrs.match(/\bid=["']([^"']+)["']/)
    if (idMatch) id = idMatch[1]
    else { id = `toc-${++i}`; attrs = `${attrs} id="${id}"` }
    if (text) toc.push({ id, text, level })
    return `<${tag}${attrs}>${inner}</${tag}>`
  })
  return { toc, html: out }
}
