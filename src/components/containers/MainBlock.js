import React from 'react';
import { styled } from '@mui/material/styles';
const PREFIX = 'MainBlock';

const classes = {
  common: `${PREFIX}-common`
};

const Root = styled('div')({
  [`& .${classes.common}`]: ({ width }) => ({
    maxWidth: `${width}px` || '300px',
    margin: '0 auto'
  }),
});

function MainBlock(props) {
  const { className, children } = props;


  return (
    <Root className={`${classes.common} ${className}`}>
      {children}
    </Root>
  );
}

export default MainBlock;
