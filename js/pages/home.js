import { VEHICLES } from './vehicles.js';

const MODEL_SLIDES = {
  'etrike-toda': [
    './assets/images/etrike-toda.jpg',
    './assets/images/toda-2.jpg',
    './assets/images/toda-3.jpg',
    './assets/images/toda-1.jpg'
  ],
  'etrike-tt': [
    './assets/images/tuk-tuk-side.jpg',
    './assets/images/tuk-tuk-front.jpg'
  ],
  'ev4-compact': [
    './assets/images/comp2-4.jpg',
    './assets/images/comp2-3.jpg',
    './assets/images/comp2-2.jpg',
    './assets/images/comp2-1.jpg'
  ],
  'bevdeluxe': [
    './assets/images/comp4-4.jpg',
    './assets/images/comp4-1.jpg',
    './assets/images/comp4-2.jpg',
    './assets/images/comp4-3.jpg'
  ],
  'ev4-family': [
    './assets/images/bev-family-front.jpg',
    './assets/images/bev-family-side.jpg',
    './assets/images/bev-family-inside.jpg',
    './assets/images/bev-family-back.jpg'
  ],
  'bev-weekender': [
    './assets/images/bev-weekender-front.jpg',
    './assets/images/bev-weekender-side.jpg',
    './assets/images/bev-weekender-inside.jpg',
    './assets/images/bev-weekender-back.jpg'
  ],
  'bev-sporty': [
    './assets/images/bev-sporty-side.jpg',
    './assets/images/sporty-2.jpg',
    './assets/images/sport-1.jpg',
    './assets/images/sporty-3.jpg'
  ],
  'commercial-4pax-cargo': [
    './assets/images/4ev-comcargo-front.jpg',
    './assets/images/4ev-comcargo-side.jpg',
    './assets/images/4ev-comcargo-inside.jpg',
    './assets/images/ev4-comm-cargo-back.jpg'
  ],
  'bev-utility': [
    './assets/images/bev-utility-scap-side.jpg',
    './assets/images/bev-utility-tipper.jpg',
    './assets/images/bev-utility-scap-back.jpg',
    './assets/images/bev-utility-scap-inside.jpg'
  ],
  'ev4-pax': [
    './assets/images/bev-utility-dcap-side.jpg',
    './assets/images/bev-utility-dcap-front.jpg',
    './assets/images/bev-utility-dcap-back.jpg',
    './assets/images/bev-utility-dcap-inside.jpg'
  ],
  'eshuttle': [
    './assets/images/bev-eshuttle-side.jpg',
    './assets/images/bev-eshuttle-front.jpg',
    './assets/images/bev-eshuttle-back.jpg',
    './assets/images/bev-eshuttle-inside.jpg'
  ],
  'ev4-pwd': [
    './assets/images/bev-pwd.jpg',
    './assets/images/pwd-front.jpg',
    './assets/images/pwd-side2.jpg',
    './assets/images/pwd-draw.jpg'
  ]
};

const CATEGORY_LABELS = {
  ev3: 'C.L.E.V.A TRICYCLES',
  ev4: 'C.L.E.V.A CARS',
  commercial: 'C.L.E.V.A. COMMERCIAL'
};

const STORAGE_KEY = 'cleva_hero_model_ids';
const HERO_MODEL_COUNT = 5;
const AUTO_ADVANCE_MS = 5000;

function splitModelNameTwoLines(name) {
  const clean = String(name || '').trim();
  const parenIndex = clean.indexOf('(');
  if (parenIndex > 0) {
    return [clean.slice(0, parenIndex).trim(), clean.slice(parenIndex).trim()];
  }
  if (clean === 'EV3-BEV-eTRIKE-TODA') {
    return ['EV3-BEV', 'eTRIKE-TODA'];
  }
  if (clean === 'EV3 BEV eTRIKE-TUK-TUK') {
    return ['EV3 BEV', 'eTRIKE-TUK-TUK'];
  }
  const parts = clean.split(/\s+/);
  if (parts.length > 1) {
    const mid = Math.ceil(parts.length / 2);
    return [parts.slice(0, mid).join(' '), parts.slice(mid).join(' ')];
  }
  return [clean, ''];
}

function shuffleArray(list) {
  const arr = list.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function pickRandomModels(allModels, count) {
  let prevIds = [];
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) prevIds = JSON.parse(saved);
  } catch {
    prevIds = [];
  }

  const prevSet = new Set(Array.isArray(prevIds) ? prevIds : []);
  const unseen = shuffleArray(allModels.filter(v => !prevSet.has(v.id)));
  const seen = shuffleArray(allModels.filter(v => prevSet.has(v.id)));
  const selected = [...unseen, ...seen].slice(0, count);

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(selected.map(v => v.id)));
  } catch {
    // ignore storage limits
  }

  return selected;
}

