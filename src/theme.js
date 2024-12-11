import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#efb11d', // Синій
    },
    text:{
      main: '#2e3944'
    }
  },
  typography: {
    fontFamily: 'CoFoSans-Regular,  sans-serif',
    h5: {
      fontFamily: 'CoFoSans-Regular',
    },
  },
});

export default theme;
