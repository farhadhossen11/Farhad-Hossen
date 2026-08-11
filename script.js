/* Farhad Hossen — Portfolio */

// Current year in footer
const yearEl = document.getElementById('current-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
if (hamburger && nav) {
  hamburger.addEventListener('click', () => nav.classList.toggle('open'));
}

// Semester tabs
document.querySelectorAll('.semester-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const sem = tab.dataset.sem;
    tab.closest('.semester-tabs').querySelectorAll('.semester-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    document.querySelectorAll('.semester-panel').forEach(p => {
      p.classList.remove('active');
      p.style.display = 'none';
    });
    const panel = document.querySelector('.semester-panel[data-sem="' + sem + '"]');
    if (panel) { panel.classList.add('active'); panel.style.display = 'block'; }
  });
});

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

// Contact form (mailto fallback)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = contactForm.querySelector('input[name="name"]')?.value || '';
    const email = contactForm.querySelector('input[name="email"]')?.value || '';
    const message = contactForm.querySelector('textarea')?.value || '';
    const subject = encodeURIComponent('Portfolio Contact from ' + name);
    const body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
    window.location.href = 'mailto:farhadhossen11.mail@gmail.com?subject=' + subject + '&body=' + body;
    const status = contactForm.querySelector('.form-status');
    if (status) status.textContent = 'Opening your email client...';
  });
}
