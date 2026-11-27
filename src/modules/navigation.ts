export function initNavigation(): void {
  const toggle = document.querySelector<HTMLButtonElement>('#menuToggle');
  const nav = document.querySelector<HTMLElement>('#primaryNav');

  if (toggle && nav) {
    const setMenu = (open: boolean): void => {
      nav.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    };

    toggle.addEventListener('click', () => {
      setMenu(!nav.classList.contains('open'));
    });

    document.addEventListener('click', (event) => {
      const target = event.target as Node;
      if (!nav.contains(target) && !toggle.contains(target)) setMenu(false);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setMenu(false);
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenu(false));
    });
  }

  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', href);
    });
  });
}
