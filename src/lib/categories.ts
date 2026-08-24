// 카테고리별 고정 컬러 + 원본 게시판 URL 매핑 (단일 소스)
// 색상은 별별선생 톤에 맞춘 카테고리 아이덴티티. 영역마다 흔들리지 않도록 여기서만 관리.
export type CatMeta = { color: string; bg: string; url: string }

export const CATEGORIES: Record<string, CatMeta> = {
  '공무원':      { color: '#1d4ed8', bg: '#e8effc', url: 'https://www.starteacher.co.kr/gong1' },
  '영어':        { color: '#0891b2', bg: '#e0f5fa', url: 'https://www.starteacher.co.kr/' },
  '유치원':      { color: '#ff5722', bg: '#ffece5', url: 'https://www.starteacher.co.kr/kindergarten' },
  '수능/내신':   { color: '#f97316', bg: '#fff0e2', url: 'https://www.starteacher.co.kr/high' },
  '취업/자격증': { color: '#059669', bg: '#e3f6ee', url: 'https://www.starteacher.co.kr/certificate' },
}

const FALLBACK: CatMeta = { color: '#6d28d9', bg: '#f0ebfb', url: 'https://www.starteacher.co.kr/' }

export const catMeta = (c: string): CatMeta => CATEGORIES[c] ?? FALLBACK
export const catColor = (c: string) => catMeta(c).color
export const catBg = (c: string) => catMeta(c).bg
export const catUrl = (c: string) => catMeta(c).url
