(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.querySelector('.header');
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  const hero = document.querySelector('.hero');

  /* Abertura: começa quando as fontes carregam (máx. 1,2 s de espera) */
  const start = () => hero.classList.add('is-drawn');
  if (document.fonts && document.fonts.ready) {
    Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 1200))]).then(start);
  } else { start(); }

  /* Menu mobile */
  const closeMenu = () => { document.body.classList.remove('menu-open'); burger.setAttribute('aria-expanded', 'false'); };
  burger.addEventListener('click', () => {
    const open = document.body.classList.toggle('menu-open');
    burger.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  /* Rolagem: uma atualização por quadro */
  const seal = document.querySelector('.hero__seal');
  const timeline = document.getElementById('timeline');
  const items = [...timeline.querySelectorAll('.tl')];
  let ticking = false;

  const update = () => {
    ticking = false;
    const y = window.scrollY;
    const vh = window.innerHeight;
    header.classList.toggle('is-scrolled', y > 40);

    if (!reduce && seal && y < vh * 1.2) {
      seal.style.transform = `translateY(calc(-50% + ${y * 0.22}px))`;
    }

    const r = timeline.getBoundingClientRect();
    const p = reduce ? 1 : Math.min(1, Math.max(0, (vh * 0.72 - r.top) / r.height));
    timeline.style.setProperty('--p', p.toFixed(3));
    const reach = r.top + r.height * p;
    items.forEach(li => {
      const dot = li.getBoundingClientRect().top + 14;
      li.classList.toggle('is-lit', dot <= reach + 1);
    });
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  /* Foto: abre de baixo para cima quando aparece */
  const portrait = document.querySelector('.portrait');
  if (portrait) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { portrait.classList.add('is-in'); io.disconnect(); }
    }), { threshold: 0.2 });
    /* observar o bloco pai: o clip-path esconde a própria foto do observer */
    io.observe(portrait.parentElement);
  }

  /* Áreas principais: "Ler mais" */
  document.querySelectorAll('.feat__toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const feat = btn.closest('.feat');
      const open = feat.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
      btn.textContent = open ? 'Ler menos' : 'Ler mais';
    });
  });

  /* Outras áreas: acordeão */
  document.querySelectorAll('.area__head').forEach(btn => {
    btn.addEventListener('click', () => {
      const open = btn.closest('.area').classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  /* Escritórios e mapa (carrega só depois do clique) */
  const offices = {
    sp: {
      q: 'Rua Cubatão, 472 - Paraíso, São Paulo - SP, 04013-001',
      title: 'Mapa do escritório em São Paulo'
    },
    itp: {
      q: 'Rua Major Fonseca, 85 - Centro, Itapetininga - SP, 18200-022',
      title: 'Mapa do escritório em Itapetininga'
    }
  };
  let current = 'sp';
  let mapOn = false;
  const map = document.getElementById('map');
  const ext = document.getElementById('map-ext');
  const panel = document.getElementById('office-panel');
  const tabs = [...document.querySelectorAll('.office-tab')];

  const renderMap = () => {
    const o = offices[current];
    ext.href = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(o.q);
    if (!mapOn) return;
    map.innerHTML = '';
    const f = document.createElement('iframe');
    f.src = 'https://maps.google.com/maps?q=' + encodeURIComponent(o.q) + '&z=16&output=embed';
    f.title = o.title;
    f.loading = 'lazy';
    f.referrerPolicy = 'no-referrer-when-downgrade';
    map.appendChild(f);
  };
  document.getElementById('map-load').addEventListener('click', () => { mapOn = true; renderMap(); });

  const select = tab => {
    current = tab.dataset.office;
    tabs.forEach(t => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
    });
    panel.setAttribute('aria-labelledby', tab.id);
    panel.querySelectorAll('.office__addr').forEach(a => { a.hidden = a.dataset.addr !== current; });
    renderMap();
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(t));
    t.addEventListener('keydown', e => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
      next.focus(); select(next);
    });
  });

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
