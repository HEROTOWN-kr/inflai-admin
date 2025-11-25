import React, { Fragment, useEffect, useState } from 'react';
import {
  Box, CircularProgress, Grid, IconButton, InputAdornment, Paper, Table, TableBody, TableContainer, TableHead, TableRow
} from '@material-ui/core';
import { PieChart } from 'react-minimal-pie-chart';
import axios from 'axios';
import { Form, Formik } from 'formik';
import SearchIcon from '@material-ui/icons/Search';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import StyledButton from '../../../containers/StyledButton';
import StyledTableCell from '../../../containers/StyledTableCell';
import StyledText from '../../../containers/StyledText';
import StyledTableRow from '../../../containers/StyledTableRow';
import MyTextField from '../../../containers/MyTextField';
import StyledTableSortLabel from '../../../containers/StyledTableSortLabel';
import defaultAccountImage from '../../../../img/default_account_image.png';
import StyledLink from '../../../containers/StyledLink';
import MyPagination from '../../../containers/MyPagination';
import StyledTitle from '../../../containers/StyledTitle';
import ReactFormText from '../../../containers/ReactFormText';

const useStyles = makeStyles({
  root: {
    background: '#ffffff'
  },
  endAdornment: {
    padding: '0'
  },
  tableRowRoot: {
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#9199b6'
    }
  }
});

const tableRows = {
  title: [
    {
      id: '',
      text: '#',
      align: 'center',
      width: '60px'
    },
    {
      id: '',
      text: '인스타그램 정보',
      align: 'left',
      // width: '200px'
    },
    {
      id: 'INS_FLWR',
      text: '팔로워 수',
      align: 'left'
    },
    {
      id: 'INS_FLW',
      text: '팔로잉 수',
      align: 'left'
    },
    {
      id: 'INS_MEDIA_CNT',
      text: '게시물 수',
      align: 'left'
    },
    {
      id: 'INS_LIKES',
      text: '좋아요 수',
      align: 'left'
    },
    {
      id: 'INS_CMNT',
      text: '댓글 수',
      align: 'left'
    },
    {
      id: '',
      text: 'is Fake?',
      align: 'left'
    },
  ],
  titleDetectInfo: [
    {
      text: '',
      align: 'center',
      width: '40px'
    },
    {
      text: '타입',
      align: 'left',
      // width: '200px'
    },
    {
      text: '좋아요 수',
      align: 'left'
    },
    {
      text: '댓글 수',
      align: 'left'
    },
    {
      text: '콘텐츠 수',
      align: 'left'
    },
  ],
  body: ['rownum', 'INF_NAME', 'INS_FLWR']
};

function LoadingComponent() {
  return (
    <Box height={536}>
      <Grid container justify="center" alignItems="center" style={{ height: '100%', maxWidth: 'inherit' }}>
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    </Box>
  );
}

