<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { useOutletContext, Form } from 'react-router-dom';
=======
import React, {useState, useEffect} from 'react';
>>>>>>> Pre-master rebase commit; settings account info change mostly function (need to know specific endpoints), work on email notifications started
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import EditUserForm from '../components/EditUserForm';
import TextField from '@mui/material/TextField';
import { Form } from 'react-router-dom';
import { Button } from '@mui/material';
import { Stack } from '@mui/material';


const Settings = () => {
<<<<<<< HEAD
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const [user, setUser] = useOutletContext();
  const [open, setOpen] = useState(false);
  const [userPatchData, setUserPatchData] = useState(null);
=======
  const [ toggled, setToggled ] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [postBody, setPostBody] = useState(null);
>>>>>>> Pre-master rebase commit; settings account info change mostly function (need to know specific endpoints), work on email notifications started


  const handleEmailChange = () => {
    setToggled(!toggled)
    return
  }

<<<<<<< HEAD
  const handleSubmit = () => {
    handleClose();
    //NEED INPUT VALIDATION BEFORE SUBMIT
  };

  const handleFormChange = (event) => {
    const value = event.target.value;
    setUserPatchData({
      ...userPatchData,
      [event.target.name]: value
    });
  };

  useEffect(() => {
    if (!userPatchData) {
      fetch(`http://localhost:8080/users/${user.id}`)
        .then(res => res.json())
        .then(user => {
          setUserPatchData({
            rank: user[0].rank,
            firstname: user[0].f_name,
            lastname: user[0].l_name,
            branch: user[0].branch,
            org: user[0].org,
            email: user[0].email
          });
          return;
        });
    }
    return;
  }, []);
=======
  const handleEmailSubmit = () => {
    return
  }

  const handleDateChange = (event) => {
    setCurrentDate(event.target.value)
  }

  useEffect(() => {
    let yourDate = new Date();
    const offset = yourDate.getTimezoneOffset()
    yourDate = new Date(yourDate.getTime() - (offset*60*1000))
    setCurrentDate(yourDate.toISOString().split('T')[0])
  }, [])
>>>>>>> Pre-master rebase commit; settings account info change mostly function (need to know specific endpoints), work on email notifications started

  //on page load, request server data related to email notifications for unit
    //if present in database, toggled = true
    //toggled = false

  return (
    <>
<<<<<<< HEAD
      {userPatchData ?
        <Box height='100%'>
          <Card sx={{ maxWidth: '100%', height: 'auto', paddingTop: '1em' }}>
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
              <Switch {...label} defaultChecked disabled color='secondary' />
              <Typography variant="body2" color="text.secondary">
                Dark mode is toggled on.
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ maxWidth: '100%', marginTop: '2em' }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Receive Email Notifications
              </Typography>
              <div>
                <Switch {...label} color='secondary' />
              </div>
              <Typography variant="body2" color="text.secondary">
                Personal emails are toggled off.
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ maxWidth: '100%', marginTop: '2em' }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Send Email Notifications
              </Typography>
              <div>
                <Switch {...label} color='secondary' />
              </div>
              <Typography variant="body2" color="text.secondary">
                User emails are toggled off.
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ maxWidth: '100%', marginTop: '2em' }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Change Account Information
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '1em' }}>
                Edit personal info.
              </Typography>
              <Button variant="contained" color='error' onClick={handleClickOpen}>Edit</Button>
            </CardContent>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Edit Account Info</DialogTitle>
              <DialogContent>
                <Form
                  style={{ display: 'contents' }}
                  method='post'>
                  <TextField
                    autoFocus
                    name='firstname'
                    value={userPatchData.firstname}
                    margin="dense"
                    required
                    id="controlled"
                    label="First Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={handleFormChange}
                  />
                  <TextField
                    autoFocus
                    name='lastname'
                    value={userPatchData.lastname}
                    margin="dense"
                    required
                    id="name"
                    label="Last Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={handleFormChange}
                  />
                  <TextField
                    autoFocus
                    name='email'
                    value={userPatchData.email}
                    margin="dense"
                    required
                    id="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                    onChange={handleFormChange}
                  />
                  <TextField
                    autoFocus
                    name='branch'
                    value={userPatchData.branch}
                    margin="dense"
                    required
                    id="controlled"
                    label="Branch"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={handleFormChange}
                  />
                  <TextField
                    autoFocus
                    name='org'
                    value={userPatchData.org}
                    margin="dense"
                    required
                    id="org"
                    label="Organization"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={handleFormChange}
                  />
                  <TextField
                    autoFocus
                    name='rank'
                    value={userPatchData.rank}
                    margin="dense"
                    required
                    id="rank"
                    label="Rank"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={handleFormChange}
                  />
                </Form>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Submit</Button>
              </DialogActions>
            </Dialog>
          </Card>
        </Box>
        :
        <p>Loading...</p>
      }
=======
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
    <Card sx={{ maxWidth: '100%', marginTop: '2em' }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Email Notifications
          </Typography>
          <div>
            <Switch
            checked={toggled}
            onChange={handleEmailChange}
            color='secondary'/>
          </div>
          {toggled ?
          <Box>
            <Form
            style={{ display: 'contents', width: '5em' }}
            method='post'
            noValidate
            onSubmit={handleEmailSubmit}>
              <Stack>
                <TextField
                  id="date"
                  label="Due Date"
                  type="date"
                  defaultValue={currentDate}
                  onChange={handleDateChange}
                  sx={{ width: 220, marginTop: '1em' }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Button type='submit' variant='contained' color='error' sx={{width: 220, marginTop: '1em'}}>Apply Changes</Button>
              </Stack>
            </Form>
          </Box>
          :
          <Typography variant="body2" color="text.secondary">
            Email reminders for your command team are toggled off.
          </Typography>
          }
        </CardContent>
    </Card>
    <EditUserForm />
    </Box>

>>>>>>> Pre-master rebase commit; settings account info change mostly function (need to know specific endpoints), work on email notifications started
    </>
  );
};

export default Settings;
