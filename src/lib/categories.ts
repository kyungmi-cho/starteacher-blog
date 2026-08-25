// 카테고리별 고정 컬러 + 원본 게시판 URL + URL 슬러그 (단일 소스)
// 슬러그는 '/'가 없어야 라우팅이 안전함(취업/자격증 → chwieop, 수능/내신 → suneung)
export type CatMeta = { color: string; bg: string; url: string; slug: string }

export const CATEGORIES: Record<string, CatMeta> = {
  '공무원':      { color: '#1d4ed8', bg: '#e8effc', url: 'https://www.starteacher.co.kr/gong1',       slug: 'gongmuwon' },
  '영어':        { color: '#0891b2', bg: '#e0f5fa', url: 'https://www.starteacher.co.kr/',            slug: 'english' },
  '유치원':      { color: '#ff5722', bg: '#ffece5', url: 'https://www.starteacher.co.kr/kindergarten',slug: 'kindergarten' },
  '수능/내신':   { color: '#f97316', bg: '#fff0e2', url: 'https://www.starteacher.co.kr/high',        slug: 'suneung' },
  '취업/자격증': { color: '#059669', bg: '#e3f6ee', url: 'https://www.starteacher.co.kr/certificate',  slug: 'jobs' },
}

const FALLBACK: CatMeta = { color: '#6d28d9', bg: '#f0ebfb', url: 'https://www.starteacher.co.kr/', slug: 'etc' }

export const catMeta = (c: string): CatMeta => CATEGORIES[c] ?? { ...FALLBACK, slug: encodeURIComponent(c) }
export const catColor = (c: string) => catMeta(c).color
export const catBg = (c: string) => catMeta(c).bg
export const catUrl = (c: string) => catMeta(c).url
export const catSlug = (c: string) => catMeta(c).slug

// 슬러그 → 카테고리명 역매핑
export const slugToCat = (slug: string): string | undefined =>
  Object.keys(CATEGORIES).find((c) => CATEGORIES[c].slug === slug)
