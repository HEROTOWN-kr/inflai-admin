import React from 'react';
import { Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Colors } from '../../lib/Сonstants';

const useStyles = makeStyles({
  common: ({
    fontSize, lineHeight, color, fontWeight, textAlign, overflowHidden, cursor
  }) => ({
    fontSize: fontSize || '14px',
    overflow: overflowHidden ? 'hidden' : 'visible',
    whiteSpace: overflowHidden ? 'nowrap' : 'normal',
    textOverflow: overflowHidden ? 'ellipsis' : 'clip',
  }),
});

function StyledText(props) {
  const {
    className, fontFamily, fontSize, children, ...rest
  } = props;
  const classes = useStyles(props);

  return (
    <Box
      classes={{ root: classes.common }}
      fontFamily={fontFamily || 'Noto Sans KR, sans-serif'}
      letterSpacing="0"
      component="div"
      {...rest}
    >
      {children}
    </Box>
  );
}

export default StyledText;
