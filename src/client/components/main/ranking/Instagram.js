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
  TableRow, CircularProgress,
} from '@material-ui/core';
import axios from 'axios';
import { PieChart } from 'react-minimal-pie-chart';
import StyledTableCell from '../../containers/StyledTableCell';
import StyledTableRow from '../../containers/StyledTableRow';
import defaultAccountImage from '../../../img/default_account_image.png';
import StyledLink from '../../containers/StyledLink';
import StyledText from '../../containers/StyledText';
import StyledButton from '../../containers/StyledButton';
import StyledTableSortLabel from '../../containers/StyledTableSortLabel';


function Instagram(props) {
  const { searchWord } = props;
  const [influencers, setInfluencers] = useState([]);
  const [detectData, setDetectData] = useState([]);
  const [selectedRow, setSelectedRow] = useState('');
  const [process, setProcess] = useState(false);
  const [order, setOrder] = useState({ orderBy: 'INS_FLWR', direction: 'desc' });


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
      /* {
        text: '',
        align: 'left'
      }, */
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


  const leftPanel = process ? <CircularProgress /> : (
    <div>
      {detectData && detectData.length
        ? (
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
          </Box>
        )
      /* detectData.map(item => (
          <div key={item.description}>

             <Box fontWeight="bold" fontSize="18px">{item.description}</Box>
            <Box pl={1}>
              <div>{`percentage: ${item.percentage}%`}</div>
              <div>{`likeCountSum: ${item.likeCountSum}`}</div>
              <div>{`commentsCountSum: ${item.commentsCountSum}`}</div>
            </Box>
          </div>
        )) */
        : (
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
        ...order, searchWord
      }
    });
    const { list } = InstaData.data.data;
    console.log(list);
    setInfluencers(list);
  }

  async function getGoogleVisionData(INS_ID) {
    setSelectedRow(INS_ID);
    setProcess(true);
    const isLocal = window.location.host !== 'admin.inflai.com';

    const googleData = await axios.get('/api/TB_INSTA/getGoogleData', {
      params: { INS_ID, isLocal }
    });
    setDetectData(googleData.data.statistics);
    setProcess(false);
  }

  useEffect(() => {
    getInfluencers();
  }, [order, searchWord]);

  /* useEffect(() => {
    console.log(searchWord);
  }, [searchWord]); */

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
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                {
                tableRows.title.map(item => (
                  <StyledTableCell
                    key={item.text}
                    align={item.align}
                    width={item.width || null}
                  >
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
                  id={row.INS_ID}
                  selected={row.INS_ID === selectedRow}
                  onClick={getGoogleVisionData}
                >
                  <StyledTableCell
                    align="center"
                  >
                    <StyledText
                      fontSize="20px"
                      fontWeight="700"
                      textAlign="center"
                    >
                      {row.rownum}
                    </StyledText>
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                  >
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
                        <StyledText
                          fontWeight="600"
                          fontSize="14px"
                          color="#222"
                        >
                          {row.INS_NAME ? `${row.INS_NAME} / ${row.TB_INFLUENCER.INF_NAME}` : row.TB_INFLUENCER.INF_NAME}
                        </StyledText>
                        <Box
                          paddingTop="3px"
                          fontSize="12px"
                          color="#555"
                        >
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
                  <StyledTableCell
                    align="left"
                  >
                    <StyledText
                      fontWeight="500"
                      fontSize="16px"
                      textAlign="center"
                    >
                      {row.INS_FLWR}
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
                      {row.INS_FLW}
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
                      {row.INS_MEDIA_CNT}
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
                      {row.INS_LIKES}
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
                      {row.INS_CMNT}
                    </StyledText>
                  </StyledTableCell>
                  {/* <StyledTableCell
                    align="center"
                  >
                    <StyledButton
                      padding="0 2px"
                      borderRadius="10px"
                    >
                    상세
                    </StyledButton>
                  </StyledTableCell> */}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
        <Grid item md={5} xl={4}>
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
