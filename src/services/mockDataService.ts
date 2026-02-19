import { User, Attendance, Exam, ExamResult, Homework, TimetableDay, Fee, Announcement, Student, Class } from '../../shared/types';

// Mock Users
export const mockUsers: Record<string, User> = {
  student: {
    id: '1',
    email: 'student@tbms.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'student',
    studentId: 'STU001',
    profileImage: undefined,
  },
  teacher: {
    id: '2',
    email: 'teacher@tbms.com',
    firstName: 'Sarah',
    lastName: 'Smith',
    role: 'teacher',
    teacherId: 'TCH001',
    profileImage: undefined,
  },
  parent: {
    id: '3',
    email: 'parent@tbms.com',
    firstName: 'Michael',
    lastName: 'Johnson',
    role: 'parent',
    parentId: 'PAR001',
    profileImage: undefined,
  },
  admin: {
    id: '4',
    email: 'admin@tbms.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    profileImage: undefined,
  },
};

// Mock Classes
export const mockClasses: Class[] = [
  { id: '1', name: 'Class 10', sectionId: 'A', sectionName: 'Section A', academicYear: '2025-2026' },
  { id: '2', name: 'Class 9', sectionId: 'A', sectionName: 'Section A', academicYear: '2025-2026' },
  { id: '3', name: 'Class 8', sectionId: 'B', sectionName: 'Section B', academicYear: '2025-2026' },
];

// Mock Attendance Data
export const mockAttendance: Attendance[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - i);
  const statuses: ('present' | 'absent' | 'late' | 'excused')[] = ['present', 'present', 'present', 'present', 'absent', 'late'];
  return {
    id: String(i + 1),
    studentId: '1',
    studentName: 'John Doe',
    rollNumber: 'STU001',
    date: date.toISOString().split('T')[0],
    status: statuses[i % statuses.length],
    markedBy: 'Teacher',
    markedAt: date.toISOString(),
  };
});

export const mockAttendanceStats = {
  total: 30,
  present: 26,
  absent: 2,
  late: 1,
  excused: 1,
  percentage: 86.67,
};

// Mock Exams
export const mockExams: Exam[] = [
  {
    id: '1',
    name: 'Mid-Term Examination',
    classId: '1',
    className: 'Class 10 - Section A',
    subjectId: '1',
    subjectName: 'Mathematics',
    date: '2026-02-15',
    startTime: '09:00',
    endTime: '11:00',
    totalMarks: 100,
    passingMarks: 35,
  },
  {
    id: '2',
    name: 'Mid-Term Examination',
    classId: '1',
    className: 'Class 10 - Section A',
    subjectId: '2',
    subjectName: 'Science',
    date: '2026-02-16',
    startTime: '09:00',
    endTime: '11:00',
    totalMarks: 100,
    passingMarks: 35,
  },
  {
    id: '3',
    name: 'Mid-Term Examination',
    classId: '1',
    className: 'Class 10 - Section A',
    subjectId: '3',
    subjectName: 'English',
    date: '2026-02-17',
    startTime: '09:00',
    endTime: '11:00',
    totalMarks: 100,
    passingMarks: 35,
  },
];

// Mock Exam Results
export const mockExamResults: ExamResult[] = [
  {
    id: '1',
    studentId: '1',
    examId: '1',
    examName: 'Mid-Term Examination',
    subjectId: '1',
    subjectName: 'Mathematics',
    marksObtained: 85,
    totalMarks: 100,
    grade: 'A',
    percentage: 85,
    remarks: 'Excellent performance',
  },
  {
    id: '2',
    studentId: '1',
    examId: '1',
    examName: 'Mid-Term Examination',
    subjectId: '2',
    subjectName: 'Science',
    marksObtained: 78,
    totalMarks: 100,
    grade: 'B+',
    percentage: 78,
    remarks: 'Good work',
  },
  {
    id: '3',
    studentId: '1',
    examId: '1',
    examName: 'Mid-Term Examination',
    subjectId: '3',
    subjectName: 'English',
    marksObtained: 92,
    totalMarks: 100,
    grade: 'A+',
    percentage: 92,
    remarks: 'Outstanding',
  },
  {
    id: '4',
    studentId: '1',
    examId: '1',
    examName: 'Mid-Term Examination',
    subjectId: '4',
    subjectName: 'History',
    marksObtained: 70,
    totalMarks: 100,
    grade: 'B',
    percentage: 70,
    remarks: 'Good',
  },
  {
    id: '5',
    studentId: '1',
    examId: '1',
    examName: 'Mid-Term Examination',
    subjectId: '5',
    subjectName: 'Geography',
    marksObtained: 88,
    totalMarks: 100,
    grade: 'A',
    percentage: 88,
    remarks: 'Excellent',
  },
];

