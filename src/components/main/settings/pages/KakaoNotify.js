import React, {
  Fragment, useContext, useEffect, useState
} from 'react';
import {
  Box,
  Grid,
  Paper,
  TableBody,
  TableHead,
  TableRow,
  Checkbox,
  Table,
  Typography,
  TableContainer,
  makeStyles,
  RadioGroup,
  FormControlLabel, Radio, Divider
} from '@material-ui/core';
import axios from 'axios';
import { all } from 'async';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Clear, Notifications } from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import StyledText from '../../../containers/StyledText';
import MyPagination from '../../../containers/MyPagination';
import StyledTableCell from '../../../containers/StyledTableCell';
import StyledTableRow from '../../../containers/StyledTableRow';
import { Colors } from '../../../../lib/Сonstants';
import StyledButton from '../../../containers/StyledButton';
import StyledBackDrop from '../../../containers/StyledBackDrop';
import AuthContext from '../../../../context/AuthContext';

const tableHeader = [
  {
    text: '체크',
    align: 'center',
    width: '40px'
  },
  {
    text: '번호',
    align: 'center',
    width: '80px'
  },
  {
    text: '캠페인이름',
    align: 'center'
  },
  {
    text: '시잘일',
    align: 'center',
    width: '100px'
  },
  {
    text: '마감일',
    align: 'center',
    width: '100px'
  }
];

const notificationTypes = [
  { value: '1', text: '알림톡' },
  { value: '2', text: '친구톡' },
  { value: '3', text: '푸시메세지' }
];

const receiverTypes = [
  { value: '0', text: '전체' },
  { value: '1', text: '테스터' },
];

const defaultValues = {
  type: '1',
  receiver: '0',
};

const useStyles = makeStyles(theme => ({
  title: {
    fontFamily: 'Noto Sans KR, sans-serif',
    fontWeight: 700,
    marginTop: '96px',
    marginBottom: '48px',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
      marginTop: '30px',
      marginBottom: '30px',
    },
  },
  tabs: {
    root: {},
    indicator: {}
  },
  startIcon: {
    [theme.breakpoints.down('xs')]: {
      margin: 0,
    },
  },
  checkbox: {
    padding: '3px'
  },
  lastItem: {
    marginRight: '0'
  },
  linkText: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  clearRoot: {
    height: 'auto',
    marginLeft: '8px',
    opacity: '30%',
    cursor: 'pointer',
    '&:hover': {
      opacity: '1'
    }
  },
}));

