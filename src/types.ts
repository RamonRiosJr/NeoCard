export interface SocialLink {
  platform: 'linkedin' | 'twitter' | 'github' | 'youtube' | 'instagram' | 'website' | 'email' | 'phone';
  url: string;
  label?: string;
}

export interface EmployeeProfile {
  name: string;
  role: string;
  company: string;
  bio: string;
  avatarUrl: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  socials: SocialLink[];
  highlights: string[];
}

export type ThemeType = 'light' | 'dark' | 'christmas' | 'halloween' | 'valentine' | 'pride' | 'earth' | 'birthday';

export interface ThemeConfig {
  id: ThemeType;
  label: string;
  colors: {
    bg: string;
    cardBg: string;
    text: string;
    textSecondary: string;
    accent: string;
    buttonText: string;
    border: string;
  };
  backgroundImage?: string;
  overlayOpacity?: number;
}