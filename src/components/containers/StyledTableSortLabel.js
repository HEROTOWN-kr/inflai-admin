import React from 'react';
import { TableSortLabel } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTableSortLabelRoot = styled(TableSortLabel, {
  shouldForwardProp: (prop) => !['color'].includes(prop),
})(({ ownerState }) => {
  const { color } = ownerState || {};
  const resolvedColor = color || 'white';
  return {
    '&.MuiTableSortLabel-active': {
      color: resolvedColor,
    },
    '&:hover': {
      color: resolvedColor,
    },
    '& svg path': {
      fill: resolvedColor,
    },
  };
});

export default function StyledTableSortLabel(props) {
  const { color, children, ...rest } = props;
  const ownerState = { color };

  return (
    <StyledTableSortLabelRoot ownerState={ownerState} {...rest}>
      {children}
    </StyledTableSortLabelRoot>
  );
}
