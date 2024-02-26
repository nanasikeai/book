import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    force: true,
    port: 8082
  },
  resolve:{
    alias:{
      '@': path.resolve(__dirname,'src')
    }
  }
})
