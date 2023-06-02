import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#31a35d'
      },
      secondary: {
        main: '#285028'
      },
      tertiary: {
        main: '#dcfcec'
      },
      quaternary: {
        main: '#676031'
      }
    }
  })

  export default theme;