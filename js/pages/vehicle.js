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

  // Determine carousel 4 images
  let slide1 = '';
  let slide2 = '';
  let slide3 = '';
  let slide4 = '';

  if (v.id === 'bev-weekender') {
    slide1 = './assets/images/bev-weekender-front.jpg';
    slide2 = './assets/images/bev-weekender-side.jpg';
    slide3 = './assets/images/bev-weekender-inside.jpg';
    slide4 = './assets/images/bev-weekender-back.jpg';
  } else if (v.id === 'ev4-family' || v.id === 'bev-family') {
    slide1 = './assets/images/bev-family-front.jpg';
    slide2 = './assets/images/bev-family-side.jpg';
    slide3 = './assets/images/bev-family-inside.jpg';
    slide4 = './assets/images/bev-family-back.jpg';
  } else if (v.id === 'etrike-tt') {
    slide1 = './assets/images/etrike-tt.jpg';
    slide2 = './assets/images/etrike-tt-2.png';
    slide3 = './assets/images/etrike-tt-3.png';
    slide4 = './assets/images/etrike-tt-4.png';
  } else if (v.id === 'commercial-4pax-cargo') {
    slide1 = './assets/images/4ev-comcargo-front.jpg';
    slide2 = './assets/images/4ev-comcargo-side.jpg';
    slide3 = './assets/images/4ev-comcargo-inside.jpg';
    slide4 = './assets/images/ev4-comm-cargo-back.jpg';
  } else if (v.id === 'etrike-toda') {
    slide1 = './assets/images/etrike-toda.jpg';
    slide2 = './assets/images/toda-2.jpg';
    slide3 = './assets/images/toda-3.jpg';
    slide4 = './assets/images/toda-1.jpg';
  } else if (v.id === 'bevdeluxe') {
    slide1 = './assets/images/comp4-4.jpg';
    slide2 = './assets/images/comp4-1.jpg';
    slide3 = './assets/images/comp4-2.jpg';
    slide4 = './assets/images/comp4-3.jpg';
  } else if (v.id === 'bev-sporty') {
    slide1 = './assets/images/bev-sporty-side.jpg';
    slide2 = './assets/images/sporty-2.jpg';
    slide3 = './assets/images/sport-1.jpg';
    slide4 = './assets/images/sporty-3.jpg';
  } else if (v.id === 'bev-utility') {
    slide1 = './assets/images/bev-utility-scap-side.jpg';
    slide2 = './assets/images/bev-utility-tipper.jpg';
    slide3 = './assets/images/bev-utility-scap-back.jpg';
    slide4 = './assets/images/bev-utility-scap-inside.jpg';
  } else if (v.id === 'ev4-pax') {
    slide1 = './assets/images/bev-utility-dcap-side.jpg';
    slide2 = './assets/images/bev-utility-dcap-front.jpg';
    slide3 = './assets/images/bev-utility-dcap-back.jpg';
    slide4 = './assets/images/bev-utility-dcap-inside.jpg';
  } else if (v.id === 'eshuttle') {
    slide1 = './assets/images/bev-eshuttle-side.jpg';
    slide2 = './assets/images/bev-eshuttle-front.jpg';
    slide3 = './assets/images/bev-eshuttle-back.jpg';
    slide4 = './assets/images/bev-eshuttle-inside.jpg';
  } else if (v.id === 'ev4-pwd') {
    slide1 = './assets/images/bev-pwd.jpg';
    slide2 = './assets/images/pwd-front.jpg';
    slide3 = './assets/images/pwd-side2.jpg';
    slide4 = './assets/images/pwd-draw.jpg';
  } else if (v.id === 'ev4-compact') {
    slide1 = './assets/images/bev-compact.jpg';
    slide2 = './assets/images/bev-homebase1-side.jpg';
    slide3 = './assets/images/bev-compact.jpg';
    slide4 = './assets/images/bev-homebase1-side.jpg';
  } else if (v.dummyImage) {
    slide1 = v.dummyImage;
    slide2 = v.dummyImage;
    slide3 = v.dummyImage;
    slide4 = v.dummyImage;
  } else {
    slide1 = v.image || './assets/images/dummy-bev.svg';
    slide2 = slide1;
    slide3 = slide1;
    slide4 = slide1;
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
    'agri-on-road': ['High-Torque Heavy Load Gear', 'All-Terrain Agricultural Tires', 'Solar Auxiliary Canopy', 'Electric Winch Kit'],
    'agri-off-road': ['AWD Dual-Motor Traction Package', 'High-Ground Clearance Lift Kit', 'Front & Rear Winch', 'Farm Towing Attachment'],
    'agri-dump': ['Hydraulic Self-Dumping Bed', 'Reinforced Steel Sideboards', 'All-Terrain Knobby Tires', 'Rear Safety Work Light'],
    'agri-flatbed': ['Drop-Down Flatbed Side Panels', 'Stake Pockets & Tie-Downs', 'Solar Roof Array', 'Rear Hydraulic Crane Option']
  };

  const modelOptions = (v['Optional Features'] || v['Options'] || v.options || v['Optional Add-ons'] || v.optionalAddons)?.length
    ? (v['Optional Features'] || v['Options'] || v.options || v['Optional Add-ons'] || v.optionalAddons)
    : (defaultModelOptions[v.id] || ['Solar Roof Charging Panel', 'Extended Range Battery Pack', 'Fast-Charge Inverter Kit', 'Fleet Telematics GPS']);

  container.innerHTML = `
    <div style="background: var(--clr-surface); border: 1px solid var(--clr-border); border-radius: 12px; padding: 1.25rem 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
      
      ${isInactive ? `
        <div style="margin-bottom: 1rem; padding: 0.75rem 1.25rem; background: rgba(71,85,105,0.08); border: 1px solid #cbd5e1; border-radius: 8px; display: flex; align-items: center; gap: 0.75rem;">
          <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: #94a3b8;"></span>
          <span style="font-size: 0.9rem; color: #475569; font-weight: 500;">Notice: This model belongs to the C.L.E.V.A. Agricultural Division, which is currently in development and inactive.</span>
        </div>
      ` : ''}

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 1.5rem;">
        
        <!-- Left Side: Images & Description -->
        <div>
          <div style="background: var(--clr-primary, #047857); color: #ffffff; border-radius: 8px; padding: 0.6rem 1rem; margin-bottom: 0.85rem; text-align: center; display: flex; align-items: center; justify-content: center; gap: 0.5rem; box-shadow: 0 2px 4px rgba(4, 120, 87, 0.15);">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: #ffffff;"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            <h2 style="font-size: 1.05rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: #ffffff; margin: 0;">VEHICLE OVERVIEW</h2>
          </div>

          <div class="carousel-container" style="margin-bottom: 0.75rem; border-radius: 8px; overflow: hidden;">
            <div class="modal-carousel" id="modal-carousel">
              <div class="modal-carousel-item" style="height: 330px; position: relative;">
                <img src="${slide1}" alt="${v.name} Angle 1" style="object-fit: contain; width: 100%; height: 100%; ${primaryImgStyle}" />
                ${isInactive ? `
                  <div class="coming-soon-badge" style="position: absolute; top: 14px; right: 14px; font-size: 0.75rem; padding: 4px 10px; background: rgba(51, 65, 85, 0.9);">
                    <span class="coming-soon-dot" style="width: 7px; height: 7px; background: #94a3b8;"></span>
                    Inactive &bull; Coming Soon
                  </div>
                ` : (isComingSoon ? `
                  <div class="coming-soon-badge" style="position: absolute; top: 14px; right: 14px; font-size: 0.75rem; padding: 4px 10px;">
                    <span class="coming-soon-dot" style="width: 7px; height: 7px;"></span>
                    Coming Soon
                  </div>
                ` : '')}
              </div>
              <div class="modal-carousel-item" style="height: 330px;">
                <img src="${slide2}" alt="${v.name} Angle 2" style="object-fit: contain; width: 100%; height: 100%; ${primaryImgStyle}" />
              </div>
              <div class="modal-carousel-item" style="height: 330px;">
                <img src="${slide3}" alt="${v.name} Angle 3" style="object-fit: contain; width: 100%; height: 100%; ${primaryImgStyle}" />
              </div>
              <div class="modal-carousel-item" style="height: 330px;">
                <img src="${slide4}" alt="${v.name} Angle 4" style="object-fit: contain; width: 100%; height: 100%; ${primaryImgStyle}" />
              </div>
            </div>
            <div class="carousel-dots" id="modal-carousel-dots" style="margin-top: 0.4rem;">
              <button class="carousel-dot active" aria-label="Go to slide 1" data-index="0"></button>
              <button class="carousel-dot" aria-label="Go to slide 2" data-index="1"></button>
              <button class="carousel-dot" aria-label="Go to slide 3" data-index="2"></button>
              <button class="carousel-dot" aria-label="Go to slide 4" data-index="3"></button>
            </div>
          </div>
          
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.85rem 1rem;">
             <h3 style="margin-bottom: 0.35rem; font-size: 1.05rem; font-weight: 700; color: var(--clr-text);">Description</h3>
             <p class="text-muted" style="font-size: 0.92rem; line-height: 1.55; color: var(--clr-text-2, #374151); margin: 0;">${v.description}</p>
          </div>
        </div>

        <!-- Right Side: Info & Actions -->
        <div>
          <div style="background: var(--clr-primary, #047857); color: #ffffff; border-radius: 8px; padding: 0.6rem 1rem; margin-bottom: 0.85rem; text-align: center; display: flex; align-items: center; justify-content: center; gap: 0.5rem; box-shadow: 0 2px 4px rgba(4, 120, 87, 0.15);">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: #ffffff;"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
            <h2 style="font-size: 1.05rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: #ffffff; margin: 0;">SPECIFICATION</h2>
          </div>

          <div class="vehicle-header" style="align-items: flex-start; margin-bottom: 0.75rem; flex-direction: column; gap: 0.25rem;">
            <div>
              <h1 class="font-display" style="font-size: 1.85rem; font-weight: 800; line-height: 1.15; margin-bottom: 0.2rem; color: var(--clr-text);">${v.name}</h1>
              <p class="vehicle-tagline" style="font-size: 0.98rem; color: var(--clr-text-2, #475569); margin-bottom: 0.35rem;">${v.tagline}</p>
            </div>
            <span class="badge" style="font-size: 0.82rem; padding: 0.3rem 0.75rem; border-radius: 6px; ${isInactive ? 'background: #e2e8f0; color: #475569;' : ''}">${isInactive ? 'Coming Soon' : v.badge}</span>
          </div>
          
          <div class="modal-specs-grid" style="margin-bottom: 0.85rem; grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); gap: 0.5rem;">
            ${Object.entries(v.specs).map(([key, value]) => `
              <div class="modal-spec-item" style="padding: 0.55rem 0.75rem; min-width: 0; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; display: flex; flex-direction: column; justify-content: flex-start;">
                <span class="modal-spec-label" style="font-size: 0.72rem; margin-bottom: 0.2rem; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.02em; line-height: 1.3; white-space: normal; word-break: break-word; display: block;" title="${key}">${key}</span>
                <span class="modal-spec-value" style="font-size: 0.85rem; line-height: 1.35; font-weight: 700; color: #0f172a; white-space: normal; word-break: break-word; display: block;" title="${value}">${value}</span>
              </div>
            `).join('')}
          </div>

          <!-- Configurations and Optional Features side-by-side -->
          <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem; margin-top: 0;">
            
            <!-- Main Configuration -->
            <div class="modal-highlights" style="flex: 1; min-width: 200px; margin-top: 0; margin-bottom: 0; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.75rem 0.9rem;">
              <h3 style="margin-bottom: 0.4rem; font-size: 0.95rem; font-weight: 700; color: #065f46; letter-spacing: -0.01em;">Main Configuration</h3>
              <ul style="display: flex; flex-direction: column; gap: 0.3rem; list-style: none; padding-left: 0; margin: 0;">
                ${(v['Main Configuration'] || v.mainConfiguration || v.highlights || []).map(h => `<li style="display: flex; align-items: flex-start; gap: 0.45rem; margin-bottom: 0; font-size: 0.82rem; line-height: 1.35; color: #1e293b;">
                  <svg style="flex-shrink: 0; margin-top: 0.15rem; color: var(--clr-primary, #047857);" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  <span>${h}</span>
                </li>`).join('')}
              </ul>
            </div>

            <!-- Optional Features -->
            <div class="modal-highlights" style="flex: 1; min-width: 200px; margin-top: 0; margin-bottom: 0; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.75rem 0.9rem;">
              <h3 style="margin-bottom: 0.4rem; font-size: 0.95rem; font-weight: 700; color: #065f46; letter-spacing: -0.01em;">Optional Features</h3>
              <ul style="display: flex; flex-direction: column; gap: 0.3rem; list-style: none; padding-left: 0; margin: 0;">
                ${modelOptions.map(opt => `<li style="display: flex; align-items: flex-start; gap: 0.45rem; margin-bottom: 0; font-size: 0.82rem; line-height: 1.35; color: #1e293b;">
                  <svg style="flex-shrink: 0; margin-top: 0.15rem; color: var(--clr-primary, #047857);" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                  <span>${opt}</span>
                </li>`).join('')}
              </ul>
            </div>

          </div>

          <div style="text-align: left;">
            ${isInactive ? `
              <a href="./contact.html?subject=Agricultural+Division+Inquiry" class="btn" style="font-size: 1rem; font-weight: 700; padding: 0.75rem 1.5rem; width: 100%; text-align: center; background: #e2e8f0; color: #475569; border: 1px solid #cbd5e1; border-radius: 8px;">Inquire for Future Availability</a>
            ` : `
              <a href="./contact.html?product=${v.id}" class="btn btn-primary" style="font-size: 1rem; font-weight: 700; padding: 0.75rem 1.5rem; width: 100%; text-align: center; border-radius: 8px;">Request Quote</a>
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
