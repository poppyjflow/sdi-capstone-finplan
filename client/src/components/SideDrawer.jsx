import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import { ListItemButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import MailIcon from '@mui/icons-material/Mail';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';





const SideDrawer = () => {
  const navigate = useNavigate();
  const [user, setUser] = useOutletContext();
  const [drawerWidth, setDrawerWidth] = useState(80);

  const handleSettings = () => {
    navigate('/settings');
  }
  const handleSummary = () => {
    navigate('/summary');
  }
  const handleRequest = () => {
    navigate('/new-request');
  }
  const handleProfile = () => {
    navigate('/profile');
  }
  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
    setUser({ auth: '', user: '' });
  };

  return(
    <>
     <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
              <ListItem className='mail-link' disablePadding title='Inbox'>
                <ListItemButton >
                  <ListItemIcon>
                    <MailIcon sx={{fontSize: 45}}/>
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <ListItem className='request-link'disablePadding title='Create a request'>
                <ListItemButton onClick={handleRequest}>
                  <ListItemIcon>
                    <AssignmentIcon sx={{fontSize: 45}}/>
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <ListItem className='summary-link'disablePadding title='Summary page'>
                <ListItemButton onClick={handleSummary}>
                  <ListItemIcon>
                    <AssessmentIcon sx={{fontSize: 45}}/>
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <ListItem className='profile-link'disablePadding title='Profile'>
                <ListItemButton onClick={handleProfile}>
                  <ListItemIcon>
                    <AccountBoxIcon sx={{fontSize: 45}}/>
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <ListItem className='settings-link'disablePadding title='Settings'>
                <ListItemButton onClick={handleSettings}>
                  <ListItemIcon>
                    <SettingsIcon sx={{fontSize: 45}}/>
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <ListItem className='logout-link'disablePadding title='Logout'>
                <ListItemButton onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon sx={{fontSize: 45}}/>
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  )
}

export default SideDrawer