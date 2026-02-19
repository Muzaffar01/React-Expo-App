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
import { mockClasses, mockAnnouncements } from '../../../services/mockDataService';

interface DashboardScreenProps {
  navigation: any;
}

export const AdminDashboardScreen: React.FC<DashboardScreenProps> = ({ navigation }) => {
  const { colors, spacing, typography } = useTheme();
  const { user } = useAuthStore();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const quickActions = [
    { title: 'Manage Users', icon: '👥', screen: 'SettingsTab', color: colors.primary },
    { title: 'Attendance', icon: '📅', screen: 'AttendanceTab', color: colors.secondary },
    { title: 'Exams', icon: '📝', screen: 'ExamsTab', color: colors.warning },
    { title: 'Homework', icon: '📚', screen: 'HomeworkTab', color: colors.success },
    { title: 'Fees', icon: '💰', screen: 'FeesTab', color: colors.error },
    { title: 'Announcements', icon: '📢', screen: 'AnnouncementsTab', color: colors.info },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Dashboard" subtitle="Administrator" />
      
      <ScrollView contentContainerStyle={{ padding: spacing.md }}>
        <View style={styles.welcomeSection}>
          <Text style={[styles.greeting, { color: colors.text, fontSize: typography.h2.fontSize }]}>
            {getGreeting()} 👋
          </Text>
          <Text style={[styles.userName, { color: colors.textSecondary, fontSize: typography.body.fontSize }]}>
            {user?.firstName} {user?.lastName}
          </Text>
        </View>

        <View style={styles.statsGrid}>
          <Card style={[styles.statCard, { backgroundColor: colors.primary }]}>
            <Text style={styles.statValue}>500</Text>
            <Text style={styles.statLabel}>Students</Text>
          </Card>
          <Card style={[styles.statCard, { backgroundColor: colors.secondary }]}>
            <Text style={styles.statValue}>50</Text>
            <Text style={styles.statLabel}>Teachers</Text>
          </Card>
          <Card style={[styles.statCard, { backgroundColor: colors.success }]}>
            <Text style={styles.statValue}>10</Text>
            <Text style={styles.statLabel}>Classes</Text>
          </Card>
          <Card style={[styles.statCard, { backgroundColor: colors.warning }]}>
            <Text style={styles.statValue}>95%</Text>
            <Text style={styles.statLabel}>Attendance</Text>
          </Card>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text, fontSize: typography.h3.fontSize, marginTop: spacing.md, marginBottom: spacing.sm }]}>
          Quick Actions
        </Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.actionCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => navigation.navigate(action.screen)}
            >
              <View style={[styles.actionIcon, { backgroundColor: action.color + '20' }]}>
                <Text style={styles.actionIconText}>{action.icon}</Text>
              </View>
              <Text style={[styles.actionTitle, { color: colors.text }]}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Card style={{ marginTop: spacing.md }}>
          <View style={styles.cardHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text, fontSize: typography.h3.fontSize }]}>
              Recent Announcements
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('AnnouncementsTab')}>
              <Text style={{ color: colors.primary }}>Manage</Text>
            </TouchableOpacity>
          </View>
          {mockAnnouncements.slice(0, 3).map((announcement) => (
            <View key={announcement.id} style={[styles.listItem, { borderBottomColor: colors.border }]}>
              <View style={[styles.priorityDot, { backgroundColor: 
                announcement.priority === 'high' ? colors.error :
                announcement.priority === 'medium' ? colors.warning : colors.info
              }]} />
              <View style={styles.listItemContent}>
                <Text style={[styles.listItemTitle, { color: colors.text }]} numberOfLines={1}>
                  {announcement.title}
                </Text>
                <Text style={[styles.listItemSubtitle, { color: colors.textSecondary }]}>
                  {announcement.createdByName} • {new Date(announcement.createdAt).toLocaleDateString()}
                </Text>
              </View>
            </View>
          ))}
        </Card>

        <Card style={{ marginTop: spacing.md }}>
          <Text style={[styles.sectionTitle, { color: colors.text, fontSize: typography.h3.fontSize }]}>
            Class Overview
          </Text>
          {mockClasses.map((cls) => (
            <View key={cls.id} style={[styles.classItem, { borderBottomColor: colors.border }]}>
              <View>
                <Text style={[styles.className, { color: colors.text }]}>{cls.name}</Text>
                <Text style={[styles.classSection, { color: colors.textSecondary }]}>{cls.sectionName}</Text>
              </View>
              <View style={styles.classStats}>
                <Text style={[styles.classStatLabel, { color: colors.textSecondary }]}>Students</Text>
                <Text style={[styles.classStatValue, { color: colors.text }]}>50</Text>
              </View>
            </View>
          ))}
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  welcomeSection: { marginBottom: 20 },
  greeting: { fontWeight: 'bold' },
  userName: { marginTop: 4 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  statCard: { width: '48%', padding: 16, marginBottom: 12, alignItems: 'center' },
  statValue: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  statLabel: { fontSize: 14, color: '#fff', opacity: 0.9, marginTop: 4 },
  sectionTitle: { fontWeight: '600' },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  actionCard: { width: '31%', aspectRatio: 1, borderRadius: 12, borderWidth: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 12, padding: 8 },
  actionIcon: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  actionIconText: { fontSize: 24 },
  actionTitle: { fontSize: 12, fontWeight: '500', textAlign: 'center' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  listItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1 },
  listItemContent: { flex: 1, marginLeft: 8 },
  listItemTitle: { fontSize: 14, fontWeight: '500' },
  listItemSubtitle: { fontSize: 12, marginTop: 2 },
  priorityDot: { width: 8, height: 8, borderRadius: 4 },
  classItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1 },
  className: { fontSize: 16, fontWeight: '500' },
  classSection: { fontSize: 13, marginTop: 2 },
  classStats: { alignItems: 'flex-end' },
  classStatLabel: { fontSize: 12 },
  classStatValue: { fontSize: 16, fontWeight: '600' },
});

export default AdminDashboardScreen;
