import React, { useState } from 'react';
import { 
  CalendarCheck2, 
  Users, 
  AlertTriangle, 
  Check, 
  X, 
  Clock, 
  Download, 
  Send, 
  Calendar, 
  Filter, 
  FileCheck,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { StatCard } from '../components/common/StatCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { FormDialog } from '../components/common/FormDialog';
import { MOCK_STUDENTS, MOCK_ATTENDANCE_SUMMARY } from '../data/mockData';

interface AttendanceViewProps {
  onShowToast: (type: 'success' | 'warning' | 'error' | 'info', title: string, message?: string) => void;
}

export const AttendanceView: React.FC<AttendanceViewProps> = ({ onShowToast }) => {
  const [activeTab, setActiveTab] = useState<'rollcall' | 'rule13' | 'classwise'>('rollcall');
  const [selectedDate, setSelectedDate] = useState('2026-10-29');
  const [selectedGrade, setSelectedGrade] = useState('Class X');
  const [selectedSection, setSelectedSection] = useState('A');

  // Local student attendance roster state for the selected class
  const [rollCallState, setRollCallState] = useState<Record<string, 'present' | 'absent' | 'leave' | 'late'>>({
    std_01: 'present',
    std_02: 'present',
    std_03: 'present',
    std_04: 'absent',
    std_05: 'present',
    std_06: 'leave',
    std_07: 'present',
    std_08: 'present',
  });

  // Correction Request modal
  const [isCorrectionModalOpen, setIsCorrectionModalOpen] = useState(false);
  const [correctionForm, setCorrectionForm] = useState({
    studentName: 'Zaidan Tariq Ahmed (DRT-2024-0101)',
    originalStatus: 'Absent',
    requestedStatus: 'Medical Leave (Slip Attached)',
    reason: 'Parent submitted government hospital OPD slip for acute viral fever.'
  });

  const toggleStudentStatus = (id: string, status: 'present' | 'absent' | 'leave' | 'late') => {
    setRollCallState(prev => ({
      ...prev,
      [id]: status
    }));
  };

  const handleSaveRollCall = () => {
    onShowToast('success', 'Attendance Recorded', `Class ${selectedGrade} - Section ${selectedSection} attendance marked for ${selectedDate}.`);
  };

  const handleSendRule13Notice = (studentName: string) => {
    onShowToast('warning', 'Notice Dispatched', `CBSE Rule 13 statutory warning letter sent via SMS & Registered Email to guardians of ${studentName}.`);
  };

  const handleCorrectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCorrectionModalOpen(false);
    onShowToast('success', 'Correction Request Submitted', 'Sent to Principal Mrs. Shaheen Shaikh for administrative audit.');
  };

  // Rule 13 shortage students (<75% aggregate)
  const rule13Students = [
    { id: 'r1', name: 'Faizan Merchant', grade: 'Class X-A', admNo: 'DRT-2024-0089', currentPct: 68.2, workingDays: 140, attended: 95, shortfall: 10, guardian: 'Aslam Merchant (+91 98201 11223)' },
    { id: 'r2', name: 'Sara Shaikh', grade: 'Class XII-Sci', admNo: 'DRT-2023-0144', currentPct: 71.4, workingDays: 140, attended: 100, shortfall: 5, guardian: 'Rehan Shaikh (+91 98199 44332)' },
    { id: 'r3', name: 'Arman Qureshi', grade: 'Class IX-B', admNo: 'DRT-2024-0231', currentPct: 64.5, workingDays: 140, attended: 90, shortfall: 15, guardian: 'Abdul Qureshi (+91 98921 55667)' },
    { id: 'r4', name: 'Zoya Momin', grade: 'Class XI-Com', admNo: 'DRT-2023-0309', currentPct: 73.0, workingDays: 140, attended: 102, shortfall: 3, guardian: 'Nadeem Momin (+91 98211 77889)' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Student Attendance & CBSE Rule 13 Tracking"
        description="Daily biometric & classroom roll call, leave reconciliation, and mandatory CBSE Rule 13 (75% minimum) board eligibility surveillance."
        breadcrumbs={[
          { label: 'School Operations' },
          { label: 'Attendance', active: true }
        ]}
        primaryAction={{
          label: "Submit Attendance Correction",
          icon: <FileCheck className="w-4 h-4" />,
          onClick: () => setIsCorrectionModalOpen(true)
        }}
        secondaryActions={[
          {
            label: "Export Attendance Report",
            icon: <Download className="w-3.5 h-3.5" />,
            onClick: () => onShowToast('info', 'Export Started', 'Simulated Monthly Attendance Sheet downloaded.')
          }
        ]}
      />

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Present Today"
          value="94.6%"
          icon={CalendarCheck2}
          subtext="1,181 Present of 1,248"
          trend={{ value: "+0.8% vs yesterday", isPositive: true }}
        />
        <StatCard
          label="Absent Today"
          value="48"
          icon={X}
          subtext="Unexcused without leave slip"
        />
        <StatCard
          label="Medical / Approved Leave"
          value="19"
          icon={Clock}
          subtext="Validated with medical slips"
        />
        <StatCard
          label="CBSE Rule 13 Watchlist"
          value="18"
          icon={AlertTriangle}
          subtext="Students under 75% threshold"
          trend={{ value: "Mandatory Board Alert", isNeutral: false }}
          onClick={() => setActiveTab('rule13')}
          clickableHint="Inspect shortage list"
        />
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-surface-border overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('rollcall')}
          className={`py-3 px-5 text-xs sm:text-sm font-semibold border-b-2 transition-colors ${
            activeTab === 'rollcall'
              ? 'border-brand-navy text-brand-navy'
              : 'border-transparent text-ink-secondary hover:text-ink-primary'
          }`}
        >
          Daily Class Roll Call
        </button>
        <button
          onClick={() => setActiveTab('rule13')}
          className={`py-3 px-5 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'rule13'
              ? 'border-brand-navy text-brand-navy'
              : 'border-transparent text-ink-secondary hover:text-ink-primary'
          }`}
        >
          <span>CBSE Rule 13 Shortage Watchlist</span>
          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-rose-100 text-rose-700">
            {rule13Students.length} Critical
          </span>
        </button>
        <button
          onClick={() => setActiveTab('classwise')}
          className={`py-3 px-5 text-xs sm:text-sm font-semibold border-b-2 transition-colors ${
            activeTab === 'classwise'
              ? 'border-brand-navy text-brand-navy'
              : 'border-transparent text-ink-secondary hover:text-ink-primary'
          }`}
        >
          Class-wise Summary
        </button>
      </div>

      {/* TAB 1: DAILY CLASS ROLL CALL */}
      {activeTab === 'rollcall' && (
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="bg-white border border-surface-border rounded-xl p-4 shadow-subtle flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1.5 text-xs text-ink-secondary">
                <Calendar className="w-4 h-4 text-brand-blue" />
                <span className="font-medium">Date:</span>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-2.5 py-1.5 border border-surface-border rounded-lg bg-surface-bg text-ink-primary text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
                />
              </div>

              <div className="flex items-center gap-1.5 text-xs text-ink-secondary">
                <span className="font-medium">Class:</span>
                <select
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="px-2.5 py-1.5 border border-surface-border rounded-lg bg-white text-ink-primary text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
                >
                  <option value="Class IX">Class IX</option>
                  <option value="Class X">Class X</option>
                  <option value="Class XI">Class XI</option>
                  <option value="Class XII">Class XII</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-ink-secondary">
                <span className="font-medium">Section:</span>
                <select
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  className="px-2.5 py-1.5 border border-surface-border rounded-lg bg-white text-ink-primary text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
                >
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                  <option value="C">Section C</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const markedAll: Record<string, 'present'> = {};
                  MOCK_STUDENTS.slice(0, 8).forEach(s => { markedAll[s.id] = 'present'; });
                  setRollCallState(markedAll);
                  onShowToast('info', 'Marked All Present', 'All students set to Present status.');
                }}
                className="px-3 py-1.5 text-xs font-medium text-ink-secondary hover:text-ink-primary bg-surface-bg rounded-lg border border-surface-border hover:bg-surface-muted transition-colors"
              >
                Mark All Present
              </button>
              <button
                onClick={handleSaveRollCall}
                className="px-4 py-1.5 text-xs sm:text-sm font-semibold text-white bg-brand-navy hover:bg-brand-navyDark rounded-lg transition-colors shadow-subtle"
              >
                Save & Submit Roll Call
              </button>
            </div>
          </div>

          {/* Roll Call Table */}
          <div className="bg-white border border-surface-border rounded-xl shadow-subtle overflow-hidden">
            <div className="p-4 border-b border-surface-border bg-surface-bg/50 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-ink-primary">
                  {selectedGrade} - Section {selectedSection} Roster
                </h3>
                <p className="text-xs text-ink-secondary">
                  Click status buttons to update record for {selectedDate}
                </p>
              </div>
              <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 font-semibold">
                Class Teacher: Mrs. Fatima Sayed
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-surface-bg/60 border-b border-surface-border text-ink-secondary text-[11px] uppercase tracking-wider font-semibold">
                    <th className="py-2.5 px-4 w-16">Roll #</th>
                    <th className="py-2.5 px-4">Student Name</th>
                    <th className="py-2.5 px-4">Admission No</th>
                    <th className="py-2.5 px-4 text-center">Term Avg %</th>
                    <th className="py-2.5 px-4 text-center">Status Today</th>
                    <th className="py-2.5 px-4 text-right">Quick Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border/60">
                  {MOCK_STUDENTS.slice(0, 8).map((std, idx) => {
                    const currentStatus = rollCallState[std.id] || 'present';

                    return (
                      <tr key={std.id} className="hover:bg-surface-cardHover transition-colors">
                        <td className="py-3 px-4 font-bold text-ink-primary tabular-nums">
                          {idx + 1}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={std.avatar}
                              alt={std.name}
                              className="w-7 h-7 rounded-full object-cover ring-1 ring-surface-border"
                            />
                            <div>
                              <p className="font-semibold text-ink-primary">{std.name}</p>
                              <p className="text-[10px] text-ink-secondary">{std.phone}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-mono text-xs text-ink-secondary">
                          {std.admissionNo}
                        </td>
                        <td className="py-3 px-4 text-center tabular-nums font-semibold">
                          <span className={std.attendancePct < 75 ? 'text-rose-600' : 'text-emerald-600'}>
                            {std.attendancePct}%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="inline-flex rounded-lg border border-surface-border p-0.5 bg-surface-bg gap-1">
                            <button
                              onClick={() => toggleStudentStatus(std.id, 'present')}
                              className={`px-2 py-1 text-xs font-semibold rounded transition-colors ${
                                currentStatus === 'present'
                                  ? 'bg-emerald-600 text-white shadow-subtle'
                                  : 'text-ink-secondary hover:text-ink-primary'
                              }`}
                            >
                              P
                            </button>
                            <button
                              onClick={() => toggleStudentStatus(std.id, 'absent')}
                              className={`px-2 py-1 text-xs font-semibold rounded transition-colors ${
                                currentStatus === 'absent'
                                  ? 'bg-rose-600 text-white shadow-subtle'
                                  : 'text-ink-secondary hover:text-ink-primary'
                              }`}
                            >
                              A
                            </button>
                            <button
                              onClick={() => toggleStudentStatus(std.id, 'leave')}
                              className={`px-2 py-1 text-xs font-semibold rounded transition-colors ${
                                currentStatus === 'leave'
                                  ? 'bg-amber-500 text-white shadow-subtle'
                                  : 'text-ink-secondary hover:text-ink-primary'
                              }`}
                            >
                              L
                            </button>
                            <button
                              onClick={() => toggleStudentStatus(std.id, 'late')}
                              className={`px-2 py-1 text-xs font-semibold rounded transition-colors ${
                                currentStatus === 'late'
                                  ? 'bg-blue-600 text-white shadow-subtle'
                                  : 'text-ink-secondary hover:text-ink-primary'
                              }`}
                            >
                              Late
                            </button>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => {
                              setCorrectionForm({
                                studentName: `${std.name} (${std.admissionNo})`,
                                originalStatus: currentStatus.toUpperCase(),
                                requestedStatus: 'Medical Leave (Slip Attached)',
                                reason: 'Guardian contacted school regarding absence.'
                              });
                              setIsCorrectionModalOpen(true);
                            }}
                            className="text-xs font-semibold text-brand-blue hover:text-brand-navy"
                          >
                            Request Audit
                          </button>
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

      {/* TAB 2: CBSE RULE 13 SHORTAGE WATCHLIST */}
      {activeTab === 'rule13' && (
        <div className="space-y-4">
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 text-xs text-amber-900">
            <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm text-amber-900">
                CBSE Examination Byelaws — Rule 13 Compliance Surveillance
              </p>
              <p className="mt-1 leading-relaxed text-amber-800">
                Under CBSE Rule 13, no candidate shall be eligible to appear for the Secondary (Class X) or Senior Secondary (Class XII) Board Examinations unless they have completed a minimum of <strong>75% attendance</strong> of the total working days. Schools must issue statutory registered warning letters to guardians of candidates whose attendance falls below the prescribed threshold.
              </p>
            </div>
          </div>

          <div className="bg-white border border-surface-border rounded-xl shadow-subtle overflow-hidden">
            <div className="p-4 border-b border-surface-border flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-ink-primary">
                  Identified Shortage Candidates (&lt;75%)
                </h3>
                <p className="text-xs text-ink-secondary">
                  Official alert roster for Session 2026–27 Board Registration Audit
                </p>
              </div>
              <button
                onClick={() => onShowToast('warning', 'Batch Notice Sent', 'Statutory warning letters dispatched to all 4 shortage candidates.')}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors shadow-subtle"
              >
                Dispatch All Warning Letters
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-surface-bg/80 border-b border-surface-border text-ink-secondary text-[11px] uppercase tracking-wider font-semibold">
                    <th className="py-3 px-4">Student</th>
                    <th className="py-3 px-4">Class</th>
                    <th className="py-3 px-4">Working Days</th>
                    <th className="py-3 px-4">Attended</th>
                    <th className="py-3 px-4 text-center">Aggregate %</th>
                    <th className="py-3 px-4 text-center">Days Short</th>
                    <th className="py-3 px-4">Guardian Contact</th>
                    <th className="py-3 px-4 text-right">Statutory Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border/60">
                  {rule13Students.map((item) => (
                    <tr key={item.id} className="hover:bg-rose-50/40 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-ink-primary">
                        {item.name}
                        <span className="block text-[11px] font-mono text-ink-secondary">
                          {item.admNo}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-ink-primary">
                        {item.grade}
                      </td>
                      <td className="py-3.5 px-4 tabular-nums text-ink-secondary">
                        {item.workingDays}
                      </td>
                      <td className="py-3.5 px-4 tabular-nums font-medium text-ink-primary">
                        {item.attended}
                      </td>
                      <td className="py-3.5 px-4 text-center tabular-nums">
                        <span className="px-2 py-0.5 rounded font-bold text-rose-700 bg-rose-100">
                          {item.currentPct}%
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center tabular-nums font-bold text-rose-600">
                        -{item.shortfall} Days
                      </td>
                      <td className="py-3.5 px-4 text-ink-secondary text-xs">
                        {item.guardian}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleSendRule13Notice(item.name)}
                          className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded bg-amber-100 hover:bg-amber-200 text-amber-800 transition-colors"
                        >
                          <Send className="w-3 h-3" />
                          <span>Send Notice</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CLASS-WISE MONTHLY REPORT */}
      {activeTab === 'classwise' && (
        <div className="bg-white border border-surface-border rounded-xl shadow-subtle overflow-hidden">
          <div className="p-4 border-b border-surface-border flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-ink-primary">
                Class-wise Attendance & Roll Call Compliance
              </h3>
              <p className="text-xs text-ink-secondary">
                Aggregated statistics across all school sections
              </p>
            </div>
            <button
              onClick={() => onShowToast('info', 'Report Generated', 'Simulated Monthly Class-wise Attendance PDF.')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-surface-border bg-surface-bg hover:bg-surface-muted text-ink-primary transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Sheet</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-surface-bg/80 border-b border-surface-border text-ink-secondary text-[11px] uppercase tracking-wider font-semibold">
                  <th className="py-3 px-4">Grade & Section</th>
                  <th className="py-3 px-4">Class Teacher</th>
                  <th className="py-3 px-4 text-center">Total Strength</th>
                  <th className="py-3 px-4 text-center">Avg Attendance</th>
                  <th className="py-3 px-4 text-center">Below 75%</th>
                  <th className="py-3 px-4 text-center">Register Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border/60">
                {MOCK_ATTENDANCE_SUMMARY.map((cls) => (
                  <tr key={cls.grade + cls.section} className="hover:bg-surface-cardHover transition-colors">
                    <td className="py-3.5 px-4 font-bold text-ink-primary">
                      {cls.grade} - {cls.section}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-ink-primary">
                      {cls.classTeacher}
                    </td>
                    <td className="py-3.5 px-4 text-center tabular-nums text-ink-primary font-medium">
                      {cls.totalStudents}
                    </td>
                    <td className="py-3.5 px-4 text-center tabular-nums">
                      <span className={`font-bold ${cls.attendanceRate >= 94 ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {cls.attendanceRate}%
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center tabular-nums font-semibold text-rose-600">
                      {cls.shortageCount} students
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <StatusBadge variant="success" size="sm">
                        Verified & Signed
                      </StatusBadge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Attendance Correction Modal */}
      <FormDialog
        isOpen={isCorrectionModalOpen}
        onClose={() => setIsCorrectionModalOpen(false)}
        title="Submit Attendance Correction Request"
        description="Submit formal attendance revision with attached medical slip or school representation."
        submitLabel="Submit Request"
        onSubmit={handleCorrectionSubmit}
        maxWidth="md"
      >
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-ink-primary mb-1">
              Student Record *
            </label>
            <input
              type="text"
              readOnly
              value={correctionForm.studentName}
              className="w-full px-3 py-2 text-xs border border-surface-border rounded-lg bg-surface-muted text-ink-primary font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-ink-primary mb-1">
                Current Status
              </label>
              <input
                type="text"
                readOnly
                value={correctionForm.originalStatus}
                className="w-full px-3 py-2 text-xs border border-surface-border rounded-lg bg-surface-muted text-rose-600 font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-primary mb-1">
                Requested Status *
              </label>
              <select
                value={correctionForm.requestedStatus}
                onChange={(e) => setCorrectionForm({ ...correctionForm, requestedStatus: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-surface-border rounded-lg bg-white text-ink-primary font-medium focus:ring-2 focus:ring-brand-blue/30"
              >
                <option value="Medical Leave (Slip Attached)">Medical Leave (Slip Attached)</option>
                <option value="Official School Representation (Sports/Quiz)">School Sports Representation</option>
                <option value="Clerical Attendance Correction">Clerical Attendance Error</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-ink-primary mb-1">
              Justification & Hospital / Event Details *
            </label>
            <textarea
              rows={3}
              required
              value={correctionForm.reason}
              onChange={(e) => setCorrectionForm({ ...correctionForm, reason: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-surface-border rounded-lg bg-surface-bg focus:ring-2 focus:ring-brand-blue/30"
            />
          </div>

          <div className="p-3 bg-surface-bg rounded-lg border border-surface-border text-[11px] text-ink-secondary">
            Note: As per CBSE affiliation norms, medical leaves exceeding 3 days require a verified registered practitioner medical fitness slip.
          </div>
        </div>
      </FormDialog>
    </div>
  );
};
