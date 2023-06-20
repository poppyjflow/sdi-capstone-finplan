import React, { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import DataTable from '../components/DataTable';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import PreviewIcon from '@mui/icons-material/Preview';
import ViewListIcon from '@mui/icons-material/ViewList';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import DetailsDialog from '../components/DetailsDialog';
import QuartersDialog from '../components/QuartersDialog';
import NumericFormatCustom from '../components/NumericFormatCustom';
import InputAdornment from '@mui/material/InputAdornment';
import DownloadIcon from '@mui/icons-material/Download';
import PriorityModal from '../components/PriorityModal';
import ExportAll from '../components/ExportAll';

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
      if (quarters.Q1.includes(result.getMonth())) {
        return `${quarter} ${result.getFullYear() + 1}`;
      }
      formattedDate = `${quarter} ${result.getFullYear()}`;
    }
  }
  return formattedDate;
};

const quarterSort = (v1, v2) => {
  const val1 = v1.split(' ');
  const val2 = v2.split(' ');
  return (`${val1[1]}.${val1[0][1]}` - `${val2[1]}.${val2[0][1]}`);
};

const UserHome = () => {
  const [user] = useOutletContext();
  const [updated, setUpdated] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [details, setDetails] = useState({});
  const [title, setTitle] = useState({});
  const [openQtrDetails, setOpenQtrDetails] = useState(false);
  const [q1, setQ1] = useState({});
  const [q2, setQ2] = useState({});
  const [q3, setQ3] = useState({});
  const [q4, setQ4] = useState({});

  const handleClickOpen = (id, title, body, justification) => {
    setDetails({ id: id, title: title, body: body, justification: justification });
    setOpenDetails(true);
  };

  const handleQtrClickOpen = (row) => {
    setTitle({ title: row.req_title });
    setQ1({ id: row.id, requested: row.q1requested, allocated: row.q1allocated, obligated: row.q1obligated });
    setQ2({ id: row.id, requested: row.q2requested, allocated: row.q2allocated, obligated: row.q2obligated });
    setQ3({ id: row.id, requested: row.q3requested, allocated: row.q3allocated, obligated: row.q3obligated });
    setQ4({ id: row.id, requested: row.q4requested, allocated: row.q4allocated, obligated: row.q4obligated });
    setOpenQtrDetails(true);
  };

  const handleClose = () => {
    setOpenDetails(false);
  };

  const handleQtrClose = () => {
    setOpenQtrDetails(false);
  };

  const navigate = useNavigate();

  const handleNewRequest = (e) => {
    e.preventDefault();
    navigate('/new-request');
  };

  const RenderDetails = (props) => {
    const { row } = props;
    return (
      <Grid2 container spacing={.5} alignItems='center'>
        <Grid2 xs={10} overflow={'hidden'} textOverflow='ellipsis'>
          <strong>{row.req_title}</strong>
        </Grid2>
        <Grid2 xs={2}>
          <IconButton
            onClick={(e) => handleClickOpen(row.id, row.req_title, row.description, row.justification)}
          >
            <PreviewIcon />
          </IconButton>
        </Grid2>
      </Grid2>
    );
  };

  const RenderQuarters = (props) => {
    const { row } = props;
    return (
      <Grid2 container spacing={.5} alignItems='center'>
        <Grid2 xs={'auto'}>
          <IconButton
            onClick={(e) => handleQtrClickOpen(row)}
          >
            <ViewListIcon />
          </IconButton>
        </Grid2>
      </Grid2>
    );
  };

  const RenderDeltaCellColor = ({ row }) => {
    const delta = row.allocated - row.obligated;
    return (

      <Box border='2px solid' borderRadius='8px' width="100%" align="center">
        <Box
          borderRadius='8px'
          bgcolor={delta <= 0 ? '#115e0a' : '#800000'}
        >
          {`$ ${delta.toLocaleString()}`}
        </Box>
      </Box>
    );

    return null;
  };

  const RenderDollaSignsRequested = ({ row }) => {
    return (

      <Box border='0px' borderRadius='8px' width="100%" align="center">
          {`$ ${row.requested.toLocaleString()}`}
      </Box>
    );

    return null;
  };

  const RenderDollaSignsAllocated = ({ row }) => {
    return (

      <Box border='0px' borderRadius='8px' width="100%" align="center">
          {`$ ${row.allocated.toLocaleString()}`}
      </Box>
    );

    return null;
  };

  const RenderDollaSignsObligated = ({ row }) => {
    return (

      <Box border='0px' borderRadius='8px' width="100%" align="center">
          {`$ ${row.obligated.toLocaleString()}`}
      </Box>
    );

    return null;
  };

  const columns = [
    // {
    //   field: 'fy',
    //   description: 'Fiscal Year',
    //   headerName: 'Fiscal Year',
    //   flex: .1,
    //   headerAlign: 'center',
    //   align: 'center',
    //   editable: true,
    // },
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
      headerName: 'Requirement',
      flex: .1,
      headerAlign: 'center',
      align: 'center',
      editable: true,
    },
    {
      field: 'req_title',
      headerName: 'Description',
      flex: .2,
      headerAlign: 'center',
      align: 'center',
      editable: false,
      renderCell: RenderDetails,
    },
    {
      type: 'number',
      field: 'requested',
      description: 'Requested funding',
      headerName: 'Requested',
      flex: .1,
      headerAlign: 'center',
      align: 'center',
      editable: true,
      renderCell: RenderDollaSignsRequested,
    },
    {
      type: 'number',
      description: 'Allocated funding',
      field: 'allocated',
      headerName: 'Allocated',
      flex: .1,
      headerAlign: 'center',
      align: 'center',
      editable: true,
      renderCell: RenderDollaSignsAllocated,
    },
    {
      type: 'number',
      field: 'obligated',
      description: 'How much of the allocated funding has been spent',
      headerName: 'Obligated',
      flex: .1,
      headerAlign: 'center',
      align: 'center',
      editable: true,
      renderCell: RenderDollaSignsObligated,
    },
    {
      type: 'number',
      field: 'delta',
      description: 'How much is left to be spent',
      headerName: 'Delta',
      flex: .1,
      headerAlign: 'center',
      align: 'center',
      editable: true,
      renderCell: RenderDeltaCellColor,
    },
    {
      field: 'qtrs',
      headerName: 'Qtrs',
      flex: .05,
      headerAlign: 'center',
      align: 'center',
      editable: false,
      renderCell: RenderQuarters,
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
        {/* <GridToolbarExport /> */}
        <ExportAll />
        <PriorityModal />
      </GridToolbarContainer>
    );
  };

  return (
    <>
      <Box
        p={0}
        mb={2}
      >
        <StatusBar updated={updated} setUpdated={setUpdated} />
      </Box>
      <Box
        className='grid'
        height='100%'
        display='flex'
        width={1}
        flexDirection='column'
      >
        <DataTable
          updated={updated}
          setUpdated={setUpdated}
          itemBar={ItemToolBar}
          user={user}
          columns={columns}
        />
        <DetailsDialog details={details} isOpen={openDetails} close={handleClose} />
        <QuartersDialog title={title} q1={q1} q2={q2} q3={q3} q4={q4} isOpen={openQtrDetails} close={handleQtrClose} />
      </Box>
    </>
  );
};

export default UserHome;