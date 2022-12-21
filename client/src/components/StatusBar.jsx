import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { useLoaderData } from 'react-router-dom';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(.5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function StatusBar({updated, setUpdated}) {
  const user = useLoaderData()
  const org = user.org_id
  const year = 2023
  const [allData, setAllData] = useState(null)
  const [totals, setTotals] = useState(null)
  const [reconciled, setReconciled] = useState(null)
  // let data = {unit: "50th BX", dueDate: "Nov 5th 2021", status: "green",
  //             requestNum: 7, allocation: 734432, obligation: 54430}

  useEffect (() => {
    if(totals){
      parseInt(totals.totalAllocation) - parseInt(totals.totalObligations) === 0 ? setReconciled(true): setReconciled(false)
      return
    }
      return
  }, [totals])

  useEffect(() => {
    let orgYear = {
      org_id: 1,
      year_fy: year
    }
    fetch('http://localhost:8080/banner', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orgYear)
    })
    .then(res => res.json())
    .then(res => {
      let requests = (res.q1.requests + res.q2.requests + res.q3.requests + res.q4.requests)
      let allocations = (res.q1.allocations + res.q2.allocations + res.q3.allocations + res.q4.allocations)
      let obligations = (res.q1.obligations + res.q2.obligations + res.q3.obligations + res.q4.obligations)
      setTotals({totalRequests: requests, totalAllocation: allocations,totalObligations: obligations})
      setAllData(res)
    })
    .catch(err => {
      console.log(err);
      alert('There was a problem accessing request data.')
    })
  }, [updated])

  return (
    <>
    {allData ? 
      <Box sx={{ flexGrow: 1 }}>
        <Grid container alignItems='center' spacing={.8}>
          <Grid item xs={3}>
          <Stack spacing={2.5}>
          <Item>Unit: {allData.org_name} </Item>
          <Item>Submission Due Date: {allData.due_date}</Item>
          <Item>Status: {reconciled ? 
            <span style={{color: 'green'}}>Reconciled</span> 
          : 
            <span style={{color: 'red'}}>Needs Reconciled</span> 
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
            $ {allData.q1.requests}
            </Item>
          </Grid>
          <Grid item xs={2.5}>
          <Item>
            $ {allData.q1.allocations}
            </Item>
          </Grid>
          <Grid item xs={2.5}>
          <Item>
            $ {allData.q1.obligations}
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
          <Grid item xs={2.5}>
          <Item>
          $ {allData.q2.allocations}
          </Item>
          </Grid>
          <Grid item xs={2.5}>
          <Item>
            $ {allData.q2.obligations}
            </Item>
          </Grid>
          <Grid item xs={2.5}>
          <Item>
            $ {allData.q2.allocations - allData.q2.obligations}
            </Item>
          </Grid>

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
          <Grid item xs={2.5}>
          <Item>
            $ {allData.q3.allocations}
            </Item>
          </Grid>
          <Grid item xs={2.5}>
          <Item>
            $  {allData.q3.obligations}
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
          <Grid item xs={2.5}>
          <Item>
            $ {allData.q4.allocations}
            </Item>
          </Grid>
          <Grid item xs={2.5}>
          <Item>
            $ {allData.q4.obligations}
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