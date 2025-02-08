import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    vue(),
    viteStaticCopy({
      targets: [
        {
          src: 'manifest.json', // The path to your manifest.json file
          dest: '', // The destination directory inside dist
        }
      ]
    })
  ],
  build: {
    outDir: 'dist/extension',
    assetsDir: '',
  },
})
