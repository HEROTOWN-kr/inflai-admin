import { makeStyles, TableSortLabel } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  root: ({ color }) => ({
    '&.MuiTableSortLabel-active': {
      color: color || 'white',
    },
    '&:hover': {
      color: color || 'white',
    }
  }),
  icon: ({ color }) => ({
    '& path': {
      fill: color || 'white',
    },
  }),
  active: ({ color }) => ({
    color: color || 'white',
  }),
});

function StyledTableSortLabel(props) {
  const {
    className, children, align, active, direction, id, sortTable
  } = props;
  const classes = useStyles(props);

  return (
    <TableSortLabel
      classes={classes}
      className={className}
      active={active}
      direction={direction}
      onClick={() => sortTable(id)}
    >
      {children}
    </TableSortLabel>
  );
}

export default StyledTableSortLabel;
