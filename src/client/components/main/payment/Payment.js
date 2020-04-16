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

function Payment() {
  const [payments, setPayments] = useState([]);

  const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  function createPayments(data) {
    const array = [];

    data.map(item => (
      array.push({
        name: item.INF_NAME,
        email: item.INF_EMAIL,
        phoneNumber: item.INF_TEL,
        registerDate: item.INF_DT,
      })
    ));

    setPayments(array);
  }

  function getPayments() {
    axios.get('/api/TB_INFLUENCER/getPayments')
      .then((res) => {
        createPayments(res.data.data);
      });
  }

  useEffect(() => {
    getPayments();
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
                <StyledTableCell>회사명</StyledTableCell>
                <StyledTableCell align="right">회사명</StyledTableCell>
                <StyledTableCell align="right">전화번호</StyledTableCell>
                <StyledTableCell align="right">가입일차</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments.map(row => (
                <StyledTableRow hover key={row.name}>
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

export default Payment;
