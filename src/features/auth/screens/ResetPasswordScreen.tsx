import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTheme } from '../../../shared/theme';
import { Button, Input } from '../../../shared/components';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { AuthStackParamList } from '../../../app/navigation/types';
import authService from '../../../services/authService';

const resetPasswordSchema = yup.object({
  newPassword: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number'),

  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('newPassword')], 'Passwords must match'),
});

interface ResetPasswordForm {
  newPassword: string;
  confirmPassword: string;
}

interface ResetPasswordScreenProps {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'ResetPassword'>;
  route: RouteProp<AuthStackParamList, 'ResetPassword'>;
}

export const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = ({ navigation, route }) => {
  const { token } = route.params;
  const { colors, spacing, typography } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordForm>({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: ResetPasswordForm) => {
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      await authService.resetPassword(token, data.newPassword);
      Alert.alert('Password Reset', 'Your password has been reset successfully.', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Login'),
        },
      ]);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to reset password';
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPasswordStrength = (
    password: string
  ): { label: string; color: string; width: `${number}%` } => {
    if (password.length === 0) return { label: '', color: colors.border, width: '0%' };
    if (password.length < 8) return { label: 'Weak', color: colors.error, width: '33%' };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 2) return { label: 'Weak', color: colors.error, width: '33%' };
    if (strength <= 3) return { label: 'Medium', color: colors.warning, width: '66%' };
    return { label: 'Strong', color: colors.success, width: '100%' };
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: colors.background, padding: spacing.lg },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={[styles.backText, { color: colors.primary }]}>Back</Text>
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.text, fontSize: typography.h1.fontSize }]}>
            New Password
          </Text>
          <Text
            style={[styles.subtitle, { color: colors.textSecondary, fontSize: typography.body.fontSize }]}
          >
            Create a strong password for your account.
          </Text>

          <Controller
            control={control}
            name="newPassword"
            render={({ field: { onChange, onBlur, value } }) => {
              const strength = getPasswordStrength(value);

              return (
                <View>
                  <Input
                    label="New Password"
                    placeholder="Enter new password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.newPassword?.message}
                    secureTextEntry
                  />
                  {value.length > 0 && (
                    <View style={styles.strengthContainer}>
                      <View style={[styles.strengthBar, { backgroundColor: colors.border }]}>
                        <View
                          style={[
                            styles.strengthFill,
                            { backgroundColor: strength.color, width: strength.width },
                          ]}
                        />
                      </View>
                      <Text style={[styles.strengthLabel, { color: strength.color }]}>{strength.label}</Text>
                    </View>
                  )}
                </View>
              );
            }}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Confirm Password"
                placeholder="Re-enter new password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.confirmPassword?.message}
                secureTextEntry
              />
            )}
          />

          {submitError ? (
            <Text style={[styles.submitError, { color: colors.error }]}>{submitError}</Text>
          ) : null}

          <View style={[styles.requirements, { backgroundColor: colors.surface }]}>
            <Text style={[styles.requirementsTitle, { color: colors.text }]}>Password requirements:</Text>
            <Text style={[styles.requirement, { color: colors.textSecondary }]}>- At least 8 characters</Text>
            <Text style={[styles.requirement, { color: colors.textSecondary }]}>- One uppercase letter</Text>
            <Text style={[styles.requirement, { color: colors.textSecondary }]}>- One lowercase letter</Text>
            <Text style={[styles.requirement, { color: colors.textSecondary }]}>- One number</Text>
          </View>

          <Button
            title="Reset Password"
            onPress={handleSubmit(onSubmit)}
            isLoading={isSubmitting}
            disabled={isSubmitting}
            fullWidth
            style={{ marginTop: spacing.md }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  backButton: {
    marginBottom: 20,
    padding: 4,
  },
  backText: {
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 24,
  },
  strengthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -12,
    marginBottom: 16,
  },
  strengthBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    marginRight: 8,
  },
  strengthFill: {
    height: 4,
    borderRadius: 2,
  },
  strengthLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  submitError: {
    fontSize: 13,
    marginBottom: 12,
  },
  requirements: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  requirementsTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  requirement: {
    fontSize: 12,
    marginVertical: 2,
  },
});

export default ResetPasswordScreen;
