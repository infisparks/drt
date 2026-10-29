import { 
  UserProfile, 
  Student, 
  StaffMember, 
  ClassAttendanceSummary, 
  CBSEDocument, 
  PublicDisclosureRow, 
  SQAAFDomain, 
  SchoolImprovementAction, 
  ApprovalWorkflowItem, 
  FeeHead, 
  FeeTransaction, 
  TimetableEntry, 
  ExamReport, 
  FacilityAsset, 
  TransportRoute, 
  LibraryBook 
} from '../types';

export const CURRENT_SESSION = "2026-2027";
export const SCHOOL_INFO = {
  name: "DRT Knowledge Hub International School",
  tagline: "Proposed CBSE Affiliated Institution (Mumbra)",
  affiliationNo: "1130982 (Provisional Affiliation to Senior Secondary)",
  schoolCode: "30945",
  udiseCode: "27210804512",
  address: "Knowledge Hub Campus, Old Mumbai-Pune Road, Kausa, Mumbra, Thane - 400612, Maharashtra",
  phone: "+91 22 2549 8800 / +91 98201 44521",
  email: "principal@drtknowledgehub.edu.in",
  directorEmail: "director@drtknowledgehub.edu.in",
  website: "www.drtknowledgehub.edu.in",
  vendor: "InfiSpark Technologies LLP",
  established: 2014,
  campusArea: "8,500 Sq. Meters (2.1 Acres single compact campus)"
};

export const MOCK_USERS: UserProfile[] = [
  {
    id: "usr_dir",
    name: "Dr. A. R. Khan",
    role: "director",
    roleTitle: "Managing Director & Trustee",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    email: "director@drtknowledgehub.edu.in",
    department: "Executive Management"
  },
  {
    id: "usr_prin",
    name: "Mrs. Shabana Shaikh",
    role: "principal",
    roleTitle: "Principal (Head of Institution)",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    email: "principal@drtknowledgehub.edu.in",
    department: "School Administration"
  },
  {
    id: "usr_acad",
    name: "Mr. Rajesh Sharma",
    role: "academic",
    roleTitle: "Senior Academic Coordinator",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    email: "academic.coord@drtknowledgehub.edu.in",
    department: "Curriculum & Timetable"
  },
  {
    id: "usr_comp",
    name: "Adv. Farhana Qureshi",
    role: "compliance",
    roleTitle: "CBSE Compliance & Legal Officer",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200",
    email: "compliance@drtknowledgehub.edu.in",
    department: "CBSE & Statutory Regulatory Cell"
  },
  {
    id: "usr_acct",
    name: "Mr. Imran Siddiqui",
    role: "accounts",
    roleTitle: "Chief Finance & Accounts Officer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    email: "accounts@drtknowledgehub.edu.in",
    department: "Bursar & Finance Desk"
  }
];

export const MOCK_STUDENTS: Student[] = [
  {
    id: "std_01",
    admissionNo: "DRT-2024-0101",
    name: "Zaidan Tariq Ahmed",
    grade: "Class X",
    section: "A",
    rollNo: 1,
    gender: "Male",
    dob: "2009-04-12",
    fatherName: "Tariq Ahmed",
    motherName: "Fatima Ahmed",
    phone: "+91 98192 11044",
    email: "tariq.ahmed@gmail.com",
    address: "Flat 402, Al-Madina Heights, Kausa, Mumbra",
    status: "Active",
    feeStatus: "Paid",
    attendancePct: 94.5,
    house: "Blue Sapphire",
    bloodGroup: "O+",
    previousSchool: "St. Mary English School, Thane",
    tcIssued: false,
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "std_02",
    admissionNo: "DRT-2024-0102",
    name: "Ayesha Maryam Khan",
    grade: "Class X",
    section: "A",
    rollNo: 2,
    gender: "Female",
    dob: "2009-06-25",
    fatherName: "Javed Khan",
    motherName: "Sana Khan",
    phone: "+91 98203 55210",
    email: "javed.khan@yahoo.com",
    address: "B-201, Green Acres, Mumbra Station Road",
    status: "Active",
    feeStatus: "Paid",
    attendancePct: 91.2,
    house: "Red Ruby",
    bloodGroup: "B+",
    previousSchool: "Internal Promotion",
    tcIssued: false,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "std_03",
    admissionNo: "DRT-2024-0103",
    name: "Mohammed Arham Shaikh",
    grade: "Class XII",
    section: "Science",
    rollNo: 14,
    gender: "Male",
    dob: "2007-02-14",
    fatherName: "Mustafa Shaikh",
    motherName: "Farzana Shaikh",
    phone: "+91 97690 44321",
    email: "mustafa.shk@gmail.com",
    address: "304, Noor Palace, Shimla Park, Kausa",
    status: "Active",
    feeStatus: "Partial",
    attendancePct: 71.4, // Shortage warning!
    house: "Green Emerald",
    bloodGroup: "A+",
    previousSchool: "Internal Promotion",
    tcIssued: false,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "std_04",
    admissionNo: "DRT-2024-0104",
    name: "Aliza Rizwan Merchant",
    grade: "Class XII",
    section: "Commerce",
    rollNo: 5,
    gender: "Female",
    dob: "2007-09-08",
    fatherName: "Rizwan Merchant",
    motherName: "Shabana Merchant",
    phone: "+91 98211 77332",
    email: "merchant.r@rediffmail.com",
    address: "502, Crescent Tower, Kausa Bypass, Mumbra",
    status: "Active",
    feeStatus: "Paid",
    attendancePct: 88.6,
    house: "Yellow Topaz",
    bloodGroup: "AB+",
    previousSchool: "National High School, Kalwa",
    tcIssued: false,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "std_05",
    admissionNo: "DRT-2024-0105",
    name: "Kabir Devendra Sharma",
    grade: "Class IX",
    section: "B",
    rollNo: 18,
    gender: "Male",
    dob: "2010-11-19",
    fatherName: "Devendra Sharma",
    motherName: "Pooja Sharma",
    phone: "+91 98334 22901",
    email: "devendra.sharma@tcs.com",
    address: "Row House 12, Valley View, Shilphata Road",
    status: "Active",
    feeStatus: "Pending",
    attendancePct: 73.8, // Shortage alert for IX
    house: "Blue Sapphire",
    bloodGroup: "O-",
    previousSchool: "DAV International School",
    tcIssued: false,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "std_06",
    admissionNo: "DRT-2024-0106",
    name: "Sarah Danish Choudhary",
    grade: "Class VIII",
    section: "A",
    rollNo: 11,
    gender: "Female",
    dob: "2011-03-30",
    fatherName: "Danish Choudhary",
    motherName: "Nazia Choudhary",
    phone: "+91 98200 99482",
    email: "danish.c@hotmail.com",
    address: "A-102, Gulshan Enclave, Diva-Mumbra Road",
    status: "Active",
    feeStatus: "Paid",
    attendancePct: 96.0,
    house: "Red Ruby",
    bloodGroup: "B-",
    previousSchool: "Internal Promotion",
    tcIssued: false,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "std_07",
    admissionNo: "DRT-2024-0107",
    name: "Rehan Asif Sayed",
    grade: "Class XI",
    section: "Science",
    rollNo: 22,
    gender: "Male",
    dob: "2008-08-15",
    fatherName: "Asif Sayed",
    motherName: "Kulsum Sayed",
    phone: "+91 98920 33140",
    email: "asif.sayed@outlook.com",
    address: "C-403, Royal Classic, Amrut Nagar, Mumbra",
    status: "Active",
    feeStatus: "Overdue",
    attendancePct: 69.8, // Shortage critical
    house: "Green Emerald",
    bloodGroup: "A-",
    previousSchool: "Symbiosis Convent",
    tcIssued: false,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "std_08",
    admissionNo: "DRT-2024-0108",
    name: "Ananya Subhash Nair",
    grade: "Class VII",
    section: "B",
    rollNo: 7,
    gender: "Female",
    dob: "2012-07-21",
    fatherName: "Subhash Nair",
    motherName: "Radha Nair",
    phone: "+91 97699 11200",
    email: "subhash.nair@bhel.co.in",
    address: "D-11, Nilgiri Cooperative Housing, Kausa",
    status: "Active",
    feeStatus: "Paid",
    attendancePct: 92.5,
    house: "Yellow Topaz",
    bloodGroup: "O+",
    previousSchool: "Internal Promotion",
    tcIssued: false,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
  }
];

