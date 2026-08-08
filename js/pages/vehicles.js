const VEHICLES = [
  {
    id: "etrike-toda",
    name: "EV3-BEV eTRIKE TODA",
    category: "ev3",
    badge: "Public Transit",
    badgeColor: "green",
    tagline: "The modern trike for regular routes.",
    description: "Built for local barangay routes. Zero emissions, zero noise, zero fuel costs.",
    specs: {
      range: "120 km", seats: "6", charge: "4 hrs", speed: "50 kph",
      motor: "3kW BLDC", battery: "LiFePO4 32Ah",
      weight: "280 kg", payload: "400 kg", warranty: "3 years"
    },
    highlights: ["Regenerative braking", "Weather-proof cabin", "Digital display"]
  },
  {
    id: "etrike-tt",
    name: "EV3-BEV eTRIKE TT",
    category: "ev3",
    badge: "Utility",
    badgeColor: "green",
    tagline: "Heavy-duty electric transport.",
    description: "Designed for tougher tasks and logistics in urban environments.",
    specs: {
      range: "100 km", seats: "2", charge: "4 hrs", speed: "50 kph",
      motor: "4kW BLDC", battery: "LiFePO4 40Ah",
      weight: "300 kg", payload: "500 kg", warranty: "3 years"
    },
    highlights: ["High torque", "Cargo bed", "Digital display"]
  },
  {
    id: "etrike-pwd",
    name: "EV3-BEV eTRIKE PWD",
    category: "ev3",
    badge: "Accessible",
    badgeColor: "green",
    tagline: "Mobility for everyone.",
    description: "Specially designed to be accessible, ensuring inclusive mobility solutions.",
    specs: {
      range: "120 km", seats: "4", charge: "4 hrs", speed: "50 kph",
      motor: "3kW BLDC", battery: "LiFePO4 32Ah",
      weight: "290 kg", payload: "350 kg", warranty: "3 years"
    },
    highlights: ["Ramp access", "Spacious interior", "Digital display"]
  },
  {
    id: "etrike-leisure",
    name: "EV3-BEV eTRIKE LEISURE",
    category: "ev3",
    badge: "Lifestyle",
    badgeColor: "green",
    tagline: "Explore the city in style.",
    description: "Perfect for personal use and leisurely rides across town or resorts.",
    specs: {
      range: "120 km", seats: "3", charge: "4 hrs", speed: "55 kph",
      motor: "3kW BLDC", battery: "LiFePO4 32Ah",
      weight: "270 kg", payload: "250 kg", warranty: "3 years"
    },
    highlights: ["Premium seating", "Open sides", "Digital display"]
  },
  {
    id: "etrike-family",
    name: "EV3-BEV eTRIKE FAMILY",
    category: "ev3",
    badge: "Family",
    badgeColor: "green",
    tagline: "Safe rides for your loved ones.",
    description: "A comfortable and safe electric tricycle for daily family commutes.",
    specs: {
      range: "120 km", seats: "5", charge: "4 hrs", speed: "50 kph",
      motor: "3kW BLDC", battery: "LiFePO4 32Ah",
      weight: "285 kg", payload: "300 kg", warranty: "3 years"
    },
    highlights: ["Enclosed cabin", "Child locks", "Digital display"]
  },
  {
    id: "ev4-pwd",
    name: "EV4 BEV PWD Multi Use",
    category: "ev4",
    badge: "Accessible",
    badgeColor: "green",
    tagline: "4-Wheel inclusive mobility.",
    description: "A versatile 4-wheeler offering stability and accessibility for varied uses.",
    specs: {
      range: "150 km", seats: "4", charge: "6 hrs", speed: "60 kph",
      motor: "5kW AC", battery: "LiFePO4 60Ah",
      weight: "450 kg", payload: "400 kg", warranty: "5 years"
    },
    highlights: ["Wheelchair ramp", "Wide doors", "Telematics"]
  },
  {
    id: "ev4-pax",
    name: "EV4 BEV PAX/CARGO",
    category: "ev4",
    badge: "Versatile",
    badgeColor: "green",
    tagline: "Switch between passengers and cargo.",
    description: "Configurable interior that adapts to your transport needs.",
    specs: {
      range: "150 km", seats: "2-6", charge: "6 hrs", speed: "70 kph",
      motor: "7.5kW AC", battery: "LiFePO4 80Ah",
      weight: "500 kg", payload: "600 kg", warranty: "5 years"
    },
    highlights: ["Foldable seats", "Large cargo capacity", "Telematics"]
  },
  {
    id: "ev4-family",
    name: "EV4 BEV FAMILY",
    category: "ev4",
    badge: "Family",
    badgeColor: "green",
    tagline: "The perfect neighborhood EV.",
    description: "Comfortable 4-wheel electric transport designed for the modern family.",
    specs: {
      range: "150 km", seats: "4", charge: "6 hrs", speed: "80 kph",
      motor: "7.5kW AC", battery: "LiFePO4 80Ah",
      weight: "480 kg", payload: "400 kg", warranty: "5 years"
    },
    highlights: ["Air conditioning", "Infotainment", "Telematics"]
  },
  {
    id: "eshuttle",
    name: "EV4 BEV eSHUTTLE",
    category: "commercial",
    badge: "Commercial Transit",
    badgeColor: "green",
    tagline: "Move more people, quietly.",
    description: "The ideal replacement for legacy public utility vehicles. High capacity, comfortable seating, and unmatched efficiency.",
    specs: {
      range: "200 km", seats: "14-20", charge: "6 hrs", speed: "80 kph",
      motor: "20kW AC", battery: "LiFePO4 60kWh",
      weight: "1800 kg", payload: "1500 kg", warranty: "5 years"
    },
    highlights: ["Air conditioned", "Wheelchair accessible", "Fleet telematics"]
  },
  {
    id: "agri-on-road",
    name: "ON ROAD",
    category: "agri",
    badge: "Agricultural",
    badgeColor: "green",
    tagline: "Efficient farm-to-market transport.",
    description: "Built for agricultural logistics on paved roads, ensuring fresh deliveries with zero emissions.",
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
    badge: "Agricultural",
    badgeColor: "green",
    tagline: "Conquer the tough terrain.",
    description: "Designed to operate within farms and off-road environments with reliable electric power.",
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
    badge: "Agricultural",
    badgeColor: "green",
    tagline: "Heavy pulling, electric power.",
    description: "Electric tractor designed for heavy haulage operations across farms and industrial sites.",
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
    badge: "Agricultural",
    badgeColor: "green",
    tagline: "Easy unloading, green tech.",
    description: "Electric tipper vehicles for efficient movement and unloading of bulk agricultural materials.",
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
