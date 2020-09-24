import {
  makeStyles, TableCell, TableRow, withStyles
} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  root: ({ backgroundColor }) => ({
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
    id, types, onClick, className, children, selected
  } = props;
  const classes = useStyles(props);

  return (
    <TableRow
      hover
      classes={classes}
      className={className}
      selected={selected}
      onClick={() => onClick(id, types)}
    >
      {children}
    </TableRow>
  );
}

export default StyledTableRow;
