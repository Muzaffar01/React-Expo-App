import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useTheme } from '../../../shared/theme';
import { Card, Header, Loader } from '../../../shared/components';
import { mockExamResults } from '../../../services/mockDataService';

interface ExamResultsScreenProps {
  navigation: any;
  route: any;
}

export const ExamResultsScreen: React.FC<ExamResultsScreenProps> = ({ navigation, route }) => {
  const { colors, spacing } = useTheme();
  const { examId } = route.params;
  const [isLoading] = React.useState(false);

  const results = mockExamResults;
  const totalMarks = results.reduce((acc, r) => acc + r.totalMarks, 0);
  const obtainedMarks = results.reduce((acc, r) => acc + r.marksObtained, 0);
  const percentage = (obtainedMarks / totalMarks) * 100;

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return colors.success;
    if (grade.startsWith('B')) return colors.primary;
    if (grade.startsWith('C')) return colors.warning;
    return colors.error;
  };

  const renderItem = ({ item }: { item: typeof results[0] }) => (
    <Card style={{ marginBottom: spacing.sm }}>
      <View style={styles.resultRow}>
        <View style={styles.subjectInfo}>
          <Text style={[styles.subjectName, { color: colors.text }]}>{item.subjectName}</Text>
          <Text style={[styles.marksText, { color: colors.textSecondary }]}>
            {item.marksObtained}/{item.totalMarks} marks
          </Text>
        </View>
        <View style={styles.gradeContainer}>
          <Text style={[styles.grade, { color: getGradeColor(item.grade || '') }]}>{item.grade}</Text>
          <Text style={[styles.percentage, { color: colors.textSecondary }]}>{item.percentage}%</Text>
        </View>
      </View>
      {item.remarks && (
        <View style={[styles.remarks, { backgroundColor: colors.surface }]}>
          <Text style={[styles.remarksText, { color: colors.textSecondary }]}>Teacher's Remarks: {item.remarks}</Text>
        </View>
      )}
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Exam Results" showBack onBackPress={() => navigation.goBack()} />

      <View style={[styles.summaryCard, { backgroundColor: colors.primary }]}>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>{obtainedMarks}/{totalMarks}</Text>
            <Text style={styles.summaryLabel}>Marks Obtained</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>{percentage.toFixed(1)}%</Text>
            <Text style={styles.summaryLabel}>Percentage</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>
              {percentage >= 90 ? 'A+' : percentage >= 80 ? 'A' : percentage >= 70 ? 'B+' : percentage >= 60 ? 'B' : 'C'}
            </Text>
            <Text style={styles.summaryLabel}>Grade</Text>
          </View>
        </View>
      </View>

      {isLoading ? (
        <Loader />
      ) : (
        <FlatList
          data={results}
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
  summaryCard: { margin: 16, padding: 20, borderRadius: 16 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  summaryItem: { alignItems: 'center' },
  summaryValue: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  summaryLabel: { color: '#fff', opacity: 0.8, fontSize: 12, marginTop: 4 },
  divider: { width: 1, height: 40, backgroundColor: 'rgba(255,255,255,0.3)' },
  resultRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  subjectInfo: { flex: 1 },
  subjectName: { fontSize: 16, fontWeight: '600' },
  marksText: { fontSize: 13, marginTop: 2 },
  gradeContainer: { alignItems: 'flex-end' },
  grade: { fontSize: 24, fontWeight: 'bold' },
  percentage: { fontSize: 12, marginTop: 2 },
  remarks: { marginTop: 12, padding: 12, borderRadius: 8 },
  remarksText: { fontSize: 13, fontStyle: 'italic' },
});

export default ExamResultsScreen;
