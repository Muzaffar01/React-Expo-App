import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { useTheme } from '../../../shared/theme';
import { Card, Header } from '../../../shared/components';
import { useAuthStore, useThemeStore } from '../../../store';

interface SettingsScreenProps {
  navigation: any;
}

interface MenuItem {
  title: string;
  icon: string;
  onPress: () => void;
  showArrow?: boolean;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const { colors, spacing } = useTheme();
  const { user, logout } = useAuthStore();
  const { isDark, toggleTheme } = useThemeStore();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => logout() },
      ]
    );
  };

  const menuSections = [
    {
      title: 'Account',
      items: [
        { title: 'Edit Profile', icon: '👤', onPress: () => {}, showArrow: true },
        { title: 'Change Password', icon: '🔐', onPress: () => {}, showArrow: true },
      ] as MenuItem[],
    },
    {
      title: 'Preferences',
      items: [
        { 
          title: 'Dark Mode', 
          icon: '🌙', 
          onPress: () => toggleTheme(),
          rightElement: <Switch value={isDark} onValueChange={() => toggleTheme()} trackColor={{ true: colors.primary }} />,
        },
        { 
          title: 'Notifications', 
          icon: '🔔', 
          onPress: () => setNotificationsEnabled(!notificationsEnabled),
          rightElement: <Switch value={notificationsEnabled} onValueChange={() => setNotificationsEnabled(!notificationsEnabled)} trackColor={{ true: colors.primary }} />,
        },
      ] as MenuItem[],
    },
    {
      title: 'Support',
      items: [
        { title: 'Help & FAQ', icon: '❓', onPress: () => {}, showArrow: true },
        { title: 'Contact Us', icon: '📧', onPress: () => {}, showArrow: true },
        { title: 'Privacy Policy', icon: '📜', onPress: () => {}, showArrow: true },
        { title: 'Terms of Service', icon: '📋', onPress: () => {}, showArrow: true },
      ] as MenuItem[],
    },
    {
      title: 'About',
      items: [
        { title: 'App Version', icon: 'ℹ️', onPress: () => Alert.alert('Version', 'TBMS Connect v1.0.0') },
      ] as MenuItem[],
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Settings" showBack onBackPress={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={{ padding: spacing.md }}>
        <Card style={{ marginBottom: spacing.md }}>
          <View style={styles.profileSection}>
            <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
              <Text style={styles.avatarText}>
                {user?.firstName?.charAt(0) || 'U'}{user?.lastName?.charAt(0) || ''}
              </Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={[styles.profileName, { color: colors.text }]}>
                {user?.firstName} {user?.lastName}
              </Text>
              <Text style={[styles.profileEmail, { color: colors.textSecondary }]}>
                {user?.email}
              </Text>
              <View style={[styles.roleBadge, { backgroundColor: colors.primary + '20' }]}>
                <Text style={[styles.roleText, { color: colors.primary }]}>
                  {user?.role?.charAt(0).toUpperCase()}{user?.role?.slice(1)}
                </Text>
              </View>
            </View>
          </View>
        </Card>

        {menuSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>{section.title}</Text>
            <Card>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  style={[
                    styles.menuItem,
                    { borderBottomColor: itemIndex < section.items.length - 1 ? colors.border : 'transparent' },
                  ]}
                  onPress={item.onPress}
                >
                  <Text style={styles.menuIcon}>{item.icon}</Text>
                  <Text style={[styles.menuTitle, { color: colors.text }]}>{item.title}</Text>
                  {item.rightElement || (item.showArrow && (
                    <Text style={[styles.arrow, { color: colors.textSecondary }]}>→</Text>
                  ))}
                </TouchableOpacity>
              ))}
            </Card>
          </View>
        ))}

        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  profileSection: { flexDirection: 'row', alignItems: 'center', padding: 8 },
  avatar: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  profileInfo: { marginLeft: 16, flex: 1 },
  profileName: { fontSize: 18, fontWeight: '600' },
  profileEmail: { fontSize: 14, marginTop: 2 },
  roleBadge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, marginTop: 8 },
  roleText: { fontSize: 12, fontWeight: '600' },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 13, fontWeight: '600', marginBottom: 8, marginLeft: 4, textTransform: 'uppercase' },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1 },
  menuIcon: { fontSize: 20, marginRight: 12 },
  menuTitle: { flex: 1, fontSize: 15 },
  arrow: { fontSize: 18 },
  logoutButton: { marginTop: 20, marginBottom: 40 },
  logoutText: { color: '#EF4444', fontSize: 16, fontWeight: '600', textAlign: 'center' },
});

export default SettingsScreen;
