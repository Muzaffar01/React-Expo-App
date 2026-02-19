import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../../shared/theme';
import { Card, Header } from '../../../shared/components';
import { useAuthStore } from '../../../store';

interface DashboardScreenProps {
  navigation: any;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ navigation }) => {
  const { colors, spacing, typography } = useTheme();
  const { user } = useAuthStore();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getRoleDisplay = (role: string) => {
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  const menuItems = [
    { title: 'Attendance', icon: '📅', screen: 'AttendanceTab' },
    { title: 'Exams', icon: '📝', screen: 'ExamsTab' },
    { title: 'Homework', icon: '📚', screen: 'HomeworkTab' },
    { title: 'Timetable', icon: '🕐', screen: 'TimetableTab' },
    { title: 'Fees', icon: '💰', screen: 'FeesTab' },
    { title: 'Announcements', icon: '📢', screen: 'AnnouncementsTab' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="TBMS Connect" subtitle={getRoleDisplay(user?.role || '')} />
      
      <ScrollView contentContainerStyle={{ padding: spacing.md }}>
        <View style={styles.welcomeSection}>
          <Text style={[styles.greeting, { color: colors.text, fontSize: typography.h2.fontSize }]}>
            {getGreeting()} 👋
          </Text>
          <Text style={[styles.userName, { color: colors.textSecondary, fontSize: typography.body.fontSize }]}>
            {user?.firstName} {user?.lastName}
          </Text>
        </View>

        <Card style={{ marginBottom: spacing.md }}>
          <Text style={[styles.sectionTitle, { color: colors.text, fontSize: typography.h3.fontSize }]}>
            Quick Overview
          </Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.primary }]}>95%</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Attendance</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.success }]}>3</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Pending HW</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.warning }]}>2</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Upcoming Exams</Text>
            </View>
          </View>
        </Card>

        <Text style={[styles.sectionTitle, { color: colors.text, fontSize: typography.h3.fontSize, marginBottom: spacing.sm }]}>
          Quick Access
        </Text>
        <View style={styles.menuGrid}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.menuItem, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => navigation.navigate(item.screen)}
            >
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={[styles.menuTitle, { color: colors.text }]}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Card style={{ marginTop: spacing.md }}>
          <View style={styles.announcementHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text, fontSize: typography.h3.fontSize }]}>
              Recent Announcements
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('AnnouncementsTab')}>
              <Text style={[styles.seeAll, { color: colors.primary }]}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.announcementItem, { borderBottomColor: colors.border }]}>
            <View style={[styles.priorityDot, { backgroundColor: colors.error }]} />
            <View style={styles.announcementContent}>
              <Text style={[styles.announcementTitle, { color: colors.text }]} numberOfLines={1}>
                Mid-Term Examination Schedule
              </Text>
              <Text style={[styles.announcementDate, { color: colors.textSecondary }]}>
                Feb 15, 2026
              </Text>
            </View>
          </View>
          <View style={[styles.announcementItem, { borderBottomColor: colors.border }]}>
            <View style={[styles.priorityDot, { backgroundColor: colors.warning }]} />
            <View style={styles.announcementContent}>
              <Text style={[styles.announcementTitle, { color: colors.text }]} numberOfLines={1}>
                Fee Payment Deadline Reminder
              </Text>
              <Text style={[styles.announcementDate, { color: colors.textSecondary }]}>
                Feb 14, 2026
              </Text>
            </View>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcomeSection: {
    marginBottom: 20,
  },
  greeting: {
    fontWeight: 'bold',
  },
  userName: {
    marginTop: 4,
  },
  sectionTitle: {
    fontWeight: '600',
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuItem: {
    width: '48%',
    aspectRatio: 1.2,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  menuIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  announcementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '500',
  },
  announcementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  announcementContent: {
    flex: 1,
  },
  announcementTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  announcementDate: {
    fontSize: 12,
    marginTop: 2,
  },
});

export default DashboardScreen;
