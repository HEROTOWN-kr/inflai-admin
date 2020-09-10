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
        width: '8px'
      },
      {
        text: '이름',
        align: 'left'
      },
      {
        text: '구독수',
        align: 'right'
      }
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
    console.log(selectedRow);
    setProcess(true);
    const googleData = await axios.get('/api/TB_INSTA/getGoogleData', { params: { INS_ID } });
    console.log(googleData);
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
                    {item.text}
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
                  {row.rownum}
                </StyledTableCell>
                <StyledTableCell
                  align="left"
                >
                  <Grid container spacing={2}>
                    <Grid item>
                      <Box width="37px" height="37px" borderRadius="100%" src={row.INS_PROFILE_IMG} component="img" />
                    </Grid>
                    <Grid item>
                      {row.TB_INFLUENCER.INF_NAME}
                    </Grid>
                  </Grid>

                </StyledTableCell>
                <StyledTableCell
                  align="right"
                >
                  {row.INS_FLWR}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
      <Grid item xs={3}>
        <Box
          border="1px solid #cacaca"
          height="540px"
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
