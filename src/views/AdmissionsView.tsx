import React, { useState, useMemo } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  Eye, 
  Download, 
  MoreVertical, 
  Phone, 
  Mail, 
  MapPin, 
  FileText, 
  Check, 
  X,
  CreditCard,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { Student } from '../types';
import { MOCK_STUDENTS } from '../data/mockData';
import { PageHeader } from '../components/common/PageHeader';
import { StatCard } from '../components/common/StatCard';
import { SearchFilterBar } from '../components/common/SearchFilterBar';
import { StatusBadge } from '../components/common/StatusBadge';
import { DetailDrawer } from '../components/common/DetailDrawer';
import { FormDialog } from '../components/common/FormDialog';
import { EmptyState } from '../components/common/EmptyState';

interface AdmissionsViewProps {
  onShowToast: (type: 'success' | 'warning' | 'error' | 'info', title: string, message?: string) => void;
}

export const AdmissionsView: React.FC<AdmissionsViewProps> = ({ onShowToast }) => {
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Drawer state
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Add Student Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    grade: 'Class IX',
    section: 'A',
    gender: 'Male' as const,
    dob: '2010-05-15',
    fatherName: '',
    motherName: '',
    phone: '',
    email: '',
    address: 'Kausa, Mumbra, Thane',
    bloodGroup: 'B+'
  });

  // Filtered students
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchesSearch = 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.admissionNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.fatherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.phone.includes(searchQuery);

      const matchesGrade = gradeFilter === 'all' || s.grade === gradeFilter;
      const matchesStatus = statusFilter === 'all' || s.status === statusFilter;

      return matchesSearch && matchesGrade && matchesStatus;
    });
  }, [students, searchQuery, gradeFilter, statusFilter]);

  const handleOpenStudentDrawer = (student: Student) => {
    setSelectedStudent(student);
    setIsDrawerOpen(true);
  };

  const handleAddStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.fatherName || !newStudent.phone) {
      onShowToast('warning', 'Incomplete Form', 'Please fill in Student Name, Father Name, and Contact Number.');
      return;
    }

    const createdStudent: Student = {
      id: `std_${Date.now()}`,
      admissionNo: `DRT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      name: newStudent.name,
      grade: newStudent.grade,
      section: newStudent.section,
      rollNo: filteredStudents.length + 1,
      gender: newStudent.gender,
      dob: newStudent.dob,
      fatherName: newStudent.fatherName,
      motherName: newStudent.motherName || 'Not Provided',
      phone: newStudent.phone,
      email: newStudent.email || `${newStudent.name.toLowerCase().replace(/\s+/g, '')}@example.com`,
      address: newStudent.address,
      status: 'Active',
      feeStatus: 'Paid',
      attendancePct: 98.0,
      house: 'Blue Sapphire',
      bloodGroup: newStudent.bloodGroup,
      tcIssued: false,
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200'
    };

    setStudents([createdStudent, ...students]);
    setIsAddModalOpen(false);
    onShowToast('success', 'Student Enrolled', `${newStudent.name} admitted successfully with Adm No: ${createdStudent.admissionNo}`);
    
    // Reset form
    setNewStudent({
      name: '',
      grade: 'Class IX',
      section: 'A',
      gender: 'Male',
      dob: '2010-05-15',
      fatherName: '',
      motherName: '',
      phone: '',
      email: '',
      address: 'Kausa, Mumbra, Thane',
      bloodGroup: 'B+'
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Admissions & Student Registry"
        description="Comprehensive student enrollment, academic records, guardian details, and section allocation."
        breadcrumbs={[
          { label: 'School Operations' },
          { label: 'Admissions & Students', active: true }
        ]}
        primaryAction={{
          label: "New Student Admission",
          icon: <UserPlus className="w-4 h-4" />,
          onClick: () => setIsAddModalOpen(true)
        }}
        secondaryActions={[
          {
            label: "Export Registry",
            icon: <Download className="w-3.5 h-3.5" />,
            onClick: () => onShowToast('info', 'Export Started', 'Simulated CSV export generated for 1,248 student records.')
          }
        ]}
      />

      {/* Summary Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Enrolled"
          value="1,248"
          icon={Users}
          subtext="Session 2026–27 Active"
        />
        <StatCard
          label="New Admissions (2026)"
          value="142"
          icon={UserPlus}
          trend={{ value: "+18 vs last year", isPositive: true }}
          subtext="Processed & Allocated"
        />
        <StatCard
          label="Under Review"
          value="14"
          icon={AlertCircle}
          subtext="Pending verification of TC"
        />
        <StatCard
          label="TC Issued / Withdrawn"
          value="8"
          icon={FileText}
          subtext="Relocated outside Mumbra"
        />
      </div>

      {/* Search and Filters Bar */}
      <SearchFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search student name, admission number, guardian, phone..."
        resultCount={filteredStudents.length}
        filters={[
          {
            key: 'grade',
            label: 'Grade',
            value: gradeFilter,
            onChange: setGradeFilter,
            options: [
              { label: 'All Grades', value: 'all' },
              { label: 'Class IX', value: 'Class IX' },
              { label: 'Class X', value: 'Class X' },
              { label: 'Class XI', value: 'Class XI' },
              { label: 'Class XII', value: 'Class XII' },
            ]
          },
          {
            key: 'status',
            label: 'Status',
            value: statusFilter,
            onChange: setStatusFilter,
            options: [
              { label: 'All Statuses', value: 'all' },
              { label: 'Active', value: 'Active' },
              { label: 'Under Review', value: 'Under Review' },
              { label: 'Withdrawn', value: 'Withdrawn' }
            ]
          }
        ]}
        onResetFilters={() => {
          setSearchQuery('');
          setGradeFilter('all');
          setStatusFilter('all');
        }}
      />

      {/* Data Table */}
      <div className="bg-white border border-surface-border rounded-xl shadow-subtle overflow-hidden">
        {filteredStudents.length === 0 ? (
          <EmptyState
            title="No Students Found"
            description="No student records matched your search query or filters. Try adjusting your filters."
            actionLabel="Reset Filters"
            onAction={() => {
              setSearchQuery('');
              setGradeFilter('all');
              setStatusFilter('all');
            }}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-bg/80 border-b border-surface-border text-ink-secondary text-[11px] uppercase tracking-wider font-semibold">
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Adm. No</th>
                  <th className="py-3 px-4">Class & Sec</th>
                  <th className="py-3 px-4">Guardian Contact</th>
                  <th className="py-3 px-4 text-center">Attendance</th>
                  <th className="py-3 px-4 text-center">Fee Status</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border/60 text-xs sm:text-sm">
                {filteredStudents.map((std) => (
                  <tr
                    key={std.id}
                    onClick={() => handleOpenStudentDrawer(std)}
                    className="hover:bg-surface-cardHover transition-colors cursor-pointer group"
                  >
                    {/* Student Avatar + Name */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={std.avatar}
                          alt={std.name}
                          className="w-8 h-8 rounded-full object-cover ring-1 ring-surface-border flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-semibold text-ink-primary group-hover:text-brand-navy transition-colors truncate">
                            {std.name}
                          </p>
                          <p className="text-[11px] text-ink-secondary truncate">
                            Roll No: {std.rollNo} • {std.house}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Admission Number */}
                    <td className="py-3 px-4 font-mono text-xs text-ink-primary font-medium">
                      {std.admissionNo}
                    </td>

                    {/* Class & Section */}
                    <td className="py-3 px-4">
                      <span className="font-medium text-ink-primary">
                        {std.grade}
                      </span>
                      <span className="ml-1 text-ink-secondary">
                        - {std.section}
                      </span>
                    </td>

                    {/* Guardian Contact */}
                    <td className="py-3 px-4">
                      <p className="font-medium text-ink-primary truncate">
                        {std.fatherName}
                      </p>
                      <p className="text-[11px] text-ink-secondary truncate">
                        {std.phone}
                      </p>
                    </td>

                    {/* Attendance % */}
                    <td className="py-3 px-4 text-center tabular-nums">
                      <span
                        className={`font-semibold ${
                          std.attendancePct < 75
                            ? 'text-rose-600 font-bold'
                            : std.attendancePct < 85
                            ? 'text-amber-600'
                            : 'text-emerald-600'
                        }`}
                      >
                        {std.attendancePct}%
                      </span>
                    </td>

                    {/* Fee Status */}
                    <td className="py-3 px-4 text-center">
                      <StatusBadge
                        variant={
                          std.feeStatus === 'Paid'
                            ? 'success'
                            : std.feeStatus === 'Partial'
                            ? 'warning'
                            : 'danger'
                        }
                        size="sm"
                      >
                        {std.feeStatus}
                      </StatusBadge>
                    </td>

                    {/* Admission Status */}
                    <td className="py-3 px-4 text-center">
                      <StatusBadge
                        variant={
                          std.status === 'Active'
                            ? 'brand'
                            : std.status === 'Under Review'
                            ? 'warning'
                            : 'neutral'
                        }
                        size="sm"
                      >
                        {std.status}
                      </StatusBadge>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleOpenStudentDrawer(std)}
                        className="p-1.5 rounded-lg text-ink-secondary hover:text-brand-navy hover:bg-surface-muted transition-colors"
                        title="View Full Profile"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Student Profile Drawer */}
      <DetailDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={selectedStudent ? selectedStudent.name : 'Student Details'}
        subtitle={selectedStudent ? `Admission No: ${selectedStudent.admissionNo}` : ''}
        width="lg"
        footer={
          <>
            <button
              onClick={() => {
                onShowToast('info', 'ID Card Generated', `Simulated printable student identity card for ${selectedStudent?.name}`);
              }}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-surface-muted hover:bg-slate-200 text-ink-primary transition-colors"
            >
              Print ID Card
            </button>
            <button
              onClick={() => {
                onShowToast('success', 'Profile Updated', `Changes recorded for ${selectedStudent?.name}`);
                setIsDrawerOpen(false);
              }}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-brand-navy hover:bg-brand-navyDark text-white transition-colors"
            >
              Save Profile
            </button>
          </>
        }
      >
        {selectedStudent && (
          <div className="space-y-6 text-xs sm:text-sm">
            {/* Top Identity Card */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-surface-bg border border-surface-border">
              <img
                src={selectedStudent.avatar}
                alt={selectedStudent.name}
                className="w-16 h-16 rounded-xl object-cover ring-2 ring-white shadow-sm flex-shrink-0"
              />
              <div className="min-w-0">
                <h4 className="text-base font-bold text-ink-primary">
                  {selectedStudent.name}
                </h4>
                <p className="text-xs text-ink-secondary">
                  Class: <strong>{selectedStudent.grade} - Section {selectedStudent.section}</strong> (Roll #{selectedStudent.rollNo})
                </p>
                <div className="mt-2 flex items-center gap-2 flex-wrap">
                  <StatusBadge variant="brand">{selectedStudent.status}</StatusBadge>
                  <StatusBadge variant="neutral">{selectedStudent.house}</StatusBadge>
                  <StatusBadge variant="neutral">Blood: {selectedStudent.bloodGroup}</StatusBadge>
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white border border-surface-border rounded-lg">
                <p className="text-[11px] text-ink-secondary">Attendance Rate</p>
                <p className={`text-lg font-bold tabular-nums ${
                  selectedStudent.attendancePct < 75 ? 'text-rose-600' : 'text-emerald-600'
                }`}>
                  {selectedStudent.attendancePct}%
                </p>
                <p className="text-[10px] text-ink-secondary mt-0.5">
                  {selectedStudent.attendancePct < 75 ? 'CBSE Rule 13 Shortage Alert' : 'Exceeds CBSE 75% rule'}
                </p>
              </div>

              <div className="p-3 bg-white border border-surface-border rounded-lg">
                <p className="text-[11px] text-ink-secondary">Fee Account Status</p>
                <p className="text-lg font-bold text-ink-primary">
                  {selectedStudent.feeStatus}
                </p>
                <p className="text-[10px] text-ink-secondary mt-0.5">
                  Term 2 Installment Cleared
                </p>
              </div>
            </div>

            {/* Guardian & Contact Information */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-ink-secondary">
                Guardian & Contact Details
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-4 rounded-xl border border-surface-border">
                <div>
                  <span className="text-[11px] text-ink-secondary block">Father's Name</span>
                  <span className="font-semibold text-ink-primary">{selectedStudent.fatherName}</span>
                </div>
                <div>
                  <span className="text-[11px] text-ink-secondary block">Mother's Name</span>
                  <span className="font-semibold text-ink-primary">{selectedStudent.motherName}</span>
                </div>
                <div>
                  <span className="text-[11px] text-ink-secondary block">Primary Phone</span>
                  <span className="font-mono text-ink-primary flex items-center gap-1">
                    <Phone className="w-3 h-3 text-ink-secondary" />
                    {selectedStudent.phone}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-ink-secondary block">Email Address</span>
                  <span className="text-ink-primary flex items-center gap-1 truncate">
                    <Mail className="w-3 h-3 text-ink-secondary" />
                    {selectedStudent.email}
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-[11px] text-ink-secondary block">Residential Address</span>
                  <span className="text-ink-primary flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-ink-secondary flex-shrink-0" />
                    {selectedStudent.address}
                  </span>
                </div>
              </div>
            </div>

            {/* Academic History & Documents */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-ink-secondary">
                Enrolment Compliance
              </h5>
              <div className="bg-white p-4 rounded-xl border border-surface-border space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-ink-secondary">Transfer Certificate (TC):</span>
                  <span className="font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Verified on File
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-ink-secondary">Birth Certificate Verification:</span>
                  <span className="font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Aadhaar Cross-Verified
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-ink-secondary">Previous Institution:</span>
                  <span className="font-medium text-ink-primary">
                    {selectedStudent.previousSchool || 'Direct Admission / DRT Kindergarten'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </DetailDrawer>

      {/* Add Student Modal */}
      <FormDialog
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="New Student Admission"
        description="Enroll student into DRT Knowledge Hub International School for Academic Session 2026–27."
        submitLabel="Confirm Admission"
        onSubmit={handleAddStudentSubmit}
        maxWidth="xl"
      >
        <div className="space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-brand-navy border-b border-surface-border pb-1">
            1. Student Information
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-ink-primary mb-1">
                Student Full Name *
              </label>
              <input
                type="text"
                required
                value={newStudent.name}
                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                placeholder="e.g. Amaan Farooq Khan"
                className="w-full px-3 py-2 text-xs sm:text-sm border border-surface-border rounded-lg bg-surface-bg focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-ink-primary mb-1">
                Date of Birth *
              </label>
              <input
                type="date"
                required
                value={newStudent.dob}
                onChange={(e) => setNewStudent({ ...newStudent, dob: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-surface-border rounded-lg bg-surface-bg focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-ink-primary mb-1">
                Class / Grade *
              </label>
              <select
                value={newStudent.grade}
                onChange={(e) => setNewStudent({ ...newStudent, grade: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-surface-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
              >
                <option value="Class IX">Class IX</option>
                <option value="Class X">Class X</option>
                <option value="Class XI">Class XI</option>
                <option value="Class XII">Class XII</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-ink-primary mb-1">
                Section Allocation *
              </label>
              <select
                value={newStudent.section}
                onChange={(e) => setNewStudent({ ...newStudent, section: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-surface-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
              >
                <option value="A">Section A</option>
                <option value="B">Section B</option>
                <option value="C">Section C</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-ink-primary mb-1">
                Gender *
              </label>
              <select
                value={newStudent.gender}
                onChange={(e) => setNewStudent({ ...newStudent, gender: e.target.value as any })}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-surface-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-ink-primary mb-1">
                Blood Group
              </label>
              <select
                value={newStudent.bloodGroup}
                onChange={(e) => setNewStudent({ ...newStudent, bloodGroup: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-surface-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
              >
                <option value="A+">A+</option>
                <option value="B+">B+</option>
                <option value="O+">O+</option>
                <option value="AB+">AB+</option>
                <option value="O-">O-</option>
              </select>
            </div>
          </div>

          <div className="text-xs font-bold uppercase tracking-wider text-brand-navy border-b border-surface-border pb-1 pt-2">
            2. Guardian & Address
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-ink-primary mb-1">
                Father's Name *
              </label>
              <input
                type="text"
                required
                value={newStudent.fatherName}
                onChange={(e) => setNewStudent({ ...newStudent, fatherName: e.target.value })}
                placeholder="e.g. Farooq Khan"
                className="w-full px-3 py-2 text-xs sm:text-sm border border-surface-border rounded-lg bg-surface-bg focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-ink-primary mb-1">
                Mother's Name
              </label>
              <input
                type="text"
                value={newStudent.motherName}
                onChange={(e) => setNewStudent({ ...newStudent, motherName: e.target.value })}
                placeholder="e.g. Yasmin Khan"
                className="w-full px-3 py-2 text-xs sm:text-sm border border-surface-border rounded-lg bg-surface-bg focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-ink-primary mb-1">
                Emergency Phone Number *
              </label>
              <input
                type="tel"
                required
                value={newStudent.phone}
                onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                placeholder="+91 98200 00000"
                className="w-full px-3 py-2 text-xs sm:text-sm border border-surface-border rounded-lg bg-surface-bg focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-ink-primary mb-1">
                Guardian Email
              </label>
              <input
                type="email"
                value={newStudent.email}
                onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                placeholder="parent@example.com"
                className="w-full px-3 py-2 text-xs sm:text-sm border border-surface-border rounded-lg bg-surface-bg focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-ink-primary mb-1">
                Residential Address in Mumbra / Thane
              </label>
              <input
                type="text"
                value={newStudent.address}
                onChange={(e) => setNewStudent({ ...newStudent, address: e.target.value })}
                placeholder="Building, Road, Area, Pin code"
                className="w-full px-3 py-2 text-xs sm:text-sm border border-surface-border rounded-lg bg-surface-bg focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
              />
            </div>
          </div>
        </div>
      </FormDialog>
    </div>
  );
};
