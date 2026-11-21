import { defineConfig } from 'vite';
import { loadSiteEnvironment } from './scripts/site-env.mjs';

export default defineConfig(({ mode, isSsrBuild }) => {
  const site = loadSiteEnvironment(mode);

  return {
    plugins: [{
      name: 'site-verification',
      transformIndexHtml() {
        return [
          { tag: 'meta', attrs: { name: 'google-adsense-account', content: site.adsenseAccount }, injectTo: 'head' },
          { tag: 'meta', attrs: { name: 'google-site-verification', content: site.verificationToken }, injectTo: 'head' },
        ];
      },
      generateBundle() {
        if (!isSsrBuild) this.emitFile({ type: 'asset', fileName: 'ads.txt', source: site.adsTxt });
      },
      configureServer(server) {
        server.middlewares.use((request, response, next) => {
          if (request.url?.split('?')[0] !== '/ads.txt') return next();
          if (!['GET', 'HEAD'].includes(request.method ?? '')) {
            response.writeHead(405, { Allow: 'GET, HEAD' });
            response.end();
            return;
          }
          response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' });
          response.end(request.method === 'HEAD' ? undefined : site.adsTxt);
        });
      },
    }],
  };
});
