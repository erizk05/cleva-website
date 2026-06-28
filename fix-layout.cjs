const fs = require('fs');
let html = fs.readFileSync('compare.html', 'utf8');

// Wrap the model1 select in a column flex and add preview-image1
html = html.replace(
  /<div style="display: flex; gap: 0\.5rem; align-items: center;">\s*<label for="model1"[\s\S]*?<\/select>\s*<\/div>/,
  `<div style="display: flex; flex-direction: column; align-items: center; gap: 1rem;">
            <div style="display: flex; gap: 0.5rem; align-items: center;">
              <label for="model1" style="font-weight: 600;">Model 1:</label>
              <select id="model1" style="padding: 0.5rem; border-radius: 4px; border: 1px solid var(--clr-neutral-300); background: white;">
                <option value="etrike" selected>eTRIKE</option>
                <option value="eshuttle">eSHUTTLE</option>
                <option value="bevdeluxe">BEV Deluxe</option>
                <option value="emover">eMOVER</option>
                <option value="elinebus">eLine Bus</option>
                <option value="eridecargo">eRIDE Cargo+</option>
              </select>
            </div>
            <div id="preview-image1"></div>
          </div>`
);

// Wrap the model2 select in a column flex and add preview-image2
html = html.replace(
  /<div style="display: flex; gap: 0\.5rem; align-items: center;">\s*<label for="model2"[\s\S]*?<\/select>\s*<\/div>/,
  `<div style="display: flex; flex-direction: column; align-items: center; gap: 1rem;">
            <div style="display: flex; gap: 0.5rem; align-items: center;">
              <label for="model2" style="font-weight: 600;">Model 2:</label>
              <select id="model2" style="padding: 0.5rem; border-radius: 4px; border: 1px solid var(--clr-neutral-300); background: white;">
                <option value="etrike">eTRIKE</option>
                <option value="eshuttle" selected>eSHUTTLE</option>
                <option value="bevdeluxe">BEV Deluxe</option>
                <option value="emover">eMOVER</option>
                <option value="elinebus">eLine Bus</option>
                <option value="eridecargo">eRIDE Cargo+</option>
              </select>
            </div>
            <div id="preview-image2"></div>
          </div>`
);

// Update JavaScript updateTable function
html = html.replace(
  /document\.getElementById\(`th-model\$\{colIndex\}`\)\.innerHTML = `<div style="margin-bottom: 0\.5rem; font-size: 1\.25rem;">\$\{data\.name\}<\/div><img src="\$\{data\.image\}" alt="\$\{data\.name\}" style="width: 100%; max-width: 200px; border-radius: 8px; object-fit: cover; height: 120px; display: block; margin: 0 auto;" onerror="this\.src='https:\/\/placehold\.co\/300x200\?text=' \+ encodeURIComponent\(data\.name\)"><\/`\+`>;/,
  `document.getElementById(\`th-model\${colIndex}\`).textContent = data.name;
            const previewImage = document.getElementById(\`preview-image\${colIndex}\`);
            if (previewImage) {
              previewImage.innerHTML = \`<img src="\${data.image}" alt="\${data.name}" style="width: 100%; max-width: 200px; border-radius: 8px; object-fit: cover; height: 120px; display: block; margin: 0 auto;" onerror="this.src='https://placehold.co/300x200?text=' + encodeURIComponent(data.name)">\`;
            } else {
              document.getElementById(\`th-model\${colIndex}\`).innerHTML = \`<div style="margin-bottom: 0.5rem; font-size: 1.25rem;">\${data.name}</div><img src="\${data.image}" alt="\${data.name}" style="width: 100%; max-width: 200px; border-radius: 8px; object-fit: cover; height: 120px; display: block; margin: 0 auto;" onerror="this.src='https://placehold.co/300x200?text=' + encodeURIComponent(data.name)">\`;
            }`
);

fs.writeFileSync('compare.html', html);
console.log('Done layout update');
