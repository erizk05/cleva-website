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
    slide4 = './assets/images/ev4 comm cargo back.jpg';
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
    slide2 = './assets/images/PWD-front.jpg';
    slide3 = './assets/images/PWD-side2.jpg';
    slide4 = './assets/images/pwd-draw.jpg';
  } else if (v.id === 'ev4-compact') {
    slide1 = './assets/images/bev-compact.jpg';
    slide2 = './assets/aistudio/bev-homebase1-side_9d9bc95a.jpg';
    slide3 = './assets/images/bev-compact.jpg';
    slide4 = './assets/aistudio/bev-homebase1-side_9d9bc95a.jpg';
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

  container.innerHTML = `
    <div style="background: var(--clr-surface); border: 1px solid var(--clr-border); border-radius: var(--radius-lg); padding: var(--space-6); margin-bottom: var(--space-8);">
      
      ${isInactive ? `
        <div style="margin-bottom: var(--space-6); padding: 1rem 1.5rem; background: rgba(71,85,105,0.08); border: 1px solid #cbd5e1; border-radius: var(--radius-md); display: flex; align-items: center; gap: 0.75rem;">
          <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: #94a3b8;"></span>
          <span style="font-size: 0.95rem; color: #475569; font-weight: 500;">Notice: This model belongs to the C.L.E.V.A. Agricultural Division, which is currently in development and inactive.</span>
        </div>
      ` : ''}

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: var(--space-8);">
        
        <!-- Left Side: Images & Description -->
        <div>
          <div class="carousel-container" style="margin-bottom: var(--space-6);">
            <div class="modal-carousel" id="modal-carousel">
              <div class="modal-carousel-item" style="height: 350px; position: relative;">
                <img src="${slide1}" alt="${v.name} Angle 1" style="object-fit: contain; width: 100%; height: 100%; ${primaryImgStyle}" />
                ${isInactive ? `
                  <div class="coming-soon-badge" style="position: absolute; top: 16px; right: 16px; font-size: 0.75rem; padding: 5px 12px; background: rgba(51, 65, 85, 0.9);">
                    <span class="coming-soon-dot" style="width: 7px; height: 7px; background: #94a3b8;"></span>
                    Inactive &bull; Coming Soon
                  </div>
                ` : (isComingSoon ? `
                  <div class="coming-soon-badge" style="position: absolute; top: 16px; right: 16px; font-size: 0.75rem; padding: 5px 12px;">
                    <span class="coming-soon-dot" style="width: 7px; height: 7px;"></span>
                    Coming Soon
                  </div>
                ` : '')}
              </div>
              <div class="modal-carousel-item" style="height: 350px;">
                <img src="${slide2}" alt="${v.name} Angle 2" style="object-fit: contain; width: 100%; height: 100%; ${primaryImgStyle}" />
              </div>
              <div class="modal-carousel-item" style="height: 350px;">
                <img src="${slide3}" alt="${v.name} Angle 3" style="object-fit: contain; width: 100%; height: 100%; ${primaryImgStyle}" />
              </div>
              <div class="modal-carousel-item" style="height: 350px;">
                <img src="${slide4}" alt="${v.name} Angle 4" style="object-fit: contain; width: 100%; height: 100%; ${primaryImgStyle}" />
              </div>
            </div>
            <div class="carousel-dots" id="modal-carousel-dots">
              <button class="carousel-dot active" aria-label="Go to slide 1" data-index="0"></button>
              <button class="carousel-dot" aria-label="Go to slide 2" data-index="1"></button>
              <button class="carousel-dot" aria-label="Go to slide 3" data-index="2"></button>
              <button class="carousel-dot" aria-label="Go to slide 4" data-index="3"></button>
            </div>
          </div>
          
          <div>
             <h3 style="margin-bottom: var(--space-3); font-size: 1.5rem;">Description</h3>
             <p class="text-muted" style="font-size: 1.1rem; line-height: 1.6;">${v.description}</p>
          </div>
        </div>

        <!-- Right Side: Info & Actions -->
        <div>
          <div class="vehicle-header" style="align-items: flex-start; margin-bottom: var(--space-6); flex-direction: column; gap: var(--space-2);">
            <div>
              <h1 class="font-display" style="font-size: 2.5rem; margin-bottom: 0.25rem;">${v.name}</h1>
              <p class="vehicle-tagline" style="font-size: 1.2rem;">${v.tagline}</p>
            </div>
            <span class="badge" style="font-size: 1rem; padding: 0.5rem 1rem; ${isInactive ? 'background: #e2e8f0; color: #475569;' : ''}">${isInactive ? 'Coming Soon' : v.badge}</span>
          </div>
          
          <div class="modal-specs-grid" style="margin-bottom: var(--space-8); grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 0.65rem;">
            ${Object.entries(v.specs).map(([key, value]) => `
              <div class="modal-spec-item" style="padding: 0.65rem 0.85rem; min-width: 0; overflow: hidden;">
                <span class="modal-spec-label" style="font-size: 0.72rem; margin-bottom: 0.25rem; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block;" title="${key}">${key}</span>
                <span class="modal-spec-value" style="font-size: 0.82rem; line-height: 1.25; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block;" title="${value}">${value}</span>
              </div>
            `).join('')}
          </div>

         <div class="modal-highlights" style="margin-bottom: var(--space-8); margin-top: 0;">
            <h3 style="margin-bottom: var(--space-4); font-size: 1.5rem;">Main Configuration</h3>
            <ul style="display: flex; flex-direction: column; gap: 1rem;">
              ${(v['Main Configuration'] || v.mainConfiguration || v.highlights || []).map(h => `<li style="display: flex; align-items: flex-start; gap: 0.5rem;">
                <svg style="flex-shrink: 0; margin-top: 0.25rem; color: var(--clr-primary);" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                <span>${h}</span>
              </li>`).join('')}
            </ul>
          </div>

          <div style="text-align: left;">
            ${isInactive ? `
              <a href="./contact.html?subject=Agricultural+Division+Inquiry" class="btn" style="font-size: 1.1rem; padding: 1rem 2rem; width: 100%; text-align: center; background: #e2e8f0; color: #475569; border: 1px solid #cbd5e1;">Inquire for Future Availability</a>
            ` : `
              <a href="./contact.html?product=${v.id}" class="btn btn-primary" style="font-size: 1.1rem; padding: 1rem 2rem; width: 100%; text-align: center;">Request Quote</a>
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
