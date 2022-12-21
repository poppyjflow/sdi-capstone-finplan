import { cyan, pink, grey } from '@mui/material/colors';

// const RootTheme = createTheme({
//   palette: {
//     mode: 'dark',
//     primary: {
//       main: cyan[500],
//     },
//     secondary: {
//       main: pink['A400'],
//     },
//     background: {
//       default: '#303030',
//       paper: '#424242',
//     },
//   },
//   components: {
//     // MuiButton: {
//     //   styleOverrides: {
//     //     root: {
//     //       background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//     //       border: 0,
//     //       borderRadius: 3,
//     //       boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//     //       color: 'white',
//     //       height: 40,
//     //       padding: '0 20px',
//     //     },
//     //   },
//     // },
//   },
// });



const RootTheme = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
        primary: {
          main: cyan[500]
        },
        secondary: {
          main: pink['A400'],
        },
        divider: grey['900'],
        text: {
          primary: grey[900],
          secondary: grey[800],
        },
      }
      : {
        primary: {
          main: cyan[500]
        },
        secondary: {
          main: pink['A400'],
        },
        divider: grey[700],
        background: {
          default: '#303030',
          paper: '#424242',
        },
        text: {
          primary: '#fff',
          secondary: grey[500],
        },
      }),
  },
});
export default RootTheme;