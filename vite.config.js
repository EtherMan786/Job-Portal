import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server : {
    port: 3000,
    server: {
      'api': {
        target :'https://contact-etherman.netlify.app/.netlify/functions', //https://job-apiz.netlify.app/.netlify/functions/api/jobs
        changeOrigin: true, 
        rewrite : () => path.replace(/^\/api/,'')
      }
    }
  },
})
