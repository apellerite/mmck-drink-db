import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import ui from '@nuxt/ui/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    tailwindcss(),
    ui(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api/image': {
        target: 'https://www.artic.edu',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/image/, '/iiif/2'),
        // headers: {
        //   'Referer': 'https://www.artic.edu/',
        //   'Referrer-Policy': 'no-referrer',
        // },
        // configure: (proxy, options) => {
        //   proxy.on('proxyReq', (proxyReq, req, res) => {
        //     proxyReq.setHeader('Referrer-Policy', 'no-referrer');
        //     proxyReq.setHeader('Referer', 'https://www.artic.edu/');
        //   });
        // },
      },
    },
  },
})
