import React, { useState } from 'react';
import { X, Calendar, CheckCircle2 } from 'lucide-react';

interface LeaveApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  onSubmit: (reason: string, startDate: string, days: number) => void;
}

export const LeaveApplicationModal: React.FC<LeaveApplicationModalProps> = ({
  isOpen,
  onClose,
  studentName,
  onSubmit
}) => {
  const [reason, setReason] = useState('');
  const [leaveType, setLeaveType] = useState('Sick Leave');
  const [startDate, setStartDate] = useState('2026-11-04');
  const [days, setDays] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      onSubmit(reason, startDate, days);
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-gray-100">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div>
            <h3 className="text-[16px] font-black text-gray-900">Apply for Student Leave</h3>
            <p className="text-[12px] text-gray-500 font-medium">{studentName}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-2">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-[16px] font-black text-gray-900">Leave Submitted</h4>
            <p className="text-[12px] text-gray-500">
              Notification sent to Class Teacher and Principal.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 py-3 text-[13px]">
            <div>
              <label className="block text-[12px] font-bold text-gray-700 mb-1">
                Leave Category *
              </label>
              <select
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-200 text-gray-800 text-[13px] bg-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none"
              >
                <option value="Sick Leave">Sick Leave / Medical</option>
                <option value="Family Function">Family Function / Event</option>
                <option value="Urgent Personal Work">Urgent Personal Work</option>
                <option value="Out of Station">Out of Station Travel</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[12px] font-bold text-gray-700 mb-1">
                  Start Date *
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-2 rounded-xl border border-gray-200 text-gray-800 text-[12px] bg-white outline-none"
                />
              </div>

              <div>
                <label className="block text-[12px] font-bold text-gray-700 mb-1">
                  Duration (Days) *
                </label>
                <input
                  type="number"
                  min="1"
                  max="15"
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full p-2 rounded-xl border border-gray-200 text-gray-800 text-[12px] bg-white outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-bold text-gray-700 mb-1">
                Reason & Details *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Please state the reason for absence..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-200 text-gray-800 text-[12px] outline-none resize-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              />
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-[13px] font-bold text-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 bg-[#DC2626] hover:bg-red-700 text-white rounded-xl text-[13px] font-extrabold shadow-sm"
              >
                Submit Leave
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
