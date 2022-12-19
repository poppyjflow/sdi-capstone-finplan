import React, {useEffect, useState} from 'react';
import { useOutletContext, Form, useLoaderData } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ranks from '../data/ranks';
import InputLabel from '@mui/material/InputLabel';

const EditUserForm = () => {
  const branches = ['USAF', 'USSF', 'USA', 'USMC', 'USN', 'USCG', 'CIV'];
  // const orgArray = useLoaderData();
  const [branch, setBranch] = useState('');
  const [rank, setRank]= useState('');
  const [user, setUser] = useOutletContext();
  const [userData, setUserData] = useState(null);
  const [open, setOpen] = useState(false);
  const [userFormData, setUserFormData] = useState(null);
  const [patchData, setPatchData] = useState(null);

  const setFormData = (data) => {
    setUserFormData({
      rank:{
        value: data.rank,
        error: false,
        errorMessage: 'Rank is required.'
      },
      firstname:{
        value: data.firstname,
        error: false,
        errorMessage: 'First name is required.'
      },
      lastname:{
        value: data.lastname,
        error: false,
        errorMessage: 'Last name is required.'
      },
      branch:{
        value: data.branch,
        error: false,
        errorMessage: 'Branch is required.'
      },
      org:{
        value: data.org,
        error: false,
        errorMessage: 'Organization is required.'
      },
      email:{
        value: data.email,
        error: false,
        errorMessage: 'Email is required.'
      }
    })
    return;
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(userData)
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    let foundError = false;
    for( let formField in userFormData){
      // console.log(userFormData[formField].error)
      if(userFormData[formField].error === true){
        foundError = true;
        return
      }
      continue;
    }
    foundError ? alert('Please fill out all fields.') : postUserForm()
    return
  }

  const handleFormChange = (event) => {
    const {name, value }= event.target;
      value === '' ?
      (setUserFormData({
        ...userFormData,
        [name]: {
          ...userFormData[name],
          value: value,
          error: true
        }
      }))
      :
      (setUserFormData({
        ...userFormData,
        [name]: {
          ...userFormData[name],
          value: value,
          error: false
        }
      }))
    // console.log(userFormData)
  }

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

  const postUserForm = () => {
    fetch(`http://localhost:8080/users/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(patchData)
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      setOpen(false)
    })
    .catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    if(!userFormData){
      fetch(`http://localhost:8080/users/${user.id}`)
      .then(res => res.json())
      .then(user => {
        setUserData({
          rank: user[0].rank,
          firstname: user[0].f_name,
          lastname: user[0].l_name,
          branch: user[0].branch,
          org: user[0].org,
          email: user[0].email
        })
        setBranch(user[0].branch)
        setRank(user[0].rank)
        return
      })
    }
    return;
  }, [])

  useEffect(() => {
    if(userData){
      setFormData(userData)
    }
    return
  },[userData])

  useEffect(() => {
    if(userFormData){
      setPatchData({
        rank: userFormData.rank.value,
        firstname: userFormData.firstname.value,
        lastname: userFormData.lastname.value,
        branch: userFormData.branch.value,
        // org: userFormData.org.value,
        email: userFormData.email.value,
      })
    }
    return
  }, [userFormData])

  return (
    <>
    {userFormData ?
    <Card sx={{ maxWidth: '100%', marginTop: '2em' }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Change Account Information
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{marginBottom:'1em'}}>
            Edit personal info.
          </Typography>
          <Button variant="contained" color='error' onClick={handleClickOpen}>Edit</Button>
        </CardContent>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit Account Info</DialogTitle>
          <DialogContent>
          <Form
            style={{ display: 'contents' }}
            method='post'
            noValidate
            onSubmit={handleSubmit}>
          <TextField
              autoFocus
              name='firstname'
              value={userFormData.firstname.value}
              margin="dense"
              required
              id="controlled"
              label="First Name"
              type="text"
              fullWidth
              error={userFormData.firstname.error}
              variant="standard"
              onChange={handleFormChange}
            />
            <TextField
              autoFocus
              name='lastname'
              value={userFormData.lastname.value}
              margin="dense"
              required
              id="name"
              label="Last Name"
              type="text"
              error={userFormData.lastname.error}
              fullWidth
              variant="standard"
              onChange={handleFormChange}
            />
            <TextField
              autoFocus
              name='email'
              value={userFormData.email.value}
              margin="dense"
              required
              id="email"
              error={userFormData.email.error}
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              onChange={handleFormChange}
            />
            {/* <TextField
              autoFocus
              name='org'
              value={userFormData.org.value}
              margin="dense"
              required
              error={userFormData.org.error}
              id="org"
              label="Organization"
              type="number"
              fullWidth
              variant="standard"
               onChange={handleFormChange}
            /> */}
            <FormControl fullWidth sx={{marginTop: '0.5em'}}>
                <InputLabel id='branch'>Branch</InputLabel>
                <Select
                  // disabled={!branches.includes(branch)}
                  labelId='branch'
                  name="branch"
                  fullWidth
                  value={userFormData.branch.value}
                  label='branch'
                  inputProps={{ name: 'branch', required: true }}
                  onChange={handleBranchChange}
                >
                  {branches.map(branch => <MenuItem key={branch} value={branch}>{branch}</MenuItem>)}
                </Select>
              </FormControl>
            <FormControl fullWidth sx={{marginTop: '0.5em'}}>
                <InputLabel id='rank'>Rank</InputLabel>
                <Select
                  disabled={!branches.includes(branch)}
                  labelId='rank'
                  name="rank"
                  fullWidth
                  value={userFormData.rank.value}
                  label='Rank'
                  inputProps={{ name: 'rank', required: true }}
                  onChange={handleRankChange}
                >
                  {ranks[branch.toLowerCase()]?.map(rank => <MenuItem key={rank.rank} value={rank.abbr}>{rank.abbr}</MenuItem>)}
                </Select>
              </FormControl>
          <DialogActions>
            <Button onClick={handleClose} variant='contained' color='error'>Cancel</Button>
            <Button type='submit' variant='contained' color='primary'>Submit</Button>
          </DialogActions>
          {/* {errorAlert ? <Alert severity='error'>Please fill out all fields</Alert> : <></>} */}
            </Form>
          </DialogContent>
      </Dialog>
    </Card>
    :
    <p>Loading...</p>
    }
    </>
  );
};

export default EditUserForm;