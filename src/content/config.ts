import { defineCollection, z } from 'astro:content'

// 글 하나가 가져야 할 정보(메타)를 정의합니다.
// CMS를 붙일 때 이 필드들과 1:1로 매핑하면 됩니다.
const posts = defineCollection({
  type: 'content', // 본문은 .md / .mdx / .html 슬롯으로 들어옵니다.
  schema: z.object({
    title: z.string(),                    // 글 제목 (h1으로 출력)
    description: z.string(),              // 검색결과 요약 (meta description)
    category: z.string().default('별별정보'), // 중분류 (예: 유치원)
    categoryUrl: z.string().url().optional(), // 원본 카테고리로 보내는 링크
    publishedAt: z.coerce.date(),         // 발행일
    updatedAt: z.coerce.date().optional(),// 수정일
    heroImage: z.string().optional(),     // 대표 이미지 URL
    heroImageAlt: z.string().default(''), // 대표 이미지 대체텍스트
    canonicalUrl: z.string().url().optional(), // 정식 URL(비우면 자동=이 블로그 주소)
    draft: z.boolean().default(false),    // true면 목록/배포에서 제외
    // FAQ 구조화데이터용(선택). 비워도 됩니다.
    faq: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
  }),
})

export const collections = { posts }
