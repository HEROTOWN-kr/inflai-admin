import React from 'react';
import { styled } from '@mui/material/styles';
import { Tab } from '@mui/material';

const PREFIX = 'StyledTab';

const classes = {
  root: `${PREFIX}-root`,
  selected: `${PREFIX}-selected`
};

const StyledTab = styled(Tab)({
  [`& .${classes.root}`]: {
    color: 'rgba(63, 75, 92, 0.5)',
    '&:hover': {
      color: 'rgba(63, 75, 92, 1)',
    }
  },
  [`& .${classes.selected}`]: {
    color: 'rgba(63, 75, 92, 1)',
  }
});

const StyledTab = ',
    '&:hover': {
      color: 'rgba(63, 75, 92, 1)',
    }
  },
  [`& .${classes.selected}`]: {
    color: 'rgba(63, 75, 92, 1)',
  }
})(props => <StyledTab
  disableRipple
  {...props}
  classes={{
    root: classes.root,
    selected: classes.selected
  }} />);

export default StyledTab;
