import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from './types';
import { LoginScreen } from '../../features/auth/screens/LoginScreen';
import { ForgotPasswordScreen } from '../../features/auth/screens/ForgotPasswordScreen';
import { OTPVerificationScreen } from '../../features/auth/screens/OTPVerificationScreen';
import { ResetPasswordScreen } from '../../features/auth/screens/ResetPasswordScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
