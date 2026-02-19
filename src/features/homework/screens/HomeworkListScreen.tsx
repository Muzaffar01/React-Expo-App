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
import { mockHomework } from '../../../services/mockDataService';
import { Homework } from '../../../shared/types';

interface HomeworkListScreenProps {
  navigation: any;
}

export const HomeworkListScreen: React.FC<HomeworkListScreenProps> = ({ navigation }) => {
  const { colors, spacing } = useTheme();
  const [isLoading] = React.useState(false);

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'submitted': return colors.warning;
      case 'graded': return colors.success;
      default: return colors.error;
    }
  };

  const renderItem = ({ item }: { item: Homework }) => (
    <TouchableOpacity onPress={() => navigation.navigate('HomeworkDetail', { homeworkId: item.id })}>
      <Card style={{ marginBottom: spacing.sm }}>
        <View style={styles.header}>
          <View style={[styles.subjectBadge, { backgroundColor: colors.primary + '20' }]}>
            <Text style={[styles.subjectText, { color: colors.primary }]}>{item.subjectName}</Text>
          </View>
          {item.status && (
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
              <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </Text>
            </View>
          )}
        </View>
        <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
        <Text style={[styles.description, { color: colors.textSecondary }]} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={[styles.footer, { borderTopColor: colors.border }]}>
          <View style={styles.footerItem}>
            <Text style={[styles.footerLabel, { color: colors.textSecondary }]}>Due Date</Text>
            <Text style={[styles.footerValue, { color: colors.text }]}>{item.dueDate}</Text>
          </View>
          <View style={styles.footerItem}>
            <Text style={[styles.footerLabel, { color: colors.textSecondary }]}>Class</Text>
            <Text style={[styles.footerValue, { color: colors.text }]}>{item.className}</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Homework" showBack onBackPress={() => navigation.goBack()} />
      
      <View style={styles.tabs}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={[styles.tabText, styles.activeTabText]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Pending</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Submitted</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Graded</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <Loader />
      ) : (
        <FlatList
          data={mockHomework}
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
  tabs: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 8 },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'transparent' },
  activeTab: { borderBottomColor: '#2563EB' },
  tabText: { fontSize: 14, color: '#64748B' },
  activeTabText: { color: '#2563EB', fontWeight: '600' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  subjectBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  subjectText: { fontSize: 12, fontWeight: '600' },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  statusText: { fontSize: 12, fontWeight: '600' },
  title: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  description: { fontSize: 14, marginBottom: 12 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, paddingTop: 12, marginTop: 4 },
  footerItem: {},
  footerLabel: { fontSize: 12 },
  footerValue: { fontSize: 14, fontWeight: '500', marginTop: 2 },
});

export default HomeworkListScreen;
