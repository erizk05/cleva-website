// START FILE: vehicles.js
const VEHICLES = [
  {
    id: "etrike",
    name: "eTRIKE",
    category: "tricycle",
    badge: "Urban Mobility",
    badgeColor: "green",
    tagline: "The new face of the urban tricycle.",
    description: "Zero emissions, zero noise, zero fuel costs. Built for local routes and city streets. The eTRIKE brings clean mobility to every corner of the world.",
    specs: {
      range: "120 km", seats: "3", charge: "4 hrs", speed: "60 kph",
      motor: "3kW BLDC", battery: "LiFePO4 32Ah",
      weight: "280 kg", payload: "200 kg", warranty: "3 years"
    },
    highlights: ["Regenerative braking", "Weather-proof cabin", "Digital display"]
  },
  {
    id: "eshuttle",
    name: "eSHUTTLE",
    category: "minibus",
    badge: "Group Transit",
    badgeColor: "green",
    tagline: "Move more people, quietly.",
    description: "The ideal replacement for legacy public utility vehicles. High capacity, comfortable seating, and unmatched efficiency.",
    specs: {
      range: "150 km", seats: "14-20", charge: "6 hrs", speed: "80 kph",
      motor: "20kW AC", battery: "LiFePO4 60kWh",
      weight: "1800 kg", payload: "1500 kg", warranty: "5 years"
    },
    highlights: ["Air conditioned", "Wheelchair accessible", "Fleet telematics"]
  },
  {
    id: "bevdeluxe",
    name: "BEV Deluxe",
    category: "sedan",
    badge: "Executive",
    badgeColor: "green",
    tagline: "Premium comfort for executives.",
    description: "Designed for corporate fleets and resort VIP transport. Smooth, silent, and sophisticated.",
    specs: {
      range: "350 km", seats: "5", charge: "40 min (DC)", speed: "140 kph",
      motor: "120kW Sync", battery: "NCM 70kWh",
      weight: "1650 kg", payload: "450 kg", warranty: "8 years"
    },
    highlights: ["Premium audio", "ADAS suite", "Leather interior"]
  },
  {
    id: "emover",
    name: "eMOVER",
    category: "van",
    badge: "Utility",
    badgeColor: "green",
    tagline: "Versatile space for people and goods.",
    description: "A multi-purpose EV van perfect for shuttle services or last-mile delivery. Configurable interior.",
    specs: {
      range: "250 km", seats: "8-11", charge: "1 hr (DC)", speed: "120 kph",
      motor: "80kW AC", battery: "LiFePO4 50kWh",
      weight: "1900 kg", payload: "1000 kg", warranty: "5 years"
    },
    highlights: ["Sliding doors", "Configurable seating", "Fast charging"]
  },
  {
    id: "elinebus",
    name: "eLine Bus",
    category: "bus",
    badge: "Mass Transit",
    badgeColor: "green",
    tagline: "The backbone of city transport.",
    description: "Full-sized electric bus for high-volume routes. Designed for maximum passenger flow and minimal downtime.",
    specs: {
      range: "300 km", seats: "40+", charge: "2 hrs (DC)", speed: "90 kph",
      motor: "250kW AC", battery: "LiFePO4 250kWh",
      weight: "12000 kg", payload: "6000 kg", warranty: "8 years"
    },
    highlights: ["Low floor", "Kneeling function", "Dual AC"]
  },
  {
    id: "eridecargo",
    name: "eRIDE Cargo+",
    category: "truck",
    badge: "Logistics",
    badgeColor: "green",
    tagline: "Zero-emission last mile.",
    description: "Compact electric truck designed for urban logistics and resort maintenance operations.",
    specs: {
      range: "200 km", seats: "2", charge: "5 hrs", speed: "80 kph",
      motor: "40kW AC", battery: "LiFePO4 40kWh",
      weight: "1500 kg", payload: "1200 kg", warranty: "5 years"
    },
    highlights: ["Box or flatbed", "Tight turning radius", "Telematics"]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { VEHICLES };
}
// END FILE: vehicles.js
