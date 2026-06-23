/**
 * CLEVA Commercial EV - Shared Common Controller
 * Handles Navbar, Dark Mode, Quote Dialogs, and Toast alerts across all pages
 */
import { TRANSLATIONS } from './translations.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileMenu();
  initDarkMode();
  initQuoteModals();
  initGlobalActiveLink();
  initLanguageSwitcher();
});

/* ==========================================
   1. NAVBAR SCROLL EFFECT
   ========================================== */
export function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  // Check initial state
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  }
}

/* ==========================================
   2. MOBILE MENU TOGGLE
   ========================================== */
export function initMobileMenu() {
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');
  
  if (!mobileBtn || !navLinks) return;
  
  mobileBtn.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-open');
    mobileBtn.querySelectorAll('span').forEach((span, i) => {
      if (navLinks.classList.contains('mobile-open')) {
        if (i === 0) span.style.transform = 'translateY(7px) rotate(45deg)';
        if (i === 1) span.style.opacity = '0';
        if (i === 2) span.style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        span.style.transform = 'none';
        span.style.opacity = '1';
      }
    });
  });

  // Close when clicking nav link
  navLinks.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav-link')) {
      navLinks.classList.remove('mobile-open');
      mobileBtn.querySelectorAll('span').forEach(span => {
        span.style.transform = 'none';
        span.style.opacity = '1';
      });
    }
  });
}

/* ==========================================
   3. PREMIUM DARK MODE THEME CONTROLLER
   ========================================== */
export function initDarkMode() {
  const toggleBtn = document.getElementById('dark-mode-toggle');
  if (!toggleBtn) return;

  const sunIcon = toggleBtn.querySelector('.sun-icon');
  const moonIcon = toggleBtn.querySelector('.moon-icon');

  function updateIcons(isDark) {
    if (isDark) {
      if (sunIcon) sunIcon.style.display = 'none';
      if (moonIcon) moonIcon.style.display = 'block';
    } else {
      if (sunIcon) sunIcon.style.display = 'block';
      if (moonIcon) moonIcon.style.display = 'none';
    }
  }

  // Detect current theme representation on load
  const isDarkInitial = document.documentElement.classList.contains('dark-theme');
  updateIcons(isDarkInitial);

  function setMode(isDark) {
    if (isDark) {
      document.documentElement.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
      updateIcons(true);
    } else {
      document.documentElement.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
      updateIcons(false);
    }
  }

  // Toggle Action
  toggleBtn.addEventListener('click', () => {
    const isCurrentlyDark = document.documentElement.classList.contains('dark-theme');
    setMode(!isCurrentlyDark);
    
    // Quick success toast for active feedback
    showToast('Theme Changed', `Switched to ${!isCurrentlyDark ? 'Dark Cosmic' : 'Light Slate'} operational mode.`);
  });
}

/* ==========================================
   4. TOAST NOTIFICATIONS
   ========================================== */
export function showToast(title, desc) {
  const toast = document.getElementById('toast');
  const toastTitle = document.getElementById('toast-title');
  const toastDesc = document.getElementById('toast-desc');
  
  if (!toast || !toastTitle || !toastDesc) return;

  toastTitle.textContent = title;
  toastDesc.textContent = desc;
  
  toast.classList.add('show');
  
  // Clear any existing timeout
  if (window.toastTimeout) {
    clearTimeout(window.toastTimeout);
  }
  
  window.toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 5000); // automatic dismiss after 5s
}

/* ==========================================
   5. INTERACTIVE QUOTE / PROP MODALS
   ========================================== */
