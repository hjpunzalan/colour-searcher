import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';
import { VitePluginFonts } from 'vite-plugin-fonts';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }]
  },
  plugins: [
    react(),
    VitePluginFonts({
      custom: {
        families: [
          {
            /**
             * Name of the font family.
             */
            name: 'Valera Round',
            /**
             * Local name of the font. Used to add `src: local()` to `@font-rule`.
             */
            local: 'Valera Round',
            /**
             * Regex(es) of font files to import. The names of the files will
             * predicate the `font-style` and `font-weight` values of the `@font-rule`'s.
             */
            src: './src/assets/fonts/VarelaRound-Regular.ttf'
          }
        ]
      }
    })
  ]
});
