const fs = require('fs');
let html = fs.readFileSync('compare.html', 'utf8');

const oldStr = 'innerHTML = `<img src="${data.image}" alt="${data.name}" style="width: 100%; max-width: 200px; border-radius: 8px; object-fit: cover; height: 120px;" onerror="this.src=\\'https://placehold.co/300x200?text=\\' + encodeURIComponent(data.name)">`;';
const newStr = 'innerHTML = `<img src="${data.image}" alt="${data.name}" style="width: 100%; max-width: 200px; border-radius: 8px; object-fit: cover; height: 120px; display: block; margin: 0 auto;" onerror="this.src=\\'https://placehold.co/300x200?text=\\' + encodeURIComponent(data.name)">`;';

html = html.replace(oldStr, newStr);

fs.writeFileSync('compare.html', html);
console.log('Updated JS for images');
