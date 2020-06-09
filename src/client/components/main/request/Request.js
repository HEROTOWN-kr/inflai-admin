import React, { useEffect, useState } from 'react';
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import axios from 'axios';
import StyledTableCell from '../../containers/StyledTableCell';
import StyledTableRow from '../../containers/StyledTableRow';

function Request() {
  const [influencers, setInfluencers] = useState([]);

  function createInfluencers(data) {
    const array = [];

    data.map(item => (
      array.push({
        id: item.REQ_ID,
        name: item.REQ_NAME,
        brand: item.REQ_BRAND,
        phoneNumber: item.REQ_TEL,
        registerDate: item.REQ_DT,
        companyName: item.REQ_COMP_NAME,
        advertiserName: item.TB_ADVERTISER.ADV_NAME
      })
    ));

    setInfluencers(array);
  }

  function getInfluencers() {
    axios.get('/api/TB_REQ_AD/').then((res) => {
      console.log(res);
      createInfluencers(res.data.data);
    });
  }

  useEffect(() => {
    getInfluencers();
  }, []);

  return (
    <Grid container justify="center">
      <Grid item md={10}>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>브랜드명(제품명)</StyledTableCell>
                <StyledTableCell align="right">업체명</StyledTableCell>
                <StyledTableCell align="right">담당자명</StyledTableCell>
                <StyledTableCell align="right">전화번호</StyledTableCell>
                <StyledTableCell align="right">가입일차</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {influencers.map(row => (
                <StyledTableRow hover key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.brand}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.companyName}</StyledTableCell>
                  <StyledTableCell align="right">{row.name}</StyledTableCell>
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

export default Request;
