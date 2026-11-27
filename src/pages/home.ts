import { site } from '../data/site';
import { initBackToTop } from '../modules/backToTop';
import { renderSiteChrome } from '../modules/chrome';
import { initNavigation } from '../modules/navigation';
import { renderSocialList } from '../modules/social';

renderSiteChrome('home');
initNavigation();
initBackToTop();

document.querySelectorAll<HTMLImageElement>('[data-site-portrait]').forEach((image) => {
  image.src = site.portrait;
});

const heroSocial = document.querySelector<HTMLElement>('#hero-social');
if (heroSocial) {
  heroSocial.innerHTML = renderSocialList(site.social);
}
