import { defineConfig } from 'astro/config'

export default defineConfig({
  // 깃허브 페이지 기본 도메인
  site: 'https://kyungmi-cho.github.io', 
  // 레포지토리 이름 (반드시 맨 앞에 슬래시 / 를 붙여야 합니다)
  base: '/starteacher-blog', 
  trailingSlash: 'ignore',
})