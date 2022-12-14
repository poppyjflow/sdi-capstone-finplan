import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Form } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { useOutletContext } from 'react-router-dom';
import { useEffect } from 'react';

const RequestForm = () => {
  const [user] = useOutletContext();
  const [org, setOrg] = useState('');

  return (
    <Box>
      <Paper>
        <Form>
          <Grid2 container spacing={2}>
            <Grid2 xs={3}>
              <InputLabel id='org'>Org</InputLabel>
              <Select
                labelId='org'
                fullWidth
                value={org}
              >

              </Select>
            </Grid2>
            <Grid2 xs={3}>
            </Grid2>
            <Grid2 xs={3}>
            </Grid2>
            <Grid2 xs={3}>
            </Grid2>
            <Grid2 xs={4}>
            </Grid2>
            <Grid2 xs={8}>
            </Grid2>
            <Grid2 xs={12}>
              <TextField
                fullWidth
                label='Description'
                multiline
              >

              </TextField>
            </Grid2>
          </Grid2>
        </Form>
      </Paper>
    </Box>
  );
};

export default RequestForm;