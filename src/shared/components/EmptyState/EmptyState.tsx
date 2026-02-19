import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme';
import Button from '../Button/Button';

interface EmptyStateProps {
  title: string;
  message?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  message,
  icon,
  actionLabel,
  onAction,
}) => {
  const { colors, spacing, typography } = useTheme();

  return (
    <View style={styles.container}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text
        style={[
          styles.title,
          {
            color: colors.text,
            fontSize: typography.h3.fontSize,
            fontWeight: typography.h3.fontWeight,
          },
        ]}
      >
        {title}
      </Text>
      {message && (
        <Text
          style={[
            styles.message,
            {
              color: colors.textSecondary,
              fontSize: typography.body.fontSize,
              marginTop: spacing.xs,
            },
          ]}
        >
          {message}
        </Text>
      )}
      {actionLabel && onAction && (
        <View style={[styles.buttonContainer, { marginTop: spacing.lg }]}>
          <Button title={actionLabel} onPress={onAction} variant="primary" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
  },
  buttonContainer: {
    minWidth: 150,
  },
});

export default EmptyState;
