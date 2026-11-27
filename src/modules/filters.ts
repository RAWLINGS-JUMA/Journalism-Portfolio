export function initCategoryFilter(scope: HTMLElement | null, cardSelector = '[data-category]'): void {
  if (!scope) return;

  const buttons = Array.from(scope.querySelectorAll<HTMLButtonElement>('[data-filter]'));
  const cards = Array.from(scope.querySelectorAll<HTMLElement>(cardSelector));

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter ?? 'all';

      buttons.forEach((other) => {
        const active = other === button;
        other.classList.toggle('active', active);
        other.setAttribute('aria-pressed', String(active));
      });

      cards.forEach((card) => {
        card.hidden = filter !== 'all' && card.dataset.category !== filter;
      });
    });
  });
}