export const MOCK_STAFF: StaffMember[] = [
  {
    id: "stf_01",
    empCode: "DRT-EMP-001",
    name: "Mrs. Shabana Shaikh",
    role: "Administration",
    department: "Leadership",
    designation: "Principal",
    qualification: "M.A. (English), M.Ed., UGC-NET",
    experienceYears: 18,
    phone: "+91 98201 44521",
    email: "principal@drtknowledgehub.edu.in",
    joinDate: "2016-06-01",
    trainingHoursCompleted: 58, // Mandate met (>50)
    trainingCertExpiry: "2025-05-31",
    status: "Active",
    salary: 95000,
    serviceBookVerified: true,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "stf_02",
    empCode: "DRT-EMP-002",
    name: "Mr. Rajesh Sharma",
    role: "Teaching",
    department: "Senior Secondary (Sciences)",
    designation: "PGT Physics & Academic Coordinator",
    qualification: "M.Sc. (Physics), B.Ed.",
    experienceYears: 14,
    phone: "+91 98190 23411",
    email: "r.sharma@drtknowledgehub.edu.in",
    joinDate: "2017-07-15",
    trainingHoursCompleted: 52,
    trainingCertExpiry: "2025-06-30",
    status: "Active",
    salary: 68000,
    serviceBookVerified: true,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "stf_03",
    empCode: "DRT-EMP-003",
    name: "Dr. Naseem Bano",
    role: "Teaching",
    department: "Senior Secondary (Sciences)",
    designation: "PGT Chemistry",
    qualification: "Ph.D., M.Sc. (Organic Chemistry), B.Ed.",
    experienceYears: 11,
    phone: "+91 98214 77800",
    email: "n.bano@drtknowledgehub.edu.in",
    joinDate: "2018-06-10",
    trainingHoursCompleted: 44, // In progress
    trainingCertExpiry: "2025-08-15",
    status: "Active",
    salary: 62000,
    serviceBookVerified: true,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "stf_04",
    empCode: "DRT-EMP-004",
    name: "Mr. Amitav Mukherjee",
    role: "Teaching",
    department: "Secondary",
    designation: "TGT Mathematics",
    qualification: "M.Sc. (Maths), B.Ed., CTET Qualified",
    experienceYears: 9,
    phone: "+91 97693 55112",
    email: "a.mukherjee@drtknowledgehub.edu.in",
    joinDate: "2019-04-01",
    trainingHoursCompleted: 50,
    trainingCertExpiry: "2025-04-30",
    status: "Active",
    salary: 52000,
    serviceBookVerified: true,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "stf_05",
    empCode: "DRT-EMP-005",
    name: "Ms. Tasneem Merchant",
    role: "Teaching",
    department: "Secondary",
    designation: "TGT English & HOD Languages",
    qualification: "M.A. (English Lit), B.Ed.",
    experienceYears: 12,
    phone: "+91 98205 11993",
    email: "t.merchant@drtknowledgehub.edu.in",
    joinDate: "2018-09-01",
    trainingHoursCompleted: 54,
    trainingCertExpiry: "2025-09-30",
    status: "Active",
    salary: 54000,
    serviceBookVerified: true,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "stf_06",
    empCode: "DRT-EMP-006",
    name: "Mrs. Meenakshi Iyer",
    role: "Student Support",
    department: "Counseling & Wellness",
    designation: "Full-Time Wellness Counselor",
    qualification: "M.A. (Clinical Psychology), RCI Registered",
    experienceYears: 8,
    phone: "+91 98198 44001",
    email: "counselor@drtknowledgehub.edu.in",
    joinDate: "2020-01-15",
    trainingHoursCompleted: 50,
    trainingCertExpiry: "2025-07-20",
    status: "Active",
    salary: 48000,
    serviceBookVerified: true,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "stf_07",
    empCode: "DRT-EMP-007",
    name: "Mr. Zuber Mansoori",
    role: "Support",
    department: "Library & Information Science",
    designation: "Librarian",
    qualification: "M.Lib.Sc., B.Ed.",
    experienceYears: 7,
    phone: "+91 98670 22134",
    email: "library@drtknowledgehub.edu.in",
    joinDate: "2021-03-01",
    trainingHoursCompleted: 42,
    trainingCertExpiry: "2025-10-15",
    status: "Active",
    salary: 38000,
    serviceBookVerified: true,
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200"
  }
];

