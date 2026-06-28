document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  // Handle Scroll shadow
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

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
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => {
    const href = link.getAttribute('href');
    const normalizedHref = href.replace(/^\.\//, '/'); // normalize ./ to /
    const isMatch = currentPath.endsWith(normalizedHref) || 
                   (currentPath.endsWith('/') && normalizedHref === '/index.html') ||
                   (currentPath === normalizedHref);
    if (isMatch) {
      link.classList.add('active');
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
});
