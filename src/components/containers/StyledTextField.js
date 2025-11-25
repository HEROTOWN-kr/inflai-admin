import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import '../../css/sub.scss';
import { useField } from 'formik';
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles';


const StyledTextField = withStyles({
  root: {
    '& .MuiOutlinedInput-input': {
      padding: '10.5px 14px',
    },
    '& .MuiOutlinedInput-multiline': {
      padding: '0',
    },
  },
})(TextField);

export default StyledTextField;
