/**
 * Canal Ejecutivo & Inspírate Creator
 * Taller: Marca Profesional con IA - App Logic & Interactivity
 *
 * ─────────────────────────────────────────────────────────────
 *  ⚙️  CONFIGURACIÓN CENTRAL — edita solo esta sección
 * ─────────────────────────────────────────────────────────────
 */
const SITE_CONFIG = {
  // Número de WhatsApp del equipo (sin + ni espacios, incluir código de país)
  whatsappNumber: '51999999999',

  // Fecha objetivo del countdown (ISO 8601, hora Lima UTC-5)
  eventDate: '2026-10-18T09:00:00-05:00',

  // Tarifario oficial en Soles (PEN): S/ 99 individual, S/ 79 grupal (a partir de 2)
  tiers: {
    individual: {
      id: 'individual',
      name: 'Pase Individual (1 Persona)',
      price: 99,
      unitLabel: 'PEN · único pago',
      perks: '✓ Acceso total al taller 4 hrs + LinkedIn con IA + Portafolio Web en vivo + Certificado UNMSM + Coffee Break'
    },
    grupal: {
      id: 'grupal',
      name: 'Pase Grupal (A partir de 2 personas)',
      price: 79,
      unitLabel: 'PEN · por cada uno (mínimo 2 personas)',
      perks: '✓ Mismos beneficios completos para cada participante + Asientos contiguos en Coworking ASCE (¡Ahorran S/ 20 c/u!)'
    }
  }
};
/* ─────────────────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initSimulatorListeners();
  initMobileMenu();
  initScrollAnimations();
  initStickyHeader();
  initProgressBar();
});

/* ==========================================================================
   1. COUNTDOWN TIMER (Real-time urgent counter)
   ========================================================================== */