// Mock Homework
export const mockHomework: Homework[] = [
  {
    id: '1',
    classId: '1',
    className: 'Class 10 - Section A',
    subjectId: '1',
    subjectName: 'Mathematics',
    teacherId: '2',
    teacherName: 'Sarah Smith',
    title: 'Chapter 5 - Exercise 5.1',
    description: 'Solve all the problems from Exercise 5.1 (Page 45-47). Show all working steps.',
    dueDate: '2026-02-25',
    createdAt: '2026-02-15',
    status: 'pending',
  },
  {
    id: '2',
    classId: '1',
    className: 'Class 10 - Section A',
    subjectId: '2',
    subjectName: 'Science',
    teacherId: '2',
    teacherName: 'Sarah Smith',
    title: 'Physics Lab Report',
    description: 'Write a lab report for the experiment on reflection of light.',
    dueDate: '2026-02-22',
    createdAt: '2026-02-14',
    status: 'submitted',
    submission: {
      id: '1',
      homeworkId: '2',
      studentId: '1',
      submittedAt: '2026-02-20',
      remarks: 'Submitted on time',
    },
  },
  {
    id: '3',
    classId: '1',
    className: 'Class 10 - Section A',
    subjectId: '3',
    subjectName: 'English',
    teacherId: '2',
    teacherName: 'Sarah Smith',
    title: 'Essay Writing',
    description: 'Write an essay on "The Impact of Technology on Education" (500 words).',
    dueDate: '2026-02-28',
    createdAt: '2026-02-16',
    status: 'graded',
    submission: {
      id: '2',
      homeworkId: '3',
      studentId: '1',
      submittedAt: '2026-02-25',
      remarks: 'Well written',
      grade: 90,
      feedback: 'Excellent essay with good examples',
    },
  },
];

