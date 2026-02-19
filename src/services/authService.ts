import { httpClient } from './api';
import { LoginCredentials, AuthResponse, User } from '../shared/types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await httpClient.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  async logout(): Promise<void> {
    await httpClient.post('/auth/logout');
  },

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const response = await httpClient.post<AuthResponse>('/auth/refresh', {
      refreshToken,
    });
    return response.data;
  },

  async forgotPassword(email: string): Promise<{ message: string }> {
    const response = await httpClient.post<{ message: string }>('/auth/forgot-password', {
      email,
    });
    return response.data;
  },

  async verifyOTP(email: string, otp: string): Promise<{ valid: boolean }> {
    const response = await httpClient.post<{ valid: boolean }>('/auth/verify-otp', {
      email,
      otp,
    });
    return response.data;
  },

  async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    const response = await httpClient.post<{ message: string }>('/auth/reset-password', {
      token,
      newPassword,
    });
    return response.data;
  },

  async getCurrentUser(): Promise<User> {
    const response = await httpClient.get<User>('/auth/me');
    return response.data;
  },

  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await httpClient.patch<User>('/auth/profile', data);
    return response.data;
  },

  async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<{ message: string }> {
    const response = await httpClient.post<{ message: string }>('/auth/change-password', {
      currentPassword,
      newPassword,
    });
    return response.data;
  },
};

export default authService;
