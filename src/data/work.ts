export type WorkCategory =
  | 'broadcast'
  | 'reporting'
  | 'interviews'
  | 'radio-tv'
  | 'projects'
  | 'writing';

export interface WorkItem {
  id: string;
  title: string;
  category: WorkCategory;
  year: string;
  context: string;
  type: string;
  description: string;
  details: string;
  thumbnail: string;
  videoUrl?: string;
  externalUrl?: string;
  isPlaceholder?: boolean;
}

export const workCategories: Array<{ id: WorkCategory | 'all'; label: string }> = [
  { id: 'all', label: 'All work' },
  { id: 'broadcast', label: 'Broadcast videos' },
];

export const categoryLabels: Record<WorkCategory, string> = {
  broadcast: 'Broadcast',
  reporting: 'News Reporting',
  interviews: 'Interviews',
  'radio-tv': 'Radio & Television',
  projects: 'Projects & Documentaries',
  writing: 'Writing & Publications',
};


export const workItems: WorkItem[] = [
  {
    id: 'video-2026-04-02',
    title: 'April 2, 2026',
    category: 'broadcast',
    year: '2026',
    context: "DAVIN CI'S YouTube channel",
    type: 'Broadcast video',
    description:
      'A broadcast presentation demonstrating on-air communication, news delivery and professional presentation skills.',
    details:
      'Watch the original upload from the video panel below. Add a fuller broadcast brief here when you are ready to describe the segment in more detail.',
    thumbnail: './assets/images/portfolio/april-2-2026.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=3JdB6c5fLms',
    externalUrl: 'https://www.youtube.com/watch?v=3JdB6c5fLms',
  },
  {
    id: 'video-2026-03-30',
    title: 'March 30, 2026',
    category: 'broadcast',
    year: '2026',
    context: "DAVIN CI'S YouTube channel",
    type: 'Broadcast video',
    description:
      'A broadcast segment showcasing news delivery and on-air presentation skills.',
    details:
      'Watch the original upload from the video panel below. Add a fuller broadcast brief here when you are ready to describe the segment in more detail.',
    thumbnail: './assets/images/portfolio/march-30-2026.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=-rqXh6qkhic',
    externalUrl: 'https://www.youtube.com/watch?v=-rqXh6qkhic',
  },
  {
    id: 'video-2026-03-12',
    title: 'March 12, 2026',
    category: 'broadcast',
    year: '2026',
    context: "DAVIN CI'S YouTube channel",
    type: 'Broadcast video',
    description:
      'A news presentation highlighting clear communication and effective broadcast delivery.',
    details:
      'This link starts at 00:04 in the original upload. Watch the full segment from the video panel below.',
    thumbnail: './assets/images/portfolio/march-12-2026.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=iEtsFhA3bSQ&t=4s',
    externalUrl: 'https://www.youtube.com/watch?v=iEtsFhA3bSQ&t=4s',
  },
  {
    id: 'video-tiktok',
    title: 'TikTok video sample',
    category: 'broadcast',
    year: '—',
    context: 'Davine on TikTok',
    type: 'Short-form video',
    description:
      'A short-form broadcast feature showcasing on-camera presentation and communication skills.',
    details:
      'Open the video panel to watch the original TikTok post. Add a fuller broadcast brief here when you are ready.',
    thumbnail: './assets/images/portfolio/tiktok-video.svg',
    videoUrl: 'https://www.tiktok.com/@davinechepkwemboi/video/7692697694384491796',
    externalUrl: 'https://www.tiktok.com/@davinechepkwemboi/video/7692697694384491796',
  },
];