export const MOCK_ATTENDANCE_SUMMARY: ClassAttendanceSummary[] = [
  { grade: "Class XII", section: "Sci", totalStudents: 38, present: 33, absent: 4, late: 1, attendanceRate: 86.8, classTeacher: "Mr. Rajesh Sharma", shortageCount: 3 },
  { grade: "Class XII", section: "Comm", totalStudents: 42, present: 39, absent: 2, late: 1, attendanceRate: 92.8, classTeacher: "Mrs. Fatima Q.", shortageCount: 1 },
  { grade: "Class XI", section: "Sci", totalStudents: 45, present: 39, absent: 5, late: 1, attendanceRate: 86.6, classTeacher: "Dr. Naseem Bano", shortageCount: 4 },
  { grade: "Class XI", section: "Comm", totalStudents: 40, present: 37, absent: 2, late: 1, attendanceRate: 92.5, classTeacher: "Mr. Danish M.", shortageCount: 2 },
  { grade: "Class X", section: "A", totalStudents: 44, present: 42, absent: 1, late: 1, attendanceRate: 95.4, classTeacher: "Ms. Tasneem Merchant", shortageCount: 1 },
  { grade: "Class X", section: "B", totalStudents: 43, present: 41, absent: 2, late: 0, attendanceRate: 95.3, classTeacher: "Mr. Amitav Mukherjee", shortageCount: 0 },
  { grade: "Class IX", section: "A", totalStudents: 46, present: 42, absent: 3, late: 1, attendanceRate: 91.3, classTeacher: "Mrs. S. Parveen", shortageCount: 2 },
  { grade: "Class IX", section: "B", totalStudents: 45, present: 40, absent: 4, late: 1, attendanceRate: 88.9, classTeacher: "Mr. Sunil Varma", shortageCount: 3 },
  { grade: "Class VIII", section: "A", totalStudents: 48, present: 46, absent: 2, late: 0, attendanceRate: 95.8, classTeacher: "Mrs. N. Joshi", shortageCount: 0 },
  { grade: "Class VII", section: "A", totalStudents: 47, present: 45, absent: 1, late: 1, attendanceRate: 95.7, classTeacher: "Mrs. A. Khan", shortageCount: 0 }
];

export const MOCK_CBSE_DOCUMENTS: CBSEDocument[] = [
  {
    id: "doc_01",
    category: "Safety & Infrastructure",
    title: "Fire Safety Certificate (NOC)",
    certNumber: "TMC/CFO/FIRE/NOC-2023/8892",
    issuingAuthority: "Chief Fire Officer, Thane Municipal Corporation (TMC)",
    issueDate: "2023-11-15",
    expiryDate: "2024-11-14",
    status: "Expiring Soon",
    daysRemaining: 18,
    assignedOfficer: "Adv. Farhana Qureshi",
    fileSize: "2.4 MB (PDF Signed)",
    version: "v2.1 (Renewal in process)",
    notes: "Mandatory for CBSE Appendix IX and annual compliance audit. Renewal application filed under TMC ref 99420."
  },
  {
    id: "doc_02",
    category: "Safety & Infrastructure",
    title: "Building Safety & Structural Stability Certificate",
    certNumber: "PWD/THANE/EE/ST-2022/410",
    issuingAuthority: "Executive Engineer, Public Works Department (PWD), Govt. of Maharashtra",
    issueDate: "2022-12-01",
    expiryDate: "2027-11-30",
    status: "Valid",
    daysRemaining: 1120,
    assignedOfficer: "Mr. Imran Siddiqui",
    fileSize: "3.8 MB (Scanned Blueprint)",
    version: "v1.0",
    notes: "Structural stability confirmed for G+4 school building structure as per NBC 2016 standards."
  },
  {
    id: "doc_03",
    category: "Safety & Infrastructure",
    title: "Safe Drinking Water & Sanitation Certificate",
    certNumber: "TMC/HEALTH/SAN/2024/1102",
    issuingAuthority: "Medical Health Officer, Thane Municipal Corporation (TMC)",
    issueDate: "2024-04-10",
    expiryDate: "2025-04-09",
    status: "Valid",
    daysRemaining: 164,
    assignedOfficer: "Adv. Farhana Qureshi",
    fileSize: "1.2 MB",
    version: "v3.0",
    notes: "Water sample bacteriologically tested at Regional Public Health Laboratory, Thane."
  },
  {
    id: "doc_04",
    category: "Affiliation & Approvals",
    title: "CBSE Extension of General Affiliation Letter",
    certNumber: "CBSE/AFF/1130982/EX-02214-2425/2024",
    issuingAuthority: "Central Board of Secondary Education (CBSE), New Delhi",
    issueDate: "2023-05-18",
    expiryDate: "2028-03-31",
    status: "Valid",
    daysRemaining: 1250,
    assignedOfficer: "Mrs. Shabana Shaikh",
    fileSize: "4.1 MB (Digital CBSE Stamp)",
    version: "v2.0",
    notes: "Affiliation granted up to Senior Secondary Level (Science & Commerce Streams)."
  },
  {
    id: "doc_05",
    category: "Affiliation & Approvals",
    title: "Government of Maharashtra Recognition (RTE Act)",
    certNumber: "DEO/THANE/PRI/RECOG/2022/771",
    issuingAuthority: "District Education Officer (Primary & Secondary), Zilla Parishad Thane",
    issueDate: "2022-08-01",
    expiryDate: "2025-07-31",
    status: "Valid",
    daysRemaining: 277,
    assignedOfficer: "Adv. Farhana Qureshi",
    fileSize: "1.9 MB",
    version: "v1.2",
    notes: "Unconditional recognition under Section 18 of RTE Act 2009 for Classes I to VIII."
  },
  {
    id: "doc_06",
    category: "Affiliation & Approvals",
    title: "Land Certificate & Possession Verification",
    certNumber: "SDO/THANE/REV/LAND-2015/09",
    issuingAuthority: "Sub-Divisional Officer & Competent Land Authority, Thane",
    issueDate: "2015-06-12",
    expiryDate: "Permanent (Freehold)",
    status: "Valid",
    daysRemaining: 9999,
    assignedOfficer: "Dr. A. R. Khan",
    fileSize: "5.6 MB",
    version: "v1.0",
    notes: "Single compact campus of 2.1 Acres (8,500 sq.m) surrounded by 6ft boundary wall with no public thoroughfare."
  },
  {
    id: "doc_07",
    category: "Staff & Management",
    title: "School Management Committee (SMC) Approved Constitution",
    certNumber: "DRT/SMC/CON-2024/01",
    issuingAuthority: "DRT Knowledge Hub Trust & CBSE Nominees",
    issueDate: "2024-04-01",
    expiryDate: "2027-03-31",
    status: "Valid",
    daysRemaining: 885,
    assignedOfficer: "Mrs. Shabana Shaikh",
    fileSize: "1.5 MB",
    version: "v2.0",
    notes: "Comprises 15 members: 2 parents, 2 teachers, 2 CBSE principals, 2 women, 1 educationist."
  },
  {
    id: "doc_08",
    category: "Financial & General",
    title: "Parents Teachers Association (PTA) Executive Body & Fee Approval",
    certNumber: "DRT/PTA/MINUTES/2024-25/03",
    issuingAuthority: "Executive Committee of PTA, DRT Mumbra",
    issueDate: "2024-03-28",
    expiryDate: "2025-03-31",
    status: "Valid",
    daysRemaining: 155,
    assignedOfficer: "Mr. Imran Siddiqui",
    fileSize: "2.1 MB",
    version: "v1.0",
    notes: "Fee structure for academic session 2024-25 approved with two-thirds majority as per Maharashtra Educational Institutions Act."
  },
  {
    id: "doc_09",
    category: "Academics & Curricular",
    title: "Prescribed Books & Curriculum Declaration",
    certNumber: "DRT/ACAD/NCERT-DECL/2024",
    issuingAuthority: "Principal & Manager, DRT Knowledge Hub",
    issueDate: "2024-04-01",
    expiryDate: "2025-03-31",
    status: "Valid",
    daysRemaining: 155,
    assignedOfficer: "Mr. Rajesh Sharma",
    fileSize: "980 KB",
    version: "v1.0",
    notes: "Declaration that school strictly follows NCERT/CBSE curriculum and no objectionable content is taught."
  },
  {
    id: "doc_10",
    category: "Staff & Management",
    title: "Annual Teacher 50-Hour Training Portfolio (CBSE Mandate)",
    certNumber: "CBSE/COE/PUNE/TRG-SUMMARY/2024",
    issuingAuthority: "CBSE Centre of Excellence (COE Pune) & DIKSHA",
    issueDate: "2024-09-30",
    expiryDate: "2025-03-31",
    status: "Expiring Soon",
    daysRemaining: 155,
    assignedOfficer: "Mrs. Shabana Shaikh",
    fileSize: "3.2 MB",
    version: "v1.4",
    notes: "34 out of 38 teachers have achieved >40 hours. 4 teachers scheduled for upcoming COE sessions in Nov."
  }
];

