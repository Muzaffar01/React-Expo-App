import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTheme } from '../../../shared/theme';
import { Button, Input } from '../../../shared/components';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../app/navigation/types';

const forgotPasswordSchema = yup.object({
  email: yup.string().required('Email is required').email('Invalid email format'),
});

interface ForgotPasswordForm {
  email: string;
}

interface ForgotPasswordScreenProps {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'ForgotPassword'>;
}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ navigation }) => {
  const { colors, spacing, typography } = useTheme();

  const { control, handleSubmit, formState: { errors } } = useForm<ForgotPasswordForm>({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: ForgotPasswordForm) => {
    navigation.navigate('OTPVerification', { email: data.email });
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
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={[styles.backText, { color: colors.primary }]}>← Back</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.text, fontSize: typography.h1.fontSize }]}>
            Reset Password
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary, fontSize: typography.body.fontSize }]}>
            Enter your email address and we'll send you an OTP to reset your password.
          </Text>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Email Address"
                placeholder="Enter your registered email"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.email?.message}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          />

          <Button
            title="Send OTP"
            onPress={handleSubmit(onSubmit)}
            fullWidth
            style={{ marginTop: spacing.md }}
          />

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.resendContainer}
          >
            <Text style={[styles.resendText, { color: colors.textSecondary }]}>
              Remember your password?{' '}
              <Text style={{ color: colors.primary }}>Sign In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  header: {
    marginBottom: 20,
  },
  backButton: {
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
    marginBottom: 32,
  },
  resendContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  resendText: {
    fontSize: 14,
  },
});

export default ForgotPasswordScreen;
