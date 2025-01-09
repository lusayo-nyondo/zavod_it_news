import path from "path";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(() => ({
  plugins: [react()],
  build: {
    assetsDir: 'static',
    rollupOptions: {
      input: {
        app: './index.html',
      }
    },
    outDir: './templates/news_app',
    emptyOutDir: true
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
