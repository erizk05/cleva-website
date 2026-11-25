function initMain() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

// START: Handle Hamburger toggle

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const lines = hamburger.querySelectorAll('span');
      if (navLinks.classList.contains('open')) {
        lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        lines[1].style.opacity = '0';
        lines[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        lines[0].style.transform = 'none';
        lines[1].style.opacity = '1';
        lines[2].style.transform = 'none';
      }
    });
  }

// END: Handle Hamburger toggle

// START: BYD-style Portfolio Mega Menu & Mobile Submenu Accordions

  const MODEL_THUMBNAILS = {
    'etrike-toda': './assets/images/etrike-toda.jpg',
    'etrike-tt': './assets/images/tuk-tuk-side.jpg',
    'ev4-compact': './assets/images/comp2-4.jpg',
    'bevdeluxe': './assets/images/comp4-4.jpg',
    'ev4-family': './assets/images/bev-family-front.jpg',
    'bev-weekender': './assets/images/bev-weekender-front.jpg',
    'bev-sporty': './assets/images/bev-sporty-side.jpg',
    'eshuttle': './assets/images/bev-eshuttle-side.jpg',
    'commercial-4pax-cargo': './assets/images/4ev-comcargo-front.jpg',
    'bev-utility': './assets/images/bev-utility-scap-side.jpg',
    'ev4-pax': './assets/images/bev-utility-dcap-side.jpg',
    'ev4-pwd': './assets/images/bev-pwd.jpg'
  };

  function getModelIdFromHref(href) {
    if (!href) return '';
    const match = href.match(/[?&]id=([^&]+)/i);
    return match ? decodeURIComponent(match[1]) : '';
  }

  function extractCleanLabel(anchor) {
    if (!anchor) return '';
    const clone = anchor.cloneNode(true);
    clone.querySelectorAll('svg, .menu-badge-cs, .mobile-model-thumb').forEach(el => el.remove());
    return clone.textContent.replace(/\s+/g, ' ').trim();
  }

  function buildPortfolioMegaMenu(dropdown, submenu) {
    if (dropdown.querySelector('.byd-mega-menu')) return;

    const categoryItems = Array.from(submenu.querySelectorAll(':scope > .submenu-item-dropdown'));
    if (categoryItems.length === 0) return;

    const categories = categoryItems.map((item, idx) => {
      const catAnchor = item.querySelector(':scope > a.submenu-link');
      const subSub = item.querySelector(':scope > .sub-submenu');
      if (!catAnchor || !subSub) return null;

      const href = catAnchor.getAttribute('href') || '';
      const catMatch = href.match(/[?&]category=([^&]+)/i);
      const catKey = catMatch ? catMatch[1].toLowerCase() : `cat-${idx}`;
      const title = extractCleanLabel(catAnchor);
      const isDisabled = catAnchor.classList.contains('menu-link-disabled');
      const catBadge = catAnchor.querySelector('.menu-badge-cs');
      const badgeText = catBadge ? catBadge.textContent.trim() : '';

      const modelLinks = Array.from(subSub.querySelectorAll(':scope > a.submenu-link:not(.mobile-cat-overview)'));
      const models = modelLinks.map(link => {
        const mHref = link.getAttribute('href') || '#';
        const id = getModelIdFromHref(mHref);
        const name = extractCleanLabel(link);
        const mDisabled = link.classList.contains('menu-link-disabled');
        const mBadge = link.querySelector('.menu-badge-cs');
        const thumb = MODEL_THUMBNAILS[id] || '';

        // Also enhance mobile accordion model links with crisp thumbnail alongside name
        if (thumb && !link.querySelector('.mobile-model-thumb')) {
          const mobileThumb = document.createElement('img');
          mobileThumb.src = thumb;
          mobileThumb.alt = '';
          mobileThumb.setAttribute('aria-hidden', 'true');
          mobileThumb.className = 'mobile-model-thumb';
          mobileThumb.loading = 'lazy';
          link.insertBefore(mobileThumb, link.firstChild);
        }

        return {
          id,
          name,
          href: mHref,
          isDisabled: mDisabled,
          badgeText: mBadge ? mBadge.textContent.trim() : '',
          thumb
        };
      });

      return {
        catKey,
        title,
        href,
        isDisabled,
        badgeText,
        models
      };
    }).filter(Boolean);

    if (categories.length === 0) return;

    dropdown.classList.add('portfolio-dropdown', 'has-byd-menu');

    const urlParams = new URLSearchParams(window.location.search);
    const activeUrlCat = (urlParams.get('category') || '').toLowerCase();
    const activeUrlId = urlParams.get('id') || '';

    let defaultIndex = 0;
    if (activeUrlCat) {
      const idx = categories.findIndex(c => c.catKey === activeUrlCat);
      if (idx >= 0) defaultIndex = idx;
    } else if (activeUrlId) {
      const idx = categories.findIndex(c => c.models.some(m => m.id === activeUrlId));
      if (idx >= 0) defaultIndex = idx;
    }

    const megaMenu = document.createElement('div');
    megaMenu.className = 'byd-mega-menu';
    megaMenu.setAttribute('role', 'region');
    megaMenu.setAttribute('aria-label', 'C.L.E.V.A. Portfolio Models');

    const megaInner = document.createElement('div');
    megaInner.className = 'byd-mega-inner';

    const sidebar = document.createElement('div');
    sidebar.className = 'byd-mega-sidebar';

    const sidebarTop = document.createElement('div');
    sidebarTop.className = 'byd-sidebar-top';

    const eyebrow = document.createElement('div');
    eyebrow.className = 'byd-sidebar-eyebrow';
    eyebrow.textContent = 'C.L.E.V.A. LINEUP';
    sidebarTop.appendChild(eyebrow);

    const catList = document.createElement('div');
    catList.className = 'byd-cat-list';
    catList.setAttribute('role', 'tablist');

    const contentArea = document.createElement('div');
    contentArea.className = 'byd-mega-content';

    function renderCategoryPanel(catIndex) {
      const cat = categories[catIndex];
      if (!cat) return;

      catList.querySelectorAll('.byd-cat-btn').forEach((btn, idx) => {
        const isActive = idx === catIndex;
        btn.classList.toggle('is-active', isActive);
        btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      contentArea.innerHTML = '';

      const header = document.createElement('div');
      header.className = 'byd-mega-header';

      const headingGroup = document.createElement('div');
      headingGroup.className = 'byd-mega-heading-group';

      const heading = document.createElement('h3');
      heading.className = 'byd-mega-title';
      heading.textContent = cat.title;
      headingGroup.appendChild(heading);

      const subtitle = document.createElement('span');
      subtitle.className = 'byd-mega-subtitle';
      subtitle.textContent = cat.isDisabled
        ? 'In Development — Upcoming Division'
        : `${cat.models.length} Electric ${cat.models.length === 1 ? 'Model' : 'Models'} Available`;
      headingGroup.appendChild(subtitle);

      header.appendChild(headingGroup);

      if (!cat.isDisabled && cat.href && cat.href !== '#') {
        const viewAll = document.createElement('a');
        viewAll.href = cat.href;
        viewAll.className = 'byd-view-cat-link';
        viewAll.innerHTML = `View All ${cat.title} <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`;
        header.appendChild(viewAll);
      }

      contentArea.appendChild(header);

      const grid = document.createElement('div');
      grid.className = 'byd-mega-grid';

      cat.models.forEach(model => {
        const card = document.createElement(model.isDisabled ? 'div' : 'a');
        card.className = 'byd-model-card';
        if (model.isDisabled) {
          card.classList.add('is-disabled');
          card.setAttribute('aria-disabled', 'true');
        } else {
          card.href = model.href;
          if (activeUrlId && model.id === activeUrlId) {
            card.classList.add('is-current-model');
          }
        }

        const thumbWrap = document.createElement('div');
        thumbWrap.className = 'byd-model-thumb-wrap';

        if (model.thumb) {
          const img = document.createElement('img');
          img.src = model.thumb;
          img.alt = model.name;
          img.className = 'byd-model-thumb';
          img.loading = 'lazy';
          thumbWrap.appendChild(img);
        } else {
          thumbWrap.innerHTML = `
            <svg class="byd-model-svg" width="76" height="54" viewBox="0 0 80 56" fill="none" stroke="#64748b" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M12 36h44l10-14H46L38 36"/>
              <path d="M12 36V18h20l6 18"/>
              <circle cx="22" cy="41" r="6"/>
              <circle cx="56" cy="41" r="6"/>
              <path d="M28 41h22"/>
            </svg>
          `;
        }

        const nameEl = document.createElement('span');
        nameEl.className = 'byd-model-name';
        nameEl.textContent = model.name;

        card.appendChild(thumbWrap);
        card.appendChild(nameEl);

        if (model.isDisabled && model.badgeText) {
          const statusEl = document.createElement('span');
          statusEl.className = 'byd-model-status';
          statusEl.textContent = model.badgeText;
          card.appendChild(statusEl);
        }

        grid.appendChild(card);
      });

      contentArea.appendChild(grid);
    }

    categories.forEach((cat, idx) => {
      const hasValidHref = !cat.isDisabled && cat.href && cat.href !== '#' && !cat.href.startsWith('javascript');
      const btn = document.createElement(hasValidHref ? 'a' : 'button');
      if (hasValidHref) {
        btn.href = cat.href;
      } else {
        btn.type = 'button';
        if (cat.isDisabled) {
          btn.setAttribute('aria-disabled', 'true');
        }
      }
      btn.className = 'byd-cat-btn' + (cat.isDisabled ? ' is-disabled' : '');
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', idx === defaultIndex ? 'true' : 'false');

      const labelSpan = document.createElement('span');
      labelSpan.className = 'byd-cat-label';
      labelSpan.textContent = cat.title;

      const metaSpan = document.createElement('span');
      metaSpan.className = 'byd-cat-count';
      metaSpan.textContent = cat.isDisabled ? (cat.badgeText || 'Soon') : `${cat.models.length}`;

      btn.appendChild(labelSpan);
      btn.appendChild(metaSpan);

      btn.addEventListener('mouseenter', () => renderCategoryPanel(idx));
      btn.addEventListener('focus', () => renderCategoryPanel(idx));
      if (!hasValidHref) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          renderCategoryPanel(idx);
        });
      }

      catList.appendChild(btn);
    });

    sidebarTop.appendChild(catList);
    sidebar.appendChild(sidebarTop);

    const sidebarFooter = document.createElement('div');
    sidebarFooter.className = 'byd-sidebar-footer';
    const browseAll = document.createElement('a');
    browseAll.href = './vehicles.html';
    browseAll.className = 'byd-browse-all';
    browseAll.innerHTML = `<span>Explore All Models</span><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`;
    sidebarFooter.appendChild(browseAll);
    sidebar.appendChild(sidebarFooter);

    megaInner.appendChild(sidebar);
    megaInner.appendChild(contentArea);
    megaMenu.appendChild(megaInner);
    dropdown.appendChild(megaMenu);

    renderCategoryPanel(defaultIndex);

    dropdown.addEventListener('mouseleave', () => {
      dropdown.classList.remove('mega-closed');
    });

    document.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape' && dropdown.matches(':hover, :focus-within')) {
        dropdown.classList.add('mega-closed');
        if (document.activeElement && dropdown.contains(document.activeElement)) {
          document.activeElement.blur();
        }
      }
    });
  }

  const dropdownItems = document.querySelectorAll('.nav-item-dropdown');
  dropdownItems.forEach(dropdown => {
    const parentLink = dropdown.querySelector(':scope > .nav-link');
    const submenu = dropdown.querySelector(':scope > .submenu');

    if (parentLink && submenu) {
      // Build BYD-style desktop mega-menu & mobile thumbnails for C.L.E.V.A. PORTFOLIO
      if (parentLink.textContent.includes('PORTFOLIO')) {
        buildPortfolioMegaMenu(dropdown, submenu);
      }

      // Add a chevron indicator to parentLink if not already present
      if (!parentLink.querySelector('.mobile-chevron')) {
        const chevron = document.createElement('span');
        chevron.className = 'mobile-chevron';
        chevron.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`;
        parentLink.appendChild(chevron);
      }

      // Prepend an "All Vehicles / Portfolio Overview" link if this is the C.L.E.V.A. PORTFOLIO menu
      if (parentLink.textContent.includes('PORTFOLIO') && !submenu.querySelector('.mobile-all-portfolio-link')) {
        const allLink = document.createElement('a');
        allLink.href = './vehicles.html';
        allLink.className = 'submenu-link mobile-all-portfolio-link';
        allLink.innerHTML = `<span style="font-weight: 800; color: var(--clr-primary, #047857); display: flex; align-items: center; gap: 0.4rem;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg> BROWSE ALL VEHICLES</span>`;
        submenu.insertBefore(allLink, submenu.firstChild);
      }

      parentLink.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
          e.preventDefault();
          const isOpen = dropdown.classList.contains('mobile-open');
          // Close other top-level dropdowns
          dropdownItems.forEach(d => {
            if (d !== dropdown) d.classList.remove('mobile-open');
          });
          dropdown.classList.toggle('mobile-open', !isOpen);
        }
      });
    }

    // Handle nested sub-submenus (e.g. EV3, EV4, Commercial)
    const subDropdowns = dropdown.querySelectorAll('.submenu-item-dropdown');
    subDropdowns.forEach(subItem => {
      const subLink = subItem.querySelector(':scope > .submenu-link');
      const subSubmenu = subItem.querySelector(':scope > .sub-submenu');

      if (subLink && subSubmenu) {
        // Add a "View All [Category]" link inside subSubmenu if it has an href and not yet present
        const catHref = subLink.getAttribute('href');
        if (catHref && catHref !== '#' && !catHref.startsWith('javascript') && !subSubmenu.querySelector('.mobile-cat-overview')) {
          const catOverview = document.createElement('a');
          catOverview.href = catHref;
          catOverview.className = 'submenu-link mobile-cat-overview';
          const catName = extractCleanLabel(subLink);
          catOverview.innerHTML = `<span style="font-weight: 700; color: var(--clr-primary, #047857);">→ View All ${catName}</span>`;
          subSubmenu.insertBefore(catOverview, subSubmenu.firstChild);
        }

        subLink.addEventListener('click', (e) => {
          if (window.innerWidth <= 1024) {
            if (subLink.classList.contains('menu-link-disabled')) {
              e.preventDefault();
              return;
            }
            e.preventDefault();
            const isSubOpen = subItem.classList.contains('mobile-open');
            subItem.classList.toggle('mobile-open', !isSubOpen);
          }
        });
      }
    });
  });

  // Automatically close mobile menu when clicking any terminal link (not a toggle header)
  document.querySelectorAll('.nav-links a:not(.menu-link-disabled)').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 1024) {
        const isParentDropdown = link.parentElement && link.parentElement.classList.contains('nav-item-dropdown') && link.classList.contains('nav-link');
        const isSubDropdown = link.parentElement && link.parentElement.classList.contains('submenu-item-dropdown') && link.nextElementSibling && link.nextElementSibling.classList.contains('sub-submenu');
        
        if (!isParentDropdown && !isSubDropdown) {
          if (navLinks) navLinks.classList.remove('open');
          if (hamburger) {
            const lines = hamburger.querySelectorAll('span');
            if (lines.length >= 3) {
              lines[0].style.transform = 'none';
              lines[1].style.opacity = '1';
              lines[2].style.transform = 'none';
            }
          }
        }
      }
    });
  });

