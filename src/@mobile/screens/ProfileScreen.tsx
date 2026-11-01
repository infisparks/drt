import React, { useState } from 'react';
import { 
  Phone, 
  Users, 
  MapPin, 
  ChevronRight, 
  ShieldCheck, 
  Sparkles,
  QrCode,
  Download
} from 'lucide-react';
import { StudentProfileData, ParentData } from '../data/parentAppData';

interface ProfileScreenProps {
  student: StudentProfileData;
  parent: ParentData;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ student, parent }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (sec: string) => {
    setExpandedSection(expandedSection === sec ? null : sec);
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 bg-[#F8FAFC]">
      {/* 1. Header Profile Banner Card (Red Gradient) */}
      <div className="bg-gradient-to-r from-[#DC2626] via-[#D32F2F] to-[#B91C1C] rounded-2xl p-4 text-white shadow-[0_4px_16px_rgba(220,38,38,0.28)] flex items-center justify-between relative overflow-hidden">
        {/* Subtle decorative watermark */}
        <div className="absolute right-0 top-0 bottom-0 opacity-15 flex items-center pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-32 h-32 fill-white -mr-6">
            <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="4" />
            <path d="M50 20 L25 35 L50 48 L75 35 Z" fill="white" />
            <path d="M35 48 L35 68 C35 76 65 76 65 68 L65 48" fill="none" stroke="white" strokeWidth="4" />
          </svg>
        </div>

        <div className="flex items-center gap-3.5 z-10">
          <img
            src={student.avatar}
            alt={student.name}
            className="w-14 h-14 rounded-full object-cover ring-2 ring-white/90 shadow-md"
          />
          <div>
            <h3 className="text-[18px] font-black tracking-tight text-white leading-tight">
              {student.name}
            </h3>
            <p className="text-[13px] font-medium text-white/85 mt-0.5">
              {student.grade} – {student.section}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Institutional Student Identity Card */}
      <div className="bg-white rounded-2xl border-2 border-red-500/80 shadow-[0_4px_16px_rgba(0,0,0,0.06)] overflow-hidden">
        {/* ID Card Top Header */}
        <div className="bg-white px-3 pt-3 pb-1 border-b border-gray-100 flex flex-col items-center text-center">
          <div className="flex items-center gap-1.5 justify-center">
            {/* School Crest */}
            <div className="w-5 h-5 flex-shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="46" fill="#DC2626" />
                <circle cx="50" cy="50" r="40" fill="#FFFFFF" />
                <path d="M50 20 L25 35 L50 48 L75 35 Z" fill="#1E3A8A" />
                <path d="M35 48 L35 68 C35 76 65 76 65 68 L65 48" fill="none" stroke="#DC2626" strokeWidth="4" />
              </svg>
            </div>
            <h4 className="text-[10px] font-black tracking-tight text-red-600 uppercase">
              DRT KNOWLEDGE HUB INTERNATIONAL SCHOOL
            </h4>
          </div>

          {/* Red Title Badge */}
          <div className="mt-1.5 mb-0.5">
            <span className="px-3 py-0.5 bg-[#DC2626] text-white text-[9.5px] font-black uppercase tracking-wider rounded-sm shadow-xs">
              STUDENT IDENTITY CARD
            </span>
          </div>
        </div>

        {/* ID Card Body: Photo & Details */}
        <div className="p-3.5 flex items-start gap-3">
          {/* Student Photo */}
          <div className="w-20 h-24 rounded-lg overflow-hidden border-2 border-red-500/80 shadow-xs flex-shrink-0 bg-gray-100">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details Table */}
          <div className="flex-1 min-w-0 space-y-1 text-[11px]">
            <div className="flex">
              <span className="w-24 font-bold text-gray-500">Admission No.</span>
              <span className="font-extrabold text-gray-900">: {student.admissionNo}</span>
            </div>
            <div className="flex">
              <span className="w-24 font-bold text-gray-500">Roll No.</span>
              <span className="font-extrabold text-gray-900">: {student.rollNo}</span>
            </div>
            <div className="flex">
              <span className="w-24 font-bold text-gray-500">Grade & Section</span>
              <span className="font-extrabold text-gray-900">: {student.grade.replace('Grade ', '')} – {student.section}</span>
            </div>
            <div className="flex">
              <span className="w-24 font-bold text-gray-500">House</span>
              <span className="font-extrabold text-red-600">: {student.house}</span>
            </div>
            <div className="flex">
              <span className="w-24 font-bold text-gray-500">Blood Group</span>
              <span className="font-extrabold text-gray-900">: {student.bloodGroup}</span>
            </div>
            <div className="flex">
              <span className="w-24 font-bold text-gray-500">Class Teacher</span>
              <span className="font-extrabold text-gray-900 truncate">: {student.classTeacher}</span>
            </div>
          </div>
        </div>

        {/* ID Card Footer with Barcode */}
        <div className="bg-gray-50 px-4 py-2 border-t border-gray-100 flex flex-col items-center justify-center">
          {/* Barcode Lines Graphic */}
          <div className="flex items-center gap-[2px] h-6">
            {[2, 1, 3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 4, 1, 3, 2, 1, 2, 4, 1, 3, 2].map((w, idx) => (
              <span
                key={idx}
                className="bg-gray-900 h-full rounded-[0.5px]"
                style={{ width: `${w * 1.5}px` }}
              />
            ))}
          </div>
          <span className="text-[9px] font-mono tracking-widest text-gray-500 mt-1 font-semibold">
            {student.admissionNo}
          </span>
        </div>
      </div>

      {/* 3. Action List Options */}
      <div className="space-y-2 pb-4">
        {/* Emergency Contacts */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_6px_rgba(0,0,0,0.03)] overflow-hidden">
          <button
            onClick={() => toggleSection('emergency')}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                <Phone className="w-4 h-4 stroke-[2]" />
              </div>
              <span className="text-[13.5px] font-bold text-gray-800">
                Emergency Contacts
              </span>
            </div>
            <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${expandedSection === 'emergency' ? 'rotate-90 text-red-600' : ''}`} />
          </button>
          {expandedSection === 'emergency' && (
            <div className="px-4 pb-3.5 pt-1 border-t border-gray-50 text-[12px] space-y-2">
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-500">Father (Tariq Ansari):</span>
                <span className="font-bold text-gray-900">+91 98201 88410</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-500">School Front Desk:</span>
                <span className="font-bold text-gray-900">+91 90828 81039</span>
              </div>
            </div>
          )}
        </div>

        {/* Guardian Details */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_6px_rgba(0,0,0,0.03)] overflow-hidden">
          <button
            onClick={() => toggleSection('guardian')}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                <Users className="w-4 h-4 stroke-[2]" />
              </div>
              <span className="text-[13.5px] font-bold text-gray-800">
                Guardian Details
              </span>
            </div>
            <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${expandedSection === 'guardian' ? 'rotate-90 text-red-600' : ''}`} />
          </button>
          {expandedSection === 'guardian' && (
            <div className="px-4 pb-3.5 pt-1 border-t border-gray-50 text-[12px] space-y-2">
              <div className="flex justify-between py-1">
                <span className="text-gray-500">Registered Parent:</span>
                <span className="font-bold text-gray-900">{parent.name}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500">Relation:</span>
                <span className="font-bold text-gray-900">{parent.relation}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500">Email:</span>
                <span className="font-bold text-gray-900">{parent.email}</span>
              </div>
            </div>
          )}
        </div>

        {/* Address */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_6px_rgba(0,0,0,0.03)] overflow-hidden">
          <button
            onClick={() => toggleSection('address')}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                <MapPin className="w-4 h-4 stroke-[2]" />
              </div>
              <span className="text-[13.5px] font-bold text-gray-800">
                Address
              </span>
            </div>
            <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${expandedSection === 'address' ? 'rotate-90 text-red-600' : ''}`} />
          </button>
          {expandedSection === 'address' && (
            <div className="px-4 pb-3.5 pt-1 border-t border-gray-50 text-[12px]">
              <p className="text-gray-600 leading-relaxed font-medium">
                {parent.address}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
