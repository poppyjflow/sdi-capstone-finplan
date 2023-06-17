import React, { useState, createContext, useMemo, useEffect, useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { OrgContext } from '../layouts/ProtectedRoutes';
import axios from 'axios';


const ExportAll = () => {
  const [org] = useContext(OrgContext);

  useEffect(() => {
    // if(org) {
      const fetchData = async (orgID) => {
        const res = await axios.get(`http://localhost:8080/requests/${org}`);
    //     // Calculate annual requests/allocations/obligations per-row based on the quarterly data.  For now this actually overrides the DB values for these three columns, which should remain = 0.
    //     const fyData = [];
    //     var ctr = 1;
    //     for (const j in res.data) {
    //       // Though we queried for all Requests for an org, we really only want to display Requests for the FY specified in the dropdown.
    //       if (res.data[j].fy.toString() === fy.value.toString()) {
    //         res.data[j].requested = res.data[j].q1requested + res.data[j].q2requested + res.data[j].q3requested + res.data[j].q4requested;
    //         res.data[j].allocated = res.data[j].q1allocated + res.data[j].q2allocated + res.data[j].q3allocated + res.data[j].q4allocated;
    //         res.data[j].obligated = res.data[j].q1obligated + res.data[j].q2obligated + res.data[j].q3obligated + res.data[j].q4obligated;

    // //          res.data[j].requested = "$ " + res.data[j].requested;

    //         fyData.push(res.data[j]);
    //       }
    //     }

    //     setTableData(fyData);
    //     // setTableData(res.data);
    //   };
    //   if (user.auth) fetchData(); else console.log(`NOPE!`);
   }

   fetchData(org);
  }, [org]);
  const downloadCSV = async () => {

  };

  return (
    <IconButton
      onClick={downloadCSV}
      aria-label="information"
      sx={{ color: 'primary.main', fontSize: 12, fontWeight: 'bold' }}>
      <FileDownloadOutlinedIcon sx={{ fontSize: 20 }} />
      EXPORT CSV BACKUP
    </IconButton>



  );

};

export default ExportAll;
