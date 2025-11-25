import { TableCell } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

const PREFIX = 'StyledTableCell';

const classes = {
  root: `${PREFIX}-root`,
  head: `${PREFIX}-head`,
  body: `${PREFIX}-body`
};

const StyledTableCell = styled(TableCell)({
  [`& .${classes.root}`]: ({ padding }) => ({
    boxSizing: 'border-box',
    padding: padding || '10px'
  }),
  [`& .${classes.head}`]: ({ backgroundColor, color, width }) => ({
    backgroundColor: backgroundColor || '#3f4b5c',
    color: color || 'white',
    width: width || 'auto'
  }),
  [`& .${classes.body}`]: ({ fontSize }) => ({
    fontSize: fontSize || '14px',
  }),
});

function StyledTableCell(props) {
  const {
    className, children, align
  } = props;


  return (
    <StyledTableCell classes={classes} className={className} align={align} alt="noImage">
      {children}
    </StyledTableCell>
  );
}

export default StyledTableCell;
