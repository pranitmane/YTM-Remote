import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build:{
    rollupOptions:{
      input:{
        main: 'src/main.tsx',
        content: 'src/content/content.ts',
        index: 'index.html'
      },
      output:{
        entryFileNames: (chunk) => {
          if (chunk.name === 'index.html') {
            return '[name].html'
          } else {
            return 'assets/[name].js'
          }
        }
      }
    }
  }
})
