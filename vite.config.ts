import { defineConfig, Plugin } from 'vite'

import react from '@vitejs/plugin-react'
import checker from 'vite-plugin-checker'
import Inspect from 'vite-plugin-inspect';

import * as path from "path";
import { dependencies } from './package.json';
import {createHtmlPlugin} from "vite-plugin-html";
function renderChunks(deps) {
  let chunks = {};
  Object.keys(deps).forEach(key => {
    if (['react', 'react-dom'].includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Inspect({ enabled: true }),
    react(),
    checker({ typescript: true }),
    createHtmlPlugin({
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        removeAttributeQuotes: false,
        removeEmptyAttributes: true,
        processConditionalComments: true,
        useShortDoctype: false,
      },
      entry: undefined,
    }),
  ],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src/') },
    dedupe: [
      'react',
      'react-dom',
    ],
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ...renderChunks(dependencies),
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests.ts',
    // you might want to disable it, if you don't have tests that rely on CSS
    // since parsing CSS is slow
    //css: true,
  },
});

function vitePluginAxe(): Plugin {
  let command: 'build' | 'serve';
  return {
    name: 'vite-plugin-axe',
    configResolved: (config) => {
      command = config.command;
    },
    resolveId(id) {
      if (id === '~axe') return '\x00~axe';
      else return null;
    },
    load(id, opts) {
      if (id === '~axe' || id === '\x00~axe') {
        if (command === 'serve' && !opts?.ssr) {
          return `import R from'react';import D from'react-dom';import a from'@axe-core/react';await a(R,D,500)`;
        } else {
          return '\n';
        }
      }
      return null;
    },
  };
}