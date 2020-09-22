import { makeStyles, TableCell, withStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  root: ({ padding }) => ({
    padding: padding || '10px'
  }),
  head: ({ backgroundColor, color, width }) => ({
    backgroundColor: backgroundColor || '#3f4b5c',
    color: color || 'white',
    width: width || 'auto'
  }),
  body: ({ fontSize }) => ({
    fontSize: fontSize || '14px',
  }),
});

function StyledTableCell(props) {
  const {
    className, children, align
  } = props;
  const classes = useStyles(props);

  return (
    <TableCell classes={classes} className={className} align={align} alt="noImage">
      {children}
    </TableCell>
  );
}

export default StyledTableCell;