import AppBar from '@mui/material/AppBar';
import ToolBar from '@mui/material/Toolbar';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import { useNavigate, useOutletContext } from 'react-router-dom';
import InfoModal from './InfoModal';

const Navbar = ({ navProps }) => {
  const [user, setUser] = useOutletContext();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    setAnchorElUser(null);
    sessionStorage.clear();
    navigate('/');
    setUser({ auth: '', user: '' });
  };

  const handleHome = () => {
    navigate('/main');
  };

  const handleSettings = () => {
    navigate('/settings');
    handleCloseUserMenu()
  }
  const handleSummary = () => {
    navigate('/summary');
    handleCloseUserMenu()
  }

  return (
    <>
      <AppBar
        sx={{
          overflow: 'hidden',
          width: navProps.width,
          ml: navProps.ml,
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
        position='fixed'
      >
        <ToolBar>
          <IconButton onClick={handleHome} sx={{ p: 0 }}>
            <CottageOutlinedIcon sx={{fontSize: 45, marginLeft: '-0.16em'}} />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'right' }}>
          <InfoModal />
          </Box>
          <Box>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ color: '#32a852', bgcolor: 'secondary' }} >{user.user[0]?.toUpperCase()}</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              id="account-settings"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleSummary}>
                <Typography textAlign="center">Summary View</Typography>
              </MenuItem>
              <MenuItem onClick={handleSettings}>
                <Typography textAlign="center">Settings</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </ToolBar>
      </AppBar>
    </>
  );
};

export default Navbar;