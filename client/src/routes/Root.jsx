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
    <Box className='banner'>
      <BannerButton action={handleEnter} />
    </Box>
  );
};

export default Root;