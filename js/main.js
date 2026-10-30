// START FILE: main.js
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
      
      const fname = document.getElementById('fname').value;
      const lname = document.getElementById('lname').value;
      const email = document.getElementById('email').value;
      const company = document.getElementById('company').value;
      const interest = document.getElementById('interest').options[document.getElementById('interest').selectedIndex].text;
      const message = document.getElementById('message').value;
      
      const subject = encodeURIComponent(`CLEVA Inquiry: ${interest} - ${company}`);
      const body = encodeURIComponent(`Name: ${fname} ${lname}\nEmail: ${email}\nCompany: ${company}\nVehicle(s) of Interest: ${interest}\n\nSubject / Details:\n${message}`);
      
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
// END FILE: main.js

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMain);
} else {
  initMain();
}
