import React from 'react';
import { Tab } from '@mui/material';

import withStyles from '@mui/styles/withStyles';

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
