import React, { useState } from 'react';
import { 
  Building,
  UserCheck, 
  Users, 
  Award, 
  Clock, 
  Calendar, 
  FileText, 
  Check, 
  X, 
  Search, 
  Filter, 
  Download,
  GraduationCap,
  ShieldCheck,
  Eye,
  BookOpen,
  Phone,
  MapPin
} from 'lucide-react';
import { StaffMember } from '../types';
import { MOCK_STAFF, MOCK_SMC_MEMBERS, MOCK_PTA_MEMBERS } from '../data/mockData';
import { PageHeader } from '../components/common/PageHeader';
import { StatCard } from '../components/common/StatCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { SearchFilterBar } from '../components/common/SearchFilterBar';
import { DetailDrawer } from '../components/common/DetailDrawer';

interface StaffHRViewProps {
  onShowToast: (type: 'success' | 'warning' | 'error' | 'info', title: string, message?: string) => void;
}

export const StaffHRView: React.FC<StaffHRViewProps> = ({ onShowToast }) => {
  const [activeTab, setActiveTab] = useState<'directory' | 'smc' | 'pta' | 'leaves' | 'training' | 'qualifications'>('directory');
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');

  // Selected staff drawer
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [isStaffDrawerOpen, setIsStaffDrawerOpen] = useState(false);

  // Leave requests state with real DRT KHIS staff
  const [leaveRequests, setLeaveRequests] = useState([
    { id: 'l1', staffName: 'Mrs. Shaheen Sameer Shaikh', empCode: 'DRT-EMP-001', type: 'Duty Leave', dates: 'Nov 03 - Nov 04 (2 Days)', reason: 'Attending CBSE National Sahodaya Leaders Conference, Pune', status: 'Pending' },
    { id: 'l2', staffName: 'Mr. Rakesh Chaubey', empCode: 'DRT-EMP-035', type: 'Casual Leave', dates: 'Oct 29 - Oct 30 (2 Days)', reason: 'Attending State Curriculum Framework Consultation', status: 'Approved' },
    { id: 'l3', staffName: 'Mr. Jamiluddin Sayyed', empCode: 'DRT-EMP-002', type: 'Special Duty', dates: 'Nov 07 (1 Day)', reason: 'Thane District Inter-School Athletic Meet Coordinator', status: 'Approved' },
  ]);

  const filteredStaff = MOCK_STAFF.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.empCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.qualification.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = deptFilter === 'all' || s.department.toLowerCase().includes(deptFilter.toLowerCase());
    return matchesSearch && matchesDept;
  });

  const handleApproveLeave = (id: string, name: string) => {
    setLeaveRequests(prev => prev.map(l => l.id === id ? { ...l, status: 'Approved' } : l));
    onShowToast('success', 'Leave Approved', `Leave request for ${name} has been approved.`);
  };

  const handleRejectLeave = (id: string, name: string) => {
    setLeaveRequests(prev => prev.map(l => l.id === id ? { ...l, status: 'Rejected' } : l));
    onShowToast('warning', 'Leave Rejected', `Leave request for ${name} declined.`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Staff & Human Resources"
        description="Faculty directory, School Managing Committee (SMC), PTA Council, CBSE 50-hour capacity building, and leave workflows."
        breadcrumbs={[
          { label: 'School Operations' },
          { label: 'Staff & HR', active: true }
        ]}
        primaryAction={{
          label: "Add Faculty Record",
          icon: <UserCheck className="w-4 h-4" />,
          onClick: () => onShowToast('info', 'Staff Form', 'Simulated Staff Onboarding dialog.')
        }}
        secondaryActions={[
          {
            label: "Export Staff Register",
            icon: <Download className="w-3.5 h-3.5" />,
            onClick: () => onShowToast('info', 'Export Started', 'OASIS-compatible faculty register exported.')
          }
        ]}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Active Staff"
          value="47"
          icon={Users}
          subtext="42 Teaching & Activity • 5 Administrative"
        />
        <StatCard
          label="CBSE 50h Training"
          value="95.7%"
          icon={Award}
          trend={{ value: "Mandatory byelaw met", isPositive: true }}
          subtext="Avg 49.8 hrs completed/faculty"
        />
        <StatCard
          label="Present Today"
          value="46 / 47"
          icon={UserCheck}
          subtext="97.9% biometric verified"
        />
        <StatCard
          label="Pending Leaves"
          value={leaveRequests.filter(l => l.status === 'Pending').length.toString()}
          icon={Clock}
          subtext="Awaiting Principal Mrs. Shaheen Shaikh"
        />
      </div>

      {/* Tabs */}
      <div className="flex border-b border-surface-border overflow-x-auto">
        <button
          onClick={() => setActiveTab('directory')}
          className={`py-3 px-4 sm:px-5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'directory'
              ? 'border-brand-navy text-brand-navy'
              : 'border-transparent text-ink-secondary hover:text-ink-primary'
          }`}
        >
          Faculty Directory ({MOCK_STAFF.length})
        </button>
        <button
          onClick={() => setActiveTab('smc')}
          className={`py-3 px-4 sm:px-5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'smc'
              ? 'border-brand-navy text-brand-navy'
              : 'border-transparent text-ink-secondary hover:text-ink-primary'
          }`}
        >
          Managing Committee (SMC - {MOCK_SMC_MEMBERS.length})
        </button>
        <button
          onClick={() => setActiveTab('pta')}
          className={`py-3 px-4 sm:px-5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'pta'
              ? 'border-brand-navy text-brand-navy'
              : 'border-transparent text-ink-secondary hover:text-ink-primary'
          }`}
        >
          PTA Council ({MOCK_PTA_MEMBERS.length})
        </button>
        <button
          onClick={() => setActiveTab('leaves')}
          className={`py-3 px-4 sm:px-5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeTab === 'leaves'
              ? 'border-brand-navy text-brand-navy'
              : 'border-transparent text-ink-secondary hover:text-ink-primary'
          }`}
        >
          <span>Leave Requests</span>
          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800">
            {leaveRequests.filter(l => l.status === 'Pending').length} Pending
          </span>
        </button>
        <button
          onClick={() => setActiveTab('training')}
          className={`py-3 px-4 sm:px-5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'training'
              ? 'border-brand-navy text-brand-navy'
              : 'border-transparent text-ink-secondary hover:text-ink-primary'
          }`}
        >
          CBSE 50-Hour Training Tracker
        </button>
        <button
          onClick={() => setActiveTab('qualifications')}
          className={`py-3 px-4 sm:px-5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'qualifications'
              ? 'border-brand-navy text-brand-navy'
              : 'border-transparent text-ink-secondary hover:text-ink-primary'
          }`}
        >
          Qualifications & Service Books
        </button>
      </div>

      {/* TAB 1: FACULTY DIRECTORY */}
      {activeTab === 'directory' && (
        <div className="space-y-4">
          <SearchFilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search staff by name, employee code, qualification, designation..."
            resultCount={filteredStaff.length}
            filters={[
              {
                key: 'dept',
                label: 'Department',
                value: deptFilter,
                onChange: setDeptFilter,
                options: [
                  { label: 'All Departments', value: 'all' },
                  { label: 'School Leadership', value: 'Leadership' },
                  { label: 'Secondary Wing (TGT)', value: 'Secondary Wing' },
                  { label: 'Primary Wing (PRT)', value: 'Primary Wing' },
                  { label: 'Pre-Primary (NTT)', value: 'Pre-Primary' },
                  { label: 'Physical Education & Sports', value: 'Sports' },
                  { label: 'Special Education & Wellness', value: 'Special Education' },
                  { label: 'Activities & Performing Arts', value: 'Performing Arts' },
                  { label: 'Administration & Accounts', value: 'Administration' },
                ]
              }
            ]}
            onResetFilters={() => {
              setSearchQuery('');
              setDeptFilter('all');
            }}
          />

          <div className="bg-white border border-surface-border rounded-xl shadow-subtle overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-surface-bg/80 border-b border-surface-border text-ink-secondary text-[11px] uppercase tracking-wider font-semibold">
                    <th className="py-3 px-4">Faculty Member</th>
                    <th className="py-3 px-4">Emp Code</th>
                    <th className="py-3 px-4">Department & Role</th>
                    <th className="py-3 px-4">Qualification</th>
                    <th className="py-3 px-4 text-center">Exp.</th>
                    <th className="py-3 px-4 text-center">CBSE Training</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border/60">
                  {filteredStaff.map((staff) => (
                    <tr
                      key={staff.id}
                      onClick={() => {
                        setSelectedStaff(staff);
                        setIsStaffDrawerOpen(true);
                      }}
                      className="hover:bg-surface-cardHover transition-colors cursor-pointer group"
                    >
                      <td className="py-3 px-4">
                        <p className="font-bold text-ink-primary group-hover:text-brand-navy transition-colors">
                          {staff.name}
                        </p>
                        <p className="text-[11px] text-ink-secondary">
                          {staff.email}
                        </p>
                      </td>
                      <td className="py-3 px-4 font-mono text-xs text-ink-secondary font-medium">
                        {staff.empCode}
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-medium text-ink-primary">{staff.designation}</p>
                        <p className="text-[11px] text-ink-secondary">{staff.department}</p>
                      </td>
                      <td className="py-3 px-4 text-ink-primary font-medium">
                        {staff.qualification}
                      </td>
                      <td className="py-3 px-4 text-center tabular-nums text-ink-secondary">
                        {staff.experienceYears} yrs
                      </td>
                      <td className="py-3 px-4 text-center tabular-nums">
                        <span className={`font-bold ${
                          staff.trainingHoursCompleted >= 50 ? 'text-emerald-600' : 'text-amber-600'
                        }`}>
                          {staff.trainingHoursCompleted} / 50 hrs
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <StatusBadge
                          variant={staff.status === 'Active' ? 'success' : 'warning'}
                          size="sm"
                        >
                          {staff.status}
                        </StatusBadge>
                      </td>
                      <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => {
                            setSelectedStaff(staff);
                            setIsStaffDrawerOpen(true);
                          }}
                          className="p-1.5 rounded-lg text-ink-secondary hover:text-brand-navy hover:bg-surface-muted"
                          title="View Profile"
                        >
                          <Eye className="w-4 h-4" />
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

      {/* TAB: SCHOOL MANAGING COMMITTEE (SMC) */}
      {activeTab === 'smc' && (
        <div className="bg-white border border-surface-border rounded-xl shadow-subtle overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-surface-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-bg/30">
            <div>
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5 text-brand-navy" />
                <h3 className="text-base font-bold text-ink-primary">
                  School Managing Committee (SMC)
                </h3>
              </div>
              <p className="text-xs text-ink-secondary mt-1">
                Official governing committee of DRT Knowledge Hub International School under Daar Ul Rehmat Trust (Ref: 408/K.H.I.S/2026)
              </p>
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge variant="brand">20 Constituted Members</StatusBadge>
              <StatusBadge variant="success">CBSE Norms Compliant</StatusBadge>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-surface-bg/80 border-b border-surface-border text-ink-secondary text-[11px] uppercase tracking-wider font-semibold">
                  <th className="py-3 px-4 w-12 text-center">#</th>
                  <th className="py-3 px-4">Member Name</th>
                  <th className="py-3 px-4">SMC Designation</th>
                  <th className="py-3 px-4">Qualification</th>
                  <th className="py-3 px-4">Residential / Official Address</th>
                  <th className="py-3 px-4 text-right">Contact No</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border/60">
                {MOCK_SMC_MEMBERS.map((member) => (
                  <tr key={member.srNo} className="hover:bg-surface-cardHover transition-colors">
                    <td className="py-3 px-4 text-center font-mono text-xs text-ink-secondary">
                      {member.srNo}
                    </td>
                    <td className="py-3 px-4 font-bold text-ink-primary">
                      {member.name}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        member.designation.includes('Chair') || member.designation.includes('Secretary')
                          ? 'bg-purple-100 text-purple-800'
                          : member.designation.includes('Teacher')
                          ? 'bg-blue-100 text-blue-800'
                          : member.designation.includes('Authority') || member.designation.includes('Educationist')
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {member.designation}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-ink-secondary font-medium">
                      {member.qualification}
                    </td>
                    <td className="py-3 px-4 text-ink-secondary text-xs max-w-xs truncate" title={member.address}>
                      {member.address}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-xs text-ink-primary font-medium">
                      {member.contactNo}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB: PARENTS TEACHERS ASSOCIATION (PTA) */}
      {activeTab === 'pta' && (
        <div className="bg-white border border-surface-border rounded-xl shadow-subtle overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-surface-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-bg/30">
            <div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-brand-navy" />
                <h3 className="text-base font-bold text-ink-primary">
                  Parents Teachers Association (PTA) Council
                </h3>
              </div>
              <p className="text-xs text-ink-secondary mt-1">
                Elected Parent Representatives for Academic Session 2026-2027 (Ref: 407/K.H.I.S/2026)
              </p>
            </div>
            <StatusBadge variant="brand">12 Grade Representatives</StatusBadge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
            {MOCK_PTA_MEMBERS.map((pta) => (
              <div key={pta.srNo} className="p-4 rounded-xl border border-surface-border bg-surface-bg/30 hover:bg-white hover:shadow-card transition-all space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-brand-navy text-white">
                    {pta.grade}
                  </span>
                  <span className="text-xs text-ink-secondary font-mono">#{pta.srNo}</span>
                </div>
                <h4 className="font-bold text-ink-primary text-sm pt-1">{pta.name}</h4>
                <p className="text-xs text-emerald-700 font-medium flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  {pta.designation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: LEAVE REQUESTS */}
      {activeTab === 'leaves' && (
        <div className="bg-white border border-surface-border rounded-xl shadow-subtle overflow-hidden">
          <div className="p-4 border-b border-surface-border flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-ink-primary">
                Faculty Leave Applications & Substitute Allocations
              </h3>
              <p className="text-xs text-ink-secondary">
                Principal and Administrative approval workflow
              </p>
            </div>
          </div>

          <div className="divide-y divide-surface-border/60">
            {leaveRequests.map((req) => (
              <div key={req.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-surface-cardHover transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-ink-primary text-sm">
                      {req.staffName}
                    </span>
                    <span className="text-[11px] font-mono text-ink-secondary">
                      ({req.empCode})
                    </span>
                    <StatusBadge variant="brand" size="sm">{req.type}</StatusBadge>
                  </div>
                  <p className="text-xs text-ink-secondary">
                    Period: <strong className="text-ink-primary">{req.dates}</strong>
                  </p>
                  <p className="text-xs text-ink-secondary italic">
                    Reason: "{req.reason}"
                  </p>
                </div>

                <div className="flex items-center gap-2.5 flex-shrink-0">
                  <StatusBadge
                    variant={
                      req.status === 'Approved' ? 'success' : req.status === 'Rejected' ? 'danger' : 'warning'
                    }
                  >
                    {req.status}
                  </StatusBadge>

                  {req.status === 'Pending' && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleRejectLeave(req.id, req.staffName)}
                        className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-surface-muted hover:bg-rose-50 text-rose-600 border border-surface-border transition-colors"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleApproveLeave(req.id, req.staffName)}
                        className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-brand-navy hover:bg-brand-navyDark text-white shadow-subtle transition-colors"
                      >
                        Approve Leave
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CBSE 50-HOUR MANDATORY TRAINING */}
      {activeTab === 'training' && (
        <div className="bg-white border border-surface-border rounded-xl shadow-subtle p-5 space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-3 text-xs text-brand-navy">
            <Award className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm text-brand-navy">
                CBSE Mandatory Continuous Professional Development (CPD) Byelaw
              </p>
              <p className="mt-1 text-slate-700 leading-relaxed">
                As per CBSE Affiliation Bye-Laws 2018 (Rule 16), every teacher and principal must undergo a minimum of <strong>50 hours of Continuous Professional Development (CPD)</strong> every year organized by CBSE / COE / DIET or recognized institutional bodies.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto border border-surface-border rounded-xl">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-surface-bg/80 border-b border-surface-border text-ink-secondary text-[11px] uppercase tracking-wider font-semibold">
                  <th className="py-3 px-4">Faculty</th>
                  <th className="py-3 px-4">Mandate (50h)</th>
                  <th className="py-3 px-4">Recent Training Attended</th>
                  <th className="py-3 px-4">Cert Expiry</th>
                  <th className="py-3 px-4 text-center">Compliance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border/60">
                {MOCK_STAFF.map((staff) => (
                  <tr key={staff.id} className="hover:bg-surface-cardHover transition-colors">
                    <td className="py-3 px-4 font-bold text-ink-primary">
                      {staff.name}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-28 h-2 bg-surface-muted rounded-full overflow-hidden">
                          <div
                            style={{ width: `${Math.min(100, (staff.trainingHoursCompleted / 50) * 100)}%` }}
                            className={`h-full ${staff.trainingHoursCompleted >= 50 ? 'bg-emerald-600' : 'bg-amber-500'}`}
                          />
                        </div>
                        <span className="font-bold tabular-nums text-xs">
                          {staff.trainingHoursCompleted} / 50h
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-ink-secondary">
                      CBSE COE Pune — Experiential Learning & NEP Pedagogy
                    </td>
                    <td className="py-3 px-4 tabular-nums text-ink-secondary font-mono text-xs">
                      {staff.trainingCertExpiry}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <StatusBadge
                        variant={staff.trainingHoursCompleted >= 50 ? 'success' : 'warning'}
                        size="sm"
                      >
                        {staff.trainingHoursCompleted >= 50 ? '100% Certified' : 'In Progress'}
                      </StatusBadge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: QUALIFICATIONS */}
      {activeTab === 'qualifications' && (
        <div className="bg-white border border-surface-border rounded-xl shadow-subtle p-5">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-surface-border">
            <div>
              <h3 className="text-base font-bold text-ink-primary">
                Service Books & CBSE Qualification Norms
              </h3>
              <p className="text-xs text-ink-secondary">
                B.Ed, Post-Graduate, CTET/TET qualifications cross-verified with physical service books
              </p>
            </div>
            <StatusBadge variant="success">Service Books 100% Digitized</StatusBadge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_STAFF.map((staff) => (
              <div key={staff.id} className="p-4 rounded-xl border border-surface-border bg-surface-bg/30 hover:bg-white hover:shadow-card transition-all">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-ink-primary">{staff.name}</h4>
                    <p className="text-xs text-brand-navy font-semibold">{staff.designation} • {staff.department}</p>
                  </div>
                  <span className="text-[11px] font-mono text-ink-secondary">{staff.empCode}</span>
                </div>

                <div className="mt-3 space-y-1 text-xs text-ink-secondary">
                  <p>Highest Qualification: <strong className="text-ink-primary">{staff.qualification}</strong></p>
                  <p>Joining Date: <strong className="text-ink-primary">{staff.joinDate}</strong></p>
                  <p className="text-emerald-700 font-medium flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Service Book & Police Verification Cleared
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Staff Detail Drawer */}
      <DetailDrawer
        isOpen={isStaffDrawerOpen}
        onClose={() => setIsStaffDrawerOpen(false)}
        title={selectedStaff ? selectedStaff.name : 'Faculty Profile'}
        subtitle={selectedStaff ? `${selectedStaff.designation} (${selectedStaff.empCode})` : ''}
        width="lg"
      >
        {selectedStaff && (
          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-surface-bg border border-surface-border">
              <h4 className="font-bold text-base text-ink-primary">{selectedStaff.name}</h4>
              <p className="text-xs text-ink-secondary">{selectedStaff.department} • Experience: {selectedStaff.experienceYears} Years</p>
              <div className="mt-2 flex items-center gap-2">
                <StatusBadge variant="brand">{selectedStaff.status}</StatusBadge>
                <StatusBadge variant="success">Verified Faculty</StatusBadge>
              </div>
            </div>

            <div className="space-y-2 bg-white p-4 rounded-xl border border-surface-border">
              <h5 className="font-bold text-xs uppercase text-ink-secondary">Faculty Details</h5>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>Email: <strong className="text-ink-primary block">{selectedStaff.email}</strong></div>
                <div>Phone: <strong className="text-ink-primary block">{selectedStaff.phone}</strong></div>
                <div>Joined: <strong className="text-ink-primary block">{selectedStaff.joinDate}</strong></div>
                <div>Salary Scale: <strong className="text-ink-primary block">₹{selectedStaff.salary.toLocaleString('en-IN')}/mo (7th CPC)</strong></div>
              </div>
            </div>
          </div>
        )}
      </DetailDrawer>
    </div>
  );
};
