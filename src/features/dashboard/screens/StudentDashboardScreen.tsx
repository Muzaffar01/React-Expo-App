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
import { mockAttendanceStats, mockHomework, mockExams, mockFees, mockAnnouncements } from '../../../services/mockDataService';

interface DashboardScreenProps {
  navigation: any;
}

export const StudentDashboardScreen: React.FC<DashboardScreenProps> = ({ navigation }) => {
  const { colors, spacing, typography } = useTheme();
  const { user } = useAuthStore();

  const pendingHomework = mockHomework.filter(h => h.status === 'pending');
  const upcomingExams = mockExams.slice(0, 2);
  const pendingFees = mockFees.filter(f => f.status !== 'paid');

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Dashboard" subtitle="Student" />
      
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
            Attendance Overview
          </Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.success }]}>{mockAttendanceStats.present}</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Present</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.error }]}>{mockAttendanceStats.absent}</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Absent</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.warning }]}>{mockAttendanceStats.late}</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Late</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.primary }]}>{mockAttendanceStats.percentage.toFixed(0)}%</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Percentage</Text>
            </View>
          </View>
        </Card>

        <TouchableOpacity onPress={() => navigation.navigate('HomeworkTab')}>
          <Card style={{ marginBottom: spacing.md }}>
            <View style={styles.cardHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text, fontSize: typography.h3.fontSize }]}>
                Pending Homework
              </Text>
              <Text style={[styles.badge, { backgroundColor: colors.error }]}>{pendingHomework.length}</Text>
            </View>
            {pendingHomework.slice(0, 2).map((hw) => (
              <View key={hw.id} style={[styles.listItem, { borderBottomColor: colors.border }]}>
                <View style={styles.listItemContent}>
                  <Text style={[styles.listItemTitle, { color: colors.text }]}>{hw.title}</Text>
                  <Text style={[styles.listItemSubtitle, { color: colors.textSecondary }]}>
                    {hw.subjectName} • Due: {hw.dueDate}
                  </Text>
                </View>
              </View>
            ))}
          </Card>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ExamsTab')}>
          <Card style={{ marginBottom: spacing.md }}>
            <Text style={[styles.sectionTitle, { color: colors.text, fontSize: typography.h3.fontSize }]}>
              Upcoming Exams
            </Text>
            {upcomingExams.map((exam) => (
              <View key={exam.id} style={[styles.listItem, { borderBottomColor: colors.border }]}>
                <View style={styles.listItemContent}>
                  <Text style={[styles.listItemTitle, { color: colors.text }]}>{exam.subjectName}</Text>
                  <Text style={[styles.listItemSubtitle, { color: colors.textSecondary }]}>
                    {exam.date} • {exam.startTime} - {exam.endTime}
                  </Text>
                </View>
              </View>
            ))}
          </Card>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('FeesTab')}>
          <Card style={{ marginBottom: spacing.md }}>
            <View style={styles.cardHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text, fontSize: typography.h3.fontSize }]}>
                Fee Status
              </Text>
              {pendingFees.length > 0 && (
                <Text style={[styles.badge, { backgroundColor: colors.warning }]}>Due</Text>
              )}
            </View>
            {pendingFees.slice(0, 2).map((fee) => (
              <View key={fee.id} style={[styles.listItem, { borderBottomColor: colors.border }]}>
                <View style={styles.listItemContent}>
                  <Text style={[styles.listItemTitle, { color: colors.text }]}>{fee.feeType}</Text>
                  <Text style={[styles.listItemSubtitle, { color: colors.textSecondary }]}>
                    Due: {fee.dueDate} • ₹{(fee.totalAmount - fee.paidAmount).toLocaleString()}
                  </Text>
                </View>
              </View>
            ))}
          </Card>
        </TouchableOpacity>

        <Card>
          <View style={styles.cardHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text, fontSize: typography.h3.fontSize }]}>
              Recent Announcements
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('AnnouncementsTab')}>
              <Text style={{ color: colors.primary }}>See All</Text>
            </TouchableOpacity>
          </View>
          {mockAnnouncements.slice(0, 2).map((announcement) => (
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
                  {new Date(announcement.createdAt).toLocaleDateString()}
                </Text>
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
  sectionTitle: { fontWeight: '600', marginBottom: 12 },
  statsGrid: { flexDirection: 'row', justifyContent: 'space-around' },
  statItem: { alignItems: 'center' },
  statValue: { fontSize: 28, fontWeight: 'bold' },
  statLabel: { fontSize: 12, marginTop: 4 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, color: '#fff', fontSize: 12, fontWeight: '600', overflow: 'hidden' },
  listItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1 },
  listItemContent: { flex: 1, marginLeft: 8 },
  listItemTitle: { fontSize: 14, fontWeight: '500' },
  listItemSubtitle: { fontSize: 12, marginTop: 2 },
  priorityDot: { width: 8, height: 8, borderRadius: 4 },
});

export default StudentDashboardScreen;
