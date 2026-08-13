// ====== THEME TOGGLE ======
  const themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    themeToggle.textContent = isLight ? '🌙 Escuro' : '☀️ Claro';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
  // Load theme
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.textContent = '🌙 Escuro';
  }

  // ====== NAV TABS ======
  const navTabs = document.querySelectorAll('.nav-tab');
  navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = document.getElementById(tab.dataset.target);
      if (target) {
        // remove active from all
        navTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        // smooth scroll
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Update active tab on scroll
  const sections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navTabs.forEach(tab => {
          tab.classList.toggle('active', tab.dataset.target === id);
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' });
  sections.forEach(s => observer.observe(s));

  // ====== BACK TO TOP ======
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ====== FADE IN ANIMATION ======
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

  // ====== COUNT UP ======
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const duration = 1500;
        const start = performance.now();
        const step = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(target * eased);
          if (progress < 1) requestAnimationFrame(step);
          else el.textContent = target;
        };
        requestAnimationFrame(step);
        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.numero-counter').forEach(el => countObserver.observe(el));

  // ====== TABLE SORTING ======
  const table = document.getElementById('tabelaComparativa');
  if (table) {
    const headers = table.querySelectorAll('th');
    const tbody = table.querySelector('tbody');
    headers.forEach((th, index) => {
      th.addEventListener('click', () => {
        const isAsc = th.classList.contains('sort-asc');
        headers.forEach(h => h.classList.remove('sort-asc', 'sort-desc'));
        th.classList.add(isAsc ? 'sort-desc' : 'sort-asc');
        const rows = Array.from(tbody.querySelectorAll('tr'));
        rows.sort((a, b) => {
          const aText = a.children[index].textContent.trim();
          const bText = b.children[index].textContent.trim();
          return isAsc
            ? bText.localeCompare(aText, 'pt-BR')
            : aText.localeCompare(bText, 'pt-BR');
        });
        rows.forEach(row => tbody.appendChild(row));
      });
    });
  }