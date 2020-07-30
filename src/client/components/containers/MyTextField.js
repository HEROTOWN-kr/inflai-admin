import React from 'react';
import { TextField } from '@material-ui/core';
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

  const [field, meta, helpers] = useField(props.name);

  return (
    <React.Fragment>
      <div className="label-holder">
        <label htmlFor={props.label}>{props.label}</label>
      </div>
      <ThemeProvider theme={theme}>
        <TextField
          name={field.name}
          id={props.label}
                // className={classes.textField}
          placeholder=""
          value={meta.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          fullWidth
          variant="outlined"
          helperText={meta.touched && meta.error ? (
            <span className="error-message">{meta.error}</span>
          ) : null}
        />
      </ThemeProvider>

    </React.Fragment>
  );
}

export default MyTextField;
