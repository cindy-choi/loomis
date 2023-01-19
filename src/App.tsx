import React from 'react';
import RouterConfig from '@/routes/RouterConfig';
import { GlobalStyle } from '@/globalStyle';
import { ThemeContext } from '@/themes/context';
import { useTheme } from '@/hooks/useTheme';
import { AuthProvider } from '@/contexts/auth';

function App() {
  const { theme, toggleTheme, themeValues } = useTheme();

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeValues }}>
      <AuthProvider>
        <GlobalStyle theme={themeValues} />
        <RouterConfig />
      </AuthProvider>
    </ThemeContext.Provider>
  );
}

export default App;
