import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// Relative base so the static build works from any GitHub Pages sub-path.
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    // Arena previews are served from *.e2b.app; allow the proxied host.
    allowedHosts: ['.e2b.app'],
  },
  preview: {
    allowedHosts: ['.e2b.app'],
  },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
  },
});
