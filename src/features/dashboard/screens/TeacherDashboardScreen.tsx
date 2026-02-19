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
import { mockClasses, mockHomework, mockAnnouncements } from '../../../services/mockDataService';

interface DashboardScreenProps {
  navigation: any;
}

export const TeacherDashboardScreen: React.FC<DashboardScreenProps> = ({ navigation }) => {
  const { colors, spacing, typography } = useTheme();
  const { user } = useAuthStore();

  const pendingHomework = mockHomework.filter(h => h.status !== 'graded');

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Dashboard" subtitle="Teacher" />
      
      <ScrollView contentContainerStyle={{ padding: spacing.md }}>
        <View style={styles.welcomeSection}>
          <Text style={[styles.greeting, { color: colors.text, fontSize: typography.h2.fontSize }]}>
            {getGreeting()} 👋
          </Text>
          <Text style={[styles.userName, { color: colors.textSecondary, fontSize: typography.body.fontSize }]}>
            {user?.firstName} {user?.lastName}
          </Text>
        </View>

        <View style={styles.statsRow}>
          <Card style={[styles.statCard, { flex: 1, marginRight: spacing.sm }]}>
            <Text style={[styles.statValue, { color: colors.primary }]}>{mockClasses.length}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Classes</Text>
          </Card>
          <Card style={[styles.statCard, { flex: 1 }]}>
            <Text style={[styles.statValue, { color: colors.warning }]}>{pendingHomework.length}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Pending</Text>
          </Card>
        </View>

        <Card style={{ marginBottom: spacing.md }}>
          <Text style={[styles.sectionTitle, { color: colors.text, fontSize: typography.h3.fontSize }]}>
            My Classes
          </Text>
          {mockClasses.slice(0, 3).map((cls) => (
            <TouchableOpacity 
              key={cls.id} 
              style={[styles.classItem, { borderBottomColor: colors.border }]}
              onPress={() => navigation.navigate('AttendanceTab')}
            >
              <View>
                <Text style={[styles.className, { color: colors.text }]}>{cls.name}</Text>
                <Text style={[styles.classSection, { color: colors.textSecondary }]}>{cls.sectionName}</Text>
              </View>
              <Text style={{ color: colors.primary }}>View →</Text>
            </TouchableOpacity>
          ))}
        </Card>

        <TouchableOpacity onPress={() => navigation.navigate('HomeworkTab')}>
          <Card style={{ marginBottom: spacing.md }}>
            <View style={styles.cardHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text, fontSize: typography.h3.fontSize }]}>
                Homework to Grade
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
                    {hw.className} • Due: {hw.dueDate}
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
  statsRow: { flexDirection: 'row', marginBottom: 16 },
  statCard: { alignItems: 'center', padding: 16 },
  statValue: { fontSize: 32, fontWeight: 'bold' },
  statLabel: { fontSize: 14, marginTop: 4 },
  sectionTitle: { fontWeight: '600', marginBottom: 12 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, color: '#fff', fontSize: 12, fontWeight: '600', overflow: 'hidden' },
  classItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1 },
  className: { fontSize: 16, fontWeight: '500' },
  classSection: { fontSize: 13, marginTop: 2 },
  listItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1 },
  listItemContent: { flex: 1, marginLeft: 8 },
  listItemTitle: { fontSize: 14, fontWeight: '500' },
  listItemSubtitle: { fontSize: 12, marginTop: 2 },
  priorityDot: { width: 8, height: 8, borderRadius: 4 },
});

export default TeacherDashboardScreen;
