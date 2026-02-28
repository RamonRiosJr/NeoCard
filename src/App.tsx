import React, { useState, useEffect } from 'react';
import {
  Download,
  Share2,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
  Twitter,
  Youtube,
  QrCode,
  Sparkles,
  Palette,
  Eye,
  Wallet
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { EMPLOYEE_DATA, THEMES } from './constants';
import { generateVCard, getSeasonalTheme } from './utils/cardUtils';
import { AvatarChat } from './components/AvatarChat';
import { LeadFormModal } from './components/LeadFormModal';
import { QRModal } from './components/QRModal';
import { SocialIcon } from './components/SocialIcon';
import { ThemeType } from './types';

export default function App() {
  const [currentThemeId, setCurrentThemeId] = useState<ThemeType>('light');
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const [isQROpen, setIsQROpen] = useState(false);
  const [views, setViews] = useState(1243); // Mock view counter

  // Initialize theme
  useEffect(() => {
    const seasonal = getSeasonalTheme();
    setCurrentThemeId(seasonal);

    // Increment view counter mock
    const timer = setTimeout(() => setViews(prev => prev + 1), 2000);
    return () => clearTimeout(timer);
  }, []);

  const theme = THEMES[currentThemeId];

  return (
    <div className={`min-h-screen transition-colors duration-500 flex justify-center ${theme.colors.bg} relative overflow-hidden`}>
      {/* Background Image Overlay if present */}
      {theme.backgroundImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{ backgroundImage: `url(${theme.backgroundImage})` }}
          />
          <div
            className="absolute inset-0 z-0 bg-white"
            style={{ opacity: theme.overlayOpacity || 0.9 }}
          />
        </>
      )}

      {/* Main Container */}
      <div className="w-full max-w-md z-10 pb-20 relative">

        {/* Admin/Theme Toggle (Hidden in prod usually) */}
        <div className="absolute top-4 right-4 z-50">
          <button
            onClick={() => setShowThemeSelector(!showThemeSelector)}
            className="p-2 bg-white/50 backdrop-blur-md rounded-full shadow-sm hover:bg-white/80 transition-colors"
            title="Change Theme"
            aria-label="Toggle theme selector"
          >
            <Palette size={20} className="text-gray-700" />
          </button>

          {showThemeSelector && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl p-2 animate-in fade-in slide-in-from-top-2 border border-gray-100">
              <div className="text-xs font-semibold text-gray-400 mb-2 px-2 uppercase tracking-wider">Select Theme</div>
              {Object.values(THEMES).map(t => (
                <button
                  key={t.id}
                  onClick={() => { setCurrentThemeId(t.id); setShowThemeSelector(false); }}
                  className={`w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-gray-50 flex items-center gap-2 ${currentThemeId === t.id ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'}`}
                >
                  <div className={`w-3 h-3 rounded-full ${t.colors.accent}`} />
                  {t.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Profile Card Header */}
        <div className="pt-12 px-6 pb-6 text-center">
          <div className="relative inline-block mb-4 group">
            <div className={`absolute -inset-1 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-500 ${theme.colors.accent}`}></div>
            <img
              src={EMPLOYEE_DATA.avatarUrl}
              alt={EMPLOYEE_DATA.name}
              className="relative w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl mx-auto"
            />
            <div className="absolute bottom-1 right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-white shadow-sm" title="Online"></div>
          </div>

          <h1 className={`text-3xl font-bold mb-1 tracking-tight ${theme.colors.text}`}>
            {EMPLOYEE_DATA.name}
          </h1>
          <p className={`text-lg font-medium mb-1 ${theme.colors.textSecondary}`}>
            {EMPLOYEE_DATA.role}
          </p>
          <div className={`inline-flex items-center gap-1 text-sm font-medium px-3 py-1 rounded-full bg-opacity-10 ${theme.colors.textSecondary} bg-gray-500`}>
            <MapPin size={12} /> {EMPLOYEE_DATA.location}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 space-y-3 mb-8">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={generateVCard}
              aria-label="Save contact to phonebook"
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold shadow-lg shadow-blue-500/20 transform active:scale-95 transition-all ${theme.colors.accent} text-white`}
            >
              <Download size={18} />
              Save Contact
            </button>
            <button
              onClick={() => setIsChatOpen(true)}
              aria-label="Open AI chat assistant"
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold border-2 bg-transparent transform active:scale-95 transition-all
              ${theme.colors.border} ${theme.colors.text} hover:bg-black/5`}
            >
              <Sparkles size={18} className="text-amber-500" />
              Ask AI Agent
            </button>
          </div>

          <button
            onClick={() => setIsLeadFormOpen(true)}
            aria-label="Book a meeting form"
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold border bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-colors ${theme.colors.border} ${theme.colors.text}`}
          >
            <Calendar size={18} />
            Book a Meeting
          </button>
        </div>

        {/* Info Cards */}
        <div className="px-4 space-y-4">
          {/* Bio */}
          <div className={`p-5 rounded-2xl shadow-sm border ${theme.colors.cardBg} ${theme.colors.border}`}>
            <h2 className={`text-sm font-bold uppercase tracking-wider mb-3 opacity-70 ${theme.colors.text}`}>About</h2>
            <p className={`leading-relaxed ${theme.colors.text}`}>
              {EMPLOYEE_DATA.bio}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {EMPLOYEE_DATA.highlights.map((tag, i) => (
                <span key={i} className={`text-xs font-medium px-2 py-1 rounded-md bg-opacity-10 ${theme.colors.accent.replace('bg-', 'bg-')} ${theme.colors.accent.replace('bg-', 'text-')}`}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div className={`p-5 rounded-2xl shadow-sm border ${theme.colors.cardBg} ${theme.colors.border}`}>
            <h2 className={`text-sm font-bold uppercase tracking-wider mb-3 opacity-70 ${theme.colors.text}`}>Contact Info</h2>
            <div className="space-y-4">
              <a href={`mailto:${EMPLOYEE_DATA.email}`} className="flex items-center gap-3 group" aria-label={`Email ${EMPLOYEE_DATA.name}`}>
                <div className={`p-2 rounded-lg bg-gray-50 group-hover:bg-blue-50 transition-colors`}>
                  <Mail size={18} className="text-gray-500 group-hover:text-blue-500" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className={`text-xs font-medium ${theme.colors.textSecondary}`}>Email</p>
                  <p className={`text-sm font-medium truncate ${theme.colors.text}`}>{EMPLOYEE_DATA.email}</p>
                </div>
              </a>

              <a href={`tel:${EMPLOYEE_DATA.phone}`} className="flex items-center gap-3 group" aria-label={`Call ${EMPLOYEE_DATA.name}`}>
                <div className={`p-2 rounded-lg bg-gray-50 group-hover:bg-green-50 transition-colors`}>
                  <Phone size={18} className="text-gray-500 group-hover:text-green-500" />
                </div>
                <div className="flex-1">
                  <p className={`text-xs font-medium ${theme.colors.textSecondary}`}>Phone</p>
                  <p className={`text-sm font-medium ${theme.colors.text}`}>{EMPLOYEE_DATA.phone}</p>
                </div>
              </a>

              <a href={`https://${EMPLOYEE_DATA.website}`} target="_blank" className="flex items-center gap-3 group" aria-label={`Visit website ${EMPLOYEE_DATA.website}`}>
                <div className={`p-2 rounded-lg bg-gray-50 group-hover:bg-purple-50 transition-colors`}>
                  <Globe size={18} className="text-gray-500 group-hover:text-purple-500" />
                </div>
                <div className="flex-1">
                  <p className={`text-xs font-medium ${theme.colors.textSecondary}`}>Website</p>
                  <p className={`text-sm font-medium ${theme.colors.text}`}>{EMPLOYEE_DATA.website}</p>
                </div>
              </a>
            </div>
          </div>

          {/* Social Hub */}
          <div className="flex justify-center flex-wrap gap-4 py-4">
            {EMPLOYEE_DATA.socials.map((social, idx) => (
              <SocialIcon key={idx} type={social.platform} url={social.url} theme={theme} />
            ))}
          </div>

          {/* Apple Wallet Mock */}
          <button
            onClick={() => alert("Apple Wallet Pass generated (.pkpass)")}
            aria-label="Add contact to Apple Wallet"
            className="w-full bg-black text-white py-3 rounded-xl flex items-center justify-center gap-2 font-medium hover:bg-gray-900 transition-colors shadow-lg"
          >
            <Wallet size={18} />
            Add to Apple Wallet
          </button>

          {/* Footer / Branding */}
          <div className="text-center pt-8 pb-4">
            <div className="flex items-center justify-center gap-2 text-xs mb-4 opacity-50">
              <Eye size={12} />
              <span>{views.toLocaleString()} views</span>
            </div>

            <a
              href="https://coqui.cloud/r/NeoCard_Digital_vCard"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Powered by Coqui Cloud"
              className="inline-flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity"
            >
              <span className="text-[10px] uppercase tracking-widest font-semibold text-slate-500">Powered by</span>
              <img
                src="https://coqui.cloud/web/image/website/1/logo/Coqui%20Cloud?unique=2e0b722"
                alt="Coqui Cloud Logo"
                className="h-6 w-auto"
              />
            </a>
          </div>
        </div>

        {/* Floating Action Button (QR) */}
        <button
          onClick={() => setIsQROpen(true)}
          aria-label="Show QR Code"
          className={`fixed bottom-6 right-6 p-4 rounded-full shadow-2xl shadow-black/20 text-white z-40 transition-transform hover:scale-110 active:scale-95 ${theme.colors.accent}`}
        >
          <QrCode size={24} />
        </button>

      </div>

      {/* Modals */}
      <AvatarChat
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        theme={theme}
        employeeName={EMPLOYEE_DATA.name}
      />
      <LeadFormModal
        isOpen={isLeadFormOpen}
        onClose={() => setIsLeadFormOpen(false)}
        theme={theme}
      />
      <QRModal
        isOpen={isQROpen}
        onClose={() => setIsQROpen(false)}
        theme={theme}
      />
    </div>
  );
}
