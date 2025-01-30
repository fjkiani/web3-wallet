import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Remove the base if you're not using GitHub Pages
  // base: '/your-repo-name/',
})
