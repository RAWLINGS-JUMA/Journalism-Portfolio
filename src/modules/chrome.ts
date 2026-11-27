import { site } from '../data/site';
import { icons } from './icons';
import { renderSocialList } from './social';

export type PageKey = 'home' | 'about' | 'work' | 'skills' | 'achievements' | 'contact';

interface NavItem {
  key: PageKey;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { key: 'home', label: 'Home', href: 'index.html' },
  { key: 'about', label: 'About Me', href: 'about.html' },
  { key: 'work', label: 'My Work', href: 'work.html' },
  { key: 'skills', label: 'Skills & Education', href: 'skills-education.html' },
  { key: 'achievements', label: 'Achievements', href: 'achievements.html' },
  { key: 'contact', label: 'Contact', href: 'contact.html' },
];

const socialItems = (): string => renderSocialList(site.social);

export function renderSiteChrome(page: PageKey): void {
  const chromeRoot = document.querySelector<HTMLElement>('#site-chrome');
  const footerRoot = document.querySelector<HTMLElement>('#site-footer');

  if (!chromeRoot || !footerRoot) return;

  chromeRoot.innerHTML = `
    <div class="utility-bar">
      <div class="wrap utility-bar__inner">
        <span>${site.name} &nbsp;·&nbsp; ${site.role}</span>
        <span class="utility-bar__right">${site.location} &nbsp;·&nbsp; ${site.availability}</span>
      </div>
    </div>

    <header class="site-header">
      <div class="wrap site-header__inner">
        <a class="brand" href="index.html">
          <span class="brand__photo-frame">
            <img class="brand__photo" src="${site.logo}" alt="${site.name} logo" width="587" height="514" decoding="async">
          </span>
          <span class="brand__text">
            <strong>${site.name}</strong>
            <small>Broadcast Journalism</small>
          </span>
        </a>

        <button class="menu-toggle" id="menuToggle" type="button" aria-expanded="false" aria-controls="primaryNav" aria-label="Open navigation">
          ${icons.menu}
        </button>

        <nav class="primary-nav" id="primaryNav" aria-label="Primary navigation">
          ${navItems
            .map(
              (item) =>
                `<a href="${item.href}"${item.key === page ? ' class="active" aria-current="page"' : ''}>${item.label}</a>`,
            )
            .join('')}
          <a class="nav-cv" href="${site.cvUrl}" download="Download_My_CV.pdf">Download My CV ${icons.download}</a>
        </nav>
      </div>
    </header>
  `;

  footerRoot.innerHTML = `
    <footer class="site-footer">
      <div class="wrap footer__grid">
        <div class="footer__column footer__column--intro">
          <h3>${site.shortName}</h3>
          <p>${site.intro}</p>
        </div>
        <div class="footer__column footer__column--explore">
          <h3>Explore</h3>
          <ul class="footer__links">
            ${navItems
              .map((item) => `<li><a href="${item.href}">${item.label}</a></li>`)
              .join('')}
          </ul>
        </div>
        <div class="footer__column footer__column--connect">
          <h3>Connect</h3>
          <ul class="footer__links footer__links--icons">
            ${socialItems()}
          </ul>
        </div>
        <div class="footer__column footer__column--contact">
          <h3>Contact</h3>
          <ul class="footer__links footer__links--icons">
            ${site.email ? `<li><a href="mailto:${site.email}">${icons.email}<span>${site.email}</span></a></li>` : ''}
            <li><a href="${site.cvUrl}" download="Download_My_CV.pdf">${icons.download}<span>Download My CV</span></a></li>
            <li><span>${icons.location}<span>${site.location}</span></span></li>
          </ul>
        </div>
      </div>
      <div class="wrap footer__bottom">
        <span>&copy; <span id="currentYear">${new Date().getFullYear()}</span> ${site.name}. All rights reserved.</span>
        <span>Designed with clarity and professionalism.</span>
      </div>
    </footer>
  `;
}
