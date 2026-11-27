import { site } from '../data/site';
import { initBackToTop } from '../modules/backToTop';
import { renderSiteChrome } from '../modules/chrome';
import { icons } from '../modules/icons';
import { initNavigation } from '../modules/navigation';

renderSiteChrome('contact');
initNavigation();
initBackToTop();

const whatsappUrl =
  site.whatsappUrl.trim() ||
  (site.phone ? `https://wa.me/${site.phone.replace(/\D/g, '')}` : '');
const hasWhatsapp = /^https:\/\/(wa\.me\/\d|api\.whatsapp\.com\/send\?phone=\d|chat\.whatsapp\.com\/)/i.test(
  whatsappUrl,
);

const whatsappButton = document.querySelector<HTMLElement>('#whatsapp-contact');
if (whatsappButton) {
  whatsappButton.innerHTML = hasWhatsapp
    ? `<a class="btn btn--whatsapp" href="${whatsappUrl}" target="_blank" rel="noopener noreferrer">${icons.whatsapp}<span>Chat on WhatsApp</span></a>`
    : `<span class="btn btn--whatsapp btn--pending" title="Add the verified WhatsApp URL in src/data/site.ts">${icons.whatsapp}<span>WhatsApp link to be added</span></span>`;
}

const whatsappNote = document.querySelector<HTMLElement>('#whatsapp-note');
if (whatsappNote) {
  whatsappNote.textContent = hasWhatsapp
    ? 'Connect with Davine directly on Whatsapp.'
    : 'WhatsApp details were not supplied. Add the verified wa.me link in src/data/site.ts to activate this button.';
}
