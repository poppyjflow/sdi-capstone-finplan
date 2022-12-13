import React, { useState } from 'react';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Form, useActionData, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import ranks from './ranks';

const branches = ['usaf', 'ussf', 'usa', 'usmc', 'usn', 'uscg', 'civ'];

const Register = () => {
  const [selectedBranch, setSelectedBranch] = useState('default');
  const test = useActionData();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('hi');
  };

  const handleBranchSelect = (e) => {
    e.preventDefault();
    console.log('select thingy', e.target.textContent);
    setSelectedBranch(e.target.textContent);
  };

  const getRanks = (branch) => {
    return ranks.reduce(())
  };

  // console.log(test);
  return (
    <>
      <Form method='post' onSubmit={handleSubmit} >
        <Grid2 container spacing={2}>
          <Grid2 xs={2}>
            <Autocomplete
              fullWidth
              options={branches}
              onChange={handleBranchSelect}
              renderInput={(params) => <TextField {...params} label="branch" />}
              inputprops={{ name: 'branch', required: true }} />
          </Grid2>
          <Grid2 xs={2} >
            <Autocomplete
              id='rank'
              fullWidth
              disabled={!branches.includes(selectedBranch)}
              options={ranks[selectedBranch]}
              renderInput={(params) => <TextField {...params} label="rank" />}
              inputprops={{ name: 'rank', required: false }} />
          </Grid2>
          <Grid2 xs={4} >
            <TextField
              label='First Name'
              fullWidth
              inputProps={{ name: 'firstName', required: true }} />
          </Grid2>
          <Grid2 xs={4} >
            <TextField
              label='Last Name'
              fullWidth
              inputProps={{ name: 'lastName', required: true }} />
          </Grid2>
          <Grid2 xs={6} >
            <TextField
              label='Email Address'
              fullWidth
              inputProps={{ name: 'email', type: 'email', required: true }} />
          </Grid2>
          <Grid2 xs={6} >
            <TextField
              label='Password'
              fullWidth
              inputProps={{ name: 'password', type: 'password', required: true }} />
          </Grid2>
          <Grid2 xs={10} />
          <Grid2 xs={2} >
            <Button variant='contained' color='secondary' type='submit'>
              Create Account
            </Button>
          </Grid2>
        </Grid2>
      </Form>
    </>
  );
};

export default Register;