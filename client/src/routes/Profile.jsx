import React, { useEffect } from "react";
import { useState } from "react";
import { useOutletContext, Form, useRouteLoaderData } from "react-router-dom";
import Paper from '@mui/material/Paper';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Autocomplete from "@mui/material/Autocomplete";
import { MenuItem } from "@mui/material";

const Profile = () => {
  const user = useRouteLoaderData('protected');
  const [userOrg, setUserOrg] = useState(user.org || null);
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


  const loadingM = majcomOpen && majcoms.length === 0;
  const loadingW = wingOpen && wings.length === 0;
  const loadingG = groupOpen && groups.length === 0;
  const loadingS = sqOpen && squadrons.length === 0;

  // useEffect(() => {

  // }, [userOrg])

  useEffect(() => {
    let active = true;
    if (!loadingM) return;
    (async () => {
      if (active) {
        const res = await axios.get('http://localhost:8080/majcoms')
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

  const orgBox = () => {
    return (
      <TextField
        disabled
        fullWidth
        label='Current Organization'
        value={userOrg}
      />
    );
  };

  return (
    <Box
      alignSelf='center'
      className='profile'
      maxWidth='90%'
    >
      <Paper>
        <Form method='post' action='/profile'>
          <Grid2 container spacing={2} p={2}>
            <Grid2 xs={3}>
              <Autocomplete
                value={selectedMajcom}
                onChange={(event, newValue) => {
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
              <TextField
                disabled
                name='branch'
                value={user.branch}
                variant='filled'
                fullWidth
                label='Branch'
              />
            </Grid2>
            <Grid2 xs={2}>
              <TextField
                name='rank'
                value={user.rank}
                variant='filled'
                fullWidth
                label='Rank'
              />
            </Grid2>
            <Grid2 xs={2}>
              <TextField
                name='lastName'
                value={user.l_name}
                variant='filled'
                fullWidth
                label='Last Name'
              />
            </Grid2>
            <Grid2 xs={2}>
              <TextField
                name='firstName'
                value={user.f_name}
                variant='filled'
                fullWidth
                label='First Name'
              />
            </Grid2>
            <Grid2 xs={4}>
              <TextField
                name='email'
                variant='filled'
                fullWidth
                label='Email'
                value={user.email}
              />
            </Grid2>
            <Grid2 xs={10}>
              {orgBox()}
            </Grid2>
            <Grid2
              xs={2}
              sx={{ display: 'flex', alignItems: 'flex-end' }}
            >
              <Button fullWidth variant='contained' color='secondary' type='submit'>
                Submit
              </Button>
            </Grid2>
          </Grid2>
          <input type='hidden' name='user' value={user.id} />
          <input type='hidden' name='org' value={(selectedSquadron?.id || selectedGroup?.id || selectedWing?.id || selectedMajcom?.id || '')} />
        </Form>
      </Paper>
    </Box >
  );
};

export default Profile;