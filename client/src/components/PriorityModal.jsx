import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(.5),
  textAlign: 'center',
  color: 'secondary.main',
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function PriorityModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton onClick={handleOpen} aria-label="information" sx={{ color: 'primary.main', fontSize: 12, fontWeight: 'bold' }}>
        <InfoOutlinedIcon sx={{ fontSize: 20 }} />
        PRIORITY CODES
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2, color: 'lightgray' }}>
            <h1 style={{ marginTop: '-0.8em', marginBottom: '0.8em' }}>Priority Codes</h1>

            <Grid container alignItems='flex-end' spacing={1.8} padding={.1}>
              <Grid item xs={3}>
                <Box align={'right'}>MC/MP:</Box>
              </Grid>
              <Grid item xs={9}>
                <Box align={'left'}>Mission Critical / Mission Priority
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box align={'right'}>ME:</Box>
              </Grid>
              <Grid item xs={9}>
                <Box align={'left'}>Mission Essential
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box align={'right'}>MEn:</Box>
              </Grid>
              <Grid item xs={9}>
                <Box align={'left'}>Mission Enhancing
                </Box>
              </Grid>
            </Grid>

          </Typography>
        </Box>
      </Modal>
    </div>
  );
}