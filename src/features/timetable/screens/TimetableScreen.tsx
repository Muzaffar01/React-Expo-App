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
import { mockTimetable } from '../../../services/mockDataService';

interface TimetableScreenProps {
  navigation: any;
}

export const TimetableScreen: React.FC<TimetableScreenProps> = ({ navigation }) => {
  const { colors, spacing } = useTheme();
  const [selectedDay, setSelectedDay] = React.useState(1);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentTimetable = mockTimetable.find(d => d.dayOfWeek === selectedDay);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Timetable" showBack onBackPress={() => navigation.goBack()} />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.daysContainer}>
        {days.map((day, index) => {
          const dayNum = index + 1;
          const isSelected = selectedDay === dayNum;
          return (
            <TouchableOpacity
              key={day}
              style={[
                styles.dayTab,
                { backgroundColor: isSelected ? colors.primary : colors.surface },
              ]}
              onPress={() => setSelectedDay(dayNum)}
            >
              <Text style={[styles.dayText, { color: isSelected ? '#fff' : colors.text }]}>
                {day}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <ScrollView contentContainerStyle={{ padding: spacing.md }}>
        <Text style={[styles.dateText, { color: colors.textSecondary }]}>
          {currentTimetable?.dayName || 'Monday'}
        </Text>

        {currentTimetable?.periods.map((period, index) => (
          <Card key={period.id} style={{ marginBottom: spacing.sm }}>
            <View style={styles.periodRow}>
              <View style={styles.periodNumber}>
                <Text style={[styles.periodNumText, { color: colors.primary }]}>{period.periodNumber}</Text>
              </View>
              <View style={styles.periodInfo}>
                <Text style={[styles.subjectName, { color: colors.text }]}>{period.subjectName}</Text>
                <Text style={[styles.timeText, { color: colors.textSecondary }]}>
                  {period.startTime} - {period.endTime}
                </Text>
                <Text style={[styles.teacherText, { color: colors.textSecondary }]}>
                  {period.teacherName}
                </Text>
              </View>
              <View style={styles.periodTime}>
                <Text style={[styles.timeDuration, { color: colors.primary }]}>
                  {Math.round((new Date(`2000-01-01T${period.endTime}`).getTime() - new Date(`2000-01-01T${period.startTime}`).getTime()) / 60000)} min
                </Text>
              </View>
            </View>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  daysContainer: { paddingHorizontal: 16, paddingVertical: 12 },
  dayTab: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, marginRight: 8 },
  dayText: { fontSize: 14, fontWeight: '600' },
  dateText: { fontSize: 14, marginBottom: 16, marginLeft: 4 },
  periodRow: { flexDirection: 'row', alignItems: 'center' },
  periodNumber: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#2563EB20', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  periodNumText: { fontSize: 16, fontWeight: 'bold' },
  periodInfo: { flex: 1 },
  subjectName: { fontSize: 16, fontWeight: '600' },
  timeText: { fontSize: 13, marginTop: 2 },
  teacherText: { fontSize: 12, marginTop: 2 },
  periodTime: {},
  timeDuration: { fontSize: 12, fontWeight: '500' },
});

export default TimetableScreen;
