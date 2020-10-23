import { Checkbox, withStyles } from '@material-ui/core';

const StyledCheckBox = withStyles(theme => ({
  root: {
    padding: '0'
  },
}))(Checkbox);

export default StyledCheckBox;
