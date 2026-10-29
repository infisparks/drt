import React, { useState } from 'react';
import { 
  BarChart3, 
  FileText, 
  Download, 
  Calendar, 
  Filter, 
  CheckCircle2, 
  ShieldCheck, 
  Users, 
  ReceiptIndianRupee,
  GraduationCap
} from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { StatCard } from '../components/common/StatCard';
import { StatusBadge } from '../components/common/StatusBadge';

interface ReportsViewProps {
  onShowToast: (type: 'success' | 'warning' | 'error' | 'info', title: string, message?: string) => void;
}

export const ReportsView: React.FC<ReportsViewProps> = ({ onShowToast }) => {
  const [reportType, setReportType] = useState('academic');
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'excel'>('pdf');

  const reportCategories = [
    {
      id: 'academic',
      title: 'CBSE Academic & Exam Progress Report',
      description: 'Term-wise subject pass rates, remedial student rosters, and board pre-exam readiness.',
      icon: GraduationCap,
      itemsCount: '1,248 Students Included'
    },
    {
      id: 'compliance',
      title: 'CBSE Statutory Compliance Audit Dossier',
      description: 'Fire safety NOC, drinking water certification, land lease title, and Appendix IX disclosures.',
      icon: ShieldCheck,
      itemsCount: '48 Indicators Certified'
    },
    {
      id: 'finance',
      title: 'Fee Collection, Ledgers & Dues Recovery',
      description: 'Term fee receipts, defaulter accounts, online gateway settlements, and quarterly revenue.',
      icon: ReceiptIndianRupee,
      itemsCount: '₹82.4L YTD Volume'
    },
    {
      id: 'attendance',
      title: 'CBSE Rule 13 Shortage & Monthly Attendance',
      description: 'Daily roll call compliance, aggregate attendance percentages, and shortage warning log.',
      icon: Users,
      itemsCount: '18 Students on Watchlist'
    }
  ];

  const handleGenerateExport = (title: string) => {
    onShowToast(
      'success',
      `${selectedFormat.toUpperCase()} Export Generated`,
      `Simulated demo export: "${title}" downloaded in ${selectedFormat.toUpperCase()} format.`
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Reports & Institutional Analytics"
        description="Comprehensive audit-ready reports across academic results, CBSE compliances, fee accounts, and attendance."
        breadcrumbs={[
          { label: 'Insights & Settings' },
          { label: 'Reports & Analytics', active: true }
        ]}
      />

      {/* Report Categories Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reportCategories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = reportType === cat.id;

          return (
            <div
              key={cat.id}
              onClick={() => setReportType(cat.id)}
              className={`p-5 rounded-xl border transition-all cursor-pointer bg-white ${
                isSelected
                  ? 'border-brand-navy ring-1 ring-brand-navy shadow-card'
                  : 'border-surface-border hover:border-slate-300 shadow-subtle'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className={`p-2.5 rounded-lg flex-shrink-0 ${
                  isSelected ? 'bg-brand-navy text-white' : 'bg-surface-muted text-brand-navy'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-sm text-ink-primary">
                      {cat.title}
                    </h3>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-brand-navy" />
                    )}
                  </div>
                  <p className="text-xs text-ink-secondary mt-1 leading-snug">
                    {cat.description}
                  </p>
                  <span className="inline-block mt-2 text-[11px] font-semibold text-brand-blue">
                    {cat.itemsCount}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Export Configuration & Filter Card */}
      <div className="bg-white border border-surface-border rounded-xl p-5 shadow-subtle space-y-4">
        <div>
          <h3 className="text-base font-bold text-ink-primary">
            Export Parameters & File Format
          </h3>
          <p className="text-xs text-ink-secondary mt-0.5">
            Configure report range and simulated download format
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-ink-primary mb-1">
              Academic Session
            </label>
            <select className="w-full px-3 py-2 text-xs border border-surface-border rounded-lg bg-surface-bg font-semibold">
              <option>Session 2026–27 (Current Active)</option>
              <option>Session 2025–26 (Archive)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-ink-primary mb-1">
              Class / Target Scope
            </label>
            <select className="w-full px-3 py-2 text-xs border border-surface-border rounded-lg bg-surface-bg font-semibold">
              <option>All Classes (Nursery to Class XII)</option>
              <option>Secondary Wing (Classes IX & X)</option>
              <option>Senior Secondary (Classes XI & XII)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-ink-primary mb-1">
              Export Format
            </label>
            <div className="flex rounded-lg border border-surface-border p-0.5 bg-surface-bg">
              <button
                onClick={() => setSelectedFormat('pdf')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded ${
                  selectedFormat === 'pdf' ? 'bg-white shadow-subtle text-brand-navy font-bold' : 'text-ink-secondary'
                }`}
              >
                PDF Document
              </button>
              <button
                onClick={() => setSelectedFormat('excel')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded ${
                  selectedFormat === 'excel' ? 'bg-white shadow-subtle text-brand-navy font-bold' : 'text-ink-secondary'
                }`}
              >
                Excel / CSV
              </button>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-surface-border flex items-center justify-between">
          <span className="text-xs text-ink-secondary">
            Note: Generated with watermarked simulated institutional demonstration data.
          </span>
          <button
            onClick={() => handleGenerateExport(reportCategories.find(c => c.id === reportType)?.title || 'Report')}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-brand-navy hover:bg-brand-navyDark text-white shadow-subtle transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Generate & Download {selectedFormat.toUpperCase()}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
