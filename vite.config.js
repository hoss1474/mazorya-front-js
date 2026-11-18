import { defineConfig } from 'vite';
import { resolve } from 'path';
import { existsSync, cpSync, mkdirSync } from 'fs';

export default defineConfig({
  base: '/',

  plugins: [
    {
      name: 'copy-language-files',

      closeBundle() {
        const source = resolve(process.cwd(), 'lang');
        const destination = resolve(process.cwd(), 'dist/assets');

        if (!existsSync(source)) {
          console.warn('Language folder not found');
          return;
        }

        mkdirSync(destination, { recursive: true });

        cpSync(source, destination, {
          recursive: true,
          force: true
        });

        console.log('Language files copied to dist/assets');
      }
    }
  ],

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true
  }
});