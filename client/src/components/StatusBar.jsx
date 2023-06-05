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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(.5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function StatusBar({ updated, setUpdated }) {
  const user = useLoaderData();
  const org = user.org_id;
  const year = 2023;
  const [allData, setAllData] = useState(null);
  const [totals, setTotals] = useState(null);
  const [reconciled, setReconciled] = useState(null);
  const [fyList, setFYList] = useState([{id: 1, name: ' '}]);
  const [fySelected, setFYSelected] = useState(null);
  // Grabs current year from today's date for default value.
  const [fyDisplayed, setFYDisplayed] = useState(() => {
    var tempArr = Date().split(" ");
    return {id: 0, name: parseInt(tempArr[3]) + 1};
  });
  var q1Percent = null;
  var q2Percent = null;
  var q3Percent = null;
  var q4Percent = null;

  var fyDropdownOptions = [];

  console.log(totals);

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
      org_id: org,
      year_fy: year
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
  }, [updated]);

  useEffect(() => {
    if (org) {
      fetch(`http://localhost:8080/fiscal_years/${org}`
      )
        .then(res => res.json())
        .then(res => {
          if (res) {
            console.log(`res: ${JSON.stringify(res)}`);
            console.log(`res.date: ${JSON.stringify(res.req_date)}`);

            //Game Plan: Populate the dropdown array with all FYs from the oldest record in the DB to the current FY+1.
            var currFY = 0;
            setFYList([]); // re-initialize these.
            fyDropdownOptions = [];

            // Current year.
            const currDate = Date();
            console.log(`date string: ${currDate[3]}`);
            var tempArr = currDate.split(" ");
            console.log(`tempArr: ${tempArr[3]}`);
            currFY = parseInt(tempArr[3]) + 1;
            console.log(`currFY: ${currFY}`);
            console.log(`3`);

            // Oldest year from DB.
            const fyCounter = parseInt(res.req_date);
            console.log(`4`);

            // Populate the dropdown.
            var ctr = 0;
            while (currFY - fyCounter >= 0) {
              console.log(`5`);
              fyDropdownOptions.push({id: ctr, name: currFY});
              currFY--; ctr++;
            }

            console.log(`fyDropdownOptions: ${fyDropdownOptions}`);

            setFYList(fyDropdownOptions); // re-populate this.
          }
        })
        .catch(err => {
          console.log(err);
          alert('There was an error processing your request.');
        });
    }
  }, []);

  const handleYearChange = (selection) => {
    // setFYSelected(selection);
    console.log(`target.value: ${selection.target.value}`)
    setFYDisplayed({id: selection.target.value, name: selection.target.name});
  }

  if (allData) {
    // Determine which percentage of available funds have been spent.
    q1Percent = allData.q1.obligations / allData.q1.allocations;
    q2Percent = allData.q2.obligations / allData.q2.allocations;
    q3Percent = allData.q3.obligations / allData.q3.allocations;
    q4Percent = allData.q4.obligations / allData.q4.allocations;

    // Populate dropdown array with Fiscal Year options by adding every FY from the oldest record to the current FY.

  }

