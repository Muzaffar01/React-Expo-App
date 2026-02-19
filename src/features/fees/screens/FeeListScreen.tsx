import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../../shared/theme';
import { Card, Header, Loader, Button } from '../../../shared/components';
import { mockFees } from '../../../services/mockDataService';
import { Fee } from '../../../shared/types';

interface FeeListScreenProps {
  navigation: any;
}

export const FeeListScreen: React.FC<FeeListScreenProps> = ({ navigation }) => {
  const { colors, spacing } = useTheme();
  const [isLoading] = React.useState(false);

  const totalPending = mockFees.reduce((acc, f) => acc + (f.totalAmount - f.paidAmount), 0);
  const totalPaid = mockFees.reduce((acc, f) => acc + f.paidAmount, 0);
  const totalFees = mockFees.reduce((acc, f) => acc + f.totalAmount, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return colors.success;
      case 'partial': return colors.warning;
      case 'overdue': return colors.error;
      default: return colors.textSecondary;
    }
  };

  const renderItem = ({ item }: { item: Fee }) => (
    <TouchableOpacity onPress={() => navigation.navigate('FeeDetail', { feeId: item.id })}>
      <Card style={{ marginBottom: spacing.sm }}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.feeType, { color: colors.text }]}>{item.feeType}</Text>
            <Text style={[styles.academicYear, { color: colors.textSecondary }]}>{item.academicYear}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
            <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Text>
          </View>
        </View>
        
        <View style={styles.amountContainer}>
          <View>
            <Text style={[styles.amountLabel, { color: colors.textSecondary }]}>Total Amount</Text>
            <Text style={[styles.totalAmount, { color: colors.text }]}>₹{item.totalAmount.toLocaleString()}</Text>
          </View>
          <View style={styles.amountDivider} />
          <View>
            <Text style={[styles.amountLabel, { color: colors.textSecondary }]}>Paid</Text>
            <Text style={[styles.paidAmount, { color: colors.success }]}>₹{item.paidAmount.toLocaleString()}</Text>
          </View>
          <View style={styles.amountDivider} />
          <View>
            <Text style={[styles.amountLabel, { color: colors.textSecondary }]}>Due</Text>
            <Text style={[styles.dueAmount, { color: item.status !== 'paid' ? colors.error : colors.text }]}>
              ₹{(item.totalAmount - item.paidAmount).toLocaleString()}
            </Text>
          </View>
        </View>

        <View style={[styles.footer, { borderTopColor: colors.border }]}>
          <Text style={[styles.dueDate, { color: colors.textSecondary }]}>
            Due Date: {item.dueDate}
          </Text>
          {item.status !== 'paid' && (
            <Button
              title="Pay Now"
              size="small"
              onPress={() => navigation.navigate('MakePayment', { feeId: item.id })}
            />
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Fees" showBack onBackPress={() => navigation.goBack()} />

      <View style={[styles.summaryCard, { backgroundColor: colors.primary }]}>
        <Text style={styles.summaryTitle}>Fee Summary</Text>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>₹{totalFees.toLocaleString()}</Text>
            <Text style={styles.summaryLabel}>Total Fees</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>₹{totalPaid.toLocaleString()}</Text>
            <Text style={styles.summaryLabel}>Paid</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>₹{totalPending.toLocaleString()}</Text>
            <Text style={styles.summaryLabel}>Pending</Text>
          </View>
        </View>
        <View style={[styles.progressBar, { backgroundColor: 'rgba(255,255,255,0.3)' }]}>
          <View style={[styles.progressFill, { width: `${(totalPaid / totalFees) * 100}%`, backgroundColor: '#fff' }]} />
        </View>
        <Text style={styles.progressText}>{((totalPaid / totalFees) * 100).toFixed(0)}% Paid</Text>
      </View>

      {isLoading ? (
        <Loader />
      ) : (
        <FlatList
          data={mockFees}
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
  summaryTitle: { color: '#fff', fontSize: 18, fontWeight: '600', marginBottom: 16 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16 },
  summaryItem: { alignItems: 'center' },
  summaryValue: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  summaryLabel: { color: '#fff', opacity: 0.8, fontSize: 12, marginTop: 4 },
  progressBar: { height: 8, borderRadius: 4, overflow: 'hidden', marginBottom: 8 },
  progressFill: { height: '100%', borderRadius: 4 },
  progressText: { color: '#fff', fontSize: 14, textAlign: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  feeType: { fontSize: 18, fontWeight: '600' },
  academicYear: { fontSize: 13, marginTop: 2 },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  statusText: { fontSize: 12, fontWeight: '600' },
  amountContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  amountDivider: { width: 1, backgroundColor: '#E2E8F0' },
  amountLabel: { fontSize: 12 },
  totalAmount: { fontSize: 18, fontWeight: '600' },
  paidAmount: { fontSize: 18, fontWeight: '600' },
  dueAmount: { fontSize: 18, fontWeight: '600' },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, paddingTop: 12 },
  dueDate: { fontSize: 13 },
});

export default FeeListScreen;
