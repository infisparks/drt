import React, { useState } from 'react';
import { 
  FileText, 
  ExternalLink, 
  Globe, 
  CheckCircle2, 
  Download, 
  Eye, 
  Share2, 
  Building2, 
  Users, 
  GraduationCap, 
  ShieldCheck,
  Calendar,
  X,
  Printer
} from 'lucide-react';
import { PublicDisclosureRow } from '../types';
import { MOCK_PUBLIC_DISCLOSURE_ROWS, SCHOOL_INFO } from '../data/mockData';
import { PageHeader } from '../components/common/PageHeader';
import { StatCard } from '../components/common/StatCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { DetailDrawer } from '../components/common/DetailDrawer';

interface PublicDisclosureViewProps {
  onShowToast: (type: 'success' | 'warning' | 'error' | 'info', title: string, message?: string) => void;
}

export const PublicDisclosureView: React.FC<PublicDisclosureViewProps> = ({ onShowToast }) => {
  const [selectedSection, setSelectedSection] = useState<'ALL' | 'A' | 'B' | 'C' | 'D' | 'E'>('ALL');
  const [isWebPreviewOpen, setIsWebPreviewOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [lastPublished, setLastPublished] = useState('Oct 24, 2026, 04:30 PM');

  const filteredRows = MOCK_PUBLIC_DISCLOSURE_ROWS.filter(row => {
    if (selectedSection === 'ALL') return true;
    return row.section.startsWith(selectedSection + '.');
  });

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      const now = new Date().toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' });
      setLastPublished(now);
      onShowToast('success', 'Public Disclosure Published', `Synchronized with school domain: ${SCHOOL_INFO.website}/cbse-disclosure`);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Mandatory Public Disclosure (CBSE Appendix IX)"
        description="Mandatory statutory disclosures required on the school website under CBSE Affiliation Bye-Laws Appendix IX."
        breadcrumbs={[
          { label: 'Governance' },
          { label: 'Public Disclosure', active: true }
        ]}
        primaryAction={{
          label: isPublishing ? "Synchronizing..." : "Publish to School Website",
          icon: <Globe className="w-4 h-4" />,
          onClick: handlePublish
        }}
        secondaryActions={[
          {
            label: "Public Website Preview",
            icon: <Eye className="w-3.5 h-3.5" />,
            onClick: () => setIsWebPreviewOpen(true)
          },
          {
            label: "Export PDF",
            icon: <Download className="w-3.5 h-3.5" />,
            onClick: () => onShowToast('info', 'PDF Exported', 'Official CBSE Appendix IX PDF generated.')
          }
        ]}
      />

      {/* Verification Status Banner */}
      <div className="p-4 bg-white border border-surface-border rounded-xl shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0 border border-emerald-200">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-ink-primary">
                Mandatory Disclosure Status: 100% Compliant & Audited
              </span>
              <StatusBadge variant="success">Approved by Principal</StatusBadge>
            </div>
            <p className="text-ink-secondary mt-0.5">
              Last published to live URL on: <strong className="text-ink-primary tabular-nums">{lastPublished}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-ink-secondary flex-shrink-0">
          <span className="text-[11px] bg-surface-muted px-2.5 py-1 rounded-md border border-surface-border">
            CBSE Circular: CBSE/AFF/2021/Appendix-IX
          </span>
        </div>
      </div>

      {/* Category Tabs: Section A - E */}
      <div className="flex border-b border-surface-border overflow-x-auto">
        {[
          { code: 'ALL', label: 'All Disclosures (32 Items)' },
          { code: 'A', label: 'Part A: General Information' },
          { code: 'B', label: 'Part B: Documents & Information' },
          { code: 'C', label: 'Part C: Result & Academics' },
          { code: 'D', label: 'Part D: Staff (Teaching)' },
          { code: 'E', label: 'Part E: School Infrastructure' },
        ].map((tab) => (
          <button
            key={tab.code}
            onClick={() => setSelectedSection(tab.code as any)}
            className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
              selectedSection === tab.code
                ? 'border-brand-navy text-brand-navy'
                : 'border-transparent text-ink-secondary hover:text-ink-primary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Disclosure Data Table */}
      <div className="bg-white border border-surface-border rounded-xl shadow-subtle overflow-hidden">
        <div className="p-4 border-b border-surface-border bg-surface-bg/50 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-ink-primary">
              Appendix IX Mandatory Format Data Register
            </h3>
            <p className="text-xs text-ink-secondary">
              Official disclosures corresponding to CBSE SARAS and OASIS online affiliation registries
            </p>
          </div>
          <span className="text-xs font-semibold text-brand-navy">
            {filteredRows.length} Parameters
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-surface-bg/80 border-b border-surface-border text-ink-secondary text-[11px] uppercase tracking-wider font-semibold">
                <th className="py-3 px-4 w-16">Item #</th>
                <th className="py-3 px-4 w-72">Information Parameter</th>
                <th className="py-3 px-4">Details & Uploaded Records</th>
                <th className="py-3 px-4 text-center">Section</th>
                <th className="py-3 px-4 text-right">Preview Document</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border/60">
              {filteredRows.map((row) => (
                <tr key={row.slNo + row.information} className="hover:bg-surface-cardHover transition-colors">
                  <td className="py-3.5 px-4 font-bold text-brand-navy tabular-nums">
                    {row.slNo}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-ink-primary">
                    {row.information}
                  </td>
                  <td className="py-3.5 px-4 text-ink-primary">
                    <span className="font-medium">{row.details}</span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-surface-muted text-ink-secondary">
                      {row.section.split('.')[0]}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {row.documentLinkText ? (
                      <button
                        onClick={() => onShowToast('info', 'Opening Document', `Displaying verified PDF: ${row.documentLinkText}`)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-brand-blue hover:text-brand-navy"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>{row.documentLinkText}</span>
                      </button>
                    ) : (
                      <span className="text-xs text-ink-secondary">N/A</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Public Web Preview Modal */}
      {isWebPreviewOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-[2px]"
              onClick={() => setIsWebPreviewOpen(false)}
            />

            <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-modal border border-surface-border overflow-hidden z-10 flex flex-col max-h-[90vh]">
              {/* Browser Mockup Chrome */}
              <div className="px-4 py-3 bg-slate-800 text-white flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                  <span className="ml-2 font-mono text-[11px] text-slate-300">
                    https://{SCHOOL_INFO.website}/cbse-mandatory-disclosure
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-semibold text-[11px] flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5" /> Live Web Preview
                  </span>
                  <button
                    onClick={() => setIsWebPreviewOpen(false)}
                    className="p-1 rounded text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Public Website Preview Body */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
                {/* Website Header */}
                <div className="text-center border-b border-surface-border pb-6">
                  <div className="w-12 h-12 rounded-xl bg-brand-navy text-white mx-auto flex items-center justify-center mb-2 shadow-sm font-bold text-lg">
                    DRT
                  </div>
                  <h2 className="text-xl font-bold text-brand-navy">
                    {SCHOOL_INFO.name}
                  </h2>
                  <p className="text-xs text-ink-secondary mt-0.5">
                    {SCHOOL_INFO.address}
                  </p>
                  <p className="text-xs text-brand-blue font-semibold mt-1">
                    CBSE Affiliation No: {SCHOOL_INFO.affiliationNo} • School Code: {SCHOOL_INFO.schoolCode}
                  </p>
                  <div className="mt-3 inline-block px-3 py-1 rounded-full bg-surface-muted text-xs font-bold text-ink-primary">
                    MANDATORY PUBLIC DISCLOSURE (APPENDIX IX)
                  </div>
                </div>

                {/* Section A */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-brand-navy uppercase tracking-wider border-b border-surface-border pb-1">
                    A: General Information
                  </h3>
                  <table className="w-full text-xs text-left border border-surface-border">
                    <tbody className="divide-y divide-surface-border">
                      <tr><td className="p-2.5 w-1/3 bg-surface-bg font-semibold text-ink-secondary">NAME OF THE SCHOOL</td><td className="p-2.5 font-bold text-ink-primary">{SCHOOL_INFO.name}</td></tr>
                      <tr><td className="p-2.5 bg-surface-bg font-semibold text-ink-secondary">AFFILIATION NO.</td><td className="p-2.5 font-mono text-ink-primary">{SCHOOL_INFO.affiliationNo}</td></tr>
                      <tr><td className="p-2.5 bg-surface-bg font-semibold text-ink-secondary">SCHOOL CODE</td><td className="p-2.5 font-mono text-ink-primary">{SCHOOL_INFO.schoolCode}</td></tr>
                      <tr><td className="p-2.5 bg-surface-bg font-semibold text-ink-secondary">COMPLETE ADDRESS</td><td className="p-2.5 text-ink-primary">{SCHOOL_INFO.address}</td></tr>
                      <tr><td className="p-2.5 bg-surface-bg font-semibold text-ink-secondary">PRINCIPAL NAME & QUALIFICATION</td><td className="p-2.5 text-ink-primary">Mrs. Shaheen Shaikh (M.A., B.Ed., M.Ed., 18 yrs exp)</td></tr>
                      <tr><td className="p-2.5 bg-surface-bg font-semibold text-ink-secondary">SCHOOL EMAIL ID</td><td className="p-2.5 text-ink-primary">{SCHOOL_INFO.email}</td></tr>
                    </tbody>
                  </table>
                </div>

                {/* Section B: Documents */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-brand-navy uppercase tracking-wider border-b border-surface-border pb-1">
                    B: Documents and Information
                  </h3>
                  <table className="w-full text-xs text-left border border-surface-border">
                    <thead>
                      <tr className="bg-surface-bg font-semibold text-ink-secondary">
                        <th className="p-2.5">Document Details</th>
                        <th className="p-2.5 text-right">Uploaded Document Link</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-border">
                      <tr><td className="p-2.5 font-medium">COPIES OF AFFILIATION/UPGRADATION LETTER AND RECENT EXTENSION OF AFFILIATION</td><td className="p-2.5 text-right text-brand-blue font-semibold hover:underline">View Certificate (PDF)</td></tr>
                      <tr><td className="p-2.5 font-medium">COPIES OF SOCIETIES/TRUST/COMPANY REGISTRATION/RENEWAL CERTIFICATE</td><td className="p-2.5 text-right text-brand-blue font-semibold hover:underline">View Certificate (PDF)</td></tr>
                      <tr><td className="p-2.5 font-medium">COPY OF NO OBJECTION CERTIFICATE (NOC) ISSUED BY THE STATE GOVT.</td><td className="p-2.5 text-right text-brand-blue font-semibold hover:underline">View Certificate (PDF)</td></tr>
                      <tr><td className="p-2.5 font-medium">COPY OF VALID BUILDING SAFETY CERTIFICATE AS PER NATIONAL BUILDING CODE</td><td className="p-2.5 text-right text-brand-blue font-semibold hover:underline">View Certificate (PDF)</td></tr>
                      <tr><td className="p-2.5 font-medium">COPY OF VALID FIRE SAFETY CERTIFICATE ISSUED BY COMPETENT AUTHORITY</td><td className="p-2.5 text-right text-brand-blue font-semibold hover:underline">View Certificate (PDF)</td></tr>
                      <tr><td className="p-2.5 font-medium">COPY OF THE DEO CERTIFICATE SUBMITTED BY SCHOOL FOR AFFILIATION</td><td className="p-2.5 text-right text-brand-blue font-semibold hover:underline">View Certificate (PDF)</td></tr>
                      <tr><td className="p-2.5 font-medium">COPIES OF VALID WATER, HEALTH AND SANITATION CERTIFICATES</td><td className="p-2.5 text-right text-brand-blue font-semibold hover:underline">View Certificate (PDF)</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Preview Footer */}
              <div className="px-6 py-3.5 bg-surface-bg border-t border-surface-border flex items-center justify-between text-xs">
                <span className="text-ink-secondary">
                  Website powered by InfiSpark School Management Architecture
                </span>
                <button
                  onClick={() => setIsWebPreviewOpen(false)}
                  className="px-4 py-2 font-semibold bg-brand-navy hover:bg-brand-navyDark text-white rounded-lg shadow-subtle"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
