import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Dialog, IconButton } from '@mui/material';
import { Cancel, Clear } from '@mui/icons-material';
import YoutubeAnalysis from './YoutubeAnalysis';

const PREFIX = 'AnalysisDialog';

const classes = {
  root: `${PREFIX}-root`,
  paper: `${PREFIX}-paper`,
  paperScrollBody: `${PREFIX}-paperScrollBody`
};

const StyledDialog = styled(Dialog)((
  {
    theme
  }
) => ({
  [`& .${classes.root}`]: {
    position: 'absolute',
    top: '15px',
    right: '14px',
    fontSize: '28px',
    color: '#b9b9b9de'
  },

  [`& .${classes.paper}`]: {
    margin: '12px',
    width: '100%',
    borderRadius: '2px',
  },

  [`& .${classes.paperScrollBody}`]: {
    maxWidth: '1500px',
  }
}));

function AnalysisDialog(props) {
  const { open, closeDialog, id } = props;


  return (
    <StyledDialog
      scroll="body"
      classes={{
        paper: classes.paper,
        paperScrollBody: classes.paperScrollBody,
      }}
      onClose={closeDialog}
      aria-labelledby="simple-dialog-title"
      open={open}>
      <YoutubeAnalysis id={id} closeDialog={closeDialog} />
    </StyledDialog>
  );
}

export default AnalysisDialog;
