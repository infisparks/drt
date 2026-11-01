import React from 'react';
import { X, CheckCircle2, UserCheck } from 'lucide-react';
import { StudentProfileData, STUDENTS_LIST } from '../data/parentAppData';

interface StudentSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStudentId: string;
  onSelectStudent: (student: StudentProfileData) => void;
}

export const StudentSwitcherModal: React.FC<StudentSwitcherModalProps> = ({
  isOpen,
  onClose,
  currentStudentId,
  onSelectStudent
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-gray-100">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div>
            <h3 className="text-[16px] font-black text-gray-900">Switch Ward / Student</h3>
            <p className="text-[12px] text-gray-500 font-medium">Select student profile to view</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 py-4">
          {STUDENTS_LIST.map((std) => {
            const isSelected = std.id === currentStudentId;

            return (
              <button
                key={std.id}
                onClick={() => {
                  onSelectStudent(std);
                  onClose();
                }}
                className={`w-full p-3.5 rounded-2xl border flex items-center justify-between text-left transition-all ${
                  isSelected
                    ? 'border-red-500 bg-red-50/50 shadow-sm ring-1 ring-red-500'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={std.avatar}
                    alt={std.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm"
                  />
                  <div>
                    <h4 className="text-[14px] font-bold text-gray-900">{std.name}</h4>
                    <p className="text-[12px] text-gray-500 font-medium">
                      {std.grade} – {std.section} • Roll #{std.rollNo}
                    </p>
                    <span className="text-[10px] text-red-600 font-bold">
                      Adm No: {std.admissionNo}
                    </span>
                  </div>
                </div>

                {isSelected ? (
                  <CheckCircle2 className="w-5 h-5 text-red-600 fill-red-50" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                )}
              </button>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-[13px] font-bold text-gray-700 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
