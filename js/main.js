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

// START: Inject WhatsApp Floating Button

  const waButton = document.createElement('a');
  waButton.href = 'https://api.whatsapp.com/send?phone=639622705004';
  waButton.target = '_blank';
  waButton.rel = 'noopener noreferrer';
  waButton.className = 'chat-support-btn';
  waButton.setAttribute('aria-label', 'Chat with us on WhatsApp');
  waButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
    </svg>
  `;
  document.body.appendChild(waButton);

// END: Inject WhatsApp Floating Button

// START: Inject WeChat Floating Button

  const wcButton = document.createElement('a');
  // NOTE: WeChat doesn't have a direct "click to chat" URL link like WhatsApp.
  // We'll point to a generic contact URL or ID. We can just use the same or a placeholder
  // but let's use a placeholder or prompt the user with WeChat ID since we don't know it.
  // Actually, wechat links are typically 'weixin://dl/chat?...' which doesn't work well on all devices.
  // We will just create an alert for the WeChat ID, or maybe use href="weixin://"
  wcButton.href = 'weixin://'; 
  wcButton.target = '_blank';
  wcButton.rel = 'noopener noreferrer';
  wcButton.className = 'wechat-support-btn';
  wcButton.setAttribute('aria-label', 'Chat with us on WeChat');
  // WeChat icon path approximation
  wcButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
          <p class="wechat-modal-text">Scan the QR code to add us as friend to start chat</p>
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
      const body = encodeURIComponent(`Name: ${fname} ${lname}\nEmail: ${email}\nCompany: ${company}\nVehicle of Interest: ${interest}\n\nMessage:\n${message}`);
      
      window.location.href = `mailto:info@clevasolutions.com?subject=${subject}&body=${body}`;
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

    // Floating buttons transparency while scrolling over text/images
    const floatingButtons = [waButton, wcButton].filter(Boolean);
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
