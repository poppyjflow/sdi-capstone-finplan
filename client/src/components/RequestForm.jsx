import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Form, useLoaderData } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { useOutletContext } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';
import MenuItem from '@mui/material/MenuItem';
import priorityCodes from '../data/priorityCodes';
import reqCodes from '../data/reqCodes';
import { useEffect } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { Button } from '@mui/material';

const RequestForm = () => {
  const [user] = useOutletContext();
  const [org, setOrg] = useState('');
  const [pri, setPri] = useState('MEn');
  const orgArray = useLoaderData();

  const handleOrgUpdate = (e) => {
    e.preventDefault();
    setOrg(e.target.value);
  };

  const handlePriUpdate = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setPri(e.target.value);
  };

  return (
    <Box
      maxWidth='60%'
    >
      <Paper>
        <Form>
          <Grid2 container spacing={2} p={2}>
            <Grid2 xs={3}>
              <InputLabel id='org'>Org</InputLabel>
              <Select
                labelId='org'
                fullWidth
                value={org}
                onChange={handleOrgUpdate}
                inputProps={{ name: 'org', required: false }}
              >
                {orgArray?.map(({ name, id }) => <MenuItem key={id} value={id}>{name}</MenuItem>)}
              </Select>
            </Grid2>
            <Grid2 xs={2}>
              <InputLabel id='priority'>Priority</InputLabel>
              <Select
                labelId='priority'
                fullWidth
                value={pri}
                onChange={handlePriUpdate}
                inputProps={{ name: 'priority', required: true }}
              >
                {priorityCodes.map(code => <Tooltip key={code.code} placement='left' title={code.name} arrow><MenuItem key={code.code} value={code.code}>{code.code}</MenuItem></Tooltip>)}
              </Select>
            </Grid2>
            <Grid2 xs={2}>
              <InputLabel id='category'>Category</InputLabel>
              <Select
                labelId='catergory'
                fullWidth
                value={org}
                inputProps={{ name: 'req_code', required: true }}
              >
                {reqCodes.map(code => <Tooltip key={code.code} placement='left' title={code.name} arrow><MenuItem key={code.code} value={code.code}>{code.code}</MenuItem></Tooltip>)}
              </Select>
            </Grid2>
            <Grid2 xs={3}>
              <InputLabel id='req_date'>Request Date</InputLabel>
              <TextField
                fullWidth
                type='date'
              >
              </TextField>
            </Grid2>
            <Grid2 xs={2}>
              <InputLabel id='requested'>$ Requested</InputLabel>
              <NumericFormat prefix='$' customInput={TextField} thousandSeparator=',' />
            </Grid2>
            <Grid2 xs={12}>
              <TextField
                fullWidth
                label='Title'
                multiline
              >

              </TextField>
            </Grid2>
            <Grid2 xs={12}>
              <TextField
                fullWidth
                label='Description'
                multiline
                minRows={3}
              >

              </TextField>
            </Grid2>
            <Grid2 xs={12}>
              <TextField
                fullWidth
                label='Impact'
                multiline
              >
              </TextField>
            </Grid2>
            <Grid2 xs={10}>
            </Grid2>
            <Grid2 xs={2}>
              <Button variant='contained'>
                Submit
              </Button>
            </Grid2>
          </Grid2>
        </Form>
      </Paper>
    </Box>
  );
};

export default RequestForm;