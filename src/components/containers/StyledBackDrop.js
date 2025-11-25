import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  color: '#fff',
}));

export default function StyledBackDrop(props) {
  const { open, handleClose } = props;

  return (
    <StyledBackdrop open={open} onClick={handleClose}>
      <CircularProgress color="inherit" />
    </StyledBackdrop>
  );
}
