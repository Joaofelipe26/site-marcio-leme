(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.querySelector('.header');
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');

  /* Cabeçalho muda ao rolar */
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Menu mobile */
  const closeMenu = () => { document.body.classList.remove('menu-open'); burger.setAttribute('aria-expanded', 'false'); };
  burger.addEventListener('click', () => {
    const open = document.body.classList.toggle('menu-open');
    burger.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  /* Revelar ao rolar */
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* Contadores */
  const counters = document.querySelectorAll('[data-count]');
  const countIO = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target; countIO.unobserve(el);
      const end = +el.dataset.count;
      if (reduce) { el.textContent = end; return; }
      const start = end > 1000 ? end - 30 : 0;
      const dur = 1600; const t0 = performance.now();
      const tick = now => {
        const p = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(start + (end - start) * eased);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });
  counters.forEach(c => countIO.observe(c));

  /* Áreas de atuação: acordeão */
  document.querySelectorAll('.area__head').forEach(btn => {
    btn.addEventListener('click', () => {
      const area = btn.closest('.area');
      const open = area.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  /* Linha da trajetória acompanha a rolagem */
  const timeline = document.getElementById('timeline');
  const updateTimeline = () => {
    const r = timeline.getBoundingClientRect();
    const vh = window.innerHeight;
    const p = Math.min(1, Math.max(0, (vh * 0.75 - r.top) / r.height));
    timeline.style.setProperty('--p', p.toFixed(3));
  };
  if (reduce) timeline.style.setProperty('--p', 1);
  else { updateTimeline(); window.addEventListener('scroll', updateTimeline, { passive: true }); }

  /* Parallax suave da marca d'água */
  const wm = document.querySelector('[data-parallax]');
  if (wm && !reduce) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight * 1.2) wm.style.transform = `translateY(calc(-50% + ${y * 0.25}px))`;
    }, { passive: true });
  }

  /* Link ativo no menu */
  const links = [...nav.querySelectorAll('a[href^="#"]')];
  const secIO = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) links.forEach(l => l.classList.toggle('is-active', l.getAttribute('href') === '#' + en.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main section[id]').forEach(s => secIO.observe(s));

  document.getElementById('ano').textContent = new Date().getFullYear();
})();
