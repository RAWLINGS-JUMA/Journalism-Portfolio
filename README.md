# Broadcast Journalist Portfolio

A responsive, six-page portfolio for Darvin Darwin, a broadcast journalism intern at MMU Radio 99.9 FM Kajiado. The interface follows a clean editorial structure — utility bar, sticky navigation, split hero, section eyebrows, skill cards, project cards and footer — with a light, professional coral-red palette inspired by the reference portfolio, softened for readability. The Home hero uses a custom broadcast-studio illustration with a microphone, headphones and presentation screen, and section headings use a heavier weight.

The home page is intentionally lean: hero, social buttons and a clear call to action. Deeper personal detail lives on **About**, and all video samples live on **My Work**.

Built with TypeScript + Vite. The output is static HTML, CSS and JavaScript, so it can be deployed to any ordinary static host.

## Pages

- `index.html` — Home / hero, social buttons and CTA only
- `about.html` — Biography, journey, philosophy, aspirations, profile, interests and supplied About images
- `work.html` — “A voice for accurate, human reporting”, selected video samples shown once, filters and autoplaying detail modals
- `skills-education.html` — Academic placeholders, journalism skills, technical skills, MMU Radio internship
- `achievements.html` — Media participation only; no awards, competitions, events or certificates
- `contact.html` — Brief WhatsApp contact card only; no form, no repeated social links

## Current content

The site uses the supplied name **Darvin Darwin**, the supplied **logo.jpeg**, **portrait.jpeg**, `dav.jpeg`, `radio.jpeg` and `davi.jpeg` images, the current **MMU Radio 99.9 FM Kajiado** internship, three YouTube samples from the **DAVIN CI’S** channel and one TikTok video sample.

The About page uses `dav.jpeg` and `davi.jpeg` in the first two editorial frames and `radio.jpeg` in the “Growing into the newsroom.” section. All three images fill their frames with `object-fit: cover` and a controlled maximum frame width.

University details, email, phone and CV were not supplied. Academic details live in `src/data/skills.ts`; the Contact page stays brief. The WhatsApp link uses the supplied Kenyan number. Nothing has been invented.

## Important: placeholders are intentional

Replace every remaining placeholder with verified information before publishing. Empty social URLs render as clearly labelled, non-clickable elements rather than dead links; the WhatsApp button is active.

## Getting started

```bash
npm install
npm run dev
```

Open the local address printed by Vite.

## Production build

```bash
npm run build
npm run preview
```

The deployable output is in `dist/`.

## TypeScript structure

```text
src/
  data/
    site.ts          # Name, role, email, phone, WhatsApp URL, social links, CV path
    work.ts          # Portfolio items and categories
    skills.ts        # Skill groups, education and training
  modules/
    chrome.ts        # Shared utility bar, header, navigation and footer
    navigation.ts    # Mobile menu and same-page smooth scrolling
    render.ts        # Reusable card renderers
    modal.ts         # Accessible detail and autoplaying video modals
    filters.ts       # Portfolio filters
    backToTop.ts     # Back-to-top button
    icons.ts         # Lightweight inline SVG icons
  pages/
    home.ts, about.ts, work.ts, skills.ts, achievements.ts, contact.ts
  styles/
    global.css       # Design system, components and responsive rules
```

## Customise the content

### 1. Personal details

Edit `src/data/site.ts`:

- `name`, `shortName`, `role`, `intro`, `tagline`
- `location`, `availability`
- `email`, `phone`, `whatsappUrl`
- `portrait`, `logo`

### 1a. Social buttons

The Home hero includes buttons for **YouTube, X, Instagram, Facebook and TikTok**. Add each verified URL to the `social` array in `src/data/site.ts`. The TikTok button uses the account link, not a single video link. An empty `url` renders as a dashed, non-clickable placeholder button, so there are no dead links. The same buttons appear in the footer; the Contact page intentionally does not repeat them.

### 1b. WhatsApp button

The verified WhatsApp link is already set in `src/data/site.ts` for the supplied Kenyan number `0707769349`, stored in international format as `254707769349`:

```ts
whatsappUrl: 'https://wa.me/254707769349',
```

The Contact page button opens that chat directly. If a different number is supplied, update `whatsappUrl`; `site.phone` is also converted to a `wa.me` link as a fallback.

### 2. Portfolio items

Edit `src/data/work.ts`. Each item supports:

```ts
{
  id: 'unique-id',
  title: 'Real project title',
  category: 'broadcast', // broadcast | reporting | interviews | radio-tv | projects | writing
  year: '2026',
  context: 'University assignment / publication',
  type: 'News package',
  description: 'Short card description shown below the card.',
  details: 'Longer modal description shown in the video panel.',
  thumbnail: '/assets/images/your-thumbnail.webp',
  videoUrl: 'https://www.youtube.com/watch?v=VIDEO_ID', // optional; YouTube or TikTok video URL
  externalUrl: 'https://…', // optional "Watch on…" link
}
```

YouTube and TikTok URLs are converted to responsive embeds in the video modal. Selecting a card opens the modal with `autoplay=1`. YouTube embeds also receive a `playVideo` command when the player loads, and a `t=4s` link is preserved as `start=4`. If `videoUrl` is empty, the modal shows a clear message instead of a broken player.

### 3. Achievements

The Achievements page intentionally shows only **Media participation**: the verified MMU Radio 99.9 FM Kajiado internship. It is written directly in `achievements.html`; there are no award, competition, event or certificate placeholders.

### 4. Skills and education

Edit `src/data/skills.ts`. The layout intentionally avoids percentage skill bars and exaggerated proficiency claims.

### 5. Images

The supplied images are copied to `public/assets/images/` and `public/assets/images/about/`. Video thumbnails are stored in `public/assets/images/portfolio/`, including the TikTok thumbnail. The Home hero currently uses `public/assets/images/home-broadcast-bg-studio.svg`; the earlier `home-broadcast-bg.svg` is kept as an alternate. Swap the filename in `.hero` inside `src/styles/global.css` to change the background.

Recommended portrait: 3:4 ratio, at least 900 × 1200 px.

### 6. CV

Replace `public/assets/documents/cv-placeholder.pdf` with the real CV. Then update `cvUrl` in `src/data/site.ts`, for example:

```ts
cvUrl: '/assets/documents/cv.pdf',
```

### 7. SEO

Update the `<title>`, meta descriptions and Open Graph tags in each HTML page. Replace the placeholder domain in `public/sitemap.xml` and `public/robots.txt` with the real deployed URL.

## Colour system

| Token | Hex | Use |
|---|---|---|
| Light coral red | `#B84A5D` | Primary backgrounds, navigation, buttons, text accents |
| Coral deep | `#92384A` | Footer and back-to-top |
| Soft coral | `#C96A7A` | Secondary accents |
| Blush petal | `#F3CBD2` | Highlights, borders and focus details |
| Petal dark | `#A84357` | Accent text with strong contrast |
| Petal soft | `#FBEEEE` | Badge backgrounds |
| Warm ivory | `#FDF6F6` | Alternate sections |
| Coral ink | `#2B1D22` / `#42333A` | Body text |

Change these values at the top of `src/styles/global.css`.

## Deployment

Run `npm run build`, then upload the contents of `dist/` to Netlify, Vercel, GitHub Pages, Cloudflare Pages or any static web server. No backend, database or PHP is required.

For GitHub Pages with a repository subpath, set Vite's `base` option in `vite.config.ts` to match the repository path.
