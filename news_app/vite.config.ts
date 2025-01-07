import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/static/',
  build: {
    rollupOptions: {
      input: {
        app: './index.html',
      }
    },
    outDir: './templates/news_app',
    emptyOutDir: true
  }
});
