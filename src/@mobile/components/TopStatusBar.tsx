import React from 'react';
import { Wifi } from 'lucide-react';

interface TopStatusBarProps {
  darkText?: boolean;
}

export const TopStatusBar: React.FC<TopStatusBarProps> = ({ darkText = true }) => {
  const textColor = darkText ? 'text-gray-900' : 'text-white';

  return (
    <div className={`w-full pt-3 px-6 pb-2 flex items-center justify-between select-none ${textColor} text-xs font-semibold tracking-tight relative z-20`}>
      {/* Clock */}
      <span className="text-[13px] font-bold tracking-tight">9:41</span>

      {/* Dynamic Island / Notch pill */}
      <div className="absolute left-1/2 -translate-x-1/2 top-2.5 w-24 h-6 bg-black rounded-full flex items-center justify-end px-2 gap-1.5 shadow-sm">
        <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-gray-800" />
        <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
      </div>

      {/* Cellular, WiFi & Battery icons */}
      <div className="flex items-center gap-1.5">
        {/* Cellular bars */}
        <div className="flex items-end gap-[1.5px] h-3">
          <span className="w-[2.5px] h-1.5 bg-current rounded-sm"></span>
          <span className="w-[2.5px] h-2 bg-current rounded-sm"></span>
          <span className="w-[2.5px] h-2.5 bg-current rounded-sm"></span>
          <span className="w-[2.5px] h-3 bg-current rounded-sm"></span>
        </div>

        {/* WiFi */}
        <Wifi className="w-3.5 h-3.5 stroke-[2.2]" />

        {/* Battery */}
        <div className="flex items-center">
          <div className="w-5 h-2.5 border-[1.5px] border-current rounded-[4px] p-[1.5px] flex items-center">
            <div className="w-full h-full bg-current rounded-[1px]"></div>
          </div>
          <div className="w-[1.5px] h-1 bg-current rounded-r-[1px] ml-[0.5px]"></div>
        </div>
      </div>
    </div>
  );
};
