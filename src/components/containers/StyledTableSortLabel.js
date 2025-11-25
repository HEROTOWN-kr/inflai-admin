import { TableSortLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

const PREFIX = 'StyledTableSortLabel';

const classes = {
  root: `${PREFIX}-root`,
  icon: `${PREFIX}-icon`,
  active: `${PREFIX}-active`
};

const StyledTableSortLabel = styled(TableSortLabel)({
  [`& .${classes.root}`]: ({ color }) => ({
    '&.MuiTableSortLabel-active': {
      color: color || 'white',
    },
    '&:hover': {
      color: color || 'white',
    }
  }),
  [`& .${classes.icon}`]: ({ color }) => ({
    '& path': {
      fill: color || 'white',
    },
  }),
  [`& .${classes.active}`]: ({ color }) => ({
    color: color || 'white',
  }),
});

function StyledTableSortLabel(props) {
  const {
    color, children, ...rest
  } = props;


  return (
    <StyledTableSortLabel classes={classes} {...rest}>
      {children}
    </StyledTableSortLabel>
  );
}

export default StyledTableSortLabel;
