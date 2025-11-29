import React from "react";
import { Select } from "@mui/material";

/**
 * Simple StyledSelect wrapper that applies default styles via the `sx` prop.
 * Replaces usage of tss-react/mui and keeps styling colocated and easy to override.
 *
 * Usage remains the same:
 * <StyledSelect native value={...} onChange={...} />
 *
 * You can pass an `sx` prop to extend/override the defaults.
 */
const defaultSx = {
  "& .MuiSelect-select": {
    // padding: "10px 14px",
    // paddingRight: "32px",
  },
  // If the Select is used with `variant="outlined"`, the input area can be targeted:
  "&.MuiOutlinedInput-root .MuiSelect-select": {
    // padding: "10px 14px",
    // paddingRight: "32px",
  },
};

const StyledSelect = React.forwardRef(function StyledSelect(props, ref) {
  const { sx, ...rest } = props;
  return <Select ref={ref} sx={{ ...defaultSx, ...(Array.isArray(sx) ? Object.assign({}, ...sx) : sx) }} {...rest} />;
});

export default StyledSelect;
