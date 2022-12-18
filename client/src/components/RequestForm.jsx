import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Form, useLoaderData, useOutletContext } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { NumericFormat } from 'react-number-format';
import MenuItem from '@mui/material/MenuItem';
import priorityCodes from '../data/priorityCodes';
import reqCodes from '../data/reqCodes';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import InfoIcon from '@mui/icons-material/Info';
import Zoom from '@mui/material/Zoom';
import ListItemText from '@mui/material/ListItemText';
import InputAdornment from '@mui/material/InputAdornment';

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

  const moneyField = (props) => (
    <TextField
      name='requested'
      label='Requested'
      variant='filled'
      {...props}
      required
      fullWidth
      InputProps={{
        startAdornment: <InputAdornment position="start">$</InputAdornment>
      }}
    />
  );

  return (
    <Box
      maxWidth='60%'
    >
      <Paper>
        <Form method='post' action='/new-request'>
          <Grid2 container spacing={2} p={2}>
            <Grid2 xs={3}>
              <TextField
                name='org'
                variant='filled'
                fullWidth
                select
                label='Organization'
                value={org}
                onChange={handleOrgUpdate}
              >
                <MenuItem value=''><em>None</em></MenuItem>
                {orgArray?.map(({ name, id }) => (
                  <MenuItem key={id} value={id}>
                    {name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid2>
            <Grid2 xs={2}>
              <TextField
                name='priority'
                variant='filled'
                fullWidth
                select
                label='Priority'
                value={pri}
                SelectProps={{ renderValue: (selected) => selected }}
                onChange={handlePriUpdate}
              >
                <MenuItem value=''><em>None</em></MenuItem>
                {priorityCodes?.map(({ name, code }) => (
                  <MenuItem
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                    key={code}
                    value={code}
                  >
                    {code}
                    <Tooltip key={code} placement='right' title={name} arrow TransitionComponent={Zoom} >
                      <InfoIcon />
                    </Tooltip>
                  </MenuItem>))},

              </TextField>
            </Grid2>
            <Grid2 xs={2}>
              <TextField
                label='Category'
                fullWidth
                name='reqCode'
                variant='filled'
                required
                select
                value={reqCode}
                SelectProps={{ renderValue: (selected) => selected }}
                onChange={handleReqUpdate}
              >
                <MenuItem value=''><em>None</em></MenuItem>
                {reqCodes?.map(({ name, code }) => (
                  <MenuItem
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                    key={code}
                    value={code}
                  >
                    <ListItemText primary={code} />
                    <Tooltip
                      key={code}
                      placement='right'
                      title={name}
                      arrow
                      TransitionComponent={Zoom}
                    >
                      <InfoIcon edge='end' />
                    </Tooltip>
                  </MenuItem>
                ))}
              </TextField>
            </Grid2>
            <Grid2 xs={3}>
              <TextField
                name='reqDate'
                variant='filled'
                fullWidth
                type='date'
                label='Request Date'
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid2>
            <Grid2 xs={2}>
              <NumericFormat customInput={moneyField} thousandSeparator=',' />
            </Grid2>
            <Grid2 xs={12}>
              <TextField
                name='title'
                variant='filled'
                fullWidth
                label='Title'
                multiline
              />
            </Grid2>
            <Grid2 xs={12}>
              <TextField
                name='description'
                variant='filled'
                fullWidth
                label='Description'
                multiline
                minRows={3}
              />
            </Grid2>
            <Grid2 xs={10}>
            </Grid2>
            <Grid2 xs={2}>
              <Button fullWidth variant='contained' color='secondary' type='submit'>
                Submit
              </Button>
            </Grid2>
          </Grid2>
          <input type='hidden' name='user' value={user.id} />
        </Form>
      </Paper>
    </Box >
  );
};

export default RequestForm;