import React, { useEffect, useState } from 'react';
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  withStyles, Button
} from '@material-ui/core';
import axios from 'axios';
import StyledTableCell from '../../containers/StyledTableCell';
import StyledTableRow from '../../containers/StyledTableRow';

function CampaignDetail(props) {
  const [requests, setRequests] = useState({});

  function getStatistic() {
    axios.get('/api/TB_NOTIFICATION/getRequests', {
      params: {
        id: props.match.params.id
      }
    }).then((res) => {
      const { data } = res.data;
      console.log(data);
      setRequests(data);
    });
  }

  useEffect(() => {
    getStatistic();
  }, []);

  const tableHeader = [
    {
      text: '이름',
      align: 'left'
    },
    {
      text: '이메일',
      align: 'right'
    },
    {
      text: '전화번호',
      align: 'right'
    },
    {
      text: '소셜',
      align: 'right'
    },
    {
      text: '상태',
      align: 'right'
    },
    {
      text: '요청날짜',
      align: 'right'
    },
  ];

  function MyTableRow({
    data
  }) {
    const {
      NOTI_ID, NOTI_STATE, NOTI_DT, TB_INFLUENCER
    } = data;

    const {
      INF_NAME, INF_EMAIL, INF_TEL, INF_BLOG_TYPE
    } = TB_INFLUENCER;

    function getColor(state) {
      if (state === '대기중') {
        return {
          color: '#ff9510'
        };
      } if (state === '승인') {
        return {
          color: '#8bce7f'
        };
      }
      return {
        color: 'red'
      };
    }


    return (
      <StyledTableRow hover>
        <StyledTableCell component="th" scope="row">
          {INF_NAME}
        </StyledTableCell>
        <StyledTableCell align="right">{INF_EMAIL}</StyledTableCell>
        <StyledTableCell align="right">{INF_TEL}</StyledTableCell>
        <StyledTableCell align="right">{INF_BLOG_TYPE}</StyledTableCell>
        <StyledTableCell align="right" style={getColor(NOTI_STATE)}>{NOTI_STATE}</StyledTableCell>
        <StyledTableCell align="right">{NOTI_DT}</StyledTableCell>
      </StyledTableRow>
    );
  }

  return (
    <Grid container justify="center">
      <Grid item md={10}>
        <Grid container spacing={3}>
          <Grid item md={12}>
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    {tableHeader.map(item => (
                      <StyledTableCell key={item.text} align={item.align}>{item.text}</StyledTableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.keys(requests).map(key => (
                    <MyTableRow key={requests[key].NOTI_ID} data={requests[key]} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item md={12}>
            <Grid container justify="center">
              <Grid item md={2}>
                <Button variant="contained" color="secondary" fullWidth onClick={props.goBack}>이전</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default CampaignDetail;
