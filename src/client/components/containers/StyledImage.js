import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  common: ({
    width, margin, height, borderRadius
  }) => ({
    display: 'block',
    margin: margin || '0 auto',
    width: `${width}` || 'auto',
    height: `${height}` || 'auto',
    borderRadius: borderRadius || 0
  }),
});

function StyledImage(props) {
  const {
    width, margin, height, borderRadius,
    className, ...rest
  } = props;
  const classes = useStyles(props);

  return (
    <img className={`${classes.common} ${className}`} alt="noImage" {...rest} />
  );
}

export default StyledImage;
