import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://kyungmi-cho.github.io',
  base: '/starteacher-blog',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
})
