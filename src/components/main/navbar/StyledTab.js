import { Tab, withStyles } from '@material-ui/core';
import React from 'react';

const AntTab = withStyles(theme => ({
  root: {
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
  selected: {},
}))(props => <Tab disableRipple {...props} />);

export default AntTab;
