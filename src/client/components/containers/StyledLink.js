import React from 'react';
import { Link, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: ({
    color
  }) => ({
    color: color || '#555'
    /* '&.MuiTypography-colorPrimary': {
      color: '#555'
    } */
  }),
});

function StyledLink(props) {
  const {
    className, href, target, children
  } = props;
  const classes = useStyles(props);

  return (
    <Link
      classes={classes}
      rel="noopener"
      href={href}
      target={target}
      underline="none"
    >
      {children}
    </Link>
  );
}

export default StyledLink;
