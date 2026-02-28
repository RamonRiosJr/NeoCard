import { EMPLOYEE_DATA } from "../constants";
import { ThemeType } from "../types";

export const generateVCard = () => {
  const nameParts = EMPLOYEE_DATA.name.split(' ');
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';
  const firstName = nameParts[0];

  let vcard = `BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName};;;
FN:${EMPLOYEE_DATA.name}
ORG:${EMPLOYEE_DATA.company}
TITLE:${EMPLOYEE_DATA.role}
TEL;TYPE=CELL:${EMPLOYEE_DATA.phone}
EMAIL:${EMPLOYEE_DATA.email}
URL:${EMPLOYEE_DATA.website}
ADR;TYPE=WORK:;;${EMPLOYEE_DATA.location};;;
NOTE:${EMPLOYEE_DATA.bio}`;

  EMPLOYEE_DATA.socials.forEach(social => {
    vcard += `\nitem${social.platform}.URL:${social.url}`;
    vcard += `\nitem${social.platform}.X-ABLabel:${social.label || social.platform}`;
  });

  vcard += '\nEND:VCARD';

  const blob = new Blob([vcard], { type: 'text/vcard' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${EMPLOYEE_DATA.name.trim().replace(/\s+/g, '_')}.vcf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export const getSeasonalTheme = (): ThemeType => {
  const date = new Date();
  const month = date.getMonth(); // 0-11
  const day = date.getDate();

  // Simple Logic for demo
  if (month === 1 && day === 14) return 'valentine';
  if (month === 11 && day >= 20) return 'christmas';
  if (month === 9 && day === 31) return 'halloween';
  if (month === 5) return 'pride'; // June
  if (month === 3 && day === 22) return 'earth';

  // Check for dark mode preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  return 'light';
};