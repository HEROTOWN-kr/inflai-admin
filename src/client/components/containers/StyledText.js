import React from 'react';
import { Box } from '@material-ui/core';
import { textAlign } from '@material-ui/system';

function StyledText(props) {
  const {
    className, fontFamily, fontSize, children, ...rest
  } = props;

  return (
    <Box
      fontFamily={fontFamily || 'Noto Sans KR, sans-serif'}
      fontSize={fontSize || '14px'}
      letterSpacing="0"
      component="div"
      // color={color || '#222'}
      {...rest}
    >
      {children}
    </Box>
  );
}

export default StyledText;
