// BOUY Traders website interactions
const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open menu');
    });
  });
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Add your verified Formspree endpoint here to receive enquiries by email.
const FORMSPREE_ENDPOINT = '';

const form = document.getElementById('contact-form');
const formNote = document.getElementById('form-note');

if (form) {
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    if (!FORMSPREE_ENDPOINT) {
      formNote.textContent = 'Thank you. The enquiry form is ready, but online delivery has not been connected yet. Please contact BOUY Traders directly until the company email endpoint is configured.';
      return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    formNote.textContent = '';

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      if (!response.ok) throw new Error('Unable to send enquiry');
      form.reset();
      formNote.textContent = 'Thank you! Your business enquiry has been sent.';
    } catch (error) {
      formNote.textContent = 'Sorry, your enquiry could not be sent. Please try again later.';
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = originalText;
    }
  });
}