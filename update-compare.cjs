const fs = require('fs');

const compareHtml = fs.readFileSync('compare.html', 'utf8');

const dynamicSection = `    <section class="tech-section">
      <div class="container">
        <div style="margin-bottom: 2rem; display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
          <h2 style="margin-bottom: 0; margin-right: auto;">Select Models to Compare</h2>
          
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

          <div style="display: flex; gap: 0.5rem; align-items: center;">
            <label for="model3" style="font-weight: 600;">Model 3:</label>
            <select id="model3" style="padding: 0.5rem; border-radius: 4px; border: 1px solid var(--clr-neutral-300); background: white;">
              <option value="none">-- None --</option>
              <option value="etrike">eTRIKE</option>
              <option value="eshuttle">eSHUTTLE</option>
              <option value="bevdeluxe" selected>BEV Deluxe</option>
              <option value="emover">eMOVER</option>
              <option value="elinebus">eLine Bus</option>
              <option value="eridecargo">eRIDE Cargo+</option>
            </select>
          </div>
        </div>

        <div style="overflow-x: auto;">
          <table id="compare-table" style="width: 100%; border-collapse: collapse; min-width: 600px; text-align: left;">
            <thead>
              <tr style="background-color: var(--clr-primary-900); color: white;">
                <th style="padding: 1rem; border: 1px solid var(--clr-neutral-300);">Feature</th>
                <th id="th-model1" style="padding: 1rem; border: 1px solid var(--clr-neutral-300); min-width: 200px;">eTRIKE</th>
                <th id="th-model2" style="padding: 1rem; border: 1px solid var(--clr-neutral-300); min-width: 200px;">eSHUTTLE</th>
                <th id="th-model3" style="padding: 1rem; border: 1px solid var(--clr-neutral-300); min-width: 200px;">BEV Deluxe</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding: 1rem; border: 1px solid var(--clr-neutral-300); font-weight: 600;">Image</td>
                <td id="td-image-model1" style="padding: 1rem; border: 1px solid var(--clr-neutral-300); text-align: center;"></td>
                <td id="td-image-model2" style="padding: 1rem; border: 1px solid var(--clr-neutral-300); text-align: center;"></td>
                <td id="td-image-model3" style="padding: 1rem; border: 1px solid var(--clr-neutral-300); text-align: center;"></td>
              </tr>
              <tr style="background-color: var(--clr-neutral-100);">
                <td style="padding: 1rem; border: 1px solid var(--clr-neutral-300); font-weight: 600;">Passenger Capacity</td>
                <td id="td-capacity-model1" style="padding: 1rem; border: 1px solid var(--clr-neutral-300);"></td>
                <td id="td-capacity-model2" style="padding: 1rem; border: 1px solid var(--clr-neutral-300);"></td>
                <td id="td-capacity-model3" style="padding: 1rem; border: 1px solid var(--clr-neutral-300);"></td>
              </tr>
              <tr>
                <td style="padding: 1rem; border: 1px solid var(--clr-neutral-300); font-weight: 600;">Range (per charge)</td>
                <td id="td-range-model1" style="padding: 1rem; border: 1px solid var(--clr-neutral-300);"></td>
                <td id="td-range-model2" style="padding: 1rem; border: 1px solid var(--clr-neutral-300);"></td>
                <td id="td-range-model3" style="padding: 1rem; border: 1px solid var(--clr-neutral-300);"></td>
              </tr>
              <tr style="background-color: var(--clr-neutral-100);">
                <td style="padding: 1rem; border: 1px solid var(--clr-neutral-300); font-weight: 600;">Top Speed</td>
                <td id="td-speed-model1" style="padding: 1rem; border: 1px solid var(--clr-neutral-300);"></td>
                <td id="td-speed-model2" style="padding: 1rem; border: 1px solid var(--clr-neutral-300);"></td>
                <td id="td-speed-model3" style="padding: 1rem; border: 1px solid var(--clr-neutral-300);"></td>
              </tr>
              <tr>
                <td style="padding: 1rem; border: 1px solid var(--clr-neutral-300); font-weight: 600;">Battery Type</td>
                <td id="td-battery-model1" style="padding: 1rem; border: 1px solid var(--clr-neutral-300);"></td>
                <td id="td-battery-model2" style="padding: 1rem; border: 1px solid var(--clr-neutral-300);"></td>
                <td id="td-battery-model3" style="padding: 1rem; border: 1px solid var(--clr-neutral-300);"></td>
              </tr>
              <tr style="background-color: var(--clr-neutral-100);">
                <td style="padding: 1rem; border: 1px solid var(--clr-neutral-300); font-weight: 600;">Best For</td>
                <td id="td-bestfor-model1" style="padding: 1rem; border: 1px solid var(--clr-neutral-300);"></td>
                <td id="td-bestfor-model2" style="padding: 1rem; border: 1px solid var(--clr-neutral-300);"></td>
                <td id="td-bestfor-model3" style="padding: 1rem; border: 1px solid var(--clr-neutral-300);"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <script>
      const vehiclesData = {
        etrike: {
          name: 'eTRIKE',
          capacity: '3-4 Passengers',
          range: 'Up to 80 km',
          speed: '45 km/h',
          battery: 'LiFePO4 72V',
          bestfor: 'Last-mile, tight streets',
          image: './assets/etrike.png'
        },
        eshuttle: {
          name: 'eSHUTTLE',
          capacity: '12-15 Passengers',
          range: 'Up to 120 km',
          speed: '60 km/h',
          battery: 'LiFePO4 96V',
          bestfor: 'Resorts, campuses, transit',
          image: './assets/eshuttle.png'
        },
        bevdeluxe: {
          name: 'BEV Deluxe',
          capacity: '4 Passengers',
          range: 'Up to 250 km',
          speed: '120 km/h',
          battery: 'LiFePO4 300V',
          bestfor: 'Taxi, premium ride-hailing',
          image: './assets/bevdeluxe.png'
        },
        emover: {
          name: 'eMOVER',
          capacity: '2 Passengers + Cargo',
          range: 'Up to 150 km',
          speed: '80 km/h',
          battery: 'LiFePO4 144V',
          bestfor: 'Urban delivery, logistics',
          image: './assets/emover.png'
        },
        elinebus: {
          name: 'eLine Bus',
          capacity: '30-40 Passengers',
          range: 'Up to 200 km',
          speed: '80 km/h',
          battery: 'LiFePO4 600V',
          bestfor: 'City transit, mass transport',
          image: './assets/elinebus.png'
        },
        eridecargo: {
          name: 'eRIDE Cargo+',
          capacity: '1 Passenger + Heavy Cargo',
          range: 'Up to 100 km',
          speed: '50 km/h',
          battery: 'LiFePO4 72V',
          bestfor: 'Industrial, warehouse',
          image: './assets/eridecargo.png'
        }
      };

      function updateTable() {
        const models = [
          document.getElementById('model1').value,
          document.getElementById('model2').value,
          document.getElementById('model3').value
        ];

        models.forEach((modelId, index) => {
          const colIndex = index + 1;
          
          if (modelId === 'none') {
            document.getElementById(\`th-model\${colIndex}\`).style.display = 'none';
            document.getElementById(\`td-image-model\${colIndex}\`).style.display = 'none';
            document.getElementById(\`td-capacity-model\${colIndex}\`).style.display = 'none';
            document.getElementById(\`td-range-model\${colIndex}\`).style.display = 'none';
            document.getElementById(\`td-speed-model\${colIndex}\`).style.display = 'none';
            document.getElementById(\`td-battery-model\${colIndex}\`).style.display = 'none';
            document.getElementById(\`td-bestfor-model\${colIndex}\`).style.display = 'none';
          } else {
            const data = vehiclesData[modelId];
            document.getElementById(\`th-model\${colIndex}\`).style.display = 'table-cell';
            document.getElementById(\`th-model\${colIndex}\`).textContent = data.name;
            
            document.getElementById(\`td-image-model\${colIndex}\`).style.display = 'table-cell';
            document.getElementById(\`td-image-model\${colIndex}\`).innerHTML = \`<img src="\${data.image}" alt="\${data.name}" style="width: 100%; max-width: 200px; border-radius: 8px; object-fit: contain; height: 120px;" onerror="this.src='https://placehold.co/300x200?text=' + encodeURIComponent(data.name)">\`;
            
            document.getElementById(\`td-capacity-model\${colIndex}\`).style.display = 'table-cell';
            document.getElementById(\`td-capacity-model\${colIndex}\`).textContent = data.capacity;
            
            document.getElementById(\`td-range-model\${colIndex}\`).style.display = 'table-cell';
            document.getElementById(\`td-range-model\${colIndex}\`).textContent = data.range;
            
            document.getElementById(\`td-speed-model\${colIndex}\`).style.display = 'table-cell';
            document.getElementById(\`td-speed-model\${colIndex}\`).textContent = data.speed;
            
            document.getElementById(\`td-battery-model\${colIndex}\`).style.display = 'table-cell';
            document.getElementById(\`td-battery-model\${colIndex}\`).textContent = data.battery;
            
            document.getElementById(\`td-bestfor-model\${colIndex}\`).style.display = 'table-cell';
            document.getElementById(\`td-bestfor-model\${colIndex}\`).textContent = data.bestfor;
          }
        });
      }

      document.getElementById('model1').addEventListener('change', updateTable);
      document.getElementById('model2').addEventListener('change', updateTable);
      document.getElementById('model3').addEventListener('change', updateTable);

      // Initialize
      updateTable();
    </script>`;

const updatedHtml = compareHtml.replace(/<section class="tech-section">[\s\S]*?<\/section>/, dynamicSection);

fs.writeFileSync('compare.html', updatedHtml);
console.log('Done');
