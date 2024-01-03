import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  build: {
    sourcemap: true,
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
    },
  },
});
