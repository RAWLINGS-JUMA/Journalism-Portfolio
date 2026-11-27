export interface SocialLink {
  label: string;
  url: string;
  icon: 'linkedin' | 'youtube' | 'instagram' | 'x' | 'facebook' | 'tiktok' | 'email';
}

const whatsappMessage =
  'Hello! I visited your portfolio and would like to connect regarding a potential opportunity.';

/**
 * Verified details only. Fill the remaining blanks with confirmed information
 * before publishing; do not invent qualifications, awards or contact details.
 *
 * Social links with an empty URL render as clearly styled placeholders.
 * Add the real URL here to turn them into working buttons.
 */
export const site = {
  name: 'Darvin Darwin',
  shortName: 'Darvin Darwin',
  role: 'Broadcast Journalism Intern',
  tagline: 'Reporting That Informs. Voices That Inspire.',
  intro:
    'Broadcast journalism intern at MMU Radio 99.9 FM Kajiado, developing a practical voice across radio and digital platforms.',
  location: 'Kajiado',
  availability: 'Intern at MMU Radio 99.9 FM Kajiado',
  email: '' as string,
  phone: '+254 758 517136' as string,
  cvUrl: './assets/documents/cv-placeholder.pdf',
  portrait: './assets/images/portrait.jpeg',
  logo: './assets/images/logo.jpeg',

  /**
   * Verified WhatsApp link. The Kenyan number 0758 517 136 is stored in
   * international format as 254758517136 and opens with a prefilled message.
   */
  whatsappUrl: `https://wa.me/254758517136?text=${encodeURIComponent(whatsappMessage)}`,

  social: [
    {
      label: 'YouTube',
      url: 'https://www.youtube.com/@Davinechepkwemboi',
      icon: 'youtube',
    },
    { label: 'X', url: '', icon: 'x' },
    { label: 'Instagram', url: 'https://www.instagram.com/davinedarwin?fqnt=dTU3d2hrZ3JlM2Vu', icon: 'instagram' },
    { label: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61572912788139', icon: 'facebook' },
    { label: 'TikTok', url: 'https://www.tiktok.com/@davinechepkwemboi', icon: 'tiktok' },
  ] satisfies SocialLink[],
} as const;
