import React from "react";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

function ReactFormText({ control, name, errors, ...rest }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          variant="outlined"
          fullWidth
          error={!!errors?.[name]}
          helperText={errors?.[name]?.message ? <span className="error-message">{errors[name].message}</span> : null}
          {...rest}
        />
      )}
    />
  );
}

export default ReactFormText;
