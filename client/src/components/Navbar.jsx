import AppBar from '@mui/material/AppBar';
import ToolBar from '@mui/material/Toolbar';
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import { useTheme } from '@mui/material/styles';
import { useNavigate, useOutletContext, useRouteLoaderData } from 'react-router-dom';
import { useContext } from 'react';
import { ColorModeContext } from '../layouts/ProtectedRoutes';
import InfoModal from './InfoModal';
import { FYContext } from '../layouts/ProtectedRoutes';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const Navbar = ({ navProps }) => {
  const userData = useRouteLoaderData('protected');
  const [user, setUser] = useOutletContext();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();
  const [fyDisplayed, setFYDisplayed] = useContext(FYContext);
  const [org, setOrg] = useState(userData.org_id);
  const [fyList, setFYList] = useState([{ id: ' ', value: ' ' }]);
  var fyDropdownOptions = [];

  useEffect(() => {
    if (org) {
      fetch(`http://localhost:8080/fiscal_years/${org}`
      )
        .then(res => res.json())
        .then(res => {
          if (res) {

            //Game Plan: Populate the dropdown array with all FYs from the oldest record in the DB to the current FY+1.
            var currFY = 0;
            setFYList([]); // re-initialize these.
            fyDropdownOptions = [];

            // Current year.
            const currDate = Date();
            var tempArr = currDate.split(" ");
            currFY = parseInt(tempArr[3]) + 1;

            // Oldest year from DB.
            const fyCounter = parseInt(res.fy);

            // Populate the dropdown.
            var ctr = 0;
            while (currFY - fyCounter >= 0) {
              fyDropdownOptions.push({ id: currFY, value: currFY });
              currFY--; ctr++;
            }

            setFYList(fyDropdownOptions); // re-populate this.
          }
        })
        .catch(err => {
          console.log(err);
          alert('StatusBar.jsx: There was an error processing your request.');
        });
    }
    return;
  }, []);

  const handleYearChange = (selection) => {
    // setFYSelected(selection);
    setFYDisplayed({ id: selection.target.value, value: selection.target.value });
  };

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

  const handleProfile = () => {
    navigate('/profile');
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
            <CottageOutlinedIcon sx={{ fontSize: 45, marginLeft: '-0.16em' }} />
          </IconButton>
          <Box sx={{ flexGrow: 2, display: 'flex', fontSize: 30, justifyContent: 'center' }}>
            <h3>FINPLAN Tool</h3>
          </Box>

          <Box sx={{ flexGrow: 4, display: 'flex', justifyContent: 'center' }}>
          <FormControl fullWidth>
                  <InputLabel id="fy_options">Select the Exercise's Fiscal Year to Begin</InputLabel>
                    <Select
                      labelId="Fiscal Year"
                      id="Fiscal Year"
                      value={fyDisplayed.id}
                      defaultValue={fyDisplayed.id}
                      label="Select the Exercise's Fiscal Year to Begin"
                      onChange={handleYearChange}
                      sx={{
                        height: '2.5rem',
                        color: 'cyan',
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'cyan'
                        },
                        '& .MuiSvgIcon-root': {
                            color: 'cyan'
                        }
                    }}                                            >
                      {
                        fyList.map((category) => {
                          return <MenuItem key={category.id} value={category.id}>{category.value}</MenuItem>;
                        })
                      }
                    </Select>
                </FormControl>
</Box>

          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'right' }}>
            {userData.rank} {userData.f_name} {userData.l_name}, {userData.org}
          </Box>
          <Box sx={{ flexGrow: .5, display: 'flex', justifyContent: 'right' }}>
            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <InfoModal />
          </Box>
          <Box>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ color: 'primary.main', bgcolor: 'secondary' }} >{user.user[0]?.toUpperCase()}</Avatar>
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
              <MenuItem onClick={handleProfile}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
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