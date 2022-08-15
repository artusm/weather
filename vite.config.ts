import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'
import checker from 'vite-plugin-checker'
import Inspect from 'vite-plugin-inspect';

import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Inspect({ enabled: true }),
    react(),
    checker({ typescript: true })
  ],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src/') },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests.ts',
    // you might want to disable it, if you don't have tests that rely on CSS
    // since parsing CSS is slow
    //css: true,
  },
})
