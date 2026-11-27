export interface SkillGroup {
  title: string;
  items: string[];
}

export interface TrainingItem {
  title: string;
  provider: string;
  date: string;
  note: string;
  isPlaceholder?: boolean;
}

export const journalismSkills: SkillGroup[] = [
  {
    title: 'Reporting & Writing',
    items: [
      'News writing',
      'Feature writing',
      'Field reporting',
      'Research and fact-checking',
      'Broadcast segment development',
    ],
  },
  {
    title: 'Broadcasting',
    items: [
      'News presentation',
      'Studio practice',
      'Radio presentation',
      'Interviewing',
      'Public speaking',
    ],
  },
  {
    title: 'Editorial Judgement',
    items: [
      'Accuracy and verification',
      'Ethical reporting',
      'Audience awareness',
      'Clear, concise communication',
      'Responsible reporting',
    ],
  },
];

export const technicalSkills: SkillGroup[] = [
  {
    title: 'Audio & Video',
    items: [
      'Audio recording',
      'Audio editing',
      'Video production',
      'Video editing',
      'Camera basics',
    ],
  },
  {
    title: 'Digital & Multimedia',
    items: [
      'Photography',
      'Multimedia production',
      'Media research',
      'Basic web publishing',
      'Social media for news',
    ],
  },
  {
    title: 'Tools',
    items: [
      'Editing software — to be confirmed',
      'Audio tools — to be confirmed',
      'Presentation software',
      'Collaborative document tools',
    ],
  },
];

export const education = {
  institution: 'MultiMedia University of Kenya',
  programme: 'Bachelors Degree in Journalism',
  level: 'Year 2',

  
 };

export const training: TrainingItem[] = [
  {
    title: 'Broadcast Journalism Internship',
    provider: 'MMU Radio 99.9 FM Kajiado',
    date: 'Current',
    note: 'Practical experience in a radio broadcasting environment.',
  },
  {
    title: 'Journalism training or workshop — Placeholder',
    provider: 'Provider to be confirmed',
    date: 'Date to be added',
    note: 'Add verified workshops, seminars or short courses only.',
    isPlaceholder: true,
  },
  {
    title: 'Broadcast production training — Placeholder',
    provider: 'Provider to be confirmed',
    date: 'Date to be added',
    note: 'Replace this entry when a relevant training record is available.',
    isPlaceholder: true,
  },
];
