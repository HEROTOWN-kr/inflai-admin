import { Tab } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

const PREFIX = 'AntTab';

const classes = {
  root: `${PREFIX}-root`,
  selected: `${PREFIX}-selected`
};

const StyledTabRoot = styled(Tab)(({ theme }) => ({
  [`& .${classes.root}`]: {
    color: '#ffffff',
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#66f8ff',
      opacity: 1,
    },
    '&$selected': {
      color: '#66f8ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#66f8ff',
    },
  },

  [`& .${classes.selected}`]: {}
}));

// Export a simple wrapper component that applies disableRipple by default
export default function StyledTab(props) {
  return <StyledTabRoot disableRipple {...props} />;
}
