import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainTabParamList, DashboardStackParamList, ROLE_ROUTES } from './types';
import { useAuthStore } from '../../store';
import { useTheme } from '../../shared/theme';
import { Card } from '../../shared/components';

import { StudentDashboardScreen } from '../../features/dashboard/screens/StudentDashboardScreen';
import { TeacherDashboardScreen } from '../../features/dashboard/screens/TeacherDashboardScreen';
import { ParentDashboardScreen } from '../../features/dashboard/screens/ParentDashboardScreen';
import { AdminDashboardScreen } from '../../features/dashboard/screens/AdminDashboardScreen';

import { AttendanceListScreen } from '../../features/attendance/screens/AttendanceListScreen';
import { ExamListScreen } from '../../features/exams/screens/ExamListScreen';
import { ExamResultsScreen } from '../../features/exams/screens/ExamResultsScreen';
import { HomeworkListScreen } from '../../features/homework/screens/HomeworkListScreen';
import { TimetableScreen } from '../../features/timetable/screens/TimetableScreen';
import { FeeListScreen } from '../../features/fees/screens/FeeListScreen';
import { AnnouncementListScreen } from '../../features/announcements/screens/AnnouncementListScreen';
import { SettingsScreen } from '../../features/settings/screens/SettingsScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();
const DashboardStack = createNativeStackNavigator<DashboardStackParamList>();

const PlaceholderScreen: React.FC<{ title: string; color?: string }> = ({ title }) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.placeholder, { backgroundColor: colors.background }]}>
      <Card style={styles.placeholderCard}>
        <Text style={[styles.placeholderTitle, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.placeholderText, { color: colors.textSecondary }]}>
          Coming Soon
        </Text>
      </Card>
    </View>
  );
};

const DashboardNavigator: React.FC = () => {
  const { user } = useAuthStore();
  const role = user?.role || 'student';

  const getDashboard = () => {
    switch (role) {
      case 'teacher': return TeacherDashboardScreen;
      case 'parent': return ParentDashboardScreen;
      case 'admin': return AdminDashboardScreen;
      default: return StudentDashboardScreen;
    }
  };

  return (
    <DashboardStack.Navigator screenOptions={{ headerShown: false }}>
      <DashboardStack.Screen name="DashboardHome" component={getDashboard()} />
    </DashboardStack.Navigator>
  );
};

const AttendanceStack = createNativeStackNavigator();
const AttendanceNavigator = () => (
  <AttendanceStack.Navigator screenOptions={{ headerShown: false }}>
    <AttendanceStack.Screen name="AttendanceList" component={AttendanceListScreen} />
  </AttendanceStack.Navigator>
);

const ExamsStack = createNativeStackNavigator();
const ExamsNavigator = () => (
  <ExamsStack.Navigator screenOptions={{ headerShown: false }}>
    <ExamsStack.Screen name="ExamList" component={ExamListScreen} />
    <ExamsStack.Screen name="ExamResults" component={ExamResultsScreen} />
  </ExamsStack.Navigator>
);

const HomeworkStack = createNativeStackNavigator();
const HomeworkNavigator = () => (
  <HomeworkStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeworkStack.Screen name="HomeworkList" component={HomeworkListScreen} />
  </HomeworkStack.Navigator>
);

const TimetableStack = createNativeStackNavigator();
const TimetableNavigator = () => (
  <TimetableStack.Navigator screenOptions={{ headerShown: false }}>
    <TimetableStack.Screen name="TimetableView" component={TimetableScreen} />
  </TimetableStack.Navigator>
);

const FeesStack = createNativeStackNavigator();
const FeesNavigator = () => (
  <FeesStack.Navigator screenOptions={{ headerShown: false }}>
    <FeesStack.Screen name="FeeList" component={FeeListScreen} />
  </FeesStack.Navigator>
);

const AnnouncementsStack = createNativeStackNavigator();
const AnnouncementsNavigator = () => (
  <AnnouncementsStack.Navigator screenOptions={{ headerShown: false }}>
    <AnnouncementsStack.Screen name="AnnouncementList" component={AnnouncementListScreen} />
  </AnnouncementsStack.Navigator>
);

const SettingsStack = createNativeStackNavigator();
const SettingsNavigator = () => (
  <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
    <SettingsStack.Screen name="SettingsHome" component={SettingsScreen} />
  </SettingsStack.Navigator>
);

export const AppNavigator: React.FC = () => {
  const { user } = useAuthStore();
  const { colors, spacing } = useTheme();
  
  const userRole = user?.role || 'student';
  const roleConfig = ROLE_ROUTES[userRole];

  const getTabIcon = (routeName: string) => {
    const icons: Record<string, string> = {
      DashboardTab: '🏠',
      AttendanceTab: '📅',
      ExamsTab: '📝',
      HomeworkTab: '📚',
      TimetableTab: '🕐',
      FeesTab: '💰',
      AnnouncementsTab: '📢',
      SettingsTab: '⚙️',
    };
    return icons[routeName] || '📱';
  };

  const getTabComponent = (name: string) => {
    switch (name) {
      case 'DashboardTab': return DashboardNavigator;
      case 'AttendanceTab': return AttendanceNavigator;
      case 'ExamsTab': return ExamsNavigator;
      case 'HomeworkTab': return HomeworkNavigator;
      case 'TimetableTab': return TimetableNavigator;
      case 'FeesTab': return FeesNavigator;
      case 'AnnouncementsTab': return AnnouncementsNavigator;
      case 'SettingsTab': return SettingsNavigator;
      default: return () => <PlaceholderScreen title={name} color={colors.primary} />;
    }
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          paddingTop: spacing.xs,
          paddingBottom: spacing.xs,
          height: 60,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
        },
      }}
    >
      {roleConfig.tabs.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={getTabComponent(tab.name)}
          options={{
            tabBarLabel: tab.label,
            tabBarIcon: ({ color, size }) => (
              <Text style={{ fontSize: size, color }}>{getTabIcon(tab.name)}</Text>
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  placeholderCard: {
    alignItems: 'center',
    padding: 32,
  },
  placeholderTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  placeholderText: {
    fontSize: 14,
  },
});

export default AppNavigator;
