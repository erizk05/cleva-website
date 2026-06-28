const fs = require('fs');
let html = fs.readFileSync('compare.html', 'utf8');

const html_pattern = /<div style="margin-bottom: 2rem; display: flex; gap: 1rem; flex-wrap: wrap; align-items: center; justify-content: center;">[\s\S]*?<\/table>\s*<\/div>/;

const html_replacement = `        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; max-width: 1000px; margin: 0 auto;">
          <!-- Model 1 Column -->
          <div style="display: flex; flex-direction: column; align-items: center; gap: 1.5rem; padding: 2rem; border: 1px solid var(--clr-neutral-300); border-radius: 8px; background: white; box-shadow: var(--shadow-sm);">
            <div style="display: flex; gap: 0.5rem; align-items: center; width: 100%; justify-content: center;">
              <label for="model1" style="font-weight: 600;">Model 1:</label>
              <select id="model1" style="padding: 0.5rem; border-radius: 4px; border: 1px solid var(--clr-neutral-300); background: white; width: 100%; max-width: 200px;">
                <option value="etrike" selected>eTRIKE</option>
                <option value="eshuttle">eSHUTTLE</option>
                <option value="bevdeluxe">BEV Deluxe</option>
                <option value="emover">eMOVER</option>
                <option value="elinebus">eLine Bus</option>
                <option value="eridecargo">eRIDE Cargo+</option>
              </select>
            </div>
            <div id="preview-image1" style="width: 100%;"></div>
            <div id="info-model1" style="width: 100%; display: flex; flex-direction: column; gap: 0.5rem;">
               <!-- Details will go here via JS -->
            </div>
          </div>

          <!-- Model 2 Column -->
          <div style="display: flex; flex-direction: column; align-items: center; gap: 1.5rem; padding: 2rem; border: 1px solid var(--clr-neutral-300); border-radius: 8px; background: white; box-shadow: var(--shadow-sm);">
            <div style="display: flex; gap: 0.5rem; align-items: center; width: 100%; justify-content: center;">
              <label for="model2" style="font-weight: 600;">Model 2:</label>
              <select id="model2" style="padding: 0.5rem; border-radius: 4px; border: 1px solid var(--clr-neutral-300); background: white; width: 100%; max-width: 200px;">
                <option value="etrike">eTRIKE</option>
                <option value="eshuttle" selected>eSHUTTLE</option>
                <option value="bevdeluxe">BEV Deluxe</option>
                <option value="emover">eMOVER</option>
                <option value="elinebus">eLine Bus</option>
                <option value="eridecargo">eRIDE Cargo+</option>
              </select>
            </div>
            <div id="preview-image2" style="width: 100%;"></div>
            <div id="info-model2" style="width: 100%; display: flex; flex-direction: column; gap: 0.5rem;">
               <!-- Details will go here via JS -->
            </div>
          </div>
        </div>`;

const js_pattern = /function updateTable\(\) \{[\s\S]*?document\.getElementById\('model2'\)\.addEventListener\('change', updateTable\);/;

const js_replacement = `      function updateTable() {
        const models = [
          document.getElementById('model1').value,
          document.getElementById('model2').value
        ];

        models.forEach((modelId, index) => {
          const colIndex = index + 1;
          
          if (modelId === 'none') {
            document.getElementById(\`preview-image\${colIndex}\`).innerHTML = '';
            document.getElementById(\`info-model\${colIndex}\`).innerHTML = '';
          } else {
            const data = vehiclesData[modelId];
            
            const previewImage = document.getElementById(\`preview-image\${colIndex}\`);
            if (previewImage) {
              previewImage.innerHTML = \`<img src="\${data.image}" alt="\${data.name}" style="width: 100%; border-radius: 8px; object-fit: cover; height: 250px; display: block; margin: 0 auto;" onerror="this.src='https://placehold.co/400x300?text=' + encodeURIComponent(data.name)">\`;
            }
            
            const infoContainer = document.getElementById(\`info-model\${colIndex}\`);
            if (infoContainer) {
              infoContainer.innerHTML = \`
                <div style="border-bottom: 1px solid var(--clr-neutral-200); padding: 0.75rem 0; display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-weight: 600; color: var(--clr-neutral-600);">Model</span>
                  <span style="font-weight: 700; font-size: 1.125rem; color: var(--clr-primary-700); text-align: right;">\${data.name}</span>
                </div>
                <div style="border-bottom: 1px solid var(--clr-neutral-200); padding: 0.75rem 0; display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-weight: 600; color: var(--clr-neutral-600);">Passenger Capacity</span>
                  <span style="text-align: right;">\${data.capacity}</span>
                </div>
                <div style="border-bottom: 1px solid var(--clr-neutral-200); padding: 0.75rem 0; display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-weight: 600; color: var(--clr-neutral-600);">Range (per charge)</span>
                  <span style="text-align: right;">\${data.range}</span>
                </div>
                <div style="border-bottom: 1px solid var(--clr-neutral-200); padding: 0.75rem 0; display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-weight: 600; color: var(--clr-neutral-600);">Top Speed</span>
                  <span style="text-align: right;">\${data.speed}</span>
                </div>
                <div style="border-bottom: 1px solid var(--clr-neutral-200); padding: 0.75rem 0; display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-weight: 600; color: var(--clr-neutral-600);">Battery Type</span>
                  <span style="text-align: right;">\${data.battery}</span>
                </div>
                <div style="padding: 0.75rem 0; display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-weight: 600; color: var(--clr-neutral-600);">Best For</span>
                  <span style="text-align: right;">\${data.bestfor}</span>
                </div>
              \`;
            }
          }
        });
      }

      document.getElementById('model1').addEventListener('change', updateTable);
      document.getElementById('model2').addEventListener('change', updateTable);`;

const matchHtml = html.match(html_pattern);
if (matchHtml) {
    html = html.substring(0, matchHtml.index) + html_replacement + html.substring(matchHtml.index + matchHtml[0].length);
}

const matchJs = html.match(js_pattern);
if (matchJs) {
    html = html.substring(0, matchJs.index) + js_replacement + html.substring(matchJs.index + matchJs[0].length);
}

fs.writeFileSync('compare.html', html);
console.log('Update layout to side-by-side cards with JS node');
