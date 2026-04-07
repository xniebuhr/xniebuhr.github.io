import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: (() => {
    if (!process.env.GITHUB_ACTIONS) {
      return '/'
    }

    const repository = process.env.GITHUB_REPOSITORY ?? ''
    const [owner, repo] = repository.split('/')

    if (!owner || !repo || repo.toLowerCase() === `${owner.toLowerCase()}.github.io`) {
      return '/'
    }

    return `/${repo}/`
  })(),
})
