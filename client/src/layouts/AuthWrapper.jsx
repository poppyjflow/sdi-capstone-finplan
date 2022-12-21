import React, { useState, createContext, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import useSessionStorage from '../hooks/useSessionStorage';
import { ThemeProvider } from '@mui/material/styles';
import RootTheme from '../css/RootTheme';
import { createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

const ColorModeContext = createContext({ toggleColorMode: () => { } });

const AuthWrapper = () => {
  const [mode, setMode] = useState('dark');
  const [user, setUser] = useSessionStorage('user', { auth: '', user: '' });

  const colorMode = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode) =>
          prevMode === 'light' ? 'dark' : 'light',
        );
      },
    }),
    [],
  );

  const theme = React.useMemo(() => createTheme(RootTheme(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode} >
      <ThemeProvider theme={theme} >
        <Box height='inherit' width='100%' bgcolor='background.default'>
          <Outlet context={[user, setUser,]} />
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default AuthWrapper;
export { ColorModeContext };