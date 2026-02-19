import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../../shared/theme';
import { Card, Header, Loader } from '../../../shared/components';
import { mockAttendance, mockAttendanceStats } from '../../../services/mockDataService';
import { Attendance } from '../../../shared/types';

interface AttendanceListScreenProps {
  navigation: any;
}

export const AttendanceListScreen: React.FC<AttendanceListScreenProps> = ({ navigation }) => {
  const { colors, spacing, typography } = useTheme();
  const [isLoading] = React.useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return colors.success;
      case 'absent': return colors.error;
      case 'late': return colors.warning;
      case 'excused': return colors.info;
      default: return colors.textSecondary;
    }
  };

  const renderItem = ({ item }: { item: Attendance }) => (
    <TouchableOpacity onPress={() => navigation.navigate('AttendanceDetail', { date: item.date })}>
      <Card style={{ marginBottom: spacing.sm }}>
        <View style={styles.itemRow}>
          <View>
            <Text style={[styles.dateText, { color: colors.text }]}>{item.date}</Text>
            <Text style={[styles.statusText, { color: colors.textSecondary }]}>
              Marked by: {item.markedBy}
            </Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
            <Text style={[styles.statusBadgeText, { color: getStatusColor(item.status) }]}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Attendance" showBack onBackPress={() => navigation.goBack()} />
      
      <View style={[styles.statsCard, { backgroundColor: colors.primary }]}>
        <Text style={styles.statsTitle}>Attendance Statistics</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{mockAttendanceStats.percentage.toFixed(1)}%</Text>
            <Text style={styles.statLabel}>Overall</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{mockAttendanceStats.present}</Text>
            <Text style={styles.statLabel}>Present</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{mockAttendanceStats.absent}</Text>
            <Text style={styles.statLabel}>Absent</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{mockAttendanceStats.late}</Text>
            <Text style={styles.statLabel}>Late</Text>
          </View>
        </View>
      </View>

      {isLoading ? (
        <Loader />
      ) : (
        <FlatList
          data={mockAttendance}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: spacing.md }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  statsCard: { padding: 20, margin: 16, borderRadius: 16 },
  statsTitle: { color: '#fff', fontSize: 18, fontWeight: '600', marginBottom: 16 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around' },
  statItem: { alignItems: 'center' },
  statValue: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  statLabel: { color: '#fff', opacity: 0.8, fontSize: 12, marginTop: 4 },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  dateText: { fontSize: 16, fontWeight: '600' },
  statusText: { fontSize: 13, marginTop: 2 },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
  statusBadgeText: { fontSize: 13, fontWeight: '600' },
});

export default AttendanceListScreen;
