import { create } from 'zustand';
import { User, AuthTokens, LoginCredentials } from '../shared/types';
import authService from '../services/authService';
import { tokenService } from '../services/api';

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User) => void;
  clearError: () => void;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (credentials: LoginCredentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.login(credentials);
      await tokenService.setTokens(
        response.tokens.accessToken,
        response.tokens.refreshToken
      );
      set({
        user: response.user,
        tokens: response.tokens,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Login failed';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await authService.logout();
    } catch {
      // Ignore logout errors
    } finally {
      await tokenService.clearTokens();
      set({
        user: null,
        tokens: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  setUser: (user: User) => {
    set({ user });
  },

  clearError: () => {
    set({ error: null });
  },

  initializeAuth: async () => {
    set({ isLoading: true });
    try {
      const accessToken = await tokenService.getAccessToken();
      const refreshToken = await tokenService.getRefreshToken();

      if (accessToken && refreshToken) {
        const user = await authService.getCurrentUser();
        set({
          user,
          tokens: { accessToken, refreshToken, expiresIn: 900 },
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        set({ isLoading: false });
      }
    } catch {
      await tokenService.clearTokens();
      set({
        user: null,
        tokens: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
}));

export default useAuthStore;
