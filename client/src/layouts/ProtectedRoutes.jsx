import React from 'react';
import { useEffect } from 'react';
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Box from '@mui/material/Box';

const ProtectedRoutes = () => {
  const [user, setUser] = useOutletContext();

  console.log('Protected Routes context obj', user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.auth) navigate('/');
  }, [user]);

  return (
    <Box className='page' height='100%'>
      <Navbar />
      <Box
        className='content'
        width='100%'
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
        justifyContent='space-around'
      >
      </Box>
    </Box>
  );

};

export default ProtectedRoutes;