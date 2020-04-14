import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Grid, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, withStyles, makeStyles, Paper
} from '@material-ui/core';


function Advertiser() {
  const [advertisers, setAdvertisers] = useState([]);

  const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  function createAdvertisers(data) {
    const array = [];

    data.map(item => (
      array.push({
        name: item.ADV_NAME,
        email: item.ADV_EMAIL,
        phoneNumber: item.ADV_TEL,
        companyName: item.ADV_COM_NAME,
        companyType: item.ADV_TYPE,
        registerDate: item.ADV_DT,
      })
    ));

    setAdvertisers(array);
  }

  function getAdvertisers() {
    axios.get('/api/TB_ADVERTISER/getAdvertisers')
      .then((res) => {
        createAdvertisers(res.data.data);
      });
  }

  useEffect(() => {
    getAdvertisers();
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
                <StyledTableCell align="right">회사&nbsp;명</StyledTableCell>
                <StyledTableCell align="right">기업구분</StyledTableCell>
                <StyledTableCell align="right">가입일차</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {advertisers.map(row => (
                <StyledTableRow hover key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.email}</StyledTableCell>
                  <StyledTableCell align="right">{row.phoneNumber}</StyledTableCell>
                  <StyledTableCell align="right">{row.companyName}</StyledTableCell>
                  <StyledTableCell align="right">{row.companyType}</StyledTableCell>
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

export default Advertiser;
