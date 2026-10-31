import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  FileCheck, 
  FileText, 
  Download, 
  Upload, 
  Search, 
  Filter, 
  Eye, 
  CheckCircle2, 
  AlertCircle, 
  Building, 
  Calendar,
  ExternalLink,
  History,
  MessageSquare
} from 'lucide-react';
import { CBSEDocument } from '../types';
import { MOCK_CBSE_DOCUMENTS } from '../data/mockData';
import { PageHeader } from '../components/common/PageHeader';
import { StatCard } from '../components/common/StatCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { SearchFilterBar } from '../components/common/SearchFilterBar';
import { DetailDrawer } from '../components/common/DetailDrawer';
import { FormDialog } from '../components/common/FormDialog';
import { ApprovalTimeline } from '../components/common/ApprovalTimeline';

interface CBSEComplianceViewProps {
  onShowToast: (type: 'success' | 'warning' | 'error' | 'info', title: string, message?: string) => void;
}

export const CBSEComplianceView: React.FC<CBSEComplianceViewProps> = ({ onShowToast }) => {
  const [documents, setDocuments] = useState<CBSEDocument[]>(() => 
    MOCK_CBSE_DOCUMENTS.map(d => ({
      ...d,
      certificateNumber: d.certNumber,
      assignedOwner: d.assignedOfficer,
      auditNotes: d.notes,
      verificationLevel: 'Officer Signed & Digitized',
      fileUrl: `drt-cbse-${d.id}.pdf`
    }))
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [ownerFilter, setOwnerFilter] = useState('all');

  // Selected document drawer
  const [selectedDoc, setSelectedDoc] = useState<CBSEDocument | null>(null);
  const [isDocDrawerOpen, setIsDocDrawerOpen] = useState(false);

  // Upload Renewal Document modal
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    certNumber: '',
    authority: '',
    issueDate: '2026-10-25',
    expiryDate: '2029-10-24',
    comments: 'Renewed certificate received following physical site inspection.'
  });

  // Filtered documents
  const filteredDocs = useMemo(() => {
    return documents.filter((doc) => {
      const matchesSearch = 
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (doc.certificateNumber ? doc.certificateNumber.toLowerCase().includes(searchQuery.toLowerCase()) : false) ||
        doc.issuingAuthority.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (doc.assignedOfficer ? doc.assignedOfficer.toLowerCase().includes(searchQuery.toLowerCase()) : false) ||
        (doc.assignedOwner ? doc.assignedOwner.toLowerCase().includes(searchQuery.toLowerCase()) : false);

      const matchesCat = categoryFilter === 'all' || doc.category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
      const officer = doc.assignedOfficer || doc.assignedOwner || '';
      const matchesOwner = ownerFilter === 'all' || officer.toLowerCase().includes(ownerFilter.toLowerCase());

      return matchesSearch && matchesCat && matchesStatus && matchesOwner;
    });
  }, [documents, searchQuery, categoryFilter, statusFilter, ownerFilter]);

  const handleOpenDoc = (doc: CBSEDocument) => {
    setSelectedDoc(doc);
    setIsDocDrawerOpen(true);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoc) return;

    // Update document status to Valid
    setDocuments(prev => prev.map(d => {
      if (d.id === selectedDoc.id) {
        return {
          ...d,
          certificateNumber: uploadForm.certNumber || d.certificateNumber,
          issueDate: uploadForm.issueDate,
          expiryDate: uploadForm.expiryDate,
          daysRemaining: 1095, // 3 years
          status: 'Valid' as const,
          auditNotes: `Renewal uploaded & verified on ${new Date().toLocaleDateString('en-GB')}`
        };
      }
      return d;
    }));

    setIsUploadModalOpen(false);
    onShowToast('success', 'Document Renewed', `Renewal certificate for "${selectedDoc.title}" submitted and logged to audit trail.`);
  };

  // Mock timeline for selected document
  const getDocTimeline = (doc: CBSEDocument) => [
    {
      step: 'Application Submitted',
      actor: doc.assignedOwner || 'Compliance Coordinator',
      timestamp: 'Sep 10, 2026',
      status: 'completed' as const,
      comments: 'Official application filed with competent municipal desk.'
    },
    {
      step: 'Physical Site Inspection',
      actor: doc.issuingAuthority,
      timestamp: 'Oct 14, 2026',
      status: 'completed' as const,
      comments: 'Campus infrastructure verified in person.'
    },
    {
      step: 'Statutory Verification & Final Certificate',
      actor: 'Legal & Regulatory Cell',
      timestamp: doc.daysRemaining <= 30 ? 'In Progress' : 'Completed',
      status: doc.daysRemaining <= 30 ? ('current' as const) : ('completed' as const),
      comments: doc.daysRemaining <= 30 ? 'Renewal file under processing before expiry.' : 'All clauses compliant.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="CBSE Statutory Compliance Centre"
        description="Statutory surveillance of municipal NOCs, land titles, public disclosure certificates, and affiliation byelaws."
        breadcrumbs={[
          { label: 'Governance' },
          { label: 'CBSE Compliance', active: true }
        ]}
        badge={
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
            Platform Signature Feature
          </span>
        }
        primaryAction={{
          label: "Upload Statutory Document",
          icon: <Upload className="w-4 h-4" />,
          onClick: () => {
            if (filteredDocs.length > 0) {
              setSelectedDoc(filteredDocs[0]);
              setIsUploadModalOpen(true);
            }
          }
        }}
        secondaryActions={[
          {
            label: "Export Compliance Dossier",
            icon: <Download className="w-3.5 h-3.5" />,
            onClick: () => onShowToast('info', 'Export Started', 'Full CBSE Compliance Dossier generated in PDF format.')
          }
        ]}
      />

      {/* Critical Expiry Watchlist Banner */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-900 shadow-subtle">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-sm text-amber-900">
              URGENT RENEWAL: Thane Municipal Corporation Fire Safety NOC Expiring in 18 Days
            </p>
            <p className="text-amber-800 mt-0.5 leading-relaxed">
              Certificate No: <strong>TMC/FIRE/2023/8491</strong> expires on <strong>Nov 15, 2026</strong>. Inspection file assigned to <strong>Mr. Iqbal Virani (Elected Authority)</strong>. CBSE affiliation norms require active validity without lapse.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            const fireDoc = documents.find(d => d.title.includes('Fire'));
            if (fireDoc) handleOpenDoc(fireDoc);
          }}
          className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-amber-600 hover:bg-amber-700 text-white transition-colors flex-shrink-0 shadow-subtle"
        >
          Inspect Fire NOC File
        </button>
      </div>

      {/* Regulatory Disclaimer Callout */}
      <div className="px-4 py-2.5 bg-surface-muted/60 border border-surface-border rounded-lg text-[11px] text-ink-secondary flex items-center justify-between">
        <span>
          <strong>Notice:</strong> This module is an internal progress tracking and evidence archival system for school administration. It does not automatically certify official CBSE or regulatory compliance.
        </span>
        <span className="font-medium text-brand-navy hidden sm:inline">
          DRT Knowledge Hub • School Code: 30945
        </span>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Overall Compliance"
          value="87%"
          icon={ShieldCheck}
          trend={{ value: "+4% vs previous audit", isPositive: true }}
          subtext="38 of 48 indicators certified"
        />
        <StatCard
          label="Certified & Valid"
          value="38 Files"
          icon={CheckCircle2}
          subtext="No renewal required this term"
        />
        <StatCard
          label="Expiring Soon (<30d)"
          value="3 Files"
          icon={Clock}
          trend={{ value: "Fire, Water, Transport", isNeutral: false }}
          subtext="Action assigned to officers"
        />
        <StatCard
          label="Missing Evidence"
          value="1 File"
          icon={AlertCircle}
          subtext="Annual Water Testing Report"
        />
      </div>

      {/* Search and Filters Bar */}
      <SearchFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search certificate title, issuing department, certificate number, owner..."
        resultCount={filteredDocs.length}
        filters={[
          {
            key: 'category',
            label: 'Category',
            value: categoryFilter,
            onChange: setCategoryFilter,
            options: [
              { label: 'All Categories', value: 'all' },
              { label: 'Safety & Municipal NOCs', value: 'Safety & Municipal NOCs' },
              { label: 'Land & Infrastructure', value: 'Land & Infrastructure' },
              { label: 'School Governance', value: 'School Governance' },
              { label: 'Staff & Academic Compliances', value: 'Staff & Academic Compliances' },
            ]
          },
          {
            key: 'status',
            label: 'Status',
            value: statusFilter,
            onChange: setStatusFilter,
            options: [
              { label: 'All Statuses', value: 'all' },
              { label: 'Valid', value: 'Valid' },
              { label: 'Expiring Soon', value: 'Expiring Soon' },
              { label: 'In Renewal', value: 'In Renewal' },
              { label: 'Missing / Action Required', value: 'Missing / Action Required' },
            ]
          },
          {
            key: 'owner',
            label: 'Assigned Owner',
            value: ownerFilter,
            onChange: setOwnerFilter,
            options: [
              { label: 'All Officers', value: 'all' },
              { label: 'Mrs. Shaheen Shaikh (Principal)', value: 'Shaheen' },
              { label: 'Shabnam Shaikh (Chair Person)', value: 'Shabnam' },
              { label: 'Mr. Iqbal Virani (Elected Authority)', value: 'Iqbal' },
              { label: 'Mr. Rakesh Chaubey (Coordinator)', value: 'Rakesh' },
              { label: 'Ms. Nida Aagah (Accounts)', value: 'Nida' },
            ]
          }
        ]}
        onResetFilters={() => {
          setSearchQuery('');
          setCategoryFilter('all');
          setStatusFilter('all');
          setOwnerFilter('all');
        }}
      />

      {/* Structured Compliance Table */}
      <div className="bg-white border border-surface-border rounded-xl shadow-subtle overflow-hidden">
        {/* Mobile Cards (sm:hidden) */}
        <div className="block sm:hidden divide-y divide-surface-border/60">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              onClick={() => handleOpenDoc(doc)}
              className="p-4 hover:bg-surface-cardHover transition-colors cursor-pointer space-y-3"
            >
              <div className="flex items-start justify-between gap-2.5">
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-lg bg-surface-muted text-brand-navy flex-shrink-0 mt-0.5">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-ink-primary text-sm leading-snug">
                      {doc.title}
                    </p>
                    <p className="text-[11px] text-ink-secondary mt-0.5">
                      {doc.category}
                    </p>
                  </div>
                </div>
                <StatusBadge
                  variant={
                    doc.status === 'Valid'
                      ? 'success'
                      : doc.status === 'Expiring Soon'
                      ? 'warning'
                      : 'danger'
                  }
                  size="sm"
                >
                  {doc.status}
                </StatusBadge>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1.5 border-t border-surface-border/40">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-ink-secondary block">Issuing Authority</span>
                  <span className="font-medium text-ink-primary truncate block">{doc.issuingAuthority}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-ink-secondary block">Validity / Expiry</span>
                  <span className={`font-semibold tabular-nums ${doc.daysRemaining <= 30 ? 'text-amber-700 font-bold' : 'text-slate-700'}`}>
                    {doc.daysRemaining > 0 ? `${doc.daysRemaining} days left` : 'Expired'}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 text-xs text-ink-secondary">
                <span className="font-mono text-[11px] text-slate-500">#{doc.certificateNumber}</span>
                <span className="text-brand-blue font-semibold text-xs flex items-center gap-1">
                  Inspect File &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Data Table (hidden sm:block) */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-surface-bg/80 border-b border-surface-border text-ink-secondary text-[11px] uppercase tracking-wider font-semibold">
                <th className="py-3 px-4">Statutory Requirement & Document</th>
                <th className="py-3 px-4">Issuing Authority</th>
                <th className="py-3 px-4">Certificate #</th>
                <th className="py-3 px-4">Assigned Owner</th>
                <th className="py-3 px-4 text-center">Validity / Countdown</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border/60">
              {filteredDocs.map((doc) => (
                <tr
                  key={doc.id}
                  onClick={() => handleOpenDoc(doc)}
                  className="hover:bg-surface-cardHover transition-colors cursor-pointer group"
                >
                  {/* Title and Category */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-start gap-2.5">
                      <div className="p-1.5 rounded-lg bg-surface-muted text-brand-navy flex-shrink-0 mt-0.5">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-ink-primary group-hover:text-brand-navy transition-colors">
                          {doc.title}
                        </p>
                        <p className="text-[11px] text-ink-secondary">
                          {doc.category}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Issuing Authority */}
                  <td className="py-3.5 px-4 text-ink-primary font-medium">
                    {doc.issuingAuthority}
                  </td>

                  {/* Certificate Number */}
                  <td className="py-3.5 px-4 font-mono text-xs text-ink-secondary">
                    {doc.certificateNumber}
                  </td>

                  {/* Assigned Owner */}
                  <td className="py-3.5 px-4">
                    <span className="font-medium text-ink-primary">
                      {doc.assignedOwner}
                    </span>
                  </td>

                  {/* Days remaining countdown pill */}
                  <td className="py-3.5 px-4 text-center tabular-nums">
                    {doc.daysRemaining <= 0 ? (
                      <span className="px-2 py-0.5 rounded font-bold text-rose-700 bg-rose-100 text-xs">
                        Overdue / Missing
                      </span>
                    ) : doc.daysRemaining <= 30 ? (
                      <span className="px-2 py-0.5 rounded font-bold text-amber-800 bg-amber-100 text-xs animate-pulse">
                        {doc.daysRemaining} Days Left
                      </span>
                    ) : (
                      <span className="text-ink-secondary text-xs">
                        Expires {doc.expiryDate}
                      </span>
                    )}
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 px-4 text-center">
                    <StatusBadge
                      variant={
                        doc.status === 'Valid'
                          ? 'success'
                          : doc.status === 'Expiring Soon'
                          ? 'warning'
                          : doc.status === 'In Renewal'
                          ? 'info'
                          : 'danger'
                      }
                      size="sm"
                    >
                      {doc.status}
                    </StatusBadge>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => handleOpenDoc(doc)}
                      className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-surface-bg hover:bg-surface-muted text-brand-navy border border-surface-border transition-colors"
                    >
                      Inspect File
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Document Details Drawer */}
      <DetailDrawer
        isOpen={isDocDrawerOpen}
        onClose={() => setIsDocDrawerOpen(false)}
        title={selectedDoc ? selectedDoc.title : 'Document Details'}
        subtitle={selectedDoc ? `Certificate #${selectedDoc.certificateNumber}` : ''}
        width="lg"
        footer={
          <div className="flex items-center justify-between w-full">
            <button
              onClick={() => {
                onShowToast('info', 'Download Started', `Downloading archive for ${selectedDoc?.title}`);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-surface-border bg-white text-ink-primary hover:bg-surface-muted transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF ({selectedDoc?.fileSize})</span>
            </button>

            <button
              onClick={() => {
                setIsUploadModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-brand-navy hover:bg-brand-navyDark text-white shadow-subtle transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Renewal Version</span>
            </button>
          </div>
        }
      >
        {selectedDoc && (
          <div className="space-y-6 text-xs sm:text-sm">
            {/* Status Summary Banner */}
            <div className={`p-4 rounded-xl border flex items-center justify-between ${
              selectedDoc.status === 'Valid'
                ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                : selectedDoc.status === 'Expiring Soon'
                ? 'bg-amber-50/80 border-amber-200 text-amber-900'
                : 'bg-rose-50/70 border-rose-200 text-rose-900'
            }`}>
              <div>
                <p className="font-bold text-sm">
                  Status: {selectedDoc.status.toUpperCase()}
                </p>
                <p className="text-xs mt-0.5">
                  {selectedDoc.daysRemaining > 0 ? `${selectedDoc.daysRemaining} days remaining until renewal deadline` : 'Action required immediately'}
                </p>
              </div>
              <StatusBadge
                variant={selectedDoc.status === 'Valid' ? 'success' : selectedDoc.status === 'Expiring Soon' ? 'warning' : 'danger'}
                size="md"
              >
                {selectedDoc.status}
              </StatusBadge>
            </div>

            {/* Certificate Metadata */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-ink-secondary">
                Statutory Certificate Specifications
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-surface-bg p-4 rounded-xl border border-surface-border">
                <div>
                  <span className="text-[11px] text-ink-secondary block">Issuing Authority</span>
                  <span className="font-semibold text-ink-primary">{selectedDoc.issuingAuthority}</span>
                </div>
                <div>
                  <span className="text-[11px] text-ink-secondary block">Certificate Number</span>
                  <span className="font-mono font-semibold text-brand-navy">{selectedDoc.certificateNumber}</span>
                </div>
                <div>
                  <span className="text-[11px] text-ink-secondary block">Date of Issue</span>
                  <span className="font-mono text-ink-primary">{selectedDoc.issueDate}</span>
                </div>
                <div>
                  <span className="text-[11px] text-ink-secondary block">Valid Until</span>
                  <span className="font-mono text-ink-primary">{selectedDoc.expiryDate}</span>
                </div>
                <div>
                  <span className="text-[11px] text-ink-secondary block">Responsible Officer</span>
                  <span className="font-semibold text-ink-primary">{selectedDoc.assignedOwner}</span>
                </div>
                <div>
                  <span className="text-[11px] text-ink-secondary block">Verification Level</span>
                  <span className="font-semibold text-emerald-700">{selectedDoc.verificationLevel}</span>
                </div>
              </div>
            </div>

            {/* Simulated Document Preview Window */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-ink-secondary">
                  Official Document Archive Preview
                </h4>
                <span className="text-[11px] text-ink-secondary">
                  {selectedDoc.fileUrl} ({selectedDoc.fileSize})
                </span>
              </div>

              <div className="p-4 bg-white border border-surface-border rounded-xl text-center shadow-subtle space-y-3">
                <div className="w-12 h-12 rounded-full bg-brand-blue/10 text-brand-navy flex items-center justify-center mx-auto">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-ink-primary">
                    {selectedDoc.title}
                  </h5>
                  <p className="text-xs text-ink-secondary mt-0.5">
                    Digitized official record cross-verified with Maharashtra State Public Records
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-muted text-xs font-semibold text-brand-navy">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Tamper-evident Hash: SHA-256 Verified</span>
                </div>
              </div>
            </div>

            {/* Audit Notes & Timeline */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-ink-secondary">
                Renewal Lifecycle & Audit Trail
              </h4>
              <div className="bg-surface-bg p-4 rounded-xl border border-surface-border">
                <ApprovalTimeline events={getDocTimeline(selectedDoc)} />
              </div>
            </div>
          </div>
        )}
      </DetailDrawer>

      {/* Upload Renewal Document Modal */}
      <FormDialog
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title={selectedDoc ? `Upload Renewal: ${selectedDoc.title}` : 'Upload Document'}
        description="Submit renewal certificate issued by competent authority."
        submitLabel="Submit & Update Registry"
        onSubmit={handleUploadSubmit}
        maxWidth="lg"
      >
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-ink-primary mb-1">
              New Certificate / Endorsement Number *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. TMC/FIRE/2026/9941"
              value={uploadForm.certNumber}
              onChange={(e) => setUploadForm({ ...uploadForm, certNumber: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-surface-border rounded-lg bg-surface-bg font-mono focus:ring-2 focus:ring-brand-blue/30"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-ink-primary mb-1">
                Date of Issue *
              </label>
              <input
                type="date"
                required
                value={uploadForm.issueDate}
                onChange={(e) => setUploadForm({ ...uploadForm, issueDate: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-surface-border rounded-lg bg-surface-bg focus:ring-2 focus:ring-brand-blue/30"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-primary mb-1">
                Valid Until *
              </label>
              <input
                type="date"
                required
                value={uploadForm.expiryDate}
                onChange={(e) => setUploadForm({ ...uploadForm, expiryDate: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-surface-border rounded-lg bg-surface-bg focus:ring-2 focus:ring-brand-blue/30"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-ink-primary mb-1">
              Upload Scanned PDF File *
            </label>
            <div className="p-4 border-2 border-dashed border-surface-border rounded-lg text-center bg-surface-bg/50">
              <Upload className="w-6 h-6 text-ink-secondary mx-auto mb-1.5" />
              <p className="text-xs font-medium text-ink-primary">Click to select PDF or drag and drop</p>
              <p className="text-[11px] text-ink-secondary mt-0.5">Maximum file size: 10MB (Government Stamp must be legible)</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-ink-primary mb-1">
              Inspection Notes / Verification Remarks
            </label>
            <textarea
              rows={2}
              value={uploadForm.comments}
              onChange={(e) => setUploadForm({ ...uploadForm, comments: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-surface-border rounded-lg bg-surface-bg focus:ring-2 focus:ring-brand-blue/30"
            />
          </div>
        </div>
      </FormDialog>
    </div>
  );
};
