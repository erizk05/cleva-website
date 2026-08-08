const fs = require('fs');

// 1. Update vehicles.html
let vehiclesHtml = fs.readFileSync('vehicles.html', 'utf8');

// Replace getSvgForCategory inside filteredVehicles.map
// From:
//            ${getSvgForCategory(v.category)}
// To:
//            ${v.id === 'etrike-tt' ? '<img src="./assets/images/etrike-tt.png" alt="' + v.name + '" style="width: 100%; height: 100%; object-fit: contain;">' : getSvgForCategory(v.category)}

vehiclesHtml = vehiclesHtml.replace(
    /\$\{getSvgForCategory\(v\.category\)\}/g,
    "${v.id === 'etrike-tt' ? '<img src=\"./assets/images/etrike-tt.png\" alt=\"' + v.name + '\" style=\"width: 100%; height: 100%; object-fit: contain; padding: 20px;\">' : getSvgForCategory(v.category)}"
);

fs.writeFileSync('vehicles.html', vehiclesHtml);

// 2. Update js/pages/vehicle.js
let vehicleJs = fs.readFileSync('js/pages/vehicle.js', 'utf8');

vehicleJs = vehicleJs.replace(
    /<img src="https:\/\/placehold.co\/800x600\/2a2a2a\/ffffff\?text=Front\+Angle" alt="\$\{v.name\} Front Angle" \/>/g,
    `<img src="\${v.id === 'etrike-tt' ? './assets/images/etrike-tt.png' : 'https://placehold.co/800x600/2a2a2a/ffffff?text=Front+Angle'}" alt="\${v.name} Front Angle" \/>`
);

fs.writeFileSync('js/pages/vehicle.js', vehicleJs);

