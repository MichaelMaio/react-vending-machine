import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/web-vending-machine/', // this fixes path resolution on GitHub Pages
  plugins: [react()],
});
