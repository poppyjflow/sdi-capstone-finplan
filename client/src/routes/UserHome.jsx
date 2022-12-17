import React from 'react';
import { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import DataTable from '../components/DataTable';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SyncIcon from '@mui/icons-material/Sync';
import AddIcon from '@mui/icons-material/Add';
import {
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';

const getUserFullName = ({ row }) => `${row.f_name || ''} ${row.l_name || ''}`;

const getFiscalQuarter = ({ row }) => {
  const quarters = {
    Q1: [9, 10, 11],
    Q2: [0, 1, 2],
    Q3: [3, 4, 5],
    Q4: [6, 7, 8],
  };
  const result = new Date(row.req_date);
  let formattedDate;
  for (const quarter in quarters) {
    if (quarters[quarter].includes(result.getMonth())) {
      formattedDate = `${quarter} ${result.getFullYear()}`;
    }
  }
  return formattedDate;
};

const quarterSort = (v1, v2) => {
  const val1 = v1.split(' ');
  const val2 = v2.split(' ');
  return (`${val1[1]}.${val1[0][1]}` - `${val2[1]}.${val2[0][1]}`);
}

const UserHome = () => {
  const [user] = useOutletContext();

  const navigate = useNavigate();

  const handleNewRequest = (e) => {
    e.preventDefault();
    navigate('/new-request');
  };

  const handleSource = (e) => {
    e.preventDefault();
  };

  const columns = [
    {
      field: 'id'
    },
    {
      field: 'req_date',
    },
    {
      field: 'fiscal_quarter',
      editable: false,
      headerName: 'FQ',
      flex: .15,
      headerAlign: 'center',
      align: 'center',
      valueGetter: getFiscalQuarter,
      sortComparator: quarterSort,
    },
    {
      field: 'org_name',
      headerName: 'Org',
      flex: .25,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'l_name',
    },
    {
      field: 'f_name',
    },
    {
      field: 'requestee',
      headerName: 'Submitted By',
      flex: .2,
      headerAlign: 'center',
      align: 'center',
      valueGetter: getUserFullName,
    },
    {
      field: 'priority',
      headerName: 'Priority',
      flex: .07,
      headerAlign: 'center',
      align: 'center',
      editable: true,
    },
    {
      field: 'req_code',
      headerName: 'Category',
      flex: .2,
      headerAlign: 'center',
      align: 'center',
      editable: true,
    },
    {
      field: 'req_title',
      headerName: 'Request',
      flex: .4,
      headerAlign: 'center',
      align: 'center',
      editable: true,
    },
    {
      field: 'cost',
      headerName: 'Cost',
      flex: .1,
      headerAlign: 'center',
      align: 'center',
      editable: true,
      type: 'number',
      // valueFormatter: (params) => {
      //   if (params.value == null) return '';

      //   const formattedNum = params.value.toString().replaceAll(',', '');
      //   return formattedNum;
      // }
    },
    {
      type: 'number',
      field: 'allocated_funds',
      headerName: 'Allocation',
      flex: .2,
      headerAlign: 'center',
      align: 'center',
      editable: true,
    },
    {
      type: 'number',
      field: 'spent_funds',
      headerName: 'Obligation',
      flex: .2,
      headerAlign: 'center',
      align: 'center',
      editable: true,
    },
  ];

  const NewRequest = () => (
    <Button
      onClick={handleNewRequest}
      variant='text'
      color='primary'
      startIcon={<AddIcon />}
    >
      Request
    </Button>
  );

  const DataSource = () => (
    <Button
      onClick={handleSource}
      variant='text'
      color='primary'
      startIcon={<SyncIcon />}
    >
      Switch Orgs
    </Button>
  );

  const ItemToolBar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <NewRequest />
        <DataSource />
      </GridToolbarContainer>
    );
  };

  return (
    <Box
      className='user-home'
      height='100%'
      display='flex'
      flexWrap='wrap'
      overflow='hidden'
      flexDirection='column'
      alignContent='center'
      justifyContent='space-evenly'
    >
      <Box
        className='grid'
        height='80%'
        width={.95}
        flexDirection='column'
      >
        <DataTable
          itemBar={ItemToolBar}
          user={user}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default UserHome;