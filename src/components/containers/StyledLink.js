import React from 'react';
import { Link } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles({
  colorPrimary: ({ color }) => ({
    color: color || '#555'
  }),
});

function StyledLink(props) {
  const { children, color, ...rest } = props;
  const classes = useStyles(props);

  return (
    <Link
      rel="noopener"
      underline="none"
      TypographyClasses={{ ...classes }}
      {...rest}
    >
      {children}
    </Link>
  );
}

export default StyledLink;
