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
