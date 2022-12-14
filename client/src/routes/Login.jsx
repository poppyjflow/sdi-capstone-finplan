import React from 'react';
import Box from '@mui/material/Box';
import { Form, useActionData, useOutletContext } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect } from 'react';

const Login = () => {
  const [user, setUser] = useOutletContext();

  const test = useActionData();
  console.log('action data: ', test);

  useEffect(() => {
    console.log('login use effect', user);
    if (test) {
      setUser(test);
    }
  }, [test]);

  return (
    <Box
      className='login'
      display='flex'
      flexDirection='column'
      alignContent='center'
      flexWrap='wrap'
    >
      <Form
        style={{ display: 'contents' }}
        method='post'>
        <TextField
          sx={{ width: '20%', mr: 3 }}
          label='Email'
          inputProps={{ name: 'email', required: true }} />
        <TextField
          sx={{ width: '20%', mr: 3 }}
          label='Password'
          inputProps={{ name: 'password', type: 'password', required: true }} />
        <Button
          sx={{ width: '20%' }}
          variant='contained'
          type='submit'>
          Login
        </Button>
      </Form>
    </Box>
  );
};

export default Login;