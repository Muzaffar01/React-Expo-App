import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeState {
  themeMode: ThemeMode;
  isDark: boolean;
  setThemeMode: (mode: ThemeMode) => Promise<void>;
  toggleTheme: () => Promise<void>;
  initializeTheme: () => Promise<void>;
}

const THEME_STORAGE_KEY = 'tbms_theme_mode';

export const useThemeStore = create<ThemeState>((set, get) => ({
  themeMode: 'system',
  isDark: false,

  setThemeMode: async (mode: ThemeMode) => {
    const isDark = mode === 'dark' || 
      (mode === 'system' && window?.matchMedia?.('(prefers-color-scheme: dark)').matches);
    
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch {
      // Ignore storage errors
    }
    
    set({ themeMode: mode, isDark });
  },

  toggleTheme: async () => {
    const currentMode = get().themeMode;
    const newMode = currentMode === 'dark' ? 'light' : 'dark';
    await get().setThemeMode(newMode);
  },

  initializeTheme: async () => {
    try {
      const storedMode = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      const mode = (storedMode as ThemeMode) || 'system';
      await get().setThemeMode(mode);
    } catch {
      set({ isDark: false });
    }
  },
}));

export default useThemeStore;
