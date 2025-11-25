import { Box } from '@mui/material';
import React from 'react';
import { Colors } from '../../lib/Сonstants';

function WhiteBlock(props) {
  const {
    children, borderRadius, height
  } = props;


  return (
    <Box
      sx={{ background: Colors.white }}
      border="1px solid #e9ecef"
      borderRadius="undefinedpx"
      height={height || 'auto'}
    >
      {children}
    </Box>
  );
}

export default WhiteBlock;
