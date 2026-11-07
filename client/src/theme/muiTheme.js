import { createTheme } from '@mui/material/styles';

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#59B17A',
    },
    error: {
      main: '#E85050',
    },
    text: {
      primary: '#1D1E21',
    },
    background: {
      default: '#F7F8FA',
    },
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
});
