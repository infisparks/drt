import React, { useState } from 'react';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  Plus, 
  Filter, 
  FileText,
  UserCheck,
  Check,
  ChevronRight
} from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { StatCard } from '../components/common/StatCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { MOCK_TIMETABLE, MOCK_STAFF } from '../data/mockData';

interface AcademicsViewProps {
  onShowToast: (type: 'success' | 'warning' | 'error' | 'info', title: string, message?: string) => void;
}

export const AcademicsView: React.FC<AcademicsViewProps> = ({ onShowToast }) => {
  const [activeTab, setActiveTab] = useState<'calendar' | 'timetable' | 'syllabus' | 'lessonplans' | 'workload'>('timetable');
  const [selectedDay, setSelectedDay] = useState<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday'>('Monday');
  const [selectedGrade, setSelectedGrade] = useState('Class X');

  // Syllabus progress dataset
  const syllabusData = [
    { subject: 'Mathematics', grade: 'Class X', teacher: 'Mr. Rajesh Sharma', totalChapters: 15, completed: 11, targetPct: 75, actualPct: 73.3, status: 'On Track' },
    { subject: 'Science (Physics/Chem/Bio)', grade: 'Class X', teacher: 'Mrs. Shabana Shaikh', totalChapters: 16, completed: 13, targetPct: 80, actualPct: 81.2, status: 'Ahead' },
    { subject: 'Social Science', grade: 'Class X', teacher: 'Mr. Tariq Memon', totalChapters: 20, completed: 14, targetPct: 75, actualPct: 70.0, status: 'Slight Delay' },
    { subject: 'English Language & Literature', grade: 'Class X', teacher: 'Ms. Ayesha Siddiqua', totalChapters: 18, completed: 15, targetPct: 80, actualPct: 83.3, status: 'Ahead' },
    { subject: 'Hindi / Urdu Elective', grade: 'Class X', teacher: 'Maulana M. Ilyas', totalChapters: 14, completed: 11, targetPct: 75, actualPct: 78.5, status: 'On Track' },
    { subject: 'Information Technology (402)', grade: 'Class X', teacher: 'Mr. Danish Khan', totalChapters: 10, completed: 8, targetPct: 80, actualPct: 80.0, status: 'On Track' },
  ];

  // Lesson plans dataset
  const [lessonPlans, setLessonPlans] = useState([
    { id: 'lp_1', subject: 'Mathematics', topic: 'Quadratic Equations (Real Roots & Discriminant)', teacher: 'Mr. Rajesh Sharma', grade: 'Class X-A', submittedOn: 'Oct 26, 2026', status: 'Approved' },
    { id: 'lp_2', subject: 'Physics', topic: 'Light Reflection and Refraction (Ray Diagrams)', teacher: 'Mrs. Shabana Shaikh', grade: 'Class X-B', submittedOn: 'Oct 27, 2026', status: 'Approved' },
    { id: 'lp_3', subject: 'Social Science', topic: 'Nationalism in India (Civil Disobedience Movement)', teacher: 'Mr. Tariq Memon', grade: 'Class X-A', submittedOn: 'Oct 28, 2026', status: 'Pending Review' },
    { id: 'lp_4', subject: 'Biology', topic: 'Life Processes (Double Circulation in Humans)', teacher: 'Mrs. Zainab Khan', grade: 'Class IX-A', submittedOn: 'Oct 28, 2026', status: 'Pending Review' },
  ]);

  // Academic calendar key events
  const calendarEvents = [
    { date: 'Nov 14, 2026', title: 'Children’s Day & Science Exhibition', type: 'School Event' },
    { date: 'Dec 01 - Dec 12, 2026', title: 'CBSE Pre-Board Examination Phase 1 (Classes X & XII)', type: 'Examinations' },
    { date: 'Dec 22, 2026', title: 'National Mathematics Day Celebrations', type: 'Academic' },
    { date: 'Dec 25 - Jan 01, 2027', title: 'Winter Vacation (7 Days)', type: 'Vacation' },
    { date: 'Jan 08, 2027', title: 'Parent-Teacher Meeting (PTM Term-2 Review)', type: 'PTM' },
    { date: 'Jan 16 - Feb 05, 2027', title: 'CBSE Board Practical & Internal Assessment Window', type: 'Mandatory CBSE' },
  ];

  // Filter timetable entries for selected day and grade
  const filteredTimetable = MOCK_TIMETABLE.filter(
    t => t.day === selectedDay && t.grade === selectedGrade
  ).sort((a, b) => a.period - b.period);

  const handleApprovePlan = (id: string) => {
    setLessonPlans(prev => prev.map(p => p.id === id ? { ...p, status: 'Approved' } : p));
    onShowToast('success', 'Lesson Plan Approved', 'Digital signoff recorded for Academic Coordinator review.');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Academics & Curriculum Planning"
        description="NCERT syllabus tracking, master institutional timetable, teacher workloads, and weekly lesson plan approvals."
        breadcrumbs={[
          { label: 'School Operations' },
          { label: 'Academics', active: true }
        ]}
        primaryAction={{
          label: "Submit New Lesson Plan",
          icon: <Plus className="w-4 h-4" />,
          onClick: () => onShowToast('info', 'Lesson Plan Form', 'Simulated Lesson Plan submission template opened.')
        }}
        secondaryActions={[
          {
            label: "Export Timetable",
            icon: <Download className="w-3.5 h-3.5" />,
            onClick: () => onShowToast('info', 'Download Started', 'Class X Timetable exported to PDF.')
          }
        ]}
      />

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Syllabus Completion"
          value="77.8%"
          icon={BookOpen}
          trend={{ value: "+2.4% ahead of schedule", isPositive: true }}
          subtext="Mid-term target achieved"
        />
        <StatCard
          label="Weekly Periods"
          value="32 Avg"
          icon={Clock}
          subtext="Within CBSE 34 max limit"
        />
        <StatCard
          label="Lesson Plans Approved"
          value="94%"
          icon={CheckCircle2}
          subtext="42 of 45 submitted this week"
        />
        <StatCard
          label="Remedial Sessions"
          value="14 Classes"
          icon={AlertCircle}
          subtext="Scheduled after 2:30 PM"
        />
      </div>

      {/* Tabs */}
      <div className="flex border-b border-surface-border overflow-x-auto">
        <button
          onClick={() => setActiveTab('timetable')}
          className={`py-3 px-4 sm:px-5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'timetable'
              ? 'border-brand-navy text-brand-navy'
              : 'border-transparent text-ink-secondary hover:text-ink-primary'
          }`}
        >
          Master Timetable
        </button>
        <button
          onClick={() => setActiveTab('syllabus')}
          className={`py-3 px-4 sm:px-5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'syllabus'
              ? 'border-brand-navy text-brand-navy'
              : 'border-transparent text-ink-secondary hover:text-ink-primary'
          }`}
        >
          Syllabus Progress Tracker
        </button>
        <button
          onClick={() => setActiveTab('lessonplans')}
          className={`py-3 px-4 sm:px-5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'lessonplans'
              ? 'border-brand-navy text-brand-navy'
              : 'border-transparent text-ink-secondary hover:text-ink-primary'
          }`}
        >
          Lesson Plans ({lessonPlans.filter(p => p.status === 'Pending Review').length} Pending)
        </button>
        <button
          onClick={() => setActiveTab('workload')}
          className={`py-3 px-4 sm:px-5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'workload'
              ? 'border-brand-navy text-brand-navy'
              : 'border-transparent text-ink-secondary hover:text-ink-primary'
          }`}
        >
          Teacher Workload
        </button>
        <button
          onClick={() => setActiveTab('calendar')}
          className={`py-3 px-4 sm:px-5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'calendar'
              ? 'border-brand-navy text-brand-navy'
              : 'border-transparent text-ink-secondary hover:text-ink-primary'
          }`}
        >
          Academic Calendar
        </button>
      </div>

      {/* TAB 1: MASTER TIMETABLE */}
      {activeTab === 'timetable' && (
        <div className="space-y-4">
          <div className="bg-white border border-surface-border rounded-xl p-4 shadow-subtle flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              {(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const).map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                    selectedDay === day
                      ? 'bg-brand-navy text-white shadow-subtle'
                      : 'bg-surface-bg text-ink-secondary hover:text-ink-primary border border-surface-border'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-ink-secondary font-medium">Class:</span>
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="px-2.5 py-1.5 border border-surface-border rounded-lg bg-white text-ink-primary text-xs font-semibold focus:ring-2 focus:ring-brand-blue/30"
              >
                <option value="Class IX">Class IX</option>
                <option value="Class X">Class X</option>
                <option value="Class XI">Class XI</option>
                <option value="Class XII">Class XII</option>
              </select>
            </div>
          </div>

          <div className="bg-white border border-surface-border rounded-xl shadow-subtle overflow-hidden">
            <div className="p-4 border-b border-surface-border bg-surface-bg/50 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-ink-primary">
                  {selectedGrade} Schedule — {selectedDay}
                </h3>
                <p className="text-xs text-ink-secondary">
                  8 Periods Daily (40 mins each) with 20 min Recess
                </p>
              </div>
              <span className="text-xs font-semibold text-brand-navy bg-brand-blue/10 px-2.5 py-1 rounded-full">
                Rooms 201 - 204
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-surface-bg/80 border-b border-surface-border text-ink-secondary text-[11px] uppercase tracking-wider font-semibold">
                    <th className="py-2.5 px-4 w-20">Period</th>
                    <th className="py-2.5 px-4">Time Slot</th>
                    <th className="py-2.5 px-4">Subject</th>
                    <th className="py-2.5 px-4">Assigned Educator</th>
                    <th className="py-2.5 px-4">Room / Lab</th>
                    <th className="py-2.5 px-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border/60">
                  {filteredTimetable.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-ink-secondary text-xs">
                        No periods scheduled for this selection.
                      </td>
                    </tr>
                  ) : (
                    filteredTimetable.map((slot) => (
                      <tr key={slot.id} className="hover:bg-surface-cardHover transition-colors">
                        <td className="py-3 px-4 font-bold text-brand-navy tabular-nums">
                          Period {slot.period}
                        </td>
                        <td className="py-3 px-4 font-mono text-xs text-ink-secondary tabular-nums">
                          {slot.timeSlot}
                        </td>
                        <td className="py-3 px-4 font-semibold text-ink-primary">
                          {slot.subject}
                        </td>
                        <td className="py-3 px-4 font-medium text-ink-primary">
                          {slot.teacher}
                        </td>
                        <td className="py-3 px-4 text-ink-secondary font-medium">
                          {slot.room}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {slot.isSubstitute ? (
                            <StatusBadge variant="warning" size="sm">
                              Substitute Teacher
                            </StatusBadge>
                          ) : (
                            <StatusBadge variant="success" size="sm">
                              Scheduled
                            </StatusBadge>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SYLLABUS PROGRESS TRACKER */}
      {activeTab === 'syllabus' && (
        <div className="bg-white border border-surface-border rounded-xl shadow-subtle overflow-hidden">
          <div className="p-4 border-b border-surface-border flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-ink-primary">
                Class X CBSE Syllabus Completion Tracking
              </h3>
              <p className="text-xs text-ink-secondary">
                Verified against NCERT learning outcomes & periodic milestone schedule
              </p>
            </div>
            <StatusBadge variant="brand">Pre-Board Readiness Target: 90% by Dec 15</StatusBadge>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-surface-bg/80 border-b border-surface-border text-ink-secondary text-[11px] uppercase tracking-wider font-semibold">
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-4">Educator</th>
                  <th className="py-3 px-4 text-center">Chapters Covered</th>
                  <th className="py-3 px-4 text-center">Milestone %</th>
                  <th className="py-3 px-4">Completion Progress</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border/60">
                {syllabusData.map((sub) => (
                  <tr key={sub.subject} className="hover:bg-surface-cardHover transition-colors">
                    <td className="py-3.5 px-4 font-bold text-ink-primary">
                      {sub.subject}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-ink-primary">
                      {sub.teacher}
                    </td>
                    <td className="py-3.5 px-4 text-center tabular-nums font-semibold text-ink-primary">
                      {sub.completed} / {sub.totalChapters} Ch.
                    </td>
                    <td className="py-3.5 px-4 text-center tabular-nums text-ink-secondary">
                      Target: {sub.targetPct}%
                    </td>
                    <td className="py-3.5 px-4 w-48">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-surface-muted rounded-full overflow-hidden">
                          <div
                            style={{ width: `${sub.actualPct}%` }}
                            className={`h-full rounded-full ${
                              sub.actualPct >= sub.targetPct ? 'bg-emerald-600' : 'bg-amber-500'
                            }`}
                          />
                        </div>
                        <span className="text-xs font-bold tabular-nums text-ink-primary w-10 text-right">
                          {sub.actualPct}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <StatusBadge
                        variant={
                          sub.status === 'Ahead' ? 'success' : sub.status === 'On Track' ? 'brand' : 'warning'
                        }
                        size="sm"
                      >
                        {sub.status}
                      </StatusBadge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: LESSON PLANS */}
      {activeTab === 'lessonplans' && (
        <div className="space-y-4">
          <div className="bg-white border border-surface-border rounded-xl shadow-subtle overflow-hidden">
            <div className="p-4 border-b border-surface-border flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-ink-primary">
                  Weekly Lesson Plans Submission & Coordinator Signoff
                </h3>
                <p className="text-xs text-ink-secondary">
                  CBSE pedagogical framework: learning objectives, teaching aids, and student assessments
                </p>
              </div>
            </div>

            <div className="divide-y divide-surface-border/60">
              {lessonPlans.map((plan) => (
                <div key={plan.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-surface-cardHover transition-colors">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-brand-blue/10 text-brand-navy">
                        {plan.grade}
                      </span>
                      <span className="text-sm font-bold text-ink-primary">
                        {plan.subject}: {plan.topic}
                      </span>
                    </div>
                    <p className="text-xs text-ink-secondary">
                      Submitted by <strong className="text-ink-primary font-medium">{plan.teacher}</strong> on {plan.submittedOn}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <StatusBadge
                      variant={plan.status === 'Approved' ? 'success' : 'warning'}
                      size="sm"
                    >
                      {plan.status}
                    </StatusBadge>

                    {plan.status === 'Pending Review' ? (
                      <button
                        onClick={() => handleApprovePlan(plan.id)}
                        className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-lg bg-brand-navy hover:bg-brand-navyDark text-white transition-colors"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve Plan</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => onShowToast('info', 'Plan Document', `Opening lesson plan file for ${plan.topic}`)}
                        className="px-2.5 py-1 text-xs font-medium text-ink-secondary hover:text-ink-primary rounded border border-surface-border bg-surface-bg"
                      >
                        View Plan
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: TEACHER WORKLOAD */}
      {activeTab === 'workload' && (
        <div className="bg-white border border-surface-border rounded-xl shadow-subtle overflow-hidden">
          <div className="p-4 border-b border-surface-border flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-ink-primary">
                Faculty Weekly Teaching Workload Distribution
              </h3>
              <p className="text-xs text-ink-secondary">
                CBSE Affiliation Byelaw 13: Normal weekly teaching quota 30 to 34 periods
              </p>
            </div>
            <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 font-semibold">
              All 62 Faculty within statutory limits
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-surface-bg/80 border-b border-surface-border text-ink-secondary text-[11px] uppercase tracking-wider font-semibold">
                  <th className="py-3 px-4">Faculty Member</th>
                  <th className="py-3 px-4">Subject Specialization</th>
                  <th className="py-3 px-4 text-center">Assigned Classes</th>
                  <th className="py-3 px-4 text-center">Weekly Periods</th>
                  <th className="py-3 px-4">Workload Distribution</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border/60">
                {MOCK_STAFF.slice(0, 7).map((staff) => {
                  const periods = staff.experienceYears > 10 ? 30 : 32;
                  const pct = Math.round((periods / 34) * 100);

                  return (
                    <tr key={staff.id} className="hover:bg-surface-cardHover transition-colors">
                      <td className="py-3 px-4">
                        <p className="font-bold text-ink-primary">{staff.name}</p>
                        <p className="text-[11px] text-ink-secondary">{staff.designation}</p>
                      </td>
                      <td className="py-3 px-4 font-medium text-ink-primary">
                        {staff.department}
                      </td>
                      <td className="py-3 px-4 text-center text-ink-secondary">
                        Classes IX, X & XII
                      </td>
                      <td className="py-3 px-4 text-center tabular-nums font-bold text-brand-navy">
                        {periods} / 34 max
                      </td>
                      <td className="py-3 px-4 w-40">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-surface-muted rounded-full overflow-hidden">
                            <div
                              style={{ width: `${pct}%` }}
                              className="h-full rounded-full bg-brand-blue"
                            />
                          </div>
                          <span className="text-xs font-semibold tabular-nums text-ink-secondary">
                            {pct}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <StatusBadge variant="success" size="sm">
                          Balanced
                        </StatusBadge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: ACADEMIC CALENDAR */}
      {activeTab === 'calendar' && (
        <div className="bg-white border border-surface-border rounded-xl shadow-subtle p-5">
          <div className="mb-4 pb-3 border-b border-surface-border">
            <h3 className="text-base font-bold text-ink-primary">
              Academic Session 2026–27 Master Schedule
            </h3>
            <p className="text-xs text-ink-secondary">
              220 Mandatory Instructional Days as mandated by CBSE Byelaws
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {calendarEvents.map((evt, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-surface-border bg-surface-bg/50 hover:bg-surface-cardHover transition-colors flex items-start justify-between gap-3"
              >
                <div>
                  <span className="text-xs font-bold text-brand-navy tabular-nums block mb-1">
                    {evt.date}
                  </span>
                  <h4 className="text-sm font-semibold text-ink-primary">
                    {evt.title}
                  </h4>
                </div>
                <StatusBadge
                  variant={
                    evt.type === 'Mandatory CBSE'
                      ? 'warning'
                      : evt.type === 'Examinations'
                      ? 'danger'
                      : 'brand'
                  }
                  size="sm"
                >
                  {evt.type}
                </StatusBadge>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
