import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  optimizeDeps: {
    exclude: ['vue-demi'],
  },
  plugins: [vue()],
  test: {
    coverage: {
      include: ['src'],
    },
  },
})
