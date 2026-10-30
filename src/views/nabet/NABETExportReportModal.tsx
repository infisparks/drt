import React, { useRef } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  ShieldCheck, 
  Award, 
  Building2, 
  CheckCircle2, 
  FileText, 
  AlertCircle,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { NABETDomain, NABETParameter, NABETEvidence } from '../../types/nabet';
import { SCHOOL_INFO } from '../../data/mockData';
import { NABET_EDITION, NABET_TARGET_CYCLE } from '../../data/nabetData';
import { generateNABETDossierBlobUrl } from '../../utils/pdfGenerator';

interface NABETExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  domains: NABETDomain[];
  parameters: NABETParameter[];
  evidenceList: NABETEvidence[];
  onPrint: () => void;
  onDownloadPdf: () => void;
}

export const NABETExportReportModal: React.FC<NABETExportReportModalProps> = ({
  isOpen,
  onClose,
  domains,
  parameters,
  evidenceList,
  onPrint,
  onDownloadPdf
}) => {
  const printAreaRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const totalParams = parameters.length;
  const fullyCompliantCount = parameters.filter(p => p.complianceStatus === 'Fully Compliant').length;
  const substantialCount = parameters.filter(p => p.complianceStatus === 'Substantially Compliant').length;
  const partialCount = parameters.filter(p => p.complianceStatus === 'Partially Compliant' || p.complianceStatus === 'In Progress').length;
  const verifiedDocsCount = evidenceList.filter(e => e.verificationStatus === 'Verified').length;

  const overallScore = Math.round(
    domains.reduce((acc, d) => acc + d.complianceScore, 0) / domains.length
  );

  const handleOpenPdfBlob = () => {
    try {
      const blobUrl = generateNABETDossierBlobUrl(domains, parameters, evidenceList);
      window.open(blobUrl, '_blank');
      onDownloadPdf();
    } catch (err) {
      console.error('Error generating PDF Blob URL:', err);
    }
  };

  const handleDownloadPdf = () => {
    try {
      const blobUrl = generateNABETDossierBlobUrl(domains, parameters, evidenceList);
      // Open in blob URL in new tab for viewing
      window.open(blobUrl, '_blank');
      // Trigger file download
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = `NABET_Accreditation_Dossier_DRT_${new Date().getFullYear()}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      onDownloadPdf();
    } catch (err) {
      console.error('Error downloading PDF:', err);
    }
  };

  const handlePrintDossier = () => {
    try {
      const blobUrl = generateNABETDossierBlobUrl(domains, parameters, evidenceList);
      const printWindow = window.open(blobUrl, '_blank');
      if (printWindow) {
        printWindow.focus();
      }
      onPrint();
    } catch (err) {
      console.error('Error printing dossier:', err);
      window.print();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-0 text-center sm:items-center sm:p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Modal Window */}
        <div className="relative transform overflow-hidden bg-white text-left shadow-modal transition-all w-full h-full sm:h-auto sm:my-8 sm:max-w-4xl sm:rounded-modal border border-surface-border flex flex-col max-h-[92vh]">
          {/* Action Header */}
          <div className="px-6 py-4 border-b border-surface-border flex items-center justify-between bg-surface-bg/50">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-ink-primary flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-600" />
                NABET Accreditation Readiness Executive Dossier
              </h3>
              <p className="text-xs text-ink-secondary mt-0.5">
                Standard for Quality School Governance – {NABET_EDITION} • Cycle: {NABET_TARGET_CYCLE}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrintDossier}
                className="px-3 py-1.5 text-xs font-medium text-ink-primary bg-white border border-surface-border rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5 shadow-subtle"
                title="Print dossier via browser"
              >
                <Printer className="w-3.5 h-3.5" />
                Print Dossier
              </button>

              <button
                type="button"
                onClick={handleOpenPdfBlob}
                className="px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 rounded-lg transition-colors flex items-center gap-1.5 shadow-subtle"
                title="Open generated PDF in Blob URL"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Open PDF
              </button>

              <button
                type="button"
                onClick={handleDownloadPdf}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-subtle"
                title="Open Blob URL & Download PDF File"
              >
                <Download className="w-3.5 h-3.5" />
                Download PDF
              </button>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-ink-secondary hover:text-ink-primary hover:bg-surface-muted transition-colors ml-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Report Canvas */}
          <div 
            ref={printAreaRef}
            className="p-6 sm:p-8 overflow-y-auto space-y-6 text-ink-primary font-sans bg-white"
          >
            {/* Header Letterhead */}
            <div className="border-b-2 border-indigo-600 pb-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-indigo-950 tracking-tight">
                    {SCHOOL_INFO.name.toUpperCase()}
                  </h1>
                  <p className="text-xs text-ink-secondary mt-0.5">
                    {SCHOOL_INFO.address}
                  </p>
                  <p className="text-xs text-ink-secondary">
                    Affiliation No: <strong>{SCHOOL_INFO.affiliationNo}</strong> | School Code: <strong>{SCHOOL_INFO.schoolCode}</strong>
                  </p>
                </div>

                <div className="text-left sm:text-right bg-indigo-50 border border-indigo-100 p-3 rounded-xl flex-shrink-0">
                  <span className="text-[10px] font-bold tracking-wider text-indigo-600 uppercase block">
                    NABET Quality Status
                  </span>
                  <span className="text-xl font-black text-indigo-950">
                    {overallScore}% Ready
                  </span>
                  <span className="text-[11px] block text-emerald-700 font-semibold mt-0.5">
                    Level 4 (Dynamic / Stable)
                  </span>
                </div>
              </div>
            </div>

            {/* Official Framework Statement */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-indigo-600" />
                <h4 className="text-xs font-bold text-ink-primary uppercase tracking-wider">
                  NABET Accreditation Assessment Framework Scope
                </h4>
              </div>
              <p className="text-xs text-ink-secondary leading-relaxed">
                Prepared in strict compliance with the <strong>NABET Accreditation Standard for Quality School Governance – Fourth Edition, June 2025</strong> published by the National Accreditation Board for Education and Training (Quality Council of India). The institutional management system incorporates all <strong>3 Domains, 14 Standards, and 36 Assessment Parameters</strong>.
              </p>
            </div>

            {/* Key Readiness Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-white border border-surface-border rounded-lg text-center">
                <span className="text-xs text-ink-secondary block">Total Parameters</span>
                <span className="text-lg font-bold text-ink-primary">{totalParams}</span>
                <span className="text-[10px] text-ink-light block">Official NABET Scope</span>
              </div>

              <div className="p-3 bg-white border border-surface-border rounded-lg text-center">
                <span className="text-xs text-ink-secondary block">Fully Compliant</span>
                <span className="text-lg font-bold text-emerald-600">{fullyCompliantCount}</span>
                <span className="text-[10px] text-emerald-700 block">Level 5 / 100% Ready</span>
              </div>

              <div className="p-3 bg-white border border-surface-border rounded-lg text-center">
                <span className="text-xs text-ink-secondary block">Substantial / In Progress</span>
                <span className="text-lg font-bold text-indigo-600">{substantialCount + partialCount}</span>
                <span className="text-[10px] text-indigo-700 block">Active Implementation</span>
              </div>

              <div className="p-3 bg-white border border-surface-border rounded-lg text-center">
                <span className="text-xs text-ink-secondary block">Verified Evidence Docs</span>
                <span className="text-lg font-bold text-ink-primary">{verifiedDocsCount}</span>
                <span className="text-[10px] text-ink-light block">Digitally Sign-off</span>
              </div>
            </div>

            {/* Domain-wise Assessment Breakdown */}
            <div>
              <h3 className="text-sm font-bold text-ink-primary uppercase tracking-wider mb-3">
                Domain-Wise Quality & Readiness Breakdown
              </h3>
              <div className="space-y-3">
                {domains.map((dom) => (
                  <div key={dom.id} className="p-4 bg-white border border-surface-border rounded-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-ink-primary">
                          Domain {dom.domainNumber}: {dom.name}
                        </h4>
                        <p className="text-xs text-ink-secondary">
                          {dom.standardsRange} • {dom.parametersRange}
                        </p>
                      </div>
                      <div className="text-right flex items-center gap-3">
                        <span className="text-xs font-semibold text-indigo-600">
                          {dom.maturityLevel}
                        </span>
                        <span className="text-sm font-bold text-ink-primary">
                          {dom.complianceScore}%
                        </span>
                      </div>
                    </div>

                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-2">
                      <div 
                        className="h-full bg-indigo-600 rounded-full" 
                        style={{ width: `${dom.complianceScore}%` }}
                      />
                    </div>

                    <p className="text-[11px] text-ink-secondary">
                      <strong>Focus:</strong> {dom.focus}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 36 Parameters Summary Matrix */}
            <div>
              <h3 className="text-sm font-bold text-ink-primary uppercase tracking-wider mb-3">
                Official 36 Assessment Parameters Matrix
              </h3>
              <div className="border border-surface-border rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-surface-border font-semibold text-ink-secondary">
                    <tr>
                      <th className="py-2.5 px-3">No.</th>
                      <th className="py-2.5 px-3">Parameter & Focus Area</th>
                      <th className="py-2.5 px-3">Std</th>
                      <th className="py-2.5 px-3">Lead Owner</th>
                      <th className="py-2.5 px-3">Rating</th>
                      <th className="py-2.5 px-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-border text-ink-primary">
                    {parameters.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/50">
                        <td className="py-2 px-3 font-mono font-bold text-indigo-900">
                          P-{p.id}
                        </td>
                        <td className="py-2 px-3">
                          <p className="font-semibold text-ink-primary">{p.title}</p>
                          <span className="text-[11px] text-ink-secondary">Focus: {p.focusArea}</span>
                        </td>
                        <td className="py-2 px-3 font-medium">Std {p.standardNumber}</td>
                        <td className="py-2 px-3 text-ink-secondary">{p.leadOwner.split('(')[0]}</td>
                        <td className="py-2 px-3 font-semibold text-indigo-700">{p.selfAssessmentScore}/5</td>
                        <td className="py-2 px-3 text-right">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            p.complianceStatus === 'Fully Compliant'
                              ? 'bg-emerald-50 text-emerald-700'
                              : p.complianceStatus === 'Substantially Compliant'
                              ? 'bg-sky-50 text-sky-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}>
                            {p.complianceStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Evidence Index Sample */}
            <div>
              <h3 className="text-sm font-bold text-ink-primary uppercase tracking-wider mb-2">
                NABET Desk Review Master Evidence Index (Sample)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {evidenceList.slice(0, 8).map((evi) => (
                  <div key={evi.id} className="p-2.5 bg-slate-50 border border-surface-border rounded-lg flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-ink-primary truncate max-w-[260px]">{evi.title}</p>
                      <p className="text-[11px] text-ink-secondary">{evi.documentNo} • {evi.category}</p>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                      {evi.verificationStatus}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mandatory Regulatory Disclaimer */}
            <div className="p-3.5 bg-amber-50 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Important Advisory:</strong> The InfiSpark NABET Quality Management System supports institutional quality management, compliance governance, and accreditation readiness. This executive dossier is generated from internal self-assessment records and does not itself constitute official NABET/QCI accreditation or guarantee an accreditation outcome. Official accreditation requires formal peer-review assessment by NABET empaneled assessors.
              </span>
            </div>

            {/* Signatures */}
            <div className="pt-8 border-t border-surface-border grid grid-cols-2 sm:grid-cols-3 gap-6 text-center text-xs">
              <div>
                <div className="h-10 border-b border-slate-300 mb-1" />
                <p className="font-bold text-ink-primary">Mrs. Shabana Shaikh</p>
                <p className="text-ink-secondary text-[11px]">Principal & Head of QA</p>
              </div>

              <div>
                <div className="h-10 border-b border-slate-300 mb-1" />
                <p className="font-bold text-ink-primary">Adv. Farhana Qureshi</p>
                <p className="text-ink-secondary text-[11px]">Compliance & Lead Auditor</p>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <div className="h-10 border-b border-slate-300 mb-1" />
                <p className="font-bold text-ink-primary">Dr. A. R. Khan</p>
                <p className="text-ink-secondary text-[11px]">Managing Director & Trustee</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
