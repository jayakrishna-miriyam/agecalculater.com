import { createServer } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { resolve, sep, extname } from 'node:path';
import { pageDefinitions } from '../src/content/index.ts';

// Preview the generated files, without Vite's SPA fallback masking missing routes.
const root = resolve('dist');
if (!existsSync(resolve(root, 'index.html'))) throw new Error('Run npm run build first.');
const routes = new Set(pageDefinitions.filter(page => !page.noindex).map(page => page.path));
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml' };
const server = createServer((request, response) => {
    let pathname;
    try { pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname); }
    catch { response.writeHead(400); response.end('Bad request'); return; }
    if (!['GET', 'HEAD'].includes(request.method)) { response.writeHead(405, { Allow: 'GET, HEAD' }); response.end(); return; }
    const route = pathname.replace(/\/+$/, '') || '/';
    let file = routes.has(route) ? resolve(root, '.' + route, 'index.html') : resolve(root, '.' + pathname);
    let status = 200;
    if (!file.startsWith(root + sep) || !existsSync(file) || !statSync(file).isFile() || route === '/404.html') {
        file = resolve(root, '404.html');
        status = 404;
    }
    response.writeHead(status, { 'Content-Type': mime[extname(file)] ?? 'application/octet-stream', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
    if (request.method === 'HEAD') response.end();
    else createReadStream(file).pipe(response);
});
const port = Number(process.env.PORT || 4174);
server.listen(port, '127.0.0.1', () => console.log('Static preview: http://127.0.0.1:' + port));
