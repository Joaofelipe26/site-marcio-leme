(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobile = window.matchMedia('(max-width: 920px)');
  const header = document.querySelector('.header');
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  const hero = document.querySelector('.hero');

  /* Abertura: começa quando as fontes carregam (máx. 1,2 s de espera) */
  const start = () => hero.classList.add('is-drawn');
  if (document.fonts && document.fonts.ready) {
    Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 1200))]).then(start);
  } else { start(); }

  /* Menu mobile: gaveta lateral que empurra o site para a esquerda */
  const scrim = document.createElement('div');
  scrim.className = 'scrim';
  document.body.appendChild(scrim);
  const closeMenu = () => {
    document.body.classList.remove('menu-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Abrir menu');
  };
  burger.addEventListener('click', () => {
    const open = document.body.classList.toggle('menu-open');
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });
  scrim.addEventListener('click', closeMenu);
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  /* Rolagem: uma atualização por quadro */
  const seal = document.querySelector('.hero__seal');
  let ticking = false;
  const update = () => {
    ticking = false;
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 40);
    if (!reduce && seal && y < window.innerHeight * 1.2) {
      seal.style.transform = `translateY(calc(-50% + ${y * 0.22}px))`;
    }
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();

  /* Linha do tempo: desenha quando a aba "Formação" abre */
  const timeline = document.getElementById('timeline');
  const drawTimeline = () => {
    timeline.classList.remove('is-drawn');
    void timeline.offsetWidth; // reinicia a animação
    timeline.classList.add('is-drawn');
  };

  /* Abas horizontais */
  document.querySelectorAll('[data-tabs]:not([data-vertical])').forEach(group => {
    const tabs = [...group.querySelectorAll('[role="tab"]')];
    const select = tab => {
      tabs.forEach(t => {
        const on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
      });
      if (tab.getAttribute('aria-controls') === 'p-form') drawTimeline();
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => select(t));
      t.addEventListener('keydown', e => {
        const keys = { ArrowRight: 1, ArrowLeft: -1 };
        if (!(e.key in keys)) return;
        e.preventDefault();
        const next = tabs[(i + keys[e.key] + tabs.length) % tabs.length];
        next.focus(); select(next);
      });
    });
  });

  /* Áreas de atuação: abas verticais no computador, acordeão no celular */
  const vbtns = [...document.querySelectorAll('.vtab__btn')];
  const showArea = (btn, open) => {
    vbtns.forEach(b => {
      const on = b === btn && open;
      b.setAttribute('aria-expanded', String(on));
      document.getElementById(b.getAttribute('aria-controls')).hidden = !on;
    });
  };
  vbtns.forEach((b, i) => {
    b.addEventListener('click', () => {
      const isOpen = b.getAttribute('aria-expanded') === 'true';
      if (mobile.matches) {                       // celular: abre e fecha
        showArea(b, !isOpen);
        b.scrollIntoView({ block: 'nearest', behavior: reduce ? 'auto' : 'smooth' });
      } else showArea(b, true);                   // computador: sempre uma aberta
    });
    b.addEventListener('keydown', e => {
      const keys = { ArrowDown: 1, ArrowUp: -1 };
      if (!(e.key in keys)) return;
      e.preventDefault();
      const next = vbtns[(i + keys[e.key] + vbtns.length) % vbtns.length];
      next.focus(); showArea(next, true);
    });
  });
  /* Toque no celular: destaca o bloco de "Quem somos" e "Diferenciais" (no computador, o mouse faz isso) */
  if (!window.matchMedia('(hover: hover)').matches) {
    const blocks = [...document.querySelectorAll('.pillar, .diffs li')];
    blocks.forEach(el => el.addEventListener('click', () => {
      const on = !el.classList.contains('is-active');
      blocks.forEach(b => b.classList.remove('is-active'));
      el.classList.toggle('is-active', on);
    }));
  }

  /* No celular, a lista começa fechada */
  if (mobile.matches) showArea(null, false);
  /* No computador, nunca deixar o painel vazio */
  mobile.addEventListener('change', () => {
    closeMenu();
    if (!mobile.matches && !vbtns.some(b => b.getAttribute('aria-expanded') === 'true')) showArea(vbtns[0], true);
  });

  /* Linha do tempo: desenha também quando a seção aparece com a aba "Formação" aberta */
  const formPanel = document.getElementById('p-form');
  const tlIO = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting && !formPanel.hidden && !timeline.classList.contains('is-drawn')) drawTimeline();
  }), { threshold: 0.3 });
  tlIO.observe(document.getElementById('trajetoria'));

  /* Foto: abre de baixo para cima quando aparece */
  const portrait = document.querySelector('.portrait');
  if (portrait) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { portrait.classList.add('is-in'); io.disconnect(); }
    }), { threshold: 0.2 });
    /* observar o bloco pai: o clip-path esconde a própria foto do observer */
    io.observe(portrait.parentElement);
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