export const MOCK_PUBLIC_DISCLOSURE_ROWS: PublicDisclosureRow[] = [
  // SECTION A: GENERAL INFORMATION
  { slNo: 1, section: "A. GENERAL INFORMATION", information: "NAME OF THE SCHOOL", details: "DRT KNOWLEDGE HUB INTERNATIONAL SCHOOL", isCompliant: true, lastUpdated: "2024-04-15" },
  { slNo: 2, section: "A. GENERAL INFORMATION", information: "AFFILIATION NO. (IF APPLICABLE)", details: "1130982", isCompliant: true, lastUpdated: "2024-04-15" },
  { slNo: 3, section: "A. GENERAL INFORMATION", information: "SCHOOL CODE (IF APPLICABLE)", details: "30945", isCompliant: true, lastUpdated: "2024-04-15" },
  { slNo: 4, section: "A. GENERAL INFORMATION", information: "COMPLETE ADDRESS WITH PIN CODE", details: "Knowledge Hub Campus, Old Mumbai-Pune Road, Kausa, Mumbra, Thane - 400612", isCompliant: true, lastUpdated: "2024-04-15" },
  { slNo: 5, section: "A. GENERAL INFORMATION", information: "PRINCIPAL NAME & QUALIFICATION", details: "Mrs. Shabana Shaikh, M.A. (English), M.Ed., UGC-NET", isCompliant: true, lastUpdated: "2024-04-15" },
  { slNo: 6, section: "A. GENERAL INFORMATION", information: "SCHOOL EMAIL ID", details: "principal@drtknowledgehub.edu.in", isCompliant: true, lastUpdated: "2024-04-15" },
  { slNo: 7, section: "A. GENERAL INFORMATION", information: "CONTACT DETAILS (LANDLINE/MOBILE)", details: "+91 22 2549 8800 / +91 98201 44521", isCompliant: true, lastUpdated: "2024-04-15" },
  
  // SECTION B: DOCUMENTS AND INFORMATION
  { slNo: 8, section: "B. DOCUMENTS AND INFORMATION", information: "COPIES OF AFFILIATION/UPGRADATION LETTER AND RECENT EXTENSION OF AFFILIATION", details: "Valid up to 31/03/2028 (Senior Secondary)", documentLinkText: "View Affiliation Letter (PDF)", isCompliant: true, lastUpdated: "2024-05-18" },
  { slNo: 9, section: "B. DOCUMENTS AND INFORMATION", information: "COPIES OF SOCIETIES/TRUST/COMPANY REGISTRATION/RENEWAL CERTIFICATE", details: "DRT Knowledge Hub Educational Trust Reg. No. E-4482/Thane", documentLinkText: "View Trust Deed (PDF)", isCompliant: true, lastUpdated: "2024-04-10" },
  { slNo: 10, section: "B. DOCUMENTS AND INFORMATION", information: "COPY OF NO OBJECTION CERTIFICATE (NOC) ISSUED BY THE STATE GOVT.", details: "NOC No. NOC-4015/C.R.89/SE-3, School Education Dept., Mantralaya, Mumbai", documentLinkText: "View State Govt NOC (PDF)", isCompliant: true, lastUpdated: "2024-04-10" },
  { slNo: 11, section: "B. DOCUMENTS AND INFORMATION", information: "COPIES OF RECOGNITION CERTIFICATE UNDER RTE ACT, 2009", details: "DEO/THANE/PRI/RECOG/2022/771 valid till 31/07/2025", documentLinkText: "View RTE Recognition (PDF)", isCompliant: true, lastUpdated: "2024-04-10" },
  { slNo: 12, section: "B. DOCUMENTS AND INFORMATION", information: "COPY OF VALID BUILDING SAFETY CERTIFICATE AS PER THE NATIONAL BUILDING CODE", details: "PWD/THANE/EE/ST-2022/410 valid till 30/11/2027", documentLinkText: "View Building Safety Cert (PDF)", isCompliant: true, lastUpdated: "2024-04-10" },
  { slNo: 13, section: "B. DOCUMENTS AND INFORMATION", information: "COPY OF VALID FIRE SAFETY CERTIFICATE ISSUED BY THE COMPETENT AUTHORITY", details: "TMC/CFO/FIRE/NOC-2023/8892 (Renewal Filed under ref 99420)", documentLinkText: "View Fire Safety NOC (PDF)", isCompliant: true, lastUpdated: "2024-10-20" },
  { slNo: 14, section: "B. DOCUMENTS AND INFORMATION", information: "COPY OF THE DEO CERTIFICATE SUBMITTED BY THE SCHOOL FOR AFFILIATION", details: "Self-Certification Proforma verified by Education Officer Thane", documentLinkText: "View Self-Certification (PDF)", isCompliant: true, lastUpdated: "2024-04-10" },
  { slNo: 15, section: "B. DOCUMENTS AND INFORMATION", information: "COPIES OF VALID WATER, HEALTH AND SANITATION CERTIFICATES", details: "TMC/HEALTH/SAN/2024/1102 valid till 09/04/2025", documentLinkText: "View Water & Sanitation (PDF)", isCompliant: true, lastUpdated: "2024-04-15" },

  // SECTION C: RESULT AND ACADEMICS
  { slNo: 16, section: "C. RESULT AND ACADEMICS", information: "FEE STRUCTURE OF THE SCHOOL", details: "Approved by PTA Executive Committee for AY 2024-25", documentLinkText: "View Approved Fee Structure (PDF)", isCompliant: true, lastUpdated: "2024-03-28" },
  { slNo: 17, section: "C. RESULT AND ACADEMICS", information: "ANNUAL ACADEMIC CALENDER", details: "Academic Calendar with 220 working days, exam dates & activities", documentLinkText: "View Academic Calendar 2024-25 (PDF)", isCompliant: true, lastUpdated: "2024-04-01" },
  { slNo: 18, section: "C. RESULT AND ACADEMICS", information: "LIST OF SCHOOL MANAGEMENT COMMITTEE (SMC)", details: "Constitutional body of 15 members with parent/teacher/CBSE nominees", documentLinkText: "View SMC Members List (PDF)", isCompliant: true, lastUpdated: "2024-04-01" },
  { slNo: 19, section: "C. RESULT AND ACADEMICS", information: "LIST OF PARENTS TEACHERS ASSOCIATION (PTA) MEMBERS", details: "PTA Executive Council formed under Maharashtra Act 2011", documentLinkText: "View PTA Executive List (PDF)", isCompliant: true, lastUpdated: "2024-04-05" },
  { slNo: 20, section: "C. RESULT AND ACADEMICS", information: "LAST THREE-YEAR RESULT OF THE BOARD EXAMINATION (CLASS X & XII)", details: "Class X (2024): 100% Pass | Class XII (2024): 98.4% Pass (Highest 97.2%)", documentLinkText: "View 3-Year Board Result Summary (PDF)", isCompliant: true, lastUpdated: "2024-05-20" },

  // SECTION D: STAFF (TEACHING)
  { slNo: 21, section: "D. STAFF (TEACHING)", information: "PRINCIPAL", details: "1", isCompliant: true, lastUpdated: "2024-04-10" },
  { slNo: 22, section: "D. STAFF (TEACHING)", information: "TOTAL NO. OF TEACHERS", details: "38 (PGT: 8, TGT: 16, PRT: 14)", isCompliant: true, lastUpdated: "2024-04-10" },
  { slNo: 23, section: "D. STAFF (TEACHING)", information: "TEACHERS SECTION RATIO", details: "1 : 1.5", isCompliant: true, lastUpdated: "2024-04-10" },
  { slNo: 24, section: "D. STAFF (TEACHING)", information: "DETAILS OF SPECIAL EDUCATOR", details: "Mrs. Sana Ansari, B.Ed. in Special Education (RCI Reg No. CRR-A88219)", isCompliant: true, lastUpdated: "2024-04-10" },
  { slNo: 25, section: "D. STAFF (TEACHING)", information: "DETAILS OF COUNSELLOR AND WELLNESS TEACHER", details: "Mrs. Meenakshi Iyer, M.A. Clinical Psychology", isCompliant: true, lastUpdated: "2024-04-10" },

  // SECTION E: SCHOOL INFRASTRUCTURE
  { slNo: 26, section: "E. SCHOOL INFRASTRUCTURE", information: "TOTAL CAMPUS AREA OF THE SCHOOL (IN SQUARE MTRS)", details: "8,500 Sq. Mtrs (2.1 Acres)", isCompliant: true, lastUpdated: "2024-04-10" },
  { slNo: 27, section: "E. SCHOOL INFRASTRUCTURE", information: "NO. AND SIZE OF THE CLASS ROOMS (IN SQ MTR)", details: "42 Classrooms (52.5 Sq. Mtrs each - compliant with 40-student norm)", isCompliant: true, lastUpdated: "2024-04-10" },
  { slNo: 28, section: "E. SCHOOL INFRASTRUCTURE", information: "NO. AND SIZE OF LABORATORIES INCLUDING COMPUTER LABS (IN SQ MTR)", details: "6 Labs (Physics 75 sq.m, Chem 75 sq.m, Bio 75 sq.m, Comp 100 sq.m, Math 55 sq.m, AI 70 sq.m)", isCompliant: true, lastUpdated: "2024-04-10" },
  { slNo: 29, section: "E. SCHOOL INFRASTRUCTURE", information: "INTERNET FACILITY (YES/NO)", details: "YES (Dedicated Leased Line 200 Mbps Fiber, Firewall Protected)", isCompliant: true, lastUpdated: "2024-04-10" },
  { slNo: 30, section: "E. SCHOOL INFRASTRUCTURE", information: "NO. OF GIRLS TOILETS & BOYS TOILETS", details: "Girls Toilets: 28 | Boys Toilets: 26 | CWSN Disabled Toilets: 4", isCompliant: true, lastUpdated: "2024-04-10" },
  { slNo: 31, section: "E. SCHOOL INFRASTRUCTURE", information: "LINK OF YOUTUBE VIDEO OF THE INSPECTION OF SCHOOL COVERING THE INFRASTRUCTURE", details: "https://www.youtube.com/watch?v=drt-mumbra-campus-inspection", documentLinkText: "Open Campus Walkthrough Video", isCompliant: true, lastUpdated: "2024-04-10" }
];

