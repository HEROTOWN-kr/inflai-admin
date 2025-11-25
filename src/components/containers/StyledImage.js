import React from 'react';
import { styled } from '@mui/material/styles';
const PREFIX = 'StyledImage';

const classes = {
  common: `${PREFIX}-common`
};

const Root = styled('img')({
  [`& .${classes.common}`]: ({
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


  return (<Root className={`${classes.common} ${className}`} alt="noImage" {...rest} />);
}

export default StyledImage;
