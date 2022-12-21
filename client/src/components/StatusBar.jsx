import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(.5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function StatusBar() {
  let data = {
    unit: "50th BX", dueDate: "Nov 5th 2021", status: "green",
    requestNum: 7, allocation: 734432, obligation: 54430
  }
  return (
    <Box
      component={Paper}
      flexGrow={1}
      p={2}
    >
      <Grid container spacing={.8}>
        <Grid item xs={3}>
          <Stack spacing={2}>
            <Item>Unit: {data.unit} </Item>
            <Item>Submission Due Date: {data.dueDate}</Item>
            <Item>Status: <span style={{ color: data.status === "green" ? "green" : "red" }}>{data.status}</span> </Item>
          </Stack>
        </Grid>

        <Grid item xs={3}>
          <Stack spacing={.3}>
            <Item>Total Requests: ${data.requestNum}</Item>
            <Item>Total Allocation: ${data.allocation}</Item>
            <Item>Total Obligations: ${data.obligation}</Item>
            <Item>Delta: ${data.allocation - data.obligation}</Item>
          </Stack>

        </Grid>
        <Grid item xs={6}>

          <Stack spacing={.6}>
            <Grid container spacing={.2}>
              <Grid item xs={2}>

              </Grid>
              <Grid item xs={2.5}>
                Requests
              </Grid>
              <Grid item xs={2.5}>
                Allocations
              </Grid>
              <Grid item xs={2.5}>
                Obligations
              </Grid>

              <Grid item xs={2.5}>
                Delta
              </Grid>

              <Grid item xs={2}>
                Q1
              </Grid>
              <Grid item xs={2.5}>
                $
              </Grid>
              <Grid item xs={2.5}>
                $
              </Grid>
              <Grid item xs={2.5}>
                $
              </Grid>
              <Grid item xs={2.5}>
                $
              </Grid>

              <Grid item xs={2}>
                Q2
              </Grid>
              <Grid item xs={2.5}>
                $
              </Grid>
              <Grid item xs={2.5}>
                $
              </Grid>
              <Grid item xs={2.5}>
                $
              </Grid>
              <Grid item xs={2.5}>
                $
              </Grid>

              <Grid item xs={2}>
                Q3
              </Grid>
              <Grid item xs={2.5}>
                $
              </Grid>
              <Grid item xs={2.5}>
                $
              </Grid>
              <Grid item xs={2.5}>
                $
              </Grid>
              <Grid item xs={2.5}>
                $
              </Grid>

              <Grid item xs={2}>
                Q4
              </Grid>
              <Grid item xs={2.5}>
                $
              </Grid>
              <Grid item xs={2.5}>
                $
              </Grid>
              <Grid item xs={2.5}>
                $
              </Grid>
              <Grid item xs={2.5}>
                $
              </Grid>


            </Grid>





          </Stack>

        </Grid>
      </Grid>
    </Box>
  );
}