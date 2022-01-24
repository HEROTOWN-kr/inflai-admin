import React, { useState } from 'react';
import {
  Box, Button, Dialog, Grid, IconButton, makeStyles, useMediaQuery
} from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import { useTheme } from '@material-ui/core/styles';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { Colors } from '../../../lib/Сonstants';
import StyledButton from '../../containers/StyledButton';
import Instagram from '../../../img/instagram-icon.png';
import Naver from '../../../img/icon_blog_url.png';
import Youtube from '../../../img/youtube-square.png';
import StyledImage from '../../containers/StyledImage';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: '0',
    right: '0',
    color: '#b9b9b9de'
  },
  paper: {
    margin: '12px',
    width: '100%',
    borderRadius: '2px'
  },
  button: {
    padding: 0,
    minWidth: 0
  },
});

function HistoryDialog(props) {
  const {
    open, closeDialog, INF_ID
  } = props;

  const [campaigns, setCampaigns] = useState([]);

  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  function getHistory() {
    axios.get('/api/TB_PARTICIPANT/getHistory', { params: { INF_ID } }).then((res) => {
      const { data } = res.data;
      setCampaigns(data);
    }).catch((err) => {
      alert(err.response.data.message);
    });
  }

  function close() {
    setCampaigns([]);
    closeDialog();
  }

  return (
    <Dialog
      classes={{ paper: classes.paper }}
      fullScreen={fullScreen}
      maxWidth="md"
      open={open}
      onClose={close}
      TransitionProps={{
        onEntered: getHistory
      }}
      aria-labelledby="responsive-dialog-title"
    >
      <Box p="15px" fontSize="16px" fontWeight="400" lineHeight="18px" textAlign="center" position="relative" borderBottom={`1px solid ${Colors.grey8}`}>
        히스토리
        <IconButton size="medium" classes={{ root: classes.root }} onClick={close}>
          <Clear />
        </IconButton>
      </Box>
      <Box px={2} py={2} textAlign="center" boxSizing="border-box">
        <Box>
          {campaigns.length > 0 ? (
            <Box>test</Box>
          ) : (
            <Box>참요한 캠페인이 없습니다</Box>
          )}
        </Box>

        <Box mt={4}>
          <Box width="110px" m="0 auto">
            <Button
              fullWidth
              color="primary"
              variant="contained"
              onClick={close}
            >
                            닫기
            </Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
}

export default HistoryDialog;
