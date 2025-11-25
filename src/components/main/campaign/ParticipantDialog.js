import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Dialog, useMediaQuery, IconButton, Typography, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Clear } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Colors } from '../../../lib/Сonstants';

const PREFIX = 'ParticipantDialog';

const classes = {
  root: `${PREFIX}-root`,
  paper: `${PREFIX}-paper`
};

const StyledDialog = styled(Dialog)({
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
    borderRadius: '2px'
  }
});

function ParticipantDialog(props) {
  const { open, closeDialog } = props;
  const navigate = useNavigate();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


  function clickCategory(url) {
    navigate(url);
    closeDialog();
  }

  return (
    <StyledDialog
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
    </StyledDialog>
  );
}

export default ParticipantDialog;
