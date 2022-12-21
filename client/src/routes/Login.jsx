import React from 'react';
import Box from '@mui/material/Box';
import { Form, useActionData, useOutletContext } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Grid2 from '@mui/material/Unstable_Grid2';

const Login = () => {
  const [user, setUser] = useOutletContext();

  const test = useActionData();
  console.log('action data: ', test);

  useEffect(() => {
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
      <Box
        className='form-wrapper'
        borderRadius='8px'
        border='1px solid'
        borderColor='primary.main'
        component={Paper}
        p={2}
      >
        <Form
          style={{ display: 'contents' }}
          method='post'>
          <Grid2 container spacing={1}>
            <Grid2 xs={12}>
              <TextField
                name='email'
                type='email'
                required
                fullWidth
                label='Email'
              />
            </Grid2>
            <Grid2 xs={12}>
              <TextField
                name='password'
                type='password'
                required
                fullWidth
                label='Password'
              />
            </Grid2>
            <Grid2
              xs={12}
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button
                color='secondary'
                variant='contained'
                type='submit'>
                Login
              </Button>
            </Grid2>
          </Grid2>
        </Form>
      </Box>
    </Box >
  );
};

export default Login;