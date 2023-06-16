import React, { useState } from 'react';
//import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { NumericFormat } from 'react-number-format';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import InputAdornment from '@mui/material/InputAdornment';
import NewQuarterliesAction from '../actions/NewQuarterliesAction';
import NumericFormatCustom from './NumericFormatCustom';

const actionType = 'PUT';

// This puts the commas in each number.
// const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(
//   props,
//   ref,
// ) {
//   const { onChange, ...other } = props;

//   return (
//     <NumericFormat
//       {...other}
//       getInputRef={ref}
//       onValueChange={(values) => {
//         onChange({
//           target: {
//             name: props.name,
//             value: values.value,
//           },
//         });
//       }}
//       thousandSeparator
//       valueIsNumericString
//     // prefix="$"
//     />
//   );
// });

// NumericFormatCustom.propTypes = {
//   name: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
// };

// const renderDelta = ({ row }) => {
//   if (row.allocated && row.obligated) {
//     const percentage = row.obligated / row.allocated;
//     return (
//       <Box border='2px solid' borderRadius='8px'>
//         <Box
//           width={percentage}
//           borderRadius='8px'
//           bgcolor={percentage === 1 ? '#115e0a' : '#ff0008'}
//         >
//           {`$${row.obligated} / $${row.allocated}`}
//         </Box>
//       </Box>
//     )
//   }
//   return null;
// };

const QuartersDialog = ({ title, q1, q2, q3, q4, isOpen, close }) => {
  const [q1Requested, setQ1Requested] = useState(q1.requested);
  const [q1Allocated, setQ1Allocated] = useState(q1.allocated);
  const [q1Obligated, setQ1Obligated] = useState(q1.obligated);
  const [q2Requested, setQ2Requested] = useState(q2.requested);
  const [q2Allocated, setQ2Allocated] = useState(q2.allocated);
  const [q2Obligated, setQ2Obligated] = useState(q2.obligated);
  const [q3Requested, setQ3Requested] = useState(q3.requested);
  const [q3Allocated, setQ3Allocated] = useState(q3.allocated);
  const [q3Obligated, setQ3Obligated] = useState(q3.obligated);
  const [q4Requested, setQ4Requested] = useState(q4.requested);
  const [q4Allocated, setQ4Allocated] = useState(q4.allocated);
  const [q4Obligated, setQ4Obligated] = useState(q4.obligated);

  const handleSaveAndClose = () => {
    NewQuarterliesAction(actionType, q1.id,
      q1Requested, q1Allocated, q1Obligated,
      q2Requested, q2Allocated, q2Obligated,
      q3Requested, q3Allocated, q3Obligated,
      q4Requested, q4Allocated, q4Obligated,
    );
    close();

    // Reloads the webpage to trigger a DB pull.
    window.location.reload(true);
  };

  if (q1.allocated && q1.obligated) { const percentage = q1.obligated / q1.allocated; }
  if (q2.allocated && q2.obligated) { const percentage = q2.obligated / q2.allocated; }
  if (q3.allocated && q3.obligated) { const percentage = q3.obligated / q3.allocated; }
  if (q4.allocated && q4.obligated) { const percentage = q4.obligated / q4.allocated; }

  return (
    <Dialog open={isOpen} onClose={close}>
      <DialogTitle>{title.title}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="q1requested"
          label="Q1 Requested"
          type="text"
          sx={{ width: 150 }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
            inputComponent: NumericFormatCustom,
          }}
          defaultValue={q1.requested}
          onChange={e => setQ1Requested(e.target.value)}
        />
        <TextField
          margin="dense"
          id="q1allocated"
          label="Q1 Allocated"
          type="text"
          sx={{ width: 150 }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
            inputComponent: NumericFormatCustom,
          }}
          defaultValue={q1.allocated}
          onChange={e => setQ1Allocated(e.target.value)}
        />
        <TextField
          margin="dense"
          id="q1obligated"
          label="Q1 Obligated"
          type="text"
          sx={{ width: 150 }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
            inputComponent: NumericFormatCustom,
          }}
          defaultValue={q1.obligated}
          onChange={e => setQ1Obligated(e.target.value)}
        />

        <TextField
          margin="dense"
          id="q2requested"
          label="Q2 Requested"
          type="text"
          sx={{ width: 150 }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
            inputComponent: NumericFormatCustom,
          }}
          defaultValue={q2.requested}
          onChange={e => setQ2Requested(e.target.value)}
        />
        <TextField
          margin="dense"
          id="q2allocated"
          label="Q2 Allocated"
          type="text"
          sx={{ width: 150 }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
            inputComponent: NumericFormatCustom,
          }}
          defaultValue={q2.allocated}
          onChange={e => setQ2Allocated(e.target.value)}
        />
        <TextField
          margin="dense"
          id="q2obligated"
          label="Q2 Obligated"
          type="text"
          sx={{ width: 150 }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
            inputComponent: NumericFormatCustom,
          }}
          defaultValue={q2.obligated}
          onChange={e => setQ2Obligated(e.target.value)}
        />

        <TextField
          margin="dense"
          id="q3requested"
          label="Q3 Requested"
          type="text"
          sx={{ width: 150 }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
            inputComponent: NumericFormatCustom,
          }}
          defaultValue={q3.requested}
          onChange={e => setQ3Requested(e.target.value)}
        />
        <TextField
          margin="dense"
          id="q3allocated"
          label="Q3 Allocated"
          type="text"
          sx={{ width: 150 }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
            inputComponent: NumericFormatCustom,
          }}
          defaultValue={q3.allocated}
          onChange={e => setQ3Allocated(e.target.value)}
        />
        <TextField
          margin="dense"
          id="q3obligated"
          label="Q3 Obligated"
          type="text"
          sx={{ width: 150 }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
            inputComponent: NumericFormatCustom,
          }}
          defaultValue={q3.obligated}
          onChange={e => setQ3Obligated(e.target.value)}
        />

        <TextField
          margin="dense"
          id="q4requested"
          label="Q4 Requested"
          type="text"
          sx={{ width: 150 }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
            inputComponent: NumericFormatCustom,
          }}
          defaultValue={q4.requested}
          onChange={e => setQ4Requested(e.target.value)}
        />
        <TextField
          margin="dense"
          id="q4allocated"
          label="Q4 Allocated"
          type="text"
          sx={{ width: 150 }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
            inputComponent: NumericFormatCustom,
          }}
          defaultValue={q4.allocated}
          onChange={e => setQ4Allocated(e.target.value)}
        />
        <TextField
          variant="filled" color="success"
          margin="dense"
          id="q4obligated"
          label="Q4 Obligated"
          type="text"
          sx={{ width: 150 }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
            inputComponent: NumericFormatCustom,
          }}
          defaultValue={q4.obligated}
          onChange={e => setQ4Obligated(e.target.value)}
        />

      </DialogContent>
      <DialogActions>
        <Button variant='contained' size='small' color='secondary' onClick={close} autoFocus >Close</Button>
        <Button variant='contained' size='small' color='primary' onClick={(e) => handleSaveAndClose(e.target.value)} autoFocus >Save & Close</Button>
      </DialogActions>
    </Dialog>
  );
};

QuartersDialog.propTypes = {
  close: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  q1: PropTypes.object.isRequired,
  q2: PropTypes.object.isRequired,
  q3: PropTypes.object.isRequired,
  q4: PropTypes.object.isRequired,
};

export default QuartersDialog;
