import React from 'react';
import { Box } from '@material-ui/core';
import { textAlign } from '@material-ui/system';

function StyledText(props) {
  const {
    className, fontFamily, fontWeight, fontSize, color, textAlign, children
  } = props;

  return (
    <Box
      fontFamily={fontFamily || 'Montserrat, sans-serif'}
      fontWeight={fontWeight || 'normal'}
      fontSize={fontSize || '14'}
      textAlign={textAlign || 'left'}
      letterSpacing="0"
      component="div"
      color={color || '#222'}
    >
      {children}
    </Box>
  );
}

export default StyledText;
