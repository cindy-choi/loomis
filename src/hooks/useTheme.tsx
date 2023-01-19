import { useEffect, useState, useCallback, } from 'react';
import { lightTheme } from '@/themes/theme';
import type { ThemeProps } from '@/themes/theme';

export const useTheme = () => {
  // themes: light, dark
  const [theme, setTheme] = useState<string>('light');
  const [themeValues, setThemeValues] = useState<ThemeProps>(lightTheme);

  const toggleTheme = () => { _setTheme(); };

  const _setTheme = useCallback((_theme?: string) => {
    switch (_theme) {
      case 'light':
        setTheme('dark');
        break;

      default:
      case 'dark':
        setTheme('light');
        break;
    }
  }, []);

  const _setThemeValues = useCallback(() => {
    switch (theme) {
      default:
      case 'light':
        setThemeValues(lightTheme);
        break;

      case 'dark':
        setThemeValues(lightTheme);
    }
  }, [theme]);

  useEffect(() => {
    _setTheme(window.localStorage.getItem('theme') || 'light');
  }, [_setTheme]);

  useEffect(() => {
    _setThemeValues();
  }, [_setThemeValues]);

  return { theme, toggleTheme, themeValues };
};
