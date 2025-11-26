import {TextField} from '@mui/material';
import { withStyles } from 'tss-react/mui';
import '../../css/sub.scss';


const StyledTextField = withStyles(TextField,{
  root: {
    '& .MuiOutlinedInput-input': {
      padding: '10.5px 14px',
    },
    '& .MuiOutlinedInput-multiline': {
      padding: '0',
    },
  },
});

export default StyledTextField;
