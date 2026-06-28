const fs = require('fs');
let html = fs.readFileSync('compare.html', 'utf8');

const regex = /document\.getElementById\(`th-model\$\{colIndex\}`\)\.innerHTML = `<div style="margin-bottom: 0\.5rem; font-size: 1\.25rem;">\$\{data\.name\}<\/div><img src="\$\{data\.image\}" alt="\$\{data\.name\}" style="width: 100%; max-width: 200px; border-radius: 8px; object-fit: cover; height: 120px; display: block; margin: 0 auto;" onerror="this\.src='https:\/\/placehold\.co\/300x200\?text=' \+ encodeURIComponent\(data\.name\)"><\/`\+`>;/g;

// Fallback simpler regex
const fallbackRegex = /document\.getElementById\(`th-model\$\{colIndex\}`\)\.innerHTML = `.*?<\/div><img.*?>`;/g;

const replacement = `document.getElementById(\`th-model\${colIndex}\`).textContent = data.name;
            const previewImage = document.getElementById(\`preview-image\${colIndex}\`);
            if (previewImage) {
              previewImage.innerHTML = \`<img src="\${data.image}" alt="\${data.name}" style="width: 100%; max-width: 300px; border-radius: 8px; object-fit: cover; height: 160px; display: block; margin: 0 auto;" onerror="this.src='https://placehold.co/300x200?text=' + encodeURIComponent(data.name)">\`;
            }`;

html = html.replace(fallbackRegex, replacement);

fs.writeFileSync('compare.html', html);
console.log('Update logic replaced');
