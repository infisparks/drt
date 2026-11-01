import React from 'react';
import { X, Clock, MapPin, Calendar } from 'lucide-react';

interface TimetableModalProps {
  isOpen: boolean;
  onClose: () => void;
  grade: string;
}

export const TimetableModal: React.FC<TimetableModalProps> = ({
  isOpen,
  onClose,
  grade
}) => {
  if (!isOpen) return null;

  const periods = [
    { period: 1, time: '08:00 – 08:45', subject: 'Assembly & Morning Prep', teacher: 'Class Teacher', room: 'Auditorium' },
    { period: 2, time: '08:45 – 09:30', subject: 'English Literature', teacher: 'Ms. F. Shaikh', room: 'Room 201' },
    { period: 3, time: '09:30 – 10:15', subject: 'Mathematics', teacher: 'Mr. A. Khan', room: 'Room 201' },
    { period: 'Break', time: '10:15 – 10:35', subject: 'Short Recess & Snacks', teacher: 'Campus Duty', room: 'Canteen' },
    { period: 4, time: '10:35 – 11:20', subject: 'Science (Physics/Chem)', teacher: 'Dr. V. Rao', room: 'Science Lab 2' },
    { period: 5, time: '11:20 – 12:05', subject: 'Social Science', teacher: 'Mr. P. Deshmukh', room: 'Room 201' },
    { period: 6, time: '12:05 – 12:50', subject: 'Computer Applications', teacher: 'Ms. T. Qureshi', room: 'IT Lab 1' },
    { period: 7, time: '12:50 – 01:30', subject: 'Physical Education / Games', teacher: 'Coach Imtiaz', room: 'Main Ground' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-sm max-h-[85vh] bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-gray-100 flex flex-col">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 flex-shrink-0">
          <div>
            <h3 className="text-[16px] font-black text-gray-900">Today's Timetable</h3>
            <p className="text-[12px] text-gray-500 font-medium">{grade} • Monday to Friday</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-3 space-y-2 text-[12px]">
          {periods.map((p, idx) => {
            const isBreak = p.period === 'Break';

            return (
              <div
                key={idx}
                className={`p-3 rounded-2xl border ${
                  isBreak
                    ? 'bg-amber-50/60 border-amber-200/60 text-amber-900'
                    : 'bg-white border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                    isBreak ? 'bg-amber-200 text-amber-900' : 'bg-red-50 text-red-600'
                  }`}>
                    {isBreak ? 'Break' : `Period ${p.period}`}
                  </span>
                  <span className="text-[11px] font-bold text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {p.time}
                  </span>
                </div>
                <h4 className="text-[13.5px] font-bold text-gray-900">{p.subject}</h4>
                <div className="flex items-center justify-between text-[11px] text-gray-500 mt-1">
                  <span>{p.teacher}</span>
                  <span className="font-semibold">{p.room}</span>
                </div>
              </div>
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
