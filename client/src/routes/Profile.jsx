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
  const [selectedWing, setSelectedWing] = useState(null);
  const [groupOpen, setGroupOpen] = useState(false);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [sqOpen, setSqOpen] = useState(false);
  const [squadrons, setSquadrons] = useState([]);
  const [selectedSquadron, setSelectedSquadrons] = useState(null);
  const [user] = useOutletContext();
  const test = useLoaderData();

  const loadingM = majcomOpen && majcoms.length === 0;
  const loadingW = wingOpen && wings.length === 0;
  const loadingG = groupOpen && groups.length === 0;
  const loadingS = sqOpen && squadrons.length === 0;

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
        const res = await axios.get(`http://localhost:8080/${selectedMajcom.id}/wings`)
        console.log(res.data)
        setWings([...res.data.map(org => {
          return { label: org.name, id: org.id }
        })]);
      }
    })();
    return () => active = false;
  }, [loadingW, selectedMajcom]);

  useEffect(() => {
    if (!wingOpen) setWings([]);
  }, [wingOpen]);

  useEffect(() => {
    let active = true;
    if (!loadingG) return;
    (async () => {
      if (active) {
        const res = await axios.get(`http://localhost:8080/${selectedWing.id}/groups`)
        console.log(res.data)
        setGroups([...res.data.map(org => {
          return { label: org.name, id: org.id }
        })]);
      }
    })();
    return () => active = false;
  }, [loadingG, selectedWing]);

  useEffect(() => {
    if (!groupOpen) setGroups([]);
  }, [groupOpen]);


  useEffect(() => {
    let active = true;
    if (!loadingS) return;
    (async () => {
      if (active) {
        const res = await axios.get(`http://localhost:8080/${selectedGroup.id}/squadrons`)
        console.log(res.data)
        setSquadrons([...res.data.map(org => {
          return { label: org.name, id: org.id }
        })]);
      }
    })();
    return () => active = false;
  }, [loadingS, selectedGroup]);

  useEffect(() => {
    if (!sqOpen) setSquadrons([]);
  }, [sqOpen]);


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
                value={selectedMajcom}
                onChange={(event, newValue) => {
                  console.log(newValue)
                  setSelectedMajcom(newValue);
                }}
                open={majcomOpen}
                onOpen={() => {
                  setMajcomOpen(true);
                }}
                onClose={() => {
                  setMajcomOpen(false);

                }}
                label='Majcom'
                isOptionEqualToValue={(option, value) => option.title === value.title}
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
                value={selectedWing}
                onChange={(event, newValue) => {
                  console.log(newValue)
                  setSelectedWing(newValue);
                }}
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
              <Autocomplete
                disabled={(selectedWing ? false : true)}
                value={selectedGroup}
                onChange={(event, newValue) => {
                  console.log(newValue)
                  setSelectedGroup(newValue);
                }}
                open={groupOpen}
                onOpen={() => {
                  setGroupOpen(true);
                }}
                onClose={() => {
                  setGroupOpen(false);

                }}
                label='Group'
                isOptionEqualToValue={(option, value) => option.title === value.title}
                options={groups}
                loading={loadingG}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name='group'
                    label='Group'
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {loadingG ? <CircularProgress color="inherit" size={20} /> : null}
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
                disabled={(selectedGroup ? false : true)}
                value={selectedSquadron}
                onChange={(event, newValue) => {
                  console.log(newValue)
                  setSelectedSquadrons(newValue);
                }}
                open={sqOpen}
                onOpen={() => {
                  setSqOpen(true);
                }}
                onClose={() => {
                  setSqOpen(false);

                }}
                label='Squadron'
                isOptionEqualToValue={(option, value) => option.title === value.title}
                options={squadrons}
                loading={loadingS}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name='squadron'
                    label='Squadron'
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {loadingS ? <CircularProgress color="inherit" size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              >
              </Autocomplete>
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