export const MOCK_SQAAF_DOMAINS: SQAAFDomain[] = [
  {
    id: 1,
    name: "Domain 1: Curriculum, Pedagogy and Assessment",
    description: "Annual curriculum planning, experiential learning, learning outcomes, art integration, competency-based assessments and remedial structures.",
    standardsCount: 24,
    achievedCount: 21,
    scorePercentage: 87.5,
    level: "Proficient",
    leadOwner: "Mr. Rajesh Sharma (Academic Coordinator)",
    evidenceDocsCount: 48
  },
  {
    id: 2,
    name: "Domain 2: Infrastructure - Physical and Digital",
    description: "Barrier-free access, safe drinking water, composite science labs, libraries, smart classrooms, sports arenas and emergency safety drills.",
    standardsCount: 18,
    achievedCount: 17,
    scorePercentage: 94.4,
    level: "Exemplary",
    leadOwner: "Adv. Farhana Qureshi (Facilities & Legal)",
    evidenceDocsCount: 36
  },
  {
    id: 3,
    name: "Domain 3: Human Resources",
    description: "Recruitment norms as per CBSE, staff welfare, 50-hour mandatory teacher professional development, performance appraisals and service records.",
    standardsCount: 16,
    achievedCount: 14,
    scorePercentage: 87.5,
    level: "Proficient",
    leadOwner: "Mrs. Shabana Shaikh (Principal)",
    evidenceDocsCount: 32
  },
  {
    id: 4,
    name: "Domain 4: Inclusive Practices",
    description: "Equal opportunities for Children With Special Needs (CWSN), ramps & tactile paths, resource room, specialized counselor and gender sensitization.",
    standardsCount: 12,
    achievedCount: 10,
    scorePercentage: 83.3,
    level: "Proficient",
    leadOwner: "Mrs. Sana Ansari (Special Educator)",
    evidenceDocsCount: 22
  },
  {
    id: 5,
    name: "Domain 5: Management and Governance",
    description: "SMC meetings, PTA coordination, paperless transparency, financial audits, fee regulatory compliance and administrative record keeping.",
    standardsCount: 15,
    achievedCount: 15,
    scorePercentage: 100.0,
    level: "Exemplary",
    leadOwner: "Dr. A. R. Khan (Director) & Mr. Imran Siddiqui",
    evidenceDocsCount: 40
  },
  {
    id: 6,
    name: "Domain 6: Leadership",
    description: "Strategic school vision, institutional growth plans, student council empowerment, pedagogical leadership and mentorship culture.",
    standardsCount: 14,
    achievedCount: 13,
    scorePercentage: 92.8,
    level: "Exemplary",
    leadOwner: "Mrs. Shabana Shaikh (Principal)",
    evidenceDocsCount: 28
  },
  {
    id: 7,
    name: "Domain 7: Beneficiary Satisfaction",
    description: "Stakeholder feedback mechanisms (Parents, Alumni, Students, Community), transparent grievance redressal cell and alumni connect.",
    standardsCount: 10,
    achievedCount: 8,
    scorePercentage: 80.0,
    level: "Proficient",
    leadOwner: "Adv. Farhana Qureshi (Grievance Head)",
    evidenceDocsCount: 18
  }
];

