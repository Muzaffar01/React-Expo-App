import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme';

interface InputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  editable?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
  onFocus?: () => void;
  onBlur?: () => void;
  maxLength?: number;
  testID?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  editable = true,
  multiline = false,
  numberOfLines = 1,
  leftIcon,
  rightIcon,
  style,
  onFocus,
  onBlur,
  maxLength,
  testID,
}) => {
  const { colors, spacing, borderRadius, typography } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const getBorderColor = () => {
    if (error) return colors.error;
    if (isFocused) return colors.primary;
    return colors.border;
  };

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text
          style={[
            styles.label,
            {
              color: error ? colors.error : colors.text,
              fontSize: typography.bodySmall.fontSize,
              marginBottom: spacing.xs,
            },
          ]}
        >
          {label}
        </Text>
      )}
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: editable ? colors.surface : colors.disabled + '20',
            borderColor: getBorderColor(),
            borderRadius: borderRadius.md,
            paddingHorizontal: spacing.md,
          },
        ]}
      >
        {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
        <TextInput
          testID={testID}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          secureTextEntry={isSecure}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          editable={editable}
          multiline={multiline}
          numberOfLines={numberOfLines}
          onFocus={handleFocus}
          onBlur={handleBlur}
          maxLength={maxLength}
          style={[
            styles.input,
            {
              color: colors.text,
              fontSize: typography.body.fontSize,
              paddingVertical: spacing.sm,
            },
            leftIcon ? { paddingLeft: 0 } : null,
            rightIcon ? { paddingRight: 0 } : null,
          ]}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setIsSecure(!isSecure)}
            style={styles.eyeIcon}
          >
            <Text style={{ color: colors.textSecondary }}>
              {isSecure ? 'Show' : 'Hide'}
            </Text>
          </TouchableOpacity>
        )}
        {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
      </View>
      {error && (
        <Text
          style={[
            styles.error,
            {
              color: colors.error,
              fontSize: typography.caption.fontSize,
              marginTop: spacing.xs,
            },
          ]}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  input: {
    flex: 1,
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
  eyeIcon: {
    padding: 4,
  },
  error: {
    marginLeft: 4,
  },
});

export default Input;
