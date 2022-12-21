import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { CardContent, Typography } from '@mui/material';
import AnnualPieChart from '../components/AnnualPieChart';
import { QuarterlyBarChart } from '../components/QuarterlyBarChart';
import { useLoaderData } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SummaryView = () => {
  const user = useLoaderData();
  const [yearData, setYearData] = useState(null)
  const [year, setYear] = useState(2023)
  const [orgName, setOrgName] = useState(user.org)
  const org = user.org_id

  const handleYearChange = (event) => {
    setYear(event.target.value)
  }

  useEffect(() => {
    var fiscalyear = 0;
    var today = new Date();
    if ((today.getMonth() === 10) || (today.getMonth() === 11) || (today.getMonth() === 12)) {
      fiscalyear = (today.getFullYear() + 1)
    } else {
      fiscalyear = today.getFullYear()
    }
    setYear(fiscalyear)
    return
  }, [])

  useEffect(() => {
    let orgYear = {
      org_id: org,
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
    .then(res => setYearData(res))
    .catch(err => {
      console.log(err);
      alert('There was a problem accessing request data.')
    })
  }, [year, org])

    return(
      <>
      {yearData ?
          org ?
          <Grid sx={{flexGrow: 1, maxWidth: '100%', maxHeight: '100%', marginTop: '1em', marginBottom:'1em'}}>
            <Grid container
            spacing={3}
            justifyContent="space-between"
            sx={{marginBottom: '5em', marginLeft: '0em', width: '100%'}}
            >
              <Grid container xs={2} justifyContent='center'>
              <Card sx={{width: '14.5em', height: '6em'}}>
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Summary View
                </Typography>
                <Typography gutterBottom variant="h9" component="div">
                    Next Due Date: {yearData.due_date}
                </Typography>
                </CardContent>
              </Card>
              </Grid>
              <Grid container xs={6} justifyContent='center'>
              <Card sx={{width: 'auto', height: '4em'}}>
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Organization: {orgName ? orgName : <p>Loading...</p>}
                </Typography>
                </CardContent>
              </Card>
              </Grid>
              <Grid container xs={2} justifyContent='center'>
                <Card sx={{width: '15em', height: '8em'}}>
                <CardContent>
                  <Typography gutterBottom variant="h8" component="div">
                    Current FY:
                  </Typography>
                    <Box sx={{ minWidth: 120,  marginTop: '0.7em'}}>
                      <FormControl fullWidth>
                        <InputLabel id="year-menu-label">Select</InputLabel>
                        <Select
                          labelId="year-menu-label"
                          id="year-menu"
                          value={year}
                          label="Year"
                          onChange={handleYearChange}
                        >
                          <MenuItem value={2022}>2022</MenuItem>
                          <MenuItem value={2023}>2023</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                </CardContent>
                </Card>
              </Grid>
              </Grid>
              <Grid container spacing={3} sx={{width: '100%', marginLeft: '0em'}}>
              <Grid item xs={8} sx={{marginBottom: '1em'}}>
                <QuarterlyBarChart data={yearData}/>
              </Grid>
              <Grid item xs={4}>
                <AnnualPieChart data={yearData}/>
              </Grid>
            </Grid>
          </Grid>
          :
          <Typography style={{color: 'white'}}>Your account is not affiliated with any organizations.</Typography>
        :
        <p>Loading statistics...</p>
      }
      </>
    )
}


export default SummaryView