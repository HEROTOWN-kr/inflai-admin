import React from 'react';
import {
  withStyles, Tabs
} from '@material-ui/core';

const AntTabs = withStyles({
  root: {
    // borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#66f8ff',
  },
})(Tabs);

export default AntTabs;
