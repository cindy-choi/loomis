import { createContext } from 'react';
import { lightTheme } from '@/themes/theme';
import type { ThemeProps } from '@/themes/theme';

interface ContextProps {
  theme: string;
  toggleTheme: () => void;
  themeValues: ThemeProps;
}

export const ThemeContext = createContext<ContextProps>({
  theme: 'light',
  toggleTheme: () => { return null; },
  themeValues: lightTheme,
});

export default ThemeContext;
