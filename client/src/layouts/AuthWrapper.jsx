import React from 'react';
import { Outlet } from 'react-router-dom';
import useSessionStorage from '../hooks/useSessionStorage';
import { ThemeProvider } from '@mui/material/styles';
import RootTheme from '../css/RootTheme';
import { createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

const AuthWrapper = () => {
  const [user, setUser] = useSessionStorage('user', { auth: '', user: '' });

  const theme = createTheme(RootTheme('dark'));

  return (
    <ThemeProvider theme={theme} >
      <Box className='auth' height='stretch' width='100%' bgcolor='background.default'>
        <Outlet context={[user, setUser,]} />
      </Box>
    </ThemeProvider>
  );
};

export default AuthWrapper;