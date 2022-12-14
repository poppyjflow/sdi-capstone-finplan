import React, { useState } from 'react';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Form, useActionData, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import ranks from './ranks';
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const branches = ['USAF', 'USSF', 'USA', 'USMC', 'USN', 'USCG', 'CIV'];

const Register = () => {
  const [branch, setBranch] = useState('');
  const [rank, setRank] = useState('');
  const test = useActionData();

  const handleSubmit = (e) => {
    e.preventDefault();

  };

  const handleBranchChange = (e) => {
    e.preventDefault();
    console.log('select thingy', e.target.value);
    setBranch(e.target.value);
  };

  const handleRankChange = (e) => {
    e.preventDefault();
    console.log('select thingy', e.target.value);
    setRank(e.target.value);
  };

  return (
    <Box
      display='flex'
      justifyContent='center'
    >
      <Box width='35%'>
        <Form method='post' onSubmit={handleSubmit} action='/register'>
          <Grid2 container spacing={2}>
            <Grid2 xs={6}>
              <FormControl fullWidth>
                <InputLabel id='branch'>Branch</InputLabel>
                <Select
                  labelId='branch'
                  fullWidth
                  value={branch}
                  label="Branch"
                  onChange={handleBranchChange}
                >
                  {branches.map(branch => <MenuItem value={branch}>{branch}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 xs={6} >
              <FormControl fullWidth>
                <InputLabel id='rank'>Rank</InputLabel>
                <Select
                  disabled={!branches.includes(branch)}
                  labelId='rank'
                  fullWidth
                  value={rank}
                  label='Rank'
                  onChange={handleRankChange}
                >
                  {ranks[branch.toLowerCase()]?.map(rank => <MenuItem value={rank.abbr}>{rank.abbr}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 xs={12} >
              <TextField
                label='First Name'
                fullWidth
                inputProps={{ name: 'firstName', required: true }} />
            </Grid2>
            <Grid2 xs={12} >
              <TextField
                label='Last Name'
                fullWidth
                inputProps={{ name: 'lastName', required: true }} />
            </Grid2>
            <Grid2 xs={12} >
              <TextField
                label='Email Address'
                fullWidth
                inputProps={{ name: 'email', type: 'email', required: true }} />
            </Grid2>
            <Grid2 xs={12} >
              <TextField
                label='Password'
                fullWidth
                inputProps={{ name: 'password', type: 'password', required: true }} />
            </Grid2>
            <Grid2 xs={12} >
              <Button fullWidth variant='contained' color='secondary' type='submit'>
                Create Account
              </Button>
            </Grid2>
          </Grid2>
        </Form>
      </Box>
    </Box>
  );
};

export default Register;