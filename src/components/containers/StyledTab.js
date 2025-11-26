import React from 'react';
import { styled } from '@mui/material/styles';
import { Tab } from '@mui/material';

const StyledTabRoot = styled(Tab)(({ theme }) => ({
  color: 'rgba(63, 75, 92, 0.5)',
  textTransform: 'none',
  '&:hover': {
    color: 'rgba(63, 75, 92, 1)',
  },
  '&.Mui-selected': {
    color: 'rgba(63, 75, 92, 1)',
  },
}));

export default function StyledTab(props) {
  return <StyledTabRoot disableRipple {...props} />;
}
