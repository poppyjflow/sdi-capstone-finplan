import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { CardContent, Typography } from '@mui/material';
import AnnualPieChart from '../components/AnnualPieChart';
import { QuarterlyBarChart } from '../components/QuarterlyBarChart';


const SummaryView = () => {
    return(
    <Grid sx={{flexGrow: 1, maxWidth: '100%', maxHeight: '100%', marginTop: '1em', marginBottom:'1em'}}>
      <Grid container
      spacing={3}
      justifyContent="space-between"
      sx={{marginBottom: '5em'}}
      >
        <Grid item xs={2}>
        <Card sx={{width: '12.5em', height: '4em'}}>
          <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Summary View
          </Typography>
          </CardContent>
        </Card>
        </Grid>
        <Grid item xs={2}>
          <Card sx={{width: '15em', height: '5em'}}>
          <CardContent>
            <Typography gutterBottom variant="h8" component="div" >
              Current Quarter: Q1, 2023
            </Typography>
            <Typography gutterBottom variant="h9" component="div">
              Next Due Date: 30 Dec 2022
            </Typography>
          </CardContent>
          </Card>
        </Grid>
        </Grid>
        <Grid container spacing={3}>
        <Grid item xs={8} sx={{marginBottom: '1em'}}>
          <QuarterlyBarChart />
        </Grid>
        <Grid item xs={4}>
          <AnnualPieChart />
        </Grid>
      </Grid>
    </Grid>
    )
}


export default SummaryView