import * as React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import InfoModal from './InfoModal'
import SettingsIcon from '@mui/icons-material/Settings';
import MailIcon from '@mui/icons-material/Mail';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';


export default function NavBar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
          >
            <MenuIcon />
            <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose} href="/">Profile</MenuItem>
        <MenuItem onClick={handleClose} href="/">My account</MenuItem>
        <MenuItem onClick={handleClose} href="/">Logout</MenuItem>
      </Menu>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} href="/">
          <Button variant="contained" href="/">FINPLAN</Button>
          </Typography>
            <InfoModal/>
            <IconButton aria-label="settings" href="/settings">
                <SettingsIcon />
            </IconButton>
            <IconButton aria-label="mail" href="/mail">
                <MailIcon />
            </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}