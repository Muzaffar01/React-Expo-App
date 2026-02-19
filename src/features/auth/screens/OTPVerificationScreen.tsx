import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useTheme } from '../../../shared/theme';
import { Button } from '../../../shared/components';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { AuthStackParamList } from '../../../app/navigation/types';

interface OTPVerificationScreenProps {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'OTPVerification'>;
  route: RouteProp<AuthStackParamList, 'OTPVerification'>;
}

export const OTPVerificationScreen: React.FC<OTPVerificationScreenProps> = ({ navigation, route }) => {
  const { email } = route.params;
  const { colors, spacing, typography } = useTheme();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setIsResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newOtp.every((digit) => digit) && newOtp.join('').length === 6) {
      handleVerify(newOtp.join(''));
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = (otpCode: string = otp.join('')) => {
    if (otpCode.length === 6) {
      navigation.navigate('ResetPassword', { token: 'mock-reset-token' });
    }
  };

  const handleResend = () => {
    setTimer(60);
    setIsResendDisabled(true);
    setOtp(['', '', '', '', '', '']);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background, padding: spacing.lg }]}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={[styles.backText, { color: colors.primary }]}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text, fontSize: typography.h1.fontSize }]}>
          Verify OTP
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary, fontSize: typography.body.fontSize }]}>
          Enter the 6-digit code sent to{'\n'}<Text style={{ color: colors.primary }}>{email}</Text>
        </Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={[
                styles.otpInput,
                {
                  backgroundColor: colors.surface,
                  borderColor: digit ? colors.primary : colors.border,
                  color: colors.text,
                },
              ]}
              value={digit}
              onChangeText={(value) => handleOtpChange(value.slice(-1), index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>

        <Button
          title="Verify OTP"
          onPress={() => handleVerify()}
          fullWidth
          disabled={otp.join('').length !== 6}
          style={{ marginTop: spacing.lg }}
        />

        <View style={styles.resendContainer}>
          {isResendDisabled ? (
            <Text style={[styles.timerText, { color: colors.textSecondary }]}>
              Resend OTP in {timer}s
            </Text>
          ) : (
            <TouchableOpacity onPress={handleResend}>
              <Text style={[styles.resendText, { color: colors.primary }]}>
                Resend OTP
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 32,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  otpInput: {
    width: 48,
    height: 56,
    borderRadius: 12,
    borderWidth: 2,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resendContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  timerText: {
    fontSize: 14,
  },
  resendText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default OTPVerificationScreen;
