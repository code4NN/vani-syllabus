import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  // server: {
  //   hmr: false, // Disable Hot Module Replacement for debugging
  // },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // Now `@/composables/useServer.js` works
    }
  }
});
