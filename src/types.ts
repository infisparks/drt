export type UserRole = 
  | 'director' 
  | 'principal' 
  | 'academic' 
  | 'compliance' 
  | 'accounts' 
  | 'teacher' 
  | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  roleTitle: string;
  avatar: string;
  email: string;
  department: string;
}

export interface Student {
  id: string;
  admissionNo: string;
  name: string;
  grade: string;
  section: string;
  rollNo: number;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  fatherName: string;
  motherName: string;
  phone: string;
  email: string;
  address: string;
  status: 'Active' | 'Under Review' | 'Withdrawn' | 'Promoted';
  feeStatus: 'Paid' | 'Partial' | 'Pending' | 'Overdue';
  attendancePct: number;
  house: 'Blue Sapphire' | 'Red Ruby' | 'Green Emerald' | 'Yellow Topaz';
  bloodGroup: string;
  previousSchool?: string;
  tcIssued: boolean;
  avatar: string;
}

export interface StaffMember {
  id: string;
  empCode: string;
  name: string;
  role: string;
  department: string;
  designation: string;
  qualification: string;
  experienceYears: number;
  phone: string;
  email: string;
  joinDate: string;
  trainingHoursCompleted: number; // CBSE mandate: 50 hrs/yr
  trainingCertExpiry: string;
  status: 'Active' | 'On Leave' | 'Probation';
  salary: number;
  serviceBookVerified: boolean;
  avatar: string;
}

export interface ClassAttendanceSummary {
  grade: string;
  section: string;
  totalStudents: number;
  present: number;
  absent: number;
  late: number;
  attendanceRate: number;
  classTeacher: string;
  shortageCount: number; // CBSE IX-XII < 75%
}

export interface CBSEDocument {
  id: string;
  category: string;
  title: string;
  certNumber: string;
  certificateNumber?: string;
  issuingAuthority: string;
  issueDate: string;
  expiryDate: string;
  status: 'Valid' | 'Expiring Soon' | 'In Renewal' | 'Missing / Action Required' | 'Expired' | 'Missing';
  daysRemaining: number;
  assignedOfficer: string;
  assignedOwner?: string;
  fileSize: string;
  version: string;
  notes: string;
  auditNotes?: string;
  verificationLevel?: string;
  fileUrl?: string;
}

export interface PublicDisclosureRow {
  slNo: number;
  section: string;
  information: string;
  details: string;
  documentLinkText?: string;
  isCompliant: boolean;
  lastUpdated: string;
}

export interface SQAAFDomain {
  id: number;
  domainNumber?: number;
  name: string;
  title?: string;
  description: string;
  standardsCount: number;
  achievedCount: number;
  scorePercentage: number;
  scoreEarned?: number;
  maxScore?: number;
  level: string;
  maturityLevel?: string;
  leadOwner: string;
  evidenceDocsCount: number;
  evidenceCount?: number;
  pendingActionsCount?: number;
  subStandards?: string[];
}

export interface SchoolImprovementAction {
  id: string;
  domainId: number;
  domain?: string;
  title: string;
  objective: string;
  leadOwner: string;
  responsiblePerson?: string;
  targetDate: string;
  deadline?: string;
  priority: 'Urgent' | 'High' | 'Medium' | 'Low' | string;
  status: 'In Progress' | 'Completed' | 'Pending Review' | string;
  progressPct: number;
  progress?: number;
  kpiMeasure: string;
}

export interface ApprovalWorkflowItem {
  id: string;
  type: string;
  requestType?: string;
  title: string;
  submittedBy: string;
  requesterName?: string;
  requesterRole?: string;
  department: string;
  submittedDate: string;
  submissionDate?: string;
  priority: 'Urgent' | 'High' | 'Standard' | 'Normal' | 'Low' | string;
  amount?: number;
  status: string;
  details: string;
  justification?: string;
  attachmentsCount: number;
  history?: any[];
}

export interface FeeHead {
  grade: string;
  tuitionFee: number;
  termFee: number;
  computerFee?: number;
  annualCharges: number;
  totalAnnual: number;
}

export interface FeeTransaction {
  receiptNo: string;
  date: string;
  studentName: string;
  admissionNo: string;
  grade: string;
  amount: number;
  paymentMode: 'UPI' | 'NetBanking' | 'Cheque' | 'Cash';
  status: 'Success' | 'Pending Reconciliation';
  collectedBy: string;
}

export interface TimetableEntry {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  period: number;
  timeSlot: string;
  grade: string;
  section: string;
  subject: string;
  teacher: string;
  room: string;
  isSubstitute?: boolean;
}

export interface ExamReport {
  id: string;
  term: 'Periodic Test 1' | 'Term 1 Half-Yearly' | 'Periodic Test 2' | 'Annual Board Pre-Exam' | string;
  grade: string;
  section: string;
  subject: string;
  totalAppeared: number;
  averagePercentage: number;
  highestMarks: number;
  a1GradesCount: number;
  studentsNeedingRemedial: number;
  isPublished: boolean;
}

export interface FacilityAsset {
  id: string;
  name: string;
  type: 'Laboratories' | 'Classrooms' | 'Safety Systems' | 'Sanitation' | 'Sports Grounds' | string;
  location: string;
  capacity: string;
  lastInspectionDate: string;
  nextAuditDate: string;
  status: 'Operational' | 'Audit Due' | 'Maintenance Required' | string;
  inCharge: string;
}

export interface TransportRoute {
  id: string;
  routeNumber: string;
  routeName: string;
  vehicleNo: string;
  driverName: string;
  driverPhone: string;
  capacity: number;
  studentsEnrolled: number;
  fitnessCertExpiry: string;
  speedGovernorStatus: 'Active & Calibrated' | 'Pending Check' | string;
  status: 'On Route' | 'At Depot' | 'Maintenance' | string;
}

export interface LibraryBook {
  id: string;
  isbn: string;
  title: string;
  author: string;
  category: 'CBSE Reference' | 'Science & Math' | 'Literature & Fiction' | 'NCERT Textbooks' | 'General Knowledge' | string;
  totalCopies: number;
  availableCopies: number;
  issuedCopies: number;
  shelfLocation: string;
}
