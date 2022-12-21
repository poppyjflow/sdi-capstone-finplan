import React, { useState, createContext, useMemo, useEffect } from 'react';
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Box from '@mui/material/Box';
import RootTheme from '../css/RootTheme';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import SideDrawer from '../components/SideDrawer';

const ColorModeContext = createContext({ toggleColorMode: () => { } });

const ProtectedRoutes = () => {
  const [user, setUser] = useOutletContext();
  const [drawerWidth, setDrawerWidth] = useState(80);
  const [mode, setMode] = useState('dark');
  const navProps = { width: '100%', ml: `${drawerWidth}px` }
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.auth) navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const theme = useMemo(() => createTheme(RootTheme(mode)), [mode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) =>
          prevMode === 'light' ? 'dark' : 'light',
        );
      },
    }),
    [],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme} >
        <Box
          height='stretch'
          width='100%'
          bgcolor='background.default'
          className='page'
          display='flex'
        >
          <Navbar navProps={navProps} />
          <SideDrawer />
          <Box
            component='main'
            flexGrow={1}
            className='content'
            width='100%'
            display='flex'
            flexDirection='column'
            justifyContent='center'
            p={3}
          >
            <Toolbar />
            <Outlet context={[user, setUser]} />
          </Box>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );

};

export default ProtectedRoutes;
export { ColorModeContext };