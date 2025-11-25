import { colors, createTheme, adaptV4Theme } from '@mui/material';

const styleTheme = createTheme(adaptV4Theme({
  palette: {
    orange: {
      main: colors.orange[500]
    },
  },
  typography: {
    fontFamily: 'Noto Sans KR, sans-serif',
    h6: {
      fontWeight: '600',
      color: '#333'
    },
    subtitle1: {
      fontSize: 18,
      fontWeight: 'bold'
    },
    subtitle2: {
      fontSize: 16,
      color: '#000'
    },
    body1: {
      fontSize: 14,
      color: '#000',
    },
    body2: {
      fontSize: 12,
    },
    button: {
      fontStyle: 'italic',
    },
  },
  overrides: {
    MuiLinearProgress: {
      root: {
        height: 10,
        borderRadius: 5,
      },
      bar: {
        borderRadius: 5,
      },
      colorPrimary: {
        backgroundColor: colors.grey[200],
      },
    }
  }

}));

export default styleTheme;
