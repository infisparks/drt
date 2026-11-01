import React, { useState } from 'react';
import { ChevronDown, Trophy, Award, Download, TrendingUp } from 'lucide-react';
import { EXAM_RESULTS_DATA } from '../data/parentAppData';

interface MarksScreenProps {
  onDownloadReport?: () => void;
}

export const MarksScreen: React.FC<MarksScreenProps> = ({ onDownloadReport }) => {
  const [activeTab, setActiveTab] = useState<'Overview' | 'Results' | 'Analysis'>('Overview');
  const [selectedExam, setSelectedExam] = useState('Half-Yearly Exam (2026–27)');

  return (
    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3.5 bg-[#F8FAFC]">
      {/* 1. Segmented Pill Tabs */}
      <div className="flex items-center gap-2 p-1 bg-white rounded-full border border-gray-100 shadow-sm">
        {(['Overview', 'Results', 'Analysis'] as const).map((tab) => (
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

      {/* 2. Exam Dropdown Selector */}
      <div className="relative">
        <button className="w-full bg-white px-3.5 py-2 rounded-xl border border-gray-200 text-left flex items-center justify-between text-[13px] font-bold text-gray-800 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <span>{selectedExam}</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* 3. Celebration Trophy Card */}
      <div className="bg-gradient-to-br from-rose-50/70 via-amber-50/60 to-white rounded-2xl p-4 border border-rose-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)] relative overflow-hidden flex items-center justify-between">
        {/* Confetti decorative dots */}
        <div className="absolute top-2 right-4 w-1.5 h-1.5 bg-red-400 rounded-full opacity-60"></div>
        <div className="absolute top-4 right-12 w-1.5 h-1.5 bg-amber-400 rounded-full opacity-60"></div>
        <div className="absolute bottom-3 right-8 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-60"></div>
        <div className="absolute top-8 left-3 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-40"></div>

        <div className="flex items-center gap-3.5 z-10">
          <div className="w-14 h-14 rounded-full bg-amber-100/90 border-2 border-amber-300 flex items-center justify-center text-amber-600 shadow-sm flex-shrink-0">
            <Trophy className="w-8 h-8 fill-amber-400 stroke-amber-600" />
          </div>
          <div>
            <span className="text-[12px] font-medium text-gray-500 block">Overall Result</span>
            <span className="text-[28px] font-black text-gray-900 tracking-tight leading-none block my-0.5">
              {EXAM_RESULTS_DATA.overallPercentage}%
            </span>
            <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white text-[11px] font-extrabold shadow-sm">
              {EXAM_RESULTS_DATA.overallGrade}
            </span>
          </div>
        </div>
      </div>

      {/* 4. 3 Key Metrics Row */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-white rounded-2xl p-2.5 border border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.02)] text-center flex flex-col justify-center">
          <span className="text-[10.5px] font-semibold text-gray-400 uppercase tracking-wider block">
            Top Subject
          </span>
          <span className="text-[11.5px] font-bold text-gray-800 truncate mt-0.5">
            {EXAM_RESULTS_DATA.topSubjectName}
          </span>
          <span className="text-[16px] font-extrabold text-emerald-600 mt-0.5">
            {EXAM_RESULTS_DATA.topSubjectScore}%
          </span>
        </div>

        <div className="bg-white rounded-2xl p-2.5 border border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.02)] text-center flex flex-col justify-center">
          <span className="text-[10.5px] font-semibold text-gray-400 uppercase tracking-wider block">
            Class Avg.
          </span>
          <span className="text-[18px] font-black text-gray-900 mt-1">
            {EXAM_RESULTS_DATA.classAverage}%
          </span>
        </div>

        <div className="bg-white rounded-2xl p-2.5 border border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.02)] text-center flex flex-col justify-center">
          <span className="text-[10.5px] font-semibold text-gray-400 uppercase tracking-wider block">
            Highest
          </span>
          <span className="text-[18px] font-black text-gray-900 mt-1">
            {EXAM_RESULTS_DATA.highestPercentage}%
          </span>
        </div>
      </div>

      {/* 5. Subject-wise Marks Table */}
      <div className="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)] space-y-2.5">
        <h4 className="text-[14px] font-extrabold text-gray-900">Subject-wise Marks</h4>

        <div className="w-full">
          {/* Table Header */}
          <div className="grid grid-cols-12 text-[11.5px] font-bold text-gray-400 pb-2 border-b border-gray-100">
            <span className="col-span-6">Subject</span>
            <span className="col-span-3 text-center">Marks</span>
            <span className="col-span-3 text-right">Grade</span>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-gray-50">
            {EXAM_RESULTS_DATA.marks.map((row, idx) => (
              <div key={idx} className="grid grid-cols-12 items-center py-2.5 text-[13px]">
                <span className="col-span-6 font-bold text-gray-800">
                  {row.subject}
                </span>
                <span className="col-span-3 text-center font-medium text-gray-600">
                  {row.scored} / {row.total}
                </span>
                <div className="col-span-3 flex justify-end">
                  <span className={`px-2 py-0.5 rounded-md text-[11px] font-black ${
                    row.grade === 'A1' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : row.grade === 'A2' 
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-teal-50 text-teal-700'
                  }`}>
                    {row.grade}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Action: Download Official Report Card */}
      <div className="pb-4">
        <button
          onClick={onDownloadReport}
          className="w-full py-2.5 bg-gray-50 hover:bg-gray-100 active:bg-gray-200 border border-gray-200 rounded-xl text-gray-700 text-[12px] font-bold flex items-center justify-center gap-2 transition-colors"
        >
          <Download className="w-4 h-4 text-gray-500" />
          Download CBSE Report Card (PDF)
        </button>
      </div>
    </div>
  );
};
