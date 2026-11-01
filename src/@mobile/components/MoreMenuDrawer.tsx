import React from 'react';
import { 
  X, 
  Bus, 
  Megaphone, 
  User, 
  PhoneCall, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  ShieldCheck,
  FileText
} from 'lucide-react';

interface MoreMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectScreen: (screen: 'transport' | 'notices' | 'profile' | 'marks') => void;
}

export const MoreMenuDrawer: React.FC<MoreMenuDrawerProps> = ({
  isOpen,
  onClose,
  onSelectScreen
}) => {
  if (!isOpen) return null;

  const menuItems = [
    {
      id: 'transport',
      title: 'School Transport & Bus GPS',
      subtitle: 'Live bus tracking, route stops & ETA',
      icon: Bus,
      color: 'bg-amber-50 text-amber-600',
      action: () => onSelectScreen('transport')
    },
    {
      id: 'notices',
      title: 'Notices & Circulars',
      subtitle: 'Official school updates & exam dates',
      icon: Megaphone,
      color: 'bg-red-50 text-red-600',
      action: () => onSelectScreen('notices')
    },
    {
      id: 'profile',
      title: 'Student Profile & Digital ID',
      subtitle: 'Official student identity card & contacts',
      icon: User,
      color: 'bg-rose-50 text-rose-600',
      action: () => onSelectScreen('profile')
    },
    {
      id: 'marks',
      title: 'Exam Marks & Report Cards',
      subtitle: 'Half-yearly results, grades & ranks',
      icon: FileText,
      color: 'bg-emerald-50 text-emerald-600',
      action: () => onSelectScreen('marks')
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-sm max-h-[85vh] bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-gray-100 flex flex-col">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 flex-shrink-0">
          <div>
            <h3 className="text-[16px] font-black text-gray-900">Explore Services</h3>
            <p className="text-[11.5px] text-gray-500 font-medium">DRT Knowledge Hub Parent Services</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-3 space-y-2 text-[13px]">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  item.action();
                  onClose();
                }}
                className="w-full p-3 rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex items-center justify-between text-left hover:border-red-200 active:scale-[0.99] transition-all bg-white"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[13.5px] font-bold text-gray-900">{item.title}</h4>
                    <p className="text-[11.5px] text-gray-500 font-medium">{item.subtitle}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </button>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-[13px] font-bold text-gray-700 transition-colors flex-shrink-0"
        >
          Close
        </button>
      </div>
    </div>
  );
};
