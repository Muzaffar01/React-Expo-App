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
import { mockAttendanceStats, mockHomework, mockFees, mockAnnouncements } from '../../../services/mockDataService';

interface DashboardScreenProps {
  navigation: any;
}

interface Child {
  id: string;
  name: string;
  className: string;
  rollNumber: string;
}

const mockChildren: Child[] = [
  { id: '1', name: 'John Doe', className: 'Class 10 - A', rollNumber: 'STU001' },
  { id: '2', name: 'Jane Doe', className: 'Class 8 - B', rollNumber: 'STU002' },
];

export const ParentDashboardScreen: React.FC<DashboardScreenProps> = ({ navigation }) => {
  const { colors, spacing, typography } = useTheme();
  const { user } = useAuthStore();

  const pendingHomework = mockHomework.filter(h => h.status === 'pending');
  const pendingFees = mockFees.filter(f => f.status !== 'paid');

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Dashboard" subtitle="Parent" />
      
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
            My Children
          </Text>
          {mockChildren.map((child) => (
            <TouchableOpacity 
              key={child.id} 
              style={[styles.childItem, { borderBottomColor: colors.border }]}
              onPress={() => navigation.navigate('ExamsTab')}
            >
              <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
                <Text style={styles.avatarText}>{child.name.charAt(0)}</Text>
              </View>
              <View style={styles.childInfo}>
                <Text style={[styles.childName, { color: colors.text }]}>{child.name}</Text>
                <Text style={[styles.childClass, { color: colors.textSecondary }]}>
                  {child.className} • Roll: {child.rollNumber}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </Card>

        <View style={styles.statsRow}>
          <Card style={[styles.statCard, { flex: 1, marginRight: spacing.sm }]}>
            <Text style={[styles.statValue, { color: colors.success }]}>{mockAttendanceStats.percentage.toFixed(0)}%</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Attendance</Text>
          </Card>
          <Card style={[styles.statCard, { flex: 1, marginRight: spacing.sm }]}>
            <Text style={[styles.statValue, { color: colors.warning }]}>{pendingHomework.length}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Homework</Text>
          </Card>
          <Card style={[styles.statCard, { flex: 1 }]}>
            <Text style={[styles.statValue, { color: colors.error }]}>{pendingFees.length}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Pending Fees</Text>
          </Card>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('HomeworkTab')}>
          <Card style={{ marginBottom: spacing.md }}>
            <View style={styles.cardHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text, fontSize: typography.h3.fontSize }]}>
                Pending Homework
              </Text>
              {pendingHomework.length > 0 && (
                <Text style={[styles.badge, { backgroundColor: colors.error }]}>{pendingHomework.length}</Text>
              )}
            </View>
            {pendingHomework.slice(0, 2).map((hw) => (
              <View key={hw.id} style={[styles.listItem, { borderBottomColor: colors.border }]}>
                <View style={styles.listItemContent}>
                  <Text style={[styles.listItemTitle, { color: colors.text }]}>{hw.title}</Text>
                  <Text style={[styles.listItemSubtitle, { color: colors.textSecondary }]}>
                    Due: {hw.dueDate}
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
                Fee Overview
              </Text>
              {pendingFees.length > 0 && (
                <Text style={{ color: colors.warning }}>Due</Text>
              )}
            </View>
            {pendingFees.map((fee) => (
              <View key={fee.id} style={[styles.listItem, { borderBottomColor: colors.border }]}>
                <View style={styles.listItemContent}>
                  <Text style={[styles.listItemTitle, { color: colors.text }]}>{fee.feeType}</Text>
                  <Text style={[styles.listItemSubtitle, { color: colors.textSecondary }]}>
                    ₹{(fee.totalAmount - fee.paidAmount).toLocaleString()} due • {fee.dueDate}
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
  statsRow: { flexDirection: 'row', marginBottom: 16 },
  statCard: { alignItems: 'center', padding: 16 },
  statValue: { fontSize: 28, fontWeight: 'bold' },
  statLabel: { fontSize: 12, marginTop: 4 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, color: '#fff', fontSize: 12, fontWeight: '600', overflow: 'hidden' },
  childItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1 },
  avatar: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  childInfo: { marginLeft: 12, flex: 1 },
  childName: { fontSize: 16, fontWeight: '600' },
  childClass: { fontSize: 13, marginTop: 2 },
  listItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1 },
  listItemContent: { flex: 1, marginLeft: 8 },
  listItemTitle: { fontSize: 14, fontWeight: '500' },
  listItemSubtitle: { fontSize: 12, marginTop: 2 },
  priorityDot: { width: 8, height: 8, borderRadius: 4 },
});

export default ParentDashboardScreen;
