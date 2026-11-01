import React, { useState } from 'react';
import { 
  Megaphone, 
  FileText, 
  Calendar, 
  Palmtree, 
  ChevronRight,
  Sparkles,
  FileSignature
} from 'lucide-react';
import { NOTICES_LIST, NoticeItem } from '../data/parentAppData';

interface NoticesScreenProps {
  onSelectNotice?: (notice: NoticeItem) => void;
}

export const NoticesScreen: React.FC<NoticesScreenProps> = ({ onSelectNotice }) => {
  const [activeTab, setActiveTab] = useState<'Notices' | 'Events' | 'Consents'>('Notices');

  const renderNoticeIcon = (category: NoticeItem['category']) => {
    switch (category) {
      case 'exam':
        return (
          <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
            <Megaphone className="w-5 h-5 stroke-[2]" />
          </div>
        );
      case 'compliance':
        return (
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5 stroke-[2]" />
          </div>
        );
      case 'sports':
        return (
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
            <Calendar className="w-5 h-5 stroke-[2]" />
          </div>
        );
      case 'holiday':
        return (
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
            <Palmtree className="w-5 h-5 stroke-[2]" />
          </div>
        );
    }
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3.5 bg-[#F8FAFC]">
      {/* 1. Segmented Pill Tabs */}
      <div className="flex items-center gap-2 p-1 bg-white rounded-full border border-gray-100 shadow-sm">
        {(['Notices', 'Events', 'Consents'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-1.5 px-3 rounded-full text-[12px] font-bold transition-all ${
              activeTab === tab
                ? 'bg-[#DC2626] text-white shadow-[0_2px_6px_rgba(220,38,38,0.3)]'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Notices' && (
        <div className="space-y-2.5 pb-4">
          {NOTICES_LIST.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectNotice && onSelectNotice(item)}
              className="w-full bg-white rounded-2xl p-3.5 border border-gray-100 shadow-[0_2px_6px_rgba(0,0,0,0.03)] flex items-center justify-between text-left hover:border-red-100 active:scale-[0.99] transition-all group"
            >
              <div className="flex items-start gap-3 min-w-0 pr-2">
                {renderNoticeIcon(item.category)}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-[13.5px] font-bold text-gray-900 truncate">
                      {item.title}
                    </h4>
                    {item.isNew && (
                      <span className="px-1.5 py-0.2 rounded-full bg-red-600 text-white text-[9.5px] font-extrabold uppercase tracking-wide">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-[12px] text-gray-500 font-medium leading-snug truncate mt-0.5">
                    {item.subtitle}
                  </p>
                  <span className="text-[11px] text-gray-400 font-medium block mt-1">
                    {item.date}
                  </span>
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-red-600 transition-colors flex-shrink-0" />
            </button>
          ))}
        </div>
      )}

      {/* Events Tab */}
      {activeTab === 'Events' && (
        <div className="space-y-3 pb-4">
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm space-y-2">
            <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-600 text-[10.5px] font-bold">
              Upcoming Celebration
            </span>
            <h4 className="text-[14px] font-bold text-gray-900">
              Children's Day Carnival 2026
            </h4>
            <p className="text-[12px] text-gray-500">
              Date: 14 Nov 2026 • School Main Ground • Food stalls & fun activities.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm space-y-2">
            <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[10.5px] font-bold">
              Parent-Teacher Meeting
            </span>
            <h4 className="text-[14px] font-bold text-gray-900">
              Term 1 Post-Exam PTM
            </h4>
            <p className="text-[12px] text-gray-500">
              Date: 28 Nov 2026 • Timings: 9:00 AM – 1:00 PM • Slot booking opens soon.
            </p>
          </div>
        </div>
      )}

      {/* Consents Tab */}
      {activeTab === 'Consents' && (
        <div className="space-y-3 pb-4">
          <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold flex items-center gap-1">
                <FileSignature className="w-3 h-3" /> Action Required
              </span>
              <span className="text-[11px] text-red-600 font-bold">Due 8 Nov</span>
            </div>
            <h4 className="text-[14px] font-bold text-gray-900">
              Science Center Field Trip Consent Slip
            </h4>
            <p className="text-[12px] text-gray-500">
              Grade 9 educational visit to Nehru Science Centre, Worli on 18 Nov 2026.
            </p>
            <button className="w-full py-2 bg-red-600 text-white rounded-xl text-[12px] font-bold shadow-sm hover:bg-red-700 transition-colors">
              Digitally Sign Consent
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
