import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  elevation?: number;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  onPress,
  elevation = 2,
}) => {
  const { colors, spacing, borderRadius } = useTheme();

  const cardStyle: ViewStyle = {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: elevation,
    },
    shadowOpacity: 0.1,
    shadowRadius: elevation * 2,
    elevation: elevation,
    borderWidth: 1,
    borderColor: colors.border,
  };

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={[cardStyle, style]}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={[cardStyle, style]}>{children}</View>;
};

export default Card;