// Mock Timetable
export const mockTimetable: TimetableDay[] = [
  {
    dayOfWeek: 1,
    dayName: 'Monday',
    periods: [
      { id: '1', periodNumber: 1, startTime: '08:00', endTime: '08:45', subjectId: '1', subjectName: 'Mathematics', teacherId: '2', teacherName: 'Mrs. Smith' },
      { id: '2', periodNumber: 2, startTime: '08:45', endTime: '09:30', subjectId: '2', subjectName: 'Science', teacherId: '3', teacherName: 'Mr. Johnson' },
      { id: '3', periodNumber: 3, startTime: '09:30', endTime: '10:15', subjectId: '3', subjectName: 'English', teacherId: '4', teacherName: 'Ms. Davis' },
      { id: '4', periodNumber: 4, startTime: '10:15', endTime: '11:00', subjectId: '4', subjectName: 'History', teacherId: '5', teacherName: 'Mr. Wilson' },
      { id: '5', periodNumber: 5, startTime: '11:00', endTime: '11:45', subjectId: '5', subjectName: 'Geography', teacherId: '6', teacherName: 'Mrs. Brown' },
    ],
  },
  {
    dayOfWeek: 2,
    dayName: 'Tuesday',
    periods: [
      { id: '6', periodNumber: 1, startTime: '08:00', endTime: '08:45', subjectId: '3', subjectName: 'English', teacherId: '4', teacherName: 'Ms. Davis' },
      { id: '7', periodNumber: 2, startTime: '08:45', endTime: '09:30', subjectId: '1', subjectName: 'Mathematics', teacherId: '2', teacherName: 'Mrs. Smith' },
      { id: '8', periodNumber: 3, startTime: '09:30', endTime: '10:15', subjectId: '2', subjectName: 'Science', teacherId: '3', teacherName: 'Mr. Johnson' },
      { id: '9', periodNumber: 4, startTime: '10:15', endTime: '11:00', subjectId: '5', subjectName: 'Geography', teacherId: '6', teacherName: 'Mrs. Brown' },
      { id: '10', periodNumber: 5, startTime: '11:00', endTime: '11:45', subjectId: '4', subjectName: 'History', teacherId: '5', teacherName: 'Mr. Wilson' },
    ],
  },
  {
    dayOfWeek: 3,
    dayName: 'Wednesday',
    periods: [
      { id: '11', periodNumber: 1, startTime: '08:00', endTime: '08:45', subjectId: '2', subjectName: 'Science', teacherId: '3', teacherName: 'Mr. Johnson' },
      { id: '12', periodNumber: 2, startTime: '08:45', endTime: '09:30', subjectId: '5', subjectName: 'Geography', teacherId: '6', teacherName: 'Mrs. Brown' },
      { id: '13', periodNumber: 3, startTime: '09:30', endTime: '10:15', subjectId: '1', subjectName: 'Mathematics', teacherId: '2', teacherName: 'Mrs. Smith' },
      { id: '14', periodNumber: 4, startTime: '10:15', endTime: '11:00', subjectId: '3', subjectName: 'English', teacherId: '4', teacherName: 'Ms. Davis' },
      { id: '15', periodNumber: 5, startTime: '11:00', endTime: '11:45', subjectId: '4', subjectName: 'History', teacherId: '5', teacherName: 'Mr. Wilson' },
    ],
  },
  {
    dayOfWeek: 4,
    dayName: 'Thursday',
    periods: [
      { id: '16', periodNumber: 1, startTime: '08:00', endTime: '08:45', subjectId: '4', subjectName: 'History', teacherId: '5', teacherName: 'Mr. Wilson' },
      { id: '17', periodNumber: 2, startTime: '08:45', endTime: '09:30', subjectId: '1', subjectName: 'Mathematics', teacherId: '2', teacherName: 'Mrs. Smith' },
      { id: '18', periodNumber: 3, startTime: '09:30', endTime: '10:15', subjectId: '5', subjectName: 'Geography', teacherId: '6', teacherName: 'Mrs. Brown' },
      { id: '19', periodNumber: 4, startTime: '10:15', endTime: '11:00', subjectId: '2', subjectName: 'Science', teacherId: '3', teacherName: 'Mr. Johnson' },
      { id: '20', periodNumber: 5, startTime: '11:00', endTime: '11:45', subjectId: '3', subjectName: 'English', teacherId: '4', teacherName: 'Ms. Davis' },
    ],
  },
  {
    dayOfWeek: 5,
    dayName: 'Friday',
    periods: [
      { id: '21', periodNumber: 1, startTime: '08:00', endTime: '08:45', subjectId: '3', subjectName: 'English', teacherId: '4', teacherName: 'Ms. Davis' },
      { id: '22', periodNumber: 2, startTime: '08:45', endTime: '09:30', subjectId: '4', subjectName: 'History', teacherId: '5', teacherName: 'Mr. Wilson' },
      { id: '23', periodNumber: 3, startTime: '09:30', endTime: '10:15', subjectId: '1', subjectName: 'Mathematics', teacherId: '2', teacherName: 'Mrs. Smith' },
      { id: '24', periodNumber: 4, startTime: '10:15', endTime: '11:00', subjectId: '2', subjectName: 'Science', teacherId: '3', teacherName: 'Mr. Johnson' },
      { id: '25', periodNumber: 5, startTime: '11:00', endTime: '11:45', subjectId: '1', subjectName: 'Mathematics', teacherId: '2', teacherName: 'Mrs. Smith' },
    ],
  },
];

