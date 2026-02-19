import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useTheme } from '../../theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBackPress?: () => void;
  rightAction?: {
    icon: React.ReactNode;
    onPress: () => void;
  };
  leftAction?: {
    icon: React.ReactNode;
    onPress: () => void;
  };
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  onBackPress,
  rightAction,
  leftAction,
  subtitle,
}) => {
  const { colors, spacing, typography } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.background}
      />
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
            paddingTop: insets.top + spacing.sm,
            paddingBottom: spacing.sm,
            paddingHorizontal: spacing.md,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
          },
        ]}
      >
        <View style={styles.leftContainer}>
          {showBack && (
            <TouchableOpacity
              onPress={onBackPress}
              style={styles.backButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={{ color: colors.primary, fontSize: 24 }}>←</Text>
            </TouchableOpacity>
          )}
          {leftAction && (
            <TouchableOpacity
              onPress={leftAction.onPress}
              style={styles.actionButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              {leftAction.icon}
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.titleContainer}>
          <Text
            style={[
              styles.title,
              {
                color: colors.text,
                fontSize: typography.h3.fontSize,
                fontWeight: typography.h3.fontWeight,
              },
            ]}
            numberOfLines={1}
          >
            {title}
          </Text>
          {subtitle && (
            <Text
              style={[
                styles.subtitle,
                {
                  color: colors.textSecondary,
                  fontSize: typography.caption.fontSize,
                },
              ]}
              numberOfLines={1}
            >
              {subtitle}
            </Text>
          )}
        </View>
        <View style={styles.rightContainer}>
          {rightAction && (
            <TouchableOpacity
              onPress={rightAction.onPress}
              style={styles.actionButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              {rightAction.icon}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 48,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 48,
    justifyContent: 'flex-end',
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
  backButton: {
    padding: 4,
  },
  actionButton: {
    padding: 4,
  },
});

export default Header;
