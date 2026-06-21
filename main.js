// Navbar: scroll effect (only on homepage hero)
const navbar = document.getElementById('navbar');
if (navbar && !navbar.classList.contains('scrolled')) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// Menu tabs
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.menu-grid').forEach(g => g.classList.remove('active'));
    tab.classList.add('active');
    const target = document.getElementById('tab-' + tab.dataset.tab);
    if (target) target.classList.add('active');
  });
});

// Reservation form
const form    = document.getElementById('reservationForm');
const success = document.getElementById('formSuccess');
const dateInput = document.getElementById('date');

if (dateInput) {
  dateInput.min = new Date().toISOString().split('T')[0];
}

if (form && success) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    form.style.display = 'none';
    success.classList.add('show');
  });
}

// Scroll reveal
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.highlight-card, .menu-card, .gm-item, .insta-item, .contact-card, .acces-item, .resa-info-block, .split-img, .split-text'
).forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// Inject reveal CSS
const style = document.createElement('style');
style.textContent = `
  .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
  .reveal.visible { opacity: 1; transform: none; }
`;
document.head.appendChild(style);
