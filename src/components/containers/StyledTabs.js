import { Tabs, withStyles } from '@material-ui/core';

const StyledTabs = withStyles({
  indicator: {
    backgroundColor: 'rgba(63, 75, 92, 1)',
  },
})(Tabs);

export default StyledTabs;
