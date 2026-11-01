import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  AlertCircle,
  FilePlus2
} from 'lucide-react';

interface AttendanceScreenProps {
  onApplyLeave?: () => void;
}

export const AttendanceScreen: React.FC<AttendanceScreenProps> = ({ onApplyLeave }) => {
  const [currentMonth, setCurrentMonth] = useState('Nov 2026');

  // Days in November 2026: Nov 1 is Sunday
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Calendar dates representation matching image
  // 1: Sunday (Red), 2-6: Mon-Fri (Green present), 7: Sat (neutral), 8: Sun (Red), etc.
  const calendarDays = [
    { day: 1, type: 'holiday', label: 'Sunday' },
    { day: 2, type: 'present' },
    { day: 3, type: 'present' },
    { day: 4, type: 'present' },
    { day: 5, type: 'present' },
    { day: 6, type: 'present' },
    { day: 7, type: 'weekend' },
    { day: 8, type: 'holiday', label: 'Sunday' },
    { day: 9, type: 'upcoming' },
    { day: 10, type: 'upcoming' },
    { day: 11, type: 'upcoming' },
    { day: 12, type: 'upcoming' },
    { day: 13, type: 'upcoming' },
    { day: 14, type: 'weekend' },
    { day: 15, type: 'holiday', label: 'Sunday' },
    { day: 16, type: 'upcoming' },
    { day: 17, type: 'upcoming' },
    { day: 18, type: 'upcoming' },
    { day: 19, type: 'upcoming' },
    { day: 20, type: 'upcoming' },
    { day: 21, type: 'weekend' },
    { day: 22, type: 'holiday', label: 'Sunday' },
    { day: 23, type: 'upcoming' },
    { day: 24, type: 'upcoming' },
    { day: 25, type: 'upcoming' },
    { day: 26, type: 'upcoming' },
    { day: 27, type: 'upcoming' },
    { day: 28, type: 'weekend' },
    { day: 29, type: 'holiday', label: 'Sunday' },
    { day: 30, type: 'upcoming' }
  ];

  return (
    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3.5 bg-[#F8FAFC]">
      {/* 1. Dual Summary Cards */}
      <div className="grid grid-cols-2 gap-3">
        {/* Today's Status */}
        <div className="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <CalendarIcon className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <span className="text-[11.5px] font-medium text-gray-400 block">
              Today's Status
            </span>
            <span className="text-[18px] font-black text-emerald-600 tracking-tight leading-none block mt-0.5">
              Present
            </span>
          </div>
        </div>

        {/* This Month Percentage */}
        <div className="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col justify-center">
          <span className="text-[11.5px] font-medium text-gray-400 block">
            This Month
          </span>
          <span className="text-[20px] font-black text-gray-900 tracking-tight leading-none block mt-0.5">
            92%
          </span>
        </div>
      </div>

      {/* 2. CBSE Attendance (75% Rule) Card */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)] space-y-2.5">
        <div className="flex items-center justify-between">
          <h4 className="text-[13.5px] font-extrabold text-gray-900">
            CBSE Attendance (75% Rule)
          </h4>
          <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-[12px]">
            <span>92% Completed</span>
            <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
              <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-emerald-500 h-full rounded-full transition-all"
            style={{ width: '92%' }}
          />
        </div>

        <p className="text-[11px] text-gray-500 font-medium">
          You are above the minimum 75% requirement.
        </p>
      </div>

      {/* 3. Section: Monthly Attendance Calendar */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)] space-y-3">
        {/* Month Navigator */}
        <div className="flex items-center justify-between">
          <h4 className="text-[14px] font-extrabold text-gray-900">
            Monthly Attendance
          </h4>
          <div className="flex items-center gap-2">
            <button className="p-1 rounded-md text-gray-400 hover:text-gray-700">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[13px] font-bold text-gray-800">
              {currentMonth}
            </span>
            <button className="p-1 rounded-md text-gray-400 hover:text-gray-700">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 text-center text-[11px] font-bold text-gray-400">
          {daysOfWeek.map((d, i) => (
            <span key={i} className={i === 0 ? 'text-red-500' : ''}>{d}</span>
          ))}
        </div>

        {/* Dates Grid */}
        <div className="grid grid-cols-7 gap-y-2 text-center text-[12px]">
          {calendarDays.map((item) => {
            const isSunday = item.day % 7 === 1; // Nov 1, 8, 15, 22, 29
            const isPresent = item.type === 'present';

            return (
              <div key={item.day} className="flex items-center justify-center py-0.5">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[12px] transition-all ${
                    isPresent
                      ? 'bg-emerald-100 text-emerald-700 font-black'
                      : isSunday
                      ? 'text-red-500 font-bold'
                      : 'text-gray-700'
                  }`}
                >
                  {item.day}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Bottom Action Button: Apply for Leave */}
      <div className="pt-1 pb-4">
        <button
          onClick={onApplyLeave}
          className="w-full py-3 bg-[#DC2626] hover:bg-red-700 active:scale-[0.98] text-white rounded-xl text-[14px] font-extrabold flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(220,38,38,0.25)] transition-all"
        >
          <CalendarIcon className="w-4 h-4 stroke-[2.2]" />
          <span>Apply for Leave</span>
        </button>
      </div>
    </div>
  );
};
