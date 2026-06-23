/**
 * CLEVA Commercial EV - Dynamic Vehicles Details Page Controller
 */
import './common.js';
import { initQuoteModals } from './common.js';

// Comprehensive B2B Technical Database
const VEHICLES_DATABASE = {
  van: {
    id: "van",
    name: "CE-Series Delivery Van",
    class: "Heavy Logistics & Last-Mile Delivery",
    tagLine: "Heavy Logistics / Last-Mile",
    range: "220 - 280 Miles",
    battery: "88 kWh Lithium-Iron-Phosphate (LFP)",
    payload: "4,500 Lbs",
    seating: "2 Passengers (Driver & Co-pilot)",
    power: "240 HP / 285 lb-ft",
    charging: "35 mins DC Fast (80%) / 6.5 Hrs AC",
    turning: "36.5 Feet",
    ada: "N/A (Chassis-optimized for cargo box custom lifts)",
    speed: "75 Mph (Electronically limited)",
    dimensions: "19.8 ft L x 6.8 ft W x 8.4 ft H",
    primaryUse: "Intra-city cargo shipping, high-capacity retail logistics",
    descPrimary: "Optimized delivery chassis for urban freight. Built with an all-weather insulated box body, modular shelving, and heavy duty leaf-sprung suspension.",
    descSecondary: "The CE-Series is the backbone of urban green shipping networks. Designed to accommodate palletized cargo, parcel sorting aisles, and cold-chain temperature cooling units. Guided by highly efficient battery management systems, it delivers stable operational cycles even under maximum cargo loads. Experience massive reductions in fleet cost-per-mile with standard CLEVA telematics tracking.",
    safetyDesc: "Full vehicle certifications under EPA Zero Emission guidelines, DOT safety directives, and FMVSS crashworthiness requirements. Includes active lane departure warning systems, fully insulated high-voltage protective barriers, heavy cargo-cabin separating bulkheads, and automated thermal-runaway battery fire mitigation systems.",
    b2bDesc: "Custom fleet modification blueprints are available for corporate orders: dual-zone isothermal refrigeration assemblies, electric roll-up heavy security shutters, driver-ergonomics delivery steps, and customized enterprise fleet telematics tracking configurations integration.",
    svg: `<svg viewBox="0 0 200 120" width="100%" height="auto" style="display: block; margin: 0 auto; max-width: 240px;">
            <defs>
              <linearGradient id="detailGradVan" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#fca5a5" />
                <stop offset="100%" stop-color="#ef4444" />
              </linearGradient>
            </defs>
            <rect x="5" y="5" width="190" height="110" rx="8" fill="none" stroke="currentColor" stroke-dasharray="4,4" stroke-width="1.5" stroke-opacity="0.15" />
            <path d="M 75 42 L 80 42 L 83 37 L 117 37 L 120 42 L 125 42 Q 130 42 130 47 L 130 73 Q 130 78 125 78 L 75 78 Q 70 78 70 73 L 70 47 Q 70 42 75 42 Z" fill="none" stroke="currentColor" stroke-width="2" stroke-opacity="0.15" />
            <circle cx="100" cy="60" r="20" fill="none" stroke="url(#detailGradVan)" stroke-width="3" />
            <line x1="86" y1="46" x2="114" y2="74" stroke="url(#detailGradVan)" stroke-width="3" />
          </svg>`
  },
  pwd: {
    id: "pwd",
    name: "AP-Series Accessible Shuttle",
    class: "ADA-Compliant Municipal Transit",
    tagLine: "ADA-Compliant Accessibility",
    range: "180 - 240 Miles",
    battery: "76 kWh Lithium-Iron-Phosphate (LFP)",
    payload: "3,200 Lbs",
    seating: "Up to 3 Wheelchairs + 6 Passengers",
    power: "200 HP / 240 lb-ft",
    charging: "40 mins DC Fast (80%) / 5.8 Hrs AC",
    turning: "35.0 Feet",
    ada: "100% ADA-Compliant (6.2 Sec automatic hydraulic ramp)",
    speed: "62 Mph (Optimized for transit zones)",
    dimensions: "20.4 ft L x 7.2 ft W x 9.1 ft H",
    primaryUse: "Senior living commute, municipal paratransit service",
    descPrimary: "Fully ADA-compliant with automated hydraulic low-angle ramp systems, customizable magnetic floor anchors, and low step-in chassis profiles.",
    descSecondary: "Engineering inclusivity into public transit networks. The AP-Series features specialized low floor entry clearances, rapid side-door deployment, air-suspension kneeling systems, and flexible securement layouts. With silent, smooth electric acceleration, it protects passengers with motion sensitivities while offering municipal organizations unparalleled durability and regulatory compliance.",
    safetyDesc: "Meets or exceeds Federal Motor Vehicle Safety Standards (FMVSS 403/404) for platform lifts and paratransit utilities. Equipped with floor tracks for securement tie-downs, active perimeter-view sensor systems, a continuous cabin carbon monoxide buffer monitor, and an impact-sensing high voltage system cut-off.",
    b2bDesc: "Tailored to municipal or institutional route programs: custom wheelchair docking arrays (supporting Quantum or Q'Straint assemblies), tactile navigation strips, automated audio-visual stop announcements, and high-visibility digital passenger route panels.",
    svg: `<svg viewBox="0 0 200 120" width="100%" height="auto" style="display: block; margin: 0 auto; max-width: 240px;">
            <defs>
              <linearGradient id="detailGradPwd" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#fca5a5" />
                <stop offset="100%" stop-color="#ef4444" />
              </linearGradient>
            </defs>
            <rect x="5" y="5" width="190" height="110" rx="8" fill="none" stroke="currentColor" stroke-dasharray="4,4" stroke-width="1.5" stroke-opacity="0.15" />
            <path d="M 75 42 L 80 42 L 83 37 L 117 37 L 120 42 L 125 42 Q 130 42 130 47 L 130 73 Q 130 78 125 78 L 75 78 Q 70 78 70 73 L 70 47 Q 70 42 75 42 Z" fill="none" stroke="currentColor" stroke-width="2" stroke-opacity="0.15" />
            <circle cx="100" cy="60" r="20" fill="none" stroke="url(#detailGradPwd)" stroke-width="3" />
            <line x1="86" y1="46" x2="114" y2="74" stroke="url(#detailGradPwd)" stroke-width="3" />
          </svg>`
  },
  trike: {
    id: "trike",
    name: "CT-Series Cargo E-Trike",
    class: "Campus & Micro-Delivery Trike",
    tagLine: "Campus & Micro-Delivery",
    range: "60 - 90 Miles",
    battery: "14.4 kWh Swappable Solid-State",
    payload: "750 Lbs",
    seating: "1 Operator (Ergonomic saddle seat)",
    power: "15 HP / 35 lb-ft",
    charging: "Swappable packs (instant) / 3 Hrs AC",
    turning: "9.8 Feet",
    ada: "N/A (Pedestrian micro-chassis)",
    speed: "28 Mph (Class 3 commercial utility limit)",
    dimensions: "8.2 ft L x 3.6 ft W x 5.8 ft H",
    primaryUse: "Post/parcel core delivery, resort/educational campus cargo loops",
    descPrimary: "Compact commercial cargo trikes engineered for university campuses, corporate parks, postal organizations, and crowded zero-emission city districts.",
    descSecondary: "Redefine micro-mobility logistics. Designed with a modular rear lockbox boasting massive volumetric cargo ratios relative to its narrow physical width, our e-trike slips past congestion, operates safely on pedestrian avenues, and handles campus deliveries seamlessly. Powered by instant pack replacement batteries, it operates continuously with virtually zero charging downtime.",
    safetyDesc: "Optimized for urban safety constraints. Includes automatic electronic differential speed limiting, double hydraulic disc braking across all three wheel configurations, integrated high-lumination daytime visibility LED bars, and active weight-distribution stabilization controls.",
    b2bDesc: "Configured for specialized site requirements: temperature-isolated pharmaceutical insulated rear bins, multi-tiered document parcel lockers, open-flat utility cargo bed mounts, hotel luggage containment guardrails, and magnetic badge keyless door releases.",
    svg: `<svg viewBox="0 0 200 120" width="100%" height="auto" style="display: block; margin: 0 auto; max-width: 240px;">
            <defs>
              <linearGradient id="detailGradTrike" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#fca5a5" />
                <stop offset="100%" stop-color="#ef4444" />
              </linearGradient>
            </defs>
            <rect x="5" y="5" width="190" height="110" rx="8" fill="none" stroke="currentColor" stroke-dasharray="4,4" stroke-width="1.5" stroke-opacity="0.15" />
            <path d="M 75 42 L 80 42 L 83 37 L 117 37 L 120 42 L 125 42 Q 130 42 130 47 L 130 73 Q 130 78 125 78 L 75 78 Q 70 78 70 73 L 70 47 Q 70 42 75 42 Z" fill="none" stroke="currentColor" stroke-width="2" stroke-opacity="0.15" />
            <circle cx="100" cy="60" r="20" fill="none" stroke="url(#detailGradTrike)" stroke-width="3" />
            <line x1="86" y1="46" x2="114" y2="74" stroke="url(#detailGradTrike)" stroke-width="3" />
          </svg>`
  },
  shuttle: {
    id: "shuttle",
    name: "ev4-eREV Passenger Shuttle",
    class: "Regional Extended-Range Transit",
    tagLine: "Extended Range Regional",
    range: "450 - 550 Miles (Combined Hybrid)",
    battery: "40 kWh Buffer Battery + Onboard Euro 6 Gen",
    payload: "3,800 Lbs",
    seating: "Up to 14 Adults (High-capacity rows)",
    power: "280 HP / 310 lb-ft",
    charging: "AC plug-in charging + Integrated backup generation",
    turning: "38.2 Feet",
    ada: "Standard accessibility (Light folding ramp mount)",
    speed: "80 Mph (Maximum interstate capability)",
    dimensions: "22.1 ft L x 7.0 ft W x 8.6 ft H",
    primaryUse: "Regional shuttle loops, airport and hotel group transit",
    descPrimary: "Our revolutionary Extended Range Electric (eREV) multi-passenger transit shuttle. Incorporates an onboard clean-gas generator to double regional span.",
    descSecondary: "Banish grid-infrastructure and range anxieties. The ev4-eREV utilizes a high-efficiency backup onboard generation unit that quietly runs at an optimized RPM only when the primary state-of-charge of the buffer battery lands below 20%. This provides unmatched, long-distance continuous regional loops without requiring midday charging breaks, ideal for long airport shuttles or regional resort transfers.",
    safetyDesc: "Top-tier occupant safety. Incorporates standard dual front airbags, extensive heavy-duty passenger cell safety reinforcement cages, rollover impact sensors, adaptive electronic stability control (ESC), and intelligent forward collision mitigation alerts.",
    b2bDesc: "Upgradable executive and transit configurations: leather-finished highback reclining seats, dynamic headrest-integrated USB charging docks, centralized high-output air conditioning systems, rear cargo/baggage storage partitions, and onboard high-definition display arrays.",
    svg: `<svg viewBox="0 0 200 120" width="100%" height="auto" style="display: block; margin: 0 auto; max-width: 240px;">
            <defs>
              <linearGradient id="detailGradShuttle" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#fca5a5" />
                <stop offset="100%" stop-color="#ef4444" />
              </linearGradient>
            </defs>
            <rect x="5" y="5" width="190" height="110" rx="8" fill="none" stroke="currentColor" stroke-dasharray="4,4" stroke-width="1.5" stroke-opacity="0.15" />
            <path d="M 75 42 L 80 42 L 83 37 L 117 37 L 120 42 L 125 42 Q 130 42 130 47 L 130 73 Q 130 78 125 78 L 75 78 Q 70 78 70 73 L 70 47 Q 70 42 75 42 Z" fill="none" stroke="currentColor" stroke-width="2" stroke-opacity="0.15" />
            <circle cx="100" cy="60" r="20" fill="none" stroke="url(#detailGradShuttle)" stroke-width="3" />
            <line x1="86" y1="46" x2="114" y2="74" stroke="url(#detailGradShuttle)" stroke-width="3" />
          </svg>`
  }
};

