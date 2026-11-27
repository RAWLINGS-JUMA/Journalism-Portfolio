import type { WorkItem } from '../data/work';
import { categoryLabels } from '../data/work';
import { icons } from './icons';

let lastFocused: HTMLElement | null = null;

function parseStart(value: string): number | null {
  const match = /^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s?)?$/.exec(value.trim());
  if (!match) return null;
  const [, hours = '0', minutes = '0', seconds = '0'] = match;
  const total = Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);
  return Number.isFinite(total) && total > 0 ? total : null;
}

function isYouTubeUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.hostname.includes('youtube.com') || parsed.hostname.endsWith('youtu.be');
  } catch {
    return false;
  }
}

function isTikTokUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.hostname === 'tiktok.com' || parsed.hostname.endsWith('.tiktok.com');
  } catch {
    return false;
  }
}

function toEmbedUrl(url: string): string {
  try {
    const parsed = new URL(url);

    if (isTikTokUrl(url)) {
      const match = /(?:^|\/)video\/(\d+)/.exec(parsed.pathname);
      if (match) {
        const embed = new URL(`https://www.tiktok.com/embed/v2/${match[1]}`);
        embed.searchParams.set('autoplay', '1');
        return embed.toString();
      }
    }
    const startTime = parsed.searchParams.get('t') ?? parsed.searchParams.get('start');
    const startSeconds = startTime ? parseStart(startTime) : null;
    let id: string | null = null;

    if (parsed.hostname.endsWith('youtu.be')) {
      id = decodeURIComponent(parsed.pathname.slice(1));
    } else if (parsed.hostname.includes('youtube.com')) {
      id = parsed.searchParams.get('v');
    }

    if (!id) return url;

    const embed = new URL(`https://www.youtube.com/embed/${encodeURIComponent(id)}`);
    embed.searchParams.set('autoplay', '1');
    embed.searchParams.set('playsinline', '1');
    if (startSeconds !== null) embed.searchParams.set('start', String(startSeconds));
    return embed.toString();
  } catch {
    return url;
  }
}

function openModal(content: string): void {
  const root = document.querySelector<HTMLElement>('#modal-root');
  if (!root) return;

  lastFocused = document.activeElement as HTMLElement | null;
  root.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
      <div class="modal__backdrop" data-modal-close></div>
      <div class="modal__panel">
        <button class="modal__close" type="button" data-modal-close aria-label="Close dialog">
          ${icons.close}
        </button>
        ${content}
      </div>
    </div>
  `;
  document.body.classList.add('modal-open');

  const modal = root.querySelector<HTMLElement>('.modal');
  const panel = root.querySelector<HTMLElement>('.modal__panel');
  const closeButton = root.querySelector<HTMLButtonElement>('[data-modal-close]');
  closeButton?.focus();

  const close = (): void => {
    document.removeEventListener('keydown', onKeydown);
    root.innerHTML = '';
    document.body.classList.remove('modal-open');
    lastFocused?.focus();
  };

  const onKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
      close();
      return;
    }
    if (event.key !== 'Tab' || !panel) return;

    const focusable = Array.from(
      panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])'),
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  document.addEventListener('keydown', onKeydown);

  modal?.querySelectorAll<HTMLElement>('[data-modal-close]').forEach((element) => {
    element.addEventListener('click', close);
  });
}

export function openWorkModal(item: WorkItem): void {
  const video = item.videoUrl
    ? `<div class="modal__video"><iframe src="${toEmbedUrl(item.videoUrl)}" title="${item.title} video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div>`
    : `<div class="modal__notice">${icons.play}<span>No video has been linked yet. Add a verified video URL to this item in <code>src/data/work.ts</code> to enable playback.</span></div>`;

  const placeholderNotice = item.isPlaceholder
    ? `<p class="modal__placeholder">This is a clearly labelled placeholder. Replace it with verified personal work before publishing.</p>`
    : '';

  const watchUrl = item.externalUrl ?? item.videoUrl ?? '';
  const watchLabel = isTikTokUrl(watchUrl)
    ? 'Watch on TikTok'
    : isYouTubeUrl(watchUrl)
      ? 'Watch on YouTube'
      : 'Open publication';

  openModal(`
    <p class="eyebrow">${categoryLabels[item.category]} &middot; ${item.year}</p>
    <h2 id="modalTitle">${item.title}</h2>
    <div class="modal__meta">
      <span>${icons.calendar} ${item.type}</span>
      <span>${icons.book} ${item.context}</span>
    </div>
    ${video}
    ${placeholderNotice}
    <p class="modal__body">${item.details}</p>
    ${watchUrl ? `<a class="btn btn--primary" href="${watchUrl}" target="_blank" rel="noopener noreferrer">${watchLabel} ${icons.external}</a>` : ''}
  `);

  const iframe = document.querySelector<HTMLIFrameElement>('#modal-root .modal__video iframe');
  if (!iframe || !item.videoUrl || !isYouTubeUrl(item.videoUrl)) return;

  const sendPlayCommand = (): void => {
    iframe.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func: 'playVideo', args: [] }),
      'https://www.youtube.com',
    );
  };

  iframe.addEventListener('load', sendPlayCommand, { once: true });
  sendPlayCommand();
}
