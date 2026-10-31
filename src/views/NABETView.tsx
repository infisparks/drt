import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  Award, 
  FileCheck2, 
  FileText, 
  Upload, 
  Download, 
  Search, 
  Filter, 
  Eye, 
  CheckCircle2, 
  AlertCircle, 
  Building, 
  Calendar, 
  ExternalLink, 
  Users, 
  BookOpen, 
  GraduationCap, 
  Clock, 
  AlertTriangle, 
  Sparkles, 
  Plus, 
  ChevronRight, 
  Check, 
  HeartHandshake, 
  HelpCircle, 
  TrendingUp, 
  MoreVertical, 
  ShieldAlert, 
  Layers, 
  ArrowUpRight,
  FolderLock,
  Printer,
  Compass,
  Smile,
  RefreshCw
} from 'lucide-react';
import { 
  NABETDomain, 
  NABETStandard, 
  NABETParameter, 
  NABETEvidence, 
  NABETImprovementAction, 
  NABETInternalAudit, 
  NABETStakeholderFeedback, 
  NABETGovernanceCommittee, 
  NABETQualityObjective, 
  NABETComplianceStatus, 
  NABETDomainId 
} from '../types/nabet';
import { 
  NABET_EDITION, 
  NABET_TARGET_CYCLE, 
  NABET_DOMAINS, 
  NABET_STANDARDS, 
  NABET_PARAMETERS, 
  MOCK_NABET_EVIDENCE, 
  MOCK_NABET_CAPA, 
  MOCK_NABET_AUDITS, 
  MOCK_NABET_FEEDBACK, 
  MOCK_NABET_COMMITTEES, 
  MOCK_NABET_OBJECTIVES 
} from '../data/nabetData';
import { PageHeader } from '../components/common/PageHeader';
import { StatCard } from '../components/common/StatCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { SearchFilterBar } from '../components/common/SearchFilterBar';
import { NABETParameterDrawer } from './nabet/NABETParameterDrawer';
import { NABETUploadEvidenceModal } from './nabet/NABETUploadEvidenceModal';
import { NABETLogCAPAModal } from './nabet/NABETLogCAPAModal';
import { NABETExportReportModal } from './nabet/NABETExportReportModal';
import { generateEvidenceExtractBlobUrl } from '../utils/pdfGenerator';

export type NABETTab = 
  | 'dashboard'
  | 'framework'
  | 'governance'
  | 'academic-hr'
  | 'documentation'
  | 'audits'
  | 'improvement'
  | 'stakeholders';

interface NABETViewProps {
  onShowToast: (type: 'success' | 'warning' | 'error' | 'info', title: string, message?: string) => void;
  onNavigateView?: (viewKey: string) => void;
}

