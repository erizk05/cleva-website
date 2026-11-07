const VEHICLES = [
  // --- EV3 WHEELERS (in requested sequence: Toda, Tuk-Tuk) ---
  {
    id: "etrike-toda",
    name: "EV3-BEV eTRIKE-TODA",
    category: "ev3",
    badge: "Public Transit",
    badgeColor: "green",
    tagline: "The modern trike for regular routes.",
    description: "LED headlights, full-width taillights, high-mounted brake light, ambient lights, USB + TCP, Bluetooth audio , power windshield wipers, ABS-coated body, High-precision gearbox housing, power assist gear, automotive-grade interior.",
    image: "./assets/images/etrike-toda.jpg",
    hasRealPhoto: true,
    comingSoon: false,
    specs: {
      range: "120 km", seats: "3", charge: "4 hrs", speed: "45 kph",
      motor: "AC 20000W", battery: "LiFePO4 32Ah",
      weight: "280 kg", payload: "400 kg", warranty: "3 years"
    },
    highlights: ["Regenerative braking", "Weather-proof cabin", "Digital display"]
  },
  {
    id: "etrike-tt",
    name: "EV3-BEV Tuk-Tuk",
    category: "ev3",
    badge: "Utility",
    badgeColor: "green",
    tagline: "Heavy-duty electric transport.",
    description: "Designed for tougher tasks and logistics in urban environments.",
    image: "./assets/images/etrike-tt.jpg",
    hasRealPhoto: true,
    comingSoon: false,
    specs: {
      range: "100 km", seats: "2", charge: "4 hrs", speed: "50 kph",
      motor: "4kW BLDC", battery: "LiFePO4 40Ah",
      weight: "300 kg", payload: "500 kg", warranty: "3 years"
    },
    highlights: ["High torque", "Cargo bed", "Digital display"]
  },

  // --- EV4 WHEELERS (in exact requested sequence) ---
  // 1. EV4 COMPACT / 2-Door
  {
    id: "ev4-compact",
    name: "EV4 COMPACT / 2-Door",
    category: "ev4",
    badge: "Urban Compact",
    badgeColor: "green",
    tagline: "Agile, modern 2-door micro-EV for city living.",
    description: "Ultra-compact electric 4-wheeler engineered for dense urban traffic, easy parking, and dependable daily commutes with zero emissions.",
    image: "./assets/images/bev-compact.jpg",
    dummyImage: "./assets/aistudio/bev-homebase1-side_9d9bc95a.jpg",
    hasRealPhoto: true,
    comingSoon: false,
    specs: {
      range: "130 km", seats: "2", charge: "4 hrs", speed: "65 kph",
      motor: "5kW AC", battery: "LiFePO4 50Ah",
      weight: "380 kg", payload: "300 kg", warranty: "5 years"
    },
    highlights: ["Compact city footprint", "Easy parking", "Automotive digital cockpit"]
  },
  // 2. EV4 COMPACT / 4-Door
  {
    id: "bevdeluxe",
    name: "EV4 COMPACT / 4-Door",
    category: "ev4",
    badge: "Premium Transit",
    badgeColor: "blue",
    tagline: "Premium passenger transit.",
    description: "Premium passenger electric vehicle with deluxe comfort.",
    image: "./assets/images/bev-deluxe.jpg",
    hasRealPhoto: true,
    comingSoon: false,
    specs: {
      range: "200 km", seats: "4", charge: "6 hrs", speed: "80 kph",
      motor: "10kW", battery: "Li-ion",
      weight: "1200 kg", payload: "400 kg", warranty: "5 years"
    },
    highlights: ["Air Conditioning", "Leather Seats", "Advanced Infotainment"]
  },
  // 3. EV4 FAMILY / 4-Door
  {
    id: "ev4-family",
    name: "EV4 FAMILY / 4-Door",
    category: "ev4",
    badge: "Family",
    badgeColor: "green",
    tagline: "The perfect neighborhood EV.",
    description: "Comfortable 4-wheel electric transport designed for the modern family.",
    image: "./assets/images/bev-family-front.jpg",
    dummyImage: "./assets/images/bev-family-front.jpg",
    hasRealPhoto: true,
    comingSoon: false,
    specs: {
      range: "150 km", seats: "4", charge: "6 hrs", speed: "80 kph",
      motor: "7.5kW AC", battery: "LiFePO4 80Ah",
      weight: "480 kg", payload: "400 kg", warranty: "5 years"
    },
    highlights: ["Air conditioning", "Infotainment", "Telematics"]
  },
  // 4. EV4 WEEKENDER / 5-Door
  {
    id: "bev-weekender",
    name: "EV4 WEEKENDER / 5-Door",
    category: "ev4",
    badge: "Adventure",
    badgeColor: "green",
    tagline: "Built for weekend getaways and scenic trails.",
    description: "Rugged crossover EV with elevated ground clearance, roof rails, and all-weather capability.",
    image: "./assets/images/bev-weekender-front.jpg",
    dummyImage: "./assets/images/bev-weekender-front.jpg",
    hasRealPhoto: true,
    comingSoon: false,
    specs: {
      range: "180 km", seats: "4-5", charge: "6 hrs", speed: "85 kph",
      motor: "10kW AC", battery: "LiFePO4 90Ah",
      weight: "520 kg", payload: "450 kg", warranty: "5 years"
    },
    highlights: ["Roof cargo rails", "All-terrain suspension", "Fast charge ready"]
  },
  // 5. EV4 SPORTY / 2-Door
  {
    id: "bev-sporty",
    name: "EV4 SPORTY / 2-Door",
    category: "ev4",
    badge: "Performance",
    badgeColor: "blue",
    tagline: "Aerodynamic styling with instant EV torque.",
    description: "Dynamic compact electric coupe designed for spirited city and highway driving.",
    dummyImage: "./assets/aistudio/bev-sporty-side_8cf09631.jpg",
    hasRealPhoto: false,
    comingSoon: false,
    specs: {
      range: "210 km", seats: "2-4", charge: "5 hrs", speed: "95 kph",
      motor: "12kW AC", battery: "LiFePO4 100Ah",
      weight: "510 kg", payload: "380 kg", warranty: "5 years"
    },
    highlights: ["Sport-tuned suspension", "Alloy wheels", "Digital cockpit"]
  },
  // 6. EV4 SINGLE CAB PICKUP / FLEXI
  {
    id: "bev-utility",
    name: "EV4 SINGLE CAB PICKUP / FLEXI",
    category: "ev4",
    badge: "Heavy Duty",
    badgeColor: "green",
    tagline: "Unstoppable workhorse with zero emissions.",
    description: "Equipped with an open utility bed and reinforced chassis for municipal and commercial hauling.",
    dummyImage: "./assets/aistudio/bev-utility-scap-side_9511f520.jpg",
    hasRealPhoto: false,
    comingSoon: false,
    specs: {
      range: "140 km", seats: "2", charge: "6 hrs", speed: "65 kph",
      motor: "8kW AC", battery: "LiFePO4 90Ah",
      weight: "550 kg", payload: "750 kg", warranty: "5 years"
    },
    highlights: ["Drop-side bed", "High torque hauling", "Heavy-duty leaf springs"]
  },
  // 7. EV4 TWIN-PAX/CARGO / 4-Door
  {
    id: "ev4-pax",
    name: "EV4 TWIN-PAX/CARGO / 4-Door",
    category: "ev4",
    badge: "Versatile",
    badgeColor: "green",
    tagline: "Switch between passengers and cargo.",
    description: "Configurable interior that adapts to your transport needs.",
    dummyImage: "./assets/aistudio/bev-utility-dcap-side_f8f8cceb.jpg",
    hasRealPhoto: false,
    comingSoon: false,
    specs: {
      range: "150 km", seats: "2-6", charge: "6 hrs", speed: "70 kph",
      motor: "7.5kW AC", battery: "LiFePO4 80Ah",
      weight: "500 kg", payload: "600 kg", warranty: "5 years"
    },
    highlights: ["Foldable seats", "Large cargo capacity", "Telematics"]
  },
  // 8. EV4 eREV / e-SHUTTLE
  {
    id: "eshuttle",
    name: "EV4 eREV / e-SHUTTLE",
    category: "commercial",
    alsoInEv4: true,
    badge: "Commercial Transit",
    badgeColor: "green",
    tagline: "Move more people, quietly.",
    description: "The ideal replacement for legacy public utility vehicles. High capacity, comfortable seating, and unmatched efficiency.",
    dummyImage: "./assets/aistudio/bev-eshuttle-side_309262ae.jpg",
    hasRealPhoto: false,
    comingSoon: false,
    specs: {
      range: "200 km", seats: "14-20", charge: "6 hrs", speed: "80 kph",
      motor: "20kW AC", battery: "LiFePO4 60kWh",
      weight: "1800 kg", payload: "1500 kg", warranty: "5 years"
    },
    highlights: ["Air conditioned", "Wheelchair accessible", "Fleet telematics"]
  },
  // 9. EV4 PWD Wheelchair / 6-10 PAX
  {
    id: "ev4-pwd",
    name: "EV4 PWD Wheelchair / 6-10 PAX",
    category: "ev4",
    badge: "Accessible",
    badgeColor: "green",
    tagline: "4-Wheel inclusive mobility.",
    description: "A versatile 4-wheeler offering stability and accessibility for varied uses.",
    image: "./assets/images/bev-pwd.jpg",
    hasRealPhoto: true,
    comingSoon: false,
    specs: {
      range: "150 km", seats: "6-10", charge: "6 hrs", speed: "60 kph",
      motor: "5kW AC", battery: "LiFePO4 60Ah",
      weight: "450 kg", payload: "400 kg", warranty: "5 years"
    },
    highlights: ["Wheelchair ramp", "Wide doors", "Telematics"]
  },

  // --- C.L.E.V.A. COMMERCIAL (Commercial 4PAx Cargo) ---
  {
    id: "commercial-4pax-cargo",
    name: "Commercial 4PAx Cargo",
    category: "commercial",
    badge: "Commercial Cargo",
    badgeColor: "green",
    tagline: "Heavy-duty 4-passenger crew and cargo utility.",
    description: "Configurable commercial electric vehicle engineered for municipal teams, service crews, and cargo logistics with zero emissions.",
    dummyImage: "./assets/images/4ev-comcargo-front.jpg",
    hasRealPhoto: false,
    comingSoon: false,
    specs: {
      range: "160 km", seats: "4", charge: "6 hrs", speed: "75 kph",
      motor: "12kW AC", battery: "LiFePO4 80Ah",
      weight: "580 kg", payload: "650 kg", warranty: "5 years"
    },
    highlights: ["4-Passenger crew cab", "High capacity cargo bed", "Heavy-duty chassis", "Fleet telematics"]
  },

  // --- C.L.E.V.A. AGRI DIVISION (Inactive / Coming Soon) ---
  {
    id: "agri-on-road",
    name: "ON ROAD",
    category: "agri",
    inactive: true,
    badge: "Agricultural",
    badgeColor: "green",
    tagline: "Efficient farm-to-market transport.",
    description: "Built for agricultural logistics on paved roads, ensuring fresh deliveries with zero emissions.",
    hasRealPhoto: false,
    comingSoon: true,
    specs: {
      range: "120 km", seats: "2", charge: "5 hrs", speed: "60 kph",
      motor: "10kW AC", battery: "LiFePO4 50kWh",
      weight: "1200 kg", payload: "1000 kg", warranty: "3 years"
    },
    highlights: ["High payload", "Durable suspension", "Telematics"]
  },
  {
    id: "agri-off-road",
    name: "OFF ROAD",
    category: "agri",
    inactive: true,
    badge: "Agricultural",
    badgeColor: "green",
    tagline: "Conquer the tough terrain.",
    description: "Designed to operate within farms and off-road environments with reliable electric power.",
    hasRealPhoto: false,
    comingSoon: true,
    specs: {
      range: "100 km", seats: "2", charge: "5 hrs", speed: "40 kph",
      motor: "15kW AC", battery: "LiFePO4 50kWh",
      weight: "1300 kg", payload: "1000 kg", warranty: "3 years"
    },
    highlights: ["AWD Option", "Off-road tires", "High ground clearance"]
  },
  {
    id: "agri-tractor",
    name: "TRACTOR HAULAGE",
    category: "agri",
    inactive: true,
    badge: "Agricultural",
    badgeColor: "green",
    tagline: "Heavy pulling, electric power.",
    description: "Electric tractor designed for heavy haulage operations across farms and industrial sites.",
    hasRealPhoto: false,
    comingSoon: true,
    specs: {
      range: "80 km", seats: "1", charge: "6 hrs", speed: "30 kph",
      motor: "30kW AC", battery: "LiFePO4 80kWh",
      weight: "2000 kg", payload: "3000 kg (Towing)", warranty: "3 years"
    },
    highlights: ["High torque", "PTO compatibility", "Telematics"]
  },
  {
    id: "agri-tippers",
    name: "TIPPERS",
    category: "agri",
    inactive: true,
    badge: "Agricultural",
    badgeColor: "green",
    tagline: "Easy unloading, green tech.",
    description: "Electric tipper vehicles for efficient movement and unloading of bulk agricultural materials.",
    hasRealPhoto: false,
    comingSoon: true,
    specs: {
      range: "100 km", seats: "2", charge: "6 hrs", speed: "50 kph",
      motor: "20kW AC", battery: "LiFePO4 60kWh",
      weight: "1800 kg", payload: "1500 kg", warranty: "3 years"
    },
    highlights: ["Hydraulic tipping bed", "Reinforced frame", "Telematics"]
  }
];

if (typeof window !== 'undefined') { window.VEHICLES = VEHICLES; }
export { VEHICLES };
