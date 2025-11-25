import React from 'react';
import { Tabs } from '@mui/material';

import withStyles from '@mui/styles/withStyles';

const AntTabs = withStyles({
  root: {
    // borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#66f8ff',
  },
})(Tabs);

export default AntTabs;
