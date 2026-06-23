/**
 * CLEVA Commercial EV - Contact Page Controller
 */
import './common.js';
import { showToast } from './common.js';

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
  initFaqAccordion();
});

/* ==========================================
   COLLAPSIBLE FAQ ACCORDION CONTROLLER
   ========================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content-pane');
    
    if (!trigger || !content) return;
    
    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      
      // Close other opened accordion items to avoid excessive shifting
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          const otherTrigger = otherItem.querySelector('.faq-trigger');
          const otherContent = otherItem.querySelector('.faq-content-pane');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          if (otherContent) otherContent.style.maxHeight = '0px';
        }
      });
      
      if (isOpen) {
        item.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = '0px';
      } else {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}

/* ==========================================
   CONTACT FORM & AJAX-LIKE SUCCESS TOAST
   ========================================== */
function initContactForm() {
  const form = document.getElementById('fleet-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Standard validation check
    const emailInput = document.getElementById('email');
    const nameInput = document.getElementById('fullName');
    
    if (!emailInput || !nameInput) return;
    
    const email = emailInput.value.trim();
    const name = nameInput.value.trim();
    if (!name || !email) return;

    // Simulate success feedback
    showToast('Inquiry Secured', `Thank you, ${name}. Our Enterprise Fleet division will respond within 4 business hours.`);
    form.reset();
  });
}
