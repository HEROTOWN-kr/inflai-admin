import React, { useEffect, useState } from 'react';
import {
  Grid,
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow, CircularProgress,
} from '@material-ui/core';
import axios from 'axios';
import StyledTableCell from '../../containers/StyledTableCell';
import StyledTableRow from '../../containers/StyledTableRow';
import defaultAccountImage from '../../../img/default_account_image.png';
import StyledLink from '../../containers/StyledLink';
import StyledText from '../../containers/StyledText';

function Instagram() {
  const [influencers, setInfluencers] = useState([]);
  const [detectData, setDetectData] = useState({});
  const [selectedRow, setSelectedRow] = useState('');
  const [process, setProcess] = useState(false);

  const tableRows = {
    title: [
      {
        text: '#',
        align: 'center',
        width: '60px'
      },
      {
        text: '인스타그램 정보',
        align: 'left',
        // width: '200px'
      },
      {
        text: '팔로워 수',
        align: 'left'
      },
      {
        text: '팔로잉 수',
        align: 'left'
      },
      {
        text: '게시물 수',
        align: 'left'
      },
    ],
    body: ['rownum', 'INF_NAME', 'INS_FLWR']
  };

  const leftPanel = process ? <CircularProgress /> : (
    <div>
      {Object.keys(detectData).length
        ? Object.keys(detectData).map(item => (
          <div key={item}>
            <Box fontWeight="bold" fontSize="18px">{item}</Box>
            <Box pl={1}>
              <div>{`percentage: ${detectData[item].percentage}%`}</div>
              <div>{`likeCountSum: ${detectData[item].likeCountSum}`}</div>
              <div>{`commentsCountSum: ${detectData[item].commentsCountSum}`}</div>
            </Box>
          </div>
        ))
        : 'No data'}
    </div>
  );

  async function getInfluencers() {
    const InstaData = await axios.get('/api/TB_INSTA/');
    const { list } = InstaData.data.data;
    console.log(list);
    setInfluencers(list);
  }

  async function getGoogleVisionData(INS_ID) {
    setSelectedRow(INS_ID);
    setProcess(true);
    const googleData = await axios.get('/api/TB_INSTA/getGoogleData', { params: { INS_ID } });
    setDetectData({ ...googleData.data.message });
    setProcess(false);
  }

  useEffect(() => {
    getInfluencers();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={9}>
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
                        {row.INS_NAME || row.TB_INFLUENCER.INF_NAME}
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
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
      <Grid item xs={3}>
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

  );
}

export default Instagram;
