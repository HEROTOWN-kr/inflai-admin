import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  MenuItem,
  Select
} from '@material-ui/core';
import axios from 'axios';

function RequestDialog(props) {
  const {
    open, close, changeState, info, state, setState
  } = props;

  const stateCategory = {
    승인: {
      text: '승인',
      value: 1
    },
    거절: {
      text: '거절',
      value: 2
    },
    대기중: {
      text: '대기중',
      value: 3
    },
  };

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
          {/* {`id: ${info.NOTI_ID}, state: ${info.NOTI_STATE}`} */}
          <Select
            fullWidth
            value={state}
            onChange={(event => setState(event.target.value))}
          >
            {Object.keys(stateCategory).map(item => (
              <MenuItem key={stateCategory[item].value} value={stateCategory[item].value}>{stateCategory[item].text}</MenuItem>
            ))}
          </Select>
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