// Mock Fees
export const mockFees: Fee[] = [
  {
    id: '1',
    studentId: '1',
    academicYear: '2025-2026',
    feeType: 'Tuition Fee',
    totalAmount: 50000,
    paidAmount: 50000,
    dueDate: '2026-04-30',
    status: 'paid',
    installments: [
      { id: '1', feeId: '1', amount: 25000, dueDate: '2025-07-31', paidDate: '2025-07-25', status: 'paid' },
      { id: '2', feeId: '1', amount: 25000, dueDate: '2026-01-31', paidDate: '2026-01-28', status: 'paid' },
    ],
  },
  {
    id: '2',
    studentId: '1',
    academicYear: '2025-2026',
    feeType: 'Transport Fee',
    totalAmount: 12000,
    paidAmount: 6000,
    dueDate: '2026-02-28',
    status: 'partial',
    installments: [
      { id: '3', feeId: '2', amount: 6000, dueDate: '2025-07-31', paidDate: '2025-07-28', status: 'paid' },
      { id: '4', feeId: '2', amount: 6000, dueDate: '2026-02-28', paidDate: undefined, status: 'pending' },
    ],
  },
  {
    id: '3',
    studentId: '1',
    academicYear: '2025-2026',
    feeType: 'Book Fee',
    totalAmount: 5000,
    paidAmount: 0,
    dueDate: '2026-03-31',
    status: 'pending',
    installments: [
      { id: '5', feeId: '3', amount: 5000, dueDate: '2026-03-31', paidDate: undefined, status: 'pending' },
    ],
  },
];

// Mock Announcements
export const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Mid-Term Examination Schedule',
    message: 'The Mid-Term Examinations will be conducted from February 15-25, 2026. All students are requested to prepare accordingly. The detailed timetable is available on the portal.',
    priority: 'high',
    targetRoles: ['student', 'parent'],
    targetClassIds: ['1', '2', '3'],
    createdBy: 'Admin',
    createdByName: 'School Administration',
    createdAt: '2026-02-10T10:00:00Z',
  },
  {
    id: '2',
    title: 'Fee Payment Deadline Reminder',
    message: 'This is a reminder that the second installment of tuition fees is due by February 28, 2026. Please make the payment to avoid any late charges.',
    priority: 'medium',
    targetRoles: ['student', 'parent'],
    createdBy: 'Admin',
    createdByName: 'Finance Department',
    createdAt: '2026-02-14T09:00:00Z',
  },
  {
    id: '3',
    title: 'Annual Sports Day',
    message: 'The Annual Sports Day will be held on March 5, 2026. Students interested in participating can register with their class teachers by February 20.',
    priority: 'low',
    targetRoles: ['student', 'teacher', 'parent'],
    createdBy: '2',
    createdByName: 'Sports Department',
    createdAt: '2026-02-12T14:00:00Z',
  },
  {
    id: '4',
    title: 'Parent-Teacher Meeting',
    message: 'A Parent-Teacher Meeting is scheduled for February 22, 2026 (Saturday). Parents are requested to attend to discuss their ward\'s progress.',
    priority: 'medium',
    targetRoles: ['student', 'parent'],
    targetClassIds: ['1'],
    createdBy: 'Admin',
    createdByName: 'School Administration',
    createdAt: '2026-02-08T11:00:00Z',
  },
  {
    id: '5',
    title: 'Holiday Notice',
    message: 'The school will remain closed on February 20, 2026 on account of Mahashivratri. Classes will resume as per regular schedule on February 21.',
    priority: 'low',
    targetRoles: ['student', 'teacher', 'parent'],
    createdBy: 'Admin',
    createdByName: 'School Administration',
    createdAt: '2026-02-15T16:00:00Z',
  },
];

// Helper functions
export const getMockUser = (role: string): User => mockUsers[role] || mockUsers.student;

export const getMockAttendance = (studentId: string): Attendance[] => 
  mockAttendance.filter(a => a.studentId === studentId);

export const getMockExams = (classId: string): Exam[] => 
  mockExams.filter(e => e.classId === classId);

export const getMockHomework = (classId: string): Homework[] => 
  mockHomework.filter(h => h.classId === classId);

export const getMockFees = (studentId: string): Fee[] => 
  mockFees.filter(f => f.studentId === studentId);

export const getMockAnnouncements = (roles: string[]): Announcement[] => 
  mockAnnouncements.filter(a => a.targetRoles.some(r => roles.includes(r)));

export const getMockTimetable = (): TimetableDay[] => mockTimetable;
