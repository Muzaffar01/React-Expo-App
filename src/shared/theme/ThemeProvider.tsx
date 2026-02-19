import React, { createContext, useContext, ReactNode } from 'react';
import { Theme, ThemeColors, ThemeSpacing, ThemeBorderRadius, ThemeTypography } from '../types';
import { lightColors, darkColors } from './colors';
import { spacing, borderRadius } from './spacing';
import { typography } from './typography';

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  colors: ThemeColors;
  spacing: ThemeSpacing;
  borderRadius: ThemeBorderRadius;
  typography: ThemeTypography;
}

const lightTheme: Theme = {
  colors: lightColors,
  spacing,
  borderRadius,
  typography,
};

const darkTheme: Theme = {
  colors: darkColors,
  spacing,
  borderRadius,
  typography,
};

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  isDark: false,
  colors: lightColors,
  spacing,
  borderRadius,
  typography,
});

interface ThemeProviderProps {
  children: ReactNode;
  isDark?: boolean;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  isDark = false,
}) => {
  const theme = isDark ? darkTheme : lightTheme;
  const colors = theme.colors;

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      isDark, 
      colors,
      spacing: theme.spacing,
      borderRadius: theme.borderRadius,
      typography: theme.typography,
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export { lightTheme, darkTheme };
