import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#59283A',
      contrastText: '#F2EBDC',
    },
    secondary: {
      main: '#0D0D26',
      contrastText: '#D9D2C5',
    },
  },
  typography: {
    fontFamily: 'Alegreya',
    h1: {
      fontFamily: 'Lora',
      fontSize: '3rem',
      fontWeight: '700',
    },
    h2: {
      fontFamily: 'Lora',
      fontSize: '2.5rem',
      fontWeight: '700',
    },
    h3: {
      fontFamily: 'Lora',
      fontSize: '2rem',
      fontWeight: '700',
    },
    h4: {
      fontFamily: 'Lora',
      fontSize: '1.75rem',
      fontWeight: '700',
    },
    h5: {
      fontFamily: 'Lora',
      fontSize: '1.5rem',
      fontWeight: '700',
    },
    h6: {
      fontFamily: 'Lora',
      fontSize: '1.25rem',
      fontWeight: '700',
    },
  },
  shape: {
    borderRadius: '0.5rem',
  },
  spacing: 8,
  overrides: {
    MuiButton: {
      root: {
        maxWidth: '8rem',
        maxHeight: '3rem',
        textTransform: 'none',
        padding: '0.5rem 1rem',
      },
    },
  },
});

export default theme;
