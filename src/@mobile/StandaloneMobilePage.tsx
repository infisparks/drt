import React, { useState, useEffect } from 'react';
import { ParentMobileApp, ScreenId } from './ParentMobileApp';
import { Layers, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';

export const StandaloneMobilePage: React.FC = () => {
  // Query param support (e.g. /mobile?screen=marks)
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

  const [activeScreen, setActiveScreen] = useState<ScreenId>(getInitialScreen);
  const [showToolbar, setShowToolbar] = useState(true);

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
    <div className="w-full min-h-screen bg-[#F8FAFC] flex flex-col items-center">
      {/* Discreet Prototype Screen Switcher Toolbar (Collapsible) */}
      <div className="w-full max-w-md sticky top-0 z-50 select-none">
        <div className="bg-gray-900/90 backdrop-blur-md text-white px-3 py-1.5 flex items-center justify-between text-xs border-b border-gray-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-[11px] text-gray-200">Prototype Screen:</span>
            <span className="font-extrabold text-[11px] text-red-400 capitalize">
              {activeScreen}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowToolbar(!showToolbar)}
              className="p-1 rounded text-gray-400 hover:text-white"
              title={showToolbar ? "Hide switcher" : "Show switcher"}
            >
              {showToolbar ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Collapsible Screen Switcher Pills */}
        {showToolbar && (
          <div className="bg-gray-900/95 backdrop-blur-md px-2.5 py-1.5 flex items-center gap-1 overflow-x-auto border-b border-gray-800">
            {screens.map((sc) => (
              <button
                key={sc.id}
                onClick={() => setActiveScreen(sc.id)}
                className={`px-2 py-0.5 rounded-md text-[10.5px] font-bold whitespace-nowrap transition-all ${
                  activeScreen === sc.id
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {sc.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Pure Mobile Screen — NO artificial phone frame, NO bezels, NO black borders */}
      <div className="w-full flex-1 flex flex-col">
        <ParentMobileApp
          forcedScreen={activeScreen}
          onScreenChange={(sc) => setActiveScreen(sc)}
        />
      </div>
    </div>
  );
};
export default StandaloneMobilePage;
