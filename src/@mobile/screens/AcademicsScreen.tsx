import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  FlaskConical, 
  BookOpen, 
  Globe, 
  Clock, 
  FileCheck
} from 'lucide-react';
import { TODAY_CLASSWORK, ClassworkSubject } from '../data/parentAppData';

interface AcademicsScreenProps {
  initialTab?: 'Class Diary' | 'Homework' | 'Syllabus';
}

export const AcademicsScreen: React.FC<AcademicsScreenProps> = ({
  initialTab = 'Class Diary'
}) => {
  const [activeTab, setActiveTab] = useState<'Class Diary' | 'Homework' | 'Syllabus'>(initialTab);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);

  const dates = [
    'Today, 1 Nov 2026',
    'Yesterday, 31 Oct 2026',
    '30 Oct 2026'
  ];

  const renderSubjectIcon = (iconType: ClassworkSubject['iconType']) => {
    switch (iconType) {
      case 'math':
        return (
          <div className="w-11 h-11 rounded-xl bg-red-50 text-red-600 border border-red-100 flex items-center justify-center font-serif font-black text-xl flex-shrink-0">
            π
          </div>
        );
      case 'science':
        return (
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center flex-shrink-0">
            <FlaskConical className="w-5 h-5 stroke-[2]" />
          </div>
        );
      case 'english':
        return (
          <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-5 h-5 stroke-[2]" />
          </div>
        );
      case 'social':
        return (
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center flex-shrink-0">
            <Globe className="w-5 h-5 stroke-[2]" />
          </div>
        );
    }
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 bg-[#F8FAFC]">
      {/* 1. Segmented Pill Tabs */}
      <div className="flex items-center gap-2 p-1 bg-white rounded-full border border-gray-100 shadow-sm">
        {(['Class Diary', 'Homework', 'Syllabus'] as const).map((tab) => (
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

      {activeTab === 'Class Diary' && (
        <>
          {/* 2. Date Navigator */}
          <div className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
            <button
              onClick={() => setSelectedDateIndex(Math.min(selectedDateIndex + 1, dates.length - 1))}
              disabled={selectedDateIndex >= dates.length - 1}
              className="p-1 rounded-md text-gray-400 hover:text-gray-700 disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[13px] font-bold text-gray-800">
              {dates[selectedDateIndex]}
            </span>
            <button
              onClick={() => setSelectedDateIndex(Math.max(selectedDateIndex - 1, 0))}
              disabled={selectedDateIndex === 0}
              className="p-1 rounded-md text-gray-400 hover:text-gray-700 disabled:opacity-30"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* 3. Section Title */}
          <div>
            <h3 className="text-[15px] font-black text-gray-900 tracking-tight">
              What Today Taught
            </h3>
            <p className="text-[12px] text-gray-500 font-medium">
              Today's classwork & learning summary
            </p>
          </div>

          {/* 4. Subject Cards List */}
          <div className="space-y-2.5 pb-4">
            {TODAY_CLASSWORK.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-3 border border-gray-100 shadow-[0_2px_6px_rgba(0,0,0,0.03)] flex items-center justify-between gap-3 hover:border-gray-200 transition-all"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {renderSubjectIcon(item.iconType)}
                  <div className="min-w-0">
                    <h4 className="text-[14px] font-bold text-gray-900 truncate">
                      {item.subject}
                    </h4>
                    <p className="text-[12px] text-gray-500 font-medium leading-snug line-clamp-2">
                      {item.topic}
                    </p>
                  </div>
                </div>

                {/* Green checkmark circle */}
                <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Homework Tab View */}
      {activeTab === 'Homework' && (
        <div className="space-y-3 pb-4">
          <div>
            <h3 className="text-[15px] font-black text-gray-900 tracking-tight">
              Active Homework
            </h3>
            <p className="text-[12px] text-gray-500 font-medium">
              2 assignments pending for tomorrow
            </p>
          </div>

          <div className="bg-white rounded-2xl p-3.5 border border-red-100 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-bold">
                Due Tomorrow, 9:00 AM
              </span>
              <span className="text-[11px] font-bold text-gray-500">Mathematics</span>
            </div>
            <h4 className="text-[14px] font-bold text-gray-900">
              NCERT Ex 4.2 - Quadratic Equations
            </h4>
            <p className="text-[12px] text-gray-600">
              Solve Questions 1 to 8 in homework notebook. Show complete step-by-step factorization.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-3.5 border border-amber-100 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold">
                Due 3 Nov 2026
              </span>
              <span className="text-[11px] font-bold text-gray-500">Science</span>
            </div>
            <h4 className="text-[14px] font-bold text-gray-900">
              Respiratory System Diagram
            </h4>
            <p className="text-[12px] text-gray-600">
              Draw and label human respiratory system neatly in science practical journal.
            </p>
          </div>
        </div>
      )}

      {/* Syllabus Tab View */}
      {activeTab === 'Syllabus' && (
        <div className="space-y-3 pb-4">
          <div>
            <h3 className="text-[15px] font-black text-gray-900 tracking-tight">
              Term 2 Syllabus Progress
            </h3>
            <p className="text-[12px] text-gray-500 font-medium">
              CBSE Academic Year 2026–27
            </p>
          </div>

          {[
            { subject: 'Mathematics', done: 7, total: 10, pct: 70 },
            { subject: 'Science', done: 8, total: 12, pct: 67 },
            { subject: 'English', done: 6, total: 8, pct: 75 },
            { subject: 'Social Science', done: 9, total: 14, pct: 64 },
          ].map((sub, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-3 border border-gray-100 shadow-sm space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold text-gray-900">{sub.subject}</span>
                <span className="text-[11px] font-extrabold text-red-600">{sub.pct}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-red-600 h-full rounded-full transition-all"
                  style={{ width: `${sub.pct}%` }}
                />
              </div>
              <p className="text-[11px] text-gray-400 font-medium">
                {sub.done} of {sub.total} chapters completed
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
