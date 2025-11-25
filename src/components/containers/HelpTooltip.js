import React from 'react';
import { HelpOutline } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles({
  tooltip: {
    fontSize: 12
  },
  tooltipIcon: {
    color: '#8C3FFF',
    marginLeft: '5px'
  },
});

function HelpTooltip(props) {
  const { title } = props;
  const classes = useStyles();

  return (
    <Tooltip title={title} placement="top-start" classes={{ tooltip: classes.tooltip }}>
      <HelpOutline fontSize="small" classes={{ root: classes.tooltipIcon }} />
    </Tooltip>
  );
}

export default HelpTooltip;
