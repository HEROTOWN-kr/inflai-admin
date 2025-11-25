import React from 'react';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import { Colors } from '../../lib/Сonstants';

const PREFIX = 'StyledButton';

const classes = {
  root: `${PREFIX}-root`
};

const StyledButtonComponent = styled(Button)({
  [`& .${classes.root}`]: ({
    background, border, borderRadius, boxShadow, color, height, padding, hoverBackground, hoverColor, fontSize
  }) => ({
    background: background || Colors.blue2,
    border: border || 0,
    borderRadius: borderRadius || 3,
    boxShadow: boxShadow || 'none',
    color: color || 'white',
    height: height || 48,
    padding: padding || '0 30px',
    fontSize: fontSize || '0.875rem',
    '&:hover': {
      background: hoverBackground || Colors.blue2Hover,
      color: hoverColor || Colors.white
    }
  }),
});

// 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
// boxShadow: boxShadow || '0 3px 5px 2px rgba(255, 105, 135, .3)',

function StyledButton(props) {
  const {
    background, border, borderRadius, boxShadow, color, height, padding, hoverColor, hoverBackground, fontSize,
    className,
    children,
    ...rest
  } = props;


  return (
    <StyledButtonComponent
      variant="contained"
      fullWidth
      className={`${classes.root} ${className}`}
      {...rest}
    >
      {children}
    </StyledButtonComponent>
  );
}

export default StyledButton;
