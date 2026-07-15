// START FILE: vehicle.js
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('vehicle-details-container');
  if (!container || typeof VEHICLES === 'undefined') return;

  const urlParams = new URLSearchParams(window.location.search);
  const vehicleId = urlParams.get('id');

  const v = VEHICLES.find(vehicle => vehicle.id === vehicleId);

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

  container.innerHTML = `
    <div style="background: var(--clr-surface); border: 1px solid var(--clr-border); border-radius: var(--radius-lg); padding: var(--space-6); margin-bottom: var(--space-8);">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: var(--space-8);">
        
        <!-- Left Side: Images & Description -->
        <div>
          <div class="carousel-container" style="margin-bottom: var(--space-6);">
            <div class="modal-carousel" id="modal-carousel">
              <div class="modal-carousel-item" style="height: 350px;">
                <img src="https://placehold.co/800x600/2a2a2a/ffffff?text=Front+Angle" alt="${v.name} Front Angle" />
              </div>
              <div class="modal-carousel-item" style="height: 350px;">
                <img src="https://placehold.co/800x600/2a2a2a/ffffff?text=Right+Side+Angle" alt="${v.name} Right Side Angle" />
              </div>
              <div class="modal-carousel-item" style="height: 350px;">
                <img src="https://placehold.co/800x600/2a2a2a/ffffff?text=Left+Side+Angle" alt="${v.name} Left Side Angle" />
              </div>
              <div class="modal-carousel-item" style="height: 350px;">
                <img src="https://placehold.co/800x600/2a2a2a/ffffff?text=Back+Angle" alt="${v.name} Back Angle" />
              </div>
              <div class="modal-carousel-item" style="height: 350px;">
                <img src="https://placehold.co/800x600/2a2a2a/ffffff?text=Inner+Angle" alt="${v.name} Inner Angle" />
              </div>
              <div class="modal-carousel-item" style="height: 350px;">
                <img src="https://placehold.co/800x600/2a2a2a/ffffff?text=Whole+View" alt="${v.name} Whole View" />
              </div>
            </div>
            <div class="carousel-dots" id="modal-carousel-dots">
              <button class="carousel-dot active" aria-label="Go to slide 1" data-index="0"></button>
              <button class="carousel-dot" aria-label="Go to slide 2" data-index="1"></button>
              <button class="carousel-dot" aria-label="Go to slide 3" data-index="2"></button>
              <button class="carousel-dot" aria-label="Go to slide 4" data-index="3"></button>
              <button class="carousel-dot" aria-label="Go to slide 5" data-index="4"></button>
              <button class="carousel-dot" aria-label="Go to slide 6" data-index="5"></button>
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
            <span class="badge" style="font-size: 1rem; padding: 0.5rem 1rem;">${v.badge}</span>
          </div>
          
          <div class="modal-specs-grid" style="margin-bottom: var(--space-8); grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));">
            ${Object.entries(v.specs).map(([key, value]) => `
              <div class="modal-spec-item">
                <span class="modal-spec-label">${key.toUpperCase()}</span>
                <span class="modal-spec-value" style="font-size: 1.1rem;">${value}</span>
              </div>
            `).join('')}
          </div>

          <div class="modal-highlights" style="margin-bottom: var(--space-8); margin-top: 0;">
            <h3 style="margin-bottom: var(--space-4); font-size: 1.5rem;">Key Highlights</h3>
            <ul style="display: flex; flex-direction: column; gap: 1rem;">
              ${v.highlights.map(h => `<li style="display: flex; align-items: flex-start; gap: 0.5rem;">
                <svg style="flex-shrink: 0; margin-top: 0.25rem; color: var(--clr-primary);" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                <span>${h}</span>
              </li>`).join('')}
            </ul>
          </div>

          <div style="text-align: left;">
            <a href="./contact.html?product=${v.id}" class="btn btn-primary" style="font-size: 1.1rem; padding: 1rem 2rem; width: 100%; text-align: center;">Request Quote</a>
          </div>
        </div>

      </div>
    </div>
  `;

// START: Initialize carousel

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

// END: Initialize carousel
// END FILE: vehicle.js
