import React from 'react';
import { useEffect } from 'react';
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom';
import PublicNavbar from '../components/PublicNavbar';
import Box from '@mui/material/Box';

const PublicRoutes = () => {
  const [user, setUser] = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.auth) navigate('/main');
  }, [user]);

  return (
    <Box className='page' width='100%'>
      <PublicNavbar />
      <Box
        className='content'
        position='absolute'
        left='10%'
        right='10%'
        display='flex'
        flexDirection='column'
        justifyContent='center'
      >
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
        justifyContent='center'
      >
      </Box>
    </Box>
  );

};

export default PublicRoutes;