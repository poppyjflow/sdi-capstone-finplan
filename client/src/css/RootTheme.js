import { createTheme } from '@mui/material/styles';

const RootTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#c97e7f',
    },
    secondary: {
      main: '#00d0f5',
    },
    background: {
      default: '#303030',
      paper: '#424242',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          border: 0,
          borderRadius: 3,
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
          color: 'white',
          height: 40,
          padding: '0 20px',
        },
      },
    },
  },
});

export default RootTheme;