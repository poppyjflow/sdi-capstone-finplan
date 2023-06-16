import React, { useState } from 'react';
//import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import NewReqDetailAction from '../actions/NewReqDetailAction';

const actionType = 'PUT';
const DetailsDialog = ({ details, isOpen, close }) => {
  const [reqTitle, setReqTitle] = useState(details.title);
  const [reqDesc, setReqDesc] = useState(details.body);
  const [reqJustification, setReqJustification] = useState(details.justification);
  const handleSaveAndClose = () => {
    NewReqDetailAction(actionType, details.id, reqTitle, reqDesc, reqJustification);
    close();
    window.location.reload(true);
  };

  return (
    <Dialog open={isOpen} onClose={close}>
      <DialogTitle>Request Details</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="title"
          label="Request Title"
          type="text"
          fullWidth
          defaultValue={details.title}
          onChange={e => setReqTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          id="desc"
          label="Request Description"
          type="text"
          fullWidth
          defaultValue={details.body}
          onChange={e => setReqDesc(e.target.value)}
        />
        <TextField
          margin="dense"
          id="justification"
          label="Request Justification"
          type="text"
          fullWidth
          defaultValue={details.justification}
          onChange={e => setReqJustification(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button variant='contained' size='small' color='secondary' onClick={close} autoFocus >Close</Button>
        <Button variant='contained' size='small' color='primary' onClick={(e) => handleSaveAndClose(e.target.value)} autoFocus >Save & Close</Button>
      </DialogActions>
    </Dialog>
  );
};

DetailsDialog.propTypes = {
  close: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  details: PropTypes.object.isRequired,
};

export default DetailsDialog;
