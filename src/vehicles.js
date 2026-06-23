/**
 * CLEVA Commercial EV - Vehicles Page Controller
 */
import './common.js';

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initSpecComparison();
  initImageClickHandlers();
});

function initImageClickHandlers() {
  const vanContainer = document.querySelector('#product-van-card .product-image-container');
  const pwdContainer = document.querySelector('#product-pwd-card .product-image-container');
  const trikeContainer = document.querySelector('#product-trike-card .product-image-container');
  const shuttleContainer = document.querySelector('#product-shuttle-card .product-image-container');

  if (vanContainer) {
    vanContainer.addEventListener('click', () => {
      window.location.href = 'vehicle-detail.html?id=van';
    });
  }
  if (pwdContainer) {
    pwdContainer.addEventListener('click', () => {
      window.location.href = 'vehicle-detail.html?id=pwd';
    });
  }
  if (trikeContainer) {
    trikeContainer.addEventListener('click', () => {
      window.location.href = 'vehicle-detail.html?id=trike';
    });
  }
  if (shuttleContainer) {
    shuttleContainer.addEventListener('click', () => {
      window.location.href = 'vehicle-detail.html?id=shuttle';
    });
  }
}

/* ==========================================
   REVEAL ON SCROLL ANIMATION (INTERSECTION OBSERVER)
   ========================================== */
function initScrollReveal() {
  const cards = document.querySelectorAll('.product-card');
  if (!cards.length) return;

  // Add initial reveal-card class
  cards.forEach(card => {
    card.classList.add('reveal-card');
  });

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  };

  let revealCount = 0;
  let revealTimeout;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        
        // If cards intersect at the same time, stagger their appearance
        revealCount++;
        const currentCount = revealCount;
        
        setTimeout(() => {
          card.classList.add('revealed');
        }, (currentCount - 1) * 80); // 80ms stagger delay
        
        clearTimeout(revealTimeout);
        revealTimeout = setTimeout(() => {
          revealCount = 0;
        }, 150);

        observer.unobserve(card);
      }
    });
  }, observerOptions);

  cards.forEach(card => {
    observer.observe(card);
  });
}

/* ==========================================
   INTERACTIVE VEHICLE COMPARE SPECS CONTROLLER
   ========================================== */
