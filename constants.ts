import { EmployeeProfile, ThemeConfig, ThemeType } from './types';

export const EMPLOYEE_DATA: EmployeeProfile = {
  name: "Jordan Lee",
  role: "Senior Product Designer",
  company: "Creative Studio",
  bio: "Crafting digital experiences that merge functionality with aesthetics. Specialized in design systems, accessible UI, and user-centric interfaces.",
  avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400", 
  location: "San Francisco, CA",
  email: "jordan@example.com",
  phone: "+1 (555) 000-0000",
  website: "www.example.com",
  highlights: [
    "Product Strategy",
    "UI/UX Design",
    "Frontend Development"
  ],
  socials: [
    { platform: 'linkedin', url: 'https://linkedin.com', label: 'LinkedIn' },
    { platform: 'github', url: 'https://github.com', label: 'GitHub' },
    { platform: 'twitter', url: 'https://twitter.com', label: 'Twitter' },
    { platform: 'instagram', url: 'https://instagram.com', label: 'Instagram' }
  ]
};

export const THEMES: Record<ThemeType, ThemeConfig> = {
  light: {
    id: 'light',
    label: 'Professional Light',
    colors: {
      bg: 'bg-gray-100',
      cardBg: 'bg-white',
      text: 'text-slate-900',
      textSecondary: 'text-slate-500',
      accent: 'bg-blue-600',
      buttonText: 'text-white',
      border: 'border-gray-200'
    }
  },
  dark: {
    id: 'dark',
    label: 'Midnight Pro',
    colors: {
      bg: 'bg-slate-900',
      cardBg: 'bg-slate-800',
      text: 'text-white',
      textSecondary: 'text-slate-400',
      accent: 'bg-indigo-500',
      buttonText: 'text-white',
      border: 'border-slate-700'
    }
  },
  christmas: {
    id: 'christmas',
    label: 'Holiday Season',
    colors: {
      bg: 'bg-red-50',
      cardBg: 'bg-white',
      text: 'text-slate-900',
      textSecondary: 'text-slate-600',
      accent: 'bg-red-600',
      buttonText: 'text-white',
      border: 'border-red-100'
    },
    backgroundImage: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=80&w=1000',
    overlayOpacity: 0.9
  },
  halloween: {
    id: 'halloween',
    label: 'Spooky Vibes',
    colors: {
      bg: 'bg-orange-950',
      cardBg: 'bg-slate-900',
      text: 'text-orange-50',
      textSecondary: 'text-orange-200',
      accent: 'bg-orange-600',
      buttonText: 'text-white',
      border: 'border-orange-900'
    },
    backgroundImage: 'https://images.unsplash.com/photo-1508361001413-7a9dca21d08a?auto=format&fit=crop&q=80&w=1000',
    overlayOpacity: 0.95
  },
  valentine: {
    id: 'valentine',
    label: 'Valentine',
    colors: {
      bg: 'bg-pink-50',
      cardBg: 'bg-white',
      text: 'text-pink-950',
      textSecondary: 'text-pink-600',
      accent: 'bg-pink-500',
      buttonText: 'text-white',
      border: 'border-pink-100'
    }
  },
  pride: {
    id: 'pride',
    label: 'Pride',
    colors: {
      bg: 'bg-gradient-to-br from-red-100 via-yellow-100 to-purple-100',
      cardBg: 'bg-white',
      text: 'text-slate-900',
      textSecondary: 'text-slate-600',
      accent: 'bg-gradient-to-r from-red-500 via-green-500 to-blue-500',
      buttonText: 'text-white',
      border: 'border-purple-100'
    }
  },
  earth: {
    id: 'earth',
    label: 'Earth Day',
    colors: {
      bg: 'bg-green-50',
      cardBg: 'bg-white',
      text: 'text-green-950',
      textSecondary: 'text-green-700',
      accent: 'bg-green-600',
      buttonText: 'text-white',
      border: 'border-green-200'
    }
  },
  birthday: {
    id: 'birthday',
    label: 'Birthday Bash',
    colors: {
      bg: 'bg-yellow-50',
      cardBg: 'bg-white',
      text: 'text-purple-900',
      textSecondary: 'text-purple-600',
      accent: 'bg-purple-600',
      buttonText: 'text-white',
      border: 'border-yellow-200'
    }
  }
};