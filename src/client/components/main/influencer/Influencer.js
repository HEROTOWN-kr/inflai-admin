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
  withStyles
} from '@material-ui/core';
import axios from 'axios';

function Influencer() {
  const [influencers, setInfluencers] = useState([]);

  const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  function createInfluencers(data) {
    const array = [];

    data.map(item => (
      array.push({
        id: item.INF_ID,
        name: item.INF_NAME,
        email: item.INF_EMAIL,
        phoneNumber: item.INF_TEL,
        registerDate: item.INF_DT,
      })
    ));

    setInfluencers(array);
  }

  function getInfluencers() {
    axios.get('/api/TB_INFLUENCER/getInfluencers')
      .then((res) => {
        createInfluencers(res.data.data);
      });
  }

  useEffect(() => {
    getInfluencers();
  }, []);

  const StyledTableRow = withStyles(theme => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  }))(TableRow);

  return (
    <Grid container justify="center">
      <Grid item md={10}>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>이름</StyledTableCell>
                <StyledTableCell align="right">이메일</StyledTableCell>
                <StyledTableCell align="right">전화번호</StyledTableCell>
                <StyledTableCell align="right">가입일차</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {influencers.map(row => (
                <StyledTableRow hover key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.email}</StyledTableCell>
                  <StyledTableCell align="right">{row.phoneNumber}</StyledTableCell>
                  <StyledTableCell align="right">{row.registerDate}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}

export default Influencer;
