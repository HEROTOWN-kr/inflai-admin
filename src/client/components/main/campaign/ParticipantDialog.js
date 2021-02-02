import React from 'react';
import {
  Box, Dialog, useMediaQuery, IconButton, makeStyles, Typography, Grid
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Clear } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { Colors } from '../../../lib/Сonstants';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: '15px',
    right: '14px',
    fontSize: '28px',
    color: '#b9b9b9de'
  },
  paper: {
    margin: '12px',
    width: '100%',
    borderRadius: '2px'
  }
});

function ParticipantDialog(props) {
  const { open, closeDialog } = props;
  const history = useHistory();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();

  function clickCategory(url) {
    history.push(url);
    closeDialog();
  }

  return (
    <Dialog
      classes={{ paper: classes.paper }}
            // maxWidth="sm"
      onClose={closeDialog}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <Box padding="20px" fontSize="18px" fontWeight="400" lineHeight="18px" textAlign="center" position="relative" borderBottom={`1px solid ${Colors.grey8}`}>
                신청한 리뷰어
        <Clear onClick={closeDialog} classes={{ root: classes.root }} />
      </Box>
      <Box px={2} py={2}>
            테스트
      </Box>
    </Dialog>
  );
}

export default ParticipantDialog;
