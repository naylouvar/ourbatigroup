/* ==========================================================
   OURBATI GROUP — scripts du site vitrine
   ========================================================== */

// Configuration : adresse qui reçoit les demandes du formulaire de contact.
// Laisser vide pour rediriger vers le formulaire de contact WHMCS.
const CONFIG = {
  whmcsUrl: 'https://www.ourbatigroup.com/members',
  contactEmail: 'sales@ourbatigroup.com'
};

(function () {
  'use strict';

  // ---- En-tête : fond au défilement ----
  const header = document.querySelector('.header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 20);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // ---- Menu mobile ----
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('nav');
  const setMenu = (open) => {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  };
  toggle.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  // ---- Lien actif selon la section visible ----
  const links = [...document.querySelectorAll('.nav__list a[href^="#"]')];
  const sections = links.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => spy.observe(s));

    // ---- Apparition progressive ----
    const reveal = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach((el) => reveal.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
  }

  // ---- Années d'expérience et année du copyright ----
  const year = new Date().getFullYear();
  document.querySelectorAll('[data-count-since]').forEach((el) => {
    el.textContent = String(year - Number(el.dataset.countSince));
  });
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(year);

  // ---- Nettoyage des recherches de domaine (retire http://, www., espaces) ----
  const cleanDomain = (value) => value.trim().toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/.*$/, '')
    .replace(/\s+/g, '');

  document.querySelectorAll('.domain-search').forEach((form) => {
    form.addEventListener('submit', () => {
      const input = form.querySelector('input[name="query"]');
      input.value = cleanDomain(input.value);
    });
  });

  // ---- Onglets Enregistrer / Transférer (WHMCS cart.php?a=add&domain=register|transfer) ----
  const modeInput = document.getElementById('domain-mode');
  const submitBtn = document.getElementById('domain-submit');
  document.querySelectorAll('.tabs__btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tabs__btn').forEach((b) => {
        b.classList.toggle('is-active', b === btn);
        b.setAttribute('aria-selected', String(b === btn));
      });
      const mode = btn.dataset.mode;
      modeInput.value = mode;
      submitBtn.textContent = mode === 'transfer' ? 'Transférer mon domaine' : 'Vérifier la disponibilité';
    });
  });

  // ---- Formulaire de contact ----
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(contactForm);
      if (CONFIG.contactEmail) {
        const subject = `[Site web] ${data.get('subject')} — ${data.get('name')}`;
        const body = `Nom : ${data.get('name')}\nE-mail : ${data.get('email')}\nSujet : ${data.get('subject')}\n\n${data.get('message')}`;
        window.location.href = `mailto:${CONFIG.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      } else {
        window.location.href = `${CONFIG.whmcsUrl}/contact.php`;
      }
    });
  }
})();