export const MOCK_IMPROVEMENT_ACTIONS: SchoolImprovementAction[] = [
  {
    id: "SIP-2024-01",
    domainId: 1,
    title: "Implement Experiential Learning Labs for Classes VI to VIII",
    objective: "Upgrade science and math pedagogy with hands-on NEP 2020 DIY kits and weekly activity periods.",
    leadOwner: "Mr. Rajesh Sharma",
    targetDate: "2024-12-15",
    priority: "High",
    status: "In Progress",
    progressPct: 75,
    kpiMeasure: "100% students submitting experiential activity logs"
  },
  {
    id: "SIP-2024-02",
    domainId: 3,
    title: "Achieve 100% Staff Completion of 50-Hour CBSE Training Mandate",
    objective: "Register remaining 4 junior teachers on DIKSHA & CBSE COE portal before Term II closure.",
    leadOwner: "Mrs. Shabana Shaikh",
    targetDate: "2025-01-30",
    priority: "High",
    status: "In Progress",
    progressPct: 88,
    kpiMeasure: "All 38 teachers verified with COE completion certificates"
  },
  {
    id: "SIP-2024-03",
    domainId: 4,
    title: "Establish Sensory Resource Room for Inclusive Education",
    objective: "Equip dedicated 300 sq.ft room with auditory/visual sensory integration therapy materials for CWSN students.",
    leadOwner: "Mrs. Sana Ansari",
    targetDate: "2025-02-28",
    priority: "Medium",
    status: "In Progress",
    progressPct: 50,
    kpiMeasure: "Resource room operational with timetable slots"
  },
  {
    id: "SIP-2024-04",
    domainId: 2,
    title: "Complete Fire Safety NOC Renewal with TMC",
    objective: "Conduct mandatory third-party hydrants inspection and obtain endorsement seal from TMC Fire HQ.",
    leadOwner: "Adv. Farhana Qureshi",
    targetDate: "2024-11-14",
    priority: "High",
    status: "Pending Review",
    progressPct: 90,
    kpiMeasure: "Renewed Fire NOC uploaded to Appendix IX portal"
  }
];

