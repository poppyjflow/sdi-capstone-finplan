import React, { useState } from 'react';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Form, useActionData, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import ranks from '../data/ranks';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';

const branches = ['USAF', 'USSF', 'USA', 'USMC', 'USN', 'USCG', 'CIV'];

const Register = () => {
  const [branch, setBranch] = useState('');
  const [rank, setRank] = useState('');
  const test = useActionData();

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
        <Form method='post' action='/register'>
          <Grid2 container spacing={2}>
            <Grid2 xs={6}>
              <FormControl fullWidth>
                <InputLabel id='branch'>Branch</InputLabel>
                <Select
                  labelId='branch'
                  fullWidth
                  value={branch}
                  label="Branch"
                  inputProps={{ name: 'branch', required: true }}
                  onChange={handleBranchChange}
                >
                  {branches.map(branch => <MenuItem key={branch} value={branch}>{branch}</MenuItem>)}
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
                  inputProps={{ name: 'rank', required: true }}
                  onChange={handleRankChange}
                >
                  {ranks[branch.toLowerCase()]?.map(rank => <MenuItem key={rank.rank} value={rank.abbr}>{rank.abbr}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 xs={12} >
              <TextField
                label='First Name'
                fullWidth
                name='firstName'
                required
              />
            </Grid2>
            <Grid2 xs={12} >
              <TextField
                label='Last Name'
                fullWidth
                name='lastName'
                required />
            </Grid2>
            <Grid2 xs={12} >
              <TextField
                label='Email Address'
                fullWidth
                name='email'
                type='email'
                required />
            </Grid2>
            <Grid2 xs={12} >
              <TextField
                label='Password'
                fullWidth
                name='password'
                type='password'
                required
              />
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