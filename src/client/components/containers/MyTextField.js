import React from 'react';
import { TextField } from '@material-ui/core';
import '../../css/sub.scss';
import { useField } from 'formik';

function MyTextField(props) {
  const [field, meta, helpers] = useField(props.name);

  return (
    <React.Fragment>
      <div className="label-holder">
        <label htmlFor={props.label}>{props.label}</label>
      </div>
      <TextField
        name={field.name}
        id={props.label}
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
    </React.Fragment>
  );
}

export default MyTextField;
