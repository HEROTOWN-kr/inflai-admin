import { TableCell, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

const PREFIX = 'StyledTableRow';

const classes = {
  root: `${PREFIX}-root`
};

const StyledTableRow = styled(TableRow)({
  [`& .${classes.root}`]: ({ backgroundColor, color }) => ({
    backgroundColor: backgroundColor || 'transparent',
    '&.Mui-selected': {
      backgroundColor: '#39ca66',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#39ca66',
      }
    }
  }),
});

function StyledTableRow(props) {
  const {
    children, ...rest
  } = props;


  return (
    <StyledTableRow
      classes={classes}
      {...rest}
    >
      {children}
    </StyledTableRow>
  );
}

export default StyledTableRow;
