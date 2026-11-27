import type { SkillGroup } from '../data/skills';
import type { WorkItem } from '../data/work';
import { categoryLabels } from '../data/work';
import { icons } from './icons';
import { openWorkModal } from './modal';

function mount(container: HTMLElement | null, markup: string): void {
  if (container) container.innerHTML = markup;
}

export function renderWorkCards(container: HTMLElement | null, items: WorkItem[]): void {
  mount(
    container,
    items
      .map(
        (item) => `
        <article class="card work-card" data-category="${item.category}">
          <button class="card__media" type="button" data-work-id="${item.id}" aria-label="${item.videoUrl ? 'Play' : 'View details for'} ${item.title}">
            <img src="${item.thumbnail}" alt="Video thumbnail for ${item.title}" loading="lazy">
            <span class="card__play">${icons.play}</span>
            ${item.isPlaceholder ? '<span class="card__flag">Placeholder</span>' : ''}
          </button>
          <div class="card__body">
            <p class="card__meta">${categoryLabels[item.category]} &middot; ${item.year}</p>
            <h3>${item.title}</h3>
            <p class="card__excerpt">${item.description}</p>
            <button class="card__link" type="button" data-work-id="${item.id}">${item.videoUrl ? 'Play video' : 'View details'} ${icons.arrowRight}</button>
          </div>
        </article>`,
      )
      .join(''),
  );

  container?.querySelectorAll<HTMLButtonElement>('[data-work-id]').forEach((button) => {
    const id = button.dataset.workId;
    const item = items.find((entry) => entry.id === id);
    if (item) button.addEventListener('click', () => openWorkModal(item));
  });
}

export function renderVideoCards(container: HTMLElement | null, items: WorkItem[]): void {
  renderWorkCards(container, items);
  container?.querySelectorAll<HTMLElement>('.work-card').forEach((card) => {
    card.classList.add('work-card--video');
  });
}

export function renderSkillGroups(container: HTMLElement | null, groups: SkillGroup[]): void {
  mount(
    container,
    groups
      .map(
        (group) => `
        <article class="skill-card">
          <h3>${group.title}</h3>
          <ul>${group.items.map((item) => `<li>${item}</li>`).join('')}</ul>
        </article>`,
      )
      .join(''),
  );
}
