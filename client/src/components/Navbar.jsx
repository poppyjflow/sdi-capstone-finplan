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

const Navbar = () => {
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
    navigate('/settings')
  }

  return (
    <>
      <AppBar
        sx={{
          mb: 2,
          overflow: 'hidden',
        }}
        position='static'
      >
        <ToolBar>
          <IconButton onClick={handleHome} sx={{ p: 0 }}>
            <CottageOutlinedIcon fontSize='large' />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
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
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
              <MenuItem onClick={handleSettings}>
                <Typography textAlign="center">Settings</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </ToolBar>
      </AppBar>
    </>
  );
};

export default Navbar;