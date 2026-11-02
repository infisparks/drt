import React, { useState, useMemo } from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  UserX, 
  FileWarning, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  Clock, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  FileText, 
  Download, 
  Printer, 
  UserCheck, 
  Video, 
  Sparkles,
  ChevronRight,
  Gavel,
  ShieldCheck,
  AlertOctagon,
  Users,
  Building,
  MoreVertical,
  X
} from 'lucide-react';
import { IncidentRecord, InvolvedPerson, DisciplinaryActionType, IncidentSeverity } from '../types';
import { MOCK_INCIDENTS } from '../data/mockData';
import { PageHeader } from '../components/common/PageHeader';
import { StatCard } from '../components/common/StatCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { DetailDrawer } from '../components/common/DetailDrawer';
import { FormDialog } from '../components/common/FormDialog';
import { SearchFilterBar } from '../components/common/SearchFilterBar';
import { EmptyState } from '../components/common/EmptyState';

interface IncidentsViewProps {
  onShowToast: (type: 'success' | 'warning' | 'error' | 'info', title: string, message?: string) => void;
}

export const IncidentsView: React.FC<IncidentsViewProps> = ({ onShowToast }) => {
  const [incidents, setIncidents] = useState<IncidentRecord[]>(MOCK_INCIDENTS);
  const [activeTab, setActiveTab] = useState<'all' | 'rusticated' | 'notices' | 'last-chance' | 'master-persons'>('all');
  
  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');

  // Detail Drawer state
  const [selectedIncident, setSelectedIncident] = useState<IncidentRecord | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Quick Action Update Student Modal
  const [updatingPerson, setUpdatingPerson] = useState<{ incidentId: string; person: InvolvedPerson } | null>(null);
  const [updatedAction, setUpdatedAction] = useState<DisciplinaryActionType>('Last Chance Warning');
  const [updatedDetails, setUpdatedDetails] = useState('');

  // Log New Incident Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newIncident, setNewIncident] = useState({
    title: '',
    category: 'Physical Fighting',
    severity: 'High' as IncidentSeverity,
    date: new Date().toISOString().split('T')[0],
    time: '11:30 AM',
    location: 'Senior Wing Corridor',
    reportedBy: 'Floor Proctor / Faculty',
    investigator: 'Disciplinary Committee & Principal',
    description: '',
    evidenceDetails: 'CCTV footage secured & witness statements recorded',
    committeeDecision: 'Immediate show-cause notices served and disciplinary hearing scheduled.',
    // Initial student being added
    studentName: '',
    studentAdmNo: '',
    studentGrade: 'Class XII-Sci',
    studentRole: 'Initiator' as const,
    studentAction: 'Rusticated' as DisciplinaryActionType,
    studentActionDetails: 'Rusticated for 14 academic days pending enquiry.',
    penaltyDuration: '14 Days Campus Suspension',
    parentContacted: true,
    parentMeetingDate: new Date().toISOString().split('T')[0]
  });

  // Calculate high-level metrics
  const metrics = useMemo(() => {
    let totalRusticated = 0;
    let totalNotices = 0;
    let totalLastChance = 0;
    let activeHearings = 0;

    incidents.forEach((inc) => {
      if (inc.status === 'Under Investigation' || inc.status === 'Committee Hearing Pending') {
        activeHearings++;
      }
      inc.involvedPersons.forEach((p) => {
        if (p.action === 'Rusticated') totalRusticated++;
        if (p.action === 'Notice Issued') totalNotices++;
        if (p.action === 'Last Chance Warning') totalLastChance++;
      });
    });

    return {
      totalIncidents: incidents.length,
      totalRusticated,
      totalNotices,
      totalLastChance,
      activeHearings
    };
  }, [incidents]);

  // Flattened persons list for rusticated / notices / last chance tabs
  const allInvolvedPersons = useMemo(() => {
    const list: Array<{ person: InvolvedPerson; incident: IncidentRecord }> = [];
    incidents.forEach((inc) => {
      inc.involvedPersons.forEach((person) => {
        list.push({ person, incident: inc });
      });
    });
    return list;
  }, [incidents]);

  // Filtered incidents
  const filteredIncidents = useMemo(() => {
    return incidents.filter((inc) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        inc.title.toLowerCase().includes(q) ||
        inc.incidentNo.toLowerCase().includes(q) ||
        inc.location.toLowerCase().includes(q) ||
        inc.involvedPersons.some(p => p.name.toLowerCase().includes(q) || p.admissionNo.toLowerCase().includes(q));

      const matchesCategory = categoryFilter === 'all' || inc.category === categoryFilter;
      const matchesSeverity = severityFilter === 'all' || inc.severity === severityFilter;

      return matchesSearch && matchesCategory && matchesSeverity;
    });
  }, [incidents, searchQuery, categoryFilter, severityFilter]);

  // Filtered persons for dedicated tabs
  const filteredRusticated = useMemo(() => {
    return allInvolvedPersons.filter(item => item.person.action === 'Rusticated' && 
      (searchQuery === '' || item.person.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.incident.incidentNo.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [allInvolvedPersons, searchQuery]);

  const filteredNotices = useMemo(() => {
    return allInvolvedPersons.filter(item => item.person.action === 'Notice Issued' && 
      (searchQuery === '' || item.person.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.incident.incidentNo.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [allInvolvedPersons, searchQuery]);

  const filteredLastChance = useMemo(() => {
    return allInvolvedPersons.filter(item => item.person.action === 'Last Chance Warning' && 
      (searchQuery === '' || item.person.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.incident.incidentNo.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [allInvolvedPersons, searchQuery]);

  // Open incident drawer
  const handleOpenIncident = (inc: IncidentRecord) => {
    setSelectedIncident(inc);
    setIsDrawerOpen(true);
  };

  // Submit new incident
  const handleCreateIncidentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIncident.title || !newIncident.studentName || !newIncident.description) {
      onShowToast('warning', 'Missing Information', 'Please provide an incident title, description, and at least one involved student name.');
      return;
    }

    const createdIncident: IncidentRecord = {
      id: `inc_${Date.now()}`,
      incidentNo: `DRT-INC-2026-${Math.floor(100 + Math.random() * 900)}`,
      title: newIncident.title,
      category: newIncident.category,
      severity: newIncident.severity,
      date: newIncident.date,
      time: newIncident.time,
      location: newIncident.location,
      reportedBy: newIncident.reportedBy,
      investigator: newIncident.investigator,
      status: 'Action Enforced',
      description: newIncident.description,
      evidenceDetails: newIncident.evidenceDetails,
      committeeDecision: newIncident.committeeDecision,
      createdAt: new Date().toISOString(),
      involvedPersons: [
        {
          id: `inv_${Date.now()}`,
          name: newIncident.studentName,
          admissionNo: newIncident.studentAdmNo || `DRT-2024-${Math.floor(1000 + Math.random() * 9000)}`,
          grade: newIncident.studentGrade,
          department: newIncident.studentGrade.includes('XII') || newIncident.studentGrade.includes('XI') ? 'Senior Secondary' : 'Secondary School',
          gender: 'Male',
          role: newIncident.studentRole,
          action: newIncident.studentAction,
          actionDate: newIncident.date,
          actionDetails: newIncident.studentActionDetails,
          penaltyDuration: newIncident.penaltyDuration,
          noticeRefNumber: `DRT/DISC/2026/${newIncident.studentAction === 'Rusticated' ? 'R' : newIncident.studentAction === 'Notice Issued' ? 'SCN' : 'LCW'}-${Math.floor(100 + Math.random() * 900)}`,
          parentContacted: newIncident.parentContacted,
          parentMeetingDate: newIncident.parentMeetingDate,
          parentSignedUndertaking: true
        }
      ]
    };

    setIncidents(prev => [createdIncident, ...prev]);
    setIsAddModalOpen(false);
    onShowToast('success', 'Incident Logged Successfully', `Disciplinary record ${createdIncident.incidentNo} created and registered.`);
    
    // Reset form
    setNewIncident(prev => ({
      ...prev,
      title: '',
      description: '',
      studentName: '',
      studentAdmNo: ''
    }));
  };

  // Update Person Sanction
  const handleUpdatePersonSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!updatingPerson) return;

    setIncidents(prev => prev.map(inc => {
      if (inc.id === updatingPerson.incidentId) {
        return {
          ...inc,
          involvedPersons: inc.involvedPersons.map(p => {
            if (p.id === updatingPerson.person.id) {
              return {
                ...p,
                action: updatedAction,
                actionDetails: updatedDetails || p.actionDetails,
                actionDate: new Date().toISOString().split('T')[0]
              };
            }
            return p;
          })
        };
      }
      return inc;
    }));

    if (selectedIncident && selectedIncident.id === updatingPerson.incidentId) {
      setSelectedIncident(prev => {
        if (!prev) return null;
        return {
          ...prev,
          involvedPersons: prev.involvedPersons.map(p => {
            if (p.id === updatingPerson.person.id) {
              return {
                ...p,
                action: updatedAction,
                actionDetails: updatedDetails || p.actionDetails,
                actionDate: new Date().toISOString().split('T')[0]
              };
            }
            return p;
          })
        };
      });
    }

    onShowToast('success', 'Disciplinary Status Updated', `${updatingPerson.person.name} status updated to ${updatedAction}.`);
    setUpdatingPerson(null);
  };

  const getActionBadgeVariant = (action: DisciplinaryActionType): 'danger' | 'warning' | 'brand' | 'success' | 'neutral' => {
    switch (action) {
      case 'Rusticated': return 'danger';
      case 'Notice Issued': return 'warning';
      case 'Last Chance Warning': return 'brand';
      case 'Exonerated': return 'success';
      default: return 'neutral';
    }
  };

  const getSeverityBadgeVariant = (sev: IncidentSeverity): 'danger' | 'warning' | 'info' | 'neutral' => {
    switch (sev) {
      case 'Critical': return 'danger';
      case 'High': return 'warning';
      case 'Medium': return 'info';
      default: return 'neutral';
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header with primary and export actions */}
      <PageHeader
        title="Campus Incidents & Disciplinary Governance"
        description="Comprehensive management of campus disciplinary incidents, fighting altercations, rustication records, show-cause notices, and final warnings."
        breadcrumbs={[
          { label: 'School Operations' },
          { label: 'Campus Incidents & Discipline', active: true }
        ]}
        primaryAction={{
          label: "Log New Incident",
          icon: <ShieldAlert className="w-4 h-4" />,
          onClick: () => setIsAddModalOpen(true)
        }}
        secondaryActions={[
          {
            label: "Export Disciplinary Dossier",
            icon: <Download className="w-3.5 h-3.5" />,
            onClick: () => onShowToast('success', 'Dossier Exported', 'Official Disciplinary & Proctorial Ledger downloaded as PDF.')
          }
        ]}
      />

      {/* 2. Key Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          label="Total Incidents"
          value={metrics.totalIncidents.toString()}
          icon={AlertTriangle}
          subtext="Academic Session 2026-27"
        />
        <div 
          onClick={() => setActiveTab('rusticated')}
          className="cursor-pointer transition-transform hover:scale-[1.01]"
        >
          <StatCard
            label="Rusticated Students"
            value={metrics.totalRusticated.toString()}
            icon={UserX}
            trend={{ value: "Strict Exclusion Enforced", isPositive: false }}
            subtext="Barred from campus & exams"
          />
        </div>
        <div 
          onClick={() => setActiveTab('notices')}
          className="cursor-pointer transition-transform hover:scale-[1.01]"
        >
          <StatCard
            label="Show-Cause Notices"
            value={metrics.totalNotices.toString()}
            icon={FileWarning}
            trend={{ value: "48h Deadline Active", isNeutral: true }}
            subtext="Official notices served"
          />
        </div>
        <div 
          onClick={() => setActiveTab('last-chance')}
          className="cursor-pointer transition-transform hover:scale-[1.01]"
        >
          <StatCard
            label="Last Chance Given"
            value={metrics.totalLastChance.toString()}
            icon={AlertOctagon}
            trend={{ value: "On Strict Probation", isPositive: true }}
            subtext="Parental bonds executed"
          />
        </div>
        <StatCard
          label="Active Inquiries"
          value={metrics.activeHearings.toString()}
          icon={Gavel}
          subtext="Proctorial board hearings"
        />
      </div>

      {/* 3. Navigation Tabs */}
      <div className="flex border-b border-surface-border overflow-x-auto bg-white rounded-t-xl px-2">
        <button
          onClick={() => setActiveTab('all')}
          className={`py-3 px-4 sm:px-5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeTab === 'all'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-ink-secondary hover:text-ink-primary'
          }`}
        >
          <span>All Incidents Log</span>
          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-700">
            {incidents.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('rusticated')}
          className={`py-3 px-4 sm:px-5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeTab === 'rusticated'
              ? 'border-rose-600 text-rose-600'
              : 'border-transparent text-ink-secondary hover:text-ink-primary'
          }`}
        >
          <span>Rusticated Students</span>
          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-rose-100 text-rose-800">
            {metrics.totalRusticated} Rusticated
          </span>
        </button>

        <button
          onClick={() => setActiveTab('notices')}
          className={`py-3 px-4 sm:px-5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeTab === 'notices'
              ? 'border-amber-600 text-amber-600'
              : 'border-transparent text-ink-secondary hover:text-ink-primary'
          }`}
        >
          <span>Notices Issued</span>
          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800">
            {metrics.totalNotices} Notices
          </span>
        </button>

        <button
          onClick={() => setActiveTab('last-chance')}
          className={`py-3 px-4 sm:px-5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeTab === 'last-chance'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-ink-secondary hover:text-ink-primary'
          }`}
        >
          <span>Last Chance Given</span>
          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-indigo-100 text-indigo-800">
            {metrics.totalLastChance} Warnings
          </span>
        </button>

        <button
          onClick={() => setActiveTab('master-persons')}
          className={`py-3 px-4 sm:px-5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeTab === 'master-persons'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-ink-secondary hover:text-ink-primary'
          }`}
        >
          <span>All Involved Persons Master Roster</span>
          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-700">
            {allInvolvedPersons.length}
          </span>
        </button>
      </div>

      {/* 4. TAB 1: ALL INCIDENTS LOG */}
      {activeTab === 'all' && (
        <div className="space-y-4">
          <SearchFilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search incident ID, title, student name, location..."
            resultCount={filteredIncidents.length}
            filters={[
              {
                key: 'category',
                label: 'Category',
                value: categoryFilter,
                onChange: setCategoryFilter,
                options: [
                  { label: 'All Categories', value: 'all' },
                  { label: 'Physical Fighting', value: 'Physical Fighting' },
                  { label: 'Ragging & Bullying', value: 'Ragging & Bullying' },
                  { label: 'Classroom Indiscipline', value: 'Classroom Indiscipline' },
                  { label: 'Property Damage', value: 'Property Damage' }
                ]
              },
              {
                key: 'severity',
                label: 'Severity',
                value: severityFilter,
                onChange: setSeverityFilter,
                options: [
                  { label: 'All Severities', value: 'all' },
                  { label: 'Critical', value: 'Critical' },
                  { label: 'High', value: 'High' },
                  { label: 'Medium', value: 'Medium' }
                ]
              }
            ]}
            onResetFilters={() => {
              setSearchQuery('');
              setCategoryFilter('all');
              setSeverityFilter('all');
            }}
          />

          {filteredIncidents.length === 0 ? (
            <EmptyState
              title="No Incidents Found"
              description="No disciplinary incident matches your search or filter criteria."
              actionLabel="Reset Filters"
              onAction={() => {
                setSearchQuery('');
                setCategoryFilter('all');
                setSeverityFilter('all');
              }}
            />
          ) : (
            <div className="space-y-3">
              {filteredIncidents.map((incident) => {
                const rusticatedInThis = incident.involvedPersons.filter(p => p.action === 'Rusticated');
                const noticesInThis = incident.involvedPersons.filter(p => p.action === 'Notice Issued');
                const lastChanceInThis = incident.involvedPersons.filter(p => p.action === 'Last Chance Warning');

                return (
                  <div
                    key={incident.id}
                    onClick={() => handleOpenIncident(incident)}
                    className="bg-white border border-surface-border rounded-xl p-5 shadow-subtle hover:border-indigo-300 hover:shadow-card transition-all cursor-pointer group"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3 border-b border-surface-border/60">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center flex-shrink-0 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                          <Gavel className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                              {incident.incidentNo}
                            </span>
                            <StatusBadge variant={getSeverityBadgeVariant(incident.severity)} size="sm">
                              {incident.severity} Severity
                            </StatusBadge>
                            <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                              {incident.category}
                            </span>
                          </div>
                          <h3 className="text-base font-bold text-ink-primary mt-1 group-hover:text-indigo-600 transition-colors">
                            {incident.title}
                          </h3>
                        </div>
                      </div>

                      {/* Date & Location */}
                      <div className="flex items-center gap-4 text-xs text-ink-secondary">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span className="font-medium text-ink-primary">{incident.date}</span> at {incident.time}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{incident.location}</span>
                        </span>
                      </div>
                    </div>

                    {/* Narrative Description */}
                    <p className="text-xs sm:text-sm text-ink-secondary mt-3 line-clamp-2 leading-relaxed">
                      {incident.description}
                    </p>

                    {/* Persons Involved Summary Row */}
                    <div className="mt-4 pt-3 border-t border-surface-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-semibold text-ink-secondary">
                          Involved Persons ({incident.involvedPersons.length}):
                        </span>

                        {incident.involvedPersons.map((person) => (
                          <div
                            key={person.id}
                            className="inline-flex items-center gap-1.5 bg-surface-bg border border-surface-border rounded-full pl-1 pr-2.5 py-0.5 text-xs"
                          >
                            <img
                              src={person.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100'}
                              alt={person.name}
                              className="w-4 h-4 rounded-full object-cover"
                            />
                            <span className="font-semibold text-ink-primary">{person.name}</span>
                            <span className="text-[10px] text-slate-500">({person.grade})</span>
                            <span
                              className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase ${
                                person.action === 'Rusticated'
                                  ? 'bg-rose-100 text-rose-700'
                                  : person.action === 'Notice Issued'
                                  ? 'bg-amber-100 text-amber-800'
                                  : person.action === 'Last Chance Warning'
                                  ? 'bg-indigo-100 text-indigo-700'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {person.action}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Sanctions breakdown tags & View Full Details button */}
                      <div className="flex items-center gap-2">
                        {rusticatedInThis.length > 0 && (
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                            {rusticatedInThis.length} Rusticated
                          </span>
                        )}
                        {noticesInThis.length > 0 && (
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                            {noticesInThis.length} Notice
                          </span>
                        )}
                        {lastChanceInThis.length > 0 && (
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                            {lastChanceInThis.length} Last Chance
                          </span>
                        )}
                        <span className="inline-flex items-center text-xs font-semibold text-indigo-600 group-hover:text-indigo-800 ml-1">
                          View Full Case <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 5. TAB 2: RUSTICATED STUDENTS ("RESTIGATED") */}
      {activeTab === 'rusticated' && (
        <div className="space-y-4">
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex items-start gap-3">
            <UserX className="w-5 h-5 text-rose-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-rose-900">
                Official Rustication Registry & Campus Debarment List
              </h4>
              <p className="text-xs text-rose-700 mt-0.5">
                Students below have been formally rusticated by the DRT Disciplinary Committee for violent fighting, severe ragging, or lab destruction. They are completely debarred from campus premises, classes, and exams.
              </p>
            </div>
          </div>

          <div className="bg-white border border-surface-border rounded-xl shadow-subtle overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-surface-bg/80 border-b border-surface-border text-ink-secondary text-[11px] uppercase tracking-wider font-semibold">
                    <th className="py-3 px-4">Student Profile</th>
                    <th className="py-3 px-4">Class & Dept</th>
                    <th className="py-3 px-4">Incident & Reason</th>
                    <th className="py-3 px-4">Sanction Date</th>
                    <th className="py-3 px-4">Rustication Term</th>
                    <th className="py-3 px-4">Order Ref No</th>
                    <th className="py-3 px-4 text-center">Parent Bond</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border/60">
                  {filteredRusticated.map(({ person, incident }) => (
                    <tr
                      key={person.id}
                      className="hover:bg-rose-50/30 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={person.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'}
                            alt={person.name}
                            className="w-9 h-9 rounded-full object-cover border border-rose-200"
                          />
                          <div>
                            <p className="font-bold text-ink-primary hover:text-rose-600 cursor-pointer" onClick={() => handleOpenIncident(incident)}>
                              {person.name}
                            </p>
                            <p className="text-[11px] font-mono text-ink-secondary">
                              {person.admissionNo}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <p className="font-semibold text-ink-primary">{person.grade}</p>
                        <p className="text-[11px] text-ink-secondary">{person.department}</p>
                      </td>

                      <td className="py-3 px-4 max-w-xs">
                        <p className="font-medium text-ink-primary truncate">{incident.title}</p>
                        <span className="text-[10px] text-rose-600 font-semibold bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200">
                          {person.role}
                        </span>
                      </td>

                      <td className="py-3 px-4 font-mono text-xs text-ink-secondary tabular-nums">
                        {person.actionDate}
                      </td>

                      <td className="py-3 px-4 font-semibold text-rose-700">
                        {person.penaltyDuration || '30 Days Campus Suspension'}
                      </td>

                      <td className="py-3 px-4 font-mono text-xs font-bold text-slate-700">
                        {person.noticeRefNumber || 'DRT/DISC/2026/R-041'}
                      </td>

                      <td className="py-3 px-4 text-center">
                        {person.parentSignedUndertaking ? (
                          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3" /> Signed
                          </span>
                        ) : (
                          <span className="text-[11px] text-amber-700 font-medium bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                            Pending
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleOpenIncident(incident)}
                          className="px-3 py-1 text-xs font-semibold text-indigo-600 hover:text-white hover:bg-indigo-600 rounded-lg transition-colors border border-indigo-200"
                        >
                          Full Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 6. TAB 3: NOTICES ISSUED ("GOT NOTIC") */}
      {activeTab === 'notices' && (
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <FileWarning className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-amber-900">
                Official Show-Cause Notices & Inquiries
              </h4>
              <p className="text-xs text-amber-700 mt-0.5">
                Students issued statutory show-cause notices for participating in altercations, misconduct, or cheating. A formal written explanation is mandated within 48 hours before the Proctorial Board.
              </p>
            </div>
          </div>

          <div className="bg-white border border-surface-border rounded-xl shadow-subtle overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-surface-bg/80 border-b border-surface-border text-ink-secondary text-[11px] uppercase tracking-wider font-semibold">
                    <th className="py-3 px-4">Student Name</th>
                    <th className="py-3 px-4">Class</th>
                    <th className="py-3 px-4">Incident Reference</th>
                    <th className="py-3 px-4">Notice Served Date</th>
                    <th className="py-3 px-4">Notice Reference</th>
                    <th className="py-3 px-4">Action & Penalty</th>
                    <th className="py-3 px-4 text-center">Hearing Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border/60">
                  {filteredNotices.map(({ person, incident }) => (
                    <tr key={person.id} className="hover:bg-amber-50/30 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={person.avatar || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150'}
                            alt={person.name}
                            className="w-9 h-9 rounded-full object-cover border border-amber-200"
                          />
                          <div>
                            <p className="font-bold text-ink-primary hover:text-amber-700 cursor-pointer" onClick={() => handleOpenIncident(incident)}>
                              {person.name}
                            </p>
                            <p className="text-[11px] font-mono text-ink-secondary">
                              {person.admissionNo}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4 font-semibold text-ink-primary">
                        {person.grade}
                      </td>

                      <td className="py-3 px-4 max-w-xs">
                        <p className="font-medium text-ink-primary truncate">{incident.title}</p>
                        <p className="text-[11px] text-ink-secondary">{incident.incidentNo}</p>
                      </td>

                      <td className="py-3 px-4 font-mono text-xs text-ink-secondary tabular-nums">
                        {person.actionDate}
                      </td>

                      <td className="py-3 px-4 font-mono text-xs font-bold text-amber-800">
                        {person.noticeRefNumber}
                      </td>

                      <td className="py-3 px-4 max-w-xs">
                        <p className="text-xs text-ink-secondary line-clamp-1">{person.actionDetails}</p>
                      </td>

                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                          <Clock className="w-3 h-3" /> Awaiting Explanation
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setUpdatingPerson({ incidentId: incident.id, person });
                            setUpdatedAction(person.action);
                            setUpdatedDetails(person.actionDetails);
                          }}
                          className="px-2.5 py-1 text-xs font-semibold text-amber-700 hover:bg-amber-100 rounded border border-amber-300 transition-colors"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleOpenIncident(incident)}
                          className="px-2.5 py-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 rounded border border-indigo-200 transition-colors"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 7. TAB 4: LAST CHANCE GIVEN ("LAST CHANGE") */}
      {activeTab === 'last-chance' && (
        <div className="space-y-4">
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 flex items-start gap-3">
            <AlertOctagon className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-indigo-900">
                Final Warning & Last Chance Probation Watchlist
              </h4>
              <p className="text-xs text-indigo-700 mt-0.5">
                Students below have been given a final chance warning following campus disputes or fighting. Parents have signed official good-conduct bonds. Any repeat violation triggers immediate rustication without notice.
              </p>
            </div>
          </div>

          <div className="bg-white border border-surface-border rounded-xl shadow-subtle overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-surface-bg/80 border-b border-surface-border text-ink-secondary text-[11px] uppercase tracking-wider font-semibold">
                    <th className="py-3 px-4">Student Profile</th>
                    <th className="py-3 px-4">Class</th>
                    <th className="py-3 px-4">Incident Occurred</th>
                    <th className="py-3 px-4">Warning Date</th>
                    <th className="py-3 px-4">Probation Conditions</th>
                    <th className="py-3 px-4">Warning Memo Ref</th>
                    <th className="py-3 px-4 text-center">Bond Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border/60">
                  {filteredLastChance.map(({ person, incident }) => (
                    <tr key={person.id} className="hover:bg-indigo-50/30 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={person.avatar || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150'}
                            alt={person.name}
                            className="w-9 h-9 rounded-full object-cover border border-indigo-200"
                          />
                          <div>
                            <p className="font-bold text-ink-primary hover:text-indigo-600 cursor-pointer" onClick={() => handleOpenIncident(incident)}>
                              {person.name}
                            </p>
                            <p className="text-[11px] font-mono text-ink-secondary">
                              {person.admissionNo}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4 font-semibold text-ink-primary">
                        {person.grade}
                      </td>

                      <td className="py-3 px-4 max-w-xs">
                        <p className="font-medium text-ink-primary truncate">{incident.title}</p>
                        <span className="text-[10px] text-indigo-700 font-semibold bg-indigo-50 px-1.5 py-0.2 rounded border border-indigo-200">
                          Role: {person.role}
                        </span>
                      </td>

                      <td className="py-3 px-4 font-mono text-xs text-ink-secondary tabular-nums">
                        {person.actionDate}
                      </td>

                      <td className="py-3 px-4 max-w-xs">
                        <p className="text-xs text-ink-primary font-medium">{person.penaltyDuration || 'Probation on File'}</p>
                        <p className="text-[11px] text-ink-secondary truncate">{person.actionDetails}</p>
                      </td>

                      <td className="py-3 px-4 font-mono text-xs font-bold text-indigo-700">
                        {person.noticeRefNumber}
                      </td>

                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" /> Bond Signed
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleOpenIncident(incident)}
                          className="px-3 py-1 text-xs font-semibold text-indigo-600 hover:text-white hover:bg-indigo-600 rounded-lg transition-colors border border-indigo-200"
                        >
                          View Full Case
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 8. TAB 5: ALL INVOLVED PERSONS MASTER ROSTER */}
      {activeTab === 'master-persons' && (
        <div className="space-y-4">
          <SearchFilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search person by student name, roll number, or incident..."
            resultCount={allInvolvedPersons.length}
            onResetFilters={() => setSearchQuery('')}
          />

          <div className="bg-white border border-surface-border rounded-xl shadow-subtle overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-surface-bg/80 border-b border-surface-border text-ink-secondary text-[11px] uppercase tracking-wider font-semibold">
                    <th className="py-3 px-4">Student</th>
                    <th className="py-3 px-4">Class</th>
                    <th className="py-3 px-4">Associated Incident</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Disciplinary Action</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Order / Notice Ref</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border/60">
                  {allInvolvedPersons.map(({ person, incident }) => (
                    <tr key={person.id} className="hover:bg-surface-cardHover transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={person.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'}
                            alt={person.name}
                            className="w-8 h-8 rounded-full object-cover border border-surface-border"
                          />
                          <div>
                            <p className="font-bold text-ink-primary">{person.name}</p>
                            <p className="text-[11px] font-mono text-ink-secondary">{person.admissionNo}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4 font-medium text-ink-primary">
                        {person.grade}
                      </td>

                      <td className="py-3 px-4 max-w-xs">
                        <p className="font-semibold text-ink-primary hover:text-indigo-600 cursor-pointer truncate" onClick={() => handleOpenIncident(incident)}>
                          {incident.title}
                        </p>
                        <p className="text-[11px] font-mono text-ink-secondary">{incident.incidentNo}</p>
                      </td>

                      <td className="py-3 px-4">
                        <span className="text-xs font-medium text-ink-secondary">
                          {person.role}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <StatusBadge variant={getActionBadgeVariant(person.action)} size="sm">
                          {person.action}
                        </StatusBadge>
                      </td>

                      <td className="py-3 px-4 font-mono text-xs text-ink-secondary tabular-nums">
                        {person.actionDate}
                      </td>

                      <td className="py-3 px-4 font-mono text-xs font-semibold text-slate-700">
                        {person.noticeRefNumber || 'N/A'}
                      </td>

                      <td className="py-3 px-4 text-right space-x-1">
                        <button
                          onClick={() => {
                            setUpdatingPerson({ incidentId: incident.id, person });
                            setUpdatedAction(person.action);
                            setUpdatedDetails(person.actionDetails);
                          }}
                          className="px-2 py-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 rounded border border-indigo-200 transition-colors"
                        >
                          Modify
                        </button>
                        <button
                          onClick={() => handleOpenIncident(incident)}
                          className="px-2 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded border border-slate-200 transition-colors"
                        >
                          Full Case
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 9. INCIDENT DETAIL DRAWER ("SHOW ALL AND FULL THING") */}
      <DetailDrawer
        isOpen={isDrawerOpen && selectedIncident !== null}
        onClose={() => setIsDrawerOpen(false)}
        title={selectedIncident?.title || 'Incident Case Dossier'}
        subtitle={`Case Record: ${selectedIncident?.incidentNo} • Logged on ${selectedIncident?.date}`}
        width="xl"
        footer={
          <div className="flex items-center justify-between w-full">
            <button
              onClick={() => {
                onShowToast('success', 'Disciplinary Memo Generated', `Official Proctorial Board Memo for ${selectedIncident?.incidentNo} downloaded.`);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors border border-indigo-200"
            >
              <Download className="w-3.5 h-3.5" />
              Download Memo PDF
            </button>

            <button
              onClick={() => {
                onShowToast('info', 'Case Resolved', `Incident ${selectedIncident?.incidentNo} marked as closed.`);
                setIsDrawerOpen(false);
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm"
            >
              Mark Incident Resolved
            </button>
          </div>
        }
      >
        {selectedIncident && (
          <div className="space-y-6">
            {/* Metadata Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded border border-indigo-200">
                {selectedIncident.incidentNo}
              </span>
              <StatusBadge variant={getSeverityBadgeVariant(selectedIncident.severity)} size="md">
                {selectedIncident.severity} Severity
              </StatusBadge>
              <StatusBadge variant="neutral" size="md">
                {selectedIncident.category}
              </StatusBadge>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                Status: {selectedIncident.status}
              </span>
            </div>

            {/* Incident Summary Card */}
            <div className="bg-surface-bg/80 border border-surface-border rounded-xl p-4 space-y-3">
              <h4 className="text-xs font-bold text-ink-secondary uppercase tracking-wider">
                Event Logistics & Occurrence
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-ink-secondary">Date & Time:</span>
                  <p className="font-semibold text-ink-primary mt-0.5">{selectedIncident.date} at {selectedIncident.time}</p>
                </div>
                <div>
                  <span className="text-ink-secondary">Location:</span>
                  <p className="font-semibold text-ink-primary mt-0.5">{selectedIncident.location}</p>
                </div>
                <div>
                  <span className="text-ink-secondary">Reported By:</span>
                  <p className="font-semibold text-ink-primary mt-0.5">{selectedIncident.reportedBy}</p>
                </div>
                <div>
                  <span className="text-ink-secondary">Chief Investigating Officer:</span>
                  <p className="font-semibold text-ink-primary mt-0.5">{selectedIncident.investigator}</p>
                </div>
              </div>
            </div>

            {/* Narrative Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-ink-secondary uppercase tracking-wider">
                Detailed Incident Narrative & Chronology
              </h4>
              <div className="p-4 bg-white border border-surface-border rounded-xl text-xs sm:text-sm text-ink-primary leading-relaxed">
                {selectedIncident.description}
              </div>
            </div>

            {/* Evidence & CCTV Footage */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-ink-secondary uppercase tracking-wider flex items-center gap-1.5">
                <Video className="w-4 h-4 text-indigo-600" />
                Physical Evidence & CCTV Footage
              </h4>
              <div className="p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl text-xs text-indigo-900 leading-relaxed font-mono">
                {selectedIncident.evidenceDetails}
              </div>
            </div>

            {/* FULL LIST OF PERSONS INVOLVED WITH FULL DETAILS */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-ink-secondary uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-indigo-600" />
                  All Involved Persons & Sanctions ({selectedIncident.involvedPersons.length})
                </h4>
              </div>

              <div className="space-y-3">
                {selectedIncident.involvedPersons.map((person) => (
                  <div
                    key={person.id}
                    className="p-4 bg-white border border-surface-border rounded-xl shadow-subtle hover:border-slate-300 transition-colors space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-border/60">
                      <div className="flex items-center gap-3">
                        <img
                          src={person.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'}
                          alt={person.name}
                          className="w-10 h-10 rounded-full object-cover border border-surface-border"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="text-sm font-bold text-ink-primary">{person.name}</h5>
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-700">
                              {person.admissionNo}
                            </span>
                          </div>
                          <p className="text-xs text-ink-secondary">
                            {person.grade} • {person.department}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          Role: {person.role}
                        </span>
                        <StatusBadge variant={getActionBadgeVariant(person.action)} size="md">
                          {person.action}
                        </StatusBadge>
                      </div>
                    </div>

                    {/* Detailed Sanction & Order Reference */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-surface-bg p-3 rounded-lg">
                      <div>
                        <span className="text-ink-secondary font-medium">Sanction Order Ref:</span>
                        <p className="font-mono font-bold text-ink-primary mt-0.5">{person.noticeRefNumber || 'N/A'}</p>
                      </div>
                      <div>
                        <span className="text-ink-secondary font-medium">Penalty Duration / Terms:</span>
                        <p className="font-semibold text-rose-700 mt-0.5">{person.penaltyDuration || 'On File'}</p>
                      </div>
                      <div className="sm:col-span-2">
                        <span className="text-ink-secondary font-medium">Specific Disciplinary Terms:</span>
                        <p className="text-ink-primary mt-0.5 leading-relaxed">{person.actionDetails}</p>
                      </div>
                    </div>

                    {/* Parental Intimation & Undertaking */}
                    <div className="flex items-center justify-between text-xs pt-1 flex-wrap gap-2">
                      <div className="flex items-center gap-4 text-ink-secondary">
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Parent Contacted: <strong className="text-ink-primary">{person.parentContacted ? 'Yes' : 'No'}</strong>
                        </span>
                        {person.parentMeetingDate && (
                          <span>
                            Parent Meeting: <strong className="text-ink-primary">{person.parentMeetingDate}</strong>
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => {
                          setUpdatingPerson({ incidentId: selectedIncident.id, person });
                          setUpdatedAction(person.action);
                          setUpdatedDetails(person.actionDetails);
                        }}
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 underline"
                      >
                        Modify Sanction
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Proctorial Board Decision */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-ink-secondary uppercase tracking-wider flex items-center gap-1.5">
                <Gavel className="w-4 h-4 text-indigo-600" />
                Proctorial Board / SMC Committee Resolution
              </h4>
              <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl text-xs sm:text-sm text-amber-950 leading-relaxed font-medium">
                {selectedIncident.committeeDecision}
              </div>
            </div>
          </div>
        )}
      </DetailDrawer>

      {/* 10. LOG NEW INCIDENT MODAL FORM */}
      <FormDialog
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Log Campus Incident & Register Disciplinary Case"
        description="Record a fighting incident, ragging, or misconduct with involved student names and initial disciplinary actions."
        onSubmit={handleCreateIncidentSubmit}
        submitLabel="Log Incident & Issue Orders"
        maxWidth="xl"
      >
        <div className="space-y-5 text-left">
          {/* Section 1: Incident Info */}
          <div>
            <h4 className="text-xs font-bold text-ink-secondary uppercase tracking-wider mb-3">
              1. Incident Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-ink-primary mb-1">
                  Incident Title / Subject *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Physical brawl in senior cafeteria"
                  value={newIncident.title}
                  onChange={(e) => setNewIncident({ ...newIncident, title: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-surface-border rounded-lg focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-ink-primary mb-1">
                  Category *
                </label>
                <select
                  value={newIncident.category}
                  onChange={(e) => setNewIncident({ ...newIncident, category: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-surface-border rounded-lg focus:outline-none focus:border-indigo-600"
                >
                  <option value="Physical Fighting">Physical Altercation / Fighting</option>
                  <option value="Ragging & Bullying">Ragging & Bullying (Zero Tolerance)</option>
                  <option value="Classroom Indiscipline">Classroom Indiscipline</option>
                  <option value="Property Damage">Property Damage / Vandalism</option>
                  <option value="Substance Misconduct">Substance Misconduct</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-ink-primary mb-1">
                  Severity Level *
                </label>
                <select
                  value={newIncident.severity}
                  onChange={(e) => setNewIncident({ ...newIncident, severity: e.target.value as IncidentSeverity })}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-surface-border rounded-lg focus:outline-none focus:border-indigo-600"
                >
                  <option value="Critical">Critical (Immediate Rustication / Notice)</option>
                  <option value="High">High (Disciplinary Board Hearing)</option>
                  <option value="Medium">Medium (Proctorial Warning)</option>
                  <option value="Low">Low (Counseling)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-ink-primary mb-1">
                  Date of Occurrence *
                </label>
                <input
                  type="date"
                  required
                  value={newIncident.date}
                  onChange={(e) => setNewIncident({ ...newIncident, date: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-surface-border rounded-lg focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-ink-primary mb-1">
                  Time & Location *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 01:45 PM, Senior Cafeteria"
                  value={newIncident.location}
                  onChange={(e) => setNewIncident({ ...newIncident, location: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-surface-border rounded-lg focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-ink-primary mb-1">
                  Detailed Narrative & Witnesses *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe what occurred, who initiated, evidence gathered, and immediate containment measures taken..."
                  value={newIncident.description}
                  onChange={(e) => setNewIncident({ ...newIncident, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-surface-border rounded-lg focus:outline-none focus:border-indigo-600"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Primary Student & Disciplinary Sanction */}
          <div className="pt-4 border-t border-surface-border">
            <h4 className="text-xs font-bold text-ink-secondary uppercase tracking-wider mb-3">
              2. Primary Involved Student & Sanction
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-ink-primary mb-1">
                  Student Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Faizan Qureshi"
                  value={newIncident.studentName}
                  onChange={(e) => setNewIncident({ ...newIncident, studentName: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-surface-border rounded-lg focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-ink-primary mb-1">
                  Admission Number / Roll
                </label>
                <input
                  type="text"
                  placeholder="e.g. DRT-2024-0089"
                  value={newIncident.studentAdmNo}
                  onChange={(e) => setNewIncident({ ...newIncident, studentAdmNo: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-surface-border rounded-lg focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-ink-primary mb-1">
                  Class & Stream *
                </label>
                <select
                  value={newIncident.studentGrade}
                  onChange={(e) => setNewIncident({ ...newIncident, studentGrade: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-surface-border rounded-lg focus:outline-none focus:border-indigo-600"
                >
                  <option value="Class XII-Sci">Class XII - Science</option>
                  <option value="Class XII-Com">Class XII - Commerce</option>
                  <option value="Class XI-Sci">Class XI - Science</option>
                  <option value="Class XI-Com">Class XI - Commerce</option>
                  <option value="Class X-A">Class X - A</option>
                  <option value="Class X-B">Class X - B</option>
                  <option value="Class IX-A">Class IX - A</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-ink-primary mb-1">
                  Role in Incident *
                </label>
                <select
                  value={newIncident.studentRole}
                  onChange={(e) => setNewIncident({ ...newIncident, studentRole: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-surface-border rounded-lg focus:outline-none focus:border-indigo-600"
                >
                  <option value="Initiator">Initiator / Primary Combatant</option>
                  <option value="Aggressor">Aggressor / Combatant</option>
                  <option value="Accomplice">Accomplice / Instigator</option>
                  <option value="Victim">Victim</option>
                  <option value="Witness">Witness</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-ink-primary mb-1">
                  Disciplinary Action Sanctioned *
                </label>
                <select
                  value={newIncident.studentAction}
                  onChange={(e) => setNewIncident({ ...newIncident, studentAction: e.target.value as DisciplinaryActionType })}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-surface-border rounded-lg font-semibold focus:outline-none focus:border-indigo-600"
                >
                  <option value="Rusticated">Rusticated (Expelled / Debarred from Campus)</option>
                  <option value="Notice Issued">Notice Issued (Statutory Show-Cause Notice)</option>
                  <option value="Last Chance Warning">Last Chance Warning (Parental Bond)</option>
                  <option value="Counseling">Mandatory Counseling</option>
                  <option value="Under Investigation">Under Investigation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-ink-primary mb-1">
                  Duration / Penalty Terms
                </label>
                <input
                  type="text"
                  placeholder="e.g. 30 Academic Days Suspension"
                  value={newIncident.penaltyDuration}
                  onChange={(e) => setNewIncident({ ...newIncident, penaltyDuration: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-surface-border rounded-lg focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-ink-primary mb-1">
                  Action Order Details / Conditions
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rusticated from campus; Barred from Term-1 exams; Re-admission pending SMC review"
                  value={newIncident.studentActionDetails}
                  onChange={(e) => setNewIncident({ ...newIncident, studentActionDetails: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-surface-border rounded-lg focus:outline-none focus:border-indigo-600"
                />
              </div>
            </div>
          </div>
        </div>
      </FormDialog>

      {/* 11. QUICK MODIFY PERSON SANCTION MODAL */}
      {updatingPerson && (
        <FormDialog
          isOpen={true}
          onClose={() => setUpdatingPerson(null)}
          title={`Update Disciplinary Status: ${updatingPerson.person.name}`}
          description={`Admission No: ${updatingPerson.person.admissionNo} • Class: ${updatingPerson.person.grade}`}
          onSubmit={handleUpdatePersonSubmit}
          submitLabel="Save Updated Sanction"
          maxWidth="md"
        >
          <div className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-medium text-ink-primary mb-1">
                Select Disciplinary Action *
              </label>
              <select
                value={updatedAction}
                onChange={(e) => setUpdatedAction(e.target.value as DisciplinaryActionType)}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-surface-border rounded-lg font-semibold focus:outline-none focus:border-indigo-600"
              >
                <option value="Rusticated">Rusticated (Debarred from Campus)</option>
                <option value="Notice Issued">Notice Issued (Show-Cause)</option>
                <option value="Last Chance Warning">Last Chance Warning (Final Warning)</option>
                <option value="Counseling">Counseling & Community Service</option>
                <option value="Exonerated">Exonerated (Cleared)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-ink-primary mb-1">
                Updated Penalty Terms / Committee Note *
              </label>
              <textarea
                rows={3}
                required
                value={updatedDetails}
                onChange={(e) => setUpdatedDetails(e.target.value)}
                placeholder="Enter updated terms, e.g. Notice deadline expired; Rusticated for 30 academic days..."
                className="w-full px-3 py-2 text-xs sm:text-sm border border-surface-border rounded-lg focus:outline-none focus:border-indigo-600"
              />
            </div>
          </div>
        </FormDialog>
      )}
    </div>
  );
};
export default IncidentsView;
