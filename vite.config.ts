import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build:{
    rollupOptions:{
      input:{
        main: 'src/main.tsx',
        background: 'src/background/background.ts',
        content: 'src/content/content.ts',
      },
      output:{
        entryFileNames: 'assets/[name].js',
      }
    }
  }
})
