import React from 'react';
import RequestForm from '../components/RequestForm';
import Box from '@mui/material/Box';

const CreateRequest = () => {
  return (

    <Box
      className='create-request'
      display='flex'
      justifyContent='center'
    >
      <RequestForm />
    </Box>
  );
};

export default CreateRequest;