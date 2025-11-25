import { Checkbox } from '@mui/material';

import withStyles from '@mui/styles/withStyles';

const StyledCheckBox = withStyles(theme => ({
  root: {
    padding: '0'
  },
}))(Checkbox);

export default StyledCheckBox;
