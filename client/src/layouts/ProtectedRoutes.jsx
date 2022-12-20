import React from 'react';
import { useEffect } from 'react';
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';

const ProtectedRoutes = () => {
  const [user, setUser] = useOutletContext();
  const [drawerWidth, setDrawerWidth] = useState(200);

  const navProps = { width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.auth) navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Box className='page' display='flex'>
      <Navbar navProps={navProps} />
      <Drawer
        sx={{
          width: `${drawerWidth}px`,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: `${drawerWidth}px`,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
      </Drawer>
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