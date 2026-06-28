document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  // Handle Hamburger toggle
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

  // Set active nav link based on current page
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

  // Accordion Logic
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');

      // Close all accordions
      document.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('active');
        i.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
      });

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Inject WhatsApp Floating Button
  const waButton = document.createElement('a');
  waButton.href = 'https://api.whatsapp.com/send?phone=639622705004';
  waButton.target = '_blank';
  waButton.rel = 'noopener noreferrer';
  waButton.className = 'whatsapp-floating-btn';
  waButton.setAttribute('aria-label', 'Chat with us on WhatsApp');
  waButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
    </svg>
  `;
  document.body.appendChild(waButton);

  // Handle Contact Form Submission
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

  // Handle Scroll shadow and WhatsApp button transparency
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // WhatsApp button transparency while scrolling over text/images
    if (waButton) {
      const rect = waButton.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      
      if (document.elementsFromPoint) {
        // Temporarily hide the button visually if needed, but elementsFromPoint gives us everything
        // Just hide it so elementsFromPoint doesn't hit it first, or just filter it out. 
        // We filter it out in the loop. But wait! If pointer-events is NOT none, elementsFromPoint might still work fine since it returns all layers.
        // To be safe, some browsers might act weird, but elementsFromPoint returns an array from top to bottom.
        waButton.style.visibility = 'hidden'; 
        const elementsUnder = document.elementsFromPoint(x, y);
        waButton.style.visibility = 'visible';

        let isOverContent = false;
        
        for (const el of elementsUnder) {
          if (el === waButton || waButton.contains(el)) continue;
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
          waButton.style.opacity = '0.15';
        } else {
          waButton.style.opacity = '0.6';
        }
      } else {
        // Fallback: just lower opacity while scrolling unconditionally
        waButton.style.opacity = '0.15';
      }
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        waButton.style.opacity = '0.6';
      }, 400);
    }
  }, { passive: true });
});
