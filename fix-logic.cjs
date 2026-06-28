const fs = require('fs');
let html = fs.readFileSync('compare.html', 'utf8');

const fallbackRegex = /document\.getElementById\(`th-model\$\{colIndex\}`\)\.innerHTML = `.*?<\/div><img.*?>`;/g;

const replacement = `document.getElementById(\`th-model\${colIndex}\`).textContent = data.name;
            const previewImage = document.getElementById(\`preview-image\${colIndex}\`);
            if (previewImage) {
              previewImage.innerHTML = \`<img src="\${data.image}" alt="\${data.name}" style="width: 100%; max-width: 300px; border-radius: 8px; object-fit: cover; height: 160px; display: block; margin: 0 auto; margin-top: 1rem;" onerror="this.src='https://placehold.co/300x200?text=' + encodeURIComponent(data.name)">\`;
            }`;

html = html.replace(fallbackRegex, replacement);

fs.writeFileSync('compare.html', html);
console.log('Update logic replaced');
