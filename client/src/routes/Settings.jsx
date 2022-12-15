import React, { useEffect, useState } from 'react';
import { useOutletContext, Form } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Settings = () => {
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const [user, setUser] = useOutletContext();
  const [open, setOpen] = useState(false);
  const [userPatchData, setUserPatchData] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  return (
    <>
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
    </>
  );
};

export default Settings;