function initSpecComparison() {
  const selectA = document.getElementById('compare-vehicle-a');
  const selectB = document.getElementById('compare-vehicle-b');
  
  if (!selectA || !selectB) return;

  const VEHICLE_SPECS = {
    van: {
      id: "van",
      name: "CE-Series Delivery Van",
      class: "Heavy Logistics & Last-Mile Delivery",
      range: "220 - 280 Miles",
      rangeValue: 280,
      battery: "88 kWh Lithium-Iron-Phosphate (LFP)",
      batteryValue: 88,
      payload: "4,500 Lbs",
      payloadValue: 4500,
      seating: "2 Passengers (Driver & Co-pilot)",
      power: "240 HP / 285 lb-ft",
      powerValue: 240,
      charging: "35 mins DC Fast (80%) / 6.5 Hrs AC",
      turning: "36.5 Feet",
      turningValue: 36.5,
      ada: "N/A (Chassis-optimized for cargo box custom lifts)",
      adaCompliant: false,
      speed: "75 Mph (Electronically limited)",
      speedValue: 75,
      dimensions: "19.8 ft L x 6.8 ft W x 8.4 ft H",
      primaryUse: "Intra-city cargo shipping, high-capacity retail logistics",
      tagLine: "Heavy Logistics / Last-Mile",
      svg: `<svg viewBox="0 0 200 120" width="100" height="60" style="display:block; margin:0 auto; max-width: 140px;">
              <defs>
                <linearGradient id="notAllowedGradVan" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#fca5a5" />
                  <stop offset="100%" stop-color="#ef4444" />
                </linearGradient>
              </defs>
              <rect x="5" y="5" width="190" height="110" rx="8" fill="none" stroke="currentColor" stroke-dasharray="4,4" stroke-width="1.5" stroke-opacity="0.15" />
              <path d="M 75 42 L 80 42 L 83 37 L 117 37 L 120 42 L 125 42 Q 130 42 130 47 L 130 73 Q 130 78 125 78 L 75 78 Q 70 78 70 73 L 70 47 Q 70 42 75 42 Z" fill="none" stroke="currentColor" stroke-width="2" stroke-opacity="0.15" />
              <circle cx="100" cy="60" r="20" fill="none" stroke="url(#notAllowedGradVan)" stroke-width="3" />
              <line x1="86" y1="46" x2="114" y2="74" stroke="url(#notAllowedGradVan)" stroke-width="3" />
              <text x="100" y="102" text-anchor="middle" font-family="'Inter', sans-serif" font-size="10" font-weight="600" fill="currentColor" fill-opacity="0.5">PHOTO PENDING</text>
            </svg>`
    },
    pwd: {
      id: "pwd",
      name: "AP-Series Accessible Shuttle",
      class: "ADA-Compliant Municipal Transit",
      range: "180 - 240 Miles",
      rangeValue: 240,
      battery: "76 kWh Lithium-Iron-Phosphate (LFP)",
      batteryValue: 76,
      payload: "3,200 Lbs",
      payloadValue: 3200,
      seating: "Up to 3 Wheelchairs + 6 Passengers",
      power: "200 HP / 240 lb-ft",
      powerValue: 200,
      charging: "40 mins DC Fast (80%) / 5.8 Hrs AC",
      turning: "35.0 Feet",
      turningValue: 35.0,
      ada: "100% ADA-Compliant (6.2 Sec automatic hydraulic ramp)",
      adaCompliant: true,
      speed: "62 Mph (Optimized for transit zones)",
      speedValue: 62,
      dimensions: "20.4 ft L x 7.2 ft W x 9.1 ft H",
      primaryUse: "Senior living commute, municipal paratransit service",
      tagLine: "ADA-Compliant Accessibility",
      svg: `<svg viewBox="0 0 200 120" width="100" height="60" style="display:block; margin:0 auto; max-width: 140px;">
              <defs>
                <linearGradient id="notAllowedGradPwd" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#fca5a5" />
                  <stop offset="100%" stop-color="#ef4444" />
                </linearGradient>
              </defs>
              <rect x="5" y="5" width="190" height="110" rx="8" fill="none" stroke="currentColor" stroke-dasharray="4,4" stroke-width="1.5" stroke-opacity="0.15" />
              <path d="M 75 42 L 80 42 L 83 37 L 117 37 L 120 42 L 125 42 Q 130 42 130 47 L 130 73 Q 130 78 125 78 L 75 78 Q 70 78 70 73 L 70 47 Q 70 42 75 42 Z" fill="none" stroke="currentColor" stroke-width="2" stroke-opacity="0.15" />
              <circle cx="100" cy="60" r="20" fill="none" stroke="url(#notAllowedGradPwd)" stroke-width="3" />
              <line x1="86" y1="46" x2="114" y2="74" stroke="url(#notAllowedGradPwd)" stroke-width="3" />
              <text x="100" y="102" text-anchor="middle" font-family="'Inter', sans-serif" font-size="10" font-weight="600" fill="currentColor" fill-opacity="0.5">PHOTO PENDING</text>
            </svg>`
    },
    trike: {
      id: "trike",
      name: "CT-Series Cargo E-Trike",
      class: "Campus & Micro-Delivery Trike",
      range: "60 - 90 Miles",
      rangeValue: 90,
      battery: "14.4 kWh Swappable Solid-State",
      batteryValue: 14.4,
      payload: "750 Lbs",
      payloadValue: 750,
      seating: "1 Operator (Ergonomic saddle seat)",
      power: "15 HP / 35 lb-ft",
      powerValue: 15,
      charging: "Swappable packs (instant) / 3 Hrs AC",
      turning: "9.8 Feet",
      turningValue: 9.8,
      ada: "N/A (Pedestrian micro-chassis)",
      adaCompliant: false,
      speed: "28 Mph (Class 3 commercial utility limit)",
      speedValue: 28,
      dimensions: "8.2 ft L x 3.6 ft W x 5.8 ft H",
      primaryUse: "Post/parcel core delivery, resort/educational campus cargo loops",
      tagLine: "Campus & Micro-Delivery",
      svg: `<svg viewBox="0 0 200 120" width="100" height="60" style="display:block; margin:0 auto; max-width: 140px;">
              <defs>
                <linearGradient id="notAllowedGradTrike" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#fca5a5" />
                  <stop offset="100%" stop-color="#ef4444" />
                </linearGradient>
              </defs>
              <rect x="5" y="5" width="190" height="110" rx="8" fill="none" stroke="currentColor" stroke-dasharray="4,4" stroke-width="1.5" stroke-opacity="0.15" />
              <path d="M 75 42 L 80 42 L 83 37 L 117 37 L 120 42 L 125 42 Q 130 42 130 47 L 130 73 Q 130 78 125 78 L 75 78 Q 70 78 70 73 L 70 47 Q 70 42 75 42 Z" fill="none" stroke="currentColor" stroke-width="2" stroke-opacity="0.15" />
              <circle cx="100" cy="60" r="20" fill="none" stroke="url(#notAllowedGradTrike)" stroke-width="3" />
              <line x1="86" y1="46" x2="114" y2="74" stroke="url(#notAllowedGradTrike)" stroke-width="3" />
              <text x="100" y="102" text-anchor="middle" font-family="'Inter', sans-serif" font-size="10" font-weight="600" fill="currentColor" fill-opacity="0.5">PHOTO PENDING</text>
            </svg>`
    },
    shuttle: {
      id: "shuttle",
      name: "ev4-eREV Passenger Shuttle",
      class: "Regional Extended-Range Transit",
      range: "450 - 550 Miles (Combined Hybrid)",
      rangeValue: 550,
      battery: "40 kWh Buffer Battery + Onboard Euro 6 Gen",
      batteryValue: 40,
      payload: "3,800 Lbs",
      payloadValue: 3800,
      seating: "Up to 14 Adults (High-capacity rows)",
      power: "280 HP / 310 lb-ft",
      powerValue: 280,
      charging: "AC plug-in charging + Integrated backup generation",
      turning: "38.2 Feet",
      turningValue: 38.2,
      ada: "Standard accessibility (Light folding ramp mount)",
      adaCompliant: true,
      speed: "80 Mph (Maximum interstate capability)",
      speedValue: 80,
      dimensions: "22.1 ft L x 7.0 ft W x 8.6 ft H",
      primaryUse: "Regional shuttle loops, airport and hotel group transit",
      tagLine: "Extended Range Regional",
      svg: `<svg viewBox="0 0 200 120" width="100" height="60" style="display:block; margin:0 auto; max-width: 140px;">
              <defs>
                <linearGradient id="notAllowedGradShuttle" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#fca5a5" />
                  <stop offset="100%" stop-color="#ef4444" />
                </linearGradient>
              </defs>
              <rect x="5" y="5" width="190" height="110" rx="8" fill="none" stroke="currentColor" stroke-dasharray="4,4" stroke-width="1.5" stroke-opacity="0.15" />
              <path d="M 75 42 L 80 42 L 83 37 L 117 37 L 120 42 L 125 42 Q 130 42 130 47 L 130 73 Q 130 78 125 78 L 75 78 Q 70 78 70 73 L 70 47 Q 70 42 75 42 Z" fill="none" stroke="currentColor" stroke-width="2" stroke-opacity="0.15" />
              <circle cx="100" cy="60" r="20" fill="none" stroke="url(#notAllowedGradShuttle)" stroke-width="3" />
              <line x1="86" y1="46" x2="114" y2="74" stroke="url(#notAllowedGradShuttle)" stroke-width="3" />
              <text x="100" y="102" text-anchor="middle" font-family="'Inter', sans-serif" font-size="10" font-weight="600" fill="currentColor" fill-opacity="0.5">PHOTO PENDING</text>
            </svg>`
    }
  };

  const specRows = [
    { key: 'class', label: 'Primary Use Case', category: 'Operational Profile', compareType: 'text' },
    { key: 'range', label: 'Estimated Range', category: 'Powertrain & Battery', compareType: 'higher', valKey: 'rangeValue' },
    { key: 'battery', label: 'Battery System', category: 'Powertrain & Battery', compareType: 'higher', valKey: 'batteryValue' },
    { key: 'power', label: 'Peak Power / Torque', category: 'Powertrain & Battery', compareType: 'higher', valKey: 'powerValue' },
    { key: 'payload', label: 'Max Payload Capacity', category: 'Chassis & Payload', compareType: 'higher', valKey: 'payloadValue' },
    { key: 'seating', label: 'Seating Layout', category: 'Chassis & Payload', compareType: 'text' },
    { key: 'dimensions', label: 'Physical Dimensions', category: 'Chassis & Payload', compareType: 'text' },
    { key: 'turning', label: 'Minimum Turning Circle', category: 'Maneuverability', compareType: 'lower', valKey: 'turningValue' },
    { key: 'charging', label: 'Charging Speed', category: 'Powertrain & Battery', compareType: 'text' },
    { key: 'ada', label: 'ADA Accessibility Compliance', category: 'Compliance', compareType: 'boolean', valKey: 'adaCompliant' },
    { key: 'speed', label: 'Governed Top Speed', category: 'Compliance', compareType: 'higher', valKey: 'speedValue' },
    { key: 'primaryUse', label: 'Core Target Sector', category: 'Operational Profile', compareType: 'text' }
  ];

  function renderComparison() {
    const valA = selectA.value;
    const valB = selectB.value;

    const vA = VEHICLE_SPECS[valA];
    const vB = VEHICLE_SPECS[valB];

    if (!vA || !vB) return;

    // Update Column Headers
    const logoA = document.getElementById('comp-logo-a');
    const nameA = document.getElementById('comp-name-a');
    const classA = document.getElementById('comp-class-a');
    
    const logoB = document.getElementById('comp-logo-b');
    const nameB = document.getElementById('comp-name-b');
    const classB = document.getElementById('comp-class-b');

    if (logoA) logoA.innerHTML = vA.svg;
    if (nameA) nameA.textContent = vA.name;
    if (classA) classA.textContent = vA.tagLine;

    if (logoB) logoB.innerHTML = vB.svg;
    if (nameB) nameB.textContent = vB.name;
    if (classB) classB.textContent = vB.tagLine;

    // Update Footer Buttons
    const ctaA = document.getElementById('comp-cta-a');
    const ctaB = document.getElementById('comp-cta-b');

    if (ctaA) {
      ctaA.innerHTML = `<button class="btn btn-primary" style="width: 100%" data-quote-trigger="${vA.id}">Request ${vA.name.split(' ')[0]} Quote</button>`;
    }
    if (ctaB) {
      ctaB.innerHTML = `<button class="btn btn-primary" style="width: 100%" data-quote-trigger="${vB.id}">Request ${vB.name.split(' ')[0]} Quote</button>`;
    }

    // Build Rows Grouped by Category
    const tbody = document.getElementById('compare-matrix-tbody');
    if (!tbody) return;

    const categories = {};
    specRows.forEach(row => {
      if (!categories[row.category]) {
        categories[row.category] = [];
      }
      categories[row.category].push(row);
    });

    let html = '';
    
    for (const [catName, rows] of Object.entries(categories)) {
      html += `<tr class="category-divider-row">
                 <td colspan="3">${catName}</td>
               </tr>`;
      
      rows.forEach(row => {
        let valCellA = vA[row.key];
        let valCellB = vB[row.key];

        let highlightA = false;
        let highlightB = false;
        let diffIndicatorA = '';
        let diffIndicatorB = '';

        if (row.compareType === 'higher' && row.valKey) {
          const numA = vA[row.valKey];
          const numB = vB[row.valKey];
          if (numA > numB) {
            highlightA = true;
            diffIndicatorA = `<span class="winner-pill"><svg style="display:inline; vertical-align:middle; margin-right:2px; fill:currentColor;" viewBox="0 0 24 24" width="10" height="10"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>Best</span>`;
          } else if (numB > numA) {
            highlightB = true;
            diffIndicatorB = `<span class="winner-pill"><svg style="display:inline; vertical-align:middle; margin-right:2px; fill:currentColor;" viewBox="0 0 24 24" width="10" height="10"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>Best</span>`;
          }
        } else if (row.compareType === 'lower' && row.valKey) {
          const numA = vA[row.valKey];
          const numB = vB[row.valKey];
          if (numA < numB) {
            highlightA = true;
            diffIndicatorA = `<span class="winner-pill"><svg style="display:inline; vertical-align:middle; margin-right:2px; fill:currentColor;" viewBox="0 0 24 24" width="10" height="10"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>Best</span>`;
          } else if (numB < numA) {
            highlightB = true;
            diffIndicatorB = `<span class="winner-pill"><svg style="display:inline; vertical-align:middle; margin-right:2px; fill:currentColor;" viewBox="0 0 24 24" width="10" height="10"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>Best</span>`;
          }
        } else if (row.compareType === 'boolean' && row.valKey) {
          const isA = vA[row.valKey];
          const isB = vB[row.valKey];
          if (isA && !isB) {
            highlightA = true;
            valCellA = `<span class="ada-compliance-badge">Yes (ADA Compliant)</span>`;
          } else if (isB && !isA) {
            highlightB = true;
            valCellB = `<span class="ada-compliance-badge">Yes (ADA Compliant)</span>`;
          } else {
            if (isA) valCellA = `<span class="ada-compliance-badge">Yes</span>`;
            if (isB) valCellB = `<span class="ada-compliance-badge">Yes</span>`;
          }
        }

        html += `<tr class="compare-row">
                   <td class="spec-property-label">${row.label}</td>
                   <td class="${highlightA ? 'highlight-best-spec' : ''}">${valCellA} ${diffIndicatorA}</td>
                   <td class="${highlightB ? 'highlight-best-spec' : ''}">${valCellB} ${diffIndicatorB}</td>
                 </tr>`;
      });
    }

    tbody.innerHTML = html;

    // Bind quote actions to dynamic CTAs
    bindQuoteTriggers(document.getElementById('compare-specs-section'));
  }

  function bindQuoteTriggers(root) {
    if (!root) return;
    const triggers = root.querySelectorAll('[data-quote-trigger]');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const contextInput = document.getElementById('modal-vehicle-context');

    triggers.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const type = btn.getAttribute('data-quote-trigger') || 'general';
        
        let text = 'Request B2B Fleet Quotation';
        if (type === 'van') text = 'Request Delivery Van Pricing Structure';
        if (type === 'pwd') text = 'Request Accessible PWD EV Quote';
        if (type === 'trike') text = 'Request Cargo E-Trike Specifications & Quotation';
        if (type === 'shuttle') text = 'Request ev4-eREV Multi-Passenger Quotation';
        if (type === 'general') text = 'Request Comprehensive Fleet Evaluation';

        if (modalTitle) modalTitle.textContent = text;
        if (contextInput) contextInput.value = type;
        if (modalOverlay) modalOverlay.classList.add('show');
      });
    });
  }

  selectA.addEventListener('change', renderComparison);
  selectB.addEventListener('change', renderComparison);

  renderComparison();
}
