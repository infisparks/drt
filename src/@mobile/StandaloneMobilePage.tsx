import React, { useState, useEffect } from 'react';
import { ParentMobileApp, ScreenId } from './ParentMobileApp';
import { 
  Smartphone, 
  ExternalLink, 
  RotateCcw, 
  ChevronRight, 
  ArrowLeft,
  Grid,
  Maximize2
} from 'lucide-react';

export const StandaloneMobilePage: React.FC = () => {
  // Check if initial screen is specified in query (e.g. /mobile?screen=marks)
  const getInitialScreen = (): ScreenId => {
    const params = new URLSearchParams(window.location.search);
    const screenParam = params.get('screen') as ScreenId;
    const validScreens: ScreenId[] = [
      'home', 'academics', 'marks', 'fees', 
      'attendance', 'transport', 'notices', 'profile'
    ];
    if (screenParam && validScreens.includes(screenParam)) {
      return screenParam;
    }
    return 'home';
  };

  const [currentScreen, setCurrentScreen] = useState<ScreenId>(getInitialScreen);
  const [key, setKey] = useState(0);

  const screens: { id: ScreenId; label: string }[] = [
    { id: 'home', label: '1. Home' },
    { id: 'academics', label: '2. Academics' },
    { id: 'marks', label: '3. Marks' },
    { id: 'fees', label: '4. Fees' },
    { id: 'attendance', label: '5. Attendance' },
    { id: 'transport', label: '6. Transport' },
    { id: 'notices', label: '7. Notices' },
    { id: 'profile', label: '8. Profile' }
  ];

  return (
    <div className="w-screen h-[100dvh] bg-[#0F172A] flex flex-col items-center justify-center overflow-hidden font-sans">
      {/* Sleek Top Navigation Ribbon (visible on desktop so you can quickly switch screens or return to CRM) */}
      <div className="w-full bg-[#1E293B]/90 backdrop-blur-md border-b border-slate-700/60 px-4 py-2 hidden sm:flex items-center justify-between text-white text-xs z-50 flex-shrink-0">
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-[11.5px] font-bold border border-slate-700"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to School CRM</span>
          </a>

          <div className="h-4 w-px bg-slate-700" />

          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold text-[12px] text-slate-200">
              DRT Parent Mobile App (Live Standalone)
            </span>
          </div>
        </div>

        {/* Quick jump pills */}
        <div className="flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-700/80">
          {screens.map((sc) => (
            <button
              key={sc.id}
              onClick={() => setCurrentScreen(sc.id)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                currentScreen === sc.id
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {sc.label}
            </button>
          ))}
        </div>

        {/* Reset button */}
        <button
          onClick={() => setKey(k => k + 1)}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          title="Reset Mobile App"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Standalone Mobile App Container */}
      <div className="w-full h-full sm:h-[calc(100dvh-54px)] flex items-center justify-center sm:p-4 overflow-hidden">
        {/* On mobile device: 100% full screen. On desktop: framed phone view */}
        <div className="w-full h-full sm:w-[412px] sm:h-[870px] sm:max-h-[calc(100dvh-40px)] bg-white sm:rounded-[44px] sm:border-[9px] sm:border-slate-950 sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] flex flex-col overflow-hidden relative">
          <ParentMobileApp
            key={key}
            forcedScreen={currentScreen}
            onScreenChange={(sc) => setCurrentScreen(sc)}
          />
        </div>
      </div>
    </div>
  );
};
export default StandaloneMobilePage;
