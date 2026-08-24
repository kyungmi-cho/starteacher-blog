import { defineConfig } from 'astro/config'

// 배포 시 실제 블로그 주소로 변경하세요.
// 예) https://www.starteacher.co.kr/blog  또는  https://blog.starteacher.co.kr
export default defineConfig({
  site: 'https://www.starteacher.co.kr',
  trailingSlash: 'ignore',
})
