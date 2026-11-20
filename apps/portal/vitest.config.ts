import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const stub = (name: string) =>
  fileURLToPath(new URL(`./src/test/stubs/${name}.tsx`, import.meta.url));

export default defineConfig({
  resolve: {
    // The remote is never reached in tests; these stubs only make the ids resolvable
    // so that vi.mock can replace them.
    alias: {
      'verse_widget/VerseCard': stub('VerseCard'),
      'verse_widget/VerseBanner': stub('VerseBanner'),
      'verse_widget/meta': stub('meta'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: false,
  },
});
