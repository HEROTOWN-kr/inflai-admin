import { makeStyles, TableCell, withStyles } from '@material-ui/core';
import React from 'react';

/*const StyledTableCell2 = withStyles(theme => ({
  root: {
    padding: '10px'
  },
  head: {
    backgroundColor: '#3f4b5c',
    // backgroundColor: 'theme.palette.common.black',
    color: theme.palette.common.white,
    '&.number': {
      width: '8px'
    }
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);*/

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
