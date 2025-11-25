import { Select } from '@mui/material';

import withStyles from '@mui/styles/withStyles';

const StyledSelect = withStyles(theme => ({
  root: {
    '&.MuiOutlinedInput-input': {
      padding: '10px 14px',
      paddingRight: '32px'
    },
  },
}))(Select);

export default StyledSelect;
