import React from 'react';
import GuestTable from '../components/GuestTable';
import Box from '@mui/material/Box';
import { useLoaderData } from 'react-router-dom';

const GuestHome = () => {
  const { data } = useLoaderData();

  function getFullName(params) {
    return `${params.row.firstName || ''} ${params.row.lastName || ''}`;
  }

  const columns = [
    {
      field: 'id'
    },
    {
      field: 'itemName',
      headerName: 'Product',
      flex: .2,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'firstName',
    },
    {
      field: 'lastName',
    },
    {
      field: 'merchant',
      headerName: 'Merchant',
      valueGetter: getFullName,
      flex: .1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: .6,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      flex: .1,
      headerAlign: 'center',
      align: 'center',
      type: 'number',
    },
  ];

  return (
    <Box
      className='guest-home'
      height='100%'
      display='flex'
      flexWrap='wrap'
      overflow='hidden'
      flexDirection='column'
      alignContent='center'
      justifyContent='space-evenly'
    >
      <h1>Guest View</h1>
      <Box
        className='grid'
        height='80%'
        width={.8}
        flexDirection='column'
      >
        <GuestTable
          columns={columns}
          rows={data}
        />
      </Box>
    </Box>
  );
};

export default GuestHome;