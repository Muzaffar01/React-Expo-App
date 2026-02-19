import { UserRole } from '../../shared/types';

// Root Stack
export type RootStackParamList = {
  Auth: undefined;
  App: undefined;
};

// Auth Stack
export type AuthStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
  OTPVerification: { email: string };
  ResetPassword: { token: string };
};

// Main Tab Navigator
export type MainTabParamList = {
  DashboardTab: undefined;
  AttendanceTab: undefined;
  ExamsTab: undefined;
  HomeworkTab: undefined;
  TimetableTab: undefined;
  FeesTab: undefined;
  AnnouncementsTab: undefined;
  SettingsTab: undefined;
};

// Dashboard Stack (nested in tabs)
export type DashboardStackParamList = {
  DashboardHome: undefined;
  Profile: undefined;
};

// Attendance Stack
export type AttendanceStackParamList = {
  AttendanceList: undefined;
  AttendanceDetail: { date: string };
  MarkAttendance: { classId: string; date: string };
};

// Exams Stack
export type ExamsStackParamList = {
  ExamList: undefined;
  ExamResults: { examId: string };
  ReportCard: { examId: string; studentId: string };
};

// Homework Stack
export type HomeworkStackParamList = {
  HomeworkList: undefined;
  HomeworkDetail: { homeworkId: string };
  CreateHomework: undefined;
  SubmitHomework: { homeworkId: string };
};

// Timetable Stack
export type TimetableStackParamList = {
  TimetableView: undefined;
  PeriodDetail: { periodId: string };
};

// Fees Stack
export type FeesStackParamList = {
  FeeList: undefined;
  FeeDetail: { feeId: string };
  PaymentHistory: { studentId: string };
  MakePayment: { feeId: string };
};

// Announcements Stack
export type AnnouncementsStackParamList = {
  AnnouncementList: undefined;
  AnnouncementDetail: { announcementId: string };
  CreateAnnouncement: undefined;
};

// Settings Stack
export type SettingsStackParamList = {
  SettingsHome: undefined;
  EditProfile: undefined;
  ChangePassword: undefined;
  NotificationSettings: undefined;
  AppInfo: undefined;
};

// Role-based route access
export interface RoleRouteConfig {
  allowedRoles: UserRole[];
  tabs: Array<{
    name: keyof MainTabParamList;
    label: string;
    icon: string;
  }>;
}

export const ROLE_ROUTES: Record<UserRole, RoleRouteConfig> = {
  student: {
    allowedRoles: ['student'],
    tabs: [
      { name: 'DashboardTab', label: 'Home', icon: '🏠' },
      { name: 'AttendanceTab', label: 'Attendance', icon: '📅' },
      { name: 'ExamsTab', label: 'Exams', icon: '📝' },
      { name: 'HomeworkTab', label: 'Homework', icon: '📚' },
      { name: 'TimetableTab', label: 'Timetable', icon: '🕐' },
      { name: 'FeesTab', label: 'Fees', icon: '💰' },
      { name: 'AnnouncementsTab', label: 'News', icon: '📢' },
      { name: 'SettingsTab', label: 'Settings', icon: '⚙️' },
    ],
  },
  teacher: {
    allowedRoles: ['teacher'],
    tabs: [
      { name: 'DashboardTab', label: 'Home', icon: '🏠' },
      { name: 'AttendanceTab', label: 'Attendance', icon: '📅' },
      { name: 'ExamsTab', label: 'Exams', icon: '📝' },
      { name: 'HomeworkTab', label: 'Homework', icon: '📚' },
      { name: 'TimetableTab', label: 'Timetable', icon: '🕐' },
      { name: 'AnnouncementsTab', label: 'News', icon: '📢' },
      { name: 'SettingsTab', label: 'Settings', icon: '⚙️' },
    ],
  },
  parent: {
    allowedRoles: ['parent'],
    tabs: [
      { name: 'DashboardTab', label: 'Home', icon: '🏠' },
      { name: 'AttendanceTab', label: 'Attendance', icon: '📅' },
      { name: 'ExamsTab', label: 'Exams', icon: '📝' },
      { name: 'HomeworkTab', label: 'Homework', icon: '📚' },
      { name: 'TimetableTab', label: 'Timetable', icon: '🕐' },
      { name: 'FeesTab', label: 'Fees', icon: '💰' },
      { name: 'AnnouncementsTab', label: 'News', icon: '📢' },
      { name: 'SettingsTab', label: 'Settings', icon: '⚙️' },
    ],
  },
  admin: {
    allowedRoles: ['admin'],
    tabs: [
      { name: 'DashboardTab', label: 'Dashboard', icon: '🏠' },
      { name: 'AttendanceTab', label: 'Attendance', icon: '📅' },
      { name: 'ExamsTab', label: 'Exams', icon: '📝' },
      { name: 'HomeworkTab', label: 'Homework', icon: '📚' },
      { name: 'TimetableTab', label: 'Timetable', icon: '🕐' },
      { name: 'FeesTab', label: 'Fees', icon: '💰' },
      { name: 'AnnouncementsTab', label: 'News', icon: '📢' },
      { name: 'SettingsTab', label: 'Settings', icon: '⚙️' },
    ],
  },
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
