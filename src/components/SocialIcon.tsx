import React from 'react';
import {
    Globe,
    Linkedin,
    Github,
    Twitter,
    Youtube,
    Share2
} from 'lucide-react';
import { ThemeConfig } from '../types';

interface SocialIconProps {
    type: string;
    url: string;
    theme: ThemeConfig;
}

export const SocialIcon: React.FC<SocialIconProps> = ({ type, url, theme }) => {
    const iconProps = { size: 20, className: `transition-transform hover:scale-110` };
    let Icon = Globe;
    if (type === 'linkedin') Icon = Linkedin;
    if (type === 'github') Icon = Github;
    if (type === 'twitter') Icon = Twitter;
    if (type === 'youtube') Icon = Youtube;
    if (type === 'instagram') Icon = Share2;

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Follow on ${type}`}
            className={`p-3 rounded-full border shadow-sm transition-all hover:shadow-md ${theme.colors.cardBg} ${theme.colors.text} ${theme.colors.border}`}
        >
            <Icon {...iconProps} />
        </a>
    );
};
