import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    base: './',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          vehicles: path.resolve(__dirname, 'vehicles.html'),
          solutions: path.resolve(__dirname, 'solutions.html'),
          about: path.resolve(__dirname, 'about.html'),
          contact: path.resolve(__dirname, 'contact.html'),
                    compare: path.resolve(__dirname, 'compare.html'),
          privacy: path.resolve(__dirname, 'privacy.html'),
          sustainability: path.resolve(__dirname, 'sustainability.html'),
          technology: path.resolve(__dirname, 'technology.html'),
          terms: path.resolve(__dirname, 'terms.html'),
          vehicle: path.resolve(__dirname, 'vehicle.html'),
          blog: path.resolve(__dirname, 'blog.html'),
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
