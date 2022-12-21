import React from 'react';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import BannerButton from '../components/BannerButton';

const Root = () => {
  const navigate = useNavigate();

  const handleEnter = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <Box
      height='100vh'
    >
      <Box className='banner'>
        <BannerButton action={handleEnter} />
      </Box>
      <footer className='footer'
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '30%',
          right: '30%',
          display: 'flex',
          textAlign: 'center',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
      </footer>
    </Box>
  );
};

export default Root;