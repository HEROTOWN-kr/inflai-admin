import React from 'react';
import { useForm } from 'react-hook-form';
import { Checkbox } from '@material-ui/core';
import StyledTextField from './StyledTextField';


function ReactFormText(props) {
  const {
    name, errorMessage, register, errors
  } = props;

  return (
    <StyledTextField
      variant="outlined"
      fullWidth
      name={name}
      // defaultValue={userInfo.INF_NAME || ''}
      inputRef={register({ required: true })}
      error={!!errors[name]}
      helperText={<span className="error-message">{errors[name]?.message}</span>}
      css={{ transition: 'all 1s ease-out' }}
    />
  );
}


export default ReactFormText;
