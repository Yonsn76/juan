import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://zonabiker15.com',
  base: '/',
  output: 'static',
  build: {
    assets: '_assets',
    inlineStylesheets: 'auto'
  },
  server: {
    port: 4321,
    host: true
  },
  vite: {
    build: {
      assetsInlineLimit: 4096,
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'cart': ['./src/scripts/cart.ts']
          }
        }
      }
    },
    css: {
      devSourcemap: true
    },
    ssr: {
      noExternal: ['@fortawesome/*']
    }
  }
});
