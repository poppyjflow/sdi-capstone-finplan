import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function InfoModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton onClick={handleOpen} aria-label="information">
        <InfoIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <h1>FinPlan Tips</h1>
    <ol>
        <li>
            The submitted FinPlans may include the following with detailed justification narrative:
            <ol>
                <li>
                    Entries accounting for technical refresh of SIPRnet, JWICS and associated IT equipment
                    (units are expected to replace 1/3 of inventory annually to meet three-year refresh requirement)
                </li>
                <li>
                    Base-managed Contracts (MIP Mission only)
                </li>
                <li>
                    Furniture
                </li>
                <li>
                    Fuel (Non Flying Hours)
                </li>
            </ol>
        </li>
        <li>
            O&M FinPlans will not include:
            <ol>
                <li>
                    Reimbursements for  prior year requirements
                </li>
                <li>
                    JWICS service funded by ISR (Please coordinate with Mr. Tommy Bertrand)
                </li>
                <li>
                    Weapon System computers and equipment
                </li>
                <li>
                    Weapon System Sustainment
                </li>
                <li>
                    BOS Funding
                </li>
                <li>
                    UTC Equipment
                </li>
                <li>
                    DOMOPS
                </li>
            </ol>
        </li>
    </ol>
    **Please note:
    <ol>
        <li>
            Approval of requirements listed in the FinPlans does not constitute
            full guarantee of funding in a given fiscal year. Execution year funding levels
            are limited to final appropriations and availability of funds. Timeline subject to
            change based on FM‘s schedule and guidance.
        </li>
        <li>
            Base Operating Support (BOS) transitioned out of MIP/MIP-like portfolio in FY 20.
            Therefore, personnel movement out of the MIP portfolio needs to be factored into the X-plan submitted to FM.
        </li>
        <li>
            SRM Requests require A4/7 approval via DD Form 1391. Please provide a copy
        </li>
        <li>
            IT Requests require a CIPS Number.
        </li>
    </ol>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}