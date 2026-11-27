import { education, journalismSkills, technicalSkills, training } from '../data/skills';
import { initBackToTop } from '../modules/backToTop';
import { renderSiteChrome } from '../modules/chrome';
import { initNavigation } from '../modules/navigation';
import { renderSkillGroups } from '../modules/render';

renderSiteChrome('skills');
initNavigation();
initBackToTop();

const setText = (selector: string, value: string): void => {
  const element = document.querySelector<HTMLElement>(selector);
  if (element) element.textContent = value;
};

setText('[data-education-institution]', education.institution);
setText('[data-education-programme]', education.programme);
setText('[data-education-level]', education.level);

renderSkillGroups(document.querySelector<HTMLElement>('#journalism-skills'), journalismSkills);
renderSkillGroups(document.querySelector<HTMLElement>('#technical-skills'), technicalSkills);

const trainingList = document.querySelector<HTMLElement>('#training-list');
if (trainingList) {
  trainingList.innerHTML = training
    .map(
      (item) => `
      <article class="experience-card">
        ${item.isPlaceholder ? '<span class="badge badge--placeholder">Placeholder</span>' : '<span class="badge">Verified</span>'}
        <h3>${item.title}</h3>
        <p><strong>${item.provider}</strong> &middot; ${item.date}</p>
        <p>${item.note}</p>
      </article>`,
    )
    .join('');
}
