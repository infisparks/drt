import React from 'react';
import { X, Bell, Bus, Calendar, FileText, CheckCircle2 } from 'lucide-react';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: 'academics' | 'fees' | 'attendance' | 'more', screen?: string) => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose,
  onNavigateTab
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: '1',
      icon: Bus,
      color: 'bg-emerald-50 text-emerald-600',
      title: 'School Bus Approaching',
      desc: 'Bus No. MH 04 AB 3271 will reach Kausa Circle in ~6 minutes.',
      time: 'Just now',
      action: () => onNavigateTab('more', 'transport')
    },
    {
      id: '2',
      icon: FileText,
      color: 'bg-red-50 text-red-600',
      title: 'Half-Yearly Exam Schedule Released',
      desc: 'Exam commences from 15 Nov. Review date sheet in notices.',
      time: '2 hours ago',
      action: () => onNavigateTab('more', 'notices')
    },
    {
      id: '3',
      icon: Calendar,
      color: 'bg-blue-50 text-blue-600',
      title: 'Term Fee Due Notice',
      desc: 'Term fee of ₹18,500 is due on 10 Nov 2026. Pay online to avoid late fee.',
      time: '1 day ago',
      action: () => onNavigateTab('fees')
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-sm max-h-[85vh] bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-gray-100 flex flex-col">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
              <Bell className="w-4 h-4 stroke-[2]" />
            </div>
            <div>
              <h3 className="text-[16px] font-black text-gray-900">Notifications</h3>
              <p className="text-[11.5px] text-gray-500 font-medium">3 recent updates</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-3 space-y-2.5">
          {notifications.map((n) => {
            const Icon = n.icon;
            return (
              <button
                key={n.id}
                onClick={() => {
                  n.action();
                  onClose();
                }}
                className="w-full bg-white p-3 rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex items-start gap-3 text-left hover:border-red-200 transition-all"
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${n.color}`}>
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[13px] font-bold text-gray-900 truncate">{n.title}</h4>
                    <span className="text-[10px] text-gray-400 font-medium flex-shrink-0">{n.time}</span>
                  </div>
                  <p className="text-[11.5px] text-gray-500 mt-0.5 leading-snug">{n.desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-[13px] font-bold text-gray-700 transition-colors flex-shrink-0"
        >
          Dismiss All
        </button>
      </div>
    </div>
  );
};
