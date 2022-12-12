import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useOutletContext, useNavigate } from 'react-router-dom';
import BannerButton from '../components/BannerButton';

const Root = () => {
  // const [user] = useOutletContext();

  const navigate = useNavigate();

  const handleEnter = (e) => {
    e.preventDefault();
    navigate('/main');
  };

  // console.log('Root context obj: ', user);

  return (
    <Box
      height='100vh'
    >
      <Box className='banner'>
        <BannerButton action={handleEnter} />
        <h1>asdfasdfasd</h1>
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