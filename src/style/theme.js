import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2a3e86',
    },
    secondary: {
      main: '#dc004e', 
    },
    error: {
      main: '#d32f2f', 
    },
    warning: {
      main: '#ed6c02', 
    },
    info: {
      main: '#0288d1',
    },
    background: {
      default: '#f0f2f5', 
      paper: '#ffffff', 
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1', 
    },
    error: {
      main: '#f44336', 
    },
    warning: {
      main: '#ffa726', 
    },
    info: {
      main: '#29b6f6', 
    },
    background: {
      default: '#121212', 
      paper: '#424242', 
    },
  },
});
