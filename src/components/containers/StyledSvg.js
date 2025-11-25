import React from 'react';
import { styled } from '@mui/material/styles';
import { SvgIcon } from '@mui/material';

const PREFIX = 'StyledSvg';

const classes = {
  root: `${PREFIX}-root`
};

const StyledSvgIcon = styled(SvgIcon)({
  [`& .${classes.root}`]: ({
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


  return (<StyledSvgIcon classes={classes} component={component} />);
}

export default StyledSvg;
