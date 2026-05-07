import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const isProd = mode === 'production';

  const proxyTarget = isProd
    ? env.PRIVATE_BACKEND_URL
    : 'http://localhost:3000';

  const port = Number(env.PORT) || 5173;

  return {
    plugins: [sveltekit()],

    server: {
      port,
      strictPort: true,

      proxy: {
        '/api': {
          target: proxyTarget,
          changeOrigin: true,
          secure: false
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