function KakaoNotify() {
  const [campaigns, setCampaigns] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const limit = 10;

  const { enqueueSnackbar } = useSnackbar();
  const { setLoading } = useContext(AuthContext);
  const classes = useStyles();

  const { control, getValues, watch } = useForm({
    mode: 'onBlur',
    defaultValues
  });


  function getCampaigns() {
    axios.get('/api/TB_AD/getAll', { params: { page, limit } }).then((res) => {
      const { campaignsRes, countRes } = res.data.data;
      const campaignsArray = campaignsRes.map((item) => {
        const {
          AD_ID, AD_NAME, AD_SRCH_START, AD_SRCH_END, rownum
        } = item;
        return {
          id: AD_ID,
          campaignName: AD_NAME,
          startDate: AD_SRCH_START,
          endDate: AD_SRCH_END,
          rownum
        };
      });
      setCampaigns(campaignsArray);
      setCount(countRes);
    });
  }

  useEffect(() => {
    getCampaigns();
  }, [page]);

  const changePage = (event, value) => {
    setPage(value);
  };

  const showButton = () => {
    const type = getValues('type');
    if (type === '1') {
      return selectedItems.length === 3;
    }
    return selectedItems.length === 1;
  };

  const isCampaignExist = (id) => {
    const filtered = selectedItems.filter(item => item.id === id);
    return filtered.length > 0;
  };

  function selectCampaign({ id, name }) {
    const isExist = isCampaignExist(id);

    if (isExist) {
      const newItems = selectedItems.filter(item => item.id !== id);
      setSelectedItems(newItems);
    } else {
      setSelectedItems([...selectedItems, { id, name }]);
    }
  }

  function sendKakaoNotification() {
    setLoading(true);
    const ids = selectedItems.map(item => item.id);

    const params = { ids: JSON.stringify(ids), all: '1', test: getValues('receiver') };

    axios.get('/api/TB_NOTIFICATION/sendKakaoToNotFriend', {
      params
    }).then((res) => {
      setLoading(false);
      enqueueSnackbar('알림 발송되었습니다', { variant: 'success' });
    }).catch((error) => {
      alert(error.response.data.message);
      setLoading(false);
    });
  }

  function sendKakaoImageNotification() {
    setLoading(true);

    const params = { AD_ID: selectedItems[0].id, test: getValues('receiver') };

    axios.get('/api/TB_NOTIFICATION/kakaoImageMessage', {
      params
    }).then((res) => {
      setLoading(false);
      enqueueSnackbar('알림 발송되었습니다', { variant: 'success' });
    }).catch((error) => {
      alert(error.response.data.message);
      setLoading(false);
    });
  }

  function sendPushNotification() {
    setLoading(true);

    const params = { id: selectedItems[0].id };

    axios.get('/api/TB_NOTIFICATION/sendFcmTopic', {
      params
    }).then((res) => {
      setLoading(false);
      enqueueSnackbar('알림 발송되었습니다', { variant: 'success' });
    }).catch((error) => {
      alert(error.response.data.message);
      setLoading(false);
    });
  }

  function clickSend() {
    const notificationType = getValues('type');
    switch (notificationType) {
      case '1':
        sendKakaoNotification();
        break;
      case '2':
        sendKakaoImageNotification();
        break;
      case '3':
        sendPushNotification();
        break;
      default:
        break;
    }
  }

  const watchObj = watch(['type']);

  useEffect(() => {
    const visible = showButton();
    if (visible) {
      setButtonDisabled(false);
      return;
    }
    setButtonDisabled(true);
  }, [selectedItems]);

  useEffect(() => {
    setSelectedItems([]);
    setPage(1);
  }, [watchObj.type]);

  return (
    <Fragment>
      <Box borderBottom="1px solid #e4dfdf">
        <Box maxWidth={1276} m="0 auto">
          <Typography variant="h4" classes={{ root: classes.title }}>알림 관리</Typography>
        </Box>
      </Box>
      <Box pb={4} bgcolor="#f4f4f4" minHeight={800}>
        <Box py={6} px={2} maxWidth={1276} m="0 auto">
          <Box p={2} mb={2} bgcolor="#fff" borderRadius="4px">
            <Grid container spacing={4}>
              <Grid item>
                <Box mb="2px"><StyledText color="#3f51b5">알림 종류</StyledText></Box>
                <Controller
                  as={(
                    <RadioGroup row aria-label="gender">
                      {notificationTypes.map((item, index) => (
                        <FormControlLabel
                          key={item.value}
                          value={item.value}
                          control={<Radio />}
                          label={item.text}
                          classes={index === notificationTypes.length - 1 ? { root: classes.lastItem } : null}
                        />
                      ))}
                    </RadioGroup>
                    )}
                  name="type"
                  control={control}
                />
              </Grid>
              <Grid item>
                <Divider orientation="vertical" />
              </Grid>
              <Grid item>
                <Box mb="2px"><StyledText color="#3f51b5">수신자 종류</StyledText></Box>
                <Controller
                  as={(
                    <RadioGroup row aria-label="gender">
                      {receiverTypes.map((item, index) => (
                        <FormControlLabel
                          key={item.value}
                          value={item.value}
                          control={<Radio />}
                          label={item.text}
                          classes={index === receiverTypes.length - 1 ? { root: classes.lastItem } : null}
                        />
                      ))}
                    </RadioGroup>
                    )}
                  name="receiver"
                  control={control}
                />
              </Grid>
            </Grid>
          </Box>

          <Box mb={2}>
            <Grid container justify="space-between" alignItems="center">
              <Grid item>
                <Grid container spacing={1}>
                  { selectedItems.map(item => (
                    <Grid item key={item.id}>
                      <Box
                        p={1}
                        bgcolor="#fff"
                        borderRadius="5px"
                        maxWidth={300}
                      >
                        <Grid style={{ display: 'flex' }}>
                          <Typography classes={{ root: classes.linkText }}>{item.name}</Typography>
                          <Clear
                            fontSize="small"
                            classes={{ root: classes.clearRoot }}
                            onClick={() => selectCampaign(item)}
                          />
                        </Grid>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item>
                <StyledButton
                  height={40}
                  padding="0 20px"
                  background="#0fb359"
                  hoverBackground="#107C41"
                  disabled={buttonDisabled}
                  startIcon={<Notifications />}
                  onClick={clickSend}
                >
                  알림 보내기
                </StyledButton>
              </Grid>
            </Grid>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {tableHeader.map(item => (
                    <StyledTableCell key={item.text} align={item.align} width={item.width || null}>{item.text}</StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {campaigns.map((row) => {
                  const isExist = isCampaignExist(row.id);
                  const disabled = !isExist && !buttonDisabled;
                  return (
                    <StyledTableRow
                      hover
                      key={row.id}
                      onClick={event => (disabled ? null : selectCampaign({ id: row.id, name: row.campaignName }))}
                    >
                      <StyledTableCell>
                        <Checkbox
                          checked={isExist}
                          disabled={disabled}
                          classes={{ root: classes.checkbox }}
                        />
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <StyledText textAlign="center" color={disabled ? Colors.disabled : null}>
                          {row.rownum}
                        </StyledText>
                      </StyledTableCell>
                      <StyledTableCell>
                        <StyledText color={disabled ? Colors.disabled : null}>
                          {row.campaignName}
                        </StyledText>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <StyledText textAlign="center" color={disabled ? Colors.disabled : null}>
                          {row.startDate}
                        </StyledText>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <StyledText textAlign="center" color={disabled ? Colors.disabled : null}>
                          {row.endDate}
                        </StyledText>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Grid container justify="center">
          <Grid item>
            <MyPagination
              itemCount={count}
              page={page}
              changePage={changePage}
              perPage={limit}
            />
          </Grid>
        </Grid>
      </Box>
    </Fragment>

  /* <Box maxWidth={1200} py="20px" px="30px" m="0 auto" boxSizing="border-box">
      <Grid container>
        <Grid item xs="auto">
          <Box width="300px">
            <StyledText mb="30px" fontSize="16px">카카오 알림톡 메세지</StyledText>
            {selectedItems.map(item => (
              <StyledText mb={1}>{`Campaign #${item}`}</StyledText>
            ))}
            <Box width="150px" mt={2}>
              <StyledButton
                padding="0"
                height={40}
                disabled={selectedItems.length < 3}
                onClick={sendMessage}
              >
카카오 알림 보내기
              </StyledButton>
            </Box>
          </Box>
        </Grid>
        <Grid item xs>
          <StyledText fontSize="16px">캠페인 리스트</StyledText>
          <Box my="30px">
            <Table>
              <TableHead>
                <TableRow>
                  {tableHeader.map(item => (
                    <StyledTableCell key={item.text} align={item.align} width={item.width || null}>{item.text}</StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {campaigns.map((row) => {
                  const isExist = selectedItems.indexOf(row.id) !== -1;
                  const disabled = !isExist && selectedItems.length >= 3;
                  return (
                    <StyledTableRow
                      hover
                      key={row.id}
                      onClick={event => (disabled ? null : selectCampaign(row.id))}
                    >
                      <StyledTableCell>
                        <Checkbox
                          checked={isExist}
                          disabled={disabled}
                        />
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <StyledText textAlign="center" color={disabled ? Colors.disabled : null}>
                          {row.rownum}
                        </StyledText>
                      </StyledTableCell>
                      <StyledTableCell>
                        <StyledText textAlign="center" color={disabled ? Colors.disabled : null}>
                          {row.campaignName}
                        </StyledText>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <StyledText textAlign="center" color={disabled ? Colors.disabled : null}>
                          {row.startDate}
                        </StyledText>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <StyledText textAlign="center" color={disabled ? Colors.disabled : null}>
                          {row.endDate}
                        </StyledText>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>

          </Box>
          <Grid container justify="center">
            <Grid item>
              <MyPagination
                itemCount={count}
                page={page}
                changePage={changePage}
                perPage={limit}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box> */
  );
}

export default KakaoNotify;