// END: Mobile Navigation Submenu Accordions

// START: Set active nav link based on current page

  const currentPath = window.location.pathname;
  const links = document.querySelectorAll('.nav-link, .submenu-link');
  links.forEach(link => {
    const href = link.getAttribute('href');
    const normalizedHref = href.replace(/^\.\//, '/'); // normalize ./ to /
    const isMatch = currentPath.endsWith(normalizedHref) || 
                   (currentPath.endsWith('/') && normalizedHref === '/index.html') ||
                   (currentPath === normalizedHref);
    if (isMatch) {
      link.classList.add('active');
      const dropdown = link.closest('.nav-item-dropdown');
      if (dropdown) {
        const parentLink = dropdown.querySelector('.nav-link');
        if (parentLink) parentLink.classList.add('active');
      }
    } else {
      link.classList.remove('active');
    }
  });

// END: Set active nav link based on current page

// START: Accordion Logic

  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');

// END: Accordion Logic

// START: Close all accordions

      document.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('active');
        i.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
      });

// END: Close all accordions

// START: Toggle current

      if (!isActive) {
        item.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });

// END: Toggle current

// START: Inject WhatsApp Floating Button (Top)

  const waButton = document.createElement('a');
  waButton.href = 'https://wa.me/66905490134';
  waButton.target = '_blank';
  waButton.rel = 'noopener noreferrer';
  waButton.className = 'chat-support-btn';
  waButton.setAttribute('aria-label', 'Chat with us on WhatsApp (+66-905-490134)');
  waButton.setAttribute('title', 'Chat with us on WhatsApp (+66-905-490134)');
  waButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
    </svg>
  `;
  document.body.appendChild(waButton);

// END: Inject WhatsApp Floating Button

// START: Inject Viber Floating Button (Middle)

  const vbButton = document.createElement('a');
  vbButton.href = 'viber://chat?number=%2B66905490134';
  vbButton.target = '_blank';
  vbButton.rel = 'noopener noreferrer';
  vbButton.className = 'viber-support-btn';
  vbButton.setAttribute('aria-label', 'Chat with us on Viber (+66-905-490134)');
  vbButton.setAttribute('title', 'Chat with us on Viber (+66-905-490134)');
  vbButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.38 3.59C17.7 2.2 15.3 1.5 12 1.5c-3.3 0-5.7.7-7.38 2.09C2.9 4.98 2 7.02 2 9.77c0 2.26.65 4.14 1.88 5.48.24.26.46.49.52.79.08.41-.09 1.15-.36 1.95-.23.69-.53 1.34-.84 1.86a.5.5 0 0 0 .56.73c1.64-.32 3.1-.96 4.09-1.55.33-.2.62-.26.98-.19.74.14 1.76.22 3.17.22 3.3 0 5.7-.7 7.38-2.09C21.1 14.82 22 12.78 22 10.03c0-2.75-.9-4.79-2.62-6.44zM16.9 14.47c-.24.36-.67.57-1.13.53-.94-.09-2.52-.77-4.14-2.39-1.5-1.5-2.17-2.97-2.28-3.86-.06-.46.12-.91.46-1.18l.8-.64c.3-.24.73-.24 1.02.01l1.17 1.01c.32.28.36.76.09 1.08l-.44.52c-.08.1-.1.24-.04.36.33.64.91 1.25 1.62 1.7.12.08.27.08.38-.01l.54-.45c.31-.26.77-.24 1.06.06l1.08 1.1c.3.3.3.76-.01 1.08l-.16.08z"/>
    </svg>
  `;
  document.body.appendChild(vbButton);

