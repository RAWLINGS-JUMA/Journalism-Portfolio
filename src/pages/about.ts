import { site } from '../data/site';
import { initBackToTop } from '../modules/backToTop';
import { renderSiteChrome } from '../modules/chrome';
import { initNavigation } from '../modules/navigation';

renderSiteChrome('about');
initNavigation();
initBackToTop();

document.querySelectorAll<HTMLImageElement>('[data-site-portrait]').forEach((image) => {
  image.src = site.portrait;
});

const toggle = document.querySelector<HTMLButtonElement>('#aboutToggle');
const extra = document.querySelector<HTMLElement>('#aboutExtra');

if (toggle && extra) {
  toggle.addEventListener('click', () => {
    const expanded = extra.hidden;
    extra.hidden = !expanded;
    toggle.setAttribute('aria-expanded', String(expanded));
    toggle.innerHTML = expanded ? 'Show less <span aria-hidden="true">&uarr;</span>' : 'Read full profile <span aria-hidden="true">&darr;</span>';
  });
}
