import React, { useState, createContext, useMemo, useEffect, useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { OrgContext } from '../layouts/ProtectedRoutes';
import { FYContext } from '../layouts/ProtectedRoutes';
import axios from 'axios';


const ExportAll = () => {
  const [org] = useContext(OrgContext);
  const [fy] = useContext(FYContext);
  var orgFromDB = '';
  var fyFromDB = '';
  const [csv, setCSV] = useState([]);
  var headerData = '"FinPlan Data Export --  %1, FY%2"';
  const columns = [
    'Priority',
    'Requirement',
    'Description',
    'Detail',
    'Impact',
    'FY Requested',
    'FY Allocated',
    'FY Obligated',
    'FY Delta',
    'Q1 Requested',
    'Q1 Allocated',
    'Q1 Obligated',
    'Q1 Delta',
    'Q2 Requested',
    'Q2 Allocated',
    'Q2 Obligated',
    'Q2 Delta',
    'Q3 Requested',
    'Q3 Allocated',
    'Q3 Obligated',
    'Q3 Delta',
    'Q4 Requested',
    'Q4 Allocated',
    'Q4 Obligated',
    'Q4 Delta',
  ];

  useEffect(() => {
    // if(org) {
    const fetchData = async (orgID) => {
      const res = await axios.get(`http://localhost:8080/requests/${org}`);

      // Calculate annual requests/allocations/obligations per-row based on the quarterly data.  For now this actually overrides the DB values for these three columns, which should remain = 0.
      const fyData = [];
      var formattedArr = [];
      //      var ctr = 1;
      for (const j in res.data) {

        // Though we queried for all Requests for an org, we really only want to display Requests for the FY specified in the dropdown.
        if (res.data[j].fy.toString() === fy.value.toString()) {

          // Capture the Org Name & FY before we delete them from the Result object.
          orgFromDB = res.data[j].org_name;
          fyFromDB = res.data[j].fy;

          // Delete these keys from the Result object so they don't appear in the export.
          delete res.data[j].id;
          delete res.data[j].user;
          delete res.data[j].fy;
          delete res.data[j].org;
          delete res.data[j].req_granted;
          delete res.data[j].f_name;
          delete res.data[j].l_name;
          delete res.data[j].org_name;

          // Calculate annual rollups from quarterly data.
          res.data[j].requested = res.data[j].q1requested + res.data[j].q2requested + res.data[j].q3requested + res.data[j].q4requested;
          res.data[j].allocated = res.data[j].q1allocated + res.data[j].q2allocated + res.data[j].q3allocated + res.data[j].q4allocated;
          res.data[j].obligated = res.data[j].q1obligated + res.data[j].q2obligated + res.data[j].q3obligated + res.data[j].q4obligated;

          // Calculate Deltas from Allocations minus Obligations, showing  how much funds still need to be spent.
          res.data[j].delta = res.data[j].allocated - res.data[j].obligated;
          res.data[j].q1delta = res.data[j].q1allocated - res.data[j].q1obligated;
          res.data[j].q2delta = res.data[j].q2allocated - res.data[j].q2obligated;
          res.data[j].q3delta = res.data[j].q3allocated - res.data[j].q3obligated;
          res.data[j].q4delta = res.data[j].q4allocated - res.data[j].q4obligated;

          // Add dollar signs.
          res.data[j].requested = "$ " + res.data[j].requested;

          // Put quotes around the text strings so the CSV conversion won't try to create new comma-delimited columns when it encounters a user-entered comma in these fields.
          res.data[j].req_title = (`"${res.data[j].req_title}"`);
          res.data[j].description = (`"${res.data[j].description}"`);
          res.data[j].justification = (`"${res.data[j].justification}"`);

          fyData.push(res.data[j]);

          // Build a CSV array from the JSON array, consisting of header row first, then column names, then all the data; comma-delimited.
          headerData = headerData.replace('%1', orgFromDB);
          headerData = headerData.replace('%2', fyFromDB);

          const bodyData = fyData.map((j) => {
            return Object.values(j).toString();
          });
          setCSV([headerData, columns, ...bodyData].join('\n'));
          // }
        }

        //        ctr++;
      }
    };

    fetchData(org);
  }, [org]);

  const downloadCSV = async () => {
    // Download the CSV: put data into a Blob, create temp URL, set the Download attribute of a new HTML <a> tag, simulate a user link-click, then clean up our temp object when done--download that puppy!
    const blob = new Blob([csv], { type: 'application/csv' });
    const url = URL.createObjectURL(blob);
    const aTag = document.createElement('a');
    aTag.download = 'jtest.csv';
    aTag.href = url;
    aTag.style.display = 'none';

    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
    URL.revokeObjectURL(url);
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
