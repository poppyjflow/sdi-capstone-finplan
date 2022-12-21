import React from 'react';
import { useEffect } from 'react';
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import SideDrawer from '../components/SideDrawer';

const ProtectedRoutes = () => {
  const [user, setUser] = useOutletContext();
  const [drawerWidth, setDrawerWidth] = useState(80);
  const navProps = { width: '100%', ml: `${drawerWidth}px` }
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.auth) navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Box className='page' display='flex'>
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
      <Box
        width='100%'
        component='footer'
        height='fit-content'
        position='absolute'
        bottom='0%'
        display='flex'
        textAlign='center'
        justifyContent='space-around'
      >
      </Box>
    </Box>
  );

};

export default ProtectedRoutes;