export function initQuoteModals() {
  const modalOverlay = document.getElementById('modal-overlay');
  const modalClose = document.getElementById('modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalForm = document.getElementById('modal-form');
  
  // Targets elements that launch quote modals
  const quoteTriggers = document.querySelectorAll('[data-quote-trigger]');

  quoteTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const type = btn.getAttribute('data-quote-trigger') || 'Generic';
      
      // Update target vehicle specs context
      let text = 'B2B Fleet Quote';
      if (type === 'van') text = 'Request Delivery Van Pricing Structure';
      if (type === 'pwd') text = 'Request Accessible PWD EV Quote';
      if (type === 'trike') text = 'Request Cargo E-Trike Specifications & Quotation';
      if (type === 'shuttle') text = 'Request ev4-eREV Multi-Passenger Quotation';
      if (type === 'general') text = 'Request Comprehensive Fleet Evaluation';

      if (modalTitle) modalTitle.textContent = text;
      
      const contextInput = document.getElementById('modal-vehicle-context');
      if (contextInput) contextInput.value = type;
      
      if (modalOverlay) modalOverlay.classList.add('show');
    });
  });

  if (modalClose && modalOverlay) {
    modalClose.addEventListener('click', () => {
      modalOverlay.classList.remove('show');
    });

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('show');
      }
    });
  }

  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (modalOverlay) modalOverlay.classList.remove('show');
      
      const modalEmailInput = document.getElementById('modal-email');
      const modalCompanyInput = document.getElementById('modal-company');
      
      const modalEmail = modalEmailInput ? modalEmailInput.value : '';
      const modalCompany = modalCompanyInput ? modalCompanyInput.value : '';
      
      showToast('Spec Pack Generated', `Proposal and commercial volume matrix dispatched to ${modalEmail} representing ${modalCompany}.`);
      modalForm.reset();
    });
  }
}

/* ==========================================
   6. GLOBAL ACTIVE NAVBAR LINK HIGHLIGHT
   ========================================== */
function initGlobalActiveLink() {
  const navLinks = document.querySelectorAll('.nav-link');
  const currentPath = window.location.pathname;
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    
    const href = link.getAttribute('href');
    if (href) {
      // Check if current HTML matches the href
      if (currentPath.includes(href) || (currentPath === '/' && href === 'index.html')) {
        link.classList.add('active');
      }
    }
  });
}

/* ==========================================
   7. MULTI-LINGUAL TRANSLATION SWAP ENGINE
   ========================================== */
export function initLanguageSwitcher() {
  const navLinks = document.getElementById('nav-links');
  if (!navLinks) return;

  // Insert dropdown list item dynamically in navigation list
  const li = document.createElement('li');
  li.className = 'nav-lang-item';
  li.innerHTML = `
    <div class="lang-selector-dropdown" id="lang-selector-container">
      <button id="lang-dropdown-btn" class="lang-btn" aria-label="Select Language">
        <span id="active-lang-flag">🇬🇧</span>
        <span id="active-lang-text">EN</span>
        <svg class="dropdown-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="12" height="12" style="display:inline-block; vertical-align:middle; stroke:currentColor; margin-left: 4px;"><path d="M6 9l6 6 6-6"/></svg>
      </button>
      <ul class="lang-dropdown-menu" id="lang-dropdown-menu">
        <li><button class="lang-menu-opt" data-lang="en">🇬🇧 English (UK)</button></li>
        <li><button class="lang-menu-opt" data-lang="tl">🇵🇭 Tagalog</button></li>
        <li><button class="lang-menu-opt" data-lang="th">🇹🇭 ไทย (Thai)</button></li>
        <li><button class="lang-menu-opt" data-lang="zh">🇨🇳 中文 (Chinese)</button></li>
        <li><button class="lang-menu-opt" data-lang="tr">🇹🇷 Türkçe (Turkish)</button></li>
      </ul>
    </div>
  `;

  const darkModeItem = navLinks.querySelector('.nav-dark-mode-item');
  if (darkModeItem) {
    navLinks.insertBefore(li, darkModeItem);
  } else {
    navLinks.appendChild(li);
  }

  const dropdownBtn = document.getElementById('lang-dropdown-btn');
  const dropdownMenu = document.getElementById('lang-dropdown-menu');
  const dropdownContainer = document.getElementById('lang-selector-container');

  if (!dropdownBtn || !dropdownMenu || !dropdownContainer) return;

  // Toggle Dropdown menu visibility
  dropdownBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle('show');
    dropdownContainer.classList.toggle('open');
  });

  // Close dropdown on click outside
  document.addEventListener('click', (e) => {
    if (!dropdownContainer.contains(e.target)) {
      dropdownMenu.classList.remove('show');
      dropdownContainer.classList.remove('open');
    }
  });

  // Set selected language from localStorage or default 'en'
  const supportedLangs = ['en', 'tl', 'th', 'zh', 'tr'];
  let currentLang = localStorage.getItem('lang') || 'en';
  if (!supportedLangs.includes(currentLang)) {
    currentLang = 'en';
  }
  setLanguage(currentLang);

  // Bind clicks for selection options
  const options = dropdownMenu.querySelectorAll('.lang-menu-opt');
  options.forEach(opt => {
    opt.addEventListener('click', (e) => {
      e.stopPropagation();
      const selectedLang = opt.getAttribute('data-lang');
      setLanguage(selectedLang);
      dropdownMenu.classList.remove('show');
      dropdownContainer.classList.remove('open');
      
      const flagMap = { en: '🇬🇧', tl: '🇵🇭', th: '🇹🇭', zh: '🇨🇳', tr: '🇹🇷' };
      const labelMap = { en: 'English (UK)', tl: 'Tagalog', th: 'Thai', zh: 'Chinese', tr: 'Turkish' };
      showToast('Language Updated', `${flagMap[selectedLang]} Interface localized in ${labelMap[selectedLang]}.`);
    });
  });
}

