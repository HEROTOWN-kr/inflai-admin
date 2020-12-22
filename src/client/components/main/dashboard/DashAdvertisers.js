import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Grid, Paper, Table, TableBody, TableContainer, TableHead, TableRow
} from '@material-ui/core';
import StyledTableCell from '../../containers/StyledTableCell';
import StyledTableRow from '../../containers/StyledTableRow';

function DashAdvertisers(props) {
  const { history } = props;
  const [advertisers, setAdvertisers] = useState([]);
  const page = 1; const limit = 5;

  function createAdvertisers(data) {
    const array = [];

    data.map(item => (
      array.push({
        id: item.ADV_ID,
        rownum: item.rownum,
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
    axios.get('/api/TB_ADVERTISER/getAdvertisers', {
      params: { page, limit },
    }).then((res) => {
      const { data } = res.data;
      createAdvertisers(data);
    }).catch(error => alert(error.response.data.message));
  }

  useEffect(() => {
    getAdvertisers();
  }, []);

  return (
    <React.Fragment>
      <Box className="category-label">
        <Grid container justify="space-between">
          <Grid item>신규가입광고주</Grid>
          <Grid item>
            <button onClick={() => history.push('/Advertiser')}>
                전체보기
            </button>
          </Grid>
        </Grid>
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center" width="40px">번호</StyledTableCell>
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
              <StyledTableRow hover key={row.id}>
                <StyledTableCell align="center">{row.rownum}</StyledTableCell>
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
    </React.Fragment>
  );
}

export default DashAdvertisers;
