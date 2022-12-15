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
import Tooltip from '@mui/material/Tooltip';
import { Button } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import Stack from '@mui/material/Stack';

const RequestForm = () => {
  const [user] = useOutletContext();
  const [org, setOrg] = useState('');
  const [pri, setPri] = useState('');
  const [reqCode, setReqCode] = useState('');
  const orgArray = useLoaderData();

  const handleOrgUpdate = (e) => {
    e.preventDefault();
    setOrg(e.target.value);
  };

  const handlePriUpdate = (e) => {
    e.preventDefault();
    setPri(e.target.value);
  };

  const handleReqUpdate = (e) => {
    e.preventDefault();
    setReqCode(e.target.value);
  };

  return (
    <Box
      maxWidth='60%'
    >
      <Paper>
        <Form method='post' action='/new-request'>
          <Grid2 container spacing={2} p={2}>
            <Grid2 xs={3}>
              <Grid2>
                <InputLabel id='org'>Org</InputLabel>
                <Select
                  labelId='org'
                  fullWidth
                  value={org}
                  onChange={handleOrgUpdate}
                  inputProps={{ name: 'org', required: false }}
                >
                  {orgArray?.map(({ name, id }) => (
                    <MenuItem key={id} value={id}>
                      {name}
                      <Tooltip key={id} placement='right' title={name} value={id} arrow sx={{ ml: 2 }} >
                        <InfoIcon />
                      </Tooltip>
                    </MenuItem>
                  ))}
                </Select>

              </Grid2>
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
                {priorityCodes?.map(({ name, code }) => (
                  <MenuItem key={code} value={code}>
                    {code}
                    <Tooltip key={code} placement='right' title={name} value={code} arrow >
                      <InfoIcon />
                    </Tooltip>
                  </MenuItem>))}
              </Select>
            </Grid2>
            <Grid2 xs={2}>
              <InputLabel id='req-code'>Category</InputLabel>
              <Select
                labelId='req-code'
                fullWidth
                value={reqCode}
                onChange={handleReqUpdate}
                inputProps={{ name: 'req_code', required: true }}
              >
                {reqCodes?.map(({ name, code }) => (

                  <MenuItem key={code} value={code}
                  >
                    {code}
                    <Tooltip
                      key={code}
                      placement='right'
                      title={name}
                      value={code}
                      arrow
                    >
                      <InfoIcon />
                    </Tooltip>
                  </MenuItem>
                ))}
              </Select>
            </Grid2>
            <Grid2 xs={3}>
              <InputLabel id='req_date'>Request Date</InputLabel>
              <TextField fullWidth type='date'
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
    </Box >
  );
};

export default RequestForm;