document.addEventListener('DOMContentLoaded', () => {
  renderVehicleDetails();
});

function renderVehicleDetails() {
  const loadingState = document.getElementById('detail-loading-state');
  const contentArea = document.getElementById('detail-content-area');
  const errorState = document.getElementById('detail-error-state');

  // Parse query parameter id
  const params = new URLSearchParams(window.location.search);
  const vehicleId = params.get('id');

  if (!vehicleId || !VEHICLES_DATABASE[vehicleId]) {
    if (loadingState) loadingState.style.display = 'none';
    if (errorState) errorState.style.display = 'block';
    return;
  }

  const v = VEHICLES_DATABASE[vehicleId];

  // Populate metadata
  document.title = `${v.name} Specs & Details | CLEVA Fleet Range`;

  // Populate fields
  const titleEl = document.getElementById('detail-title');
  const tagEl = document.getElementById('detail-tagline');
  const badgeEl = document.getElementById('detail-badge');
  const graphicEl = document.getElementById('detail-graphic-holder');
  const descPrimaryEl = document.getElementById('detail-desc-primary');
  const descSecondaryEl = document.getElementById('detail-desc-secondary');
  const safetyDescEl = document.getElementById('detail-safety-desc');
  const b2bDescEl = document.getElementById('detail-b2b-desc');
  
  const metricRangeEl = document.getElementById('metric-range');
  const metricPayloadEl = document.getElementById('metric-payload');
  const metricSpeedEl = document.getElementById('metric-speed');
  const quoteBtnEl = document.getElementById('detail-quote-btn');

  if (titleEl) titleEl.textContent = v.name;
  if (tagEl) tagEl.textContent = v.tagLine;
  if (badgeEl) badgeEl.textContent = v.class;
  if (graphicEl) graphicEl.innerHTML = v.svg;
  if (descPrimaryEl) descPrimaryEl.textContent = v.descPrimary;
  if (descSecondaryEl) descSecondaryEl.textContent = v.descSecondary;
  if (safetyDescEl) safetyDescEl.textContent = v.safetyDesc;
  if (b2bDescEl) b2bDescEl.textContent = v.b2bDesc;

  // Primary highlights
  if (metricRangeEl) metricRangeEl.textContent = v.range.split(' (')[0]; // simple split
  if (metricPayloadEl) metricPayloadEl.textContent = v.payload;
  if (metricSpeedEl) metricSpeedEl.textContent = v.speed.split(' (')[0];

  // Inquire CTA button setup
  if (quoteBtnEl) {
    quoteBtnEl.setAttribute('data-quote-trigger', v.id);
    quoteBtnEl.textContent = `Inquire ${v.name.split(' ')[0]} Pricing`;
  }

  // Populate Spec Matrix Table
  const tableContainer = document.getElementById('detail-specs-table-container');
  if (tableContainer) {
    const specsItems = [
      { label: 'Vehicle Name', value: v.name },
      { label: 'Classification', value: v.class },
      { label: 'Estimated Operational Range', value: v.range },
      { label: 'Battery Capacity', value: v.battery },
      { label: 'Maximum Payload Limit', value: v.payload },
      { label: 'Seating Configuration', value: v.seating },
      { label: 'Power & Torque Output', value: v.power },
      { label: 'DC / AC Charging Speed', value: v.charging },
      { label: 'Minimum Turning Circle', value: v.turning },
      { label: 'Governed Maximum Speed', value: v.speed },
      { label: 'Physical Dimensions', value: v.dimensions },
      { label: 'Primary Target Fleet Sector', value: v.primaryUse },
      { label: 'ADA Accessibility Status', value: v.ada }
    ];

    let tableHtml = '<table class="spec-detail-table">';
    specsItems.forEach(item => {
      tableHtml += `
        <tr>
          <td>${item.label}</td>
          <td>${item.value}</td>
        </tr>
      `;
    });
    tableHtml += '</table>';
    tableContainer.innerHTML = tableHtml;
  }

  // Hide loader and show content
  if (loadingState) loadingState.style.display = 'none';
  if (contentArea) contentArea.style.display = 'block';

  // Re-initialize CLEVA global quote modal listeners for dynamically populated content
  initQuoteModals();
}
