const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  // Replace nav links (any indentation)
  content = content.replace(/([ \t]*)<a href="\.\/about\.html" class="nav-link( active)?">About Us<\/a>\n([ \t]*)<a href="\.\/careers\.html" class="nav-link( active)?">Careers<\/a>/g,
    '$3<a href="./careers.html" class="nav-link$4">Careers</a>\n$1<a href="./about.html" class="nav-link$2">About Us</a>');

  // Replace footer links
  // Let's just remove the Careers link from its current position, and insert it before the About Us link
  
  const footerCareersRegex = /[ \t]*<li><a href="\.\/careers\.html">Careers<\/a><\/li>\n/;
  const hasCareersInFooter = footerCareersRegex.test(content);
  
  if (hasCareersInFooter) {
    const careersLinkStr = content.match(footerCareersRegex)[0];
    content = content.replace(footerCareersRegex, ''); // remove it
    
    // Now insert it before About Us
    const aboutUsRegex = /([ \t]*)<li><a href="\.\/about\.html">About Us<\/a><\/li>/;
    if (aboutUsRegex.test(content)) {
      content = content.replace(aboutUsRegex, careersLinkStr + '$1<li><a href="./about.html">About Us</a></li>');
    }
  }

  fs.writeFileSync(file, content, 'utf8');
}

console.log('Update completed');
