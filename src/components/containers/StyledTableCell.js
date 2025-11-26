import React from 'react';
import { TableCell } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTableCellRoot = styled(TableCell, {
  shouldForwardProp: (prop) => !['padding', 'backgroundColor', 'color', 'width', 'fontSize'].includes(prop),
})(({ ownerState }) => {
  const {
    padding, backgroundColor, color, width, fontSize
  } = ownerState || {};
  return {
    boxSizing: 'border-box',
    padding: padding || '10px',
    // head/body specific styles can be applied by checking the TableCell variant or other props.
    // Consumers can pass backgroundColor/color/width/fontSize via props to override defaults.
    backgroundColor: backgroundColor || undefined,
    color: color || undefined,
    width: width || undefined,
    fontSize: fontSize || undefined,
  };
});

function StyledTableCell(props) {
  const {
    className, children, align, padding, backgroundColor, color, width, fontSize, ...rest
  } = props;

  const ownerState = {
    padding, backgroundColor, color, width, fontSize
  };

  return (
    <StyledTableCellRoot
      className={className}
      align={align}
      ownerState={ownerState}
      {...rest}
    >
      {children}
    </StyledTableCellRoot>
  );
}

export default StyledTableCell;
