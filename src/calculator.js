/**
 * CLEVA Commercial EV - Fleet Savings Calculator Controller
 */
import './common.js';
import { showToast } from './common.js';

// Standard B2B parameters
const VEHICLE_DATA = {
  van: {
    name: 'Commercial EV (Delivery Van)',
    iceMpg: 14,             // Miles per Gallon equivalent
    evKwhMile: 0.52,         // kWh consumption per mile
    maintSavingsMile: 0.14,  // Maintenance savings per mile (USD)
    co2Multiplier: 0.82,     // Lbs of CO2 output offset per mile
    capitalPremium: 12000    // Additional capital cost vs gas model
  },
  pwd: {
    name: 'PWD EV (Accessible Shuttle)',
    iceMpg: 10,
    evKwhMile: 0.64,
    maintSavingsMile: 0.18,
    co2Multiplier: 0.96,
    capitalPremium: 14500
  },
  trike: {
    name: 'E-Trike (Cargo Trike)',
    iceMpg: 42,
    evKwhMile: 0.09,
    maintSavingsMile: 0.08,
    co2Multiplier: 0.41,
    capitalPremium: 2500
  },
  shuttle: {
    name: 'ev4-eREV Shuttle',
    iceMpg: 9,
    evKwhMile: 0.78,
    maintSavingsMile: 0.22,
    co2Multiplier: 1.15,
    capitalPremium: 18500
  }
};

const STATS_STATE = {
  currentSavings: 0
};

document.addEventListener('DOMContentLoaded', () => {
  initSavingsCalculator();
});

function initSavingsCalculator() {
  const fleetSizeRange = document.getElementById('fleet-size');
  const fleetSizeValue = document.getElementById('fleet-size-val');
  
  const vehicleTypeSelect = document.getElementById('vehicle-type');
  
  const dailyMileageRange = document.getElementById('daily-mileage');
  const dailyMileageValue = document.getElementById('daily-mileage-val');
  
  const fuelPriceInput = document.getElementById('fuel-price');
  const electricityPriceInput = document.getElementById('electricity-price');
  
  if (!fleetSizeRange || !vehicleTypeSelect || !dailyMileageRange) return;

  // Set up event listeners for inputs
  fleetSizeRange.addEventListener('input', (e) => {
    if (fleetSizeValue) fleetSizeValue.textContent = e.target.value;
    calculateSavings();
  });

  dailyMileageRange.addEventListener('input', (e) => {
    if (dailyMileageValue) dailyMileageValue.textContent = e.target.value + ' mi';
    calculateSavings();
  });

  vehicleTypeSelect.addEventListener('change', calculateSavings);
  fuelPriceInput.addEventListener('input', calculateSavings);
  electricityPriceInput.addEventListener('input', calculateSavings);

  // Trigger initial calculation
  calculateSavings();
}

function calculateSavings() {
  const fleetSizeEl = document.getElementById('fleet-size');
  const vehicleTypeEl = document.getElementById('vehicle-type');
  const dailyMileageEl = document.getElementById('daily-mileage');
  const fuelPriceEl = document.getElementById('fuel-price');
  const electricityPriceEl = document.getElementById('electricity-price');

  if (!fleetSizeEl || !vehicleTypeEl || !dailyMileageEl || !fuelPriceEl || !electricityPriceEl) return;

  const fleetSize = parseInt(fleetSizeEl.value, 10);
  const vehicleType = vehicleTypeEl.value;
  const dailyMileage = parseInt(dailyMileageEl.value, 10);
  const fuelPrice = parseFloat(fuelPriceEl.value) || 3.85;
  const electricityPrice = parseFloat(electricityPriceEl.value) || 0.14;

  const vehicle = VEHICLE_DATA[vehicleType];
  const BUSINESS_DAYS_PER_YEAR = 260; // standard 5-day week corporate calendar

  // Math equations
  const annualMileagePerVehicle = dailyMileage * BUSINESS_DAYS_PER_YEAR;
  const totalFleetAnnualMileage = annualMileagePerVehicle * fleetSize;

  // ICE Fuel Cost
  const gasCostPerMile = fuelPrice / vehicle.iceMpg;
  const totalIceFuelCost = totalFleetAnnualMileage * gasCostPerMile;

  // EV Fuel Cost (electricity)
  const electricityCostPerMile = vehicle.evKwhMile * electricityPrice;
  const totalEvElectricCost = totalFleetAnnualMileage * electricityCostPerMile;

  // Outlay & Maintenances
  const totalFuelSavings = totalIceFuelCost - totalEvElectricCost;
  const totalMaintSavings = totalFleetAnnualMileage * vehicle.maintSavingsMile;
  const totalAnnualSavings = totalFuelSavings + totalMaintSavings;

  // Environmental Benefits (CO2 Saved in Lbs)
  const co2OffsetLbs = totalFleetAnnualMileage * vehicle.co2Multiplier;
  const co2OffsetTons = (co2OffsetLbs / 2000).toFixed(1);

  // Payback Period Estimator
  const totalPremiumCost = vehicle.capitalPremium * fleetSize;
  const paybackPeriodYears = totalAnnualSavings > 0 ? (totalPremiumCost / totalAnnualSavings) : 0;

  // Render variables safely
  updateCounterAnimation(totalAnnualSavings);
  
  const maintSavingsEl = document.getElementById('maint-savings-val');
  const fuelSavingsEl = document.getElementById('fuel-savings-val');
  const carbonOffsetEl = document.getElementById('carbon-offset-val');
  const paybackEl = document.getElementById('payback-val');

  if (maintSavingsEl) maintSavingsEl.textContent = '+' + formatCurrency(totalMaintSavings);
  if (fuelSavingsEl) fuelSavingsEl.textContent = '+' + formatCurrency(totalFuelSavings);
  if (carbonOffsetEl) carbonOffsetEl.textContent = formatNumber(co2OffsetLbs) + ' lbs (' + co2OffsetTons + ' tons)';
  if (paybackEl) {
    paybackEl.textContent = paybackPeriodYears > 0 
      ? paybackPeriodYears.toFixed(1) + ' Years' 
      : 'Immediate';
  }
}

function updateCounterAnimation(targetNum) {
  const hugeSavingsDisplay = document.getElementById('savings-huge');
  if (!hugeSavingsDisplay) return;

  const startNum = STATS_STATE.currentSavings;
  const duration = 800; // milliseconds
  const startTime = performance.now();

  function animate(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Smooth easeOutCubic curve
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const val = startNum + (targetNum - startNum) * easeProgress;
    
    hugeSavingsDisplay.textContent = formatCurrency(Math.floor(val));
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      hugeSavingsDisplay.textContent = formatCurrency(Math.round(targetNum));
      STATS_STATE.currentSavings = targetNum;
    }
  }

  requestAnimationFrame(animate);
}

function formatCurrency(num) {
  return '$' + Math.round(num).toLocaleString('en-US');
}

function formatNumber(num) {
  return Math.round(num).toLocaleString('en-US');
}
