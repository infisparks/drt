import React, { useState } from 'react';
import { 
  Award, 
  BookOpen, 
  Building2, 
  Users, 
  HeartHandshake, 
  ShieldCheck, 
  Crown, 
  Smile, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  ArrowRight, 
  Check, 
  FileText,
  Eye,
  ChevronRight
} from 'lucide-react';
import { SQAAFDomain, SchoolImprovementAction } from '../types';
import { MOCK_SQAAF_DOMAINS, MOCK_IMPROVEMENT_ACTIONS } from '../data/mockData';
import { PageHeader } from '../components/common/PageHeader';
import { StatCard } from '../components/common/StatCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { DetailDrawer } from '../components/common/DetailDrawer';

interface SQAAFViewProps {
  onShowToast: (type: 'success' | 'warning' | 'error' | 'info', title: string, message?: string) => void;
}

export const SQAAFView: React.FC<SQAAFViewProps> = ({ onShowToast }) => {
  const [domains, setDomains] = useState<SQAAFDomain[]>(() =>
    MOCK_SQAAF_DOMAINS.map(d => ({
      ...d,
      domainNumber: d.id,
      title: d.name.replace(/^Domain \d+: /, ''),
      scoreEarned: d.achievedCount,
      maxScore: d.standardsCount,
      maturityLevel: d.level,
      evidenceCount: d.evidenceDocsCount,
      pendingActionsCount: 2,
      subStandards: [
        "Curricular mapping to NCERT & CBSE learning outcomes",
        "Competency-based assessment integration & rubrics",
        "Art, Health & Physical Education pedagogical integration",
        "Continuous teacher mentorship and lesson monitoring"
      ]
    }))
  );
  const [actions, setActions] = useState<SchoolImprovementAction[]>(() =>
    MOCK_IMPROVEMENT_ACTIONS.map(a => ({
      ...a,
      domain: `Domain ${a.domainId}`,
      responsiblePerson: a.leadOwner,
      deadline: a.targetDate,
      progress: a.progressPct
    }))
  );
  const [selectedDomain, setSelectedDomain] = useState<SQAAFDomain | null>(null);
  const [isDomainDrawerOpen, setIsDomainDrawerOpen] = useState(false);

  // Icons for the 7 domains
  const domainIcons = [
    BookOpen,       // 1. Curriculum
    Building2,      // 2. Infrastructure
    Users,          // 3. Human Resources
    HeartHandshake, // 4. Inclusive Practices
    ShieldCheck,    // 5. Management & Governance
    Crown,          // 6. Leadership
    Smile           // 7. Beneficiary Satisfaction
  ];

  const handleOpenDomain = (domain: SQAAFDomain) => {
    setSelectedDomain(domain);
    setIsDomainDrawerOpen(true);
  };

  const handleCompleteAction = (actionId: string, title: string) => {
    setActions(prev => prev.map(a => a.id === actionId ? { ...a, progress: 100, status: 'Completed' } : a));
    onShowToast('success', 'SIP Action Completed', `"${title}" has been updated to 100% and logged to SQAAF evidence.`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="SQAAF & Institutional Quality Framework"
        description="CBSE School Quality Assessment and Assurance Framework (SQAAF) self-assessment and continuous School Improvement Plan (SIP)."
        breadcrumbs={[
          { label: 'Governance' },
          { label: 'SQAAF & Improvement', active: true }
        ]}
        primaryAction={{
          label: "Log SIP Improvement Action",
          icon: <Award className="w-4 h-4" />,
          onClick: () => onShowToast('info', 'SIP Action Plan', 'Simulated School Improvement Plan entry form.')
        }}
        secondaryActions={[
          {
            label: "Export SQAAF Report",
            icon: <Download className="w-3.5 h-3.5" />,
            onClick: () => onShowToast('info', 'Export Started', 'SQAAF Comprehensive Self-Assessment Dossier exported.')
          }
        ]}
      />

      {/* Advisory Disclaimer */}
      <div className="p-3.5 bg-surface-muted/60 border border-surface-border rounded-xl text-xs text-ink-secondary flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-brand-navy flex-shrink-0 mt-0.5" />
        <span>
          <strong>Framework Notice:</strong> SQAAF scoring and domain maturity indicators displayed here represent internal self-evaluation benchmarks conducted by the DRT Quality Assurance Committee. These scores are preparatory and do not constitute official CBSE peer-review certification or accreditation.
        </span>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Internal Self-Evaluation"
          value="84.6%"
          icon={Award}
          trend={{ value: "Level 4 (Dynamic/Stable)", isPositive: true }}
          subtext="Aggregated across 7 domains"
        />
        <StatCard
          label="Evidence Attachments"
          value="68 Files"
          icon={FileText}
          subtext="Tagged to sub-standards"
        />
        <StatCard
          label="Active SIP Actions"
          value={actions.filter(a => a.status === 'In Progress').length.toString()}
          icon={CheckCircle2}
          subtext="Under regular tracking"
        />
        <StatCard
          label="Maturity Level"
          value="Stable (L3)"
          icon={Crown}
          subtext="Targeting Level 4 (Dynamic)"
        />
      </div>

      {/* Seven Domain Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-3 px-0.5">
          <h2 className="text-sm font-bold text-ink-primary uppercase tracking-wider">
            Seven CBSE SQAAF Assessment Domains
          </h2>
          <span className="text-xs text-ink-secondary">
            Click any domain card to view sub-standards & evidence
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {domains.map((domain, idx) => {
            const Icon = domainIcons[idx] || Award;
            const earned = domain.scoreEarned ?? domain.achievedCount ?? 0;
            const max = domain.maxScore ?? domain.standardsCount ?? 1;
            const pct = domain.scorePercentage ?? (max > 0 ? Math.round((earned / max) * 100) : 0);

            return (
              <div
                key={domain.id}
                onClick={() => handleOpenDomain(domain)}
                className="bg-white border border-surface-border rounded-xl p-5 shadow-subtle hover:border-brand-blue/50 hover:shadow-card hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-brand-blue/10 text-brand-navy">
                      Domain {domain.domainNumber}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-surface-muted flex items-center justify-center text-brand-navy group-hover:bg-brand-blue/10 group-hover:text-brand-blue transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-bold text-sm text-ink-primary group-hover:text-brand-navy transition-colors line-clamp-1">
                    {domain.title}
                  </h3>
                  <p className="text-xs text-ink-secondary mt-1 line-clamp-2 leading-snug">
                    {domain.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-surface-border/60 space-y-2">
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="text-ink-secondary font-medium">Self-Audit Score:</span>
                    <span className="font-bold text-ink-primary tabular-nums">
                      {domain.scoreEarned} / {domain.maxScore} ({pct}%)
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-1.5 bg-surface-muted rounded-full overflow-hidden">
                    <div
                      style={{ width: `${pct}%` }}
                      className={`h-full rounded-full ${
                        pct >= 85 ? 'bg-emerald-600' : pct >= 75 ? 'bg-brand-blue' : 'bg-amber-500'
                      }`}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-ink-secondary pt-1">
                    <span>{domain.evidenceCount} Evidences</span>
                    <span className="text-brand-blue font-semibold group-hover:translate-x-0.5 transition-transform flex items-center">
                      Inspect <ChevronRight className="w-3 h-3 ml-0.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* School Improvement Plan (SIP) Action Tracking */}
      <div className="bg-white border border-surface-border rounded-xl shadow-subtle overflow-hidden">
        <div className="p-4 border-b border-surface-border flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-ink-primary">
              School Improvement Plan (SIP) Priority Actions
            </h3>
            <p className="text-xs text-ink-secondary">
              Continuous quality interventions mapped directly to SQAAF self-audit gaps
            </p>
          </div>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            {actions.filter(a => a.status === 'Completed').length} of {actions.length} Completed
          </span>
        </div>

        <div className="divide-y divide-surface-border/60">
          {actions.map((act) => (
            <div key={act.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-surface-cardHover transition-colors">
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-ink-primary">
                    {act.title}
                  </span>
                  <StatusBadge
                    variant={
                      act.priority === 'High' ? 'warning' : act.priority === 'Urgent' ? 'danger' : 'info'
                    }
                    size="sm"
                  >
                    {act.priority}
                  </StatusBadge>
                  <span className="text-[11px] text-ink-secondary bg-surface-muted px-2 py-0.2 rounded border border-surface-border">
                    {act.domain}
                  </span>
                </div>

                <p className="text-xs text-ink-secondary">
                  Responsible: <strong className="text-ink-primary font-medium">{act.responsiblePerson}</strong> • Target Deadline: <strong className="text-ink-primary font-mono">{act.deadline}</strong>
                </p>
              </div>

              <div className="flex items-center gap-4 flex-shrink-0">
                {/* Progress bar */}
                <div className="w-32 hidden sm:block">
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-ink-secondary">Progress</span>
                    <strong className="text-ink-primary tabular-nums">{act.progress}%</strong>
                  </div>
                  <div className="w-full h-1.5 bg-surface-muted rounded-full overflow-hidden">
                    <div
                      style={{ width: `${act.progress}%` }}
                      className={`h-full ${act.progress === 100 ? 'bg-emerald-600' : 'bg-brand-blue'}`}
                    />
                  </div>
                </div>

                <StatusBadge
                  variant={act.status === 'Completed' ? 'success' : 'warning'}
                  size="sm"
                >
                  {act.status}
                </StatusBadge>

                {act.status !== 'Completed' && (
                  <button
                    onClick={() => handleCompleteAction(act.id, act.title)}
                    className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-lg bg-brand-navy hover:bg-brand-navyDark text-white transition-colors"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Mark Done</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SQAAF Domain Detail Drawer */}
      <DetailDrawer
        isOpen={isDomainDrawerOpen}
        onClose={() => setIsDomainDrawerOpen(false)}
        title={selectedDomain ? `Domain ${selectedDomain.domainNumber}: ${selectedDomain.title}` : 'Domain Details'}
        subtitle={selectedDomain ? selectedDomain.maturityLevel + ' Maturity Level' : ''}
        width="lg"
      >
        {selectedDomain && (
          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-4 bg-surface-bg border border-surface-border rounded-xl">
              <h4 className="font-bold text-base text-brand-navy">
                Self-Assessment Evaluation
              </h4>
              <p className="text-xs text-ink-secondary mt-1">
                {selectedDomain.description}
              </p>
              <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-surface-border">
                <span>Earned Score: <strong className="text-ink-primary tabular-nums">{selectedDomain.scoreEarned} / {selectedDomain.maxScore}</strong></span>
                <StatusBadge variant="brand">{selectedDomain.maturityLevel}</StatusBadge>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="font-bold text-xs uppercase tracking-wider text-ink-secondary">
                Sub-standards & Verification Benchmarks
              </h5>
              <div className="space-y-2">
                {selectedDomain.subStandards.map((std, i) => (
                  <div key={i} className="p-3 bg-white border border-surface-border rounded-lg flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-ink-primary">{std}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-surface-muted rounded-lg text-[11px] text-ink-secondary">
              Artifacts on file: {selectedDomain.evidenceCount} verified documents. Open SIP improvement actions: {selectedDomain.pendingActionsCount}.
            </div>
          </div>
        )}
      </DetailDrawer>
    </div>
  );
};
