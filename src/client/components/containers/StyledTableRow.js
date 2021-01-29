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
    id, types, onClick, className, children, selected
  } = props;
  const classes = useStyles(props);

  return (
    <TableRow
      hover
      classes={classes}
      className={className}
      selected={selected}
      onClick={onClick ? () => onClick(id, types) : null}
    >
      {children}
    </TableRow>
  );
}

export default StyledTableRow;
