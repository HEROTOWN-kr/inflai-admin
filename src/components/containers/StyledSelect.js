import { Select } from '@mui/material';

import { withStyles } from 'tss-react/mui';

const StyledSelect = withStyles({
    Select,
  root: {
    '&.MuiOutlinedInput-input': {
      padding: '10px 14px',
      paddingRight: '32px'
    },
  },
});

export default StyledSelect;
