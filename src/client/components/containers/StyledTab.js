import React from 'react';
import { Tab, withStyles } from '@material-ui/core';

const StyledTab = withStyles({
  root: {
    color: 'rgba(63, 75, 92, 0.5)',
    '&:hover': {
      color: 'rgba(63, 75, 92, 1)',
    }
  },
  selected: {
    color: 'rgba(63, 75, 92, 1)',
  }
})(props => <Tab disableRipple {...props} />);

export default StyledTab;
