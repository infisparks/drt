import React from 'react';
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ExternalLink, 
  User, 
  Building, 
  ShieldCheck, 
  Award, 
  Plus, 
  Calendar,
  Layers,
  ArrowRight,
  FileCheck2,
  Tag
} from 'lucide-react';
import { NABETParameter, NABETEvidence, NABETComplianceStatus } from '../../types/nabet';
import { DetailDrawer } from '../../components/common/DetailDrawer';
import { StatusBadge } from '../../components/common/StatusBadge';

interface NABETParameterDrawerProps {
  parameter: NABETParameter | null;
  isOpen: boolean;
  onClose: () => void;
  evidenceList: NABETEvidence[];
  onUploadEvidence: (parameterId: number) => void;
  onLogCAPA: (parameterId: number) => void;
  onUpdateScore: (parameterId: number, newScore: number) => void;
  onNavigateERPModule?: (moduleName: string) => void;
}

export const NABETParameterDrawer: React.FC<NABETParameterDrawerProps> = ({
  parameter,
  isOpen,
  onClose,
  evidenceList,
  onUploadEvidence,
  onLogCAPA,
  onUpdateScore,
  onNavigateERPModule
}) => {
  if (!parameter) return null;

  const paramEvidence = evidenceList.filter(e => e.parameterId === parameter.id);

  const getStatusBadgeVariant = (status: NABETComplianceStatus) => {
    switch (status) {
      case 'Fully Compliant': return 'success';
      case 'Substantially Compliant': return 'info';
      case 'Partially Compliant': return 'warning';
      case 'In Progress': return 'brand';
      case 'Action Required': return 'danger';
      default: return 'neutral';
    }
  };

  const domainNames: Record<number, string> = {
    1: 'Domain 1: School Governance',
    2: 'Domain 2: Education & Support Process',
    3: 'Domain 3: Performance Measurement & Improvement'
  };

  const scoreLabels: Record<number, { title: string; desc: string }> = {
    1: { title: 'Level 1: Initial / Ad-hoc', desc: 'Process is informal and reactive; minimal documentation.' },
    2: { title: 'Level 2: Planned / Emerging', desc: 'Process is planned but partially standardized across departments.' },
    3: { title: 'Level 3: Defined / Standardized', desc: 'Standard operating procedure formally documented and implemented.' },
    4: { title: 'Level 4: Measured / Dynamic', desc: 'Systematically tracked, measured with quantitative KPIs and reviews.' },
    5: { title: 'Level 5: Benchmark / Optimizing', desc: 'Continuous improvement, innovation, and best practice benchmark.' }
  };

  return (
    <DetailDrawer
      isOpen={isOpen}
      onClose={onClose}
      title={`${parameter.parameterNumber} – ${parameter.title}`}
      subtitle={`${domainNames[parameter.domainId]} • Standard ${parameter.standardNumber}`}
      width="xl"
      footer={
        <>
          <button
            type="button"
            onClick={() => onLogCAPA(parameter.id)}
            className="px-3.5 py-2 text-xs sm:text-sm font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <AlertCircle className="w-4 h-4 text-amber-600" />
            Log CAPA Action
          </button>
          <button
            type="button"
            onClick={() => onUploadEvidence(parameter.id)}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-subtle"
          >
            <Plus className="w-4 h-4" />
            Attach Evidence Document
          </button>
        </>
      }
    >
      <div className="space-y-6">
        {/* Compliance Status & Readiness Overview */}
        <div className="bg-surface-bg p-4 rounded-xl border border-surface-border">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <StatusBadge variant={getStatusBadgeVariant(parameter.complianceStatus)} size="md">
                {parameter.complianceStatus}
              </StatusBadge>
              <span className="text-xs font-semibold text-ink-secondary">
                Readiness: {parameter.readinessPercentage}%
              </span>
            </div>
            <div className="text-xs text-ink-secondary flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              Next Audit: <strong>{parameter.nextAuditDate}</strong>
            </div>
          </div>

          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${
                parameter.readinessPercentage >= 85 
                  ? 'bg-emerald-500' 
                  : parameter.readinessPercentage >= 70 
                  ? 'bg-indigo-600' 
                  : 'bg-amber-500'
              }`}
              style={{ width: `${parameter.readinessPercentage}%` }}
            />
          </div>
        </div>

        {/* Official NABET Fourth Edition Requirement */}
        <div>
          <h3 className="text-xs font-bold text-ink-primary uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            Official NABET Standard Requirement (June 2025)
          </h3>
          <div className="p-3.5 bg-indigo-50/50 border border-indigo-100 rounded-lg text-sm text-ink-primary leading-relaxed">
            {parameter.officialRequirement}
          </div>
        </div>

        {/* Guidance Notes & Focus Area */}
        <div>
          <h4 className="text-xs font-bold text-ink-secondary uppercase tracking-wider mb-1.5">
            Guidance & Assessor Focus Area
          </h4>
          <p className="text-xs text-ink-secondary bg-surface-muted/60 p-3 rounded-lg border border-surface-border">
            <strong>Key Focus:</strong> {parameter.guidanceNotes}
          </p>
        </div>

        {/* Sub-requirements verification checklist */}
        <div>
          <h3 className="text-xs font-bold text-ink-primary uppercase tracking-wider mb-2.5">
            Compliance Verification Checklist
          </h3>
          <div className="space-y-2">
            {parameter.subRequirements.map((sub, idx) => (
              <div 
                key={idx} 
                className="flex items-start gap-2.5 p-2.5 rounded-lg border border-surface-border bg-white text-xs text-ink-primary"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="leading-snug">{sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Responsibility Assignment Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 bg-white border border-surface-border rounded-lg">
            <div className="flex items-center gap-1.5 text-xs text-ink-secondary mb-1">
              <User className="w-3.5 h-3.5 text-indigo-600" />
              <span>Lead Process Owner:</span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-ink-primary">
              {parameter.leadOwner}
            </p>
            <p className="text-[11px] text-ink-secondary mt-0.5">
              Dept: {parameter.leadDepartment}
            </p>
          </div>

          <div className="p-3 bg-white border border-surface-border rounded-lg">
            <div className="flex items-center gap-1.5 text-xs text-ink-secondary mb-1">
              <Building className="w-3.5 h-3.5 text-indigo-600" />
              <span>Executive Reviewer:</span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-ink-primary">
              {parameter.reviewer}
            </p>
            <p className="text-[11px] text-ink-secondary mt-0.5">
              Last Signoff: {parameter.lastReviewDate}
            </p>
          </div>
        </div>

        {/* Interactive Self-Assessment Maturity Scale (1 to 5) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-ink-primary uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4 text-indigo-600" />
              Internal Self-Assessment Rating (Scale 1 – 5)
            </h3>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
              Score: {parameter.selfAssessmentScore} / 5
            </span>
          </div>

          <div className="grid grid-cols-5 gap-1.5 mb-2">
            {[1, 2, 3, 4, 5].map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => onUpdateScore(parameter.id, lvl)}
                className={`py-2 px-1 text-center rounded-lg border text-xs font-semibold transition-all ${
                  parameter.selfAssessmentScore === lvl
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-white text-ink-secondary hover:bg-slate-50 border-surface-border'
                }`}
              >
                Level {lvl}
              </button>
            ))}
          </div>

          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs">
            <p className="font-semibold text-ink-primary">
              {scoreLabels[parameter.selfAssessmentScore]?.title}
            </p>
            <p className="text-ink-secondary mt-0.5">
              {scoreLabels[parameter.selfAssessmentScore]?.desc}
            </p>
          </div>
        </div>

        {/* Linked ERP Module Integration Banner */}
        {parameter.linkedERPModule && (
          <div className="p-3.5 bg-indigo-50/70 border border-indigo-200/60 rounded-xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                ERP
              </div>
              <div>
                <p className="text-xs font-semibold text-indigo-950">
                  Integrated with School ERP
                </p>
                <p className="text-[11px] text-indigo-800">
                  Data sourced from <strong>{parameter.linkedERPModule}</strong> module
                </p>
              </div>
            </div>

            {onNavigateERPModule && (
              <button
                type="button"
                onClick={() => onNavigateERPModule(parameter.linkedERPModule)}
                className="text-xs font-semibold text-indigo-700 hover:text-indigo-900 flex items-center gap-1 hover:underline"
              >
                Open View
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}

        {/* Attached Evidence Documents */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="text-xs font-bold text-ink-primary uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-indigo-600" />
              Attached Supporting Evidence ({paramEvidence.length})
            </h3>
            <button
              type="button"
              onClick={() => onUploadEvidence(parameter.id)}
              className="text-xs font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Evidence
            </button>
          </div>

          {paramEvidence.length === 0 ? (
            <div className="p-4 border border-dashed border-surface-border rounded-lg text-center text-xs text-ink-secondary bg-surface-bg">
              No evidence documents attached to this parameter yet.
            </div>
          ) : (
            <div className="space-y-2">
              {paramEvidence.map((evi) => (
                <div
                  key={evi.id}
                  className="p-3 bg-white border border-surface-border rounded-lg flex items-center justify-between gap-3 hover:border-indigo-200 transition-colors"
                >
                  <div className="flex items-start gap-2.5">
                    <FileCheck2 className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-ink-primary">
                        {evi.title}
                      </p>
                      <div className="flex items-center gap-2 text-[11px] text-ink-secondary mt-0.5">
                        <span>Doc: {evi.documentNo}</span>
                        <span>•</span>
                        <span>{evi.category}</span>
                        <span>•</span>
                        <span>{evi.fileSize}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <StatusBadge
                      variant={
                        evi.verificationStatus === 'Verified' ? 'success' :
                        evi.verificationStatus === 'Under Review' ? 'info' : 'warning'
                      }
                      size="sm"
                    >
                      {evi.verificationStatus}
                    </StatusBadge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DetailDrawer>
  );
};
