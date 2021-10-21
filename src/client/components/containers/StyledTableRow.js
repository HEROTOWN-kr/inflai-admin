import {
  makeStyles, TableCell, TableRow, withStyles
} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  root: ({ backgroundColor, color }) => ({
    backgroundColor: backgroundColor || 'transparent',
    cursor: 'pointer',
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
  const classes = useStyles(props);

  return (
    <TableRow
      hover
      classes={classes}
      {...rest}
    >
      {children}
    </TableRow>
  );
}

export default StyledTableRow;
