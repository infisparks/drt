import React from 'react';
import { 
  ChevronDown, 
  Check, 
  ClipboardList, 
  BookMarked, 
  Calendar, 
  FileText, 
  Wallet, 
  Palmtree,
  Lock,
  ArrowRight
} from 'lucide-react';
import { StudentProfileData, ParentData } from '../data/parentAppData';

interface HomeScreenProps {
  parent: ParentData;
  currentStudent: StudentProfileData;
  siblingStudent: StudentProfileData;
  onSwitchStudent: () => void;
  onNavigateTab: (tab: 'academics' | 'fees' | 'attendance' | 'more', subSection?: string) => void;
  onOpenMarks: () => void;
  onOpenLeaveModal: () => void;
  onOpenTimetableModal: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  parent,
  currentStudent,
  siblingStudent,
  onSwitchStudent,
  onNavigateTab,
  onOpenMarks,
  onOpenLeaveModal,
  onOpenTimetableModal
}) => {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 bg-[#F8FAFC]">
      {/* 1. Parent Greeting */}
      <div className="pt-1">
        <p className="text-[13px] text-gray-500 font-medium">Good Afternoon,</p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <h2 className="text-[20px] font-extrabold text-gray-900 tracking-tight">
            {parent.name}
          </h2>
          <span className="text-xl">👋</span>
        </div>
        <p className="text-[12px] text-gray-400 font-medium">{parent.title}</p>
      </div>

      {/* 2. Student Switcher Card */}
      <div className="bg-white rounded-2xl p-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 flex items-center justify-between">
        <button
          onClick={onSwitchStudent}
          className="flex items-center gap-3 flex-1 text-left group"
        >
          {/* Avatar with circle border */}
          <div className="relative">
            <img
              src={currentStudent.avatar}
              alt={currentStudent.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-red-100 shadow-sm"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="text-[14px] font-bold text-gray-900 truncate">
                {currentStudent.name}
              </h3>
              <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-red-600 transition-colors" />
            </div>
            <p className="text-[12px] text-gray-500 font-medium">
              {currentStudent.grade} – {currentStudent.section}
            </p>
          </div>
        </button>

        {/* Sibling Avatar Shortcut */}
        <div className="flex items-center pl-2 border-l border-gray-100">
          <button
            onClick={onSwitchStudent}
            title={`Switch to ${siblingStudent.name}`}
            className="relative group p-0.5 rounded-full hover:scale-105 transition-transform"
          >
            <img
              src={siblingStudent.avatar}
              alt={siblingStudent.name}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-200 group-hover:ring-red-500 opacity-90 transition-all"
            />
          </button>
        </div>
      </div>

      {/* 3. Dual Status Cards (Solid Cherry Red) */}
      <div className="grid grid-cols-2 gap-3">
        {/* Today's Status */}
        <div className="bg-[#DC2626] rounded-2xl p-3.5 text-white shadow-[0_4px_14px_rgba(220,38,38,0.28)] flex flex-col justify-between h-24 relative overflow-hidden">
          <span className="text-[11.5px] font-medium text-white/85">Today's Status</span>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-[20px] font-extrabold tracking-tight">Present</span>
            <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center shadow-sm">
              <Check className="w-4 h-4 text-white stroke-[3]" />
            </div>
          </div>
        </div>

        {/* Attendance Percentage */}
        <div className="bg-[#DC2626] rounded-2xl p-3.5 text-white shadow-[0_4px_14px_rgba(220,38,38,0.28)] flex flex-col justify-between h-24 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11.5px] font-medium text-white/85">Attendance</span>
            <Lock className="w-3.5 h-3.5 text-white/70" />
          </div>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-[22px] font-extrabold tracking-tight">92%</span>
            {/* Circular progress gauge */}
            <div className="relative w-8 h-8 flex items-center justify-center">
              <svg className="w-8 h-8 -rotate-90">
                <circle
                  cx="16"
                  cy="16"
                  r="13"
                  className="stroke-red-900/60"
                  strokeWidth="3"
                  fill="transparent"
                />
                <circle
                  cx="16"
                  cy="16"
                  r="13"
                  className="stroke-emerald-400"
                  strokeWidth="3"
                  fill="transparent"
                  strokeDasharray={81.68}
                  strokeDashoffset={81.68 * (1 - 0.92)}
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Quick Action Grid (3 x 2 Grid) */}
      <div className="grid grid-cols-3 gap-2.5">
        {/* Class Diary */}
        <button
          onClick={() => onNavigateTab('academics', 'Class Diary')}
          className="bg-white rounded-2xl p-3 border border-gray-100 shadow-[0_2px_6px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center text-center hover:border-red-200 active:scale-95 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600 mb-1.5 group-hover:scale-110 transition-transform">
            <ClipboardList className="w-5 h-5 stroke-[2]" />
          </div>
          <span className="text-[12px] font-bold text-gray-800">Class Diary</span>
        </button>

        {/* Homework (with red badge 2) */}
        <button
          onClick={() => onNavigateTab('academics', 'Homework')}
          className="relative bg-white rounded-2xl p-3 border border-gray-100 shadow-[0_2px_6px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center text-center hover:border-red-200 active:scale-95 transition-all group"
        >
          {/* Badge */}
          <span className="absolute top-2 right-3 w-4 h-4 bg-red-600 text-white rounded-full text-[10px] font-extrabold flex items-center justify-center ring-2 ring-white">
            2
          </span>
          <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600 mb-1.5 group-hover:scale-110 transition-transform">
            <BookMarked className="w-5 h-5 stroke-[2]" />
          </div>
          <span className="text-[12px] font-bold text-gray-800">Homework</span>
        </button>

        {/* Timetable */}
        <button
          onClick={onOpenTimetableModal}
          className="bg-white rounded-2xl p-3 border border-gray-100 shadow-[0_2px_6px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center text-center hover:border-red-200 active:scale-95 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600 mb-1.5 group-hover:scale-110 transition-transform">
            <Calendar className="w-5 h-5 stroke-[2]" />
          </div>
          <span className="text-[12px] font-bold text-gray-800">Timetable</span>
        </button>

        {/* Marks */}
        <button
          onClick={onOpenMarks}
          className="bg-white rounded-2xl p-3 border border-gray-100 shadow-[0_2px_6px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center text-center hover:border-red-200 active:scale-95 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600 mb-1.5 group-hover:scale-110 transition-transform">
            <FileText className="w-5 h-5 stroke-[2]" />
          </div>
          <span className="text-[12px] font-bold text-gray-800">Marks</span>
        </button>

        {/* Fees */}
        <button
          onClick={() => onNavigateTab('fees')}
          className="bg-white rounded-2xl p-3 border border-gray-100 shadow-[0_2px_6px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center text-center hover:border-red-200 active:scale-95 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600 mb-1.5 group-hover:scale-110 transition-transform">
            <Wallet className="w-5 h-5 stroke-[2]" />
          </div>
          <span className="text-[12px] font-bold text-gray-800">Fees</span>
        </button>

        {/* Leave */}
        <button
          onClick={onOpenLeaveModal}
          className="bg-white rounded-2xl p-3 border border-gray-100 shadow-[0_2px_6px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center text-center hover:border-red-200 active:scale-95 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600 mb-1.5 group-hover:scale-110 transition-transform">
            <Palmtree className="w-5 h-5 stroke-[2]" />
          </div>
          <span className="text-[12px] font-bold text-gray-800">Leave</span>
        </button>
      </div>

      {/* 5. Today's Timetable Section */}
      <div className="space-y-2 pt-1 pb-3">
        <div className="flex items-center justify-between">
          <h4 className="text-[14px] font-extrabold text-gray-900">Today's Timetable</h4>
          <button
            onClick={onOpenTimetableModal}
            className="text-[12px] font-bold text-red-600 hover:text-red-700 transition-colors flex items-center gap-0.5"
          >
            View All
          </button>
        </div>

        {/* Mathematics Class Card */}
        <div className="bg-white rounded-2xl p-3 border border-gray-100 shadow-[0_2px_6px_rgba(0,0,0,0.03)] flex items-center gap-3">
          {/* Pi symbol inside red squircle */}
          <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center text-red-600 font-serif font-black text-xl flex-shrink-0 border border-red-100">
            π
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[11px] font-medium text-gray-400 block">
              09:00 – 09:45
            </span>
            <h5 className="text-[14px] font-bold text-gray-900 truncate">
              Mathematics
            </h5>
            <p className="text-[11.5px] text-gray-500 font-medium truncate">
              Mr. A. Khan | Room 201
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-300" />
        </div>
      </div>
    </div>
  );
};
