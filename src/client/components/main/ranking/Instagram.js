import React, { useEffect, useState } from 'react';

import {
  Grid,
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableSortLabel,
  TableHead,
  TableRow, CircularProgress, Button,
} from '@material-ui/core';
import axios from 'axios';
import { PieChart } from 'react-minimal-pie-chart';
import { Form, Formik } from 'formik';
import SearchIcon from '@material-ui/icons/Search';
import StyledTableCell from '../../containers/StyledTableCell';
import StyledTableRow from '../../containers/StyledTableRow';
import defaultAccountImage from '../../../img/default_account_image.png';
import StyledLink from '../../containers/StyledLink';
import StyledText from '../../containers/StyledText';
import StyledButton from '../../containers/StyledButton';
import StyledTableSortLabel from '../../containers/StyledTableSortLabel';
import MyTextField from '../../containers/MyTextField';
import StyledTitle from '../../containers/StyledTitle';
import MyPagination from '../../containers/MyPagination';

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

function Instagram(props) {
  const [searchWord, setSearchWord] = useState('');
  const [updateTime, setUpdateTime] = useState('');
  const [influencers, setInfluencers] = useState([]);
  const [detectData, setDetectData] = useState([]);
  const [selectedRow, setSelectedRow] = useState('');
  const [process, setProcess] = useState(false);
  const [order, setOrder] = useState({ orderBy: 'INS_FLWR', direction: 'desc' });

  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 10;

  const { history, match } = props;

  function searchFunc(data) {
    setPage(1);
    setSearchWord(data);
  }

  const changePage = (event, value) => {
    setPage(value);
  };

  const leftPanel = process ? <CircularProgress /> : (
    <div>
      {detectData && detectData.length
        ? (
          <Grid container spacing={2}>
            <Grid item xs={12} container justify="space-between">
              <Grid item>
                <StyledButton onClick={() => history.push(`${match.path}/Detail/${selectedRow}`)}>
                      상세보기
                </StyledButton>
              </Grid>
              <Grid item><StyledButton onClick={() => getGoogleVisionData(selectedRow, 1)}>라벨 인식</StyledButton></Grid>
            </Grid>
            <Grid item xs={12}>
              <Box
                maxWidth="800px"
                height="200px"
                margin="0 auto"
              >
                <PieChart
                  data={detectData}
                  animate="true"
                  animationDuration="800"
                  label={({ dataEntry }) => `${dataEntry.description} : ${dataEntry.value}%`}
                  labelStyle={index => ({
                    fill: detectData[index].color,
                    // fill: 'red',
                    fontSize: '10px',
                    fontFamily: 'sans-serif',
                  })}
                  radius={35}
                  labelPosition={120}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    {
                      tableRows.titleDetectInfo.map(item => (
                        <StyledTableCell
                          key={item.text}
                          align={item.align}
                          width={item.width || null}
                        >
                          <StyledText
                            color="#ffffff"
                            textAlign="center"
                          >
                            {item.text}
                          </StyledText>
                        </StyledTableCell>
                      ))
                    }
                  </TableRow>
                </TableHead>
                <TableBody>
                  {detectData.map(item => (
                    <StyledTableRow key={item.description}>
                      <StyledTableCell align="center">
                        <Box
                          width="40px"
                          height="20px"
                          bgcolor={item.color}
                          component="div"
                        />
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                      >
                        <StyledText
                          fontWeight="500"
                          fontSize="16px"
                          textAlign="center"
                        >
                          {item.description}
                        </StyledText>
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                      >
                        <StyledText
                          fontWeight="500"
                          fontSize="16px"
                          textAlign="center"
                        >
                          {item.likeCountSum}
                        </StyledText>
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                      >
                        <StyledText
                          fontWeight="500"
                          fontSize="16px"
                          textAlign="center"
                        >
                          {item.commentsCountSum}
                        </StyledText>
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                      >
                        <StyledText
                          fontWeight="500"
                          fontSize="16px"
                          textAlign="center"
                        >
                          {item.count}
                        </StyledText>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        ) : (
          <Grid container justify="center">
            <Grid item>
                Google Vision Data
            </Grid>
          </Grid>
        )}
    </div>
  );

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
    <>
      <Grid container spacing={2}>
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
                    {
                      tableRows.title.map(item => (
                        <StyledTableCell key={item.text} align={item.align} width={item.width || null}>
                          { item.id ? (
                            <Grid container justify="center">
                              <Grid item>
                                <StyledTableSortLabel
                                  id={item.id}
                                  color="#66f8ff"
                                  active={order.orderBy === item.id}
                                  direction={order.orderBy === item.id ? order.direction : 'desc'}
                                  sortTable={sortTable}
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
                      ))
                    }
                  </TableRow>
                </TableHead>
                <TableBody>
                  {influencers.map(row => (
                    <StyledTableRow
                      key={row.INS_ID}
                      types={2}
                      id={row.INS_ID}
                      selected={row.INS_ID === selectedRow}
                      onClick={getGoogleVisionData}
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
      </Grid>
    </>
  );
}

export default Instagram;