export const NABETView: React.FC<NABETViewProps> = ({ onShowToast, onNavigateView }) => {
  // Main states
  const [activeTab, setActiveTab] = useState<NABETTab>('dashboard');
  const [domains, setDomains] = useState<NABETDomain[]>(NABET_DOMAINS);
  const [parameters, setParameters] = useState<NABETParameter[]>(NABET_PARAMETERS);
  const [evidenceList, setEvidenceList] = useState<NABETEvidence[]>(MOCK_NABET_EVIDENCE);
  const [capaActions, setCapaActions] = useState<NABETImprovementAction[]>(MOCK_NABET_CAPA);
  const [audits, setAudits] = useState<NABETInternalAudit[]>(MOCK_NABET_AUDITS);
  const [feedbacks, setFeedbacks] = useState<NABETStakeholderFeedback[]>(MOCK_NABET_FEEDBACK);
  const [committees, setCommittees] = useState<NABETGovernanceCommittee[]>(MOCK_NABET_COMMITTEES);
  const [objectives, setObjectives] = useState<NABETQualityObjective[]>(MOCK_NABET_OBJECTIVES);

  // Filters for Parameters Explorer
  const [searchQuery, setSearchQuery] = useState('');
  const [domainFilter, setDomainFilter] = useState<'all' | '1' | '2' | '3'>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [standardFilter, setStandardFilter] = useState<string>('all');

  // Evidence repository filters
  const [evidenceSearch, setEvidenceSearch] = useState('');
  const [evidenceCategoryFilter, setEvidenceCategoryFilter] = useState('all');
  const [evidenceStatusFilter, setEvidenceStatusFilter] = useState('all');

  // Modals & Drawers state
  const [selectedParam, setSelectedParam] = useState<NABETParameter | null>(null);
  const [isParamDrawerOpen, setIsParamDrawerOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [modalPreselectParamId, setModalPreselectParamId] = useState<number | undefined>(undefined);
  const [isCAPAModalOpen, setIsCAPAModalOpen] = useState(false);
  const [isDossierModalOpen, setIsDossierModalOpen] = useState(false);

  // Quick stats calculations
  const totalVerifiedDocs = evidenceList.filter(e => e.verificationStatus === 'Verified').length;
  const totalPendingReview = evidenceList.filter(e => e.verificationStatus === 'Under Review' || e.verificationStatus === 'Pending Review').length;
  const activeCAPACount = capaActions.filter(c => c.status !== 'Closed').length;
  const overallReadinessScore = Math.round(
    domains.reduce((acc, d) => acc + d.complianceScore, 0) / domains.length
  );

  // Filtered parameters
  const filteredParameters = useMemo(() => {
    return parameters.filter((p) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        p.title.toLowerCase().includes(q) ||
        p.parameterNumber.toLowerCase().includes(q) ||
        p.focusArea.toLowerCase().includes(q) ||
        p.leadOwner.toLowerCase().includes(q);

      const matchesDomain = domainFilter === 'all' || p.domainId === Number(domainFilter);
      const matchesStatus = statusFilter === 'all' || p.complianceStatus === statusFilter;
      const matchesStandard = standardFilter === 'all' || p.standardNumber.toString() === standardFilter;

      return matchesSearch && matchesDomain && matchesStatus && matchesStandard;
    });
  }, [parameters, searchQuery, domainFilter, statusFilter, standardFilter]);

  // Filtered evidence
  const filteredEvidence = useMemo(() => {
    return evidenceList.filter((e) => {
      const q = evidenceSearch.toLowerCase();
      const matchesSearch = 
        e.title.toLowerCase().includes(q) ||
        e.documentNo.toLowerCase().includes(q) ||
        e.uploadedBy.toLowerCase().includes(q);

      const matchesCat = evidenceCategoryFilter === 'all' || e.category === evidenceCategoryFilter;
      const matchesStatus = evidenceStatusFilter === 'all' || e.verificationStatus === evidenceStatusFilter;

      return matchesSearch && matchesCat && matchesStatus;
    });
  }, [evidenceList, evidenceSearch, evidenceCategoryFilter, evidenceStatusFilter]);

  // Handlers
  const handleOpenParameter = (param: NABETParameter) => {
    setSelectedParam(param);
    setIsParamDrawerOpen(true);
  };

  const handleUpdateParameterScore = (paramId: number, newScore: number) => {
    const statusMap: Record<number, NABETComplianceStatus> = {
      1: 'Action Required',
      2: 'In Progress',
      3: 'Partially Compliant',
      4: 'Substantially Compliant',
      5: 'Fully Compliant'
    };
    const pctMap: Record<number, number> = {
      1: 30,
      2: 50,
      3: 75,
      4: 90,
      5: 100
    };

    setParameters(prev => prev.map(p => {
      if (p.id === paramId) {
        return {
          ...p,
          selfAssessmentScore: newScore,
          complianceStatus: statusMap[newScore],
          readinessPercentage: pctMap[newScore],
          lastReviewDate: new Date().toISOString().split('T')[0]
        };
      }
      return p;
    }));

    if (selectedParam && selectedParam.id === paramId) {
      setSelectedParam(prev => prev ? {
        ...prev,
        selfAssessmentScore: newScore,
        complianceStatus: statusMap[newScore],
        readinessPercentage: pctMap[newScore]
      } : null);
    }

    onShowToast('success', 'Self-Assessment Updated', `Parameter ${paramId} rating updated to Level ${newScore} (${statusMap[newScore]}).`);
  };

  const handleAddEvidence = (newEvidenceData: Omit<NABETEvidence, 'id'>) => {
    const newId = `evi-${Date.now()}`;
    const newEvi: NABETEvidence = {
      ...newEvidenceData,
      id: newId
    };

    setEvidenceList(prev => [newEvi, ...prev]);

    // Increment count on parameter
    setParameters(prev => prev.map(p => {
      if (p.id === newEvidenceData.parameterId) {
        return {
          ...p,
          evidenceDocsCount: p.evidenceDocsCount + 1
        };
      }
      return p;
    }));

    onShowToast('success', 'Evidence Attached', `"${newEvidenceData.title}" attached and submitted for NABET audit verification.`);
  };

  const handleVerifyEvidence = (eviId: string) => {
    setEvidenceList(prev => prev.map(e => {
      if (e.id === eviId) {
        return {
          ...e,
          verificationStatus: 'Verified',
          verifiedBy: 'Mrs. Shaheen Shaikh (Principal & Head QA)',
          verificationDate: new Date().toISOString().split('T')[0]
        };
      }
      return e;
    }));

    onShowToast('success', 'Evidence Document Verified', 'Document verified against NABET Fourth Edition criteria and stamped.');
  };

  const handleAddCAPA = (newCAPAData: Omit<NABETImprovementAction, 'id'>) => {
    const newId = `capa-${Date.now()}`;
    const newAction: NABETImprovementAction = {
      ...newCAPAData,
      id: newId
    };

    setCapaActions(prev => [newAction, ...prev]);
    onShowToast('success', 'CAPA Improvement Plan Created', `Action "${newCAPAData.title}" assigned to ${newCAPAData.assignedTo}.`);
  };

  const handleCompleteCAPA = (capaId: string) => {
    setCapaActions(prev => prev.map(c => {
      if (c.id === capaId) {
        return {
          ...c,
          status: 'Closed',
          progressPct: 100,
          closureDate: new Date().toISOString().split('T')[0],
          actionTakenReport: (c.actionTakenReport || '') + ' [Verified and closed by IQAC Quality Reviewer]'
        };
      }
      return c;
    }));

    onShowToast('success', 'CAPA Action Closed', 'Corrective action verified 100% and logged to continuous improvement evidence.');
  };

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

  return (
    <div className="space-y-6">
      {/* 1. Page Header */}
      <PageHeader
        title="NABET Accreditation & Quality Management"
        description="Standard for Quality School Governance – Fourth Edition, June 2025. Integrated school governance, 36 assessment parameters, verified evidence, and continuous improvement."
        breadcrumbs={[
          { label: 'Governance' },
          { label: 'NABET Accreditation (June 2025)', active: true }
        ]}
        badge={
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            4th Edition, June 2025
          </span>
        }
        primaryAction={{
          label: "Attach NABET Evidence",
          icon: <Upload className="w-4 h-4" />,
          onClick: () => {
            setModalPreselectParamId(undefined);
            setIsUploadModalOpen(true);
          }
        }}
        secondaryActions={[
          {
            label: "Executive Readiness Dossier",
            icon: <Printer className="w-3.5 h-3.5" />,
            onClick: () => setIsDossierModalOpen(true)
          },
          {
            label: "Log CAPA Action",
            icon: <Plus className="w-3.5 h-3.5" />,
            onClick: () => {
              setModalPreselectParamId(undefined);
              setIsCAPAModalOpen(true);
            }
          }
        ]}
      />

      {/* 2. Advisory Notice Banner */}
      <div className="p-3.5 bg-surface-muted/70 border border-surface-border rounded-xl text-xs text-ink-secondary flex items-start justify-between gap-3 shadow-subtle">
        <div className="flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>InfiSpark NABET Quality Management System Notice:</strong> The software supports institutional NABET readiness, governance self-assessment, evidence verification, and continuous improvement. It does not itself grant accreditation or guarantee an accreditation outcome. Formal certification requires an on-site peer-review audit by Quality Council of India (QCI) / NABET.
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 flex-shrink-0 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          Connected to School ERP
        </div>
      </div>

      {/* 3. Top Tab Navigation */}
      <div className="border-b border-surface-border bg-white rounded-t-xl px-2 pt-2 flex overflow-x-auto no-scrollbar gap-1">
        {[
          { key: 'dashboard', label: 'NABET Dashboard', icon: ShieldCheck },
          { key: 'framework', label: '36 Standards & Parameters', icon: Layers, badge: '36' },
          { key: 'governance', label: 'School Governance', icon: Building },
          { key: 'academic-hr', label: 'Academic & HR Quality', icon: BookOpen },
          { key: 'documentation', label: 'Evidence Repository', icon: FileCheck2, badge: `${totalVerifiedDocs}` },
          { key: 'audits', label: 'Self-Assessment & Audits', icon: Award },
          { key: 'improvement', label: 'Continuous Improvement (CAPA)', icon: TrendingUp, badge: `${activeCAPACount}` },
          { key: 'stakeholders', label: 'Feedback & Reports', icon: HeartHandshake }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as NABETTab)}
              className={`flex items-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
                isActive
                  ? 'border-indigo-600 text-indigo-600 bg-indigo-50/40 rounded-t-lg'
                  : 'border-transparent text-ink-secondary hover:text-ink-primary hover:border-slate-300'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-ink-secondary'}`} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-ink-secondary'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: NABET DASHBOARD */}
      {/* ========================================================================= */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Executive Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Overall NABET Readiness"
              value={`${overallReadinessScore}%`}
              icon={ShieldCheck}
              trend={{ value: "Level 4 (Dynamic)", isPositive: true }}
              subtext="Aggregated across 36 parameters"
            />
            <StatCard
              label="Verified Evidence Files"
              value={`${totalVerifiedDocs} Docs`}
              icon={FileCheck2}
              trend={{ value: `${totalPendingReview} Under Review`, isPositive: false }}
              subtext="Mapped to official clauses"
            />
            <StatCard
              label="Open CAPA Actions"
              value={`${activeCAPACount} Actions`}
              icon={TrendingUp}
              subtext="Targeting 100% closure"
            />
            <StatCard
              label="Pre-Assessment Audit"
              value="85.2%"
              icon={Award}
              trend={{ value: "Next: Jan 2027", isPositive: true }}
              subtext="Lead Auditor signoff"
            />
          </div>

          {/* Official Framework Architecture Cards (3 Domains) */}
          <div>
            <div className="flex items-center justify-between mb-3 px-0.5">
              <h2 className="text-sm font-bold text-ink-primary uppercase tracking-wider">
                Official NABET 4th Edition Domains Structure
              </h2>
              <span className="text-xs text-ink-secondary">
                June 2025 Standard: 3 Domains • 14 Standards • 36 Assessment Parameters
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {domains.map((dom) => (
                <div 
                  key={dom.id}
                  className="bg-white border border-surface-border rounded-xl p-5 shadow-card hover:border-indigo-200 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                        Domain {dom.domainNumber}
                      </span>
                      <span className="text-sm font-bold text-ink-primary">
                        {dom.complianceScore}% Ready
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-ink-primary mb-1">
                      {dom.name}
                    </h3>
                    <p className="text-xs text-ink-secondary leading-relaxed mb-4">
                      {dom.focus}
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-surface-border">
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-300 ${
                          dom.complianceScore >= 85 ? 'bg-indigo-600' : 'bg-amber-500'
                        }`}
                        style={{ width: `${dom.complianceScore}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs text-ink-secondary">
                      <span>{dom.standardsCount} Standards • {dom.parametersCount} Parameters</span>
                      <span className="font-semibold text-emerald-700">{dom.verifiedEvidenceCount} Docs</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setDomainFilter(dom.id.toString() as '1' | '2' | '3');
                        setActiveTab('framework');
                      }}
                      className="w-full mt-2 py-2 px-3 text-xs font-semibold text-indigo-600 bg-indigo-50/60 hover:bg-indigo-100/60 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Explore Domain {dom.domainNumber} Parameters</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 12-Step Accreditation Readiness Lifecycle & Executive Briefing */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 12-Step Lifecycle */}
            <div className="lg:col-span-2 bg-white border border-surface-border rounded-xl p-5 sm:p-6 shadow-card space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-ink-primary">
                    NABET Accreditation Readiness Lifecycle
                  </h3>
                  <p className="text-xs text-ink-secondary">
                    12-phase systematic quality roadmap for the academic session
                  </p>
                </div>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                  Phase 7 of 12 Active
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs">
                {[
                  { step: 1, title: "Understand NABET 4th Edition Framework", status: "completed" },
                  { step: 2, title: "Conduct Internal Self-Assessment", status: "completed" },
                  { step: 3, title: "Identify Process & Document Gaps", status: "completed" },
                  { step: 4, title: "Assign Responsibilities to Process Owners", status: "completed" },
                  { step: 5, title: "Implement Policies, SOPs & EMS", status: "completed" },
                  { step: 6, title: "Collect & Digitally Verify Evidence", status: "completed" },
                  { step: 7, title: "Conduct Internal Audits & Close CAPA", status: "active" },
                  { step: 8, title: "Prepare School Accreditation Manual (SAM)", status: "active" },
                  { step: 9, title: "Prepare NABET Application Dossier", status: "pending" },
                  { step: 10, title: "Support Desk Review & On-site Assessment", status: "pending" },
                  { step: 11, title: "Track Observations & Formal Closure", status: "pending" },
                  { step: 12, title: "Maintain Compliance & Surveillance Audits", status: "pending" }
                ].map((item) => (
                  <div
                    key={item.step}
                    className={`p-2.5 rounded-lg border flex items-center gap-2.5 ${
                      item.status === 'completed'
                        ? 'bg-emerald-50/50 border-emerald-200/60 text-emerald-900'
                        : item.status === 'active'
                        ? 'bg-indigo-50/70 border-indigo-200 text-indigo-950 font-semibold shadow-sm'
                        : 'bg-slate-50/50 border-slate-200 text-ink-secondary'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                      item.status === 'completed'
                        ? 'bg-emerald-600 text-white'
                        : item.status === 'active'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-300 text-white'
                    }`}>
                      {item.status === 'completed' ? <Check className="w-3 h-3" /> : item.step}
                    </div>
                    <span className="truncate">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Executive Leadership Overview & Alerts */}
            <div className="bg-white border border-surface-border rounded-xl p-5 sm:p-6 shadow-card space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-ink-primary mb-1">
                  Director & Principal Executive Briefing
                </h3>
                <p className="text-xs text-ink-secondary mb-4">
                  DRT Knowledge Hub Quality Assurance Cell
                </p>

                <div className="space-y-3">
                  <div className="p-3 bg-amber-50/80 border border-amber-200/70 rounded-lg text-xs text-amber-900">
                    <div className="flex items-center gap-1.5 font-bold mb-0.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      Priority Action: Municipal Fire NOC Renewal
                    </div>
                    <p className="text-[11px] text-amber-800">
                      TMC Fire NOC expires on 17 Nov 2026. Follow-up file movement underway with Chief Fire Officer.
                    </p>
                  </div>

                  <div className="p-3 bg-indigo-50/80 border border-indigo-200/70 rounded-lg text-xs text-indigo-950">
                    <div className="flex items-center gap-1.5 font-bold mb-0.5">
                      <FileText className="w-3.5 h-3.5 text-indigo-600" />
                      HPC 360-Degree Implementation
                    </div>
                    <p className="text-[11px] text-indigo-900">
                      Term 1 PARAKH-aligned Holistic Progress Cards issued for 940 students in Foundational and Middle wings.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-50 border border-surface-border rounded-lg text-xs text-ink-secondary">
                    <div className="flex items-center gap-1.5 font-bold text-ink-primary mb-0.5">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      Pre-Assessment Desk Review Simulation
                    </div>
                    <p className="text-[11px]">
                      Scheduled for 20 Jan 2027 by External NABET Quality Assessor before formal online portal filing.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-surface-border">
                <button
                  type="button"
                  onClick={() => setIsDossierModalOpen(true)}
                  className="w-full py-2.5 px-3 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-subtle"
                >
                  <Download className="w-4 h-4" />
                  Generate Full Accreditation Dossier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: 36 STANDARDS & PARAMETERS EXPLORER */}
      {/* ========================================================================= */}
      {activeTab === 'framework' && (
        <div className="space-y-4">
          {/* Search & Filter Toolbar */}
          <div className="bg-white p-4 rounded-xl border border-surface-border shadow-subtle flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-secondary" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search parameter by title, number, focus area, or lead owner..."
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-surface-border rounded-lg text-ink-primary focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={domainFilter}
                onChange={(e) => setDomainFilter(e.target.value as 'all' | '1' | '2' | '3')}
                className="px-3 py-2 text-xs bg-slate-50 border border-surface-border rounded-lg text-ink-primary focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="all">All 3 Domains</option>
                <option value="1">Domain 1: Governance (P1–P11)</option>
                <option value="2">Domain 2: Education & Support (P12–P32)</option>
                <option value="3">Domain 3: Measurement (P33–P36)</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 text-xs bg-slate-50 border border-surface-border rounded-lg text-ink-primary focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="all">All Compliance Statuses</option>
                <option value="Fully Compliant">Fully Compliant</option>
                <option value="Substantially Compliant">Substantially Compliant</option>
                <option value="Partially Compliant">Partially Compliant</option>
                <option value="In Progress">In Progress</option>
                <option value="Action Required">Action Required</option>
              </select>
            </div>
          </div>

          {/* Results Counter */}
          <div className="flex items-center justify-between text-xs text-ink-secondary px-1">
            <span>
              Showing <strong>{filteredParameters.length}</strong> of <strong>36</strong> official assessment parameters
            </span>
            <span>Click any parameter card to inspect full requirements and evidence</span>
          </div>

          {/* Parameters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredParameters.map((param) => {
              const paramEviCount = evidenceList.filter(e => e.parameterId === param.id).length;
              return (
                <div
                  key={param.id}
                  onClick={() => handleOpenParameter(param)}
                  className="bg-white border border-surface-border rounded-xl p-4 sm:p-5 shadow-card hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Badges */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                          {param.parameterNumber}
                        </span>
                        <span className="text-[11px] font-medium text-ink-secondary">
                          Std {param.standardNumber}
                        </span>
                      </div>
                      <StatusBadge variant={getStatusBadgeVariant(param.complianceStatus)} size="sm">
                        {param.complianceStatus}
                      </StatusBadge>
                    </div>

                    {/* Title */}
                    <h3 className="text-xs sm:text-sm font-bold text-ink-primary group-hover:text-indigo-600 transition-colors line-clamp-2 mb-1.5 leading-snug">
                      {param.title}
                    </h3>

                    {/* Focus Area */}
                    <p className="text-[11px] text-ink-secondary mb-3">
                      <strong>Focus:</strong> {param.focusArea}
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-surface-border">
                    {/* Readiness bar */}
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-ink-secondary mb-1">
                        <span>Readiness</span>
                        <span className="font-semibold text-ink-primary">{param.readinessPercentage}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            param.readinessPercentage >= 85 ? 'bg-emerald-500' :
                            param.readinessPercentage >= 70 ? 'bg-indigo-600' : 'bg-amber-500'
                          }`}
                          style={{ width: `${param.readinessPercentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Owner & Evidence */}
                    <div className="flex items-center justify-between text-[11px] text-ink-secondary">
                      <div className="flex items-center gap-1.5 truncate max-w-[170px]">
                        <div className="w-5 h-5 rounded-full bg-slate-200 text-ink-primary flex items-center justify-center font-bold text-[9px] flex-shrink-0">
                          {param.leadOwner.charAt(0)}
                        </div>
                        <span className="truncate">{param.leadOwner.split('(')[0]}</span>
                      </div>

                      <div className="flex items-center gap-1 text-indigo-700 font-semibold bg-indigo-50/70 px-2 py-0.5 rounded">
                        <FileCheck2 className="w-3.5 h-3.5 text-indigo-600" />
                        <span>{paramEviCount} Docs</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: SCHOOL GOVERNANCE MANAGEMENT */}
      {/* ========================================================================= */}
      {activeTab === 'governance' && (
        <div className="space-y-6">
          {/* Governance Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Interested Parties & Context Matrix */}
            <div className="bg-white border border-surface-border rounded-xl p-5 shadow-card space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-ink-primary">
                    Interested Parties Matrix (Standard 1 – Context)
                  </h3>
                  <p className="text-xs text-ink-secondary">
                    Identification of internal and external stakeholders and expectations
                  </p>
                </div>
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md">
                  Clause 1.2 Compliant
                </span>
              </div>

              <div className="space-y-2 text-xs">
                {[
                  { party: "Parents & Guardians", expectations: "Holistic safety, academic excellence, transparent fee schedule, regular HPC feedback", channel: "PTA Body & ERP Portal" },
                  { party: "CBSE & Education Dept", expectations: "Rule 13 attendance, 50 hrs faculty CPD, infrastructure safety self-certifications", channel: "Annual OASIS & Affiliation Desk" },
                  { party: "Teaching & Non-Teaching Staff", expectations: "Timely pay, EPF/ESI statutory welfare, 360 appraisal, continuous mentorship", channel: "Monthly Staff Council" },
                  { party: "Local Municipal Corporation", expectations: "Fire safety NOC, water potability tests, building stability certification", channel: "Statutory Compliance Cell" }
                ].map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-surface-border rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-ink-primary">{item.party}</span>
                      <span className="text-[11px] text-indigo-700 font-medium">{item.channel}</span>
                    </div>
                    <p className="text-[11px] text-ink-secondary">
                      <strong>Key Needs:</strong> {item.expectations}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* School Management Committee (SMC) & Statutory Governance */}
            <div className="bg-white border border-surface-border rounded-xl p-5 shadow-card space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-ink-primary">
                    Mandatory Committees & Functioning (Standard 2)
                  </h3>
                  <p className="text-xs text-ink-secondary">
                    Quorum tracking, minutes registers, and statutory committees
                  </p>
                </div>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                  All 5 Active
                </span>
              </div>

              <div className="space-y-2 text-xs">
                {committees.map((com) => (
                  <div key={com.id} className="p-3 bg-slate-50 border border-surface-border rounded-lg flex items-center justify-between">
                    <div>
                      <p className="font-bold text-ink-primary">{com.committeeName}</p>
                      <p className="text-[11px] text-ink-secondary">
                        Chair: {com.chairperson} • {com.totalMembers} Members • Meets {com.meetingFrequency}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <StatusBadge variant="success" size="sm">
                        {com.status}
                      </StatusBadge>
                      <p className="text-[10px] text-ink-secondary mt-0.5 font-mono">
                        {com.minutesDocNo}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Institutional Quality Objectives Tracker */}
          <div className="bg-white border border-surface-border rounded-xl p-5 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-ink-primary">
                  Annual SMART Quality Objectives (Standard 3)
                </h3>
                <p className="text-xs text-ink-secondary">
                  Measurable institutional targets aligned with NABET Accreditation 4th Edition
                </p>
              </div>
              <button
                type="button"
                onClick={() => onShowToast('info', 'Add Quality Objective', 'Simulated creation of annual institutional quality KPI.')}
                className="px-3 py-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Target
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {objectives.map((obj) => (
                <div key={obj.id} className="p-3.5 bg-slate-50 border border-surface-border rounded-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100/60 px-2 py-0.5 rounded">
                        Domain {obj.domainId}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        obj.status === 'Target Achieved' ? 'bg-emerald-100 text-emerald-800' :
                        obj.status === 'On Track' ? 'bg-indigo-100 text-indigo-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {obj.status}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-ink-primary mb-2 leading-snug">
                      {obj.objective}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-surface-border text-[11px] text-ink-secondary">
                    <div className="flex justify-between">
                      <span>Progress:</span>
                      <strong className="text-ink-primary">{obj.kpiPct}%</strong>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${obj.kpiPct}%` }} />
                    </div>
                    <p className="text-[10px] text-ink-secondary truncate">
                      Owner: {obj.owner.split('(')[0]} • Due: {obj.timeline}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: ACADEMIC & HR QUALITY */}
      {/* ========================================================================= */}
      {activeTab === 'academic-hr' && (
        <div className="space-y-6">
          {/* Quick Stats for Domain 2 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Staff HR Verified"
              value="86 / 86"
              icon={Users}
              trend={{ value: "100% Service Books", isPositive: true }}
              subtext="NCTE/CBSE Qualified"
            />
            <StatCard
              label="Teacher CPD Training"
              value="44.2 Hrs"
              icon={GraduationCap}
              trend={{ value: "Mandate: 50 Hrs", isPositive: true }}
              subtext="CBSE COE & In-House"
            />
            <StatCard
              label="Curriculum Maps"
              value="18 Chapters"
              icon={BookOpen}
              subtext="NCERT Learning Outcomes"
            />
            <StatCard
              label="HPC Cards Issued"
              value="940 Cards"
              icon={Award}
              trend={{ value: "Term 1 Completed", isPositive: true }}
              subtext="PARAKH 360-Degree format"
            />
          </div>

          {/* Academic Pillars Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Standard 7: Human Resource */}
            <div className="bg-white border border-surface-border rounded-xl p-5 shadow-card space-y-3">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-ink-primary">
                  Standard 7: Human Resource Quality
                </h3>
              </div>
              <p className="text-xs text-ink-secondary leading-relaxed">
                Adherence to qualification criteria, structured 90-day induction buddy system, 360-degree annual appraisals, and faculty welfare policies.
              </p>
              <div className="p-3 bg-slate-50 border border-surface-border rounded-lg text-xs space-y-1">
                <div className="flex justify-between">
                  <span>Faculty Strength:</span>
                  <strong>86 Educators</strong>
                </div>
                <div className="flex justify-between">
                  <span>90-Day Mentorship Logs:</span>
                  <strong className="text-emerald-700">100% Maintained</strong>
                </div>
                <div className="flex justify-between">
                  <span>EPF / ESI Compliance:</span>
                  <strong className="text-emerald-700">Valid Challans</strong>
                </div>
              </div>
            </div>

            {/* Standard 8: Holistic Curriculum */}
            <div className="bg-white border border-surface-border rounded-xl p-5 shadow-card space-y-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-ink-primary">
                  Standard 8: Curriculum & 21st-Century Skills
                </h3>
              </div>
              <p className="text-xs text-ink-secondary leading-relaxed">
                Integrated Annual Curriculum Plan (ACP), NCERT LO codes, CBSE Art-Integrated Learning (AIL), Khelo India physical education, and 10 Bagless Days.
              </p>
              <div className="p-3 bg-slate-50 border border-surface-border rounded-lg text-xs space-y-1">
                <div className="flex justify-between">
                  <span>Learning Outcome Codes:</span>
                  <strong className="text-indigo-700">100% Chapters Mapped</strong>
                </div>
                <div className="flex justify-between">
                  <span>10 Bagless Days:</span>
                  <strong className="text-emerald-700">Logged (Grades VI-VIII)</strong>
                </div>
                <div className="flex justify-between">
                  <span>SEWA Community Service:</span>
                  <strong className="text-indigo-700">Grades IX-XII Portfolios</strong>
                </div>
              </div>
            </div>

            {/* Standard 13: Safety & Child Safeguarding */}
            <div className="bg-white border border-surface-border rounded-xl p-5 shadow-card space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-ink-primary">
                  Standard 13: Physical & Psychological Safety
                </h3>
              </div>
              <p className="text-xs text-ink-secondary leading-relaxed">
                Fire drills, 100% perimeter CCTV surveillance, statutory POCSO committee, zero-tolerance anti-bullying squads, and confidential student counseling.
              </p>
              <div className="p-3 bg-slate-50 border border-surface-border rounded-lg text-xs space-y-1">
                <div className="flex justify-between">
                  <span>Fire Evacuation Drill:</span>
                  <strong className="text-emerald-700">Completed (3m 42s)</strong>
                </div>
                <div className="flex justify-between">
                  <span>POCSO External Member:</span>
                  <strong className="text-emerald-700">Advocate Empaneled</strong>
                </div>
                <div className="flex justify-between">
                  <span>School Bus GPS & CCTV:</span>
                  <strong className="text-emerald-700">100% Operational</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: EVIDENCE & DOCUMENTATION REPOSITORY */}
      {/* ========================================================================= */}
      {activeTab === 'documentation' && (
        <div className="space-y-4">
          {/* SAM Banner */}
          <div className="p-4 bg-indigo-50/70 border border-indigo-200/80 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-subtle">
            <div className="flex items-start gap-3">
              <FolderLock className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-indigo-950">
                  School Accreditation Manual (SAM) – Fourth Edition, June 2025 Standard
                </h4>
                <p className="text-xs text-indigo-800 mt-0.5">
                  Central repository indexing all institutional SOPs, statutory certificates, and parameter evidence.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setModalPreselectParamId(undefined);
                setIsUploadModalOpen(true);
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-1.5 flex-shrink-0 shadow-subtle"
            >
              <Upload className="w-3.5 h-3.5" />
              Upload & Map Document
            </button>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-white p-4 rounded-xl border border-surface-border shadow-subtle flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-secondary" />
              <input
                type="text"
                value={evidenceSearch}
                onChange={(e) => setEvidenceSearch(e.target.value)}
                placeholder="Search evidence by title, document no, or uploader..."
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-surface-border rounded-lg text-ink-primary focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={evidenceCategoryFilter}
                onChange={(e) => setEvidenceCategoryFilter(e.target.value)}
                className="px-3 py-2 text-xs bg-slate-50 border border-surface-border rounded-lg text-ink-primary focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="all">All Categories</option>
                <option value="Policy & SOP">Policy & SOP</option>
                <option value="Statutory Certificate">Statutory Certificate</option>
                <option value="Academic Record">Academic Record</option>
                <option value="Meeting Minutes">Meeting Minutes</option>
                <option value="Audit Report">Audit Report</option>
                <option value="HR & Staff Record">HR & Staff Record</option>
              </select>

              <select
                value={evidenceStatusFilter}
                onChange={(e) => setEvidenceStatusFilter(e.target.value)}
                className="px-3 py-2 text-xs bg-slate-50 border border-surface-border rounded-lg text-ink-primary focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="all">All Statuses</option>
                <option value="Verified">Verified</option>
                <option value="Under Review">Under Review</option>
                <option value="Pending Review">Pending Review</option>
              </select>
            </div>
          </div>

          {/* Table / List UI */}
          <div className="bg-white border border-surface-border rounded-xl shadow-subtle overflow-hidden">
            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-surface-border text-ink-secondary font-semibold">
                  <tr>
                    <th className="py-3 px-4">Document Details</th>
                    <th className="py-3 px-4">Mapped Parameter</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Uploaded By</th>
                    <th className="py-3 px-4">Verification Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border text-ink-primary">
                  {filteredEvidence.map((evi) => (
                    <tr key={evi.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <FileText className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-ink-primary">{evi.title}</p>
                            <p className="text-[11px] text-ink-secondary font-mono">
                              Doc: {evi.documentNo} • {evi.version} • {evi.fileSize}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span className="font-mono text-indigo-700 font-semibold bg-indigo-50 px-2 py-0.5 rounded">
                          Param {evi.parameterId}
                        </span>
                        <span className="text-[11px] text-ink-secondary ml-1.5">(Std {evi.standardNumber})</span>
                      </td>

                      <td className="py-3 px-4 text-ink-secondary">
                        {evi.category}
                      </td>

                      <td className="py-3 px-4 text-ink-secondary">
                        <p className="font-medium text-ink-primary">{evi.uploadedBy}</p>
                        <p className="text-[10px]">{evi.uploadDate}</p>
                      </td>

                      <td className="py-3 px-4">
                        <StatusBadge
                          variant={
                            evi.verificationStatus === 'Verified' ? 'success' :
                            evi.verificationStatus === 'Under Review' ? 'info' : 'warning'
                          }
                          size="sm"
                        >
                          {evi.verificationStatus}
                        </StatusBadge>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {evi.verificationStatus !== 'Verified' && (
                            <button
                              type="button"
                              onClick={() => handleVerifyEvidence(evi.id)}
                              className="px-2.5 py-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded transition-colors"
                            >
                              Verify
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              try {
                                const blobUrl = generateEvidenceExtractBlobUrl(
                                  evi.documentNo,
                                  evi.title,
                                  evi.category,
                                  evi.parameterId,
                                  evi.uploadedBy,
                                  evi.verificationStatus
                                );
                                window.open(blobUrl, '_blank');
                                onShowToast('success', 'Evidence PDF Opened', `Opened ${evi.documentNo}.pdf in browser Blob URL.`);
                              } catch (err) {
                                console.error('Evidence blob error:', err);
                                onShowToast('info', 'File Download Dispatched', `Downloading ${evi.documentNo}.pdf`);
                              }
                            }}
                            className="p-1 text-ink-secondary hover:text-indigo-600 rounded transition-colors"
                            title="Open evidence PDF in Blob URL"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View (Rule: responsive design table -> cards on mobile) */}
            <div className="sm:hidden divide-y divide-surface-border">
              {filteredEvidence.map((evi) => (
                <div key={evi.id} className="p-4 space-y-2 text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                      <p className="font-bold text-ink-primary">{evi.title}</p>
                    </div>
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

                  <p className="text-[11px] text-ink-secondary">
                    Doc: <strong>{evi.documentNo}</strong> • Param {evi.parameterId} • {evi.category}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-surface-border text-[11px] text-ink-secondary">
                    <span>Uploaded: {evi.uploadDate}</span>
                    {evi.verificationStatus !== 'Verified' ? (
                      <button
                        type="button"
                        onClick={() => handleVerifyEvidence(evi.id)}
                        className="px-2 py-0.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded"
                      >
                        Verify Doc
                      </button>
                    ) : (
                      <span className="text-emerald-700 font-semibold">Verified by QA</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: SELF-ASSESSMENT & AUDITS */}
      {/* ========================================================================= */}
      {activeTab === 'audits' && (
        <div className="space-y-6">
          {/* Audit Cycles Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {audits.map((aud) => (
              <div key={aud.id} className="bg-white border border-surface-border rounded-xl p-5 shadow-card space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                    {aud.auditCode}
                  </span>
                  <StatusBadge variant={aud.status === 'Completed' ? 'success' : 'info'} size="sm">
                    {aud.status}
                  </StatusBadge>
                </div>

                <h3 className="text-sm font-bold text-ink-primary">
                  {aud.title}
                </h3>

                <p className="text-xs text-ink-secondary leading-relaxed">
                  {aud.summaryFindings}
                </p>

                <div className="p-3 bg-slate-50 border border-surface-border rounded-lg text-xs space-y-1">
                  <div className="flex justify-between">
                    <span>Lead Auditor:</span>
                    <strong className="text-ink-primary">{aud.leadAuditor}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Parameters Audited:</span>
                    <strong>{aud.parametersAuditedCount} / 36 Parameters</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Audit Score Achieved:</span>
                    <strong className="text-emerald-700">{aud.overallRatingPct}%</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Self-Assessment Matrix */}
          <div className="bg-white border border-surface-border rounded-xl p-5 shadow-card space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-ink-primary">
                  Interactive 36-Parameter Self-Assessment Matrix
                </h3>
                <p className="text-xs text-ink-secondary">
                  Rate each parameter on the 1 to 5 scale (1: Initial, 2: Ad-hoc, 3: Defined, 4: Measured, 5: Benchmark)
                </p>
              </div>
              <span className="text-xs text-indigo-600 font-semibold bg-indigo-50 px-2.5 py-1 rounded-md">
                Fourth Edition Standards
              </span>
            </div>

            <div className="space-y-3">
              {parameters.slice(0, 10).map((param) => (
                <div 
                  key={param.id}
                  className="p-3.5 bg-slate-50 border border-surface-border rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-indigo-200 transition-colors"
                >
                  <div className="space-y-0.5 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-indigo-800">
                        {param.parameterNumber}
                      </span>
                      <span className="text-xs font-semibold text-ink-primary">
                        {param.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-ink-secondary">
                      Std {param.standardNumber} • Owner: {param.leadOwner.split('(')[0]}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {[1, 2, 3, 4, 5].map((score) => (
                      <button
                        key={score}
                        type="button"
                        onClick={() => handleUpdateParameterScore(param.id, score)}
                        className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                          param.selfAssessmentScore === score
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'bg-white border border-slate-300 text-ink-secondary hover:bg-indigo-50 hover:text-indigo-600'
                        }`}
                      >
                        {score}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setActiveTab('framework')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
              >
                View and rate all remaining 26 parameters in Standards Explorer →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 7: CONTINUOUS IMPROVEMENT (CAPA) */}
      {/* ========================================================================= */}
      {activeTab === 'improvement' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-ink-primary">
                Corrective & Preventive Action (CAPA) Tracker
              </h3>
              <p className="text-xs text-ink-secondary">
                Clause 14.1 Continuous Improvement – Root cause analysis & Action Taken Reports (ATRs)
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setModalPreselectParamId(undefined);
                setIsCAPAModalOpen(true);
              }}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-subtle"
            >
              <Plus className="w-4 h-4" />
              Log CAPA Action
            </button>
          </div>

          <div className="space-y-3">
            {capaActions.map((capa) => (
              <div 
                key={capa.id}
                className="bg-white border border-surface-border rounded-xl p-5 shadow-card space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                      {capa.parameterNumber}
                    </span>
                    <h4 className="text-sm font-bold text-ink-primary">
                      {capa.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      capa.priority === 'High' ? 'bg-rose-100 text-rose-800' :
                      capa.priority === 'Medium' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {capa.priority} Priority
                    </span>

                    <StatusBadge variant={capa.status === 'Closed' ? 'success' : 'brand'} size="sm">
                      {capa.status}
                    </StatusBadge>
                  </div>
                </div>

                <p className="text-xs text-ink-primary leading-relaxed">
                  <strong>Non-Conformity Observed:</strong> {capa.issueDescription}
                </p>

                {/* 5-Whys Root Cause Box */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                  <span className="font-bold text-ink-primary">
                    Root Cause Analysis ({capa.rootCauseAnalysis.method}):
                  </span>
                  <p className="text-ink-secondary mt-0.5">
                    {capa.rootCauseAnalysis.summary}
                  </p>
                </div>

                {/* Action Taken Report */}
                {capa.actionTakenReport && (
                  <p className="text-xs text-emerald-800 bg-emerald-50/70 p-3 rounded-lg border border-emerald-200/60">
                    <strong>Action Taken Report (ATR):</strong> {capa.actionTakenReport}
                  </p>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-3 border-t border-surface-border text-xs text-ink-secondary gap-2">
                  <div className="flex items-center gap-3">
                    <span>Assigned: <strong>{capa.assignedTo}</strong></span>
                    <span>•</span>
                    <span>Due Date: <strong>{capa.targetDate}</strong></span>
                  </div>

                  {capa.status !== 'Closed' && (
                    <button
                      type="button"
                      onClick={() => handleCompleteCAPA(capa.id)}
                      className="px-3 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
                    >
                      Mark 100% Closed & Signoff
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 8: STAKEHOLDER FEEDBACK & GRIEVANCE REDRESSAL */}
      {/* ========================================================================= */}
      {activeTab === 'stakeholders' && (
        <div className="space-y-6">
          {/* Stakeholder Surveys */}
          <div>
            <div className="flex items-center justify-between mb-3 px-0.5">
              <h3 className="text-sm font-bold text-ink-primary uppercase tracking-wider">
                Multi-Stakeholder Feedback & Satisfaction (Standard 14)
              </h3>
              <span className="text-xs text-ink-secondary">
                Net Satisfaction Index (NSI) Tracking
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {feedbacks.map((fb) => (
                <div key={fb.id} className="bg-white border border-surface-border rounded-xl p-5 shadow-card space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-ink-primary">
                      {fb.stakeholderType} Survey
                    </span>
                    <span className="text-sm font-bold text-emerald-600">
                      {fb.overallSatisfactionPct}%
                    </span>
                  </div>

                  <p className="text-[11px] text-ink-secondary">
                    Cycle: {fb.surveyCycle} • {fb.respondentsCount} Respondents • NSI Score: <strong>+{fb.benchmarkNSI}</strong>
                  </p>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="font-semibold text-ink-primary block mb-0.5">Key Strengths:</span>
                      <ul className="list-disc pl-4 text-ink-secondary space-y-0.5 text-[11px]">
                        {fb.keyStrengths.map((str, i) => (
                          <li key={i}>{str}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="font-semibold text-amber-900 block mb-0.5">Gaps Addressed:</span>
                      <ul className="list-disc pl-4 text-ink-secondary space-y-0.5 text-[11px]">
                        {fb.identifiedGaps.map((gap, i) => (
                          <li key={i}>{gap}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-surface-border text-[11px] text-indigo-900 bg-indigo-50/50 p-2 rounded">
                    <strong>Action Plan:</strong> {fb.actionPlan}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Grievance Redressal SLA Tracker */}
          <div className="bg-white border border-surface-border rounded-xl p-5 shadow-card space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-ink-primary">
                  Grievance Redressal Mechanism & SLA Tracker (Clause 14.2)
                </h3>
                <p className="text-xs text-ink-secondary">
                  Transparent multi-tier resolution system with 5-day SLA target
                </p>
              </div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                Average Resolution: 4.2 Days (Target &lt; 5 Days)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs">
              <div className="p-3 bg-slate-50 border border-surface-border rounded-lg">
                <span className="text-ink-secondary block">Total Grievances (AY 2026-27)</span>
                <span className="text-lg font-bold text-ink-primary">28 Cases</span>
                <span className="text-[10px] text-ink-light block">Parent, Staff, Community</span>
              </div>

              <div className="p-3 bg-slate-50 border border-surface-border rounded-lg">
                <span className="text-ink-secondary block">Resolved within SLA</span>
                <span className="text-lg font-bold text-emerald-600">27 Cases (96.4%)</span>
                <span className="text-[10px] text-emerald-700 block">Closed with Satisfaction</span>
              </div>

              <div className="p-3 bg-slate-50 border border-surface-border rounded-lg">
                <span className="text-ink-secondary block">Active Under Hearing</span>
                <span className="text-lg font-bold text-indigo-600">1 Case</span>
                <span className="text-[10px] text-indigo-700 block">SLA Day 3 of 5</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUPPORT MODALS & SLIDE-OVER DRAWERS */}
      {/* ========================================================================= */}

      {/* Parameter Detail Drawer */}
      <NABETParameterDrawer
        parameter={selectedParam}
        isOpen={isParamDrawerOpen}
        onClose={() => setIsParamDrawerOpen(false)}
        evidenceList={evidenceList}
        onUploadEvidence={(paramId) => {
          setModalPreselectParamId(paramId);
          setIsUploadModalOpen(true);
        }}
        onLogCAPA={(paramId) => {
          setModalPreselectParamId(paramId);
          setIsCAPAModalOpen(true);
        }}
        onUpdateScore={handleUpdateParameterScore}
        onNavigateERPModule={(module) => {
          setIsParamDrawerOpen(false);
          if (onNavigateView) {
            const map: Record<string, string> = {
              'Staff & HR': 'staff',
              'Academics': 'academics',
              'Examinations': 'examinations',
              'CBSE Compliance': 'compliance',
              'Public Disclosure': 'disclosure',
              'Infrastructure & Safety': 'infrastructure',
              'Admissions & Students': 'admissions',
              'Fees & Finance': 'fees'
            };
            if (map[module]) {
              onNavigateView(map[module]);
              onShowToast('info', 'ERP Cross-Link', `Opened ${module} module.`);
            }
          }
        }}
      />

      {/* Upload Evidence Modal */}
      <NABETUploadEvidenceModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        parameters={parameters}
        preSelectedParamId={modalPreselectParamId}
        onSubmitEvidence={handleAddEvidence}
      />

      {/* Log CAPA Modal */}
      <NABETLogCAPAModal
        isOpen={isCAPAModalOpen}
        onClose={() => setIsCAPAModalOpen(false)}
        parameters={parameters}
        preSelectedParamId={modalPreselectParamId}
        onSubmitCAPA={handleAddCAPA}
      />

      {/* Executive Dossier Print / PDF Modal */}
      <NABETExportReportModal
        isOpen={isDossierModalOpen}
        onClose={() => setIsDossierModalOpen(false)}
        domains={domains}
        parameters={parameters}
        evidenceList={evidenceList}
        onPrint={() => {
          onShowToast('info', 'Print Command Dispatched', 'NABET Accreditation Dossier opened in browser print view.');
        }}
        onDownloadPdf={() => {
          onShowToast('success', 'PDF Opened in Blob URL', 'NABET_Accreditation_Dossier_DRT_2026_27.pdf opened in new tab.');
        }}
      />
    </div>
  );
};
export default NABETView;