// END: Inject Viber Floating Button

// START: Inject WeChat Floating Button (Bottom)

  const wcButton = document.createElement('a');
  wcButton.href = '#'; 
  wcButton.className = 'wechat-support-btn';
  wcButton.setAttribute('aria-label', 'Chat with us on WeChat (+66-905-490134)');
  wcButton.setAttribute('title', 'Chat with us on WeChat (+66-905-490134)');
  wcButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M9 13c-3.3 0-6-2.2-6-5s2.7-5 6-5 6 2.2 6 5-2.7 5-6 5Z"/>
      <path d="M15 13c0 2.2-2.2 4-5 4-1.2 0-2.3-.4-3.2-1L3 18l1.3-3.2A4.9 4.9 0 0 1 3 13"/>
      <path d="M16 19c2.8 0 5-1.8 5-4s-2.2-4-5-4-5 1.8-5 4 2.2 4 5 4Z"/>
      <path d="M14 18l-1 2.5L16 19"/>
    </svg>
  `;
  // Intercept click to show modal
  wcButton.addEventListener('click', (e) => {
    e.preventDefault();
    let modalOverlay = document.getElementById('wechat-qr-modal');
    
    if (!modalOverlay) {
      modalOverlay = document.createElement('div');
      modalOverlay.id = 'wechat-qr-modal';
      modalOverlay.className = 'wechat-modal-overlay';
      modalOverlay.innerHTML = `
        <div class="wechat-modal-content">
          <button class="wechat-modal-close" aria-label="Close modal">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
          <img src="/assets/images/wechat-qr.png" alt="WeChat QR Code" class="wechat-modal-qr">
          <h3 class="wechat-modal-title">C.L.E.V.A</h3>
          <p style="font-weight: 700; color: #07c160; margin: 0.25rem 0 0.5rem; font-family: var(--font-mono, monospace); font-size: 1.05rem;">+66-905-490134</p>
          <p class="wechat-modal-text">Scan the QR code or search +66-905-490134 to add us on WeChat</p>
        </div>
      `;
      document.body.appendChild(modalOverlay);

      const closeBtn = modalOverlay.querySelector('.wechat-modal-close');
      
      const closeModal = () => {
        modalOverlay.classList.remove('active');
      };

      closeBtn.addEventListener('click', closeModal);
      modalOverlay.addEventListener('click', (ev) => {
        if (ev.target === modalOverlay) closeModal();
      });
      document.addEventListener('keydown', (ev) => {
        if (ev.key === 'Escape' && modalOverlay.classList.contains('active')) {
          closeModal();
        }
      });
    }

    // Small timeout to allow transition to run
    setTimeout(() => {
      modalOverlay.classList.add('active');
    }, 10);
  });
  document.body.appendChild(wcButton);

// END: Inject WeChat Floating Button


// START: Inject Back to Top Button
  const backToTopBtn = document.createElement('button');
  backToTopBtn.className = 'back-to-top-btn';
  backToTopBtn.setAttribute('aria-label', 'Back to top');
  backToTopBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m18 15-6-6-6 6"/>
    </svg>
  `;
  document.body.appendChild(backToTopBtn);

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
// END: Inject Back to Top Button
// START: Handle Contact Form Submission

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const fname = document.getElementById('fname') ? document.getElementById('fname').value : '';
      const lname = document.getElementById('lname') ? document.getElementById('lname').value : '';
      const email = document.getElementById('email') ? document.getElementById('email').value : '';
      const location = document.getElementById('location') ? document.getElementById('location').value : '';
      const company = document.getElementById('company') ? document.getElementById('company').value : '';
      
      // Collect selected vehicle models
      const checkedBoxes = Array.from(document.querySelectorAll('.vehicle-checkbox:checked'))
        .map(cb => cb.getAttribute('data-label') || cb.value);
      
      let interest = 'General Inquiry';
      if (checkedBoxes.length > 0) {
        interest = checkedBoxes.join(', ');
      } else {
        const interestSelect = document.getElementById('interest');
        if (interestSelect) {
          const selected = Array.from(interestSelect.selectedOptions)
            .map(opt => opt.text.trim())
            .filter(t => t.length > 0);
          if (selected.length > 0) {
            interest = selected.join(', ');
          }
        }
      }
      
      const message = document.getElementById('message') ? document.getElementById('message').value : '';
      
      const subject = encodeURIComponent(`CLEVA Inquiry: ${interest} - ${company}`);
      const body = encodeURIComponent(`Name: ${fname} ${lname}\nEmail: ${email}\nLocation: ${location}\nCompany: ${company}\nVehicle(s) of Interest: ${interest}\n\nMessage:\n${message}`);
      
      window.location.href = `mailto:Info@clevasolutions.com?subject=${subject}&body=${body}`;
    });
  }

