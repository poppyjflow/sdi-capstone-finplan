import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { useOutletContext, Form } from 'react-router-dom';
import { Button } from '@mui/material';
import { Stack } from '@mui/material';

const EmailToggle = () => {
  const [user, setUser] = useOutletContext();
  const [userData, setUserData] = useState(null);
  const [ toggled, setToggled ] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [postBody, setPostBody] = useState(null);

  const handleEmailChange = (event) => {
    event.preventDefault()
    setToggled(!toggled)
    return
  }

  const handleEmailSubmit = (event) => {
    event.preventDefault()
    postEmailForm()
    return
  }

  const handleDateChange = (event) => {
    event.preventDefault()
    setCurrentDate(event.target.value)
  }

  const postEmailForm = () => {
    console.log(postBody)
    // fetch('http://localhost:8080/email_notifications', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(postBody)
    // })
    // .then(res => res.json())
    // .then(res => {
    //   console.log(res);
    // })
    // .catch(err => {
    //   console.log(err)
    // })
  }

  useEffect(() => {
    if(userData === null){
      fetch(`http://localhost:8080/users/${user.id}`)
      .then(res => res.json())
      .then(user => {
        setUserData({
          id: user[0].id,
          rank: user[0].rank,
          firstname: user[0].f_name,
          lastname: user[0].l_name,
          branch: user[0].branch,
          org: user[0].org,
          email: user[0].email
        })
        return
      })
    }
    return;
  }, [])

  useEffect(() => {
    let yourDate = new Date();
    const offset = yourDate.getTimezoneOffset()
    yourDate = new Date(yourDate.getTime() - (offset*60*1000))
    setCurrentDate(yourDate.toISOString().split('T')[0])
  }, [])

  useEffect(() => {
    if(userData){
      setPostBody({
        frequency: 7,
        org: userData.org,
        due_date: currentDate
      })
    }
  }, [userData, currentDate])

  // useEffect(() => {
  //   fetch('http://localhost:8080/email_notifications')
  //   .then(res => res.json())
  //   .then(res => {
  //     res.length ? setToggled(true) : setToggled(false);
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
  //   return
  // })

  return (
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
  );
};

export default EmailToggle;