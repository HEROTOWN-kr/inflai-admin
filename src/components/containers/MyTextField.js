import React from 'react';
import {
  TextField, InputAdornment, SvgIcon, IconButton
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import '../../css/sub.scss';
import { useField } from 'formik';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


function MyTextField(props) {
  const theme = createMuiTheme({
    overrides: {
      // Style sheet name ⚛️
      MuiOutlinedInput: {
        // Name of the rule
        input: {
          // Some CSS
          padding: '10.5px 14px',
        },
      },
    },
  });

  const {
    name, label, type, onEnter, ph, sA, eA, clickFunc
  } = props;
  const [field, meta, helpers] = useField(name);

  const adornments = {};
  if (sA) adornments.startAdornment = <InputAdornment disablePointerEvents position="start">{sA}</InputAdornment>;
  if (eA) {
    adornments.endAdornment = typeof (eA) === 'object' ? (
      <InputAdornment position="end">
        <IconButton
          onClick={() => clickFunc(meta.value)}
        >
          <SvgIcon component={eA} />
        </IconButton>
      </InputAdornment>
    ) : (
      <InputAdornment disablePointerEvents position="end">{eA}</InputAdornment>
    );
  }

  return (
    <React.Fragment>
      <div className="label-holder">
        <label htmlFor={label}>{label}</label>
      </div>
      <ThemeProvider theme={theme}>
        <TextField
          error={meta.touched && meta.error}
          name={field.name}
          type={type || 'text'}
          id={label}
                // className={classes.textField}
          placeholder={ph || null}
          value={meta.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          fullWidth
          variant="outlined"
          InputProps={adornments}
          helperText={meta.touched && meta.error ? (
            <span className="error-message">{meta.error}</span>
          ) : null}
          onKeyPress={(ev) => {
            if (onEnter && ev.key === 'Enter') {
              // Do code here
              ev.preventDefault();
              onEnter(meta.value);
            }
          }}
        />
      </ThemeProvider>

    </React.Fragment>
  );
}

export default MyTextField;
