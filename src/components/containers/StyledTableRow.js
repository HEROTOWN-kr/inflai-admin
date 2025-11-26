import React from 'react';
import { TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTableRowRoot = styled(TableRow, {
  shouldForwardProp: (prop) => !['backgroundColor', 'color'].includes(prop),
})(({ ownerState }) => {
  const { backgroundColor, color } = ownerState || {};
  return {
    backgroundColor: backgroundColor || 'transparent',
    '&.Mui-selected': {
      backgroundColor: '#39ca66',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#39ca66',
      }
    }
  };
});

export default function StyledTableRow(props) {
  const { children, backgroundColor, color, ...rest } = props;
  const ownerState = { backgroundColor, color };

  return (
    <StyledTableRowRoot ownerState={ownerState} {...rest}>
      {children}
    </StyledTableRowRoot>
  );
}
