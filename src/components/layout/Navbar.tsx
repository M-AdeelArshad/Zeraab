import React, { useState, useEffect, useRef } from 'react';
import { useAppStore, ActivePage } from '../../store/useAppStore';
import { Menu, X, Home, Map as MapIcon, Layers, Info, Globe } from 'lucide-react';
import { Logo } from '../common/Logo';

export const Navbar: React.FC = () => {
  const { activePage, setActivePage, userSettings, updateSettings } = useAppStore();
  const isUrdu = userSettings.language === 'ur';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const navItems: { id: ActivePage; labelEn: string; labelUr: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', labelEn: 'Home', labelUr: 'ہوم', icon: Home },
    { id: 'about', labelEn: 'About', labelUr: 'تعارف', icon: Info },
    { id: 'map', labelEn: 'Map', labelUr: 'نقشہ', icon: MapIcon },
    { id: 'methodology', labelEn: 'Methodology', labelUr: 'طریقہ کار', icon: Layers },
  ];

  const toggleLanguage = () => {
    updateSettings({ language: userSettings.language === 'en' ? 'ur' : 'en' });
  };

  // Close mobile menu on page switch or language change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [activePage, userSettings.language]);

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isMobileMenuOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (id: ActivePage) => {
    setActivePage(id);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full bg-[#030712]/90 backdrop-blur-xl border-b border-white/[0.08] transition-colors"
    >
      <div className="max-w-5xl mx-auto h-14 sm:h-15 px-4 sm:px-8 flex items-center justify-between">
        {/* Brand: Single clean wordmark + icon */}
        <button
          onClick={() => {
            setActivePage('home');
            setIsMobileMenuOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-400 rounded-lg py-1 px-1 -ml-1 transition-transform active:scale-[0.98]"
        >
          <Logo size="md" className="group-hover:scale-105 transition-transform" />
          <span className="font-semibold text-base tracking-tight text-white group-hover:text-teal-400 transition-colors">
            {isUrdu ? 'زیرآب' : 'Zeraab'}
          </span>
        </button>

        {/* Desktop Navigation & Language Switch */}
        <div className="hidden md:flex items-center gap-6">
          <nav className={`flex items-center gap-6 ${isUrdu ? 'text-sm' : 'text-xs'} font-medium`}>
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`transition-colors whitespace-nowrap ${
                    isUrdu ? 'py-1.5 text-sm' : 'py-1 text-xs'
                  } relative hover:text-white ${
                    isActive ? 'text-teal-400 font-semibold' : 'text-white/60'
                  }`}
                >
                  <span>{isUrdu ? item.labelUr : item.labelEn}</span>
                  {isActive && (
                    <span className={`absolute ${isUrdu ? '-bottom-0.5' : 'bottom-0'} left-0 right-0 h-[2px] bg-teal-400 rounded-full`} />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="h-4 w-[1px] bg-white/[0.1]" />

          {/* Language Toggle: Clean segmented button */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs transition-all active:scale-[0.97]"
            title={isUrdu ? 'Switch to English' : 'اردو میں دیکھیں'}
            aria-label="Toggle language"
          >
            <span
              className={`text-[11px] font-medium ${
                userSettings.language === 'en' ? 'text-teal-400 font-semibold' : 'text-white/50'
              }`}
            >
              EN
            </span>
            <span className="text-white/20">/</span>
            <span
              className={`text-[11px] font-medium font-urdu ${
                userSettings.language === 'ur' ? 'text-teal-400 font-semibold' : 'text-white/50'
              }`}
            >
              اردو
            </span>
          </button>
        </div>

        {/* Mobile View: Language Swap Button + Menu Dropdown Toggle */}
        <div className="flex md:hidden items-center gap-2">
          {/* Always Visible Mobile Language Swap Button */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] active:bg-white/[0.15] border border-white/[0.1] text-xs transition-all active:scale-95"
            title={isUrdu ? 'Switch to English' : 'اردو میں دیکھیں'}
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5 text-teal-400" />
            <span
              className={`text-[11px] font-medium ${
                userSettings.language === 'en' ? 'text-teal-400 font-bold' : 'text-white/50'
              }`}
            >
              EN
            </span>
            <span className="text-white/20 text-[10px]">/</span>
            <span
              className={`text-[11px] font-medium font-urdu ${
                userSettings.language === 'ur' ? 'text-teal-400 font-bold' : 'text-white/50'
              }`}
            >
              اردو
            </span>
          </button>

          {/* Mobile Menu Hamburger / Close Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] active:bg-white/[0.15] border border-white/[0.1] text-white/80 hover:text-white transition-all active:scale-95 flex items-center justify-center min-w-[38px] min-h-[38px]"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? (isUrdu ? 'مینو بند کریں' : 'Close menu') : (isUrdu ? 'مینو کھولیں' : 'Open menu')}
          >
            {isMobileMenuOpen ? (
              <X className="w-4 h-4 text-teal-400" />
            ) : (
              <Menu className="w-4 h-4 text-white/90" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu Panel */}
      {isMobileMenuOpen && (
        <div
          className={`md:hidden absolute top-full left-0 w-full bg-[#030712]/95 backdrop-blur-2xl border-b border-white/[0.1] shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200 ${
            isUrdu ? 'rtl text-right' : 'ltr text-left'
          }`}
        >
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all text-sm font-medium min-h-[44px] ${
                    isActive
                      ? 'bg-teal-400/10 text-teal-400 font-semibold border border-teal-400/25 shadow-sm'
                      : 'text-white/70 hover:text-white hover:bg-white/[0.04] active:bg-white/[0.08]'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-teal-400' : 'text-white/40'}`} />
                  <span className="flex-1">{isUrdu ? item.labelUr : item.labelEn}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Language Switcher Banner inside Dropdown */}
          <div className="mt-3 pt-3 border-t border-white/[0.08] flex items-center justify-between px-1">
            <span className="text-xs text-white/50 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-teal-400/80" />
              <span>{isUrdu ? 'زبان تبدیل کریں' : 'Language'}</span>
            </span>

            <div className="flex items-center gap-1 bg-white/[0.05] p-1 rounded-lg border border-white/[0.08]">
              <button
                onClick={() => updateSettings({ language: 'en' })}
                className={`px-3 py-1 text-xs rounded-md font-medium transition-all ${
                  userSettings.language === 'en'
                    ? 'bg-teal-400 text-[#030712] font-semibold shadow-sm'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                English
              </button>
              <button
                onClick={() => updateSettings({ language: 'ur' })}
                className={`px-3 py-1 text-xs rounded-md font-medium font-urdu transition-all ${
                  userSettings.language === 'ur'
                    ? 'bg-teal-400 text-[#030712] font-semibold shadow-sm'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                اردو
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