function initHeroModelDock() {
  const modelsStrip = document.getElementById('heroModelsStrip');
  const slidePanel = document.getElementById('heroModelSlidePanel');
  const slideImg = document.getElementById('heroSlideImg');
  const slideTitle = document.getElementById('heroSlideTitle');
  const slideCategory = document.getElementById('heroSlideCategory');
  const slideDesc = document.getElementById('heroSlideDesc');
  const viewVehicleBtn = document.getElementById('heroSlideViewBtn');
  const prevPhotoBtn = document.getElementById('heroSlidePrevBtn');
  const nextPhotoBtn = document.getElementById('heroSlideNextBtn');
  const closePanelBtn = document.getElementById('heroSlideCloseBtn');
  const scrollLeftBtn = document.getElementById('heroBarScrollLeft');
  const scrollRightBtn = document.getElementById('heroBarScrollRight');

  if (!modelsStrip || !slidePanel || !Array.isArray(VEHICLES)) return;

  const allActiveModels = VEHICLES.filter(v => !v.inactive && v.category !== 'agri');
  const selectedModels = pickRandomModels(allActiveModels, HERO_MODEL_COUNT);

  let activeModelIndex = -1;
  let currentPhotoIndex = 0;
  let rafId = null;
  let elapsedMs = 0;
  let lastFrameTime = 0;
  let isSlidePaused = false;

  function getTabButtons() {
    return Array.from(modelsStrip.querySelectorAll('.hero-model-tab'));
  }

  function resetAllProgressFills() {
    getTabButtons().forEach(btn => {
      const fill = btn.querySelector('.hero-model-progress-fill');
      if (fill) fill.style.transform = '';
    });
  }

  function setActiveProgressFill(ratio) {
    if (activeModelIndex < 0) return;
    const activeBtn = getTabButtons()[activeModelIndex];
    const fill = activeBtn ? activeBtn.querySelector('.hero-model-progress-fill') : null;
    if (fill) {
      fill.style.transform = `scaleX(${Math.max(0, Math.min(1, ratio))})`;
    }
  }

  function getSlidesForVehicle(vehicle) {
    const mapped = MODEL_SLIDES[vehicle.id];
    if (mapped && mapped.length > 0) return mapped;
    return [vehicle.image || vehicle.cardImage || './assets/images/logo.png'];
  }

  function updateStripScrollButtons() {
    if (!scrollLeftBtn || !scrollRightBtn) return;
    const maxScroll = modelsStrip.scrollWidth - modelsStrip.clientWidth;
    scrollLeftBtn.hidden = modelsStrip.scrollLeft <= 4;
    scrollRightBtn.hidden = maxScroll <= 4 || modelsStrip.scrollLeft >= maxScroll - 4;
  }

  function stopAutoSlide() {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    elapsedMs = 0;
    lastFrameTime = 0;
    resetAllProgressFills();
  }

  function tickProgress(now) {
    if (activeModelIndex < 0) {
      stopAutoSlide();
      return;
    }

    if (!lastFrameTime) {
      lastFrameTime = now;
    }

    const delta = now - lastFrameTime;
    lastFrameTime = now;

    if (!isSlidePaused) {
      elapsedMs += delta;
      const ratio = elapsedMs / AUTO_ADVANCE_MS;
      setActiveProgressFill(ratio);

      if (elapsedMs >= AUTO_ADVANCE_MS) {
        elapsedMs = 0;
        showModelSlide((activeModelIndex + 1) % selectedModels.length);
      }
    }

    rafId = requestAnimationFrame(tickProgress);
  }

  function startAutoSlide() {
    stopAutoSlide();
    if (selectedModels.length <= 1) return;
    setActiveProgressFill(0);
    lastFrameTime = performance.now();
    rafId = requestAnimationFrame(tickProgress);
  }

  function renderPhotoAt(index) {
    if (activeModelIndex < 0 || activeModelIndex >= selectedModels.length) return;
    const vehicle = selectedModels[activeModelIndex];
    const slides = getSlidesForVehicle(vehicle);
    currentPhotoIndex = (index + slides.length) % slides.length;

    slideImg.src = slides[currentPhotoIndex];
    slideImg.alt = `${vehicle.name} - Photo ${currentPhotoIndex + 1}`;

    if (prevPhotoBtn) prevPhotoBtn.hidden = slides.length <= 1;
    if (nextPhotoBtn) nextPhotoBtn.hidden = slides.length <= 1;
  }

  function closeSlidePanel() {
    stopAutoSlide();
    activeModelIndex = -1;
    slidePanel.classList.remove('is-open');
    slidePanel.setAttribute('aria-hidden', 'true');
    getTabButtons().forEach(btn => {
      btn.classList.remove('is-active');
      btn.setAttribute('aria-expanded', 'false');
    });
  }

  function showModelSlide(idx) {
    const vehicle = selectedModels[idx];
    if (!vehicle) return;

    activeModelIndex = idx;
    currentPhotoIndex = 0;
    elapsedMs = 0;
    resetAllProgressFills();

    getTabButtons().forEach((btn, i) => {
      const isMatch = i === idx;
      btn.classList.toggle('is-active', isMatch);
      btn.setAttribute('aria-expanded', isMatch ? 'true' : 'false');
      if (isMatch && modelsStrip.scrollWidth > modelsStrip.clientWidth) {
        const targetLeft = btn.offsetLeft - (modelsStrip.clientWidth - btn.offsetWidth) / 2;
        modelsStrip.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' });
      }
    });

    slideCategory.textContent = CATEGORY_LABELS[vehicle.category] || 'C.L.E.V.A. PORTFOLIO';
    slideTitle.textContent = vehicle.name;
    slideDesc.textContent = vehicle.detailsTagline || vehicle.description || '';
    viewVehicleBtn.href = `./vehicle.html?id=${encodeURIComponent(vehicle.id)}${vehicle.category ? '&from=' + encodeURIComponent(vehicle.category) : ''}`;

    renderPhotoAt(0);
    slidePanel.classList.add('is-open');
    slidePanel.setAttribute('aria-hidden', 'false');
  }

  function handleModelTabClick(idx) {
    if (idx === activeModelIndex) {
      closeSlidePanel();
      return;
    }
    showModelSlide(idx);
    startAutoSlide();
  }

  modelsStrip.innerHTML = '';
  selectedModels.forEach((vehicle, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'hero-model-tab';
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', 'heroModelSlidePanel');

    const metaRow = document.createElement('span');
    metaRow.className = 'hero-model-tab-meta';
    const indexEl = document.createElement('span');
    indexEl.className = 'hero-model-index';
    indexEl.textContent = String(idx + 1).padStart(2, '0');
    const tagEl = document.createElement('span');
    tagEl.className = 'hero-model-tag';
    tagEl.textContent = vehicle.category === 'ev3' ? 'EV3' : (vehicle.category === 'commercial' ? 'COMMERCIAL' : 'EV4');
    metaRow.appendChild(indexEl);
    metaRow.appendChild(tagEl);
    btn.appendChild(metaRow);

    const [line1Text, line2Text] = splitModelNameTwoLines(vehicle.name);
    const line1El = document.createElement('span');
    line1El.className = 'hero-model-name-line1';
    line1El.textContent = line1Text;
    btn.appendChild(line1El);

    if (line2Text) {
      const line2El = document.createElement('span');
      line2El.className = 'hero-model-name-line2';
      line2El.textContent = line2Text;
      btn.appendChild(line2El);
    }

    const trackEl = document.createElement('span');
    trackEl.className = 'hero-model-progress-track';
    trackEl.setAttribute('aria-hidden', 'true');
    const fillEl = document.createElement('span');
    fillEl.className = 'hero-model-progress-fill';
    trackEl.appendChild(fillEl);
    btn.appendChild(trackEl);

    btn.addEventListener('click', () => handleModelTabClick(idx));
    modelsStrip.appendChild(btn);
  });

  slidePanel.addEventListener('mouseenter', () => {
    isSlidePaused = true;
  });
  slidePanel.addEventListener('mouseleave', () => {
    isSlidePaused = false;
    lastFrameTime = performance.now();
  });

  if (prevPhotoBtn) {
    prevPhotoBtn.addEventListener('click', () => renderPhotoAt(currentPhotoIndex - 1));
  }
  if (nextPhotoBtn) {
    nextPhotoBtn.addEventListener('click', () => renderPhotoAt(currentPhotoIndex + 1));
  }
  if (closePanelBtn) {
    closePanelBtn.addEventListener('click', closeSlidePanel);
  }

  if (scrollLeftBtn) {
    scrollLeftBtn.addEventListener('click', () => {
      modelsStrip.scrollBy({ left: -260, behavior: 'smooth' });
    });
  }
  if (scrollRightBtn) {
    scrollRightBtn.addEventListener('click', () => {
      modelsStrip.scrollBy({ left: 260, behavior: 'smooth' });
    });
  }

  modelsStrip.addEventListener('scroll', updateStripScrollButtons, { passive: true });
  window.addEventListener('resize', updateStripScrollButtons);
  updateStripScrollButtons();

  document.addEventListener('keydown', (e) => {
    if (activeModelIndex < 0) return;
    if (e.key === 'Escape') {
      closeSlidePanel();
    } else if (e.key === 'ArrowLeft') {
      renderPhotoAt(currentPhotoIndex - 1);
    } else if (e.key === 'ArrowRight') {
      renderPhotoAt(currentPhotoIndex + 1);
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeroModelDock);
} else {
  initHeroModelDock();
}
