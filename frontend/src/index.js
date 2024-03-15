import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from '@mui/styles'; // Import ThemeProvider
import theme from './style/theme'; // Import your theme

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}> {/* Wrap your app with ThemeProvider */}
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);