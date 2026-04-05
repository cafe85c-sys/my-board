import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 🌟 關鍵魔法：強制告訴所有套件，我們永遠都在「開發環境」
  define: {
    'process.env.NODE_ENV': '"development"'
  }
})