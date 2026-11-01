export interface StudentProfileData {
  id: string;
  name: string;
  grade: string;
  section: string;
  rollNo: number;
  admissionNo: string;
  house: string;
  bloodGroup: string;
  classTeacher: string;
  avatar: string;
  todayStatus: 'Present' | 'Absent' | 'Late';
  attendanceRate: number;
  cbseCompliant: boolean;
  busRouteNo: string;
  busNumber: string;
  busDriverName: string;
  busDriverPhone: string;
}

export interface ParentData {
  name: string;
  title: string;
  relation: string;
  studentsCount: number;
  phone: string;
  email: string;
  address: string;
}

export const PARENT_DATA: ParentData = {
  name: "Mrs. Fatima Ansari",
  title: "Parent of 2 Students",
  relation: "Mother",
  studentsCount: 2,
  phone: "+91 98201 88412",
  email: "fatima.ansari@gmail.com",
  address: "Flat 402, Al-Madina Heights, Kausa, Mumbra, Thane - 400612"
};

export const STUDENTS_LIST: StudentProfileData[] = [
  {
    id: "std_aryan",
    name: "Aryan Ansari",
    grade: "Grade 9",
    section: "A",
    rollNo: 17,
    admissionNo: "DRT/2023/0145",
    house: "Ruby",
    bloodGroup: "B+ve",
    classTeacher: "Mr. A. Khan",
    avatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=260",
    todayStatus: "Present",
    attendanceRate: 92,
    cbseCompliant: true,
    busRouteNo: "Route 04",
    busNumber: "MH 04 AB 3271",
    busDriverName: "Mr. Rakesh Patil",
    busDriverPhone: "+91 98201 44521"
  },
  {
    id: "std_ananya",
    name: "Ananya Ansari",
    grade: "Grade 6",
    section: "B",
    rollNo: 8,
    admissionNo: "DRT/2025/0892",
    house: "Emerald",
    bloodGroup: "O+ve",
    classTeacher: "Mrs. S. Verma",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=260",
    todayStatus: "Present",
    attendanceRate: 95,
    cbseCompliant: true,
    busRouteNo: "Route 04",
    busNumber: "MH 04 AB 3271",
    busDriverName: "Mr. Rakesh Patil",
    busDriverPhone: "+91 98201 44521"
  }
];

export interface ClassworkSubject {
  id: string;
  subject: string;
  iconType: 'math' | 'science' | 'english' | 'social';
  topic: string;
  isCompleted: boolean;
}

export const TODAY_CLASSWORK: ClassworkSubject[] = [
  {
    id: "cw_1",
    subject: "Mathematics",
    iconType: "math",
    topic: "Quadratic Equations – Practice Problems",
    isCompleted: true
  },
  {
    id: "cw_2",
    subject: "Science",
    iconType: "science",
    topic: "Human Respiratory System – Explanation & Diagram",
    isCompleted: true
  },
  {
    id: "cw_3",
    subject: "English",
    iconType: "english",
    topic: "The Rime of the Ancient Mariner – Summary & Q/A",
    isCompleted: true
  },
  {
    id: "cw_4",
    subject: "Social Science",
    iconType: "social",
    topic: "The Indian Constitution – Key Features",
    isCompleted: true
  }
];

export interface ExamSubjectMark {
  subject: string;
  scored: number;
  total: number;
  grade: string;
}

export interface ExamResultsData {
  examName: string;
  academicYear: string;
  overallPercentage: number;
  overallGrade: string;
  topSubjectName: string;
  topSubjectScore: number;
  classAverage: number;
  highestPercentage: number;
  marks: ExamSubjectMark[];
}

export const EXAM_RESULTS_DATA: ExamResultsData = {
  examName: "Half-Yearly Exam",
  academicYear: "2026–27",
  overallPercentage: 86.4,
  overallGrade: "A2 Grade",
  topSubjectName: "Science",
  topSubjectScore: 94,
  classAverage: 78.2,
  highestPercentage: 96,
  marks: [
    { subject: "Mathematics", scored: 88, total: 100, grade: "A2" },
    { subject: "Science", scored: 94, total: 100, grade: "A1" },
    { subject: "English", scored: 84, total: 100, grade: "A2" },
    { subject: "Social Science", scored: 82, total: 100, grade: "B1" }
  ]
};

export interface FeeHeadItem {
  title: string;
  amount: number;
}

export interface FeeStructureData {
  termFeeDue: number;
  dueDate: string;
  breakdown: FeeHeadItem[];
  totalAnnual: number;
}

export const FEE_STRUCTURE_DATA: FeeStructureData = {
  termFeeDue: 18500,
  dueDate: "10 Nov 2026",
  breakdown: [
    { title: "Tuition Fee", amount: 78000 },
    { title: "Term Fee", amount: 18500 },
    { title: "Transport Fee", amount: 24000 },
    { title: "Lab / Activity", amount: 6000 },
    { title: "Annual Charges", amount: 5000 }
  ],
  totalAnnual: 131500
};

export interface TransportTimelineStop {
  id: string;
  title: string;
  time: string;
  status: 'passed' | 'current' | 'upcoming';
  isStudentStop?: boolean;
}

export const TRANSPORT_DATA = {
  busNumber: "MH 04 AB 3271",
  route: "Route 04 (Kausa - Mumbra Express)",
  status: "On Route",
  etaMinutes: 6,
  etaDistance: "2.3 km",
  driverName: "Mr. Rakesh Patil",
  driverPhone: "+91 98201 44521",
  driverAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200",
  stops: [
    {
      id: "stop_1",
      title: "Left from School",
      time: "08:10 AM",
      status: "passed"
    },
    {
      id: "stop_2",
      title: "Your Stop (Kausa Circle)",
      time: "ETA: 08:24 AM (6 min)",
      status: "current",
      isStudentStop: true
    },
    {
      id: "stop_3",
      title: "Drop at Home",
      time: "Est. 08:32 AM",
      status: "upcoming"
    }
  ] as TransportTimelineStop[]
};

export interface NoticeItem {
  id: string;
  category: 'exam' | 'compliance' | 'sports' | 'holiday';
  title: string;
  subtitle: string;
  date: string;
  isNew?: boolean;
}

export const NOTICES_LIST: NoticeItem[] = [
  {
    id: "not_1",
    category: "exam",
    title: "Half-Yearly Exam Schedule",
    subtitle: "Exam from 15 Nov – 25 Nov 2026",
    date: "1 Nov 2026",
    isNew: true
  },
  {
    id: "not_2",
    category: "compliance",
    title: "CBSE Circular – Safety Guidelines",
    subtitle: "Updated instructions for all schools",
    date: "30 Oct 2026"
  },
  {
    id: "not_3",
    category: "sports",
    title: "Annual Sports Day 2026",
    subtitle: "Registrations open till 10 Nov",
    date: "28 Oct 2026"
  },
  {
    id: "not_4",
    category: "holiday",
    title: "Diwali Vacation",
    subtitle: "School will remain closed from 5 – 12 Nov 2026",
    date: "25 Oct 2026"
  }
];
