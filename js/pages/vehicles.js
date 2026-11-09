const VEHICLES = [
  {
    "id": "etrike-toda",
    "name": "eTRIKE-TODA",
    "category": "ev3",
    "badge": "Public Transit",
    "badgeColor": "green",
    "tagline": "The modern trike for regular routes.",
    "description": "100% Electric Tricycle – 3 Seater for all TODA<br>L5e CERTIFIED<br>MAX SPEED 45 kph",
    "image": "./assets/images/etrike-toda.jpg",
    "dummyImage": "./assets/images/etrike-toda.jpg",
    "hasRealPhoto": true,
    "comingSoon": false,
    "specs": {
      "Dimensions (L×W×H)": "2400 * 1250 *1660 mm",
      "Wheelbase": "1680 mm",
      "Rear Track (mm)": "1100 mm",
      "Motor/Controller": "20000 W/18 tube",
      "Max. Power": "4000W",
      "Tyre Size": "F 120/70-12<br>R 125/65-12<br>Tubeless",
      "Wheel Hub": "Aluminum Alloy",
      "Break": "F/220 disc R/Drum",
      "Shock Absorption": "F/Hydraulic; R/Hydraulic<br>Dual Spring Damping",
      "Dashboard": "Digital Instrument + Rearview Camera",
      "Speed": "27-28km/h - 37-38km/h",
      "Lithium Battery": "72v80ah",
      "Battery/Voltage": "60V/32Ah LiFePO4"
    },
    "Main Configuration": [
      "LED headlights",
      "Full-Width Taillights",
      "High-Mounted Brake Light",
      "Ambient Lights, USB + TCP, Bluetooth audio", 
      "Power Windshield Wipers",
      "ABS-Coated Body - Gearbox Housing",
      "High-Precision - Power Assist Gear",
      "Automotive-Grade Interior" 
    ]
  },
  
  {
    "id": "etrike-tt",
    "name": "Tuk-Tuk",
    "category": "ev3",
    "badge": "Public Transit",
    "badgeColor": "green",
    "tagline": "Heavy-duty electric transport.",
    "description": "100% Electric Tricycle – 6 seater-TUK-TUK for all TODA<br>L5e CERTIFIED<br>MAX SPEED 45 kph",
    "image": "./assets/images/etrike-tt.jpg",
    "hasRealPhoto": true,
    "comingSoon": false,
    "specs": {
      "Dimensions (L×W×H)": "2400 * 1250 *1660 mm",
      "Wheelbase": "1680 mm",
      "Rear Track (mm)": "1100 mm",
      "Motor/Controller": "20000 W/18 tube",
      "Max. Power": "4000W",
      "Tyre Size": "F 120/70-12<br>R 125/65-12<br>Tubeless",
      "Wheel Hub": "Aluminum Alloy",
      "Break": "F/220 disc R/Drum",
      "Shock Absorption": "F/Hydraulic; R/Hydraulic<br>Dual Spring Damping",
      "Dashboard": "Digital Instrument + Rearview Camera",
      "Speed": "27-28km/h - 37-38km/h",
      "Lithium Battery": "72v80ah",
      "Battery/Voltage": "60V/32Ah LiFePO4"
    },
    "Main Configuration": [
      "Independent foot parking", 
      "20000 CD car grade light + Strobe light", 
      "7-inch Electronic LCD Display", 
      "Rearview Camera, Bluetooth, USB", 
      "Solid roof & Solar Panel (Optional"
    ]
  },
  
  {
    "id": "ev4-compact",
    "name": "COMPACT / 2-Door",
    "category": "ev4",
    "badge": "Urban Compact",
    "badgeColor": "green",
    "tagline": "Agile, modern 2-door micro-EV for city living.",
    "description": "Ultra-compact electric 4-wheeler engineered for dense urban traffic, easy parking, and dependable daily commutes with zero emissions.",
    "image": "./assets/images/bev-compact.jpg",
    "dummyImage": "./assets/aistudio/bev-homebase1-side_9d9bc95a.jpg",
    "hasRealPhoto": true,
    "comingSoon": false,
    "specs": {
      "Dimensions (L×W×H)": "2450 × 1250 × 1650 mm",
      "Body Structure": "Two-door Passengers",
      "Voltage": "60-72V Universal",
      "Tyre Size": "4.00-10 Aluminum Allo",
      "Motor/Controller": "2000W / Dual 18-Tube",
      "Max. Power": "4000W",
      "Braking Device": "Dual Disc Brake",
      "Suspension Type": "Bridge Suspension"
    },
     "Main Configuration": [
      "Integrated LCD Dashboard", 
      "Rearview Camera", 
      "Heater, Sunroof Fan", 
      "Remote Key, Radio", 
      "Manual Window", 
      "Automotive-grade interior"
     ],
     "Options": [
      "Climate Control A/C", 
      "Solar Panels", 
      "FourClimate Control A/C",  
      "Four-Wheel Disc Brakes", 
      "Split Seats" 
    ]
  },
  
  {
    "id": "bevdeluxe",
    "name": "COMPACT / 4-Door",
    "category": "ev4",
    "badge": "Premium Transit",
    "badgeColor": "blue",
    "tagline": "Premium passenger transit.",
    "description": "Premium passenger electric vehicle with deluxe comfort.",
    "image": "./assets/images/comp4-4.jpg",
    "dummyImage": "./assets/images/comp4-4.jpg",
    "hasRealPhoto": true,
    "comingSoon": false,
    "specs": {
     "Dimensions (L×W×H)": "2650 × 1250 × 1650 mm",
      "Body Structure": "Four-door/Four-seater",
      "Voltage": "60-72V Universal",
      "Tyre Size": "4.00-10 Aluminum Alloy",
      "Motor/Controller": "2000W / Dual 18-Tube",
      "Max. Power": "4000W",
      "Braking Device": "Dual Disc Brake",
      "Suspension Type": "Bridge Suspension"
    },
     "Main Configuration": [
      "Integrated LCD Dashboard", 
      "Rearview Camera", 
      "Heater, Sunroof Fan", 
      "Remote Key, Radio", 
      "Manual Window", 
      "Automotive-grade interior"
     ],
     "Options": [
      "Climate Control A/C", 
      "Solar Panels", 
      "FourClimate Control A/C",  
      "Four-Wheel Disc Brakes", 
      "Split Seats" 
    ]
  },
  
  {
    "id": "ev4-family",
    "name": "FAMILY / 4-Door",
    "category": "ev4",
    "badge": "Family",
    "badgeColor": "green",
    "tagline": "The perfect neighborhood EV.",
    "description": "Comfortable 4-wheel electric transport designed for the modern family.",
    "image": "./assets/images/bev-family-front.jpg",
    "dummyImage": "./assets/images/bev-family-front.jpg",
    "hasRealPhoto": true,
    "comingSoon": false,
    "specs": {
      "Dimensions (L×W×H)": "3700 × 1750 × 1600 mm",
      "Body Structure": "Four-door/Five seater",
      "Voltage": "72V-100V Universal",
      "Tyre Size": "195/70/R14",
      "Motor/Controller": "2500W / Intelligent Controller",
      "Max. Power": "7000W",
      "Braking Device": "Four-Wheel Disc Brake",
      "Suspension Type": "Bridge Suspension"
    },
     "Main Configuration": [
      "Seat Belts", 
      "Four-Door Power Windows", 
      "Central Locking, Multimedia Screen", 
      "Reverse Radar, Reverse Camera", 
      "Heater, Remote Key, USB, Radio", 
      "LED Headlights, Premium Adjustable Seats", 
      "Air Conditioning, Automotive-grade interior"
    ]
  },
  
  {
    "id": "bev-weekender",
    "name": "WEEKENDER / 5-Door",
    "category": "ev4",
    "badge": "Adventure",
    "badgeColor": "green",
    "tagline": "Built for weekend getaways and scenic trails.",
    "description": "Rugged crossover EV with elevated ground clearance, roof rails, and all-weather capability.",
    "image": "./assets/images/bev-weekender-front.jpg",
    "dummyImage": "./assets/images/bev-weekender-front.jpg",
    "hasRealPhoto": true,
    "comingSoon": false,
    "specs": {
      "Dimensions (L×W×H)": "4100 × 1900 × 1800 mm",
      "Body Structure": "Five-door/Four-seate",
      "Voltage": "72V-100V Universal",
      "Tyre Size": "195/70/R14",
      "Motor/Controller": "3500W / Intelligent Controller",
      "Max. Power": "7000W",
      "Braking Device": "Four-Wheel Disc Brake",
      "Suspension Type": "Bridge Suspension"
    },
     "Main Configuration": [
      "Seat Belts", 
      "Four-Door Power Windows", 
      "Central Locking, Multimedia Screen", 
      "Reverse Radar, Reverse Camera", 
      "Heater, Remote Key, USB, Radio", 
      "LED Headlights, Adjustable Seats", 
      "Roof Rack, Air-Conditioning", 
      "Automotive-grade interior"
    ]
  },
  
  {
    "id": "bev-sporty",
    "name": "SPORTY / 2-Door",
    "category": "ev4",
    "badge": "Performance",
    "badgeColor": "blue",
    "tagline": "Aerodynamic styling with instant EV torque.",
    "description": "Dynamic compact electric coupe designed for spirited city and highway driving.",
    "image": "./assets/images/bev-sporty-side.jpg",
    "dummyImage": "./assets/images/bev-sporty-side.jpg",
    "hasRealPhoto": true,
    "comingSoon": false,
    "specs": {
      "Dimensions (L×W×H)": "2880 × 1580 × 1680 mm",
      "Body Structure": "Two-door/Three-seater",
      "Voltage": "72V-100V Universal",
      "Tyre Size": "155/70/R12",
      "Motor/Controller": "3000W / Intelligent Controller",
      "Max. Power": "6000W",
      "Braking Device": "Four-Wheel Disc Brake",
      "Suspension Type": "Bridge Suspension"
    },
     "Main Configuration": [
      "Seat Belts", 
      "Power Windows, Central Locking", 
      "Daytime Running Lights", 
      "Multimedia Screen, Rearview Camera", 
      "Heater, Remote Key, USB, Radio", 
      "LED Headlights, High-End Adjustable Seats", 
      "Air Conditionin"
    ]
  },
  
  {
    "id": "commercial-4pax-cargo",
    "name": "TWIN 4PAx Cargo",
    "category": "commercial",
    "badge": "Commercial Cargo",
    "badgeColor": "green",
    "tagline": "Light Passenger/Cargo EV for SME and personal transport  services.",
    "description": "AN ideal commercial EV to maximize passenger and light parcel/goods delivery revenues.",
    "image": "./assets/images/4ev-comcargo-front.jpg",
    "dummyImage": "./assets/images/4ev-comcargo-front.jpg",
    "hasRealPhoto": true,
    "comingSoon": false,
    "specs": {
      "Dimensions (L×W×H)": "3450 × 1450 × 1750 mm",
      "Cargo Bed (L×W×H)": "800 × 1150 × 45 mm",
      "Body Structure": "Two-door/Two-seater",
      "Battery/Voltage": "72V-100V Universal",
      "Tyre Size": "400-10",
      "Motor/Controller": "2000W AC Synchronous",
      "Max. Power": "4000W",
      "Braking Device": "Rear Disc Brak",
      "Suspension Type": "Bridge Suspensio"
    },
    "Main Configuration": [
      "Multimedia Screen", 
      "Reversing Camera, Heater", 
      "USB, Radio, LED Headlights", 
      "Premium Adjustable Seats", 
      "Air Conditionin"
    ]
  },
  
  {
    "id": "bev-utility",
    "name": "SINGLE CAB PICKUP / FLEXI",
    "category": "ev4",
    "badge": "Heavy Duty",
    "badgeColor": "green",
    "tagline": "Unstoppable workhorse with zero emissions.",
    "description": "Equipped with an open utility bed and reinforced chassis for municipal and commercial hauling.",
    "image": "./assets/images/bev-utility-scap-side.jpg",
    "dummyImage": "./assets/images/bev-utility-scap-side.jpg",
    "hasRealPhoto": true,
    "comingSoon": false,
    "specs": {
      "Dimensions (L×W×H)": "3450 × 1350 × 1650 mm",
      "Cargo Bed (L×W×H)": "1550 × 1250 × 450 mm",
      "Voltage": "72V-100V Universal",
      "Body Structure": "Two-door/Two-seater",
      "Tyre Size": "500-10",
      "Motor/Controller": "3000W / Intelligent Controller",
      "Max. Power": "6000W",
      "Braking Device": "Four-Wheel Disc Brake",
      "Suspension Type": "Bridge Suspension"
    },
     "Main Configuration": [
      "Seat Belts", 
      "Door Power Windows", 
      "Central Locking, Multimedia Screen", 
      "Reverse Radar, Reverse Camera, Heater", 
      "Remote Key, USB, Radio", 
      "LED Headlights, Premium Adjustable Seats", 
      "Air Condition"
    ]
  },
  
  {
    "id": "ev4-pax",
    "name": "TWIN-PAX/CARGO / 4-Door",
    "category": "ev4",
    "badge": "Versatile",
    "badgeColor": "green",
    "tagline": "Switch between passengers and cargo.",
    "description": "Configurable interior that adapts to your transport needs.",
    "image": "./assets/images/bev-utility-dcap-side.jpg",
    "dummyImage": "./assets/images/bev-utility-dcap-side.jpg",
    "hasRealPhoto": true,
    "comingSoon": false,
    "specs": {
      "Dimensions (L×W×H)": "4600 × 1900 × 1850 mm",
      "Cargo Bed (L×W×H)": "1550 × 1550 × 50 mm",
      "Voltage": "72V-100V Universal",
      "Body Structure": "Four-door/Four-seate",
      "Tyre Size": "205/70/R14",
      "Motor/Controller": "4000W / Intelligent Controller",
      "Max. Power": "8000W",
      "Braking Device": "Four-Wheel Disc Brake",
      "Suspension Type": "Bridge Suspension"
    },
     "Main Configuration": [
      "Seat Belts", 
      "Door Power Windows", 
      "Central Locking, Multimedia Screen", 
      "Reverse Radar, Reverse Camera, Heater", 
      "Remote Key, USB, Radio", 
      "LED Headlights, Premium Adjustable Seats", 
      "Air Condition"
    ]
  },
 
  {
    "id": "eshuttle",
    "name": "eREV / e-SHUTTLE",
    "category": "commercial",
    "badge": "Commercial Transit",
    "badgeColor": "green",
    "tagline": "Move more people, quietly.",
    "description": "A 100% battery electric EV minivan with unlimited rang.<br>Move people, safely, efficiently, comfortably and quietly.",
    "image": "./assets/images/bev-eshuttle-side.jpg",
    "dummyImage": "./assets/images/bev-eshuttle-side.jpg",
    "hasRealPhoto": true,
    "comingSoon": false,
    "specs": {
      "Dimensions (L×W×H)": "600 × 1400 × 1680 mm",
      "Body Structure": "Four-door/Nine-seat",
      "Voltage": "72V-200V Universal",
      "Tyre Size": "155/70/R12",
      "Motor/Controller": "5000W / Intelligent Controller",
      "Max. Power": "10000W",
      "Braking Device": "Front Disc / Rear Dru",
      "Suspension Type": "Leaf Spring Suspension"
    },
     "Main Configuration": [
      "Integrated LCD Dashboard", 
      "Rearview Camera", 
      "Heater, Sunroof Fan", 
      "Remote Key, Radio, Manual Window", 
      "Air Conditionin"
    ]
  },
 
  {
    "id": "ev4-pwd",
    "name": "PWD Wheelchair / 6-10 PAX",
    "category": "ev4",
    "badge": "Accessible",
    "badgeColor": "green",
    "tagline": "4-Wheel inclusive mobility.",
    "description": "A versatile 4-wheeler offering stability and accessibility for varied uses.",
    "image": "./assets/images/bev-pwd.jpg",
    "hasRealPhoto": true,
    "comingSoon": false,
    "specs": {
      "Dimensions (L×W×H)": "38500×1500×1900/1680/1100 mm",
      "Body Structure": "2000 W / 18 tube",
      "Voltage": "00-72V Universal/6-8 hours",
      "Tyre Size": "165/70/R1",
      "Motor/Controller": "5000W / Intelligent controller",
      "Max. Power": "10000W",
      "Braking Device": "Front Disc Rear Drum",
      "Max. Speed": "50-60KM/H, Range 230 kms",
      "Suspension Type": "Bridge Suspension/shock absorber"
    },
     "Main Configuration": [
      "Oil pan brake, ultra silent rear axle", 
      "Heater reversing image, radio",
      "Leather flame retardant harness", 
      "High temperature paint baking", 
      "remote key, anti-collision steel beam", 
      "Foam seat,. keel framework integrated stamping", 
      "Reversing light, one button start (DC only)", 
      "Car central control, electronic handbrak"
    ]
  },
 
  {
    "id": "agri-on-road",
    "name": "ON ROAD",
    "category": "agri",
    "inactive": true,
    "badge": "Agricultural",
    "badgeColor": "green",
    "tagline": "Efficient farm-to-market transport.",
    "description": "Built for agricultural logistics on paved roads, ensuring fresh deliveries with zero emissions.",
    "hasRealPhoto": false,
    "comingSoon": true,
    "specs": {
      "Dimensions (L×W×H)": "3300 × 1400 × 1750 mm",
      "Cargo Bed (L×W×H)": "1600 × 1300 × 400 mm",
      "Body Structure": "Corrosion-Resistant Galvanized Steel",
      "Battery/Voltage": "72V / 50kWh LiFePO4",
      "Tyre Size": "6.00-14 Light Truck",
      "Motor": "10kW AC High-Torque",
      "Controller": "72V Agri-Grade Waterproof Vector",
      "Braking Device": "Hydraulic Disc / Drum",
      "Suspension Type": "Heavy-Duty Leaf Spring"
    },
    "Main Configuration": [
      "High payload bed",
      "Durable suspension",
      "Waterproof electricals",
      "Telematics"
    ]
  },
  {
    "id": "agri-off-road",
    "name": "OFF ROAD",
    "category": "agri",
    "inactive": true,
    "badge": "Agricultural",
    "badgeColor": "green",
    "tagline": "Conquer the tough terrain.",
    "description": "Designed to operate within farms and off-road environments with reliable electric power.",
    "hasRealPhoto": false,
    "comingSoon": true,
    "specs": {
      "Dimensions (L×W×H)": "3100 × 1450 × 1850 mm",
      "Cargo Bed (L×W×H)": "1400 × 1350 × 450 mm",
      "Body Structure": "Tubular Steel Protective Roll Cage",
      "Battery/Voltage": "72V / 50kWh LiFePO4",
      "Tyre Size": "25×8-12 Deep Lug Off-Road",
      "Motor": "15kW AC Dual-Drive",
      "Controller": "72V All-Terrain Inverter",
      "Braking Device": "Four-Wheel Sealed Disc",
      "Suspension Type": "Independent Long-Travel Suspension"
    },
    "Main Configuration": [
      "AWD Option",
      "Off-road tires",
      "High ground clearance",
      "Underbody skid plates"
    ]
  },
  {
    "id": "agri-tractor",
    "name": "TRACTOR HAULAGE",
    "category": "agri",
    "inactive": true,
    "badge": "Agricultural",
    "badgeColor": "green",
    "tagline": "Heavy pulling, electric power.",
    "description": "Electric tractor designed for heavy haulage operations across farms and industrial sites.",
    "hasRealPhoto": false,
    "comingSoon": true,
    "specs": {
      "Dimensions (L×W×H)": "2800 × 1350 × 1900 mm",
      "Cargo Bed (L×W×H)": "3-Point Hitch & Tow Bar",
      "Body Structure": "Cast Heavy Tractor Chassis",
      "Battery/Voltage": "96V / 80kWh LiFePO4",
      "Tyre Size": "Front 6.00-16 / Rear 9.5-24",
      "Motor": "30kW AC High-Torque Tractor Motor",
      "Controller": "96V Industrial Vector Drive",
      "Braking Device": "Oil-Immersed Multi-Disc",
      "Suspension Type": "Rigid Agricultural Axle"
    },
    "Main Configuration": [
      "High torque PTO output",
      "Hydraulic three-point lift",
      "Heavy towing hitch",
      "Digital dash"
    ]
  },
  {
    "id": "agri-tippers",
    "name": "TIPPERS",
    "category": "agri",
    "inactive": true,
    "badge": "Agricultural",
    "badgeColor": "green",
    "tagline": "Easy unloading, green tech.",
    "description": "Electric tipper vehicles for efficient movement and unloading of bulk agricultural materials.",
    "hasRealPhoto": false,
    "comingSoon": true,
    "specs": {
      "Dimensions (L×W×H)": "3500 × 1450 × 1800 mm",
      "Cargo Bed (L×W×H)": "1800 × 1350 × 500 mm (Tipper)",
      "Body Structure": "Reinforced Hydraulic Dump Bed",
      "Battery/Voltage": "72V / 60kWh LiFePO4",
      "Tyre Size": "6.50-16 Industrial",
      "Motor": "20kW AC High-Torque",
      "Controller": "72V Heavy-Duty Hydraulic Vector",
      "Braking Device": "Dual-Circuit Hydraulic Disc",
      "Suspension Type": "Reinforced Multi-Leaf Spring"
    },
    "Main Configuration": [
      "Hydraulic tipping bed",
      "Reinforced frame",
      "Automatic tailgate latch",
      "Telematics"
    ]
  }
];

if (typeof window !== 'undefined') { window.VEHICLES = VEHICLES; }
export { VEHICLES };
