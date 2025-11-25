import React, { useState } from 'react';
import {
  Box, Button, Dialog, Grid, IconButton, makeStyles, useMediaQuery
} from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import { useTheme } from '@material-ui/core/styles';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { AdvertiseTypes, Colors } from '../../../lib/Сonstants';
import StyledButton from '../../containers/StyledButton';
import Instagram from '../../../img/instagram-icon.png';
import Naver from '../../../img/icon_blog_url.png';
import Youtube from '../../../img/youtube-square.png';
import defaultAccountImage from '../../../img/default_account_image.png';
import StyledImage from '../../containers/StyledImage';
import StyledText from '../../containers/StyledText';


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
  header: {
    padding: '15px',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '18px',
    textAlign: 'center',
    position: 'relative',
    borderBottom: `1px solid ${Colors.grey8}`,
  }
});

function List(props) {
  const { campaigns } = props;
  return (
    campaigns.length > 0
      ? campaigns.map(item => (
        <Box mt={1} p={1} border="1px solid #d5d5d5">
          <Grid container>
            <Grid item xs="auto">
              <StyledImage
                width="80px"
                height="80px"
                src={item.AD_PHOTO ? item.AD_PHOTO : defaultAccountImage}
                onError={(e) => { e.target.onerror = null; e.target.src = `${defaultAccountImage}`; }}
              />
            </Grid>
            <Grid item xs>
              <Box ml="14px" height="100%">
                <Grid container alignContent="space-between" style={{ height: '100%' }}>
                  <Grid item xs={12}>
                    <StyledText fontSize="14px" color="#222">
                      {item.AD_NAME}
                    </StyledText>
                    <StyledText fontSize="14px" color="#222">
                      {item.AD_TYPE === '1' ? (
                        <span style={{ color: Colors.pink, fontWeight: '600' }}>Instagram</span>
                      ) : null}
                      {item.AD_TYPE === '2' ? (
                        <span style={{ color: Colors.red, fontWeight: '600' }}>Youtube</span>
                      ) : null}
                      {item.AD_TYPE === '3' ? (
                        <span style={{ color: Colors.green, fontWeight: '600' }}>Blog</span>
                      ) : null}
                      {/* {` ${AdvertiseTypes.mainType[item.category]} > ${AdvertiseTypes.subType[item.category][item.subcategory]}`} */}
                    </StyledText>
                    <StyledText>{`${item.AD_SRCH_START} ~ ${item.AD_SRCH_END}`}</StyledText>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item>
              <Box width="70px">
                <StyledButton
                  disabled={!item.PAR_REVIEW}
                  onClick={() => window.open(item.PAR_REVIEW, '_blank')}
                  padding="0"
                  height="26px"
                  fontSize="0.790rem"
                >
                        리뷰 보기
                </StyledButton>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )) : (
        <Box textAlign="center">진행한 캠페인이 없습니다</Box>
      )
  );
}

function HistoryDialog(props) {
  const {
    open, closeDialog, INF_ID
  } = props;

  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  const classes = useStyles();
  const theme = useTheme();
  const isMD = useMediaQuery(theme.breakpoints.up('md'));
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  function getHistory() {
    axios.get('/api/TB_PARTICIPANT/getHistory', { params: { INF_ID } }).then((res) => {
      const { data } = res.data;
      setCampaigns(data);
    }).catch((err) => {
      alert(err.response.data.message);
    }).then(() => setLoading(false));
  }

  function close() {
    setCampaigns([]);
    setLoading(true);
    closeDialog();
  }

  return (
    <Dialog
      classes={{ paper: classes.paper }}
      fullScreen={fullScreen}
      // maxWidth="md"
      open={open}
      onClose={close}
      TransitionProps={{
        onEntered: getHistory,
        unmountOnExit: true
      }}
      aria-labelledby="responsive-dialog-title"
    >
      <Box className={classes.header}>
        히스토리
        <IconButton size="medium" classes={{ root: classes.root }} onClick={close}>
          <Clear />
        </IconButton>
      </Box>
      <Box px={2} py={2} boxSizing="border-box">
        { loading ? (
          <Box textAlign="center">Loading...</Box>
        ) : <List campaigns={campaigns} /> }
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
