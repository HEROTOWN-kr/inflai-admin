import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions
} from '@material-ui/core';
import axios from 'axios';

function RequestDialog(props) {
  const {
    open, close, changeState, info
  } = props;

  function changeAndClose() {
    changeState(info);
    close();
  }

  return (
    <Dialog
      open={open}
          // onClose={}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      disableScrollLock
    >
      <DialogTitle id="alert-dialog-title">상태 병경</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
            change state dialog
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={close} color="primary">
            아니요
        </Button>
        <Button onClick={changeAndClose} color="primary" autoFocus>
            네
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RequestDialog;
