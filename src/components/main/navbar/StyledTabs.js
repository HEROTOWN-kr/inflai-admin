import {Tabs} from '@mui/material';

import { withStyles } from 'tss-react/mui';

const AntTabs = withStyles({
    Tabs,
  root: {
    // borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#66f8ff',
  },
});

export default AntTabs;
