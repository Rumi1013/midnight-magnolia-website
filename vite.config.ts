import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom']
        }
      }
    }
  },
  server: {
    port: 5173,
    host: true
  },
  preview: {
    port: parseInt(process.env.PORT || '5173'),
    host: '0.0.0.0'
  }
})