import { writeFile } from 'fs';
import { resolve } from 'path';

const generateSitemap = () => {
    const baseUrl = 'https://www.agecalculater.com';
    // Get current date in YYYY-MM-DD format
    const lastmod = new Date().toISOString().split('T')[0];

    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>  
</urlset>`;

    // Assumes the script is run from the project root
    const outputPath = resolve(__dirname, 'sitemap.xml');

    writeFile(outputPath, sitemapContent.trim(), 'utf8', (err) => {
        if (err) {
            console.error('Error generating sitemap.xml:', err);
            return;
        }
        console.log('sitemap.xml generated successfully!');
    });
};

generateSitemap();