export const MOCK_APPROVAL_WORKFLOWS: ApprovalWorkflowItem[] = [
  {
    id: "REQ-2024-881",
    type: "Leave Application",
    title: "Casual Leave Request (3 Days) - Medical Consultation",
    submittedBy: "Mr. Amitav Mukherjee (TGT Maths)",
    department: "Secondary Department",
    submittedDate: "2024-10-26",
    priority: "Standard",
    status: "Pending Principal Approval",
    details: "Requested leave from 28th to 30th Oct. Class X-B syllabus substitution arranged with Mr. Rajesh Sharma.",
    attachmentsCount: 1
  },
  {
    id: "REQ-2024-882",
    type: "Purchase Requisition",
    title: "Procurement of CBSE Chemistry Board Practical Reagents & Glassware",
    submittedBy: "Dr. Naseem Bano (PGT Chemistry)",
    department: "Science Department",
    submittedDate: "2024-10-25",
    priority: "Urgent",
    amount: 34500,
    status: "Pending Director Approval",
    details: "Essential chemicals and titration burettes for Class XII Board Practical Examinations 2025. 3 vendor quotations attached.",
    attachmentsCount: 3
  },
  {
    id: "REQ-2024-883",
    type: "Transfer Certificate",
    title: "Issue of Transfer Certificate - Family Relocating to Dubai",
    submittedBy: "Tariq Merchant (Parent of Aman Merchant, Class VII-A)",
    department: "Student Administration",
    submittedDate: "2024-10-24",
    priority: "Standard",
    status: "Pending Principal Approval",
    details: "No Dues certificate cleared by Accounts, Library and Science Lab. TC draft verified for generation.",
    attachmentsCount: 2
  },
  {
    id: "REQ-2024-884",
    type: "Fee Concession",
    title: "Staff Ward 50% Tuition Fee Concession - Academic Year 2024-25",
    submittedBy: "Mr. Zuber Mansoori (Librarian)",
    department: "Accounts Desk",
    submittedDate: "2024-10-22",
    priority: "Standard",
    amount: 22000,
    status: "Pending Director Approval",
    details: "Child enrolled in Class IV-A. Trust policy permits 50% waiver on tuition fees for permanent staff wards.",
    attachmentsCount: 1
  },
  {
    id: "REQ-2024-885",
    type: "Event Permission",
    title: "Inter-School CBSE Sahodaya Science Exhibition 2024",
    submittedBy: "Mr. Rajesh Sharma (Academic Coord)",
    department: "Curricular & Events",
    submittedDate: "2024-10-20",
    priority: "Urgent",
    amount: 18000,
    status: "Approved",
    details: "Delegation of 12 students and 2 teachers to represent DRT Knowledge Hub at Mumbai Sahodaya Cluster Meet.",
    attachmentsCount: 2
  }
];

export const MOCK_FEE_HEADS: FeeHead[] = [
  { grade: "Pre-Primary (Nursery - KG)", tuitionFee: 32000, termFee: 6000, computerFee: 2000, annualCharges: 8000, totalAnnual: 48000 },
  { grade: "Primary (Class I - V)", tuitionFee: 36000, termFee: 7000, computerFee: 3000, annualCharges: 9000, totalAnnual: 55000 },
  { grade: "Middle (Class VI - VIII)", tuitionFee: 40000, termFee: 8000, computerFee: 4000, annualCharges: 10000, totalAnnual: 62000 },
  { grade: "Secondary (Class IX - X)", tuitionFee: 46000, termFee: 9000, computerFee: 5000, annualCharges: 12000, totalAnnual: 72000 },
  { grade: "Sr. Secondary Science (XI - XII)", tuitionFee: 56000, termFee: 12000, computerFee: 6000, annualCharges: 14000, totalAnnual: 88000 },
  { grade: "Sr. Secondary Commerce (XI - XII)", tuitionFee: 50000, termFee: 10000, computerFee: 5000, annualCharges: 13000, totalAnnual: 78000 }
];

export const MOCK_FEE_TRANSACTIONS: FeeTransaction[] = [
  { receiptNo: "REC-2024-4190", date: "2024-10-27 10:15 AM", studentName: "Zaidan Tariq Ahmed", admissionNo: "DRT-2024-0101", grade: "Class X-A", amount: 18000, paymentMode: "UPI", status: "Success", collectedBy: "Online Gateway (HDFC)" },
  { receiptNo: "REC-2024-4189", date: "2024-10-27 09:40 AM", studentName: "Ayesha Maryam Khan", admissionNo: "DRT-2024-0102", grade: "Class X-A", amount: 18000, paymentMode: "NetBanking", status: "Success", collectedBy: "Online Gateway (ICICI)" },
  { receiptNo: "REC-2024-4188", date: "2024-10-26 03:10 PM", studentName: "Sarah Danish Choudhary", admissionNo: "DRT-2024-0106", grade: "Class VIII-A", amount: 15500, paymentMode: "Cheque", status: "Success", collectedBy: "Mr. Imran Siddiqui" },
  { receiptNo: "REC-2024-4187", date: "2024-10-26 11:20 AM", studentName: "Ananya Subhash Nair", admissionNo: "DRT-2024-0108", grade: "Class VII-B", amount: 15500, paymentMode: "UPI", status: "Success", collectedBy: "Online Gateway (HDFC)" },
  { receiptNo: "REC-2024-4186", date: "2024-10-25 02:45 PM", studentName: "Mohammed Arham Shaikh", admissionNo: "DRT-2024-0103", grade: "Class XII-Sci", amount: 22000, paymentMode: "Cash", status: "Success", collectedBy: "Accounts Counter 1" }
];

export const MOCK_TIMETABLE: TimetableEntry[] = [
  { id: "tt_01", day: "Monday", period: 1, timeSlot: "08:00 AM - 08:45 AM", grade: "Class X", section: "A", subject: "Physics", teacher: "Mr. Rajesh Sharma", room: "Lab 2" },
  { id: "tt_02", day: "Monday", period: 2, timeSlot: "08:45 AM - 09:30 AM", grade: "Class X", section: "A", subject: "Mathematics", teacher: "Mr. Amitav Mukherjee", room: "Room 204" },
  { id: "tt_03", day: "Monday", period: 3, timeSlot: "09:30 AM - 10:15 AM", grade: "Class X", section: "A", subject: "English Literature", teacher: "Ms. Tasneem Merchant", room: "Room 204" },
  { id: "tt_04", day: "Monday", period: 4, timeSlot: "10:35 AM - 11:20 AM", grade: "Class X", section: "A", subject: "Chemistry", teacher: "Dr. Naseem Bano", room: "Lab 3" },
  { id: "tt_05", day: "Monday", period: 5, timeSlot: "11:20 AM - 12:05 PM", grade: "Class X", section: "A", subject: "Social Science", teacher: "Mrs. N. Joshi", room: "Room 204" },
  { id: "tt_06", day: "Monday", period: 6, timeSlot: "12:05 PM - 12:50 PM", grade: "Class X", section: "A", subject: "Artificial Intelligence", teacher: "Mr. Farhan Q.", room: "Computer Lab" }
];

