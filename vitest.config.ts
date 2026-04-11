import { defineConfig } from 'vitest/config';
import angular from '@analogjs/vite-plugin-angular';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    angular({
      jit: true,
      tsconfig: './tsconfig.spec.json',
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
