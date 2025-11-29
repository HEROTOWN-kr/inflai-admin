import React from "react";
import { styled } from "@mui/material/styles";
import StyledTextField from "./StyledTextField";
import TextField from "@mui/material/TextField";

const PREFIX = "ReactFormText";

const classes = {
  FormHelperContained: `${PREFIX}-FormHelperContained`,
};

const Root = styled("span")({
  [`& .${classes.FormHelperContained}`]: {
    marginLeft: "0",
  },
});

function ReactFormText(props) {
  const { errors, register, name, ...rest } = props;

  return (
    <TextField
      variant={"outlined"}
      fullWidth
      name={name}
      // helperText={errors[name] ? <Root className="error-message">{errors[name]?.message}</Root> : null}
      css={{ transition: "all 1s ease-out" }}
      {...rest}
    ></TextField>
  );
}

export default ReactFormText;

{
  /*    <StyledTextField*/
}
{
  /*  variant="outlined"*/
}
{
  /*  fullWidth*/
}
{
  /*  name={name}*/
}
{
  /*  inputRef={register}*/
}
{
  /*  // error={!!errors[name]}*/
}
{
  /*  FormHelperTextProps={{*/
}
{
  /*    classes: { contained: classes.FormHelperContained },*/
}
{
  /*  }}*/
}
{
  /*  // helperText={errors[name] ? <Root className="error-message">{errors[name]?.message}</Root> : null}*/
}
{
  /*  css={{ transition: "all 1s ease-out" }}*/
}
{
  /*  {...rest}*/
}
{
  /*/>*/
}