export const MOCK_EXAM_REPORTS: ExamReport[] = [
  { id: "ex_01", term: "Term 1 Half-Yearly", grade: "Class X", section: "A", subject: "Mathematics", totalAppeared: 44, averagePercentage: 76.8, highestMarks: 99, a1GradesCount: 14, studentsNeedingRemedial: 4, isPublished: true },
  { id: "ex_02", term: "Term 1 Half-Yearly", grade: "Class X", section: "A", subject: "Science (Phy/Chem/Bio)", totalAppeared: 44, averagePercentage: 81.2, highestMarks: 98, a1GradesCount: 16, studentsNeedingRemedial: 2, isPublished: true },
  { id: "ex_03", term: "Term 1 Half-Yearly", grade: "Class XII", section: "Science", subject: "Physics", totalAppeared: 38, averagePercentage: 72.4, highestMarks: 96, a1GradesCount: 9, studentsNeedingRemedial: 6, isPublished: true },
  { id: "ex_04", term: "Term 1 Half-Yearly", grade: "Class XII", section: "Science", subject: "Chemistry", totalAppeared: 38, averagePercentage: 74.0, highestMarks: 97, a1GradesCount: 11, studentsNeedingRemedial: 5, isPublished: true },
  { id: "ex_05", term: "Term 1 Half-Yearly", grade: "Class XII", section: "Commerce", subject: "Accountancy", totalAppeared: 42, averagePercentage: 79.5, highestMarks: 100, a1GradesCount: 15, studentsNeedingRemedial: 3, isPublished: true }
];

export const MOCK_FACILITY_ASSETS: FacilityAsset[] = [
  { id: "fac_01", name: "Composite Science & Physics Laboratory", type: "Laboratories", location: "2nd Floor, Wing B", capacity: "45 Students", lastInspectionDate: "2024-09-12", nextAuditDate: "2024-12-10", status: "Operational", inCharge: "Mr. Rajesh Sharma" },
  { id: "fac_02", name: "Chemistry & Wet Reagent Lab", type: "Laboratories", location: "2nd Floor, Wing B", capacity: "40 Students", lastInspectionDate: "2024-09-12", nextAuditDate: "2024-12-10", status: "Operational", inCharge: "Dr. Naseem Bano" },
  { id: "fac_03", name: "Central RO Drinking Water Purification Plant", type: "Sanitation", location: "Ground Floor & Terraces", capacity: "1,500 LPH Capacity", lastInspectionDate: "2024-10-05", nextAuditDate: "2024-11-05", status: "Operational", inCharge: "Mr. S. Jadhav (Facility Mgr)" },
  { id: "fac_04", name: "Automated Fire Hydrant & Sprinkler Grid", type: "Safety Systems", location: "All Floors & Staircases", capacity: "50,000L Overhead Tank", lastInspectionDate: "2024-10-18", nextAuditDate: "2024-11-14", status: "Audit Due", inCharge: "Adv. Farhana Qureshi" },
  { id: "fac_05", name: "Robotics, Coding & AI Innovation Lab", type: "Laboratories", location: "3rd Floor, Wing A", capacity: "40 Workstations", lastInspectionDate: "2024-08-20", nextAuditDate: "2024-11-20", status: "Operational", inCharge: "Mr. Farhan Q." }
];

export const MOCK_TRANSPORT_ROUTES: TransportRoute[] = [
  { id: "tr_01", routeNumber: "Route 1", routeName: "Kausa - Shimla Park - Amrut Nagar - School", vehicleNo: "MH-04-GP-8812", driverName: "Abdul Ghaffar Shaikh", driverPhone: "+91 98205 77120", capacity: 40, studentsEnrolled: 38, fitnessCertExpiry: "2025-08-20", speedGovernorStatus: "Active & Calibrated", status: "On Route" },
  { id: "tr_02", routeNumber: "Route 2", routeName: "Mumbra Station - Reti Bunder - Old Toll Naka", vehicleNo: "MH-04-GP-8815", driverName: "Mahendra Patil", driverPhone: "+91 97680 44211", capacity: 40, studentsEnrolled: 36, fitnessCertExpiry: "2025-09-12", speedGovernorStatus: "Active & Calibrated", status: "On Route" },
  { id: "tr_03", routeNumber: "Route 3", routeName: "Diva Station - Shilphata Junction - Kausa", vehicleNo: "MH-04-GP-9104", driverName: "Ramchandra Yadav", driverPhone: "+91 98194 33029", capacity: 32, studentsEnrolled: 30, fitnessCertExpiry: "2025-06-30", speedGovernorStatus: "Active & Calibrated", status: "At Depot" }
];

export const MOCK_LIBRARY_BOOKS: LibraryBook[] = [
  { id: "bk_01", isbn: "978-9352923588", title: "NCERT Exemplar Problems - Class X Mathematics", author: "NCERT Editorial Board", category: "NCERT Textbooks", totalCopies: 25, availableCopies: 8, issuedCopies: 17, shelfLocation: "Shelf M-102" },
  { id: "bk_02", isbn: "978-8121903456", title: "Concepts of Physics (Vol 1 & 2)", author: "Prof. H. C. Verma", category: "CBSE Reference", totalCopies: 20, availableCopies: 5, issuedCopies: 15, shelfLocation: "Shelf P-204" },
  { id: "bk_03", isbn: "978-0143424123", title: "Wings of Fire - An Autobiography", author: "Dr. A. P. J. Abdul Kalam", category: "Literature & Fiction", totalCopies: 15, availableCopies: 11, issuedCopies: 4, shelfLocation: "Shelf BIO-12" },
  { id: "bk_04", isbn: "978-9351448839", title: "Modern ABC of Chemistry for Class XII", author: "Dr. S. P. Jauhar", category: "CBSE Reference", totalCopies: 18, availableCopies: 6, issuedCopies: 12, shelfLocation: "Shelf C-301" }
];
