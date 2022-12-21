import React, { useState, useEffect } from 'react';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Form, useActionData, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import ranks from '../data/ranks';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Autocomplete from "@mui/material/Autocomplete";
import Paper from '@mui/material/Paper';

const branches = ['USAF', 'USSF', 'USA', 'USMC', 'USN', 'USCG', 'CIV'];

const Register = () => {
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

  const [branch, setBranch] = useState('');
  const [rank, setRank] = useState('');
  const test = useActionData();

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

  return (
    <Box
      display='flex'
      justifyContent='center'
    >
      <Box
        className='form-wrapper'
        borderRadius='8px'
        border='1px solid'
        borderColor='primary.main'
        component={Paper}
        width='35%'
        p={2}
      >
        <Form method='post' action='/register'>
          <Grid2 container spacing={2}>
            <Grid2 xs={12}>
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
            <Grid2 xs={12}>
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
            <Grid2 xs={6}>
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
            <Grid2 xs={6}>
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
            <Grid2 xs={6}>
              <FormControl fullWidth>
                <InputLabel id='branch'>Branch</InputLabel>
                <Select
                  labelId='branch'
                  fullWidth
                  value={branch}
                  label="Branch"
                  inputProps={{ name: 'branch', required: true }}
                  onChange={handleBranchChange}
                >
                  {branches.map(branch => <MenuItem key={branch} value={branch}>{branch}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 xs={6} >
              <FormControl fullWidth>
                <InputLabel id='rank'>Rank</InputLabel>
                <Select
                  disabled={!branches.includes(branch)}
                  labelId='rank'
                  fullWidth
                  value={rank}
                  label='Rank'
                  inputProps={{ name: 'rank', required: true }}
                  onChange={handleRankChange}
                >
                  {ranks[branch.toLowerCase()]?.map(rank => <MenuItem key={rank.rank} value={rank.abbr}>{rank.abbr}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 xs={12} >
              <TextField
                label='First Name'
                fullWidth
                name='firstName'
                required
              />
            </Grid2>
            <Grid2 xs={12} >
              <TextField
                label='Last Name'
                fullWidth
                name='lastName'
                required />
            </Grid2>
            <Grid2 xs={12} >
              <TextField
                label='Email Address'
                fullWidth
                name='email'
                type='email'
                required />
            </Grid2>
            <Grid2 xs={12} >
              <TextField
                label='Password'
                fullWidth
                name='password'
                type='password'
                required
              />
            </Grid2>
            <Grid2 xs={12} >
              <input type='hidden' name='org' value={(selectedSquadron?.id || selectedGroup?.id || selectedWing?.id || selectedMajcom?.id || '')} />
              <Button fullWidth variant='contained' color='secondary' type='submit'>
                Create Account
              </Button>
            </Grid2>
          </Grid2>
        </Form>
      </Box>
    </Box>
  );
};

export default Register;