// END: Handle Contact Form Submission

// START: Handle Scroll shadow and WhatsApp button transparency

  let scrollTimeout;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Show back-to-top button
    if (window.scrollY > 400) {
      if (typeof backToTopBtn !== 'undefined' && backToTopBtn) {
        backToTopBtn.classList.add('visible');
      }
    } else {
      if (typeof backToTopBtn !== 'undefined' && backToTopBtn) {
        backToTopBtn.classList.remove('visible');
      }
    }
    // Floating buttons transparency while scrolling over text/images
    const floatingButtons = [waButton, vbButton, wcButton, backToTopBtn].filter(Boolean);
    floatingButtons.forEach(btn => {
      const rect = btn.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      
      if (document.elementsFromPoint) {
        // Temporarily hide the buttons visually so elementsFromPoint doesn't hit them
        floatingButtons.forEach(b => b.style.visibility = 'hidden');
        const elementsUnder = document.elementsFromPoint(x, y);
        floatingButtons.forEach(b => b.style.visibility = 'visible');

        let isOverContent = false;
        
        for (const el of elementsUnder) {
          const tag = el.tagName.toLowerCase();
          const textTags = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'a', 'li', 'td', 'th', 'label', 'strong'];
          const visualTags = ['img', 'picture', 'svg', 'canvas', 'video'];
          
          if (visualTags.includes(tag)) {
            isOverContent = true;
            break;
          } else if (textTags.includes(tag) && el.textContent.trim().length > 0) {
            isOverContent = true;
            break;
          }
        }
        
        if (isOverContent) {
          btn.style.opacity = '0.15';
        } else {
          btn.style.opacity = '0.6';
        }
      } else {
        // Fallback: just lower opacity while scrolling unconditionally
        btn.style.opacity = '0.15';
      }
    });

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      floatingButtons.forEach(btn => btn.style.opacity = '0.6');
    }, 400);
  }, { passive: true });

// START: Scroll Reveal Observer
  const revealOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  window.revealObserver = revealObserver;
  document.querySelectorAll('.scroll-reveal').forEach(el => {
    revealObserver.observe(el);
  });
// END: Scroll Reveal Observer
}

// END: Handle Scroll shadow and WhatsApp button transparency

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMain);
} else {
  initMain();
}
