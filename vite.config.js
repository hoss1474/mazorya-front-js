
import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { existsSync, cpSync, mkdirSync } from 'fs';

export default defineConfig({
  base: '/',

  plugins: [
    {
      name: 'mazorya-copy-static-assets',

      apply: 'build',

      writeBundle() {
        const root = process.cwd();
        const dist = resolve(root, 'dist');

        // Source folders that should be copied
        // without modification.
        const folders = [
          {
            source: 'lang',
            destination: 'lang'
          },
          {
            source: 'assets/img',
            destination: 'assets/img'
          },
          {
            source: 'assets/css',
            destination: 'assets/css'
          },
          {
            source: 'assets/js',
            destination: 'assets/js'
          },
          {
            source: 'assets/fonts',
            destination: 'assets/fonts'
          },
          {
            source: 'assets/icons',
            destination: 'assets/icons'
          },
          {
            source: 'assets/videos',
            destination: 'assets/videos'
          }
        ];

        for (const folder of folders) {
          const source = resolve(root, folder.source);
          const destination = resolve(dist, folder.destination);

          if (!existsSync(source)) {
            console.log(
              `[Vite] Skipped (not found): ${folder.source}`
            );
            continue;
          }

          try {
            mkdirSync(dirname(destination), {
              recursive: true
            });

            cpSync(source, destination, {
              recursive: true,
              force: true
            });

            console.log(
              `[Vite] Copied: ${folder.source} → dist/${folder.destination}`
            );

          } catch (error) {
            console.error(
              `[Vite] Failed to copy: ${folder.source}`,
              error
            );

            throw error;
          }
        }

        console.log(
          '[Vite] Mazorya static assets copied successfully.'
        );
      }
    }
  ],

  build: {
    outDir: 'dist',

    assetsDir: 'assets',

    emptyOutDir: true,

    sourcemap: false
  }
});
