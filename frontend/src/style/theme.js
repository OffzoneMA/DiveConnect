import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    text: {
      primary: '#000', // Adjust text color as needed
      secondary: '#888', // Adjust secondary text color as needed
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  spacing: (factor) => `${0.5 * factor}rem`,
});

export default theme;