import React from 'react';
import { Menu, ArrowLeft, Bell } from 'lucide-react';

interface MobileHeaderProps {
  title?: string;
  isHome?: boolean;
  onBack?: () => void;
  onOpenMenu?: () => void;
  onOpenNotifications?: () => void;
  unreadCount?: number;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  title,
  isHome = false,
  onBack,
  onOpenMenu,
  onOpenNotifications,
  unreadCount = 2
}) => {
  return (
    <header className="w-full px-4 py-2.5 flex items-center justify-between border-b border-gray-100 bg-white sticky top-0 z-30 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      {/* Left button */}
      <div className="flex items-center">
        {isHome ? (
          <button
            onClick={onOpenMenu}
            aria-label="Open Navigation Menu"
            className="w-9 h-9 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 active:scale-95 transition-all"
          >
            <Menu className="w-5 h-5 stroke-[2.2]" />
          </button>
        ) : (
          <button
            onClick={onBack}
            aria-label="Go Back"
            className="w-9 h-9 flex items-center justify-center rounded-full text-gray-800 hover:bg-gray-100 active:scale-95 transition-all"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
          </button>
        )}
      </div>

      {/* Center content */}
      <div className="flex-1 flex items-center justify-center px-2">
        {isHome ? (
          <div className="flex items-center gap-1.5 overflow-hidden max-w-[280px]">
            {/* School Crest / Logo */}
            <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
                <circle cx="50" cy="50" r="46" fill="#DC2626" />
                <circle cx="50" cy="50" r="40" fill="#FFFFFF" />
                <path d="M50 20 L25 35 L50 48 L75 35 Z" fill="#1E3A8A" />
                <path d="M35 48 L35 68 C35 76 65 76 65 68 L65 48" fill="none" stroke="#DC2626" strokeWidth="4" />
                <path d="M50 48 L50 68" stroke="#1E3A8A" strokeWidth="3" />
                <text x="50" y="86" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#DC2626">DRT</text>
              </svg>
            </div>
            <h1 className="text-[11.5px] font-black tracking-tight text-red-600 uppercase text-center leading-tight truncate font-sans">
              DRT KNOWLEDGE HUB<br />
              <span className="text-[10px] font-bold text-red-700 tracking-wider">INTERNATIONAL SCHOOL</span>
            </h1>
          </div>
        ) : (
          <h2 className="text-[17px] font-bold text-gray-900 tracking-tight text-center">
            {title}
          </h2>
        )}
      </div>

      {/* Right button */}
      <div className="flex items-center justify-end w-9">
        {isHome ? (
          <button
            onClick={onOpenNotifications}
            aria-label="Notifications"
            className="relative w-9 h-9 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 active:scale-95 transition-all"
          >
            <Bell className="w-5 h-5 text-red-600 stroke-[2]" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-600 rounded-full ring-2 ring-white"></span>
            )}
          </button>
        ) : (
          <div className="w-9" />
        )}
      </div>
    </header>
  );
};
