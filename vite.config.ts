import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "node:path"
import dts from "vite-plugin-dts"

// vite 开发文档：https://vite.dev/config
export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src/**/*'],
      outDir: 'dist/types',
      staticImport: true,
      insertTypesEntry: true,
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  build: {
    rollupOptions: {
      external: ['vue', 'element-plus'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
          'element-plus': 'ElementPlus'
        }
      },
    },
    lib: {
      entry: path.resolve(__dirname, './src/index.ts'),
      name: 'schema-form-table',
      fileName: (format) => `schema-form-table.${format}.js`
    }
  },
})
