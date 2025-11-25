import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Dialog, IconButton, useMediaQuery } from '@mui/material';
import { Clear } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { Colors } from '../../../lib/Сonstants';
import AnalysisComponent from '../Analysis/AnalysisComponent';

const PREFIX = 'InstaInsightDialog';

const classes = {
  root: `${PREFIX}-root`,
  paper: `${PREFIX}-paper`,
  paperScrollBody: `${PREFIX}-paperScrollBody`,
  button: `${PREFIX}-button`
};

const StyledDialog = styled(Dialog)({
  [`& .${classes.root}`]: {
    position: 'absolute',
    top: '0',
    right: '0',
    color: '#b9b9b9de'
  },
  [`& .${classes.paper}`]: {
    margin: '12px',
    width: '100%',
    borderRadius: '2px'
  },
  [`& .${classes.paperScrollBody}`]: {
    maxWidth: '1500px',
  },
  [`& .${classes.button}`]: {
    padding: 0,
    minWidth: 0
  },
});

const InstaInsightDialog = (props) => {
  const { INS_ID, open, handleClose } = props;

  const theme = useTheme();
  const isMD = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <StyledDialog
      /* classes={{ paper: classes.paper }} */
      fullScreen={!isMD}
      scroll="body"
      classes={{
        paper: classes.paper,
        paperScrollBody: classes.paperScrollBody,
      }}
      aria-labelledby="simple-dialog-title"
      open={open}
      onClose={handleClose}>
      <Box p="15px" fontSize="21px" fontWeight="400" lineHeight="18px" textAlign="center" position="relative" borderBottom={`1px solid ${Colors.grey8}`}>
              인플라이
        <IconButton size="medium" classes={{ root: classes.root }} onClick={handleClose}>
          <Clear />
        </IconButton>
      </Box>
      <Box>
        <AnalysisComponent INS_ID={INS_ID} closeDialog={handleClose} />
      </Box>
    </StyledDialog>
  );
};

export default InstaInsightDialog;
