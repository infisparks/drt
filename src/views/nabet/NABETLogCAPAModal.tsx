import React, { useState } from 'react';
import { NABETParameter, NABETImprovementAction, NABETCAPAType, NABETCAPAPriority } from '../../types/nabet';
import { FormDialog } from '../../components/common/FormDialog';

interface NABETLogCAPAModalProps {
  isOpen: boolean;
  onClose: () => void;
  parameters: NABETParameter[];
  preSelectedParamId?: number;
  onSubmitCAPA: (capa: Omit<NABETImprovementAction, 'id'>) => void;
}

export const NABETLogCAPAModal: React.FC<NABETLogCAPAModalProps> = ({
  isOpen,
  onClose,
  parameters,
  preSelectedParamId,
  onSubmitCAPA
}) => {
  const [selectedParamId, setSelectedParamId] = useState<number>(preSelectedParamId || 1);
  const [title, setTitle] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [method, setMethod] = useState<'5-Whys' | 'Fishbone' | 'Process-Audit'>('5-Whys');
  const [rootCauseSummary, setRootCauseSummary] = useState('');
  const [actionType, setActionType] = useState<NABETCAPAType>('Corrective');
  const [priority, setPriority] = useState<NABETCAPAPriority>('Medium');
  const [assignedTo, setAssignedTo] = useState('Mrs. Shaheen Shaikh (Principal)');
  const [department, setDepartment] = useState('Academic Quality Wing');
  const [targetDate, setTargetDate] = useState('2026-12-15');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !issueDescription.trim() || !rootCauseSummary.trim()) return;

    const targetParam = parameters.find(p => p.id === Number(selectedParamId));

    onSubmitCAPA({
      parameterId: Number(selectedParamId),
      parameterNumber: targetParam ? targetParam.parameterNumber : `Param ${selectedParamId}`,
      title: title.trim(),
      issueDescription: issueDescription.trim(),
      rootCauseAnalysis: {
        method,
        summary: rootCauseSummary.trim()
      },
      actionType,
      priority,
      assignedTo: assignedTo.trim(),
      department: department.trim(),
      targetDate,
      status: 'In Progress',
      progressPct: 15,
      actionTakenReport: `Initial corrective action plan logged and assigned to ${assignedTo}. Target closure: ${targetDate}.`
    });

    setTitle('');
    setIssueDescription('');
    setRootCauseSummary('');
    onClose();
  };

  return (
    <FormDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Log NABET Continuous Improvement Action (CAPA)"
      description="Record quality non-conformity, root-cause analysis, and corrective/preventive action plan."
      onSubmit={handleSubmit}
      submitLabel="Create CAPA Plan"
      maxWidth="xl"
    >
      <div className="space-y-4">
        {/* Parameter Target */}
        <div>
          <label className="block text-xs font-semibold text-ink-primary mb-1.5">
            Related Assessment Parameter *
          </label>
          <select
            value={selectedParamId}
            onChange={(e) => setSelectedParamId(Number(e.target.value))}
            className="w-full px-3 py-2 text-sm bg-white border border-surface-border rounded-lg text-ink-primary focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          >
            {parameters.map((p) => (
              <option key={p.id} value={p.id}>
                {p.parameterNumber}: {p.title}
              </option>
            ))}
          </select>
        </div>

        {/* Action Title */}
        <div>
          <label className="block text-xs font-semibold text-ink-primary mb-1.5">
            Action Title / Improvement Objective *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Standardize 90-Day Peer Mentorship Logs for Faculty"
            className="w-full px-3 py-2 text-sm bg-white border border-surface-border rounded-lg text-ink-primary focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>

        {/* Issue / Gap Description */}
        <div>
          <label className="block text-xs font-semibold text-ink-primary mb-1.5">
            Non-Conformity / Quality Gap Observed *
          </label>
          <textarea
            rows={2}
            required
            value={issueDescription}
            onChange={(e) => setIssueDescription(e.target.value)}
            placeholder="Describe the gap observed during self-assessment or internal audit..."
            className="w-full px-3 py-2 text-sm bg-white border border-surface-border rounded-lg text-ink-primary focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none"
          />
        </div>

        {/* Root Cause Analysis (RCA) */}
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-ink-primary uppercase tracking-wider">
              Root Cause Analysis (RCA) Methodology *
            </span>
            <div className="flex items-center gap-2">
              {(['5-Whys', 'Fishbone', 'Process-Audit'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMethod(m)}
                  className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                    method === m
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white border border-slate-300 text-ink-secondary hover:text-ink-primary'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div>
            <textarea
              rows={2}
              required
              value={rootCauseSummary}
              onChange={(e) => setRootCauseSummary(e.target.value)}
              placeholder="Summary of root causes identified (e.g. lack of standardized intake rubric, communication bottleneck)..."
              className="w-full px-3 py-2 text-sm bg-white border border-surface-border rounded-lg text-ink-primary focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none"
            />
          </div>
        </div>

        {/* 2-column fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-ink-primary mb-1.5">
              Action Classification *
            </label>
            <select
              value={actionType}
              onChange={(e) => setActionType(e.target.value as NABETCAPAType)}
              className="w-full px-3 py-2 text-sm bg-white border border-surface-border rounded-lg text-ink-primary focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            >
              <option value="Corrective">Corrective Action (Fix Existing Gap)</option>
              <option value="Preventive">Preventive Action (Avoid Potential Risk)</option>
              <option value="Quality Enhancement">Quality Enhancement (Continuous Upgrade)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink-primary mb-1.5">
              Priority Level *
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as NABETCAPAPriority)}
              className="w-full px-3 py-2 text-sm bg-white border border-surface-border rounded-lg text-ink-primary focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            >
              <option value="High">High (Immediate Audit Impact)</option>
              <option value="Medium">Medium (Standard Improvement)</option>
              <option value="Low">Low (Routine Enhancement)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink-primary mb-1.5">
              Assigned Action Owner *
            </label>
            <input
              type="text"
              required
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-surface-border rounded-lg text-ink-primary focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink-primary mb-1.5">
              Target Closure Date *
            </label>
            <input
              type="date"
              required
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-surface-border rounded-lg text-ink-primary focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
        </div>
      </div>
    </FormDialog>
  );
};
