import React, { useState } from 'react';
import { 
  GraduationCap, 
  Calendar, 
  CheckSquare, 
  Award, 
  BarChart, 
  Download, 
  FileText, 
  Eye, 
  Search,
  CheckCircle2,
  Save,
  Printer
} from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { StatCard } from '../components/common/StatCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { DetailDrawer } from '../components/common/DetailDrawer';
import { MOCK_STUDENTS, MOCK_EXAM_REPORTS } from '../data/mockData';

interface ExaminationsViewProps {
  onShowToast: (type: 'success' | 'warning' | 'error' | 'info', title: string, message?: string) => void;
}

export const ExaminationsView: React.FC<ExaminationsViewProps> = ({ onShowToast }) => {
  const [activeTab, setActiveTab] = useState<'schedules' | 'marks' | 'results' | 'reportcards' | 'analysis'>('results');
  const [selectedExam, setSelectedExam] = useState('Periodic Test 2');
  const [selectedGrade, setSelectedGrade] = useState('Class X');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');

  // Interactive marks entry state
  const [marksRoster, setMarksRoster] = useState<Record<string, { marks: number; maxMarks: number }>>({
    std_01: { marks: 76, maxMarks: 80 },
    std_02: { marks: 68, maxMarks: 80 },
    std_03: { marks: 72, maxMarks: 80 },
    std_04: { marks: 54, maxMarks: 80 },
    std_05: { marks: 78, maxMarks: 80 },
    std_06: { marks: 62, maxMarks: 80 },
  });

  // Report card preview modal
  const [selectedStudentForReport, setSelectedStudentForReport] = useState<any | null>(null);
  const [isReportDrawerOpen, setIsReportDrawerOpen] = useState(false);

  // Exam Schedules datesheet
  const examDatesheet = [
    { date: 'Dec 01, 2026', time: '09:00 AM - 12:00 PM', subject: 'Mathematics (Standard / Basic)', code: '041 / 241', room: 'Exam Hall 1 & 2' },
    { date: 'Dec 03, 2026', time: '09:00 AM - 12:00 PM', subject: 'Science (Theory)', code: '086', room: 'Exam Hall 1 & 2' },
    { date: 'Dec 05, 2026', time: '09:00 AM - 12:00 PM', subject: 'Social Science', code: '087', room: 'Exam Hall 1 & 2' },
    { date: 'Dec 08, 2026', time: '09:00 AM - 12:00 PM', subject: 'English Language & Literature', code: '184', room: 'Exam Hall 1 & 2' },
    { date: 'Dec 10, 2026', time: '09:00 AM - 12:00 PM', subject: 'Hindi Course-A / Urdu Course-A', code: '002 / 003', room: 'Exam Hall 1 & 2' },
    { date: 'Dec 12, 2026', time: '09:00 AM - 11:00 AM', subject: 'Information Technology (Skill)', code: '402', room: 'Computer Lab A & B' },
  ];

  const handleMarksChange = (stdId: string, val: string) => {
    const num = Math.min(80, Math.max(0, parseInt(val) || 0));
    setMarksRoster(prev => ({
      ...prev,
      [stdId]: { ...prev[stdId], marks: num }
    }));
  };

  const handleSaveMarks = () => {
    onShowToast('success', 'Marks Ledger Saved', `${selectedSubject} marks for ${selectedGrade} saved and locked for tabulation.`);
  };

  const calculateGrade = (marks: number, max: number) => {
    const pct = (marks / max) * 100;
    if (pct >= 91) return { grade: 'A1', variant: 'success' as const };
    if (pct >= 81) return { grade: 'A2', variant: 'brand' as const };
    if (pct >= 71) return { grade: 'B1', variant: 'brand' as const };
    if (pct >= 61) return { grade: 'B2', variant: 'info' as const };
    if (pct >= 51) return { grade: 'C1', variant: 'neutral' as const };
    if (pct >= 41) return { grade: 'C2', variant: 'warning' as const };
    if (pct >= 33) return { grade: 'D', variant: 'warning' as const };
    return { grade: 'E (Remedial)', variant: 'danger' as const };
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Examinations & Assessment Registry"
        description="Term datesheets, internal assessments, marks tabulations, CBSE report cards, and remedial analytics."
        breadcrumbs={[
          { label: 'School Operations' },
          { label: 'Examinations', active: true }
        ]}
        primaryAction={{
          label: "Lock & Publish Results",
          icon: <CheckCircle2 className="w-4 h-4" />,
          onClick: () => onShowToast('success', 'Results Published', 'PT-2 results officially published to Parent ERP portal.')
        }}
        secondaryActions={[
          {
            label: "Export Tabulation Register",
            icon: <Download className="w-3.5 h-3.5" />,
            onClick: () => onShowToast('info', 'Download Started', 'CBSE Tabulation Sheet exported to Excel.')
          }
        ]}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Pass Percentage (PT-2)"
          value="97.2%"
          icon={GraduationCap}
          trend={{ value: "+2.1% vs Term 1", isPositive: true }}
          subtext="School overall average"
        />
        <StatCard
          label="A1 Grade Achievers"
          value="48 Students"
          icon={Award}
          subtext="Score >= 91% in aggregate"
        />
        <StatCard
          label="Remedial Focus Required"
          value="14 Students"
          icon={CheckSquare}
          subtext="Score < 40% in Science/Maths"
        />
        <StatCard
          label="Upcoming Board Datesheet"
          value="Dec 01"
          icon={Calendar}
          subtext="Pre-Board Phase 1 Begins"
        />
      </div>

      {/* Tabs */}
      <div className="flex border-b border-surface-border overflow-x-auto">
        <button
          onClick={() => setActiveTab('results')}
          className={`py-3 px-4 sm:px-5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'results'
              ? 'border-brand-navy text-brand-navy'
              : 'border-transparent text-ink-secondary hover:text-ink-primary'
          }`}
        >
          Results & Performance Overview
        </button>
        <button
          onClick={() => setActiveTab('marks')}
          className={`py-3 px-4 sm:px-5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'marks'
              ? 'border-brand-navy text-brand-navy'
              : 'border-transparent text-ink-secondary hover:text-ink-primary'
          }`}
        >
          Marks Entry & Tabulation
        </button>
        <button
          onClick={() => setActiveTab('schedules')}
          className={`py-3 px-4 sm:px-5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'schedules'
              ? 'border-brand-navy text-brand-navy'
              : 'border-transparent text-ink-secondary hover:text-ink-primary'
          }`}
        >
          Datesheet & Exam Schedules
        </button>
        <button
          onClick={() => setActiveTab('reportcards')}
          className={`py-3 px-4 sm:px-5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'reportcards'
              ? 'border-brand-navy text-brand-navy'
              : 'border-transparent text-ink-secondary hover:text-ink-primary'
          }`}
        >
          CBSE Holistic Report Cards
        </button>
        <button
          onClick={() => setActiveTab('analysis')}
          className={`py-3 px-4 sm:px-5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'analysis'
              ? 'border-brand-navy text-brand-navy'
              : 'border-transparent text-ink-secondary hover:text-ink-primary'
          }`}
        >
          Performance Analytics
        </button>
      </div>

      {/* TAB 1: RESULTS SUMMARY */}
      {activeTab === 'results' && (
        <div className="bg-white border border-surface-border rounded-xl shadow-subtle overflow-hidden">
          <div className="p-4 border-b border-surface-border flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-ink-primary">
                Periodic Test & Mid-Term Exam Results Summary
              </h3>
              <p className="text-xs text-ink-secondary">
                Subject-wise mean performance, toppers, and remedial requirements
              </p>
            </div>
            <StatusBadge variant="success">All Sections Evaluated</StatusBadge>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-surface-bg/80 border-b border-surface-border text-ink-secondary text-[11px] uppercase tracking-wider font-semibold">
                  <th className="py-3 px-4">Exam Term</th>
                  <th className="py-3 px-4">Grade & Sec</th>
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-4 text-center">Appeared</th>
                  <th className="py-3 px-4 text-center">Average %</th>
                  <th className="py-3 px-4 text-center">Highest Mark</th>
                  <th className="py-3 px-4 text-center">A1 Grades</th>
                  <th className="py-3 px-4 text-center">Remedial</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border/60">
                {MOCK_EXAM_REPORTS.map((exam) => (
                  <tr key={exam.id} className="hover:bg-surface-cardHover transition-colors">
                    <td className="py-3.5 px-4 font-bold text-ink-primary">
                      {exam.term}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-ink-primary">
                      {exam.grade} - {exam.section}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-brand-navy">
                      {exam.subject}
                    </td>
                    <td className="py-3.5 px-4 text-center tabular-nums text-ink-secondary">
                      {exam.totalAppeared}
                    </td>
                    <td className="py-3.5 px-4 text-center tabular-nums font-bold text-ink-primary">
                      {exam.averagePercentage}%
                    </td>
                    <td className="py-3.5 px-4 text-center tabular-nums font-bold text-emerald-700">
                      {exam.highestMarks} / 80
                    </td>
                    <td className="py-3.5 px-4 text-center tabular-nums font-bold text-brand-blue">
                      {exam.a1GradesCount}
                    </td>
                    <td className="py-3.5 px-4 text-center tabular-nums font-bold text-rose-600">
                      {exam.studentsNeedingRemedial}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <StatusBadge variant="success" size="sm">
                        Published
                      </StatusBadge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: MARKS ENTRY */}
      {activeTab === 'marks' && (
        <div className="space-y-4">
          <div className="bg-white border border-surface-border rounded-xl p-4 shadow-subtle flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1.5 text-xs text-ink-secondary">
                <span className="font-medium">Exam:</span>
                <select
                  value={selectedExam}
                  onChange={(e) => setSelectedExam(e.target.value)}
                  className="px-2.5 py-1.5 border border-surface-border rounded-lg bg-white text-xs font-semibold"
                >
                  <option value="Periodic Test 2">Periodic Test 2</option>
                  <option value="Pre-Board Exam 1">Pre-Board Exam 1</option>
                  <option value="Internal Assessment">Internal Assessment (20m)</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-ink-secondary">
                <span className="font-medium">Subject:</span>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="px-2.5 py-1.5 border border-surface-border rounded-lg bg-white text-xs font-semibold"
                >
                  <option value="Mathematics">Mathematics (041)</option>
                  <option value="Science">Science (086)</option>
                  <option value="Social Science">Social Science (087)</option>
                  <option value="English">English Literature (184)</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-ink-secondary">
                <span className="font-medium">Class:</span>
                <select
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="px-2.5 py-1.5 border border-surface-border rounded-lg bg-white text-xs font-semibold"
                >
                  <option value="Class X">Class X-A</option>
                  <option value="Class IX">Class IX-A</option>
                  <option value="Class XII">Class XII-Sci</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleSaveMarks}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-brand-navy hover:bg-brand-navyDark rounded-lg transition-colors shadow-subtle"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save & Tabulate Marks</span>
            </button>
          </div>

          <div className="bg-white border border-surface-border rounded-xl shadow-subtle overflow-hidden">
            <div className="p-4 border-b border-surface-border bg-surface-bg/50 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-ink-primary">
                  {selectedSubject} Marks Registry (Max Theory: 80 Marks)
                </h3>
                <p className="text-xs text-ink-secondary">
                  Grades automatically calibrated to CBSE standard 8-point grading scale
                </p>
              </div>
              <span className="text-xs font-semibold text-brand-navy">
                Teacher: Mr. Rajesh Sharma
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-surface-bg/80 border-b border-surface-border text-ink-secondary text-[11px] uppercase tracking-wider font-semibold">
                    <th className="py-2.5 px-4 w-16">Roll #</th>
                    <th className="py-2.5 px-4">Student Name</th>
                    <th className="py-2.5 px-4">Admission No</th>
                    <th className="py-2.5 px-4 text-center">Marks Obtained (/80)</th>
                    <th className="py-2.5 px-4 text-center">Percentage</th>
                    <th className="py-2.5 px-4 text-center">CBSE Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border/60">
                  {MOCK_STUDENTS.slice(0, 6).map((std, idx) => {
                    const entry = marksRoster[std.id] || { marks: 70, maxMarks: 80 };
                    const pct = Math.round((entry.marks / entry.maxMarks) * 100);
                    const gradeInfo = calculateGrade(entry.marks, entry.maxMarks);

                    return (
                      <tr key={std.id} className="hover:bg-surface-cardHover transition-colors">
                        <td className="py-3 px-4 font-bold text-ink-primary tabular-nums">
                          {idx + 1}
                        </td>
                        <td className="py-3 px-4 font-semibold text-ink-primary">
                          {std.name}
                        </td>
                        <td className="py-3 px-4 font-mono text-xs text-ink-secondary">
                          {std.admissionNo}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <input
                            type="number"
                            min="0"
                            max="80"
                            value={entry.marks}
                            onChange={(e) => handleMarksChange(std.id, e.target.value)}
                            className="w-20 px-2 py-1 text-center font-bold text-ink-primary border border-surface-border rounded bg-surface-bg focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
                          />
                        </td>
                        <td className="py-3 px-4 text-center tabular-nums font-semibold text-ink-primary">
                          {pct}%
                        </td>
                        <td className="py-3 px-4 text-center">
                          <StatusBadge variant={gradeInfo.variant} size="sm">
                            {gradeInfo.grade}
                          </StatusBadge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DATESHEETS */}
      {activeTab === 'schedules' && (
        <div className="bg-white border border-surface-border rounded-xl shadow-subtle overflow-hidden">
          <div className="p-4 border-b border-surface-border flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-ink-primary">
                Class X CBSE Pre-Board Examination Datesheet
              </h3>
              <p className="text-xs text-ink-secondary">
                Official timetable issued under circular DRT/EXAM/2026/04
              </p>
            </div>
            <button
              onClick={() => onShowToast('info', 'Datesheet Printed', 'Sent to official campus laser printer.')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-surface-border bg-surface-bg hover:bg-surface-muted transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Datesheet</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-surface-bg/80 border-b border-surface-border text-ink-secondary text-[11px] uppercase tracking-wider font-semibold">
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Timing</th>
                  <th className="py-3 px-4">Subject & Paper</th>
                  <th className="py-3 px-4">Subject Code</th>
                  <th className="py-3 px-4">Examination Hall</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border/60">
                {examDatesheet.map((row) => (
                  <tr key={row.subject} className="hover:bg-surface-cardHover transition-colors">
                    <td className="py-3.5 px-4 font-bold text-brand-navy tabular-nums">
                      {row.date}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs text-ink-secondary">
                      {row.time}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-ink-primary">
                      {row.subject}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs text-ink-secondary">
                      {row.code}
                    </td>
                    <td className="py-3.5 px-4 text-ink-primary font-medium">
                      {row.room}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: REPORT CARDS */}
      {activeTab === 'reportcards' && (
        <div className="bg-white border border-surface-border rounded-xl shadow-subtle p-5">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-surface-border">
            <div>
              <h3 className="text-base font-bold text-ink-primary">
                CBSE Holistic Progress Card (HPC) Generator
              </h3>
              <p className="text-xs text-ink-secondary">
                National Education Policy (NEP 2020) compliant 360-degree assessment cards
              </p>
            </div>
            <button
              onClick={() => onShowToast('success', 'Bulk PDF Generated', 'All 142 Class X Report Cards merged into printable PDF archive.')}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-brand-navy hover:bg-brand-navyDark rounded-lg transition-colors shadow-subtle"
            >
              Bulk Download All Cards
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MOCK_STUDENTS.slice(0, 6).map((std) => (
              <div
                key={std.id}
                className="p-4 rounded-xl border border-surface-border bg-surface-bg/40 hover:bg-white hover:shadow-card transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={std.avatar}
                    alt={std.name}
                    className="w-10 h-10 rounded-full object-cover ring-1 ring-surface-border"
                  />
                  <div className="min-w-0">
                    <p className="font-bold text-ink-primary truncate">{std.name}</p>
                    <p className="text-[11px] text-ink-secondary font-mono">{std.admissionNo}</p>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-ink-secondary pt-2 border-t border-surface-border">
                  <div className="flex justify-between">
                    <span>Grade & Section:</span>
                    <strong className="text-ink-primary">{std.grade} - {std.section}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Aggregate Score:</span>
                    <strong className="text-emerald-600 font-bold">84.2% (Grade A2)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Attendance Rate:</span>
                    <strong className="text-ink-primary tabular-nums">{std.attendancePct}%</strong>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-surface-border flex items-center justify-between">
                  <button
                    onClick={() => {
                      setSelectedStudentForReport(std);
                      setIsReportDrawerOpen(true);
                    }}
                    className="text-xs font-semibold text-brand-blue hover:text-brand-navy flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview Card</span>
                  </button>

                  <button
                    onClick={() => onShowToast('info', 'PDF Export', `Simulated Report Card PDF download for ${std.name}`)}
                    className="p-1.5 rounded text-ink-secondary hover:text-ink-primary hover:bg-surface-muted"
                    title="Download Card"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: PERFORMANCE ANALYSIS */}
      {activeTab === 'analysis' && (
        <div className="bg-white border border-surface-border rounded-xl shadow-subtle p-5 space-y-6">
          <div>
            <h3 className="text-base font-bold text-ink-primary">
              Institutional Grade Distribution (Periodic Test 2)
            </h3>
            <p className="text-xs text-ink-secondary">
              9-point grading scale analysis across Class IX, X, XI, and XII
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 text-center">
            {[
              { grade: 'A1 (91-100)', count: 48, pct: 19, color: 'bg-emerald-500' },
              { grade: 'A2 (81-90)', count: 64, pct: 26, color: 'bg-emerald-600' },
              { grade: 'B1 (71-80)', count: 52, pct: 21, color: 'bg-brand-blue' },
              { grade: 'B2 (61-70)', count: 38, pct: 15, color: 'bg-sky-500' },
              { grade: 'C1 (51-60)', count: 24, pct: 10, color: 'bg-amber-400' },
              { grade: 'C2 (41-50)', count: 12, pct: 5, color: 'bg-amber-500' },
              { grade: 'D (33-40)', count: 8, pct: 3, color: 'bg-rose-400' },
              { grade: 'E (<33)', count: 3, pct: 1, color: 'bg-rose-600' },
            ].map((g) => (
              <div key={g.grade} className="p-3 rounded-xl border border-surface-border bg-surface-bg/40">
                <span className="text-xs font-bold text-ink-primary block mb-1">{g.grade}</span>
                <span className="text-xl font-bold text-ink-primary tabular-nums block">{g.count}</span>
                <span className="text-[10px] text-ink-secondary tabular-nums mt-0.5 block">{g.pct}% students</span>
                <div className="w-full h-1.5 bg-surface-muted rounded-full mt-2 overflow-hidden">
                  <div style={{ width: `${g.pct * 3}%` }} className={`h-full ${g.color}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Report Card Preview Drawer */}
      <DetailDrawer
        isOpen={isReportDrawerOpen}
        onClose={() => setIsReportDrawerOpen(false)}
        title="CBSE Holistic Progress Card Preview"
        subtitle={selectedStudentForReport ? `${selectedStudentForReport.name} • Class X-A` : ''}
        width="lg"
        footer={
          <button
            onClick={() => {
              onShowToast('info', 'Printing Card', 'Sending official Report Card to printer.');
              setIsReportDrawerOpen(false);
            }}
            className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-brand-navy hover:bg-brand-navyDark text-white"
          >
            Print Official Report Card
          </button>
        }
      >
        {selectedStudentForReport && (
          <div className="space-y-4 border border-surface-border p-5 rounded-xl bg-white shadow-subtle">
            {/* Header of Report Card */}
            <div className="text-center pb-3 border-b border-surface-border">
              <h2 className="text-sm font-bold text-brand-navy uppercase tracking-wide">
                DRT Knowledge Hub International School, Mumbra
              </h2>
              <p className="text-[11px] text-ink-secondary">
                Affiliated to CBSE, New Delhi (Affiliation No: 1130982)
              </p>
              <p className="text-xs font-semibold text-ink-primary mt-1">
                ACADEMIC REPORT CARD — SESSION 2026–27
              </p>
            </div>

            {/* Student Info */}
            <div className="grid grid-cols-2 gap-2 text-xs py-2 border-b border-surface-border bg-surface-bg p-3 rounded-lg">
              <div>Student Name: <strong>{selectedStudentForReport.name}</strong></div>
              <div>Roll No: <strong>{selectedStudentForReport.rollNo}</strong></div>
              <div>Admission No: <strong>{selectedStudentForReport.admissionNo}</strong></div>
              <div>Class / Section: <strong>{selectedStudentForReport.grade} - {selectedStudentForReport.section}</strong></div>
              <div>Father's Name: <strong>{selectedStudentForReport.fatherName}</strong></div>
              <div>Attendance: <strong>{selectedStudentForReport.attendancePct}%</strong></div>
            </div>

            {/* Marks Breakdown Table */}
            <table className="w-full text-left text-xs border border-surface-border">
              <thead>
                <tr className="bg-surface-bg border-b border-surface-border font-semibold text-ink-secondary text-[11px]">
                  <th className="p-2">Subject</th>
                  <th className="p-2 text-center">Theory (80)</th>
                  <th className="p-2 text-center">Internal (20)</th>
                  <th className="p-2 text-center">Total (100)</th>
                  <th className="p-2 text-center">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border">
                <tr><td className="p-2">Mathematics (Standard)</td><td className="p-2 text-center">74</td><td className="p-2 text-center">19</td><td className="p-2 text-center font-bold">93</td><td className="p-2 text-center font-bold text-emerald-600">A1</td></tr>
                <tr><td className="p-2">Science</td><td className="p-2 text-center">68</td><td className="p-2 text-center">18</td><td className="p-2 text-center font-bold">86</td><td className="p-2 text-center font-bold text-brand-blue">A2</td></tr>
                <tr><td className="p-2">Social Science</td><td className="p-2 text-center">71</td><td className="p-2 text-center">19</td><td className="p-2 text-center font-bold">90</td><td className="p-2 text-center font-bold text-brand-blue">A2</td></tr>
                <tr><td className="p-2">English Lang & Lit</td><td className="p-2 text-center">72</td><td className="p-2 text-center">19</td><td className="p-2 text-center font-bold">91</td><td className="p-2 text-center font-bold text-emerald-600">A1</td></tr>
                <tr><td className="p-2">Urdu / Hindi Course-A</td><td className="p-2 text-center">70</td><td className="p-2 text-center">18</td><td className="p-2 text-center font-bold">88</td><td className="p-2 text-center font-bold text-brand-blue">A2</td></tr>
                <tr><td className="p-2">Information Technology</td><td className="p-2 text-center">45/50</td><td className="p-2 text-center">48/50</td><td className="p-2 text-center font-bold">93</td><td className="p-2 text-center font-bold text-emerald-600">A1</td></tr>
              </tbody>
            </table>

            {/* Remarks */}
            <div className="p-3 bg-surface-bg rounded-lg text-xs space-y-1">
              <p className="font-semibold text-ink-primary">Class Teacher's Remarks:</p>
              <p className="text-ink-secondary italic">
                "{selectedStudentForReport.name} demonstrates exemplary analytical abilities in Mathematics and Science. Shows high discipline and active leadership in school clubs."
              </p>
            </div>
          </div>
        )}
      </DetailDrawer>
    </div>
  );
};
