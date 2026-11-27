export function initBackToTop(): void {
  const button = document.querySelector<HTMLButtonElement>('#backToTop');
  if (!button) return;

  const updateVisibility = (): void => {
    button.classList.toggle('visible', window.scrollY > 420);
  };

  window.addEventListener('scroll', updateVisibility, { passive: true });
  updateVisibility();

  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