function initCountdown() {
  const targetDate = new Date(SITE_CONFIG.eventDate);

  function update() {
    const current = new Date();
    const diff = targetDate - current;

    if (diff <= 0) {
      const el = document.getElementById('heroCountdown');
      if (el) el.innerHTML = "<strong>¡Inscripciones abiertas ahora!</strong>";
      return;
    }

    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const pad = (n) => String(n).padStart(2, '0');

    const dEl = document.getElementById('cdDays');
    const hEl = document.getElementById('cdHours');
    const mEl = document.getElementById('cdMinutes');
    const sEl = document.getElementById('cdSeconds');

    if (dEl) dEl.textContent = pad(days);
    if (hEl) hEl.textContent = pad(hours);
    if (mEl) mEl.textContent = pad(minutes);
    if (sEl) sEl.textContent = pad(seconds);
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   2. HERO CARD MOCKUP TAB SWITCHER
   ========================================================================== */
function switchMockupTab(tabId) {
  // Tabs
  const allTabs = document.querySelectorAll('.mockup-tabs .m-tab');
  allTabs.forEach(t => t.classList.remove('active'));

  // Active clicked tab
  const activeTabBtn = document.querySelector(`.mockup-tabs .m-tab[data-tab="${tabId}"]`);
  if (activeTabBtn) activeTabBtn.classList.add('active');

  // Panels
  const allPanels = document.querySelectorAll('.mockup-content-panel');
  allPanels.forEach(p => p.classList.remove('active'));

  const targetPanel = document.getElementById(tabId);
  if (targetPanel) targetPanel.classList.add('active');
}

/* ==========================================================================
   3. INTERACTIVE SIMULATOR (Live-binding form to preview)
   ========================================================================== */
function initSimulatorListeners() {
  const nameInput = document.getElementById('simInputName');
  const roleInput = document.getElementById('simInputRole');
  const pillarInput = document.getElementById('simInputPillar');
  const metricInput = document.getElementById('simInputMetric');

  if (nameInput) {
    nameInput.addEventListener('input', (e) => {
      const val = e.target.value.trim() || "Tu Nombre Profesional";
      const nameEl = document.getElementById('simOutName');
      const brandEl = document.getElementById('simOutBrand');
      const urlEl = document.getElementById('previewUrlDisplay');

      if (nameEl) nameEl.textContent = val;
      
      // Initials
      const words = val.split(" ").filter(w => w.length > 0);
      let initials = "TN";
      if (words.length >= 2) {
        initials = (words[0][0] + words[1][0]).toUpperCase();
      } else if (words.length === 1) {
        initials = words[0].substring(0, 2).toUpperCase();
      }
      if (brandEl) brandEl.textContent = initials;

      // Clean slug for url
      const slug = val.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
      if (urlEl) urlEl.textContent = `https://${slug || 'tu-portafolio'}.dev`;
    });
  }

  if (roleInput) {
    roleInput.addEventListener('input', (e) => {
      const val = e.target.value.trim() || "Tu Cargo o Especialidad";
      const roleEl = document.getElementById('simOutRole');
      if (roleEl) roleEl.textContent = val;
    });
  }

  if (metricInput) {
    metricInput.addEventListener('input', (e) => {
      const val = e.target.value.trim() || "+80% de impacto cuantificable";
      const metricEl = document.getElementById('simOutMetric');
      if (metricEl) metricEl.textContent = val;
    });
  }

  if (pillarInput) {
    pillarInput.addEventListener('input', (e) => {
      const val = e.target.value.trim();
      const container = document.getElementById('simOutPills');
      if (!container) return;

      const items = val.split(',').map(s => s.trim()).filter(s => s.length > 0);
      container.innerHTML = '';
      if (items.length === 0) {
        container.innerHTML = '<span class="tag-pill">Especialidad</span>';
      } else {
        items.forEach(item => {
          const span = document.createElement('span');
          span.className = 'tag-pill';
          span.textContent = item;
          container.appendChild(span);
        });
      }
    });
  }
}

function setSimTheme(themeName) {
  const buttons = document.querySelectorAll('.theme-btn');
  buttons.forEach(b => b.classList.remove('active'));

  const activeBtn = document.querySelector(`.theme-btn[data-theme="${themeName}"]`);
  if (activeBtn) activeBtn.classList.add('active');

  const screen = document.getElementById('simScreen');
  if (screen) {
    screen.classList.remove('theme-indigo', 'theme-cyan', 'theme-gold');
    screen.classList.add(`theme-${themeName}`);
  }
}

/* ==========================================================================
   4. MONEDA OFICIAL (Soles PEN)
   ========================================================================== */
// Manejo exclusivo en Soles (PEN) conforme al tarifario oficial

/* ==========================================================================
   5. FAQ ACCORDION
   ========================================================================== */
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const answer = item.querySelector('.faq-answer');
  const isActive = item.classList.contains('active');

  // Close all others
  document.querySelectorAll('.faq-item').forEach(i => {
    i.classList.remove('active');
    const ans = i.querySelector('.faq-answer');
    if (ans) ans.style.maxHeight = null;
  });

  if (!isActive) {
    item.classList.add('active');
    answer.style.maxHeight = answer.scrollHeight + "px";
  }
}

/* ==========================================================================
   6. REGISTRATION MODAL & DIRECT WHATSAPP CHECKOUT
   ========================================================================== */
function openRegistrationModal(tierKey = 'grupal') {
  const modal = document.getElementById('regModal');
  const tierSelect = document.getElementById('formTierSelect');
  
  if (tierSelect) {
    const key = String(tierKey).toLowerCase();
    if (key.includes('ind') || key.includes('99') || key.includes('1')) {
      tierSelect.value = 'individual';
    } else {
      tierSelect.value = 'grupal';
    }
  }

  updateModalPriceDisplay();

  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeRegistrationModal() {
  const modal = document.getElementById('regModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Close on outside click
window.addEventListener('click', (e) => {
  const modal = document.getElementById('regModal');
  if (e.target === modal) {
    closeRegistrationModal();
  }
});

function updateModalPriceDisplay() {
  const tierSelect   = document.getElementById('formTierSelect');
  const priceDisplay = document.getElementById('modalSummaryPrice');
  const perksDisplay = document.getElementById('modalSummaryPerks');
  const modalTitle   = document.getElementById('modalPlanTitle');

  if (!tierSelect || !priceDisplay) return;

  const key = tierSelect.value || 'grupal';
  const tierData = SITE_CONFIG.tiers[key] || SITE_CONFIG.tiers.grupal;

  if (modalTitle) modalTitle.textContent = `Inscripción: ${tierData.name}`;
  priceDisplay.textContent = key === 'grupal' ? `S/ ${tierData.price} PEN c/u` : `S/ ${tierData.price} PEN`;
  if (perksDisplay) {
    perksDisplay.innerHTML = tierData.perks;
  }
}

function handleRegistrationSubmit(event) {
  event.preventDefault();

  const fullName = document.getElementById('formFullName').value.trim();
  const dni      = document.getElementById('formDni').value.trim();
  const phone    = document.getElementById('formPhone').value.trim();
  const email    = document.getElementById('formEmail').value.trim();
  const tierKey  = document.getElementById('formTierSelect').value;

  const tierData = SITE_CONFIG.tiers[tierKey] || SITE_CONFIG.tiers.grupal;
  const { whatsappNumber } = SITE_CONFIG;
  const priceText = tierKey === 'grupal' 
    ? `S/ 79 PEN por persona (tarifa grupal a partir de 2 personas)` 
    : `S/ 99 PEN (Pase individual)`;

  const message = `🏛️ *SOLICITUD DE INSCRIPCIÓN - TALLER MARCA CON IA*
*Canal Ejecutivo & Inspírate Creator (Respaldo UNMSM)*

👤 *Nombre:* ${fullName}
📄 *DNI/Doc:* ${dni}
📱 *WhatsApp:* ${phone}
✉️ *Correo:* ${email}
🎟️ *Tarifa:* ${tierData.name}
💰 *Inversión:* ${priceText}

_Hola, he completado mi ficha en la web oficial y deseo coordinar los datos de pago (Yape/Plin/Transferencia) para asegurar los cupos y la emisión de los certificados UNMSM._`;

  const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(waUrl, '_blank');
  closeRegistrationModal();
}

/* ==========================================================================
   7. MOBILE NAVIGATION TOGGLE
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-active');
    });

    // Close when clicking nav link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-active');
      });
    });
  }
}

/* ==========================================================================
   8. SCROLL-TRIGGERED ENTRANCE ANIMATIONS
   ========================================================================== */
function initScrollAnimations() {
  // Define which elements get which animation
  const animMap = [
    { selector: '.section-header',      cls: 'animate-up' },
    { selector: '.hero-badge',           cls: 'animate-up' },
    { selector: '.hero-title',           cls: 'animate-up delay-1' },
    { selector: '.hero-subtitle',        cls: 'animate-up delay-2' },
    { selector: '.event-meta-grid',      cls: 'animate-up delay-3' },
    { selector: '.hero-cta-group',       cls: 'animate-up delay-4' },
    { selector: '.hero-trust-row',       cls: 'animate-up delay-5' },
    { selector: '.hero-visual',          cls: 'animate-right' },
    { selector: '.dilemma-card.old-way', cls: 'animate-left' },
    { selector: '.dilemma-card.new-way', cls: 'animate-right' },
    { selector: '.j-step',               cls: 'animate-up' },
    { selector: '.timeline-card',        cls: 'animate-up' },
    { selector: '.deliv-card',           cls: 'animate-up' },
    { selector: '.speaker-card',         cls: 'animate-scale' },
    { selector: '.pricing-card',         cls: 'animate-scale' },
    { selector: '.faq-item',             cls: 'animate-up' },
    { selector: '.log-card',             cls: 'animate-up' },
  ];

  // Pre-hide elements
  animMap.forEach(({ selector }) => {
    document.querySelectorAll(selector).forEach(el => {
      el.style.opacity = '0';
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const animClasses = el.dataset.anim;
        if (animClasses) {
          el.style.opacity = '';
          animClasses.split(' ').forEach(c => el.classList.add(c));
          observer.unobserve(el);
        }
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  // Assign data-anim attributes and observe
  animMap.forEach(({ selector, cls }) => {
    document.querySelectorAll(selector).forEach((el, i) => {
      // Stagger siblings
      let classes = cls;
      if (!cls.includes('delay-') && i > 0 && i <= 4) {
        const delayClass = `delay-${i}`;
        classes = cls + ' ' + delayClass;
      }
      el.dataset.anim = classes;
      observer.observe(el);
    });
  });
}

/* ==========================================================================
   9. STICKY HEADER SHRINK ON SCROLL
   ========================================================================== */
function initStickyHeader() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      header.style.padding = '0.45rem 0';
      header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.5)';
    } else {
      header.style.padding = '';
      header.style.boxShadow = '';
    }
  }, { passive: true });
}

/* ==========================================================================
   10. READING PROGRESS BAR
   ========================================================================== */
function initProgressBar() {
  // Create progress bar element
  const bar = document.createElement('div');
  bar.id = 'readingProgress';
  bar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    width: 0%;
    background: linear-gradient(90deg, #38BDF8, #6366F1, #8B5CF6);
    z-index: 9999;
    transition: width 0.1s linear;
    pointer-events: none;
  `;
  document.body.prepend(bar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${Math.min(progress, 100)}%`;
  }, { passive: true });
}
