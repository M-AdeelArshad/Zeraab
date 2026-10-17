import React, { useEffect } from 'react';
import { useAppStore } from './store/useAppStore';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { MapPage } from './pages/MapPage';
import { MethodologyPage } from './pages/MethodologyPage';
import { AboutPage } from './pages/AboutPage';
import { SettingsPage } from './pages/SettingsPage';

export default function App() {
  const { activePage, initApp, userSettings } = useAppStore();

  useEffect(() => {
    initApp();
  }, [initApp]);

  useEffect(() => {
    const isUrdu = userSettings.language === 'ur';
    document.documentElement.lang = userSettings.language;
    document.documentElement.dir = isUrdu ? 'rtl' : 'ltr';
    if (isUrdu) {
      document.documentElement.classList.add('urdu-mode', 'font-urdu');
      document.body.classList.add('urdu-mode', 'font-urdu');
    } else {
      document.documentElement.classList.remove('urdu-mode', 'font-urdu');
      document.body.classList.remove('urdu-mode', 'font-urdu');
    }
  }, [userSettings.language]);

  return (
    <div
      dir={userSettings.language === 'ur' ? 'rtl' : 'ltr'}
      className={`flex flex-col bg-dashboard-gradient text-white selection:bg-[#00D4C8]/30 selection:text-[#00D4C8] relative overflow-hidden ${
        activePage === 'map' ? 'h-screen w-screen' : 'min-h-screen w-full'
      } ${userSettings.language === 'ur' ? 'font-urdu' : ''}`}
    >
      {/* Ambient Lively Background Glow Orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#00D4C8]/10 rounded-full blur-[140px] pointer-events-none animate-float-glow" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#1599E1]/10 rounded-full blur-[140px] pointer-events-none animate-float-glow" style={{ animationDelay: '3s' }} />
      <div className="absolute bottom-1/4 left-10 w-[550px] h-[550px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none animate-float-glow" style={{ animationDelay: '5s' }} />

      {/* 3-Zone Clean Header Contract */}
      <Navbar />

      {/* Main Content Area with Smooth Fade & Slide In Transition */}
      <div className={`flex-1 flex flex-col relative z-10 transition-all duration-300 ease-out ${activePage === 'map' ? 'overflow-hidden h-[calc(100dvh-3.5rem)] sm:h-[calc(100dvh-3.75rem)]' : ''}`}>
        {activePage === 'home' && <div className="animate-in fade-in slide-in-from-bottom-2 duration-300"><HomePage /></div>}
        {activePage === 'map' && <div className="animate-in fade-in duration-300 flex-1 flex flex-col h-full overflow-hidden"><MapPage /></div>}
        {activePage === 'methodology' && <div className="animate-in fade-in slide-in-from-bottom-2 duration-300"><MethodologyPage /></div>}
        {activePage === 'about' && <div className="animate-in fade-in slide-in-from-bottom-2 duration-300"><AboutPage /></div>}
        {activePage === 'settings' && <div className="animate-in fade-in slide-in-from-bottom-2 duration-300"><SettingsPage /></div>}
      </div>

      {/* Footer (Rendered on non-map pages or bottom of view) */}
      <div className="relative z-10">
        {activePage !== 'map' && <Footer />}
      </div>
    </div>
  );
}
