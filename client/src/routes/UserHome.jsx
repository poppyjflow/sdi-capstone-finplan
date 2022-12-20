import React from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import DataTable from '../components/DataTable';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import {
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from '@mui/x-data-grid';
import StatusBar from '../components/StatusBar';

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

  const renderDelta = ({ row }) => {
    if (row.allocated && row.obligated) {
      const percentage = row.obligated / row.allocated;
      return (
        <Box border='2px solid' borderRadius='8px'>
          <Box
            width={percentage}
            borderRadius='8px'
            bgcolor={percentage === 1 ? '#115e0a' : '#ff0008'}
          >
            {`$${row.obligated} / $${row.allocated}`}
          </Box>
        </Box>
      )
    }
    return null;
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
      maxWidth: 80,
      description: 'Fiscal quarter / year',
      headerName: 'FQ',
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
      description: 'Priority codes',
      headerName: 'Priority',
      flex: .1,
      headerAlign: 'center',
      align: 'center',
      editable: true,
    },
    {
      field: 'req_code',
      description: 'Category each request falls into',
      headerName: 'Category',
      flex: .2,
      headerAlign: 'center',
      align: 'center',
      editable: true,
    },
    {
      field: 'req_title',
      headerName: 'Details',
      flex: .35,
      headerAlign: 'center',
      align: 'center',
      editable: true,
    },
    {
      field: 'requested',
      description: 'Requested funding',
      headerName: 'Requested',
      flex: .15,
      headerAlign: 'center',
      align: 'center',
      editable: true,
      type: 'number',
    },
    {
      type: 'number',
      description: 'Allocated funding',
      field: 'allocated',
      headerName: 'Allocated',
      flex: .2,
      headerAlign: 'center',
      align: 'center',
      editable: true,
    },
    {
      type: 'number',
      field: 'obligated',
      description: 'How much of the allocated funding has been spent',
      headerName: 'Obligated',
      flex: .2,
      headerAlign: 'center',
      align: 'center',
      editable: true,
    },
    {
      field: 'delta',
      headerName: 'Delta',
      minWidth: 145,
      flex: .2,
      headerAlign: 'center',
      align: 'center',
      editable: false,
      renderCell: renderDelta,
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

  const ItemToolBar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <NewRequest />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  };

  return (
    <>
    <Box sx={{marginBottom: '1em', background: 'gray', padding: '0.5em'}}>
      <StatusBar />
    </Box>
    <Box
      className='grid'
      height='80vh'
      width={1}
      flexDirection='column'
    >
      <DataTable
        itemBar={ItemToolBar}
        user={user}
        columns={columns}
      />
    </Box>
    </>
  );
};

export default UserHome;