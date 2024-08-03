import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Cantt-College-LMS/',
  plugins: [react()],
  build: {
    outDir: 'build',
  }
})
