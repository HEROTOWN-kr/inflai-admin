import React from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import StyledButton from './StyledButton';
import StyledText from './StyledText';

export default function ConfirmDialog(props) {
  const {
    open, closeDialog, onConfirm, dialogText
  } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const onConfirmFunc = () => {
    onConfirm();
    closeDialog();
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={closeDialog}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {/* INFLAI */}
          <StyledText textAlign="center" fontSize="14">INFLAI</StyledText>
        </DialogTitle>
        <DialogContent>
          {/* {dialogText} */}
          <StyledText textAlign="center" fontSize="14">{dialogText}</StyledText>
        </DialogContent>
        <DialogActions>
          <StyledButton onClick={closeDialog}>
                        아니요
          </StyledButton>
          <StyledButton onClick={onConfirmFunc}>
                        네
          </StyledButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
