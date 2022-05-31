import React from 'react';
import RouterConfig from '@/routes/RouterConfig';
import { GlobalStyle } from '@/globalStyle';
import { ThemeContext } from '@/themes/context';
import { useTheme } from '@/hooks/useTheme';

function App() {
  const { theme, toggleTheme, themeValues } = useTheme();

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeValues, }}>
      <>
        <GlobalStyle theme={themeValues} />
        <RouterConfig />
      </>
    </ThemeContext.Provider>
  );
}

export default App;
