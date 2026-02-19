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
import { mockAnnouncements } from '../../../services/mockDataService';
import { Announcement } from '../../../shared/types';

interface AnnouncementListScreenProps {
  navigation: any;
}

export const AnnouncementListScreen: React.FC<AnnouncementListScreenProps> = ({ navigation }) => {
  const { colors, spacing } = useTheme();
  const [isLoading] = React.useState(false);
  const [selectedFilter, setSelectedFilter] = React.useState<string>('all');

  const filters = ['all', 'high', 'medium', 'low'];

  const filteredAnnouncements = selectedFilter === 'all' 
    ? mockAnnouncements 
    : mockAnnouncements.filter(a => a.priority === selectedFilter);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return colors.error;
      case 'medium': return colors.warning;
      default: return colors.info;
    }
  };

  const renderItem = ({ item }: { item: Announcement }) => (
    <TouchableOpacity onPress={() => navigation.navigate('AnnouncementDetail', { announcementId: item.id })}>
      <Card style={{ marginBottom: spacing.sm }}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={[styles.priorityDot, { backgroundColor: getPriorityColor(item.priority) }]} />
            <Text style={[styles.priority, { color: getPriorityColor(item.priority) }]}>
              {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
            </Text>
          </View>
          <Text style={[styles.date, { color: colors.textSecondary }]}>
            {new Date(item.createdAt).toLocaleDateString()}
          </Text>
        </View>
        
        <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
        <Text style={[styles.message, { color: colors.textSecondary }]} numberOfLines={2}>
          {item.message}
        </Text>
        
        <View style={styles.footer}>
          <View style={styles.roleTags}>
            {item.targetRoles.slice(0, 3).map((role) => (
              <View key={role} style={[styles.roleTag, { backgroundColor: colors.primary + '20' }]}>
                <Text style={[styles.roleText, { color: colors.primary }]}>{role}</Text>
              </View>
            ))}
          </View>
          <Text style={[styles.seeMore, { color: colors.primary }]}>Read More →</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Announcements" showBack onBackPress={() => navigation.goBack()} />

      <View style={styles.filterContainer}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterTab,
              { backgroundColor: selectedFilter === filter ? colors.primary : colors.surface },
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text style={[
              styles.filterText,
              { color: selectedFilter === filter ? '#fff' : colors.text }
            ]}>
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {isLoading ? (
        <Loader />
      ) : (
        <FlatList
          data={filteredAnnouncements}
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
  filterContainer: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 12 },
  filterTab: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 16, marginHorizontal: 4 },
  filterText: { fontSize: 13, fontWeight: '500' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  priorityDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  priority: { fontSize: 12, fontWeight: '600' },
  date: { fontSize: 12 },
  title: { fontSize: 16, fontWeight: '600', marginBottom: 6 },
  message: { fontSize: 14, lineHeight: 20, marginBottom: 12 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  roleTags: { flexDirection: 'row' },
  roleTag: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10, marginRight: 6 },
  roleText: { fontSize: 10, fontWeight: '500' },
  seeMore: { fontSize: 13, fontWeight: '500' },
});

export default AnnouncementListScreen;
