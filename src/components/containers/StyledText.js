import React from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { Colors } from "../../lib/Сonstants";

const PREFIX = "StyledText";

const classes = {
  common: `${PREFIX}-common`,
};

const StyledBox = styled(Box)({
  [`& .${classes.common}`]: ({ fontSize, overflowHidden }) => ({
    fontSize: fontSize || "14px",
    overflow: overflowHidden ? "hidden" : "visible",
    whiteSpace: overflowHidden ? "nowrap" : "normal",
    textOverflow: overflowHidden ? "ellipsis" : "clip",
  }),
});

function StyledText(props) {
  const { className, fontFamily, fontSize, children, ...rest } = props;

  return (
    <StyledBox classes={{ root: classes.common }} fontFamily={fontFamily || "Noto Sans KR, sans-serif"} letterSpacing="0" component="div" {...rest}>
      {children}
    </StyledBox>
  );
}

export default StyledText;
