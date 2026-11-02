import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  ReceiptIndianRupee, 
  PieChart, 
  BarChart3, 
  Calendar, 
  Download, 
  Filter, 
  ArrowUpRight, 
  ArrowDownRight, 
  CheckCircle2, 
  CreditCard, 
  Wallet, 
  Building2, 
  Users, 
  AlertTriangle, 
  Clock, 
  RefreshCw, 
  Smartphone, 
  Landmark, 
  Coins, 
  ChevronRight,
  Eye,
  Send,
  Printer
} from 'lucide-react';
import { 
  MOCK_MIS_METRICS, 
  MOCK_STREAM_STATS, 
  MOCK_MONTHLY_COLLECTION_TRENDS, 
  MOCK_FEE_HEAD_BREAKDOWN, 
  MOCK_PAYMENT_MODE_SHARES, 
  MOCK_AGING_BUCKETS,
  MOCK_FEE_TRANSACTIONS
} from '../data/mockData';
import { PageHeader } from '../components/common/PageHeader';
import { StatCard } from '../components/common/StatCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { SearchFilterBar } from '../components/common/SearchFilterBar';
import { EmptyState } from '../components/common/EmptyState';
import { DetailDrawer } from '../components/common/DetailDrawer';

interface MISCollectionViewProps {
  onShowToast: (type: 'success' | 'warning' | 'error' | 'info', title: string, message?: string) => void;
}

