import React from 'react';
import { Home, BookOpen, Wallet, CalendarCheck, MoreHorizontal } from 'lucide-react';

export type MobileTabKey = 'home' | 'academics' | 'fees' | 'attendance' | 'more';

interface BottomNavBarProps {
  activeTab: MobileTabKey;
  onTabChange: (tab: MobileTabKey) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onTabChange
}) => {
  const tabs = [
    { key: 'home' as MobileTabKey, label: 'Home', icon: Home },
    { key: 'academics' as MobileTabKey, label: 'Academics', icon: BookOpen },
    { key: 'fees' as MobileTabKey, label: 'Fees', icon: Wallet },
    { key: 'attendance' as MobileTabKey, label: 'Attendance', icon: CalendarCheck },
    { key: 'more' as MobileTabKey, label: 'More', icon: MoreHorizontal }
  ];

  return (
    <nav className="w-full bg-white border-t border-gray-100 shadow-[0_-2px_10px_rgba(0,0,0,0.03)] px-3 pt-2 pb-5 flex flex-col items-center sticky bottom-0 z-30 select-none">
      <div className="w-full flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          const Icon = tab.icon;

          return (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className="flex flex-col items-center justify-center flex-1 py-0.5 group transition-transform active:scale-95"
            >
              {/* Icon Container: In active state, red filled rounded container */}
              <div
                className={`w-12 h-7.5 flex items-center justify-center rounded-2xl transition-all duration-200 ${
                  isActive
                    ? 'bg-red-600 text-white shadow-[0_2px_8px_rgba(220,38,38,0.35)] scale-105'
                    : 'text-gray-400 group-hover:text-gray-600'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.4]' : 'stroke-[1.8]'}`} />
              </div>

              {/* Label */}
              <span
                className={`text-[10px] mt-1 font-medium transition-colors ${
                  isActive ? 'text-red-600 font-bold' : 'text-gray-500'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* iPhone Home Indicator bar */}
      <div className="w-32 h-1 bg-gray-300 rounded-full mt-2.5 opacity-80" />
    </nav>
  );
};
