/**
 * CLEVA Commercial EV - Home Page Controller
 * Handles B2B Fleet Showcase Slider & Animations
 */
import './common.js';

document.addEventListener('DOMContentLoaded', () => {
  initVehicleSlider();
  initPartnersSlider();
});

/* ==========================================================================
   B2B FLEET SHOWCASE IMAGE SLIDER CONTROLLER
   ========================================================================== */
function initVehicleSlider() {
  const track = document.getElementById('slider-track');
  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');
  const dots = document.querySelectorAll('#slider-pagination .slider-dot');
  
  if (!track || !prevBtn || !nextBtn || !dots.length) return;

  const totalSlides = dots.length;
  let currentIndex = 0;
  let autoPlayTimer = null;
  const AUTO_PLAY_DELAY = 6000; // 6 seconds

  // Transition to specific slide
  function goToSlide(index) {
    if (index < 0) {
      currentIndex = totalSlides - 1;
    } else if (index >= totalSlides) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    // Apply exact TranslateX percentage of the 400% wide track
    track.style.transform = `translateX(-${currentIndex * 25}%)`;

    // Highlight the active dot
    dots.forEach((dot, idx) => {
      if (idx === currentIndex) {
        dot.classList.add('active');
        dot.setAttribute('aria-selected', 'true');
      } else {
        dot.classList.remove('active');
        dot.setAttribute('aria-selected', 'false');
      }
    });
  }

  // Next slide
  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  // Previous slide
  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  // Set up Event Listeners for Nav Arrows
  nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    nextSlide();
    resetAutoPlay();
  });

  prevBtn.addEventListener('click', (e) => {
    e.preventDefault();
    prevSlide();
    resetAutoPlay();
  });

  // Set up Dot Pagination Triggers
  dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const idx = parseInt(dot.getAttribute('data-slide-index'), 10);
      goToSlide(idx);
      resetAutoPlay();
    });
  });

  // Touch Swipe Gestures for Mobile Device Responsiveness
  let touchStartX = 0;
  let touchEndX = 0;

  const sliderViewport = document.querySelector('.vehicle-slider-viewport');
  if (sliderViewport) {
    sliderViewport.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    sliderViewport.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const swipeThreshold = 50; // Minimum swipe distance in pixels
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      resetAutoPlay();
    }
  }

  // Auto Play Loop Engine
  function startAutoPlay() {
    if (autoPlayTimer) return;
    autoPlayTimer = setInterval(nextSlide, AUTO_PLAY_DELAY);
  }

  function stopAutoPlay() {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
  }

  function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
  }

  // Intelligently pause carousel auto-play when user is hovering on the frame
  const sliderWrapper = document.querySelector('.vehicle-slider-wrapper');
  if (sliderWrapper) {
    sliderWrapper.addEventListener('mouseenter', stopAutoPlay);
    sliderWrapper.addEventListener('mouseleave', startAutoPlay);
  }

  // Initialize auto-play on load
  startAutoPlay();
}

/* ==========================================================================
   TRUSTED BY ENTERPRISE PARTNERS CAROUSEL CONTROLLER
   ========================================================================== */
function initPartnersSlider() {
  const track = document.getElementById('partner-carousel-track');
  const prevBtn = document.getElementById('partner-prev-btn');
  const nextBtn = document.getElementById('partner-next-btn-right');
  const dots = document.querySelectorAll('[data-partner-dot]');
  const cards = document.querySelectorAll('.partner-logo-card');
  
  if (!track || !prevBtn || !nextBtn || !cards.length) return;

  const totalSlides = cards.length;
  let currentIndex = 0;
  let autoPlayTimer = null;
  const AUTO_PLAY_DELAY = 7000; // 7 seconds

  // Transition to specific slide
  function goToSlide(index) {
    if (index < 0) {
      currentIndex = totalSlides - 1;
    } else if (index >= totalSlides) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    // Apply exact TranslateX percentage of the 500% wide track
    track.style.transform = `translateX(-${currentIndex * 20}%)`;

    // Highlight the active indicator dot
    dots.forEach((dot, idx) => {
      if (idx === currentIndex) {
        dot.classList.add('active');
        dot.setAttribute('aria-selected', 'true');
      } else {
        dot.classList.remove('active');
        dot.setAttribute('aria-selected', 'false');
      }
    });

    // Highlight the active logo card
    cards.forEach((card, idx) => {
      if (idx === currentIndex) {
        card.classList.add('active');
        card.setAttribute('aria-selected', 'true');
      } else {
        card.classList.remove('active');
        card.setAttribute('aria-selected', 'false');
      }
    });
  }

  // Next slide
  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  // Previous slide
  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  // Set up Event Listeners for Nav Arrows
  nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    nextSlide();
    resetAutoPlay();
  });

  prevBtn.addEventListener('click', (e) => {
    e.preventDefault();
    prevSlide();
    resetAutoPlay();
  });

  // Set up Dot Pagination Triggers
  dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const idx = parseInt(dot.getAttribute('data-partner-dot'), 10);
      goToSlide(idx);
      resetAutoPlay();
    });
  });

  // Set up Partner Logo Card interactive triggers
  cards.forEach((card) => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const idx = parseInt(card.getAttribute('data-partner-index'), 10);
      goToSlide(idx);
      resetAutoPlay();
    });
  });

  // Touch Swipe Gestures for Mobile Device Responsiveness
  let touchStartX = 0;
  let touchEndX = 0;

  const carouselViewport = document.querySelector('.partner-carousel-viewport');
  if (carouselViewport) {
    carouselViewport.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carouselViewport.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const swipeThreshold = 50; // Minimum swipe distance in pixels
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      resetAutoPlay();
    }
  }

  // Auto Play Loop Engine
  function startAutoPlay() {
    if (autoPlayTimer) return;
    autoPlayTimer = setInterval(nextSlide, AUTO_PLAY_DELAY);
  }

  function stopAutoPlay() {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
  }

  function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
  }

  // Intelligently pause carousel auto-play when user is hovering on the carousel frame or logo list
  const partnerSliderWrapper = document.querySelector('.partner-carousel-wrapper');
  if (partnerSliderWrapper) {
    partnerSliderWrapper.addEventListener('mouseenter', stopAutoPlay);
    partnerSliderWrapper.addEventListener('mouseleave', startAutoPlay);
  }

  const partnersLogosList = document.getElementById('partners-logos-list');
  if (partnersLogosList) {
    partnersLogosList.addEventListener('mouseenter', stopAutoPlay);
    partnersLogosList.addEventListener('mouseleave', startAutoPlay);
  }

  // Initialize auto-play on load
  startAutoPlay();
}
