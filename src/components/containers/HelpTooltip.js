import React from 'react';
import { styled } from '@mui/material/styles';
import { HelpOutline } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
const PREFIX = 'HelpTooltip';

const classes = {
  tooltip: `${PREFIX}-tooltip`,
  tooltipIcon: `${PREFIX}-tooltipIcon`
};

const StyledTooltip = styled(Tooltip)({
  [`& .${classes.tooltip}`]: {
    fontSize: 12
  },
  [`& .${classes.tooltipIcon}`]: {
    color: '#8C3FFF',
    marginLeft: '5px'
  },
});

function HelpTooltip(props) {
  const { title } = props;


  return (
    <StyledTooltip title={title} placement="top-start" classes={{ tooltip: classes.tooltip }}>
      <HelpOutline fontSize="small" classes={{ root: classes.tooltipIcon }} />
    </StyledTooltip>
  );
}

export default HelpTooltip;
