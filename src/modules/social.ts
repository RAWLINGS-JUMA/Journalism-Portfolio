import type { SocialLink } from '../data/site';
import { icons } from './icons';

const chip = (link: SocialLink): string => {
  const content = `${icons[link.icon]}<span>${link.label}</span>`;

  if (!link.url) {
    return `<span class="social-chip social-chip--pending" title="Add your ${link.label} URL in src/data/site.ts" aria-label="${link.label} link to be added">${content}</span>`;
  }

  return `<a class="social-chip" href="${link.url}" target="_blank" rel="noopener noreferrer" aria-label="${link.label}">${content}</a>`;
};

export function renderSocialList(links: readonly SocialLink[]): string {
  return links.map((link) => `<li>${chip(link)}</li>`).join('');
}
