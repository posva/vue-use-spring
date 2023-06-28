import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['./src/index.ts'],
  target: 'es2022',
  clean: true,
  format: ['cjs', 'esm', 'iife'],
  outExtension(ctx) {
    const js =
      ctx.format === 'iife'
        ? '.iife.js'
        : ctx.format === 'cjs'
        ? '.cjs'
        : ctx.format === 'esm'
        ? '.mjs'
        : '.js'

    return { js }
  },
  dts: true,
  external: ['vue', 'vue-demi'],
  // splitting: false,
  define: {
    __DEV__: 'true',
  },
})
