import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

const DetailsDialog = ({ details, isOpen, close }) => {

  return (
    <Dialog open={isOpen} onClose={close}>
      <DialogTitle>{details.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {details.body}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' size='small' color='secondary' onClick={close} autofocus >Close</Button>
      </DialogActions>
    </Dialog>
  )
}


DetailsDialog.propTypes = {
  close: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  details: PropTypes.object.isRequired,
};

export default DetailsDialog;