export const MISCollectionView: React.FC<MISCollectionViewProps> = ({ onShowToast }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'departments' | 'channels' | 'defaulters'>('overview');
  const [selectedTerm, setSelectedTerm] = useState<'all' | 'term1' | 'term2'>('all');
  const [selectedStream, setSelectedStream] = useState('all');
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);
  const [hoveredChannel, setHoveredChannel] = useState<number | null>(null);

  // Defaulter detail drawer state
  const [selectedDefaulter, setSelectedDefaulter] = useState<any | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Defaulters dataset with aging
  const [defaultersList, setDefaultersList] = useState([
    { id: 'def_1', name: 'Faizan Merchant', admNo: 'DRT-2024-0089', grade: 'Class XII-Sci', phone: '+91 98201 11223', dueAmount: 18500, dueSince: '2026-07-15', agingDays: 108, bucket: '90+ Days', status: 'Final Notice Sent' },
    { id: 'def_2', name: 'Sara Shaikh', admNo: 'DRT-2023-0144', grade: 'Class XII-Com', phone: '+91 98199 44332', dueAmount: 24000, dueSince: '2026-08-10', agingDays: 84, bucket: '61 - 90 Days', status: 'Second Reminder' },
    { id: 'def_3', name: 'Arman Qureshi', admNo: 'DRT-2024-0231', grade: 'Class X-B', phone: '+91 98921 55667', dueAmount: 14200, dueSince: '2026-09-05', agingDays: 58, bucket: '31 - 60 Days', status: 'SMS Reminder Sent' },
    { id: 'def_4', name: 'Ibrahim Siddiqui', admNo: 'DRT-2025-0412', grade: 'Class IX-A', phone: '+91 98210 99887', dueAmount: 12000, dueSince: '2026-10-01', agingDays: 32, bucket: '31 - 60 Days', status: 'Pending Call' },
    { id: 'def_5', name: 'Zoya Khan', admNo: 'DRT-2025-0551', grade: 'Class VIII-A', phone: '+91 97690 33441', dueAmount: 9500, dueSince: '2026-10-15', agingDays: 18, bucket: '0 - 30 Days', status: 'Current Bill' },
    { id: 'def_6', name: 'Hamza Farooqui', admNo: 'DRT-2024-0199', grade: 'Class XI-Sci', phone: '+91 98200 44556', dueAmount: 16500, dueSince: '2026-07-28', agingDays: 95, bucket: '90+ Days', status: 'Final Notice Sent' },
  ]);

  const metrics = MOCK_MIS_METRICS;
  const streams = MOCK_STREAM_STATS;
  const monthlyTrends = MOCK_MONTHLY_COLLECTION_TRENDS;
  const feeHeads = MOCK_FEE_HEAD_BREAKDOWN;
  const paymentModes = MOCK_PAYMENT_MODE_SHARES;
  const agingBuckets = MOCK_AGING_BUCKETS;

  // Filter streams if needed
  const filteredStreams = useMemo(() => {
    if (selectedStream === 'all') return streams;
    return streams.filter(s => s.code.toLowerCase().includes(selectedStream.toLowerCase()));
  }, [streams, selectedStream]);

  // Send single reminder
  const handleSendReminder = (studentName: string) => {
    onShowToast('info', 'Recovery Notice Dispatched', `Automated WhatsApp payment link & fee reminder sent to parents of ${studentName}.`);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <PageHeader
        title="MIS Collection & Revenue Analytics"
        description="Executive Management Information System (MIS) tracking institutional fee collections, stream-wise recovery rates, digital payment channels, and arrears recovery."
        breadcrumbs={[
          { label: 'Insights & Settings' },
          { label: 'MIS Collection Dashboard', active: true }
        ]}
        primaryAction={{
          label: "Export MIS Excel Dossier",
          icon: <Download className="w-4 h-4" />,
          onClick: () => onShowToast('success', 'MIS Report Exported', 'Full Excel Workbook with Stream & Ledger breakdowns generated.')
        }}
        secondaryActions={[
          {
            label: "Print Board Summary PDF",
            icon: <Printer className="w-3.5 h-3.5" />,
            onClick: () => onShowToast('info', 'Generating Board Pack', 'Official PDF Executive Summary prepared for Board of Trustees.')
          }
        ]}
      />

      {/* 2. Top Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          label="Total Gross Collection"
          value={`₹${(metrics.totalGrossCollected / 100000).toFixed(2)}L`}
          icon={ReceiptIndianRupee}
          trend={{ value: `${metrics.achievementRate}% achieved`, isPositive: true }}
          subtext={`Target: ₹${(metrics.collectionTarget / 100000).toFixed(2)}L`}
        />
        <StatCard
          label="Outstanding Dues"
          value={`₹${(metrics.totalOutstanding / 100000).toFixed(2)}L`}
          icon={Wallet}
          trend={{ value: `${metrics.defaultersCount} active arrears`, isNeutral: true }}
          subtext="Under active recovery"
        />
        <StatCard
          label="Today's Collections"
          value={`₹${(metrics.todayCollection).toLocaleString('en-IN')}`}
          icon={TrendingUp}
          trend={{ value: "+18.2% vs yesterday", isPositive: true }}
          subtext="42 live transactions"
        />
        <StatCard
          label="Digital Payments (UPI/Net)"
          value={`${metrics.digitalPaymentRate}%`}
          icon={CreditCard}
          trend={{ value: "Paperless collections", isPositive: true }}
          subtext="HDFC & Razorpay settlement"
        />
        <StatCard
          label="Reconciliation Rate"
          value={`${metrics.reconciliationRate}%`}
          icon={CheckCircle2}
          subtext="Zero unmapped credits"
        />
      </div>

      {/* 3. Tab Bar */}
      <div className="flex border-b border-surface-border overflow-x-auto bg-white rounded-t-xl px-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`py-3 px-4 sm:px-5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeTab === 'overview'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-ink-secondary hover:text-ink-primary'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>MIS Executive Visual Dashboard</span>
        </button>

        <button
          onClick={() => setActiveTab('departments')}
          className={`py-3 px-4 sm:px-5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeTab === 'departments'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-ink-secondary hover:text-ink-primary'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Stream & Department Performance</span>
          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-700">
            {streams.length} Streams
          </span>
        </button>

        <button
          onClick={() => setActiveTab('channels')}
          className={`py-3 px-4 sm:px-5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeTab === 'channels'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-ink-secondary hover:text-ink-primary'
          }`}
        >
          <PieChart className="w-4 h-4" />
          <span>Payment Channels & Gateway Share</span>
        </button>

        <button
          onClick={() => setActiveTab('defaulters')}
          className={`py-3 px-4 sm:px-5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeTab === 'defaulters'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-ink-secondary hover:text-ink-primary'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Aging of Dues & Defaulters</span>
          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800">
            ₹18.75L Due
          </span>
        </button>
      </div>

      {/* 4. TAB 1: EXECUTIVE VISUAL DASHBOARD (GRAPHS) */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Main Visuals Grid: Monthly Bar Chart + Donut Channel Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* GRAPH 1: Monthly Collection vs Target Trend */}
            <div className="lg:col-span-2 bg-white border border-surface-border rounded-xl p-5 shadow-subtle flex flex-col">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-surface-border/60">
                <div>
                  <h3 className="text-base font-bold text-ink-primary flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-indigo-600" />
                    Monthly Collection vs Target Trajectory (FY 2026-27)
                  </h3>
                  <p className="text-xs text-ink-secondary mt-0.5">
                    Real-time fee receipts compared against budget targets across months.
                  </p>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1.5 font-medium text-ink-secondary">
                    <span className="w-3 h-3 rounded bg-indigo-600" />
                    Collected
                  </span>
                  <span className="flex items-center gap-1.5 font-medium text-ink-secondary">
                    <span className="w-3 h-1.5 rounded-full bg-amber-500" />
                    Target
                  </span>
                </div>
              </div>

              {/* Attractive SVG Bar & Target Line Chart */}
              <div className="flex-1 min-h-[240px] relative flex flex-col justify-end">
                {/* SVG Visual */}
                <div className="w-full h-56 relative flex items-end justify-between gap-2 pt-6 pb-2 px-1">
                  {monthlyTrends.map((item, idx) => {
                    const maxVal = 2600000;
                    const collHeight = (item.collected / maxVal) * 100;
                    const targetHeight = (item.target / maxVal) * 100;
                    const isHovered = hoveredMonth === idx;

                    return (
                      <div
                        key={item.month}
                        onMouseEnter={() => setHoveredMonth(idx)}
                        onMouseLeave={() => setHoveredMonth(null)}
                        className="flex-1 flex flex-col items-center h-full justify-end cursor-pointer group relative"
                      >
                        {/* Hover Tooltip Card */}
                        {isHovered && (
                          <div className="absolute -top-16 z-20 bg-slate-900 text-white p-2 rounded-lg shadow-xl text-left pointer-events-none whitespace-nowrap text-xs">
                            <p className="font-bold text-indigo-300">{item.month}</p>
                            <p className="tabular-nums">Collected: ₹{(item.collected / 100000).toFixed(2)}L</p>
                            <p className="text-[10px] text-amber-300 tabular-nums">Target: ₹{(item.target / 100000).toFixed(2)}L ({item.achievementPct}%)</p>
                          </div>
                        )}

                        <div className="w-full flex items-end justify-center relative h-44">
                          {/* Target Tick Marker */}
                          <div
                            style={{ bottom: `${targetHeight}%` }}
                            className="absolute w-full flex justify-center items-center z-10 pointer-events-none"
                          >
                            <span className="w-8 h-1 bg-amber-500 rounded-full shadow-sm" />
                          </div>

                          {/* Collection Bar with Gradient Indigo */}
                          <div
                            style={{ height: `${collHeight}%` }}
                            className={`w-7 sm:w-10 rounded-t-lg transition-all duration-200 relative flex justify-center ${
                              isHovered
                                ? 'bg-gradient-to-t from-indigo-700 to-indigo-500 shadow-lg scale-[1.03]'
                                : 'bg-gradient-to-t from-indigo-600 to-indigo-400 opacity-90 group-hover:opacity-100'
                            }`}
                          >
                            <span className="opacity-0 group-hover:opacity-100 absolute -top-5 text-[10px] font-bold text-indigo-700 tabular-nums bg-white px-1.5 py-0.2 rounded shadow-sm border border-indigo-200 whitespace-nowrap z-10 transition-opacity">
                              ₹{(item.collected / 100000).toFixed(1)}L
                            </span>
                          </div>
                        </div>

                        {/* Month Label */}
                        <span className={`mt-2 text-[11px] font-medium truncate ${isHovered ? 'text-indigo-600 font-bold' : 'text-ink-secondary'}`}>
                          {item.month.split(' ')[0]}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom baseline */}
                <div className="border-t border-surface-border/80 pt-3 flex items-center justify-between text-xs text-ink-secondary">
                  <span>April peak driven by annual tuition & admission fees</span>
                  <span className="font-semibold text-indigo-600">Average Monthly Velocity: ₹11.78 Lakhs</span>
                </div>
              </div>
            </div>

            {/* GRAPH 2: Payment Mode Share Donut / Radial Visual */}
            <div className="bg-white border border-surface-border rounded-xl p-5 shadow-subtle flex flex-col justify-between">
              <div className="pb-3 border-b border-surface-border/60">
                <h3 className="text-base font-bold text-ink-primary flex items-center gap-2">
                  <PieChart className="w-4 h-4 text-purple-600" />
                  Collection Channels
                </h3>
                <p className="text-xs text-ink-secondary mt-0.5">
                  Share by payment gateway and counter receipts.
                </p>
              </div>

              {/* Visual Radial / Donut representation using SVG */}
              <div className="py-4 flex items-center justify-center">
                <div className="relative w-44 h-44 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    {/* Circle 1: UPI (52.4%) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="transparent"
                      stroke="#6366F1"
                      strokeWidth="14"
                      strokeDasharray="238.76"
                      strokeDashoffset="113.65" // (1 - 0.524) * 238.76
                      className="transition-all hover:stroke-indigo-700 cursor-pointer"
                    />
                    {/* Circle 2: NetBanking (26.0%) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="transparent"
                      stroke="#8B5CF6"
                      strokeWidth="14"
                      strokeDasharray="238.76"
                      strokeDashoffset="176.68"
                      className="transition-all hover:stroke-purple-700 cursor-pointer"
                      style={{ transform: 'rotate(188.6deg)', transformOrigin: '50% 50%' }}
                    />
                    {/* Circle 3: Cheque (13.6%) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="transparent"
                      stroke="#06B6D4"
                      strokeWidth="14"
                      strokeDasharray="238.76"
                      strokeDashoffset="206.28"
                      className="transition-all hover:stroke-cyan-700 cursor-pointer"
                      style={{ transform: 'rotate(282.2deg)', transformOrigin: '50% 50%' }}
                    />
                    {/* Circle 4: Cash (8.0%) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="transparent"
                      stroke="#F59E0B"
                      strokeWidth="14"
                      strokeDasharray="238.76"
                      strokeDashoffset="219.65"
                      className="transition-all hover:stroke-amber-600 cursor-pointer"
                      style={{ transform: 'rotate(331.2deg)', transformOrigin: '50% 50%' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                    <span className="text-xl font-bold text-ink-primary tabular-nums">78.4%</span>
                    <span className="text-[10px] uppercase font-semibold text-slate-500">Digital Share</span>
                  </div>
                </div>
              </div>

              {/* Legend with exact amounts */}
              <div className="space-y-2 pt-2 border-t border-surface-border/60">
                {paymentModes.map((mode, i) => (
                  <div key={mode.mode} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: mode.color }} />
                      <span className="font-medium text-ink-primary">{mode.mode}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-ink-primary tabular-nums">₹{(mode.amount / 100000).toFixed(2)}L</span>
                      <span className="text-slate-400 text-[10px] ml-1.5">({mode.percentage}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Secondary Visuals Grid: Stream Progress Meters + Fee Head Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* GRAPH 3: Stream & Course Recovery Rates */}
            <div className="bg-white border border-surface-border rounded-xl p-5 shadow-subtle space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-surface-border/60">
                <div>
                  <h3 className="text-base font-bold text-ink-primary flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-indigo-600" />
                    Stream-wise Realization Progress
                  </h3>
                  <p className="text-xs text-ink-secondary mt-0.5">
                    Target vs Realized amounts per academic department.
                  </p>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Overall: 81.5%
                </span>
              </div>

              <div className="space-y-4">
                {streams.map((stream) => (
                  <div key={stream.code} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-ink-primary">{stream.stream}</span>
                        <span className="text-[10px] font-mono text-slate-500 ml-2">({stream.studentsEnrolled} Students)</span>
                      </div>
                      <div className="text-right font-mono font-bold text-indigo-700">
                        ₹{(stream.collectedAmount / 100000).toFixed(2)}L / ₹{(stream.targetAmount / 100000).toFixed(2)}L
                        <span className="ml-2 text-xs text-emerald-600 font-semibold">({stream.recoveryRatePct}%)</span>
                      </div>
                    </div>

                    {/* Progress Bar with Dual Tone */}
                    <div className="w-full h-3 bg-surface-muted rounded-full overflow-hidden flex shadow-inner">
                      <div
                        style={{ width: `${stream.recoveryRatePct}%` }}
                        className="bg-indigo-600 rounded-full transition-all duration-300 relative group"
                        title={`Collected: ₹${stream.collectedAmount}`}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-ink-secondary pt-0.5">
                      <span>HOD: {stream.headOfDept}</span>
                      <span className="text-amber-700 font-medium">
                        Arrears: ₹{(stream.outstandingAmount / 100000).toFixed(2)}L ({stream.defaultersCount} students)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* GRAPH 4: Fee Head Breakdown */}
            <div className="bg-white border border-surface-border rounded-xl p-5 shadow-subtle space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-surface-border/60">
                <div>
                  <h3 className="text-base font-bold text-ink-primary flex items-center gap-2">
                    <Coins className="w-4 h-4 text-purple-600" />
                    Fee Head Category Collection
                  </h3>
                  <p className="text-xs text-ink-secondary mt-0.5">
                    Collection efficiency across tuition, lab, computer, and development heads.
                  </p>
                </div>
              </div>

              <div className="space-y-3.5">
                {feeHeads.map((head) => (
                  <div key={head.head} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-ink-primary">{head.head}</span>
                      <span className="font-bold text-ink-primary tabular-nums">
                        ₹{(head.collected / 100000).toFixed(2)}L <span className="text-slate-400 font-normal">/ ₹{(head.target / 100000).toFixed(2)}L</span>
                      </span>
                    </div>

                    <div className="w-full h-2.5 bg-surface-muted rounded-full overflow-hidden flex">
                      <div
                        style={{ width: `${head.percentage}%`, backgroundColor: head.color }}
                        className="rounded-full transition-all duration-300"
                        title={`${head.head}: ${head.percentage}%`}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-500">
                      <span>Realized: {head.percentage}%</span>
                      <span>Pending: ₹{((head.target - head.collected) / 100000).toFixed(2)}L</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Aging Risk Bar: 4-Tier Arrears Distribution */}
          <div className="bg-white border border-surface-border rounded-xl p-5 shadow-subtle space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-sm font-bold text-ink-primary flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  Outstanding Arrears Aging & Risk Exposure
                </h4>
                <p className="text-xs text-ink-secondary mt-0.5">
                  Breakdown of ₹18.75 Lakhs pending dues categorized by aging delinquency buckets.
                </p>
              </div>

              <button
                onClick={() => setActiveTab('defaulters')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                View Defaulters Registry <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Segmented Bar */}
            <div className="w-full h-4 bg-surface-muted rounded-full overflow-hidden flex shadow-inner">
              <div style={{ width: '36.2%' }} className="bg-emerald-500 hover:opacity-90" title="0-30 Days: ₹6.80L" />
              <div style={{ width: '28.8%' }} className="bg-amber-400 hover:opacity-90" title="31-60 Days: ₹5.40L" />
              <div style={{ width: '20.8%' }} className="bg-orange-500 hover:opacity-90" title="61-90 Days: ₹3.90L" />
              <div style={{ width: '14.2%' }} className="bg-rose-600 hover:opacity-90" title="90+ Days: ₹2.65L" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {agingBuckets.map((bucket) => (
                <div key={bucket.range} className="p-3 bg-surface-bg rounded-lg border border-surface-border">
                  <span className="text-[11px] font-semibold text-ink-secondary block">{bucket.range}</span>
                  <p className="text-sm font-bold text-ink-primary mt-0.5 tabular-nums">
                    ₹{(bucket.amount / 100000).toFixed(2)}L
                  </p>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">{bucket.studentsCount} Students Pending</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. TAB 2: DEPARTMENTS & STREAMS BREAKDOWN */}
      {activeTab === 'departments' && (
        <div className="space-y-4">
          <div className="bg-white border border-surface-border rounded-xl shadow-subtle overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-surface-bg/80 border-b border-surface-border text-ink-secondary text-[11px] uppercase tracking-wider font-semibold">
                    <th className="py-3 px-4">Academic Stream</th>
                    <th className="py-3 px-4">Department Head</th>
                    <th className="py-3 px-4 text-center">Enrolled</th>
                    <th className="py-3 px-4 text-right">Target Fee (₹)</th>
                    <th className="py-3 px-4 text-right">Collected (₹)</th>
                    <th className="py-3 px-4 text-right">Outstanding (₹)</th>
                    <th className="py-3 px-4 text-center">Realization</th>
                    <th className="py-3 px-4 text-center">Defaulters</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border/60">
                  {streams.map((stream) => (
                    <tr key={stream.code} className="hover:bg-surface-cardHover transition-colors">
                      <td className="py-3.5 px-4">
                        <p className="font-bold text-ink-primary">{stream.stream}</p>
                        <span className="text-[10px] font-mono text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded border border-indigo-200">
                          {stream.code}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-medium text-ink-primary">
                        {stream.headOfDept}
                      </td>

                      <td className="py-3.5 px-4 text-center font-mono tabular-nums">
                        {stream.studentsEnrolled}
                      </td>

                      <td className="py-3.5 px-4 text-right font-mono tabular-nums text-ink-secondary">
                        ₹{stream.targetAmount.toLocaleString('en-IN')}
                      </td>

                      <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-700 tabular-nums">
                        ₹{stream.collectedAmount.toLocaleString('en-IN')}
                      </td>

                      <td className="py-3.5 px-4 text-right font-mono font-bold text-amber-700 tabular-nums">
                        ₹{stream.outstandingAmount.toLocaleString('en-IN')}
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-flex items-center text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {stream.recoveryRatePct}%
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-center font-bold text-amber-800">
                        {stream.defaultersCount}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => {
                            onShowToast('info', 'Stream Ledger Exported', `Detailed ledger for ${stream.stream} generated.`);
                          }}
                          className="px-2.5 py-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 rounded border border-indigo-200 transition-colors"
                        >
                          Export Ledger
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

      {/* 6. TAB 3: PAYMENT CHANNELS & GATEWAY SHARE */}
      {activeTab === 'channels' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {paymentModes.map((channel) => (
              <div key={channel.mode} className="p-5 bg-white border border-surface-border rounded-xl shadow-subtle space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: channel.color }} />
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                    {channel.percentage}% Share
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-ink-primary">{channel.mode}</h4>
                  <p className="text-xl font-bold text-ink-primary mt-1 tabular-nums">
                    ₹{(channel.amount / 100000).toFixed(2)} Lakhs
                  </p>
                  <p className="text-xs text-ink-secondary mt-0.5">
                    {channel.transactionsCount.toLocaleString('en-IN')} Verified Receipts
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white border border-surface-border rounded-xl p-5 shadow-subtle space-y-4">
            <h4 className="text-sm font-bold text-ink-primary">
              Recent High-Value Digital Collections & Bank Settlements
            </h4>
            <div className="divide-y divide-surface-border/60">
              {MOCK_FEE_TRANSACTIONS.map((tx) => (
                <div key={tx.receiptNo} className="py-3 flex items-center justify-between text-xs sm:text-sm">
                  <div>
                    <span className="font-mono font-bold text-indigo-700">{tx.receiptNo}</span>
                    <span className="text-ink-secondary mx-2">•</span>
                    <span className="font-semibold text-ink-primary">{tx.studentName}</span>
                    <span className="text-slate-400 text-xs ml-2 font-mono">({tx.grade})</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-slate-500">{tx.date}</span>
                    <span className="font-mono font-bold text-ink-primary tabular-nums">₹{tx.amount.toLocaleString('en-IN')}</span>
                    <StatusBadge variant="brand" size="sm">{tx.paymentMode}</StatusBadge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 7. TAB 4: DEFAULTERS & AGING WATCHLIST */}
      {activeTab === 'defaulters' && (
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <Clock className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-amber-900">
                Arrears Recovery Watchlist & Notice Trigger
              </h4>
              <p className="text-xs text-amber-700 mt-0.5">
                Students with overdue term balances. Send automated reminder notices, initiate parental counseling, or issue statutory show-cause fee recovery warnings.
              </p>
            </div>
          </div>

          <div className="bg-white border border-surface-border rounded-xl shadow-subtle overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-surface-bg/80 border-b border-surface-border text-ink-secondary text-[11px] uppercase tracking-wider font-semibold">
                    <th className="py-3 px-4">Student</th>
                    <th className="py-3 px-4">Class</th>
                    <th className="py-3 px-4 text-right">Outstanding (₹)</th>
                    <th className="py-3 px-4">Due Date</th>
                    <th className="py-3 px-4 text-center">Aging Bucket</th>
                    <th className="py-3 px-4">Parent Contact</th>
                    <th className="py-3 px-4">Current Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border/60">
                  {defaultersList.map((item) => (
                    <tr key={item.id} className="hover:bg-amber-50/20 transition-colors">
                      <td className="py-3 px-4">
                        <p className="font-bold text-ink-primary">{item.name}</p>
                        <p className="text-[11px] font-mono text-ink-secondary">{item.admNo}</p>
                      </td>

                      <td className="py-3 px-4 font-medium text-ink-primary">
                        {item.grade}
                      </td>

                      <td className="py-3 px-4 text-right font-mono font-bold text-rose-700 tabular-nums">
                        ₹{item.dueAmount.toLocaleString('en-IN')}
                      </td>

                      <td className="py-3 px-4 font-mono text-xs text-ink-secondary tabular-nums">
                        {item.dueSince}
                      </td>

                      <td className="py-3 px-4 text-center">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          item.bucket === '90+ Days'
                            ? 'bg-rose-100 text-rose-700 border border-rose-200'
                            : item.bucket === '61 - 90 Days'
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {item.bucket} ({item.agingDays}d)
                        </span>
                      </td>

                      <td className="py-3 px-4 font-mono text-xs text-ink-secondary">
                        {item.phone}
                      </td>

                      <td className="py-3 px-4">
                        <StatusBadge variant={item.bucket === '90+ Days' ? 'danger' : 'warning'} size="sm">
                          {item.status}
                        </StatusBadge>
                      </td>

                      <td className="py-3 px-4 text-right space-x-1">
                        <button
                          onClick={() => handleSendReminder(item.name)}
                          className="px-2.5 py-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 rounded border border-indigo-200 transition-colors"
                        >
                          Send Notice
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
    </div>
  );
};
export default MISCollectionView;

