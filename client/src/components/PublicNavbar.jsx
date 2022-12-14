import AppBar from '@mui/material/AppBar';
import ToolBar from '@mui/material/Toolbar';
import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const PublicNavbar = () => {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(e);
    navigate('/register');
  };

  const handleLog = (e) => {
    e.preventDefault();
    console.log(e);
    navigate('/login');
  };

  const handleHome = (e) => {
    e.preventDefault();
    console.log(e);
    navigate('/');
  };


  return (
    <>
      <AppBar
        sx={{
          overflow: 'hidden',
          mb: 2,
        }}
        position='static'
      >
        <ToolBar>
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
          </Box>
          <Box>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Button
                aria-label='home'
                variant='contained'
                onClick={handleHome}
              >
                Home
              </Button>
              <Button
                aria-label='login'
                variant='contained'
                onClick={handleLog}
              >
                Login
              </Button>
              <Button
                aria-label='sign-up'
                variant='contained'
                onClick={handleRegister}
              >
                Signup
              </Button>
            </Stack>
          </Box>
        </ToolBar>
      </AppBar>
    </>
  );
};

export default PublicNavbar;