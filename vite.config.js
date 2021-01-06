import vue from '@vitejs/plugin-vue'

/**
 * @type {import('vite').UserConfig}
 */
export default {
  optimizeDeps: {
    exclude: ['vue-demi'],
  },
  plugins: [vue()],
}
