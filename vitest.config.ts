import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['lib/**/*.{ts,tsx}'],
      exclude: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
    },
  },
});
