import React from 'react';
import { styled } from '@mui/material/styles';
import {
  DataGrid,
  GridActionsCellItem,
  GridRowModes
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
// DF left off here
//import PreviewIcon from '@mui/icons-material/Preview';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Paper } from '@mui/material';
import { useSubmit, useLoaderData } from 'react-router-dom';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';


const StyledGridOverlay = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  '& .ant-empty-img-1': {
    fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
  },
  '& .ant-empty-img-2': {
    fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
  },
  '& .ant-empty-img-3': {
    fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
  },
  '& .ant-empty-img-4': {
    fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
  },
  '& .ant-empty-img-5': {
    fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
    fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
  },
}));

const CustomNoRowsOverlay = () => {
  return (
    <StyledGridOverlay>
      <svg
        width="120"
        height="100"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">

            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <Box sx={{ mt: 1 }}>No Rows</Box>
    </StyledGridOverlay>
  );
};

const DataTable = ({ columns, user, itemBar, updated, setUpdated }) => {
  const [tableData, setTableData] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const submit = useSubmit();
  const userProfile = useLoaderData();
  console.log(userProfile)

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:8080/requests/${userProfile.org_id}`);
      setTableData(res.data);
    };
    if (user.auth) fetchData();
  }, [user.auth]);

  const handleRowEditStart = (params, e) => {
    e.defaultMuiPrevented = true;
    e.preventDefault();
  };

  const handleRowEditStop = (params, e) => {
    e.defaultMuiPrevented = true;
    e.preventDefault();
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    submit({ id }, { method: 'delete' });
    setTableData(tableData.filter((row) => {
      return row.id !== id;
    }));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = tableData.find((row) => row.id === id);
    if (editedRow.isNew) {
      setTableData(tableData.filter((row) => row.id !== id));
    }
  };

  // DF steal me!
  const processRowUpdate = (newRow) => {
    console.log('New Row', newRow);
    const updatedRow = { ...newRow, isNew: false };
    setTableData(tableData.map((row) => {
      if (row.id === newRow.id) console.log('Old row data', row);
      return (row.id === newRow.id ? updatedRow : row);
    }));
    submit(newRow, { method: 'put', action: '/main' });
    setUpdated(!updated)
    return updatedRow;
  };

  const userActions = [
    {
      field: 'actions',
      type: 'actions',
      width: 70,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={`${id}.save`}
              icon={<SaveAltIcon />}
              label='Save'
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key={`${id}.cancel`}
              icon={<ClearIcon />}
              label="Cancel"
              onClick={handleCancelClick(id)}
            />,
          ];
        }

        return [
          // DF left off here
          // <GridActionsCellItem
          //   key={`${id}.viewQs`}
          //   icon={<PreviewIcon />}
          //   label="Quarter Data"
          //   onClick={handleClick(id)}
          // />,
          <GridActionsCellItem
            key={`${id}.edit`}
            icon={<EditIcon />}
            label="Edit"
            onClick={handleEditClick(id)}
          />,
          <GridActionsCellItem
            key={`${id}.delete`}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
          />,
        ];
      }
    },
  ];

  return (
    <Box
      component={Paper}
      flexGrow={1}
    >
      <DataGrid
        sx={{
          boxShadow: 2,
          border: 2,
          borderColor: 'secondary.main',
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
          },
          '& .MuiSvgIcon-root': {
            color: 'primary.main',
          }
        }}
        components={{
          NoRowsOverlay: CustomNoRowsOverlay,
          Toolbar: itemBar,
        }}
        initialState={{
          sorting: {
            sortModel: [{ field: 'fiscal_quarter', sort: 'asc' }]
          },
          columns: {
            columnVisibilityModel: {
              id: false,
              l_name: false,
              f_name: false,
              req_date: false,
              requestee: false,
            },
          }
        }}
        disableColumnMenu
        rows={tableData}
        columns={[...columns, ...userActions]}
        editMode='row'
        rowModesModel={rowModesModel}
        onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        columnBuffer={2}
        columnThreshold={2}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
};

DataTable.propTypes = {
  columns: PropTypes.array,
  user: PropTypes.object,
  itemBar: PropTypes.func,
};
export default DataTable;