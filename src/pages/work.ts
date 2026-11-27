import { workCategories, workItems } from '../data/work';
import { initBackToTop } from '../modules/backToTop';
import { renderSiteChrome } from '../modules/chrome';
import { initCategoryFilter } from '../modules/filters';
import { initNavigation } from '../modules/navigation';
import { renderWorkCards } from '../modules/render';

renderSiteChrome('work');
initNavigation();
initBackToTop();

const filterRoot = document.querySelector<HTMLElement>('#work-filter');
const filterList = filterRoot?.querySelector<HTMLElement>('.filter-list');

if (filterList) {
  filterList.innerHTML = workCategories
    .map(
      (category, index) =>
        `<button class="filter-button${index === 0 ? ' active' : ''}" type="button" data-filter="${category.id}" aria-pressed="${index === 0}">${category.label}</button>`,
    )
    .join('');
}

renderWorkCards(document.querySelector<HTMLElement>('#work-grid'), workItems);
initCategoryFilter(filterRoot);
