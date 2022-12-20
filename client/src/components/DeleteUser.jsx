import React from "react"
import { Card, CardContent, Typography, Button, Box } from "@mui/material"
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';




const DeleteUser = ({props}) => {
  const { user, handleLogout} = props
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    handleClose();
    fetch(`http://localhost:8080/users/${user.id}`, {
      method: 'DELETE'
    })
    .then(res => {
      res.status === 200 ? handleLogout() : console.log(res.status)
    })
    .catch(err => {
      console.log(err)
      alert('There was an error processing your request.')
    })
    return
  }

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

  return(
    <>
      <Card sx={{ maxWidth: '100%', marginTop: '2em' }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Delete Account
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Send a request to have your account deleted.
            </Typography>
            <Button onClick={handleOpen} variant='contained' color='error' sx={{marginTop: '1em'}}>Delete</Button>
          </CardContent>
      </Card>

      <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="confirm-delete"
        aria-describedby="deletion-confirmation"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{color: 'white'}}>
            Are you sure you want to submit this request? This action cannot be undone.
          </Typography>
          <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '1em'}}>
            <Button onClick={handleClose} variant='contained' color='primary'>Cancel</Button>
            <Button onClick={handleDelete} variant='contained' color='error'>Delete</Button>
          </div>
        </Box>
      </Modal>
    </div>
    </>
  )
}

export default DeleteUser