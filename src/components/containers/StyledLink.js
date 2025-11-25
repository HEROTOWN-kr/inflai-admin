import React from 'react';
import { styled } from '@mui/material/styles';
import { Link } from '@mui/material';

const PREFIX = 'StyledLink';

const classes = {
  colorPrimary: `${PREFIX}-colorPrimary`
};

const StyledLinkComponent = styled(Link)({
  [`& .${classes.colorPrimary}`]: ({ color }) => ({
    color: color || '#555'
  }),
});

function StyledLink(props) {
  const { children, color, ...rest } = props;


  return (
    <StyledLinkComponent
      rel="noopener"
      underline="none"
      {...rest}
    >
      {children}
    </StyledLinkComponent>
  );
}

export default StyledLink;
