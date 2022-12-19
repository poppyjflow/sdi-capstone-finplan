import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import EditUserForm from '../components/EditUserForm';
import EmailToggle from '../components/EmailToggle';


const Settings = () => {

  return (
    <Box height='100%'>
    <Card sx={{ maxWidth: '100%', height: 'auto', paddingTop: '1em'}}>
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          User Settings
        </Typography>
      </CardContent>
    </Card>
    <Card sx={{ maxWidth: '100%', marginTop: '2em' }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Enable Dark Mode
          </Typography>
          <Switch
          defaultChecked
          disabled
          color='secondary'/>
          <Typography variant="body2" color="text.secondary">
            Dark mode is toggled on.
          </Typography>
        </CardContent>
    </Card>
    <EmailToggle />
    <EditUserForm />
    </Box>
  );
};

export default Settings;
