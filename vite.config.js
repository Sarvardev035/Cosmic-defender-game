import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/cosmic-defender-game/',
  server: {
    port: 3000,
  },
})
