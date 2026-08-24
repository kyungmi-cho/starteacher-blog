import { getCollection } from 'astro:content'

// 클라이언트 검색용 인덱스(JSON). 본문 제외, 제목·요약·카테고리만.
export async function GET() {
  const posts = await getCollection('posts', ({ data }) => !data.draft)
  const index = posts
    .sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime())
    .map((p) => ({
      slug: p.slug,
      title: p.data.title,
      description: p.data.description,
      category: p.data.category,
      date: `${p.data.publishedAt.getFullYear()}.${String(p.data.publishedAt.getMonth() + 1).padStart(2, '0')}.${String(p.data.publishedAt.getDate()).padStart(2, '0')}`,
      heroImage: p.data.heroImage ?? '',
    }))
  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json' },
  })
}
