import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { useLoaderData } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { CardContent, Typography } from '@mui/material';
import { useContext } from 'react';
import { FYContext } from '../layouts/ProtectedRoutes';
import NumericFormatCustom from '../components/NumericFormatCustom';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(.5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function StatusBar({ updated, setUpdated }) {
  const user = useLoaderData();
  const [org, setOrg] = useState(user.org_id);
  //const year = 2023;
  const [allData, setAllData] = useState(null);
  const [totals, setTotals] = useState(null);
  const [reconciled, setReconciled] = useState(null);
  const [fyList, setFYList] = useState([{ id: ' ', value: ' ' }]);
  const [fySelected, setFYSelected] = useState(null);
  // Grabs current year from today's date for default value.
  const [fyDisplayed, setFYDisplayed] = useContext(FYContext);
  // const [fyDisplayed, setFYDisplayed] = useState(() => {
  //   var tempArr = Date().split(" ");
  //   return {id: parseInt(tempArr[3]) + 1, value: parseInt(tempArr[3]) + 1};
  // });
  var q1Delta = null;
  var q2Delta = null;
  var q3Delta = null;
  var q4Delta = null;
  var fyDelta = null;

  var fyDropdownOptions = [];

  useEffect(() => {
    if (totals) {
      parseInt(totals.totalAllocation) - parseInt(totals.totalObligations) === 0 ? setReconciled(true) : setReconciled(false);
      return;
    }
    return;
  }, [totals]);

  useEffect(() => {
    let orgYear = {
      org_id: org,
      year_fy: fyDisplayed.value,
    };
    fetch('http://localhost:8080/banner', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orgYear)
    })
      .then(res => res.json())
      .then(res => {
        let requests = (res.q1.requests + res.q2.requests + res.q3.requests + res.q4.requests);
        let allocations = (res.q1.allocations + res.q2.allocations + res.q3.allocations + res.q4.allocations);
        let obligations = (res.q1.obligations + res.q2.obligations + res.q3.obligations + res.q4.obligations);
        setTotals({ totalRequests: requests, totalAllocation: allocations, totalObligations: obligations });
        setAllData(res);
      })
      .catch(err => {
        console.log(err);
        alert('There was a problem accessing request data.');
      });
    return;
  }, [fyDisplayed]);
  //  }, [updated]);

  useEffect(() => {
    if (org) {
      fetch(`http://localhost:8080/fiscal_years/${org}`
      )
        .then(res => res.json())
        .then(res => {
          if (res) {

            //Game Plan: Populate the dropdown array with all FYs from the oldest record in the DB to the current FY+1.
            var currFY = 0;
            setFYList([]); // re-initialize these.
            fyDropdownOptions = [];

            // Current year.
            const currDate = Date();
            var tempArr = currDate.split(" ");
            currFY = parseInt(tempArr[3]) + 1;

            // Oldest year from DB.
            const fyCounter = parseInt(res.fy);

            // Populate the dropdown.
            var ctr = 0;
            while (currFY - fyCounter >= 0) {
              fyDropdownOptions.push({ id: currFY, value: currFY });
              currFY--; ctr++;
            }

            setFYList(fyDropdownOptions); // re-populate this.
          }
        })
        .catch(err => {
          console.log(err);
          alert('StatusBar.jsx: There was an error processing your request.');
        });
    }
    return;
  }, []);

  const handleYearChange = (selection) => {
    // setFYSelected(selection);
    setFYDisplayed({ id: selection.target.value, value: selection.target.value });
  };

  if (allData) {
    // Determine which percentage of available funds have been spent.
    q1Delta = allData.q1.allocations - allData.q1.obligations;
    q2Delta = allData.q2.allocations - allData.q2.obligations;
    q3Delta = allData.q3.allocations - allData.q3.obligations;
    q4Delta = allData.q4.allocations - allData.q4.obligations;
    fyDelta = totals.totalAllocation - totals.totalObligations;

    // Populate dropdown array with Fiscal Year options by adding every FY from the oldest record to the current FY.

  }

  return (
    <>
      {allData && totals ?
        <Box
          component={Paper}
          flexGrow={1}
          p={2}
        >
          <Grid container alignItems='flex-end' spacing={.8} padding={.1}>

            <Grid item xs={6}>
              <Stack spacing={0}>
              <Item> <Box color={'#1A2027'}  align={'left'}>.</Box></Item>
              <Item>
                <Box color={'cyan'} bgcolor={'charcoalgray'} align={'center'}>
                      SELECT A FISCAL YEAR:
                    </Box>

                </Item>
                <Item>
                <Box align={'center'} width={'100%'}>
                  <Grid width="50%">
                    <FormControl fullWidth>
                      <InputLabel id="fy_options">Fiscal Year</InputLabel>
                      <Select
                        labelId="Fiscal Year"
                        id="Fiscal Year"
                        value={fyDisplayed.id}
                        defaultValue={fyDisplayed.id}
                        label="Fiscal Year"
                        onChange={handleYearChange}
                      >
                        {
                          fyList.map((category) => {
                            return <MenuItem key={category.id} value={category.id}>{category.value}</MenuItem>;
                          })
                        }
                      </Select>
                    </FormControl>
                    </Grid>
                    </Box>
                </Item>
                <Item> <Box color={'#1A2027'}  align={'left'}>.</Box></Item>
                <Item> <Box color={'#1A2027'}  align={'left'}>.</Box></Item>
                <Item> <Box color={'#1A2027'}  align={'left'}>.</Box></Item>
                {/* <Item>

Total Requests:  $ {totals ? totals.totalRequests.toLocaleString() : 0}
{/* </Box> */}
                {/* </Item> */}



                {/* <Item>Total Allocation:  $ {totals ? totals.totalAllocation.toLocaleString() : 0}</Item>
                <Item>Total Obligations:  $ {totals ? totals.totalObligations.toLocaleString() : 0}</Item>
                <Item>
                  <Box border='2px solid' borderRadius='8px'>
                    <Box
                      borderRadius='8px'
                      bgcolor={q4Delta <= 0 ? '#115e0a' : '#800000'}
                    >
                      Delta:  $ {totals ? (totals.totalAllocation - totals.totalObligations).toLocaleString() : 0}
                    </Box></Box></Item> */}
              </Stack>

            </Grid>
            <Grid item xs={6}>

              <Stack spacing={.6}>
                <Grid container spacing={.3}>
                  <Grid item xs={2}>

                  </Grid>
                  <Grid item xs={2.5}>
                    <Item>
                      Requests
                    </Item>
                  </Grid>
                  <Grid item xs={2.5}>
                    <Item>
                      Allocations
                    </Item>
                  </Grid>
                  <Grid item xs={2.5}>
                    <Item>
                      Obligations
                    </Item>
                  </Grid>

                  <Grid item xs={2.5}>
                    <Item>
                      Delta
                    </Item>
                  </Grid>

                  <Grid item xs={2}>
                    <Item>
                      Q1
                    </Item>
                  </Grid>
                  <Grid item xs={2.5}>
                    <Item>
                      $ {allData.q1.requests.toLocaleString()}
                    </Item>
                  </Grid>
                  <Grid item xs={2.5}>
                    <Item>
                      {`$ ${allData.q1.allocations.toLocaleString()}`}
                    </Item>
                  </Grid>
                  <Grid item xs={2.5}>
                    <Item>
                      {`$ ${allData.q1.obligations.toLocaleString()}`}
                    </Item>
                  </Grid>
                  <Grid item xs={2.5}>
                    <Item>
                      <Box border='2px solid' borderRadius='8px'>
                        <Box
                          borderRadius='8px'
                          bgcolor={q1Delta <= 0 ? '#115e0a' : '#800000'}
                        >
                          {`$ ${(allData.q1.allocations - allData.q1.obligations).toLocaleString()}`}
                        </Box>
                      </Box>
                    </Item>
                  </Grid>

                  <Grid item xs={2}>
                    <Item>
                      Q2
                    </Item>
                  </Grid>
                  <Grid item xs={2.5}>
                    <Item>
                      $ {allData.q2.requests.toLocaleString()}
                    </Item>
                  </Grid>
                  <Grid item xs={2.5}>
                    <Item>
                      {`$ ${allData.q2.allocations.toLocaleString()}`}
                    </Item>
                  </Grid>
                  <Grid item xs={2.5}>
                    <Item>
                      {`$ ${allData.q2.obligations.toLocaleString()}`}
                    </Item>
                  </Grid>
                  <Grid item xs={2.5}>
                    <Item>
                      <Box border='2px solid' borderRadius='8px'>
                        <Box
                          borderRadius='8px'
                          bgcolor={q2Delta <= 0 ? '#115e0a' : '#800000'}
                        >
                          {`$ ${(allData.q2.allocations - allData.q2.obligations).toLocaleString()}`}
                        </Box>
                      </Box>
                    </Item>
                  </Grid>

                  {/* <Grid item xs={5}>
                    <Item>
                      {q2Delta > .3
                        ?
                        <Box border='2px solid' borderRadius='8px'>
                          <Box
                            width={q2Delta}
                            borderRadius='8px'
                            bgcolor={q2Delta === 1 ? '#115e0a' : '#800000'}
                          >
                            {`$${allData.q2.obligations} / $${allData.q2.allocations}`}
                          </Box>
                        </Box>
                        :
                        <Grid item xs={3}>
                        <Box border='2px solid' borderRadius='8px'>
                          <Box
                            width={q2Delta}
                            borderRadius='8px'
                            bgcolor={q2Delta === 1 ? '#115e0a' : '#800000'}
                            >$
                          </Box>
                          <Box
                            width={1 - q2Delta}
                            borderRadius='8px'
                            // bgcolor={q2Delta === 1 ? '#115e0a' : '#800000'}
                            display="flex"
                            justifyContent="flex-end"
                            alignItems="flex-end"
                            >
                          {`$${allData.q2.obligations} / $${allData.q2.allocations}`}
                          </Box>

                        </Box>
</Grid>
                      }


                    </Item>
                  </Grid> */}
                  {/* <Grid item xs={2.5}>
                    <Item>
                      $ {allData.q2.allocations - allData.q2.obligations}
                    </Item>
                  </Grid> */}

                  <Grid item xs={2}>
                    <Item>
                      Q3
                    </Item>
                  </Grid>
                  <Grid item xs={2.5}>
                    <Item>
                      $ {allData.q3.requests.toLocaleString()}
                    </Item>
                  </Grid>
                  <Grid item xs={2.5}>
                    <Item>
                      {`$ ${allData.q3.allocations.toLocaleString()}`}
                    </Item>
                  </Grid>
                  <Grid item xs={2.5}>
                    <Item>
                      {`$ ${allData.q3.obligations.toLocaleString()}`}
                    </Item>
                  </Grid>
                  <Grid item xs={2.5}>
                    <Item>
                      <Box border='2px solid' borderRadius='8px'>
                        <Box
                          borderRadius='8px'
                          bgcolor={q3Delta <= 0 ? '#115e0a' : '#800000'}
                        >
                          {`$ ${(allData.q3.allocations - allData.q3.obligations).toLocaleString()}`}
                        </Box>
                      </Box>
                    </Item>
                  </Grid>

                  <Grid item xs={2}>
                    <Item>
                      Q4
                    </Item>
                  </Grid>
                  <Grid item xs={2.5}>
                    <Item>
                      $ {allData.q4.requests.toLocaleString()}
                    </Item>
                  </Grid>
                  <Grid item xs={2.5}>
                    <Item>
                      {`$ ${allData.q4.allocations.toLocaleString()}`}
                    </Item>
                  </Grid>
                  <Grid item xs={2.5}>
                    <Item>
                      {`$ ${allData.q4.obligations.toLocaleString()}`}
                    </Item>
                  </Grid>
                  <Grid item xs={2.5}>
                    <Item>
                      <Box border='2px solid' borderRadius='8px'>
                        <Box
                          borderRadius='8px'
                          bgcolor={q4Delta <= 0 ? '#115e0a' : '#800000'}
                        >
                          {`$ ${(allData.q4.allocations - allData.q4.obligations).toLocaleString()}`}
                        </Box>
                      </Box>
                    </Item>
                  </Grid>

                  <Grid item xs={2}>
                    <Item>
                      FY
                    </Item>
                  </Grid>
                  <Grid item xs={2.5}>
                    <Item>
                      $ {totals.totalRequests.toLocaleString()}
                    </Item>
                  </Grid>
                  <Grid item xs={2.5}>
                    <Item>
                      {`$ ${totals.totalAllocation.toLocaleString()}`}
                    </Item>
                  </Grid>
                  <Grid item xs={2.5}>
                    <Item>
                      {`$ ${totals.totalObligations.toLocaleString()}`}
                    </Item>
                  </Grid>
                  <Grid item xs={2.5}>
                    <Item>
                      <Box border='2px solid' borderRadius='8px'>
                        <Box
                          borderRadius='8px'
                          bgcolor={fyDelta <= 0 ? '#115e0a' : '#800000'}
                        >
                          {`$ ${(totals.totalAllocation - totals.totalObligations).toLocaleString()}`}
                        </Box>
                      </Box>
                    </Item>
                  </Grid>

                </Grid>

              </Stack>

            </Grid>
          </Grid>
        </Box>
        :
        <p>Data is loading...</p>
      }
    </>
  );
}