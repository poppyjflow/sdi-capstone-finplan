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
      field: 'quarter',
      editable: false,
      headerName: 'FYQ',
      flex: .1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'priority',
      headerName: 'Priority',
      flex: .1,
      headerAlign: 'center',
      align: 'center',
      editable: true,
    },
    {
      field: 'cost',
      headerName: 'Cost',
      flex: .2,
      headerAlign: 'center',
      align: 'center',
      editable: true,
      type: 'number',
    },
    {
      field: 'request_code',
      headerName: 'Category',
      flex: .2,
      headerAlign: 'center',
      align: 'center',
      editable: true,
    },
    {
      field: 'request_title',
      headerName: 'Title',
      flex: .4,
      headerAlign: 'center',
      align: 'center',
      editable: true,
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: .4,
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
      <h1>Your Inventory</h1>
      <Box
        className='grid'
        height='80%'
        width={.8}
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