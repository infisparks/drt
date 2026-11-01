import React, { useState } from 'react';
import { 
  ParentMobileApp, 
  ScreenId 
} from './ParentMobileApp';
import { 
  Smartphone, 
  Grid, 
  Layers, 
  ExternalLink, 
  RotateCcw,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  School
} from 'lucide-react';

export const MobilePreviewContainer: React.FC = () => {
  const [viewMode, setViewMode] = useState<'simulator' | 'all-screens'>('simulator');
  const [selectedScreen, setSelectedScreen] = useState<ScreenId>('home');
  const [key, setKey] = useState(0);

  const screens: { id: ScreenId; label: string; number: number }[] = [
    { id: 'home', label: '1. Home', number: 1 },
    { id: 'academics', label: '2. Academics', number: 2 },
    { id: 'marks', label: '3. Marks', number: 3 },
    { id: 'fees', label: '4. Fee Structure', number: 4 },
    { id: 'attendance', label: '5. Attendance', number: 5 },
    { id: 'transport', label: '6. School Transport', number: 6 },
    { id: 'notices', label: '7. Notices & Events', number: 7 },
    { id: 'profile', label: '8. Student Profile', number: 8 }
  ];

  return (
    <div className="w-full min-h-screen bg-[#F0F2F5] flex flex-col">
      {/* Top Controller Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-40 shadow-xs flex flex-wrap items-center justify-between gap-3">
        {/* Left: Branding & Title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-sm">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-[15px] font-black text-gray-900 tracking-tight">
                DRT Knowledge Hub • Parent Mobile App
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-black uppercase">
                Pixel-Perfect Mobile UX
              </span>
            </div>
            <p className="text-[12px] text-gray-500 font-medium">
              Interactive Parent Portal • CBSE Affiliation No: 1131602
            </p>
          </div>
        </div>

        {/* Center: View Switcher (Single Interactive Simulator vs All 8 Screens Grid) */}
        <div className="flex items-center gap-1.5 p-1 bg-gray-100 rounded-xl border border-gray-200 text-xs font-bold">
          <button
            onClick={() => setViewMode('simulator')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              viewMode === 'simulator'
                ? 'bg-white text-gray-900 shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Interactive Simulator</span>
          </button>

          <button
            onClick={() => setViewMode('all-screens')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              viewMode === 'all-screens'
                ? 'bg-white text-gray-900 shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>All 8 Screens Showcase</span>
          </button>
        </div>

        {/* Right: Reset State */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setKey(prev => prev + 1)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-gray-600 hover:text-gray-900 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-xs"
            title="Reset Simulator State"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>

      {/* Screen Selection Pills (only visible in simulator mode) */}
      {viewMode === 'simulator' && (
        <div className="bg-white border-b border-gray-100 px-4 py-2 overflow-x-auto flex items-center gap-1.5">
          <span className="text-[11.5px] font-bold text-gray-400 mr-1 flex-shrink-0">
            Quick Jump:
          </span>
          {screens.map((sc) => (
            <button
              key={sc.id}
              onClick={() => setSelectedScreen(sc.id)}
              className={`px-3 py-1 rounded-full text-[11.5px] font-bold transition-all flex-shrink-0 ${
                selectedScreen === sc.id
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {sc.label}
            </button>
          ))}
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 p-4 sm:p-8 flex items-center justify-center overflow-auto">
        {viewMode === 'simulator' ? (
          /* Single Interactive Phone Frame */
          <div className="w-full max-w-[390px] h-[780px] my-auto">
            <ParentMobileApp
              key={key}
              forcedScreen={selectedScreen}
              onScreenChange={(sc) => setSelectedScreen(sc)}
            />
          </div>
        ) : (
          /* All 8 Screens Grid matching the reference image layout! */
          <div className="w-full max-w-[1500px] mx-auto space-y-6">
            <div className="text-center space-y-1 mb-4">
              <h3 className="text-xl font-black text-gray-900">
                DRT Knowledge Hub Parent App — 8 Screen Architecture
              </h3>
              <p className="text-sm text-gray-500 font-medium">
                Matches reference mockup design pixel-for-pixel with active Supabase-ready data structures
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {screens.map((sc) => (
                <div key={sc.id} className="flex flex-col items-center">
                  <div className="mb-2 text-center">
                    <span className="px-2.5 py-0.5 rounded-full bg-gray-900 text-white text-[11px] font-bold">
                      {sc.label}
                    </span>
                  </div>
                  <div className="w-full max-w-[340px] h-[680px]">
                    <ParentMobileApp forcedScreen={sc.id} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default MobilePreviewContainer;
