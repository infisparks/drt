import React, { useState } from 'react';
import { ParentMobileApp, ScreenId } from './ParentMobileApp';
import { 
  Smartphone, 
  Grid, 
  Layers, 
  RotateCcw, 
  ArrowLeft,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const StandaloneMobilePage: React.FC = () => {
  // Allow toggling between the 8-Screens Showcase (matching the user image) and Single Interactive Phone
  const [viewMode, setViewMode] = useState<'showcase' | 'single'>('showcase');
  const [selectedSingleScreen, setSelectedSingleScreen] = useState<ScreenId>('home');
  const [key, setKey] = useState(0);

  const screens: { id: ScreenId; label: string; title: string }[] = [
    { id: 'home', label: 'Screen 1', title: '1. Home' },
    { id: 'academics', label: 'Screen 2', title: '2. Academics' },
    { id: 'marks', label: 'Screen 3', title: '3. Marks' },
    { id: 'fees', label: 'Screen 4', title: '4. Fee Structure' },
    { id: 'attendance', label: 'Screen 5', title: '5. Attendance' },
    { id: 'transport', label: 'Screen 6', title: '6. School Transport' },
    { id: 'notices', label: 'Screen 7', title: '7. Notices & Events' },
    { id: 'profile', label: 'Screen 8', title: '8. Student Profile' }
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#FDE8ED] via-[#FFF1F4] to-[#FDF2F5] flex flex-col items-center select-none font-sans">
      {/* Top Floating Control Bar (Minimal & Clean) */}
      <header className="w-full bg-white/80 backdrop-blur-md border-b border-rose-200/60 px-4 py-2.5 sticky top-0 z-50 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-rose-50 text-gray-700 hover:text-red-600 transition-colors text-xs font-bold border border-gray-200 shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Back to School CRM</span>
          </a>

          <div className="h-4 w-px bg-rose-200 hidden sm:block" />

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <h1 className="text-xs sm:text-sm font-black text-gray-900 tracking-tight">
              DRT Parent Mobile App • 8 Screens UX/UI
            </h1>
          </div>
        </div>

        {/* View Switcher: 8-Screens Showcase vs Interactive Simulator */}
        <div className="flex items-center gap-1 p-1 bg-white/90 rounded-xl border border-rose-200 shadow-2xs text-xs font-bold">
          <button
            onClick={() => setViewMode('showcase')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              viewMode === 'showcase'
                ? 'bg-red-600 text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>8 Screens Grid</span>
          </button>

          <button
            onClick={() => setViewMode('single')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              viewMode === 'single'
                ? 'bg-red-600 text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Interactive Phone</span>
          </button>
        </div>

        {/* Reset / Reload Demo */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setKey(k => k + 1)}
            className="p-1.5 rounded-xl bg-white hover:bg-rose-50 text-gray-600 hover:text-gray-900 transition-colors border border-gray-200 shadow-2xs"
            title="Reset Simulator"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Screen Selection Sub-Ribbon (in Single Phone mode) */}
      {viewMode === 'single' && (
        <div className="w-full bg-white/90 border-b border-rose-100 px-4 py-2 overflow-x-auto flex items-center justify-center gap-1.5">
          {screens.map((sc) => (
            <button
              key={sc.id}
              onClick={() => setSelectedSingleScreen(sc.id)}
              className={`px-3 py-1 rounded-full text-[11.5px] font-bold transition-all flex-shrink-0 ${
                selectedSingleScreen === sc.id
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-rose-50 text-gray-700 hover:bg-rose-100'
              }`}
            >
              {sc.title}
            </button>
          ))}
        </div>
      )}

      {/* Main Content Showcase */}
      <main className="w-full flex-1 p-4 sm:p-8 flex items-center justify-center overflow-auto">
        {viewMode === 'showcase' ? (
          /* 8 SCREENS SHOWCASE — Exactly matching the user's reference image */
          <div className="w-full max-w-[1580px] mx-auto py-2">
            {/* 2 Rows of 4 Mobile Phones (as in img/logo.png) */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8 justify-items-center">
              {screens.map((sc) => (
                <div key={sc.id} className="w-full max-w-[360px] flex flex-col items-center group">
                  {/* Phone Mockup Frame */}
                  <div className="w-full h-[720px] rounded-[44px] border-[8px] border-black bg-white shadow-[0_20px_50px_rgba(220,38,38,0.12)] overflow-hidden transition-transform duration-300 group-hover:scale-[1.01] relative">
                    <ParentMobileApp
                      key={`${sc.id}-${key}`}
                      forcedScreen={sc.id}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* SINGLE INTERACTIVE PHONE SIMULATOR */
          <div className="w-full max-w-[390px] h-[780px] rounded-[44px] border-[9px] border-black bg-white shadow-[0_25px_60px_rgba(220,38,38,0.2)] overflow-hidden relative my-auto">
            <ParentMobileApp
              key={key}
              forcedScreen={selectedSingleScreen}
              onScreenChange={(sc) => setSelectedSingleScreen(sc)}
            />
          </div>
        )}
      </main>
    </div>
  );
};
export default StandaloneMobilePage;
