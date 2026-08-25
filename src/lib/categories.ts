// 카테고리별 고정 컬러 + 원본 게시판 URL + URL 슬러그 + 기본 썸네일 장수 (단일 소스)
// 슬러그는 '/'가 없어야 라우팅이 안전함(취업/자격증 → jobs, 수능/내신 → suneung)
export type CatMeta = {
  color: string
  bg: string
  url: string
  slug: string
  thumbs: number // public/thumbs/{slug}/ 에 있는 랜덤 기본 이미지 장수 (0이면 SVG 폴백)
}

// 사이드바·헤더 노출 순서 = 이 객체의 키 순서
export const CATEGORIES: Record<string, CatMeta> = {
  '공무원':        { color: '#1d4ed8', bg: '#e8effc', url: 'https://www.starteacher.co.kr/gong1',        slug: 'gongmuwon',   thumbs: 3 },
  '영어':          { color: '#0891b2', bg: '#e0f5fa', url: 'https://www.starteacher.co.kr/',             slug: 'english',     thumbs: 3 },
  '유치원':        { color: '#ff5722', bg: '#ffece5', url: 'https://www.starteacher.co.kr/kindergarten', slug: 'kindergarten',thumbs: 3 },
  '수능/내신':     { color: '#f97316', bg: '#fff0e2', url: 'https://www.starteacher.co.kr/high',         slug: 'suneung',     thumbs: 3 },
  '취업/자격증':   { color: '#059669', bg: '#e3f6ee', url: 'https://www.starteacher.co.kr/certificate',  slug: 'jobs',        thumbs: 3 },
  '외국어':        { color: '#7c3aed', bg: '#f1ebfc', url: 'https://www.starteacher.co.kr/',             slug: 'language',    thumbs: 3 },
  '대학원/편입':   { color: '#0d9488', bg: '#dff5f2', url: 'https://www.starteacher.co.kr/',             slug: 'grad',        thumbs: 3 },
  '임용/기타고시': { color: '#c026d3', bg: '#fbeafc', url: 'https://www.starteacher.co.kr/',             slug: 'gosi',        thumbs: 3 },
  '교수':          { color: '#e11d48', bg: '#ffe8ee', url: 'https://www.starteacher.co.kr/professor',    slug: 'professor',   thumbs: 3 },
}

const FALLBACK: CatMeta = { color: '#6d28d9', bg: '#f0ebfb', url: 'https://www.starteacher.co.kr/', slug: 'etc', thumbs: 0 }

export const CATE_ORDER = Object.keys(CATEGORIES)

export const catMeta = (c: string): CatMeta => CATEGORIES[c] ?? { ...FALLBACK, slug: encodeURIComponent(c) }
export const catColor = (c: string) => catMeta(c).color
export const catBg = (c: string) => catMeta(c).bg
export const catUrl = (c: string) => catMeta(c).url
export const catSlug = (c: string) => catMeta(c).slug
export const catThumbs = (c: string) => catMeta(c).thumbs

// 슬러그 → 카테고리명 역매핑
export const slugToCat = (slug: string): string | undefined =>
  Object.keys(CATEGORIES).find((c) => CATEGORIES[c].slug === slug)
