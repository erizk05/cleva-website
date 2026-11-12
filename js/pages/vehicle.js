// START FILE: vehicle.js
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('vehicle-details-container');
  if (!container || typeof VEHICLES === 'undefined') return;

  const urlParams = new URLSearchParams(window.location.search);
  const vehicleId = urlParams.get('id');

  const v = VEHICLES.find(vehicle => vehicle.id === vehicleId) ||
    (vehicleId === 'etrike' ? VEHICLES.find(x => x.id === 'etrike-tt') : null) ||
    (vehicleId === 'bev-family' ? VEHICLES.find(x => x.id === 'ev4-family') : null) ||
    (vehicleId === 'bev-twin-pax' || vehicleId === 'bev-twin' ? VEHICLES.find(x => x.id === 'ev4-pax') : null) ||
    (vehicleId === 'commercial-cargo' ? VEHICLES.find(x => x.id === 'commercial-4pax-cargo') : null) ||
    VEHICLES.find(x => x.id.replace(/-/g, '') === (vehicleId || '').replace(/-/g, ''));

  if (!v) {
    container.innerHTML = `
      <div style="text-align: center; padding: 4rem 0;">
        <h2>Vehicle not found</h2>
        <p class="text-muted">The vehicle you are looking for does not exist.</p>
        <a href="./vehicles.html" class="btn btn-primary" style="margin-top: 1rem; display: inline-block;">Return to Products</a>
      </div>
    `;
    return;
  }

  document.title = `${v.name} | CLEVA Passenger EV Standard`;

  const isInactive = v.inactive || v.category === 'agri';
  const isComingSoon = (typeof v.comingSoon === 'boolean') ? v.comingSoon : isInactive;
  const REAL_PHOTO_IDS = ['bevdeluxe', 'etrike-tt', 'etrike-toda', 'ev4-pwd', 'ev4-compact', 'bev-weekender', 'ev4-family', 'bev-family', 'commercial-4pax-cargo'];
  const hasRealPhoto = (typeof v.hasRealPhoto === 'boolean') ? v.hasRealPhoto : REAL_PHOTO_IDS.includes(v.id);

  // Determine carousel images
  let slides = [];

  if (v.id === 'bev-weekender') {
    slides = [
      './assets/images/bev-weekender-front.jpg',
      './assets/images/bev-weekender-side.jpg',
      './assets/images/bev-weekender-inside.jpg',
      './assets/images/bev-weekender-back.jpg'
    ];
  } else if (v.id === 'ev4-family' || v.id === 'bev-family') {
    slides = [
      './assets/images/bev-family-front.jpg',
      './assets/images/bev-family-side.jpg',
      './assets/images/bev-family-inside.jpg',
      './assets/images/bev-family-back.jpg'
    ];
  } else if (v.id === 'etrike-tt') {
    slides = [
      './assets/images/tuk-tuk-front.jpg',
      './assets/images/tuk-tuk-side.jpg'
    ];
  } else if (v.id === 'commercial-4pax-cargo') {
    slides = [
      './assets/images/4ev-comcargo-front.jpg',
      './assets/images/4ev-comcargo-side.jpg',
      './assets/images/4ev-comcargo-inside.jpg',
      './assets/images/ev4-comm-cargo-back.jpg'
    ];
  } else if (v.id === 'etrike-toda') {
    slides = [
      './assets/images/etrike-toda.jpg',
      './assets/images/toda-2.jpg',
      './assets/images/toda-3.jpg',
      './assets/images/toda-1.jpg'
    ];
  } else if (v.id === 'bevdeluxe') {
    slides = [
      './assets/images/comp4-4.jpg',
      './assets/images/comp4-1.jpg',
      './assets/images/comp4-2.jpg',
      './assets/images/comp4-3.jpg'
    ];
  } else if (v.id === 'bev-sporty') {
    slides = [
      './assets/images/bev-sporty-side.jpg',
      './assets/images/sporty-2.jpg',
      './assets/images/sport-1.jpg',
      './assets/images/sporty-3.jpg'
    ];
  } else if (v.id === 'bev-utility') {
    slides = [
      './assets/images/bev-utility-scap-side.jpg',
      './assets/images/bev-utility-tipper.jpg',
      './assets/images/bev-utility-scap-back.jpg',
      './assets/images/bev-utility-scap-inside.jpg'
    ];
  } else if (v.id === 'ev4-pax') {
    slides = [
      './assets/images/bev-utility-dcap-side.jpg',
      './assets/images/bev-utility-dcap-front.jpg',
      './assets/images/bev-utility-dcap-back.jpg',
      './assets/images/bev-utility-dcap-inside.jpg'
    ];
  } else if (v.id === 'eshuttle') {
    slides = [
      './assets/images/bev-eshuttle-side.jpg',
      './assets/images/bev-eshuttle-front.jpg',
      './assets/images/bev-eshuttle-back.jpg',
      './assets/images/bev-eshuttle-inside.jpg'
    ];
  } else if (v.id === 'ev4-pwd') {
    slides = [
      './assets/images/bev-pwd.jpg',
      './assets/images/pwd-front.jpg',
      './assets/images/pwd-side2.jpg',
      './assets/images/pwd-draw.jpg'
    ];
  } else if (v.id === 'ev4-compact') {
    slides = [
      './assets/images/comp2-4.jpg',
      './assets/images/comp2-3.jpg',
      './assets/images/comp2-2.jpg',
      './assets/images/comp2-1.jpg'
    ];
  } else if (v.dummyImage) {
    slides = [v.dummyImage];
  } else {
    slides = [v.image || './assets/images/dummy-bev.svg'];
  }

  const primaryImgStyle = (v.dummyImage || hasRealPhoto || v.id === 'commercial-4pax-cargo') ? 'mix-blend-mode: multiply;' : '';

  const defaultModelOptions = {
    'etrike-toda': ['Solar Roof Charging Panel', 'Extended Range Battery Pack', 'All-Weather Rain Curtains', 'Fleet GPS Telematics Tracker'],
    'etrike-tt': ['Solar Roof Charging Panel', 'High-Capacity LiFePO4 Pack', 'All-Weather Roll-Down Curtains', 'Bluetooth Sound System'],
    'ev4-compact': ['Climate Control A/C', 'Solar Panels', 'Four-Wheel Disc Brakes', 'Split Seats'],
    'bevdeluxe': ['Climate Control A/C', 'Solar Panels', 'Four-Wheel Disc Brakes', 'Split Seats'],
    'ev4-family': ['Climate Control A/C', 'Solar Roof Charging Panel', 'Rear Entertainment System', 'Child Safety Isofix Anchors'],
    'bev-weekender': ['Off-Road All-Terrain Kit', 'Heavy-Duty Roof Cargo Basket', 'High-Output Auxiliary LED Light', 'Dual-Source Solar Panel'],
    'bev-sporty': ['Sport Alloy Wheels & Tires', 'Custom Aerodynamic Rear Wing', 'Sport Vector Controller', 'Fast-Charge Inverter Upgrade'],
    'commercial-4pax-cargo': ['Heavy-Duty Bed Tie-Down Rails', 'Weatherproof Bed Canvas Cover', 'Solar Roof Power Kit', 'Fleet GPS Telematics'],
    'bev-utility': ['Hydraulic Tipper Dumping Mechanism', 'High-Side Cargo Bed Cage', 'Weatherproof Heavy-Duty Tarpaulin', 'Tow Hitch & Step Bumper'],
    'ev4-pax': ['Fold-Flat Rear Cargo Conversion', 'Weatherproof Bed Canopy', 'Commercial Fleet Telematics GPS', 'Reinforced Leaf Springs'],
    'eshuttle': ['Wheelchair Ramp & Tie-Downs', 'Automated Passenger Door', 'Dual High-Capacity A/C System', 'Passenger PA System'],
    'ev4-pwd': ['Electric Wheelchair Ramp', 'Certified 4-Point Tie-Downs', 'High-Visibility LED Step Light', 'Companion Swivel Seats'],
    'agri-dump': ['Hydraulic Self-Dumping Bed', 'Reinforced Steel Sideboards', 'All-Terrain Knobby Tires', 'Rear Safety Work Light'],
    'agri-flatbed': ['Drop-Down Flatbed Side Panels', 'Stake Pockets & Tie-Downs', 'Solar Roof Array', 'Rear Hydraulic Crane Option']
  };

  const modelOptions = (v['Optional Features'] || v['Options'] || v.options || v['Optional Add-ons'] || v.optionalAddons)?.length
    ? (v['Optional Features'] || v['Options'] || v.options || v['Optional Add-ons'] || v.optionalAddons)
    : (defaultModelOptions[v.id] || ['Solar Roof Charging Panel', 'Extended Range Battery Pack', 'Fast-Charge Inverter Kit', 'Fleet Telematics GPS']);

  const overviewHighlights = (Array.isArray(v.overviewHighlights) && v.overviewHighlights.length >= 3)
    ? v.overviewHighlights.slice(0, 3)
    : [
        v.badge ? v.badge.toUpperCase() : '100% ELECTRIC',
        v.category === 'ev3' ? 'L5e CERTIFIED' : 'L6e CERTIFIED',
        'MAX SPEED 45 kph'
      ];

  const extraDescContent = Array.isArray(v.extraDescription)
    ? `<ul style="display: flex; flex-direction: column; gap: 0.35rem; list-style: none; padding-left: 0; margin: 0;">
        ${v.extraDescription.map(d => `<li style="display: flex; align-items: flex-start; gap: 0.45rem; font-size: 0.88rem; line-height: 1.45; color: #1e293b;">
          <svg style="flex-shrink: 0; margin-top: 0.2rem; color: var(--clr-primary, #047857);" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span style="overflow-wrap: anywhere; word-break: break-word;">${d}</span>
        </li>`).join('')}
      </ul>`
    : `<p style="margin: 0; font-size: 0.9rem; line-height: 1.55; color: var(--clr-text-2, #374151); word-break: break-word;">${v.extraDescription || v.extra_description || "Optimized for urban and suburban community routes with reinforced chassis, low maintenance overhead, and rapid turnaround charging options."}</p>`;

  container.innerHTML = `
    <div class="vehicle-details-card">
      
      ${isInactive ? `
        <div style="margin-bottom: 1rem; padding: 0.75rem 1.25rem; background: rgba(71,85,105,0.08); border: 1px solid #cbd5e1; border-radius: 8px; display: flex; align-items: center; gap: 0.75rem;">
          <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: #94a3b8;"></span>
          <span style="font-size: 0.9rem; color: #475569; font-weight: 500;">Notice: This model belongs to the C.L.E.V.A. Agricultural Division, which is currently in development and inactive.</span>
        </div>
      ` : ''}

      <!-- Master Header Bar -->
      <div class="vehicle-master-header-bar">
        <div class="vehicle-master-header-top">
          <!-- Top Left: Logo + Brand Title -->
          <div class="vehicle-master-header-brand">
            <img src="./assets/images/logo.png" alt="C.L.E.V.A Logo" />
            <span>C.L.E.V.A <span style="opacity: 0.7; font-weight: 400; margin: 0 0.2rem;">|</span> ELECTRIC SERVICE VEHICLE</span>
          </div>

          <!-- Top Right: Model Name -->
          <div class="vehicle-master-header-name">
            ${v.name.toUpperCase()}
          </div>
        </div>

        <!-- Body: Model Description -->
        <div class="vehicle-master-header-desc">
          ${v.description}
        </div>
      </div>

      <div class="vehicle-details-grid">
        
        <!-- Left Side: Overview & Carousel -->
        <div class="vehicle-details-col">
          <div style="background: var(--clr-primary, #047857); color: #ffffff; border-radius: 8px; padding: 0.6rem 1rem; margin-bottom: 0.85rem; text-align: center; display: flex; align-items: center; justify-content: center; gap: 0.5rem; box-shadow: 0 2px 4px rgba(4, 120, 87, 0.15);">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: #ffffff;"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            <h2 style="font-size: 1.05rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: #ffffff; margin: 0;">VEHICLE OVERVIEW</h2>
          </div>

          <!-- 3 Fields Under VEHICLE OVERVIEW Bar -->
          <div class="overview-highlights-grid">
            ${overviewHighlights.map(item => `
              <div class="overview-highlight-box">
                <span title="${item}">${item}</span>
              </div>
            `).join('')}
          </div>

          <div class="carousel-container" style="margin-bottom: 0.75rem; border-radius: 8px; overflow: hidden; width: 100%; max-width: 100%;">
            <div class="modal-carousel" id="modal-carousel">
              ${slides.map((imgSrc, i) => `
                <div class="modal-carousel-item" style="position: relative;">
                  <img src="${imgSrc}" alt="${v.name} Angle ${i + 1}" style="object-fit: contain; width: 100%; height: 100%; ${primaryImgStyle}" />
                  ${(i === 0 && isInactive) ? `
                    <div class="coming-soon-badge" style="position: absolute; top: 14px; right: 14px; font-size: 0.75rem; padding: 4px 10px; background: rgba(51, 65, 85, 0.9);">
                      <span class="coming-soon-dot" style="width: 7px; height: 7px; background: #94a3b8;"></span>
                      Inactive &bull; Coming Soon
                    </div>
                  ` : ((i === 0 && isComingSoon) ? `
                    <div class="coming-soon-badge" style="position: absolute; top: 14px; right: 14px; font-size: 0.75rem; padding: 4px 10px;">
                      <span class="coming-soon-dot" style="width: 7px; height: 7px;"></span>
                      Coming Soon
                    </div>
                  ` : '')}
                </div>
              `).join('')}
            </div>
            ${slides.length > 1 ? `
              <div class="carousel-dots" id="modal-carousel-dots" style="margin-top: 0.4rem;">
                ${slides.map((_, i) => `
                  <button class="carousel-dot ${i === 0 ? 'active' : ''}" aria-label="Go to slide ${i + 1}" data-index="${i}"></button>
                `).join('')}
              </div>
            ` : ''}
          </div>

          <!-- Extra Description Data Box under the images -->
          <div class="vehicle-extra-description" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.85rem 1rem; width: 100%; box-sizing: border-box; margin-top: 0.75rem;">
            <div style="display: flex; align-items: center; gap: 0.45rem; margin-bottom: 0.45rem;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--clr-primary, #047857);"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <h3 style="margin: 0; font-size: 0.95rem; font-weight: 700; color: #065f46; letter-spacing: -0.01em;">Extra Description</h3>
            </div>
            ${extraDescContent}
          </div>
        </div>

        <!-- Right Side: Info & Actions -->
        <div class="vehicle-details-col">
          <div style="background: var(--clr-primary, #047857); color: #ffffff; border-radius: 8px; padding: 0.6rem 1rem; margin-bottom: 0.85rem; text-align: center; display: flex; align-items: center; justify-content: center; gap: 0.5rem; box-shadow: 0 2px 4px rgba(4, 120, 87, 0.15);">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: #ffffff;"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
            <h2 style="font-size: 1.05rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: #ffffff; margin: 0;">SPECIFICATION</h2>
          </div>

          <div class="vehicle-header" style="align-items: center; justify-content: space-between; margin-bottom: 0.75rem; display: flex; flex-wrap: wrap; gap: 0.5rem;">
            <p class="vehicle-tagline" style="font-size: 1rem; font-weight: 600; color: var(--clr-text-2, #475569); margin: 0;">${v.tagline}</p>
            <span class="badge" style="font-size: 0.82rem; padding: 0.3rem 0.75rem; border-radius: 6px; ${isInactive ? 'background: #e2e8f0; color: #475569;' : ''}">${isInactive ? 'Coming Soon' : v.badge}</span>
          </div>
          
          <div class="modal-specs-grid" style="margin-bottom: 0.85rem;">
            ${Object.entries(v.specs).map(([key, value]) => `
              <div class="modal-spec-item">
                <span class="modal-spec-label" title="${key}">${key}</span>
                <span class="modal-spec-value" title="${value}">${value}</span>
              </div>
            `).join('')}
          </div>

          <!-- Configurations and Optional Features side-by-side -->
          <div class="vehicle-highlights-row">
            
            <!-- Main Configuration -->
            <div class="modal-highlights">
              <h3 style="margin-bottom: 0.4rem; font-size: 0.95rem; font-weight: 700; color: #065f46; letter-spacing: -0.01em;">Main Configuration</h3>
              <ul style="display: flex; flex-direction: column; gap: 0.3rem; list-style: none; padding-left: 0; margin: 0;">
                ${(v['Main Configuration'] || v.mainConfiguration || v.highlights || []).map(h => `<li style="display: flex; align-items: flex-start; gap: 0.45rem; margin-bottom: 0; font-size: 0.82rem; line-height: 1.35; color: #1e293b;">
                  <svg style="flex-shrink: 0; margin-top: 0.15rem; color: var(--clr-primary, #047857);" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  <span style="overflow-wrap: anywhere; word-break: break-word;">${h}</span>
                </li>`).join('')}
              </ul>
            </div>

            <!-- Optional Features -->
            <div class="modal-highlights">
              <h3 style="margin-bottom: 0.4rem; font-size: 0.95rem; font-weight: 700; color: #065f46; letter-spacing: -0.01em;">Optional Features</h3>
              <ul style="display: flex; flex-direction: column; gap: 0.3rem; list-style: none; padding-left: 0; margin: 0;">
                ${modelOptions.map(opt => `<li style="display: flex; align-items: flex-start; gap: 0.45rem; margin-bottom: 0; font-size: 0.82rem; line-height: 1.35; color: #1e293b;">
                  <svg style="flex-shrink: 0; margin-top: 0.15rem; color: var(--clr-primary, #047857);" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                  <span style="overflow-wrap: anywhere; word-break: break-word;">${opt}</span>
                </li>`).join('')}
              </ul>
            </div>

          </div>

          <div style="text-align: left; width: 100%;">
            ${isInactive ? `
              <a href="./contact.html?subject=Agricultural+Division+Inquiry" class="btn" style="font-size: 1rem; font-weight: 700; padding: 0.75rem 1.5rem; width: 100%; text-align: center; background: #e2e8f0; color: #475569; border: 1px solid #cbd5e1; border-radius: 8px; display: block; box-sizing: border-box;">Inquire for Future Availability</a>
            ` : `
              <a href="./contact.html?product=${v.id}" class="btn btn-primary" style="font-size: 1rem; font-weight: 700; padding: 0.75rem 1.5rem; width: 100%; text-align: center; border-radius: 8px; display: block; box-sizing: border-box;">Request Quote</a>
            `}
          </div>
        </div>

      </div>
    </div>
  `;

  // Initialize carousel
  const carousel = document.getElementById('modal-carousel');
  const dots = document.querySelectorAll('#modal-carousel-dots .carousel-dot');
  
  if (carousel && dots.length > 0) {
    carousel.addEventListener('scroll', () => {
      const scrollLeft = carousel.scrollLeft;
      const width = carousel.offsetWidth;
      const index = Math.round(scrollLeft / width);
      
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    });

    dots.forEach((dot) => {
      dot.addEventListener('click', (e) => {
        const index = parseInt(e.target.getAttribute('data-index'));
        const width = carousel.offsetWidth;
        carousel.scrollTo({
          left: index * width,
          behavior: 'smooth'
        });
      });
    });
  }
});
// END FILE: vehicle.js
