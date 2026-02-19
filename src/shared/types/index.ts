// User Roles
export type UserRole = 'student' | 'teacher' | 'parent' | 'admin';

// Auth Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  profileImage?: string;
  studentId?: string;
  teacherId?: string;
  parentId?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

// Academic Types
export interface Student {
  id: string;
  userId: string;
  rollNumber: string;
  classId: string;
  className: string;
  sectionId: string;
  sectionName: string;
  parentId?: string;
}

export interface Class {
  id: string;
  name: string;
  sectionId: string;
  sectionName: string;
  academicYear: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  teacherId?: string;
}

export interface Teacher {
  id: string;
  userId: string;
  employeeId: string;
  department: string;
  subjects: Subject[];
}

// Attendance Types
export interface Attendance {
  id: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  markedBy: string;
  markedAt: string;
}

export interface AttendanceStats {
  total: number;
  present: number;
  absent: number;
  late: number;
  excused: number;
  percentage: number;
}

// Exam Types
export interface Exam {
  id: string;
  name: string;
  classId: string;
  className: string;
  subjectId: string;
  subjectName: string;
  date: string;
  startTime: string;
  endTime: string;
  totalMarks: number;
  passingMarks: number;
}

export interface ExamResult {
  id: string;
  studentId: string;
  examId: string;
  examName: string;
  subjectId: string;
  subjectName: string;
  marksObtained: number;
  totalMarks: number;
  grade?: string;
  percentage: number;
  remarks?: string;
}

export interface ReportCard {
  studentId: string;
  studentName: string;
  className: string;
  examId: string;
  examName: string;
  results: ExamResult[];
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  grade: string;
  rank?: number;
}

// Homework Types
export interface Homework {
  id: string;
  classId: string;
  className: string;
  subjectId: string;
  subjectName: string;
  teacherId: string;
  teacherName: string;
  title: string;
  description: string;
  dueDate: string;
  createdAt: string;
  attachments?: string[];
  status?: 'pending' | 'submitted' | 'graded';
  submission?: HomeworkSubmission;
}

export interface HomeworkSubmission {
  id: string;
  homeworkId: string;
  studentId: string;
  submittedAt: string;
  attachments?: string[];
  remarks?: string;
  grade?: number;
  feedback?: string;
}

// Timetable Types
export interface TimetablePeriod {
  id: string;
  periodNumber: number;
  startTime: string;
  endTime: string;
  subjectId: string;
  subjectName: string;
  teacherId: string;
  teacherName: string;
}

export interface TimetableDay {
  dayOfWeek: number;
  dayName: string;
  periods: TimetablePeriod[];
}

export interface Timetable {
  classId: string;
  className: string;
  sectionId: string;
  weeklySchedule: TimetableDay[];
}

// Fee Types
export interface Fee {
  id: string;
  studentId: string;
  academicYear: string;
  feeType: string;
  totalAmount: number;
  paidAmount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue' | 'partial';
  installments: Installment[];
}

export interface Installment {
  id: string;
  feeId: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'paid' | 'pending' | 'overdue';
}

export interface Payment {
  id: string;
  feeId: string;
  installmentId: string;
  amount: number;
  date: string;
  method: 'online' | 'cash' | 'cheque';
  transactionId?: string;
  receiptUrl?: string;
}

// Announcement Types
export interface Announcement {
  id: string;
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  targetRoles: UserRole[];
  targetClassIds?: string[];
  createdBy: string;
  createdByName: string;
  createdAt: string;
  expiresAt?: string;
}

// Pagination Types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasMore: boolean;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

// API Error Types
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

// Theme Types
export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  card: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  warning: string;
  error: string;
  info: string;
  disabled: string;
  placeholder: string;
}

export interface Theme {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  borderRadius: ThemeBorderRadius;
  typography: ThemeTypography;
}

export interface ThemeSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

export interface ThemeBorderRadius {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  full: number;
}

export interface ThemeTypography {
  h1: {
    fontSize: number;
    fontWeight: '400' | '500' | '600' | '700' | 'bold';
    lineHeight: number;
  };
  h2: {
    fontSize: number;
    fontWeight: '400' | '500' | '600' | '700' | 'bold';
    lineHeight: number;
  };
  h3: {
    fontSize: number;
    fontWeight: '400' | '500' | '600' | '700' | 'bold';
    lineHeight: number;
  };
  body: {
    fontSize: number;
    fontWeight: '400' | '500' | '600' | '700';
    lineHeight: number;
  };
  bodySmall: {
    fontSize: number;
    fontWeight: '400' | '500' | '600' | '700';
    lineHeight: number;
  };
  caption: {
    fontSize: number;
    fontWeight: '400' | '500' | '600' | '700';
    lineHeight: number;
  };
  button: {
    fontSize: number;
    fontWeight: '500' | '600' | '700';
    lineHeight: number;
  };
}
