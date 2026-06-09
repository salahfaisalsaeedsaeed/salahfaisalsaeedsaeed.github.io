const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const themeToggle = document.getElementById('themeToggle');
const filterButtons = document.querySelectorAll('.filter-btn');
const publicationItems = document.querySelectorAll('.publication-item');
const copyEmailButton = document.getElementById('copyEmail');
const toast = document.getElementById('toast');
const year = document.getElementById('year');
const navAnchors = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('main section[id]');
const revealElements = document.querySelectorAll('.reveal');
const scrollProgress = document.getElementById('scrollProgress');
const backToTop = document.getElementById('backToTop');
const mediaButtons = document.querySelectorAll('.media-preview');
const mediaModal = document.getElementById('mediaModal');
const mediaModalImage = document.getElementById('mediaModalImage');
const mediaModalTitle = document.getElementById('mediaModalTitle');
const closeModalButtons = document.querySelectorAll('[data-close-modal]');

if (year) {
  year.textContent = new Date().getFullYear();
}

function closeMenu() {
  if (!navLinks || !menuToggle) return;

  navLinks.classList.remove('open');
  document.body.classList.remove('menu-open');
  menuToggle.setAttribute('aria-expanded', 'false');
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    document.body.classList.toggle('menu-open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

navAnchors.forEach((anchor) => {
  anchor.addEventListener('click', closeMenu);
});

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);

  const themeIcon = themeToggle ? themeToggle.querySelector('.theme-icon') : null;
  if (themeIcon) {
    themeIcon.textContent = theme === 'dark' ? '☀' : '◐';
  }
}

const storedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
setTheme(storedTheme || (prefersDark ? 'dark' : 'light'));

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.dataset.filter;

    publicationItems.forEach((item) => {
      const shouldShow = filter === 'all' || item.dataset.category === filter;
      item.classList.toggle('is-hidden', !shouldShow);
    });
  });
});

function showToast(message) {
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  window.setTimeout(() => {
    toast.classList.remove('show');
  }, 2400);
}

if (copyEmailButton) {
  copyEmailButton.addEventListener('click', async () => {
    const email = copyEmailButton.dataset.email;

    try {
      await navigator.clipboard.writeText(email);
      showToast('Email copied to clipboard');
    } catch (error) {
      showToast(email);
    }
  });
}

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');

          navAnchors.forEach((anchor) => {
            anchor.classList.toggle('active', anchor.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { rootMargin: '-38% 0px -55% 0px', threshold: 0.01 }
  );

  sections.forEach((section) => sectionObserver.observe(section));
} else {
  revealElements.forEach((element) => element.classList.add('visible'));
}

function updateScrollUI() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  if (scrollProgress) {
    scrollProgress.style.width = `${progress}%`;
  }

  if (backToTop) {
    backToTop.classList.toggle('show', scrollTop > 600);
  }
}

window.addEventListener('scroll', updateScrollUI, { passive: true });
window.addEventListener('resize', updateScrollUI);
updateScrollUI();

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

function openMediaModal(imageSrc, title) {
  if (!mediaModal || !mediaModalImage || !mediaModalTitle) return;

  mediaModalImage.src = imageSrc;
  mediaModalImage.alt = title;
  mediaModalTitle.textContent = title;

  mediaModal.classList.add('show');
  mediaModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closeMediaModal() {
  if (!mediaModal || !mediaModalImage) return;

  mediaModal.classList.remove('show');
  mediaModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');

  window.setTimeout(() => {
    mediaModalImage.src = '';
    mediaModalImage.alt = '';
  }, 180);
}

mediaButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const imageSrc = button.dataset.media;
    const title = button.dataset.title || 'Media Preview';

    if (imageSrc) {
      openMediaModal(imageSrc, title);
    }
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener('click', closeMediaModal);
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMenu();
    closeMediaModal();
  }
});
