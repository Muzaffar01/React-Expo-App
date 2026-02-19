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
import { useAuthStore } from '../../../store';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../app/navigation/types';

const loginSchema = yup.object({
  email: yup.string().required('Email is required').email('Invalid email format'),
  password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
});

interface LoginForm {
  email: string;
  password: string;
}

interface LoginScreenProps {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Login'>;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { colors, spacing, typography } = useTheme();
  const { login, isLoading, error, clearError } = useAuthStore();

  const { control, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginForm) => {
    clearError();
    try {
      await login(data);
    } catch {
      // Error is handled in store
    }
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
        <View style={styles.logoContainer}>
          <View style={[styles.logo, { backgroundColor: colors.primary }]}>
            <Text style={styles.logoText}>TBMS</Text>
          </View>
          <Text style={[styles.appName, { color: colors.text, fontSize: typography.h1.fontSize }]}>
            TBMS Connect
          </Text>
          <Text style={[styles.tagline, { color: colors.textSecondary }]}>
            Your School, Your App
          </Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={[styles.welcomeText, { color: colors.text, fontSize: typography.h2.fontSize }]}>
            Welcome Back
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary, fontSize: typography.body.fontSize }]}>
            Sign in to continue
          </Text>

          {error && (
            <View style={[styles.errorContainer, { backgroundColor: colors.error + '20' }]}>
              <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
            </View>
          )}

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Email"
                placeholder="Enter your email"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.email?.message}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Password"
                placeholder="Enter your password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.password?.message}
                secureTextEntry
              />
            )}
          />

          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
            style={styles.forgotPassword}
          >
            <Text style={[styles.forgotPasswordText, { color: colors.primary }]}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

          <Button
            title="Sign In"
            onPress={handleSubmit(onSubmit)}
            isLoading={isLoading}
            fullWidth
            style={{ marginTop: spacing.md }}
          />
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            Powered by TBMS Connect
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  appName: {
    marginTop: 16,
    fontWeight: 'bold',
  },
  tagline: {
    marginTop: 4,
  },
  formContainer: {
    width: '100%',
  },
  welcomeText: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    marginBottom: 24,
  },
  errorContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 14,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    marginTop: 32,
  },
  footerText: {
    fontSize: 12,
  },
});

export default LoginScreen;
