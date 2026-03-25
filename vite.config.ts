import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const proxyTarget = mode === 'production' 
    ? 'https://framelab-back.onrender.com/' 
    : 'http://localhost:3000';

  return {
    plugins: [sveltekit()],
    server: {
      allowedHosts: ['framelab-jbey.onrender.com', 'framelab-front.onrender.com'],
      proxy: {
        '/api': {
          target: proxyTarget,
          changeOrigin: true,
          secure: false,
        },
        '/uploads': {
          target: proxyTarget,
          changeOrigin: true,
          secure: false
        }
      }
    }
  };
});