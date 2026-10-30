// NABET Accreditation Standard for Quality School Governance – Fourth Edition, June 2025
// Type definitions for INFiSPARK School ERP NABET Module

export type NABETDomainId = 1 | 2 | 3;

export type NABETComplianceStatus = 
  | 'Fully Compliant' 
  | 'Substantially Compliant' 
  | 'Partially Compliant' 
  | 'In Progress' 
  | 'Action Required';

export type NABETEvidenceStatus = 
  | 'Verified' 
  | 'Under Review' 
  | 'Pending Review' 
  | 'Flagged / Needs Revision';

export type NABETCAPAType = 'Corrective' | 'Preventive' | 'Quality Enhancement';
export type NABETCAPAPriority = 'High' | 'Medium' | 'Low';
export type NABETCAPAStatus = 'Open' | 'In Progress' | 'Under Review' | 'Closed';

export interface NABETDomain {
  id: NABETDomainId;
  domainNumber: number;
  name: string;
  focus: string;
  standardsCount: number;
  parametersCount: number;
  complianceScore: number; // 0 - 100%
  maturityLevel: 'Level 1 (Initial)' | 'Level 2 (Ad-hoc)' | 'Level 3 (Defined/Stable)' | 'Level 4 (Dynamic)' | 'Level 5 (Benchmark)';
  verifiedEvidenceCount: number;
  pendingActionsCount: number;
  standardsRange: string;
  parametersRange: string;
}

export interface NABETStandard {
  id: string; // e.g. "std-1"
  domainId: NABETDomainId;
  standardNumber: number; // 1 to 14
  name: string;
  focus: string;
  parameterIds: number[];
  completionPct: number;
}

export interface NABETParameter {
  id: number; // 1 to 36
  parameterNumber: string; // e.g. "Param 1", "Param 12"
  standardId: string;
  standardNumber: number;
  domainId: NABETDomainId;
  title: string;
  officialRequirement: string;
  focusArea: string;
  guidanceNotes: string;
  leadOwner: string;
  leadDepartment: string;
  reviewer: string;
  selfAssessmentScore: number; // 1 to 5 scale
  complianceStatus: NABETComplianceStatus;
  evidenceDocsCount: number;
  verifiedEvidenceCount: number;
  lastReviewDate: string;
  nextAuditDate: string;
  linkedERPModule: string; // e.g. "Staff & HR", "Examinations", "Infrastructure", "CBSE Compliance", "Admissions"
  keyEvidenceTypes: string[];
  readinessPercentage: number;
  subRequirements: string[];
}

export interface NABETEvidence {
  id: string;
  parameterId: number;
  domainId: NABETDomainId;
  standardNumber: number;
  title: string;
  documentNo: string;
  category: 'Policy & SOP' | 'Meeting Minutes' | 'Statutory Certificate' | 'Academic Record' | 'Audit Report' | 'Student Portfolio' | 'Register / Logbook' | 'HR & Staff Record';
  version: string;
  uploadedBy: string;
  uploadDate: string;
  verificationStatus: NABETEvidenceStatus;
  verifiedBy?: string;
  verificationDate?: string;
  expiryDate?: string;
  fileSize: string;
  fileType: 'PDF' | 'DOCX' | 'XLSX' | 'IMAGE';
  notes: string;
  linkedERPRecord?: string;
}

export interface NABETImprovementAction {
  id: string;
  parameterId: number;
  parameterNumber: string;
  title: string;
  issueDescription: string;
  rootCauseAnalysis: {
    method: '5-Whys' | 'Fishbone' | 'Process-Audit';
    summary: string;
  };
  actionType: NABETCAPAType;
  priority: NABETCAPAPriority;
  assignedTo: string;
  department: string;
  targetDate: string;
  status: NABETCAPAStatus;
  progressPct: number;
  actionTakenReport?: string;
  closureDate?: string;
}

export interface NABETInternalAudit {
  id: string;
  auditCode: string;
  title: string;
  domainScope: NABETDomainId[];
  parametersAuditedCount: number;
  leadAuditor: string;
  auditTeam: string[];
  scheduledDate: string;
  completedDate?: string;
  status: 'Scheduled' | 'In Progress' | 'Completed';
  totalObservations: number;
  minorNCCount: number;
  majorNCCount: number;
  overallRatingPct: number;
  summaryFindings: string;
}

export interface NABETStakeholderFeedback {
  id: string;
  stakeholderType: 'Parents' | 'Students' | 'Faculty & Staff' | 'Community & Alumni';
  surveyCycle: string;
  respondentsCount: number;
  overallSatisfactionPct: number;
  benchmarkNSI: number; // Net Satisfaction Index
  keyStrengths: string[];
  identifiedGaps: string[];
  actionPlan: string;
  lastUpdated: string;
}

export interface NABETGovernanceCommittee {
  id: string;
  committeeName: string;
  chairperson: string;
  totalMembers: number;
  meetingFrequency: string;
  lastMeetingDate: string;
  nextMeetingDate: string;
  quorumMet: boolean;
  minutesDocNo: string;
  status: 'Active & Compliant' | 'Meeting Due' | 'Review Required';
}

export interface NABETQualityObjective {
  id: string;
  domainId: NABETDomainId;
  objective: string;
  baseline: string;
  target: string;
  currentProgress: string;
  kpiPct: number;
  owner: string;
  timeline: string;
  status: 'On Track' | 'Target Achieved' | 'Needs Attention';
}
