import React, { useState, useEffect } from 'react';
import { NABETParameter, NABETEvidence } from '../../types/nabet';
import { FormDialog } from '../../components/common/FormDialog';
import { UploadCloud, FileText, CheckCircle2 } from 'lucide-react';

interface NABETUploadEvidenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  parameters: NABETParameter[];
  preSelectedParamId?: number;
  onSubmitEvidence: (evidence: Omit<NABETEvidence, 'id'>) => void;
}

export const NABETUploadEvidenceModal: React.FC<NABETUploadEvidenceModalProps> = ({
  isOpen,
  onClose,
  parameters,
  preSelectedParamId,
  onSubmitEvidence
}) => {
  const [selectedParamId, setSelectedParamId] = useState<number>(preSelectedParamId || 1);
  const [title, setTitle] = useState('');
  const [documentNo, setDocumentNo] = useState('');
  const [category, setCategory] = useState<NABETEvidence['category']>('Policy & SOP');
  const [version, setVersion] = useState('Rev 1.0');
  const [uploadedBy, setUploadedBy] = useState('Mrs. Shaheen Shaikh');
  const [fileType, setFileType] = useState<'PDF' | 'DOCX' | 'XLSX' | 'IMAGE'>('PDF');
  const [expiryDate, setExpiryDate] = useState('');
  const [notes, setNotes] = useState('');
  const [linkedERPRecord, setLinkedERPRecord] = useState('');
  const [selectedFileName, setSelectedFileName] = useState<string>('');

  useEffect(() => {
    if (preSelectedParamId) {
      setSelectedParamId(preSelectedParamId);
    }
  }, [preSelectedParamId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !documentNo.trim()) return;

    const targetParam = parameters.find(p => p.id === Number(selectedParamId));

    onSubmitEvidence({
      parameterId: Number(selectedParamId),
      domainId: targetParam ? targetParam.domainId : 1,
      standardNumber: targetParam ? targetParam.standardNumber : 1,
      title: title.trim(),
      documentNo: documentNo.trim(),
      category,
      version: version.trim() || 'Rev 1.0',
      uploadedBy: uploadedBy.trim() || 'Quality Cell Officer',
      uploadDate: new Date().toISOString().split('T')[0],
      verificationStatus: 'Under Review',
      expiryDate: expiryDate ? expiryDate : undefined,
      fileSize: '3.4 MB',
      fileType,
      notes: notes.trim() || 'Attached in accordance with NABET 4th Edition assessment standards.',
      linkedERPRecord: linkedERPRecord.trim() ? linkedERPRecord.trim() : (targetParam ? `ERP > ${targetParam.linkedERPModule}` : undefined)
    });

    // Reset fields
    setTitle('');
    setDocumentNo('');
    setNotes('');
    setLinkedERPRecord('');
    setSelectedFileName('');
    onClose();
  };

  const currentParam = parameters.find(p => p.id === Number(selectedParamId));

  return (
    <FormDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Attach & Map NABET Evidence Document"
      description="Upload and tag institutional documentation to official NABET 4th Edition standards."
      onSubmit={handleSubmit}
      submitLabel="Submit for Verification"
      maxWidth="xl"
    >
      <div className="space-y-4">
        {/* Section 1: Standard & Parameter Mapping */}
        <div>
          <label className="block text-xs font-semibold text-ink-primary mb-1.5">
            Target NABET Assessment Parameter *
          </label>
          <select
            value={selectedParamId}
            onChange={(e) => setSelectedParamId(Number(e.target.value))}
            className="w-full px-3 py-2 text-sm bg-white border border-surface-border rounded-lg text-ink-primary focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          >
            {parameters.map((p) => (
              <option key={p.id} value={p.id}>
                {p.parameterNumber}: {p.title} (Std {p.standardNumber})
              </option>
            ))}
          </select>
          {currentParam && (
            <p className="text-[11px] text-ink-secondary mt-1 bg-surface-bg p-2 rounded border border-surface-border">
              <strong>Requirement:</strong> {currentParam.officialRequirement.slice(0, 140)}...
            </p>
          )}
        </div>

        {/* Section 2: Document Details (2 columns desktop, 1 column mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-ink-primary mb-1.5">
              Document Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Master School Accreditation Manual (SAM)"
              className="w-full px-3 py-2 text-sm bg-white border border-surface-border rounded-lg text-ink-primary focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink-primary mb-1.5">
              Document / Reference Number *
            </label>
            <input
              type="text"
              required
              value={documentNo}
              onChange={(e) => setDocumentNo(e.target.value)}
              placeholder="e.g. DRT/SAM/2026/V4"
              className="w-full px-3 py-2 text-sm bg-white border border-surface-border rounded-lg text-ink-primary focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink-primary mb-1.5">
              Evidence Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as NABETEvidence['category'])}
              className="w-full px-3 py-2 text-sm bg-white border border-surface-border rounded-lg text-ink-primary focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            >
              <option value="Policy & SOP">Policy & SOP</option>
              <option value="Meeting Minutes">Meeting Minutes</option>
              <option value="Statutory Certificate">Statutory Certificate</option>
              <option value="Academic Record">Academic Record</option>
              <option value="Audit Report">Audit Report</option>
              <option value="Student Portfolio">Student Portfolio</option>
              <option value="Register / Logbook">Register / Logbook</option>
              <option value="HR & Staff Record">HR & Staff Record</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink-primary mb-1.5">
              Revision / Version
            </label>
            <input
              type="text"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              placeholder="e.g. Rev 2.1"
              className="w-full px-3 py-2 text-sm bg-white border border-surface-border rounded-lg text-ink-primary focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink-primary mb-1.5">
              Uploaded By
            </label>
            <input
              type="text"
              value={uploadedBy}
              onChange={(e) => setUploadedBy(e.target.value)}
              placeholder="Enter officer name"
              className="w-full px-3 py-2 text-sm bg-white border border-surface-border rounded-lg text-ink-primary focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink-primary mb-1.5">
              Expiry / Renewal Date (If applicable)
            </label>
            <input
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-surface-border rounded-lg text-ink-primary focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Section 3: Linked ERP Source */}
        <div>
          <label className="block text-xs font-semibold text-ink-primary mb-1.5">
            Cross-Link with School ERP Module (For Auto-Verification)
          </label>
          <input
            type="text"
            value={linkedERPRecord}
            onChange={(e) => setLinkedERPRecord(e.target.value)}
            placeholder="e.g. Staff HR > Service Books & 86 Verified Teacher Records"
            className="w-full px-3 py-2 text-sm bg-white border border-surface-border rounded-lg text-ink-primary focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
          <p className="text-[11px] text-ink-secondary mt-1">
            Links this evidence to existing data in the School ERP so auditors can verify real operational records.
          </p>
        </div>

        {/* Section 4: File Upload Simulation */}
        <div>
          <label className="block text-xs font-semibold text-ink-primary mb-1.5">
            Attach Document File (PDF, DOCX, XLSX, Images up to 25MB) *
          </label>
          <div 
            onClick={() => setSelectedFileName(selectedFileName ? '' : 'DRT_Evidence_Verified_Dossier_2026.pdf')}
            className="border-2 border-dashed border-slate-300 hover:border-indigo-500 rounded-xl p-5 text-center cursor-pointer bg-slate-50/60 hover:bg-indigo-50/20 transition-all"
          >
            {selectedFileName ? (
              <div className="flex items-center justify-center gap-2 text-sm text-emerald-700 font-semibold">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Selected: {selectedFileName} (3.4 MB)</span>
              </div>
            ) : (
              <div className="space-y-1">
                <UploadCloud className="w-8 h-8 text-indigo-600 mx-auto" />
                <p className="text-xs font-medium text-ink-primary">
                  Click to select digital copy or drag-and-drop file
                </p>
                <p className="text-[11px] text-ink-secondary">
                  PDF / Scanned Stamp Copies preferred for NABET desk review
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Section 5: Verification Notes */}
        <div>
          <label className="block text-xs font-semibold text-ink-primary mb-1.5">
            Assessor / Verification Notes
          </label>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add context on how this document demonstrates that the process is institutionalized..."
            className="w-full px-3 py-2 text-sm bg-white border border-surface-border rounded-lg text-ink-primary focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none"
          />
        </div>
      </div>
    </FormDialog>
  );
};