export function setLanguage(lang) {
  const supportedLangs = ['en', 'tl', 'th', 'zh', 'tr'];
  if (!supportedLangs.includes(lang)) {
    lang = 'en';
  }
  localStorage.setItem('lang', lang);

  // Update navbar drop-down state (labels/flags)
  const activeFlag = document.getElementById('active-lang-flag');
  const activeText = document.getElementById('active-lang-text');

  const flagMap = { en: '🇬🇧', tl: '🇵🇭', th: '🇹🇭', zh: '🇨🇳', tr: '🇹🇷' };
  const textMap = { en: 'EN', tl: 'TL', th: 'TH', zh: 'ZH', tr: 'TR' };

  if (activeFlag) activeFlag.textContent = flagMap[lang] || '🇬🇧';
  if (activeText) activeText.textContent = textMap[lang] || 'EN';

  // Force LTR layout as Arabic (RTL) is removed
  document.documentElement.dir = 'ltr';
  document.documentElement.classList.remove('lang-ar');

  // Execute DOM element recursive translation
  translateDOM(lang);
}

export function translateDOM(lang) {
  // Translate Text Nodes
  const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  let node;
  while (node = walk.nextNode()) {
    const parent = node.parentElement;
    if (!parent) continue;
    const parentTag = parent.tagName.toLowerCase();
    
    // Skip scripts, styles, inside SVGs to protect core attributes and complex tags
    if (parentTag === 'script' || 
        parentTag === 'style' || 
        parentTag === 'svg' || 
        parentTag === 'path' || 
        parentTag === 'circle' || 
        parentTag === 'line' ||
        parentTag === 'rect' ||
        parentTag === 'g' ||
        parentTag === 'defs' ||
        parentTag === 'use' ||
        parentTag === 'ellipse' ||
        parent.closest('svg')) {
      continue;
    }

    const value = node.nodeValue;
    if (!value || !value.trim()) continue;

    if (node._originalText === undefined) {
      node._originalText = value;
    }

    const trimmedOriginal = node._originalText.trim();
    if (lang === 'en') {
      node.nodeValue = node._originalText;
    } else {
      const entry = TRANSLATIONS[trimmedOriginal];
      if (entry && entry[lang]) {
        const leadingWS = node._originalText.match(/^\s*/)[0];
        const trailingWS = node._originalText.match(/\s*$/)[0];
        node.nodeValue = leadingWS + entry[lang] + trailingWS;
      }
    }
  }

  // Translate placeholders on inputs and textareas
  const inputs = document.querySelectorAll('input[placeholder], textarea[placeholder]');
  inputs.forEach(input => {
    if (input._originalPlaceholder === undefined) {
      input._originalPlaceholder = input.getAttribute('placeholder') || '';
    }
    const trimmedOriginal = input._originalPlaceholder.trim();
    if (lang === 'en') {
      input.setAttribute('placeholder', input._originalPlaceholder);
    } else {
      const entry = TRANSLATIONS[trimmedOriginal];
      if (entry && entry[lang]) {
        input.setAttribute('placeholder', entry[lang]);
      }
    }
  });

  // Translate Buttons or Submit controls with values
  const submitBtns = document.querySelectorAll('input[type="submit"], input[type="button"]');
  submitBtns.forEach(btn => {
    if (btn._originalValue === undefined) {
      btn._originalValue = btn.value || '';
    }
    const trimmedOriginal = btn._originalValue.trim();
    if (lang === 'en') {
      btn.value = btn._originalValue;
    } else {
      const entry = TRANSLATIONS[trimmedOriginal];
      if (entry && entry[lang]) {
        btn.value = entry[lang];
      }
    }
  });
}
