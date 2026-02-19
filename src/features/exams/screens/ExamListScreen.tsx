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
import { mockExams, mockExamResults } from '../../../services/mockDataService';
import { Exam, ExamResult } from '../../../shared/types';

interface ExamListScreenProps {
  navigation: any;
}

export const ExamListScreen: React.FC<ExamListScreenProps> = ({ navigation }) => {
  const { colors, spacing, typography } = useTheme();
  const [isLoading] = React.useState(false);

  const renderExamItem = ({ item }: { item: Exam }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ExamResults', { examId: item.id })}>
      <Card style={{ marginBottom: spacing.sm }}>
        <View style={styles.examHeader}>
          <View>
            <Text style={[styles.examName, { color: colors.text }]}>{item.name}</Text>
            <Text style={[styles.examSubject, { color: colors.textSecondary }]}>{item.subjectName}</Text>
          </View>
          <View style={[styles.examBadge, { backgroundColor: colors.primary + '20' }]}>
            <Text style={[styles.examBadgeText, { color: colors.primary }]}>View Results</Text>
          </View>
        </View>
        <View style={[styles.examDetails, { borderTopColor: colors.border }]}>
          <View style={styles.detailItem}>
            <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Date</Text>
            <Text style={[styles.detailValue, { color: colors.text }]}>{item.date}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Time</Text>
            <Text style={[styles.detailValue, { color: colors.text }]}>{item.startTime} - {item.endTime}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Marks</Text>
            <Text style={[styles.detailValue, { color: colors.text }]}>{item.totalMarks}</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Exams" showBack onBackPress={() => navigation.goBack()} />
      
      <View style={[styles.summaryCard, { backgroundColor: colors.primary }]}>
        <Text style={styles.summaryTitle}>Academic Performance</Text>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>
              {mockExamResults.reduce((acc, r) => acc + r.marksObtained, 0)}
            </Text>
            <Text style={styles.summaryLabel}>Total Marks</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>
              {(mockExamResults.reduce((acc, r) => acc + r.percentage, 0) / mockExamResults.length).toFixed(1)}%
            </Text>
            <Text style={styles.summaryLabel}>Average</Text>
          </View>
        </View>
      </View>

      {isLoading ? (
        <Loader />
      ) : (
        <FlatList
          data={mockExams}
          renderItem={renderExamItem}
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
  summaryTitle: { color: '#fff', fontSize: 18, fontWeight: '600', marginBottom: 16 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-around' },
  summaryItem: { alignItems: 'center' },
  summaryValue: { color: '#fff', fontSize: 32, fontWeight: 'bold' },
  summaryLabel: { color: '#fff', opacity: 0.8, fontSize: 14, marginTop: 4 },
  examHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  examName: { fontSize: 18, fontWeight: '600' },
  examSubject: { fontSize: 14, marginTop: 2 },
  examBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
  examBadgeText: { fontSize: 12, fontWeight: '600' },
  examDetails: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, paddingTop: 12 },
  detailItem: { alignItems: 'center' },
  detailLabel: { fontSize: 12 },
  detailValue: { fontSize: 14, fontWeight: '600', marginTop: 2 },
});

export default ExamListScreen;