function InstagramList(props) {
  const [searchWord, setSearchWord] = useState('');
  const [updateTime, setUpdateTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [influencers, setInfluencers] = useState([]);
  const [detectData, setDetectData] = useState([]);
  const [selectedRow, setSelectedRow] = useState('');
  const [process, setProcess] = useState(false);
  const [order, setOrder] = useState({ orderBy: 'INS_FLWR', direction: 'desc' });

  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);

  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    defaultValues: { searchValue: '' }
  });

  const limit = 10;
  const classes = useStyles();

  function searchFunc(data) {
    setPage(1);
    setSearchWord(data);
  }

  const changePage = (event, value) => {
    setPage(value);
  };

  async function getInfluencers() {
    const InstaData = await axios.get('/api/TB_INSTA/', {
      params: {
        ...order, searchWord, limit, page
      }
    });
    const { list, cnt } = InstaData.data.data;
    setInfluencers(list);
    setCount(cnt);
  }

  async function getUpdateData() {
    const InstaData = await axios.get('/api/TB_ADMIN/getUpdateDate');
    const { ADM_UPDATE_DT } = InstaData.data.data;
    const updateDate = new Date(ADM_UPDATE_DT);

    const Year = updateDate.getFullYear();
    const Month = (`0${updateDate.getMonth() + 1}`).slice(-2);
    const Day = (`0${updateDate.getDate()}`).slice(-2);
    const Hours = (`0${updateDate.getHours()}`).slice(-2);
    const Minutes = (`0${updateDate.getMinutes()}`).slice(-2);
    const Seconds = (`0${updateDate.getSeconds()}`).slice(-2);

    const myDate = [Year, Month, Day].join('-');
    const Time = [Hours, Minutes, Seconds].join(':');
    const fullDate = `${myDate} ${Time}`;

    setUpdateTime(fullDate);
  }

  async function getGoogleVisionData(INS_ID, type) {
    setSelectedRow(INS_ID);
    setProcess(true);
    // const isLocal = window.location.host !== 'admin.inflai.com';
    const { host } = window.location;

    const apiUrl = type === 1 ? 'getGoogleData' : 'getGoogleDataObject';

    const googleData = await axios.get(`/api/TB_INSTA/${apiUrl}`, {
      params: { INS_ID, host }
    });
    setDetectData(googleData.data.statistics);
    setProcess(false);
  }

  function getGoogleVisionDataOffline(INS_ID, TYPES) {
    setSelectedRow(INS_ID);
    setProcess(true);
    setDetectData(JSON.parse(TYPES));
    setProcess(false);
  }

  useEffect(() => {
    getInfluencers();
  }, [order, searchWord, page]);

  useEffect(() => {
    getUpdateData();
  }, []);

  function sortTable(id) {
    const isDesc = order.orderBy === id && order.direction === 'desc';
    setOrder({
      orderBy: id,
      direction: isDesc ? 'asc' : 'desc'
    });
  }

  return (
    <Box maxWidth={1276} m="0 auto">
      <Box mb={1}>
        <Grid container alignItems="center">
          <Grid item xs container alignItems="center">
            <Grid item>
              <Box width={280}>
                <ReactFormText
                  register={register}
                  errors={errors}
                  name="searchValue"
                  placeholder="검색"
                  InputProps={{
                    classes: { root: classes.root, adornedEnd: classes.endAdornment },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleSubmit(searchFunc)}>
                          <SearchIcon fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  onKeyPress={(ev) => {
                    if (ev.key === 'Enter') {
                      ev.preventDefault();
                      handleSubmit(searchFunc)();
                    }
                  }}
                />
              </Box>
            </Grid>
            { searchWord ? (
              <Grid item>
                <Box ml={2} fontSize={24} color="green">
                  {`(${searchWord}) 검색 결과`}
                </Box>
              </Grid>
            ) : null }

          </Grid>
          <Grid item>
            <StyledText color="#b9b9b9" fontSize="14px">
              {`최근 업데이트: ${updateTime}`}
            </StyledText>
          </Grid>
        </Grid>
      </Box>
      {loading ? (
        <LoadingComponent />
      ) : (
        <Fragment>
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  { tableRows.title.map(item => (
                    <StyledTableCell key={item.text} align={item.align} width={item.width || null}>
                      { item.id ? (
                        <Grid container justify="center">
                          <Grid item>
                            <StyledTableSortLabel
                              id={item.id}
                              color="#66f8ff"
                              active={order.orderBy === item.id}
                              direction={order.orderBy === item.id ? order.direction : 'desc'}
                              onClick={() => sortTable(item.id)}
                            >
                              {item.text}
                            </StyledTableSortLabel>
                          </Grid>
                        </Grid>
                      ) : (
                        <StyledText color="#ffffff" textAlign="center">
                          {item.text}
                        </StyledText>
                      )}
                    </StyledTableCell>
                  )) }
                </TableRow>
              </TableHead>
              <TableBody>
                {influencers.map(row => (
                  <StyledTableRow
                    key={row.INS_ID}
                    selected={row.INS_ID === selectedRow}
                    // onClick={() => getGoogleVisionData(row.INS_ID, 2)}
                  >
                    <StyledTableCell align="center">
                      <StyledText fontSize="20px" fontWeight="700" textAlign="center">
                        {row.rownum}
                      </StyledText>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <Grid container spacing={2}>
                        <Grid item>
                          <Box
                            width="37px"
                            height="37px"
                            borderRadius="100%"
                            alt="noFoto"
                            onError={(e) => { e.target.onerror = null; e.target.src = `${defaultAccountImage}`; }}
                            src={row.INS_PROFILE_IMG || defaultAccountImage}
                            component="img"
                          />
                        </Grid>
                        <Grid item>
                          <StyledText fontWeight="600" fontSize="14px" color="#222">
                            {row.INS_NAME ? `${row.INS_NAME} / ${row.TB_INFLUENCER.INF_NAME}` : row.TB_INFLUENCER.INF_NAME}
                          </StyledText>
                          <Box paddingTop="3px" fontSize="12px" color="#555">
                            <StyledLink
                              href={`https://www.instagram.com/${row.INS_USERNAME || 'instagram'}/`}
                              target="_blank"
                            >
                              {`@${row.INS_USERNAME || 'instagram'}`}
                            </StyledLink>
                          </Box>
                        </Grid>
                      </Grid>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <StyledText fontWeight="500" fontSize="16px" textAlign="center">
                        {row.INS_FLWR}
                      </StyledText>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <StyledText fontWeight="500" fontSize="16px" textAlign="center">
                        {row.INS_FLW}
                      </StyledText>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <StyledText fontWeight="500" fontSize="16px" textAlign="center">
                        {row.INS_MEDIA_CNT}
                      </StyledText>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <StyledText fontWeight="500" fontSize="16px" textAlign="center">
                        {row.INS_LIKES}
                      </StyledText>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <StyledText fontWeight="500" fontSize="16px" textAlign="center">
                        {row.INS_CMNT}
                      </StyledText>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <StyledText fontWeight="500" fontSize="16px" textAlign="center">
                        {`${(row.INS_CMNT * 100 / row.INS_LIKES).toFixed(2)}%`}
                      </StyledText>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box py={4}>
            <Grid container justify="center">
              <Grid item>
                <MyPagination
                  itemCount={count}
                  page={page}
                  changePage={changePage}
                  perPage={10}
                />
              </Grid>
            </Grid>
          </Box>
        </Fragment>
      )}

      {/* <Grid container spacing={2}>
        <Grid item md={7} xl={8}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container justify="space-between" alignItems="flex-end">
                <Grid item>
                  <Formik
                    initialValues={{ search: '' }}
                    enableReinitialize
                    onSubmit={(values) => {
                      // console.log(values);
                    }}
                  >
                    {() => (
                      <Form>
                        <MyTextField
                          name="search"
                          label=""
                          eA={SearchIcon}
                          clickFunc={searchFunc}
                          onEnter={searchFunc}
                          ph="검색"
                        />
                      </Form>
                    )}
                  </Formik>
                </Grid>
                <Grid item>
                  <StyledText
                    color="#b9b9b9"
                    fontSize="14px"
                  >
                    {`최근 업데이트: ${updateTime}`}
                  </StyledText>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    { tableRows.title.map(item => (
                      <StyledTableCell key={item.text} align={item.align} width={item.width || null}>
                        { item.id ? (
                          <Grid container justify="center">
                            <Grid item>
                              <StyledTableSortLabel
                                id={item.id}
                                color="#66f8ff"
                                active={order.orderBy === item.id}
                                direction={order.orderBy === item.id ? order.direction : 'desc'}
                                onClick={() => sortTable(item.id)}
                              >
                                {item.text}
                              </StyledTableSortLabel>
                            </Grid>
                          </Grid>
                        ) : (
                          <StyledText
                            color="#ffffff"
                            textAlign="center"
                          >
                            {item.text}
                          </StyledText>
                        )}
                      </StyledTableCell>
                    )) }
                  </TableRow>
                </TableHead>
                <TableBody>
                  {influencers.map(row => (
                    <StyledTableRow
                      key={row.INS_ID}
                      selected={row.INS_ID === selectedRow}
                      onClick={() => getGoogleVisionData(row.INS_ID, 2)}
                    >
                      <StyledTableCell align="center">
                        <StyledText fontSize="20px" fontWeight="700" textAlign="center">
                          {row.rownum}
                        </StyledText>
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <Grid container spacing={2}>
                          <Grid item>
                            <Box
                              width="37px"
                              height="37px"
                              borderRadius="100%"
                              alt="noFoto"
                              onError={(e) => { e.target.onerror = null; e.target.src = `${defaultAccountImage}`; }}
                              src={row.INS_PROFILE_IMG || defaultAccountImage}
                              component="img"
                            />
                          </Grid>
                          <Grid item>
                            <StyledText fontWeight="600" fontSize="14px" color="#222">
                              {row.INS_NAME ? `${row.INS_NAME} / ${row.TB_INFLUENCER.INF_NAME}` : row.TB_INFLUENCER.INF_NAME}
                            </StyledText>
                            <Box paddingTop="3px" fontSize="12px" color="#555">
                              <StyledLink
                                href={`https://www.instagram.com/${row.INS_USERNAME || 'instagram'}/`}
                                target="_blank"
                              >
                                {`@${row.INS_USERNAME || 'instagram'}`}
                              </StyledLink>
                            </Box>
                          </Grid>
                        </Grid>
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <StyledText fontWeight="500" fontSize="16px" textAlign="center">
                          {row.INS_FLWR}
                        </StyledText>
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <StyledText fontWeight="500" fontSize="16px" textAlign="center">
                          {row.INS_FLW}
                        </StyledText>
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <StyledText fontWeight="500" fontSize="16px" textAlign="center">
                          {row.INS_MEDIA_CNT}
                        </StyledText>
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <StyledText fontWeight="500" fontSize="16px" textAlign="center">
                          {row.INS_LIKES}
                        </StyledText>
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <StyledText fontWeight="500" fontSize="16px" textAlign="center">
                          {row.INS_CMNT}
                        </StyledText>
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <StyledText fontWeight="500" fontSize="16px" textAlign="center">
                          {`${(row.INS_CMNT * 100 / row.INS_LIKES).toFixed(2)}%`}
                        </StyledText>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
            <Grid item xs={12}>
              <Box py={4}>
                <Grid container justify="center">
                  <Grid item>
                    <MyPagination
                      itemCount={count}
                      page={page}
                      changePage={changePage}
                      perPage={10}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={5} xl={4}>
          <Grid container justify="space-between">
            <Grid item>
              <StyledTitle title="Stats" />
            </Grid>
          </Grid>

          <Box
            border="1px solid #cacaca"
            height="675px"
            padding="30px"
            boxSizing="border-box"
            style={{ overflowY: 'scroll' }}
          >
            {leftPanel}
          </Box>
        </Grid>
      </Grid> */}
    </Box>
  );
}

export default InstagramList;
