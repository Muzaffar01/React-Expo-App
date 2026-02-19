import React from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  Modal,
} from 'react-native';
import { useTheme } from '../../theme';

interface LoaderProps {
  size?: 'small' | 'large';
  color?: string;
  message?: string;
  fullScreen?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({
  size = 'large',
  color,
  message,
  fullScreen = false,
}) => {
  const { colors, spacing, typography } = useTheme();
  const loaderColor = color || colors.primary;

  if (fullScreen) {
    return (
      <Modal transparent visible animationType="fade">
        <View style={[styles.fullScreenContainer, { backgroundColor: colors.background + 'E6' }]}>
          <View style={[styles.loaderContainer, { backgroundColor: colors.surface }]}>
            <ActivityIndicator size={size} color={loaderColor} />
            {message && (
              <Text
                style={[
                  styles.message,
                  {
                    color: colors.text,
                    fontSize: typography.body.fontSize,
                    marginTop: spacing.sm,
                  },
                ]}
              >
                {message}
              </Text>
            )}
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={loaderColor} />
      {message && (
        <Text
          style={[
            styles.message,
            {
              color: colors.textSecondary,
              fontSize: typography.bodySmall.fontSize,
              marginTop: spacing.xs,
            },
          ]}
        >
          {message}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullScreenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderContainer: {
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 120,
  },
  message: {
    textAlign: 'center',
  },
});

export default Loader;
