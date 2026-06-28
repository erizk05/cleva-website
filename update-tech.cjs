const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'technology.html');

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  // Nav update
  if (!content.includes('technology.html')) {
    content = content.replace(
      '<a href="./solutions.html"',
      '<a href="./technology.html" class="nav-link">Technology</a>\n          <a href="./solutions.html"'
    );
    content = content.replace(
      '<a href="/solutions.html"',
      '<a href="./technology.html" class="nav-link">Technology</a>\n          <a href="./solutions.html"'
    );
  }

  // Footer update
  if (!content.includes('<li><a href="./technology.html">Technology</a></li>')) {
    content = content.replace(
      '<li><a href="./about.html">About Us</a></li>',
      '<li><a href="./about.html">About Us</a></li>\n            <li><a href="./technology.html">Technology</a></li>'
    );
    content = content.replace(
      '<li><a href="/about.html">About Us</a></li>',
      '<li><a href="./about.html">About Us</a></li>\n            <li><a href="./technology.html">Technology</a></li>'
    );
  }
  
  fs.writeFileSync(file, content);
}

// Add to sitemap.xml
if (fs.existsSync('sitemap.xml')) {
  let sitemap = fs.readFileSync('sitemap.xml', 'utf8');
  if (!sitemap.includes('technology.html')) {
    const techSitemapUrl = `
  <url>
    <loc>https://www.cleva-ev.com/technology.html</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
    sitemap = sitemap.replace('</urlset>', `${techSitemapUrl}\n</urlset>`);
    fs.writeFileSync('sitemap.xml', sitemap);
  }
}
