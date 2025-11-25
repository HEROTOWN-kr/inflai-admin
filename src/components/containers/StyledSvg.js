import React from 'react';
import { SvgIcon } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles({
  root: ({
    padding, borderRadius, border, color, background, fontSize
  }) => ({
    fontSize: fontSize || 'medium',
    padding: padding || '0',
    borderRadius: borderRadius || 0,
    border: border || 'medium none color',
    color: color || 'red',
    background: background || 'transparent'
  }),
});

function StyledSvg(props) {
  const {
    className, component
  } = props;
  const classes = useStyles(props);

  return (
    <SvgIcon classes={classes} component={component} />
  );
}

export default StyledSvg;