console.log(`fySelected: ${fySelected}`)
  console.log(`fyDisplayed: ${JSON.stringify(fyDisplayed)}`)
  return (
    <>
      {allData ?
        <Box
          component={Paper}
          flexGrow={1}
          p={2}
        >
          <Grid container alignItems='center' spacing={.8}>
            <Grid item xs={3}>
              <Stack spacing={2.5}>
                <Item>
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
                          return <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>;
                        })
                      }



                    </Select>
                  </FormControl>
                </Item>                <Item>Submission Due Date: {allData.due_date}</Item>
                <Item>Status: {reconciled ?
                  <span style={{ color: 'green' }}>Reconciled</span>
                  :
                  <span style={{ color: 'red' }}>Needs Reconciled</span>
                }
                </Item>
              </Stack>
            </Grid>

            <Grid item xs={3}>
              <Stack spacing={.9}>
                <Item>Total Requests: ${totals ? totals.totalRequests : 0}</Item>
                <Item>Total Allocation: ${totals ? totals.totalAllocation : 0}</Item>
                <Item>Total Obligations: ${totals ? totals.totalObligations : 0}</Item>
                <Item>Delta: ${totals ? totals.totalAllocation - totals.totalObligations : 0}</Item>
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
                  <Grid item xs={5.0}>
                    <Item>
                      Obligations / Allocations
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
                      $ {allData.q1.requests}
                    </Item>
                  </Grid>
                  <Grid item xs={5}>
                    <Item>
                      <Box border='2px solid' borderRadius='8px'>
                        <Box
                          width={q1Percent}
                          borderRadius='8px'
                          bgcolor={q1Percent === 1 ? '#115e0a' : '#800000'}
                        >
                          {`$${allData.q1.obligations} / $${allData.q1.allocations}`}
                        </Box>
                      </Box>
                    </Item>
                  </Grid>
                  <Grid item xs={2.5}>
                    <Item>
                      $ {allData.q1.allocations - allData.q1.obligations}
                    </Item>
                  </Grid>

                  <Grid item xs={2}>
                    <Item>
                      Q2
                    </Item>
                  </Grid>
                  <Grid item xs={2.5}>
                    <Item>
                      $ {allData.q2.requests}
                    </Item>
                  </Grid>
                  <Grid item xs={5}>
                    <Item>
                      <Box border='2px solid' borderRadius='8px'>
                        <Box
                          width={q2Percent}
                          borderRadius='8px'
                          bgcolor={q2Percent === 1 ? '#115e0a' : '#800000'}
                        >
                          {`$${allData.q2.obligations} / $${allData.q2.allocations}`}
                        </Box>
                      </Box>
                    </Item>
                  </Grid>
                  <Grid item xs={2.5}>
                    <Item>
                      $ {allData.q2.allocations - allData.q2.obligations}
                    </Item>
                  </Grid>

                  {/* <Grid item xs={5}>
                    <Item>
                      {q2Percent > .3
                        ?
                        <Box border='2px solid' borderRadius='8px'>
                          <Box
                            width={q2Percent}
                            borderRadius='8px'
                            bgcolor={q2Percent === 1 ? '#115e0a' : '#800000'}
                          >
                            {`$${allData.q2.obligations} / $${allData.q2.allocations}`}
                          </Box>
                        </Box>
                        :
                        <Grid item xs={3}>
                        <Box border='2px solid' borderRadius='8px'>
                          <Box
                            width={q2Percent}
                            borderRadius='8px'
                            bgcolor={q2Percent === 1 ? '#115e0a' : '#800000'}
                            >$
                          </Box>
                          <Box
                            width={1 - q2Percent}
                            borderRadius='8px'
                            // bgcolor={q2Percent === 1 ? '#115e0a' : '#800000'}
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
                      $ {allData.q3.requests}
                    </Item>
                  </Grid>
                  <Grid item xs={5}>
                    <Item>
                      <Box border='2px solid' borderRadius='8px'>
                        <Box
                          width={q3Percent}
                          borderRadius='8px'
                          bgcolor={q3Percent === 1 ? '#115e0a' : '#800000'}
                        >
                          {`$${allData.q3.obligations} / $${allData.q3.allocations}`}
                        </Box>
                      </Box>
                    </Item>
                  </Grid>
                  <Grid item xs={2.5}>
                    <Item>
                      $ {allData.q3.allocations - allData.q3.obligations}
                    </Item>
                  </Grid>

                  <Grid item xs={2}>
                    <Item>
                      Q4
                    </Item>
                  </Grid>
                  <Grid item xs={2.5}>
                    <Item>
                      $ {allData.q4.requests}
                    </Item>
                  </Grid>
                  <Grid item xs={5}>
                    <Item>
                      <Box border='2px solid' borderRadius='8px'>
                        <Box
                          width={q4Percent}
                          borderRadius='8px'
                          bgcolor={q4Percent === 1 ? '#115e0a' : '#800000'}
                        >
                          {`$${allData.q4.obligations} / $${allData.q4.allocations}`}
                        </Box>
                      </Box>
                    </Item>
                  </Grid>
                  <Grid item xs={2.5}>
                    <Item>
                      $ {allData.q4.allocations - allData.q4.obligations}
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