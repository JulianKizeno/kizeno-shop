import { defineConfig, loadEnv, transformWithEsbuild } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Preserve CRA's explicit public prefix without exposing other environment variables.
  const publicEnv = loadEnv(mode, process.cwd(), 'REACT_APP_');
  return {
    plugins: [{
      name: 'jsx-in-js-files', enforce: 'pre',
      async transform(code, id) {
        if (!id.includes('/node_modules/') && /\/src\/.*\.js$/.test(id.split('?')[0])) {
          return transformWithEsbuild(code, id, { loader: 'jsx', jsx: 'automatic' });
        }
      }
    }, react()],
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode === 'production' ? 'production' : 'development'),
      'process.env.PUBLIC_URL': JSON.stringify(''),
      ...Object.fromEntries(Object.entries(publicEnv).map(([key, value]) => ['process.env.' + key, JSON.stringify(value)]))
    },
    optimizeDeps: { esbuildOptions: { loader: { '.js': 'jsx' } } },
    server: { host: '127.0.0.1', port: 3000, strictPort: true },
    build: { outDir: 'build' },
    test: { globals: true, environment: 'jsdom',  include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'] }
  };
});
