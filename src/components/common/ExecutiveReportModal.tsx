import React from 'react';
import { X, Printer, Download, ShieldCheck, School, CheckCircle2 } from 'lucide-react';
import { SCHOOL_INFO, CURRENT_SESSION } from '../../data/mockData';

interface ExecutiveReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPrint: () => void;
  onDownloadPdf: () => void;
}

export const ExecutiveReportModal: React.FC<ExecutiveReportModalProps> = ({
  isOpen,
  onClose,
  onPrint,
  onDownloadPdf
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-[2px]" 
          onClick={onClose} 
        />

        <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-modal border border-surface-border overflow-hidden z-10 flex flex-col max-h-[90vh]">
          {/* Header */}
          <div className="px-6 py-4 border-b border-surface-border flex items-center justify-between bg-surface-bg">
            <div className="flex items-center gap-2">
              <School className="w-5 h-5 text-brand-navy" />
              <div>
                <h3 className="font-bold text-sm text-ink-primary">
                  Executive Operational Dossier — DRT Knowledge Hub
                </h3>
                <p className="text-[11px] text-ink-secondary">
                  Academic Session {CURRENT_SESSION} • Confidential Institutional Board Review
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onPrint}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg border border-surface-border bg-white hover:bg-surface-muted text-ink-primary"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Dossier</span>
              </button>
              <button
                onClick={onDownloadPdf}
                className="inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-brand-navy hover:bg-brand-navyDark text-white shadow-subtle"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-ink-secondary hover:text-ink-primary ml-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Dossier Content */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-xs sm:text-sm">
            {/* Title Header */}
            <div className="text-center pb-4 border-b border-surface-border">
              <h2 className="text-lg font-bold text-brand-navy uppercase tracking-wide">
                {SCHOOL_INFO.name}
              </h2>
              <p className="text-xs text-ink-secondary">
                {SCHOOL_INFO.address}
              </p>
              <p className="text-xs text-brand-blue font-semibold mt-0.5">
                CBSE Affiliation: {SCHOOL_INFO.affiliationNo} • UDISE: {SCHOOL_INFO.udiseCode}
              </p>
              <div className="mt-2 text-xs font-bold text-ink-primary bg-surface-muted inline-block px-3 py-1 rounded">
                COMPREHENSIVE INSTITUTIONAL HEALTH SUMMARY (SESSION {CURRENT_SESSION})
              </div>
            </div>

            {/* 6 Essential KPI Table */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-navy mb-2">
                1. Executive Operational Scorecard
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-surface-bg border border-surface-border rounded-lg">
                  <span className="text-[11px] text-ink-secondary block">Total Students</span>
                  <span className="text-xl font-bold text-ink-primary tabular-nums">1,248</span>
                  <span className="text-[10px] text-emerald-600 block mt-0.5">+3.2% vs last term</span>
                </div>
                <div className="p-3 bg-surface-bg border border-surface-border rounded-lg">
                  <span className="text-[11px] text-ink-secondary block">Present Today</span>
                  <span className="text-xl font-bold text-emerald-700 tabular-nums">94.6%</span>
                  <span className="text-[10px] text-ink-secondary block mt-0.5">1,181 Active in School</span>
                </div>
                <div className="p-3 bg-surface-bg border border-surface-border rounded-lg">
                  <span className="text-[11px] text-ink-secondary block">Fee Collection</span>
                  <span className="text-xl font-bold text-brand-navy tabular-nums">₹82.4 Lakhs</span>
                  <span className="text-[10px] text-emerald-600 block mt-0.5">81.5% target met</span>
                </div>
                <div className="p-3 bg-surface-bg border border-surface-border rounded-lg">
                  <span className="text-[11px] text-ink-secondary block">Outstanding Fees</span>
                  <span className="text-xl font-bold text-amber-600 tabular-nums">₹18.6 Lakhs</span>
                  <span className="text-[10px] text-ink-secondary block mt-0.5">142 accounts under follow-up</span>
                </div>
                <div className="p-3 bg-surface-bg border border-surface-border rounded-lg">
                  <span className="text-[11px] text-ink-secondary block">Active Staff</span>
                  <span className="text-xl font-bold text-ink-primary tabular-nums">86 Members</span>
                  <span className="text-[10px] text-ink-secondary block mt-0.5">62 Teaching • 24 Support</span>
                </div>
                <div className="p-3 bg-surface-bg border border-surface-border rounded-lg">
                  <span className="text-[11px] text-ink-secondary block">Compliance Status</span>
                  <span className="text-xl font-bold text-emerald-700 tabular-nums">87% Certified</span>
                  <span className="text-[10px] text-amber-700 block mt-0.5">Fire NOC renewal in progress</span>
                </div>
              </div>
            </div>

            {/* Statutory Compliance Section */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-navy mb-2">
                2. CBSE Statutory Compliance Summary
              </h4>
              <table className="w-full text-xs text-left border border-surface-border">
                <tbody className="divide-y divide-surface-border">
                  <tr><td className="p-2.5 font-semibold bg-surface-bg w-1/3">Affiliation Category</td><td className="p-2.5 font-medium">Provisional Affiliation up to Senior Secondary Level</td></tr>
                  <tr><td className="p-2.5 font-semibold bg-surface-bg">Thane Municipal Fire NOC</td><td className="p-2.5 font-bold text-amber-800 bg-amber-50">TMC/FIRE/2023/8491 — Renewal Inspection Scheduled (18 Days Left)</td></tr>
                  <tr><td className="p-2.5 font-semibold bg-surface-bg">Building Safety Certificate</td><td className="p-2.5 font-medium text-emerald-700">TMC/PWD/2024/1104 — Valid until 2027</td></tr>
                  <tr><td className="p-2.5 font-semibold bg-surface-bg">Land Area Norm</td><td className="p-2.5 font-medium text-emerald-700">8,500 Sq. Meters (2.1 Acres compact single campus in Mumbra)</td></tr>
                  <tr><td className="p-2.5 font-semibold bg-surface-bg">CBSE Rule 13 Attendance Alert</td><td className="p-2.5 font-medium text-rose-700">18 candidates with aggregate &lt;75% attendance; registered letters issued</td></tr>
                </tbody>
              </table>
            </div>

            {/* Quality & Management Declaration */}
            <div className="p-4 bg-surface-bg rounded-xl border border-surface-border text-xs space-y-1">
              <p className="font-semibold text-ink-primary">Institutional Assurance Statement:</p>
              <p className="text-ink-secondary leading-relaxed">
                This dossier has been compiled through the DRT Smart School ERP platform, developed by InfiSpark Technologies LLP. All figures reflect simulated demonstration parameters for operational inspection and administrative review.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-surface-border bg-surface-bg flex items-center justify-between text-xs text-ink-secondary">
            <span>DRT Knowledge Hub International School • Mumbra</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 font-semibold bg-surface-muted hover:bg-slate-200 rounded-lg text-ink-primary"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
