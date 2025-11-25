import React from 'react';
import { styled } from '@mui/material/styles';
import {
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  Box,
  DialogTitle,
  useMediaQuery,
  Grid,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Clear } from '@mui/icons-material';
import StyledButton from './StyledButton';
import StyledText from './StyledText';
import { Colors } from '../../lib/Сonstants';

const PREFIX = 'ConfirmDialog';

const classes = {
  root: `${PREFIX}-root`,
  paper: `${PREFIX}-paper`,
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
    maxWidth: '300px',
    width: '100%',
    borderRadius: '2px'
  },
  [`& .${classes.button}`]: {
    padding: 0,
    minWidth: 0
  },
});

export default function ConfirmDialog(props) {
  const {
    open, closeDialog, onConfirm, dialogText
  } = props;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const onConfirmFunc = () => {
    onConfirm();
    closeDialog();
  };

  return (
    <StyledDialog
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
          <Grid container justifyContent="space-between">
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
    </StyledDialog>
  );
}
