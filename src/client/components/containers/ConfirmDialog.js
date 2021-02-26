import React from 'react';
import {
  IconButton, Dialog, DialogActions, DialogContent, Box, DialogTitle, useMediaQuery, makeStyles, Grid
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Clear } from '@material-ui/icons';
import StyledButton from './StyledButton';
import StyledText from './StyledText';
import { Colors } from '../../lib/Сonstants';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: '0',
    right: '0',
    color: '#b9b9b9de'
  },
  paper: {
    margin: '12px',
    maxWidth: '300px',
    width: '100%',
    borderRadius: '2px'
  },
  button: {
    padding: 0,
    minWidth: 0
  },
});

export default function ConfirmDialog(props) {
  const {
    open, closeDialog, onConfirm, dialogText
  } = props;
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const onConfirmFunc = () => {
    onConfirm();
    closeDialog();
  };

  return (
    <Dialog
      classes={{ paper: classes.paper }}
      fullScreen={fullScreen}
      open={open}
      onClose={closeDialog}
      aria-labelledby="responsive-dialog-title"
    >
      <Box p="15px" fontSize="16px" fontWeight="400" lineHeight="18px" textAlign="center" position="relative" borderBottom={`1px solid ${Colors.grey8}`}>
        INFLAI
        <IconButton size="medium" classes={{ root: classes.root }} onClick={closeDialog}>
          <Clear />
        </IconButton>
      </Box>
      <Box px={2} py={2} textAlign="center" boxSizing="border-box">
        {dialogText}
        <Box mt={4}>
          <Grid container justify="space-between">
            <Grid item>
              <Box width="110px">
                <StyledButton padding="0 15px" height="38px" onClick={closeDialog}>
                  아니요
                </StyledButton>
              </Box>
            </Grid>
            <Grid item>
              <Box width="110px">
                <StyledButton padding="0 15px" height="38px" onClick={onConfirmFunc}>
                  네
                </StyledButton>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Dialog>
  );
}
