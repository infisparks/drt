import React, { useState } from 'react';
import { 
  Award,
  Users, 
  CalendarCheck, 
  ReceiptIndianRupee, 
  Wallet, 
  UserCheck, 
  ShieldCheck, 
  Download, 
  Calendar, 
  ArrowRight, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  FileText,
  Building,
  Sparkles,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { UserRole } from '../types';
import { StatCard } from '../components/common/StatCard';
import { 
  ChartCard, 
  AcademicPerformanceChart, 
  AttendanceTrendsChart, 
  FeeCollectionChart, 
  ComplianceOverviewChart 
} from '../components/common/ChartCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { ViewKey } from '../components/layout/AppSidebar';

interface DirectorDashboardProps {
  currentRole: UserRole;
  onNavigate: (view: ViewKey) => void;
  onExportReport: () => void;
  onSelectActionItem: (item: any) => void;
  selectedSession: string;
}

export const DirectorDashboard: React.FC<DirectorDashboardProps> = ({
  currentRole,
  onNavigate,
  onExportReport,
  onSelectActionItem,
  selectedSession
}) => {
  const [selectedDateFilter, setSelectedDateFilter] = useState<'today' | 'week' | 'month' | 'term'>('today');

  // Simulated last updated timestamp
  const simulatedTimestamp = "Today, 11:30 AM (Simulated Demo Sync)";

  const actionItems = [
    {
      id: 'ACT-00',
      title: 'NABET 4th Edition Self-Assessment & MRM Minutes Signoff',
      category: 'Quality Accreditation',
      priority: 'Urgent',
      responsible: 'Mrs. Shaheen Shaikh (Principal & Head QA)',
      dueDate: 'In 5 Days (Nov 04, 2026)',
      status: '85.2% Ready (36 Params)',
      targetView: 'nabet' as ViewKey
    },
    {
      id: 'ACT-01',
      title: 'Municipal Fire NOC Renewal Due',
      category: 'CBSE Statutory',
      priority: 'Urgent',
      responsible: 'Mr. Iqbal Virani (Elected Authority & Compliance)',
      dueDate: 'In 18 Days (Nov 15, 2026)',
      status: 'Inspection Scheduled',
      targetView: 'compliance' as ViewKey
    },
    {
      id: 'ACT-02',
      title: 'Science Lab Equipment Requisition Approval',
      category: 'Purchase Approval',
      priority: 'High',
      responsible: 'Shabnam Shaikh (SMC Chair Person & Trustee)',
      dueDate: 'Tomorrow',
      status: 'Pending Signoff',
      targetView: 'approvals' as ViewKey
    },
    {
      id: 'ACT-03',
      title: 'CBSE Rule 13 Attendance Shortage Warning Letters (Class X-B)',
      category: 'Academic Compliance',
      priority: 'High',
      responsible: 'Mrs. Shaheen Shaikh (Principal)',
      dueDate: 'Nov 02, 2026',
      status: '3 Students <75%',
      targetView: 'attendance' as ViewKey
    },
    {
      id: 'ACT-04',
      title: 'Annual Drinking Water & Sanitation Testing Report Upload',
      category: 'Mandatory Disclosure',
      priority: 'Medium',
      responsible: 'Mr. Ramiz Kadiri (Admin / Facilities)',
      dueDate: 'Nov 10, 2026',
      status: 'Lab Report Received',
      targetView: 'disclosure' as ViewKey
    },
    {
      id: 'ACT-05',
      title: 'Term-2 Fee Reconciliation & Defaulters Notice Batch',
      category: 'Finance Desk',
      priority: 'Medium',
      responsible: 'Ms. Nida Aagah (Senior Accountant)',
      dueDate: 'Nov 05, 2026',
      status: '₹18.6L Dues Pending',
      targetView: 'fees' as ViewKey
    }
  ];

  return (
    <div className="space-y-6">
      {/* 1. Welcome & School Command Centre Header */}
      <div className="bg-white border border-surface-border rounded-xl p-5 sm:p-6 shadow-subtle">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-blue/10 text-brand-navy border border-brand-blue/20">
                DRT Knowledge Hub International School • Mumbra
              </span>
              <span className="hidden sm:inline-block text-[11px] text-ink-secondary">
                CBSE Affil. No. 1130982
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-ink-primary tracking-tight mt-1.5">
              {currentRole === 'director' && 'School Command Centre'}
              {currentRole === 'principal' && 'Principal’s Operational Dashboard'}
              {currentRole === 'academic' && 'Academic Coordinator Command'}
              {currentRole === 'compliance' && 'CBSE Compliance & Regulatory Desk'}
              {currentRole === 'accounts' && 'Finance & Fee Collection Centre'}
            </h1>

            <p className="text-xs sm:text-sm text-ink-secondary mt-1 flex items-center gap-2 flex-wrap">
              <span>Academic Session {selectedSession}</span>
              <span className="text-slate-300">•</span>
              <span className="tabular-nums text-slate-500">Last updated: {simulatedTimestamp}</span>
              <span className="text-slate-300">•</span>
              <span className="text-[11px] font-medium text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                Simulated Demonstration Data
              </span>
            </p>
          </div>

          {/* Date Filter & Export Button */}
          <div className="flex items-center gap-2.5 flex-wrap flex-shrink-0">
            {/* Quick date range switcher */}
            <div className="inline-flex rounded-lg border border-surface-border bg-surface-bg p-0.5 text-xs font-medium">
              {(['today', 'week', 'month', 'term'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedDateFilter(filter)}
                  className={`px-2.5 py-1 rounded-md capitalize transition-colors ${
                    selectedDateFilter === filter
                      ? 'bg-white text-brand-navy font-bold shadow-subtle'
                      : 'text-ink-secondary hover:text-ink-primary'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <button
              onClick={onExportReport}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-brand-navy hover:bg-brand-navyDark text-white shadow-subtle transition-colors focus:outline-none focus:ring-2 focus:ring-brand-navy focus:ring-offset-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Executive Dossier</span>
            </button>
          </div>
        </div>

        {/* Role context notice banner if not director */}
        {currentRole !== 'director' && (
          <div className="mt-4 pt-3 border-t border-surface-border/60 flex items-center justify-between text-xs text-ink-secondary bg-surface-muted/40 px-3 py-2 rounded-lg">
            <span>
              Currently viewing through <strong>{currentRole.toUpperCase()}</strong> role context. Metrics and actions are prioritized for this domain.
            </span>
            <button
              onClick={() => onNavigate('command-centre')}
              className="text-brand-blue font-semibold hover:underline"
            >
              Switch to Director View
            </button>
          </div>
        )}
      </div>

      {/* 2. Primary KPI Cards (EXACT SIX ESSENTIAL CARDS) */}
      <div>
        <div className="flex items-center justify-between mb-3 px-0.5">
          <h2 className="text-sm font-bold text-ink-primary uppercase tracking-wider">
            Institutional Health KPIs
          </h2>
          <span className="text-xs text-ink-secondary">
            Click any metric to drill down into records
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* 1. Total Students */}
          <StatCard
            label="Total Students"
            value="1,248"
            icon={Users}
            trend={{ value: "+3.2% vs last term", isPositive: true }}
            subtext="Class Nursery to Class XII (42 Sections)"
            clickableHint="View student registry & admissions"
            onClick={() => onNavigate('admissions')}
          />

          {/* 2. Present Today */}
          <StatCard
            label="Present Today"
            value="94.6%"
            icon={CalendarCheck}
            trend={{ value: "+0.8% vs last week", isPositive: true }}
            subtext="1,181 Present • 48 Absent • 19 On Leave"
            clickableHint="Inspect daily attendance & Rule 13"
            onClick={() => onNavigate('attendance')}
          />

          {/* 3. Fee Collection */}
          <StatCard
            label="Fee Collection"
            value="₹82.4L"
            icon={ReceiptIndianRupee}
            trend={{ value: "81.5% target achieved", isPositive: true }}
            subtext="Term 1 & Term 2 Collected to date"
            clickableHint="View fee ledgers & reconciliation"
            onClick={() => onNavigate('fees')}
          />

          {/* 4. Outstanding Fees */}
          <StatCard
            label="Outstanding Fees"
            value="₹18.6L"
            icon={Wallet}
            trend={{ value: "Down 4.1% this month", isPositive: true }}
            subtext="142 student fee dues under follow-up"
            clickableHint="Review fee defaulters list"
            onClick={() => onNavigate('fees')}
          />

          {/* 5. Active Staff */}
          <StatCard
            label="Active Staff"
            value="86"
            icon={UserCheck}
            trend={{ value: "100% biometric verified", isPositive: true }}
            subtext="62 Teaching • 16 Support • 8 Admin"
            clickableHint="View staff directory & workload"
            onClick={() => onNavigate('staff')}
          />

          {/* 6. Compliance Status */}
          <StatCard
            label="Compliance Status"
            value="87%"
            icon={ShieldCheck}
            trend={{ value: "4 Renewals in progress", isNeutral: true }}
            subtext="CBSE Byelaws, Fire, Water & Safety"
            clickableHint="Open CBSE Compliance Centre"
            onClick={() => onNavigate('compliance')}
          />
        </div>
      </div>

      {/* 3. Dashboard Analytics Grid (4 Clean Visuals) */}
      <div>
        <div className="flex items-center justify-between mb-3 px-0.5">
          <h2 className="text-sm font-bold text-ink-primary uppercase tracking-wider">
            Operational Analytics
          </h2>
          <span className="text-xs text-ink-secondary">
            Visual trends across academic terms and compliance cycles
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Academic Performance */}
          <ChartCard
            title="Academic Performance Across Terms"
            subtitle="Overall school score average (PT-1 through Board Mock Exams)"
            action={{
              label: "Exam Analysis",
              onClick: () => onNavigate('examinations')
            }}
            legend={[
              { label: "School Average %", color: "#173B70" }
            ]}
          >
            <AcademicPerformanceChart />
          </ChartCard>

          {/* Attendance Trends */}
          <ChartCard
            title="Attendance Trends (Current Week)"
            subtitle="Daily breakdown: Present, Absent, and Medical Leave"
            action={{
              label: "Roll Call",
              onClick: () => onNavigate('attendance')
            }}
            legend={[
              { label: "Present (>93%)", color: "#059669" },
              { label: "Absent", color: "#F43F5E" },
              { label: "Medical / Leave", color: "#FBBF24" }
            ]}
          >
            <AttendanceTrendsChart />
          </ChartCard>

          {/* Fee Collection */}
          <ChartCard
            title="Fee Collection vs Dues (Quarterly)"
            subtitle="Quarterly collected volume (navy) vs outstanding balances (amber)"
            action={{
              label: "Finance Ledger",
              onClick: () => onNavigate('fees')
            }}
            legend={[
              { label: "Collected (₹ Lakhs)", color: "#173B70" },
              { label: "Outstanding Dues (₹ Lakhs)", color: "#F59E0B" }
            ]}
          >
            <FeeCollectionChart />
          </ChartCard>

          {/* Compliance Overview */}
          <ChartCard
            title="CBSE Compliance Tracking Status"
            subtitle="Statutory affiliation requirements, NOCs, and public disclosure checklist"
            action={{
              label: "Compliance Centre",
              onClick: () => onNavigate('compliance')
            }}
          >
            <ComplianceOverviewChart />
          </ChartCard>
        </div>
      </div>

      {/* NABET Accreditation & Quality Management Executive Card */}
      <div className="bg-gradient-to-r from-indigo-900 to-indigo-950 text-white rounded-xl p-5 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
              Quality Governance Standard
            </span>
            <span className="text-xs text-indigo-300">
              Fourth Edition, June 2025
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-400" />
            NABET School Accreditation & Continuous Quality Management
          </h3>
          <p className="text-xs text-indigo-200 max-w-2xl leading-relaxed">
            School governance compliance across <strong>3 Domains, 14 Standards, and 36 Assessment Parameters</strong> is tracked at <strong>85.2% Readiness</strong> with 128 verified digital evidence files.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0 w-full md:w-auto">
          <button
            type="button"
            onClick={() => onNavigate('nabet')}
            className="w-full md:w-auto px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg bg-white text-indigo-950 hover:bg-indigo-50 transition-colors shadow-subtle flex items-center justify-center gap-2"
          >
            <span>Open NABET Portal</span>
            <ArrowRight className="w-4 h-4 text-indigo-600" />
          </button>
        </div>
      </div>

      {/* 4. Action Required (Top 5 Pending Items) */}
      <div className="bg-white border border-surface-border rounded-xl p-5 shadow-subtle">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-surface-border/60">
          <div>
            <h3 className="text-base font-bold text-ink-primary">
              Action Required
            </h3>
            <p className="text-xs text-ink-secondary mt-0.5">
              Five highest-priority administrative items requiring executive signoff or statutory renewal
            </p>
          </div>
          <button
            onClick={() => onNavigate('approvals')}
            className="text-xs font-semibold text-brand-blue hover:text-brand-navy flex items-center gap-1"
          >
            <span>View All Approvals</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-surface-border/60">
          {actionItems.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                onSelectActionItem(item);
                onNavigate(item.targetView);
              }}
              className="py-3 sm:py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-surface-cardHover rounded-lg px-2 -mx-2 transition-colors cursor-pointer group"
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className={`p-2 rounded-lg flex-shrink-0 mt-0.5 ${
                  item.priority === 'Urgent'
                    ? 'bg-rose-50 text-rose-600'
                    : item.priority === 'High'
                    ? 'bg-amber-50 text-amber-600'
                    : 'bg-brand-blue/10 text-brand-navy'
                }`}>
                  {item.priority === 'Urgent' ? (
                    <AlertTriangle className="w-4 h-4" />
                  ) : item.priority === 'High' ? (
                    <Clock className="w-4 h-4" />
                  ) : (
                    <FileText className="w-4 h-4" />
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-ink-primary group-hover:text-brand-navy transition-colors">
                      {item.title}
                    </span>
                    <span className="text-[10px] font-medium text-ink-secondary bg-surface-muted px-1.5 py-0.2 rounded border border-surface-border">
                      {item.category}
                    </span>
                  </div>

                  <p className="text-xs text-ink-secondary mt-1">
                    Responsible: <strong className="text-ink-primary font-medium">{item.responsible}</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 flex-shrink-0 text-xs">
                <div className="text-left sm:text-right">
                  <div className={`font-semibold tabular-nums ${
                    item.priority === 'Urgent' ? 'text-rose-600' : 'text-ink-primary'
                  }`}>
                    {item.dueDate}
                  </div>
                  <div className="text-[11px] text-ink-secondary">
                    {item.status}
                  </div>
                </div>

                <StatusBadge
                  variant={
                    item.priority === 'Urgent'
                      ? 'danger'
                      : item.priority === 'High'
                      ? 'warning'
                      : 'info'
                  }
                  size="sm"
                >
                  {item.priority}
                </StatusBadge>

                <div className="text-brand-blue group-hover:translate-x-1 transition-transform hidden sm:block">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
