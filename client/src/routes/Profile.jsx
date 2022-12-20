import React, { useEffect } from "react";
import { useState } from "react";
import { useLoaderData, useOutletContext, Form } from "react-router-dom";
import Paper from '@mui/material/Paper';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Autocomplete from "@mui/material/Autocomplete";


const Profile = () => {
  const [majcomOpen, setMajcomOpen] = useState(false);
  const [majcoms, setMajcoms] = useState([]);
  const [selectedMajcom, setSelectedMajcom] = useState(null);
  const [wingOpen, setWingOpen] = useState(false);
  const [wings, setWings] = useState([]);
  const [selectedWing, setSelectedWing] = useState(-1);
  const [groupOpen, setGroupOpen] = useState(false);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(-1);
  const [sqOpen, setSqOpen] = useState(false);
  const [squadrons, setSquadrons] = useState([]);
  const [selectedSquadron, setSelectedSquadrons] = useState(-1);
  const [user] = useOutletContext();
  const test = useLoaderData();

  const loadingM = majcomOpen && majcoms.length === 0;
  const loadingW = wingOpen && wings.length === 0;
  const loadingG = groupOpen && groups.length === 0;
  const loadingS = sqOpen && squadrons.length === 0;

  const handleEvent = (e) => {
    e.preventDefault();
    console.log('On change: ', e);
    console.log('text: ', e.target.textContent)
    setSelectedMajcom(e.target.textContent);
  }

  useEffect(() => {
    let active = true;
    if (!loadingM) return;
    (async () => {
      if (active) {
        const res = await axios.get('http://localhost:8080/majcoms')
        console.log(res.data)
        setMajcoms([...res.data.map(org => {
          return { label: org.name, id: org.id }
        })]);
      }
    })();
    return () => active = false;
  }, [loadingM]);

  useEffect(() => {
    if (!majcomOpen) setMajcoms([]);
  }, [majcomOpen]);

  useEffect(() => {
    let active = true;
    if (!loadingW) return;
    (async () => {
      if (active) {
        const res = await axios.get(`http://localhost:8080/${selectedMajcom}/wings`)
        console.log(res.data)
        setWings([...res.data]);
      }
    })();
    return () => active = false;
  }, [loadingW, selectedMajcom]);

  useEffect(() => {
    if (!wingOpen) setWings([]);
  }, [wingOpen]);

  return (
    <Box
      alignSelf='center'
      className='profile'
      maxWidth='90%'
    >
      <Paper>
        <Form method='post' action='/new-request'>
          <Grid2 container spacing={2} p={2}>
            <Grid2 xs={3}>
              <Autocomplete
                open={majcomOpen}
                onOpen={() => {
                  setMajcomOpen(true);
                }}
                onClose={() => {
                  setMajcomOpen(false);

                }}
                label='Majcom'
                onChange={handleEvent}
                isOptionEqualToValue={(option, value) => {
                  return option.title === value.title
                }}
                options={majcoms}
                loading={loadingM}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name='majcom'
                    label='Majcom'
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {loadingM ? <CircularProgress color="inherit" size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              >
              </Autocomplete>
            </Grid2>
            <Grid2 xs={3}>
              <Autocomplete
                disabled={(selectedMajcom ? false : true)}
                open={wingOpen}
                onOpen={() => {
                  setWingOpen(true);
                }}
                onClose={() => {
                  setWingOpen(false);
                }}
                label='Wing'
                options={wings}
                loading={loadingW}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name='wing'
                    label='Wing'
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {loadingW ? <CircularProgress color="inherit" size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              >
              </Autocomplete>
            </Grid2>
            <Grid2 xs={3}>
              <TextField
                name='group'
                variant='filled'
                fullWidth
                label='Group'
              >
              </TextField>

            </Grid2>
            <Grid2 xs={3}>
              <TextField
                name='sq'
                variant='filled'
                fullWidth
                label='Squadron'
              >
              </TextField>
            </Grid2>
            <Grid2 xs={2}>

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

export default Profile;